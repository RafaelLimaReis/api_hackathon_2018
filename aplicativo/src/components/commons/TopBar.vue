<template>
	<div class="w3-top w3-metro-dark-blue">
		<div class="w3-bar top-bar">
      <button class="w3-bar-item w3-button" @click="abrirMenu">
        <i class="fa" :class="fa"></i>
      </button>
		</div>
    <nav class="w3-sidebar w3-bar-block w3-card w3-white w3-padding-16" v-show="menu">
      <div class="w3-bar-item w3-center">
        <i class="fa fa-user blue fa-2x"></i> <br/>
        <span class="w3-small bold">{{usuario}}</span>
      </div>
      <hr>
      <router-link :to="'/administrativo'" class="w3-bar-item w3-border-bottom w3-small w3-padding-16" @click.native="abrirMenu">
        <i class="fa fa-angle-right w3-right blue"></i> ADMINISTRATIVO
      </router-link>
      <router-link :to="'/home'" class="w3-bar-item w3-border-bottom w3-small w3-padding-16" @click.native="abrirMenu">
        <i class="fa fa-angle-right w3-right blue"></i> MAPA DAS UPAS
      </router-link>
		  <router-link :to="'/upas'" class="w3-bar-item w3-border-bottom w3-small w3-padding-16" @click.native="abrirMenu">
        <i class="fa fa-angle-right w3-right blue"></i> UPAS
		  </router-link>
      <router-link :to="'/fluxo'" class="w3-bar-item w3-border-bottom w3-small w3-padding-16" @click.native="abrirMenu">
		  	<i class="fa fa-angle-right w3-right blue"></i> FLUXO ATENDIMENTO
      </router-link>
      <router-link :to="'/ajuda'" class="w3-bar-item w3-border-bottom w3-small w3-padding-16" @click.native="abrirMenu" v-show="false">
        <i class="fa fa-angle-right w3-right blue"></i> AJUDA
      </router-link>
      <router-link :to="'/sobre-nos'" class="w3-bar-item w3-border-bottom w3-small w3-padding-16" @click.native="abrirMenu">
		  	<i class="fa fa-angle-right w3-right blue"></i> SOBRE
      </router-link>
      <a class="w3-bar-item w3-small w3-padding-16" @click="logoff">
        <i class="fa fa-angle-right w3-right blue"></i> SAIR
      </a>
		</nav>
	</div>
</template>

<script>
	export default {
    data(){
			return{
				menu: false,
				fa: 'fa-bars',
        usuario: ""
			}
		},
		methods:{
			abrirMenu(){
				this.menu = !this.menu;
				this.menu === true ? this.fa = 'fa-times' : this.fa = 'fa-bars'
			},
      logoff() {
        openLoading("Realizando o Logoff");

        setTimeout(() => {
          closeLoading();
          sessionStorage.clear();
          this.$router.push("/")
        },2000);
      }
		},
    created() {
      if (sessionStorage.getItem('login')) {
        this.usuario = JSON.parse(sessionStorage.getItem('login')).nome
      }
    }
	}
</script>


<style>
i{
	font-size: 1.5em;
}
.w3-bar {
  padding: 6px 8px;
}
.top-bar {
  box-shadow: 0 2px 6px -1px #aaa;
  font-weight: 900;
}
</style>
