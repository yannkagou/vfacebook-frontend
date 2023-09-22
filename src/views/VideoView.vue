<template>

  <div class="container" v-if="isLoading == false">

    <div class="main" v-if="shuffledPosts.length">

        <div class="videos-list" v-for="post in shuffledPosts" :key="post.id">

          <div class="video" v-if="post.isPagePost && post.videos.length">
            <PageFeedItem :post="post" :page="post.page"/>
          </div>
        
          <div class="video" v-if="!post.isPagePost && post.videos.length">
              <FeedItem :post="post" :posts="posts"/>
          </div>
      
        </div>
    </div>

    <div class="main2" v-else>
      <h3>We didn't find any results</h3>
    </div>

  </div>

  <div v-else>
    <LoadingSpinner />
  </div>

</template>

<script setup>
import axios from 'axios'
import FeedItem from '../components/FeedItem.vue'
import PageFeedItem from '../components/PageFeedItem.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted, onBeforeMount, computed, reactive } from 'vue'
import { useToast } from 'vue-toast-notification';
import LoadingSpinner from '../components/LoadingSpinner.vue'

  const toast = useToast();
  const userStore = useUserStore();
  let posts = ref([]);
  let pages = ref([]);
  let isLoading = ref(false);

  onBeforeMount ( async () =>{
    await userStore.initStore();
  });

  onMounted ( async () =>{
    await getFeed();
    await getPages();
   });

const getFeed = async () => {
  isLoading = true
  await axios
    .get('/api/posts/')
    .then(response => {
      posts.value = response.data
      isLoading = false;
    })
    .catch(error => {
      console.log('error', error)
    })
};

const getPages = async () => {
  isLoading = true
  await axios
      .get(`/api/pages/profile/${userStore.user.id}/`)
      .then(response => {
          pages.value = response.data.pages;
          isLoading = false;
      })
      .catch(error => {
          console.log('error :', error)
      })
  };

  const shuffledPosts = computed(() => {
    const allPosts = [
      ...posts.value
        .filter(post => post.videos.length > 0)
        .map(post => ({ ...post, isPagePost: false })),
      ...pages.value.flatMap(page =>
        page.posts.filter(post => post.videos.length > 0)
          .map(post => ({ ...post, page, isPagePost: true }))
      )
    ];
    return shuffleArray(allPosts);
  });

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
       

</script>

<style scoped>
.container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
}
.main{
    width: 100%;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main2{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.videos-list{
  width: 60%;
  margin: 5px auto;
}
.video{
  width: 100%;
  margin-bottom: 5px;
}
/* .spinner{
  display: flex;
  align-items: center;
  justify-content: center;
} */
</style>
