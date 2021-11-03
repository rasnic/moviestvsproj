<template>
  <div>
    <q-btn @click="logout()">התנתק</q-btn>
  </div>
</template>

<script>
import firebaseInstance from "@/middleware/firebase";

export default {
  name: "Logout",
  methods:{
    logout(){
      firebaseInstance.firebase.auth().signOut().then(() => {
	      window.user = undefined
	      location.reload();
	      this.$router.push(`/`);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }
  }
};
</script>

<style scoped>

</style>