<template>
	<body>
	<div v-if="this.$route.params.type === 'movies'">
	<ItemTableViewer :userItems="true" :type="'movies'"/>
	</div>
	<div v-else-if="this.$route.params.type === 'tvShows'">
	<ItemTableViewer :userItems="true" :type="'tvShows'"/>
	</div>
	</body>
</template>

<script>
import ItemTableViewer from "@/components/ItemTableViewer";
export default {
	name: "UserPage",
	components: {ItemTableViewer},
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