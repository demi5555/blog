<template>
  <Navbar/>
  <div class="d-flex">
    <Sidebar />
    <div class="flex-grow-1 content p-4">

      <div class="d-flex justify-content-between mb-4">
        <h3 class="fw-bold">Article Page</h3>
        <router-link to="/createArticle" class="btn btn-primary rounded-pill">
          New Article
        </router-link>
      </div>

      <div class="row g-3 border-4 rounded-1 shadow-sm mt-2 p-4">
        <BaseTable 
          :rows="articleStore.ownedArticles" 
          :columns="columns"  
          @delete="handleDelete" 
          @edit="gotoEdit"
        > 
          <template #col-thumbnail="{ value }">
            <img :src="value" class="rounded-circle article-thumbnail" />
          </template>
          <template #col-category="{ row }">
            {{ row.category ? row.category.name : '—' }}
          </template>
        </BaseTable>

        <BasePagination 
          :totalPages="articleStore.pagination.totalPages"
          :current="articleStore.pagination.currentPage" 
          :disabled="articleStore.pagination.totalPages <= 1"
          @update:page="handleNextPage"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import BaseTable from '@/components/UI/BaseTable.vue'
import BasePagination from '@/components/UI/BasePagination.vue'
import { ref, onMounted } from 'vue'
import { useArticleStore } from '@/stores/article'
import api from '@/API/http.js'
import { useRouter } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'

const router = useRouter()
const perPage = ref(3)
const articleStore = useArticleStore()
  
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'thumbnail', label: 'Thumbnail' },
  { key: 'content', label: 'Content' },
  { key: 'category', label: 'Category' },
]

// Initial fetch
onMounted(async () => {
  await articleStore.fetchOwnedArticles({ page: 1, per_page: perPage.value })
})

// Handle pagination change
const handleNextPage = async (page) => {
  await articleStore.fetchOwnedArticles({ page, per_page: perPage.value })
}

// Delete article
const handleDelete = async (id) => {
  try {
    if (!confirm(`Are you sure you want to delete article ID: ${id}?`)) return
    await api.delete(`/articles/${id}`)
    await articleStore.fetchOwnedArticles({ 
      page: articleStore.pagination.currentPage, 
      per_page: perPage.value 
    })
  } catch (err) {
    alert('Failed to delete article: ' + err.message)
  }
}

// Navigate to edit page
const gotoEdit = (id) => {
  router.push(`/editArticle/${id}`)
}
</script>

<style scoped>
.content {
  min-height: 100vh;
  background: #f8f9fa;
}

.article-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
