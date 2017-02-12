/* eslint-disable */

var res = tmplUtils.multiCollection(5, 25)(function (i) {
  return tmplUtils.getTemplate('_user.js');
});

module.exports = {
  command: 'get_user_list',
  index: 0,
  success: true,
  users: res
};

