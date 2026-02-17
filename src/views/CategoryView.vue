<template>
  <Navbar />

  <div class="d-flex">
    <Sidebar />

    <div class="flex-grow-1 content p-4">
      <div class="row justify-content-between align-items-center mb-4">
        <h3 class="fw-bold col">Category Page</h3>

        <div class="col-auto">
          <button class="btn btn-success" @click="openCreate">
            New Category
          </button>
        </div>
      </div>

      <div class="row g-3 border-4 rounded-1 shadow-sm mt-2 p-4">
        <BaseTable
          :rows="categoriesStore.categories"
          :columns="columns"
          @edit="openEdit"
          @delete="openDelete"
        />

        <BasePagination
          :totalPages="categoriesStore.pagination.totalPages"
          :current="categoriesStore.pagination.currentPage"
          :disabled="categoriesStore.pagination.totalPages <= 1"
          @update:page="handleNextPage"
        />
      </div>
    </div>
  </div>

  <!-- Create / Edit modal -->
  <BaseModal
    :visible="showModal"
    :title="editId !== null ? 'Edit Category' : 'New Category'"
    @close="closeModal"
    @confirm="saveCategory"
  >
    <input
      type="text"
      class="form-control"
      placeholder="Category name"
      v-model="categoryName"
    />
  </BaseModal>

  <!-- Delete modal -->
  <BaseModal
    :visible="showModalDelete"
    title="Delete Category"
    @close="closeDeleteModal"
    v-if="showModalDelete"
  >
    <div>
      <p>Are you sure you want to delete this category?</p>
    </div>

    <template #footer>
      <button class="btn bg-secondary text-light" @click="closeDeleteModal">
        Cancel
      </button>

      <button class="btn bg-danger text-light" @click="handleDelete">
        Delete Category
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import BaseTable from '@/components/UI/BaseTable.vue'
import BasePagination from '@/components/UI/BasePagination.vue'
import BaseModal from '@/components/UI/BaseModal.vue'

import api from '@/API/http.js'
import { useCategoryStore } from '@/stores/category'

const categoriesStore = useCategoryStore()

const showModal = ref(false)
const showModalDelete = ref(false)

const categoryName = ref('')
const editId = ref(null)
const deleteId = ref(null)

const per_page = ref(6)

const columns = [
  { key: 'name', label: 'Name' }
]

onMounted(async () => {
  await categoriesStore.fetchCategories(1, per_page.value)
})

const handleNextPage = async (page) => {
  await categoriesStore.fetchCategories(page, per_page.value)
}

/* ---------------- create ---------------- */

const openCreate = () => {
  editId.value = null
  categoryName.value = ''
  showModal.value = true
}

/* ---------------- edit ---------------- */

const openEdit = (row) => {
  if (!row || !row.id) return

  editId.value = row.id
  categoryName.value = row.name
  showModal.value = true
}

/* ---------------- save (create / update) ---------------- */

const saveCategory = async () => {
  if (!categoryName.value.trim()) {
    alert('Category name is required')
    return
  }

  try {
    if (editId.value !== null) {
      await api.put(`/categories/${editId.value}`, {
        name: categoryName.value
      })
    } else {
      await api.post('/categories', {
        name: categoryName.value
      })
    }

    await categoriesStore.fetchCategories(
      categoriesStore.pagination.currentPage,
      per_page.value
    )

    closeModal()
  } catch (error) {
    console.error(error)
    alert('Failed to save category')
  }
}

/* ---------------- delete ---------------- */

const openDelete = (row) => {
  if (!row || !row.id) return

  deleteId.value = row.id
  showModalDelete.value = true
}

const handleDelete = async () => {
  if (!deleteId.value) return

  try {
    await api.delete(`/categories/${deleteId.value}`)

    await categoriesStore.fetchCategories(
      categoriesStore.pagination.currentPage,
      per_page.value
    )

    closeDeleteModal()
  } catch (error) {
    console.error(error)
    alert('Failed to delete category')
  }
}

/* ---------------- close modals ---------------- */

const closeModal = () => {
  showModal.value = false
  categoryName.value = ''
  editId.value = null
}

const closeDeleteModal = () => {
  showModalDelete.value = false
  deleteId.value = null
}
</script>

<style scoped>
.content {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>
