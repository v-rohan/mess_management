require("dotenv").config({ path: `.env.local` });

const express = require("express");

const app = express();

app.use(express.json({ extended: false }));

// Error handling middleware
app.use((err, req, res, next) => {
	res.status(err.code || 500);
	res.json({ message: err.message || "An unknown error occurred!" });
});

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server listening on port ${process.env.PORT || 8000}`);
});
