<template>
	<body>
  <div style="max-width: 500px; margin: 2em auto;">
	  <div class="q-gutter-md text-center">
		  <p style="color: white; font-size: 1.5em; font-weight: bold">התחברות</p>
	    <q-input  filled dark outlined v-model="userInput.email" label="אימייל"/>
	    <q-input  filled dark outlined v-model="userInput.password" label="סיסמא"/>
	  </div>
	  <div class="q-ma-lg">
		  <q-btn class="q-mr-md" @click="signIn()" unelevated color="primary">התחבר</q-btn>
		  <q-btn @click="register()" unelevated color="primary">הירשם</q-btn>
	  </div>
  </div>
	</body>
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
				    var user = userCredential.user;
				    this.$router.push('/')
				    location.reload()
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
html, body{
	min-height:100%;
	overflow:auto;
}
body {
	background-color: #1e1e1e;
}
</style>