<template>
    <div class="popup-post" v-show="popupVisibleRef">

        <div class="posts">

            <div class="posts-header">

                <div class="post-name">
                    <p>{{ page.name}}'s Post</p>
                </div>
                <div @click="$emit('closePopup')" class="closePopup">
                    <i class="fas fa-xmark"></i>
                </div>

            </div>

            <div class="posts-top">

              <div class="img-name">
                <img :src=" 'https://yannickkagou.pythonanywhere.com' + page.cover">
                <div class="name-time">
                  <p class="name">
                    <router-link :to="{name:'page_posts', params:{'id': page.id}}">
                      {{ page.name}}
                    </router-link>
                  </p>
                  <p class="time">
                    {{ post.created_at_formatted }} ago<i class="fa-solid fa-user-group"></i>
                  </p>
                </div>
              </div>

              <div class="menu">
                <i class="fa-solid fa-bell bell"></i>
              </div>

            </div>

            <div class="posts-body">

                <p>{{ post.body }}</p>
                <template v-if="post.attachments">
                    <img class="attachment" v-for="image in post.attachments" v-bind:key="image.id" :src="'https://yannickkagou.pythonanywhere.com' + image.get_image">
                </template>
                <template v-if="post.videos">
                    <video class="attachment" v-for="video in post.videos" :key="video.id" :src="'https://yannickkagou.pythonanywhere.com' + video.get_video" controls></video>
                </template>

            </div>

            <hr>

            <div class="comment-form" v-if="page.admins.map(user => user.id).includes(userStore.user.id)">

                <img :src="'https://yannickkagou.pythonanywhere.com' + page.cover">
                <form class="comment-input" @submit.prevent="submitCommentForm" method="post">
                  <input type="text" v-model="body" class="" placeholder="Write a Page comment...">
                  <button type="submit"><i class="fa-solid fa-arrow-right" style="color: rgb(150, 150, 247);"></i></button>
                </form>

            </div>

            <div class="comment-form" v-else>

                <img :src="'https://yannickkagou.pythonanywhere.com' + userStore.user.get_avatar">
                <form class="comment-input" @submit.prevent="submitCommentForm" method="post">
                  <input type="text" v-model="body" class="" placeholder="Write a comment...">
                  <button type="submit"><i class="fa-solid fa-arrow-right" style="color: rgb(150, 150, 247);"></i></button>
                </form>

            </div>

            <div class="comments" v-if="post.comments.length">

                <div class="comment" v-for="comment in post.comments" v-bind:key="comment.id">

                    <div class="comment-container" v-if="page.admins.map(user => user.id).includes(comment.created_by.id)">

                        <img :src="'https://yannickkagou.pythonanywhere.com' + page.cover">

                        <div class="comment-container-item">

                          <div class="comment-body">
                            <p class="comment-username">
                              <router-link :to="{name: 'page_posts', params:{id:page.id}}">{{ page.name }}</router-link>
                            </p>
                            <p class="comment-text">{{ comment.body }}</p>
                          </div>

                          <div class="comment-reply">
                            <p>Like</p>
                            <p>Reply</p>
                            <p>{{ comment.created_at_formatted }}</p>
                          </div>

                        </div>

                    </div>

                    <div class="comment-container" v-else>

                      <img :src="'https://yannickkagou.pythonanywhere.com' + comment.created_by.get_avatar">

                      <div class="comment-container-item">

                        <div class="comment-body">
                          <p class="comment-username">
                              <router-link :to="{name: 'p_posts', params:{id: comment.created_by.id}}">{{ comment.created_by.firstname }} {{ comment.created_by.lastname }}</router-link>
                          </p>
                          <p class="comment-text">{{ comment.body }}</p>
                        </div>

                        <div class="comment-reply">
                          <p>Like</p>
                          <p>Reply</p>
                          <p>{{ comment.created_at_formatted }}</p>
                        </div>

                      </div>

                    </div>
                    
                </div>
                
            </div>

        </div>
        
    </div>
</template>

<script setup>

import axios from 'axios';
import { onBeforeMount, onMounted, reactive, ref, } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

    const toast = useToast();
    const route = useRoute();

    const userStore = useUserStore();

    onBeforeMount(async () => {
      await userStore.initStore();
    });

    let props = defineProps ({
      post: Object,
      popupVisibleRef: Boolean,
      page: Object
    });

    let post = reactive(props.post);
    let page = reactive(props.page);

    let body = ref("");


    async function submitCommentForm() {
        await axios
            .post(`/api/posts/${post.id}/comment/`, {
                'body': body.value
            })
            .then(response => { 
                post.comments.push(response.data)
                toast.success("Comment added")
                post.comments_count += 1
                body.value = ''
            })
            .catch(error => {
                console.log('error', error)
        })
    };

</script>

<style scoped>

.popup-post{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  /* height: 100%; */
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.75);
  overflow-y: scroll;
}
.posts {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 50%;
  height: 85%;
  overflow-y: scroll;
  margin: 0px auto;
}
.posts::-webkit-scrollbar{
    display: none;
}
.posts-header {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.posts-header .post-name {
  width: 80%;
  padding-left: 20%;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.posts-header .post-name p{
  text-align: center;
}
.closePopup {
  width: 10%;
  padding-left: 30%;
  cursor: pointer;
}

.posts-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  height: 30px;
}
.posts-top .img-name{
  display: flex;
  align-items: center;
}

.img-name img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.name-time {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.name-time .name {
  font-size: 14px;
  font-weight: bold;
}

.name-time .time {
  font-size: 12px;
  color: #999999;
  margin-top: -5px;
}
.name-time i{
    font-size: 5px;
    margin-left: 5px;
}

.menu {
  cursor: pointer;
  margin-top: -10px;
  margin-right: 15px;
}

.posts-body {
  margin-top: 15px;
}

.posts-body p {
  font-size: 25px;
  line-height: 1.5;
}

.attachment {
  width: 100%;
  margin-top: 2px;
  height: 500px;
  object-fit: fill;
  object-position: center;
  border-radius: 5px;
}

.comment-form {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.comment-form img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.comment-form .comment-input{
  display: flex;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
}

.comment-form .comment-input input[type="text"] {
  width: 80%;
  padding: 8px;
  border: none;
  background-color: transparent;
}
.comment-form .comment-input input[type="text"]:focus {
  border-color: transparent;
  outline: 0;
}
.comment-form button[type="submit"] {
  width: 20%;
  padding: 6px;
  border: none;
  background-color: transparent;
  color: #ffffff;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comments {
  margin-top: 20px;
}

.comment {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.comment .comment-container{
  width: 100%;
}
.comment .comment-container img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.comment .comment-container .comment-container-item {
  display: flex;
  flex-direction: column;
}
.comment .comment-container .comment-container-item .comment-body {
  margin-bottom: 4px;
  background-color: #eee;
  border-radius: 12px;
  padding-left: 10px;
}

.comment .comment-container .comment-container-item .comment-body .comment-username {
  font-size: 10px;
  font-weight: bold;
}

.comment .comment-container .comment-container-item .comment-body .comment-text {
  margin-top: 5px;
  font-size: 12px;
}

.comment .comment-container .comment-container-item .comment-reply {
  display: flex;
  align-items: flex-start;
  margin: 0;
  font-size: 12px;
  color: #999999;
}

.comment-reply p {
  margin: 0;
  margin-right: 10px;
  cursor: pointer;
}

.comment-reply p:hover {
  text-decoration: underline;
} 
a {
  text-decoration: none; 
  color: inherit;
}

a:visited {
  color: inherit;
}

</style>