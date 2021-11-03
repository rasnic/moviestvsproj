<template>
	<div v-if="this.$route.params.type === 'movies'">
	<MoviesTableViewer :userItems="true" />
	</div>
	<div v-else-if="this.$route.params.type === 'tvShows'">
	<TVshowTableViewer :userItems="true" />
	</div>
</template>

<script>
import MoviesTableViewer from "@/components/MoviesTableViewer";
import TVshowTableViewer from "@/components/TVshowTableViewer";
export default {
	name: "UserPage",
	components: {TVshowTableViewer,MoviesTableViewer},
}
</script>

<style scoped>

</style>