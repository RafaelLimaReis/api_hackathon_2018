<template>
	<div class="w3-text-white">
    <top-bar>
    </top-bar>
    <div>
      <GmapMap ref="mapRef"
         :center="center"
         :zoom="13"
         map-type-id="terrain"
         style="width: 100%; height: 100vh">
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :icon="index < 3 ? iconUpa : icon"
          :label="m.label"
          @click="index < 3 ? showDetalhes(index) : ''">
          <GmapInfoWindow :opened="index === 3">
            <div class="w3-center bold blue">
              Você está aqui
            </div>
          </GmapInfoWindow>
        </GmapMarker>
      </GmapMap>
    </div>

    <div class="w3-modal w3-animate-opacity" style="padding-top: 20%" :class="{'show':show}">
      <div class="w3-modal-content w3-round">
        <div class="w3-container w3-metro-dark-blue" style="padding: 12px" @click="show=false">
          <span class="bold">{{indiceUpa.description}}</span>
          <a href="javascript:" class="w3-right">
            <i class="fa fa-times"></i>
          </a>
        </div>
        <div class="w3-container w3-padding-16 w3-white">
          <div>
            <div class="w3-card w3-center w3-margin-bottom w3-round">
              <div class="w3-padding-large w3-metro-dark-blue">
                <span class="w3-xlarge bold">{{indiceUpa.total}}</span><br>
                <span class="w3-small">PESSOAS NA FILA</span>
              </div>
              <div class="w3-padding w3-white bold blue" @click="detalhesUpa(165)">Visualizar Detalhes</div>
            </div>
          </div>
          <hr>
          <button class="w3-margin-top w3-button w3-block w3-metro-dark-blue w3-round" @click="mostrarRota()">VISUALIZAR ROTA</button>
          <hr>
          <div class="w3-margin-top">Ultima atualização: 12:45</div>
        </div>
      </div>
    </div>

	</div>
</template>

<script>

import Container from "./commons/Container.vue"
import TopBar from './commons/TopBar.vue'

export default {
	components:{Container,TopBar},
	name: 'Home',
	data () {
		return {
		  map: "",
		  indiceUpa: {
        description: "",
        total: ""
      },
		  upas:[],
		  show: false,
      iconUpa: {
        url: "./static/imgs/placeholder.svg",
        size: { width: 60, height: 60, f: "px", b: "px" },
        scaledSize: { width: 60, height: 60, f: "px", b: "px" },
        labelOrigin: {x: 30, y: 75}
      },
      icon: {
        url: "./static/imgs/location-user.svg",
        size: { width: 60, height: 60, f: "px", b: "px" },
        scaledSize: { width: 60, height: 60, f: "px", b: "px" },
        labelOrigin: {x: 30, y: 75}
      },
		  markers: [
		    {
		      position: {
            lat: -20.520566,
            lng: -47.436430
          },
          label: {
            text: "UPA ANITA"
          }
        },
        {
          position: {
            lat: -20.573940,
            lng: -47.377560
          },
          label: {
            text: "UPA AEROPORTO",
          }
        },
        {
          position: {
            lat: -20.508871,
            lng: -47.399667
          },
          label: {
            text: "PRONTO SOCORRO"
          }
        }
      ],
      center: {
		    lat: -20.53,
        lng: -47.40
		  }
		}
	},
  methods: {
    showDetalhes(id){
      this.show = true;
      this.indiceUpa = this.upas[id];
    },

    detalhesUpa(id){
      this.$router.push('/upa/' + id);
    },

    showPosition(p) {

      let user = {
        position: {
          lat: p.coords.latitude,
          lng: p.coords.longitude
        },
        label: {
          text: " ",
        }
      };

      this.markers.push(user);

      this.center.lat = p.coords.latitude;
      this.center.lng = p.coords.longitude;
    },

    mostrarRota() {
      this.getRoute(this.markers[3].position,this.markers[this.indiceUpa].position)
    },

    getRoute(origem, destino) {

      if (this.directionsDisplay != null) {
          this.directionsDisplay.setMap(null);
          this.directionsDisplay = null;
      }

      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
      let vm = this;

      this.directionsDisplay.setMap(this.map);

      vm.directionsService.route({
        origin: origem,
        destination: destino,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          vm.directionsDisplay.setDirections(response);

        } else {
          console.log('Directions request failed due to ' + status)
        }
      });

      this.show = false;
    }
  },
  created() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.showPosition(position)
      });

    } else {
      openModalMsg("Navegador sem geolocalização")
    }

    this.$http.get(base_api + 'upas')
      .then(response => {
        closeLoading();
        this.upas = response.data

      }, response => {
        closeLoading();
        openModalMsg("Erro!","Não foi possível buscar os dados. Tente novamente!");
      });

  },
  mounted () {

    openLoading("Carregando Maps");

	  this.$refs.mapRef.$mapPromise.then((map) => {
      this.map = map;
      closeLoading();
    })
  }

}
</script>
