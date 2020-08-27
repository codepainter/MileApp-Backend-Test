const Transaction = require('./transaction-model')

module.exports = {
    create,
    findById,
    findAll,
    updateById,
    deleteById
}

async function create (transactionInfo) {
    const created = await Transaction.create(transactionInfo)
    return created.toObject()
}

function findOne (query) {
    return Transaction.findOne(query)
}

function findMany (query) {
    return Transaction.find(query).lean()
}

async function findById ({ transaction_id }) {
    const found = await findOne({ transaction_id })
    return found
}

async function findAll () {
    const found = await findMany({})
    return found
}

function updateOne (query, toUpdate) {
    return Transaction.findOneAndUpdate(query, null, toUpdate, { new: true, lean: true })
}

async function updateById ({ transaction_id, toUpdate }) {
    const updated = await updateOne({ transaction_id }, toUpdate)
    return updated
}

function deleteOne (query) {
    return Transaction.findOneAndDelete(query)
}

async function deleteById ({ transaction_id, toUpdate }) {
    const deleted = await deleteOne({ transaction_id }, toUpdate)
    return deleted
}
