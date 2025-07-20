<template>
  <div class="app-container">
    <h1 class="title">Tryer</h1>
    <div class="center-buttons">
      <button class="nav-button" @click="tab = 'upload'">Upload</button>
      <button class="nav-button" @click="tab = 'search'">Search</button>
    </div>
    <div class="component-wrapper">
      <upload-component v-if="tab === 'upload'" />
      <search-component v-if="tab === 'search'" />
    </div>
  </div>
</template>

<script>
import UploadComponent from './components/UploadComponent.vue'
import SearchComponent from './components/SearchComponent.vue'

export default {
  components: { UploadComponent, SearchComponent },
  data() {
    return { tab: 'upload' };
  }
}
</script>

<style src="./assets/css/main.css"></style>
