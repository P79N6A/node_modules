"use strict";
var queryString = require("qs");
var proto = exports;
var instanceMethods = ["exit", "notify", "pause", "resume"];
var getBody = require('raw-body');
var permittedSocketEvents = [
    "file:reload",
    "browser:reload",
    "browser:notify",
    "browser:location",
    "options:set"
];
/**
 * Does the requested method expect an instance of BrowserSync
 * or raw access to the emitter?
 * @param method
 * @returns {boolean}
 */
function methodRequiresInstance(method) {
    return instanceMethods.indexOf(method) > -1;
}
/**
 * Use BrowserSync options + querystring to create a
 * full HTTP/HTTTPS url.
 *
 * Eg. http://localhost:3000/__browser_sync__?method=reload
 * Eg. http://localhost:3000/__browser_sync__?method=reload&args=core.css
 * Eg. http://localhost:3000/__browser_sync__?method=reload&args=core.css&args=core.min
 *
 * @param args
 * @param url
 * @returns {string}
 */
proto.getUrl = function (args, url) {
    return [
        url,
        require("./config").httpProtocol.path,
        "?",
        queryString.stringify(args)
    ].join("");
};
/**
 * Return a middleware for handling the requests
 * @param {BrowserSync} bs
 * @returns {Function}
 */
proto.middleware = function (bs) {
    return function (req, res) {
        if (req.method === 'POST') {
            return getBody(req, function (err, body) {
                if (err) {
                    var output_1 = [
                        "Error: could not parse JSON.",
                    ];
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    return res.end(output_1.join("\n"));
                }
                try {
                    var _a = JSON.parse(body.toString()), name = _a[0], payload = _a[1];
                    if (permittedSocketEvents.indexOf(name) > -1) {
                        bs.io.sockets.emit(name, payload);
                        return res.end("Browsersync HTTP Protocol received: " + name + " " + JSON.stringify(payload));
                    }
                    else {
                        return res.end("Browsersync HTTP Protocol name not supported: " + name);
                    }
                }
                catch (e) {
                    var output_2 = [
                        "Error: " + e.message,
                    ];
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    return res.end(output_2.join("\n"));
                }
            });
        }
        var params = queryString.parse(req.url.replace(/^.*\?/, ""));
        var output;
        if (!Object.keys(params).length) {
            output = [
                "Error: No Parameters were provided.",
                "Example: http://localhost:3000/__browser_sync__?method=reload&args=core.css"
            ];
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(output.join("\n"));
            return;
        }
        try {
            var bsOrEmitter = methodRequiresInstance(params.method)
                ? bs
                : bs.events;
            require("./public/" + params.method)(bsOrEmitter).apply(null, [
                params.args
            ]);
            output = [
                "Called public API method `.%s()`".replace("%s", params.method),
                "With args: " + JSON.stringify(params.args)
            ];
            res.end(output.join("\n"));
        }
        catch (e) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("Public API method `" + params.method + "` not found.");
            res.end();
            return;
        }
    };
};
//# sourceMappingURL=http-protocol.js.map