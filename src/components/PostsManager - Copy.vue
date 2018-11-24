<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Most Recent Posts</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Product ID</th>
              <th>Created by</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.postID">
              <td>{{ post.postID }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.description }}</td>
              <td>{{ post.productID }}</td>
              <td>{{ post.email.substring(0, post.email.indexOf('@')) }}</td>
              <td>{{ post.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populatePostToBuy(post)" v-if="post.email!=email">Buy</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
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