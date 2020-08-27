const log = require('debug')('main:')
const express = require('express')
const app = express()
const validator = require('validator').default

const Transaction = require('./db/transaction-query')
const Location = require('./db/location-query')
const Connote = require('./db/connote-query')
const Koli = require('./db/koli-query')

app.get('/package', getAllPackage)
app.get('/package/:id', getPackage)
app.post('/package', postPackage)
app.post('/package/:id')
app.put('/package/:id')
app.patch('/package/:id')
app.delete('/package/:id')

app.listen(3000, () => console.log('Server is listening to localhost:3000'))

// HANDLERS
async function getAllPackage (req, res) {
    const transactionFound = await Transaction.findById()
    if (transactionFound.length === 0) return res.status(404).json({ error: 'no transaction found' })
    return res.status(200).json(transactionFound)
}

async function getPackage (req, res) {
    const id = req.params.id
    if (!validator.isUUID(id)) return res.status(400).json({ error: 'invalid uuid' })

    const transactionFound = await Transaction.findById({ transaction_id: id })
    if (!transactionFound) return res.status(404).json({ error: 'transaction not found' })

    const connoteFound = await Connote.findById({ connote_id: transactionFound.connote_id })
    const origin_data = await Location.findById({ location_id: transactionFound.location_id })
    const destination_data = await Location.findById({ location_id: transactionFound.location_id })
    const koli_data = await Koli.findByIds({ koli_ids: transactionFound.koli_data })

    return res.status(200).json({
        ...transactionFound,
        connote: connoteFound,
        origin_data,
        destination_data,
        koli_data
    })
}

async function postPackage (req, res) {
    const { transaction_id, ...transactionInfo } = req.body
    if (!validator.isUUID(id)) return res.status(400).json({ error: 'invalid uuid' })

    const connoteFound = await Connote.findById({ connote_id: transactionInfo.connote_id })
    const origin_data = await Location.findById({ location_id: transactionInfo.location_id })
    const destination_data = await Location.findById({ location_id: transactionInfo.location_id })
    const koli_data = await Koli.findByIds({ koli_ids: transactionInfo.koli_data })

    const newPackage = await Transaction.create({
        ...transactionInfo,
        connote: connoteFound,
        origin_data,
        destination_data,
        koli_data
    })

    return res.status(200).json({ package: 'posted' })
}
