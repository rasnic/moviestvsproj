<template>
	<div class="q-pa-md flex" style="justify-content: center">
		<div class="q-pa-sm">
			<h3 align="center">סרטים מומלצים</h3>
			<q-carousel
					style="aspect-ratio: 9/16; height: 800px"
					animated
					v-model="slide1"
					navigation
					infinite
					:autoplay="autoplay"
					arrows
					transition-prev="slide-right"
					transition-next="slide-left"
					@mouseenter="autoplay = false"
					@mouseleave="autoplay = true"
			>
				<q-carousel-slide v-for="pic in this.moviePictures" :name="pic" :img-src="pic"/>
			</q-carousel>
		</div>
		<div class="q-pa-sm flex2">
			<h3 align="center">סדרות מומלצות</h3>
			<q-carousel
					style="aspect-ratio: 9/16; height: 800px"

					animated
					v-model="slide2"
					navigation
					infinite
					:autoplay="autoplay"
					arrows
					transition-prev="slide-right"
					transition-next="slide-left"
					@mouseenter="autoplay = false"
					@mouseleave="autoplay = true"
			>
				<q-carousel-slide v-for="pic in this.tvPicture" :name="pic" :img-src="pic"/>
			</q-carousel>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
	name: "Carousel",
	data() {
		return {
			moviePictures: [],
			tvPicture: [],
			autoplay: true,
			slide1: 1,
			slide2: 2
		}
	},
	computed: mapState('users', ['moviePics', 'tvPics']),
	methods: {
		...mapActions('users', ['getMoviesPicture', 'getTVsPicture']),
	},
	async created() {
		await this.getMoviesPicture()
		await this.getTVsPicture()
		for (let i = 0; i < this.moviePics.length; i++) {
			this.moviePictures.push('https://image.tmdb.org/t/p/w500' + this.moviePics[i])
		}
		for (let i = 0; i < this.tvPics.length; i++) {
			this.tvPicture.push('https://image.tmdb.org/t/p/w500' + this.tvPics[i])
		}
	}
}
</script>

<style scoped>
</style>