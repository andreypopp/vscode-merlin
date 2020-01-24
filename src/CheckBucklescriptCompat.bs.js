// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Utils = require("./Utils.bs.js");
var Semver = require("semver");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function processDeps(dependencies) {
  var match = Js_dict.get(dependencies, "bs-platform");
  if (match !== undefined) {
    if (Semver.satisfies(Semver.minVersion(match), ">=6.0.0")) {
      return /* Ok */Block.__(0, [/* () */0]);
    } else {
      return /* Error */Block.__(1, ["Bucklescript <6 not supported"]);
    }
  } else {
    return /* Error */Block.__(1, ["'bs-platform' was expected in the 'dependencies' section of the manifest file, but was not found!"]);
  }
}

function run(manifestJson) {
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

exports.processDeps = processDeps;
exports.run = run;
/* semver Not a pure module */
