const express = require('express');
const router = express.Router();

const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require('../controllers/people');

// // get data from server
// router.get('/', getPeople);
// // add data to the server
// router.post('/', createPerson);

// router.post('/postman', createPersonPostman);

// // change data on a server
// router.put('/:id', updatePerson);
// // delete data on a server
// router.delete('/:id', deletePerson);

router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
