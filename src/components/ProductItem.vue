<template>
    <div class="page-card">
        <div class="page-cover">
            <!-- <router-link :to="{name:'product_detail', params: {'id': product.id}}"> -->
                <img :src="'http://localhost:8000' + product.get_image">
            <!-- </router-link> -->
        </div>
        <div class="page-details">
            <!-- <router-link :to="{name:'product_detail', params: {'id': product.id}}"> -->
                <h3 class="page-name"><strong>FCFA {{ product.price }}</strong></h3>
            <!-- </router-link> -->
            <p class="page-description">{{ product.name }}</p>
            <p class="page-subscribers">{{ product.location}}</p>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

let props = defineProps ({
    product: Object
});

let product = reactive(props.product);

</script>

<style scoped>

.page-card {
 width: 100%;
}
.page-cover img {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
}

.page-details {
  padding: 10px;
}

.page-name {
  font-size: 18px;
  margin: 0;
}

.page-description {
  font-size: 14px;
  margin: 5px 0;
}

.page-subscribers {
  font-size: 12px;
  color: #888;
  margin: 0;
}

</style>