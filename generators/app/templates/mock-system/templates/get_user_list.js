var _res;

_res = tmplUtils.multiCollection(5, 25)(function (i) {
    return tmplUtils.getTemplate('_user.js');
});

module.exports = {
    "command" : "get_user_list",
    "index" : 0,
    "success" : true,
    "users" : _res
};
