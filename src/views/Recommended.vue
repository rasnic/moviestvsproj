<template>
	<body>
	<div class="recommended">
	<Carousel/>
	</div>
	</body>
</template>

<script>
import Carousel from "@/components/Carousel";
export default {
	name: "Recommended",
	components: {Carousel},
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