const Koli = require('./koli-model')

module.exports = {
    create,
    findById,
    findByIds,
    updateById,
    deleteById
}

async function create (koliInfo) {
    const created = await Koli.create(koliInfo)
    return created.toObject()
}

function findOne (query) {
    return Koli.findOne(query)
}

function findMany (query, options) {
    return Koli.find(query, null, options).lean()
}

async function findById ({ koli_id }) {
    const found = await findOne({ koli_id })
    return found
}

async function findByIds ({ koli_ids }) {
    const found = await findMany({ koli_id: { $in: koli_ids } })
    return found
}

function updateOne (query, toUpdate) {
    return Koli.findOneAndUpdate(query, null, toUpdate, { new: true, lean: true })
}

async function updateById ({ koli_id, toUpdate }) {
    const updated = await updateOne({ koli_id }, toUpdate)
    return updated
}

function deleteOne (query) {
    return Koli.findOneAndDelete(query)
}

async function deleteById ({ koli_id, toUpdate }) {
    const deleted = await deleteOne({ koli_id }, toUpdate)
    return deleted
}
