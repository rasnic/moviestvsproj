<template>
	<div class="q-pa-md">

		<q-table
				:data="items"
				:columns="columns"
				:filter="filter"
				:filter-method="customFilter"
				row-key="title"
				binary-state-sort
				:pagination="pagination"
		>
			<template v-slot:top-left>
				<q-input v-model="search" placeholder="חפש סרט">
					<template v-slot:append>
						<q-icon name="search"/>
					</template>
				</q-input>
			</template>
			<template v-slot:top-right>
				<span class="title-span">{{ header }}</span>
			</template>

			<template v-slot:body="props" v-slot:top>
				<q-tr :props="props" align="center">
					<q-td class="content_td" dir="rtl" style="font-size: medium" key="genres" :props="props">
						{{props.row.genres }}</q-td>

					<q-td v-if="props.row.overview.substring(0,1)>='A' && props.row.overview.substring(0,1)<='Z'"
					      class="content_td push" style="font-size: medium" dir="ltr" key="overview"
					      :props="props" @click="props.expand = !props.expand">{{ props.row.overview }}</q-td>

					<q-td v-else class="content_td push" style="font-size: medium" dir="rtl" key="overview"
					      :props="props" @click="props.expand = !props.expand">{{ props.row.overview }}</q-td>

					<q-td key="vote_average" style="font-size: medium" :props="props">{{ props.row.vote_average }}</q-td>

					<q-td class="content_td" style="font-size: medium" key="languages" :props="props">{{props.row.languages}}</q-td>

					<q-td class="content_td" key="runtime" style="font-size: medium" :props="props">{{ props.row.runtime }}</q-td>

					<q-td key="release_date" class="content_td" style="font-size: medium" :props="props">{{ props.row.release_date }}</q-td>

					<q-td class="content_td push" style="font-size: medium; font-weight: bold" key="title" :props="props"
					      @click="goToItem(props.row.id)">{{ props.row.title }}</q-td>

					<q-td key="actions" :props="props"></q-td>
					<q-btn v-if="admin" @click="remove(props.row.id)" color="black" icon="clear" size="large"/>
					<q-btn v-if="list[props.row.id] === false" @click="addMovieToList(props.row.id, 'movies')" color="red"
					       icon="add" size="large"/>
					<q-btn v-else @click="deleteMovieFromList(props.row.id, 'movies')" color="grey" icon="remove"
					       size="large"/>
				</q-tr>

				<q-tr v-show="props.expand" :props="props">
					<q-td class="line_boundary" colspan="100%">
						<div v-if="props.row.overview.substring(0,1)>='A' && props.row.overview.substring(0,1)<='Z'"
						     class="text-left overview" @click="props.expand = !props.expand"><p>{{ props.row.overview }}</p></div>
						<div v-else dir="rtl" class="text-right overview" @click="props.expand = !props.expand"><p>
							{{ props.row.overview }}</p></div>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
	name: "MoviesTableViewer",
	props: ['userItems', 'admin'],
	data() {
		return {
			pagination: {rowsPerPage: 15},
			header: '',
			items: [],
			genre: this.$route.params.genre,
			columns: [
				{
					name: 'genres',
					align: 'center',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'זאנרים',
					field: 'genres',
					sortable: true
				},
				{
					name: 'overview',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'תקציר',
					align: 'center',
					field: 'overview',
					sortable: false
				},
				{
					name: 'vote_average',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'דירוג',
					align: 'center',
					field: 'vote_average',
					sortable: true
				},
				{
					name: 'languages',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'שפות',
					align: 'center',
					field: 'languages',
					sortable: true
				},
				{
					name: 'runtime',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'אורך הסרט',
					align: 'center',
					field: 'runtime',
					sortable: true
				},
				{
					name: 'release_date',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'תאריך יציאה',
					align: 'center',
					field: 'release_date',
					sortable: true
				},
				{
					name: 'title',
					required: true,
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'שם הסרט',
					align: 'center',
					field: 'title',
					sortable: true
				},
			],
			search: '',
			list: ''

		};
	},
	methods: {
		...mapActions('movies', ['deleteMovie', 'getMovies', 'setEditMovieById', 'getMovie']),
		...mapMutations('movies', ['setEditedMovieId', 'setShowedMovieId', 'setMovie']),
		...mapActions('moviesGenre', ['getMoviesByGenre']),
		...mapActions('users', ['getMyItems', 'addToList', 'deleteFromList']),
		async goToItem(id) {
			await this.setShowedMovieId(id);
			await this.setMovie(await this.getMovie())
			await this.$router.push(`/movie/${id}`);
		},
		async remove(id) {
			await this.setEditedMovieId(id);
			await this.setEditMovieById();
			await this.deleteMovie();
		},
		async addMovieToList(id, type) {
			await this.addToList([id, type])
			await this.getMyItems(type)
			this.list = ''
			this.list = Object.assign({}, this.inList)
		},
		async deleteMovieFromList(id, type) {
			await this.deleteFromList([id, type])
			await this.getMyItems(type)
			this.list = ''
			this.list = Object.assign({}, this.inList)
			if (this.genre === undefined && this.userItems) {
				this.items = await this.getMyItems(type);
				await this.getMyItems(type)
				this.list = ''
				this.list = Object.assign({}, this.inList)
			}
		},
		async getItems() {
			await this.getMyItems('movies')
			if (this.userItems === undefined && this.$route.params.genre === undefined) {
				this.header = 'סרטים'
				this.items = await this.getMovies();
			} else {
				if (this.genre === undefined && this.userItems) {
					this.header = 'הסרטים שלי'
					this.items = await this.getMyItems('movies');
				} else {
					this.header = `סרטי ${this.genre}`
					this.items = await this.getMoviesByGenre(this.genre)
				}
			}
			this.list = Object.assign({}, this.inList)
		},
		customFilter(rows, terms) {

			let lowerSearch = terms.search ? terms.search.toLowerCase() : ""

			return rows.filter(
					(row) => {
						let s1 = true
						if (lowerSearch !== "") {
							s1 = false
							let values = Object.values(row)
							let name = values[7].toString().toLowerCase()
							if (name.includes(lowerSearch.toString())) {
								s1 = true
							}
						}
						return s1
					})
		},
	},
	 created() {
		 this.getItems()
	},
	computed: {
		...mapState('users', ['inList']),
		filter() {
			return {
				search: this.search,
			}
		},
		showAll: {
			get: function () {
				return true
			},
		}
	}
}
</script>
<style scoped>

.content_td {
	max-width: 250px;
	max-height: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
	word-break: break-all;
}

.title-span {
	font-weight: bolder;
	font-size: xx-large;
}

.line_boundary {
	max-width: 800px;
}

p {
	white-space: pre-line;
}

.overview {
	font-size: medium;
	overflow-wrap: normal;
	width: 99%;
	word-wrap: normal;
	hyphens: auto;
}

.push {
	cursor: pointer;
}

tbody tr:nth-child(4n-1) {
	background-color: darkgray;
}

tbody tr:nth-child(4n-3) {
	background-color: darkkhaki;
}

</style>