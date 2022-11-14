const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

/// works 
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products 
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/// works
// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

/// works
router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/// works
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(categoryData); /// returned id
  } catch (err) {
    res.status(500).json(err);
  }
});

/// Option 1 - works w/ question
// router.delete("/:id", (req, res) => {
//   Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedCategory) => {
//       res.json(deletedCategory); /// returned 1. Why??
//     })
//     .catch((err) => res.json(err))
// });

/// Option 2 - works w/ question
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData); /// returned 1. Why??
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
