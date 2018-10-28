<template>
	<div class="blue">
    <top-bar>
    </top-bar>
		<container>
      <h6>Detalhes de Atendimento</h6>
      <hr/>
      <div>
        Nome: <b>{{nomeUpa}}</b>
      </div>
      <hr>
      <h6>Classificação</h6>
      <div class="w3-center w3-margin-top" v-for="u in dadosUpas">
        <div class="w3-card w3-padding-large bold w3-round" :class="u.cor">
          <div :class="u.total !== 0 ? 'w3-large' : 'w3-small'">{{u.total === 0 ? "Nenhum Paciente" : u.total}}</div>
          <span class="w3-tiny">{{u.description}}</span>
        </div>
      </div>
      <div class="w3-margin-top w3-margin-bottom">Última atualização: {{dataAtualizacao}}</div>
      <div>
        <i class="w3-metro-blue legenda">&af;</i>
        <span class="w3-small">- Classificação Normal</span>
      </div>
      <div>
        <i class="w3-metro-green legenda">&af;</i>
        <span class="w3-small">- Classificação Média</span>
      </div>
      <div>
        <i class="w3-metro-yellow legenda">&af;</i>
        <span class="w3-small">- Classificação Grave</span>
      </div>
      <div>
        <i class="w3-metro-red legenda">&af;</i>
        <span class="w3-small">- Classificação Gravíssimo</span>
      </div>
      <div class="w3-margin-top w3-small">* Cores de acordo com o Protocólo de Manchester</div>
		</container>
	</div>
</template>

<script>
import Container from '../components/commons/Container.vue'
import TopBar from './commons/TopBar.vue';
import index from "../router";

export default {
	components:{TopBar,Container},
		data(){
			return {
			  dataAtualizacao: "",
        nomeUpa: "",
        dadosUpas: []
			}
		},
    created() {
	    openLoading("Carregando os Detalhes");

	    this.$http.get(base_api + 'upas/detalhes/' + this.$route.params.id)
        .then(response => {
          closeLoading();
          this.dadosUpas = response.data;

          this.dataAtualizacao = dataAtualFormatada();

        }, response => {
          closeLoading();
          openModalMsg("Erro ao buscar os dados. Tente novamente!");
        });

      if (this.$route.params.id == 165) {
        this.nomeUpa = "Pronto Socorro"

      } else if (this.$route.params.id == 339) {
        this.nomeUpa = "UPA Anita"

      } else if (this.$route.params.id == 303) {

        this.nomeUpa = "UPA Aeroporto"
      }

    }
	}
</script>

<style scoped>


</style>
