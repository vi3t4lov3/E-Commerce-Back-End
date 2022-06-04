const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: 'products' }],
  })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product, through: ProductTag, as: 'products' }],
  })
    .then((results) => {
      if (!results) {
        res.status(404).json({
          message: `The tags with ID ${req.params.id} not found.`,
        });
        return;
      }
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {tag_name: req.body.tag_name}, {
    where: {
      id: req.params.id,
    },
  })
    .then((results) => {
      if (!results[0]) {
        res.status(404).json({
          message: `The tags with ID ${req.params.id} not found.`,
        });
        return;
      }
      res.json({ message: `${results} : The tag ID ${req.params.id} had updated to new ${req.body.tag_name}`});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((results) => {
      if (!results) {
        res.status(404).json({
          message: `The tags with ID ${req.params.id} not found.`,
        });
        return;
      }
      res.json({message: `${results} - The tags with ID ${req.params.id} had been deleted`});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
