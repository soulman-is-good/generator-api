var _res;

_res = tmplUtils.multiCollection(2, 12)(function (i) {
    return tmplUtils.getTemplate('_address_book.js');
});

module.exports = _res;
