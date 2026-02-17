<template>
        <div class="col-md-6 col-lg-4" v-for="article in articles" :key="article.id">
          <router-link :to="`/detail/${article.id}`" class="text-decoration-none text-dark">
          <div class="card h-100 p-3">
            <img :src="article.thumbnail" class="card-img-top rounded-3 mb-3" alt="" style="width: 100%; height: 300px; object-fit: cover; " />

            <span class="badge bg-warning text-dark mb-2 py-2">Draft</span>

            <h5 class="fw-bold">{{ article.title }}</h5>
            <div class="text-muted small" v-html="article.content">
            </div>
            <div class="d-flex justify-content-between align-items-center mt-auto">
              <small class="text-muted"> by {{ article.creator.firstName }} {{ article.creator.lastName }}</small>
              <small class="text-muted"> {{new Date(article.createdAt).toLocaleDateString()}}</small>
            </div>
          </div>

            </router-link>
        </div>
</template>
<script setup>
let props = defineProps({
  articles: Array , default: []
})
</script>