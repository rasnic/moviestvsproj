<template>
	<div class="q-pa-md">
		<div id="movieFilter">
			<input value="search" type="text" id="movieSearch" placeholder="חפש סרט" size="14"
			       v-on:keypress="filteredSearch(this.search)"/>
		</div>
		<q-table
				:title="title"
				:data="items"
				:columns="columns"
				row-key="name"
				binary-state-sort
		>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td class="content_td" key="name" :props="props" @click="goToItem(props.row.id)">{{ props.row.title }}</q-td>
					<q-td key="release_date" :props="props">{{ props.row.release_date }}</q-td>
					<q-td key="runtime" :props="props">{{ props.row.runtime }}</q-td>
					<q-td class="content_td" key="languages" :props="props">{{ props.row.languages }}</q-td>
					<q-td key="vote_average" :props="props">{{ props.row.vote_average }}</q-td>
					<q-td v-if="!userItems" key="trailer" :props="props">{{ props.row.trailer }}</q-td>
					<q-td class="content_td" key="genres" :props="props">{{ props.row.genres }}</q-td>
					<q-td class="content_td" dir="rtl" key="overview" :props="props">{{ props.row.overview }}</q-td>
					<q-td v-if="!userItems" key="picture" :props="props">{{ props.row.picture }}</q-td>
					<q-td key="actions" :props="props"></q-td>
					<q-btn v-if="admin&&!userItems" @click="remove(props.row.id)">
						מחק
					</q-btn>
					<q-btn v-if="!userItems" @click="addMovieToList(props.row.id, 'movies')">
						הוסף לרשימה
					</q-btn>
					<q-btn v-if="userItems" @click="deleteMovieFromList(props.row.id, 'movies')">
						הסר מהרשימה
					</q-btn>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>
<script>
import {mapActions, mapMutations} from 'vuex'

export default {
	name: "MoviesTableViewer",
	props: ['userItems', 'admin'],
	data() {
		return {
			title: '',
			items: [],
			genre: this.$route.params.genre,
			columns: []
		};
	},
	methods: {
		...mapActions('movies', ['deleteMovie', 'getMovies', 'setEditMovieById', 'getMovie']),
		...mapMutations('movies', ['setEditedMovieId', 'setShowedMovieId', 'setMovie']),
		// ...mapGetters('movies', ['filterMovies']),
		...mapActions('moviesGenre', ['getMoviesByGenre']),
		...mapActions('users', ['getMyItems', 'addToList', 'deleteFromList']),
		getColumns() {
			if (this.admin) {
				this.columns = [
					{name: 'name', required: true, label: 'שם הסרט', align: 'left', field: row => row.title, sortable: true},
					{name: 'release_date', label: 'תאריך יציאה', field: 'release_date', sortable: true},
					{name: 'runtime', label: 'אורך הסרט', field: 'runtime', sortable: true},
					{name: 'languages', label: 'שפות', field: 'languages', sortable: true},
					{name: 'vote_average', label: 'דירוג', field: 'vote_average', sortable: true},
					{name: 'trailer', label: 'טריילר', field: 'trailer', sortable: true},
					{name: 'genres', label: 'זאנרים', field: 'genres', sortable: true},
					{name: 'overview', label: 'תקציר', field: 'overview', sortable: false},
					{name: 'picture', label: 'תמונה', field: 'picture'}
				]
			} else {
				this.columns = [
					{name: 'name', required: true, label: 'שם הסרט', align: 'left', field: row => row.name, sortable: true},
					{name: 'release_date', label: 'תאריך יציאה', field: 'release_date', sortable: true},
					{name: 'runtime', label: 'אורך הסרט', field: 'runtime', sortable: true},
					{name: 'languages', label: 'שפות', field: 'languages', sortable: true},
					{name: 'vote_average', label: 'דירוג', field: 'vote_average', sortable: true},
					{name: 'genres', label: 'זאנרים', field: 'genres', sortable: true},
					{name: 'overview', label: 'תקציר', field: 'overview', sortable: false},
				]
			}
		},
		filteredSearch(search) {
			// console.log(search)
			// debugger
			// return this.items = this.filterMovies(search)
		},
		async goToItem(id) {
			await this.setShowedMovieId(id);
			this.setMovie(await this.getMovie())
			await this.$router.push(`/movie/${id}`);
		},
		async remove(id) {
			await this.setEditedMovieId(id);
			await this.setEditMovieById();
			await this.deleteMovie();
		},
		async addMovieToList(id, type) {
			await this.addToList([id, type])
		},
		async deleteMovieFromList(id, type) {
			await this.deleteFromList([id, type])
			if (this.genre === undefined && this.userItems) {
				this.items = await this.getMyItems('movies');
			}
		},
		async getItems() {
			if (this.userItems === undefined && this.$route.params.genre === undefined) {
				this.title = 'סרטים'
				this.items = await this.getMovies();
			} else {
				if (this.genre === undefined && this.userItems) {
					this.title = 'הסרטים שלי'
					this.items = await this.getMyItems('movies');
				} else {
					this.title = `סרטי ${this.genre}`
					this.items = await this.getMoviesByGenre(this.genre)
				}
			}
		},
	},
	created() {
		this.getColumns()
		this.getItems()
	},
}
</script>

<style scoped>
.content_td {
	max-width: 300px;
	max-height: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>