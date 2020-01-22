// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Path = require("path");
var Setup = require("./Setup.bs.js");
var ProjectType = require("./ProjectType.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function make(folder) {
  process.env["OCAMLRUNPARAM"] = "b";
  process.env["MERLIN_LOG"] = "-";
  return ProjectType.detect(folder).then((function (projectType) {
                var setupPromise;
                setupPromise = typeof projectType === "number" ? Promise.resolve(/* () */0) : (
                    projectType.tag ? (
                        projectType[/* readyForDev */0] ? Promise.resolve(/* () */0) : Setup.Bsb.run(folder)
                      ) : (
                        projectType[/* readyForDev */0] ? Promise.resolve(/* () */0) : Setup.Esy.run(folder)
                      )
                  );
                return setupPromise.then((function (param) {
                              if (typeof projectType === "number") {
                                if (process.platform === "win32") {
                                  return Promise.reject([
                                              Caml_builtin_exceptions.failure,
                                              "Opam workflow for Windows is not supported yet"
                                            ]);
                                } else {
                                  return Promise.resolve({
                                              command: "opam",
                                              args: /* array */[
                                                "exec",
                                                "ocamllsp"
                                              ],
                                              options: {
                                                env: process.env
                                              }
                                            });
                                }
                              } else if (projectType.tag) {
                                var match = process.platform === "win32";
                                return Promise.resolve({
                                            command: match ? "esy.cmd" : "esy",
                                            args: /* array */[
                                              "-P",
                                              Path.join(folder, ".vscode", "esy"),
                                              "ocamllsp"
                                            ],
                                            options: {
                                              env: process.env
                                            }
                                          });
                              } else {
                                var match$1 = process.platform === "win32";
                                return Promise.resolve({
                                            command: match$1 ? "esy.cmd" : "esy",
                                            args: /* array */[
                                              "exec-command",
                                              "--include-current-env",
                                              "ocamllsp"
                                            ],
                                            options: {
                                              env: process.env
                                            }
                                          });
                              }
                            }));
              }));
}

var Server = {
  make: make
};

function make$1(param) {
  return {
          documentSelector: /* array */[
            {
              scheme: "file",
              language: "ocaml"
            },
            {
              scheme: "file",
              language: "reason"
            }
          ]
        };
}

var Client = {
  make: make$1
};

var LanguageClient = { };

exports.Server = Server;
exports.Client = Client;
exports.LanguageClient = LanguageClient;
/* path Not a pure module */
