<template>
  <div class="postmain">

    <div class="left sticky-left">

      <div class="intro">
        <h2>Intro</h2>
      </div>

      <button>Add bio</button>
      <button> Email : {{ user.email }}</button>
      <button> Birthday : {{ user.birthday }}</button>
      <button> Tel : {{ user.tel }}</button>
      <button>Edit details</button>
      <button>Add hobbies</button>
      <button>Add features</button>

      <div class="photos">
        <div class="photos-see">
          <h2>Photos</h2>
          <h4><router-link :to="{name: 'p_photos', params: {id: route.params.id}}">See All</router-link></h4>
        </div>

        <div class="photo-card">
          <div class="photo" v-for="photo in filteredPhotos" :key="photo.id">
            <img :src="'https://yannickkagou.pythonanywhere.com' + photo.get_image">
          </div>
        </div>
      </div>

      <div class="photos">
        <div class="photos-see">
          <h2>Videos</h2>
          <h4><router-link :to="{name: 'p_videos', params: {id: route.params.id}}">See All</router-link></h4>
        </div>

        <div class="photo-card">
          <div class="photo" v-for="video in filteredVideos" :key="video.id">
            <video :src="'https://yannickkagou.pythonanywhere.com' + video.get_video" controls></video>
          </div>
        </div>
      </div>

    </div>

    <div class="right">

      <FeedForm :posts="posts" v-if="user.id === userStore.user.id"/>

      <div class="posts-contain">

        <div class="posts-menu">

          <h2>Posts</h2>
          <div class="menu">
            <button>Filters</button>
            <button>Manage posts</button>
          </div>
    
        </div>

        <div class="posts-list" v-for="post in posts" :key="post.id">
          <FeedItem :post="post" :posts="posts"></FeedItem>
        </div>

      </div>

    </div>

  </div>

</template>

<script setup>

import FeedItem from '../components/FeedItem.vue';
import FeedForm from '../components/FeedForm.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted, reactive, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();

    let posts = ref([]);
    let user = reactive ({
      id: null
    });

    onBeforeMount(async () => {
        await userStore.initStore();
    })
    onMounted(async () => {
        await getFeeds();
    })

    const getFeeds = async () => {
        await axios
            .get(`/api/posts/profile/${route.params.id}/`)
            .then(response => {
                posts.value = response.data.posts;
                // user = response.data.user
                Object.assign(user, response.data.user);
                // console.log('profile post', posts.value)
                // console.log('profileUser ', user)
            })
            .catch(error => {
                console.log('error :', error)
            })
    };

    const filteredPhotos = computed(() => {
      let allPhotos = [];
      for (let post of posts.value) {
        allPhotos = allPhotos.concat(post.attachments);
      }
      return allPhotos.slice(0, 9);
    });

    const filteredVideos = computed(() => {
      let allVideos = [];
      for (let post of posts.value) {
        allVideos = allVideos.concat(post.videos);
      }
      return allVideos.slice(0, 9);
    });

    watch(
    () => route.params.id,
    () => {
        getFeeds();
    },
    { deep: true, immediate: true  }
    );

</script>

<style scoped>

.postmain{
  width: 85%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
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
  border-radius: 10px;
  height: 96vh;
  overflow: hidden;
  overflow-y: scroll;
}
.left::-webkit-scrollbar {
  display: none; /* Safari et Chrome basés sur WebKit */
}
.sticky-left {
  position: sticky;
  top: 0;
  overflow-y: auto;
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
.left .photos .photos-see{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left .photos .photos-see h4{
  margin-right: 10px;
}
.left .photos .photo-card{
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left .photos .photo{
  width: 33%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
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
  border-radius: 10px;
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
a {
  text-decoration: none; 
  color: inherit;
}

a:visited {
  color: inherit;
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