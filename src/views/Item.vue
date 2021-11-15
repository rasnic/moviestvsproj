<template>
	<body>
	<div class="container" >
		<q-card dir="rtl" class="item" v-if="this.$route.params.type === 'tvShow'" >
			<q-card-section class="item-section" :style="{backgroundImage: `url(${this.pictureTV})`}">
				<h4><span class="background-span">{{ this.showedLocTV.name }}</span></h4>
				<q-btn class="add-btn" v-if="!this.inList" color="red" icon="add" @click="addItem()"/>
				<q-btn class="add-btn" v-else color="grey" icon="remove"  @click="deleteItem()"/>

				<h6><span class="background-span"><span class="item-span">תקציר: </span>
					{{ this.showedLocTV.overview }}
				</span></h6>
				<h6><span class="background-span"><span class="item-span">תאריך יציאה: </span>
					{{ this.showedLocTV.first_air_date }}</span></h6>
				<h6><span class="background-span"><span class="item-span">מספר עונות: </span>{{ this.showedLocTV.number_of_seasons }}</span></h6>
				<h6><span class="background-span"><span class="item-span">מספר פרקים: </span>{{ this.showedLocTV.number_of_episodes }}</span></h6>
				<h6><span class="background-span"><span class="item-span">אורך פרק: </span>{{ this.showedLocTV.episode_run_time }}</span></h6>
				<h6><span class="background-span"><span class="item-span">שפות: </span>{{ this.showedLocTV.languages }}</span></h6>
				<h6><span class="background-span"><span class="item-span">דירוג: </span>{{ this.showedLocTV.vote_average }}</span></h6>
				<h6><span class="background-span"><span class="item-span">ז'אנרים: </span>{{ this.showedLocTV.genres.toString() }}</span></h6>
				<q-video v-if="this.trailerTV !== 'empty'" :src="this.trailerTV" class="item-video"/>

			</q-card-section>
		</q-card>

		<q-card dir="rtl" class="item" v-if="this.$route.params.type === 'movie'" >
			<q-card-section class="item-section" :style="{backgroundImage: `url(${this.pictureM})`}">
				<h4 align="center"><span class="background-span">{{ this.showedLocMovie.title }}</span></h4>
				<q-btn class="add-btn" v-if="!this.inList" color="red" icon="add"  @click="addItem()"/>
				<q-btn class="add-btn" v-else color="grey" icon="remove"  @click="deleteItem()"/>
				<h6 dir="rtl"><span class="background-span"><span class="item-span">תקציר: </span>{{ this.showedLocMovie.overview }}</span></h6>
				<h6 align="right"><span class="background-span"><span class="item-span">תאריך יציאה: </span>{{ this.showedLocMovie.release_date }}</span></h6>
				<h6 align="right"><span class="background-span"><span class="item-span">אורך סרט: </span>{{ this.showedLocMovie.runtime }} דקות</span></h6>
				<h6 align="right"><span class="background-span"><span class="item-span">שפות: </span>{{ this.showedLocMovie.languages }}</span></h6>
				<h6 align="right"><span class="background-span"><span class="item-span">דירוג: </span>{{ this.showedLocMovie.vote_average }}</span></h6>
				<h6 align="right"><span class="background-span"><span class="item-span">ז'אנרים: </span>{{ this.showedLocMovie.genres.toString() }}</span></h6>
				<q-video class="item-video" v-if="this.trailerM !== 'empty'" :src="this.trailerM"/>

			</q-card-section>
		</q-card>
	</div>
	</body>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import database from '../middleware/firebase/database'

export default {
	name: "Item",
	data() {
		if (this.$route.params.type === 'tvShow') {
			return {
				type: 'tvShows',
				trailerTV: 'empty',
				pictureTV: 'empty',
				inList: '',
				image: {backgroundImage: "url()"},
				showedLocTV: {
					name: '',
					id: '',
					first_air_date: '',
					number_of_seasons: '',
					number_of_episodes: '',
					episode_run_time: '',
					languages: '',
					vote_average: '',
					genres: '',
					overview: ''
				}
			}
		} else {
			return {
				type: 'movies',
				trailerM: 'empty',
				pictureM: 'empty',
				inList: '',
				showedLocMovie: {
					title: '',
					id: '',
					release_date: '',
					runtime: '',
					languages: '',
					vote_average: '',
					genres: '',
					overview: ''
				}
			}
		}
	},
	methods: {
		...mapActions('users', ['addToList', 'deleteFromList', 'checkList']),
		async setItem() {

			if (this.$route.params.type === 'tvShow') {
				const tvShow = await database.getItem({type: 'tvShows', id: this.$route.params.id})
				for (const key in tvShow) {
					this.showedLocTV[key] = tvShow[key]
				}
				this.pictureTV = `https://image.tmdb.org/t/p/w300${tvShow.picture}`
				this.trailerTV = `https://www.youtube.com/embed/${tvShow.trailer}/?rel=0`
				document.documentElement.style.setProperty(`--image`, `'${this.pictureTV}'`);
			} else {
				const movie = await database.getItem({type: 'movies', id: this.$route.params.id})
				for (const key in movie) {
					this.showedLocMovie[key] = movie[key]
				}
				this.pictureM = `https://image.tmdb.org/t/p/w300${movie.picture}`
				this.trailerM = `https://www.youtube.com/embed/${movie.trailer}/?rel=0`
			}
		},
		async addItem() {
			await this.addToList([this.$route.params.id, this.$route.params.type + 's'])
			this.inList = !this.inList
		},
		async deleteItem() {
			await this.deleteFromList([this.$route.params.id, this.$route.params.type + 's'])
			this.inList = !this.inList
		},
	},
	async created() {
		this.inList = await this.checkList([this.$route.params.id,this.$route.params.type + 's'])
		await this.setItem()
	},
}
</script>

<style scoped>

.container {
	color: white;
	max-width: 960px;
	margin: 1em auto;

}

.container .item {
	position: relative;
}

.item-section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.item-section h4 {
	font-weight: bold;
}

.background-span{
	background-color: black;
}
.item-section h6 {
	align-self: flex-start;
	margin: 1em;
}

.item-section .item-span{
	font-weight: bold;
}

.item-section .item-video {
	width: 500px;
	height: 350px;
	border: 1px solid white;
}

.item-section .add-btn {
	width: 40px;
	height: 40px;
	position: absolute;
	margin: 1em;
	top: 0;
	right: 0;
}
html, body{
	min-height:100%;
	overflow:auto;
}
body {
	background-color: #1e1e1e;
}


.q-img {
	height: 15%;
	width: 30%
}
</style>