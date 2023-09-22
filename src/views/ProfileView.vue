<template>

    <div class="main" v-if="isLoading == false">

        <div class="top">

            <div class="cover">
                <img :src="'http://localhost:8000' + user.get_avatar">
            </div>
    
            <div class="info">
                <img :src="'http://localhost:8000' + user.get_avatar">

                <div class="name">
                    <h1>{{ user.firstname }} {{ user.lastname }}</h1>
                    <p>{{user.friends_count}} friends</p>
                </div>
                <div class="menu" v-show="userStore.user.id === user.id">
                    <button style="background-color: #1b74e4;">
                        <i class="fa-solid fa-plus" style="color: #ffffff;"></i>
                        <p style="color: #ffffff; margin-left: 5px;">Add story</p>
                    </button>
                    <router-link :to="{name: 'p_edit', params: {id: user.id}}" class="a-edit">
                        <button>
                            <i class="fa-solid fa-pen-to-square"></i>
                            <p style="margin-left: 5px;">Edit</p>
                        </button>
                    </router-link>
                    <button @click="logout" class="logout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
                <div class="menu" v-show="userStore.user.id !== user.id">
                    <button class="friends" @click="sendFriendshipRequest" v-if="!friends.map(user => user.id).includes(userStore.user.id)">
                        <i class="fa-solid fa-thumbs-up" style="color: #7a7a7a;"></i>
                        <p style="margin-left: 5px;">Follow</p>
                        
                    </button>
                    <button class="friends" @click="unfollow"  v-else>
                        <i class="fa-solid fa-thumbs-up" style="color: #022242;"></i>
                        <p style="margin-left: 5px;">Unfollow</p>
                    </button>
                    <button @click="sendDirectMessage" class="message">
                        <i class="fa-brands fa-facebook-messenger"></i>
                        <p style="margin-left: 5px;">Message</p>
                    </button>
                    <button class="more">
                        <i class="fa-solid fa-bell"></i>
                    </button>
                </div>
                
            </div>
        
            <hr>

            <div class="sub-nav">
                <div class="menu">
                    <router-link :to="{name: 'p_posts', params: {id: user.id}}">
                        <p class="logo">Posts</p>
                    </router-link>  
            
                    <router-link :to="{name: 'friends', params: {id: user.id}}">
                        <p class="logo">Friends</p>
                    </router-link>  

                    <router-link :to="{name: 'p_photos', params: {id: user.id}}">
                        <p class="logo">Photos</p>
                    </router-link>  
            
                    <router-link :to="{name: 'p_videos', params: {id: user.id}}">
                        <p class="logo">Videos</p>
                    </router-link>  

                    <div class="logo logo2">
                        <div class="dropdown-btn" @click="toggleDropdown">
                            <p class="logoplus">More</p>
                            <i class="fa-solid fa-sort-down"></i>
                        </div>
                        <div :class="['dropdown-content', { show: isDropdownOpen }]">
                            <p>Sport</p>
                            <p>Music</p>
                            <p>Movies</p>
                            <p>Books</p>
                            <p>Likes</p>
                            <p>Groups</p>
                        </div>
                    </div>
           
                </div>

                <button class="button2"><p>...</p></button>

            </div>

        </div>

        <div class="center">

            <router-view />

        </div>

    </div>

    <div class="spin" v-else>
        <LoadingSpinner />
    </div>
   
</template>

<script setup>

import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import LoadingSpinner from '../components/LoadingSpinner.vue'

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    let isLoading = ref(false)

    userStore.initStore();

    let user = reactive ({
        id: null
    });
    let friends = ref([]);
    let isDropdownOpen = ref(false);

    function toggleDropdown() {
        isDropdownOpen.value = !isDropdownOpen.value;
    }

    // window.onclick = function(event) {
    //     if (!event.target.matches('.dropdown-btn')) {
    //         isDropdownOpen.value = false;
    //     }
    // };

    let can_send_friendship_request = ref(null)

    onBeforeMount(async () => {
        isLoading.value = true;
        await userStore.initStore();
    })
    onMounted(async () => {
        await getFeeds();
        await getFriends();
        isLoading.value = false;
    })

    const getFriends = async () => {
        await axios
            .get(`/api/friends/${route.params.id}/`)
            .then(response => {
                friends.value = response.data.friends
            })
            .catch(error => {
                console.log('error :', error)
            })
    };

     const getFeeds = async () => {
        await axios
            .get(`/api/posts/profile/${route.params.id}/`)
            .then(response => {
                Object.assign(user, response.data.user);
            })
            .catch(error => {
                console.log('error :', error)
            })
    };

    watch(
    () => route.params.id,
    () => {
        getFeeds();
    },
    { deep: true, immediate: true  }
    );

    const sendFriendshipRequest = async () => {
        await axios
            .post(`/api/friends/${user.id}/request/`)
            .then(response => {
                console.log('data: ', response.data)
                can_send_friendship_request.value = false
                
                if (response.data.message == 'request already sent'){
                    toast.error('The request has already been sent!')
                }else{
                    toast.success('The request was sent!')
                }
            })
            .catch(error => {
                console.log('error', error)
            })
    };

    const sendDirectMessage = async () => {
        console.log('sendDirectMessage')
        console.log(route.params.id)

        await axios
            .get(`/api/chat/${route.params.id}/get-or-create/`)
            .then(response => {
                console.log(response.data)

                router.push({ name: 'chat'})
            })
            .catch(error => {
                console.log('error', error)
            })
    };

    const unfollow = async () => {
        await axios
            .post(`/api/friends/${user.id}/unfollow/`)
            .then(response => {
                console.log(response.data)
                user.friends_count -= user.friends_count
            })
            .catch(error => {
                console.log('error', error)
            })
    };

    const logout = () => {
        axios
            .post(`/api/logout/`)
            .then(response =>{
                toast.error('Logout!')
                console.log(response.data);
                router.push({ name: 'login'})
            })
            .catch(error => {
                console.log(error)
            })
    };

</script>

<style scoped>
.spin{
  margin-top: 60px;
  background-color: #eee;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
}
.main{
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
}
.main::-webkit-scrollbar {
  display: none; /* Safari et Chrome basés sur WebKit */
}

.top{
    display: flex;
    flex-direction: column;
}
.top .cover{
    width: 80%;
    height: 250px;
    margin: 3px auto;
}

.top .cover img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.top .info{
    width: 80%;
    margin: 3px auto;
    display: flex;
    align-items: center;
    height: 80px;
}

.top .info img{
    margin-left: 20px;
    margin-top: -40px;
    border: 4px solid #fff;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
    margin-right: 10px;
}

.top .info .name{
    display: flex;
    flex-direction: column;
    margin-top: -10px;
}
.top .info .name h1{
    font-size: 25px;
    font-weight: bold;
    color: #000;
    width: 200px;
    margin-top: -10px;
}
.top .info .name p{
    color: #858585;
    margin-top: -17px;
}
.top .info .menu{
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: flex-end;
    gap: 2em;
}
.top .info .menu button{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    background-color: #eeeeee;
    color: #4f4d4d;
    border: 1px solid #717171;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

hr{
    width: 80%;
    margin: 3px auto;
}
.sub-nav{
    width: 80%;
    margin: 5px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #5c5b5b;
}
.sub-nav .menu{
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.sub-nav .menu .logo{
    width: 100%;
    margin-right: 25px;
    padding: 5px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.sub-nav .menu .logo:hover{
    opacity: 0.8;
}
.sub-nav .menu .logo p{
    width: 80%;
    margin: 0 auto;
    padding: 5px;
}
.sub-nav button{
    width: 10%;
    background-color: #eeeeee;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    color: #4f4d4d;
    border: 1px solid #717171;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}
/* .sub-nav .menu a.router-link-exact-active{
    color: #046767;
    text-decoration: underline;
} */
.sub-nav .menu .logo2{
    position: relative;
}
.dropdown-btn {
  cursor: pointer;
  display: flex;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  width: 1%;
  margin-left: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 9999;
  margin-top: 220px;
  text-align: left;
}
.show {
  display: flex;
  flex-direction: column;
  background-color: #eee;
  padding: 10px;
  border-radius: 10px;
}

.sub-nav .button2{
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.button2 p{
    text-align: center;
}
.center{
    width: 100%;
    background-color: #eee;
    display: flex;
    flex-direction: column;
}
/* a.router-link-active{
  border-bottom: 2px solid #3498db;
} */

a {
  text-decoration: none;
  color: inherit;
}

a:visited {
  color: inherit;
}

.router-link-exact-active {
    border-radius: 0;
    border-bottom: 2px solid #1b74e4;
}
.router-link-exact-active p{
    color: #1b74e4;
}
.a-edit{
    border-radius: 0 !important;
    border: none !important;
    border-bottom: none !important;
}
.a-edit p{
    color: inherit !important;
}

@media screen and (max-width: 900px) {
  .top .info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
  }
  .top .info .menu{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    }
    .top .info img{
    margin-top: -40px;
    margin-bottom: 10px;
}

.top .info .name{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
}
 .top .info .name h1{
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}  
.top .info .name p{
    margin-top: 10px;
    margin-bottom: 10px;
}

}

</style>