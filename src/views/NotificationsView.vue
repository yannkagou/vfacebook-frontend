<template>
    <div class="main">
        <div class="container" v-if="notifications.length">
            <div class="notifications" v-for="notification in notifications" :key="notification.id">
                <div class="notification" :style="[notification.is_read ? {'background-color': '#fff'} : {'background-color': '#1b74e4'}]">
                    <p> {{ notification.body }} </p>
                    <button @click="readNotification(notification)">
                        Read more
                    </button>
                </div>
            </div>
           
        </div>
        <div class="empty" v-else>
             <h1>You don't have any notifications!</h1>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast = useToast();


let router = useRouter();
let notifications = ref([]);     

onMounted(() => {
    getNotifications();
});

const getNotifications = () => {
    axios
        .get('/api/notifications/allnotifs/')
        .then(response => {
            console.log(response.data)
            notifications.value = response.data
        })
        .catch(error => {
            console.log('Error: ', error)
        })
};

const readNotification = async (notification) => {
    console.log('readNotification', notification.id)

    await axios
        .post(`/api/notifications/read/${notification.id}/`)
        .then(response => {
            console.log(response.data)

            if (notification.type_of_notification == 'post_like' || notification.type_of_notification == 'post_comment') {
                router.push({name: 'postnotifications', params: {id: notification.post_id}})
            } 
            else {
                router.push({name: 'p_posts', params: {id: notification.created_for_id}})
            }
        })
        .catch(error => {
            console.log('Error: ', error)
        })
}
 
</script>

<style scoped>

.main{
    width: 100%;
    display: flex;
    margin-top: 60px;
}
.container{
    width: 100%;
}
.notifications{
    width: 80%;
    margin: 10px auto;
}
.notification{
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #eee;
    width: 100%;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.empty{
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>