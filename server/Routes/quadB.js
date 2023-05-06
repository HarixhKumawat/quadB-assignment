const express = require('express')
const {tickers} = require('../Controller/quadB')
const router = express.Router()

router.route('/tickers').get(tickers)

module.exports = router