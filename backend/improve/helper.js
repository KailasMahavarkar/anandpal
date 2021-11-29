const isMode = (mode) => process.env.MODE === mode;

const MODE = process.env.MODE;

const HOSTNAME = isMode("DEV")
	? process.env.LOCAL_HOSTNAME
	: process.env.HOSTNAME;

const url = (endpoint) => {
	return `${HOSTNAME}${endpoint || ''}`;
};

const routes = [url(), url("/upload/product")];

const allowPublicCORS = {
	origin: "*",
};

const allowPrivateCORS = {
	origin: routes,
};

module.exports = {
	allowPrivateCORS,
	allowPublicCORS,
	url,
	routes,
	HOSTNAME,
	isMode,
    MODE
};
