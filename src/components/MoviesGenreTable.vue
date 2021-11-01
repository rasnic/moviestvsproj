<template>
	<div class="q-pa-md">
		<q-table
				:title='this.title'
				:data="this.items"
				:columns="columns"
				row-key="name"
				binary-state-sort

		>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td key="name" :props="props" @click="goToItem(props.row.id)">{{ props.row.name }}</q-td>
					<q-td key="releaseDate" :props="props">{{ props.row.releaseDate }}</q-td>
					<q-td key="movieLength" :props="props">{{ props.row.movieLength }}</q-td>
					<q-td key="languages" :props="props">{{ props.row.languages }}</q-td>
					<q-td key="ranking" :props="props">{{ props.row.ranking }}</q-td>
					<q-td key="genres" :props="props">{{ props.row.genres }}</q-td>
					<q-td key="overview" :props="props">{{ props.row.overview }}</q-td>
					<q-td key="actions" :props="props"></q-td>
					<q-btn v-if="!userItems" @click="addToMyMovies(props.row.id)">
						הוסף לרשימה שלי
					</q-btn>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {insertToList} from '@/middleware/firebase/database'

export default {
	name: "MoviesGenreTable",
	props: ['userItems'],
	data() {
		return {
			columns: [
				{name: 'name', required: true, label: 'שם הסרט', align: 'left', field: row => row.name, sortable: true},
				{name: 'releaseDate', label: 'תאריך יציאה', field: 'releaseDate', sortable: true},
				{name: 'movieLength', label: 'אורך הסרט', field: 'movieLength', sortable: true},
				{name: 'languages', label: 'שפות', field: `languages`, sortable: true},
				{name: 'ranking', label: 'דירוג', field: 'ranking', sortable: true},
				{name: 'genres', label: 'זאנרים', field: 'genres', sortable: true},
				{name: 'overview', label: 'תקציר', field: 'overview', sortable: false}
			],
			title: '',
			items:[]
		}
	},
	computed: {
		...mapState(`moviesGenre`, ['arrMov']),
		...mapState('users', ['movies'])
	},
	methods: {
		...mapActions('moviesGenre', ['getMovies']),
		...mapActions('users', ['getMyMovies']),
		...mapMutations('movies', ['setEditedMovieId']),
		...mapMutations('movie', ['setShowedMovieId', 'setMovie']),

		goToItem(id) {
			this.setShowedMovieId(id);
			this.setMovie();
			this.$router.push(`/movie/${id}`);
		},
		addToMyMovies(id) {
			this.setShowedMovieId(id);
			insertToList({entity: 'movies', id: id});
		}
	},
	async created() {
		if (this.userItems === false) {
			await this.getMovies(this.$route.params.genre);
			this.items = this.arrMov
			this.title = `סרטי ${this.$route.params.genre}`
		} else {
			await this.getMyMovies();
			this.items = this.movies
			this.title = 'הסרטים שלי'
		}
	},

};
</script>

<style scoped>

</style>