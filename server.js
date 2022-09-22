const express = require('express'); 

const app = express();

//Routes
app.get('/', (request, response) => response.send('Hello World'));

const port = process.env.PORT || 8000; //uses either production or port 8000 for development

app.listen(port, () => console.log("Server started on port " + port));

