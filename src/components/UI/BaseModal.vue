<template>
  <div class="modal fade show" tabindex="-1" :class="{ 'd-block': visible }" style="background-color: rgba(0,0,0,0.5); " @click.self="$emit('close')">
    <div class="modal-dialog" >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <slot />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-secondary" @click="$emit('close')">Cancel</button>
            <button class="btn btn-primary" @click="$emit('confirm')">Confirm</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: 'Modal Title' }
})


</script>

<style scoped>
.modal.d-block {
  display: block;
}
</style>
