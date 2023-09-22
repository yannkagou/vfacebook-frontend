<template>

    <div class="main" v-if="isLoading == false">

        <div class="top" v-if="page.id">

            <div class="cover">
                <img :src="'https://yannickkagou.pythonanywhere.com' + page.cover">
            </div>
    
            <div class="info">
                <img :src="'https://yannickkagou.pythonanywhere.com' + page.cover">

                <div class="name">
                    <h1>{{ page.name }}</h1>
                    <h2>{{ page.description }}</h2>
                    <p>{{page.subscribers_count}} subscribers</p>
                </div>

                <div class="menu" v-if="page.admins.map(user => user.id).includes(userStore.user.id)">

                    <PageStoryForm :page="page" :stories="stories"/>

                    <div class="stories-list">

                        <div class="story-card" v-if="stories.length">

                            <img :src=" 'https://yannickkagou.pythonanywhere.com' + page.cover" class="story-icon" @click="toastShowStory">

                            <Swiper :slides-per-view="1"  @swiper="onSwiper" @slideChange="onSlideChange" navigation v-if="stories.length" class="stories-list-user" v-show="showStory">

                                <swiper-slide  class="thestories" v-for="story in stories" :key="story.id">

                                    <div class="thestory">

                                        <PageStoryItem :story="story" :page="page" :stories="stories" :show-story="showStory" @toast-showStory="toastShowStory"/>

                                    </div>

                                </swiper-slide >

                            </Swiper>

                        </div>

                    </div>

                    <router-link :to="{name: 'page_edit', params: {id: page.id}}">
                        <button>
                            <i class="fa-solid fa-pen-to-square"></i>
                            <p>Edit</p>
                        </button>
                    </router-link>

                    <button @click="deletePage" class="logout">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

                <div class="menu" v-else>

                    <div class="stories-list">

                        <div class="story-card" v-if="stories.length">

                            <img :src=" 'https://yannickkagou.pythonanywhere.com' + page.cover" class="story-icon" @click="toastShowStory">

                            <Swiper :slides-per-view="1"  @swiper="onSwiper" @slideChange="onSlideChange" navigation v-if="stories.length" class="stories-list-user" v-show="showStory">

                                <swiper-slide  class="thestories" v-for="story in stories" :key="story.id">

                                    <div class="thestory">

                                        <PageStoryItem :story="story" :page="page" :stories="stories" :show-story="showStory" @toast-showStory="toastShowStory"/>

                                    </div>

                                </swiper-slide >

                            </Swiper>

                        </div>

                    </div>

                    <button class="friends" @click="likePage"  v-if="!page.subscribers.map(user => user.id).includes(userStore.user.id)">
                        <i class="fa-solid fa-thumbs-up" style="color: #d4d6d8;"></i>
                        <p>Like</p>
                    </button>

                    <button class="friends2" @click="likePage" v-else>
                        <i class="fa-solid fa-thumbs-up"></i>
                        <p>Unlike</p>
                    </button>

                    <button @click="sendDirectMessage" class="message">
                        <i class="fa-brands fa-facebook-messenger"></i>
                        <p>Message</p>
                    </button>
                    <button class="more">
                        <i class="fa-solid fa-bell"></i>
                    </button>
                </div>
                
            </div>
        
            <hr>

            <div class="sub-nav">
                <div class="menu">
                    <router-link :to="{name: 'page_posts', params: {id: page.id}}">
                        <p class="logo">Posts</p>
                    </router-link>  
            
                    <router-link :to="{name: 'page_followers', params: {id: page.id}}">
                        <p class="logo">Followers</p>
                    </router-link>  

                    <router-link :to="{name: 'page_photos', params: {id: page.id}}">
                        <p class="logo">Photos</p>
                    </router-link>  
            
                    <router-link :to="{name: 'page_videos', params: {id: page.id}}">
                        <p class="logo">Videos</p>
                    </router-link>  

                    <div class="logo">
                        <p class="logoplus">More</p>
                        <i class="fa-solid fa-users users"></i>
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import PageStoryItem from '../components/PageStoryItem.vue'
import PageStoryForm from '../components/PageStoryForm.vue'
import { useUserStore } from '@/stores/user'
import { onBeforeMount,onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import LoadingSpinner from '../components/LoadingSpinner.vue'

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();

    let showStory = ref(false)

    let page = reactive ({});
    let isLoading = ref(false)

    let posts = ref([]);
    let stories = ref([]);

    const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };

    onBeforeMount(async () => {
        isLoading.value = true
        await userStore.initStore();
    })

    onMounted(async () => {
        await userStore.initStore();
        await getPage();
        isLoading.value = false
    });

    const toastShowStory = () =>{
        showStory.value = !showStory.value;
    }

     const getPage = async () => {
        await axios
            .get(`/api/pages/${route.params.id}/`)
            .then(response => {
                Object.assign(page, response.data);
                posts.value = page.posts;
                stories.value = page.stories;
            })
            .catch(error => {
                console.log('error :', error)
            })
    };

    const likePage = async () =>{
        await axios
            .post(`/api/pages/${route.params.id}/subscribe/`)
            .then(response => {
                if (response.data.message == "Page like created") {
                    toast.success("Page liked")
                    page.subscribers_count += 1;
                }
                else{
                    page.subscribers_count -= 1;
                }
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    const deletePage = async () =>{
        await axios
                .delete(`/api/pages/${route.params.id}/delete/`)
                .then(response => {
                    console.log(response.data);
                    toast.success("Page deleted")
                    router.back();
                })
                .catch(error => {
                    console.log("error", error);
                });
    }

    watch(
    () => route.params.id,
    () => {
        getPage();
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
  overflow-y: scroll;
}
.main{
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    background-color: #eee;
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
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
    margin-top: 0px;
}
.top .info .name h2{
    font-size: 20px;
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

.top .info .menu .friends2{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
    background-color: #00345e;
}


/* .stories-list{
    width: 100%;
} */

.stories-list .story-card{
    display: flex;
}
.stories-list .story-card img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    border: 3px solid #45abff;
}
.stories-list-user{
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
.stories-list-user .thestories{
    width: 90%;
    height: 500px;
    margin: 5px auto;
}
.stories-list-user .thestories .thestory{
    width: 100%;
    height: 100%;
    background-color: #ccc;
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
    width: 85%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
}
a {
  text-decoration: none;
  color: inherit;
}

a:visited {
  color: inherit;
}
.router-link-exact-active {
    border-radius: 0;
    border-bottom: 2px solid #3498db;
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
.top .info .name h2{
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