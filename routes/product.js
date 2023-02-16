const Product = require("../models/product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(`${prod.title} is deleted`);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const qNum = req.query.num || 3;
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew && qCategory) {
      products = await Product.find({ category: qcagetory })
        .sort({ createdAt: -1 })
        .limit(qNum);
      res.status(200).json(products);
    } else if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(qNum);
    } else if (qCategory) {
      products = await Product.find({ categories: qCategory }).limit(qNum);
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
