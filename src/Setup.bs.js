// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Json = require("@glennsl/bs-json/src/Json.bs.js");
var $$Node = require("./bindings/Node.bs.js");
var Path = require("path");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("./Utils.bs.js");
var $$Option = require("./Option.bs.js");
var Semver = require("semver");
var Vscode = require("vscode");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var $$Request = require("request");
var Bindings = require("./bindings/Bindings.bs.js");
var Filename = require("bs-platform/lib/js/filename.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var AzurePipelines = require("./AzurePipelines.bs.js");
var RequestProgress = require("request-progress");

function run(projectPath) {
  return Vscode.window.withProgress({
                location: 15,
                title: "Setting up toolchain..."
              }, (function (progress) {
                  progress.report({
                        increment: 10
                      });
                  return $$Node.ChildProcess.exec("esy", {
                                cwd: projectPath
                              }).then((function (param) {
                                console.log("Finished running esy");
                                return Promise.resolve(/* () */0);
                              }));
                })).then((function (param) {
                return Promise.resolve(/* Ok */Block.__(0, [/* () */0]));
              }));
}

var Esy = {
  run: run
};

function run$1(param) {
  return Promise.resolve(/* () */0);
}

var Opam = {
  run: run$1
};

function download(url, file, progress, end_, error, data) {
  var stream = RequestProgress($$Request(url));
  $$Node.RequestProgress.onProgress(stream, (function (state) {
          return Curry._1(progress, state.size.transferred / (134 * 1024 * 1024));
        }));
  $$Node.RequestProgress.onData(stream, data);
  $$Node.RequestProgress.onEnd(stream, end_);
  $$Node.RequestProgress.onError(stream, error);
  stream.pipe(Fs.createWriteStream(file));
  return /* () */0;
}

function dropAnEsyJSON(path) {
  return $$Node.Fs.writeFile(path, Bindings.thisProjectsEsyJson);
}

function processDeps(dependencies) {
  var match = Js_dict.get(dependencies, "bs-platform");
  if (match !== undefined) {
    if (Semver.satisfies(Semver.minVersion(match), ">=6.0.0")) {
      return /* Ok */Block.__(0, [/* () */0]);
    } else {
      return /* Error */Block.__(1, ["Bucklescript <7 not supported"]);
    }
  } else {
    return /* Error */Block.__(1, ["'bs-platform' was expected in the 'dependencies' section of the manifest file, but was not found!"]);
  }
}

function toBeBrokenDownNext(manifestJson) {
  var match = Json_decode.optional((function (param) {
          return Json_decode.field("dependencies", (function (param) {
                        return Json_decode.dict(Json_decode.string, param);
                      }), param);
        }), manifestJson);
  var match$1 = Json_decode.optional((function (param) {
          return Json_decode.field("devDependencies", (function (param) {
                        return Json_decode.dict(Json_decode.string, param);
                      }), param);
        }), manifestJson);
  if (match !== undefined) {
    var dependenciesJson = Caml_option.valFromOption(match);
    if (match$1 !== undefined) {
      return processDeps(Utils.mergeDicts(dependenciesJson, Caml_option.valFromOption(match$1)));
    } else {
      return processDeps(dependenciesJson);
    }
  } else if (match$1 !== undefined) {
    return processDeps(Caml_option.valFromOption(match$1));
  } else {
    return /* Error */Block.__(1, ["The manifest file doesn't seem to contain `dependencies` or `devDependencies` property"]);
  }
}

function run$2(projectPath) {
  var manifestPath = Path.join(projectPath, "package.json");
  var folder = Curry._1(Filename.dirname, manifestPath);
  return $$Node.Fs.readFile(manifestPath).then((function (manifest) {
                return $$Option.toPromise("Failed to parse manifest file", $$Option.$great$great$pipe($$Option.$great$great$pipe(Json.parse(manifest), toBeBrokenDownNext), (function (param) {
                                  if (param.tag) {
                                    return Promise.resolve(/* Error */Block.__(1, [param[0]]));
                                  } else {
                                    var folder$1 = folder;
                                    var esyJsonTargetDir = Path.join(folder$1, ".vscode", "esy");
                                    return $$Node.Fs.mkdir(true, esyJsonTargetDir).then((function (param) {
                                                  var path = Filename.concat(esyJsonTargetDir, "esy.json");
                                                  return $$Node.Fs.writeFile(path, Bindings.thisProjectsEsyJson).then((function (param) {
                                                                  return Vscode.window.withProgress({
                                                                              location: 15,
                                                                              title: "Setting up toolchain..."
                                                                            }, (function (progress) {
                                                                                progress.report({
                                                                                      increment: 10
                                                                                    });
                                                                                var hiddenEsyRoot = Path.join(projectPath, ".vscode", "esy");
                                                                                return $$Node.ChildProcess.exec("esy i -P " + hiddenEsyRoot, {
                                                                                                      cwd: projectPath
                                                                                                    }).then((function (param) {
                                                                                                      progress.report({
                                                                                                            increment: 10
                                                                                                          });
                                                                                                      return AzurePipelines.getBuildID(/* () */0).then(AzurePipelines.getDownloadURL).then((function (r) {
                                                                                                                    if (r.tag) {
                                                                                                                      return Promise.resolve(/* Error */Block.__(1, [r[0]]));
                                                                                                                    } else {
                                                                                                                      var downloadUrl = r[0];
                                                                                                                      console.log("download", downloadUrl);
                                                                                                                      var lastProgress = {
                                                                                                                        contents: 0
                                                                                                                      };
                                                                                                                      return new Promise((function (resolve, param) {
                                                                                                                                    return download(downloadUrl, Path.join(hiddenEsyRoot, "cache.zip"), (function (progressFraction) {
                                                                                                                                                  var percent = progressFraction * 80.0 | 0;
                                                                                                                                                  progress.report({
                                                                                                                                                        increment: percent - lastProgress.contents | 0
                                                                                                                                                      });
                                                                                                                                                  lastProgress.contents = percent;
                                                                                                                                                  return /* () */0;
                                                                                                                                                }), (function (param) {
                                                                                                                                                  return resolve(/* Ok */Block.__(0, [/* () */0]));
                                                                                                                                                }), (function (_e) {
                                                                                                                                                  return resolve(/* Error */Block.__(1, ["Failed to download " + (String(downloadUrl) + " ")]));
                                                                                                                                                }), (function (param) {
                                                                                                                                                  return /* () */0;
                                                                                                                                                }));
                                                                                                                                  }));
                                                                                                                    }
                                                                                                                  }));
                                                                                                    })).then((function (_result) {
                                                                                                    return $$Node.ChildProcess.exec("unzip cache.zip", {
                                                                                                                cwd: hiddenEsyRoot
                                                                                                              });
                                                                                                  })).then((function (param) {
                                                                                                  return $$Node.ChildProcess.exec("esy import-dependencies -P " + hiddenEsyRoot, {
                                                                                                              cwd: hiddenEsyRoot
                                                                                                            });
                                                                                                })).then((function (param) {
                                                                                                return $$Node.ChildProcess.exec("esy build -P " + hiddenEsyRoot, {
                                                                                                            cwd: hiddenEsyRoot
                                                                                                          });
                                                                                              })).then((function (param) {
                                                                                              return Promise.resolve(/* () */0);
                                                                                            }));
                                                                              }));
                                                                })).then((function (param) {
                                                                return Promise.resolve(/* Ok */Block.__(0, [/* () */0]));
                                                              }));
                                                }));
                                  }
                                })));
              }));
}

var Bsb = {
  download: download,
  dropAnEsyJSON: dropAnEsyJSON,
  processDeps: processDeps,
  toBeBrokenDownNext: toBeBrokenDownNext,
  run: run$2
};

exports.Esy = Esy;
exports.Opam = Opam;
exports.Bsb = Bsb;
/* fs Not a pure module */
