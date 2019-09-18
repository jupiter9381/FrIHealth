const Collection = require("../models/Collection");
const resHandler = require("../utils/response-handler");

exports.createOrUpdateCollection = async (req, res, next) => {
  const userId = req.params.id || false;

  if (!userId) return resHandler(res, 400, { error: "invalid user id given" });
  try {
    const collection = await Collection.findOneAndUpdate(
      { collectionName: req.body.collectionName },

      {
        $set: { user: req.body.user, collectionName: req.body.collectionName },
        $addToSet: { menus: req.body.menuId }
      },
      { new: true, upsert: true }
    );
    console.log("Created Collections", collection);
    if (collection) resHandler(res, 201, { code: 1 });
    else resHandler(res, 200, { message: "Please Try again Pal" });
  } catch (e) {
    console.log("Error ");
    next(e);
  }
};

exports.getMyCollections = async (req, res, next) => {
  console.log("Aik mint diata");
  const userId = req.params.id || false;
  if (!userId) return resHandler(res, 400, { error: "invalid user id given" });

  try {
    const myCollections = await Collection.find({ user: userId }).populate(
      "menus"
    );
    console.log("My Collections", myCollections);
    if (!myCollections)
      resHandler(res, 201, { code: 2, message: "No Collections" });
    resHandler(res, 200, { code: 1, data: myCollections });
  } catch (e) {
    next(e);
  }
};

exports.deleteCompleteCollection = (req, res, next) => {
  const id = req.params.id || false;
  if (!id) return res.send("id is not given");

  Collection.findByIdAndDelete(id)
    .then(d => resHandler(res, 201, { code: 1 }))
    .catch(e => resHandler(res, 400, { error: e.msg }));
};

exports.deleteMenuFromCollection = async (req, res, next) => {
  // const userId = req.params.id || false;
  const collection_id = req.params.collection_id || false;
  const menuId = req.params.menuId || false;
  if (!collection_id || !menuId)
    return resHandler(res, 400, { error: "Please provide id with params" });

  console.log(collection_id, menuId);

  try {
    const delteted = await Collection.findOneAndUpdate(
      { _id: collection_id },
      { $pull: { menus: menuId } }
    );
    console.log("DELETED RESULT", delteted);
    resHandler(res, 201, { code: 1 });
  } catch (e) {
    console.log("Error while deleting the Menu from your collections");
    next(e);
  }
};
