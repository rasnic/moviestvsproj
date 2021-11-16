<template>
	<div class="q-pa-md viewer">

		<q-table
				:data="items"
				:columns="columns"
				:filter="filter"
				:filter-method="customFilter"
				:row-key="title"
				binary-state-sort
				:pagination="pagination"
				bordered
				separator="cell"
				flat
				style="padding: 2em"
		>
			<template v-slot:top-left>
				<q-input v-model="search" :placeholder="placeholder">
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
					<q-td v-if="props.row.genres" class="content_td" dir="rtl" key="genres" :props="props">
						{{ props.row.genres.toString() }}
					</q-td>
					<q-td v-else class="content_td" dir="rtl" key="genres" :props="props"></q-td>

					<q-td v-if="props.row.overview.substring(0,1)>='A' && props.row.overview.substring(0,1)<='Z'"
					      class="content_td push" dir="ltr" key="overview"
					      :props="props" @click="props.expand = !props.expand">{{ props.row.overview }}
					</q-td>

					<q-td v-else class="content_td push" dir="rtl" key="overview"
					      :props="props" @click="props.expand = !props.expand">{{ props.row.overview }}
					</q-td>

					<q-td class="content_td" key="vote_average" :props="props">{{ props.row.vote_average }}</q-td>

					<q-td class="content_td" key="languages" :props="props">{{ props.row.languages }}</q-td>

					<q-td v-if="typeinst === 'movies'" class="content_td" key="runtime" :props="props">{{props.row.runtime }}</q-td>

					<q-td v-if="typeinst === 'movies'" key="release_date" class="content_td" :props="props">{{ props.row.release_date }}</q-td>

					<q-td v-if="typeinst === 'movies'" class="content_td push bold" key="title" style="direction: rtl" :props="props"
					      @click="goToItem(props.row.id)">{{ props.row.title }}
					</q-td>

					<q-td v-if="typeinst === 'tvShows' && props.row.episode_run_time" class="content_td" key="episode_run_time" :props="props">
						{{ props.row.episode_run_time.toString() }}
					</q-td>
					<q-td v-if="typeinst === 'tvShows' && !props.row.episode_run_time" class="content_td" key="episode_run_time" :props="props">
					</q-td>

					<q-td v-if="typeinst === 'tvShows'" class="content_td" key="number_of_episodes" :props="props">
						{{ props.row.number_of_episodes }}
					</q-td>

					<q-td v-if="typeinst === 'tvShows'" class="content_td" key="number_of_seasons" :props="props">
						{{ props.row.number_of_seasons }}
					</q-td>

					<q-td v-if="typeinst === 'tvShows'" class="content_td" key="first_air_date" :props="props">
						{{ props.row.first_air_date }}
					</q-td>

					<q-td v-if="typeinst === 'tvShows'" class="content_td push bold" style="direction: rtl" key="name" :props="props"
					      @click="goToItem(props.row.id)">{{ props.row.name }}
					</q-td>

					<q-td key="actions" :props="props" class="content_td">
						<q-btn v-if="admin" @click="remove(props.row.id, typeinst)" color="black" icon="clear" size="large"/>
						<q-btn v-if="list[props.row.id] === false" @click="addToListTabV(props.row.id, typeinst)" color="red"
						       icon="add" size="large"/>
						<q-btn v-else @click="deleteFromListTabV(props.row.id, typeinst)" color="grey" icon="remove"
						       size="large"/>
					</q-td>
				</q-tr>

				<q-tr v-show="props.expand" :props="props">
					<q-td class="line_boundary"  colspan="100%">
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
	name: "ItemTableViewer",
	props: ['userItems', 'admin', 'type'],
	data() {
		return {
			TypeHe: ['סרט', 'סדרה'],
			pagination: {rowsPerPage: 15},
			typeinst: '',
			title: '',
			placeholder: '',
			headers: {
				movies: ['סרטים', 'הסרטים שלי', `סרטי ${this.$route.params.genre}`],
				tvShows: ['סדרות', 'הסדרות שלי', `סדרות ${this.$route.params.genre}`]
			},
			header: '',
			items: [],
			labels: {
				movies: ['זאנרים', 'תקציר', 'דירוג', 'שפות', 'אורך הסרט', 'תאריך יציאה','שם הסרט','הוסף/הסר'],
				tvShows: ['זאנרים', 'תקציר', 'דירוג', 'שפות', 'אורך פרקים', 'מספר פרקים', 'מספר עונות', 'תאריך יציאה', 'שם הסדרה','הוסף/הסר']
			},
			names: {
				movies: ['actions','genres', 'overview', 'vote_average', 'languages', 'runtime', 'release_date', 'title'],
				tvShows: ['actions', 'genres', 'overview', 'vote_average', 'languages', 'episode_run_time',
					'number_of_episodes', 'number_of_seasons', 'first_air_date', 'name']
			},
			sortables: {
				movies: [true, false, true, true, true, true, true],
				tvShows: [true, false, true, true, true, true, true, true, true]
			},
			columns: [],
			search: '',
			list: ''
		}
	},


	methods: {
		...mapActions('items', ['deleteItemFromDB', 'getItems', 'setEditItemById', 'getItemForSet']),
		...mapMutations('items', ['setEditedItemId', 'setShowedItemId', 'setItem']),
		...mapActions('itemsGenre', ['getItemsByGenre']),
		...mapActions('users', ['getMyItems', 'addToList', 'deleteFromList']),
		async goToItem(id) {
			const typeName = this.typeinst.substring(0, this.typeinst.length - 1)
			await this.setShowedItemId([id, typeName])
			await this.setItem([await this.getItemForSet(this.typeinst), typeName])
			await this.$router.push(`/${typeName}/${id}`)
		},
		async remove(id) {
			await this.setEditedItemId([id, this.typeinst])
			await this.setEditItemById(this.typeinst)
			await this.deleteItemFromDB(this.typeinst)
		},
		async addToListTabV(id, type) {
			await this.addToList([id, type])
			await this.getMyItems(type)
			this.list = ''
			this.list = Object.assign({}, this.inList)
		},
		async deleteFromListTabV(id, type) {
			await this.deleteFromList([id, type])
			await this.getMyItems(type)
			this.list = ''
			this.list = Object.assign({}, this.inList)
			if (this.$route.params.genre === undefined && this.userItems) {
				this.items = await this.getMyItems(type);
				await this.getMyItems(type)
				this.list = ''
				this.list = Object.assign({}, this.inList)
			}
		},
		async getItemsTabV() {
			await this.getMyItems(this.typeinst)
			if (this.userItems === undefined && this.$route.params.genre === undefined) {
				this.header = this.headers[this.typeinst][0]
				this.items = await this.getItems(this.typeinst);
			} else {
				if (this.$route.params.genre === undefined && this.userItems) {
					this.header = this.headers[this.typeinst][1]
					this.items = await this.getMyItems(this.typeinst);
				} else {
					this.header = this.headers[this.typeinst][2]
					this.items = await this.getItemsByGenre([this.typeinst, this.$route.params.genre])
				}
			}
			this.list = Object.assign({}, this.inList)
		},
		getHeName() {
			if (this.typeinst === 'movies') {
				this.$q.loading.show({message: `טוען סרטים`})
				this.placeholder = 'חפש סרט'
				this.title = 'title'
			} else {
				this.$q.loading.show({message: `טוען סדרות`})
				this.placeholder = 'חפש סדרה'
				this.title = 'name'
			}
		},
		customFilter(rows, terms) {

			let lowerSearch = terms.search ? terms.search.toLowerCase() : ""

			return rows.filter(
					(row) => {
						let s1 = true
						let name = ''
						if (lowerSearch !== "") {
							s1 = false
							let values = Object.values(row)
							if (this.typeinst === 'movies') {
								name = values[7].toString().toLowerCase()
							} else {
								name = values[5].toString().toLowerCase()
							}
							if (name.includes(lowerSearch.toString())) {
								s1 = true
							}
						}
						return s1
					})
		},
		getCols() {
			let arr = ''
			if (this.typeinst === 'movies') {
				arr = new Array(this.labels.movies.length)
			} else {
				arr = new Array(this.labels.tvShows.length)
			}

			for (let i = 0; i < this.labels[this.typeinst].length; i++) {
				let obj = {}
				obj.name = this.names[this.typeinst][i]
				obj.headerStyle = 'font-size:medium; font-weight:bold; background: #26A69A; color: white'
				obj.label = this.labels[this.typeinst][i]
				obj.align = 'center'
				obj.field = this.names[this.typeinst][i]
				obj.sortable = this.sortables[this.typeinst][i]
				obj.actions = 'הוסף/הסר'
				arr[i] = obj
				this.columns = arr
			}
			console.log(arr)
		}
	},
	async created() {
		if (!this.type) {
			if (window.location.pathname.substring(1, 7) === 'movies') {
				this.typeinst = 'movies'
			} else {
				this.typeinst = 'tvShows'
			}
		} else {
			this.typeinst = this.type
		}
		await this.getHeName()
		await this.getCols()
		await this.getItemsTabV()
		await this.$q.loading.hide()
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
.viewer {
	gap: 0.5em;
}


.content_td {
	max-width: 250px;
	max-height: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
	word-break: break-all;
	font-size: medium;
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

.bold {
	font-weight: bold;
}

</style>