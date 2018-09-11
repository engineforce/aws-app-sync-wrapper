module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************************!*\
  !*** external "@engineforce/async-lib" ***!
  \*****************************************/
/*! no static exports found */
/*! exports used: asyncMap, asyncReduce */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("@engineforce/async-lib");

/***/ }),
/* 1 */
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 2 */
/*!********************************!*\
  !*** external "lodash/filter" ***!
  \********************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("lodash/filter");

/***/ }),
/* 3 */
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/paul.li/my/git/engineforce/libs/packages/aws-app-sync-wrapper/index.js */4);


/***/ }),
/* 4 */
/*!******************************!*\
  !*** ./index.js + 4 modules ***!
  \******************************/
/*! exports provided: findApis, listTypes, listResolvers, deleteResolvers */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with external "@engineforce/async-lib" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "aws-sdk" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "lodash/filter" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "aws-sdk"
var external_aws_sdk_ = __webpack_require__(1);
var external_aws_sdk_default = /*#__PURE__*/__webpack_require__.n(external_aws_sdk_);

// EXTERNAL MODULE: external "lodash/filter"
var filter_ = __webpack_require__(2);
var filter_default = /*#__PURE__*/__webpack_require__.n(filter_);

// CONCATENATED MODULE: ./src/findApis.js

function loadFindApis(options) {
  return function findApis(apiName) {
    return _findApis(options, apiName);
  };
}

async function _findApis(options, apiName, nextToken) {
  let result = await options.appSync.listGraphqlApis({
    nextToken
  }).promise();
  let apis = result.graphqlApis;

  if (apiName) {
    apis = filter_default()(apis, api => api.name == apiName);
  }

  if (result.nextToken) {
    apis = [...apis, ...(await _findApis(options, apiName, result.nextToken))];
  }

  return apis;
}
// CONCATENATED MODULE: ./src/listTypes.js
function loadListTypes(options) {
  return function listTypes(apiId) {
    return _listTypes(options, apiId);
  };
}

async function _listTypes(options, apiId, nextToken) {
  let result = await options.appSync.listTypes({
    apiId,
    format: 'JSON',
    nextToken
  }).promise();
  let types = result.types;

  if (result.nextToken) {
    types = [...types, ...(await _listTypes(options, apiId, result.nextToken))];
  }

  return types;
}
// EXTERNAL MODULE: external "@engineforce/async-lib"
var async_lib_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/listResolvers.js

function loadListResolvers(options) {
  return async function listResolvers(apiId) {
    let types = await options.listTypes(apiId);
    return Object(async_lib_["asyncReduce"])(types, async (results, type) => {
      let resolvers = await _listResolvers(options, apiId, type.name);
      results.push(...resolvers);
      return results;
    }, []);
  };
}

async function _listResolvers(options, apiId, typeName, nextToken) {
  let result = await options.appSync.listResolvers({
    apiId,
    typeName,
    nextToken
  }).promise();
  let resolvers = result.resolvers;

  if (result.nextToken) {
    resolvers = [...resolvers, ...(await _listResolvers(options, apiId, typeName, result.nextToken))];
  }

  return resolvers;
}
// CONCATENATED MODULE: ./src/deleteResolvers.js

function loadDeleteResolvers(options) {
  return function deleteResolvers(apiId, typeName) {
    return _deleteResolvers(options, apiId);
  };
}

async function _deleteResolvers(options, apiId) {
  let resolvers = await options.listResolvers(apiId);
  await Object(async_lib_["asyncMap"])(resolvers, async resolver => {
    await options.appSync.deleteResolver({
      apiId,
      typeName: resolver.typeName,
      fieldName: resolver.fieldName
    }).promise();
  });
}
// CONCATENATED MODULE: ./index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findApis", function() { return findApis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listTypes", function() { return listTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listResolvers", function() { return index_listResolvers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteResolvers", function() { return deleteResolvers; });





const appSync = new external_aws_sdk_default.a.AppSync();
const findApis = loadFindApis({
  appSync
});
const listTypes = loadListTypes({
  appSync
});
const index_listResolvers = loadListResolvers({
  appSync,
  listTypes
});
const deleteResolvers = loadDeleteResolvers({
  appSync,
  listResolvers: index_listResolvers
});

/***/ })
/******/ ]);