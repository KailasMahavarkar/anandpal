const cors = require("cors");


const allowPublicCORS = {
    origin: "*"
}

const allowPrivateCORS = {
    origin: "http://localhost:4000"
}



module.exports = { allowPrivateCORS, allowPublicCORS };
