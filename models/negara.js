const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const negaraSchema = new Schema({
    nama_negara: String, 
    populasi: Number,
    benua: { type: mongoose.Schema.Types.ObjectId, ref: 'benua' },
});

const Negara = mongoose.model('negara', negaraSchema, 'negara');
module.exports = Negara;

