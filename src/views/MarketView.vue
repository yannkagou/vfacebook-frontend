<template>
  <div class="main">
      <div class="left">

          <div class="header">
              <div class="title">
                  <h1>Marketplace</h1>
                  <div class="logo">
                      <i class="fa-solid fa-gear"></i>
                  </div>
              </div>

              <div class="search-bar">
                    <form @submit.prevent="searchProduct">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" v-model="query" placeholder="Search Facebook">
                    </form> 
              </div>
          </div>

          <div class="middle">
            <router-link :to="{name:'market_product_list'}" exact-active-class="active">
                <div class="item">
                    <div class="icon">
                        <i class="fa-solid fa-store"></i>
                    </div>
                    <p>Browse all</p>
                </div>
              </router-link>
              <!-- <router-link :to="{name:'market_product_list'}" exact-active-class="active"> -->
                <div class="item">
                    <div class="icon">
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <p>Notifications</p>
                </div>
              <!-- </router-link> -->
              <!-- <router-link :to="{name:'market_product_list'}" exact-active-class="active"> -->
                <div class="item">
                    <div class="icon">
                        <i class="fa-solid fa-inbox"></i>
                    </div>
                    <p>Inbox</p>
                </div>
              <!-- </router-link> -->
              <!-- <router-link :to="{name:'market_product_list'}" exact-active-class="active"> -->
                <div class="item">
                    <div class="icon">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                    <p>Buying</p>
                </div>
              <!-- </router-link> -->
              <router-link :to="{ name: 'market_product_profile', params:{'id': userStore.user.id}}" exact-active-class="active">
                <div class="item">
                    <div class="icon">
                        <i class="fa-solid fa-credit-card"></i>
                    </div>
                    <p>Selling</p>
                </div>
            </router-link>
          </div>

          <div class="filters">
            Yaounde, Location
          </div>

          <div class="categories">
            <router-link :to="{name:'market_category_list', params: {'name': 'vehicles'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-car"></i>
                    </div>
                    <p>Vehicles</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'property_rentals'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-house-circle-check"></i>
                    </div>
                    <p>Property Rentals</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'apparel'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-shirt"></i>
                    </div>
                    <p>Apparel</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'classifieds'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-car-battery"></i>
                    </div>
                    <p>Classifieds</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'electronics'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-mobile-screen"></i>
                    </div>
                    <p>Electronics</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'entertainment'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-video"></i>
                    </div>
                    <p>Entertainment</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'family'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <p>Family</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'free_stuff'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-shuffle"></i>
                    </div>
                    <p>Free Stuff</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'garden_outdoor'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-hammer"></i>
                    </div>
                    <p>Garden & Outdoor</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'hobbies'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-pencil"></i>
                    </div>
                    <p>Hobbies</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'home_goods'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-house"></i>
                    </div>
                    <p>Home Goods</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'home_improvement_supplies'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-gavel"></i>
                    </div>
                    <p>Home Improvement Supplies</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'home_sales'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-house-circle-xmark"></i>
                    </div>
                    <p>Home Sales</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'musical_instruments'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-guitar"></i>
                    </div>
                    <p>Musical Instruments</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'office_supplies'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-print"></i>
                    </div>
                    <p>Office Supplies</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'pet_supplies'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-paw"></i>
                    </div>
                    <p>Pet Supplies</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'sporting_goods'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-person-running"></i>
                    </div>
                    <p>Sporting Goods</p>
                </div>
            </router-link>
            <router-link :to="{name:'market_category_list', params: {'name': 'toys_games'}}" exact-active-class="active">
                <div class="category">
                    <div class="icon">
                        <i class="fa-solid fa-gamepad"></i>
                    </div>
                    <p>Toys & Games</p>
                </div>
            </router-link>
          </div>
          
      </div>

      <div class="right">

          <router-view/>

      </div>
  </div>
</template>

<script setup>

import { useUserStore } from '@/stores/user';
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

onBeforeMount(async () => {
        await userStore.initStore();
  })

let query = ref("")

function searchProduct(){
    router.push({ name: 'market_product_search', params:{'query': query.value}})
}

</script>

<style scoped>
.main{
  margin-top: 60px;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 100%;
  font-family: Helvetica, Arial, sans-serif;
;
}
.left{
    width: 360px;
    display: flex;
    flex-direction: column;
}
.left .title{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
}
.left .search-bar{
    width: 100%;
    height: 40px;
    background-color: #eeeeee;
    border-radius: 30px;
    padding: 0 10px;
    margin-bottom: 10px;
}

.left .search-bar i{
    line-height: 40px;
    font-size: 15px;
    color: #919191;
    margin-right: 5px;
}

.left .search-bar input{
    background-color: transparent;
    outline: none;
    border: 0;
    font-size: 12px;
    width: 130px;
}
.left .middle{
    width: 98%;
    margin: 0px auto;
}
.left .middle .active p{
    color: #3498db;
}
.left .middle .item{
    display: flex;
    align-items: center;
    height: 70px;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.3s;
}

 .left .middle .item:hover{
    background-color: #ccc;
    border-radius: 20px;
}
.left .middle .item .icon{
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
}
.left .middle .item .icon i{
    font-size: 16px;
}
.left .middle .item p{
    color: #1c1e21;
    font-weight: 800;
}

.left .categories{
    width: 98%;
    margin: 0px auto;
}
.left .categories .category{
    display: flex;
    align-items: center;
    height: 70px;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.3s;
    font-weight: 700;
}

 .left .categories .category:hover{
    background-color: #ccc;
    border-radius: 20px;
}
.left .categories .category .icon{
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
}
.left .categories .category .icon i{
    font-size: 16px;
}
.left .categories .category p{
    color: #1c1e21;
    font-size: 14px;
    font-weight: 600;
}

.right{
    margin-top: -60px;
    width: 100%;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #eee;
}
a {
  text-decoration: none;
  color: inherit;
}

a:visited {
  color: inherit;
}
.active {
    background-color: #eee;
    border-radius: 20px;
}
.active .category{
    background-color: #eee;
    border-radius: 20px;
}
.active .category p{
    color: #3498db;
}
.active .category .icon{
    color: #3498db !important;
}
.active i{
    color: #3498db !important;
}
.active:hover {
    background-color: #fff;
}

</style>