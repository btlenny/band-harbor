const Band = require("../../models/band");

module.exports = {
  addNewBand,
  getAllBands,
  getOneBand,
};

async function addNewBand(req, res) {
  try {
    const band = await Band.create(req.body);
    res.json(band);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function getAllBands(req, res) {
  try {
    const bands = await Band.find({});
    res.json(bands);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getOneBand(req, res) {
  try {
    const band = await Band.findById(req.params.id);
    res.json(band);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
