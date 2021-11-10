<template>
	<div class="q-pa-md">

		<q-table
				:data="items"
				:columns="columns"
				:filter="filter"
				:filter-method="customFilter"
				row-key="name"
				binary-state-sort
				:pagination="pagination"
		>
			<template v-slot:top-left>
				<q-input v-model="search" placeholder="חפש סדרה">
					<template v-slot:append>
						<q-icon name="search"/>
					</template>
				</q-input>
			</template>
			<template v-slot:top-right>
				<span class="title-span">{{ title }}</span>
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

					<q-td key="episode_run_time" style="font-size: medium" :props="props">{{ props.row.episode_run_time }}</q-td>

					<q-td key="number_of_episodes" style="font-size: medium" :props="props">{{props.row.number_of_episodes}}</q-td>

					<q-td key="number_of_seasons" style="font-size: medium" :props="props">{{props.row.number_of_seasons}}</q-td>

					<q-td key="first_air_date" style="font-size: medium" class="content_td" :props="props">
						{{ props.row.first_air_date }}</q-td>

					<q-td class="content_td push" style=" font-weight: bold ; font-size: medium" key="name" :props="props"
					      @click="goToItem(props.row.id)">{{ props.row.name }}</q-td>

					<q-td key="actions" :props="props"></q-td>
					<q-btn v-if="admin" @click="remove(props.row.id)" color="black" icon="clear" size="large"/>
					<q-btn v-if="list[props.row.id] === false" @click="addTVToList(props.row.id, 'tvShows')" color="red"
					       icon="add" size="large"/>
					<q-btn v-else @click="deleteTVshowFromList(props.row.id, 'tvShows')" color="grey" icon="remove"
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
	name: "TVshowTableViewer",
	props: ['userItems', 'admin'],
	data() {
		return {
			pagination: {rowsPerPage: 15},
			title: '',
			items: [],
			genre: this.$route.params.genre,
			columns: [
				{
					name: 'genres',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'זאנרים',
					align: 'center',
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
					name: 'episode_run_time',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'אורך פרקים',
					align: 'center',
					field: 'episode_run_time',
					sortable: true
				},
				{
					name: 'number_of_episodes',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'מספר פרקים',
					align: 'center',
					field: 'number_of_episodes',
					sortable: true
				},
				{
					name: 'number_of_seasons',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'מספר עונות',
					align: 'center',
					field: 'number_of_seasons',
					sortable: true
				},
				{
					name: 'first_air_date',
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'תאריך יציאה',
					align: 'center',
					field: 'first_air_date',
					sortable: true
				},
				{
					name: 'name',
					required: true,
					headerStyle: 'font-size:medium; font-weight:bold',
					label: 'שם הסדרה',
					align: 'center',
					field: 'name',
					sortable: true
				},
			],
			search: '',
			list: ''
		}
	},
	methods: {
		...mapActions('tvShows', ['deleteTVshow', 'getTVshows', 'setEditTVshowById', 'getTVshow']),
		...mapMutations('tvShows', ['setEditedTVshowId', 'setShowedTVshowId', 'setTVshow']),
		...mapActions('tvShowsGenre', ['getTVshowsByGenre']),
		...mapActions('users', ['getMyItems', 'addToList', 'deleteFromList']),

		async goToItem(id) {
			await this.setShowedTVshowId(id)
			this.setTVshow(await this.getTVshow())
			await this.$router.push(`/tvShow/${id}`)
		},
		async remove(id) {
			await this.setEditedTVshowId(id)
			await this.setEditTVshowById()
			await this.deleteTVshow()
		},
		async addTVToList(id, type) {
			await this.addToList([id, type])
			await this.getMyItems(type)
			this.list = ''
			this.list = Object.assign({}, this.inList)
		},
		async deleteTVshowFromList(id, type) {
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
			await this.getMyItems('tvShows');
			if (this.userItems === undefined && this.$route.params.genre === undefined) {
				this.title = 'סדרות'
				this.items = await this.getTVshows();
			} else {
				if (this.genre === undefined && this.userItems) {
					this.title = 'הסדרות שלי'
					this.items = await this.getMyItems('tvShows');
				} else {
					this.title = `סדרות ${this.genre}`
					this.items = await this.getTVshowsByGenre(this.genre)
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
							let name = values[5].toString().toLowerCase()
							if (name.includes(lowerSearch.toString())) {
								s1 = true
							}
						}
						return s1
					})
		}
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
	max-width: 200px;
	max-height: 100px;
	width: fit-content;
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
q-table{
	max-width: 95%;
}
</style>