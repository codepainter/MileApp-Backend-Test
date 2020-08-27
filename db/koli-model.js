const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    koli_length: { type: Number, default: null },
    awb_url: { type: String, default: null },
    created_at: { type: Date, default: null },
    koli_chargeable_weight: { type: Number, default: null },
    koli_width: { type: Number, default: null },
    koli_surcharge: [{ type: Number, default: null }],
    koli_height: { type: Number, default: null },
    updated_at: { type: String, default: null },
    koli_description: { type: String, default: null },
    koli_formula_id: { type: String, default: null },
    connote_id: { type: String, default: null },
    koli_volume: { type: Number, default: null },
    koli_weight: { type: Number, default: null },
    koli_id: { type: String, default: null },
    koli_custom_field: {
        awb_sicepat: { type: String, default: null },
        harga_barang: { type: Number, default: null }
    },
    koli_code: { type: String, default: null }
})

module.exports = mongoose.model('Koli', schema)
