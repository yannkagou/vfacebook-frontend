<template>

        <div class="my-post">
        <div class="post-top"> 
            <img :src="'https://yannickkagou.pythonanywhere.com' + userStore.user.avatar">
            <input @click="showPopup" type="text" :placeholder="'What is on your mind ' + userStore.user.firstname + ' ' + userStore.user.lastname + '?'">
        </div>
        <hr>
        <div class="post-bottom">
            <div class="post-icon">
                <i class="fa-solid fa-video red"></i>
                <p>Live video</p>
            </div>
            <div class="post-icon">
                <i class="fa-solid fa-image green"></i>
                <p>Photo/video</p>
            </div>
            <div class="post-icon">
                <i class="fa-regular fa-face-grin yellow"></i>
                <p>Feeling / activity</p>
            </div>
        </div>


    <div class="popup-form" v-show="popupVisibleRef">
        <div class="popup-form-content">

        <div class="popup-form-title">
            <h2 class="headerpopup">Create Post</h2>
            
            <div @click="hidePopup" class="close">
                <i class="fas fa-xmark"></i>
            </div>
        </div>

        <hr>

        <div class="postform-top">

            <div class="header">
                <img :src="'https://yannickkagou.pythonanywhere.com' + userStore.user.avatar" alt="">
                <p>{{userStore.user.firstname}} {{userStore.user.lastname}}</p>
            </div> 
            
            <form @submit.prevent="submitForm" class="postform-form">

                <input v-model="body" :placeholder="'What is on your mind ' + userStore.user.firstname + ' ' + userStore.user.lastname + '?'">

                <div class="picture" v-if="addPicture">
                    <i class="fas fa-xmark" @click="togglePicture"></i>
                    <label class="add" for="form-image" id="upload-image">
                        <i class="fa-solid fa-image" style="color: rgb(172, 172, 255);"></i>
                        <input type="file" id="form-image" style="visibility: hidden;display: none;" @change="onFileSelected" ref="fileInputRef" multiple>
                        <p class="title">Add Photos</p>
                        <p class="s-title">click here</p>
                    </label> 
                </div>
                <div class="picture" v-if="addVideo">
                    <i class="fas fa-xmark" @click="toggleVideo"></i>
                    <label class="add" for="form-video" id="upload-video">
                        <i class="fa-solid fa-film" style="color: rgb(172, 172, 255);"></i>
                        <input type="file" id="form-video" style="visibility: hidden;display: none;" @change="onVideoSelected" ref="videoInputRef" multiple>
                        <p class="title">Add Videos</p>
                        <p class="s-title">click here</p>
                    </label> 
                </div>

                <div class="addToPost">
                    <div class="text">
                        <p>Add to your post</p>
                    </div>
                    <div class="images">
                        <!-- <i class="fas fa-xmark" @click="togglePicture"></i> -->
                        
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" @click="togglePicture">
                        
                        <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -518px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;" @click="toggleVideo"></i>

                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png">

                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png">

                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png">

                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png">
                        

                    </div>
                </div>
                <button type="submit">Post</button>
            </form>

        </div>

    </div>
</div>
    </div>
</template>

<script setup>

import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { ref, onMounted, onBeforeMount, computed, reactive } from 'vue';
import { useToast } from 'vue-toast-notification';

    const toast = useToast();
    const userStore = useUserStore();

    let props = defineProps ({
        posts: Array
    });

    let posts = ref(props.posts);

    let errors = ref([])

    let body = ref('');
    let fileInputRef = ref(null)
    let videoInputRef = ref(null)

    let addPicture = ref(false);
    let addVideo = ref(false);

    const togglePicture = () => {
        addPicture.value = !addPicture.value
        addVideo.value = false
        videoInputRef.value = null
    }

    const toggleVideo = () => {
        addVideo.value = !addVideo.value
        addPicture.value = false
        fileInputRef.value = null
    }

    let popupVisibleRef = ref(false);

    const showPopup = () => {
        popupVisibleRef.value = !popupVisibleRef.value
    }

    const hidePopup = () => {
        popupVisibleRef.value = !popupVisibleRef.value
    }

    const submitForm = async () => {
        let formData = new FormData()
        if (fileInputRef.value){
            for (let i=0; i < fileInputRef.value.files.length; i++){
                const file = fileInputRef.value.files[i];
                if (file.type.startsWith('image/')) {
                    formData.append('image', file);
                }else{
                    toast.error('You should select an image')
                    errors.value.push('Try again')
                }
            }
        }
        if (videoInputRef.value){
            for (let i=0; i < videoInputRef.value.files.length; i++){
                const file = videoInputRef.value.files[i];
                if (file.type.startsWith('video/')) {
                    formData.append('video', file);
                }else{
                    toast.error('You should select a video with size less than 5MB')
                    errors.value.push('Try again')
                }
            }
        }
        formData.append('body', body.value)

        // console.log(formData.getAll('image'))
        // console.log(formData.getAll('video'))

        if (errors.value.length == 0){
            await axios
            .post('/api/posts/create/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {
                console.log('the new post data', response.data)
                posts.value.unshift(response.data)
                body.value = ''
                fileInputRef.value = null
                videoInputRef.value = null
                popupVisibleRef.value = !popupVisibleRef.value
                toast.success("Post added")
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

    const onFileSelected = () => {
        const imageView = document.getElementById("upload-image")
        let imgLink = URL.createObjectURL(fileInputRef.value.files[0]);
        imageView.style.backgroundImage = `url(${imgLink})`;
        imageView.style.backgroundSize = "cover";
        imageView.style.backgroundPosition = "center";
        console.log('Selected file:', fileInputRef.value.files)
    }

    const onVideoSelected = () => {
        const videoView = document.getElementById("upload-video")
        let videoLink = URL.createObjectURL(videoInputRef.value.files[0]);
        videoView.innerHTML = `<video loop controls controlsList="nofullscreen" width="80%" height="200"><source src="${videoLink}" type="video/mp4"></video>`;
    }

</script>

<style scoped>

.main{
    width: 100%;
    margin-top: 0px;
}
.my-post{
    width: 80%;
    height: auto;
    background-color: #fff;
    padding: 10px 10px;
    border-radius: 7px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
    margin: 5px auto;
}
.my-post .post-top{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.my-post .post-top img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}

.my-post .post-top input{
    width: 88%;
    padding: 10px;
    border: none;
    background-color: #eeeeee;
    border-radius: 30px;
    font-size: 17px;
}

.my-post .post-top input:hover{
    background-color: #eeeeee;
    cursor: pointer;
}

.my-post hr{
    width: 100%;
    height: 1px;
    background-color: #ccc;
    border: 0;
    margin: 5px 0 2px 0;
}

.my-post .post-bottom{
    width: 95%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0px auto;
}

.my-post .post-bottom .post-icon{
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 3px 15px;
    cursor: pointer;
}

.my-post .post-bottom .post-icon:hover{
    background-color: #efefef;
    border-radius: 8px;
}

.my-post .post-bottom .post-icon i.red{
    font-size: 17px;
    color: red;
    margin-right: 8px;
}

.my-post .post-bottom .post-icon i.green{
    font-size: 17px;
    color: green;
    margin-right: 8px;
}

.my-post .post-bottom .post-icon i.yellow{
    font-size: 17px;
    color: yellow;
    margin-right: 8px;
}
.popup-form {
    position: fixed;
    overflow-y: scroll;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /* height: 100%; */
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.popup-form-content {
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

.popup-form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.popup-form-title .headerpopup{
  font-size: 24px;
  font-weight: bold;
  padding-left: 40%;
  
}
.popup-form-title .close{
    margin-right: 20px;
}

.popup-form-title .close i {
  font-size: 24px;
  color: gray;
  cursor: pointer;
}

hr {
  margin: 0;
}

.postform-top{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.postform-top .header {
  display: flex;
  align-items: center;
}

.postform-top  .header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.postform-top .header p {
  font-weight: bold;
}
.postform-top .postform-form{
    width: 90%;
    margin: 0 auto;
}
.postform-top .postform-form input{
    width: 90%;
    margin: 10px auto;
    padding: 5px;
    border: none;
}
.postform-top .postform-form input:focus{
    outline: 0;
}
.postform-top .postform-form .picture{
    border: 1px solid #717171;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 10px;
}
.postform-top .postform-form .picture i{
    font-size: 20px;
    color: gray;
    cursor: pointer;
}
.postform-top .postform-form .picture .add{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.postform-top .postform-form .picture .add i{
    font-size: 24px;
    color: gray;
    cursor: pointer;
}
.postform-top .postform-form .picture .add .title{
    font-size: 20px;
    color: #000;
    text-align: center;
    font-weight: bold;
}
.postform-top .postform-form .picture .add .s-title{
    font-size: 16px;
    color: #5a5a5a;
    text-align: center;
    font-weight: bold;
}
.postform-top .postform-form .addToPost {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #717171;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
}

.postform-top .postform-form .addToPost .text {
    width: 40%;
    font-size: 20px;
    color: #000;
    font-weight: bold;
}

.postform-top .postform-form .addToPost .images {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

button[type="submit"] {
  background-color: #eeeeee;
  color: #717171;
  border: 1px solid #717171;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

button[type="submit"]:hover {
  background-color: #1b74e4;
}
</style>