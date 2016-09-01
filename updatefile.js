'use strict';

var path = require('path');
var isValid = require('is-valid-app');
var del = require('delete');

module.exports = function(app) {
  if (!isValid(app, 'updater-contributing')) return;

  var files = ['contributing{,.md}', 'PULL_REQUEST_TEMPLATE{,.md}', 'ISSUE_TEMPLATE{,.md}'];

  /**
   * Runs the [copy](#copy) and [del](#del) tasks.
   *
   * ```sh
   * $ gen contributing
   * ```
   * @name contributing
   * @api public
   */

  app.task('default', ['copy', 'del']);

  /**
   * Copy `contributing`, `issue_template` and `pull_request_template`
   * files to the `.github` directory. Files can also have a `.md` extension.
   *
   * ```sh
   * $ gen contributing:copy
   * ```
   * @name contributing:copy
   * @api public
   */

  app.task('copy', function() {
    return app.src(files, {cwd: app.cwd})
      .pipe(app.dest(path.join(app.cwd, '.github')));
  });

  /**
   * Deletes `contributing`, `issue_template` and `pull_request_template`
   * files from the current working directory. Files can also have a `.md` extension.
   *
   * ```sh
   * $ gen contributing:del
   * ```
   * @name contributing:del
   * @api public
   */

  app.task('del', function(cb) {
    del(files, {cwd: app.cwd}, cb);
  });
};

