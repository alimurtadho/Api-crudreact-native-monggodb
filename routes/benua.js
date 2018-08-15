const router = require('express-promise-router')();
const express = require("express");
const mongoose = require("mongoose");
const NegaraController = require("../controllers/benua");

router.route('/')
    .get(NegaraController.index);

router.route('/page/:page_no')
    .get(NegaraController.indexWithPaging);

router.route('/tambah')
    .post(NegaraController.tambah);

router.route('/ubah')
    .post(NegaraController.ubah);

router.route('/hapus')
    .post(NegaraController.hapus);

module.exports = router;