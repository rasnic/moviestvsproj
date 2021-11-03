<template>
  <div class="admin">
    <AddTVshows/>
    <AddMovies/>
	  <div>
		  <TVshowsTableViewer :admin="true"/>
	  </div>
	  <div>
		  <MoviesTableViewer :admin="true"/>
	  </div>
  </div>
</template>

<script>
import AddTVshows from "@/components/AddTVshows";
import AddMovies from "@/components/AddMovies";
import TVshowsTableViewer from  '../components/TVshowTableViewer'
import MoviesTableViewer from "@/components/MoviesTableViewer";
export default {
  name: 'Admin',
  components: {
    AddMovies,
    AddTVshows,
	  TVshowsTableViewer,
	  MoviesTableViewer
  },
};
</script>
