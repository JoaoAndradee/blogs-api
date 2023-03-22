const { validateCategory } = require('../services/validations/validationCreateCategory');
const { mapError } = require('../utils/errorMap');
const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { type, message } = validateCategory(req.body);

    if (type) return res.status(mapError(type)).json({ message });

    const result = await categoryService.createCategory(req.body);

    return res.status(201).json({ id: result.dataValues.id, name: result.dataValues.name });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createCategory,
  getAll,
};
