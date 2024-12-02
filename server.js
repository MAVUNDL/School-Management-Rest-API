const express = require('express');
const app = express();
const port = 3000; // set port
const EndpointRouting = require("./src/schools/routes");

// middleware
app.use(express.json());
app.use(express.static("public"))


// set home end-point
app.get("/", (req, res) => {
    res.send("Welcome to the School-Information API");
});


// set API URL for Endpoints
app.use("/api/v1/schools", EndpointRouting);


// listen on port
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

