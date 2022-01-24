const db = require("./db/models");
const { sequelize } = require("./db/models");
const { check, validationResult } = require("express-validator");

async function findStatusShelfEntries(userId, statusId) {
    return await db.StatusShelf.findAll({
        where: {
            userId,
            statusId
        },
        include: [
            {
                model: db.Status
            },
            {
                model: db.GameGuide,
                include: db.Review
            }
        ]
    })

}

async function addStatusShelfEntry(statusId, gameguideId, userId) {
    // Check if gameGuide is in any of the 3 status shelves:
    const guideStatusCheck = await db.StatusShelf.findAll({
        where: {
            gameguideId,
            userId,
        },
    });
    // If it is in a status shelf already:
    if (guideStatusCheck) {
        // Change it to be in the selected status shelf
        entries[0].statusId = statusId;
    } else {
        // If the guide isn't in any status shelf:
        await db.StatusShelf.create({ statusId, gameguideId, userId });
    }
}

async function findCustomShelfEntries(userId, name) {
    const result = await db.CustomShelf.findAll({
        where: {
            userId,
            name
        },
        include: {
            model: db.GameGuide,
            include: [
                {
                    model: db.Review
                },
                {
                    model: db.StatusShelf,
                    include: db.Status
                }
            ]
        }
    })

    if (result) {
        return result
    } else return null

}

async function checkIfCustomNameExists(name, userId) {

    const shelf = await findCustomShelfEntries(userId, name);
    if (shelf && shelf.length) return true;
    else return false;
}

async function addCustomShelfName(name, userId) {
    if (name) {
        if (/^[\w\- ]+$/.test(name)) {
            const exists = await checkIfCustomNameExists(name, userId);
            console.log('----------', exists);
            if (!exists) {
                await db.CustomShelf.create({ name, userId });
                return "success";
            } else {
                return "There is already a shelf with this name";
            }
        } else {
            return "Shelf name can only contain 1 or more lowercase letters, uppercase letters, 0-9, -, _, or a space";
        }
    } else {
        return "Please provide a value for the shelf name";
    }

}

async function addGuideToCustomShelf(name, userId, gameGuideId) {
    const shelf = await findCustomShelfEntries(userId, name);
    // Check if one entry w/ name & if gameguideId is null.
    if (shelf.length === 1 && shelf[0].gameGuideId === null) {
        shelf[0].gameGuideId = gameGuideId;
    } else if (shelf) {
        await db.CustomShelf.create({ name, userId, gameGuideId });
    } else {
        throw new Error("something broke with adding guide to custom shelf");
    }
}

async function checkCountOfShelfEntries(shelf, userId) {
    let count;
    // If shelf is a custom shelf name:
    if (typeof shelf === "string") {
        result = await db.CustomShelf.findAndCountAll({
            where: {
                userId,
                name: shelf
            }
        })

        if (result.count === 1) {
            const one = await db.CustomShelf.findAll({
                where: {
                    userId,
                    name: shelf
                }
            })
            if (!one.GameGuide) {
                result.count = 0
            }
        }
        count = result;
    }
    // If shelf is a status shelf id:
    if (typeof shelf === "number") {
        count = await db.StatusShelf.findAndCountAll({
            where: {
                userId,
                statusId: shelf
            }
        })
    }
    return count.count
}

async function allStatusShelfEntries(userId) {
    return await db.StatusShelf.findAll({
        where: {
            userId
        },
        include: [
            {
                model: db.Status
            },
            {
                model: db.GameGuide,
                include: db.Review
            }
        ]
    })
}

async function findAvgRating(gameGuideId) {
    return db.Review.findOne({
        where: {
            gameGuideId
        },
        attributes: [sequelize.fn('AVG', sequelize.col('rating'))]
    });
};

async function checkIfOnlyOneCustomShelfEntry(userId, name) {
    const guides = findCustomShelfEntries(userId, name)
    if (guides && guides.length === 1) {
        return true;
    } else return false;
}

async function countGuidesOnShelves(userId, whichShelves) {
    if (whichShelves === 'all' || typeof whichShelves === 'number') {

        let count1 = await checkCountOfShelfEntries(1, userId);
        let count2 = await checkCountOfShelfEntries(2, userId);
        let count3 = await checkCountOfShelfEntries(3, userId);

        if (whichShelves === 'all') {
            return count1 + count2 + count3
        }

        if (whichShelves === 1) return count1;
        else if (whichShelves === 2) return count2;
        else if (whichShelves === 3) return count3;
    } else if (whichShelves === 'customShelves') {

        let customCounts = [];

        let customShelves = await db.CustomShelf.findAll({
            where: {
                userId
            },
            attributes: [[sequelize.fn('distinct', sequelize.col('name')), 'name']],
            raw: true,
        })
        
        
        for (let shelf of customShelves) {
            let shelfName = shelf.name
            const result = await checkCountOfShelfEntries(shelfName, userId);
            customCounts.push({ count: result, name: shelfName })
        }

        return customCounts;
    }
}

async function statusAndAllCounts(userId) {
    const all = await countGuidesOnShelves(userId, 'all');
    const one = await countGuidesOnShelves(userId, 1);
    const two = await countGuidesOnShelves(userId, 2);
    const three = await countGuidesOnShelves(userId, 3);
    return {all, one, two, three}
}


async function customCounts(userId) {
    // returns objects in array with shelf.name and shelf.count 
    const customs = await countGuidesOnShelves(userId, 'customShelves')
    return customs
}
    
module.exports = {
    addStatusShelfEntry,
    findStatusShelfEntries,
    findCustomShelfEntries,
    addCustomShelfName,
    checkIfCustomNameExists,
    addGuideToCustomShelf,
    checkCountOfShelfEntries,
    allStatusShelfEntries,
    findAvgRating,
    customCounts,
    statusAndAllCounts
}
