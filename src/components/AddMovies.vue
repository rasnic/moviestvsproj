<template>
	<div class="q-pa-md">
		<div class="q-gutter-md" style="max-width: 300px">
			<div class="q-pa-md row items-start q-gutter-md">
				<q-card class="my-card" style="background: chocolate">
					<q-card-section>
						<div class="text-h5">הוסף סרטים</div>
						<q-input label="movies link" v-model="pageNumber"/>
						<q-btn @click="getMovies" color="black" label="add movies"/>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import api from '../middleware/api';

export default {
	name: "AddMovies",
	data() {
		return {
			pageNumber: '',
			items: [],
			editedItem: {
				name: '',
				id: '',
				releaseDate: '',
				movieLength: '',
				languages: '',
				trailer: '',
				ranking: '',
				genres: '',
				picture: '',
				overview:''
			}
		}
	},
	computed: {
		...mapState('movies', ['editedMovie', 'movies', 'editedMovieId'])
	},
	methods: {
		...mapActions('movies', ['updateMovie', 'insertMovie']),
		...mapMutations('movies', ['setEditedMovie', 'setEditedMovieId','checkMovie']),
		...mapActions('moviesGenre',['insertMovieByGenre']),
		...mapMutations('moviesGenre',['setEditedMovieByGenre','setEditedMovieIdByGenre']),

		getMovies() {
			api.getItems({pageNumber: this.pageNumber, entity: 'movie'})
					.then(movies => {
						Object.assign(this.items, movies.results)
					})
					.then(() => {
						this.setMovie(this.items)
					})
		},
		async setMovie(movies) {
			for (let i = 0; i < this.items.length; i++) {
				await api.getItem({id: movies[i].id, entity: 'movie'})
						.then(item => {
							this.editedItem.name = item.title;
							this.editedItem.releaseDate = item.release_date;
							this.editedItem.movieLength = item.runtime;
							let languages = [];
							for (let j = 0; j < item.spoken_languages.length; j++) {
								languages.push(item.spoken_languages[j].english_name)
							}
							this.editedItem.languages = languages.toString();

							this.editedItem.ranking = item.vote_average;
							let genres = [];
							for (let j = 0; j < item.genres.length; j++) {
								genres.push(item.genres[j].name)
							}
							this.editedItem.genres = genres;
							this.editedItem.overview = item.overview
							this.editedItem.id = item.id;

							api.getTrailer({entity: 'movie', id: item.id});
							api.getPicture({entity: 'movie', id: item.id});
							this.items.splice(i, 1, this.editedItem)

							this.editedItem = {
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
						})
			}
			for (let i = 0; i < this.items.length; i++) {
				this.items[i].picture = api.pictures[i]
				this.items[i].trailer = api.trailers[i]
				await this.setEditedMovieId(this.items[i].id);
				await this.setEditedMovie(this.items[i]);
					await this.insertMovie()

			}
			for (let j = 0; j < this.items.length; j++) {
				await this.setEditedMovieIdByGenre(this.items[j].id);
				await this.setEditedMovieByGenre(this.items[j]);
				await this.insertMovieByGenre()
			}
		},
	},

}
</script>

<style scoped>

</style>