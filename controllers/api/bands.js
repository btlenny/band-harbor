const Band = require('../../models/band');

module.exports = {
    new: newBand,
    create,
    index,
  };
  
  function newBand(req, res) {
    res.render("bands/new", { errorMsg: "" });
  }
    
  async function create(req, res) {
    console.log("Route accessed");
    console.log("Submitted Brand:", req.body.name);
    console.log("Submitted Model:", req.body.genre);
  
    try {
      await Band.create(req.body);
      res.redirect("/bands");
    } catch (err) {
      console.log('Error:', err);
      res.render("bands/new", { errorMsg: "An error occurred." });
    }
  }
  
  async function index(req, res) {
    const bands = await Band.find({}).exec();
    res.render("bands", { bands });
  }
  
  