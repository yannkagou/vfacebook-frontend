<template>
    <div class="main" v-if="isLoading == false">
        
        <div class="products-list" v-if="products.length">
            <div class="products" v-for="product in products" :key="product.id">
                <ProductItem :product="product"/>
            </div>
        </div>

        <div v-else>
            <h1>No Products Now</h1>
        </div>
    
    </div>

    <div class="spin" v-else>
        <LoadingSpinner />
    </div>
</template>

<script setup>

import ProductItem from '../components/ProductItem.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted, reactive, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useToast } from 'vue-toast-notification';

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();

    let isLoading = ref(false)
    let products = ref([]);
    let category = reactive ({});

    onBeforeMount(async () => {
        await userStore.initStore();
    })
    onMounted(async () => {
        await getProducts();
    })

    const getProducts = async () => {
        isLoading.value = true
        await axios
            .get(`/api/marketplace/products/`)
            .then(response => {
                console.log("all products", response.data)
                products.value = response.data
                console.log('all products', products.value)
                isLoading.value = false
            })
            .catch(error => {
                console.log('error :', error)
            })
    };


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
}
.products-list{
    width: 100%;
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