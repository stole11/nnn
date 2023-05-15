<template>
  <nav class="custom">
    <div>
      <router-link v-if="!user" style="margin-right: 1rem" to="/">Login</router-link>
      <router-link v-if="user" style="margin-right: 1rem" to="/home">Home</router-link>   
    </div>
    <h2 class="logo-font" style="margin-left: 38rem">Hot drinks</h2>
    <div class="link_container">
      <button class="btn btn-success" v-if="user" @click.prevent="redirectCart" to="/"><i class="fa-solid fa-cart-shopping"></i> ({{cartSize}}) </button>
      <button class="btn btn-secondary" v-if="user" @click.prevent="logOut">Log out</button>
    </div>
  </nav>
  <router-view/>
</template>
<script>
import {onAuthStateChanged, auth, signOut} from '@/firebase'
import {mapMutations, mapGetters} from 'vuex'


export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    // mapGetters hvata korisnika iz store foldera
    ...mapGetters({user: 'getUser', cartSize: "getCartSize"})
  },
  methods: {
    // mapMutations hvata funkciju za promjenu korisnika iz store foldera
    ...mapMutations({updateUser: 'updateUser'}),
    redirectCart() {
    this.$router.push({name: "Kosarica"})
    },
    async logOut() {
      try {
        await signOut(auth)
        this.$router.push({name: 'Login'})
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log("Logged in")
          this.$router.replace({name: 'Home'})
          this.updateUser(user)
      } else {
          // User is signed out
          console.log("Logged out")
          this.updateUser(null)
      }
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 90vh;
  background-image: linear-gradient(#F09797, #FFFFFF);
}

.logo-font {
  font-family: 'Permanent Marker', cursive;
}
.custom {
  display: flex;
  justify-content: space-between;
}

.link_container {
  margin-left:auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
