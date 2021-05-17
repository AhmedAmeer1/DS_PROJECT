const adminController = require('../controllers/adminController')
const router = require ('express').Router()

console.log('hiiiiiiiiiiiii')

router.get('/users',adminController.getUserDetail)

router.delete('/users/:id',adminController.deleteUser).put(adminController.getUser)


module.exports = router