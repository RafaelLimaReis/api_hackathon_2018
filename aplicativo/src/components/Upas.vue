<template>
	<div class="blue">
    <top-bar>
    </top-bar>
		<container>
      <h6>UPAS</h6>
      <hr/>
      <div>Selecione a UPA</div>
      <div class="w3-cell-row w3-card w3-margin-top w3-margin-bottom" v-for="u in upas" @click="selUpa(u.id)">
        <div class="w3-cell w3-cell-middle" style="width: 80%">
          <b style="padding-left: 20px">{{u.description}}</b>
        </div>
        <div class="w3-cell w3-center w3-metro-dark-blue w3-padding-large" style="width: 20%">
          <b class="w3-large">{{u.total}}</b><br>
          <span class="w3-small">Pessoas</span>
        </div>
      </div>
      <div class="w3-margin-top">Última atualização: {{dataAtualizacao}}</div>
      <br>
      <div>
        <i class="w3-metro-dark-blue legenda">&af;</i>
        <span class="w3-small">- Quantidade de pessoas na fila de Atendimento</span>
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
        upas: [],
        dataAtualizacao: ""
			}
		},
		methods:{
	    selUpa(id) {
	      this.$router.push('upa/'+id)
      }
		},
    created() {
      openLoading("Carregando os Detalhes");

      this.$http.get(base_api + 'upas')
        .then(response => {
          closeLoading();

          this.upas = response.data;
          this.dataAtualizacao = dataAtualFormatada();

        }, response => {
          closeLoading();
          openModalMsg("Erro ao buscar os dados. Tente novamente!");
        });
    }
	}
</script>

<style scoped>
</style>
