const { groupOperations } = require("../Db/helpers/groupCRUD");

const app = require("express").Router();

app.post("/getGroupData", (req, res) => groupOperations.getGroupData(req, res));
app.post("/addToGroup", (req, res) => {
  groupOperations.addToGroup(req.body, res);
});

module.exports = app;
