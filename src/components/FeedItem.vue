<template>

    <div class="posts" v-if="post && isLoading==false">
        <div class="posts-top">
            <div class="img-name">
                <router-link :to="{name:'p_posts', params:{'id': post.created_by.id}}">
                    <img :src=" 'http://localhost:8000' + post.created_by.get_avatar">
                </router-link>
                <div class="name-time">
                    <p class="name">
                        <router-link :to="{name:'p_posts', params:{'id': post.created_by.id}}">
                            {{ post.created_by.firstname}} {{post.created_by.lastname}}
                        </router-link>
                    </p>
                    <p class="time">
                        {{ post.created_at_formatted }} ago<i class="fa-solid fa-user-group"></i>
                    </p>
                </div>
            </div>

            <div v-if="userStore.user.id === post.created_by.id"  @click="deletePost(post.id)" class="menu">
                <i class="fa-solid fa-trash"></i>
            </div>
            <div v-else @click="hidePost(post.id)" class="menu">
                <i class="fa-solid fa-eye-slash"></i>
            </div>
        </div>

        <p class="post-body">{{ post.body }}</p>

        <template v-if="post.attachments">
            <div class="content" v-if="post.attachments.length == 1">
                <img class="attachment" v-for="image in post.attachments" v-bind:key="image.id" :src="'http://localhost:8000' + image.get_image">
            </div>

            <div class="content" v-if="post.attachments.length == 2">
                <img class="attachment2" v-for="image in post.attachments" v-bind:key="image.id" :src="'http://localhost:8000' + image.get_image">
            </div>

            <div class="content" v-if="post.attachments.length > 2">
                <img class="attachment3" v-for="image in post.attachments" v-bind:key="image.id" :src="'http://localhost:8000' + image.get_image">
            </div>
            
        </template>
        <template v-if="post.videos">

            <div class="content" v-if="post.videos.length == 1">
                <video class="video" v-for="video in post.videos" :key="video.id" :src="'http://localhost:8000' + video.get_video" loop controls controlsList="nofullscreen"></video>
            </div>

            <div class="content" v-if="post.videos.length == 2">
                <video class="video2" v-for="video in post.videos" :key="video.id" :src="'http://localhost:8000' + video.get_video" loop controls controlsList="nofullscreen"></video>
            </div>

            <div class="content" v-if="post.videos.length > 2">
                <video class="video3" v-for="video in post.videos" :key="video.id" :src="'http://localhost:8000' + video.get_video" loop controls controlsList="nofullscreen"></video>
            </div>
       
        </template>

        <div class="info">

            <div class="emoji_img">
                <i class="fa-solid fa-thumbs-up" style="color: #4a7ed9;"></i>
                <p>{{ post.likes_count }} likes</p>
            </div>

            <div class="comment">
                <p> 
                    {{ post.comments_count }} comments
                </p> 
                <p>Shares</p>
            </div>

        </div>

        <hr>

        <div class="like">

            <div class="like-icon" @click="likePost(post.id)">
                <i id="like-btn" class="fa-solid fa-thumbs-up"></i>
                <p>Like</p>
            </div>

            <div @click="showPopup" class="like-icon">
                <i class="fa-solid fa-message"></i>
                <p>Comments</p>
            </div>

            <div class="like-icon">
                <i class="fa-solid fa-share"></i>
                <p>Share</p>
            </div>

        </div>

        <hr>

        <div class="comment-form">
            <img :src="'http://localhost:8000' + userStore.user.avatar">
            <form @submit.prevent="submitCommentForm" class="comment-zone">
                    <input type="text" v-model="body" :placeholder="'What do you think ' + userStore.user.firstname + ' ' + userStore.user.lastname + '?'">
                    <button type="submit" class="comment-submit"><i class="fa-solid fa-arrow-right"></i></button>
            </form>
        </div>
        
    </div>

    <div class="spin" v-if="isLoading==true">
        <LoadingSpinner />
    </div>

    <PostViewItem :popupVisibleRef="popupVisibleRef" @closePopup="hidePopup" :post="post" />

</template>

<script setup>
import axios from 'axios'
import PostViewItem from './PostViewItem.vue'
import { useUserStore } from '@/stores/user'
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useToast } from 'vue-toast-notification';
import LoadingSpinner from '../components/LoadingSpinner.vue'

const toast = useToast();
const userStore = useUserStore();
let isLoading = ref(false);

onBeforeMount(async () => {
  await userStore.initStore();
});

let props = defineProps ({
    post: Object,
    posts: Array
});

let post = reactive(props.post);
let posts = ref(props.posts);

let popupVisibleRef = ref(false)
let body = ref("")

async function submitCommentForm() {
    isLoading.value = true
    console.log(post.id)
    await axios
        .post(`/api/posts/${post.id}/comment/`, {
            'body': body.value
        })
        .then(response => { 
            post.comments.push(response.data)
            toast.success("Comment added")
            post.comments_count += 1
            body.value = ''
            isLoading.value = false
        })
        .catch(error => {
            console.log('error', error)
    })
};

function showPopup () {
    popupVisibleRef.value = true
  }

function hidePopup () {
    popupVisibleRef.value = false
}

async function likePost(id) {
    await axios
        .post(`/api/posts/${id}/like/`)
        .then(response => {
            if (response.data.message == "like created") {
                var likeIcon = document.getElementById("like-btn");
                likeIcon.classList.add("liked");
                post.likes_count += 1;
                toast.success("Post liked")  
            }else{
                var likeIcon = document.getElementById("like-btn");
                likeIcon.classList.remove("liked");
                post.likes_count -= 1;
                toast.error("Post disliked")
            }
        })
        .catch(error => {
            console.log("error", error);
        });
};

async function deletePost(id) {
    const index = posts.value.findIndex(post => post.id === id);
    if (index !== -1) {
    await axios
      .delete(`/api/posts/${id}/delete/`)
      .then(response => {
        console.log(response.data);
        posts.value.splice(index, 1);
        toast.success("Post deleted");
      })
      .catch(error => {
        console.log("error", error);
      });
    }
};

const hidePost = (post_id) =>{
    const index = posts.value.findIndex(post => post.id === post_id);
    if (index !== -1) {
        posts.value.splice(index, 1);
        toast.success("Post hidded")
    }
}

</script>

<style scoped>

/* .modal{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: scroll;
} */
.spin{
  margin-top: 60px;
  background-color: #eee;
  height: 100vh;
  overflow: hidden;
}
.posts{
    margin: 10px auto;
    width: 100%;
    color: #1c1e21;
    direction: ltr;
    line-height: 1.34;
    height: auto;
    background-color: #fff;
    padding: 5px 5px;
    border-radius: 7px;
    box-shadow: 0 1px 8px rgba(0,0,0,0.2);
}

.posts .posts-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
}

.posts .posts-top .img-name{
    display: flex;
    align-items: center;
}

.posts .posts-top .img-name img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 8px;
    cursor: pointer;
}
.posts .posts-top .img-name .name-time{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 45px;
}
.posts .posts-top .img-name .name-time .name{
    font-weight: bold;
    color: #000;
    cursor: pointer;
}

.posts .posts-top .img-name .name-time .name:visited{
  text-decoration: none;
}

.posts .posts-top .img-name .name-time .name:hover{
    text-decoration: underline;
}

.posts .posts-top .img-name .name-time .time{
    font-size: 10px;
    color: #919191;
    margin: 0px;
    margin-top: -5px;
}

  .posts .posts-top .img-name .name-time i{
    font-size: 5px;
    margin-left: 5px;
}
  .posts .posts-top .menu{
    width: 35px;
    height: 35px;
    border-radius: 50%;
}

  .posts .posts-top .menu:hover{
    background-color: #efefef;
    cursor: pointer;
}

  .posts .posts-top .menu i{
    line-height: 35px;
    margin-left: 8px;
    font-size: 18px;
}

.posts .post-body{
    font-size: 18px;
    margin-left: 20px;
    color: #1c1e21;
    direction: ltr;
    line-height: 1;
}

.posts .content{
    display: flex;
    width: 100%;
}

.posts .attachment{
    width: 100%;
    height: 500px;
    object-fit: fill;
    object-position: center;
    border-radius: 5px;
}
.posts .attachment2{
    width: 50%;
    height: 500px;
    object-fit: fill;
    object-position: center;
    border-radius: 0px;
}
.posts .attachment3{
    width: 30%;
    height: 500px;
    object-fit: fill;
    object-position: center;
    border-radius: 0px;
}
.posts .video{
    width: 100%;
    height: 500px;
    object-fit: fill;
    object-position: center;
    border-radius: 5px;
}
.posts .video2{
    width: 50%;
    height: 500px;
    object-fit: fill;
    object-position: center;
    border-radius: 0px;
}
.posts .video3{
    width: 30%;
    height: 500px;
    object-fit: fill;
    object-position: center;
    border-radius: 0px;
}
.posts .info{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1px 0px;
}

.posts .info .emoji_img{
    display: flex;
    margin-left: 10px;
    align-items: center;
}

.posts .info .emoji_img i{
    width: 20px;
    height: 20px;
}

.posts .info .emoji_img p{
    font-size: 16px;
    color: #919191;
}

.posts .info .comment{
    display: flex;
    align-items: center;
    color: #919191;
}

.posts .info .comment p{
    padding: 0 12px;
    font-size: 15px;
}

.posts hr{
    width: 100%;
    height: 1px;
    background-color: #ccc;
    border: 0;
    margin: 2px 0;
}

.posts .like{
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.posts .like .like-icon{
    display: flex;
    align-items: center;
}

.liked {
    color: #4a7ed9 !important;
}

.posts .like .like-icon i{
    font-size: 25px;
    margin-right: 8px;
    color: #919191;
}

/* .posts .like .like-icon i.active{
    color: #45abff;
} */

.posts .comment-form{
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}

.posts .comment-form img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-left: 10px;
    margin-right: 5px;
}

.posts .comment-form .comment-zone{
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 87%;
    height: 40px;
    background-color: #eeeeee;
    border-radius: 30px;
    padding: 0 10px;
    margin: 0px auto;
}
.posts .comment-form .comment-zone input{
    background-color: transparent;
    outline: none;
    border: 0;
    font-size: 16px;
    width: 80%;
}

.posts .comment-form .comment-zone button{
    width: 10%;
    margin-right: 5px;
    border: none;
}
.posts .comment-form .comment-zone button i{
    padding: 0 5px;
    color: #919191;
    font-size: 15px;
}
.first-comment{
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.first-comment .first-comment-body{
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: #eeeeee;
    border-radius: 10px;
    padding: 5px; 
    margin: 0px auto; 
}
.first-comment .first-comment-body .first-comment-item{
    display: flex;
    align-items: center;
    justify-content: start;
}
.first-comment .first-comment-body .first-comment-item img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-left: 10px;
    margin-right: 7px;
}
.first-comment .first-comment-body .first-comment-item p{
    font-size: 20px;
    font-weight: bold;
}
.first-comment .first-comment-body .text{
    font-size: 16px;
    margin-left: 30px
}
.first-comment .reactions{
    width: 90%;
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -25px;
}
</style>