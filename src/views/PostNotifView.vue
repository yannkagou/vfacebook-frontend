<template>
    <div class="main">
        <div class="container">
            <div class="post" v-if="post.id">
                <FeedItem :post="post" />
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import FeedItem from '../components/FeedItem.vue'
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

let route = useRoute();

let post = reactive({
        id: null,
        comments: []
    });

onMounted(() => {
    getPost();
});

const getPost = () => {
    axios
        .get(`/api/posts/${route.params.id}/`)
        .then(response => {
            console.log('data', response.data)
            Object.assign(post, response.data.post);
        })
        .catch(error => {
            console.log('error', error)
        })
};

watch(
    () => route.params.id,
    () => {
        getPost();
    },
    { deep: true, immediate: true  }
    );

</script>

<style scoped>

.main{
    display: flex;
    width: 80%;
    margin: 10px auto;
    margin-top: 60px;
}
.container{
    width: 100%;
}
.post{
    width: 100%;
}
</style>