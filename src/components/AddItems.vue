<template>
	<div class="q-pa-md">
		<div class="q-gutter-md" style="max-width: 300px">
			<div class="q-pa-md row items-start q-gutter-md">
				<q-card class="my-card" style="background: chocolate">
					<q-card-section>
						<div  class="text-h5">{{ addType }}</div>
						<q-input label="movies link" v-model="pageNumber"/>
						<q-btn @click="getItems" color="black" :label=label />
					</q-card-section>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';
import api from '../middleware/api';

export default {
	name: "AddItems",
	props: ['type'],
	data() {
		if (this.type === 'movies') {
			return {
				addType: '',
				label: '',
				pageNumber: '',
				items: [],
				entity: 'movie',
				editedItem: {
					title: '',
					id: '',
					release_date: '',
					runtime: '',
					languages: '',
					trailer: '',
					vote_average: '',
					genres: '',
					picture: '',
					overview: ''
				}
			}
		} else {
			return {
				addType: '',
				label: '',
				pageNumber: '',
				items: [],
				entity: 'tv',
				editedItem: {
					name: '',
					id: '',
					first_air_date: '',
					number_of_seasons: '',
					number_of_episodes: '',
					episode_run_time: '',
					languages: '',
					vote_average: '',
					trailer: '',
					genres: '',
					overview: '',
					picture: ''
				}
			}
		}
	},
	methods: {
		...mapActions('items', ['updateItem', 'insertItem']),
		...mapMutations('items', ['setEditedItem', 'setEditedItemId', 'checkItem']),
		...mapActions('itemsGenre', ['insertItemByGenre']),
		...mapMutations('itemsGenre', ['setEditedItemIdByGenre', 'setEditedItemByGenre']),

		getItems() {
			api.getItems({pageNumber: this.pageNumber, type: this.entity})
					.then(items => {
						Object.assign(this.items, items.results)
						this.setItems(this.items)
						return items
					})
		},
		async setItems(items) {
			let drop = []
			for (let i = 0; i < this.items.length; i++) {
				await api.getItem({id: items[i].id, type: this.entity})
						.then(async item => {

								for (const key in this.editedItem) {
									if (key !== 'languages' && key !== 'genres' && key !== 'picture' && key !== 'trailer') {
										this.editedItem[key] = item[key]
									}
								}
								let languages = [];
								for (let j = 0; j < item.spoken_languages.length; j++) {
									languages.push(item.spoken_languages[j].english_name)
								}
								this.editedItem.languages = languages.toString();
								let genres = [];
								for (let j = 0; j < item.genres.length; j++) {
									genres.push(item.genres[j].name)
								}
								this.editedItem.genres = genres;
								if (!item.overview) {
									this.editedItem.overview = await api.getEnOverview({id: items[i].id, type: this.entity})
								} else {
									this.editedItem.overview = item.overview
								}
								this.editedItem.trailer = await api.getTrailer({type: this.entity, id: item.id});
								this.editedItem.picture = await api.getPicture({type: this.entity, id: item.id});
								if (!this.editedItem.overview || !this.editedItem.picture || !this.editedItem.trailer || !this.editedItem.languages || genres === []) {
									drop.push(i)
								} else {
									this.items.splice(i, 1, this.editedItem)
								}
							if (this.type === 'movies') {
								this.editedItem = {
									title: '',
									id: '',
									release_date: '',
									runtime: '',
									languages: '',
									trailer: '',
									vote_average: '',
									genres: '',
									picture: '',
									overview: ''
								}
							} else {
								this.editedItem = {
									name: '',
									id: '',
									first_air_date: '',
									number_of_seasons: '',
									number_of_episodes: '',
									episode_run_time: '',
									languages: '',
									vote_average: '',
									trailer: '',
									genres: '',
									overview: '',
									picture: ''
								}
							}
						})
			}
			for (let k = drop.length - 1; k > -1; k--) {
				this.items.splice(drop[k], 1)
			}
			for (let i = 0; i < this.items.length; i++) {
				this.setEditedItemId([this.items[i].id, this.type]);
				this.setEditedItem([this.items[i], this.type]);
				await this.insertItem(this.type)
			}
			for (let j = 0; j < this.items.length; j++) {
				await this.setEditedItemIdByGenre([this.items[j].id, this.type]);
				await this.setEditedItemByGenre([this.items[j],this.type]);
				await this.insertItemByGenre(this.type)
			}
		},
		getAddTypeAndLabel() {
			if (this.type === 'movies') {
				this.addType = 'הוסף סרטים'
				this.label = 'add movies'

			} else {
				this.addType = 'הוסף סדרות'
				this.label = 'add tv shows'
			}
		}
	},
	created() {
		this.getAddTypeAndLabel()
	}
}
</script>

<style scoped>

</style>