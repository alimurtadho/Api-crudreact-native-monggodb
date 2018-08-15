const router = require('express-promise-router')();
const Negara = require('../models/negara');


module.exports = {
    index: async (req, res, next) => {
        const data = await Negara.find({});
        res.status(200).json(data)
    }, 
    getBenuaNegara: async (req, res, next) => {
        // const { id } = req.params.id
        // const data = await Negara.findById(id);
        // console.log(data);
        const { benua_id } = req.params.benua_id
        const negara = await Negara.findById({ benua_id })
        .populate({
            path: benua_id,
            select: nama_benua
        });
        console.log(negara);

        res.status(200).json(negara)
    },

    indexWithPaging: async (req, res, next) => {
        // console.log(req.params)
        const dataPerPage = 10;
        const page = parseInt(req.params.page_no);
        const skip = page * dataPerPage;

        totalpage = 0;

        if (page === 0) {
            const totaldata = await Negara.find({});
            totalpage = totaldata.length / dataPerPage;
            if (totaldata % dataPerPage === 0) {
                totalpage -= 1;
            }
        }

        const data = await Negara.find({}).limit(dataPerPage).skip(skip);

        res.status(200).json({ data, totalpage: Math.round(totalpage) })
    },
    tambah: async (req, res, next) => {
        const newNegara = new Negara(req.body);
        const Negara = await Negara.find({ Benua: req.params.benua_id })
            .populate()
            .exec();
        await newNegara.save()
        res.status(200).json({ status_code: 1, msg: 'Berhasil simpan!', data: newNegara })
    },
    ubah: async (req, res, next) => {

        Negara.findByIdAndUpdate(req.body._id, {
            $set: {
                nama_negara: req.body.nama_negara,
                populasi: req.body.populasi
            }
        }, { new: true }, function (err, tank) {
            if (err) return handleError(err);
            res.status(200).json({ status_code: 1, msg: 'Berhasil simpan!' })
        });
    },
    hapus: async (req, res, next) => {
        Negara.deleteOne({ _id: req.body._id }, function (err) {
            if (err) return handleError(err);
            res.status(200).json({ status_code: 1, msg: 'Berhasil hapus!' })
        });
    },
}