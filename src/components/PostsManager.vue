<template>
  <div class="container-fluid mt-4">
    <h1 class="h1" >Most Recent Posts</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 py-2" v-for="(post,index) in posts" v-if="posts[index].sold===false" :key="post.postID">
            <div class="card h-100">
              <img class="card-img-top" v-bind:title="posts[index].title" v-bind:src="posts[index].productImage!==undefined && posts[index].productImage!==null && posts[index].productImage!==''?posts[index].productImage:'https://i.imgur.com/Z9qC5ay.jpg'" alt="Image not available">
              <div class="card-body d-flex flex-column align-items-start">
                <p class="card-text">{{ posts[index].description }}</p>
                <small class="text-muted">Created by: {{ posts[index].email.substring(0, posts[index].email.indexOf('@')) }}</small>
                <small class="text-muted">Last updated at {{ posts[index].updatedAt }}</small>
                <br>
                <b-button variant="primary" @click.prevent="populatePostToBuy(post)" v-if="posts[index].email!=email">Buy</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/api'
import BuyPost from '../components/BuyPost'
export default {
  components: {
    BuyPost
  },
  data () {
    return {
      activeUser: null,
      loading: false,
      posts: [],
      email: ''
    }
  },
  async created () {
    this.activeUser = await this.$auth.getUser()
    this.email = this.activeUser.preferred_username
    this.refreshPosts()
  },
  methods: {
    async refreshPosts () {
      this.loading = true
      this.posts = await api.getPosts()
      this.loading = false
    },
    async populatePostToBuy (post) {
      this.$router.push({path: 'buy-post', query: {postID: `${post.postID}`}})
    }
  }
}
</script>

