<template>
  <nav aria-label="Page navigation example" v-if="totalPages > 1">
    <ul class="pagination">

      <!-- previous -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === 1 }"
        @click.prevent="previousPage"
      >
        <a class="page-link" href="#">
          « Previous
        </a>
      </li>

      <!-- pages -->
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="goToPage(page)"
        >
          {{ page }}
        </a>
      </li>

      <!-- next -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === totalPages }"
        @click.prevent="nextPage"
      >
        <a class="page-link" href="#">
          Next »
        </a>
      </li>

    </ul>
  </nav>
</template>
<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:page'])

const props = defineProps({
  totalPages: { type: Number, default: 0 },
  current: { type: Number, default: 1 }
})

const currentPage = ref(props.current)

watch(
  () => props.current,
  val => currentPage.value = val
)

const goToPage = (page) => {
  if (page === currentPage.value) return
  emit('update:page', page)
}

const nextPage = () => {
  if (currentPage.value < props.totalPages) {
    emit('update:page', currentPage.value + 1)
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    emit('update:page', currentPage.value - 1)
  }
}
</script>
