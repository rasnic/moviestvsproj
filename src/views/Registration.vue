<template>
	<div>
		<q-input outlined v-model="userInput.email" type="url" label="אימייל"/>
		<q-input outlined v-model="userInput.name" label="שם משתמש"/>
		<q-input outlined v-model="userInput.password" label="סיסמא"/>
		<q-btn @click="create">register</q-btn>
	</div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
	name: "Registration",
	data() {
		return {
			userInput: {
				name: '',
				email: '',
				password: '',
				uid: ''
			}
		}
	},
	computed: {
		...mapState('users', ['editedUser', "users", 'editedUserName'])
	},
	methods: {
		...mapActions('users', ['insertUser']),
		...mapMutations('users', ['setEditedUser', 'setEditedUserName', 'checkUser', 'resetEditedUserName']),
		create() {
			if (this.userInput.password.length < 5) {
				alert('סיסמא חייבת להכיל לפחות 6 תווים');
			} if (this.checkUser(this.userInput.name) === -1) {
				this.setEditedUserName = this.userInput.name
				alert('שם משתמש בשימוש')
				this.resetEditedUserName()
				}
			else
				{
					firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.userInput.email, this.userInput.password)
							.then(() => {
								this.userInput.uid = window.user.uid
								this.setEditedUser(this.userInput)
								this.insertUser()
								this.$router.push('/')
							})
							.catch((error) => {
								var errorCode = error.code;
								var errorMessage = error.message;
							});
				}

		}
	},

};
</script>

<style scoped>

</style>