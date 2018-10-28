<template>
  <div>
    <div class="w3-padding container">
      <div>
        <slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Container'
}
</script>

<style scoped>
  .container {
    margin-top: 55px!important;
    margin-bottom: 30px;
  }
</style>
