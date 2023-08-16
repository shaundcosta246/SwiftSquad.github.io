const express = require("express");
const app = express();

const router = express.Router()

const {getAllProducts, getAllProductsTesting} = require("../controllers/products")

router.route("/testing").get(getAllProductsTesting);
router.route("/").get(getAllProducts);


module.exports = router;