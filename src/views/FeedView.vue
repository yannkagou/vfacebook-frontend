<template>
    <div class="main" v-if="isLoading == false">
        <div class="left">
            <router-link :to="{name:'p_posts', params: {'id': userStore.user.id}}">
                <div class="logo">
                    <img :src="'http://localhost:8000' + userStore.user.avatar" alt="">
                    <p>{{userStore.user.firstname}} {{userStore.user.lastname}}</p>
                </div>
            </router-link>
            <router-link :to="{name:'friends', params: {'id': userStore.user.id}}">
                <div class="logo">
                    <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -296px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                    <p>Friends</p>
                </div>
            </router-link>
            <div class="logo">
                <img draggable="false" height="36" width="36" alt="" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png">
                <p>Feeds</p>
            </div>
            <div class="logo">
                <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -37px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                <p>Groups</p>
            </div>
            <div class="logo">
                <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -407px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                <p>Marketplace</p>
            </div>
            <router-link :to="{name:'video'}"> 
                <div class="logo">
                    <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -518px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                    <p>Video</p>
                </div>
            </router-link>
            <div v-show="seemore == false">
                <div @click="more" class="logo">
                <i class="fa-solid fa-angle-down"></i>
                <p>See more</p>
                </div>
            </div>
            <div v-if="seemore">

                <div class="logo">
                    <!-- <i class="fa-solid fa-tv"></i> -->
                    <img draggable="false" height="36" width="36" alt="" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/CwKNCefmHON.png">
                    <p>Ad Center</p>
                </div>
                <div class="logo">
                    <!-- <i class="fa-solid fa-tv"></i> -->
                    <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/sxyvEVe6uXa.png&quot;); background-position: 0px 0px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                    <p>Messenger</p>
                </div>
                <div class="logo">
                    <!-- <i class="fa-solid fa-tv"></i> -->
                    <img draggable="false" height="36" width="36" alt="" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/GJ4EaivDaSj.png">
                    <p>Orders and Payments</p>
                </div>
                <router-link :to="{name:'pagelist'}"> 
                    <div class="logo">
                        <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -111px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                        <p>Pages</p>
                    </div>
                </router-link>
                <div class="logo">
                    <!-- <i class="fa-solid fa-tv"></i> -->
                    <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -74px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                    <p>Play Games</p>
                </div>
                <div class="logo">
                    <!-- <i class="fa-solid fa-tv"></i> -->
                    <i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png&quot;); background-position: 0px -185px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i>
                    <p>Saved</p>
                </div>

                <div @click="less" class="logo">
                    <i class="fa-solid fa-angle-up"></i>
                    <p>See less</p>
                </div>
            </div>
            
        </div>

            

        <div class="center">

            <div class="stories">

                <StoryForm :stories="stories"/>

                <div v-if="stories.length" class="all-stories">

                    <div class="stories-list" v-for="user in users" :key="user.id">

                        <div class="story-card">

                            <img :src=" 'http://localhost:8000' + user.get_avatar" class="story-icon" @click="toastShowStory">

                            <p>{{ user.firstname }}</p>

                            <Swiper :slides-per-view="1" navigation v-if="stories.length" class="stories-list-user" v-show="showStory">

                                <swiper-slide class="thestories" v-for="story in stories" :key="story.id">

                                    <div class="thestory" v-if="story.created_by.id === user.id">

                                        <StoryItem :story="story" :show-story="showStory" :stories="stories" @toast-showStory="toastShowStory"/>

                                    </div>

                                </swiper-slide>

                            </Swiper>

                        </div>

                    </div>

                    <div class="stories-list" v-for="page in pages" :key="page.id">

                        <div class="story-card" v-if="page.stories.length">

                            <img :src=" 'http://localhost:8000' + page.cover" class="story-icon" @click="toastShowPageStory">

                            <p>{{ page.name }}</p>

                            <Swiper :slides-per-view="1" navigation class="stories-list-user" v-show="showPageStory">

                                <swiper-slide class="thestories" v-for="story in page.stories" :key="story.id">

                                    <div class="thestory">

                                        <PageStoryItem :story="story" :showStory="showPageStory" :page="page" :stories="page.stories" @toast-showStory="toastShowPageStory"/>

                                    </div>

                                </swiper-slide>

                            </Swiper>

                        </div>

                    </div>
        
                </div>

            </div>
            
            <FeedForm :posts="posts"/>

            <div>
                <div class="posts-list" v-for="post in shuffledPosts" :key="post.id">
                <template v-if="post.isPagePost">
                    <PageFeedItem :post="post" :page="post.page"/>
                </template>
                <template v-else>
                    <FeedItem :post="post" :posts="posts"/>
                </template>
                </div>
            </div>
      
        </div>

        <div class="right">
                
            <div class="first-wrapper">
        
                <div class="page">
        
                <h2>Your Pages and profiles</h2>
                <div class="menu">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
        
                </div>
                
                <router-link :to="{name:'pagelist'}" v-if="!pages.length"> 
                    <div class="page-img">
                        <img src="../assets/facebook_icon.png">
                        <p>Suscribe to a Page</p>
                    </div>
                </router-link>
                <router-link :to="{name:'page_posts', params:{'id': pages[0].id}}" v-else>
                    <div class="page-img">
                        <img :src="'http://localhost:8000' + pages[0].cover">
                        <p>{{pages[0].name}}</p>
                    </div>
                </router-link>
                <div class="page-icon">
                <i class="fa-regular fa-bell"></i>
                <p v-if="notifications.length"> {{ unreadNotifs }} Notifications</p>
                <p v-else>0 Notification</p>
                </div>
        
                <div class="page-icon">
                <i class="fa-solid fa-bullhorn"></i>
                <p>Create promotion</p>
                </div>
        
            </div>
        
            <hr>
        
            <div class="second-wrapper">
        
                <h2>Birthdays</h2>
        
                <div class="img-tag">
        
                    <img src="../assets/facebook_icon.png">
                    <p><span>Nathalia Kagou </span>and<span> 2 others </span>have birthdays today</p>
        
                </div>
        
            </div>
        
            <hr>
        
            <div class="third-wrapper">
        
                <div class="contact-tag">
        
                    <h2>Friends</h2>
            
                    <div class="contact-icon">
            
                        <i class="fa-solid fa-video"></i>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <i class="fa-solid fa-ellipsis"></i>
            
                    </div>
        
                </div>
        
                <div v-if="friends.length">
                
                    <div class="contact" v-for="friend in friends" :key="friend.id">
                        <router-link :to="{name:'p_posts', params: {'id': friend.id}}"> <img :src="'http://localhost:8000' + friend.get_avatar"> </router-link>
                        <p>{{ friend.firstname }} {{ friend.lastname }}</p>
                    </div> 
                    
                </div>
                <div v-else>
                    <h4>No Friends</h4>
                </div>

                <div class="request">

                    <h2>Friendship Requests</h2>

                    <div v-if="friendshipRequests.length">

                        <div class="friend-request-item" v-for="friendshipRequest in friendshipRequests" :key="friendshipRequest.id">

                            <div class="friend-request-item-head">
                                <router-link :to="{name:'p_posts', params: {'id': friendshipRequest.created_by.id}}"> 
                                    <img :src="'http://localhost:8000' + friendshipRequest.created_by.get_avatar"> 
                                </router-link>
                                <div class="friend-request-item-body">
                                    <p>
                                        <strong>
                                            <router-link :to="{ name: 'p_posts', params: { 'id': friendshipRequest.created_by.id } }">{{ friendshipRequest.created_by.firstname }} {{ friendshipRequest.created_by.lastname }}</router-link>
                                        </strong>
                                    </p>
                                    <p class="sub-title">{{ friendshipRequest.created_by.friends_count }} Friends</p>
                                    <p class="date">{{ friendshipRequest.created_at_formatted }}</p>
                                </div> 
                            </div>

                            <div class="friend-request-buttons">
                                <button class="accept-button" @click="handleRequest('accepted', friendshipRequest.created_by.id)">Accept</button>
                                <button class="reject-button" @click="handleRequest('rejected', friendshipRequest.created_by.id)">Reject</button>
                            </div>
                    
                        </div>
                    </div>
                    <div v-else>
                        
                        <h4>No friendshipRequest</h4>

                    </div>

                </div>

                <hr>
            
            </div>
        
        </div>
    </div>

    <div class="spin" v-else>
        <LoadingSpinner />
    </div>
    
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios'
import FeedItem from '../components/FeedItem.vue'
import FeedForm from '../components/FeedForm.vue'
import StoryForm from '../components/StoryForm.vue'
import StoryItem from '../components/StoryItem.vue'
import PageFeedItem from '../components/PageFeedItem.vue'
import PageStoryItem from '../components/PageStoryItem.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted, onBeforeMount, computed, reactive } from 'vue'
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

    const toast = useToast();
    const router = useRouter();
    const userStore = useUserStore();
    let stories = ref([]);
    let posts = ref([]);
    let user = reactive ({
        id: null,
    })
    let users = ref([]);
    let friends = ref([]);
    let friendshipRequests = ref([]);
    let pages = ref([]);
    let seemore = ref(false);
    let showStory = ref(false);
    let showPageStory = ref(false);
    let notifications = ref([]);
    let isLoading = ref(false)

    const more = () =>{
        seemore.value = true;
    }

    const less = () =>{
        seemore.value = false;
    };

    const toastShowStory = () =>{
        showStory.value = !showStory.value;
    }
    const toastShowPageStory = () =>{
        showPageStory.value = !showPageStory.value;
    }

    onBeforeMount ( async () =>{
        isLoading.value = true
        await userStore.initStore();
        // await getFeed();
        // console.log('userStore.user.id:', userStore.user.id);
        // await getFriends();
    });

    onMounted ( async () =>{
        await getFeed();
        await getPages();
        await getStory();
        await getFriends();
        await getNotifications();
        isLoading.value = false
    });

    const getFeed = async () => {
        await axios
            .get('/api/posts/')
            .then(response => {
                console.log('posts', response.data)
                posts.value = response.data
            })
            .catch(error => {
                console.log('error', error)
            })
    };

    const getNotifications = async () => {
        await axios
            .get('/api/notifications/')
            .then(response => {
                console.log('notifications',response.data)
                notifications.value = response.data
            })
            .catch(error => {
                console.log('Error: ', error)
            })
    };

    const getPages = async () => {
        await axios
            .get(`/api/pages/profile/${userStore.user.id}/`)
            .then(response => {
                console.log(response.data)
                pages.value = response.data.pages;
            })
            .catch(error => {
                console.log('error :', error)
            })
    };

    const getStory = async () => {
        await axios
            .get('/api/posts/story')
            .then(response => {
                console.log('stories', response.data)
                stories.value = response.data.stories
                users.value = response.data.users
            })
            .catch(error => {
                console.log('error', error)
            })
    };

    const getFriends = async () => {
        await axios
            .get(`/api/friends/${userStore.user.id}/`)
            .then(response => {
                friendshipRequests.value = response.data.requests
                friends.value = response.data.friends
                user = response.data.user
            })
            .catch(error => {
                console.log('error :', error)
            })
    };

    const shuffledPosts = computed(() => {
        const allPosts = [
            ...posts.value.map(post => ({ ...post, isPagePost: false })),
            ...pages.value.flatMap(page =>
            page.posts.map(post => ({ ...post, page, isPagePost: true }))
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

    const unreadNotifs = computed(() => {
    return notifications.value.filter(notification => !notification.is_read).length
  })

  async function handleRequest(status, id) {
    isLoading.value = true
    console.log('status: ', status)
    await axios
      .post(`/api/friends/${id}/${status}/`)
      .then(response => {
        console.log('data: ', response.data)
        getFriends();
        isLoading.value = false
      })
      .catch(error => {
        console.log('error', error)
        isLoading.value = false
      })
  }
       
</script>

<style scoped>
.spin{
  margin-top: 60px;
  background-color: #eee;
  height: 100vh;
  overflow: hidden;
}
.main{
    display: flex;
    margin-top: 60px;
    background-color: #eee;
}
.center{
    width: 53%;
    padding: 5px;
    overflow: hidden;
    overflow-y: scroll;
    margin: 0px auto;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none; /* Pour Internet Explorer et Microsoft Edge */
    height: 100vh;
    margin-left: 22%;
    background: #eee;
}
.center::-webkit-scrollbar {
    width: 0; /* Pour les navigateurs basés sur WebKit (Chrome, Safari, etc.) */
}
.center .posts-list{
    width: 83%;
    margin: 0px auto;
}

.center .page-list{
    width: 100%;
}

.center .stories{
    width: 80%;
    margin: 5px auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.center .all-stories{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.stories-list{
    width: 100%;
    margin-right: 10px;
}

.stories-list .story-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}
.stories-list .story-card img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    border: 3px solid #45abff;
}
.stories-list .story-card p{
    margin-left: 5px;
    font-size: 10px;
    font-weight: bold;
}
.stories-list-user{
    position: fixed;
    overflow-y: scroll;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.stories-list-user .thestories{
    width: 50%;
    height: 100%;
    margin: 5px auto;
}
.stories-list-user .thestories .thestory{
    width: 100%;
    height: 100%;
}
 .left{
    width: 22%;
    height: 90vh;
    overflow: hidden;
    overflow-y: scroll;
    padding: 20px 6px 5px 10px;
    position: fixed;
    background: #eee;
}

 .left::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #f5f5f5;
}

 .left:hover::-webkit-scrollbar-thumb{
    background-color: #ccc;
}

 .left .logo{
    display: flex;
    align-items: center;
    height: 40px;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.3s;
}

 .left .logo:hover{
    background-color: #eeeeee;
}

 .left .logo i{
    font-size: 22px;
    width: 40px;
    margin: 8px 15px 8px 0;
}

 .left .logo img{
    width: 36px;
    height: 36px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    line-height: 36px;
    margin: 8px 15px 8px 0;
    cursor: pointer;
}

 .left hr{
    width: 25%;
    height: 1px;
    border: 0;
    background-color: #ccc;
    margin: 10px 0;
}

 .right{
    width: 25%;
    padding: 5px;
    height: 92vh;
    overflow: hidden;
    overflow-y: scroll;
    background: #eee;
    position: fixed;
    right: 0;
}

 .right::-webkit-scrollbar{
    width: 7px;
}

 .right::-webkit-scrollbar-thumb{
    border-radius: 20px;
    background-color: #eeeeee;
}

 .right:hover::-webkit-scrollbar-thumb{
    background-color: #cccccc;
}

 .right .first-wrapper .page{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

 .right .first-wrapper .page h2{
    font-size: 18px;
    color: #919191;
    margin: 5px 0;
}

 .right .first-wrapper .page .menu{
    width: 35px;
    height: 35px;
    border-radius: 50%;
}

 .right .first-wrapper .page .menu:hover{
    background-color: #eeeeee;
    cursor: pointer;
}

 .right .first-wrapper .page .menu i{
    line-height: 35px;
    margin-left: 8px;
    font-size: 18px;
}

 .right .first-wrapper .page-img{
    display: flex;
    align-items: center;
}

 .right .first-wrapper .page-img img{
    width: 40px;
    height: 40px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin: 8px 15px 8px 0;
    cursor: pointer;
}

 .right .first-wrapper .page-icon{
    display: flex;
    align-items: center;
}

 .right .first-wrapper .page-icon i{
    color: #919191;
    font-size: 20px;
    margin: 8px 15px 8px 0;
}

 .right hr{
    width: 25%;
    height: 1px;
    border: 0;
    background-color: #cccccc;
    margin: 10px auto;
}

 .right .second-warpper h2{
    font-size: 18px;
    color: #919191;
    margin: 5px 0;
}

 .right .second-wrapper .img-tag{
    display: flex;
    align-items: center;
}

 .right .second-wrapper .img-tag img{
    width: 35px;
    height: 35px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin: 8px 15px 8px 0;
    cursor: pointer;
}

 .right .second-wrapper .img-tag p{
    line-height: 22px;
}

 .right .second-wrapper .img-tag p span{
    font-weight: bold;
}

 .right .third-wrapper .contact-tag{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

 .right .third-wrapper .contact-tag h2{
    margin: 5px 0;
}

 .right .third-wrapper .contact-tag .contact-icon i{
    margin: 0 5px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    line-height: 35px;
    padding-left: 10px;
}

 .right .third-wrapper .contact-tag .contact-icon i:hover{
    background-color: #eeeeee;
    cursor: pointer;
}

 .right .third-wrapper .contact{
    display: flex;
    align-items: center;
}

 .right .third-wrapper .contact img{
    width: 35px;
    height: 35px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin: 8px 15px 8px 0;
    border: 3px solid #ccc;
    cursor: pointer;
}
.right .third-wrapper .request{
    display: flex;
    flex-direction: column;
}

.right .third-wrapper .request .friend-request-item{
    display: flex;
    flex-direction: column;
}
.right .third-wrapper .request .friend-request-item .friend-request-item-head{
    display: flex;
    margin-bottom: 10px;
}
.right .third-wrapper .request .friend-request-item .friend-request-item-head img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}
.right .third-wrapper .request .friend-request-item .friend-request-item-head .friend-request-item-body{
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-top: 5px;
}
.right .third-wrapper .request .friend-request-item .friend-request-item-head .friend-request-item-body p{
    display: flex;
    margin-top: 0px;
}
.right .third-wrapper .request .friend-request-item .friend-request-item-head .friend-request-item-body .sub-title{
    display: flex;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-top: -15px;
}
.right .third-wrapper .request .friend-request-item .friend-request-buttons{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.right .third-wrapper .request .friend-request-item .friend-request-buttons button {
  background-color: #1b74e4;
  color: #fff;
  border: 1px solid #1b74e4;
  border-radius: 10px;
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  width: 45%;
  outline: 0;
}
.reject-button{
  background-color: #ff6d66 !important;
  color: #fff;
  border: 1px solid #ff6d66 !important;
}

a {
  text-decoration: none; 
  color: inherit;
}

a:visited {
  color: inherit;
}


@media screen and (max-width: 1100px) {
    .main .center{
        width: 70%;
        margin-left: 0px;
    }
    .main .right{
        width: 25%;
    }
    .main .left{
        display: none;
    }
}

@media screen and (max-width: 800px) {
    .main .center{
        width: 90%;
        margin-left: 0px;
    }
  .main .left, .main .right{
    display: none;
  }
}

</style>