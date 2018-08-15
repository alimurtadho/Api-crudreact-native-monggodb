const router = require('express-promise-router')();
const Benua = require('../models/benua');

module.exports = {
    index: async (req, res, next) => {
        const data = await Benua.find({});
        res.status(200).json(data)
    },
    indexWithPaging: async (req, res, next) => {
        console.log(req.params)
        const dataPerPage = 10;
        const page = parseInt(req.params.page_no);
        const skip = page * dataPerPage;
        totalpage = 0;

        if (page === 0) {
            const totaldata = await Benua.find({});
            totalpage = totaldata.length / dataPerPage;
            if (totaldata % dataPerPage === 0) {
                totalpage -= 1;
            }
        }

        const data = await Benua.find({}).limit(dataPerPage).skip(skip);

        res.status(200).json({ data, totalpage: Math.round(totalpage) })
    },
    tambah: async (req, res, next) => {
        const newBenua = new Benua(req.body);
        await newBenua.save()
        res.status(200).json({ status_code: 1, msg: 'Berhasil simpan!', data: newBenua })
    },
    ubah: async (req, res, next) => {
        Benua.findByIdAndUpdate(req.body._id, {
            $set: {
                nama_Benua: req.body.nama_Benua,
                populasi: req.body.populasi
            }
        }, { new: true }, function (err, tank) {
            if (err) return handleError(err);
            res.status(200).json({ status_code: 1, msg: 'Berhasil simpan!' })
        });
    },
    hapus: async (req, res, next) => {
        Benua.deleteOne({ _id: req.body._id }, function (err) {
            if (err) return handleError(err);
            res.status(200).json({ status_code: 1, msg: 'Berhasil hapus!' })
        });
    },
}