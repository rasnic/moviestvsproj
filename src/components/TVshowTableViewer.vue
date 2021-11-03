<template>
	<div class="q-pa-md">
		<q-table
				:title="title"
				:data="items"
				:columns="columns"
				row-key="name"
				binary-state-sort
		>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td class="content_td"  key="name" :props="props" @click="goToItem(props.row.id)">{{ props.row.name }}</q-td>
					<q-td key="first_air_date" :props="props">{{ props.row.first_air_date }}</q-td>
					<q-td key="number_of_seasons" :props="props">{{ props.row.number_of_seasons }}</q-td>
					<q-td key="number_of_episodes" :props="props">{{ props.row.number_of_episodes }}</q-td>
					<q-td key="episode_run_time" :props="props">{{ props.row.episode_run_time }}</q-td>
					<q-td class="content_td" key="languages" :props="props">{{ props.row.languages }}</q-td>
					<q-td key="vote_average" :props="props">{{ props.row.vote_average }}</q-td>
					<q-td v-if="!userItems" key="trailer" :props="props">{{ props.row.trailer }}</q-td>
					<q-td class="content_td" key="genre" :props="props">{{ props.row.genres }}</q-td>
					<q-td class="content_td" dir="rtl" key="overview" :props="props">{{ props.row.overview }}</q-td>
					<q-td v-if="!userItems" key="picture" :props="props">{{ props.row.picture }}</q-td>
					<q-td key="actions" :props="props"></q-td>
					<q-btn v-if="admin&&!userItems" @click="remove(props.row.id)">
						מחק
					</q-btn>
					<q-btn v-if="!userItems" @click="addTVToList(props.row.id,'tvShows')">
						הוסף לרשימה
					</q-btn>
					<q-btn v-if="userItems" @click="deleteTVshowFromList(props.row.id, 'tvShows')">
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
	name: "TVshowTableViewer",
	props: ['userItems', 'admin'],
	data() {
		return {
			title: '',
			items: [],
			genre: this.$route.params.genre,
			columns: []
		}
	},
	methods: {
		...mapActions('tvShows', ['deleteTVshow', 'getTVshows', 'setEditTVshowById', 'getTVshow']),
		...mapMutations('tvShows', ['setEditedTVshowId', 'setShowedTVshowId', 'setTVshow']),
		...mapActions('tvShowsGenre', ['getTVshowsByGenre']),
		...mapActions('users', ['getMyItems', 'addToList', 'deleteFromList']),
		getColumns() {
			if (this.admin) {
				this.columns = [
					{name: 'name', required: true, label: 'שם הסדרה', align: 'left', field: row => row.name, sortable: true},
					{name: 'first_air_date', label: 'תאריך יציאה', field: 'first_air_date', sortable: true},
					{name: 'number_of_seasons', label: 'מספר עונות', field: 'number_of_seasons', sortable: true},
					{name: 'number_of_episodes', label: 'מספר פרקים', field: 'number_of_episodes', sortable: true},
					{name: 'episode_run_time', label: 'אורך פרקים', field: 'episode_run_time', sortable: true},
					{name: 'languages', label: 'שפות', field: 'languages', sortable: true},
					{name: 'vote_average', label: 'דירוג', field: 'vote_average', sortable: true},
					{name: 'trailer', label: 'טריילר', field: 'trailer'},
					{name: 'genre', label: 'זאנרים', field: 'genre', sortable: true},
					{name: 'overview', label: 'תקציר', field: 'overview', sortable: false},
					{name: 'picture', label: 'תמונה', field: 'picture'}
				]
			} else {
				this.columns = [
					{name: 'name', required: true, label: 'שם הסדרה', align: 'left', field: row => row.name, sortable: true},
					{name: 'first_air_date', label: 'תאריך יציאה', field: 'first_air_date', sortable: true},
					{name: 'number_of_seasons', label: 'מספר עונות', field: 'number_of_seasons', sortable: true},
					{name: 'number_of_episodes', label: 'מספר פרקים', field: 'number_of_episodes', sortable: true},
					{name: 'episode_run_time', label: 'אורך פרקים', field: 'episode_run_time', sortable: true},
					{name: 'languages', label: 'שפות', field: 'languages', sortable: true},
					{name: 'vote_average', label: 'דירוג', field: 'vote_average', sortable: true},
					{name: 'genre', label: 'זאנרים', field: 'genre', sortable: true},
					{name: 'overview', label: 'תקציר', field: 'overview', sortable: false}
				]
			}
		},
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
		},
		async deleteTVshowFromList(id, type) {
			await this.deleteFromList([id, type])
			if (this.genre === undefined && this.userItems) {
				this.items = await this.getMyItems('tvShows');
			}
		},
		async getItems() {
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
		}
	},
	created() {
		this.getColumns()
		this.getItems()
	},

};
</script>

<style scoped>
.content_td {
	max-width: 300px;
	max-height: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: justify;
	word-break:break-all;
}
</style>