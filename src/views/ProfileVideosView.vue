<template>
  <div class="photos" v-if="isLoading == false">
    <h2>Videos</h2>
    <div class="photo-card" v-if="filteredVideos.length">
      <div class="photo" v-for="video in filteredVideos" :key="video.id">
        <video :src="'http://localhost:8000' + video.get_video" controls></video>
      </div>
    </div>
    <div class="photo-card" v-else>
      <h1>No Videos</h1>
    </div>
  </div>

  <div class="spin" v-else>
    <LoadingSpinner />
  </div>
</template>

<script setup>

import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted, reactive, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import LoadingSpinner from '../components/LoadingSpinner.vue'

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();

    let posts = ref([]);
    let user = reactive ({});
    let isLoading = ref(false)

    onBeforeMount(() => {
      isLoading.value = true
      userStore.initStore();
    })
    onMounted(() => {
        getFeeds();
        isLoading.value = false
    })

    const getFeeds = async () => {
        await axios
            .get(`/api/posts/profile/${route.params.id}/`)
            .then(response => {
                posts.value = response.data.posts
                user = response.data.user
            })
            .catch(error => {
                console.log('error :', error)
            })
    };

    const filteredVideos = computed(() => {
      let allVideos = [];
      for (let post of posts.value) {
        allVideos = allVideos.concat(post.videos);
      }
      return allVideos;
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
.spin{
  margin-top: 60px;
  background-color: #eee;
  height: 100vh;
  overflow: hidden;
}
.photos{
  width: 85%;
  margin: 10px auto;
  border-radius: 10px;
  padding: 5px;
  border: none;
  margin-top: 10px;
  background-color: #fff;
  min-height: 36vh;
}
.photos h2{
  padding: 10px 30px;
}
.photos .photo-card{
  width: 90%;
  flex-wrap: wrap;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.photos .photo{
  width: 33%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}
.photos .photo video{
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

</style>