<template>

    <div class="main">
        <h2>Edit profile</h2>
    
        <div class="mycontainer">

            <div class="mycard">
                <form @submit.prevent="submitForm">

                    <div class="myform">
                        <input type="email" class="form-item"  placeholder="Email" autofocus="1" v-model="form.email">
                    </div>

                    <div class="myform">
                        <input type="text" class="form-item"  placeholder="Firstname" autofocus="1" v-model="form.firstname">
                    </div>

                    <div class="myform">
                        <input type="text" class="form-item"  placeholder="Lastname" autofocus="1" v-model="form.lastname">
                    </div>

                    <div class="myform">
           
                        <label for="user-banner"><p>Upload your cover</p><i class="fa-solid fa-camera"></i></label>
                        <input type="file" id="user-banner" ref="fileInputRef" style="visibility: hidden;display: none;">

                    </div>

                    <button v-if="isLoading == false" type="submit" class="log-btn">Save changes</button>
                    <button v-else class="log-btn2"><LoadingSpinner /></button>

                </form>

            </div>

        </div>
    </div>
</template>

<script setup>
import axios from 'axios'

import { useUserStore } from '@/stores/user'
import { onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const router = useRouter();

let fileInputRef = ref(null);

const userStore = useUserStore();
let isLoading = ref(false)

onBeforeMount(async () => {
    await userStore.initStore();
});

let form = reactive({
    email: userStore.user.email,
    firstname: userStore.user.firstname,
    lastname: userStore.user.lastname
});

let errors = ref([]);
    

const submitForm = () => {
    errors = []

    if (form.email === '') {
        errors.value.push('Your e-mail is missing')
        toast.error('Your e-mail is missing')
    }
    if (form.firstname === '') {
        errors.value.push('Your firstname is missing')
        toast.error('Your firstname is missing')
    }
    if (form.lastname === '') {
        errors.value.push('Your lastname is missing')
        toast.error('Your lastname is missing')
    }

    if (errors.value.length === 0) {
        let formData = new FormData()
        formData.append('avatar', fileInputRef.value.files[0])
        formData.append('email', form.email)
        formData.append('firstname', form.firstname)
        formData.append('lastname', form.lastname)
        axios
        .post('/api/editprofile/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {
                if (response.data.message === 'information updated') {
                    toast.success('informations updated!!!')
                    router.back()
                } else {
                    toast.error('Try again!')
                }
            })
            .catch(error => {
                console.log('error', error)
            })
        }
    }
</script>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: scroll;
    width: 85%;
    margin: 10px auto;
    border-radius: 10px;
    border: none;
    background-color: #fff;
}
h2{
    padding: 10px 30px;
}
.mycontainer {
        width: 100%;
        display: flex;
        font-family: Helvetica, Arial, sans-serif;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .mycard{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        width: 50%;
        background-color: #fff;
        border-radius: 10px;
        line-height: 1.34;
        font-size: 15px;
        padding: 20px;
    }

    .myform{
        color: #1d2129;
        width: 90%;
        margin: 20px auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    label{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    label p {
        text-align: center;
        color: #1d2129;
        font-size: 16px;
        margin-right: 5px;
    }
    .myform .form-item{
      width: 100%;
      border: 1px solid #dddfe2;
      border-radius: 6px;
      line-height: 48px;
      font-size: 17px;
      padding: 0 16px;
      font-weight: 700;
    }

    .log-btn{
      width: 70%;
      margin: 20px auto;
      background-color: #1b74e4;
      border: 1px solid #dddfe2;
      border-radius: 6px;
      color: #fff;
      font-size: 17px;
      line-height: 48px;
      padding: 0 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .log-btn2{
      width: 70%;
      margin: 20px auto;
      background-color: #fff;
      border: 1px solid #1b74e4;
      border-radius: 6px;
      color: #fff;
      font-size: 17px;
      line-height: 48px;
      padding: 5px 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p{
        text-align: center;
        color: #385898;
    }
</style>