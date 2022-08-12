
if(process.env.NODE_ENV !== 'development'){
	require('dotenv').config()
	serverPort = process.env.PORT
}

module.exports = {
	PORT: serverPort
}