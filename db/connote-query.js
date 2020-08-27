const Connote = require('./connote-model')

module.exports = {
    create,
    findById,
    updateById,
    deleteById
}

async function create (connoteInfo) {
    const created = await Connote.create(connoteInfo)
    return created.toObject()
}

function findOne (query) {
    return Connote.findOne(query)
}

async function findById ({ connote_id }) {
    const found = await findOne({ connote_id })
    return found
}

function updateOne (query, toUpdate) {
    return Connote.findOneAndUpdate(query, null, toUpdate, { new: true, lean: true })
}

async function updateById ({ connote_id, toUpdate }) {
    const updated = await updateOne({ connote_id }, toUpdate)
    return updated
}

function deleteOne (query) {
    return Connote.findOneAndDelete(query)
}

async function deleteById ({ connote_id, toUpdate }) {
    const deleted = await deleteOne({ connote_id }, toUpdate)
    return deleted
}
