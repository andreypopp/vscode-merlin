// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Node = require("./bindings/Node.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("./Utils.bs.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function $less$less(f, g, x) {
  return Curry._1(f, Curry._1(g, x));
}

function getBuildId(responseText) {
  try {
    var json = JSON.parse(responseText);
    var match = Js_json.classify(json);
    if (typeof match === "number") {
      return /* Error */Block.__(1, [" Response from Azure wasn\'t an object "]);
    } else if (match.tag === /* JSONObject */2) {
      var match$1 = Js_dict.get(match[0], "value");
      if (match$1 !== undefined) {
        var match$2 = Js_json.classify(Caml_option.valFromOption(match$1));
        if (typeof match$2 === "number") {
          return /* Error */Block.__(1, [" Response from Azure did not contain build \'value\' "]);
        } else if (match$2.tag === /* JSONArray */3) {
          var o = Caml_array.caml_array_get(match$2[0], 0);
          var match$3 = Js_json.classify(o);
          if (typeof match$3 === "number") {
            return /* Error */Block.__(1, [" First item in the \'value\' field array isn\'t an object as expected "]);
          } else if (match$3.tag === /* JSONObject */2) {
            var match$4 = Js_dict.get(match$3[0], "id");
            if (match$4 !== undefined) {
              var match$5 = Js_json.classify(Caml_option.valFromOption(match$4));
              if (typeof match$5 === "number") {
                return /* Error */Block.__(1, [" Field id was expected to be a number "]);
              } else if (match$5.tag === /* JSONNumber */1) {
                return /* Ok */Block.__(0, [match$5[0]]);
              } else {
                return /* Error */Block.__(1, [" Field id was expected to be a number "]);
              }
            } else {
              return /* Error */Block.__(1, [" Field id was missing "]);
            }
          } else {
            return /* Error */Block.__(1, [" First item in the \'value\' field array isn\'t an object as expected "]);
          }
        } else {
          return /* Error */Block.__(1, [" Response from Azure did not contain build \'value\' "]);
        }
      } else {
        return /* Error */Block.__(1, ["Field 'value' in Azure's response was undefined"]);
      }
    } else {
      return /* Error */Block.__(1, [" Response from Azure wasn\'t an object "]);
    }
  }
  catch (exn){
    return /* Error */Block.__(1, [" Failed to parse response from Azure "]);
  }
}

function getDownloadURL(responseText) {
  try {
    var json = JSON.parse(responseText);
    var match = Js_json.classify(json);
    if (typeof match === "number") {
      return /* Error */Block.__(1, [" Response from Azure wasn\'t an object "]);
    } else if (match.tag === /* JSONObject */2) {
      var match$1 = Js_dict.get(match[0], "resource");
      if (match$1 !== undefined) {
        var match$2 = Js_json.classify(Caml_option.valFromOption(match$1));
        if (typeof match$2 === "number") {
          return /* Error */Block.__(1, [" First item in the \'resource\' field array isn\'t an object as expected "]);
        } else if (match$2.tag === /* JSONObject */2) {
          var match$3 = Js_dict.get(match$2[0], "downloadUrl");
          if (match$3 !== undefined) {
            var match$4 = Js_json.classify(Caml_option.valFromOption(match$3));
            if (typeof match$4 === "number") {
              return /* Error */Block.__(1, [" Field downloadUrl was expected to be a string "]);
            } else if (match$4.tag) {
              return /* Error */Block.__(1, [" Field downloadUrl was expected to be a string "]);
            } else {
              return /* Ok */Block.__(0, [match$4[0]]);
            }
          } else {
            return /* Error */Block.__(1, [" Field downloadUrl was missing "]);
          }
        } else {
          return /* Error */Block.__(1, [" First item in the \'resource\' field array isn\'t an object as expected "]);
        }
      } else {
        return /* Error */Block.__(1, ["Field 'value' in Azure's response was undefined"]);
      }
    } else {
      return /* Error */Block.__(1, [" Response from Azure wasn\'t an object "]);
    }
  }
  catch (exn){
    return /* Error */Block.__(1, [" Failed to parse response from Azure "]);
  }
}

var JSONResponse = {
  CamlArray: /* alias */0,
  getBuildId: getBuildId,
  getDownloadURL: getDownloadURL
};

var restBase = "https://dev.azure.com/arrowresearch/";

var proj = "vscode-merlin";

var match = process.platform;

var os;

switch (match) {
  case "darwin" :
      os = "Darwin";
      break;
  case "linux" :
      os = "Linux";
      break;
  case "win32" :
      os = "Windows";
      break;
  default:
    throw [
          Caml_builtin_exceptions.match_failure,
          /* tuple */[
            "AzurePipelines.re",
            81,
            2
          ]
        ];
}

var artifactName = "cache-" + (String(os) + "-install");

var master = "branchName=refs%2Fheads%2Fmaster";

var filter = "deletedFilter=excludeDeleted&statusFilter=completed&resultFilter=succeeded";

var latest = "queryOrder=finishTimeDescending&$top=1";

function getBuildID(param) {
  return $$Node.Https.getCompleteResponse("" + (String(restBase) + ("/" + (String(proj) + ("/_apis/build/builds?" + (String(filter) + ("&" + (String(master) + ("&" + (String(latest) + "&api-version=4.1")))))))))).then((function (param) {
                return Utils.bindResultAndResolvePromise(getBuildId, param);
              }));
}

function getDownloadURL$1(latestBuildID) {
  return $$Node.Https.getCompleteResponse("" + (String(restBase) + ("/" + (String(proj) + ("/_apis/build/builds/" + (String(latestBuildID) + ("/artifacts?artifactname=" + (String(artifactName) + "&api-version=4.1")))))))).then((function (param) {
                return Utils.bindResultAndResolvePromise(getDownloadURL, param);
              }));
}

exports.$less$less = $less$less;
exports.JSONResponse = JSONResponse;
exports.restBase = restBase;
exports.proj = proj;
exports.os = os;
exports.artifactName = artifactName;
exports.master = master;
exports.filter = filter;
exports.latest = latest;
exports.getBuildID = getBuildID;
exports.getDownloadURL = getDownloadURL$1;
/* match Not a pure module */