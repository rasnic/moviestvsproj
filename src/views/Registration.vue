<template>
	<body>
	<div>
		<q-input outlined v-model="userInput.email" type="url" label="אימייל"/>
		<q-input outlined v-model="userInput.name" label="שם משתמש"/>
		<q-input outlined v-model="userInput.password" label="סיסמא"/>
		<q-btn @click="create">register</q-btn>
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
						.then((res) => {
							console.log(res)
							this.$router.push('/')
							const name = this.userInput.name
							addUser({uid:res.user.uid, name, email: res.user.email})
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