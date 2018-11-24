<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">My Profile</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <section v-if="!loading">
      <template>
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion1 variant="info">Account Details</b-btn>
            </b-card-header>
            <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col>Account Email Address: {{myAccount.email}} </b-col>
                    <b-col>Created On: {{myAccount.creationDate}} </b-col>
                    <b-col>Rating: {{myAccount.averageRating}} / 5.0 </b-col>
                  </b-row>
                </b-container>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion2 variant="info">My Posts</b-btn>
            </b-card-header>
            <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <section>
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-4 py-2" v-for="(post,index) in myPosts" :key="post.postID">
                        <div class="card h-100">
                          <img class="card-img-top" v-bind:title="myPosts[index].title" v-bind:src="myPosts[index].productImage!==undefined && myPosts[index].productImage!==null && myPosts[index].productImage!==''?myPosts[index].productImage:'https://i.imgur.com/Z9qC5ay.jpg'" alt="Image not available">
                          <div class="card-body d-flex flex-column align-items-start">
                            <p class="card-text">{{ myPosts[index].description }}</p>
                            <small class="text-muted">Created by: {{ myPosts[index].email.substring(0, myPosts[index].email.indexOf('@')) }}</small>
                            <small class="text-muted">Last updated at {{ myPosts[index].updatedAt }}</small>
                            <br>
                            <b-button variant="primary" @click.prevent="populatePostToEdit(post)" v-if="myPosts[index].sold===false">Edit</b-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion3 variant="info">My Purchases</b-btn>
            </b-card-header>
            <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <section>
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-4 py-2" v-for="(post,index) in myPurchases" :key="myPurchases[index].postID">
                        <div class="card h-100">
                          <img class="card-img-top" v-bind:title="myPurchases[index].title" v-bind:src="myPurchases[index].productImage!==undefined && myPurchases[index].productImage!==null && myPurchases[index].productImage!==''?myPurchases[index].productImage:'https://i.imgur.com/Z9qC5ay.jpg'" alt="Image not available">
                          <div class="card-body d-flex flex-column align-items-start">
                            <p class="card-text">{{ myPurchases[index].description }}</p>
                            <small class="text-muted">Created by: {{ myPurchases[index].email.substring(0, myPurchases[index].email.indexOf('@')) }}</small>
                            <small class="text-muted">Last updated at {{ myPurchases[index].updatedAt }}</small>
                            <br>
                            <b-button variant="primary" v-b-modal.modal-center @click.prevent="populatePostToReturn(post)">Return</b-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <!-- Modal Component -->
        <b-modal id="modal-center" centered size="lg" 
                ref="modal"
                title="Confirm your return request"
                @ok="handleOk"
                @shown="clearFields">
          <form @submit.stop.prevent="handleSubmit">
            <b-form-input type="text"
                          placeholder="Return ID: " readonly
                          v-model="returnObject.returnID">
            </b-form-input>
            <b-form-input type="text"
                          placeholder="Order ID: " readonly
                          v-model="returnObject.orderID">
            </b-form-input>
            <b-form-select v-model="returnDetailsObject.returnCode" :options="options" class="mb-3" />
            <b-form-select id="returnCode"
                        required
                        v-model="returnDetailsObject.returnCode">
                        <option value = "" selected disabled>Select . . .</option>
                        <option value = "Desktop" >Desktop</option>
                        <option value = "Laptop" >Laptop</option>
                        <option value = "Phone" >Phone</option>
                        <option value = "Tablet" >Tablet</option>
            </b-form-select>
          </form>
        </b-modal>
      </template>
    </section>
    <b-row>
      <b-col lg="3" v-if="isHidden">
        <b-card :title="(model.id ? 'Edit Post ID: ' + model.postID : 'New Post')">
          <form @submit.prevent="savePost">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-textarea rows="4" v-model="model.description"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Post</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  props: {
    // email: String
  },
  data () {
    return {
      loading: false,
      activeUser: null,
      posts: [],
      myPosts: [],
      myAccount: {},
      tempMyPurchases: [],
      myPurchases: [],
      model: {},
      email: null,
      tempPosts: [],
      isHidden: true,
      returnObject: {
        returnID: '',
        orderID: '',
        productID: ''
      },
      returnDetailsObject: {
        returnID: '',
        returnCode: null,
        returnDate: ''
      },
      options: [
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Default Selected Option' },
        { value: 'c', text: 'This is another option' },
        { value: null, text: 'This one is disabled', disabled: true },
        { value: 'e', text: 'This is option e' },
        { value: 'f', text: 'This is option f' },
        { value: 'g', text: 'This is option g' }
      ]
    }
  },
  async created () {
    this.activeUser = await this.$auth.getUser()
    this.email = this.activeUser.preferred_username
    this.refreshPosts()
  },
  methods: {
    clearFields () {
      this.name = ''
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.name) {
        alert('Please enter your name')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.names.push(this.name)
      this.clearName()
      this.$refs.modal.hide()
    },
    async refreshPosts () {
      this.loading = true
      this.myAccount = await api.getAccount(this.email)
      this.myPosts = await api.getMyPosts(this.email)
      let myOrders = await api.getMyOrderDetails(this.email)
      for (let order in myOrders) {
        let tempObject = await api.getProductPost(myOrders[order].productID)
        this.tempMyPurchases.push(tempObject[0])
      }
      this.myPurchases = this.tempMyPurchases
      this.loading = false
    },
    async populatePostToEdit (post) {
      this.model = Object.assign({}, post)
    },
    async populatePostToReturn (post) {
      this.model = Object.assign({}, post)
    },
    async savePost () {
      if (this.model.postID) {
        await api.updatePost(this.model.postID, this.model)
      } else {
        // await api.createPost(this.model)
      }
      this.model = {} // reset form
      this.isHidden = true
      await this.refreshPosts()
    },
    async deletePost (postID) {
      if (confirm('Are you sure you want to delete this post?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.postID === postID) {
          this.model = {}
        }
        await api.deletePost(postID)
        await this.refreshPosts()
      }
    }
  }
}
</script>