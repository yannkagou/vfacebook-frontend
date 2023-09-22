<template>
    <div class="postmain">
  
      <div class="left">
  
        <div class="intro">
          <h2>Intro</h2>
        </div>
  
        <button>Add bio</button>
        <button>Edit details</button>
        <button>Add hobbies</button>
        <button>Add features</button>
  
        <div class="photos">
        <h2>Photos</h2>
        <div class="photo-card" v-if="filteredPhotos.length">
          <div class="photo" v-for="photo in filteredPhotos" :key="photo.id">
            <img :src="'https://yannickkagou.pythonanywhere.com' + photo.get_image">
          </div>
        </div>
      </div>

      <div class="photos">
        <h2>Videos</h2>
        <div class="photo-card" v-if="filteredVideos.length">
          <div class="photo" v-for="video in filteredVideos" :key="video.id">
            <video :src="'https://yannickkagou.pythonanywhere.com' + video.get_video" controls></video>
          </div>
        </div>
      </div>
  
      </div>
  
      <div class="right">
        
        <div class="posts-contain2" v-if="page.admins && page.admins.map(user => user.id).includes(userStore.user.id)">
            <PageFeedForm :page="page"/>
        </div>
  
        <div class="posts-contain">
  
          <div class="posts-menu">
  
            <h2>Posts</h2>
            <div class="menu">
              <button>Filters</button>
              <button>Manage posts</button>
            </div>
      
          </div>
  
          <div class="posts-list" v-for="post in posts" :key="post.id">
            <PageFeedItem :post="post" :page="page"/>
          </div>
  
        </div>
  
      </div>
  
    </div>
  
  </template>

<script setup>

import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { onBeforeMount,onMounted, reactive, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageFeedForm from '../components/PageFeedForm.vue';
import PageFeedItem from '../components/PageFeedItem.vue'
import { useToast } from 'vue-toast-notification';

  const toast = useToast();
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  let page = reactive ({});

  let posts = ref([])

  onBeforeMount(() => {
      userStore.initStore();
  })

  onMounted(async () => {
      await userStore.initStore();
      await getPage();
  });

  const getPage = async () => {
      await axios
          .get(`/api/pages/${route.params.id}/`)
          .then(response => {
              console.log('this page', response.data)
              Object.assign(page, response.data);
              posts.value = page.posts;
          })
          .catch(error => {
              console.log('error :', error)
          })
  };

  const filteredPhotos = computed(() => {
    let allPhotos = [];
    if (posts.value && posts.value.length) {
      for (let post of posts.value) {
        if (post.attachments) {
          allPhotos = allPhotos.concat(post.attachments);
        }
      }
    }
    return allPhotos.slice(0, 9);
  });

  const filteredVideos = computed(() => {
    let allVideos = [];
    if (posts.value && posts.value.length) {
      for (let post of posts.value) {
        if (post.attachments) {
          allVideos = allVideos.concat(post.videos);
        }
      }
    }
    return allVideos.slice(0, 9);
  });

  watch(
    () => route.params.id,
    () => {
        getPage();
    },
    { deep: true, immediate: true  }
    );

</script>
  
  <style scoped>
  
  .postmain{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #eeeeee;
  }
  
  h2{
    font-weight: bold;
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 39%;
    background-color: #fff;
  }
  .left .intro{
    width: 100%;
    padding-left: 10%;
  }
  .left .photos{
    width: 90%;
    margin: 0px auto;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 5px;
    border: none;
    margin-top: 10px;
    background-color: #eeeeee;
  }
  .left .photos .photo-card{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .left .photos .photo{
    width: 30%;
    margin-right: 2px;
  }
  .left .photos .photo img{
    width: 100%;
    height: 100px;
    object-fit: cover;
    object-position: center;
  }
  .left .photos .photo video{
    width: 100%;
    height: 100px;
    object-fit: cover;
    object-position: center;
  }
  .left button{
    background-color: #eeeeee;
    width: 90%;
    margin: 0px auto;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 5px;
    border: none;
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 59%;
    background-color: #fff;
  }
  .posts-contain2{
      width: 100%;
      margin: 0px auto;
      /* display: flex;
      flex-direction: column; */
    }
  
    .posts-contain{
      width: 80%;
      margin: 0px auto;
      display: flex;
      flex-direction: column;
    }
  
    .posts-contain .posts-menu{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .posts-contain .posts-menu .menu{
      width: 60%;
      display: flex;
      padding-left: 35%;
      align-items: center;
      justify-content: flex-end;
    }
  .posts-contain .posts-menu .menu button{
    background-color: #eeeeee;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    color: #4f4d4d;
    border: 1px solid #717171;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
  }
    .posts-contain .posts-list{
      width: 100%;
      margin: 0px auto;
    }
    button{
    border: none;
    border-radius: 6px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
    @media screen and (max-width: 900px) {
      .postmain{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #eeeeee;
    }
    .postmain .left{
      width: 95%;
    }
    .postmain .right{
      width: 95%;
    }
    }
  
  
  </style>