import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addQuarters,
  addWeeks,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  getDate,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getTime,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isSameDay,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  isValid,
  isWithinInterval,
  max,
  min,
  parse,
  parseISO,
  set,
  setHours,
  setMinutes,
  setMonth,
  setQuarter,
  setSeconds,
  setYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
  toDate
} from "./chunk-YJH6ZXJ6.js";
import {
  require_react_dom
} from "./chunk-VDLML7LY.js";
import {
  require_prop_types
} from "./chunk-5JPX2TLN.js";
import {
  require_classnames
} from "./chunk-NQS6WLNR.js";
import "./chunk-RJXUTLJJ.js";
import {
  require_react
} from "./chunk-32AJJKBB.js";
import {
  __commonJS,
  __toESM
} from "./chunk-HYZYPRER.js";

// node_modules/react-popper/node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-popper/node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        var it2;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size)
            return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!b.has(i.value[0]))
              return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!equal(i.value[1], b.get(i.value[0])))
              return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size)
            return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!b.has(i.value[0]))
              return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (a[i] !== b[i])
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function")
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function")
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        if (hasElementType && a instanceof Element)
          return false;
        for (i = length; i-- !== 0; ) {
          if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys[i]], b[keys[i]]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual3(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// node_modules/warning/warning.js
var require_warning = __commonJS({
  "node_modules/warning/warning.js"(exports, module) {
    "use strict";
    var __DEV__ = true;
    var warning2 = function() {
    };
    if (__DEV__) {
      printWarning = function printWarning2(format2, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for (var key = 1; key < len; key++) {
          args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message = "Warning: " + format2.replace(/%s/g, function() {
          return args[argIndex++];
        });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
      warning2 = function(condition, format2, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format2 === void 0) {
          throw new Error(
            "`warning(condition, format, ...args)` requires a warning message argument"
          );
        }
        if (!condition) {
          printWarning.apply(null, [format2].concat(args));
        }
      };
    }
    var printWarning;
    module.exports = warning2;
  }
});

// node_modules/react-datepicker/dist/es/index.js
var import_react2 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_classnames = __toESM(require_classnames());

// node_modules/react-onclickoutside/dist/react-onclickoutside.es.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function isNodeFound(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  }
  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass);
  }
  return current.classList.contains(ignoreClass);
}
function findHighest(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  }
  while (current.parentNode || current.host) {
    if (current.parentNode && isNodeFound(current, componentNode, ignoreClass)) {
      return true;
    }
    current = current.parentNode || current.host;
  }
  return current;
}
function clickedScrollbar(evt) {
  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
}
var testPassiveEventSupport = function testPassiveEventSupport2() {
  if (typeof window === "undefined" || typeof window.addEventListener !== "function") {
    return;
  }
  var passive2 = false;
  var options = Object.defineProperty({}, "passive", {
    get: function get() {
      passive2 = true;
    }
  });
  var noop = function noop2() {
  };
  window.addEventListener("testPassiveEventSupport", noop, options);
  window.removeEventListener("testPassiveEventSupport", noop, options);
  return passive2;
};
function autoInc(seed) {
  if (seed === void 0) {
    seed = 0;
  }
  return function() {
    return ++seed;
  };
}
var uid = autoInc();
var passiveEventSupport;
var handlersMap = {};
var enabledInstances = {};
var touchEvents = ["touchstart", "touchmove"];
var IGNORE_CLASS_NAME = "ignore-react-onclickoutside";
function getEventHandlerOptions(instance, eventName) {
  var handlerOptions = {};
  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;
  if (isTouchEvent && passiveEventSupport) {
    handlerOptions.passive = !instance.props.preventDefault;
  }
  return handlerOptions;
}
function onClickOutsideHOC(WrappedComponent, config) {
  var _class, _temp;
  var componentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
  return _temp = _class = function(_Component) {
    _inheritsLoose(onClickOutside, _Component);
    function onClickOutside(props) {
      var _this;
      _this = _Component.call(this, props) || this;
      _this.__outsideClickHandler = function(event) {
        if (typeof _this.__clickOutsideHandlerProp === "function") {
          _this.__clickOutsideHandlerProp(event);
          return;
        }
        var instance = _this.getInstance();
        if (typeof instance.props.handleClickOutside === "function") {
          instance.props.handleClickOutside(event);
          return;
        }
        if (typeof instance.handleClickOutside === "function") {
          instance.handleClickOutside(event);
          return;
        }
        throw new Error("WrappedComponent: " + componentName + " lacks a handleClickOutside(event) function for processing outside click events.");
      };
      _this.__getComponentNode = function() {
        var instance = _this.getInstance();
        if (config && typeof config.setClickOutsideRef === "function") {
          return config.setClickOutsideRef()(instance);
        }
        if (typeof instance.setClickOutsideRef === "function") {
          return instance.setClickOutsideRef();
        }
        return (0, import_react_dom.findDOMNode)(instance);
      };
      _this.enableOnClickOutside = function() {
        if (typeof document === "undefined" || enabledInstances[_this._uid]) {
          return;
        }
        if (typeof passiveEventSupport === "undefined") {
          passiveEventSupport = testPassiveEventSupport();
        }
        enabledInstances[_this._uid] = true;
        var events = _this.props.eventTypes;
        if (!events.forEach) {
          events = [events];
        }
        handlersMap[_this._uid] = function(event) {
          if (_this.componentNode === null)
            return;
          if (_this.props.preventDefault) {
            event.preventDefault();
          }
          if (_this.props.stopPropagation) {
            event.stopPropagation();
          }
          if (_this.props.excludeScrollbar && clickedScrollbar(event))
            return;
          var current = event.composed && event.composedPath && event.composedPath().shift() || event.target;
          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
            return;
          }
          _this.__outsideClickHandler(event);
        };
        events.forEach(function(eventName) {
          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_assertThisInitialized(_this), eventName));
        });
      };
      _this.disableOnClickOutside = function() {
        delete enabledInstances[_this._uid];
        var fn2 = handlersMap[_this._uid];
        if (fn2 && typeof document !== "undefined") {
          var events = _this.props.eventTypes;
          if (!events.forEach) {
            events = [events];
          }
          events.forEach(function(eventName) {
            return document.removeEventListener(eventName, fn2, getEventHandlerOptions(_assertThisInitialized(_this), eventName));
          });
          delete handlersMap[_this._uid];
        }
      };
      _this.getRef = function(ref) {
        return _this.instanceRef = ref;
      };
      _this._uid = uid();
      return _this;
    }
    var _proto = onClickOutside.prototype;
    _proto.getInstance = function getInstance() {
      if (WrappedComponent.prototype && !WrappedComponent.prototype.isReactComponent) {
        return this;
      }
      var ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    };
    _proto.componentDidMount = function componentDidMount() {
      if (typeof document === "undefined" || !document.createElement) {
        return;
      }
      var instance = this.getInstance();
      if (config && typeof config.handleClickOutside === "function") {
        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);
        if (typeof this.__clickOutsideHandlerProp !== "function") {
          throw new Error("WrappedComponent: " + componentName + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
        }
      }
      this.componentNode = this.__getComponentNode();
      if (this.props.disableOnClickOutside)
        return;
      this.enableOnClickOutside();
    };
    _proto.componentDidUpdate = function componentDidUpdate() {
      this.componentNode = this.__getComponentNode();
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.disableOnClickOutside();
    };
    _proto.render = function render() {
      var _this$props = this.props;
      _this$props.excludeScrollbar;
      var props = _objectWithoutPropertiesLoose(_this$props, ["excludeScrollbar"]);
      if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef;
      } else {
        props.wrappedRef = this.getRef;
      }
      props.disableOnClickOutside = this.disableOnClickOutside;
      props.enableOnClickOutside = this.enableOnClickOutside;
      return (0, import_react.createElement)(WrappedComponent, props);
    };
    return onClickOutside;
  }(import_react.Component), _class.displayName = "OnClickOutside(" + componentName + ")", _class.defaultProps = {
    eventTypes: ["mousedown", "touchstart"],
    excludeScrollbar: config && config.excludeScrollbar || false,
    outsideClickIgnoreClass: IGNORE_CLASS_NAME,
    preventDefault: false,
    stopPropagation: false
  }, _class.getClass = function() {
    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
  }, _temp;
}
var react_onclickoutside_es_default = onClickOutsideHOC;

// node_modules/react-datepicker/dist/es/index.js
var import_react_dom2 = __toESM(require_react_dom());

// node_modules/react-popper/lib/esm/Popper.js
var React4 = __toESM(require_react());

// node_modules/react-popper/lib/esm/Manager.js
var React = __toESM(require_react());
var ManagerReferenceNodeContext = React.createContext();
var ManagerReferenceNodeSetterContext = React.createContext();
function Manager(_ref) {
  var children = _ref.children;
  var _React$useState = React.useState(null), referenceNode = _React$useState[0], setReferenceNode = _React$useState[1];
  var hasUnmounted = React.useRef(false);
  React.useEffect(function() {
    return function() {
      hasUnmounted.current = true;
    };
  }, []);
  var handleSetReferenceNode = React.useCallback(function(node) {
    if (!hasUnmounted.current) {
      setReferenceNode(node);
    }
  }, []);
  return React.createElement(ManagerReferenceNodeContext.Provider, {
    value: referenceNode
  }, React.createElement(ManagerReferenceNodeSetterContext.Provider, {
    value: handleSetReferenceNode
  }, children));
}

// node_modules/react-popper/lib/esm/utils.js
var React2 = __toESM(require_react());
var unwrapArray = function unwrapArray2(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
var safeInvoke = function safeInvoke2(fn2) {
  if (typeof fn2 === "function") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return fn2.apply(void 0, args);
  }
};
var setRef = function setRef2(ref, node) {
  if (typeof ref === "function") {
    return safeInvoke(ref, node);
  } else if (ref != null) {
    ref.current = node;
  }
};
var fromEntries = function fromEntries2(entries) {
  return entries.reduce(function(acc, _ref) {
    var key = _ref[0], value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" && window.document && window.document.createElement ? React2.useLayoutEffect : React2.useEffect;

// node_modules/react-popper/lib/esm/usePopper.js
var React3 = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max2 = Math.max;
var min2 = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min3, value, max3) {
  return max2(min3, min2(value, max3));
}
function withinMaxClamp(min3, value, max3) {
  var v = within(min3, value, max3);
  return v > max3 ? max3 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min3 = paddingObject[minProp];
  var max3 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min3, center, max3);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max2(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max2(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max2(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max2(rect.top, accRect.top);
    accRect.right = min2(rect.right, accRect.right);
    accRect.bottom = min2(rect.bottom, accRect.bottom);
    accRect.left = max2(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min3 = offset2 + overflow[mainSide];
    var max3 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min2(min3, tetherMin) : min3, offset2, tether ? max2(max3, tetherMax) : max3);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/react-popper/lib/esm/usePopper.js
var import_react_fast_compare = __toESM(require_react_fast_compare());
var EMPTY_MODIFIERS = [];
var usePopper = function usePopper2(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }
  var prevOptions = React3.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };
  var _React$useState = React3.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), state = _React$useState[0], setState = _React$useState[1];
  var updateStateModifier = React3.useMemo(function() {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn2(_ref) {
        var state2 = _ref.state;
        var elements = Object.keys(state2.elements);
        ReactDOM.flushSync(function() {
          setState({
            styles: fromEntries(elements.map(function(element) {
              return [element, state2.styles[element] || {}];
            })),
            attributes: fromEntries(elements.map(function(element) {
              return [element, state2.attributes[element]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []);
  var popperOptions = React3.useMemo(function() {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: "applyStyles",
        enabled: false
      }])
    };
    if ((0, import_react_fast_compare.default)(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = React3.useRef();
  useIsomorphicLayoutEffect(function() {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function() {
    if (referenceElement == null || popperElement == null) {
      return;
    }
    var createPopper4 = options.createPopper || createPopper3;
    var popperInstance = createPopper4(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function() {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

// node_modules/react-popper/lib/esm/Popper.js
var NOOP = function NOOP2() {
  return void 0;
};
var NOOP_PROMISE = function NOOP_PROMISE2() {
  return Promise.resolve(null);
};
var EMPTY_MODIFIERS2 = [];
function Popper(_ref) {
  var _ref$placement = _ref.placement, placement = _ref$placement === void 0 ? "bottom" : _ref$placement, _ref$strategy = _ref.strategy, strategy = _ref$strategy === void 0 ? "absolute" : _ref$strategy, _ref$modifiers = _ref.modifiers, modifiers = _ref$modifiers === void 0 ? EMPTY_MODIFIERS2 : _ref$modifiers, referenceElement = _ref.referenceElement, onFirstUpdate = _ref.onFirstUpdate, innerRef = _ref.innerRef, children = _ref.children;
  var referenceNode = React4.useContext(ManagerReferenceNodeContext);
  var _React$useState = React4.useState(null), popperElement = _React$useState[0], setPopperElement = _React$useState[1];
  var _React$useState2 = React4.useState(null), arrowElement = _React$useState2[0], setArrowElement = _React$useState2[1];
  React4.useEffect(function() {
    setRef(innerRef, popperElement);
  }, [innerRef, popperElement]);
  var options = React4.useMemo(function() {
    return {
      placement,
      strategy,
      onFirstUpdate,
      modifiers: [].concat(modifiers, [{
        name: "arrow",
        enabled: arrowElement != null,
        options: {
          element: arrowElement
        }
      }])
    };
  }, [placement, strategy, onFirstUpdate, modifiers, arrowElement]);
  var _usePopper = usePopper(referenceElement || referenceNode, popperElement, options), state = _usePopper.state, styles = _usePopper.styles, forceUpdate = _usePopper.forceUpdate, update = _usePopper.update;
  var childrenProps = React4.useMemo(function() {
    return {
      ref: setPopperElement,
      style: styles.popper,
      placement: state ? state.placement : placement,
      hasPopperEscaped: state && state.modifiersData.hide ? state.modifiersData.hide.hasPopperEscaped : null,
      isReferenceHidden: state && state.modifiersData.hide ? state.modifiersData.hide.isReferenceHidden : null,
      arrowProps: {
        style: styles.arrow,
        ref: setArrowElement
      },
      forceUpdate: forceUpdate || NOOP,
      update: update || NOOP_PROMISE
    };
  }, [setPopperElement, setArrowElement, placement, state, styles, update, forceUpdate]);
  return unwrapArray(children)(childrenProps);
}

// node_modules/react-popper/lib/esm/Reference.js
var React5 = __toESM(require_react());
var import_warning = __toESM(require_warning());
function Reference(_ref) {
  var children = _ref.children, innerRef = _ref.innerRef;
  var setReferenceNode = React5.useContext(ManagerReferenceNodeSetterContext);
  var refHandler = React5.useCallback(function(node) {
    setRef(innerRef, node);
    safeInvoke(setReferenceNode, node);
  }, [innerRef, setReferenceNode]);
  React5.useEffect(function() {
    return function() {
      return setRef(innerRef, null);
    };
  }, []);
  React5.useEffect(function() {
    (0, import_warning.default)(Boolean(setReferenceNode), "`Reference` should not be used outside of a `Manager` component.");
  }, [setReferenceNode]);
  return unwrapArray(children)({
    ref: refHandler
  });
}

// node_modules/react-datepicker/dist/es/index.js
function le(e2, t2) {
  var r2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e2);
    t2 && (n = n.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), r2.push.apply(r2, n);
  }
  return r2;
}
function de(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var r2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? le(Object(r2), true).forEach(function(t3) {
      ve(e2, t3, r2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(r2)) : le(Object(r2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(r2, t3));
    });
  }
  return e2;
}
function ue(e2) {
  return (ue = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  })(e2);
}
function he(e2, t2) {
  if (!(e2 instanceof t2))
    throw new TypeError("Cannot call a class as a function");
}
function me(e2, t2) {
  for (var r2 = 0; r2 < t2.length; r2++) {
    var n = t2[r2];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(e2, Me(n.key), n);
  }
}
function fe(e2, t2, r2) {
  return t2 && me(e2.prototype, t2), r2 && me(e2, r2), Object.defineProperty(e2, "prototype", { writable: false }), e2;
}
function ve(e2, t2, r2) {
  return (t2 = Me(t2)) in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
}
function ye() {
  return (ye = Object.assign ? Object.assign.bind() : function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var r2 = arguments[t2];
      for (var n in r2)
        Object.prototype.hasOwnProperty.call(r2, n) && (e2[n] = r2[n]);
    }
    return e2;
  }).apply(this, arguments);
}
function De(e2, t2) {
  if ("function" != typeof t2 && null !== t2)
    throw new TypeError("Super expression must either be null or a function");
  e2.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e2, writable: true, configurable: true } }), Object.defineProperty(e2, "prototype", { writable: false }), t2 && we(e2, t2);
}
function ge(e2) {
  return (ge = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e3) {
    return e3.__proto__ || Object.getPrototypeOf(e3);
  })(e2);
}
function we(e2, t2) {
  return (we = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
    return e3.__proto__ = t3, e3;
  })(e2, t2);
}
function ke(e2) {
  if (void 0 === e2)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e2;
}
function be(e2, t2) {
  if (t2 && ("object" == typeof t2 || "function" == typeof t2))
    return t2;
  if (void 0 !== t2)
    throw new TypeError("Derived constructors may only return object or undefined");
  return ke(e2);
}
function Se(e2) {
  var t2 = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if ("function" == typeof Proxy)
      return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (e3) {
      return false;
    }
  }();
  return function() {
    var r2, n = ge(e2);
    if (t2) {
      var o = ge(this).constructor;
      r2 = Reflect.construct(n, arguments, o);
    } else
      r2 = n.apply(this, arguments);
    return be(this, r2);
  };
}
function Ce(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return _e(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"])
      return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return _e(e3, t2);
    var r2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === r2 && e3.constructor && (r2 = e3.constructor.name);
    if ("Map" === r2 || "Set" === r2)
      return Array.from(e3);
    if ("Arguments" === r2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r2))
      return _e(e3, t2);
  }(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function _e(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var r2 = 0, n = new Array(t2); r2 < t2; r2++)
    n[r2] = e2[r2];
  return n;
}
function Me(e2) {
  var t2 = function(e3, t3) {
    if ("object" != typeof e3 || null === e3)
      return e3;
    var r2 = e3[Symbol.toPrimitive];
    if (void 0 !== r2) {
      var n = r2.call(e3, t3 || "default");
      if ("object" != typeof n)
        return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t3 ? String : Number)(e3);
  }(e2, "string");
  return "symbol" == typeof t2 ? t2 : String(t2);
}
function Ee(e2, t2) {
  switch (e2) {
    case "P":
      return t2.date({ width: "short" });
    case "PP":
      return t2.date({ width: "medium" });
    case "PPP":
      return t2.date({ width: "long" });
    case "PPPP":
    default:
      return t2.date({ width: "full" });
  }
}
function Pe(e2, t2) {
  switch (e2) {
    case "p":
      return t2.time({ width: "short" });
    case "pp":
      return t2.time({ width: "medium" });
    case "ppp":
      return t2.time({ width: "long" });
    case "pppp":
    default:
      return t2.time({ width: "full" });
  }
}
var Ne = { p: Pe, P: function(e2, t2) {
  var r2, n = e2.match(/(P+)(p+)?/) || [], o = n[1], a = n[2];
  if (!a)
    return Ee(e2, t2);
  switch (o) {
    case "P":
      r2 = t2.dateTime({ width: "short" });
      break;
    case "PP":
      r2 = t2.dateTime({ width: "medium" });
      break;
    case "PPP":
      r2 = t2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      r2 = t2.dateTime({ width: "full" });
  }
  return r2.replace("{{date}}", Ee(o, t2)).replace("{{time}}", Pe(a, t2));
} };
var xe = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
function Ye(e2) {
  var t2 = e2 ? "string" == typeof e2 || e2 instanceof String ? parseISO(e2) : toDate(e2) : /* @__PURE__ */ new Date();
  return Oe(t2) ? t2 : null;
}
function Ie(e2, t2, r2, n, o) {
  var a = null, s = et(r2) || et(Ze()), i = true;
  return Array.isArray(t2) ? (t2.forEach(function(t3) {
    var p = parse(e2, t3, /* @__PURE__ */ new Date(), { locale: s });
    n && (i = Oe(p, o) && e2 === Te(p, t3, r2)), Oe(p, o) && i && (a = p);
  }), a) : (a = parse(e2, t2, /* @__PURE__ */ new Date(), { locale: s }), n ? i = Oe(a) && e2 === Te(a, t2, r2) : Oe(a) || (t2 = t2.match(xe).map(function(e3) {
    var t3 = e3[0];
    return "p" === t3 || "P" === t3 ? s ? (0, Ne[t3])(e3, s.formatLong) : t3 : e3;
  }).join(""), e2.length > 0 && (a = parse(e2, t2.slice(0, e2.length), /* @__PURE__ */ new Date())), Oe(a) || (a = new Date(e2))), Oe(a) && i ? a : null);
}
function Oe(e2, t2) {
  return t2 = t2 || /* @__PURE__ */ new Date("1/1/1000"), isValid(e2) && !isBefore(e2, t2);
}
function Te(e2, t2, r2) {
  if ("en" === r2)
    return format(e2, t2, { awareOfUnicodeTokens: true });
  var n = et(r2);
  return r2 && !n && console.warn('A locale object was not found for the provided string ["'.concat(r2, '"].')), !n && Ze() && et(Ze()) && (n = et(Ze())), format(e2, t2, { locale: n || null, awareOfUnicodeTokens: true });
}
function Re(e2, t2) {
  var r2 = t2.dateFormat, n = t2.locale;
  return e2 && Te(e2, Array.isArray(r2) ? r2[0] : r2, n) || "";
}
function Le(e2, t2) {
  var r2 = t2.hour, n = void 0 === r2 ? 0 : r2, o = t2.minute, a = void 0 === o ? 0 : o, s = t2.second;
  return setHours(setMinutes(setSeconds(e2, void 0 === s ? 0 : s), a), n);
}
function Fe(e2, t2) {
  var r2 = t2 && et(t2) || Ze() && et(Ze());
  return getISOWeek(e2, r2 ? { locale: r2 } : null);
}
function Ae(e2, t2) {
  return Te(e2, "ddd", t2);
}
function Ke(e2) {
  return startOfDay(e2);
}
function Be(e2, t2, r2) {
  var n = et(t2 || Ze());
  return startOfWeek(e2, { locale: n, weekStartsOn: r2 });
}
function Qe(e2) {
  return startOfMonth(e2);
}
function We(e2) {
  return startOfYear(e2);
}
function je(e2) {
  return startOfQuarter(e2);
}
function He() {
  return startOfDay(Ye());
}
function Ve(e2, t2) {
  return e2 && t2 ? isSameYear(e2, t2) : !e2 && !t2;
}
function qe(e2, t2) {
  return e2 && t2 ? isSameMonth(e2, t2) : !e2 && !t2;
}
function Ue(e2, t2) {
  return e2 && t2 ? isSameQuarter(e2, t2) : !e2 && !t2;
}
function ze(e2, t2) {
  return e2 && t2 ? isSameDay(e2, t2) : !e2 && !t2;
}
function $e(e2, t2) {
  return e2 && t2 ? isEqual(e2, t2) : !e2 && !t2;
}
function Ge(e2, t2, r2) {
  var n, o = startOfDay(t2), a = endOfDay(r2);
  try {
    n = isWithinInterval(e2, { start: o, end: a });
  } catch (e3) {
    n = false;
  }
  return n;
}
function Je(e2, t2) {
  var r2 = "undefined" != typeof window ? window : globalThis;
  r2.__localeData__ || (r2.__localeData__ = {}), r2.__localeData__[e2] = t2;
}
function Xe(e2) {
  ("undefined" != typeof window ? window : globalThis).__localeId__ = e2;
}
function Ze() {
  return ("undefined" != typeof window ? window : globalThis).__localeId__;
}
function et(e2) {
  if ("string" == typeof e2) {
    var t2 = "undefined" != typeof window ? window : globalThis;
    return t2.__localeData__ ? t2.__localeData__[e2] : null;
  }
  return e2;
}
function tt(e2, t2) {
  return Te(setMonth(Ye(), e2), "LLLL", t2);
}
function rt(e2, t2) {
  return Te(setMonth(Ye(), e2), "LLL", t2);
}
function nt(e2, t2) {
  return Te(setQuarter(Ye(), e2), "QQQ", t2);
}
function ot(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate, o = t2.excludeDates, a = t2.excludeDateIntervals, s = t2.includeDates, i = t2.includeDateIntervals, p = t2.filterDate;
  return ut(e2, { minDate: r2, maxDate: n }) || o && o.some(function(t3) {
    return ze(e2, t3);
  }) || a && a.some(function(t3) {
    var r3 = t3.start, n2 = t3.end;
    return isWithinInterval(e2, { start: r3, end: n2 });
  }) || s && !s.some(function(t3) {
    return ze(e2, t3);
  }) || i && !i.some(function(t3) {
    var r3 = t3.start, n2 = t3.end;
    return isWithinInterval(e2, { start: r3, end: n2 });
  }) || p && !p(Ye(e2)) || false;
}
function at(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.excludeDates, n = t2.excludeDateIntervals;
  return n && n.length > 0 ? n.some(function(t3) {
    var r3 = t3.start, n2 = t3.end;
    return isWithinInterval(e2, { start: r3, end: n2 });
  }) : r2 && r2.some(function(t3) {
    return ze(e2, t3);
  }) || false;
}
function st(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate, o = t2.excludeDates, a = t2.includeDates, s = t2.filterDate;
  return ut(e2, { minDate: startOfMonth(r2), maxDate: endOfMonth(n) }) || o && o.some(function(t3) {
    return qe(e2, t3);
  }) || a && !a.some(function(t3) {
    return qe(e2, t3);
  }) || s && !s(Ye(e2)) || false;
}
function it(e2, t2, r2, n) {
  var o = getYear(e2), a = getMonth(e2), s = getYear(t2), i = getMonth(t2), p = getYear(n);
  return o === s && o === p ? a <= r2 && r2 <= i : o < s ? p === o && a <= r2 || p === s && i >= r2 || p < s && p > o : void 0;
}
function pt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate, o = t2.excludeDates, a = t2.includeDates, s = t2.filterDate;
  return ut(e2, { minDate: r2, maxDate: n }) || o && o.some(function(t3) {
    return Ue(e2, t3);
  }) || a && !a.some(function(t3) {
    return Ue(e2, t3);
  }) || s && !s(Ye(e2)) || false;
}
function ct(e2, t2, r2) {
  if (!isValid(t2) || !isValid(r2))
    return false;
  var n = getYear(t2), a = getYear(r2);
  return n <= e2 && a >= e2;
}
function lt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate, o = t2.excludeDates, a = t2.includeDates, s = t2.filterDate, i = new Date(e2, 0, 1);
  return ut(i, { minDate: startOfYear(r2), maxDate: endOfYear(n) }) || o && o.some(function(e3) {
    return Ve(i, e3);
  }) || a && !a.some(function(e3) {
    return Ve(i, e3);
  }) || s && !s(Ye(i)) || false;
}
function dt(e2, t2, r2, n) {
  var o = getYear(e2), a = getQuarter(e2), s = getYear(t2), i = getQuarter(t2), p = getYear(n);
  return o === s && o === p ? a <= r2 && r2 <= i : o < s ? p === o && a <= r2 || p === s && i >= r2 || p < s && p > o : void 0;
}
function ut(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate;
  return r2 && differenceInCalendarDays(e2, r2) < 0 || n && differenceInCalendarDays(e2, n) > 0;
}
function ht(e2, t2) {
  return t2.some(function(t3) {
    return getHours(t3) === getHours(e2) && getMinutes(t3) === getMinutes(e2);
  });
}
function mt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.excludeTimes, n = t2.includeTimes, o = t2.filterTime;
  return r2 && ht(e2, r2) || n && !ht(e2, n) || o && !o(e2) || false;
}
function ft(e2, t2) {
  var r2 = t2.minTime, n = t2.maxTime;
  if (!r2 || !n)
    throw new Error("Both minTime and maxTime props required");
  var o, a = Ye(), s = setHours(setMinutes(a, getMinutes(e2)), getHours(e2)), i = setHours(setMinutes(a, getMinutes(r2)), getHours(r2)), p = setHours(setMinutes(a, getMinutes(n)), getHours(n));
  try {
    o = !isWithinInterval(s, { start: i, end: p });
  } catch (e3) {
    o = false;
  }
  return o;
}
function vt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.includeDates, o = subMonths(e2, 1);
  return r2 && differenceInCalendarMonths(r2, o) > 0 || n && n.every(function(e3) {
    return differenceInCalendarMonths(e3, o) > 0;
  }) || false;
}
function yt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.maxDate, n = t2.includeDates, o = addMonths(e2, 1);
  return r2 && differenceInCalendarMonths(o, r2) > 0 || n && n.every(function(e3) {
    return differenceInCalendarMonths(o, e3) > 0;
  }) || false;
}
function Dt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.includeDates, o = subYears(e2, 1);
  return r2 && differenceInCalendarYears(r2, o) > 0 || n && n.every(function(e3) {
    return differenceInCalendarYears(e3, o) > 0;
  }) || false;
}
function gt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.maxDate, n = t2.includeDates, o = addYears(e2, 1);
  return r2 && differenceInCalendarYears(o, r2) > 0 || n && n.every(function(e3) {
    return differenceInCalendarYears(o, e3) > 0;
  }) || false;
}
function wt(e2) {
  var t2 = e2.minDate, r2 = e2.includeDates;
  if (r2 && t2) {
    var n = r2.filter(function(e3) {
      return differenceInCalendarDays(e3, t2) >= 0;
    });
    return min(n);
  }
  return r2 ? min(r2) : t2;
}
function kt(e2) {
  var t2 = e2.maxDate, r2 = e2.includeDates;
  if (r2 && t2) {
    var n = r2.filter(function(e3) {
      return differenceInCalendarDays(e3, t2) <= 0;
    });
    return max(n);
  }
  return r2 ? max(r2) : t2;
}
function bt() {
  for (var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "react-datepicker__day--highlighted", r2 = /* @__PURE__ */ new Map(), o = 0, a = e2.length; o < a; o++) {
    var s = e2[o];
    if (isDate(s)) {
      var i = Te(s, "MM.dd.yyyy"), p = r2.get(i) || [];
      p.includes(t2) || (p.push(t2), r2.set(i, p));
    } else if ("object" === ue(s)) {
      var c = Object.keys(s), l = c[0], d = s[c[0]];
      if ("string" == typeof l && d.constructor === Array)
        for (var u = 0, h = d.length; u < h; u++) {
          var m = Te(d[u], "MM.dd.yyyy"), f = r2.get(m) || [];
          f.includes(l) || (f.push(l), r2.set(m, f));
        }
    }
  }
  return r2;
}
function St(e2, t2, r2, n, o) {
  for (var a = o.length, p = [], c = 0; c < a; c++) {
    var l = addMinutes(addHours(e2, getHours(o[c])), getMinutes(o[c])), d = addMinutes(e2, (r2 + 1) * n);
    isAfter(l, t2) && isBefore(l, d) && p.push(o[c]);
  }
  return p;
}
function Ct(e2) {
  return e2 < 10 ? "0".concat(e2) : "".concat(e2);
}
function _t(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 12, r2 = Math.ceil(getYear(e2) / t2) * t2, n = r2 - (t2 - 1);
  return { startPeriod: n, endPeriod: r2 };
}
function Mt(e2, t2, r2, n) {
  for (var o = [], a = 0; a < 2 * t2 + 1; a++) {
    var s = e2 + t2 - a, i = true;
    r2 && (i = getYear(r2) <= s), n && i && (i = getYear(n) >= s), i && o.push(s);
  }
  return o;
}
var Et = react_onclickoutside_es_default(function(n) {
  De(a, import_react2.default.Component);
  var o = Se(a);
  function a(r2) {
    var n2;
    he(this, a), ve(ke(n2 = o.call(this, r2)), "renderOptions", function() {
      var t2 = n2.props.year, r3 = n2.state.yearsList.map(function(r4) {
        return import_react2.default.createElement("div", { className: t2 === r4 ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option", key: r4, onClick: n2.onChange.bind(ke(n2), r4), "aria-selected": t2 === r4 ? "true" : void 0 }, t2 === r4 ? import_react2.default.createElement("span", { className: "react-datepicker__year-option--selected" }, "✓") : "", r4);
      }), o2 = n2.props.minDate ? getYear(n2.props.minDate) : null, a2 = n2.props.maxDate ? getYear(n2.props.maxDate) : null;
      return a2 && n2.state.yearsList.find(function(e2) {
        return e2 === a2;
      }) || r3.unshift(import_react2.default.createElement("div", { className: "react-datepicker__year-option", key: "upcoming", onClick: n2.incrementYears }, import_react2.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" }))), o2 && n2.state.yearsList.find(function(e2) {
        return e2 === o2;
      }) || r3.push(import_react2.default.createElement("div", { className: "react-datepicker__year-option", key: "previous", onClick: n2.decrementYears }, import_react2.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" }))), r3;
    }), ve(ke(n2), "onChange", function(e2) {
      n2.props.onChange(e2);
    }), ve(ke(n2), "handleClickOutside", function() {
      n2.props.onCancel();
    }), ve(ke(n2), "shiftYears", function(e2) {
      var t2 = n2.state.yearsList.map(function(t3) {
        return t3 + e2;
      });
      n2.setState({ yearsList: t2 });
    }), ve(ke(n2), "incrementYears", function() {
      return n2.shiftYears(1);
    }), ve(ke(n2), "decrementYears", function() {
      return n2.shiftYears(-1);
    });
    var s = r2.yearDropdownItemNumber, i = r2.scrollableYearDropdown, p = s || (i ? 10 : 5);
    return n2.state = { yearsList: Mt(n2.props.year, p, n2.props.minDate, n2.props.maxDate) }, n2.dropdownRef = (0, import_react2.createRef)(), n2;
  }
  return fe(a, [{ key: "componentDidMount", value: function() {
    var e2 = this.dropdownRef.current;
    if (e2) {
      var t2 = e2.children ? Array.from(e2.children) : null, r2 = t2 ? t2.find(function(e3) {
        return e3.ariaSelected;
      }) : null;
      e2.scrollTop = r2 ? r2.offsetTop + (r2.clientHeight - e2.clientHeight) / 2 : (e2.scrollHeight - e2.clientHeight) / 2;
    }
  } }, { key: "render", value: function() {
    var t2 = (0, import_classnames.default)({ "react-datepicker__year-dropdown": true, "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown });
    return import_react2.default.createElement("div", { className: t2, ref: this.dropdownRef }, this.renderOptions());
  } }]), a;
}());
var Pt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
      a[s] = arguments[s];
    return ve(ke(t3 = r2.call.apply(r2, [this].concat(a))), "state", { dropdownVisible: false }), ve(ke(t3), "renderSelectOptions", function() {
      for (var r3 = t3.props.minDate ? getYear(t3.props.minDate) : 1900, n2 = t3.props.maxDate ? getYear(t3.props.maxDate) : 2100, o2 = [], a2 = r3; a2 <= n2; a2++)
        o2.push(import_react2.default.createElement("option", { key: a2, value: a2 }, a2));
      return o2;
    }), ve(ke(t3), "onSelectChange", function(e2) {
      t3.onChange(e2.target.value);
    }), ve(ke(t3), "renderSelectMode", function() {
      return import_react2.default.createElement("select", { value: t3.props.year, className: "react-datepicker__year-select", onChange: t3.onSelectChange }, t3.renderSelectOptions());
    }), ve(ke(t3), "renderReadView", function(r3) {
      return import_react2.default.createElement("div", { key: "read", style: { visibility: r3 ? "visible" : "hidden" }, className: "react-datepicker__year-read-view", onClick: function(e2) {
        return t3.toggleDropdown(e2);
      } }, import_react2.default.createElement("span", { className: "react-datepicker__year-read-view--down-arrow" }), import_react2.default.createElement("span", { className: "react-datepicker__year-read-view--selected-year" }, t3.props.year));
    }), ve(ke(t3), "renderDropdown", function() {
      return import_react2.default.createElement(Et, { key: "dropdown", year: t3.props.year, onChange: t3.onChange, onCancel: t3.toggleDropdown, minDate: t3.props.minDate, maxDate: t3.props.maxDate, scrollableYearDropdown: t3.props.scrollableYearDropdown, yearDropdownItemNumber: t3.props.yearDropdownItemNumber });
    }), ve(ke(t3), "renderScrollMode", function() {
      var e2 = t3.state.dropdownVisible, r3 = [t3.renderReadView(!e2)];
      return e2 && r3.unshift(t3.renderDropdown()), r3;
    }), ve(ke(t3), "onChange", function(e2) {
      t3.toggleDropdown(), e2 !== t3.props.year && t3.props.onChange(e2);
    }), ve(ke(t3), "toggleDropdown", function(e2) {
      t3.setState({ dropdownVisible: !t3.state.dropdownVisible }, function() {
        t3.props.adjustDateOnChange && t3.handleYearChange(t3.props.date, e2);
      });
    }), ve(ke(t3), "handleYearChange", function(e2, r3) {
      t3.onSelect(e2, r3), t3.setOpen();
    }), ve(ke(t3), "onSelect", function(e2, r3) {
      t3.props.onSelect && t3.props.onSelect(e2, r3);
    }), ve(ke(t3), "setOpen", function() {
      t3.props.setOpen && t3.props.setOpen(true);
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    var t3;
    switch (this.props.dropdownMode) {
      case "scroll":
        t3 = this.renderScrollMode();
        break;
      case "select":
        t3 = this.renderSelectMode();
    }
    return import_react2.default.createElement("div", { className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode) }, t3);
  } }]), n;
}();
var Nt = react_onclickoutside_es_default(function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
      a[s] = arguments[s];
    return ve(ke(t3 = r2.call.apply(r2, [this].concat(a))), "isSelectedMonth", function(e2) {
      return t3.props.month === e2;
    }), ve(ke(t3), "renderOptions", function() {
      return t3.props.monthNames.map(function(r3, n2) {
        return import_react2.default.createElement("div", { className: t3.isSelectedMonth(n2) ? "react-datepicker__month-option react-datepicker__month-option--selected_month" : "react-datepicker__month-option", key: r3, onClick: t3.onChange.bind(ke(t3), n2), "aria-selected": t3.isSelectedMonth(n2) ? "true" : void 0 }, t3.isSelectedMonth(n2) ? import_react2.default.createElement("span", { className: "react-datepicker__month-option--selected" }, "✓") : "", r3);
      });
    }), ve(ke(t3), "onChange", function(e2) {
      return t3.props.onChange(e2);
    }), ve(ke(t3), "handleClickOutside", function() {
      return t3.props.onCancel();
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    return import_react2.default.createElement("div", { className: "react-datepicker__month-dropdown" }, this.renderOptions());
  } }]), n;
}());
var xt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
      a[s] = arguments[s];
    return ve(ke(t3 = r2.call.apply(r2, [this].concat(a))), "state", { dropdownVisible: false }), ve(ke(t3), "renderSelectOptions", function(t4) {
      return t4.map(function(t5, r3) {
        return import_react2.default.createElement("option", { key: r3, value: r3 }, t5);
      });
    }), ve(ke(t3), "renderSelectMode", function(r3) {
      return import_react2.default.createElement("select", { value: t3.props.month, className: "react-datepicker__month-select", onChange: function(e2) {
        return t3.onChange(e2.target.value);
      } }, t3.renderSelectOptions(r3));
    }), ve(ke(t3), "renderReadView", function(r3, n2) {
      return import_react2.default.createElement("div", { key: "read", style: { visibility: r3 ? "visible" : "hidden" }, className: "react-datepicker__month-read-view", onClick: t3.toggleDropdown }, import_react2.default.createElement("span", { className: "react-datepicker__month-read-view--down-arrow" }), import_react2.default.createElement("span", { className: "react-datepicker__month-read-view--selected-month" }, n2[t3.props.month]));
    }), ve(ke(t3), "renderDropdown", function(r3) {
      return import_react2.default.createElement(Nt, { key: "dropdown", month: t3.props.month, monthNames: r3, onChange: t3.onChange, onCancel: t3.toggleDropdown });
    }), ve(ke(t3), "renderScrollMode", function(e2) {
      var r3 = t3.state.dropdownVisible, n2 = [t3.renderReadView(!r3, e2)];
      return r3 && n2.unshift(t3.renderDropdown(e2)), n2;
    }), ve(ke(t3), "onChange", function(e2) {
      t3.toggleDropdown(), e2 !== t3.props.month && t3.props.onChange(e2);
    }), ve(ke(t3), "toggleDropdown", function() {
      return t3.setState({ dropdownVisible: !t3.state.dropdownVisible });
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    var t3, r3 = this, n2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown ? function(e2) {
      return rt(e2, r3.props.locale);
    } : function(e2) {
      return tt(e2, r3.props.locale);
    });
    switch (this.props.dropdownMode) {
      case "scroll":
        t3 = this.renderScrollMode(n2);
        break;
      case "select":
        t3 = this.renderSelectMode(n2);
    }
    return import_react2.default.createElement("div", { className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode) }, t3);
  } }]), n;
}();
function Yt(e2, t2) {
  for (var r2 = [], n = Qe(e2), o = Qe(t2); !isAfter(n, o); )
    r2.push(Ye(n)), n = addMonths(n, 1);
  return r2;
}
var It;
var Ot = react_onclickoutside_es_default(function(t2) {
  De(o, import_react2.default.Component);
  var n = Se(o);
  function o(t3) {
    var r2;
    return he(this, o), ve(ke(r2 = n.call(this, t3)), "renderOptions", function() {
      return r2.state.monthYearsList.map(function(t4) {
        var n2 = getTime(t4), o2 = Ve(r2.props.date, t4) && qe(r2.props.date, t4);
        return import_react2.default.createElement("div", { className: o2 ? "react-datepicker__month-year-option--selected_month-year" : "react-datepicker__month-year-option", key: n2, onClick: r2.onChange.bind(ke(r2), n2), "aria-selected": o2 ? "true" : void 0 }, o2 ? import_react2.default.createElement("span", { className: "react-datepicker__month-year-option--selected" }, "✓") : "", Te(t4, r2.props.dateFormat, r2.props.locale));
      });
    }), ve(ke(r2), "onChange", function(e2) {
      return r2.props.onChange(e2);
    }), ve(ke(r2), "handleClickOutside", function() {
      r2.props.onCancel();
    }), r2.state = { monthYearsList: Yt(r2.props.minDate, r2.props.maxDate) }, r2;
  }
  return fe(o, [{ key: "render", value: function() {
    var t3 = (0, import_classnames.default)({ "react-datepicker__month-year-dropdown": true, "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown });
    return import_react2.default.createElement("div", { className: t3 }, this.renderOptions());
  } }]), o;
}());
var Tt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
      a[s] = arguments[s];
    return ve(ke(t3 = r2.call.apply(r2, [this].concat(a))), "state", { dropdownVisible: false }), ve(ke(t3), "renderSelectOptions", function() {
      for (var r3 = Qe(t3.props.minDate), n2 = Qe(t3.props.maxDate), o2 = []; !isAfter(r3, n2); ) {
        var a2 = getTime(r3);
        o2.push(import_react2.default.createElement("option", { key: a2, value: a2 }, Te(r3, t3.props.dateFormat, t3.props.locale))), r3 = addMonths(r3, 1);
      }
      return o2;
    }), ve(ke(t3), "onSelectChange", function(e2) {
      t3.onChange(e2.target.value);
    }), ve(ke(t3), "renderSelectMode", function() {
      return import_react2.default.createElement("select", { value: getTime(Qe(t3.props.date)), className: "react-datepicker__month-year-select", onChange: t3.onSelectChange }, t3.renderSelectOptions());
    }), ve(ke(t3), "renderReadView", function(r3) {
      var n2 = Te(t3.props.date, t3.props.dateFormat, t3.props.locale);
      return import_react2.default.createElement("div", { key: "read", style: { visibility: r3 ? "visible" : "hidden" }, className: "react-datepicker__month-year-read-view", onClick: function(e2) {
        return t3.toggleDropdown(e2);
      } }, import_react2.default.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }), import_react2.default.createElement("span", { className: "react-datepicker__month-year-read-view--selected-month-year" }, n2));
    }), ve(ke(t3), "renderDropdown", function() {
      return import_react2.default.createElement(Ot, { key: "dropdown", date: t3.props.date, dateFormat: t3.props.dateFormat, onChange: t3.onChange, onCancel: t3.toggleDropdown, minDate: t3.props.minDate, maxDate: t3.props.maxDate, scrollableMonthYearDropdown: t3.props.scrollableMonthYearDropdown, locale: t3.props.locale });
    }), ve(ke(t3), "renderScrollMode", function() {
      var e2 = t3.state.dropdownVisible, r3 = [t3.renderReadView(!e2)];
      return e2 && r3.unshift(t3.renderDropdown()), r3;
    }), ve(ke(t3), "onChange", function(e2) {
      t3.toggleDropdown();
      var r3 = Ye(parseInt(e2));
      Ve(t3.props.date, r3) && qe(t3.props.date, r3) || t3.props.onChange(r3);
    }), ve(ke(t3), "toggleDropdown", function() {
      return t3.setState({ dropdownVisible: !t3.state.dropdownVisible });
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    var t3;
    switch (this.props.dropdownMode) {
      case "scroll":
        t3 = this.renderScrollMode();
        break;
      case "select":
        t3 = this.renderSelectMode();
    }
    return import_react2.default.createElement("div", { className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode) }, t3);
  } }]), n;
}();
var Rt = function(t2) {
  De(o, import_react2.default.Component);
  var n = Se(o);
  function o() {
    var t3;
    he(this, o);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return ve(ke(t3 = n.call.apply(n, [this].concat(s))), "dayEl", import_react2.default.createRef()), ve(ke(t3), "handleClick", function(e2) {
      !t3.isDisabled() && t3.props.onClick && t3.props.onClick(e2);
    }), ve(ke(t3), "handleMouseEnter", function(e2) {
      !t3.isDisabled() && t3.props.onMouseEnter && t3.props.onMouseEnter(e2);
    }), ve(ke(t3), "handleOnKeyDown", function(e2) {
      " " === e2.key && (e2.preventDefault(), e2.key = "Enter"), t3.props.handleOnKeyDown(e2);
    }), ve(ke(t3), "isSameDay", function(e2) {
      return ze(t3.props.day, e2);
    }), ve(ke(t3), "isKeyboardSelected", function() {
      return !t3.props.disabledKeyboardNavigation && !t3.isSameDay(t3.props.selected) && t3.isSameDay(t3.props.preSelection);
    }), ve(ke(t3), "isDisabled", function() {
      return ot(t3.props.day, t3.props);
    }), ve(ke(t3), "isExcluded", function() {
      return at(t3.props.day, t3.props);
    }), ve(ke(t3), "getHighLightedClass", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.highlightDates;
      if (!n2)
        return false;
      var o2 = Te(r2, "MM.dd.yyyy");
      return n2.get(o2);
    }), ve(ke(t3), "isInRange", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.startDate, o2 = e2.endDate;
      return !(!n2 || !o2) && Ge(r2, n2, o2);
    }), ve(ke(t3), "isInSelectingRange", function() {
      var e2, r2 = t3.props, n2 = r2.day, o2 = r2.selectsStart, a2 = r2.selectsEnd, s2 = r2.selectsRange, i2 = r2.selectsDisabledDaysInRange, p = r2.startDate, c = r2.endDate, l = null !== (e2 = t3.props.selectingDate) && void 0 !== e2 ? e2 : t3.props.preSelection;
      return !(!(o2 || a2 || s2) || !l || !i2 && t3.isDisabled()) && (o2 && c && (isBefore(l, c) || $e(l, c)) ? Ge(n2, l, c) : (a2 && p && (isAfter(l, p) || $e(l, p)) || !(!s2 || !p || c || !isAfter(l, p) && !$e(l, p))) && Ge(n2, p, l));
    }), ve(ke(t3), "isSelectingRangeStart", function() {
      var e2;
      if (!t3.isInSelectingRange())
        return false;
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.selectsStart, s2 = null !== (e2 = t3.props.selectingDate) && void 0 !== e2 ? e2 : t3.props.preSelection;
      return ze(n2, a2 ? s2 : o2);
    }), ve(ke(t3), "isSelectingRangeEnd", function() {
      var e2;
      if (!t3.isInSelectingRange())
        return false;
      var r2 = t3.props, n2 = r2.day, o2 = r2.endDate, a2 = r2.selectsEnd, s2 = r2.selectsRange, i2 = null !== (e2 = t3.props.selectingDate) && void 0 !== e2 ? e2 : t3.props.preSelection;
      return ze(n2, a2 || s2 ? i2 : o2);
    }), ve(ke(t3), "isRangeStart", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.startDate, o2 = e2.endDate;
      return !(!n2 || !o2) && ze(n2, r2);
    }), ve(ke(t3), "isRangeEnd", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.startDate, o2 = e2.endDate;
      return !(!n2 || !o2) && ze(o2, r2);
    }), ve(ke(t3), "isWeekend", function() {
      var e2 = getDay(t3.props.day);
      return 0 === e2 || 6 === e2;
    }), ve(ke(t3), "isAfterMonth", function() {
      return void 0 !== t3.props.month && (t3.props.month + 1) % 12 === getMonth(t3.props.day);
    }), ve(ke(t3), "isBeforeMonth", function() {
      return void 0 !== t3.props.month && (getMonth(t3.props.day) + 1) % 12 === t3.props.month;
    }), ve(ke(t3), "isCurrentDay", function() {
      return t3.isSameDay(Ye());
    }), ve(ke(t3), "isSelected", function() {
      return t3.isSameDay(t3.props.selected);
    }), ve(ke(t3), "getClassNames", function(e2) {
      var n2 = t3.props.dayClassName ? t3.props.dayClassName(e2) : void 0;
      return (0, import_classnames.default)("react-datepicker__day", n2, "react-datepicker__day--" + Ae(t3.props.day), { "react-datepicker__day--disabled": t3.isDisabled(), "react-datepicker__day--excluded": t3.isExcluded(), "react-datepicker__day--selected": t3.isSelected(), "react-datepicker__day--keyboard-selected": t3.isKeyboardSelected(), "react-datepicker__day--range-start": t3.isRangeStart(), "react-datepicker__day--range-end": t3.isRangeEnd(), "react-datepicker__day--in-range": t3.isInRange(), "react-datepicker__day--in-selecting-range": t3.isInSelectingRange(), "react-datepicker__day--selecting-range-start": t3.isSelectingRangeStart(), "react-datepicker__day--selecting-range-end": t3.isSelectingRangeEnd(), "react-datepicker__day--today": t3.isCurrentDay(), "react-datepicker__day--weekend": t3.isWeekend(), "react-datepicker__day--outside-month": t3.isAfterMonth() || t3.isBeforeMonth() }, t3.getHighLightedClass("react-datepicker__day--highlighted"));
    }), ve(ke(t3), "getAriaLabel", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.ariaLabelPrefixWhenEnabled, o2 = void 0 === n2 ? "Choose" : n2, a2 = e2.ariaLabelPrefixWhenDisabled, s2 = void 0 === a2 ? "Not available" : a2, i2 = t3.isDisabled() || t3.isExcluded() ? s2 : o2;
      return "".concat(i2, " ").concat(Te(r2, "PPPP", t3.props.locale));
    }), ve(ke(t3), "getTabIndex", function(e2, r2) {
      var n2 = e2 || t3.props.selected, o2 = r2 || t3.props.preSelection;
      return t3.isKeyboardSelected() || t3.isSameDay(n2) && ze(o2, n2) ? 0 : -1;
    }), ve(ke(t3), "handleFocusDay", function() {
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = false;
      0 === t3.getTabIndex() && !e2.isInputFocused && t3.isSameDay(t3.props.preSelection) && (document.activeElement && document.activeElement !== document.body || (r2 = true), t3.props.inline && !t3.props.shouldFocusDayInline && (r2 = false), t3.props.containerRef && t3.props.containerRef.current && t3.props.containerRef.current.contains(document.activeElement) && document.activeElement.classList.contains("react-datepicker__day") && (r2 = true), t3.props.monthShowsDuplicateDaysEnd && t3.isAfterMonth() && (r2 = false), t3.props.monthShowsDuplicateDaysStart && t3.isBeforeMonth() && (r2 = false)), r2 && t3.dayEl.current.focus({ preventScroll: true });
    }), ve(ke(t3), "renderDayContents", function() {
      return t3.props.monthShowsDuplicateDaysEnd && t3.isAfterMonth() || t3.props.monthShowsDuplicateDaysStart && t3.isBeforeMonth() ? null : t3.props.renderDayContents ? t3.props.renderDayContents(getDate(t3.props.day), t3.props.day) : getDate(t3.props.day);
    }), ve(ke(t3), "render", function() {
      return import_react2.default.createElement("div", { ref: t3.dayEl, className: t3.getClassNames(t3.props.day), onKeyDown: t3.handleOnKeyDown, onClick: t3.handleClick, onMouseEnter: t3.handleMouseEnter, tabIndex: t3.getTabIndex(), "aria-label": t3.getAriaLabel(), role: "option", "aria-disabled": t3.isDisabled(), "aria-current": t3.isCurrentDay() ? "date" : void 0, "aria-selected": t3.isSelected() || t3.isInRange() }, t3.renderDayContents());
    }), t3;
  }
  return fe(o, [{ key: "componentDidMount", value: function() {
    this.handleFocusDay();
  } }, { key: "componentDidUpdate", value: function(e2) {
    this.handleFocusDay(e2);
  } }]), o;
}();
var Lt = function(t2) {
  De(o, import_react2.default.Component);
  var n = Se(o);
  function o() {
    var e2;
    he(this, o);
    for (var t3 = arguments.length, r2 = new Array(t3), a = 0; a < t3; a++)
      r2[a] = arguments[a];
    return ve(ke(e2 = n.call.apply(n, [this].concat(r2))), "handleClick", function(t4) {
      e2.props.onClick && e2.props.onClick(t4);
    }), e2;
  }
  return fe(o, [{ key: "render", value: function() {
    var t3 = this.props, n2 = t3.weekNumber, o2 = t3.ariaLabelPrefix, a = void 0 === o2 ? "week " : o2, s = { "react-datepicker__week-number": true, "react-datepicker__week-number--clickable": !!t3.onClick };
    return import_react2.default.createElement("div", { className: (0, import_classnames.default)(s), "aria-label": "".concat(a, " ").concat(this.props.weekNumber), onClick: this.handleClick }, n2);
  } }], [{ key: "defaultProps", get: function() {
    return { ariaLabelPrefix: "week " };
  } }]), o;
}();
var Ft = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++)
      a[s] = arguments[s];
    return ve(ke(t3 = r2.call.apply(r2, [this].concat(a))), "handleDayClick", function(e2, r3) {
      t3.props.onDayClick && t3.props.onDayClick(e2, r3);
    }), ve(ke(t3), "handleDayMouseEnter", function(e2) {
      t3.props.onDayMouseEnter && t3.props.onDayMouseEnter(e2);
    }), ve(ke(t3), "handleWeekClick", function(e2, r3, n2) {
      "function" == typeof t3.props.onWeekSelect && t3.props.onWeekSelect(e2, r3, n2), t3.props.shouldCloseOnSelect && t3.props.setOpen(false);
    }), ve(ke(t3), "formatWeekNumber", function(e2) {
      return t3.props.formatWeekNumber ? t3.props.formatWeekNumber(e2) : Fe(e2);
    }), ve(ke(t3), "renderDays", function() {
      var r3 = Be(t3.props.day, t3.props.locale, t3.props.calendarStartDay), n2 = [], o2 = t3.formatWeekNumber(r3);
      if (t3.props.showWeekNumber) {
        var a2 = t3.props.onWeekSelect ? t3.handleWeekClick.bind(ke(t3), r3, o2) : void 0;
        n2.push(import_react2.default.createElement(Lt, { key: "W", weekNumber: o2, onClick: a2, ariaLabelPrefix: t3.props.ariaLabelPrefix }));
      }
      return n2.concat([0, 1, 2, 3, 4, 5, 6].map(function(n3) {
        var o3 = addDays(r3, n3);
        return import_react2.default.createElement(Rt, { ariaLabelPrefixWhenEnabled: t3.props.chooseDayAriaLabelPrefix, ariaLabelPrefixWhenDisabled: t3.props.disabledDayAriaLabelPrefix, key: o3.valueOf(), day: o3, month: t3.props.month, onClick: t3.handleDayClick.bind(ke(t3), o3), onMouseEnter: t3.handleDayMouseEnter.bind(ke(t3), o3), minDate: t3.props.minDate, maxDate: t3.props.maxDate, excludeDates: t3.props.excludeDates, excludeDateIntervals: t3.props.excludeDateIntervals, includeDates: t3.props.includeDates, includeDateIntervals: t3.props.includeDateIntervals, highlightDates: t3.props.highlightDates, selectingDate: t3.props.selectingDate, filterDate: t3.props.filterDate, preSelection: t3.props.preSelection, selected: t3.props.selected, selectsStart: t3.props.selectsStart, selectsEnd: t3.props.selectsEnd, selectsRange: t3.props.selectsRange, selectsDisabledDaysInRange: t3.props.selectsDisabledDaysInRange, startDate: t3.props.startDate, endDate: t3.props.endDate, dayClassName: t3.props.dayClassName, renderDayContents: t3.props.renderDayContents, disabledKeyboardNavigation: t3.props.disabledKeyboardNavigation, handleOnKeyDown: t3.props.handleOnKeyDown, isInputFocused: t3.props.isInputFocused, containerRef: t3.props.containerRef, inline: t3.props.inline, shouldFocusDayInline: t3.props.shouldFocusDayInline, monthShowsDuplicateDaysEnd: t3.props.monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart: t3.props.monthShowsDuplicateDaysStart, locale: t3.props.locale });
      }));
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    return import_react2.default.createElement("div", { className: "react-datepicker__week" }, this.renderDays());
  } }], [{ key: "defaultProps", get: function() {
    return { shouldCloseOnSelect: true };
  } }]), n;
}();
var At = "two_columns";
var Kt = "three_columns";
var Bt = "four_columns";
var Qt = (ve(It = {}, At, { grid: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]], verticalNavigationOffset: 2 }), ve(It, Kt, { grid: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]], verticalNavigationOffset: 3 }), ve(It, Bt, { grid: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]], verticalNavigationOffset: 4 }), It);
function Wt(e2, t2) {
  return e2 ? Bt : t2 ? At : Kt;
}
var jt = function(t2) {
  De(o, import_react2.default.Component);
  var n = Se(o);
  function o() {
    var t3;
    he(this, o);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return ve(ke(t3 = n.call.apply(n, [this].concat(s))), "MONTH_REFS", Ce(Array(12)).map(function() {
      return import_react2.default.createRef();
    })), ve(ke(t3), "QUARTER_REFS", Ce(Array(4)).map(function() {
      return import_react2.default.createRef();
    })), ve(ke(t3), "isDisabled", function(e2) {
      return ot(e2, t3.props);
    }), ve(ke(t3), "isExcluded", function(e2) {
      return at(e2, t3.props);
    }), ve(ke(t3), "handleDayClick", function(e2, r2) {
      t3.props.onDayClick && t3.props.onDayClick(e2, r2, t3.props.orderInDisplay);
    }), ve(ke(t3), "handleDayMouseEnter", function(e2) {
      t3.props.onDayMouseEnter && t3.props.onDayMouseEnter(e2);
    }), ve(ke(t3), "handleMouseLeave", function() {
      t3.props.onMouseLeave && t3.props.onMouseLeave();
    }), ve(ke(t3), "isRangeStartMonth", function(e2) {
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.endDate;
      return !(!o2 || !a2) && qe(setMonth(n2, e2), o2);
    }), ve(ke(t3), "isRangeStartQuarter", function(e2) {
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.endDate;
      return !(!o2 || !a2) && Ue(setQuarter(n2, e2), o2);
    }), ve(ke(t3), "isRangeEndMonth", function(e2) {
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.endDate;
      return !(!o2 || !a2) && qe(setMonth(n2, e2), a2);
    }), ve(ke(t3), "isRangeEndQuarter", function(e2) {
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.endDate;
      return !(!o2 || !a2) && Ue(setQuarter(n2, e2), a2);
    }), ve(ke(t3), "isInSelectingRangeMonth", function(e2) {
      var r2, n2 = t3.props, o2 = n2.day, a2 = n2.selectsStart, s2 = n2.selectsEnd, i2 = n2.selectsRange, p = n2.startDate, c = n2.endDate, l = null !== (r2 = t3.props.selectingDate) && void 0 !== r2 ? r2 : t3.props.preSelection;
      return !(!(a2 || s2 || i2) || !l) && (a2 && c ? it(l, c, e2, o2) : (s2 && p || !(!i2 || !p || c)) && it(p, l, e2, o2));
    }), ve(ke(t3), "isSelectingMonthRangeStart", function(e2) {
      var r2;
      if (!t3.isInSelectingRangeMonth(e2))
        return false;
      var n2 = t3.props, o2 = n2.day, a2 = n2.startDate, s2 = n2.selectsStart, i2 = setMonth(o2, e2), p = null !== (r2 = t3.props.selectingDate) && void 0 !== r2 ? r2 : t3.props.preSelection;
      return qe(i2, s2 ? p : a2);
    }), ve(ke(t3), "isSelectingMonthRangeEnd", function(e2) {
      var r2;
      if (!t3.isInSelectingRangeMonth(e2))
        return false;
      var n2 = t3.props, o2 = n2.day, a2 = n2.endDate, s2 = n2.selectsEnd, i2 = n2.selectsRange, p = setMonth(o2, e2), c = null !== (r2 = t3.props.selectingDate) && void 0 !== r2 ? r2 : t3.props.preSelection;
      return qe(p, s2 || i2 ? c : a2);
    }), ve(ke(t3), "isInSelectingRangeQuarter", function(e2) {
      var r2, n2 = t3.props, o2 = n2.day, a2 = n2.selectsStart, s2 = n2.selectsEnd, i2 = n2.selectsRange, p = n2.startDate, c = n2.endDate, l = null !== (r2 = t3.props.selectingDate) && void 0 !== r2 ? r2 : t3.props.preSelection;
      return !(!(a2 || s2 || i2) || !l) && (a2 && c ? dt(l, c, e2, o2) : (s2 && p || !(!i2 || !p || c)) && dt(p, l, e2, o2));
    }), ve(ke(t3), "isWeekInMonth", function(e2) {
      var r2 = t3.props.day, n2 = addDays(e2, 6);
      return qe(e2, r2) || qe(n2, r2);
    }), ve(ke(t3), "isCurrentMonth", function(e2, t4) {
      return getYear(e2) === getYear(Ye()) && t4 === getMonth(Ye());
    }), ve(ke(t3), "isCurrentQuarter", function(e2, t4) {
      return getYear(e2) === getYear(Ye()) && t4 === getQuarter(Ye());
    }), ve(ke(t3), "isSelectedMonth", function(e2, t4, r2) {
      return getMonth(r2) === t4 && getYear(e2) === getYear(r2);
    }), ve(ke(t3), "isSelectedQuarter", function(e2, t4, r2) {
      return getQuarter(e2) === t4 && getYear(e2) === getYear(r2);
    }), ve(ke(t3), "renderWeeks", function() {
      for (var r2 = [], n2 = t3.props.fixedHeight, o2 = 0, a2 = false, s2 = Be(Qe(t3.props.day), t3.props.locale, t3.props.calendarStartDay); r2.push(import_react2.default.createElement(Ft, { ariaLabelPrefix: t3.props.weekAriaLabelPrefix, chooseDayAriaLabelPrefix: t3.props.chooseDayAriaLabelPrefix, disabledDayAriaLabelPrefix: t3.props.disabledDayAriaLabelPrefix, key: o2, day: s2, month: getMonth(t3.props.day), onDayClick: t3.handleDayClick, onDayMouseEnter: t3.handleDayMouseEnter, onWeekSelect: t3.props.onWeekSelect, formatWeekNumber: t3.props.formatWeekNumber, locale: t3.props.locale, minDate: t3.props.minDate, maxDate: t3.props.maxDate, excludeDates: t3.props.excludeDates, excludeDateIntervals: t3.props.excludeDateIntervals, includeDates: t3.props.includeDates, includeDateIntervals: t3.props.includeDateIntervals, inline: t3.props.inline, shouldFocusDayInline: t3.props.shouldFocusDayInline, highlightDates: t3.props.highlightDates, selectingDate: t3.props.selectingDate, filterDate: t3.props.filterDate, preSelection: t3.props.preSelection, selected: t3.props.selected, selectsStart: t3.props.selectsStart, selectsEnd: t3.props.selectsEnd, selectsRange: t3.props.selectsRange, selectsDisabledDaysInRange: t3.props.selectsDisabledDaysInRange, showWeekNumber: t3.props.showWeekNumbers, startDate: t3.props.startDate, endDate: t3.props.endDate, dayClassName: t3.props.dayClassName, setOpen: t3.props.setOpen, shouldCloseOnSelect: t3.props.shouldCloseOnSelect, disabledKeyboardNavigation: t3.props.disabledKeyboardNavigation, renderDayContents: t3.props.renderDayContents, handleOnKeyDown: t3.props.handleOnKeyDown, isInputFocused: t3.props.isInputFocused, containerRef: t3.props.containerRef, calendarStartDay: t3.props.calendarStartDay, monthShowsDuplicateDaysEnd: t3.props.monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart: t3.props.monthShowsDuplicateDaysStart })), !a2; ) {
        o2++, s2 = addWeeks(s2, 1);
        var i2 = n2 && o2 >= 6, p = !n2 && !t3.isWeekInMonth(s2);
        if (i2 || p) {
          if (!t3.props.peekNextMonth)
            break;
          a2 = true;
        }
      }
      return r2;
    }), ve(ke(t3), "onMonthClick", function(e2, r2) {
      t3.handleDayClick(Qe(setMonth(t3.props.day, r2)), e2);
    }), ve(ke(t3), "onMonthMouseEnter", function(e2) {
      t3.handleDayMouseEnter(Qe(setMonth(t3.props.day, e2)));
    }), ve(ke(t3), "handleMonthNavigation", function(e2, r2) {
      t3.isDisabled(r2) || t3.isExcluded(r2) || (t3.props.setPreSelection(r2), t3.MONTH_REFS[e2].current && t3.MONTH_REFS[e2].current.focus());
    }), ve(ke(t3), "onMonthKeyDown", function(e2, r2) {
      var n2 = t3.props, o2 = n2.selected, a2 = n2.preSelection, s2 = n2.disabledKeyboardNavigation, i2 = n2.showTwoColumnMonthYearPicker, p = n2.showFourColumnMonthYearPicker, c = n2.setPreSelection, d = e2.key;
      if ("Tab" !== d && e2.preventDefault(), !s2) {
        var u = Wt(p, i2), h = Qt[u].verticalNavigationOffset, m = Qt[u].grid;
        switch (d) {
          case "Enter":
            t3.onMonthClick(e2, r2), c(o2);
            break;
          case "ArrowRight":
            t3.handleMonthNavigation(11 === r2 ? 0 : r2 + 1, addMonths(a2, 1));
            break;
          case "ArrowLeft":
            t3.handleMonthNavigation(0 === r2 ? 11 : r2 - 1, subMonths(a2, 1));
            break;
          case "ArrowUp":
            t3.handleMonthNavigation(m[0].includes(r2) ? r2 + 12 - h : r2 - h, subMonths(a2, h));
            break;
          case "ArrowDown":
            t3.handleMonthNavigation(m[m.length - 1].includes(r2) ? r2 - 12 + h : r2 + h, addMonths(a2, h));
        }
      }
    }), ve(ke(t3), "onQuarterClick", function(e2, r2) {
      t3.handleDayClick(je(setQuarter(t3.props.day, r2)), e2);
    }), ve(ke(t3), "onQuarterMouseEnter", function(e2) {
      t3.handleDayMouseEnter(je(setQuarter(t3.props.day, e2)));
    }), ve(ke(t3), "handleQuarterNavigation", function(e2, r2) {
      t3.isDisabled(r2) || t3.isExcluded(r2) || (t3.props.setPreSelection(r2), t3.QUARTER_REFS[e2 - 1].current && t3.QUARTER_REFS[e2 - 1].current.focus());
    }), ve(ke(t3), "onQuarterKeyDown", function(e2, r2) {
      var n2 = e2.key;
      if (!t3.props.disabledKeyboardNavigation)
        switch (n2) {
          case "Enter":
            t3.onQuarterClick(e2, r2), t3.props.setPreSelection(t3.props.selected);
            break;
          case "ArrowRight":
            t3.handleQuarterNavigation(4 === r2 ? 1 : r2 + 1, addQuarters(t3.props.preSelection, 1));
            break;
          case "ArrowLeft":
            t3.handleQuarterNavigation(1 === r2 ? 4 : r2 - 1, subQuarters(t3.props.preSelection, 1));
        }
    }), ve(ke(t3), "getMonthClassNames", function(e2) {
      var n2 = t3.props, o2 = n2.day, a2 = n2.startDate, s2 = n2.endDate, i2 = n2.selected, p = n2.minDate, c = n2.maxDate, l = n2.preSelection, d = n2.monthClassName, u = n2.excludeDates, h = n2.includeDates, m = d ? d(setMonth(o2, e2)) : void 0, f = setMonth(o2, e2);
      return (0, import_classnames.default)("react-datepicker__month-text", "react-datepicker__month-".concat(e2), m, { "react-datepicker__month-text--disabled": (p || c || u || h) && st(f, t3.props), "react-datepicker__month-text--selected": t3.isSelectedMonth(o2, e2, i2), "react-datepicker__month-text--keyboard-selected": !t3.props.disabledKeyboardNavigation && getMonth(l) === e2, "react-datepicker__month-text--in-selecting-range": t3.isInSelectingRangeMonth(e2), "react-datepicker__month-text--in-range": it(a2, s2, e2, o2), "react-datepicker__month-text--range-start": t3.isRangeStartMonth(e2), "react-datepicker__month-text--range-end": t3.isRangeEndMonth(e2), "react-datepicker__month-text--selecting-range-start": t3.isSelectingMonthRangeStart(e2), "react-datepicker__month-text--selecting-range-end": t3.isSelectingMonthRangeEnd(e2), "react-datepicker__month-text--today": t3.isCurrentMonth(o2, e2) });
    }), ve(ke(t3), "getTabIndex", function(e2) {
      var r2 = getMonth(t3.props.preSelection);
      return t3.props.disabledKeyboardNavigation || e2 !== r2 ? "-1" : "0";
    }), ve(ke(t3), "getQuarterTabIndex", function(e2) {
      var r2 = getQuarter(t3.props.preSelection);
      return t3.props.disabledKeyboardNavigation || e2 !== r2 ? "-1" : "0";
    }), ve(ke(t3), "getAriaLabel", function(e2) {
      var r2 = t3.props, n2 = r2.chooseDayAriaLabelPrefix, o2 = void 0 === n2 ? "Choose" : n2, a2 = r2.disabledDayAriaLabelPrefix, s2 = void 0 === a2 ? "Not available" : a2, i2 = r2.day, p = setMonth(i2, e2), c = t3.isDisabled(p) || t3.isExcluded(p) ? s2 : o2;
      return "".concat(c, " ").concat(Te(p, "MMMM yyyy"));
    }), ve(ke(t3), "getQuarterClassNames", function(e2) {
      var n2 = t3.props, o2 = n2.day, a2 = n2.startDate, s2 = n2.endDate, i2 = n2.selected, p = n2.minDate, c = n2.maxDate, l = n2.preSelection;
      return (0, import_classnames.default)("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(e2), { "react-datepicker__quarter-text--disabled": (p || c) && pt(setQuarter(o2, e2), t3.props), "react-datepicker__quarter-text--selected": t3.isSelectedQuarter(o2, e2, i2), "react-datepicker__quarter-text--keyboard-selected": getQuarter(l) === e2, "react-datepicker__quarter-text--in-selecting-range": t3.isInSelectingRangeQuarter(e2), "react-datepicker__quarter-text--in-range": dt(a2, s2, e2, o2), "react-datepicker__quarter-text--range-start": t3.isRangeStartQuarter(e2), "react-datepicker__quarter-text--range-end": t3.isRangeEndQuarter(e2) });
    }), ve(ke(t3), "getMonthContent", function(e2) {
      var r2 = t3.props, n2 = r2.showFullMonthYearPicker, o2 = r2.renderMonthContent, a2 = r2.locale, s2 = rt(e2, a2), i2 = tt(e2, a2);
      return o2 ? o2(e2, s2, i2) : n2 ? i2 : s2;
    }), ve(ke(t3), "getQuarterContent", function(e2) {
      var r2 = t3.props, n2 = r2.renderQuarterContent, o2 = nt(e2, r2.locale);
      return n2 ? n2(e2, o2) : o2;
    }), ve(ke(t3), "renderMonths", function() {
      var r2 = t3.props, n2 = r2.showTwoColumnMonthYearPicker, o2 = r2.showFourColumnMonthYearPicker, a2 = r2.day, s2 = r2.selected;
      return Qt[Wt(o2, n2)].grid.map(function(r3, n3) {
        return import_react2.default.createElement("div", { className: "react-datepicker__month-wrapper", key: n3 }, r3.map(function(r4, n4) {
          return import_react2.default.createElement("div", { ref: t3.MONTH_REFS[r4], key: n4, onClick: function(e2) {
            t3.onMonthClick(e2, r4);
          }, onKeyDown: function(e2) {
            t3.onMonthKeyDown(e2, r4);
          }, onMouseEnter: function() {
            return t3.onMonthMouseEnter(r4);
          }, tabIndex: t3.getTabIndex(r4), className: t3.getMonthClassNames(r4), role: "option", "aria-label": t3.getAriaLabel(r4), "aria-current": t3.isCurrentMonth(a2, r4) ? "date" : void 0, "aria-selected": t3.isSelectedMonth(a2, r4, s2) }, t3.getMonthContent(r4));
        }));
      });
    }), ve(ke(t3), "renderQuarters", function() {
      var r2 = t3.props, n2 = r2.day, o2 = r2.selected;
      return import_react2.default.createElement("div", { className: "react-datepicker__quarter-wrapper" }, [1, 2, 3, 4].map(function(r3, a2) {
        return import_react2.default.createElement("div", { key: a2, ref: t3.QUARTER_REFS[a2], role: "option", onClick: function(e2) {
          t3.onQuarterClick(e2, r3);
        }, onKeyDown: function(e2) {
          t3.onQuarterKeyDown(e2, r3);
        }, onMouseEnter: function() {
          return t3.onQuarterMouseEnter(r3);
        }, className: t3.getQuarterClassNames(r3), "aria-selected": t3.isSelectedQuarter(n2, r3, o2), tabIndex: t3.getQuarterTabIndex(r3), "aria-current": t3.isCurrentQuarter(n2, r3) ? "date" : void 0 }, t3.getQuarterContent(r3));
      }));
    }), ve(ke(t3), "getClassNames", function() {
      var e2 = t3.props, n2 = e2.selectingDate, o2 = e2.selectsStart, a2 = e2.selectsEnd, s2 = e2.showMonthYearPicker, i2 = e2.showQuarterYearPicker;
      return (0, import_classnames.default)("react-datepicker__month", { "react-datepicker__month--selecting-range": n2 && (o2 || a2) }, { "react-datepicker__monthPicker": s2 }, { "react-datepicker__quarterPicker": i2 });
    }), t3;
  }
  return fe(o, [{ key: "render", value: function() {
    var t3 = this.props, r2 = t3.showMonthYearPicker, n2 = t3.showQuarterYearPicker, o2 = t3.day, a = t3.ariaLabelPrefix, s = void 0 === a ? "month " : a;
    return import_react2.default.createElement("div", { className: this.getClassNames(), onMouseLeave: this.handleMouseLeave, "aria-label": "".concat(s, " ").concat(Te(o2, "yyyy-MM")), role: "listbox" }, r2 ? this.renderMonths() : n2 ? this.renderQuarters() : this.renderWeeks());
  } }]), o;
}();
var Ht = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
      a[i] = arguments[i];
    return ve(ke(t3 = r2.call.apply(r2, [this].concat(a))), "state", { height: null }), ve(ke(t3), "handleClick", function(e2) {
      (t3.props.minTime || t3.props.maxTime) && ft(e2, t3.props) || (t3.props.excludeTimes || t3.props.includeTimes || t3.props.filterTime) && mt(e2, t3.props) || t3.props.onChange(e2);
    }), ve(ke(t3), "isSelectedTime", function(e2, r3, n2) {
      return t3.props.selected && r3 === getHours(e2) && n2 === getMinutes(e2);
    }), ve(ke(t3), "liClasses", function(e2, r3, n2) {
      var o2 = ["react-datepicker__time-list-item", t3.props.timeClassName ? t3.props.timeClassName(e2, r3, n2) : void 0];
      return t3.isSelectedTime(e2, r3, n2) && o2.push("react-datepicker__time-list-item--selected"), ((t3.props.minTime || t3.props.maxTime) && ft(e2, t3.props) || (t3.props.excludeTimes || t3.props.includeTimes || t3.props.filterTime) && mt(e2, t3.props)) && o2.push("react-datepicker__time-list-item--disabled"), t3.props.injectTimes && (60 * getHours(e2) + getMinutes(e2)) % t3.props.intervals != 0 && o2.push("react-datepicker__time-list-item--injected"), o2.join(" ");
    }), ve(ke(t3), "handleOnKeyDown", function(e2, r3) {
      " " === e2.key && (e2.preventDefault(), e2.key = "Enter"), "Enter" === e2.key && t3.handleClick(r3), t3.props.handleOnKeyDown(e2);
    }), ve(ke(t3), "renderTimes", function() {
      for (var r3 = [], n2 = t3.props.format ? t3.props.format : "p", o2 = t3.props.intervals, a2 = Ke(Ye(t3.props.selected)), i2 = 1440 / o2, p = t3.props.injectTimes && t3.props.injectTimes.sort(function(e2, t4) {
        return e2 - t4;
      }), c = t3.props.selected || t3.props.openToDate || Ye(), l = getHours(c), d = getMinutes(c), u = setHours(setMinutes(a2, d), l), h = 0; h < i2; h++) {
        var m = addMinutes(a2, h * o2);
        if (r3.push(m), p) {
          var f = St(a2, m, h, o2, p);
          r3 = r3.concat(f);
        }
      }
      return r3.map(function(r4, o3) {
        return import_react2.default.createElement("li", { key: o3, onClick: t3.handleClick.bind(ke(t3), r4), className: t3.liClasses(r4, l, d), ref: function(e2) {
          (isBefore(r4, u) || $e(r4, u)) && (t3.centerLi = e2);
        }, onKeyDown: function(e2) {
          t3.handleOnKeyDown(e2, r4);
        }, tabIndex: "0", "aria-selected": t3.isSelectedTime(r4, l, d) ? "true" : void 0 }, Te(r4, n2, t3.props.locale));
      });
    }), t3;
  }
  return fe(n, [{ key: "componentDidMount", value: function() {
    this.list.scrollTop = this.centerLi && n.calcCenterPosition(this.props.monthRef ? this.props.monthRef.clientHeight - this.header.clientHeight : this.list.clientHeight, this.centerLi), this.props.monthRef && this.header && this.setState({ height: this.props.monthRef.clientHeight - this.header.clientHeight });
  } }, { key: "render", value: function() {
    var t3 = this, r3 = this.state.height;
    return import_react2.default.createElement("div", { className: "react-datepicker__time-container ".concat(this.props.todayButton ? "react-datepicker__time-container--with-today-button" : "") }, import_react2.default.createElement("div", { className: "react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly ? "react-datepicker__header--time--only" : ""), ref: function(e2) {
      t3.header = e2;
    } }, import_react2.default.createElement("div", { className: "react-datepicker-time__header" }, this.props.timeCaption)), import_react2.default.createElement("div", { className: "react-datepicker__time" }, import_react2.default.createElement("div", { className: "react-datepicker__time-box" }, import_react2.default.createElement("ul", { className: "react-datepicker__time-list", ref: function(e2) {
      t3.list = e2;
    }, style: r3 ? { height: r3 } : {}, tabIndex: "0" }, this.renderTimes()))));
  } }], [{ key: "defaultProps", get: function() {
    return { intervals: 30, onTimeChange: function() {
    }, todayButton: null, timeCaption: "Time" };
  } }]), n;
}();
ve(Ht, "calcCenterPosition", function(e2, t2) {
  return t2.offsetTop - (e2 / 2 - t2.clientHeight / 2);
});
var Vt = function(t2) {
  De(o, import_react2.default.Component);
  var n = Se(o);
  function o(t3) {
    var a;
    return he(this, o), ve(ke(a = n.call(this, t3)), "YEAR_REFS", Ce(Array(a.props.yearItemNumber)).map(function() {
      return import_react2.default.createRef();
    })), ve(ke(a), "isDisabled", function(e2) {
      return ot(e2, a.props);
    }), ve(ke(a), "isExcluded", function(e2) {
      return at(e2, a.props);
    }), ve(ke(a), "selectingDate", function() {
      var e2;
      return null !== (e2 = a.props.selectingDate) && void 0 !== e2 ? e2 : a.props.preSelection;
    }), ve(ke(a), "updateFocusOnPaginate", function(e2) {
      var t4 = function() {
        this.YEAR_REFS[e2].current.focus();
      }.bind(ke(a));
      window.requestAnimationFrame(t4);
    }), ve(ke(a), "handleYearClick", function(e2, t4) {
      a.props.onDayClick && a.props.onDayClick(e2, t4);
    }), ve(ke(a), "handleYearNavigation", function(e2, t4) {
      var r2 = a.props, n2 = r2.date, o2 = r2.yearItemNumber, s = _t(n2, o2).startPeriod;
      a.isDisabled(t4) || a.isExcluded(t4) || (a.props.setPreSelection(t4), e2 - s == -1 ? a.updateFocusOnPaginate(o2 - 1) : e2 - s === o2 ? a.updateFocusOnPaginate(0) : a.YEAR_REFS[e2 - s].current.focus());
    }), ve(ke(a), "isSameDay", function(e2, t4) {
      return ze(e2, t4);
    }), ve(ke(a), "isCurrentYear", function(e2) {
      return e2 === getYear(Ye());
    }), ve(ke(a), "isRangeStart", function(e2) {
      return a.props.startDate && a.props.endDate && Ve(setYear(Ye(), e2), a.props.startDate);
    }), ve(ke(a), "isRangeEnd", function(e2) {
      return a.props.startDate && a.props.endDate && Ve(setYear(Ye(), e2), a.props.endDate);
    }), ve(ke(a), "isInRange", function(e2) {
      return ct(e2, a.props.startDate, a.props.endDate);
    }), ve(ke(a), "isInSelectingRange", function(e2) {
      var t4 = a.props, r2 = t4.selectsStart, n2 = t4.selectsEnd, o2 = t4.selectsRange, s = t4.startDate, i = t4.endDate;
      return !(!(r2 || n2 || o2) || !a.selectingDate()) && (r2 && i ? ct(e2, a.selectingDate(), i) : (n2 && s || !(!o2 || !s || i)) && ct(e2, s, a.selectingDate()));
    }), ve(ke(a), "isSelectingRangeStart", function(e2) {
      if (!a.isInSelectingRange(e2))
        return false;
      var t4 = a.props, r2 = t4.startDate, n2 = t4.selectsStart, o2 = setYear(Ye(), e2);
      return Ve(o2, n2 ? a.selectingDate() : r2);
    }), ve(ke(a), "isSelectingRangeEnd", function(e2) {
      if (!a.isInSelectingRange(e2))
        return false;
      var t4 = a.props, r2 = t4.endDate, n2 = t4.selectsEnd, o2 = t4.selectsRange, s = setYear(Ye(), e2);
      return Ve(s, n2 || o2 ? a.selectingDate() : r2);
    }), ve(ke(a), "isKeyboardSelected", function(e2) {
      var t4 = We(setYear(a.props.date, e2));
      return !a.props.disabledKeyboardNavigation && !a.props.inline && !ze(t4, We(a.props.selected)) && ze(t4, We(a.props.preSelection));
    }), ve(ke(a), "onYearClick", function(e2, t4) {
      var r2 = a.props.date;
      a.handleYearClick(We(setYear(r2, t4)), e2);
    }), ve(ke(a), "onYearKeyDown", function(e2, t4) {
      var r2 = e2.key;
      if (!a.props.disabledKeyboardNavigation)
        switch (r2) {
          case "Enter":
            a.onYearClick(e2, t4), a.props.setPreSelection(a.props.selected);
            break;
          case "ArrowRight":
            a.handleYearNavigation(t4 + 1, addYears(a.props.preSelection, 1));
            break;
          case "ArrowLeft":
            a.handleYearNavigation(t4 - 1, subYears(a.props.preSelection, 1));
        }
    }), ve(ke(a), "getYearClassNames", function(e2) {
      var t4 = a.props, n2 = t4.minDate, o2 = t4.maxDate, s = t4.selected, i = t4.excludeDates, p = t4.includeDates, c = t4.filterDate;
      return (0, import_classnames.default)("react-datepicker__year-text", { "react-datepicker__year-text--selected": e2 === getYear(s), "react-datepicker__year-text--disabled": (n2 || o2 || i || p || c) && lt(e2, a.props), "react-datepicker__year-text--keyboard-selected": a.isKeyboardSelected(e2), "react-datepicker__year-text--range-start": a.isRangeStart(e2), "react-datepicker__year-text--range-end": a.isRangeEnd(e2), "react-datepicker__year-text--in-range": a.isInRange(e2), "react-datepicker__year-text--in-selecting-range": a.isInSelectingRange(e2), "react-datepicker__year-text--selecting-range-start": a.isSelectingRangeStart(e2), "react-datepicker__year-text--selecting-range-end": a.isSelectingRangeEnd(e2), "react-datepicker__year-text--today": a.isCurrentYear(e2) });
    }), ve(ke(a), "getYearTabIndex", function(e2) {
      return a.props.disabledKeyboardNavigation ? "-1" : e2 === getYear(a.props.preSelection) ? "0" : "-1";
    }), ve(ke(a), "getYearContainerClassNames", function() {
      var e2 = a.props, t4 = e2.selectingDate, n2 = e2.selectsStart, o2 = e2.selectsEnd, s = e2.selectsRange;
      return (0, import_classnames.default)("react-datepicker__year", { "react-datepicker__year--selecting-range": t4 && (n2 || o2 || s) });
    }), ve(ke(a), "getYearContent", function(e2) {
      return a.props.renderYearContent ? a.props.renderYearContent(e2) : e2;
    }), a;
  }
  return fe(o, [{ key: "render", value: function() {
    for (var t3 = this, r2 = [], n2 = this.props, o2 = n2.date, a = n2.yearItemNumber, s = n2.onYearMouseEnter, i = n2.onYearMouseLeave, p = _t(o2, a), c = p.startPeriod, l = p.endPeriod, d = function(n3) {
      r2.push(import_react2.default.createElement("div", { ref: t3.YEAR_REFS[n3 - c], onClick: function(e2) {
        t3.onYearClick(e2, n3);
      }, onKeyDown: function(e2) {
        t3.onYearKeyDown(e2, n3);
      }, tabIndex: t3.getYearTabIndex(n3), className: t3.getYearClassNames(n3), onMouseEnter: function(e2) {
        return s(e2, n3);
      }, onMouseLeave: function(e2) {
        return i(e2, n3);
      }, key: n3, "aria-current": t3.isCurrentYear(n3) ? "date" : void 0 }, t3.getYearContent(n3)));
    }, u = c; u <= l; u++)
      d(u);
    return import_react2.default.createElement("div", { className: this.getYearContainerClassNames() }, import_react2.default.createElement("div", { className: "react-datepicker__year-wrapper", onMouseLeave: this.props.clearSelectingDate }, r2));
  } }]), o;
}();
var qt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n(t3) {
    var o;
    return he(this, n), ve(ke(o = r2.call(this, t3)), "onTimeChange", function(e2) {
      o.setState({ time: e2 });
      var t4 = /* @__PURE__ */ new Date();
      t4.setHours(e2.split(":")[0]), t4.setMinutes(e2.split(":")[1]), o.props.onChange(t4);
    }), ve(ke(o), "renderTimeInput", function() {
      var t4 = o.state.time, r3 = o.props, n2 = r3.date, a = r3.timeString, s = r3.customTimeInput;
      return s ? import_react2.default.cloneElement(s, { date: n2, value: t4, onChange: o.onTimeChange }) : import_react2.default.createElement("input", { type: "time", className: "react-datepicker-time__input", placeholder: "Time", name: "time-input", required: true, value: t4, onChange: function(e2) {
        o.onTimeChange(e2.target.value || a);
      } });
    }), o.state = { time: o.props.timeString }, o;
  }
  return fe(n, [{ key: "render", value: function() {
    return import_react2.default.createElement("div", { className: "react-datepicker__input-time-container" }, import_react2.default.createElement("div", { className: "react-datepicker-time__caption" }, this.props.timeInputLabel), import_react2.default.createElement("div", { className: "react-datepicker-time__input-container" }, import_react2.default.createElement("div", { className: "react-datepicker-time__input" }, this.renderTimeInput())));
  } }], [{ key: "getDerivedStateFromProps", value: function(e2, t3) {
    return e2.timeString !== t3.time ? { time: e2.timeString } : null;
  } }]), n;
}();
function Ut(t2) {
  var r2 = t2.className, n = t2.children, o = t2.showPopperArrow, a = t2.arrowProps, s = void 0 === a ? {} : a;
  return import_react2.default.createElement("div", { className: r2 }, o && import_react2.default.createElement("div", ye({ className: "react-datepicker__triangle" }, s)), n);
}
var zt = ["react-datepicker__year-select", "react-datepicker__month-select", "react-datepicker__month-year-select"];
var $t = function(t2) {
  De(o, import_react2.default.Component);
  var n = Se(o);
  function o(t3) {
    var a;
    return he(this, o), ve(ke(a = n.call(this, t3)), "handleClickOutside", function(e2) {
      a.props.onClickOutside(e2);
    }), ve(ke(a), "setClickOutsideRef", function() {
      return a.containerRef.current;
    }), ve(ke(a), "handleDropdownFocus", function(e2) {
      (function() {
        var e3 = ((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).className || "").split(/\s+/);
        return zt.some(function(t4) {
          return e3.indexOf(t4) >= 0;
        });
      })(e2.target) && a.props.onDropdownFocus();
    }), ve(ke(a), "getDateInView", function() {
      var e2 = a.props, t4 = e2.preSelection, r2 = e2.selected, n2 = e2.openToDate, o2 = wt(a.props), s = kt(a.props), i = Ye(), p = n2 || r2 || t4;
      return p || (o2 && isBefore(i, o2) ? o2 : s && isAfter(i, s) ? s : i);
    }), ve(ke(a), "increaseMonth", function() {
      a.setState(function(e2) {
        var t4 = e2.date;
        return { date: addMonths(t4, 1) };
      }, function() {
        return a.handleMonthChange(a.state.date);
      });
    }), ve(ke(a), "decreaseMonth", function() {
      a.setState(function(e2) {
        var t4 = e2.date;
        return { date: subMonths(t4, 1) };
      }, function() {
        return a.handleMonthChange(a.state.date);
      });
    }), ve(ke(a), "handleDayClick", function(e2, t4, r2) {
      a.props.onSelect(e2, t4, r2), a.props.setPreSelection && a.props.setPreSelection(e2);
    }), ve(ke(a), "handleDayMouseEnter", function(e2) {
      a.setState({ selectingDate: e2 }), a.props.onDayMouseEnter && a.props.onDayMouseEnter(e2);
    }), ve(ke(a), "handleMonthMouseLeave", function() {
      a.setState({ selectingDate: null }), a.props.onMonthMouseLeave && a.props.onMonthMouseLeave();
    }), ve(ke(a), "handleYearMouseEnter", function(e2, t4) {
      a.setState({ selectingDate: setYear(Ye(), t4) }), a.props.onYearMouseEnter && a.props.onYearMouseEnter(e2, t4);
    }), ve(ke(a), "handleYearMouseLeave", function(e2, t4) {
      a.props.onYearMouseLeave && a.props.onYearMouseLeave(e2, t4);
    }), ve(ke(a), "handleYearChange", function(e2) {
      a.props.onYearChange && (a.props.onYearChange(e2), a.setState({ isRenderAriaLiveMessage: true })), a.props.adjustDateOnChange && (a.props.onSelect && a.props.onSelect(e2), a.props.setOpen && a.props.setOpen(true)), a.props.setPreSelection && a.props.setPreSelection(e2);
    }), ve(ke(a), "handleMonthChange", function(e2) {
      a.handleCustomMonthChange(e2), a.props.adjustDateOnChange && (a.props.onSelect && a.props.onSelect(e2), a.props.setOpen && a.props.setOpen(true)), a.props.setPreSelection && a.props.setPreSelection(e2);
    }), ve(ke(a), "handleCustomMonthChange", function(e2) {
      a.props.onMonthChange && (a.props.onMonthChange(e2), a.setState({ isRenderAriaLiveMessage: true }));
    }), ve(ke(a), "handleMonthYearChange", function(e2) {
      a.handleYearChange(e2), a.handleMonthChange(e2);
    }), ve(ke(a), "changeYear", function(e2) {
      a.setState(function(t4) {
        var r2 = t4.date;
        return { date: setYear(r2, e2) };
      }, function() {
        return a.handleYearChange(a.state.date);
      });
    }), ve(ke(a), "changeMonth", function(e2) {
      a.setState(function(t4) {
        var r2 = t4.date;
        return { date: setMonth(r2, e2) };
      }, function() {
        return a.handleMonthChange(a.state.date);
      });
    }), ve(ke(a), "changeMonthYear", function(e2) {
      a.setState(function(t4) {
        var r2 = t4.date;
        return { date: setYear(setMonth(r2, getMonth(e2)), getYear(e2)) };
      }, function() {
        return a.handleMonthYearChange(a.state.date);
      });
    }), ve(ke(a), "header", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.state.date, n2 = Be(t4, a.props.locale, a.props.calendarStartDay), o2 = [];
      return a.props.showWeekNumbers && o2.push(import_react2.default.createElement("div", { key: "W", className: "react-datepicker__day-name" }, a.props.weekLabel || "#")), o2.concat([0, 1, 2, 3, 4, 5, 6].map(function(t5) {
        var o3 = addDays(n2, t5), s = a.formatWeekday(o3, a.props.locale), i = a.props.weekDayClassName ? a.props.weekDayClassName(o3) : void 0;
        return import_react2.default.createElement("div", { key: t5, className: (0, import_classnames.default)("react-datepicker__day-name", i) }, s);
      }));
    }), ve(ke(a), "formatWeekday", function(e2, t4) {
      return a.props.formatWeekDay ? function(e3, t5, r2) {
        return t5(Te(e3, "EEEE", r2));
      }(e2, a.props.formatWeekDay, t4) : a.props.useWeekdaysShort ? function(e3, t5) {
        return Te(e3, "EEE", t5);
      }(e2, t4) : function(e3, t5) {
        return Te(e3, "EEEEEE", t5);
      }(e2, t4);
    }), ve(ke(a), "decreaseYear", function() {
      a.setState(function(e2) {
        var t4 = e2.date;
        return { date: subYears(t4, a.props.showYearPicker ? a.props.yearItemNumber : 1) };
      }, function() {
        return a.handleYearChange(a.state.date);
      });
    }), ve(ke(a), "clearSelectingDate", function() {
      a.setState({ selectingDate: null });
    }), ve(ke(a), "renderPreviousButton", function() {
      if (!a.props.renderCustomHeader) {
        var t4;
        switch (true) {
          case a.props.showMonthYearPicker:
            t4 = Dt(a.state.date, a.props);
            break;
          case a.props.showYearPicker:
            t4 = function(e2) {
              var t5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r3 = t5.minDate, n3 = t5.yearItemNumber, o3 = void 0 === n3 ? 12 : n3, a2 = _t(We(subYears(e2, o3)), o3).endPeriod, s2 = r3 && getYear(r3);
              return s2 && s2 > a2 || false;
            }(a.state.date, a.props);
            break;
          default:
            t4 = vt(a.state.date, a.props);
        }
        if ((a.props.forceShowMonthNavigation || a.props.showDisabledMonthNavigation || !t4) && !a.props.showTimeSelectOnly) {
          var r2 = ["react-datepicker__navigation", "react-datepicker__navigation--previous"], n2 = a.decreaseMonth;
          (a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker) && (n2 = a.decreaseYear), t4 && a.props.showDisabledMonthNavigation && (r2.push("react-datepicker__navigation--previous--disabled"), n2 = null);
          var o2 = a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker, s = a.props, i = s.previousMonthButtonLabel, p = s.previousYearButtonLabel, c = a.props, l = c.previousMonthAriaLabel, d = void 0 === l ? "string" == typeof i ? i : "Previous Month" : l, u = c.previousYearAriaLabel, h = void 0 === u ? "string" == typeof p ? p : "Previous Year" : u;
          return import_react2.default.createElement("button", { type: "button", className: r2.join(" "), onClick: n2, onKeyDown: a.props.handleOnKeyDown, "aria-label": o2 ? h : d }, import_react2.default.createElement("span", { className: ["react-datepicker__navigation-icon", "react-datepicker__navigation-icon--previous"].join(" ") }, o2 ? a.props.previousYearButtonLabel : a.props.previousMonthButtonLabel));
        }
      }
    }), ve(ke(a), "increaseYear", function() {
      a.setState(function(e2) {
        var t4 = e2.date;
        return { date: addYears(t4, a.props.showYearPicker ? a.props.yearItemNumber : 1) };
      }, function() {
        return a.handleYearChange(a.state.date);
      });
    }), ve(ke(a), "renderNextButton", function() {
      if (!a.props.renderCustomHeader) {
        var t4;
        switch (true) {
          case a.props.showMonthYearPicker:
            t4 = gt(a.state.date, a.props);
            break;
          case a.props.showYearPicker:
            t4 = function(e2) {
              var t5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r3 = t5.maxDate, n3 = t5.yearItemNumber, o3 = void 0 === n3 ? 12 : n3, a2 = _t(addYears(e2, o3), o3).startPeriod, s2 = r3 && getYear(r3);
              return s2 && s2 < a2 || false;
            }(a.state.date, a.props);
            break;
          default:
            t4 = yt(a.state.date, a.props);
        }
        if ((a.props.forceShowMonthNavigation || a.props.showDisabledMonthNavigation || !t4) && !a.props.showTimeSelectOnly) {
          var r2 = ["react-datepicker__navigation", "react-datepicker__navigation--next"];
          a.props.showTimeSelect && r2.push("react-datepicker__navigation--next--with-time"), a.props.todayButton && r2.push("react-datepicker__navigation--next--with-today-button");
          var n2 = a.increaseMonth;
          (a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker) && (n2 = a.increaseYear), t4 && a.props.showDisabledMonthNavigation && (r2.push("react-datepicker__navigation--next--disabled"), n2 = null);
          var o2 = a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker, s = a.props, i = s.nextMonthButtonLabel, p = s.nextYearButtonLabel, c = a.props, l = c.nextMonthAriaLabel, d = void 0 === l ? "string" == typeof i ? i : "Next Month" : l, h = c.nextYearAriaLabel, m = void 0 === h ? "string" == typeof p ? p : "Next Year" : h;
          return import_react2.default.createElement("button", { type: "button", className: r2.join(" "), onClick: n2, onKeyDown: a.props.handleOnKeyDown, "aria-label": o2 ? m : d }, import_react2.default.createElement("span", { className: ["react-datepicker__navigation-icon", "react-datepicker__navigation-icon--next"].join(" ") }, o2 ? a.props.nextYearButtonLabel : a.props.nextMonthButtonLabel));
        }
      }
    }), ve(ke(a), "renderCurrentMonth", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.state.date, r2 = ["react-datepicker__current-month"];
      return a.props.showYearDropdown && r2.push("react-datepicker__current-month--hasYearDropdown"), a.props.showMonthDropdown && r2.push("react-datepicker__current-month--hasMonthDropdown"), a.props.showMonthYearDropdown && r2.push("react-datepicker__current-month--hasMonthYearDropdown"), import_react2.default.createElement("div", { className: r2.join(" ") }, Te(t4, a.props.dateFormat, a.props.locale));
    }), ve(ke(a), "renderYearDropdown", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      if (a.props.showYearDropdown && !t4)
        return import_react2.default.createElement(Pt, { adjustDateOnChange: a.props.adjustDateOnChange, date: a.state.date, onSelect: a.props.onSelect, setOpen: a.props.setOpen, dropdownMode: a.props.dropdownMode, onChange: a.changeYear, minDate: a.props.minDate, maxDate: a.props.maxDate, year: getYear(a.state.date), scrollableYearDropdown: a.props.scrollableYearDropdown, yearDropdownItemNumber: a.props.yearDropdownItemNumber });
    }), ve(ke(a), "renderMonthDropdown", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      if (a.props.showMonthDropdown && !t4)
        return import_react2.default.createElement(xt, { dropdownMode: a.props.dropdownMode, locale: a.props.locale, onChange: a.changeMonth, month: getMonth(a.state.date), useShortMonthInDropdown: a.props.useShortMonthInDropdown });
    }), ve(ke(a), "renderMonthYearDropdown", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      if (a.props.showMonthYearDropdown && !t4)
        return import_react2.default.createElement(Tt, { dropdownMode: a.props.dropdownMode, locale: a.props.locale, dateFormat: a.props.dateFormat, onChange: a.changeMonthYear, minDate: a.props.minDate, maxDate: a.props.maxDate, date: a.state.date, scrollableMonthYearDropdown: a.props.scrollableMonthYearDropdown });
    }), ve(ke(a), "handleTodayButtonClick", function(e2) {
      a.props.onSelect(He(), e2), a.props.setPreSelection && a.props.setPreSelection(He());
    }), ve(ke(a), "renderTodayButton", function() {
      if (a.props.todayButton && !a.props.showTimeSelectOnly)
        return import_react2.default.createElement("div", { className: "react-datepicker__today-button", onClick: function(e2) {
          return a.handleTodayButtonClick(e2);
        } }, a.props.todayButton);
    }), ve(ke(a), "renderDefaultHeader", function(t4) {
      var r2 = t4.monthDate, n2 = t4.i;
      return import_react2.default.createElement("div", { className: "react-datepicker__header ".concat(a.props.showTimeSelect ? "react-datepicker__header--has-time-select" : "") }, a.renderCurrentMonth(r2), import_react2.default.createElement("div", { className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(a.props.dropdownMode), onFocus: a.handleDropdownFocus }, a.renderMonthDropdown(0 !== n2), a.renderMonthYearDropdown(0 !== n2), a.renderYearDropdown(0 !== n2)), import_react2.default.createElement("div", { className: "react-datepicker__day-names" }, a.header(r2)));
    }), ve(ke(a), "renderCustomHeader", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = t4.monthDate, n2 = t4.i;
      if (a.props.showTimeSelect && !a.state.monthContainer || a.props.showTimeSelectOnly)
        return null;
      var o2 = vt(a.state.date, a.props), s = yt(a.state.date, a.props), i = Dt(a.state.date, a.props), p = gt(a.state.date, a.props), c = !a.props.showMonthYearPicker && !a.props.showQuarterYearPicker && !a.props.showYearPicker;
      return import_react2.default.createElement("div", { className: "react-datepicker__header react-datepicker__header--custom", onFocus: a.props.onDropdownFocus }, a.props.renderCustomHeader(de(de({}, a.state), {}, { customHeaderCount: n2, monthDate: r2, changeMonth: a.changeMonth, changeYear: a.changeYear, decreaseMonth: a.decreaseMonth, increaseMonth: a.increaseMonth, decreaseYear: a.decreaseYear, increaseYear: a.increaseYear, prevMonthButtonDisabled: o2, nextMonthButtonDisabled: s, prevYearButtonDisabled: i, nextYearButtonDisabled: p })), c && import_react2.default.createElement("div", { className: "react-datepicker__day-names" }, a.header(r2)));
    }), ve(ke(a), "renderYearHeader", function() {
      var t4 = a.state.date, r2 = a.props, n2 = r2.showYearPicker, o2 = _t(t4, r2.yearItemNumber), s = o2.startPeriod, i = o2.endPeriod;
      return import_react2.default.createElement("div", { className: "react-datepicker__header react-datepicker-year-header" }, n2 ? "".concat(s, " - ").concat(i) : getYear(t4));
    }), ve(ke(a), "renderHeader", function(e2) {
      switch (true) {
        case void 0 !== a.props.renderCustomHeader:
          return a.renderCustomHeader(e2);
        case (a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker):
          return a.renderYearHeader(e2);
        default:
          return a.renderDefaultHeader(e2);
      }
    }), ve(ke(a), "renderMonths", function() {
      if (!a.props.showTimeSelectOnly && !a.props.showYearPicker) {
        for (var t4 = [], r2 = a.props.showPreviousMonths ? a.props.monthsShown - 1 : 0, n2 = subMonths(a.state.date, r2), o2 = 0; o2 < a.props.monthsShown; ++o2) {
          var s = o2 - a.props.monthSelectedIn, i = addMonths(n2, s), p = "month-".concat(o2), c = o2 < a.props.monthsShown - 1, d = o2 > 0;
          t4.push(import_react2.default.createElement("div", { key: p, ref: function(e2) {
            a.monthContainer = e2;
          }, className: "react-datepicker__month-container" }, a.renderHeader({ monthDate: i, i: o2 }), import_react2.default.createElement(jt, { chooseDayAriaLabelPrefix: a.props.chooseDayAriaLabelPrefix, disabledDayAriaLabelPrefix: a.props.disabledDayAriaLabelPrefix, weekAriaLabelPrefix: a.props.weekAriaLabelPrefix, ariaLabelPrefix: a.props.monthAriaLabelPrefix, onChange: a.changeMonthYear, day: i, dayClassName: a.props.dayClassName, calendarStartDay: a.props.calendarStartDay, monthClassName: a.props.monthClassName, onDayClick: a.handleDayClick, handleOnKeyDown: a.props.handleOnDayKeyDown, onDayMouseEnter: a.handleDayMouseEnter, onMouseLeave: a.handleMonthMouseLeave, onWeekSelect: a.props.onWeekSelect, orderInDisplay: o2, formatWeekNumber: a.props.formatWeekNumber, locale: a.props.locale, minDate: a.props.minDate, maxDate: a.props.maxDate, excludeDates: a.props.excludeDates, excludeDateIntervals: a.props.excludeDateIntervals, highlightDates: a.props.highlightDates, selectingDate: a.state.selectingDate, includeDates: a.props.includeDates, includeDateIntervals: a.props.includeDateIntervals, inline: a.props.inline, shouldFocusDayInline: a.props.shouldFocusDayInline, fixedHeight: a.props.fixedHeight, filterDate: a.props.filterDate, preSelection: a.props.preSelection, setPreSelection: a.props.setPreSelection, selected: a.props.selected, selectsStart: a.props.selectsStart, selectsEnd: a.props.selectsEnd, selectsRange: a.props.selectsRange, selectsDisabledDaysInRange: a.props.selectsDisabledDaysInRange, showWeekNumbers: a.props.showWeekNumbers, startDate: a.props.startDate, endDate: a.props.endDate, peekNextMonth: a.props.peekNextMonth, setOpen: a.props.setOpen, shouldCloseOnSelect: a.props.shouldCloseOnSelect, renderDayContents: a.props.renderDayContents, renderMonthContent: a.props.renderMonthContent, renderQuarterContent: a.props.renderQuarterContent, renderYearContent: a.props.renderYearContent, disabledKeyboardNavigation: a.props.disabledKeyboardNavigation, showMonthYearPicker: a.props.showMonthYearPicker, showFullMonthYearPicker: a.props.showFullMonthYearPicker, showTwoColumnMonthYearPicker: a.props.showTwoColumnMonthYearPicker, showFourColumnMonthYearPicker: a.props.showFourColumnMonthYearPicker, showYearPicker: a.props.showYearPicker, showQuarterYearPicker: a.props.showQuarterYearPicker, isInputFocused: a.props.isInputFocused, containerRef: a.containerRef, monthShowsDuplicateDaysEnd: c, monthShowsDuplicateDaysStart: d })));
        }
        return t4;
      }
    }), ve(ke(a), "renderYears", function() {
      if (!a.props.showTimeSelectOnly)
        return a.props.showYearPicker ? import_react2.default.createElement("div", { className: "react-datepicker__year--container" }, a.renderHeader(), import_react2.default.createElement(Vt, ye({ onDayClick: a.handleDayClick, selectingDate: a.state.selectingDate, clearSelectingDate: a.clearSelectingDate, date: a.state.date }, a.props, { onYearMouseEnter: a.handleYearMouseEnter, onYearMouseLeave: a.handleYearMouseLeave }))) : void 0;
    }), ve(ke(a), "renderTimeSection", function() {
      if (a.props.showTimeSelect && (a.state.monthContainer || a.props.showTimeSelectOnly))
        return import_react2.default.createElement(Ht, { selected: a.props.selected, openToDate: a.props.openToDate, onChange: a.props.onTimeChange, timeClassName: a.props.timeClassName, format: a.props.timeFormat, includeTimes: a.props.includeTimes, intervals: a.props.timeIntervals, minTime: a.props.minTime, maxTime: a.props.maxTime, excludeTimes: a.props.excludeTimes, filterTime: a.props.filterTime, timeCaption: a.props.timeCaption, todayButton: a.props.todayButton, showMonthDropdown: a.props.showMonthDropdown, showMonthYearDropdown: a.props.showMonthYearDropdown, showYearDropdown: a.props.showYearDropdown, withPortal: a.props.withPortal, monthRef: a.state.monthContainer, injectTimes: a.props.injectTimes, locale: a.props.locale, handleOnKeyDown: a.props.handleOnKeyDown, showTimeSelectOnly: a.props.showTimeSelectOnly });
    }), ve(ke(a), "renderInputTimeSection", function() {
      var t4 = new Date(a.props.selected), r2 = Oe(t4) && Boolean(a.props.selected) ? "".concat(Ct(t4.getHours()), ":").concat(Ct(t4.getMinutes())) : "";
      if (a.props.showTimeInput)
        return import_react2.default.createElement(qt, { date: t4, timeString: r2, timeInputLabel: a.props.timeInputLabel, onChange: a.props.onTimeChange, customTimeInput: a.props.customTimeInput });
    }), ve(ke(a), "renderAriaLiveRegion", function() {
      var t4, r2 = _t(a.state.date, a.props.yearItemNumber), n2 = r2.startPeriod, o2 = r2.endPeriod;
      return t4 = a.props.showYearPicker ? "".concat(n2, " - ").concat(o2) : a.props.showMonthYearPicker || a.props.showQuarterYearPicker ? getYear(a.state.date) : "".concat(tt(getMonth(a.state.date), a.props.locale), " ").concat(getYear(a.state.date)), import_react2.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, a.state.isRenderAriaLiveMessage && t4);
    }), ve(ke(a), "renderChildren", function() {
      if (a.props.children)
        return import_react2.default.createElement("div", { className: "react-datepicker__children-container" }, a.props.children);
    }), a.containerRef = import_react2.default.createRef(), a.state = { date: a.getDateInView(), selectingDate: null, monthContainer: null, isRenderAriaLiveMessage: false }, a;
  }
  return fe(o, [{ key: "componentDidMount", value: function() {
    var e2 = this;
    this.props.showTimeSelect && (this.assignMonthContainer = void e2.setState({ monthContainer: e2.monthContainer }));
  } }, { key: "componentDidUpdate", value: function(e2) {
    var t3 = this;
    if (!this.props.preSelection || ze(this.props.preSelection, e2.preSelection) && this.props.monthSelectedIn === e2.monthSelectedIn)
      this.props.openToDate && !ze(this.props.openToDate, e2.openToDate) && this.setState({ date: this.props.openToDate });
    else {
      var r2 = !qe(this.state.date, this.props.preSelection);
      this.setState({ date: this.props.preSelection }, function() {
        return r2 && t3.handleCustomMonthChange(t3.state.date);
      });
    }
  } }, { key: "render", value: function() {
    var t3 = this.props.container || Ut;
    return import_react2.default.createElement("div", { ref: this.containerRef }, import_react2.default.createElement(t3, { className: (0, import_classnames.default)("react-datepicker", this.props.className, { "react-datepicker--time-only": this.props.showTimeSelectOnly }), showPopperArrow: this.props.showPopperArrow, arrowProps: this.props.arrowProps }, this.renderAriaLiveRegion(), this.renderPreviousButton(), this.renderNextButton(), this.renderMonths(), this.renderYears(), this.renderTodayButton(), this.renderTimeSection(), this.renderInputTimeSection(), this.renderChildren()));
  } }], [{ key: "defaultProps", get: function() {
    return { onDropdownFocus: function() {
    }, monthsShown: 1, monthSelectedIn: 0, forceShowMonthNavigation: false, timeCaption: "Time", previousYearButtonLabel: "Previous Year", nextYearButtonLabel: "Next Year", previousMonthButtonLabel: "Previous Month", nextMonthButtonLabel: "Next Month", customTimeInput: null, yearItemNumber: 12 };
  } }]), o;
}();
var Gt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n(e2) {
    var t3;
    return he(this, n), (t3 = r2.call(this, e2)).el = document.createElement("div"), t3;
  }
  return fe(n, [{ key: "componentDidMount", value: function() {
    this.portalRoot = (this.props.portalHost || document).getElementById(this.props.portalId), this.portalRoot || (this.portalRoot = document.createElement("div"), this.portalRoot.setAttribute("id", this.props.portalId), (this.props.portalHost || document.body).appendChild(this.portalRoot)), this.portalRoot.appendChild(this.el);
  } }, { key: "componentWillUnmount", value: function() {
    this.portalRoot.removeChild(this.el);
  } }, { key: "render", value: function() {
    return import_react_dom2.default.createPortal(this.props.children, this.el);
  } }]), n;
}();
var Jt = function(e2) {
  return !e2.disabled && -1 !== e2.tabIndex;
};
var Xt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = Se(n);
  function n(t3) {
    var o;
    return he(this, n), ve(ke(o = r2.call(this, t3)), "getTabChildren", function() {
      return Array.prototype.slice.call(o.tabLoopRef.current.querySelectorAll("[tabindex], a, button, input, select, textarea"), 1, -1).filter(Jt);
    }), ve(ke(o), "handleFocusStart", function() {
      var e2 = o.getTabChildren();
      e2 && e2.length > 1 && e2[e2.length - 1].focus();
    }), ve(ke(o), "handleFocusEnd", function() {
      var e2 = o.getTabChildren();
      e2 && e2.length > 1 && e2[0].focus();
    }), o.tabLoopRef = import_react2.default.createRef(), o;
  }
  return fe(n, [{ key: "render", value: function() {
    return this.props.enableTabLoop ? import_react2.default.createElement("div", { className: "react-datepicker__tab-loop", ref: this.tabLoopRef }, import_react2.default.createElement("div", { className: "react-datepicker__tab-loop__start", tabIndex: "0", onFocus: this.handleFocusStart }), this.props.children, import_react2.default.createElement("div", { className: "react-datepicker__tab-loop__end", tabIndex: "0", onFocus: this.handleFocusEnd })) : this.props.children;
  } }], [{ key: "defaultProps", get: function() {
    return { enableTabLoop: true };
  } }]), n;
}();
var Zt = function(t2) {
  De(o, import_react2.default.Component);
  var n = Se(o);
  function o() {
    return he(this, o), n.apply(this, arguments);
  }
  return fe(o, [{ key: "render", value: function() {
    var t3, n2 = this.props, o2 = n2.className, a = n2.wrapperClassName, s = n2.hidePopper, i = n2.popperComponent, p = n2.popperModifiers, c = n2.popperPlacement, l = n2.popperProps, d = n2.targetComponent, u = n2.enableTabLoop, h = n2.popperOnKeyDown, m = n2.portalId, f = n2.portalHost;
    if (!s) {
      var v = (0, import_classnames.default)("react-datepicker-popper", o2);
      t3 = import_react2.default.createElement(Popper, ye({ modifiers: p, placement: c }, l), function(t4) {
        var r2 = t4.ref, n3 = t4.style, o3 = t4.placement, a2 = t4.arrowProps;
        return import_react2.default.createElement(Xt, { enableTabLoop: u }, import_react2.default.createElement("div", { ref: r2, style: n3, className: v, "data-placement": o3, onKeyDown: h }, import_react2.default.cloneElement(i, { arrowProps: a2 })));
      });
    }
    this.props.popperContainer && (t3 = import_react2.default.createElement(this.props.popperContainer, {}, t3)), m && !s && (t3 = import_react2.default.createElement(Gt, { portalId: m, portalHost: f }, t3));
    var y = (0, import_classnames.default)("react-datepicker-wrapper", a);
    return import_react2.default.createElement(Manager, { className: "react-datepicker-manager" }, import_react2.default.createElement(Reference, null, function(t4) {
      var r2 = t4.ref;
      return import_react2.default.createElement("div", { ref: r2, className: y }, d);
    }), t3);
  } }], [{ key: "defaultProps", get: function() {
    return { hidePopper: true, popperModifiers: [], popperProps: {}, popperPlacement: "bottom-start" };
  } }]), o;
}();
var er = react_onclickoutside_es_default($t);
var tr = function(t2) {
  De(a, import_react2.default.Component);
  var o = Se(a);
  function a(t3) {
    var s;
    return he(this, a), ve(ke(s = o.call(this, t3)), "getPreSelection", function() {
      return s.props.openToDate ? s.props.openToDate : s.props.selectsEnd && s.props.startDate ? s.props.startDate : s.props.selectsStart && s.props.endDate ? s.props.endDate : Ye();
    }), ve(ke(s), "calcInitialState", function() {
      var e2, t4 = s.getPreSelection(), r2 = wt(s.props), n = kt(s.props), o2 = r2 && isBefore(t4, startOfDay(r2)) ? r2 : n && isAfter(t4, endOfDay(n)) ? n : t4;
      return { open: s.props.startOpen || false, preventFocus: false, preSelection: null !== (e2 = s.props.selectsRange ? s.props.startDate : s.props.selected) && void 0 !== e2 ? e2 : o2, highlightDates: bt(s.props.highlightDates), focused: false, shouldFocusDayInline: false, isRenderAriaLiveMessage: false };
    }), ve(ke(s), "clearPreventFocusTimeout", function() {
      s.preventFocusTimeout && clearTimeout(s.preventFocusTimeout);
    }), ve(ke(s), "setFocus", function() {
      s.input && s.input.focus && s.input.focus({ preventScroll: true });
    }), ve(ke(s), "setBlur", function() {
      s.input && s.input.blur && s.input.blur(), s.cancelFocusInput();
    }), ve(ke(s), "setOpen", function(e2) {
      var t4 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      s.setState({ open: e2, preSelection: e2 && s.state.open ? s.state.preSelection : s.calcInitialState().preSelection, lastPreSelectChange: nr }, function() {
        e2 || s.setState(function(e3) {
          return { focused: !!t4 && e3.focused };
        }, function() {
          !t4 && s.setBlur(), s.setState({ inputValue: null });
        });
      });
    }), ve(ke(s), "inputOk", function() {
      return isDate(s.state.preSelection);
    }), ve(ke(s), "isCalendarOpen", function() {
      return void 0 === s.props.open ? s.state.open && !s.props.disabled && !s.props.readOnly : s.props.open;
    }), ve(ke(s), "handleFocus", function(e2) {
      s.state.preventFocus || (s.props.onFocus(e2), s.props.preventOpenOnFocus || s.props.readOnly || s.setOpen(true)), s.setState({ focused: true });
    }), ve(ke(s), "cancelFocusInput", function() {
      clearTimeout(s.inputFocusTimeout), s.inputFocusTimeout = null;
    }), ve(ke(s), "deferFocusInput", function() {
      s.cancelFocusInput(), s.inputFocusTimeout = setTimeout(function() {
        return s.setFocus();
      }, 1);
    }), ve(ke(s), "handleDropdownFocus", function() {
      s.cancelFocusInput();
    }), ve(ke(s), "handleBlur", function(e2) {
      (!s.state.open || s.props.withPortal || s.props.showTimeInput) && s.props.onBlur(e2), s.setState({ focused: false });
    }), ve(ke(s), "handleCalendarClickOutside", function(e2) {
      s.props.inline || s.setOpen(false), s.props.onClickOutside(e2), s.props.withPortal && e2.preventDefault();
    }), ve(ke(s), "handleChange", function() {
      for (var e2 = arguments.length, t4 = new Array(e2), r2 = 0; r2 < e2; r2++)
        t4[r2] = arguments[r2];
      var n = t4[0];
      if (!s.props.onChangeRaw || (s.props.onChangeRaw.apply(ke(s), t4), "function" == typeof n.isDefaultPrevented && !n.isDefaultPrevented())) {
        s.setState({ inputValue: n.target.value, lastPreSelectChange: rr });
        var o2 = Ie(n.target.value, s.props.dateFormat, s.props.locale, s.props.strictParsing, s.props.minDate);
        s.props.showTimeSelectOnly && s.props.selected && !ze(o2, s.props.selected) && (o2 = set(s.props.selected, null == o2 ? { hours: getHours(s.props.selected), minutes: getMinutes(s.props.selected), seconds: getSeconds(s.props.selected) } : { hours: getHours(o2), minutes: getMinutes(o2), seconds: getSeconds(o2) })), !o2 && n.target.value || s.setSelected(o2, n, true);
      }
    }), ve(ke(s), "handleSelect", function(e2, t4, r2) {
      if (s.setState({ preventFocus: true }, function() {
        return s.preventFocusTimeout = setTimeout(function() {
          return s.setState({ preventFocus: false });
        }, 50), s.preventFocusTimeout;
      }), s.props.onChangeRaw && s.props.onChangeRaw(t4), s.setSelected(e2, t4, false, r2), s.setState({ isRenderAriaLiveMessage: true }), !s.props.shouldCloseOnSelect || s.props.showTimeSelect)
        s.setPreSelection(e2);
      else if (!s.props.inline) {
        s.props.selectsRange || s.setOpen(false);
        var n = s.props, o2 = n.startDate, a2 = n.endDate;
        !o2 || a2 || isBefore(e2, o2) || s.setOpen(false);
      }
    }), ve(ke(s), "setSelected", function(e2, t4, r2, n) {
      var o2 = e2;
      if (s.props.showYearPicker) {
        if (null !== o2 && lt(getYear(o2), s.props))
          return;
      } else if (s.props.showMonthYearPicker) {
        if (null !== o2 && st(o2, s.props))
          return;
      } else if (null !== o2 && ot(o2, s.props))
        return;
      var a2 = s.props, i = a2.onChange, p = a2.selectsRange, c = a2.startDate, l = a2.endDate;
      if (!$e(s.props.selected, o2) || s.props.allowSameDay || p)
        if (null !== o2 && (!s.props.selected || r2 && (s.props.showTimeSelect || s.props.showTimeSelectOnly || s.props.showTimeInput) || (o2 = Le(o2, { hour: getHours(s.props.selected), minute: getMinutes(s.props.selected), second: getSeconds(s.props.selected) })), s.props.inline || s.setState({ preSelection: o2 }), s.props.focusSelectedMonth || s.setState({ monthSelectedIn: n })), p) {
          var d = c && !l, u = c && l;
          !c && !l ? i([o2, null], t4) : d && (isBefore(o2, c) ? i([o2, null], t4) : i([c, o2], t4)), u && i([o2, null], t4);
        } else
          i(o2, t4);
      r2 || (s.props.onSelect(o2, t4), s.setState({ inputValue: null }));
    }), ve(ke(s), "setPreSelection", function(e2) {
      var t4 = void 0 !== s.props.minDate, r2 = void 0 !== s.props.maxDate, n = true;
      if (e2) {
        var o2 = startOfDay(e2);
        if (t4 && r2)
          n = Ge(e2, s.props.minDate, s.props.maxDate);
        else if (t4) {
          var a2 = startOfDay(s.props.minDate);
          n = isAfter(e2, a2) || $e(o2, a2);
        } else if (r2) {
          var i = endOfDay(s.props.maxDate);
          n = isBefore(e2, i) || $e(o2, i);
        }
      }
      n && s.setState({ preSelection: e2 });
    }), ve(ke(s), "handleTimeChange", function(e2) {
      var t4 = Le(s.props.selected ? s.props.selected : s.getPreSelection(), { hour: getHours(e2), minute: getMinutes(e2) });
      s.setState({ preSelection: t4 }), s.props.onChange(t4), s.props.shouldCloseOnSelect && s.setOpen(false), s.props.showTimeInput && s.setOpen(true), (s.props.showTimeSelectOnly || s.props.showTimeSelect) && s.setState({ isRenderAriaLiveMessage: true }), s.setState({ inputValue: null });
    }), ve(ke(s), "onInputClick", function() {
      s.props.disabled || s.props.readOnly || s.setOpen(true), s.props.onInputClick();
    }), ve(ke(s), "onInputKeyDown", function(e2) {
      s.props.onKeyDown(e2);
      var t4 = e2.key;
      if (s.state.open || s.props.inline || s.props.preventOpenOnFocus) {
        if (s.state.open) {
          if ("ArrowDown" === t4 || "ArrowUp" === t4) {
            e2.preventDefault();
            var r2 = s.calendar.componentNode && s.calendar.componentNode.querySelector('.react-datepicker__day[tabindex="0"]');
            return void (r2 && r2.focus({ preventScroll: true }));
          }
          var n = Ye(s.state.preSelection);
          "Enter" === t4 ? (e2.preventDefault(), s.inputOk() && s.state.lastPreSelectChange === nr ? (s.handleSelect(n, e2), !s.props.shouldCloseOnSelect && s.setPreSelection(n)) : s.setOpen(false)) : "Escape" === t4 ? (e2.preventDefault(), s.setOpen(false)) : "Tab" === t4 && e2.shiftKey && s.setOpen(false), s.inputOk() || s.props.onInputError({ code: 1, msg: "Date input not valid." });
        }
      } else
        "ArrowDown" !== t4 && "ArrowUp" !== t4 && "Enter" !== t4 || s.onInputClick();
    }), ve(ke(s), "onPortalKeyDown", function(e2) {
      "Escape" === e2.key && (e2.preventDefault(), s.setState({ preventFocus: true }, function() {
        s.setOpen(false), setTimeout(function() {
          s.setFocus(), s.setState({ preventFocus: false });
        });
      }));
    }), ve(ke(s), "onDayKeyDown", function(e2) {
      s.props.onKeyDown(e2);
      var t4 = e2.key, r2 = Ye(s.state.preSelection);
      if ("Enter" === t4)
        e2.preventDefault(), s.handleSelect(r2, e2), !s.props.shouldCloseOnSelect && s.setPreSelection(r2);
      else if ("Escape" === t4)
        e2.preventDefault(), s.setOpen(false), s.inputOk() || s.props.onInputError({ code: 1, msg: "Date input not valid." });
      else if (!s.props.disabledKeyboardNavigation) {
        var n;
        switch (t4) {
          case "ArrowLeft":
            n = subDays(r2, 1);
            break;
          case "ArrowRight":
            n = addDays(r2, 1);
            break;
          case "ArrowUp":
            n = subWeeks(r2, 1);
            break;
          case "ArrowDown":
            n = addWeeks(r2, 1);
            break;
          case "PageUp":
            n = subMonths(r2, 1);
            break;
          case "PageDown":
            n = addMonths(r2, 1);
            break;
          case "Home":
            n = subYears(r2, 1);
            break;
          case "End":
            n = addYears(r2, 1);
        }
        if (!n)
          return void (s.props.onInputError && s.props.onInputError({ code: 1, msg: "Date input not valid." }));
        if (e2.preventDefault(), s.setState({ lastPreSelectChange: nr }), s.props.adjustDateOnChange && s.setSelected(n), s.setPreSelection(n), s.props.inline) {
          var o2 = getMonth(r2), a2 = getMonth(n), i = getYear(r2), d = getYear(n);
          o2 !== a2 || i !== d ? s.setState({ shouldFocusDayInline: true }) : s.setState({ shouldFocusDayInline: false });
        }
      }
    }), ve(ke(s), "onPopperKeyDown", function(e2) {
      "Escape" === e2.key && (e2.preventDefault(), s.setState({ preventFocus: true }, function() {
        s.setOpen(false), setTimeout(function() {
          s.setFocus(), s.setState({ preventFocus: false });
        });
      }));
    }), ve(ke(s), "onClearClick", function(e2) {
      e2 && e2.preventDefault && e2.preventDefault(), s.props.selectsRange ? s.props.onChange([null, null], e2) : s.props.onChange(null, e2), s.setState({ inputValue: null });
    }), ve(ke(s), "clear", function() {
      s.onClearClick();
    }), ve(ke(s), "onScroll", function(e2) {
      "boolean" == typeof s.props.closeOnScroll && s.props.closeOnScroll ? e2.target !== document && e2.target !== document.documentElement && e2.target !== document.body || s.setOpen(false) : "function" == typeof s.props.closeOnScroll && s.props.closeOnScroll(e2) && s.setOpen(false);
    }), ve(ke(s), "renderCalendar", function() {
      return s.props.inline || s.isCalendarOpen() ? import_react2.default.createElement(er, { ref: function(e2) {
        s.calendar = e2;
      }, locale: s.props.locale, calendarStartDay: s.props.calendarStartDay, chooseDayAriaLabelPrefix: s.props.chooseDayAriaLabelPrefix, disabledDayAriaLabelPrefix: s.props.disabledDayAriaLabelPrefix, weekAriaLabelPrefix: s.props.weekAriaLabelPrefix, monthAriaLabelPrefix: s.props.monthAriaLabelPrefix, adjustDateOnChange: s.props.adjustDateOnChange, setOpen: s.setOpen, shouldCloseOnSelect: s.props.shouldCloseOnSelect, dateFormat: s.props.dateFormatCalendar, useWeekdaysShort: s.props.useWeekdaysShort, formatWeekDay: s.props.formatWeekDay, dropdownMode: s.props.dropdownMode, selected: s.props.selected, preSelection: s.state.preSelection, onSelect: s.handleSelect, onWeekSelect: s.props.onWeekSelect, openToDate: s.props.openToDate, minDate: s.props.minDate, maxDate: s.props.maxDate, selectsStart: s.props.selectsStart, selectsEnd: s.props.selectsEnd, selectsRange: s.props.selectsRange, startDate: s.props.startDate, endDate: s.props.endDate, excludeDates: s.props.excludeDates, excludeDateIntervals: s.props.excludeDateIntervals, filterDate: s.props.filterDate, onClickOutside: s.handleCalendarClickOutside, formatWeekNumber: s.props.formatWeekNumber, highlightDates: s.state.highlightDates, includeDates: s.props.includeDates, includeDateIntervals: s.props.includeDateIntervals, includeTimes: s.props.includeTimes, injectTimes: s.props.injectTimes, inline: s.props.inline, shouldFocusDayInline: s.state.shouldFocusDayInline, peekNextMonth: s.props.peekNextMonth, showMonthDropdown: s.props.showMonthDropdown, showPreviousMonths: s.props.showPreviousMonths, useShortMonthInDropdown: s.props.useShortMonthInDropdown, showMonthYearDropdown: s.props.showMonthYearDropdown, showWeekNumbers: s.props.showWeekNumbers, showYearDropdown: s.props.showYearDropdown, withPortal: s.props.withPortal, forceShowMonthNavigation: s.props.forceShowMonthNavigation, showDisabledMonthNavigation: s.props.showDisabledMonthNavigation, scrollableYearDropdown: s.props.scrollableYearDropdown, scrollableMonthYearDropdown: s.props.scrollableMonthYearDropdown, todayButton: s.props.todayButton, weekLabel: s.props.weekLabel, outsideClickIgnoreClass: "react-datepicker-ignore-onclickoutside", fixedHeight: s.props.fixedHeight, monthsShown: s.props.monthsShown, monthSelectedIn: s.state.monthSelectedIn, onDropdownFocus: s.handleDropdownFocus, onMonthChange: s.props.onMonthChange, onYearChange: s.props.onYearChange, dayClassName: s.props.dayClassName, weekDayClassName: s.props.weekDayClassName, monthClassName: s.props.monthClassName, timeClassName: s.props.timeClassName, showTimeSelect: s.props.showTimeSelect, showTimeSelectOnly: s.props.showTimeSelectOnly, onTimeChange: s.handleTimeChange, timeFormat: s.props.timeFormat, timeIntervals: s.props.timeIntervals, minTime: s.props.minTime, maxTime: s.props.maxTime, excludeTimes: s.props.excludeTimes, filterTime: s.props.filterTime, timeCaption: s.props.timeCaption, className: s.props.calendarClassName, container: s.props.calendarContainer, yearItemNumber: s.props.yearItemNumber, yearDropdownItemNumber: s.props.yearDropdownItemNumber, previousMonthAriaLabel: s.props.previousMonthAriaLabel, previousMonthButtonLabel: s.props.previousMonthButtonLabel, nextMonthAriaLabel: s.props.nextMonthAriaLabel, nextMonthButtonLabel: s.props.nextMonthButtonLabel, previousYearAriaLabel: s.props.previousYearAriaLabel, previousYearButtonLabel: s.props.previousYearButtonLabel, nextYearAriaLabel: s.props.nextYearAriaLabel, nextYearButtonLabel: s.props.nextYearButtonLabel, timeInputLabel: s.props.timeInputLabel, disabledKeyboardNavigation: s.props.disabledKeyboardNavigation, renderCustomHeader: s.props.renderCustomHeader, popperProps: s.props.popperProps, renderDayContents: s.props.renderDayContents, renderMonthContent: s.props.renderMonthContent, renderQuarterContent: s.props.renderQuarterContent, renderYearContent: s.props.renderYearContent, onDayMouseEnter: s.props.onDayMouseEnter, onMonthMouseLeave: s.props.onMonthMouseLeave, onYearMouseEnter: s.props.onYearMouseEnter, onYearMouseLeave: s.props.onYearMouseLeave, selectsDisabledDaysInRange: s.props.selectsDisabledDaysInRange, showTimeInput: s.props.showTimeInput, showMonthYearPicker: s.props.showMonthYearPicker, showFullMonthYearPicker: s.props.showFullMonthYearPicker, showTwoColumnMonthYearPicker: s.props.showTwoColumnMonthYearPicker, showFourColumnMonthYearPicker: s.props.showFourColumnMonthYearPicker, showYearPicker: s.props.showYearPicker, showQuarterYearPicker: s.props.showQuarterYearPicker, showPopperArrow: s.props.showPopperArrow, excludeScrollbar: s.props.excludeScrollbar, handleOnKeyDown: s.props.onKeyDown, handleOnDayKeyDown: s.onDayKeyDown, isInputFocused: s.state.focused, customTimeInput: s.props.customTimeInput, setPreSelection: s.setPreSelection }, s.props.children) : null;
    }), ve(ke(s), "renderAriaLiveRegion", function() {
      var t4, r2 = s.props, n = r2.dateFormat, o2 = r2.locale, a2 = s.props.showTimeInput || s.props.showTimeSelect ? "PPPPp" : "PPPP";
      return t4 = s.props.selectsRange ? "Selected start date: ".concat(Re(s.props.startDate, { dateFormat: a2, locale: o2 }), ". ").concat(s.props.endDate ? "End date: " + Re(s.props.endDate, { dateFormat: a2, locale: o2 }) : "") : s.props.showTimeSelectOnly ? "Selected time: ".concat(Re(s.props.selected, { dateFormat: n, locale: o2 })) : s.props.showYearPicker ? "Selected year: ".concat(Re(s.props.selected, { dateFormat: "yyyy", locale: o2 })) : s.props.showMonthYearPicker ? "Selected month: ".concat(Re(s.props.selected, { dateFormat: "MMMM yyyy", locale: o2 })) : s.props.showQuarterYearPicker ? "Selected quarter: ".concat(Re(s.props.selected, { dateFormat: "yyyy, QQQ", locale: o2 })) : "Selected date: ".concat(Re(s.props.selected, { dateFormat: a2, locale: o2 })), import_react2.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, s.state.isRenderAriaLiveMessage && t4);
    }), ve(ke(s), "renderDateInput", function() {
      var t4, n = (0, import_classnames.default)(s.props.className, ve({}, "react-datepicker-ignore-onclickoutside", s.state.open)), o2 = s.props.customInput || import_react2.default.createElement("input", { type: "text" }), a2 = s.props.customInputRef || "ref", i = "string" == typeof s.props.value ? s.props.value : "string" == typeof s.state.inputValue ? s.state.inputValue : s.props.selectsRange ? function(e2, t5, r2) {
        if (!e2)
          return "";
        var n2 = Re(e2, r2), o3 = t5 ? Re(t5, r2) : "";
        return "".concat(n2, " - ").concat(o3);
      }(s.props.startDate, s.props.endDate, s.props) : Re(s.props.selected, s.props);
      return import_react2.default.cloneElement(o2, (ve(t4 = {}, a2, function(e2) {
        s.input = e2;
      }), ve(t4, "value", i), ve(t4, "onBlur", s.handleBlur), ve(t4, "onChange", s.handleChange), ve(t4, "onClick", s.onInputClick), ve(t4, "onFocus", s.handleFocus), ve(t4, "onKeyDown", s.onInputKeyDown), ve(t4, "id", s.props.id), ve(t4, "name", s.props.name), ve(t4, "form", s.props.form), ve(t4, "autoFocus", s.props.autoFocus), ve(t4, "placeholder", s.props.placeholderText), ve(t4, "disabled", s.props.disabled), ve(t4, "autoComplete", s.props.autoComplete), ve(t4, "className", (0, import_classnames.default)(o2.props.className, n)), ve(t4, "title", s.props.title), ve(t4, "readOnly", s.props.readOnly), ve(t4, "required", s.props.required), ve(t4, "tabIndex", s.props.tabIndex), ve(t4, "aria-describedby", s.props.ariaDescribedBy), ve(t4, "aria-invalid", s.props.ariaInvalid), ve(t4, "aria-labelledby", s.props.ariaLabelledBy), ve(t4, "aria-required", s.props.ariaRequired), t4));
    }), ve(ke(s), "renderClearButton", function() {
      var t4 = s.props, r2 = t4.isClearable, n = t4.selected, o2 = t4.startDate, a2 = t4.endDate, i = t4.clearButtonTitle, p = t4.clearButtonClassName, c = void 0 === p ? "" : p, l = t4.ariaLabelClose, d = void 0 === l ? "Close" : l;
      return !r2 || null == n && null == o2 && null == a2 ? null : import_react2.default.createElement("button", { type: "button", className: "react-datepicker__close-icon ".concat(c).trim(), "aria-label": d, onClick: s.onClearClick, title: i, tabIndex: -1 });
    }), s.state = s.calcInitialState(), s;
  }
  return fe(a, [{ key: "componentDidMount", value: function() {
    window.addEventListener("scroll", this.onScroll, true);
  } }, { key: "componentDidUpdate", value: function(e2, t3) {
    var r2, n;
    e2.inline && (r2 = e2.selected, n = this.props.selected, r2 && n ? getMonth(r2) !== getMonth(n) || getYear(r2) !== getYear(n) : r2 !== n) && this.setPreSelection(this.props.selected), void 0 !== this.state.monthSelectedIn && e2.monthsShown !== this.props.monthsShown && this.setState({ monthSelectedIn: 0 }), e2.highlightDates !== this.props.highlightDates && this.setState({ highlightDates: bt(this.props.highlightDates) }), t3.focused || $e(e2.selected, this.props.selected) || this.setState({ inputValue: null }), t3.open !== this.state.open && (false === t3.open && true === this.state.open && this.props.onCalendarOpen(), true === t3.open && false === this.state.open && this.props.onCalendarClose());
  } }, { key: "componentWillUnmount", value: function() {
    this.clearPreventFocusTimeout(), window.removeEventListener("scroll", this.onScroll, true);
  } }, { key: "renderInputContainer", value: function() {
    var t3 = this.props.showIcon;
    return import_react2.default.createElement("div", { className: "react-datepicker__input-container ".concat(t3 ? "react-datepicker__view-calendar-icon" : "") }, t3 && import_react2.default.createElement("svg", { className: "react-datepicker__calendar-icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" }, import_react2.default.createElement("path", { d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" })), this.renderAriaLiveRegion(), this.renderDateInput(), this.renderClearButton());
  } }, { key: "render", value: function() {
    var t3 = this.renderCalendar();
    if (this.props.inline)
      return t3;
    if (this.props.withPortal) {
      var r2 = this.state.open ? import_react2.default.createElement(Xt, { enableTabLoop: this.props.enableTabLoop }, import_react2.default.createElement("div", { className: "react-datepicker__portal", tabIndex: -1, onKeyDown: this.onPortalKeyDown }, t3)) : null;
      return this.state.open && this.props.portalId && (r2 = import_react2.default.createElement(Gt, { portalId: this.props.portalId, portalHost: this.props.portalHost }, r2)), import_react2.default.createElement("div", null, this.renderInputContainer(), r2);
    }
    return import_react2.default.createElement(Zt, { className: this.props.popperClassName, wrapperClassName: this.props.wrapperClassName, hidePopper: !this.isCalendarOpen(), portalId: this.props.portalId, portalHost: this.props.portalHost, popperModifiers: this.props.popperModifiers, targetComponent: this.renderInputContainer(), popperContainer: this.props.popperContainer, popperComponent: t3, popperPlacement: this.props.popperPlacement, popperProps: this.props.popperProps, popperOnKeyDown: this.onPopperKeyDown, enableTabLoop: this.props.enableTabLoop });
  } }], [{ key: "defaultProps", get: function() {
    return { allowSameDay: false, dateFormat: "MM/dd/yyyy", dateFormatCalendar: "LLLL yyyy", onChange: function() {
    }, disabled: false, disabledKeyboardNavigation: false, dropdownMode: "scroll", onFocus: function() {
    }, onBlur: function() {
    }, onKeyDown: function() {
    }, onInputClick: function() {
    }, onSelect: function() {
    }, onClickOutside: function() {
    }, onMonthChange: function() {
    }, onCalendarOpen: function() {
    }, onCalendarClose: function() {
    }, preventOpenOnFocus: false, onYearChange: function() {
    }, onInputError: function() {
    }, monthsShown: 1, readOnly: false, withPortal: false, selectsDisabledDaysInRange: false, shouldCloseOnSelect: true, showTimeSelect: false, showTimeInput: false, showPreviousMonths: false, showMonthYearPicker: false, showFullMonthYearPicker: false, showTwoColumnMonthYearPicker: false, showFourColumnMonthYearPicker: false, showYearPicker: false, showQuarterYearPicker: false, strictParsing: false, timeIntervals: 30, timeCaption: "Time", previousMonthAriaLabel: "Previous Month", previousMonthButtonLabel: "Previous Month", nextMonthAriaLabel: "Next Month", nextMonthButtonLabel: "Next Month", previousYearAriaLabel: "Previous Year", previousYearButtonLabel: "Previous Year", nextYearAriaLabel: "Next Year", nextYearButtonLabel: "Next Year", timeInputLabel: "Time", enableTabLoop: true, yearItemNumber: 12, focusSelectedMonth: false, showPopperArrow: true, excludeScrollbar: true, customTimeInput: null, calendarStartDay: void 0 };
  } }]), a;
}();
var rr = "input";
var nr = "navigate";
export {
  Ut as CalendarContainer,
  tr as default,
  Ze as getDefaultLocale,
  Je as registerLocale,
  Xe as setDefaultLocale
};
//# sourceMappingURL=react-datepicker.js.map
