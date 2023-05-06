const express = require('express')
const mongoose = require('mongoose')
const { wazirxModel } = require('../Model/wazirxModel')
const asyncHandler = require('express-async-handler')
const fs = require('fs')
axios = require('axios')

const fetch = async () => {
    const res = await axios
        .get('https://api.wazirx.com/api/v2/tickers')

    const data = res.data

    const values = Object.values(data) // converted to array
    const sortedValues = values.sort((a, b) => b.volume - a.volume)

    // Slice the first 10 values
    const topTenValues = sortedValues.slice(0, 10)

    // Loop through the top ten values and insert them into the collection
    for await (let value of topTenValues) {
        // Destructure the properties of each value
        const { name, last, buy, sell, volume, base_unit } = value
        console.log(name, last, buy, sell, volume, base_unit)
        // Insert into collection using mongoose method
        await wazirxModel.create({ name, last, buy, sell, volume, base_unit }, (err, res) => {
            if (err) {
                console.error(err)
            } else {
                console.log('Inserted', name)
            }
        })
    }

    console.log("done with the function")
}

const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}


module.exports.tickers = asyncHandler(async (req, res) => {
    try {
        await wazirxModel.deleteMany({})
    } catch (error) {
        console.log(err)
    }

    fetch()
    delay(280).then( () => {
    wazirxModel.find({}, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            // Send back the result as JSON
            res.json(result);
        }
    })
})


})