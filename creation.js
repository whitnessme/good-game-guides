const db = require("../db/models");

function addStatusShelfEntry(statusId, gameguideId, userId) {
    const statusShelfExists = db.StatusShelf.findAll({
        where: {
            gameguideId,
            userId
        }
    })

    if(statusShelfExists) {
        if(statusShelfExists[0].statusId === statusId) {
            statusShelfExists[0].destroy();
        } else {
            statusShelfExists[0].statusId = statusId
        }
    } else {
        db.StatusShelf.create({statusId, gameguideId, userId})
    }
}

function findCustomShelfEntries(userId, name) {
    const result = db.CustomShelf.findAll({
        where: {
            userId,
            name
        }
    })

    if(result) {
    return result
    } else return null
}

function checkIfCustomNameExists(name, userId) {
    const shelf = findCustomShelfEntries(userId, name)
    if(shelf) return true
    else return false
}

function addCustomShelfName(name, userId) {
    db.CustomShelf.create({name, userId})
}

function addGuideToCustomShelf(name, userId, gameGuideId) {
    const shelf = findCustomShelfEntries(userId, name)
    // Check if one entry w/ name & if gameguideId is null.
    if (shelf.length === 1 && shelf[0].gameGuideId === null) {
        shelf[0].gameGuideId = gameGuideId
    } else if(shelf) {
        db.CustomShelf.create({name, userId, gameGuideId})
    } else {
        throw new Error('something broke with adding guide to custom shelf')
    }
}

module.exports = {
    addStatusShelfEntry,
    findCustomShelfEntries,
    addCustomShelfName,
    checkIfCustomNameExists,
    addGuideToCustomShelf
}