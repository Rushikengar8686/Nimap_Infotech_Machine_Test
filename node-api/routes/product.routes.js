const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page || "1");
    const pageSize = parseInt(req.query.pageSize || "10");
    const offset = (page - 1) * pageSize;

    const [[countResult]] = await db.query(
      "SELECT COUNT(*) AS total FROM product_master"
    );
    const totalRecords = countResult.total;

    const [rows] = await db.query(
      `SELECT 
          p.ProductId, 
          p.ProductName, 
          p.CategoryId, 
          c.CategoryName
       FROM product_master p
       INNER JOIN category_master c ON p.CategoryId = c.CategoryId
       ORDER BY p.ProductId DESC
       LIMIT ? OFFSET ?`,
      [pageSize, offset]
    );

    res.json({
      page,
      pageSize,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pageSize),
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { ProductName, CategoryId } = req.body;

    await db.query(
      "INSERT INTO product_master (ProductName, CategoryId) VALUES (?, ?)",
      [ProductName, CategoryId]
    );

    res.json({ message: "Product created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { ProductName, CategoryId } = req.body;

    await db.query(
      "UPDATE product_master SET ProductName=?, CategoryId=? WHERE ProductId=?",
      [ProductName, CategoryId, req.params.id]
    );

    res.json({ message: "Product updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM product_master WHERE ProductId=?", [
      req.params.id,
    ]);

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
