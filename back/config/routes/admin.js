const AdminController = require("../../app/controllers/adminController");

console.log("Serving Routes Enabled");

module.exports = app => {
  // medicals
  app.post("/api/admin/condition/create", AdminController.addMedicalConditions);
  app.put(
    "/api/admin/condition/update/:id",
    AdminController.updateMedicalCondition
  );
  app.get("/api/admin/conditions/get", AdminController.getMedicalConditions);
  app.get("/api/admin/condition/get/:id", AdminController.getMedicalCondition);
  app.delete(
    "/api/admin/condition/del/:id",
    AdminController.deleteMedicalCondition
  );

  //   menus
  app.get("/api/admin/menu/get", AdminController.getMenus);
  app.delete("/api/admin/menu/:id", AdminController.deleteMenu);
  app.get("/api/admin/menu/get/:id", AdminController.getMenu);
  app.post("/api/admin/menu/create", AdminController.createMenu);
  app.put("/api/admin/put/menu/:id", AdminController.updateMenu);
};
