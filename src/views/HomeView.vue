<template>
  <div class="home">
    <router-link to="/column">Column chart</router-link>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';

export default defineComponent({
  name: 'HomeView',
});
</script>
