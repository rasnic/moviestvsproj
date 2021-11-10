<template>
	<body>
	<div v-if="this.$route.params.type === 'movies'">
	<MoviesTableViewer :userItems="true" />
	</div>
	<div v-else-if="this.$route.params.type === 'tvShows'">
	<TVshowTableViewer :userItems="true" />
	</div>
	</body>
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
html, body{
	min-height:100%;
	overflow:auto;
}
body {
	background-color: #1e1e1e;
}
</style>