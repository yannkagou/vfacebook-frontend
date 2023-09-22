<template>
      <nav v-if="isLoading == false">

        <div class="left">
          <div class="logo">
            <router-link to="/">
              <img src="../assets/facebook_icon.png" alt="The Logo">
            </router-link>
          </div>
          <div class="search-bar" @click="goToSearch" v-show="$route.path != '/search'">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search Facebook">
          </div>
        </div>

        <div class="center">
          <div class="logo" :class="{ active: $route.path === '/' }">
            <router-link to="/">
              <i class="fa-solid fa-house"></i>
            </router-link>  
            <span class="icon-text">Home</span>
          </div>
          <div class="logo" :class="{ active: $route.path === '/video' }">
            <router-link to="/video">
              <i class="fa-solid fa-tv"></i>
            </router-link>  
            <span class="icon-text">Video</span>
          </div>
          <div class="logo" :class="{ active: $route.path === '/market' }">
            <router-link to="/market">
              <i class="fa-solid fa-store"></i>
            </router-link>
            <span class="icon-text">Marketplace</span>
          </div>
          <div class="logo logo-hidden" :class="{ active: $route.path === '/groupes' }">
            <router-link to="/groupes">
              <i class="fa-solid fa-users"></i>
            </router-link>  
            <span class="icon-text">Groupes</span>
          </div>
          <div class="logo logo-hidden1" :class="{ active: $route.path === '/games' }">
            <router-link to="/games">
              <i class="fa-solid fa-vector-square"></i>
            </router-link>
            <span class="icon-text">Games</span>
          </div>
        </div>
          
        <div class="right">
          <div class="logo1" :class="{ active1: isDropdownOpen == true }">
            <div @click="toggleDropdown" class="dropdown-btn">
              <i class="fa-solid fa-list-ul list-ul fa-first"></i>
            </div>
            <div :class="['dropdown-content', { show: isDropdownOpen }]">
              <div class="menu">
                <h1>Menu</h1>
                <div class="menu-container">
                  <div class="menu-left">
                    <div class="menu-search">
                      <i class="fa-solid fa-magnifying-glass"></i>
                      <input type="text" placeholder="Search Menu">
                    </div>
                    <div class="menu-social">
                      <h2>Social</h2>
                      <div class="menu-item">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <img class="x1b0d499 xl1xv1r" src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/XXwl2m1vjqM.png" alt="" style="height: 36px; width: 36px;">
                        <div class="menu-item-text">
                          <h2>Events</h2>
                          <p>Organize or find events and otehr things to do online or nearby.</p>
                        </div>
                      </div>
                      <router-link :to="{name:'friends', params: {id: userStore.user.id}}">
                      <div class="menu-item" @click="toggleDropdown">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -296px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                        <div class="menu-item-text">
                          <h2>Friends</h2>
                          <p>Search for friends or people you may know.</p>
                        </div>
                      </div>
                      </router-link>
                      <router-link :to="{name:'pagelist'}">
                      <div class="menu-item" @click="toggleDropdown">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -111px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                        <div class="menu-item-text">
                          <h2>Pages</h2>
                          <p>Discover and connect with businesses on Facebook.</p>
                        </div>
                      </div>
                      </router-link>
                      <div class="menu-item">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -37px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                        <div class="menu-item-text">
                          <h2>Groups</h2>
                          <p>Connect with people who share your interests.</p>
                        </div>
                      </div>
                      <div class="menu-item">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <img draggable="false" height="36" width="36" alt="" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png">
                        <div class="menu-item-text">
                          <h2>Feeds</h2>
                          <p>See the most recent posts from your friends, groups, Pages and more.</p>
                        </div>
                      </div>
                      <div class="menu-item">
                        <img draggable="false" height="36" width="36" alt="" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <div class="menu-item-text">
                          <h2>New Feeds</h2>
                          <p>See relevant posts from people and Pages you follow.</p>
                        </div>
                      </div>
                    </div>

                    <hr>

                    <div class="menu-social">
                      <h2>Entertainment</h2>
                      <div class="menu-item">
                        <img class="x1b0d499 xl1xv1r" src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/eVgQ0NIygAW.png" alt="" style="height: 36px; width: 36px;">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <div class="menu-item-text">
                          <h2>Gaming Video</h2>
                          <p>Watch and connect with your favorite games and streamers.</p>
                        </div>
                      </div>
                      <div class="menu-item">
                        <img class="x1b0d499 xl1xv1r" src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/Tvf-JvODx7o.png" alt="" style="height: 36px; width: 36px;">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <div class="menu-item-text">
                          <h2>Play Games</h2>
                          <p>Play your favorite games.</p>
                        </div>
                      </div>
                      <router-link :to="{name:'video'}">
                      <div class="menu-item" @click="toggleDropdown">
                        <img class="x1b0d499 xl1xv1r" src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/8L2T81pQAIa.png" alt="" style="height: 36px; width: 36px;">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <div class="menu-item-text">
                          <h2>Video</h2>
                          <p>A video destination personalized to your interests and connections.</p>
                        </div>
                      </div>
                      </router-link>
                    </div>

                    <hr>

                    <div class="menu-social">
                      <h2>Shopping</h2>
                      <div class="menu-item">
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <img draggable="false" height="36" width="36" alt="" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/GJ4EaivDaSj.png">
                        <div class="menu-item-text">
                          <h2>Orders and Payments</h2>
                          <p>A seamless, secure way to pay on the apps you already use.</p>
                        </div>
                      </div>
                      <router-link to="/market">
                      <div class="menu-item" @click="toggleDropdown">
                        <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -407px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                        <!-- <i class="fa-solid fa-list-ul list-ul"></i> -->
                        <div class="menu-item-text">
                          <h2>Marketplace</h2>
                          <p>Buy and sell in your community.</p>
                        </div>
                      </div>
                      </router-link>
                    </div>

                  </div>

                  <div class="menu-right">
                    <h1><b>Create</b></h1>
                    <div class="menu-right-container">
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </div>
                        <h2>Post</h2>
                      </div>
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-book-open"></i>
                        </div>
                        <h2>Story</h2>
                      </div>
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-clapperboard"></i>
                        </div>
                        <h2>Reel</h2>
                      </div>
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <h2>Life Event</h2>
                      </div>
                      <hr>
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-flag"></i>
                        </div>
                        <h2>Page</h2>
                      </div>
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-bullhorn"></i>
                        </div>
                        <h2>Ad</h2>
                      </div>
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-users"></i>
                        </div>
                        <h2>Group</h2>
                      </div>
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-calendar-days"></i>
                        </div>
                        <h2>Event</h2>
                      </div>
                      <div class="menu-right-item">
                        <div class="logo-create">
                          <i class="fa-solid fa-cart-plus"></i>
                        </div>
                        <h2>Marketing Listing</h2>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            </div>
          <div class="logo" :class="{ active: $route.path === '/chat' }">
            <router-link to="/chat">
                <i class="fa-brands fa-facebook-messenger"></i>
            </router-link>  
          </div>
          <div class="logo2" :class="{ active: $route.path === '/notifications' }">
            <router-link to="/notifications">
              <div class="notif">
                <p v-if="notifications.length"> {{ unreadNotifs }} </p>
                <p v-else>0</p>
                <i class="fa-solid fa-bell bell"></i>
              </div>
            </router-link>  
          </div>
          <router-link v-if="userStore.user.id !== null && userStore.user.id !== undefined" :to="{name:'p_posts', params: {id: userStore.user.id}}">
            <img :src="'https://yannickkagou.pythonanywhere.com' + userStore.user.avatar">
          </router-link>
        </div>

      </nav>

      <nav class="skeleton"  v-else>
        <div class="skeleton-avatar"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
       
      </nav>

    <div>
      <router-view />
    </div>

</template>

<script setup>

import { onBeforeMount, onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toast-notification'

  const userStore = useUserStore();

  const toast = useToast();

  const route = useRoute();

  const router = useRouter();

  let isLoading = ref(false)
  let notifications = ref([])
  let isDropdownOpen = ref(false);

  onBeforeMount(async () => {
        await userStore.initStore();
  })

  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
  }

  // window.onclick = function(event) {
  //   if (!event.target.matches('.dropdown-btn')) {
  //     isDropdownOpen.value = false;
  //   }
  // };

  const goToSearch = () => {
    router.push('/search')
  }

  onMounted(async () => {
    isLoading.value = true
    try {
      const response = await axios.get('/api/user/', {
        withCredentials: true
      });
      // console.log('user information', response.data)
      // getNotifications();
      isLoading.value = false
    } catch (error) {
      console.error('error');
      router.push('/login')
    }
  },
  );
  onMounted(() => {
    getNotifications()
  })
  const getNotifications = async () => {
      try {
      const response = await axios.get('/api/notifications/')
      console.log('notifications', response.data)
      notifications.value = response.data
    } catch (error) {
      console.log('Error:', error)
    }
  };

  const unreadNotifs = computed(() => {
    return notifications.value.filter(notification => !notification.is_read).length
  })

</script>

<style scoped>

.skeleton {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
}

.skeleton-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ddd;
}

.skeleton-content {
  width: 90%;
  display: block;
  justify-content: flex-start;
  margin-left: 40px;
}

.skeleton-line {
  width: 90%;
  justify-content: flex-start;
  height: 10px;
  margin-bottom: 10px;
  background-color: #ddd;
}

/* Animation */
@keyframes skeleton-animation {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.3;
  }
}

.skeleton-line:nth-child(1) {
  width: 80%;
}

.skeleton-line:nth-child(2) {
  width: 60%;
}

.skeleton-line:nth-child(3) {
  width: 40%;
}

.skeleton-line {
  animation: skeleton-animation 1.5s infinite;
}
nav{
    width: 100%;
    height: 60px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    z-index: 999;
    top: 0;
    border-bottom: 1px solid #eee;
}
nav .left{
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
nav .left .logo img{
    width: 40px;
    margin: 5px 0;
    cursor: pointer;
}

nav .left .search-bar{
    width: 170px;
    height: 40px;
    background-color: #eeeeee;
    border-radius: 30px;
    padding: 0 10px;
    margin-left: 10px;
    position: relative;
    left: 15px;
}

nav .left .search-bar i{
    line-height: 40px;
    font-size: 15px;
    color: #919191;
    margin-right: 5px;
}

nav .left .search-bar input{
    background-color: transparent;
    outline: none;
    border: 0;
    font-size: 12px;
    width: 100px;
}

nav .center{
  width: 60%;
  margin-left: 15px;
  display: flex;
}

nav .center .logo{
    width: 100%;
    height: 40px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

nav .center .logo i{
    margin: 0 45px;
    padding-top: 17px;
    font-size: 22px;
    color: #616161;
}

nav .center .logo:hover{
    background-color: #eeeeee;
}
nav .center .icon-text {
    font-size: 13px;
    position: relative;
    background-color: #424242;
    color: #fff;
    top: 35%;
    opacity: 0;
}

nav .center .logo:hover .icon-text {
opacity: 0.9;
}

nav .right{
  width: 20%;
  display: flex;
  /* margin-left: 50px; */
  align-items: center;
  justify-content: space-around;
}

nav .right .logo{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee;
    margin: 0 3px;
}

nav .right .logo i{
    margin: 0 45px;
    font-size: 22px;
    color: #616161;
}

nav .right .logo:hover{
    background-color: #eeeeee;
}
nav .right .logo1{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #eeeeee;
    margin: 0 3px;
}
nav .right .logo1:hover{
    background-color: #eeeeee;
}
nav .right .logo1 i{
    margin: 0 45px;
    font-size: 22px;
    color: #616161;
    margin-top: 10px;
}
.dropdown-btn {
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  width: 45%;
  margin-right: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 9999;
  margin-top: 55px;
  
}
.show {
  display: flex;
  flex-direction: column;
  background-color: #eee;
  padding: 10px;
  border-radius: 10px;
}
nav .right .logo1 .menu{
  display: flex;
  flex-direction: column;
}
nav .right .logo1 .menu .menu-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
nav .right .logo1 .menu .menu-container .menu-left{
  width: 60%;
  background-color: #fff;
  border-radius: 10px;
  height: 80vh;
  overflow-y: scroll;
}
.dropdown-content .menu-left::-webkit-scrollbar{
    display: none;
}
.menu-search{
    width: 90%;
    margin: 10px auto;
    height: 35px;
    background-color: #eeeeee;
    border-radius: 20px;
    padding: 0 2px;
}

.menu-search i{
    line-height: 15px !important;
    font-size: 15px !important;
    color: #919191;
    margin: 0 8px !important;
    color: #616161;
    margin-top: 10px !important;
}

.menu-search input{
    background-color: transparent;
    outline: none;
    border: 0;
    font-size: 16px;
    width: 100px;
}
nav .right .logo1 .menu .menu-container .menu-left .menu-social{
  width: 90%;
  margin: 10px auto;
}
nav .right .logo1 .menu .menu-container .menu-left .menu-social .menu-item{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
nav .right .logo1 .menu .menu-container .menu-left .menu-social .menu-item i{
  margin: 0;
  margin-right: 10px;
  margin-top: 2px;
  font-size: 15px;
  width: 25px;
}


nav .right .logo1 .menu .menu-container .menu-left .menu-social .menu-item img{
    width: 25px;
    height: 25px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    line-height: 20px;
    margin: 8px 15px 8px 0;
    cursor: pointer;
}
nav .right .logo1 .menu .menu-container .menu-left .menu-social .menu-item .menu-item-text{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
}
nav .right .logo1 .menu .menu-container .menu-left .menu-social .menu-item .menu-item-text h2{
  margin: 0;
  margin-bottom: 3px;
  font-weight: 600;
  color: #050505;
  font-size: 18px;
}
nav .right .logo1 .menu .menu-container .menu-left .menu-social .menu-item .menu-item-text p{
  margin: 0;
  margin-bottom: 3px;
  font-weight: 400;
  color: #65676B;
  font-size: 14px;
}
nav .right .logo1 .menu hr{
  width: 90%;
  margin: 0 auto;
  background-color: #9a9a9b;
}
nav .right .logo1 .menu .menu-container .menu-right{
  width: 35%;
  background-color: #fff;
  border-radius: 10px;
  height: 76vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
.menu-right::-webkit-scrollbar{
    display: none;
}
nav .right .logo1 .menu .menu-container .menu-right h1{
  margin-left: 6%;
  margin-bottom: 5px;
}
nav .right .logo1 .menu .menu-container .menu-right .menu-right-container{
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 5px auto;
}
nav .right .logo1 .menu .menu-container .menu-right .menu-right-container .menu-right-item{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5px;
  font-size: 12px;
  font-weight: 400;
}
nav .right .logo1 .menu .menu-container .menu-right .menu-right-container .menu-right-item:hover{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #ddd;
  border-radius: 10px;
}
nav .right .logo1 .menu .menu-container .menu-right .menu-right-item .logo-create{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    background-color: #eee;
}
nav .right .logo1 .menu .menu-container .menu-right .menu-right-item .logo-create i{
    margin: 0 45px;
    font-size: 22px;
    color: #343434;
}

nav .right .logo1 .menu .menu-container .menu-right .menu-right-item .logo-create:hover{
    background-color: #eeeeee;
}
nav .right .logo2{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #eeeeee;
    margin: 0 3px;
}
nav .right .logo2 .notif{
  display: flex;
  align-items: center;
  flex-direction: column;
}

nav .right .logo2 i{
  margin: 0 45px;
  margin-top: -28%;
  padding-top: 17px;
  font-size: 22px;
  color: #616161;
}
nav .right .logo2 p{
    margin-top: -10px;
    margin-left: 30%;
    font-size: 16px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #fff;
    background: #fa6161;
    font-weight: bold;
    text-align: center;
}

nav .right .icon-text {
  font-size: 16px;
  position: relative;
  background-color: #424242;
  color: #fff;
  top: 35%;
  opacity: 0;
}

nav .right .logo:hover .icon-text {
opacity: 0.9;
}

nav .right img{
    width: 45px;
    height: 45px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin-left: 10px;
    line-height: 45px;
    cursor: pointer;
}


.center .active{
    border-radius: 0 !important;
    border-bottom: 2px solid #3498db;
}
.right .active{
  background-color: #ecf3ff !important;
}
.right .active1{
  background-color: #ecf3ff !important;
}
.active .fa-solid{
    margin: 0 45px;
    padding-top: 17px;
    font-size: 22px;
    color: #3498db !important;
}
.active1 .fa-first{
    margin: 0 45px;
    padding-top: 1px;
    font-size: 22px;
    color: #3498db !important;
}
.active .fa-brands{
    margin: 0 45px;
    font-size: 22px;
    color: #3498db !important;
}

.active:hover{
    background-color: #fff;
}
a:visited {
  color: inherit;
  text-decoration: none;  
}
a:-webkit-any-link {
    cursor: pointer;
    text-decoration: none;
}

.fade-enter-from, .fade-leave-to{
  opacity: 0;
}

.fade-enter-active, .fade-leave-active{
  transition: opacity 0.5s ease-out;
}


@media screen and (max-width: 1100px) {
  /* nav .left .search-bar{
    width: 20px;
  } */
  nav .left .search-bar input{
    display: none;
  }
  nav .center{
    width: 60%;
  }
  nav .center .logo-hidden1{
    display: none;
  }
  nav .right{
    width: 20%;
    align-items: center;
    justify-content: space-between;
  }
  nav .right .logo1{
    display: none;
  }
  nav .right .show{
    display: none;
  }
}

@media screen and (max-width: 800px) {
  nav .left .search-bar{
    width: 100px;
  }
  nav .left .search-bar input{
    display: none;
  }
  nav .center {
    width: 55%;
  }
  nav .center .logo-hidden{
    display: none;
  }
  nav .right{
    width: 23%;
    align-items: center;
    justify-content: space-between;
}
nav .right .logo i{
    margin: 0 15px;
}
}


</style>