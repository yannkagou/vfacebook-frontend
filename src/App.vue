<script setup>
import { useUserStore } from '@/stores/user'
</script>


<template>
  <router-view />
</template>


<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body{
  min-width: 580px;
}

</style>
