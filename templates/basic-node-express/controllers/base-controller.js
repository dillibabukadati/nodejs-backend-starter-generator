exports.index = (req, res) => {
    console.log(req.headers)
    res.send('Hello World');
}