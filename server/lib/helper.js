const addSpacesToBookshelf = (bookshelf) => {
    if (bookshelf.toLowerCase() === "wanttoread") {
        return "Want to Read"
    } return bookshelf
}

module.exports = {
    addSpacesToBookshelf
}