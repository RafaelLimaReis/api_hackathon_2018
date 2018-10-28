<template>

	<div class="w3-modal" :class="{'show':show}">
		<div class="w3-modal-content w3-animate-zoom w3-round">
			<div class="w3-container w3-teal w3-text-white w3-padding">
				<div class="w3-cell-row">
					<div class="w3-cell" style="width:70%">
						<div class="btn">
							<i class="fa fa-chevron-left"></i><br>Voltar
						</div>
					</div>
					<div class="w3-cell" style="width:30%">
						<div class="btn">
							<i class="fa fa-share"></i><br>
							Compartilhar
						</div>
					</div>
				</div>
			</div>
			<div class="w3-container conteudo">
				<div class="w3-display-middle middle">
					<h4><i class="fa fa-th-list"></i></h4>
					<span>Ibiporã</span><br>
					<span>Reunião da Mocidade</span>
					<div class="w3-margin-top w3-border w3-padding">
						<div class="w3-cell-row linha">
							<div class="w3-cell l1">
								<i class="fa fa-map-marker"></i>
							</div>
							<div class="w3-cell">
								Central
							</div>
						</div>
						<div class="w3-cell-row linha">
							<div class="w3-cell l1">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="w3-cell">
								21/11/2017
							</div>
						</div>
						<div class="w3-cell-row linha">
							<div class="w3-cell l1">
								<i class="fa fa-clock"></i>
							</div>
							<div class="w3-cell">
								14:00
							</div>
						</div>
						<div class="w3-cell-row linha">
							<div class="w3-cell l1">
								<i class="fa fa-user"></i>
							</div>
							<div class="w3-cell">
								Daniel Campos
							</div>
						</div>
						<div class="w3-cell-row linha">
							<div class="w3-cell l1">
								<i class="fa fa-music"></i>
							</div>
							<div class="w3-cell">
								Esdras Louvo
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
export default {
	props:{
		vshow:true
	},
	data(){
		return{
			show:true
		}
	}
}
</script>
<style>
.show{
	display: block;
}
.conteudo{
	height: 75vh;
	overflow: auto;
	color: #009688
}
.middle{
	width: 90%;
	text-align: center;
	margin-top: 24px
}
.linha{
	padding: 16px;
	border-bottom: 1px solid #ccc
}
.linha:last-child{
	border-bottom: none;
}
.l1{
	width: 10%
}
.btn{
	padding: 10px;
	text-align: center;
	width: 110px
}
.w3-modal-content{
	background-color: #fcfdff;
}
</style>
