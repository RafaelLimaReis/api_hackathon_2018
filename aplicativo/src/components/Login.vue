<template>
	<container class="blue">
    <div style="margin-top: 30px" class="w3-margin">
      <div class="w3-center">
        <img class="w3-image" src="/static/imgs/logo.png" style="width: 80px"/>
      </div>
      <br>
      <h4 class="w3-center">Login</h4>
      <hr>
      <div class="w3-margin-top">
        <label>Usuário</label>
        <input class="w3-input" v-model="dados.cpf" placeholder="Informe seu usuário"/>
      </div>
      <div class="w3-margin-top">
        <label>Senha</label>
        <input class="w3-input" type="password" v-model="dados.senha" placeholder="Informe sua senha"/>
      </div>
      <button class="w3-button w3-metro-dark-blue w3-block w3-round" style="margin-top: 30px" @click="logar">Entrar</button>
    </div>
  </container>
</template>

<script>
import Container from '../components/commons/Container.vue'
	export default {
		components:{
			Container
		},
    data() {
      return {
        dados: {
          cpf: '',
          senha: ''
        }
      }
    },
    methods: {
      logar() {
        openLoading("Validando os dados");

        this.$http.post("https://www.franca.sp.gov.br/api/rest/central/usuario/verifica", this.dados)
          .then(response => {

            sessionStorage.clear();
            sessionStorage.setItem("login",JSON.stringify(response.data));

            setTimeout(() => {
              closeLoading();
              this.$router.push("home")
            },2000);

          }, response => {
            closeLoading();
            openModalMsg(response.bodyText,"")
          });
      }
    },
    created() {
      if (sessionStorage.getItem("login")) {
        this.$router.push("home")
      }
    }
	}
</script>

<style></style>
