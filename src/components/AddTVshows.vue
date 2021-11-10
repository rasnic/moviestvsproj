<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" style="background: chocolate">
          <q-card-section>
            <div class="text-h5">הוסף סדרות</div>

            <q-input label="tv shows link" v-model="pageNumber"/>
            <q-btn @click="getTVshows" color="black" label="add tv shows"/>
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
  name: "AddTVshows",
  data() {
    return {
      pageNumber: '',
	    items: [],
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
		    overview:'',
		    picture:''
	    }
    }
  },
  computed: {
    ...mapState('tvShows', ['editedTVId','tvShows','editedTVId'])
  },
  methods: {
    ...mapActions('tvShows', [ 'updateTVshow','insertTVshow','setEditTVshowById']),
    ...mapMutations('tvShows', ['setEditedTVshow','setEditedTVshowId','checkTVshow']),
	  ...mapActions('tvShowsGenre',['insertTVshowByGenre']),
	  ...mapMutations('tvShowsGenre',['setEditedTVshowByGenre','setEditedTVshowIdByGenre']),

	  getTVshows(){
		  api.getItems({pageNumber: this.pageNumber, entity: 'tv'})
				  .then(tvShows => {
					  Object.assign(this.items, tvShows.results)
					  this.setTVshow(this.items)
				  })
	  },
	  async setTVshow(tvShows){
		  let drop = []
		  for (let i = 0; i < this.items.length; i++) {
			  await api.getItem({id: tvShows[i].id, entity: 'tv'})
			  .then(async item =>{
				  for (const key in this.editedItem) {
					  if (key !== 'languages' && key !== 'genres' && key !== 'picture' && key !== 'trailer' && key !== 'episode_run_time'){
						  this.editedItem[key] = item[key]
					  }
				  }
				  this.editedItem.episode_run_time = item.episode_run_time.toString();
					if (!item.overview){
						this.editedItem.overview = await api.getEnOverview({id: tvShows[i].id, entity: 'tv'})
					}
					else {
						this.editedItem.overview = item.overview;
					}
				  let genres = [];
				  for (let j = 0; j < item.genres.length; j++) {
					  genres.push(item.genres[j].name)
				  }

				  this.editedItem.genres = genres;

				  let languages = [];
				  for (let j = 0; j < item.spoken_languages.length; j++) {
					  languages.push(item.spoken_languages[j].english_name)
				  }
				  this.editedItem.languages = languages.toString();
				  this.editedItem.trailer = await api.getTrailer({entity: 'tv', id: item.id});
				  this.editedItem.picture = await api.getPicture({entity: 'tv', id: item.id});
				  if(!this.editedItem.overview || !this.editedItem.picture || !this.editedItem.trailer || !this.editedItem.languages || genres.length === 0){
					  drop.push(i)
				  }
				  else {
					  this.items.splice(i, 1, this.editedItem);
				  }
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
							overview:'',
							picture:''
						}

			  })
		  }
		  for (let k = drop.length-1; k > -1 ; k--) {
			  this.items.splice(drop[k],1)
		  }
		  for (let i = 0; i < this.items.length; i++) {
			  this.setEditedTVshowId(this.items[i].id);
			  this.setEditedTVshow(this.items[i]);
			  await this.insertTVshow()
		  }
			  for (let j = 0; j < this.items.length; j++) {
				  await this.setEditedTVshowIdByGenre(this.items[j].id);
				  await this.setEditedTVshowByGenre(this.items[j]);
				  await this.insertTVshowByGenre()

		  }
	  }
  }
}
</script>

<style scoped>

</style>