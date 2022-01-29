exports.methodNotAllowed = (req, res, next) => {
    res.status(405).send({ status: 405, 'message': 'Method not allowed' })
};
