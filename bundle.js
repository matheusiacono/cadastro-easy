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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVNode = exports.VirtualNode = exports.App = undefined;

var _app = __webpack_require__(14);

var _app2 = _interopRequireDefault(_app);

var _virtualNode = __webpack_require__(1);

var _virtualNode2 = _interopRequireDefault(_virtualNode);

var _createVNode = __webpack_require__(19);

var _createVNode2 = _interopRequireDefault(_createVNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.App = _app2.default;
exports.VirtualNode = _virtualNode2.default;
exports.createVNode = _createVNode2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = __webpack_require__(17);

var _store2 = _interopRequireDefault(_store);

var _flatten = __webpack_require__(18);

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var globalState = new _store2.default();
var globalActions = new _store2.default();

var VirtualNode = function () {
  function VirtualNode() {
    _classCallCheck(this, VirtualNode);
  }

  _createClass(VirtualNode, null, [{
    key: 'create',
    value: function create(type, props) {
      for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return {
        type: type,
        props: props || {},
        children: (0, _flatten2.default)(children).filter(function (c) {
          return c != null && c !== false && c !== true;
        })
      };
    }
  }, {
    key: 'render',
    value: function render() {
      throw new Error('render method not implemented for ' + this.name);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return globalState.getStore();
    }
  }, {
    key: 'setState',
    value: function setState(newState) {
      globalState.setStore(newState);
    }
  }, {
    key: 'getActions',
    value: function getActions() {
      return globalActions.getStore();
    }
  }, {
    key: 'setActions',
    value: function setActions(newActions) {
      globalActions.setStore(this.giveStateToActions(newActions));
    }
  }, {
    key: 'giveStateToActions',
    value: function giveStateToActions(actions) {
      var _this = this;

      var wiredActions = {};
      Object.keys(actions).forEach(function (actionName) {
        var action = actions[actionName];
        var actualHandler = function actualHandler() {
          var actionResult = action.apply(undefined, arguments);

          if (typeof actionResult === 'function') {
            actionResult = actionResult(_this.getState(), _this.getActions());
          }

          if (actionResult && !actionResult.then) {
            var newState = actionResult;
            _this.setState(newState);
            VirtualNode.applyState();
          }

          return actionResult;
        };
        wiredActions[actionName] = actualHandler;
      });
      return wiredActions;
    }
  }, {
    key: 'applyState',
    value: function applyState() {
      if (globalActions.getStore().reRender) {
        globalActions.getStore().reRender();
      }
    }
  }, {
    key: 'reRender',
    value: function reRender(fn) {
      globalActions.setStore({ reRender: fn });
    }
  }, {
    key: 'clearState',
    value: function clearState() {
      globalState.clearStore();
    }
  }, {
    key: 'clearActions',
    value: function clearActions() {
      globalActions.clearStore();
    }
  }]);

  return VirtualNode;
}();

exports.default = VirtualNode;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.location = exports.Route = exports.Link = undefined;

var _route = __webpack_require__(20);

var _route2 = _interopRequireDefault(_route);

var _link = __webpack_require__(23);

var _link2 = _interopRequireDefault(_link);

var _location = __webpack_require__(24);

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Link = _link2.default;
exports.Route = _route2.default;
exports.location = _location2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setProp = function setProp(element, name, value) {
  var $el = element;
  if (typeof value === 'function') {
    $el[name] = value;
  } else if (value) {
    $el.setAttribute(name, value);
  }

  if (value == null || value === false) {
    $el.removeAttribute(name);
  }
};

exports.default = setProp;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var conformToMask = function conformToMask(val, maskToConform) {
  var value = '' + val;
  var i = 0;
  var size = value.length;
  return maskToConform.split('').map(function (x) {
    if (value.length > i) {
      if (x !== 'X') {
        size += 1;
        return x;
      }
      var char = value[i];
      i += 1;
      return char;
    }
    return x;
  }).slice(0, size).join('');
};

exports.default = conformToMask;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cpfMask = 'XXX.XXX.XXX-XX';
exports.default = cpfMask;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var phoneMask = function phoneMask(x) {
  return x.length < 11 ? '(XX) XXXX-XXXX' : '(XX) XXXXX-XXXX';
};

exports.default = phoneMask;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lib = __webpack_require__(0);

__webpack_require__(31);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_VirtualNode) {
  _inherits(Loader, _VirtualNode);

  function Loader() {
    _classCallCheck(this, Loader);

    return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).apply(this, arguments));
  }

  _createClass(Loader, null, [{
    key: 'render',
    value: function render(props) {
      return (0, _lib.createVNode)(
        'div',
        _extends({}, props, { 'class': 'loader' }),
        (0, _lib.createVNode)('div', null),
        (0, _lib.createVNode)('div', null),
        (0, _lib.createVNode)('div', null)
      );
    }
  }]);

  return Loader;
}(_lib.VirtualNode);

exports.default = Loader;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(33);

var _lib = __webpack_require__(0);

var _cpfInput = __webpack_require__(34);

var _cpfInput2 = _interopRequireDefault(_cpfInput);

var _phoneInput = __webpack_require__(37);

var _phoneInput2 = _interopRequireDefault(_phoneInput);

var _loader = __webpack_require__(7);

var _loader2 = _interopRequireDefault(_loader);

var _validateCpf = __webpack_require__(38);

var _validateCpf2 = _interopRequireDefault(_validateCpf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validator = {
  name: function name(value) {
    return !!(value && value.length > 2);
  },
  cpf: function cpf(value) {
    return !!(value && value.length === 11 && (0, _validateCpf2.default)(value));
  },
  phone: function phone(value) {
    return !!(value && (value.length === 11 || value.length === 10));
  },
  email: function email(value) {
    return !!(value && value.length > 0) && /(.+)@(.+)/.test(value);
  }
};

var UserForm = function (_VirtualNode) {
  _inherits(UserForm, _VirtualNode);

  function UserForm() {
    _classCallCheck(this, UserForm);

    return _possibleConstructorReturn(this, (UserForm.__proto__ || Object.getPrototypeOf(UserForm)).apply(this, arguments));
  }

  _createClass(UserForm, null, [{
    key: 'render',
    value: function render(_ref) {
      var onsubmit = _ref.onsubmit,
          loading = _ref.loading;

      var _getState = this.getState(),
          formState = _getState.formState,
          formValid = _getState.formValid;

      var _getActions = this.getActions(),
          validateForm = _getActions.validateForm,
          setFormState = _getActions.setFormState;

      var formIsValid = function formIsValid() {
        return validator.name(formState.name) && validator.cpf(formState.cpf) && validator.phone(formState.phone) && validator.email(formState.email);
      };

      var inputHandler = function inputHandler(value, field) {
        formState[field] = value;
        setFormState(formState);
        if (validator[field](formState[field])) {
          formValid[field] = validator[field](formState[field]);
          validateForm(formValid);
        }
      };

      var blurHandler = function blurHandler(field) {
        formValid[field] = validator[field](formState[field]);
        validateForm(formValid);
      };

      var submitHandler = function submitHandler(e) {
        e.preventDefault();
        if (!loading && onsubmit && formIsValid()) {
          onsubmit(formState);
        }
      };

      return (0, _lib.createVNode)(
        'div',
        { 'class': 'user-form' },
        (0, _lib.createVNode)(
          'form',
          { onsubmit: submitHandler },
          (0, _lib.createVNode)(
            'label',
            { 'for': 'name' },
            'Nome completo (sem abrevia\xE7\xF5es)'
          ),
          (0, _lib.createVNode)('input', {
            type: 'text',
            id: 'name',
            oninput: function oninput(e) {
              inputHandler(e.target.value, 'name');
            },
            value: formState.name,
            'aria-required': 'true',
            onblur: function onblur() {
              return blurHandler('name');
            },
            'class': !formValid.name && 'invalid'
          }),
          (0, _lib.createVNode)(
            'span',
            { 'class': 'user-form--error-mesage' },
            !formValid.name && 'Campo deve conter 3 caracteres ou mais'
          ),
          (0, _lib.createVNode)(
            'label',
            { 'for': 'email' },
            'E-mail'
          ),
          (0, _lib.createVNode)('input', {
            type: 'text',
            id: 'email',
            oninput: function oninput(e) {
              inputHandler(e.target.value, 'email');
            },
            value: formState.email,
            'aria-required': 'true',
            onblur: function onblur() {
              return blurHandler('email');
            },
            'class': !formValid.email && 'invalid'
          }),
          (0, _lib.createVNode)(
            'span',
            { 'class': 'user-form--error-mesage' },
            !formValid.email && 'Campo deve conter E-mail válido'
          ),
          (0, _lib.createVNode)(
            'label',
            { 'for': 'cpf' },
            'CPF'
          ),
          (0, _lib.createVNode)(_cpfInput2.default, {
            id: 'cpf',
            oninput: function oninput(value) {
              inputHandler(value, 'cpf');
            },
            value: formState.cpf,
            'aria-required': 'true',
            onblur: function onblur() {
              return blurHandler('cpf');
            },
            'class': !formValid.cpf && 'invalid'
          }),
          (0, _lib.createVNode)(
            'span',
            { 'class': 'user-form--error-mesage' },
            !formValid.cpf && 'Campo deve conter CPF válido'
          ),
          (0, _lib.createVNode)(
            'label',
            { 'for': 'phone' },
            'Telefone'
          ),
          (0, _lib.createVNode)(_phoneInput2.default, {
            id: 'phone',
            oninput: function oninput(value) {
              inputHandler(value, 'phone');
            },
            value: formState.phone,
            'aria-required': 'true',
            onblur: function onblur() {
              return blurHandler('phone');
            },
            'class': !formValid.phone && 'invalid'
          }),
          (0, _lib.createVNode)(
            'span',
            { 'class': 'user-form--error-mesage' },
            !formValid.phone && 'Campo deve conter telefone válido'
          ),
          (0, _lib.createVNode)(
            'button',
            { disabled: !formIsValid(), 'class': 'btn-submit' },
            loading ? (0, _lib.createVNode)(_loader2.default, null) : 'Cadastrar'
          )
        )
      );
    }
  }]);

  return UserForm;
}(_lib.VirtualNode);

exports.default = UserForm;


_lib.VirtualNode.setState({
  formValid: {
    name: true,
    cpf: true,
    phone: true,
    email: true
  },

  formState: {
    name: '',
    cpf: '',
    phone: '',
    email: ''
  }
});

_lib.VirtualNode.setActions({
  validateForm: function validateForm(formValid) {
    return { formValid: formValid };
  },
  setFormState: function setFormState(formState) {
    return { formState: formState };
  }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(0);

var _applyMask = __webpack_require__(35);

var _applyMask2 = _interopRequireDefault(_applyMask);

var _numberInput = __webpack_require__(36);

var _numberInput2 = _interopRequireDefault(_numberInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberMask = function (_VirtualNode) {
  _inherits(NumberMask, _VirtualNode);

  function NumberMask() {
    _classCallCheck(this, NumberMask);

    return _possibleConstructorReturn(this, (NumberMask.__proto__ || Object.getPrototypeOf(NumberMask)).apply(this, arguments));
  }

  _createClass(NumberMask, null, [{
    key: 'render',
    value: function render(props) {
      var nodeProps = _extends({}, props);
      var oninput = nodeProps.oninput,
          mask = nodeProps.mask;


      delete nodeProps.oninput;
      delete nodeProps.mask;

      var inputHandler = function inputHandler(e) {
        var unMaskedValue = e.target.value.replace(/\D+/g, '');
        e.target.value = (0, _applyMask2.default)(unMaskedValue, mask);

        if (oninput) {
          var m = typeof mask === 'function' ? mask(unMaskedValue) : mask;
          var countRawSize = m.match(/X/g).length;
          oninput(unMaskedValue.substring(0, countRawSize));
        }
      };

      if (nodeProps.value) {
        nodeProps.value = (0, _applyMask2.default)(nodeProps.value.replace(/\D+/g, ''), mask);
      }

      nodeProps.oninput = function (e) {
        return inputHandler(e);
      };
      return (0, _.createVNode)(_numberInput2.default, nodeProps);
    }
  }]);

  return NumberMask;
}(_.VirtualNode);

exports.default = NumberMask;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(12);

__webpack_require__(13);

var _lib = __webpack_require__(0);

var _router = __webpack_require__(2);

var _userList = __webpack_require__(25);

var _userList2 = _interopRequireDefault(_userList);

var _userCreate = __webpack_require__(32);

var _userCreate2 = _interopRequireDefault(_userCreate);

var _userEdit = __webpack_require__(41);

var _userEdit2 = _interopRequireDefault(_userEdit);

var _db = __webpack_require__(42);

var _db2 = _interopRequireDefault(_db);

var _getUsers = __webpack_require__(43);

var _getUsers2 = _interopRequireDefault(_getUsers);

var _actions = __webpack_require__(44);

var _actions2 = _interopRequireDefault(_actions);

var _state = __webpack_require__(45);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var db = new _db2.default('Aplicacao', 1, 'Cadastros');

var Main = function (_VirtualNode) {
  _inherits(Main, _VirtualNode);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
  }

  _createClass(Main, null, [{
    key: 'render',
    value: function render() {
      var _getState = this.getState(),
          root = _getState.root;

      return (0, _lib.createVNode)(
        'div',
        null,
        (0, _lib.createVNode)(_router.Route, { path: '' + root, render: _userList2.default }),
        (0, _lib.createVNode)(_router.Route, { path: root + 'create', render: _userCreate2.default }),
        (0, _lib.createVNode)(_router.Route, { path: root + 'edit/:id', render: _userEdit2.default })
      );
    }
  }]);

  return Main;
}(_lib.VirtualNode);

_lib.VirtualNode.setState(_state2.default);
_lib.VirtualNode.setActions(_extends({}, _router.location, (0, _actions2.default)(db, _getUsers2.default)));
_lib.VirtualNode.setState({
  root: window.location.pathname.slice(-1) === '/' ? window.location.pathname : window.location.pathname + '/'
});

var _VirtualNode$getActio = _lib.VirtualNode.getActions(),
    loadUsers = _VirtualNode$getActio.loadUsers,
    subscribeRouter = _VirtualNode$getActio.subscribeRouter;

subscribeRouter();
loadUsers();

var app = new _lib.App(Main, document.getElementById('app'));
app.run();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domGenerator = __webpack_require__(15);

var _domGenerator2 = _interopRequireDefault(_domGenerator);

var _virtualNode = __webpack_require__(1);

var _virtualNode2 = _interopRequireDefault(_virtualNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App(component, container) {
    var _this = this;

    _classCallCheck(this, App);

    this.component = component;
    this.container = container;
    this.element = null;
    this.oldNode = null;

    _virtualNode2.default.reRender(function () {
      return _this.run();
    });
  }

  _createClass(App, [{
    key: 'run',
    value: function run() {
      var node = this.component.render();
      this.element = _domGenerator2.default.generate(this.container, node, this.oldNode, this.element);
      this.oldNode = node;
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _setProp = __webpack_require__(3);

var _setProp2 = _interopRequireDefault(_setProp);

var _updateElement = __webpack_require__(16);

var _updateElement2 = _interopRequireDefault(_updateElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomGenerator = function () {
  function DomGenerator() {
    _classCallCheck(this, DomGenerator);
  }

  _createClass(DomGenerator, null, [{
    key: 'generate',
    value: function generate(parent, node, oldNode, element) {
      var _this = this;

      var $el = element;
      if (oldNode == null) {
        $el = parent.insertBefore(this.createElement(node), $el);
      } else if (node.type && node.type === oldNode.type) {
        (0, _updateElement2.default)($el, oldNode.props, node.props);
        var oldElements = oldNode.children.map(function (oldChild, i) {
          return $el.childNodes[i];
        });

        var oldChildCursor = 0;
        node.children.forEach(function (newChild) {
          var oldChild = oldNode.children[oldChildCursor];
          _this.generate($el, newChild, oldChild, oldElements[oldChildCursor]);
          oldChildCursor += 1;
        });

        oldElements.slice(oldChildCursor).forEach(function (oldElement) {
          return $el.removeChild(oldElement);
        });
      } else {
        var nextSibling = $el;
        $el = parent.insertBefore(this.createElement(node), $el);
        parent.removeChild(nextSibling);
      }
      return $el;
    }
  }, {
    key: 'createElement',
    value: function createElement(node) {
      var _this2 = this;

      var element = typeof node === 'string' || typeof node === 'number' ? document.createTextNode(node) : document.createElement(node.type);

      if (node.children) {
        node.children.map(function (child) {
          return _this2.createElement(child);
        }).forEach(function (child) {
          element.appendChild(child);
        });
      }

      if (node.props instanceof Object) {
        Object.keys(node.props).forEach(function (name) {
          (0, _setProp2.default)(element, name, node.props[name]);
        });
      }
      return element;
    }
  }]);

  return DomGenerator;
}();

exports.default = DomGenerator;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _setProp = __webpack_require__(3);

var _setProp2 = _interopRequireDefault(_setProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateElement = function updateElement(element, oldProps, props) {
  Object.keys(_extends({}, oldProps, props)).forEach(function (propName) {
    if (props[propName] !== (propName === 'value' || propName === 'checked' ? element[propName] : oldProps[propName])) {
      (0, _setProp2.default)(element, propName, props[propName]);
    }
  });
};

exports.default = updateElement;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store(store) {
    _classCallCheck(this, Store);

    this.store = _extends({}, store);
  }

  _createClass(Store, [{
    key: "getStore",
    value: function getStore() {
      return _extends({}, this.store);
    }
  }, {
    key: "setStore",
    value: function setStore(newStore) {
      this.store = _extends({}, this.store, newStore);
    }
  }, {
    key: "clearStore",
    value: function clearStore() {
      this.store = {};
    }
  }]);

  return Store;
}();

exports.default = Store;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var flatten = function flatten(list) {
  return list.reduce(function (ac, cur) {
    return ac.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
};

exports.default = flatten;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualNode = __webpack_require__(1);

var _virtualNode2 = _interopRequireDefault(_virtualNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createVNode = function createVNode(type, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return Object.prototype.isPrototypeOf.call(_virtualNode2.default, type) ? type.render(props || {}, children) : _virtualNode2.default.create(type, props, children);
};

exports.default = createVNode;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _verifyRoute = __webpack_require__(21);

var _verifyRoute2 = _interopRequireDefault(_verifyRoute);

var _ = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Route = function (_VirtualNode) {
  _inherits(Route, _VirtualNode);

  function Route() {
    _classCallCheck(this, Route);

    return _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).apply(this, arguments));
  }

  _createClass(Route, null, [{
    key: 'render',
    value: function render(props) {
      var location = props.location || window.location;
      var canRender = (0, _verifyRoute2.default)(props.path, location.pathname);
      var Component = props.render;

      return canRender && (0, _.createVNode)(Component, canRender);
    }
  }]);

  return Route;
}(_.VirtualNode);

exports.default = Route;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _removeTrailingChar = __webpack_require__(22);

var _removeTrailingChar2 = _interopRequireDefault(_removeTrailingChar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyRoute = function verifyRoute(path, url) {
  if (path === url) {
    return true;
  }

  var paths = (0, _removeTrailingChar2.default)(path, '/').split('/');
  var urls = (0, _removeTrailingChar2.default)(url, '/').split('/');

  if (paths.length !== urls.length) {
    return false;
  }

  var params = {};
  var pathAndUrlMatch = true;
  paths.forEach(function (p, i) {
    if (p[0] === ':') {
      params[p.slice(1)] = urls[i];
    } else if (paths[i] !== urls[i]) {
      pathAndUrlMatch = false;
    }
  });

  return pathAndUrlMatch && params;
};

exports.default = verifyRoute;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var removeTrailingChar = function removeTrailingChar(val, char) {
  return val.slice(-1) === char ? val.slice(0, -1) : val;
};

exports.default = removeTrailingChar;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_VirtualNode) {
  _inherits(Link, _VirtualNode);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, null, [{
    key: 'render',
    value: function render(props, children) {
      var to = props.to;

      var nodeProps = _extends({}, props);
      var location = props.location || window.location;

      nodeProps.href = to;
      delete nodeProps.to;

      var clickHandler = function clickHandler(e) {
        if (e.currentTarget.origin === location.origin) {
          e.preventDefault();

          if (to !== location.pathname) {
            window.history.pushState(location.pathname, '', to);
          }
        }
      };

      nodeProps.onclick = clickHandler;

      return (0, _.createVNode)(
        'a',
        nodeProps,
        children
      );
    }
  }]);

  return Link;
}(_.VirtualNode);

exports.default = Link;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var location = {
  updateLocation: function updateLocation() {
    return {};
  },
  navigate: function navigate(url) {
    window.history.pushState(null, '', url);
  },
  subscribeRouter: function subscribeRouter() {
    return function (state, _ref) {
      var updateLocation = _ref.updateLocation;

      function handleLocationChange() {
        updateLocation();
      }

      var fn = window.history.pushState;

      window.history.pushState = function pushStateHandler(data, title, url) {
        fn.call(this, data, title, url);
        window.dispatchEvent(new window.CustomEvent('pushstate', { detail: data }));
      };

      window.addEventListener('pushstate', handleLocationChange);
      window.addEventListener('popstate', handleLocationChange);
    };
  }
};

exports.default = location;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(26);

var _lib = __webpack_require__(0);

var _userTable = __webpack_require__(27);

var _userTable2 = _interopRequireDefault(_userTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserList = function (_VirtualNode) {
  _inherits(UserList, _VirtualNode);

  function UserList() {
    _classCallCheck(this, UserList);

    return _possibleConstructorReturn(this, (UserList.__proto__ || Object.getPrototypeOf(UserList)).apply(this, arguments));
  }

  _createClass(UserList, null, [{
    key: 'render',
    value: function render() {
      var _getState = this.getState(),
          users = _getState.users,
          loadingUsers = _getState.loadingUsers;

      var _getActions = this.getActions(),
          requestUsers = _getActions.requestUsers,
          removeUser = _getActions.removeUser,
          getUser = _getActions.getUser,
          redirectToCreate = _getActions.redirectToCreate;

      return (0, _lib.createVNode)(
        'div',
        null,
        (0, _lib.createVNode)(
          'h1',
          { 'class': 'page-title' },
          'Listagem de Usu\xE1rios'
        ),
        (0, _lib.createVNode)(
          'button',
          { 'class': 'btn-create', role: 'link', onclick: function onclick() {
              return redirectToCreate();
            } },
          'Cadastrar Novo Usu\xE1rio'
        ),
        (0, _lib.createVNode)(_userTable2.default, {
          users: users,
          loadingUsers: loadingUsers,
          removeUser: removeUser || function () {},
          requestUsers: requestUsers || function () {},
          editUser: getUser
        })
      );
    }
  }]);

  return UserList;
}(_lib.VirtualNode);

exports.default = UserList;


_lib.VirtualNode.setState({
  loadingUsers: false,
  users: []
});

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(28);

var _lib = __webpack_require__(0);

var _userRow = __webpack_require__(29);

var _userRow2 = _interopRequireDefault(_userRow);

var _loader = __webpack_require__(7);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserTable = function (_VirtualNode) {
  _inherits(UserTable, _VirtualNode);

  function UserTable() {
    _classCallCheck(this, UserTable);

    return _possibleConstructorReturn(this, (UserTable.__proto__ || Object.getPrototypeOf(UserTable)).apply(this, arguments));
  }

  _createClass(UserTable, null, [{
    key: 'render',
    value: function render(_ref) {
      var users = _ref.users,
          loadingUsers = _ref.loadingUsers,
          removeUser = _ref.removeUser,
          requestUsers = _ref.requestUsers,
          editUser = _ref.editUser;

      return (0, _lib.createVNode)(
        'div',
        null,
        (0, _lib.createVNode)(
          'table',
          null,
          (0, _lib.createVNode)(
            'thead',
            null,
            (0, _lib.createVNode)('th', null),
            (0, _lib.createVNode)(
              'th',
              null,
              'Nome Completo'
            ),
            (0, _lib.createVNode)(
              'th',
              null,
              'E-mail'
            ),
            (0, _lib.createVNode)(
              'th',
              null,
              'CPF'
            ),
            (0, _lib.createVNode)(
              'th',
              null,
              'Telefone'
            ),
            (0, _lib.createVNode)('th', null)
          ),
          (0, _lib.createVNode)(
            'tbody',
            null,
            users.map(function (user) {
              return (0, _lib.createVNode)(_userRow2.default, { user: user, removeUser: removeUser, editUser: editUser });
            })
          )
        ),
        !loadingUsers && users.length === 0 ? (0, _lib.createVNode)(
          'p',
          { 'class': 'empty-table-message' },
          'Neste momento n\xE3o existem dados cadastrados =('
        ) : false,
        (0, _lib.createVNode)(
          'button',
          { 'class': 'btn-request-users', onclick: requestUsers, disabled: loadingUsers },
          loadingUsers ? (0, _lib.createVNode)(_loader2.default, null) : 'Carregar usuários da API novamente'
        )
      );
    }
  }]);

  return UserTable;
}(_lib.VirtualNode);

exports.default = UserTable;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(30);

var _lib = __webpack_require__(0);

var _conformToMask = __webpack_require__(4);

var _conformToMask2 = _interopRequireDefault(_conformToMask);

var _cpfMask = __webpack_require__(5);

var _cpfMask2 = _interopRequireDefault(_cpfMask);

var _phoneMask = __webpack_require__(6);

var _phoneMask2 = _interopRequireDefault(_phoneMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserRow = function (_VirtualNode) {
  _inherits(UserRow, _VirtualNode);

  function UserRow() {
    _classCallCheck(this, UserRow);

    return _possibleConstructorReturn(this, (UserRow.__proto__ || Object.getPrototypeOf(UserRow)).apply(this, arguments));
  }

  _createClass(UserRow, null, [{
    key: 'render',
    value: function render(_ref) {
      var user = _ref.user,
          editUser = _ref.editUser,
          removeUser = _ref.removeUser;

      return (0, _lib.createVNode)(
        'tr',
        null,
        (0, _lib.createVNode)(
          'td',
          null,
          (0, _lib.createVNode)(
            'a',
            { 'class': 'btn-edit', title: 'Editar Usu\xE1rio', onclick: function onclick() {
                return editUser(user.id);
              } },
            (0, _lib.createVNode)('i', { 'class': 'icon-edit' })
          )
        ),
        (0, _lib.createVNode)(
          'td',
          { 'data-label': 'Nome Completo' },
          user.name
        ),
        (0, _lib.createVNode)(
          'td',
          { 'data-label': 'E-Mail' },
          user.email
        ),
        (0, _lib.createVNode)(
          'td',
          { 'data-label': 'CPF' },
          (0, _conformToMask2.default)(user.cpf, _cpfMask2.default)
        ),
        (0, _lib.createVNode)(
          'td',
          { 'data-label': 'Telefone' },
          (0, _conformToMask2.default)(user.phone, (0, _phoneMask2.default)(user.phone))
        ),
        (0, _lib.createVNode)(
          'td',
          null,
          (0, _lib.createVNode)(
            'a',
            { 'class': 'btn-delete', title: 'Excluir Usu\xE1rio', onclick: function onclick() {
                return removeUser(user.id);
              } },
            (0, _lib.createVNode)('i', { 'class': 'icon-delete' })
          )
        )
      );
    }
  }]);

  return UserRow;
}(_lib.VirtualNode);

exports.default = UserRow;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(8);

var _lib = __webpack_require__(0);

var _router = __webpack_require__(2);

var _userForm = __webpack_require__(9);

var _userForm2 = _interopRequireDefault(_userForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserCreate = function (_VirtualNode) {
  _inherits(UserCreate, _VirtualNode);

  function UserCreate() {
    _classCallCheck(this, UserCreate);

    return _possibleConstructorReturn(this, (UserCreate.__proto__ || Object.getPrototypeOf(UserCreate)).apply(this, arguments));
  }

  _createClass(UserCreate, null, [{
    key: 'render',
    value: function render() {
      var _getActions = this.getActions(),
          addUser = _getActions.addUser;

      var _getState = this.getState(),
          submittingForm = _getState.submittingForm,
          root = _getState.root;

      return (0, _lib.createVNode)(
        'div',
        null,
        (0, _lib.createVNode)(
          'h1',
          { 'class': 'page-title' },
          'Novo Usu\xE1rio'
        ),
        (0, _lib.createVNode)(
          'p',
          null,
          (0, _lib.createVNode)(
            _router.Link,
            { 'class': 'go-back', to: root },
            (0, _lib.createVNode)('i', { 'class': 'icon icon-back' }),
            ' Voltar'
          )
        ),
        (0, _lib.createVNode)(_userForm2.default, { onsubmit: addUser, loading: submittingForm })
      );
    }
  }]);

  return UserCreate;
}(_lib.VirtualNode);

exports.default = UserCreate;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lib = __webpack_require__(0);

var _numberMask = __webpack_require__(10);

var _numberMask2 = _interopRequireDefault(_numberMask);

var _cpfMask = __webpack_require__(5);

var _cpfMask2 = _interopRequireDefault(_cpfMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CpfInput = function (_VirtualNode) {
  _inherits(CpfInput, _VirtualNode);

  function CpfInput() {
    _classCallCheck(this, CpfInput);

    return _possibleConstructorReturn(this, (CpfInput.__proto__ || Object.getPrototypeOf(CpfInput)).apply(this, arguments));
  }

  _createClass(CpfInput, null, [{
    key: 'render',
    value: function render(props) {
      return (0, _lib.createVNode)(_numberMask2.default, _extends({ mask: _cpfMask2.default }, props));
    }
  }]);

  return CpfInput;
}(_lib.VirtualNode);

exports.default = CpfInput;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conformToMask = __webpack_require__(4);

var _conformToMask2 = _interopRequireDefault(_conformToMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyMask = function applyMask(value, mask) {
  var m = typeof mask === 'function' ? mask(value) : mask;
  return (0, _conformToMask2.default)(value, m);
};

exports.default = applyMask;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberInput = function (_VirtualNode) {
  _inherits(NumberInput, _VirtualNode);

  function NumberInput() {
    _classCallCheck(this, NumberInput);

    return _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).apply(this, arguments));
  }

  _createClass(NumberInput, null, [{
    key: 'render',
    value: function render(props) {
      var nodeProps = _extends({}, props);
      var onlyNumbers = function onlyNumbers(e) {
        if (e.charCode > 0 && Number.isNaN(parseInt(e.key, 10)) && !(e.ctrlKey && (e.key === 'v' || e.key === 'c'))) {
          e.preventDefault();
        }
      };

      nodeProps.type = 'text';
      nodeProps.onkeypress = function (e) {
        return onlyNumbers(e);
      };

      return (0, _.createVNode)('input', nodeProps);
    }
  }]);

  return NumberInput;
}(_.VirtualNode);

exports.default = NumberInput;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lib = __webpack_require__(0);

var _numberMask = __webpack_require__(10);

var _numberMask2 = _interopRequireDefault(_numberMask);

var _phoneMask = __webpack_require__(6);

var _phoneMask2 = _interopRequireDefault(_phoneMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneInput = function (_VirtualNode) {
  _inherits(PhoneInput, _VirtualNode);

  function PhoneInput() {
    _classCallCheck(this, PhoneInput);

    return _possibleConstructorReturn(this, (PhoneInput.__proto__ || Object.getPrototypeOf(PhoneInput)).apply(this, arguments));
  }

  _createClass(PhoneInput, null, [{
    key: 'render',
    value: function render(props) {
      return (0, _lib.createVNode)(_numberMask2.default, _extends({ mask: _phoneMask2.default }, props));
    }
  }]);

  return PhoneInput;
}(_lib.VirtualNode);

exports.default = PhoneInput;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getCpfDigit = __webpack_require__(39);

var _getCpfDigit2 = _interopRequireDefault(_getCpfDigit);

var _getCpfSum = __webpack_require__(40);

var _getCpfSum2 = _interopRequireDefault(_getCpfSum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateCpf(cpf) {
  if (cpf.length < 11) {
    return false;
  }

  var equalNumbers = cpf.split('').reduce(function (ac, cur) {
    return ac === cur ? cur : false;
  }, cpf.slice(0, 1));
  if (equalNumbers !== '0' && !equalNumbers) {
    var digits = cpf.split('').slice(9);

    if ((0, _getCpfDigit2.default)((0, _getCpfSum2.default)(10, cpf.split('').slice(0, 9).map(function (x) {
      return parseInt(x, 10);
    }))) !== parseInt(digits[0], 10)) {
      return false;
    }
    if ((0, _getCpfDigit2.default)((0, _getCpfSum2.default)(11, cpf.split('').slice(0, 10).map(function (x) {
      return parseInt(x, 10);
    }))) !== parseInt(digits[1], 10)) {
      return false;
    }

    return true;
  }
  return false;
}

exports.default = validateCpf;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCpfDigit = function getCpfDigit(sum) {
  var module = sum % 11;
  return module < 2 ? 0 : 11 - module;
};

exports.default = getCpfDigit;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCpfSum = function getCpfSum(ref, numbers) {
  return numbers.reduce(function (ac, cur, i) {
    return ac + cur * (ref - i);
  }, 0);
};

exports.default = getCpfSum;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(8);

var _lib = __webpack_require__(0);

var _router = __webpack_require__(2);

var _userForm = __webpack_require__(9);

var _userForm2 = _interopRequireDefault(_userForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserEdit = function (_VirtualNode) {
  _inherits(UserEdit, _VirtualNode);

  function UserEdit() {
    _classCallCheck(this, UserEdit);

    return _possibleConstructorReturn(this, (UserEdit.__proto__ || Object.getPrototypeOf(UserEdit)).apply(this, arguments));
  }

  _createClass(UserEdit, null, [{
    key: 'render',
    value: function render(_ref) {
      var id = _ref.id;

      var _getActions = this.getActions(),
          editUser = _getActions.editUser,
          navigate = _getActions.navigate;

      var _getState = this.getState(),
          formState = _getState.formState,
          submittingForm = _getState.submittingForm,
          root = _getState.root;

      if (!formState.id || !id || Number.isNaN(parseInt(id, 10))) {
        navigate(root);
      }

      return (0, _lib.createVNode)(
        'div',
        null,
        (0, _lib.createVNode)(
          'h1',
          { 'class': 'page-title' },
          'Edi\xE7\xE3o de Usu\xE1rio ',
          id
        ),
        (0, _lib.createVNode)(
          'p',
          null,
          (0, _lib.createVNode)(
            _router.Link,
            { 'class': 'go-back', to: root },
            (0, _lib.createVNode)('i', { 'class': 'icon icon-back' }),
            ' Voltar'
          )
        ),
        (0, _lib.createVNode)(_userForm2.default, { onsubmit: editUser, loading: submittingForm })
      );
    }
  }]);

  return UserEdit;
}(_lib.VirtualNode);

exports.default = UserEdit;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Db = function () {
  function Db(name, version, storeName) {
    _classCallCheck(this, Db);

    this.name = name;
    this.version = version;
    this.storeName = storeName;
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  }

  _createClass(Db, [{
    key: 'exists',
    value: function exists() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var newDb = false;
        var open = _this.indexedDB.open(_this.name, _this.version);

        open.onupgradeneeded = function (e) {
          _this.upgradeneededHandler(e);
          newDb = true;
        };

        open.onsuccess = function (e) {
          var closeDb = e.target.result;
          closeDb.close();
          resolve(!newDb);
        };

        open.onerror = function (e) {
          reject(e.value);
        };
      });
    }
  }, {
    key: 'execute',
    value: function execute(cb) {
      var _this2 = this;

      var transaction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'readonly';

      var open = this.indexedDB.open(this.name, this.version);

      open.onupgradeneeded = function (e) {
        _this2.upgradeneededHandler(e);
      };

      open.onsuccess = function (e) {
        var db = e.target.result;
        var tx = db.transaction(_this2.storeName, transaction);
        var store = tx.objectStore(_this2.storeName);

        cb(store);

        tx.oncomplete = function () {
          db.close();
        };
      };
    }
  }, {
    key: 'insert',
    value: function insert(obj) {
      return this.promisifyReturn(function (store) {
        return store.add(obj);
      }, 'readwrite');
    }
  }, {
    key: 'update',
    value: function update(obj, key) {
      return this.promisifyReturn(function (store) {
        return store.put(obj, key);
      }, 'readwrite');
    }
  }, {
    key: 'select',
    value: function select(key) {
      return this.promisifyReturn(function (store) {
        return store.get(key);
      });
    }
  }, {
    key: 'selectAll',
    value: function selectAll() {
      return this.promisifyReturn(function (store) {
        return store.getAll();
      });
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      return this.promisifyReturn(function (store) {
        return store.delete(key);
      }, 'readwrite');
    }
  }, {
    key: 'promisifyReturn',
    value: function promisifyReturn(f) {
      var _this3 = this;

      var transaction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'readonly';

      return new Promise(function (resolve, reject) {
        _this3.execute(function (store) {
          var req = f(store);

          req.onsuccess = function (e) {
            resolve(e.target.result);
          };

          req.onerror = function (e) {
            reject(e.value);
          };
        }, transaction);
      });
    }
  }, {
    key: 'upgradeneededHandler',
    value: function upgradeneededHandler(e) {
      var db = e.target.result;
      db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
    }
  }]);

  return Db;
}();

exports.default = Db;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var url = 'https://private-21e8de-rafaellucio.apiary-mock.com/users';

var getUsers = function getUsers() {
  return window.fetch(url).then(function (res) {
    return res.json();
  });
};

exports.default = getUsers;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var actions = function actions(db, request) {
  return {
    // List Users
    requestUsers: function requestUsers() {
      return function (state, _ref) {
        var selectUsers = _ref.selectUsers;

        request().then(function (users) {
          Promise.all(users.map(function (u) {
            return db.insert(u);
          }));
        }).then(function () {
          return selectUsers();
        });
        return { loadingUsers: true };
      };
    },

    selectUsers: function selectUsers() {
      return function (state, _ref2) {
        var selectUsersCompleted = _ref2.selectUsersCompleted;

        db.selectAll().then(function (users) {
          return selectUsersCompleted(users);
        });
        return { loadingUsers: true };
      };
    },

    selectUsersCompleted: function selectUsersCompleted(users) {
      return function () {
        return { users: [].concat(_toConsumableArray(users)), loadingUsers: false };
      };
    },

    removeUser: function removeUser(id) {
      return function (state, _ref3) {
        var selectUsers = _ref3.selectUsers;
        return db.remove(id).then(function () {
          return selectUsers();
        });
      };
    },

    loadUsers: function loadUsers() {
      return function (state, _ref4) {
        var selectUsers = _ref4.selectUsers,
            requestUsers = _ref4.requestUsers;
        return db.exists().then(function (exists) {
          if (exists) {
            selectUsers();
          } else {
            requestUsers();
          }
        });
      };
    },

    // Submit Form
    redirectToHome: function redirectToHome() {
      return function (_ref5, _ref6) {
        var root = _ref5.root;
        var selectUsers = _ref6.selectUsers,
            navigate = _ref6.navigate;

        selectUsers();
        navigate(root);
        return { submittingForm: false };
      };
    },

    // Create User
    redirectToCreate: function redirectToCreate() {
      return function (state, _ref7) {
        var navigate = _ref7.navigate;

        setTimeout(function () {
          return navigate(root + 'create');
        });
        return {
          formState: {
            name: '',
            cpf: '',
            phone: '',
            email: ''
          },

          formValid: {
            name: true,
            cpf: true,
            phone: true,
            email: true
          }
        };
      };
    },

    addUser: function addUser(user) {
      return function (state, _ref8) {
        var insertUser = _ref8.insertUser;

        setTimeout(function () {
          return insertUser(user);
        }, 500);
        return { submittingForm: true };
      };
    },

    insertUser: function insertUser(user) {
      return function (state, _ref9) {
        var redirectToHome = _ref9.redirectToHome;

        db.insert(user).then(function () {
          return redirectToHome();
        });
      };
    },

    // Edit User
    getUser: function getUser(id) {
      return function (state, _ref10) {
        var redirectToEdit = _ref10.redirectToEdit;

        db.select(id).then(function (user) {
          redirectToEdit(user);
        });
      };
    },

    redirectToEdit: function redirectToEdit(user) {
      return function (_ref11, _ref12) {
        var root = _ref11.root;
        var navigate = _ref12.navigate;

        setTimeout(function () {
          return navigate(root + 'edit/' + user.id);
        });
        return { formState: user };
      };
    },

    editUser: function editUser(user, id) {
      return function (state, _ref13) {
        var updateUser = _ref13.updateUser;

        setTimeout(function () {
          return updateUser(user, id);
        }, 500);
        return { submittingForm: true };
      };
    },

    updateUser: function updateUser(user, id) {
      return function (state, _ref14) {
        var redirectToHome = _ref14.redirectToHome;

        db.update(user, id).then(function () {
          return redirectToHome();
        });
      };
    }
  };
};

exports.default = actions;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = {
  loadingUsers: true,
  users: [],

  submittingForm: false,

  formState: {
    name: '',
    cpf: '',
    phone: '',
    email: ''
  },

  formValid: {
    name: true,
    cpf: true,
    phone: true,
    email: true
  }
};

exports.default = initialState;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map