const swag = require('../models/swag');

module.exports = {
  add: (req, res, next) => {
    const {id} = req.query;
    const { cart } = req.session.user;
    const value = cart.find(item => item.id == id);

    if (!value) {
      const addedItem = swag.find(item => item.id == id);
      cart.push(addedItem);
      req.session.user.total += addedItem.price;

    }
      res.send(req.session.user);
  },

  delete: (req, res, next) => {
    const { id } = req.query;
    let { cart } = req.session.user;

    let index = cart.findIndex(item => item.id == id);
    let item = cart[index];
    cart.splice(index, 1);

    req.session.user.total -= item.price;

    res.send(req.session.user);
  },

  checkout: (req, res, next) => {
    req.session.user.cart = [];
    req.session.user.total = 0;

    res.send(req.session.user);
  }
}
