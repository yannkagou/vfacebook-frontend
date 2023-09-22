<template>

  <div class="friend-section">

    <div class="section-heading">

      <h2 class="left" @click="OpenShowFriends">Friends</h2>

      <div class="right">
        <div class="search-bar">
          <i class="fa-solid fa-magnifying-glass" @click="submitSearch"></i>
          <!-- <form @submit.prevent="submitSearch"> -->
              <input type="text" placeholder="Search" v-model="searchQuery">
          <!-- </form> -->
        </div>
        <p v-show="userStore.user.id === user.id" @click="CloseShowFriends">Friends Requests</p>
        <p v-show="userStore.user.id === user.id">Find Friends</p>
        <button class="more" v-show="userStore.user.id === user.id">...</button>
      </div>

    </div>

    <div v-show="friends.length>0 && showFriends" class="friend-item">

      <div class="card" v-for="friend in friends" :key="friend.id">

        <div class="head">

          <router-link :to="{ name: 'p_posts', params: { 'id': friend.id } }">
            <img :src=" 'https://yannickkagou.pythonanywhere.com' + friend.get_avatar">
          </router-link>

          <p><strong>{{ friend.firstname }} {{ friend.lastname }}</strong></p>

        </div>
        
        <button>...</button>

      </div>

    </div>
      
    <div class="request" v-show="showFriends==false">
      
      <div class="request-good" v-if="friendshipRequests.length>0">

        <h2 class="request-heading">Friendship Requests</h2>

        <div class="friend-request-item" v-for="friendshipRequest in friendshipRequests" :key="friendshipRequest.id">

          <div class="friend-request-item-head">
            <p>
              <strong>
                <router-link :to="{ name: 'p_posts', params: { 'id': friendshipRequest.created_by.id } }">{{ friendshipRequest.created_by.firstname }}</router-link>
              </strong>
            </p>
            <p>{{ friendshipRequest.created_by.friends_count }} Friends</p>
          </div>

          <div class="friend-request-buttons">
            <button class="accept-button" @click="handleRequest('accepted', friendshipRequest.created_by.id)">Accept</button>
            <button class="reject-button" @click="handleRequest('rejected', friendshipRequest.created_by.id)">Reject</button>
          </div>
          
        </div>

        <hr>

      </div>
      <div class="request-empty" v-else>
        <h2>No Friends Request</h2>
      </div>
    
    </div>

  </div>

</template>
  
  <script setup>
  import axios from 'axios';
  import { useUserStore } from '@/stores/user'
  import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  import { useToast } from 'vue-toast-notification';

  const toast = useToast();
  
  const userStore = useUserStore();
  const route = useRoute();

  let searchQuery = ref("")
  let user = reactive({});
  let friendshipRequests = ref([]);
  let friends = ref([]);
  let posts = ref([])
  let showFriends = ref(true)
  let isLoading = ref(false)

  function CloseShowFriends () {
    showFriends.value = false
  }

  function OpenShowFriends () {
    showFriends.value = true
  }

  console.log(showFriends.value)

  const submitSearch = () => {
    friends.value = friends.value.filter(friend => {
    const fullName = `${friend.firstname} ${friend.lastname}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  }

  onBeforeMount ( async () =>{
    await userStore.initStore();
  });

  onMounted(() => { 
    getFriends();
  });

  watch(
    () => route.params.id,
    () => {
      getFriends();
      // handleRequest();
    },
    { deep: true, immediate: true  }
    );
  
  async function getFriends() {
    await axios
      .get(`/api/friends/${route.params.id}/`)
      .then(response => {
        console.log('data: ', response.data)
        friendshipRequests.value = response.data.requests
        friends.value = response.data.friends
        user = response.data.user
      })
      .catch(error => {
        console.log('error :', error)
      })
  };
  
  async function handleRequest(status, id) {
    console.log('status: ', status)
    await axios
      .post(`/api/friends/${id}/${status}/`)
      .then(response => {
        console.log('data: ', response.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  </script>
  
<style scoped>

  .friend-section {
    width: 85%;
    margin: 10px auto;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    min-height: 36vh;
  }

  .friend-section .section-heading{
    width: 95%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .friend-section .section-heading h2{
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
  }
  .friend-section .section-heading .right{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .friend-section .section-heading .search-bar{
    width: 130px;
    height: 40px;
    background-color: #eeeeee;
    border-radius: 30px;
    padding: 0 10px;
    margin-right: 10px;
  }

  .friend-section .section-heading .search-bar i{
    line-height: 40px;
    font-size: 19px;
    color: #919191;
    margin-right: 5px;
  }

  .friend-section .section-heading .search-bar input{
    background-color: transparent;
    outline: none;
    border: 0;
    font-size: 16px;
    padding: 0px 5px;
    width: 80px;
  }
  .friend-section .section-heading .right p{
    color: #1b74e4;
    font-weight: bold;
    font-size: .9375rem;
    margin-right: 20px;
    cursor: pointer;
  }
  .friend-section .section-heading button{
      background-color: gray;
      color: #000;
      margin-right: 5px;
  }

  .friend-item{
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 1em;
  }
  .card {
    display: flex;
    flex-basis: 48%;
    margin-bottom: 5px;
    align-items: center;
    justify-content: space-around;
    height: 80px;
  }
  
  .card .head {
    display: flex;
    align-items: center;
    width: 70%;
    padding: 5px;
  }
  .card .head img{
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
    object-position: center;
  }
  .card .head p{
    font-size: 16px;
  }
  .card button{
    width: 10%;
    padding: 2px;
  }
  /* .request {
    width: 100%;
  } */
  .request-good {
    margin-top: 20px;
  }
  .request-empty {
    margin-top: 40px;
  }
    
  .request-heading {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .friend-request-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .friend-request-item-head{
    display: flex;
    flex-direction: column;
  }
  
  .friend-request-buttons {
    display: flex;
    margin-left: 10px;
  }
  
  .accept-button, .reject-button {
    margin-right: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .accept-button {
    background-color: #42b72a;
    color: #fff;
  }
  
  .reject-button {
    background-color: #e71d36;
    color: #fff;
  }
  
  hr {
    border: 0;
    border-top: 1px solid #ccc;
    margin: 10px 0;
    width: 100%;
  }
  button{
  border: none;
  border-radius: 6px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

  @media screen and (max-width: 800px) {
    .card {
    height: 60px;
  }

  .card .head img{
    width: 30px;
    height: 30px;
  }
  }
</style>

