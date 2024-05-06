const app = require('./app/app')

require('dotenv').config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`SwipeSpark Server is open on port ${PORT}`)
})