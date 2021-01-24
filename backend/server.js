const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models')
db.sequelize.sync({force: true}).then(() => {
    console.log('Tablas eliminadas y base actualizada.')
});


require('./routes/numeros.routes')(app)  

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});