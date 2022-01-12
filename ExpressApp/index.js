const express = require('express');
const path = require('path')
const app = express();

app.get('/', (req, res) => {
    // res.send('<h3>Hello</h3>');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`)
});