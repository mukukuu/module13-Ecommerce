const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  //======== find all categories
router.get('/', (req, res) => {
  Category.findAll({ 
    include: {
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id'
      ]
    }
  })
  //err response
  .then(catData => {
      if(!catData) {
      res.status(404).json({ message: 'NO CATOGORY DATA' });
      return;
      }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//======= find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id'
    ]
    }
    })
    //err response
    .then(catData => {
     if(!catData) {
     res.status(404).json({ message: 'NO CATEGORY WITH THIS ID' });
     return;
     }
     res.json(catData);
   })
    .catch(err => {
     console.log(err);
     res.status(500).json(err)
   });
   });

//========= create a new category
router.post('/', (req, res) => {
  Category.create({ 
    category_name: req.body.category_name
  })
  //err response
  .then(catData => res.json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });

//========= update a category by its `id` value
router.put('/:id', (req, res) => { 
  Category.update(req.body, {
    where: {
      id: req.params.id
  }
  })
  //err response
  .then(catData => {
    if(!catData) {
      res.status(404).json({ message: 'NO CATEGORY WITH THIS ID' });
      return;
    }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });
  
//========= delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({ 
    where: {
      id: req.params.id
    }
  })
  //err response
  .then(catData => {
    if(!catData) {
      res.status(404).json({ message: 'NO CATEGORY WITH THIS ID' });
      return;
    }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });

module.exports = router;
