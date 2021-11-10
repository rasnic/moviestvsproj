<template>
	<body>
	<div class="img-div">
		<q-img class="home-img" :src="moviePic" @click="goMovies">
			<div class="absolute-top text-center text-weight-bolder h3">
				{{ "סרטים" }}
			</div>
		</q-img>
		<q-img class="home-img" :src="tvPic" @click="goTVs">
			<div class="absolute-top text-center text-weight-bolder h3">
				{{ "סדרות" }}
			</div>
		</q-img>
	</div>
	</body>
</template>

<script>
import movieImg from '../assets/movie.png'
import tvImg from '../assets/tv.png'

export default {
	name: "HomeView",
	data() {
		return {
			moviePic: movieImg,
			tvPic: tvImg
		}
	},
	methods: {
		goMovies() {
			this.$router.push(`/movieGenres`)
		},
		goTVs() {
			this.$router.push('/tvGenres')
		}
	}
}
</script>

<style scoped>

.img-div {
	margin: 2em;
	display: flex;
	gap: 2em;
}

.q-img {
	height: 90vh;
	display: flex;
}

.h3 {
	font-size: xx-large;
	margin: 0.5em auto;
	width: 15%;
	text-align: center;
	color: white;
}
.home-img {
	cursor: pointer;
}
html, body{
	min-height:100%;
	overflow:auto;
}
body {
	background-color: #1e1e1e;
}

</style>