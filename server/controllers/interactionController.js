
exports.getFriends = async function getFriends(req, res, next) {
    res.json([{
            id: 1,
            name: "F1",
          }, {
            id: 2,
            name: "F 2",
    }]);
}