<template>
	<MoviesGenreTable v-if="this.$route.params.type === 'movies'" :userItems="true"/>
	<TVgenreTable v-else-if="this.$route.params.type === 'tvShows'" :userItems="true"/>
</template>

<script>
import MoviesGenreTable from "@/components/MoviesGenreTable";
import TVgenreTable from "@/components/TVgenreTable";

export default {
	name: "MyItems",
	components: {TVgenreTable, MoviesGenreTable}
}
</script>

<style scoped>

</style>