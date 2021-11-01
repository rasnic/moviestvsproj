<template>
	<div class="q-pa-md">
		<q-table
				:title="this.title"
				:data="this.items"
				:columns="columns"
				row-key="name"
				binary-state-sort
		>
			<template v-slot:body="props">
				<q-tr :props="props" >
					<q-td key="name" :props="props" @click="goToItem(props.row.id)">{{ props.row.name }}</q-td>
					<q-td key="releaseDate" :props="props">{{ props.row.releaseDate }}</q-td>
					<q-td key="seasons" :props="props">{{ props.row.seasons }}</q-td>
					<q-td key="episodes" :props="props">{{ props.row.episodes }}</q-td>
					<q-td key="episodeLength" :props="props">{{ props.row.episodeLength }}</q-td>
					<q-td key="languages" :props="props">{{ props.row.languages }}</q-td>
					<q-td key="ranking" :props="props">{{ props.row.ranking }}</q-td>
					<q-td key="genre" :props="props">{{ props.row.genres }}</q-td>
					<q-td key="overview" align="rtl" :props="props">{{ props.row.overview }}</q-td>
					<q-td key="actions" :props="props"></q-td>
					<q-btn v-if="!userItems" @click="addToMyTVs(props.row.id)">
						הוסף לרשימה שלי
					</q-btn>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>
<script>
import { mapState, mapActions, mapMutations} from 'vuex'
import {insertToList} from "@/middleware/firebase/database";
export default {
	name: "TVgenreTable",
	props: ['userItems'],
	data() {
		return {
			columns: [
				{name: 'name', required: true, label: 'שם הסדרה', align: 'left', field: row => row.name, sortable: true},
				{name: 'releaseDate', label: 'תאריך יציאה', field: 'releaseDate', sortable: true},
				{name: 'seasons', label: 'מספר עונות', field: 'seasons', sortable: true},
				{name: 'episodes', label: 'מספר פרקים', field: 'episodes', sortable: true},
				{name: 'episodeLength', label: 'אורך פרקים', field: 'episodeLength', sortable: true},
				{name: 'languages', label: 'שפות', field: 'languages', sortable: true},
				{name: 'ranking', label: 'דירוג', field: 'ranking', sortable: true},
				{name: 'genre', label: 'זאנרים', field: 'genre', sortable: true},
				{name: 'overview', label: 'תקציר', field: 'overview', sortable: false}
			],
		title: '',
			items: []
		}
	},
	computed: {
		...mapState('tvShowsGenre', ['editedTV', 'arrTV']),
		...mapState('users', ['tvShows'])
	},
	methods: {
		...mapActions('tvShowsGenre',['getTVshows']),
		...mapActions('users',['getMyTVshows']),
		...mapMutations('tvShowsGenre',['']),
		...mapMutations('tvShow',['setShowedTVshowId','setTVshow']),
		goToItem(id) {
			this.setShowedTVshowId(id);
			this.setTVshow();
			this.$router.push(`/tvShow/${id}`);
		},
		addToMyTVs(id){
			this.setShowedTVshowId(id);
			insertToList({entity: 'tvShows', id:id});
		}
	},
	async created() {
		if (this.userItems === false) {
			await this.getTVshows(this.$route.params.genre);
			this.items = this.arrTV;
			this.title = `סדרות ${this.$route.params.genre}`;
		}
		else{
			await this.getMyTVshows();
			this.items = this.tvShows;
			this.title = 'הסדרות שלי'
		}
	},

};
</script>

<style scoped>

</style>