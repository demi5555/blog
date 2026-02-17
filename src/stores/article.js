import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/API/http'

export const useArticleStore = defineStore('articles', () => {
  // Public articles
  const articles = ref([])

  // Own articles
  const ownedArticles = ref([])

  // Pagination state
  const pagination = reactive({
    currentPage: 1,
    itemPerPage: 3,
    totalItems: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: true
  })

  async function fetchArticles({ search = '', sortBy = 'createdAt', sortDir = 'desc', page = 1, per_page = 10 } = {}) {
    try {
      const res = await api.get('/articles', {
        params: {
          search,
          sortBy,
          sortDir,
          _page: page,
          _per_page: per_page
        }
      })

      articles.value = res.data.data.items

      // Optional: update pagination for public articles if needed
      pagination.totalItems = res.data.data.meta.totalItems
      pagination.totalPages = res.data.data.meta.totalPages
      pagination.currentPage = res.data.data.meta.currentPage
      pagination.hasPreviousPage = res.data.data.meta.hasPreviousPage
      pagination.hasNextPage = res.data.data.meta.hasNextPage

      return res.data.data
    } catch (err) {
      console.error('Failed to fetch articles:', err)
      throw err
    }
  }

  // Fetch own articles with search/sort/pagination
  async function fetchOwnedArticles({ search = '', sortBy = 'createdAt', sortDir = 'desc', page = 1, per_page = 3 } = {}) {
    try {
      const res = await api.get('/articles/own', {
        params: {
          search,
          sortBy,
          sortDir,
          _page: page,
          _per_page: per_page
        }
      })

      ownedArticles.value = res.data.data.items

      // Update pagination meta
      pagination.totalItems = res.data.data.meta.totalItems
      pagination.totalPages = res.data.data.meta.totalPages
      pagination.currentPage = res.data.data.meta.currentPage
      pagination.hasPreviousPage = res.data.data.meta.hasPreviousPage
      pagination.hasNextPage = res.data.data.meta.hasNextPage

      return res.data.data
    } catch (err) {
      console.error('Failed to fetch owned articles:', err)
      throw err
    }
  }

  return {
    articles,
    ownedArticles,
    pagination,
    fetchArticles,
    fetchOwnedArticles
  }
})
