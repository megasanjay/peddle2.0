<template>
  <div class="container-fluid mt-4">
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <div v-if="!loading">
        <b-jumbotron>
            <template slot="header"> {{title}} </template>
            <template slot="lead">
                {{description}}
                <div style="width:100%" >
                    <b-img class="mx-auto" v-bind:src="productImage!==undefined && productImage!==null && productImage!==''?productImage:'https://i.imgur.com/Z9qC5ay.jpg'" fluid alt="Image not available"/>
                </div>
            </template>
            <hr class="my-4">
            <div>
                <!-- Single button triggers two b-collapse components -->
                <b-btn variant="primary" size="lg" v-b-toggle.collapseA.collapseB>More Details...</b-btn> <br>
                <!-- elements to collapse -->
                <b-collapse id="collapseA" class="mt-2">
                    <b-list-group>
                        <b-list-group-item>Post ID: {{postID}}</b-list-group-item>
                        <b-list-group-item>Product ID: {{productID}}</b-list-group-item>
                        <b-list-group-item>Product Name: {{name}}</b-list-group-item>
                        <b-list-group-item>Price: {{price}}</b-list-group-item>
                        <b-list-group-item>Condition: {{condition}}</b-list-group-item>
                        <b-list-group-item>Brand: {{brand}}</b-list-group-item>
                        <b-list-group-item>Color: {{color}}</b-list-group-item>
                    </b-list-group>
                </b-collapse>
                <b-collapse id="collapseB" class="mt-2">
                     <b-list-group v-if="productType===1">
                        <b-list-group-item>Processor: {{processor}}</b-list-group-item>
                        <b-list-group-item>Memory: {{memory}}</b-list-group-item>
                        <b-list-group-item>Storage: {{storage}}</b-list-group-item>
                        <b-list-group-item>Graphics Card: {{graphicsCard}}</b-list-group-item>
                        <b-list-group-item>Operating System: {{operatingSystem}}</b-list-group-item>
                    </b-list-group>
                     <b-list-group v-if="productType===2">
                        <b-list-group-item>Processor: {{processor}}</b-list-group-item>
                        <b-list-group-item>Memory: {{memory}}</b-list-group-item>
                        <b-list-group-item>Storage: {{storage}}</b-list-group-item>
                        <b-list-group-item>Screen Size: {{screenSize}} inches</b-list-group-item>
                        <b-list-group-item>Operating System: {{operatingSystem}}</b-list-group-item>
                    </b-list-group>
                     <b-list-group v-if="productType===3">
                        <b-list-group-item>Operating System: {{operatingSystem}}</b-list-group-item>
                        <b-list-group-item>Carrier: {{carrier}}</b-list-group-item>
                        <b-list-group-item>Storage: {{storage}}</b-list-group-item>
                        <b-list-group-item>Screen Size: {{screenSize}} inches</b-list-group-item>
                        <b-list-group-item>Camera Resolution: {{cameraResolution}}</b-list-group-item>
                        <b-list-group-item>Release Year: {{releaseYear}}</b-list-group-item>
                    </b-list-group>
                     <b-list-group v-if="productType===4">
                        <b-list-group-item>Operating System: {{operatingSystem}}</b-list-group-item>
                        <b-list-group-item>Storage: {{storage}}</b-list-group-item>
                        <b-list-group-item>Screen Size: {{screenSize}} inches</b-list-group-item>
                        <b-list-group-item>Camera Resolution: {{cameraResolution}}</b-list-group-item>
                        <b-list-group-item>Release Year: {{releaseYear}}</b-list-group-item>
                    </b-list-group>
                </b-collapse>
            </div>
        </b-jumbotron>
        <b-container fluid class="greyBox">
          <b-container>
            <b-card bg-variant="light">
              <b-form-group horizontal
                            breakpoint="lg"
                            label="Shipping Address"
                            label-size="lg"
                            label-class="font-weight-bold pt-0"
                            class="mb-0">
                <b-form-group horizontal
                              label="Street:"
                              label-class="text-sm-right"
                              label-for="nestedStreet">
                  <b-form-input id="nestedStreet"
                                v-model="shipping.street"
                                required></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="City:"
                              label-class="text-sm-right"
                              label-for="nestedCity">
                  <b-form-input id="nestedCity"
                                v-model="shipping.city"
                                required></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="State:"
                              label-class="text-sm-right"
                              label-for="nestedState">
                  <b-form-input id="nestedState"
                                v-model="shipping.state"
                                required></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Zip Code:"
                              label-class="text-sm-right"
                              label-for="nestedZipCode">
                  <b-form-input id="nestedZipCode"
                                v-model="shipping.zipCode"
                                required></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Country:"
                              label-class="text-sm-right"
                              label-for="nestedCountry">
                  <b-form-input id="nestedCountry"
                                v-model="shipping.country"
                                required></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Ship via:"
                              label-class="text-sm-right"
                              class="mb-0">
                  <b-form-radio-group class="pt-2" :options="['UPS', 'FedEx', 'USPS']" />
                </b-form-group>
              </b-form-group>
            </b-card>
          </b-container>
        </b-container>
        <b-container class="greyBox" fluid>
          <div id="applet">
            <form ref="form" class="card-form" @submit.prevent="savePost">
              <header>
                <h1 class="card-form__title">Your card data</h1>
              </header>
              <div class="card-form-field">
                <label for="cardNumberInput" class="card-form-field__label">Number</label>
                <input  type="text"
                        name="card[number]"
                        v-model="card.cardNumber"
                        maxlength="16"
                        class="card-form-field__input"
                        ref="card.number"
                        required
                        id="cardNumberInput" />
              </div>
              <div class="card-form-field">
                <label for="cardOwnerInput" class="card-form-field__label">Owner name</label>
                <input  type="text"
                        required
                        name="card[owner]"
                        v-model="card.cardName"
                        class="card-form-field__input"
                        maxlength="24"
                        ref="card.owner"
                        id="cardOwnerInput" />
              </div>
              <div class="card-form-field">
                <label for="" class="card-form-field__label card-form-field__label_inline">Expiration</label>
                <select v-model="card.cardMonth"
                        name="card[expiration][month]"
                        class="card-form-field__select"
                        required
                        ref="card.expiration.month">
                  <option v-for="month in months" :key="month">{{month}}</option>
                </select>
                /
                <select v-model="card.cardYear"
                        name="card[expiration][year]"
                        class="card-form-field__select"
                        required
                        ref="card.expiration.year">
                  <option v-for="year in years" :key="year">{{year}}</option>
                </select>
              </div>
              <div class="card-form-field">
                <label for="cardCvcInput" class="card-form-field__label card-form-field__label_inline">CVC</label>
                <input  type="text"
                        name="card[cvc]"
                        v-model="card.securityCode"
                        maxlength="3"
                        required
                        class="card-form-field__input card-form-field__input_cvc"
                        id="cardCvcInput"
                        ref="card.cvc" />
              </div>
              <b-button variant="primary" size="lg" type="submit">Checkout for ${{this.price}}</b-button>
            </form>

            <div class="card-preview">
              <div class="card-preview__side card-preview__side_front">
                <div class="card-preview__number">
                  <div class="card-preview__label card-preview__label_white">Number</div>
                  <div class="card-preview__etched-text">{{cardNumberFormatted}}</div>
                </div>

                <div class="card-preview__owner">
                  <span class="card-preview__label card-preview__label_white">Owner</span>
                  <span class="card-preview__etched-text">{{card.owner}}</span>
                </div>

                <div class="card-preview__expiration">
                  <span class="card-preview__label card-preview__label_white">Valid thru</span>
                  <span class="card-preview__etched-text">{{cardExpiration}}</span>
                </div>
              </div>
              <div class="card-preview__side card-preview__side_back">
                <div class="card-preview__cvc">
                  <span class="card-preview__label">CVC</span>
                  {{card.cvc}}
                </div>
              </div>
            </div>
          </div>
        </b-container>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import moment from 'moment'
const uuidv4 = require('uuid/v4')
export default {
  data () {
    return {
      activeUser: null,
      loading: false,
      posts: [],
      postObject: {},
      email: '',
      postEmail: '',
      postID: '',
      postDetails: {},
      title: '',
      productImage: '',
      description: '',
      productID: '',
      productDetails: {},
      name: '',
      condition: '',
      price: '',
      brand: '',
      color: '',
      productType: 0,
      tempData: {},
      processor: '',
      memory: '',
      storage: '',
      graphicsCard: '',
      operatingSystem: '',
      screenSize: '',
      releaseYear: '',
      cameraResolution: '',
      carrier: '',
      card: {
        transactionID: '',
        cardNumber: '',
        cardName: '',
        cardMonth: '',
        cardYear: '',
        securityCode: '',
        transactionDateTime: '',
        billedAmount: ''
      },
      shipping: {
        shippingID: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    }
  },
  async created () {
    this.loading = true
    this.activeUser = await this.$auth.getUser()
    this.email = this.activeUser.preferred_username
    this.postID = this.$route.query.postID
    if (this.postID === undefined) {
      this.$router.push('/posts-manager')
      return
    }
    try {
      this.getPost(await api.getPost(this.postID))
    } catch (e) {
      alert('This listing was not found. It might have been taken down or not available at this time')
      this.$router.push('/posts-manager')
    }
  },
  methods: {
    async getPost (postDetails) {
      this.loading = false
      this.productImage = postDetails.productImage
      this.title = postDetails.title
      this.description = postDetails.description
      this.productID = postDetails.productID
      this.postEmail = postDetails.email
      this.productDetails = await api.getProductEntry(postDetails.productID)
      this.name = this.productDetails.name
      this.condition = this.productDetails.condition
      this.price = this.productDetails.price
      this.brand = this.productDetails.brand
      this.color = this.productDetails.color
      this.productType = await this.getProductType(this.productID)
      if (this.productType === 1) {
        this.tempData = await api.getDesktop(this.productID)
        this.processor = this.tempData.processor
        this.memory = this.tempData.memory
        this.storage = this.tempData.storage
        this.graphicsCard = this.tempData.graphicsCard
        this.operatingSystem = this.tempData.operatingSystem
      }
      if (this.productType === 2) {
        this.tempData = await api.getLaptop(this.productID)
        this.processor = this.tempData.processor
        this.memory = this.tempData.memory
        this.storage = this.tempData.storage
        this.screenSize = this.tempData.screenSize
        this.operatingSystem = this.tempData.operatingSystem
      }
      if (this.productType === 3) {
        this.tempData = await api.getPhone(this.productID)
        this.releaseYear = this.tempData.releaseYear
        this.operatingSystem = this.tempData.operatingSystem
        this.storage = this.tempData.storage
        this.screenSize = this.tempData.screenSize
        this.cameraResolution = this.tempData.cameraResolution
        this.carrier = this.tempData.carrier
      }
      if (this.productType === 4) {
        this.tempData = await api.getPhone(this.productID)
        this.releaseYear = this.tempData.releaseYear
        this.operatingSystem = this.tempData.operatingSystem
        this.storage = this.tempData.storage
        this.screenSize = this.tempData.screenSize
        this.cameraResolution = this.tempData.cameraResolution
      }
    },
    async populatePostToBuy (post) {
      this.buyObject = Object.assign({}, post)
      this.$router.push('/buy-post')
    },
    async getProductType (productID) {
      try {
        this.tempData = await api.getDesktop(productID)
        return 1
      } catch (e) {}
      try {
        this.tempData = await api.getLaptop(productID)
        return 2
      } catch (e) {}
      try {
        this.tempData = await api.getPhone(productID)
        return 3
      } catch (e) {}
      try {
        this.tempData = await api.getTablet(productID)
        return 4
      } catch (e) {}
    },
    async savePost () {
      let orderObject = {}
      orderObject.orderID = uuidv4()
      orderObject.transactionID = uuidv4()
      let orderDetailsObject = {}
      orderDetailsObject.orderID = orderObject.orderID
      orderDetailsObject.productID = this.productID
      orderDetailsObject.shippingID = uuidv4()
      orderDetailsObject.sellerEmail = this.postEmail
      orderDetailsObject.customerEmail = this.email
      this.card.transactionID = orderObject.transactionID
      this.card.billedAmount = (this.price * 1.12)
      this.card.transactionDateTime = moment(moment(), 'YYYY-MM-DD hh:mm:ss a')
      this.shipping.shippingID = orderDetailsObject.shippingID
      await api.createOrder(orderObject)
      await api.createOrderDetailsEntry(orderDetailsObject)
      await api.createTransaction(this.card)
      await api.createShipment(this.shipping)
      let postObject = await api.getPost(this.postID)
      postObject.sold = true
      await api.updatePost(this.postID, postObject)
      alert('Congratulations. Your purchase has completed!')
      this.$router.push('/posts-manager')
    }
  },
  computed: {
    cardNumberFormatted: function () {
      var numberChunks = this.card.cardNumber.match(/.{1,4}/g)
      if (numberChunks) {
        return numberChunks.join(' ')
      } else {
        return ''
      }
    },
    cardExpiration: function () {
      if (!this.card.cardMonth || !this.card.cardYear) {
        return ''
      }
      return this.card.cardMonth + '/' + this.card.cardYear
    },
    months: function () {
      return [
        '01', '02', '03', '04',
        '05', '06', '07', '08',
        '09', '10', '11', '12'
      ]
    },
    years: function () {
      var years = []
      var currentYear = (new Date()).getFullYear() % 2000

      for (var i = 0; i < 18; i++) {
        years.push(currentYear + i)
      }
      return years
    }
  },
  watch: {
    'card.cardNumber': function (newNumber) {
      this.card.cardNumber = newNumber.replace(/[^0-9]/gim, '')
    },
    'card.cardName': function (newOwner) {
      this.card.cardName = newOwner.toUpperCase().replace(/[^A-Z\s]/gim, '')
    },
    'card.securityCode': function (newCvc) {
      this.card.securityCode = newCvc.replace(/[^0-9]/gim, '')
    }
  }
}
</script>

<style>
  .img-fluid {
    max-width: 40%;
    height:auto;
    width:auto;
    margin: 1em;
  }
  .greyBox{
    background-color: #e9ecef;
    border-radius: 5px;
    margin-bottom: 1em;
    padding-bottom: 3em;
  }
</style>

<style lang="scss">
  @import '../assets/card.scss';
</style>