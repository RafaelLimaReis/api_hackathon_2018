<template>
  <div class="w3-cell-row list">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'List'
}
</script>

<style scoped>
  .list{
    border-top: 1px solid #f1f1f1;
    padding: 16px;
  }
</style>
