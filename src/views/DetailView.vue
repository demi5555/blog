<template>
<Navbar/>
  <div class="d-flex">
    <Sidebar />

    <!-- Main Content -->
    <div class="container py-5 px-4">
      <div class="article-detail">
        <!-- Article Title -->
        <h1 class="fw-bold mb-3 fs-2 article-title">{{ articleDetail.title }}</h1>

        <!-- Article Thumbnail -->
        <div class="mb-4 shadow-sm rounded-4 overflow-hidden">
          <img
            :src="articleDetail.thumbnail"
            class="img-fluid w-100"
            alt="thumbnail"
            style="object-fit: cover; height: 500px;"
          />
        </div>

        <!-- Author Info -->
        <div class="d-flex align-items-center gap-3 mb-4">
          <img
            :src="articleDetail.creator?.avatar"
            class="rounded-circle shadow-sm"
            width="50"
            height="50"
            alt="author avatar"
          />
          <div>
            <div class="fw-semibold text-dark">
              By {{ articleDetail.creator?.firstName }} {{ articleDetail.creator?.lastName }}
            </div>
            <small class="text-muted">{{ new Date(articleDetail.createdAt).toLocaleDateString() }}</small>
          </div>
        </div>

        <!-- Article Content -->
        <div class="article-content fs-5 text-dark">
            {{ articleDetail.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import api from '@/API/http';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/layout/Navbar.vue';

const route = useRoute();
const id = route.params.id;
let articleDetail = ref({});

onMounted(async () => {
  let res = await api.get('/articles/' + id);
  articleDetail.value = res.data.data;
});
</script>

<style scoped>
.article-title {
  color: #1f1f1f;
}


/* Optional: add subtle hover effect on images */
.article-detail img:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

/* Bell notification badge */
.bi-bell {
  cursor: pointer;
}
</style>
