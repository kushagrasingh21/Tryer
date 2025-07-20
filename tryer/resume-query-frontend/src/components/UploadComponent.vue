<template>
  <div class="component-wrapper">
    <div>
      <h2 class="title">Upload Resumes</h2>
      <div class="upload-fields">
        <label class="file-label">
          Choose Resume(s)
          <input type="file" multiple @change="handleFileChange" class="file-input" />
        </label>
        <button class="nav-button" @click="uploadResumes">Upload Resumes</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      files: []
    };
  },
  methods: {
    handleFileChange(event) {
      this.files = Array.from(event.target.files);
    },
    async uploadResumes() {
      if (!this.files.length) return;

      const formData = new FormData();
      this.files.forEach(file => formData.append('resumes', file));

      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Resumes uploaded successfully!');
    }
  }
};
</script>

<style scoped>
.upload-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 20px;
}

.file-label {
  background-color: #e0e6f0;
  color: #003366;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  border: 2px dashed #003366;
  transition: background 0.3s;
}

.file-label:hover {
  background-color: #d0d9e8;
}

.file-input {
  display: none;
}
</style>
