

const allowPublicCORS = {
    origin: "*"
}

const allowPrivateCORS = {
    origin: ["http://3.14.11.113:4000"]
}



module.exports = { allowPrivateCORS, allowPublicCORS };
