<template >
	<q-layout view="lHh Lpr lFf" >
		<q-header>
			<q-toolbar>
				<q-btn v-if="userN !== 'DISCONNECTED'"
				       flat
				       dense
				       round
				       @click="leftDrawerOpen = !leftDrawerOpen"
				       aria-label="Menu"
				       icon="menu"
				/>

				<q-toolbar-title class="text-bold text-center">
					GAL-MDB
				</q-toolbar-title>


				<div style="display: flex; align-items: center; justify-content: center; gap: 2em">
					<p style="margin: 0; font-size: 1.2em; text-transform: uppercase" v-if="userN !== 'DISCONNECTED'"> {{ userN }} ברוך הבא</p>
					<q-btn icon="logout" flat v-if="userN !== 'DISCONNECTED'" @click="disconnect" text-color="white" color="secondary" dense unelevated/>
				</div>
			</q-toolbar>
		</q-header>

		<q-drawer
				v-if="userN !== 'DISCONNECTED'"
				v-model="leftDrawerOpen"
				bordered
				content-class="bg-grey-2"
		>
			<q-list>
				<q-item-label header align="center" overline>תפריט</q-item-label>
				<q-separator color="black"/>
				<q-item clickable tag="a" @click="goHome">
					<q-item-section>
						<q-item-label align="center">מסך הבית</q-item-label>
					</q-item-section>
				</q-item>

<!--				<q-item clickable tag="a" @click="myPage">-->
<!--					<q-item-section>-->
<!--						<q-item-label align="center">החשבון שלי</q-item-label>-->
<!--					</q-item-section>-->
<!--				</q-item>-->

				<q-item clickable tag="a" @click="recommendations">
					<q-item-section>
						<q-item-label align="center">סרטים וסדרות מומלצים</q-item-label>
					</q-item-section>
				</q-item>

				<q-item clickable tag="a" @click="disconnect">
					<q-item-section>
						<q-item-label align="center">התנתק</q-item-label>
					</q-item-section>
				</q-item>

				<q-separator color="black"/>
				<q-item-label header align="center" overline>סרטים</q-item-label>
				<q-separator/>
				<q-item clickable tag="a" @click="items('movies')">
					<q-item-section>
						<q-item-label align="center">כל הסרטים</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" @click="myItems('movies')">
					<q-item-section>
						<q-item-label align="center">הסרטים שלי</q-item-label>
					</q-item-section>
				</q-item>

				<q-expansion-item clickable tag="a" align="center" label="לפי ז'אנר">
<li v-for="genreName in this.movieGenresList" style="list-style-type: none">
					<q-item clickable tag="a" :genre="genreName" @click="byGenre('movies',`${genreName}`)">
						<q-item-section>
							<q-item-label align="center">{{genreName}}</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator/>
</li>
				</q-expansion-item>


				<q-separator color="black"/>
				<q-item-label header align="center" overline>סדרות</q-item-label>
				<q-separator/>
				<q-item clickable tag="a" @click="items('tvShows')">
					<q-item-section>
						<q-item-label align="center">כל הסדרות</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" @click="myItems('tvShows')">
					<q-item-section>
						<q-item-label align="center">הסדרות שלי</q-item-label>
					</q-item-section>
				</q-item>


				<q-expansion-item clickable tag="a" align="center" label="לפי ז'אנר">

						<li v-for="genreName in this.tvGenresList" style="list-style-type: none">
							<q-item clickable tag="a" :genre="genreName" @click="byGenre('tvShows',`${genreName}`)">
								<q-item-section>
									<q-item-label align="center">{{genreName}}</q-item-label>
								</q-item-section>
							</q-item>
							<q-separator/>
						</li>
				</q-expansion-item>
				<q-separator color="black"/>
			</q-list>
		</q-drawer>
		<q-page-container >
			<router-view></router-view>
		</q-page-container>
	</q-layout>
</template>

<script>
import Logout from "@/components/Logout";
import Login from "@/views/Login";
import {getUserName} from "@/middleware/firebase/database";


export default {
	name: 'LayoutDefault',
	components: {Login},
	data() {
		return {
			userN: 'DISCONNECTED',
			loggedIn: false,
			leftDrawerOpen: this.$q.platform.is.desktop,
			movieGenresList : ["קומדיה","אקשן","הרפתקאות","אנימציה","פשע","דוקומנטרי","דרמה","משפחה","פנטזיה"
				,"הסטוריה","אימה","מוסיקה","מסתורין","רומנטי","מדע בדיוני","סרט טלויזיה","מותחן","מלחמה","מערכון"],
			tvGenresList : ["אקשן והרפתקאות","אנימציה","קומדיה","פשע","דוקומנטרי","דרמה","משפחה","ילדים","מסתורין"
				,"חדשות","ריאליטי","מדע בדיוני ופנטזיה","סבון","דיבורים","מלחמה ופוליטיקה","מערכון"]
		}
	},
	methods: {
		goHome() {
			this.$router.push(`/home`)
			location.reload()
		},
		myPage() {
			this.$router.push(`/user/${this.userN}`)
			location.reload()
		},
		async disconnect() {
			await Logout.methods.logout();
			window.user = undefined
			this.userN = 'DISCONNECTED'
			await this.$router.push(`/`);
			location.reload();
		},
		items(type) {
	this.$router.push(`/${type}`)
			location.reload()
		},
		myItems(type) {
			this.$router.push(`/user/${this.userN}/${type}`)
			location.reload()
		},

		byGenre(type, genre) {
			this.$router.push(`/${type}/${genre}`)
			location.reload()
		},
		recommendations(){
			this.$router.push('/recommendations')
			location.reload()
		}
	},

	async created() {
		if (window.user && window.user.displayName) {
			this.userN = window.user.displayName
		}
		if (window.user && !window.user.displayName) {
			 this.userN = await getUserName({uid: window.user.uid})
		}
	},
}
</script>

<style>

</style>
