<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Peddle</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <!--<b-nav-item to="/">Home</b-nav-item> -->
          <b-nav-item to="/posts-manager">View Posts</b-nav-item>
          <b-nav-item to="/new-post">Make New Post</b-nav-item>
          <b-nav-item to="/posts-manager">Statistics</b-nav-item>
        </b-navbar-nav>
         <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input class="mr-sm-2" type="text" placeholder="Search"></b-form-input>
            <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-nav-item to="/my-profile">My Profile</b-nav-item>
          <b-nav-item right href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
          <b-nav-item right href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />
  </div>
</template>

<script>
import api from '@/api'
import MyProfile from './components/MyProfile'
import moment from 'moment'
export default {
  name: 'app',
  components: {
    MyProfile
  },
  data () {
    return {
      activeUser: null,
      email: null
    }
  },
  async created () {
    await this.refreshActiveUser()
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    '$route': 'refreshActiveUser'
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
    },
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
      this.email = this.activeUser.preferred_username
      let accountObject = {}
      try {
        accountObject = await api.getAccount(this.email)
      } catch (error) {
        console.log(error)
        accountObject.email = this.email
        accountObject.creationDate = moment(moment(), 'YYYY-MM-DD hh:mm:ss a')
        accountObject.averageRating = 0.0
        await api.createAccount(accountObject)
      }
      // alert(Object.getOwnPropertyNames(this.activeUser))
    },
    async logout () {
      await this.$auth.logout()
      await this.refreshActiveUser()
      this.$router.push('/')
    }
  }
}
</script>