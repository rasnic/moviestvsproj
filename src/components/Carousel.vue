<template>
	<div class="q-pa-md flex" style="justify-content: center">
		<div class="q-pa-sm">
			<h3 class="head">סרטים מומלצים</h3>
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
				<q-carousel-slide v-for="item in this.items.movies" :key="item.id" :name="item.title" :img-src="item.picture"
				@click="goToItem('movie', item.id)"/>
			</q-carousel>
		</div>
		<div class="q-pa-sm flex2">
			<h3 class="head">סדרות מומלצות</h3>
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
				<q-carousel-slide v-for="item in this.items.tvShows" :key="item.id" :name="item.name" :img-src="item.picture"
				@click="goToItem('tvShow', item.id, item)"/>
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
			items:{movies:{}, tvShows:{}},
			autoplay: true,
			slide1: 1,
			slide2: 2
		}
	},
	computed: mapState('users', ['pics','userItems']),
	methods: {
		...mapActions('users', ["getMyItems"]),
		...mapMutations('items', ['setEditedItemId', 'setShowedItemId', 'setItem']),
		async goToItem(type,id,item){
			await this.setShowedItemId([id,type])
			await this.setItem([ item,type])
			await this.$router.push(`/${type}/${id}`)
		}
	},
	async created() {
		this.$q.loading.show({message:'טוען המלצות'})
		await this.getMyItems('movies')
		await this.getMyItems('tvShows')
		this.items.movies = JSON.parse(JSON.stringify(this.userItems.movies))
		this.items.tvShows = JSON.parse(JSON.stringify(this.userItems.tvShows))
		for (let i = 0; i < this.userItems.movies.length; i++) {
			await Object.assign(this.items.movies[i] , this.userItems.movies[i])
			this.items.movies[i]['picture']= 'https://image.tmdb.org/t/p/w500' + this.items.movies[i].picture
		}
		for (let i = 0; i < this.userItems.tvShows.length; i++) {
		await Object.assign(this.items.tvShows[i] , this.userItems.tvShows[i])
			this.items.tvShows[i]['picture']= 'https://image.tmdb.org/t/p/w500' + this.items.tvShows[i].picture
		}
		this.$q.loading.hide()
	},

}
</script>

<style scoped>
.head{
	text-align: center;
	color: white;
}
</style>