<template>
	<div class="q-pa-md row items-start q-gutter-lg">

		<q-card
				align="center"
				class="login card"
				style="background:  #014a88 100% "
				square
				bordered
				dark
		>
			<q-card-section>
				<div class="text-h5">התחברות</div>
				<q-btn @click="googleLogin()">login with google account</q-btn>
				<q-btn @click="emailLogin()">login with email</q-btn>
			</q-card-section>
		</q-card>

		<q-card
				align="center"
				class="login card"
				style="background:  #014a88 100%"
				bordered
				dark
		>
			<br><br>
			<q-card-section>
				<div class="text-h5">הרשמה</div>
				<q-btn @click="emailRegistration()">register with email</q-btn>
			</q-card-section>
		</q-card>
	</div>

</template>

<script>
import firebaseInstance from '../middleware/firebase'
import {addUser} from "@/middleware/firebase/database";

export default {
	name: "Login",
	data() {
		return {
			connected: false,
		}
	},
	methods: {
		googleLogin() {
			const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
			firebaseInstance.firebase.auth()
					.signInWithPopup(provider)
					.then((result) => {
						/** @type {firebase.auth.OAuthCredential} */
						var credential = result.credential;
						// This gives you a Google Access Token. You can use it to access the Google API.
						var token = credential.accessToken;
						// The signed-in users info.
						window.user = result.user;

						if (window.user.uid === "dsm7CKcNRxQ7MZZOjCfEmSORt653") {
							this.loggedin();
							this.$router.push('/admin')
							location.reload()

						} else {
							this.loggedin();
							this.$router.push(`/home`);
							location.reload()
						}
					})
					.catch((error) => {
						// Handle Errors here.
						var errorCode = error.code;
						var errorMessage = error.message;
						// The email of the user's account used.
						var email = error.email;
						// The firebase.auth.AuthCredential type that was used.
						var credential = error.credential;
						// ...
					});
		},
		emailLogin() {
			this.$router.push('/EmailLogin')
		},
		emailRegistration() {
			this.$router.push('/Registration')
		},
		async loggedin() {
			this.connected = !this.connected
			await addUser({uid:window.user.uid, name:window.user.displayName, email: window.user.email})
		}
	},
	created() {
		if (window.user && window.user.uid !== "55mBkKiLa8VT06VsM2XgXzlmdei2") {
			this.$router.push('/home')
			location.reload()
		}
	},
}

</script>

<style scoped>

</style>