<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {

  },
  created() {

  }
}
</script>
<style>
  a {
    text-decoration: none;
  }
  .bold{
    font-weight: bold;
  }
  .blue {
    color: #2b5797!important;
  }
  .show {
    display: block;
  }
  .legenda {
    width: 30px;
    height: 15px;
    display: block;
    float: left;
    margin-right: 5px;
    margin-top: 4px;
  }

</style>
