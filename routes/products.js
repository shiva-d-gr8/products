const router = require("express").Router();
const Product = require("../model/Product");

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;

    const snapshotTime =
      req.query.snapshotTime || new Date().toISOString();

    let query = {
      updated_at: {
        $lte: new Date(snapshotTime),
      },
    };

    if (category) {
      query.category = category;
    }

    if (req.query.cursorUpdatedAt && req.query.cursorId) {
      query.$and = [
        {
          $or: [
            {
              updated_at: {
                $lt: new Date(req.query.cursorUpdatedAt),
              },
            },
            {
              updated_at: new Date(req.query.cursorUpdatedAt),
              _id: {
                $lt: req.query.cursorId,
              },
            },
          ],
        },
      ];
    }

    const products = await Product.find(query)
      .sort({
        updated_at: -1,
        _id: -1,
      })
      .limit(limit);

    let nextCursor = null;

    if (products.length > 0) {
      const lastProduct = products[products.length - 1];

      nextCursor = {
        updated_at: lastProduct.updated_at,
        id: lastProduct._id,
      };
    }

    res.status(200).json({
      success: true,
      snapshotTime,
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;