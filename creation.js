const db = require("./db/models");

function findStatusShelfEntries(userId, statusId){
    return db.StatusShelf.findAll({
        where: {
            userId,
            statusId
        },
        include: db.GameGuide
    })
}

function addStatusShelfEntry(statusId, gameguideId, userId) {
    // Check if gameGuide is in any of the 3 status shelves:
    const guideStatusCheck = db.StatusShelf.findAll({
        where: {
            gameguideId,
            userId
        }
    })
    // If it is in a status shelf already:
    if(guideStatusCheck) {
        // Change it to be in the selected status shelf
        entries[0].statusId = statusId
    } else {
        // If the guide isn't in any status shelf:
        db.StatusShelf.create({statusId, gameguideId, userId})
    }
}

function findCustomShelfEntries(userId, name) {
    const result = db.CustomShelf.findAll({
        where: {
            userId,
            name
        },
        include: db.GameGuide
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

function checkCountOfShelfEntries(shelf, userId){
    let count;
    // If shelf is a custom shelf name:
    if(typeof shelf === "string"){
        count = db.CustomShelf.findAndCountAll({
            where: {
                userId,
                name: shelf
            }
        })
    }
    // If shelf is a status shelf id:
    if(typeof shelf === "number"){
        count = db.StatusShelf.findAndCountAll({
            where: {
                userId,
                statusId: shelf
            }
        })
    }
    return count
}

function allStatusShelfEntries(userId){
    return db.StatusShelf.findAll({
        where: {
            userId
        }
    })
 }


module.exports = {
    addStatusShelfEntry,
    findStatusShelfEntries,
    findCustomShelfEntries,
    addCustomShelfName,
    checkIfCustomNameExists,
    addGuideToCustomShelf,
    checkCountOfShelfEntries,
    allStatusShelfEntries
}
