<template>

    <div class="main">

        <button class="create" @click="addpage">Create Page</button>
        
        <div class="pages-container" v-if="pages.length">
            <div class="page-box" v-for="page in pages" :key="page.id">
                <PageItem :page="page"/>
            </div>
        </div>

        <div v-else>
            <h1>No pages</h1>
        </div>

        <div class="popup-form" v-show="createPage">
            <div class="popup-form-content">
                <div class="popup-form-title">
                    <h2 class="headerpopup">Create a Page</h2>
                    
                    <div @click="addpage" class="close">
                        <i class="fas fa-xmark"></i>
                    </div>
                </div>

                <form class="postform-form" @submit.prevent="submitForm">

                    <div class="field">
                        <label>Name</label><br>
                        <input type="text" v-model="name" placeholder="Your Page name" class="" required>
                    </div>

                    <div class="field">
                        <label>Description</label><br>
                        <input type="text" v-model="description" placeholder="Your Page description" class="" required>
                    </div>

                    <div class="field picture">
                      <label class="add" for="form-image" id="upload-image">
                        <i class="fa-solid fa-image" style="color: rgb(172, 172, 255);"></i>
                        <input type="file" id="form-image" style="visibility: hidden;display: none;" @change="onFileSelected" ref="fileInputRef">
                        <p class="title">Add the Cover</p>
                        <p class="s-title">click here</p>
                      </label> 
                    </div>

                    <button v-if="isLoading == false" type="submit">Create the Page</button>
                    <button v-else class="spin"><LoadingSpinner /></button>
                    
                </form>
            </div>
        </div>

    </div>
  
</template>
  
<script setup>
  
import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { onBeforeMount,onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import LoadingSpinner from '../components/LoadingSpinner.vue'
import PageItem from '../components/PageItem.vue'

const toast = useToast();

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

userStore.initStore();

let isLoading = ref(false)

let pages = ref([]);

let createPage = ref(false);

let name = ref('');
let description = ref('');
let fileInputRef = ref(null);

onBeforeMount(async () => {
    await userStore.initStore();
});

onMounted(async () => {
    await userStore.initStore();
    await getPages();
});

const addpage = () =>{
    createPage.value = !createPage.value
}

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

const submitForm = () => {
    isLoading.value = true
    let formData = new FormData()
    formData.append('cover', fileInputRef.value.files[0])
    formData.append('name', name.value)
    formData.append('description', description.value)
    axios
        .post('/api/pages/create/', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response => {
            console.log('created page data', response.data)
            pages.value.unshift(response.data)
            isLoading.value = false
            toast.success('Page created!!')
            name.value = ''
            description.value = ''
            fileInputRef.value = null
            createPage.value = !createPage.value
        })
        .catch(error => {
            console.log('error', error)
            isLoading.value = false
            toast.error('Try again')
    })
    
}
const onFileSelected = () => {
        const imageView = document.getElementById("upload-image")
        let imgLink = URL.createObjectURL(fileInputRef.value.files[0]);
        imageView.style.backgroundImage = `url(${imgLink})`;
        imageView.style.backgroundSize = "cover";
        imageView.style.backgroundPosition = "center";
        console.log('Selected file:', fileInputRef.value.files)
    }
  
</script>

<style scoped>
.main{
  margin-top: 60px;
  background-color: #eee;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
}
.create{
  width: 15%;
  margin: 10px auto;
  background-color: #eeeeee;
  color: #4f4d4d;
  border: 1px solid #717171;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
.popup-form {
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

.popup-form-content {
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

.popup-form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.popup-form-title .headerpopup{
  font-size: 24px;
  font-weight: bold;
  padding-left: 40%;
}

.popup-form-title .close i {
  font-size: 24px;
  color: gray;
  cursor: pointer;
}

hr {
  margin: 0;
}
.postform-form{
    width: 90%;
    margin: 5px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.field{
    width: 100%;
}
.picture{
    width: 100%;
    margin: 5px auto;
    padding: 3px;
    border: 2px solid #eee;
    border-radius: 10px;
}
.picture .add{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.postform-form input{
    width: 100%;
    margin: 5px auto;
    padding: 10px;
    border: 2px solid #eee;
    border-radius: 10px;
}

button[type="submit"] {
  width: 70%;
  margin: 10px auto;
  background-color: #eeeeee;
  color: #4f4d4d;
  border: 1px solid #717171;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #1b74e4;
}

.pages-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.page-box {
  width: calc(33.33% - 10px); /* Ajustez la largeur en fonction de votre mise en page */
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
a {
  text-decoration: none;
  color: inherit;
}

a:visited {
  color: inherit;
}


</style>