const express = require('express')
const router = express.Router()
const {
  userRegister,
  userLogin,
  userProfile,
  getMe,
  EditProfile
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const multer = require('multer');

// storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, "file" + "-" + Date.now() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


router.post('/register', userRegister)
router.post('/login', userLogin)
router.put('/:id', upload.single('photo'), protect, EditProfile)
router.get('/:id', protect, userProfile)
router.get('/me', protect, getMe)

module.exports = router
