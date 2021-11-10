<template>
	<body>
<div class="home">
	<HomeView/>
</div>
	</body>
</template>

<script>

import HomeView from "@/components/HomeView";
export default {
	name: 'Home',
	components: {HomeView},

}
</script>
<style>
html, body{
	min-height:100%;
	overflow:auto;
}
body {
	background-color: #1e1e1e;
}
</style>