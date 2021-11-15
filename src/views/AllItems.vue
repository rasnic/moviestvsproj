<template>
	<body>
<div v-if="this.$route.params.type=== 'movies'">
	<ItemTableViewer :type="'movies'"/>
</div>
	<div v-else>
		<ItemTableViewer :type="'tvShows'"/>
	</div>
	</body>
</template>

<script>
import ItemTableViewer from "@/components/ItemTableViewer";
export default {
	name: "AllItems",
	components: {ItemTableViewer}
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