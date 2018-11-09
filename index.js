var through = require('through2'),
	gutil = require('gulp-util');

module.exports = function(opts) {

	opts = opts || {};
	opts.tag = opts.tag || 'head';


	return through.obj(function(file, enc, cb) {

		if(file.isNull()) return cb(null, file);
		if(file.isStream()) return cb(new Error("Custom plugin: streams not supported."));


		////////////////////////////////////////////////////////////////////////////////////////////////////

		var serviceworkerScript = "<script>\n"+

				'if ("serviceWorker" in navigator) {\n'+

					'window.addEventListener("load", function() {\n'+

						'"use strict";\n'+

						'navigator.serviceWorker.register("sw.js").then(function(registration) {\n'+

							'console.log("siteVersion");\n'+

							'//console.log("ServiceWorker registration successful with scope: ", registration.scope);\n'+

						"});\n"+

					"});\n"+

				"}";

				//"</script>"

			serviceworkerScript += "</script>\n  </"+opts.tag+">\n";

		////////////////////////////////////////////////////////////////////////////////////////////////////


		var content = file.contents.toString()
		content = content.replace('<\/' + opts.tag + '>', serviceworkerScript);
		file.contents = new Buffer(content)
		cb(null, file)
	})

}
