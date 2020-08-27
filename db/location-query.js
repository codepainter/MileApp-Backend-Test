const Location = require('./location-model')

module.exports = {
    create,
    findById,
    updateById,
    deleteById
}

async function create (locationInfo) {
    const created = await Location.create(locationInfo)
    return created.toObject()
}

function findOne (query) {
    return Location.findOne(query)
}

async function findById ({ location_id }) {
    const found = await findOne({ location_id })
    return found
}

function updateOne (query, toUpdate) {
    return Location.findOneAndUpdate(query, null, toUpdate, { new: true, lean: true })
}

async function updateById ({ location_id, toUpdate }) {
    const updated = await updateOne({ location_id }, toUpdate)
    return updated
}

function deleteOne (query) {
    return Location.findOneAndDelete(query)
}

async function deleteById ({ location_id, toUpdate }) {
    const deleted = await deleteOne({ location_id }, toUpdate)
    return deleted
}
