<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar >
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
	        <q-btn v-if="userN !== 'DISCONNECTED'" @click="disconnect" text-color="white" color="dark grey" >התנתק</q-btn>
        </div>
	      <div v-if="userN !== 'DISCONNECTED'"> {{userN}} ברוך הבא</div>
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
	      <q-item clickable tag="a"  @click="goHome" >
		      <q-item-section>
			      <q-item-label align="center">מסך הבית</q-item-label>
		      </q-item-section>
	      </q-item>

	      <q-item clickable tag="a"  @click="myPage" >
		      <q-item-section>
			      <q-item-label align="center">החשבון שלי</q-item-label>
		      </q-item-section>
	      </q-item>

	      <q-item clickable tag="a"  @click="disconnect" >
		      <q-item-section>
			      <q-item-label align="center">התנתק</q-item-label>
		      </q-item-section>
	      </q-item>

	      <q-separator color="black"/>
        <q-item-label header align="center" overline>סרטים</q-item-label>
        <q-separator/>
        <q-item clickable tag="a"  @click="myItems('movies')" >
          <q-item-section>
            <q-item-label align="center">הסרטים שלי</q-item-label>
          </q-item-section>
        </q-item>


        <q-expansion-item clickable tag="a" align="center" label="לפי ז'אנר" >

          <q-item clickable tag="a"  genretype="קומדיה" @click="byGenre('movies','comedy')" >
            <q-item-section>
              <q-item-label align="center">קומדיה</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>

          <q-separator/>
          <q-item clickable tag="a" genre="action" genretype="אקשן" @click="byGenre('movies','action')" >
            <q-item-section>
              <q-item-label align="center">אקשן</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="adventure" genretype="הרפתקאות" @click="byGenre('movies','adventure')" >
            <q-item-section>
              <q-item-label align="center">הרפתקאות</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="animation" genretype="אנימציה" @click="byGenre('movies','animation')" >
            <q-item-section>
              <q-item-label align="center">אנימציה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="crime" genretype="פשע" @click="byGenre('movies','crime')" >
            <q-item-section>
              <q-item-label align="center">פשע</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="documentary" genretype="דוקומנטרי" @click="byGenre('movies','documentary')" >
            <q-item-section>
              <q-item-label align="center">דוקומנטרי</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="drama" genretype="דרמה" @click="byGenre('movies','drama')" >
            <q-item-section>
              <q-item-label align="center">דרמה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="family" genretype="משפחה" @click="byGenre('movies','family')" >
            <q-item-section>
              <q-item-label align="center">משפחה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="fantasy" genretype="פנטזיה" @click="byGenre('movies','fantasy')" >
            <q-item-section>
              <q-item-label align="center">פנטזיה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="historic" genretype="הסטוריה" @click="byGenre('movies','historic')" >
            <q-item-section>
              <q-item-label align="center">הסטוריה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="horror" genretype="אימה" @click="byGenre('movies','horror')" >
            <q-item-section>
              <q-item-label align="center">אימה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="musical" genretype="מוסיקה" @click="byGenre('movies','musical')" >
            <q-item-section>
              <q-item-label align="center">מוסיקה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="mystery" genretype="מסתורין" @click="byGenre('movies','mystery')" >
            <q-item-section>
              <q-item-label align="center">מסתורין</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="romantic" genretype="רומנטי" @click="byGenre('movies','romantic')" >
            <q-item-section>
              <q-item-label align="center">רומנטי</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="sci-fi" genretype="מדע בדיוני" @click="byGenre('movies','sci-fi')" >
            <q-item-section>
              <q-item-label align="center">מדע בדיוני</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="televisionFilm" genretype="סרט טלויזיה" @click="byGenre('movies','televisionFilm')" >
            <q-item-section>
              <q-item-label align="center">סרט טלויזיה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="thriller" genretype="מותחן" @click="byGenre('movies','thriller')" >
            <q-item-section>
              <q-item-label align="center">מותחן</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="war" genretype="מלחמה" @click="byGenre('movies','war')" >
            <q-item-section>
              <q-item-label align="center">מלחמה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="western" genretype="מערכון" @click="byGenre('movies','western')" >
            <q-item-section>
              <q-item-label align="center">מערכון</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>


        <q-separator color="black"/>
        <q-item-label header align="center" overline>סדרות</q-item-label>
        <q-separator/>
        <q-item clickable tag="a"  @click="myItems('tvShows')" >
          <q-item-section>
            <q-item-label align="center">הסדרות שלי</q-item-label>
          </q-item-section>
        </q-item>


        <q-expansion-item clickable tag="a" align="center" label="לפי ז'אנר" >

          <q-separator/>
          <q-item clickable tag="a" genre="actionAdventure" genretype="אקשן והרפתקאות" @click="byGenre('tvShows','actionAdventure')" >
            <q-item-section>
              <q-item-label align="center">אקשן והרפתקאות</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="animation" genretype="אנימציה" @click="byGenre('tvShows','animation')" >
            <q-item-section>
              <q-item-label align="center">אנימציה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="comedy" genretype="קומדיה" @click="byGenre('tvShows','comedy')" >
            <q-item-section>
              <q-item-label align="center">קומדיה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="crime" genretype="פשע" @click="byGenre('tvShows','crime')" >
            <q-item-section>
              <q-item-label align="center">פשע</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="documentary" genretype="דוקומנטרי" @click="byGenre('tvShows','documentary')" >
            <q-item-section>
              <q-item-label align="center">דוקומנטרי</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="drama" genretype="דרמה" @click="byGenre('tvShows','drama')" >
            <q-item-section>
              <q-item-label align="center">דרמה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="family" genretype="משפחה" @click="byGenre('tvShows','family')" >
            <q-item-section>
              <q-item-label align="center">משפחה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="kids" genretype="ילדים" @click="byGenre('tvShows','kids')" >
            <q-item-section>
              <q-item-label align="center">ילדים</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="mystery" genretype="מסתורין" @click="byGenre('tvShows','mystery')" >
            <q-item-section>
              <q-item-label align="center">מסתורין</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="news" genretype="חדשות" @click="byGenre('tvShows','news')" >
            <q-item-section>
              <q-item-label align="center">חדשות</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="reality" genretype="ריאליטי" @click="byGenre('tvShows','reality')" >
            <q-item-section>
              <q-item-label align="center">ריאליטי</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="sci-fiFantasy" genretype="מדע בדיוני ופנטזיה" @click="byGenre('tvShows','sci-fiFantasy')" >
            <q-item-section>
              <q-item-label align="center">מדע בדיוני ופנטזיה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="soap" genretype="סבון" @click="byGenre('tvShows','soap')" >
            <q-item-section>
              <q-item-label align="center">סבון</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="talkShow" genretype="דיבורים" @click="byGenre('tvShows','talkShow')" >
            <q-item-section>
              <q-item-label align="center">דיבורים</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="warPolitics" genretype="מלחמה ופוליטיקה" @click="byGenre('tvShows','warPolitics')" >
            <q-item-section>
              <q-item-label align="center">מלחמה ופוליטיקה</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item clickable tag="a" genre="western" genretype="מערכון" @click="byGenre('tvShows','western')" >
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
export default {
  name: 'LayoutDefault',
  components: {Login},
  data() {
    return {
	    userN : 'DISCONNECTED',
	    loggedIn : false,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
		goHome(){
			this.$router.push(`/home`)
			location.reload()
		},
	  myPage(){
			this.$router.push('/userPage')
		  location.reload()
	  },
	  disconnect(){
		  this.$router.push('/')
			Logout.methods.logout();
		  this.userN = 'DISCONNECTED'
	  },

    myItems(type){
      this.$router.push(`/${type}/my`)
	    location.reload()
    },

    byGenre(type,genre){
      this.$router.push(`/${type}/${genre}`)
	    location.reload()
    }
  },

	created(){
			if (window.user){
				this.userN = window.user.displayName
			}
	},

}
</script>

<style>
</style>
