<template dir="rtl">
	<div class="q-pa-md row-lg items-lg-start q-gutter-lg" >
		<q-card dark bordered class="tv show" v-if="this.$route.params.type === 'tvShow'"
		        style="background:black">
			<q-card-section>
				<h4 align="center">{{ this.showedItem.name }}</h4>
				<h6 align="right">תאריך יציאה: {{ this.showedItem.first_air_date }}</h6>
				<q-img v-if="this.pictureTV !== 'empty'" align="left" :src="this.pictureTV" style="height: 300px; max-width: 300px"></q-img>
				<h6 align="right">מספר עונות: {{ this.showedItem.number_of_seasons }}</h6>
				<h6 align="right">מספר פרקים: {{ this.showedItem.number_of_episodes }}</h6>
				<h6 align="right">אורכי פרקים: {{ this.showedItem.episode_run_time }}</h6>
				<h6 align="right"> {{ this.showedItem.languages }}:שפות</h6>
				<h6 align="right"> {{ this.showedItem.vote_average }}:דירוג</h6>
				<h6 align="right">ז'אנרים: {{ this.showedItem.genres.toString() }}</h6>
				<h6 align="right"> תקציר: {{ this.showedItem.overview }}</h6>
				<q-video  v-if="this.trailerTV !== 'empty'" :src="this.trailerTV"
				         style="width: 853px; height: 480px"/>
			</q-card-section>
		</q-card>

		<q-card dark bordered class="movie"  v-if="this.$route.params.type === 'movie'"
		        style="background:black">
			<q-card-section>
				<h4 align="center">{{ this.showedItem.title }}</h4>
				<q-img v-if="this.pictureM !== 'empty'" align="left" :src="this.pictureM" style="height: 300px; max-width: 300px"></q-img>
				<h6 align="right">תאריך יציאה:{{ this.showedItem.release_date }}</h6>
				<h6 align="right">אורך סרט:{{ this.showedItem.runtime }} דקות</h6>
				<h6 align="right"> {{ this.showedItem.languages }}:שפות</h6>
				<h6 align="right"> {{ this.showedItem.vote_average }}:דירוג</h6>
				<h6 align="right">ז'אנרים:{{this.showedItem.genres.toString() }}</h6>
				<h6 align="right"> תקציר: {{ this.showedItem.overview }}</h6>

				<q-video v-if="this.trailerM !== 'empty'" :src="this.trailerM"
				         style="width: 853px; height: 480px"/>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import database from '../middleware/firebase/database'

export default {
	name: "Item",
	data() {
		if (this.$route.params.type === 'tvShow') {
			return {
				trailerTV: 'empty',
				pictureTV: 'empty',
				showedItem: {
					name: '',
					id: '',
					first_air_date: '',
					number_of_seasons: '',
					number_of_episodes: '',
					episode_run_time: '',
					languages: '',
					vote_average: '',
					genres: '',
					overview: ''
				}
			}
		} else {
			return {
				trailerM: 'empty',
				pictureM: 'empty',
				showedItem: {
					title: '',
					id: '',
					release_date: '',
					runtime: '',
					languages: '',
					vote_average: '',
					genres: '',
					overview: ''
				}
			}
		}
	},
	computed: {
		...mapState('tvShows', ['showedTV']),
		...mapState('movies', ['showedMovie'])
	},
	methods: {
		...mapActions('tvShows', ['getTVshow']),
		...mapActions('movies', ['getMovie']),
		async setItem() {
			if (this.$route.params.type === 'tvShow') {
				const tvShow = await database.getItem({entity: 'tvShows', id: this.$route.params.id})
				for (const key in tvShow) {
					this.showedItem[key] = tvShow[key]
				}
				this.pictureTV = `https://image.tmdb.org/t/p/w300${tvShow.picture}`
				this.trailerTV = `https://www.youtube.com/embed/${tvShow.trailer}/?rel=0`
			} else {
				const movie = await database.getItem({entity: 'movies', id: this.$route.params.id})
				for (const key in movie) {
						this.showedItem[key] = movie[key]
				}
			debugger
				this.pictureM = `https://image.tmdb.org/t/p/w300${movie.picture}`
				this.trailerM = `https://www.youtube.com/embed/${movie.trailer}/?rel=0`
			}

		}
	},

	async created() {
		if (this.$route.params.type === 'tvShow') {
			await this.getTVshow()
		} else {
			await this.getMovie()
		}
		await this.setItem()
	}
}
</script>

<style scoped>

</style>