require("./mongodb");
const mongoose = require("mongoose");
const subscriberModel = require("../models/subscriberModel");
const subscriber = require("./subscriber.json");

async function carregarDados() {
    try {
        await subscriberModel.deleteMany({});
        for (const sub of subscriber) {
            await subscriberModel.create(sub);
        }
        console.log("Carga de sub feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDados();