const router = require("express").Router();
const categoryController = require("../controller/categoryController");

router.post("/addCategory", categoryController.addCategory);
router.get("/getCategory", categoryController.getCategory);
router.get("/vegetables", categoryController.getAllVegetables);
router.get("/vegetables/:id", categoryController.getParticularVegetable);
router.put('/update_vegetable/:id', categoryController.updateVeggies);
router.put('/update_seeds/:id', categoryController.updateSeeds);
router.put('/update_fertilizer/:id', categoryController.updateFertilizer)
router.get("/seeds", categoryController.getAllSeeds);
router.get("/seeds/:id", categoryController.getParticularSeed);
router.get("/fertilizer", categoryController.getAllFertilizers);
router.get("/fertilizer/:id", categoryController.getParticularFertilizer);

module.exports = router;
