const log = require('debug')('main:')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const validator = require('validator').default

const Transaction = require('./db/transaction-query')
const Location = require('./db/location-query')
const Connote = require('./db/connote-query')
const Koli = require('./db/koli-query')

app.get('/package', getAllPackage)
app.get('/package/:id', getPackage)
app.post('/package', postPackage)
app.post('/package/:id', postPackage)
app.put('/package/:id', putPackage)
app.patch('/package/:id', patchPackage)
app.delete('/package/:id', deletePackage)

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
    const id = req.params.id || req.body.id
    const transactionInfo = req.body
    if (!validator.isUUID(id)) return res.status(400).json({ error: 'invalid uuid' })

    const connoteFound = await Connote.findById({ connote_id: transactionInfo.connote_id })
    const origin_data = await Location.findById({ location_id: transactionInfo.location_id })
    const destination_data = await Location.findById({ location_id: transactionInfo.location_id })
    const koli_data = await Koli.findByIds({ koli_ids: transactionInfo.koli_data })

    const newPackage = await Transaction.create({
        ...transactionInfo,
        transaction_id: id,
        connote: connoteFound,
        origin_data,
        destination_data,
        koli_data
    })

    return res.status(200).json({ package: 'posted' })
}

async function putPackage (req, res) {
    const id = req.params.id
    const transactionInfo = req.body
    if (!id) return res.status(400).json({ error: 'id required' })

    const found = await Transaction.findById({ transaction_id: id })
    if (!found) return res.status(404).json({ error: 'transaction not found' })

    if (!isValidTransaction(transactionInfo)) return res.status(400).json({ error: 'transaction payload invalid' })

    const created = await Transaction.create({
        transaction_id: id,
        ...transactionInfo
    })

    return res.status(200).json({ message: `transaction ${id} created`, updated })
}

async function patchPackage (req, res) {
    const id = req.params.id
    const transactionInfo = req.body
    if (!id) return res.status(400).json({ error: 'id required' })

    const found = await Transaction.findById({ transaction_id: id })
    if (!found) return res.status(404).json({ error: 'transaction not found' })

    if (!isValidTransaction(transactionInfo)) return res.status(400).json({ error: 'transaction payload invalid' })

    const updated = await Transaction.updateById({
        transaction_id: id,
        toUpdate: {
            ...transactionInfo
        }
    })

    return res.status(200).json({ message: `transaction ${id} updated`, updated })
}

function isValidTransaction (transasctionInfo) {
    // TODO: improve this
    if (!transasctionInfo.hasOwnProperty('customer_code')) return false
    if (!transasctionInfo.hasOwnProperty('transaction_amount')) return false
    if (!transasctionInfo.hasOwnProperty('transaction_payment_type')) return false
    if (!transasctionInfo.hasOwnProperty('transaction_code')) return false
    if (!transasctionInfo.hasOwnProperty('location_id')) return false
    if (!transasctionInfo.hasOwnProperty('transaction_payment_type_name')) return false
    if (!transasctionInfo.hasOwnProperty('connote_id')) return false
    if (!transasctionInfo.hasOwnProperty('koli_data')) return false
    return true
}

async function deletePackage (req, res) {
    const id = req.params.id
    if (!id) return res.status(400).json({ error: 'id required' })

    const found = await Transaction.findById({ transaction_id: id })
    if (!found) return res.status(404).json({ error: 'transaction not found' })

    const deleted = await Transaction.deleteById({ transaction_id: id })

    return res.status(200).json({ message: `transaction ${id} deleted`, deleted })
}
