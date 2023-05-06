const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");

module.exports.wazirxModel = model('wazirx', Schema({
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: Number,
    base_unit: String,
}));