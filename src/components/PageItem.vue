<template>
    <div class="page-card">
        <div class="page-cover">
            <router-link :to="{name:'page_posts', params: {'id': page.id}}">
                <img :src="'http://localhost:8000' + page.cover">
            </router-link>
        </div>
        <div class="page-details">
            <router-link :to="{name:'page_posts', params: {'id': page.id}}">
                <h3 class="page-name"><strong>{{ page.name }}</strong></h3>
            </router-link>
            <p class="page-description">{{ page.description }}</p>
            <p class="page-subscribers">{{ page.subscribers_count }} subscribers</p>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

let props = defineProps ({
    page: Object
});

let page = reactive(props.page);

</script>

<style scoped>

.page-card {
 width: 100%;
}
.page-cover img {
  width: 100%;
  height: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
a {
  text-decoration: none; 
  color: inherit;
}

a:visited {
  color: inherit;
}
</style>