const db = require('../models');
const Product = db.products;

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'El nombre y el precio son obligatorios' });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      imageUrl,
      category
    });

    res.status(201).json({ message: 'Producto creado con éxito', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

exports.getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles del producto', error });
  }
};