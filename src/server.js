const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oahbaejgmJcaQJnb0h7',
  issuer: 'https://dev-920417.oktapreview.com/oauth2/default'
})

let app = express()
app.use(cors())
app.use(bodyParser.json())

// verify JWT token middleware
app.use((req, res, next) => {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error('Authorization header is required'))
  }
  let parts = req.headers.authorization.trim().split(' ')
  let accessToken = parts.pop()
  oktaJwtVerifier.verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      next()
    })
    .catch(next) // jwt did not verify!
})

// For ease of this tutorial, we are going to use SQLite to limit dependencies
//let database = new Sequelize({
  //dialect: 'sqlite',
  //storage: './test.sqlite'
//})
const database = new Sequelize('testdb', 'testuser', 'testcsci226', {
  host: 'csci226test.cilpqikulsp2.us-east-2.rds.amazonaws.com',
  port: 3306,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'mysql',
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
})


// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Define our Post model
// id, createdAt, and updatedAt are added by sequelize automatically
let Post = database.define('posts', {
  postID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  productID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productImage: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  sold: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

// Create the dynamic REST resource for our Post model
let PostResource = epilogue.resource({
  model: Post,
  endpoints: ['/posts', '/posts/:postID', '/posts/:email']
})

let Account = database.define('account', {
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  creationDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  averageRating: {
    type: Sequelize.FLOAT(2,2),
    allowNull: true
  }
})

let AccountResource = epilogue.resource({
  model: Account,
  endpoints: ['/account', '/account/:email']
})

let Review = database.define('review', {
  reviewID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT(2,2),
    allowNull: false
  },
  ratingComment: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

// Review.belongsTo(Account, {foreignKey: 'email'})

let ReviewResource = epilogue.resource({
  model: Review,
  endpoints: ['/review', '/review/:id']
})

let ProductDetails = database.define('productDetails', {
  productID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  condition: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: true
  },
})

let ProductDetailsResource = epilogue.resource({
  model: ProductDetails,
  endpoints: ['/productDetails', '/productDetails/:productID']
})

let Orders = database.define('orders', {
  orderID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  transactionID: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

let OrdersResource = epilogue.resource({
  model: Orders,
  endpoints: ['/orders', '/orders/:orderID']
})

let TransactionDetails = database.define('transactionDetails', {
  transactionID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  transactionDateTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  cardNumber: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  cardName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  cardMonth: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cardYear: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  securityCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billedAmount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
})

let TransactionDetailsResource = epilogue.resource({
  model: TransactionDetails,
  endpoints: ['/transactionDetails', '/transactionDetails/:transactionID']
})

let OrderDetails = database.define('orderDetails', {
  orderID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  productID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sellerEmail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  customerEmail: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

OrderDetails.belongsTo(ProductDetails, {foreignKey: 'productID'})
OrderDetails.belongsTo(Orders, {foreignKey: 'orderID'})

let OrderDetailsResource = epilogue.resource({
  model: OrderDetails,
  endpoints: ['/orderDetails', '/orderDetails/:orderID']
})

let Returns = database.define('returns', {
  returnID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  orderID: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Returns.belongsTo(OrderDetails, {foreignKey: 'orderID'})

let ReturnsResource = epilogue.resource({
  model: Returns,
  endpoints: ['/returns', '/returns/:id']
})

let ReturnReasonCode = database.define('returnReasonCode', {
  code: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  reason: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

let ReturnReasonCodeResource = epilogue.resource({
  model: ReturnReasonCode,
  endpoints: ['/returnReasonCode', '/returnReasonCode/:id']
})

let ReturnDetails = database.define('returnDetails', {
  returnID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  code: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  returnDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

ReturnDetails.belongsTo(Returns, {foreignKey: 'returnID'})
ReturnDetails.belongsTo(ReturnReasonCode, {foreignKey: 'code'})

let ReturnDetailsResource = epilogue.resource({
  model: ReturnDetails,
  endpoints: ['/returnDetails', '/returnDetails/:id']
})

let ShippingDetails = database.define('shippingDetails', {
  shippingID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  street: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

let ShippingDetailsResource = epilogue.resource({
  model: ShippingDetails,
  endpoints: ['/shippingDetails', '/shippingDetails/:shippingID']
})

let Desktop = database.define('desktop', {
  productID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  processor: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  memory: {
    type: Sequelize.STRING,
    allowNull: false
  },
  storage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  graphicsCard: {
    type: Sequelize.STRING,
    allowNull: true
  },
  operatingSystem: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

Desktop.belongsTo(ProductDetails, {foreignKey: 'productID'})

let DesktopResource = epilogue.resource({
  model: Desktop,
  endpoints: ['/desktop', '/desktop/:productID']
})

let Laptop = database.define('laptop', {
  productID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  processor: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  memory: {
    type: Sequelize.STRING,
    allowNull: false
  },
  storage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  screenSize: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  operatingSystem: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

Laptop.belongsTo(ProductDetails, {foreignKey: 'productID'})

let LaptopResource = epilogue.resource({
  model: Laptop,
  endpoints: ['/laptop', '/laptop/:productID']
})

let Phone = database.define('phone', {
  productID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  releaseYear: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  operatingSystem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  storage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  screenSize: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  cameraResolution: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  carrier: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Phone.belongsTo(ProductDetails, {foreignKey: 'productID'})

let PhoneResource = epilogue.resource({
  model: Phone,
  endpoints: ['/phone', '/phone/:productID']
})

let Tablet = database.define('tablet', {
  productID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  releaseYear: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  operatingSystem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  storage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  screenSize: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  cameraResolution: {
    type: Sequelize.DECIMAL,
    allowNull: true
  }
})

Tablet.belongsTo(ProductDetails, {foreignKey: 'productID'})

let TabletResource = epilogue.resource({
  model: Tablet,
  endpoints: ['/tablet', '/tablet/:productID']
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: false }) // change to 'true' to reset database
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  })