<template>
	<div class="wrapper">
		<!-- <transition enter-active-class="slideInDown" leave-active-class="slideInUp"> -->
			<component class="animated" :is="currentView" @showOffers="showOffers" @showHomes="showHomes"></component>
		<!-- </transition>	 -->
	</div>
</template>
<script>
	import home from './child/main.vue'
	import offers from './child/offers.vue'
	export default{
		components:{
			home,
			offers
		},
		data(){
			return {
				showHome:true,
				currentView:'home'
			}
		},
		methods:{
			showOffers(){
				this.currentView = 'offers';
			},
			showHomes(){
				this.currentView = 'home';
			}
		}
	}
</script>