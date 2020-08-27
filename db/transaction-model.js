const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    transaction_id: { type: String },
    customer_code: { type: String },
    customer_name: { type: String },
    //   customer_attribute: {
    //     Nama_Sales: 'Radit Fitrawikarsa',
    //     TOP: '14 Hari',
    //     Jenis_Pelanggan: 'B2B'
    // },
    transaction_amount: { type: Number },
    transaction_discount: { type: Number },
    transaction_additional_field: { type: String },
    transaction_payment_type: { type: Number },
    transaction_state: { type: Number },
    transaction_code: { type: Number },
    transaction_order: { type: Number },
    location_id: { type: String },
    organization_id: { type: Number },
    created_at: { type: Date },
    updated_at: { type: Date },
    transaction_payment_type_name: { type: String },
    transaction_cash_amount: { type: Number },
    transaction_cash_change: { type: Number },
    connote_id: { type: String },
    origin_data: {
        customer_name: { type: String },
        customer_address: { type: String },
        customer_email: { type: String },
        customer_phone: { type: String },
        customer_address_detail: { type: String, default: null },
        customer_zip_code: { type: String },
        zone_code: { type: String },
        organization_id: { type: Number },
        location_id: { type: String }
    },
    destination_data: {
        customer_name: { type: String, default: null },
        customer_address: { type: String, default: null },
        customer_email: { type: String, default: null },
        customer_phone: { type: String, default: null },
        customer_address_detail: { type: String, default: null },
        customer_zip_code: { type: String, default: null },
        zone_code: { type: String, default: null },
        organization_id: { type: Number },
        location_id: { type: String, default: null }
    },
    koli_data: [{ type: Object, default: null }],
    custom_field: {
        catatan_tambahan: { type: String, default: null }
    },
    currentLocation: {
        name: { type: String, default: null },
        code: { type: String, default: null },
        type: { type: String, default: null }
    }
})

module.exports = mongoose.model('Transaction', schema)
