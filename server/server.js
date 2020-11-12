const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const upload = multer({ dest: 'uploads/'})

app.post('/upload', upload.single('file'), (req, res, next) => {;
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)

  }
  res.send(file) 
})

app.listen(3000, () => {
  console.log('listening on 3000')
})