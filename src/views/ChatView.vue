<template>
  <div class="main">

    <div class="left">

      <div class="conversation-list">

        <div class="head">

          <h2>Chats</h2>

          <div class="icons">
            <div class="item">
              <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div class="item">
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
          </div>
        </div>

        <div class="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search Messenger" v-model="searchQuery">
        </div>

        <div v-if="filteredConversations.length">
          <div class="conversation" v-for="conversation in filteredConversations" :key="conversation.id" @click="setActiveConversation(conversation.id)">

            <div class="conv-head" :class="conversation.id === activeConversation? 'set-conv' : 'unset-conv'" v-for="user in conversation.users" v-bind:key="user.id">

              <div class="conv-head-item" v-if="user.id !== userStore.user.id">
                <img :src="'https://yannickkagou.pythonanywhere.com' + user.get_avatar">
                <div class="conv-subtitle">
                  <p class="name" v-if="user.id !== userStore.user.id">
                    {{ user.firstname }} {{ user.lastname }}
                  </p>
                  <p class="time">{{ conversation.modified_at_formatted }} ago</p>
                </div>
              </div>

            </div>
         
            </div>
        </div>
        
        <div v-else class="no-conv">
          <h3>We didn't find any results</h3>
        </div>
      </div>

    </div>

    <div class="center" v-if="activeConversationData.id">
      <div class="message-list" v-if="activeConversationData.messages.length">
        <div class="message">
          <div v-for="message in activeConversationData.messages" v-bind:key="message.id">
            <div class="my-message" v-if="message.created_by.id == userStore.user.id">
              
              <div class="my-message-body">
                
                <div v-if="message.attachments">
                  <img class="attachment" v-for="image in message.attachments" v-bind:key="image.id" :src="'https://yannickkagou.pythonanywhere.com' + image.get_image">
                </div>

                <div v-if="message.videos">
                    <video class="video" v-for="video in message.videos" :key="video.id" :src="'https://yannickkagou.pythonanywhere.com' + video.get_video" loop controls controlsList="nofullscreen">
                    </video>
                </div>

                <div v-if="message.voices">
                  <audio class="voice" v-for="voice in message.voices" :key="voice.id" :src="'https://yannickkagou.pythonanywhere.com' + voice.get_voice" controls>
                  </audio>
                </div>
                <p class="message-text" v-if="message.body">{{ message.body }}</p>
                <p class="message-time">{{ message.created_at_formatted }} ago</p>

              </div>
              
              <img class="avatar-icon" :src="'https://yannickkagou.pythonanywhere.com' + message.created_by.get_avatar">

            </div>

            <div  class="your-message" v-else>

              <img class="avatar-icon" :src="'https://yannickkagou.pythonanywhere.com' + message.created_by.get_avatar">
      
              <div class="your-message-body">
                
                <div v-if="message.attachments">
                  <img class="attachment" v-for="image in message.attachments" v-bind:key="image.id" :src="'https://yannickkagou.pythonanywhere.com' + image.get_image">
                </div>

                <div v-if="message.videos">
                    <video class="video" v-for="video in message.videos" :key="video.id" :src="'https://yannickkagou.pythonanywhere.com' + video.get_video" loop controls controlsList="nofullscreen">
                    </video>
                </div>

                <div v-if="message.voices">
                  <audio class="voice" v-for="voice in message.voices" :key="voice.id" :src="'https://yannickkagou.pythonanywhere.com' + video.get_voice" controls>
                  </audio>
                </div>

                <p class="message-text" v-if="message.body">{{ message.body }}</p>
                <p class="message-time">{{ message.created_at_formatted }} ago</p>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="send-message">
        <form @submit.prevent="submitMessageForm">

          <div class="buttons">
      
            <i class="fa-solid fa-play" style="color: #1b74e4;" v-if="!mediaRecorder" @click="startRecording" :style="[recording ? {'display': 'none'} : {'display': 'block'}]"></i>
            <i class="fa-solid fa-stop fa-fade" style="color: #ff1a1a;" v-if="!mediaRecorder" @click="stopRecording" :style="[recording ? {'display': 'block'} : {'display': 'none'}]"></i>
            <i class="fa-solid fa-paper-plane fa-bounce" style="color: #1b74e4;" v-if="mediaRecorder" @click="sendVoiceNote"></i>
            
                    
              <!-- <button class="recordButton" @click="startRecording" :disabled="recording">Start Recording</button>
              <button class="recordButton" @click="stopRecording" :disabled="!recording">Stop Recording</button>
              <button class="sendButton" @click="sendVoiceNote" :disabled="!voiceFileInputRef">Send Voice Note</button> -->
    
            <label for="photo-input"><i class="fa-solid fa-image" style="color: #1b74e4;"></i></label>
            <input type="file" id="photo-input" @change="onFileSelected" ref="fileInputRef" style="visibility: hidden;display: none;">
            
            <label for="video-input"><i class="fa-solid fa-video" style="color: #1b74e4;"></i></label>
            <input type="file" id="video-input" @change="onVideoSelected" ref="videoInputRef" style="visibility: hidden;display: none;">

          </div> 

            <input v-model="body" :placeholder="'What do you want to say ' + userStore.user.firstname + ' ' + userStore.user.lastname + '?'">
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>

import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted, reactive, ref, computed } from 'vue';
import { useToast } from 'vue-toast-notification';

let searchQuery = ref('');
const toast = useToast();
const userStore = useUserStore()

onBeforeMount(() => {
    userStore.initStore();
})

let conversations = ref([]);
let activeConversation = ref(null);
let activeConversationData = reactive({});
let body = ref("");
let fileInputRef = ref(null);
let videoInputRef = ref(null);
let voiceFileInputRef = ref(null)

let recording = ref(false);

let errors = ref([]);

onMounted(() => {
    getConversations();
});
    

const setActiveConversation = (id) => {
    console.log('setActiveConversation', id)
    activeConversation.value = id
    getMessages()
}

async function getConversations() {
    console.log('getConversations')

    await axios
        .get('/api/chat/')
        .then(response => {
            console.log(response.data)

            conversations.value = response.data

            if (conversations.value.length) {
                activeConversation.value = conversations.value[0].id
                console.log(activeConversation.value)
            }
            if (activeConversation.value){
              getMessages()
            }
        })
        .catch(error => {
            console.log(error)
        })
};

const filteredConversations = computed(() => {
  if (searchQuery.value) {
    return conversations.value.filter(conversation =>
      conversation.users.some(user =>
        user.firstname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  } else {
    return conversations.value;
  }
});

const getMessages = async () => {
    console.log('getMessages')
    console.log(activeConversation.value)
    if (activeConversation.value){
      await axios
          .get(`/api/chat/${activeConversation.value}/`)
          .then(response => {
              console.log(response.data)
              Object.assign(activeConversationData, response.data);
              console.log(activeConversationData.messages)
          })
          .catch(error => {
              console.log(error)
          })
    }
};

const sendVoiceNote = () => {
  let formData = new FormData();
  console.log(voiceFileInputRef.value)
  if (voiceFileInputRef.value) {
    formData.append('voice', voiceFileInputRef.value, 'recording.webm');
    axios
      .post(`/api/chat/${activeConversation.value}/send/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        activeConversationData.messages.push(response.data);
        voiceFileInputRef.value = null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

let mediaRecorder = ref(null); // Ajout d'une variable pour stocker l'objet MediaRecorder

const startRecording = () => {
  recording.value = true;

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioChunks = [];

      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        voiceFileInputRef.value = audioBlob;
      });

      mediaRecorder.start();
    })
    .catch(error => {
      console.error("Erreur lors de l'accès au microphone:", error);
    });
};

const stopRecording = () => {
  recording.value = false;
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
};

const submitMessageForm = async () => {
        let formData = new FormData()
        if (fileInputRef.value){
          if (fileInputRef.value.files[0].type.startsWith('image/')) {
            formData.append('image', fileInputRef.value.files[0])
          }else{
              toast.error('You should select an image')
              errors.value.push('Try again')
          }
        }
        if (videoInputRef.value){
          if (videoInputRef.value.files[0].type.startsWith('video/')) {
            formData.append('video', videoInputRef.value.files[0]);
          }else{
              toast.error('You should select a video with size less than 5MB')
              errors.value.push('Try again')
          }
        }
        formData.append('body', body.value)

        if (errors.value.length == 0){
            await axios
            .post(`/api/chat/${activeConversation.value}/send/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {
              console.log(response.data)
              activeConversationData.messages.push(response.data)
              fileInputRef.value = null
                videoInputRef.value = null
              toast.success("message send")
            })
            .catch(error => {
                console.log('error', error)
                body.value = ''
                fileInputRef.value = null
                videoInputRef.value = null
                toast.error("Try again")
            })
        } else{
            body.value = ''
            fileInputRef.value = null
            videoInputRef.value = null
            toast.error('Try again')
        }
    };

// const onVoiceSelected = () => {
//   console.log('Selected voice file:', voiceRecord.value);
// };

const onFileSelected = () => {
  videoInputRef.value = null
  console.log('Selected file for chat:', fileInputRef.value.files[0])
}

const onVideoSelected = () => {
  fileInputRef.value = null
  console.log('Selected video for chat:', videoInputRef.value.files[0])
}

</script>

<style scoped>
.main {
  width: 100%;
  display: flex;
  background-color: #fff;  
  margin-top: 60px;
}

.left {
  width: 25%;
  height: 98vh;
  overflow-y: scroll;
  display: flex;
  background-color: #eee;
  padding: 10px;
  border-right: 1px solid #eee;
}
.left::-webkit-scrollbar {
    display: none;
}
.conversation-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.head{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head .icons{
  display: flex;
}
.head .icons .item{
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}
.search-bar{
    width: 90%;
    margin: 5px auto;
    height: 30px;
    background-color: #fff;
    border-radius: 30px;
    padding: 0 10px;
}

.search-bar i{
    line-height: 30px;
    font-size: 15px;
    color: #919191;
    margin-right: 5px;
}

.search-bar input{
    background-color: transparent;
    outline: none;
    border: 0;
    font-size: 12px;
    width: 70%;
}

.no-conv{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
}
.conversation {
  margin: 10px 0;
  cursor: pointer;
}
.set-conv{
  background-color: #1b74e4;
}
.unset-conv{
  background-color: #fff;
}
.conversation .conv-head {
  padding: 10px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.conversation .conv-head .conv-head-item {
  display: flex;
  align-items: center;
  width: 100%;
}
.conversation img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}
.conversation .conv-head .conv-subtitle{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.conversation .conv-head .conv-subtitle .name{
  font-weight: bold;
  font-size: 12px;
  margin: 0;
}
.conversation .conv-head .conv-subtitle .time{
  font-size: 8px;
  margin: 0;
}

.center {
  width: 75%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.message-list {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  padding-top: 10px;
  overflow-y: scroll;
  position: relative;
}
.message-list::-webkit-scrollbar {
    display: none;
}
.message {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.message p{
  margin: 0;
}
.my-message, .your-message{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.my-message {
  justify-content: flex-end;
}
.my-message-body, .your-message-body{
  background-color: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  max-width: 49%;
  margin: 10px 0;
  border: 1px solid #eee;
}
.my-message-body {
  margin-right: 10px;
  text-align: right;
}

.your-message {
  justify-content: flex-start;
}

.your-message-body {
  margin-left: 10px;
  text-align: left;
}
.attachment{
  width: 300px;
  height: 200px;
  object-fit: cover;
  object-position: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.video{
  width: 300px;
  height: 200px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.voice{
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.avatar-icon{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin: 0 5px;
}
.message-text{
  padding: 10px;
}
.message-time{
  margin-bottom: -20px !important;
}
.send-message {
  width: 81%;
  position: fixed;
  bottom: 0;
  background-color: #fff;
}
.send-message form{
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
}
.send-message .buttons{
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
}
.send-message input{
  width: 78%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1b74e4;
  outline: 0;
  padding: 10px;
  border-radius: 12px;
}
.send-message input:focus{
  border-color: #1b74e4;
}
.send-message input:hover{
  border-color: #1b74e4;
}

</style>
