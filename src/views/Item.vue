<template dir="rtl">
	<div class="q-pa-md row-lg items-lg-start q-gutter-lg" v-if="this.$route.params.type === 'tvShow'">
		<q-card dark bordered class="tv show"
		        style="background:black">
			<q-card-section>
				<h4 align="center">{{ this.showedItem.name }}</h4>
				<h6 align="right">תאריך יציאה: {{ this.showedItem.releaseDate }}</h6>
				<q-img align="left" :src="this.url" style="height: 300px; max-width: 300px"></q-img>
				<h6 align="right">מספר עונות: {{ this.showedItem.seasons }}</h6>
				<h6 align="right">מספר פרקים: {{ this.showedItem.episodes }}</h6>
				<h6 align="right">אורכי פרקים: {{ this.showedItem.episodeLength.toString() }}</h6>
				<h6 align="right"> {{ this.showedItem.languages.toString() }}:שפות</h6>
				<h6 align="right"> {{ this.showedItem.ranking }}:דירוג</h6>
				<h6 align="right">ז'אנרים: {{ this.showedItem.genres.toString() }}</h6>
				<h6 align="right"> תקציר: {{ this.showedItem.overview }}</h6>
				<q-video :src="this.video"/>
			</q-card-section>
		</q-card>
	</div>

	<div v-else-if="this.$route.params.type === 'movie'">
		<q-card dark bordered class="tv show"
		        style="background:black">
			<q-card-section>
				<h4 align="center">{{ this.showedItem.name }}</h4>
				<q-img align="left" :src="this.url" style="height: 300px; max-width: 300px"></q-img>
				<h6 align="right">תאריך יציאה: {{ this.showedItem.releaseDate }}</h6>
				<h6 align="right">אורך סרט: {{ this.showedItem.movieLength }}</h6>
				<h6 align="right"> {{ this.showedItem.languages.toString() }}:שפות</h6>
				<h6 align="right"> {{ this.showedItem.ranking }}:דירוג</h6>
				<h6 align="right">ז'אנרים: {{ this.showedItem.genres.toString() }}</h6>
				<h6 align="right"> תקציר: {{ this.showedItem.overview }}</h6>

				<q-video :src="this.video"/>

			</q-card-section>
		</q-card>
	</div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import database from '../middleware/firebase/database'

export default {
	name: "Item",
	data() {
		if (this.$route.params.type === 'tvShow') {
			return {
				showedItem: {
					name: '',
					id: '',
					releaseDate: '',
					seasons: '',
					episodes: '',
					episodeLength: '',
					languages: '',
					ranking: '',
					trailer: '',
					genres: '',
					overview: '',
					picture: '',
					url: '',
					video: ''
				}
			}
		} else {
			return {
				showedItem: {
					name: '',
					id: '',
					releaseDate: '',
					movieLength: '',
					languages: '',
					trailer: '',
					ranking: '',
					genres: '',
					picture: '',
					overview: ''
				}
			}
		}
	},
	computed: mapState('tvShow', ['showedTV']),

	methods: {
		...mapActions('tvShow', ['getTVshow']),
		setTVshow() {
			if (this.$route.params.type === 'tvShow') {
				database.getItem({entity: 'tvShows', id: this.$route.params.id})
						.then(tvShow => {
							this.showedItem.name = tvShow.name;
							this.showedItem.id = tvShow.id;
							this.showedItem.releaseDate = tvShow.releaseDate;
							this.showedItem.seasons = tvShow.seasons;
							this.showedItem.episodes = tvShow.episodes;
							this.showedItem.episodeLength = tvShow.episodeLength;
							this.showedItem.languages = tvShow.languages;
							this.showedItem.ranking = tvShow.ranking;
							this.showedItem.trailer = tvShow.trailer;
							this.showedItem.genres = tvShow.genres;
							this.showedItem.overview = tvShow.overview;
							this.showedItem.picture = tvShow.picture;
							this.url = `https://image.tmdb.org/t/p/w300${this.showedItem.picture}`
							this.video = `https://www.youtube.com/embed/${this.showedItem.trailer}/?rel=0`
						})
			} else {
				database.getItem({entity: 'movies', id: this.$route.params.id})
						.then(movie => {
							this.showedItem.name = movie.name;
							this.showedItem.id = movie.id;
							this.showedItem.releaseDate = movie.releaseDate;
							this.showedItem.movieLength = movie.movieLength;
							this.showedItem.languages = movie.languages;
							this.showedItem.trailer = movie.trailer;
							this.showedItem.ranking = movie.ranking;
							this.showedItem.genres = movie.genres;
							this.showedItem.picture = movie.picture;
							this.showedItem.overview = movie.overview;
							this.url = `https://image.tmdb.org/t/p/w300${this.showedItem.picture}`
							this.video = `https://www.youtube.com/embed/${this.showedItem.trailer}/?rel=0`
						})
			}
		}
	},

	created() {
		this.setTVshow()

	}
}
</script>

<style scoped>

</style>