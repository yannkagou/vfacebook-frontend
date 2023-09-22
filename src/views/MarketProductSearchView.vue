<template>
    <div class="main" v-if="isLoading == false">
        
        <div class="products-list" v-if="products.length">
            <div class="products" v-for="product in products" :key="product.id">
                <ProductItem :product="product"/>
            </div>
        </div>

        <div v-else>
            <h3>We didn't find any results</h3>
            <h4>Make sure everything is spelled correctly or try different keywords.</h4>
        </div>
    
    </div>

    <div class="spin" v-else>
        <LoadingSpinner />
    </div>
</template>

<script setup>

  import axios from "axios";
  import { ref, onMounted, watch } from "vue";
  import { useToast } from 'vue-toast-notification';
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  import ProductItem from '../components/ProductItem.vue'
  import { useRoute, useRouter } from "vue-router";

  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  let products = ref([]);
  let isLoading = ref(false)
  
  onMounted ( async () =>{
        await submitSearch();
    });

  const submitSearch = async () => {
    isLoading.value = true
    await axios
      .post("/api/search/", {
        query: route.params.query,
      })
      .then((response) => {
        products.value = response.data.products;
        toast.success('Perform search');
        isLoading.value = false
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  watch(
    () => route.params.query,
    () => {
        submitSearch();
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
    flex-wrap: wrap;
}
.products {
  display: flex;
  width: calc(33.33% - 10px); /* Ajustez la largeur en fonction de votre mise en page */
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>