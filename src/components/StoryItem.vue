<template>
    <div v-show="showStory">

    <div class="thestory-content1"  v-if="(story.body && story.attachments.length) || (story.body && story.videos.length)">
        <div class="thestory-head">
            <div class="name-time">
                <img :src=" 'http://localhost:8000' + story.created_by.get_avatar">
                <div class="name-time-contain">
                    <p class="name">
                        <router-link :to="{name:'p_posts', params:{'id': story.created_by.id}}">
                            {{ story.created_by.firstname}} {{story.created_by.lastname}}
                        </router-link>
                    </p>
                    <p class="time">
                        {{ story.created_at_formatted }} ago<i class="fa-solid fa-user-group"></i>
                    </p>
                </div>
            </div>
        
            <div @click="closeShowStory" class="menu">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div v-if="userStore.user.id === story.created_by.id" class="delete" @click="deleteStory(story.id)">
            <i class="fa-solid fa-trash"></i>
        </div>
        <div class="story-contain1">
            <div class="story-body1">
                <p>{{ story.body }}</p>
            </div>
            <div class="story-img1" v-if="story.attachments.length">
                <img v-for="image in story.attachments" v-bind:key="image.id" :src="'http://localhost:8000' + image.get_image">
            </div>
            <div class="story-video1" v-if="story.videos.length">
                <video v-for="video in story.videos" :key="video.id" :src="'http://localhost:8000' + video.get_video" loop controls controlsList="nofullscreen"></video>
            </div> 
        </div>
    </div>

    <div class="thestory-content"  v-if="story.body && !story.attachments.length && !story.videos.length">
        <div class="thestory-head">
            <div class="name-time">
                <img :src=" 'http://localhost:8000' + story.created_by.get_avatar">
                <div class="name-time-contain">
                    <p class="name">
                        <router-link :to="{name:'p_posts', params:{'id': story.created_by.id}}">
                            {{ story.created_by.firstname}} {{story.created_by.lastname}}
                        </router-link>
                    </p>
                    <p class="time">
                        {{ story.created_at_formatted }} ago<i class="fa-solid fa-user-group"></i>
                    </p>
                </div>
            </div>
        
            <div @click="closeShowStory" class="menu">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div v-if="userStore.user.id === story.created_by.id" class="delete" @click="deleteStory(story.id)">
            <i class="fa-solid fa-trash"></i>
        </div>
        <div class="story-contain">
            <div class="story-body">
                <p>{{ story.body }}</p>
            </div>
        </div>
    </div>

    <div class="thestory-content" v-if="story.attachments.length && !story.body">
        <div class="thestory-head">
            <div class="name-time">
                <img :src=" 'http://localhost:8000' + story.created_by.get_avatar">
                <div class="name-time-contain">
                    <p class="name">
                        <router-link :to="{name:'p_posts', params:{'id': story.created_by.id}}">
                            {{ story.created_by.firstname}} {{story.created_by.lastname}}
                        </router-link>
                    </p>
                    <p class="time">
                        {{ story.created_at_formatted }} ago<i class="fa-solid fa-user-group"></i>
                    </p>
                </div>
            </div>
        
            <div @click="closeShowStory" class="menu">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div v-if="userStore.user.id === story.created_by.id" class="delete" @click="deleteStory(story.id)">
            <i class="fa-solid fa-trash"></i>
        </div>
        <div class="story-contain">
            <div class="story-img" v-if="story.attachments.length">
                <img v-for="image in story.attachments" v-bind:key="image.id" :src="'http://localhost:8000' + image.get_image">
            </div>
        </div>
        
    </div>

    <div class="thestory-content" v-if="story.videos.length && !story.body">
        <div class="thestory-head">
            <div class="name-time">
                <img :src=" 'http://localhost:8000' + story.created_by.get_avatar">
                <div class="name-time-contain">
                    <p class="name">
                        <router-link :to="{name:'p_posts', params:{'id': story.created_by.id}}">
                            {{ story.created_by.firstname}} {{story.created_by.lastname}}
                        </router-link>
                    </p>
                    <p class="time">
                        {{ story.created_at_formatted }} ago<i class="fa-solid fa-user-group"></i>
                    </p>
                </div>
            </div>
        
            <div @click="closeShowStory" class="menu">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div v-if="userStore.user.id === story.created_by.id" class="delete" @click="deleteStory(story.id)">
            <i class="fa-solid fa-trash"></i>
        </div>
        <div class="story-contain">
            <div class="story-video" v-if="story.videos.length">
                <video v-for="video in story.videos" :key="video.id" :src="'http://localhost:8000' + video.get_video" loop controls controlsList="nofullscreen"></video>
            </div> 
        </div>
        <div class="story-video" v-if="story.videos.length">
            <video v-for="video in story.videos" :key="video.id" :src="'http://localhost:8000' + video.get_video" loop controls controlsList="nofullscreen"></video>
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
    story: Object,
    showStory: Boolean,
    stories: Array
});

let story = reactive(props.story);
let stories = ref(props.stories);

const emits = defineEmits(['toast-showStory']);

const closeShowStory = () =>{
    emits('toast-showStory');
  }

function deleteStory(id) {
        axios
            .delete(`/api/posts/story/${id}/delete/`)
            .then(response => {
                console.log(response.data)
                toast.error('Story deleted')
            })
            .catch(error => {
                console.log("error", error);
            });
    };

</script>

<style scoped>
.thestory-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
    background-color: #fff;
}
.thestory-head{
    width: 90%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.time{
    margin-top: -10px;
}
.name-time{
    height: 60px;
    display: flex;
    align-items: center;
}
.name-time img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 10px;
}
.name-time .name-time-contain{
    display: flex;
    flex-direction: column;
}
.thestory-content .story-contain{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.thestory-content .story-contain .story-body{
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
}
.thestory-content .story-contain .story-img{
    width: 100%;
    height: calc(100vh - 70px);
    object-fit: cover;
    object-position: center;
}
.thestory-content .story-contain .story-video{
    width: 100%;
    height: calc(100vh - 70px);
}
.thestory-content .story-contain .story-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
.thestory-content .story-contain .story-video video{
    width: 100%;
    height: 100%;
}
.thestory-content1{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
    background-color: #fff;
}
.thestory-content1 .thestory-head{
    width: 90%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.thestory-content1 .story-contain1{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.thestory-content1 .story-contain .story-body1{
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin: 5px 0;
}
.thestory-content1 .story-contain1 .story-img1{
    width: 100%;
    height: calc(100vh - 70px - 13vh);
    object-fit: cover;
    object-position: center;
}
.thestory-content1 .story-contain1 .story-video1{
    width: 100%;
    height: 90vh;
}
.thestory-content1 img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
.thestory-content1 video{
    width: 100%;
    height: 100%;
}
a {
  text-decoration: none; 
  color: inherit;
}

a:visited {
  color: inherit; 
}
</style>