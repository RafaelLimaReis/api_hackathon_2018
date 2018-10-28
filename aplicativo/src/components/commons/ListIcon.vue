<template>
  <div class="w3-cell list-icon">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'ListText'
}
</script>

<style scoped>
  .list-icon{
    text-align:right;
    vertical-align:middle;
    width: 10%
  }
</style>
