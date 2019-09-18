console.log("API Routes Enabled");
const resp = require("../../app/utils/response-handler");
const userAut = require("../../app/controllers/user-auth");
const validations = require("../custom-middlewares/validations");
const userCont = require("../../app/controllers/user");

module.exports = app => {
  app.post("/api/user/login", validations.loginValidations, userAut.loginUser);
  app.post("/api/user/register", userAut.registerNewUser);
  app.put("/api/user/:id", userAut.updateUser);
  app.delete("/api/user/:id", userAut.deleteUser);
  app.get("/api/users", userAut.getPaginatedUsers);
  app.get("/api/user/:id", userAut.getUser);

  //user side wow fuckoff
  app.get("/api/user/myCollection/:id", userCont.getMyCollections);
  app.post("/api/user/:id/save/menu", userCont.createOrUpdateCollection);
  app.delete("/api/user/collection/:id", userCont.deleteCompleteCollection);
  app.delete(
    "/api/user/menu/:collection_id/:menuId",
    userCont.deleteMenuFromCollection
  );
};
