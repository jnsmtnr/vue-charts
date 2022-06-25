<template>
  <div id="app">
    <nav v-if="showNavbar">
      <router-link to="/column">Column chart</router-link>
      <router-link to="/bar">Bar chart</router-link>
      <router-link to="/pie">Pie chart</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  computed: {
    showNavbar() {
      return this.$route.name !== 'home'
    }
  },
})
</script>


<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
