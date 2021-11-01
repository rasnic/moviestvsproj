<template>
  <div class="q-pa-md">
	  <div id="movies">
		  <input type="text" id="movieSearch" placeholder="חפש סרט" size="14" v-on:keypress="filteredSearch(this.value)"/>
	  </div>
    <q-table
        title="סרטים"
        :data="movies"
        :columns="columns"
        row-key="name"
        binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props" >
          <q-td key="name" :props="props" @click="goToItem(props.row.id)">{{ props.row.name }}</q-td>
          <q-td key="releaseDate" :props="props">{{ props.row.releaseDate }}</q-td>
          <q-td key="movieLength" :props="props">{{ props.row.movieLength }}</q-td>
          <q-td key="languages" :props="props">{{ props.row.languages }}</q-td>
          <q-td key="ranking" :props="props">{{ props.row.ranking }}</q-td>
          <q-td key="trailer" :props="props">{{ props.row.trailer }}</q-td>
          <q-td key="genres" :props="props">{{ props.row.genres }}</q-td>
	        <q-td key="overview" :props="props">{{ props.row.overview }}</q-td>
	        <q-td key="picture" :props="props">{{ props.row.picture }}</q-td>
          <q-td key="actions" :props="props"></q-td>
          <q-btn @click="remove(props.row.id)">
            remove
          </q-btn>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters} from 'vuex'


export default {
  name: "MoviesTableViewer",
  data() {
    return {
      columns: [
        {name: 'name', required: true, label: 'שם הסרט', align: 'left', field: row => row.name, sortable: true},
        {name: 'releaseDate', label: 'תאריך יציאה', field: 'releaseDate', sortable: true},
        {name: 'movieLength', label: 'אורך הסרט', field: 'movieLength', sortable: true},
        {name: 'languages', label: 'שפות', field: 'languages', sortable: true},
        {name: 'ranking', label: 'דירוג', field: 'ranking', sortable: true},
        {name: 'trailer', label: 'טריילר', field: 'trailer', sortable: true},
        {name: 'genres', label: 'זאנרים', field: 'genres', sortable: true},
	      {name: 'overview', label: 'תקציר', field: 'overview', sortable: false},
        {name: 'picture', label: 'תמונה', field: 'picture'}
      ],
    };
  },
  computed: mapState(`movies`, ['editedMovie', 'movies']),

  methods: {
    ...mapActions('movies',['deleteMovie','getMovies','setEditMovieById']),
    ...mapMutations('movies',['setEditedMovieId']),
	  ...mapGetters('movies',['filterMovies']),
	  ...mapMutations('movie',['setShowedMovieId','setMovie']),
	  filteredSearch(search) {
		  console.log(search)
			debugger
		  return this.movies = this.filterMovies(search)
	  },
    goToItem(id) {
	    this.setShowedMovieId(id);
	    this.setMovie();
      this.$router.push(`/movie/${id}`);
    },
    remove(id){
      this.setEditedMovieId(id);
      this.setEditMovieById();
      this.deleteMovie();
    },
  },
  created() {
    this.getMovies();
  },

}
</script>

<style scoped>

</style>