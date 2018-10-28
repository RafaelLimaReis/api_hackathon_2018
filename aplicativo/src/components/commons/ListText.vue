<template>
  <div class="w3-cell list-text">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'ListText'
}
</script>

<style scoped>
  .list-text{
    font-size: 1em;
    font-weight: bold;
    vertical-align:middle
  }  
</style>
