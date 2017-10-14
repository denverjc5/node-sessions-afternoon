const users = require('../models/users');
let id = 1;

module.exports = {
 login: ( req, res, next ) => {
   const { username, password } = req.body;
   const thisUser = users.find(user => user.username === username && user.password === password );

   if (thisUser) {
     req.session.user.username = thisUser.username;
     res.send(req.session.user);
   }
   else {
     res.status(500).send('no user');
   }
 },

 register: ( req, res, next ) => {
   const {session } = req;
   const {username, password} = req.body;

   users.push({username, password, id: id++});
   session.user.username = username;
   res.send(session.user);
 },

 signout: ( req, res, next ) => {
    req.session.destroy();
    res.send(req.session);
 },

 getUser: ( req, res, next ) => {
    res.send(req.session.user);
 }














}
