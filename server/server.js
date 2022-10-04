//Use "npm run server", to run server with nodemon
const express = require('express'); 
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors')
const app = express();
const indexRouter = require('./routes/index');

const uri = "mongodb+srv://UTSCHub_Admin:LGMSRdTNPrdVjEw9@cluster0.pcmxj1f.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
//public folder to store static files
app.use(express.static('public'));

app.use(cors());

// Initialize middleware
app.use(express.json({extended: false}));

app.use('/', indexRouter);

//Route Definitions
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));
app.use('/api/auth', require('./routes/auth'));

const port = process.env.PORT || 8000; //uses either production or port 8000 for development

app.listen(port, () => console.log("Server started on port " + port));

