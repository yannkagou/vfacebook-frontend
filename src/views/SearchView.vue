<template>
  <div class="main" v-if="isLoading == false">
    <div class="left sticky-left">
      <div class="item" @click="option='all'">
        <p>All</p>
      </div>
      <div class="item" @click="option='people'">
        <p>People</p>
      </div>
      <div class="item" @click="option='posts'">
        <p>Posts</p>
      </div>
      <div class="item" @click="option='pages'">
        <p>Pages</p>
      </div>
      <div class="item"  @click="option='photos'">
        <p>Photos</p>
      </div>
      <div class="item"  @click="option='videos'">
        <p>Videos</p>
      </div>
      <div class="item"  @click="option='marketplace'">
        <p>Marketplace</p>
      </div>
      <div class="item"  @click="option='places'">
        <p>Places</p>
      </div>
      <div class="item"  @click="option='groups'">
        <p>Groups</p>
      </div>
      <div class="item"  @click="option='events'">
        <p>Events</p>
      </div>
    </div>

    <div class="right sticky-right">
      <form @submit.prevent="submitForm">
        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        <input v-model="query" placeholder="Search Facebook">
      </form>

      <div v-if="option=='all'" class="container">
        <div v-if="users.length">
          <h1>People</h1>
          <div class="pages-container">
            <div class="page-box" v-for="user in users" :key="user.id">
              <router-link :to="{name:'p_posts', params: {'id': user.id}}">
                <img :src="'http://localhost:8000' + user.get_avatar">
                <p><strong>
                    {{ user.firstname }} {{ user.lastname }}
                </strong></p>
                <p>{{ user.friends_count }} friends</p>
              </router-link>
            </div>
          </div>
        </div>
        <div v-if="posts.length">
          <h1>Posts</h1>
          <div v-for="post in posts" :key="post.id" class="">
            <FeedItem :post="post"/>
          </div>
        </div>
        <div class="container" v-if="pages.length">
          <h1>Pages</h1>
          <div class="pages-container">
            <div class="page-box" v-for="page in pages" :key="page.id">
              <PageItem :page="page"/>
            </div>
          </div>
        </div>
        <div class="container" v-if="products.length">
          <h1>Products</h1>
          <div class="pages-container">
            <div class="page-box" v-for="product in products" :key="product.id">
              <ProductItem class="products" :product="product"/>
            </div>
          </div>
        </div>
        <div v-if="!users.length && !posts.length && !pages.length && !products.length">
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

      <div v-if="option=='people'" class="container">
        <div v-if="users.length">
          <div class="pages-container">
            <div class="page-box" v-for="user in users" :key="user.id">
              <router-link :to="{name:'p_posts', params: {'id': user.id}}">
              <img :src="'http://localhost:8000' + user.get_avatar">
              <p><strong>
                  {{ user.firstname }} {{ user.lastname }} 
              </strong></p>
              <p>{{ user.friends_count }} friends</p>
              </router-link>
            </div>
          </div>
        </div>
        <div v-else>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

      <div v-if="option=='posts'" class="container">
        <div v-if="posts.length" class="">
          <div v-for="post in posts" :key="post.id" class="">
            <FeedItem :post="post"/>
          </div>
        </div>
        <div v-else>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>
      <div v-if="option=='pages'" class="container">
        <div v-if="pages.length" class="page-container">
          <div v-for="page in pages" :key="page.id" class="page-box">
            <PageItem :page="page"/>
          </div>
        </div>
        <div v-else>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

      <div v-if="option=='photos'" class="container">
        <div>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

      <div v-if="option=='videos'" class="container">
        <div>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

      <div v-if="option=='marketplace'" class="container">
        <div v-if="products.length" class="products-list">
          <div class="page-box" v-for="product in products" :key="product.id">
            <ProductItem :product="product"/>
          </div>
        </div>
        <div v-else>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

      <div v-if="option=='places'" class="container">
        <div>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

      <div v-if="option=='groups'" class="container">
        <div>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

      <div v-if="option=='events'" class="container">
        <div>
          <h3>We didn't find any results</h3>
          <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
      </div>

    </div>
  </div>
  <div class="spin" v-else>
        <LoadingSpinner />
    </div>
</template>
  
<script setup>
  import FeedItem from "../components/FeedItem.vue";
  import axios from "axios";
  import { ref } from "vue";
  import { useToast } from 'vue-toast-notification';
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  import PageItem from '../components/PageItem.vue'
  import ProductItem from '../components/ProductItem.vue'

  const toast = useToast();
  let query = ref("");
  let users = ref([]);
  let posts = ref([]);
  let pages = ref([]);
  let products = ref([]);
  let option = ref("all");
  let isLoading = ref(false)
  
  const submitForm = async () => {
    isLoading.value = true
    console.log("submitForm", query.value);
  
    await axios
      .post("/api/search/", {
        query: query.value,
      })
      .then((response) => {
        console.log("response: ", response.data);
        isLoading.value = false
        toast.success('Perform search');
        users.value = response.data.users;
        posts.value = response.data.posts;
        pages.value = response.data.pages;
        products.value = response.data.products;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
</script>
  
<style scoped>
.spin{
  margin-top: 60px;
  background-color: #eee;
  height: 100vh;
  overflow: hidden;
}
  .main {
    display: flex;
    margin-top: 60px;
    justify-content: center;
    align-items: flex-start;
    background-color: #eee;
    width: 100%;
    padding: 0px 50px;
    padding-top: 10px;
  }
  
  .left {
    width: 20%;
    background-color: #fff;
    border-radius: 10px;
  }
  .sticky-left {
    position: sticky;
    top: 0;
    overflow-y: auto;
  }
  .left::-webkit-scrollbar {
    display: none;
  }
  .item {
    padding: 10px;
    cursor: pointer;
  }
  
  .item:hover {
    background-color: #f0f2f5;
  }
  
  .right {
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    background-color: #fff;
    border-radius: 10px;
    padding: 5px;
    overflow-y: scroll;
  }
  .sticky-right{
    min-height: 130vh;
    overflow-y: auto;
  }
  .right::-webkit-scrollbar {
    display: none;
  }
  
  form {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }
  
  input {
    height: 30px;
    width: 300px;
    padding: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    height: 30px;
    width: 30px;
    background-color: #eeeeee;
    border: none;
    cursor: pointer;
  }
  
  .container {
    width: 98%;
    margin: 10px auto;
  }

.pages-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.page-box {
  display: flex;
  flex-direction: column;
  width: calc(50% - 10px); /* Ajustez la largeur en fonction de votre mise en page */
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-box img{
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}
.page-box p{
  text-align: center;
  margin: 5px auto;
}
  
  h1 {
    font-size: 28px;
    font-weight: 900;
    margin: 20px auto;
  }
  
  h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  h4 {
    font-size: 14px;
    color: gray;
  }
  
  .feed-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  
  .feed-item p {
    margin-bottom: 5px;
  }
  
  .feed-item img {
    max-width: 100%;
  }
  a {
  text-decoration: none;
  color: inherit;
}

a:visited {
  color: inherit;
}
</style>