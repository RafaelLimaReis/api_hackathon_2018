<template>
	<div class="blue">
    <top-bar>
    </top-bar>
		<container>
      <h4>Fluxo de Atendimento</h4>
      <hr>
      <div class="w3-margin-bottom">
        <label>Selecione o UPA</label>
        <select class="w3-select w3-white w3-border-bottom" v-model="upaSelect" @change="selUpa">
          <option value="ANITA">Anita</option>
          <option value="AERO">Aeroporto</option>
          <option value="PSR">Pronto Socorro</option>
        </select>
      </div>
      <label>Selecione o fluxo</label>
      <div class="w3-cell-row w3-center w3-margin-top w3-margin-bottom w3-round w3-border w3-metro-dark-blue">
        <div class="w3-cell w3-padding" style="width: 50%" :class="{'active':tipoFluxo === 2}" @click="getFluxoDiario()">
          <b>Diário</b>
        </div>
        <div class="w3-cell w3-border-left w3-padding" :class="{'active':tipoFluxo === 1}" style="width: 50%" @click="getFluxoSemanal()">
          <b>Semanal</b>
        </div>
      </div>
      <div v-show="tipoFluxo === 1">
        <h6>Fluxo de Pessoas no Dia</h6>
        <vue-chart
          :data="chartData"
          :options="option"
          :update-config="{duration: 800, easing: 'easeOutBounce'}"
          type="line"
        />
      </div>
      <div v-show="tipoFluxo === 2">
        <h6>Selecione o dia da semana</h6>
        <div class="w3-margin-bottom w3-cell-row w3-center w3-round w3-border-top w3-border-bottom">
          <div class="w3-cell w3-padding" :class="{'ativo':dia === 0}" @click="selDia(0)" style="width: 14.30%" >D</div>
          <div class="w3-cell w3-border-left w3-padding" :class="{'ativo':dia === 1}" @click="selDia(1)" style="width: 14.30%">S</div>
          <div class="w3-cell w3-border-left w3-padding" :class="{'ativo':dia === 2}" @click="selDia(2)" style="width: 14.30%">T</div>
          <div class="w3-cell w3-border-left w3-padding" :class="{'ativo':dia === 3}" @click="selDia(3)" style="width: 14.30%">Q</div>
          <div class="w3-cell w3-border-left w3-padding" :class="{'ativo':dia === 4}" @click="selDia(4)" style="width: 14.30%">Q</div>
          <div class="w3-cell w3-border-left w3-padding" :class="{'ativo':dia === 5}" @click="selDia(5)" style="width: 14.30%">S</div>
          <div class="w3-cell w3-border-left w3-padding" :class="{'ativo':dia === 6}" @click="selDia(6)" style="width: 14.30%">S</div>
        </div>
        <div>
          <vue-chart
            :data="chartDataSemanal"
            :options="option"
            :update-config="{duration: 800, easing: 'easeOutBounce'}"
            type="line"
          />
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
        chartData: {
          labels: [],
          datasets: []
        },
        chartDataSemanal: {
          labels: [],
          datasets: []
        },
        tipoFluxo: 1,
        dia: 0,
        upaSelect: "ANITA",
        option: {
          scales: {yAxes: [{ticks: {beginAtZero: true}}]},
          legend: {
            position: 'bottom'
          }
        }
      }
    },
		methods:{
	    getFluxoDiario() {
        openLoading("Buscando os dados");

        this.tipoFluxo = 1;
        this.chartData.datasets = [];

        this.$http.get(base_api + 'upas/' + this.upaSelect)
          .then(response => {
            let dados = {
              label: 'Pacientes',
              data: response.data.values
            };

            this.chartData.labels = response.data.hours;
            this.chartData.datasets.push(dados)

            setTimeout(() => {
              closeLoading();
            },1000);

          }, response => {
            openLoading("Erro ao consultar os dados. Tente novamente!")

            setTimeout(() => {
              closeLoading();
            },1000);

          });
      },

      getFluxoSemanal() {
        openLoading("Buscando os dados");

        this.tipoFluxo = 2;
        this.chartDataSemanal.datasets = [];

        this.$http.get(base_api + 'upas/' + this.upaSelect + '/' + this.dia)
          .then(response => {
            let dados = {
              label: 'Pacientes',
              data: response.data.values
            };

            this.chartDataSemanal.labels = response.data.hours;
            this.chartDataSemanal.datasets.push(dados);

            setTimeout(() => {
              closeLoading();
            },1000);

          }, response => {
            openLoading("Erro ao consultar os dados. Tente novamente!")

            setTimeout(() => {
              closeLoading();
            },1000);
          });
      },

      selDia(dia) {
	      this.dia = dia;
	      this.getFluxoSemanal();
      },

      selUpa() {
        if (this.tipoFluxo === 1) {
          this.getFluxoDiario()

        } else {
          this.getFluxoSemanal()
        }
      }
		},
    created() {
	    this.dia = new Date().getDay();
	    this.getFluxoDiario();
    }
	}
</script>

<style scoped>

.active {
  background-color: #ffffff;
  color: #2b5797;
}
.ativo {
  background-color: #2b5797;
  color: #ffffff;
}
</style>
