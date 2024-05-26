const express = require('express');
const router = express.Router();

const UnidadeController = require("./controllers/UnidadeController");

router.get("/ping", UnidadeController.ping);

router.get("/unidades", UnidadeController.all);
router.get("/unidade/:id", UnidadeController.one);
router.post("/unidade/", UnidadeController.new);
router.put("/unidade/:id",UnidadeController.edit);
router.delete("/unidade/:id", UnidadeController.delete);

module.exports = router;
