

const allowPublicCORS = {
    origin: "*"
}

const allowPrivateCORS = {
    origin: ["http://3.14.11.113:4000", "http://3.14.11.113:4000/upload/product"]
}



module.exports = { allowPrivateCORS, allowPublicCORS };
