

const allowPublicCORS = {
    origin: "*"
}

const allowPrivateCORS = {
    origin: ["http://localhost:4000", "http://localhost:4000/upload/product"]
}



module.exports = { allowPrivateCORS, allowPublicCORS };
