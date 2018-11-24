import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getPosts () {
    return this.execute('get', '/posts')
  },
  getMyPosts (email) {
    return this.execute('get', `/posts?email=${email}`)
  },
  getMyOrderDetails (email) {
    return this.execute('get', `/orderDetails?customerEmail=${email}`)
  },
  getPost (postID) {
    return this.execute('get', `/posts/${postID}`)
  },
  getAccount (email) {
    return this.execute('get', `/account/${email}`)
  },
  getProductPost (productID) {
    return this.execute('get', `/posts?productID=${productID}`)
  },
  getP (productID) {
    return this.execute('get', `/orderDetails?sellerEmail=sanjys344@mail.fresnostate.edu`)
  },
  getProductEntry (productID) {
    return this.execute('get', `/productDetails/${productID}`)
  },
  getDesktop (productID) {
    return this.execute('get', `/desktop/${productID}`)
  },
  getLaptop (productID) {
    return this.execute('get', `/laptop/${productID}`)
  },
  getPhone (productID) {
    return this.execute('get', `/phone/${productID}`)
  },
  getTablet (productID) {
    return this.execute('get', `/tablet/${productID}`)
  },
  createPost (data) {
    return this.execute('post', '/posts', data)
  },
  createAccount (data) {
    return this.execute('post', '/account', data)
  },
  createOrder (data) {
    return this.execute('post', '/orders', data)
  },
  createOrderDetailsEntry (data) {
    return this.execute('post', '/orderDetails', data)
  },
  createTransaction (data) {
    return this.execute('post', '/transactionDetails', data)
  },
  createProductEntry (data) {
    return this.execute('post', '/productDetails', data)
  },
  createShipment (data) {
    return this.execute('post', '/shippingDetails', data)
  },
  createDesktopPost (data) {
    return this.execute('post', '/desktop', data)
  },
  createLaptopPost (data) {
    return this.execute('post', '/laptop', data)
  },
  createPhonePost (data) {
    return this.execute('post', '/phone', data)
  },
  createTabletPost (data) {
    return this.execute('post', '/tablet', data)
  },
  updatePost (postID, data) {
    return this.execute('put', `/posts/${postID}`, data)
  },
  deletePost (postID) {
    return this.execute('delete', `/posts/${postID}`)
  }
}
