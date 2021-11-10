<template>
<body>
	<div class="img-div">
			<q-img :src="getPics(index)"  v-for="(x,index) in this.GenresList" :key="index" class="images" @click="goGenre(index)" >
				<div class="absolute-top text-center text-weight-bolder text-h6">
					{{ getGenre(index) }}
				</div>
			</q-img>
	</div>
</body>
</template>

<script>
import ac from '@/assets/tvGenre/ac.png'
import an from '@/assets/tvGenre/an.png'
import co from '@/assets/tvGenre/co.png'
import cr from '@/assets/tvGenre/cr.png'
import doc from '@/assets/tvGenre/do.png'
import dr from '@/assets/tvGenre/dr.png'
import fa from '@/assets/tvGenre/fa.png'
import ki from '@/assets/tvGenre/ki.png'
import my from '@/assets/tvGenre/my.png'
import ne from '@/assets/tvGenre/ne.png'
import re from '@/assets/tvGenre/re.png'
import fs from '@/assets/tvGenre/fs.png'
import so from '@/assets/tvGenre/so.png'
import ta from '@/assets/tvGenre/ta.png'
import pw from '@/assets/tvGenre/pw.png'
import we from '@/assets/tvGenre/we.png'
import act from '@/assets/moviesGenre/act.png'
import adv from '@/assets/moviesGenre/adv.png'
import ani from '@/assets/moviesGenre/ani.png'
import com from '@/assets/moviesGenre/com.png'
import cri from '@/assets/moviesGenre/cri.png'
import docu from '@/assets/moviesGenre/docu.png'
import dra from '@/assets/moviesGenre/dra.png'
import fam from '@/assets/moviesGenre/fam.png'
import fan from '@/assets/moviesGenre/fan.png'
import his from '@/assets/moviesGenre/his.png'
import hor from '@/assets/moviesGenre/hor.png'
import mus from '@/assets/moviesGenre/mus.png'
import mys from '@/assets/moviesGenre/mys.png'
import rom from '@/assets/moviesGenre/rom.png'
import sci from '@/assets/moviesGenre/sci.png'
import thr from '@/assets/moviesGenre/thr.png'
import tvm from '@/assets/moviesGenre/tvm.png'
import war from '@/assets/moviesGenre/war.png'
import wes from '@/assets/moviesGenre/wes.png'

export default {
	name: "GenreView",
	GenresList: '',
	pics: '',
	data(){
		return{
			background:{
				backgroundColor: "#1e1e1e"
			}
		}
	},
	methods: {
		getPics(index){
			return this.pics[index]
		},
		getGenre(index){
			return this.GenresList[index]
		},
		goGenre(index){
			if (window.location.pathname === '/tvGenres') {
				this.$router.push(`/tvShows/${this.GenresList[index]}`)
			}
			else {
				this.$router.push(`/movies/${this.GenresList[index]}`)
			}
		}
	},
	created() {
		if (window.location.pathname === '/tvGenres') {
			this.GenresList = ["אקשן והרפתקאות", "אנימציה", "קומדיה", "פשע", "דוקומנטרי", "דרמה", "משפחה", "ילדים", "מסתורין"
				, "חדשות", "ריאליטי", "מדע בדיוני ופנטזיה", "סבון", "דיבורים", "מלחמה ופוליטיקה", "מערכון"]
			this.pics = [ac, an, co, cr, doc, dr, fa, ki, my, ne, re, fs, so, ta, pw, we]
		}
		else {
			this.GenresList = ["קומדיה", "אקשן", "הרפתקאות", "אנימציה", "פשע", "דוקומנטרי", "דרמה", "משפחה", "פנטזיה"
				, "הסטוריה", "אימה", "מוסיקה", "מסתורין", "רומנטי", "מדע בדיוני", "סרט טלויזיה", "מותחן", "מלחמה", "מערכון"]
			this.pics = [com, act, adv, ani, cri, docu, dra, fam, fan, his, hor, mus, mys, rom, sci, tvm, thr, war, wes]
		}
	}
}
</script>

<style scoped>


.img-div{
	height: 100vh;
	display:flex;
	gap: 1.5em;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	margin-top: 1em;

}

.images {
	display: flex;
	height: 400px;
	width: 22%;
	cursor: pointer;
}
.container{
	background-size: 100%;
}
html, body{
	min-height:100%;
	overflow:auto;
}
body {
	background-color: #1e1e1e;
}
</style>