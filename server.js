const { app } = require("./app")
const https = require("https");

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Sever started at http://localhost:${PORT}`);
})