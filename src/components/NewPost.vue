<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Create Your Post</h1>
    <div>
        <b-form @submit.prevent="savePost" @reset="onReset" v-if="show">
        <b-form-group id="emailInputGroup" 
                        label="Email Address:"
                        label-for="emailAddress"
                        description="We'll never share your email with anyone else.">
            <b-form-input id="emailAddress"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
            </b-form-input>
        </b-form-group>
        <b-form-group id="titleGroup"
                        label="Post Title:"
                        label-for="title">
            <b-form-input id="title"
                        type="text"
                        v-model="form.title"
                        required
                        placeholder="Enter Title">
            </b-form-input>
        </b-form-group>
        <b-form-group id="descriptionGroup"
                        label="Post Description:"
                        label-for="description">
            <b-form-textarea id="description"
                        v-model="form.description"
                        placeholder="Enter Post Description . . ."
                        :rows="3"
                        :max-rows="6">
            </b-form-textarea>
        </b-form-group>
         <b-form-group id="productImageGroup"
                        label="Product Image:"
                        label-for="productImage">
            <b-form-input id="productImage"
                        type="url"
                        v-model="form.productImage"
                        required
                        placeholder="Enter Image URL . . .">
            </b-form-input>
        </b-form-group>
        <b-form-group id="productTypeGroup"
                        label="Product Type:"
                        label-for="productType">
            <b-form-select id="productType"
                        required
                        v-model="form.productType">
                        <option value = "" selected>Select . . .</option>
                        <option value = "Desktop" selected>Desktop</option>
                        <option value = "Laptop" selected>Laptop</option>
                        <option value = "Phone" selected>Phone</option>
                        <option value = "Tablet" selected>Tablet</option>
            </b-form-select>
        </b-form-group>
        <b-form-group id="productNameGroup"
                        label="Product Name:"
                        label-for="productName">
            <b-form-input id="productName"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Enter Product Name">
            </b-form-input>
        </b-form-group>
        <div v-if="form.productType === 'Desktop'">
            <b-container fluid>
                <b-form-group id="desktopProcessorGroup"
                                label="Processor:"
                                label-for="processor">
                    <b-form-input id="processor"
                                type="text"
                                v-model="desktop.processor"
                                required
                                placeholder="Enter Processor Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="desktopMemoryGroup"
                                label="Memory:"
                                label-for="memory">
                    <b-form-input id="memory"
                                type="text"
                                v-model="desktop.memory"
                                required
                                placeholder="Enter Memory Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="desktopStorageGroup"
                                label="Storage:"
                                label-for="storage">
                    <b-form-input id="storage"
                                type="text"
                                v-model="desktop.storage"
                                required
                                placeholder="Enter Storage Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="desktopGraphicsCardGroup"
                                label="Graphics Card:"
                                label-for="graphicsCard">
                    <b-form-input id="graphicsCard"
                                type="text"
                                v-model="desktop.graphicsCard"
                                placeholder="Enter Graphics Card Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="desktopOperatingSystemGroup"
                                label="Operating System:"
                                label-for="operatingSystem">
                    <b-form-input id="operatingSystem"
                                type="text"
                                v-model="desktop.operatingSystem"
                                placeholder="Enter Operating System Details">
                    </b-form-input>
                </b-form-group>
            </b-container>
        </div>
        <div v-if="form.productType === 'Laptop'">
            <b-container fluid>
                <b-form-group id="laptopProcessorGroup"
                                label="Processor:"
                                label-for="processor">
                    <b-form-input id="processor"
                                type="text"
                                v-model="laptop.processor"
                                required
                                placeholder="Enter Processor Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="laptopMemoryGroup"
                                label="Memory:"
                                label-for="memory">
                    <b-form-input id="memory"
                                type="text"
                                v-model="laptop.memory"
                                required
                                placeholder="Enter Memory Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="laptopStorageGroup"
                                label="Storage:"
                                label-for="storage">
                    <b-form-input id="storage"
                                type="text"
                                v-model="laptop.storage"
                                required
                                placeholder="Enter Storage Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="laptopScreenSizeGroup"
                                label="Screen Size:"
                                label-for="screenSize">
                    <b-form-input id="screenSize"
                                type="text"
                                v-model="laptop.screenSize"
                                required
                                placeholder="Enter Screen Size Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="laptopOperatingSystemGroup"
                                label="Operating System:"
                                label-for="operatingSystem">
                    <b-form-input id="operatingSystem"
                                type="text"
                                v-model="laptop.operatingSystem"
                                placeholder="Enter Operating System Details">
                    </b-form-input>
                </b-form-group>
            </b-container>
        </div>
        <div v-if="form.productType === 'Phone'">
            <b-container fluid>
                <b-form-group id="phoneOperatingSystemGroup"
                                label="Operating System:"
                                label-for="operatingSystem">
                    <b-form-input id="operatingSystem"
                                type="text"
                                v-model="phone.operatingSystem"
                                required
                                placeholder="Enter Operating System Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="phoneCarrierGroup"
                                label="Carrier:"
                                label-for="carrier">
                    <b-form-input id="carrier"
                                type="text"
                                v-model="phone.carrier"
                                required
                                placeholder="Enter Carrier Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="phoneStorageGroup"
                                label="Storage:"
                                label-for="storage">
                    <b-form-input id="storage"
                                type="text"
                                v-model="phone.storage"
                                required
                                placeholder="Enter Storage Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="phoneScreenSizeGroup"
                                label="Screen Size:"
                                label-for="screenSize">
                    <b-form-input id="screenSize"
                                type="text"
                                v-model="phone.screenSize"
                                required
                                placeholder="Enter Screen Size Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="phoneCameraResolutionGroup"
                                label="Camera Resolution:"
                                label-for="cameraResolution">
                    <b-form-input id="cameraResolution"
                                type="text"
                                v-model="phone.cameraResolution"
                                required
                                placeholder="Enter Camera Resolution Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="phoneReleaseYearGroup"
                                label="Release Year:"
                                label-for="releaseYear">
                    <b-form-input id="releaseYear"
                                type="text"
                                v-model="phone.releaseYear"
                                required
                                placeholder="Enter Release Year Details">
                    </b-form-input>
                </b-form-group>
            </b-container>
        </div>
        <div v-if="form.productType === 'Tablet'">
            <b-container fluid>
                <b-form-group id="tabletOperatingSystemGroup"
                                label="Operating System:"
                                label-for="operatingSystem">
                    <b-form-input id="operatingSystem"
                                type="text"
                                v-model="tablet.operatingSystem"
                                required
                                placeholder="Enter Operating System Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="tabletStorageGroup"
                                label="Storage:"
                                label-for="storage">
                    <b-form-input id="storage"
                                type="text"
                                v-model="tablet.storage"
                                required
                                placeholder="Enter Storage Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="tabletScreenSizeGroup"
                                label="Screen Size:"
                                label-for="screenSize">
                    <b-form-input id="screenSize"
                                type="text"
                                v-model="tablet.screenSize"
                                required
                                placeholder="Enter Screen Size Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="tabletCameraResolutionGroup"
                                label="Camera Resolution:"
                                label-for="cameraResolution">
                    <b-form-input id="cameraResolution"
                                type="text"
                                v-model="tablet.cameraResolution"
                                placeholder="Enter Camera Resolution Details">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="tabletReleaseYearGroup"
                                label="Release Year:"
                                label-for="releaseYear">
                    <b-form-input id="releaseYear"
                                type="text"
                                v-model="tablet.releaseYear"
                                required
                                placeholder="Enter Release Year Details">
                    </b-form-input>
                </b-form-group>
            </b-container>
        </div>
        <b-form-group id="brandGroup"
                        label="Product Brand:"
                        label-for="brand">
            <b-form-input id="brand"
                        type="text"
                        v-model="form.brand"
                        required
                        placeholder="Enter Brand">
            </b-form-input>
        </b-form-group>
        <b-form-group id="colorGroup"
                        label="Product Color:"
                        label-for="color">
            <b-form-input id="color"
                        type="text"
                        v-model="form.color"
                        required
                        placeholder="Enter Color">
            </b-form-input>
        </b-form-group>
        <b-form-group id="priceGroup"
                        label="Product Price:"
                        label-for="price">
            <b-form-input id="price"
                        type="text"
                        v-model="form.price"
                        required
                        placeholder="Enter Price">
            </b-form-input>
        </b-form-group>
        <b-form-group label="Condition:">
            <b-form-radio-group id="conditionRadioButton"
                                buttons
                                button-variant="outline-primary"
                                size="sm"
                                v-model="form.conditionRadio"
                                :options="conditionOptions"
                                name="radioBtnOutline" />
        </b-form-group>
        <b-button type="submit" variant="primary" size="lg">Submit</b-button>
        <b-button type="reset" variant="danger" size="lg">Reset</b-button>
        </b-form>
    </div>
  </div>
</template>

<script>
import api from '@/api'
const uuidv4 = require('uuid/v4')

export default {
  data () {
    return {
      form: {
        email: '',
        title: '',
        description: '',
        productType: '',
        conditionRadio: 'new',
        productImage: '',
        name: '',
        brand: '',
        color: '',
        price: ''
      },
      desktop: {
        processor: '',
        memory: '',
        storage: '',
        graphicsCard: '',
        operatingSystem: ''
      },
      laptop: {
        processor: '',
        memory: '',
        storage: '',
        screenSize: '',
        operatingSystem: ''
      },
      phone: {
        operatingSystem: '',
        carrier: '',
        storage: '',
        screenSize: '',
        cameraResolution: '',
        releaseYear: ''
      },
      tablet: {
        operatingSystem: '',
        storage: '',
        screenSize: '',
        cameraResolution: '',
        releaseYear: ''
      },
      conditionOptions: [
        { text: 'New', value: 'new' },
        { text: 'Used', value: 'used' }
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.title = ''
      this.form.description = ''
      this.form.productType = ''
      this.form.conditionRadio = 'new'
      this.form.name = ''
      this.form.brand = ''
      this.form.productImage = ''
      this.form.color = ''
      this.form.price = ''
      this.desktop.processor = ''
      this.desktop.memory = ''
      this.desktop.storage = ''
      this.desktop.graphicsCard = ''
      this.desktop.operatingSystem = ''
      this.laptop.processor = ''
      this.laptop.memory = ''
      this.laptop.storage = ''
      this.laptop.graphicsCard = ''
      this.laptop.operatingSystem = ''
      this.phone.operatingSystem = ''
      this.phone.carrier = ''
      this.phone.storage = ''
      this.phone.screenSize = ''
      this.phone.cameraResolution = ''
      this.phone.releaseYear = ''
      this.tablet.operatingSystem = ''
      this.tablet.storage = ''
      this.tablet.screenSize = ''
      this.tablet.cameraResolution = ''
      this.tablet.releaseYear = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    async created () {
    },
    async savePost () {
      let productDetailsObject = {}

      let postObject = {}
      postObject.postID = uuidv4()
      postObject.title = this.form.title
      postObject.description = this.form.description
      postObject.productID = uuidv4()
      postObject.email = this.form.email
      postObject.productImage = this.form.productImage
      postObject.sold = false
      await api.createPost(postObject)
      productDetailsObject.productID = postObject.productID
      productDetailsObject.name = this.form.name
      productDetailsObject.condition = this.form.conditionRadio
      productDetailsObject.price = this.form.price
      productDetailsObject.brand = this.form.brand
      productDetailsObject.color = this.form.color
      await api.createProductEntry(productDetailsObject)
      if (this.form.productType === 'Desktop') {
        let desktopObject = {}

        desktopObject.productID = productDetailsObject.productID
        desktopObject.processor = this.desktop.processor
        desktopObject.memory = this.desktop.memory
        desktopObject.storage = this.desktop.storage
        desktopObject.graphicsCard = this.desktop.graphicsCard
        desktopObject.operatingSystem = this.desktop.operatingSystem
        await api.createDesktopPost(desktopObject)
      }
      if (this.form.productType === 'Laptop') {
        let laptopObject = {}

        laptopObject.productID = productDetailsObject.productID
        laptopObject.processor = this.laptop.processor
        laptopObject.memory = this.laptop.memory
        laptopObject.storage = this.laptop.storage
        laptopObject.screenSize = this.laptop.screenSize
        laptopObject.operatingSystem = this.laptop.operatingSystem
        await api.createLaptopPost(laptopObject)
      }
      if (this.form.productType === 'Phone') {
        let phoneObject = {}

        phoneObject.productID = productDetailsObject.productID
        phoneObject.releaseYear = this.phone.releaseYear
        phoneObject.operatingSystem = this.phone.operatingSystem
        phoneObject.storage = this.phone.storage
        phoneObject.cameraResolution = this.phone.cameraResolution
        phoneObject.carrier = this.phone.carrier
        phoneObject.operatingSystem = this.phone.operatingSystem
        await api.createPhonePost(phoneObject)
      }
      if (this.form.productType === 'Tablet') {
        let tabletObject = {}

        tabletObject.productID = productDetailsObject.productID
        tabletObject.releaseYear = this.tablet.releaseYear
        tabletObject.operatingSystem = this.tablet.operatingSystem
        tabletObject.storage = this.tablet.storage
        tabletObject.cameraResolution = this.tablet.cameraResolution
        tabletObject.operatingSystem = this.phone.operatingSystem
        await api.createTabletPost(tabletObject)
      }
      alert('Your post has been saved!')
      this.$router.push('/posts-manager')
    }
  }
}
</script>