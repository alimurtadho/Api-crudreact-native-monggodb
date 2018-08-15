const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const benuaSchema = new Schema({
    nama_benua: String, 
});

const benua = mongoose.model('benua', benuaSchema, 'benua');
module.exports = benua;

