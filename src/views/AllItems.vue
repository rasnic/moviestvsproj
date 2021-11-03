<template>
<div class="movies" v-if="this.$route.params.type=== 'movies'">
	<MoviesTableViewer />
</div>
	<div class="tvShows" v-else-if="this.$route.params.type=== 'tvShows'">
		<TVshowTableViewer/>
	</div>
</template>

<script>
import MoviesTableViewer from "@/components/MoviesTableViewer";
import TVshowTableViewer from "@/components/TVshowTableViewer";
export default {
	name: "AllItems",
	components: {MoviesTableViewer, TVshowTableViewer}
}
</script>

<style scoped>

</style>