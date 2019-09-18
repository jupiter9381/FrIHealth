const bcrypt = require("bcryptjs");
const fieldValidation = require("../utils/field-validator");
const User = require("../models/User");
const util = require("util");
const responseHandler = require("../../app/utils/response-handler");
const jwt = require("jsonwebtoken");

const Collection = require("../models/Collection");
const Menu = require("../models/Menu");
var mongo = require('mongodb');
// Users registration.
exports.registerNewUser = (req, res, next) => {
  console.log("REQ BODY REGISTER", req.body);
  if (!fieldValidation(req, res)) return;
  if (req.body.password !== req.body.confirmPassword)
    return responseHandler(res, 401, {
      error: "unmatched password and confirm password"
    });

  createBcrypt(req.body.password)
    .then(hash => {
      return new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      }).save();
    })
    .then(user => {
      responseHandler(res, 201, { code: 1, user });
    })
    .catch(error => {
      if (error.code === 11000) {
        return next(new Error("Username already Exists"));
      }
      next(error);
    });
};

exports.loginUser = (req, res, next) => {
  let foundUser;

  if (!fieldValidation(req, res)) return;

  User.findOne({ username: req.body.username })
    .then(user => {
      console.log("USer", req.body);
      if (!user) throw new Error("User not found");
      foundUser = user;
      return comparePassword(req.body.password, user.password);
    })
    .then(valid => {
      if (!valid) throw new Error("Invalid Password");

      return jwt.sign(
        {
          _id: foundUser._id,
          email: foundUser.username
        },
        "MY_SECRET"
      ); // DO NOT KEEP YOUR SECRET IN THE CODE!
    })
    .then(token => {
      // if (foundUser.username === "admin") {
      //   return responseHandler(res, 200, {code: 1, data: foundUser, token  });
      // }
      responseHandler(res, 200, { code: 1, data: foundUser, token });
    })
    .catch(e => {
      next(e);
    });
};

exports.getUser = (req, res, next) => {
  const id = req.params.id || false;
  if (!id)
    return responseHandler(res, 401, { code: 0, error: "invlalid user id" });

  User.findById(id)
    .then(user => {
      responseHandler(res, 201, { code: 1, user });
    })
    .catch(e => next(e));
};

exports.updateUser = (req, res, next) => {
  const id = req.params.id || false;
  if (!id)
    return responseHandler(res, 200, {
      code: 0,
      message: "invlaid id provided!"
    });

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(updated => responseHandler(res, 201, { code: 1, user: updated }))
    .catch(e => {
      console.log("E");
    });
};

exports.getPaginatedUsers = (req, res, next) => {
  console.log("laya");
  const pageSize = req.query.pageSize || 999999;
  const pageIndex = req.query.pageIndex || 0;
  if (!pageSize || pageIndex < 0)
    return responseHandler(res, 422, { error: "Invalid queries" });
  let parsed = {
    pageSize: parseInt(pageSize),
    pageIndex: parseInt(pageIndex)
  };

  User.find({ username: { $ne: "admin" } })
    .skip(parsed.pageSize * parsed.pageIndex)
    .limit(parsed.pageSize)
    .sort({ createdAt: 1 })
    .then(users => {
      responseHandler(res, 200, { users });
    })
    .catch(e => console.log("e", e));
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      responseHandler(res, 200, { users });
    })
    .catch(e => {
      console.log(e);
      next(e);
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id || false;
  if (!id)
    return responseHandler(res, 200, {
      code: 0,
      message: "invalid user id given."
    });
  console.log("IDDD", id);

  User.findByIdAndDelete(id)
    .then(d => {
      responseHandler(res, 201, {
        code: 1,
        message: "User has been deleted !"
      });
    })
    .catch(e => {
      console.log("Error while deleting the user !");
    });
};

exports.getUsersByCity = async (req, res, next) => {
  const city = req.params.city || false;
  let menus = [];
  let totalMenus = [];
  const users = await User.find({city});

  await Promise.all(users.map(async user => {
    const collection = await Collection.find({user: new mongo.ObjectID(user._id)});
    if(collection.length > 0) {
      menus.push(...collection[0].menus);
    }
  }))
  //let uniquemenus = [...new Set(menus)];
  let unique = {};
  menus.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  uniquemenus = Object.keys(unique);
  
  await Promise.all(uniquemenus.map(async menu => {
    const collection = await Menu.find({_id: new mongo.ObjectID(menu)});
    if(collection.length > 0) {
      totalMenus.push(...collection);
    }
  }))
                                
  responseHandler(res, 201, {
    code: 1,
    menus: totalMenus
  });
};


exports.getMenusByPopularity = async (req, res, next) => {
  let menus = [];
  let totalMenus = [];
  
  const collections = await Collection.find();

  collections.forEach(item => {
    menus.push(...item.menus)
  })

  var frequency = {};
  menus.forEach(function(value) { frequency[value] = 0; });

  var uniques = menus.filter(function(value) {
    return ++frequency[value] == 1;
  });

  uniques.sort(function(a, b) {
    return frequency[b] - frequency[a];
  });


  await Promise.all(uniques.map(async menu => {
    const collection = await Menu.find({_id: new mongo.ObjectID(menu)});
    if(collection.length > 0) {
      totalMenus.push(...collection);
    }
  }))
                                
  responseHandler(res, 201, {
    code: 1,
    menus: totalMenus
  });

};

const createBcrypt = password => {
  const genSalt = util.promisify(bcrypt.genSalt);
  const genHash = util.promisify(bcrypt.hash);
  return genSalt(10).then(salt => {
    return genHash(password, salt);
  });
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};
