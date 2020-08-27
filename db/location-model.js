const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    customer_name: { type: String, default: null },
    customer_address: { type: String, default: null },
    customer_email: { type: String, default: null },
    customer_phone: { type: String, default: null },
    customer_address_detail: { type: String, default: null },
    customer_zip_code: { type: String, default: null },
    zone_code: { type: String, default: null },
    organization_id: { type: Number },
    location_id: { type: String, default: null }
})

module.exports = mongoose.model('Location', schema)
