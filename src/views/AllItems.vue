<template>
	<body>
<div class="movies" v-if="this.$route.params.type=== 'movies'">
	<MoviesTableViewer />
</div>
	<div class="tvShows" v-else>
		<TVshowTableViewer/>
	</div>
	</body>
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
html, body{
	min-height:100%;
	overflow:auto;
}
body {
	background-color: #1e1e1e;
}
</style>