const swag = require('../models/swag');

module.exports = {
  search: (req, res, next) => {
    let category = req.query.category;

    if (!category) {
      res.send(swag);
    }
    else {
      let filter = swag.filter(item => item.category === category);
      res.send(filter);
    }
  }
}
