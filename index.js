const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// default options
app.use(fileUpload());

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.get("/metrics", function (req, res) {
	res.status(200).send("Ok");
});

app.post("/upload", function (req, res) {
	const file = req.files.foo;

  if(!file) {
    return res.status(400).send("No file uploaded")
  }

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: `${file.name}`,
		Body: file.data,
	};
	s3.upload(params, function (err, data) {
		if (err) {
			console.log(err);
			return res.status(500).send("An error occured");
		} else {
			return res.status(200).send(data);
		}
	});
});

app.get("/upload", function (req, res) {
	res.send(
		"<form method='post' action='/upload' enctype='multipart/form-data'><input type='file' name='foo'><input type='submit'></form>"
	);
});

app.listen(3000);
