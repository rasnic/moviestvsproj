<template>
	<body>
	<div style="max-width: 500px; margin: 2em auto;">
		<div class="q-gutter-md text-center">
			<p style="color: white; font-size: 1.5em; font-weight: bold">הרשמה</p>
			<q-input  filled dark outlined v-model="userInput.email" label="אימייל"/>
			<q-input filled dark outlined v-model="userInput.name" label="שם משתמש"/>
			<q-input  filled dark outlined v-model="userInput.password" label="סיסמא"/>
		</div>
		<div class="q-ma-lg">
			<q-btn @click="create" unelevated color="primary">הירשם</q-btn>
		</div>
	</div>
	</body>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
import {addUser} from "@/middleware/firebase/database";

export default {
	name: "Registration",
	data() {
		return {
			userInput: {
				name: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		create() {
			if (this.userInput.password.length < 5) {
				alert('סיסמא חייבת להכיל לפחות 6 תווים');
			}
				firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.userInput.email, this.userInput.password)
						.then(async (res) => {
							debugger
							await addUser({uid:res.user.uid, name: this.userInput.name, email: res.user.email})
							await this.$router.push('/home')
							await location.reload()
						})

						.catch((error) => {
							var errorCode = error.code;
							var errorMessage = error.message;
						});
		},

	}
};
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