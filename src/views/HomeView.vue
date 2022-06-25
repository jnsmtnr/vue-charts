<template>
  <div class="home">
    <router-link to="/column">Column chart</router-link>
    <router-link to="/bar">Bar chart</router-link>
    <router-link to="/pie">Pie chart</router-link>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style scoped>
  .home {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a {
    display: block;
  }
</style>
