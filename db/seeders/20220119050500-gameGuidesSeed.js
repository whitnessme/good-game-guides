'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('GameGuides', [
      {title:'Spyro Reignited Trilogy: Latest Guide', author:'Angela Fregillana', releaseDate:'2021-07-12', publisher:'Independently published',
      summary:
      `If you want a blast from the past, Spyro: Reignited Trilogy will certainly stoke the fires of nostalgia. Thanks to its charming redesign and smooth controls, exploring Spyro's world is a rather magical experience for returning players, while its soft and welcoming aesthetics could make this a hit with a new generation of youngsters. And, importantly, it feels good to control.
      This is a comprehensive guide that will walk you through all the most critical pieces of the game. In this book, I\’ll be sharing tips and tricks that I wished I knew earlier so you can benefit from them during your play.`,
      coverImg:'/images/guides/spyro_guide.jpg', createdAt: new Date(), updatedAt: new Date() },
      
      {title:'Horizon Zero Dawn Complete Edition: Official Game Guide', releaseDate:'2020-12-07', publisher:'Future Press',
      summary:
      `With a setting unlike any other to explore and mysteries lying buried, Horizon Zero Dawn is a game you\’ll want to dig deep into. This fully updated book will provide everything you need to overcome the odds and gain a deeper understanding of the game’s unique world, including the new Frozen Wilds content.`,
      coverImg:'/images/guides/horizon_zero_dawn_guide.jpg', createdAt: new Date(), updatedAt: new Date() },
      
      {title:'The Legend of Zelda: Breath of the Wild The Complete Official Guide: -Expanded Edition', releaseDate:'2018-02-13', publisher:'Piggyback',
      summary:
      `The Expanded Edition Guide to The Legend of Zelda: Breath of the Wild is a 512-page hardcover guidebook covering everything in the main game as well as the two Expansion Pass DLC packs “The Master Trials” and “The Champions’ Ballad”. 
      INCLUDES:  Expansion Pass concept art gallery; dedicated chapters covering both Expansion Passes; Reference and Analysis chapter; Maps chapter; all-new hardcover and an extensive 4-page Index.`,
      coverImg:'/images/guides/loz_botw_guide.jpg', createdAt: new Date(), updatedAt: new Date() },

      {title:'Sims 4 Guide', author:'Maciej Stepnikowski', releaseDate:'2016-05-05', publisher:'GamePressure.com',
      summary:
      `This The Sims 4 guide includes a description of every single aspect of the game. You can find here tips about, for example, creating your own Sim, modifying its physical features, choosing its clothes and apparel and choosing its character traits. You will also learn leading your Sim through its career and earning as much Simoleons as you can so you can create (and keep) the home which you dream about. You can also check which career is the most profitable by design. In this guide you will find a lot of useful information about creating and transforming a house and selecting furniture. You will also read about social relations between Sims and how to use this relations to create an interesting and successful family. The Sims 4 is the newest title of the one of the most popular video game series. `,
      coverImg:'/images/guides/sims_4.jpg', createdAt: new Date(), updatedAt: new Date() },

      {title:'Best Enchantments in Minecraft', author:'Nicholas Fries', releaseDate:'2021-08-30', publisher:'ProGameGuides.com',
      summary:
      `Our Minecraft Best Enchantments Guide features all the top options for enchanting your Armor, Crossbow, Sword, Pickaxe, Bow, Axe, Shovel, Elytra, Fishing Pole, and even your Trident! If you're looking to get the most out of your enchantments in Minecraft, then we've got all the information you'll need.`,
      coverImg:'/images/guides/featured-minecraft-best-enchantments.jpg', createdAt: new Date(), updatedAt: new Date() },

      {title:'Pokemon Diamond, Pearl and Platinum Wiki Guide', author:'Many contributors', releaseDate:'2022-01-12', publisher:'IGN.com',
      summary:
      `Welcome to IGN's Pokemon Brilliant Diamond and Shining Pearl for the Nintendo Switch wiki guide. Pokemon Brilliant Diamond and Shining Pearl are faithful remakes of the original Nintendo DS games. For the Nintendo Switch Diamond and Pearl remakes, this guide will be updated accordingly.`,
      coverImg:'/images/guides/pokemon_diamond_pearl.jpg', createdAt: new Date(), updatedAt: new Date() },

    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('GameGuides', null, {});
  }
};
