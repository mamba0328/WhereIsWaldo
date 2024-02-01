require('dotenv').config();

const mongoose = require('mongoose');
const Maps = require('../models/Maps');
const Characters = require('../models/Characters');

mongoose.connect(process.env.DB_URI);

const mapsData = [
    { path: "/imgs/waldo-ski.webp", name: "Waldo Ski Resort" },
    { path: "/imgs/waldo-beach.webp", name: "Waldo on the beach" },
    { path: "/imgs/waldo-space.webp", name: "Waldo in space" },
];

const skiMapChars = [
    {
        position: {
            top_left: { x: 83.8333, y: 71.1356 },
            bottom_right: { x: 87.7333, y: 77.2871 }
        },
        name: "Waldo",
        hint: "Wears glasses and a striped white-red hat and shirt"
    },
    {
        position: {
            top_left: { x: 30.9, y: 62.302 },
            bottom_right: { x: 32.3667, y: 64.5636 }
        },
        name: "Baldo",
        hint: "Evil Waldo's twin, has moustaches and a bee-like costume"
    },
    {
        position: {
            top_left: { x: 92.0333, y: 9.98948 },
            bottom_right: { x: 94.2333, y: 13.3544 }
        },
        name: "Yeti",
        hint: "It's a Yeti, google it if you don't know"
    },
    {
        position: {
            top_left: { x: 6.08333, y: 73.8696 },
            bottom_right: { x: 7.61667, y: 77.6025 }
        },
        name: "Santa Claus",
        hint: "Has a staff and a blue pointy hat"
    },
    {
        position: {
            top_left: { x: 48.1167, y: 40.2208 },
            bottom_right: { x: 49.6167, y: 43.2177 }
        },
        name: "Galdo",
        hint: "Looks like Waldo but a woman"
    },
];

const beachMapChars = [
    {
        position: {
            top_left: { x: 60.8, y: 36.189 },
            bottom_right: { x: 62.7167, y: 40.758 }
        },
        name: "Waldo",
        hint: "Wears glasses and a striped white-red hat and shirt, wears tourism staff"
    },
    {
        position: {
            top_left: { x: 76.6167, y: 39.7715 },
            bottom_right: { x: 77.65, y: 42.0561 }
        },
        name: "Galdo",
        hint: "Looks like Waldo but a woman"
    },
    {
        position: {
            top_left: { x: 22.1333, y: 89.2523 },
            bottom_right: { x: 24.8667, y: 97.9751 }
        },
        name: "The guy who gets cold on the beach",
        hint: "Wears winter clothes"
    },
    {
        position: {
            top_left: { x: 9.16667, y: 20.3011 },
            bottom_right: { x: 10.5, y: 22.6376 }
        },
        name: "Angry fish",
        hint: "Human-sized fish"
    },
    {
        position: {
            top_left: { x: 10.2, y: 34.3718 },
            bottom_right: { x: 11.1, y: 38.4735 }
        },
        name: "Baldo",
        hint: "Evil Waldo's twin, has moustaches and a bee-like costume"
    },
];

const spaceMapChars = [
    {
        position: {
            top_left: { x: 6.3, y: 67.8228 },
            bottom_right: { x: 7.73333, y: 70.962 }
        },
        name: "Baldo",
        hint: "Evil Waldo's twin, has moustaches and a bee-like costume"
    },
    {
        position: {
            top_left: { x: 77.4667, y: 56.4051 },
            bottom_right: { x: 78.7333, y: 60.1519 }
        },
        name: "Santa Claus",
        hint: "Has a staff and a blue pointy hat"
    },
    {
        position: {
            top_left: { x: 39.8333, y: 60.8608 },
            bottom_right: { x: 40.8667, y: 65.1139 }
        },
        name: "Waldo",
        hint: "Wears glasses and a striped white-red hat and shirt"
    },
    {
        position: {
            top_left: { x: 62.9, y: 86.3797 },
            bottom_right: { x: 63.9333, y: 89.519 }
        },
        name: "Waldo JR",
        hint: "Looks like Waldo but a kid"
    },
    {
        position: {
            top_left: { x: 28.8, y: 50.481 },
            bottom_right: { x: 30, y: 54.3291 }
        },
        name: "Galdo",
        hint: "Looks like Waldo but a woman"
    },
];


const getCharsWithMapId = (maps) => {
    const skiMapId = maps.find(map => map.name === 'Waldo Ski Resort')._id;
    const beachMapId = maps.find(map => map.name === "Waldo on the beach")._id;
    const spaceMapId = maps.find(map => map.name === "Waldo in space")._id;

    skiMapChars.forEach(char => char.map_id = skiMapId);
    beachMapChars.forEach(char => char.map_id = beachMapId);
    spaceMapChars.forEach(char => char.map_id = spaceMapId);

    return [...spaceMapChars, ...beachMapChars, ...skiMapChars]
}
const seedDatabase = async () => {
    try {
        // Insert maps data
        const insertedMaps = await Maps.insertMany(mapsData);
        console.log('Maps data inserted:', insertedMaps);

        const insertedChars = await Characters.insertMany(getCharsWithMapId(insertedMaps))
        console.log('Characters data inserted:', insertedChars);

        mongoose.connection.close();
        console.log('Seed data inserted successfully. Connection closed.');

    } catch (error) {
        console.error('Error inserting seed data:', error);
        mongoose.connection.close();
    }
};

seedDatabase();
