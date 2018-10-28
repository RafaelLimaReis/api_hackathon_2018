<template>
	<div class="blue">
    <top-bar>
    </top-bar>
    <container>
      <div class="w3-row-padding">
        <div class="w3-col m3">
          <div style="width: 80%; margin-top: 24px">
            <h6 class="w3-padding-large">Escolha seu Relatório</h6>
            <hr>
            <div class="w3-padding-large w3-border-bottom cursor" @click="selFluxo(1)">
              <span :class="tipoFluxo === 1 ? 'bold' : ''">Fluxo Pacientes por Horas</span>
              <i class="fa fa-angle-right w3-right" v-show="tipoFluxo !== 1"></i>
            </div>
            <div class="w3-padding-large w3-border-bottom cursor" @click="selFluxo(2)">
              <span :class="tipoFluxo === 2 ? 'bold' : ''">Fluxo por classificação de risco</span>
              <i class="fa fa-angle-right w3-right" v-show="tipoFluxo !== 2"></i>
            </div>
            <div class="w3-padding-large w3-border-bottom cursor" @click="selFluxo(3)" v-show="false">
              <span :class="tipoFluxo === 3 ? 'bold' : ''">Fluxo Tempo de Atendimento</span>
              <i class="fa fa-angle-right w3-right" v-show="tipoFluxo !== 3"></i>
            </div>
            <div class="w3-padding-large cursor" @click="selFluxo(4)">
              <span :class="tipoFluxo === 4 ? 'bold' : ''">Alertas para picos de Atendimento</span>
              <i class="fa fa-angle-right w3-right" v-show="tipoFluxo !== 4"></i>
            </div>
          </div>
        </div>
        <div class="w3-col m9" style="position: relative">
          <div v-show="tipoFluxo !== 4">
            <h5 class="w3-margin-top">Pessoas por hora</h5>
            <div>Última atualização: {{dataAtualizacao}}</div>
            <div class="w3-margin-top w3-margin-bottom w3-row-padding">
              <div class="w3-col s4">
                <label>Selecione o Upa</label>
                <select class="w3-select w3-white" v-model="upa" @change="selFluxo(tipoFluxo)">
                  <option value="ANITA">Anita</option>
                  <option value="AERO">Aeroporto</option>
                  <option value="PSR">Pronto Socorro</option>
                </select>
              </div>
              <div class="w3-col s4">
                <label>Data Início</label>
                <input class="w3-input" v-model="dateInicio" type="date" @change="selFluxo(tipoFluxo)"/>
              </div>
              <div class="w3-col s4">
                <label>Data Fim</label>
                <input class="w3-input" v-model="dataFim" type="date" @change="selFluxo(tipoFluxo)"/>
              </div>
            </div>
            <div class="w3-card w3-margin-top w3-padding-large" style="position: relative; height: 65vh" v-show="tipoFluxo === 1">
              <div style="position: relative; height: 60vh; margin-top: 16px">
                <vue-chart
                  :data="chartData"
                  :options="option"
                  :update-config="{duration: 800, easing: 'easeOutBounce'}"
                  type="line"
                />
              </div>
            </div>
            <div class="w3-card w3-margin-top w3-padding-large" style="position: relative; height: 65vh" v-show="tipoFluxo === 2">
              <div style="position: relative; height: 60vh; margin-top: 16px">
                <vue-chart
                  :data="chartData"
                  :options="option"
                  :update-config="{duration: 800, easing: 'easeOutBounce'}"
                  type="line"
                />
              </div>
            </div>
            <div class="w3-card w3-margin-top w3-padding-large" style="position: relative; height: 65vh" v-show="tipoFluxo === 3">
              <div style="position: relative; height: 60vh; margin-top: 16px">
                <vue-chart
                  :data="chartData"
                  :options="option"
                  :update-config="{duration: 800, easing: 'easeOutBounce'}"
                  type="line"
                />
              </div>
            </div>
          </div>
          <div v-show="tipoFluxo === 4">
            <h5 class="w3-margin-top">Cadastrar alerta de picos</h5>
            <hr>
            <div class="w3-row-padding">
              <div class="w3-col m4">
                <label>Selecione o UPA</label>
                <select class="w3-select w3-white" v-model="upaSelect">
                  <option value="Todos os UPAS">Todos os UPAS</option>
                  <option value="UPA Anita">UPA Anita</option>
                  <option value="UPA Aeroporto">UPA Aeroporto</option>
                  <option value="Pronto Socorro">Pronto Socorro</option>
                </select>
              </div>
              <div class="w3-col m4">
                <label>Quantidade mínima de Pacientes</label>
                <input class="w3-input" type="number" v-model="qtdPaciente" placeholder="Informe a quantidade de Paciente" min="10"/>
              </div>
              <div class="w3-col m4">
                <label>Cadastrar Notificação</label>
                <button class="w3-button w3-block w3-metro-dark-blue w3-round" @click="cadastrar">Cadastrar</button>
              </div>
            </div>
            <hr>
            <div class="w3-margin-top">
              <table class="w3-table w3-border" v-show="alerta !== []">
                <tr class="w3-metro-dark-blue">
                  <th>UPA Selecionado</th>
                  <th>Quantidade Pacientes</th>
                  <th>Remover Cadastro</th>
                </tr>
                <tr v-for="a in alerta">
                  <td>{{a.upa}}</td>
                  <td>{{a.qtdPaciente}}</td>
                  <td><div class="w3-text-red"><i class="fa fa-trash"></i> Remover Cadastro</div></td>
                </tr>
              </table>
            </div>
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
        upaSelect: "Todos os UPAS",
        qtdPaciente: 10,
			  dataAtualizacao: "",
			  dateInicio: "2018-10-20",
			  dataFim: "2018-10-20",
        upa: "ANITA",
        alerta: [],
        chartData: {
          labels: [],
          datasets: []
        },
        tipoFluxo: 1,
        dia: 1,
        option: {
          scales: {yAxes: [{ticks: {beginAtZero: true}}]},
          legend: {
            position: 'bottom',
          },
          responsive: true,
          maintainAspectRatio: false,
        }
			}
		},
		methods:{
      selFluxo(tipo) {

        if (new Date(this.dateInicio) > new Date(this.dataFim)) {
          openModalMsg("Atenção!","A data Início não pode ser maior que a data fim");

        } else {

          console.log(tipo);

          switch (tipo) {
            case 1:
              this.$http.get(base_api + 'upas/' + this.upa)
                .then(response => {
                  let dados = {
                    label: 'Pacientes',
                    data: response.data.values
                  };

                  this.chartData.datasets = [];

                  this.chartData.labels = response.data.hours;
                  this.chartData.datasets.push(dados)

                  closeLoading();

                }, response => {
                  openLoading("Erro ao consultar os dados. Tente novamente!")

                  setTimeout(() => {
                    closeLoading();
                  },1000);

                });

              break;

            case 2:
              this.$http.get(base_api + 'upas/' + this.upa + '/' + this.dateInicio + '/' + this.dataFim)
                .then(response => {

                  this.chartData.labels = response.data.hours;
                  this.chartData.datasets = [];

                  let values = response.data.values;
                  values.forEach(r => {
                    this.chartData.datasets.push({
                      label: r.description,
                      data: r.quantity,
                      backgroundColor: r.color,
                    })
                  })

                }, response => {
                  closeLoading();
                  openModalMsg("Erro!", "Erro ao buscar os dados. Tente novamente!");
                });

              break;

            case 3:
              this.$http.get(base_api + 'upas/mediumTime/' + this.dateInicio + '/' + this.dataFim)
                .then(response => {

                  this.chartData.datasets = [];
                  this.chartData.labels = ["UPA Aeroporto","UPA Anita","Pronto Socorro"];
                  //
                  let values = response.data;
                    values.forEach(r => {

                      this.chartData.datasets.push({
                         label: "test",
                         data: 15
                      })

                  })

                }, response => {
                  closeLoading();
                  openModalMsg("Erro!", "Erro ao buscar os dados. Tente novamente!");
                });

              break;
          }

          this.tipoFluxo = tipo;
          this.dataAtualizacao = dataAtualFormatada();
        }
      },
      cadastrar() {
        openLoading("Carregando Informações");

        setTimeout(() => {
          closeLoading();
          this.alerta.push({
            upa: this.upaSelect,
            qtdPaciente: this.qtdPaciente
          });
          openModalMsg("Sucesso", "Cadastrado com sucesso");
        },2000);
      }
		},
    created() {
	    this.selFluxo(this.tipoFluxo);
    }
	}
</script>

<style scoped>
.cursor{
  cursor: pointer;
}

</style>
