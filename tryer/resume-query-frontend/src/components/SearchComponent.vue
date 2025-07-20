<template>
  <div class="component-wrapper">
    <div>
      <h2 class="title">Search Resumes</h2>
      <div class="search-fields">
        <input v-model="query.name" placeholder="Name" />
        <input v-model="query.location" placeholder="Location" />
        <input v-model="query.experience" placeholder="Experience" />
        <input v-model="query.skills" placeholder="Skills (comma separated)" />
        <button class="nav-button" @click="search">Search</button>
      </div>

      <div v-if="results.length" class="results-container">
        <div v-for="r in results" :key="r._id" class="result-card">
          <p><strong>Name:</strong> {{ r.name }}</p>
          <p><strong>Email:</strong> {{ r.email }}</p>
          <p><strong>Phone:</strong> {{ r.phone }}</p>
          <p><strong>Location:</strong> {{ r.location }}</p>
          <p><strong>Experience:</strong> {{ r.experience }}</p>
          <p><strong>Skills:</strong> {{ r.skills?.join(', ') }}</p>
          <p><strong>Projects:</strong> {{ r.projects?.join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: {
        name: '',
        location: '',
        experience: '',
        skills: ''
      },
      results: []
    };
  },
  methods: {
    async search() {
      const res = await axios.get('http://localhost:5000/api/search', {
        params: this.query
      });
      this.results = res.data;
    }
  }
};
</script>

<style scoped>
.search-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}

.search-fields input {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
}
</style>
