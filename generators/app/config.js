'use strict';

module.exports.files = [{from: '_package.json', to: 'package.json'}];
module.exports.folder = [{from: '_api', to: 'api'}];
module.exports.templates = [{
  from: '_v1-spec.raml',
  to: 'v1-spec.raml',
}];

module.exports.options = [{
  name: 'skip-install',
  desc: 'Whether dependencies should be installed',
  defaults: false,
}, {
  name: 'skip-install-message',
  desc: 'Whether commands run should be shown',
  defaults: false,
}, {
  name: 'skip-welcome-message',
  desc: 'Skips the welcome message',
  defaults: Boolean,
}];

module.exports.createItem = function (item = 'user',
                                      type = 'collection',
                                      itemSchema = 'userSchema',
                                      itemExample = 'userExample') {

  return `${item}:
            type: ${type}
            get:
              headers: !include schemas/cors_headers.yaml
              responses:
                200:
                  body:
                    application/json:
                      schema: !include schemas/${itemSchema}.json
                      example: !include examples/${itemExample}.json`;
};

