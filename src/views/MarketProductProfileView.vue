<template>
    <div class="main" v-if="isLoading == false">
        <button @click="showProductForm">+  Create new listing</button>
        <div class="products-list" v-if="myProducts.length">
            <div class="products" v-for="product in myProducts" :key="product.id">
                <ProductItem :product="product"/>
            </div>
        </div>

        <div v-else class="no-product">
            <img src="https://www.facebook.com/images/comet/empty_states_icons/messages/null_states_messages_gray_wash.svg" alt="">
            <h1>When you start selling, your listings will appear here.</h1>
            <button @click="showProductForm">+  Create new listing</button>
        </div>
    </div>

    <div class="spin" v-else>
        <LoadingSpinner />
    </div>

    <template v-if="productForm">
        <div class="popup-form">
            <div class="popup-form-content">

                <div class="popup-form-title">
                    <h2 class="headerpopup">Create Post</h2>
                    
                    <div @click="showProductForm" class="close">
                        <i class="fas fa-xmark"></i>
                    </div>
                </div>

                <hr>

                <div class="postform-top">
            
                    <form @submit.prevent="submitProductForm" class="postform-form">
                        <select name="category" id="category" v-model="category" required>
                            <option value="" hidden>Select the Category...</option>
                            <option value="apparel">Apparel</option>
                            <option value="classifieds">Classifieds</option>
                            <option value="electronics">Electronics</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="family">Family</option>
                            <option value="free_stuff">Free Stuff</option>
                            <option value="garden_outdoor">Garden Outdoor</option>
                            <option value="hobbies">Hobbies</option>
                            <option value="home_goods">Home Goods</option>
                            <option value="home_improvement_supplies">Home Improvement Supplies</option>
                            <option value="home_sales">Home Sales</option>
                            <option value="musical_instruments">Musical Instruments</option>
                            <option value="office_supplies">Office Supplies</option>
                            <option value="pet_supplies">Pet Supplies</option>
                            <option value="property_rentals">Property Rentals</option>
                            <option value="sporting_goods">Sporting Goods</option>
                            <option value="toys_games">Toys Games</option>
                            <option value="vehicles">Vehicles</option>
                        </select>
                        <input v-model="name" type="text" placeholder="Product name..." required>
                        <input v-model="description" type="text"  placeholder="Product description..." required>
                        <input v-model="price" type="number"  placeholder="Product price in FCFA..." required>
                        <input v-model="location" type="text"  placeholder="Product location..." required>
                        <div class="picture">
                            <label class="add" for="form-image" id="upload-image">
                                <i class="fa-solid fa-image" style="color: rgb(172, 172, 255);"></i>
                                <input type="file" id="form-image" style="visibility: hidden;display: none;" @change="onFileSelected" ref="fileInputRef">
                                <p class="title">Add Product Image</p>
                                <p class="s-title">click here</p>
                            </label> 
                        </div>

                        <button type="submit">Add Product</button>
                    </form>

                </div>

            </div>
        </div>
    </template>

</template>

<script setup>

import axios from 'axios';
import ProductItem from '../components/ProductItem.vue';
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

let myProducts = ref([])
let productForm = ref(false)

let fileInputRef = ref(null)

let category = ref("")
let name = ref("")
let description = ref("")
let price = ref()
let location = ref("")

onBeforeMount(async () => {
    isLoading.value = true;
    await userStore.initStore();
})

onMounted(async () => {
    await getMyProducts();
    isLoading.value = false;
})

function showProductForm(){
    productForm.value = !productForm.value
}

const getMyProducts = async () => {
    await axios
        .get(`/api/marketplace/products/profile/${route.params.id}/`)
        .then(response => {
            myProducts.value = response.data
        })
        .catch(error => {
            console.log('error :', error)
        })
};

const submitProductForm =  () => {
        isLoading.value = true
        let formData = new FormData()
      
        formData.append('image', fileInputRef.value.files[0])
        formData.append('name', name.value)
        formData.append('description', description.value)
        formData.append('price', price.value)
        formData.append('location', location.value)

        console.log(formData.get("name"))
        console.log(formData.get("description"))
        console.log(formData.get("price"))
        console.log(formData.get("location"))
        console.log(formData.get("image"))

        axios
        .post(`/api/marketplace/products/add/${category.value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response => {
            console.log('the new product data', response.data)
            myProducts.value.unshift(response.data)
            isLoading.value = false
            toast.success("Product added")
            category.value = ''
            name.value = ''
            description.value = ''
            price.value = null
            location.value = ''
            fileInputRef.value = null
        })
        .catch(error => {
            console.log('error', error)
            category.value = ''
            name.value = ''
            description.value = ''
            price.value = 0
            location.value = ''
            fileInputRef.value = 
            isLoading.value = false
            toast.error("Try again")
        })
    };

    const onFileSelected = () => {
        const imageView = document.getElementById("upload-image")
        let imgLink = URL.createObjectURL(fileInputRef.value.files[0]);
        imageView.style.backgroundImage = `url(${imgLink})`;
        imageView.style.backgroundSize = "cover";
        imageView.style.backgroundPosition = "center";
        console.log('Selected file:', fileInputRef.value.files)
    }

watch(
    () => route.params.id,
    () => {
        getMyProducts();
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
}
.main{
    width: 100%;
    margin-top: 60px;
    margin-left: 20px;
}
.products-list{
    width: 100%;
    margin: 10px 0;
}
.products {
  width: calc(33.33% - 10px); /* Ajustez la largeur en fonction de votre mise en page */
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  margin-top: 30px;
}

.popup-form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.popup-form-title .headerpopup{
  font-size: 24px;
  font-weight: bold;
  padding-left: 40%;
  
}
.popup-form-title .close{
    margin-right: 20px;
}

.popup-form-title .close i {
  font-size: 24px;
  color: gray;
  cursor: pointer;
}

hr {
  margin: 0;
}

.postform-top{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.postform-top .postform-form{
    width: 90%;
    margin: 0 auto;
}
.postform-top .postform-form select{
  width: 90%;
  margin: 10px auto;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #eee;
}
.postform-top .postform-form select:hover {
  border-color: #1b74e4 ;
  border-right-width: 1px;
}
.postform-top .postform-form select:focus {
  border-color: #1b74e4;
  box-shadow: 0 0 0 2px #60a4f6;
  border-right-width: 1px;
  outline: 0;
}
.postform-top .postform-form input{
    width: 90%;
    margin: 10px auto;
    padding: 8px;
    border-radius: 10px;
    border: 1px solid #eee;
}
.postform-top .postform-form input:hover{
    border-color: #1b74e4;
}
.postform-top .postform-form input:focus{
  border-color: #1b74e4;
  box-shadow: 0 0 0 2px #60a4f6;
  border-right-width: 1px;
  outline: 0;
}
.postform-top .postform-form .picture{
    border: 1px solid #717171;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 10px;
}
.postform-top .postform-form .picture .add{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.postform-top .postform-form .picture .add i{
    font-size: 24px;
    color: gray;
    cursor: pointer;
}
.postform-top .postform-form .picture .add .title{
    font-size: 20px;
    color: #000;
    text-align: center;
    font-weight: bold;
}
.postform-top .postform-form .picture .add .s-title{
    font-size: 16px;
    color: #5a5a5a;
    text-align: center;
    font-weight: bold;
}
button[type="submit"] {
  background-color: #eeeeee;
  color: #717171;
  border: 1px solid #717171;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

button[type="submit"]:hover {
  background-color: #1b74e4;
}
.no-product{
    width: 60%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.no-product img{
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
}
.no-product h1{
    text-align: center;
}
</style>