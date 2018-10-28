<template>
  <div class="blue">
    <top-bar>
    </top-bar>
    <container>
      <h5>Sobre nós</h5>
      <hr/>
      <div class="w3-margin-bottom w3-card w3-padding-large w3-round w3-metro-dark-blue w3-small">
        Este APP foi desenvolvido por alunos do Uni-FACEF (Centro Universitário Municipal de Franca) com apoio da Divisão de Tecnologia da Informação da Prefeitura de Franca através do evento "Hackthon social 2018".
      </div>
      <div class="w3-metro-dark-blue w3-padding-large">
        Equipe de Desenvolvimento
      </div>
      <div class="w3-center w3-margin-top">
        <div class="w3-margin-bottom w3-card w3-padding w3-round">
          <img src="/static/imgs/devs/elias.jpg" class="w3-image"/>
          <div class="w3-margin-top">
            <span class="w3-large">Elias Portela</span><br>
            <span class="w3-small">(FrontEnd Developer)</span>
          </div>
        </div>
        <div class="w3-margin-bottom w3-card w3-padding w3-round">
          <img src="/static/imgs/devs/dih.png" class="w3-image"/>
          <div class="w3-margin-top">
            <span class="w3-large">Dieniffer Sabrina</span><br>
            <span class="w3-small">(Developer)</span>
          </div>
        </div>
        <div class="w3-margin-bottom w3-card w3-padding w3-round">
          <img src="/static/imgs/devs/rafa.png" class="w3-image"/>
          <div class="w3-margin-top">
            <span class="w3-large">Rafael Lima</span><br>
            <span class="w3-small">(Developer)</span>
          </div>
        </div>
        <div class="w3-margin-bottom w3-card w3-padding w3-round">
          <img src="/static/imgs/devs/evelyn.png" class="w3-image"/>
          <div class="w3-margin-top">
            <span class="w3-large">Evelyn Gomes</span><br>
            <span class="w3-small">(Analista)</span>
          </div>
        </div>
      </div>
      <div class="w3-metro-dark-blue w3-padding-large">
        Apoio
      </div>
      <div class="w3-center w3-margin-top">
        <div class="w3-margin-bottom w3-card w3-padding-large w3-round">
          <img src="/static/imgs/devs/prefeitura.png" class="w3-image"/>
          <div class="w3-margin-top">
            <span>Prefeitura Municipal de Franca</span><br>
          </div>
        </div>
      </div>
      <div class="w3-metro-dark-blue w3-padding-large">
        Desenvolvido por
      </div>
      <div class="w3-center w3-margin-top">
        <div class="w3-margin-bottom w3-card w3-padding-large w3-round">
          <img src="/static/imgs/devs/facef.png" class="w3-image"/>
          <div class="w3-margin-top">
            <span>Uni-FACEF</span><br>
          </div>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
  import Container from '../components/commons/Container.vue'
  import TopBar from './commons/TopBar.vue';

  export default {
    components:{TopBar,Container},
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>

<style scoped>


</style>
