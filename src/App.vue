<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated class="glossy">
			<q-toolbar>
				<q-btn v-if="userN !== 'DISCONNECTED'"
				       flat
				       dense
				       round
				       @click="leftDrawerOpen = !leftDrawerOpen"
				       aria-label="Menu"
				       icon="menu"
				/>

				<q-toolbar-title>
					movies and tv shows App
				</q-toolbar-title>

				<div>
					<q-btn v-if="userN !== 'DISCONNECTED'" @click="disconnect" text-color="white" color="dark grey">התנתק</q-btn>
				</div>
				<div v-if="userN !== 'DISCONNECTED'"> {{ userN }} ברוך הבא</div>
				<div v-if="userN === 'DISCONNECTED'">ברוך הבא</div>
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

				<q-item clickable tag="a" @click="myPage">
					<q-item-section>
						<q-item-label align="center">החשבון שלי</q-item-label>
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
				<q-item clickable tag="a" @click="myItems('movies')">
					<q-item-section>
						<q-item-label align="center">הסרטים שלי</q-item-label>
					</q-item-section>
				</q-item>

				<q-item clickable tag="a" @click="items('movies')">
					<q-item-section>
						<q-item-label align="center">סרטים</q-item-label>
					</q-item-section>
				</q-item>

				<q-expansion-item clickable tag="a" align="center" label="לפי ז'אנר">

					<q-item clickable tag="a" genre="קומדיה" @click="byGenre('movies','קומדיה')">
						<q-item-section>
							<q-item-label align="center">קומדיה</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator/>

					<q-separator/>
					<q-item clickable tag="a" genre="אקשן" @click="byGenre('movies','אקשן')">
						<q-item-section>
							<q-item-label align="center">אקשן</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="הרפתקאות" @click="byGenre('movies','הרפתקאות')">
						<q-item-section>
							<q-item-label align="center">הרפתקאות</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="אנימציה" @click="byGenre('movies','אנימציה')">
						<q-item-section>
							<q-item-label align="center">אנימציה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="פשע" @click="byGenre('movies','פשע')">
						<q-item-section>
							<q-item-label align="center">פשע</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="דוקומנטרי" @click="byGenre('movies','דוקומנטרי')">
						<q-item-section>
							<q-item-label align="center">דוקומנטרי</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="דרמה" @click="byGenre('movies','דרמה')">
						<q-item-section>
							<q-item-label align="center">דרמה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="משפחה" @click="byGenre('movies','משפחה')">
						<q-item-section>
							<q-item-label align="center">משפחה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="פנטזיה" @click="byGenre('movies','פנטזיה')">
						<q-item-section>
							<q-item-label align="center">פנטזיה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="הסטוריה" @click="byGenre('movies','הסטוריה')">
						<q-item-section>
							<q-item-label align="center">הסטוריה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="אימה" @click="byGenre('movies','אימה')">
						<q-item-section>
							<q-item-label align="center">אימה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מוסיקה" @click="byGenre('movies','מוסיקה')">
						<q-item-section>
							<q-item-label align="center">מוסיקה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מסתורין" @click="byGenre('movies','מסתורין')">
						<q-item-section>
							<q-item-label align="center">מסתורין</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="רומנטי" @click="byGenre('movies','רומנטי')">
						<q-item-section>
							<q-item-label align="center">רומנטי</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מדע בדיוני" @click="byGenre('movies','מדע בדיוני')">
						<q-item-section>
							<q-item-label align="center">מדע בדיוני</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="סרט טלויזיה" @click="byGenre('movies','סרט טלויזיה')">
						<q-item-section>
							<q-item-label align="center">סרט טלויזיה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מותחן" @click="byGenre('movies','מותחן')">
						<q-item-section>
							<q-item-label align="center">מותחן</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מלחמה" @click="byGenre('movies','מלחמה')">
						<q-item-section>
							<q-item-label align="center">מלחמה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מערכון" @click="byGenre('movies','מערכון')">
						<q-item-section>
							<q-item-label align="center">מערכון</q-item-label>
						</q-item-section>
					</q-item>
				</q-expansion-item>


				<q-separator color="black"/>
				<q-item-label header align="center" overline>סדרות</q-item-label>
				<q-separator/>
				<q-item clickable tag="a" @click="myItems('tvShows')">
					<q-item-section>
						<q-item-label align="center">הסדרות שלי</q-item-label>
					</q-item-section>
				</q-item>


				<q-expansion-item clickable tag="a" align="center" label="לפי ז'אנר">

					<q-separator/>
					<q-item clickable tag="a" genre="אקשן והרפתקאות" @click="byGenre('tvShows','אקשן והרפתקאות')">
						<q-item-section>
							<q-item-label align="center">אקשן והרפתקאות</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="אנימציה" @click="byGenre('tvShows','אנימציה')">
						<q-item-section>
							<q-item-label align="center">אנימציה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="קומדיה" @click="byGenre('tvShows','קומדיה')">
						<q-item-section>
							<q-item-label align="center">קומדיה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="פשע" @click="byGenre('tvShows','פשע')">
						<q-item-section>
							<q-item-label align="center">פשע</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="דוקומנטרי" @click="byGenre('tvShows','דוקומנטרי')">
						<q-item-section>
							<q-item-label align="center">דוקומנטרי</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="דרמה" @click="byGenre('tvShows','דרמה')">
						<q-item-section>
							<q-item-label align="center">דרמה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="משפחה" @click="byGenre('tvShows','משפחה')">
						<q-item-section>
							<q-item-label align="center">משפחה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="ילדים" @click="byGenre('tvShows','ילדים')">
						<q-item-section>
							<q-item-label align="center">ילדים</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מסתורין" @click="byGenre('tvShows','מסתורין')">
						<q-item-section>
							<q-item-label align="center">מסתורין</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="חדשות" @click="byGenre('tvShows','חדשות')">
						<q-item-section>
							<q-item-label align="center">חדשות</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="ריאליטי" @click="byGenre('tvShows','ריאליטי')">
						<q-item-section>
							<q-item-label align="center">ריאליטי</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מדע בדיוני ופנטזיה" @click="byGenre('tvShows','מדע בדיוני ופנטזיה')">
						<q-item-section>
							<q-item-label align="center">מדע בדיוני ופנטזיה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="סבון" @click="byGenre('tvShows','סבון')">
						<q-item-section>
							<q-item-label align="center">סבון</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="דיבורים" @click="byGenre('tvShows','דיבורים')">
						<q-item-section>
							<q-item-label align="center">דיבורים</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מלחמה ופוליטיקה" @click="byGenre('tvShows','מלחמה ופוליטיקה')">
						<q-item-section>
							<q-item-label align="center">מלחמה ופוליטיקה</q-item-label>
						</q-item-section>
					</q-item>

					<q-separator/>
					<q-item clickable tag="a" genre="מערכון" @click="byGenre('tvShows','מערכון')">
						<q-item-section>
							<q-item-label align="center">מערכון</q-item-label>
						</q-item-section>
					</q-item>

				</q-expansion-item>
				<q-separator color="black"/>
			</q-list>
		</q-drawer>
		<q-page-container>
			<router-view></router-view>
		</q-page-container>
	</q-layout>
</template>

<script>
import Logout from "@/views/Logout";
import Login from "@/views/Login";
import {getUserName} from "@/middleware/firebase/database";

export default {
	name: 'LayoutDefault',
	components: {Login},
	data() {
		return {
			userN: 'DISCONNECTED',
			loggedIn: false,
			leftDrawerOpen: this.$q.platform.is.desktop
		}
	},
	methods: {
		goHome() {
			this.$router.push(`/home`)
			location.reload()
		},
		myPage() {
			this.$router.push('/userPage')
			location.reload()
		},
		disconnect() {
			this.$router.push('/')
			Logout.methods.logout();
			this.userN = 'DISCONNECTED'
		},
		items(type) {
	this.$router.push(`/${type}`)
		},
		myItems(type) {
			debugger
			this.$router.push(`/${type}/user/${this.userN}`)
			location.reload()
		},

		byGenre(type, genre) {
			this.$router.push(`/${type}/${genre}`)
			location.reload()
		}
	},

	created() {
		if (window.user && window.user.displayName) {
			this.userN = window.user.displayName
		}
		if (window.user && !window.user.displayName) {
			this.userN = getUserName({uid: window.user.uid})
		}
	},

}
</script>

<style>
</style>
