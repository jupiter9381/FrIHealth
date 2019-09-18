const Condition = require("../models/Conditions");
const Menu = require("../models/Menu");

const respHandler = require("../utils/response-handler");
const fieldValidator = require("../utils/field-validator");

exports.addMedicalConditions = async (req, res, next) => {
  console.log("Creating the conditions", req.body);

  try {
    const condition = await Condition.create(req.body);
    console.log("Condtion created", condition);
    respHandler(res, 201, { code: 1 });
  } catch (e) {
    console.log("Error while creating the condition");
  }
};

exports.updateMedicalCondition = async (req, res, next) => {
  const conditionId = req.params.id || false;
  if (!conditionId) return next(new Error("Ahhh Please provide valid id !"));

  try {
    const updatedCondtion = await Condition.findByIdAndUpdate(
      conditionId,
      req.body
    );
    console.log("Updated!!!!");
    respHandler(res, 201, { code: 1 });
  } catch (e) {
    console.log("Error while updating the conditon", e);
    next(e);
  }
};

exports.deleteMedicalCondition = async (req, res, next) => {
  const id = req.params.id || false;
  console.log("Hello there im here to remove !");
  if (!id)
    return respHandler(res, 400, {
      error: "invalid id while delete condition"
    });
  try {
    const conditionDeleted = await Condition.findByIdAndDelete(id);
    if (conditionDeleted) console.log("The condtion has been removed");
    const removedFromMenus = await Menu.updateMany(
      { conditions: id },
      { $pull: { conditions: id } }
    );
    console.log("Removed status for Menus", removedFromMenus);
    respHandler(res, 201, { code: 1 });
  } catch (e) {
    next(e);
  }
};

exports.getMedicalConditions = async (req, res, next) => {
  try {
    const conditions = await Condition.find();
    respHandler(res, 200, { code: 1, data: conditions });
  } catch (e) {
    console.log("Error while getting conditons", e);
  }
};

exports.getMedicalCondition = async (req, res, next) => {
  const conditionId = req.params.id || false;
  if (!conditionId)
    return next(new Error("Ahhh Please provide valid id at del conditon !"));

  try {
    const condition = await Condition.findById(conditionId).populate("menus");
    respHandler(res, 200, { code: 1, data: condition });
  } catch (e) {
    console.log("Error while getting conditons", e);
  }
};

exports.createMenu = async (req, res, next) => {
  console.log("Creating menu", req.body);

  try {
    const newMenu = await Menu.create(req.body);
    if (!newMenu) respHandler(res, 200, { message: "unknown error" });
    if (newMenu) respHandler(res, 201, { code: 1 });
    console.log("New Menu created ", newMenu);
  } catch (e) {
    console.log("Error while creating the menu", e);
  }
};
exports.deleteMenu = async (req, res, next) => {
  const id = req.params.id || false;
  if (!id)
    return next(new Error("Ahhh Please provide valid id at Update Menu!"));
  try {
    const menuDeleted = await Menu.findByIdAndDelete(id);
    console.log("Menu Detled", menuDeleted);
    const conditionsUpdated = await Condition.updateMany(
      { menus: id },
      { $pull: { menus: id } }
    );
    console.log("Condtions", conditionsUpdated);
    respHandler(res, 201, { code: 1 });
  } catch (e) {
    next(e);
  }
};

exports.updateMenu = async (req, res, next) => {
  const id = req.params.id || false;
  console.log("!!!", req.body);

  if (!id)
    return next(new Error("Ahhh Please provide valid id at Update Menu!"));
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(id, req.body);
    if (updatedMenu) respHandler(res, 201, { code: 1 });
    console.log("Updated Menu is !", updatedMenu);
  } catch (e) {
    console.log("Error while updating the menu !", e);
    next(e);
  }
};

exports.getMenus = async (req, res, next) => {
  try {
    if (req.query.q) {
      let q = req.query.q;
      console.log(`/${q}/`);
      const queryResult = await Menu.find({
        name: { $regex: `${q}`, $options: "i" }
      });
      return respHandler(res, 200, { data: queryResult, code: 1 });
    }
    const menus = await Menu.find();
    respHandler(res, 200, { code: 1, data: menus });
  } catch (e) {
    console.log("Error while fetching menus");
    next(e);
  }
};

exports.getMenu = async (req, res, next) => {
  const id = req.params.id || false;

  if (!id)
    return next(new Error("Ahhh Please provide valid id at Update Menu!"));
  try {
    const menu = await Menu.findById(id).populate("conditions");
    respHandler(res, 200, { code: 1, data: menu });
  } catch (e) {
    console.log("Error while fetching menus");
    next(e);
  }
};
