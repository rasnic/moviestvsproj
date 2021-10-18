<template>
  <div>
  <div>
    <q-input  outlined v-model="userInput.email" label="אימייל"/>
    <q-input  outlined v-model="userInput.password" label="סיסמא"/>
  </div>
    <q-btn @click="signIn()">sign in</q-btn>
    <q-btn @click="register()">register</q-btn>
  </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
export default {
  name: "EmailLogin",
  data() {
    return {
      userInput: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    signIn() {
			const email = this.userInput.email;
			const password = this.userInput.password;
	    firebaseInstance.firebase.auth().signInWithEmailAndPassword(email, password)
			    .then((userCredential) => {
				    // Signed in
				    var user = userCredential.user;
				    // ...
			    })
			    .catch((error) => {
				    var errorCode = error.code;
				    var errorMessage = error.message;
			    });
    },
    register(){
      this.$router.push('/Registration')
    }
  }
};
</script>

<style scoped>

</style>