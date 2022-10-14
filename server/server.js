require("dotenv").config({ path: `.env.local` });

const express = require("express");

const app = express();

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server listening on port ${process.env.PORT || 8000}`);
});
