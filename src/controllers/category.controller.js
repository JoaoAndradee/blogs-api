const { validateCategory } = require('../services/validations/validationCreateCategory');
const { mapError } = require('../utils/errorMap');
const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { type, message } = validateCategory(req.body);

    console.log('TYPE: ', type);
    console.log('MESSAGE: ', message);

    if (type) return res.status(mapError(type)).json({ message });

    console.log('Não entrou no if');

    const result = await categoryService.createCategory(req.body);

    console.log('RESULT: ', result);

    return res.status(201).json({ id: result.dataValues.id, name: result.dataValues.name });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createCategory,
};
