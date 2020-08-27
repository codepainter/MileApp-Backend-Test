const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    connote_id: { type: String, default: null },
    connote_number: { type: Number, default: null },
    connote_service: { type: String, default: null },
    connote_service_price: { type: Number, default: null },
    connote_amount: { type: Number, default: null },
    connote_code: { type: String, default: null },
    connote_booking_code: { type: String, default: null },
    connote_order: { type: Number, default: null },
    connote_state: { type: String, default: null },
    connote_state_id: { type: Number, default: null },
    zone_code_from: { type: String, default: null },
    zone_code_to: { type: String, default: null },
    surcharge_amount: { type: Number, default: null },
    transaction_id: { type: String, default: null },
    actual_weight: { type: Number, default: null },
    volume_weight: { type: Number, default: null },
    chargeable_weight: { type: Number, default: null },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    organization_id: { type: Number, default: null },
    location_id: { type: String, default: null },
    connote_total_package: { type: String, default: null },
    connote_surcharge_amount: { type: String, default: null },
    connote_sla_day: { type: String, default: null },
    location_name: { type: String, default: null },
    location_type: { type: String, default: null },
    source_tariff_db: { type: String, default: null },
    id_source_tariff: { type: String, default: null },
    pod: { type: String, default: null },
    history: { type: [String], default: null }
})

module.exports = mongoose.model('Connote', schema)
