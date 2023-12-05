const Band = require('../../models/band');

module.exports = {
    addNewBand,
};

async function addNewBand(req, res) {
    try {
        const band = await Band.create(req.body);
        res.json(band);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}


