var Zn = Object.defineProperty;
var er = (ee, W, y) => W in ee ? Zn(ee, W, { enumerable: !0, configurable: !0, writable: !0, value: y }) : ee[W] = y;
var q = (ee, W, y) => er(ee, typeof W != "symbol" ? W + "" : W, y);
(function() {
  function ee(f) {
    return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
  }
  var W = { exports: {} }, y = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var qe;
  function $t() {
    if (qe) return y;
    qe = 1;
    var f = Symbol.for("react.element"), i = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), E = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), A = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), S = Symbol.iterator;
    function F(n) {
      return n === null || typeof n != "object" ? null : (n = S && n[S] || n["@@iterator"], typeof n == "function" ? n : null);
    }
    var Y = { isMounted: function() {
      return !1;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, te = Object.assign, ve = {};
    function G(n, s, _) {
      this.props = n, this.context = s, this.refs = ve, this.updater = _ || Y;
    }
    G.prototype.isReactComponent = {}, G.prototype.setState = function(n, s) {
      if (typeof n != "object" && typeof n != "function" && n != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, n, s, "setState");
    }, G.prototype.forceUpdate = function(n) {
      this.updater.enqueueForceUpdate(this, n, "forceUpdate");
    };
    function ye() {
    }
    ye.prototype = G.prototype;
    function oe(n, s, _) {
      this.props = n, this.context = s, this.refs = ve, this.updater = _ || Y;
    }
    var ie = oe.prototype = new ye();
    ie.constructor = oe, te(ie, G.prototype), ie.isPureReactComponent = !0;
    var K = Array.isArray, I = Object.prototype.hasOwnProperty, U = { current: null }, X = { key: !0, ref: !0, __self: !0, __source: !0 };
    function ne(n, s, _) {
      var w, T = {}, N = null, P = null;
      if (s != null) for (w in s.ref !== void 0 && (P = s.ref), s.key !== void 0 && (N = "" + s.key), s) I.call(s, w) && !X.hasOwnProperty(w) && (T[w] = s[w]);
      var D = arguments.length - 2;
      if (D === 1) T.children = _;
      else if (1 < D) {
        for (var x = Array(D), z = 0; z < D; z++) x[z] = arguments[z + 2];
        T.children = x;
      }
      if (n && n.defaultProps) for (w in D = n.defaultProps, D) T[w] === void 0 && (T[w] = D[w]);
      return { $$typeof: f, type: n, key: N, ref: P, props: T, _owner: U.current };
    }
    function be(n, s) {
      return { $$typeof: f, type: n.type, key: s, ref: n.ref, props: n.props, _owner: n._owner };
    }
    function fe(n) {
      return typeof n == "object" && n !== null && n.$$typeof === f;
    }
    function Ae(n) {
      var s = { "=": "=0", ":": "=2" };
      return "$" + n.replace(/[=:]/g, function(_) {
        return s[_];
      });
    }
    var _e = /\/+/g;
    function pe(n, s) {
      return typeof n == "object" && n !== null && n.key != null ? Ae("" + n.key) : s.toString(36);
    }
    function ae(n, s, _, w, T) {
      var N = typeof n;
      (N === "undefined" || N === "boolean") && (n = null);
      var P = !1;
      if (n === null) P = !0;
      else switch (N) {
        case "string":
        case "number":
          P = !0;
          break;
        case "object":
          switch (n.$$typeof) {
            case f:
            case i:
              P = !0;
          }
      }
      if (P) return P = n, T = T(P), n = w === "" ? "." + pe(P, 0) : w, K(T) ? (_ = "", n != null && (_ = n.replace(_e, "$&/") + "/"), ae(T, s, _, "", function(z) {
        return z;
      })) : T != null && (fe(T) && (T = be(T, _ + (!T.key || P && P.key === T.key ? "" : ("" + T.key).replace(_e, "$&/") + "/") + n)), s.push(T)), 1;
      if (P = 0, w = w === "" ? "." : w + ":", K(n)) for (var D = 0; D < n.length; D++) {
        N = n[D];
        var x = w + pe(N, D);
        P += ae(N, s, _, x, T);
      }
      else if (x = F(n), typeof x == "function") for (n = x.call(n), D = 0; !(N = n.next()).done; ) N = N.value, x = w + pe(N, D++), P += ae(N, s, _, x, T);
      else if (N === "object") throw s = String(n), Error("Objects are not valid as a React child (found: " + (s === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : s) + "). If you meant to render a collection of children, use an array instead.");
      return P;
    }
    function H(n, s, _) {
      if (n == null) return n;
      var w = [], T = 0;
      return ae(n, w, "", "", function(N) {
        return s.call(_, N, T++);
      }), w;
    }
    function Q(n) {
      if (n._status === -1) {
        var s = n._result;
        s = s(), s.then(function(_) {
          (n._status === 0 || n._status === -1) && (n._status = 1, n._result = _);
        }, function(_) {
          (n._status === 0 || n._status === -1) && (n._status = 2, n._result = _);
        }), n._status === -1 && (n._status = 0, n._result = s);
      }
      if (n._status === 1) return n._result.default;
      throw n._result;
    }
    var h = { current: null }, re = { transition: null }, Re = { ReactCurrentDispatcher: h, ReactCurrentBatchConfig: re, ReactCurrentOwner: U };
    function se() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    return y.Children = { map: H, forEach: function(n, s, _) {
      H(n, function() {
        s.apply(this, arguments);
      }, _);
    }, count: function(n) {
      var s = 0;
      return H(n, function() {
        s++;
      }), s;
    }, toArray: function(n) {
      return H(n, function(s) {
        return s;
      }) || [];
    }, only: function(n) {
      if (!fe(n)) throw Error("React.Children.only expected to receive a single React element child.");
      return n;
    } }, y.Component = G, y.Fragment = l, y.Profiler = g, y.PureComponent = oe, y.StrictMode = b, y.Suspense = m, y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Re, y.act = se, y.cloneElement = function(n, s, _) {
      if (n == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + n + ".");
      var w = te({}, n.props), T = n.key, N = n.ref, P = n._owner;
      if (s != null) {
        if (s.ref !== void 0 && (N = s.ref, P = U.current), s.key !== void 0 && (T = "" + s.key), n.type && n.type.defaultProps) var D = n.type.defaultProps;
        for (x in s) I.call(s, x) && !X.hasOwnProperty(x) && (w[x] = s[x] === void 0 && D !== void 0 ? D[x] : s[x]);
      }
      var x = arguments.length - 2;
      if (x === 1) w.children = _;
      else if (1 < x) {
        D = Array(x);
        for (var z = 0; z < x; z++) D[z] = arguments[z + 2];
        w.children = D;
      }
      return { $$typeof: f, type: n.type, key: T, ref: N, props: w, _owner: P };
    }, y.createContext = function(n) {
      return n = { $$typeof: E, _currentValue: n, _currentValue2: n, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, n.Provider = { $$typeof: C, _context: n }, n.Consumer = n;
    }, y.createElement = ne, y.createFactory = function(n) {
      var s = ne.bind(null, n);
      return s.type = n, s;
    }, y.createRef = function() {
      return { current: null };
    }, y.forwardRef = function(n) {
      return { $$typeof: d, render: n };
    }, y.isValidElement = fe, y.lazy = function(n) {
      return { $$typeof: M, _payload: { _status: -1, _result: n }, _init: Q };
    }, y.memo = function(n, s) {
      return { $$typeof: A, type: n, compare: s === void 0 ? null : s };
    }, y.startTransition = function(n) {
      var s = re.transition;
      re.transition = {};
      try {
        n();
      } finally {
        re.transition = s;
      }
    }, y.unstable_act = se, y.useCallback = function(n, s) {
      return h.current.useCallback(n, s);
    }, y.useContext = function(n) {
      return h.current.useContext(n);
    }, y.useDebugValue = function() {
    }, y.useDeferredValue = function(n) {
      return h.current.useDeferredValue(n);
    }, y.useEffect = function(n, s) {
      return h.current.useEffect(n, s);
    }, y.useId = function() {
      return h.current.useId();
    }, y.useImperativeHandle = function(n, s, _) {
      return h.current.useImperativeHandle(n, s, _);
    }, y.useInsertionEffect = function(n, s) {
      return h.current.useInsertionEffect(n, s);
    }, y.useLayoutEffect = function(n, s) {
      return h.current.useLayoutEffect(n, s);
    }, y.useMemo = function(n, s) {
      return h.current.useMemo(n, s);
    }, y.useReducer = function(n, s, _) {
      return h.current.useReducer(n, s, _);
    }, y.useRef = function(n) {
      return h.current.useRef(n);
    }, y.useState = function(n) {
      return h.current.useState(n);
    }, y.useSyncExternalStore = function(n, s, _) {
      return h.current.useSyncExternalStore(n, s, _);
    }, y.useTransition = function() {
      return h.current.useTransition();
    }, y.version = "18.3.1", y;
  }
  var de = { exports: {} };
  /**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  de.exports;
  var Ge;
  function At() {
    return Ge || (Ge = 1, function(f, i) {
      process.env.NODE_ENV !== "production" && function() {
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        var l = "18.3.1", b = Symbol.for("react.element"), g = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), A = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), te = Symbol.for("react.lazy"), ve = Symbol.for("react.offscreen"), G = Symbol.iterator, ye = "@@iterator";
        function oe(e) {
          if (e === null || typeof e != "object")
            return null;
          var t = G && e[G] || e[ye];
          return typeof t == "function" ? t : null;
        }
        var ie = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        }, K = {
          transition: null
        }, I = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: !1,
          didScheduleLegacyUpdate: !1
        }, U = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        }, X = {}, ne = null;
        function be(e) {
          ne = e;
        }
        X.setExtraStackFrame = function(e) {
          ne = e;
        }, X.getCurrentStack = null, X.getStackAddendum = function() {
          var e = "";
          ne && (e += ne);
          var t = X.getCurrentStack;
          return t && (e += t() || ""), e;
        };
        var fe = !1, Ae = !1, _e = !1, pe = !1, ae = !1, H = {
          ReactCurrentDispatcher: ie,
          ReactCurrentBatchConfig: K,
          ReactCurrentOwner: U
        };
        H.ReactDebugCurrentFrame = X, H.ReactCurrentActQueue = I;
        function Q(e) {
          {
            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
              r[o - 1] = arguments[o];
            re("warn", e, r);
          }
        }
        function h(e) {
          {
            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
              r[o - 1] = arguments[o];
            re("error", e, r);
          }
        }
        function re(e, t, r) {
          {
            var o = H.ReactDebugCurrentFrame, c = o.getStackAddendum();
            c !== "" && (t += "%s", r = r.concat([c]));
            var p = r.map(function(u) {
              return String(u);
            });
            p.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, p);
          }
        }
        var Re = {};
        function se(e, t) {
          {
            var r = e.constructor, o = r && (r.displayName || r.name) || "ReactClass", c = o + "." + t;
            if (Re[c])
              return;
            h("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, o), Re[c] = !0;
          }
        }
        var n = {
          /**
           * Checks whether or not this composite component is mounted.
           * @param {ReactClass} publicInstance The instance we want to test.
           * @return {boolean} True if mounted, false otherwise.
           * @protected
           * @final
           */
          isMounted: function(e) {
            return !1;
          },
          /**
           * Forces an update. This should only be invoked when it is known with
           * certainty that we are **not** in a DOM transaction.
           *
           * You may want to call this when you know that some deeper aspect of the
           * component's state has changed but `setState` was not called.
           *
           * This will not invoke `shouldComponentUpdate`, but it will invoke
           * `componentWillUpdate` and `componentDidUpdate`.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueForceUpdate: function(e, t, r) {
            se(e, "forceUpdate");
          },
          /**
           * Replaces all of the state. Always use this or `setState` to mutate state.
           * You should treat `this.state` as immutable.
           *
           * There is no guarantee that `this.state` will be immediately updated, so
           * accessing `this.state` after calling this method may return the old value.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} completeState Next state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueReplaceState: function(e, t, r, o) {
            se(e, "replaceState");
          },
          /**
           * Sets a subset of the state. This only exists because _pendingState is
           * internal. This provides a merging strategy that is not available to deep
           * properties which is confusing. TODO: Expose pendingState or don't use it
           * during the merge.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} partialState Next partial state to be merged with state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} Name of the calling function in the public API.
           * @internal
           */
          enqueueSetState: function(e, t, r, o) {
            se(e, "setState");
          }
        }, s = Object.assign, _ = {};
        Object.freeze(_);
        function w(e, t, r) {
          this.props = e, this.context = t, this.refs = _, this.updater = r || n;
        }
        w.prototype.isReactComponent = {}, w.prototype.setState = function(e, t) {
          if (typeof e != "object" && typeof e != "function" && e != null)
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          this.updater.enqueueSetState(this, e, t, "setState");
        }, w.prototype.forceUpdate = function(e) {
          this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        };
        {
          var T = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          }, N = function(e, t) {
            Object.defineProperty(w.prototype, e, {
              get: function() {
                Q("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
              }
            });
          };
          for (var P in T)
            T.hasOwnProperty(P) && N(P, T[P]);
        }
        function D() {
        }
        D.prototype = w.prototype;
        function x(e, t, r) {
          this.props = e, this.context = t, this.refs = _, this.updater = r || n;
        }
        var z = x.prototype = new D();
        z.constructor = x, s(z, w.prototype), z.isPureReactComponent = !0;
        function Ht() {
          var e = {
            current: null
          };
          return Object.seal(e), e;
        }
        var qt = Array.isArray;
        function we(e) {
          return qt(e);
        }
        function Gt(e) {
          {
            var t = typeof Symbol == "function" && Symbol.toStringTag, r = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
            return r;
          }
        }
        function Kt(e) {
          try {
            return Je(e), !1;
          } catch {
            return !0;
          }
        }
        function Je(e) {
          return "" + e;
        }
        function Se(e) {
          if (Kt(e))
            return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Gt(e)), Je(e);
        }
        function Jt(e, t, r) {
          var o = e.displayName;
          if (o)
            return o;
          var c = t.displayName || t.name || "";
          return c !== "" ? r + "(" + c + ")" : r;
        }
        function Xe(e) {
          return e.displayName || "Context";
        }
        function Z(e) {
          if (e == null)
            return null;
          if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
            return e.displayName || e.name || null;
          if (typeof e == "string")
            return e;
          switch (e) {
            case C:
              return "Fragment";
            case g:
              return "Portal";
            case d:
              return "Profiler";
            case E:
              return "StrictMode";
            case S:
              return "Suspense";
            case F:
              return "SuspenseList";
          }
          if (typeof e == "object")
            switch (e.$$typeof) {
              case A:
                var t = e;
                return Xe(t) + ".Consumer";
              case m:
                var r = e;
                return Xe(r._context) + ".Provider";
              case M:
                return Jt(e, e.render, "ForwardRef");
              case Y:
                var o = e.displayName || null;
                return o !== null ? o : Z(e.type) || "Memo";
              case te: {
                var c = e, p = c._payload, u = c._init;
                try {
                  return Z(u(p));
                } catch {
                  return null;
                }
              }
            }
          return null;
        }
        var he = Object.prototype.hasOwnProperty, Qe = {
          key: !0,
          ref: !0,
          __self: !0,
          __source: !0
        }, Ze, et, Ne;
        Ne = {};
        function tt(e) {
          if (he.call(e, "ref")) {
            var t = Object.getOwnPropertyDescriptor(e, "ref").get;
            if (t && t.isReactWarning)
              return !1;
          }
          return e.ref !== void 0;
        }
        function nt(e) {
          if (he.call(e, "key")) {
            var t = Object.getOwnPropertyDescriptor(e, "key").get;
            if (t && t.isReactWarning)
              return !1;
          }
          return e.key !== void 0;
        }
        function Xt(e, t) {
          var r = function() {
            Ze || (Ze = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
          };
          r.isReactWarning = !0, Object.defineProperty(e, "key", {
            get: r,
            configurable: !0
          });
        }
        function Qt(e, t) {
          var r = function() {
            et || (et = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
          };
          r.isReactWarning = !0, Object.defineProperty(e, "ref", {
            get: r,
            configurable: !0
          });
        }
        function Zt(e) {
          if (typeof e.ref == "string" && U.current && e.__self && U.current.stateNode !== e.__self) {
            var t = Z(U.current.type);
            Ne[t] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', t, e.ref), Ne[t] = !0);
          }
        }
        var je = function(e, t, r, o, c, p, u) {
          var v = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: b,
            // Built-in properties that belong on the element
            type: e,
            key: t,
            ref: r,
            props: u,
            // Record the component responsible for creating this element.
            _owner: p
          };
          return v._store = {}, Object.defineProperty(v._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: !1
          }), Object.defineProperty(v, "_self", {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: o
          }), Object.defineProperty(v, "_source", {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: c
          }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
        };
        function en(e, t, r) {
          var o, c = {}, p = null, u = null, v = null, R = null;
          if (t != null) {
            tt(t) && (u = t.ref, Zt(t)), nt(t) && (Se(t.key), p = "" + t.key), v = t.__self === void 0 ? null : t.__self, R = t.__source === void 0 ? null : t.__source;
            for (o in t)
              he.call(t, o) && !Qe.hasOwnProperty(o) && (c[o] = t[o]);
          }
          var k = arguments.length - 2;
          if (k === 1)
            c.children = r;
          else if (k > 1) {
            for (var L = Array(k), O = 0; O < k; O++)
              L[O] = arguments[O + 2];
            Object.freeze && Object.freeze(L), c.children = L;
          }
          if (e && e.defaultProps) {
            var $ = e.defaultProps;
            for (o in $)
              c[o] === void 0 && (c[o] = $[o]);
          }
          if (p || u) {
            var j = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
            p && Xt(c, j), u && Qt(c, j);
          }
          return je(e, p, u, v, R, U.current, c);
        }
        function tn(e, t) {
          var r = je(e.type, t, e.ref, e._self, e._source, e._owner, e.props);
          return r;
        }
        function nn(e, t, r) {
          if (e == null)
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
          var o, c = s({}, e.props), p = e.key, u = e.ref, v = e._self, R = e._source, k = e._owner;
          if (t != null) {
            tt(t) && (u = t.ref, k = U.current), nt(t) && (Se(t.key), p = "" + t.key);
            var L;
            e.type && e.type.defaultProps && (L = e.type.defaultProps);
            for (o in t)
              he.call(t, o) && !Qe.hasOwnProperty(o) && (t[o] === void 0 && L !== void 0 ? c[o] = L[o] : c[o] = t[o]);
          }
          var O = arguments.length - 2;
          if (O === 1)
            c.children = r;
          else if (O > 1) {
            for (var $ = Array(O), j = 0; j < O; j++)
              $[j] = arguments[j + 2];
            c.children = $;
          }
          return je(e.type, p, u, v, R, k, c);
        }
        function ce(e) {
          return typeof e == "object" && e !== null && e.$$typeof === b;
        }
        var rt = ".", rn = ":";
        function on(e) {
          var t = /[=:]/g, r = {
            "=": "=0",
            ":": "=2"
          }, o = e.replace(t, function(c) {
            return r[c];
          });
          return "$" + o;
        }
        var ot = !1, an = /\/+/g;
        function it(e) {
          return e.replace(an, "$&/");
        }
        function Ie(e, t) {
          return typeof e == "object" && e !== null && e.key != null ? (Se(e.key), on("" + e.key)) : t.toString(36);
        }
        function Ee(e, t, r, o, c) {
          var p = typeof e;
          (p === "undefined" || p === "boolean") && (e = null);
          var u = !1;
          if (e === null)
            u = !0;
          else
            switch (p) {
              case "string":
              case "number":
                u = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case b:
                  case g:
                    u = !0;
                }
            }
          if (u) {
            var v = e, R = c(v), k = o === "" ? rt + Ie(v, 0) : o;
            if (we(R)) {
              var L = "";
              k != null && (L = it(k) + "/"), Ee(R, t, L, "", function(Qn) {
                return Qn;
              });
            } else R != null && (ce(R) && (R.key && (!v || v.key !== R.key) && Se(R.key), R = tn(
              R,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              r + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (R.key && (!v || v.key !== R.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                it("" + R.key) + "/"
              ) : "") + k
            )), t.push(R));
            return 1;
          }
          var O, $, j = 0, B = o === "" ? rt : o + rn;
          if (we(e))
            for (var De = 0; De < e.length; De++)
              O = e[De], $ = B + Ie(O, De), j += Ee(O, t, r, $, c);
          else {
            var He = oe(e);
            if (typeof He == "function") {
              var Ot = e;
              He === Ot.entries && (ot || Q("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ot = !0);
              for (var Jn = He.call(Ot), Pt, Xn = 0; !(Pt = Jn.next()).done; )
                O = Pt.value, $ = B + Ie(O, Xn++), j += Ee(O, t, r, $, c);
            } else if (p === "object") {
              var Dt = String(e);
              throw new Error("Objects are not valid as a React child (found: " + (Dt === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : Dt) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return j;
        }
        function Te(e, t, r) {
          if (e == null)
            return e;
          var o = [], c = 0;
          return Ee(e, o, "", "", function(p) {
            return t.call(r, p, c++);
          }), o;
        }
        function sn(e) {
          var t = 0;
          return Te(e, function() {
            t++;
          }), t;
        }
        function cn(e, t, r) {
          Te(e, function() {
            t.apply(this, arguments);
          }, r);
        }
        function un(e) {
          return Te(e, function(t) {
            return t;
          }) || [];
        }
        function ln(e) {
          if (!ce(e))
            throw new Error("React.Children.only expected to receive a single React element child.");
          return e;
        }
        function dn(e) {
          var t = {
            $$typeof: A,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: e,
            _currentValue2: e,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null,
            // Add these to use same hidden class in VM as ServerContext
            _defaultValue: null,
            _globalName: null
          };
          t.Provider = {
            $$typeof: m,
            _context: t
          };
          var r = !1, o = !1, c = !1;
          {
            var p = {
              $$typeof: A,
              _context: t
            };
            Object.defineProperties(p, {
              Provider: {
                get: function() {
                  return o || (o = !0, h("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), t.Provider;
                },
                set: function(u) {
                  t.Provider = u;
                }
              },
              _currentValue: {
                get: function() {
                  return t._currentValue;
                },
                set: function(u) {
                  t._currentValue = u;
                }
              },
              _currentValue2: {
                get: function() {
                  return t._currentValue2;
                },
                set: function(u) {
                  t._currentValue2 = u;
                }
              },
              _threadCount: {
                get: function() {
                  return t._threadCount;
                },
                set: function(u) {
                  t._threadCount = u;
                }
              },
              Consumer: {
                get: function() {
                  return r || (r = !0, h("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), t.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return t.displayName;
                },
                set: function(u) {
                  c || (Q("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", u), c = !0);
                }
              }
            }), t.Consumer = p;
          }
          return t._currentRenderer = null, t._currentRenderer2 = null, t;
        }
        var ge = -1, Me = 0, at = 1, fn = 2;
        function pn(e) {
          if (e._status === ge) {
            var t = e._result, r = t();
            if (r.then(function(p) {
              if (e._status === Me || e._status === ge) {
                var u = e;
                u._status = at, u._result = p;
              }
            }, function(p) {
              if (e._status === Me || e._status === ge) {
                var u = e;
                u._status = fn, u._result = p;
              }
            }), e._status === ge) {
              var o = e;
              o._status = Me, o._result = r;
            }
          }
          if (e._status === at) {
            var c = e._result;
            return c === void 0 && h(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, c), "default" in c || h(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, c), c.default;
          } else
            throw e._result;
        }
        function hn(e) {
          var t = {
            // We use these fields to store the result.
            _status: ge,
            _result: e
          }, r = {
            $$typeof: te,
            _payload: t,
            _init: pn
          };
          {
            var o, c;
            Object.defineProperties(r, {
              defaultProps: {
                configurable: !0,
                get: function() {
                  return o;
                },
                set: function(p) {
                  h("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), o = p, Object.defineProperty(r, "defaultProps", {
                    enumerable: !0
                  });
                }
              },
              propTypes: {
                configurable: !0,
                get: function() {
                  return c;
                },
                set: function(p) {
                  h("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), c = p, Object.defineProperty(r, "propTypes", {
                    enumerable: !0
                  });
                }
              }
            });
          }
          return r;
        }
        function gn(e) {
          e != null && e.$$typeof === Y ? h("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? h("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && h("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && h("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
          var t = {
            $$typeof: M,
            render: e
          };
          {
            var r;
            Object.defineProperty(t, "displayName", {
              enumerable: !1,
              configurable: !0,
              get: function() {
                return r;
              },
              set: function(o) {
                r = o, !e.name && !e.displayName && (e.displayName = o);
              }
            });
          }
          return t;
        }
        var st;
        st = Symbol.for("react.module.reference");
        function ct(e) {
          return !!(typeof e == "string" || typeof e == "function" || e === C || e === d || ae || e === E || e === S || e === F || pe || e === ve || fe || Ae || _e || typeof e == "object" && e !== null && (e.$$typeof === te || e.$$typeof === Y || e.$$typeof === m || e.$$typeof === A || e.$$typeof === M || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          e.$$typeof === st || e.getModuleId !== void 0));
        }
        function mn(e, t) {
          ct(e) || h("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
          var r = {
            $$typeof: Y,
            type: e,
            compare: t === void 0 ? null : t
          };
          {
            var o;
            Object.defineProperty(r, "displayName", {
              enumerable: !1,
              configurable: !0,
              get: function() {
                return o;
              },
              set: function(c) {
                o = c, !e.name && !e.displayName && (e.displayName = c);
              }
            });
          }
          return r;
        }
        function V() {
          var e = ie.current;
          return e === null && h(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
        }
        function vn(e) {
          var t = V();
          if (e._context !== void 0) {
            var r = e._context;
            r.Consumer === e ? h("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : r.Provider === e && h("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
          }
          return t.useContext(e);
        }
        function yn(e) {
          var t = V();
          return t.useState(e);
        }
        function bn(e, t, r) {
          var o = V();
          return o.useReducer(e, t, r);
        }
        function _n(e) {
          var t = V();
          return t.useRef(e);
        }
        function Rn(e, t) {
          var r = V();
          return r.useEffect(e, t);
        }
        function wn(e, t) {
          var r = V();
          return r.useInsertionEffect(e, t);
        }
        function Sn(e, t) {
          var r = V();
          return r.useLayoutEffect(e, t);
        }
        function En(e, t) {
          var r = V();
          return r.useCallback(e, t);
        }
        function Tn(e, t) {
          var r = V();
          return r.useMemo(e, t);
        }
        function Cn(e, t, r) {
          var o = V();
          return o.useImperativeHandle(e, t, r);
        }
        function kn(e, t) {
          {
            var r = V();
            return r.useDebugValue(e, t);
          }
        }
        function xn() {
          var e = V();
          return e.useTransition();
        }
        function Ln(e) {
          var t = V();
          return t.useDeferredValue(e);
        }
        function On() {
          var e = V();
          return e.useId();
        }
        function Pn(e, t, r) {
          var o = V();
          return o.useSyncExternalStore(e, t, r);
        }
        var me = 0, ut, lt, dt, ft, pt, ht, gt;
        function mt() {
        }
        mt.__reactDisabledLog = !0;
        function Dn() {
          {
            if (me === 0) {
              ut = console.log, lt = console.info, dt = console.warn, ft = console.error, pt = console.group, ht = console.groupCollapsed, gt = console.groupEnd;
              var e = {
                configurable: !0,
                enumerable: !0,
                value: mt,
                writable: !0
              };
              Object.defineProperties(console, {
                info: e,
                log: e,
                warn: e,
                error: e,
                group: e,
                groupCollapsed: e,
                groupEnd: e
              });
            }
            me++;
          }
        }
        function $n() {
          {
            if (me--, me === 0) {
              var e = {
                configurable: !0,
                enumerable: !0,
                writable: !0
              };
              Object.defineProperties(console, {
                log: s({}, e, {
                  value: ut
                }),
                info: s({}, e, {
                  value: lt
                }),
                warn: s({}, e, {
                  value: dt
                }),
                error: s({}, e, {
                  value: ft
                }),
                group: s({}, e, {
                  value: pt
                }),
                groupCollapsed: s({}, e, {
                  value: ht
                }),
                groupEnd: s({}, e, {
                  value: gt
                })
              });
            }
            me < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
        var Fe = H.ReactCurrentDispatcher, Be;
        function Ce(e, t, r) {
          {
            if (Be === void 0)
              try {
                throw Error();
              } catch (c) {
                var o = c.stack.trim().match(/\n( *(at )?)/);
                Be = o && o[1] || "";
              }
            return `
` + Be + e;
          }
        }
        var ze = !1, ke;
        {
          var An = typeof WeakMap == "function" ? WeakMap : Map;
          ke = new An();
        }
        function vt(e, t) {
          if (!e || ze)
            return "";
          {
            var r = ke.get(e);
            if (r !== void 0)
              return r;
          }
          var o;
          ze = !0;
          var c = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var p;
          p = Fe.current, Fe.current = null, Dn();
          try {
            if (t) {
              var u = function() {
                throw Error();
              };
              if (Object.defineProperty(u.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(u, []);
                } catch (B) {
                  o = B;
                }
                Reflect.construct(e, [], u);
              } else {
                try {
                  u.call();
                } catch (B) {
                  o = B;
                }
                e.call(u.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                o = B;
              }
              e();
            }
          } catch (B) {
            if (B && o && typeof B.stack == "string") {
              for (var v = B.stack.split(`
`), R = o.stack.split(`
`), k = v.length - 1, L = R.length - 1; k >= 1 && L >= 0 && v[k] !== R[L]; )
                L--;
              for (; k >= 1 && L >= 0; k--, L--)
                if (v[k] !== R[L]) {
                  if (k !== 1 || L !== 1)
                    do
                      if (k--, L--, L < 0 || v[k] !== R[L]) {
                        var O = `
` + v[k].replace(" at new ", " at ");
                        return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && ke.set(e, O), O;
                      }
                    while (k >= 1 && L >= 0);
                  break;
                }
            }
          } finally {
            ze = !1, Fe.current = p, $n(), Error.prepareStackTrace = c;
          }
          var $ = e ? e.displayName || e.name : "", j = $ ? Ce($) : "";
          return typeof e == "function" && ke.set(e, j), j;
        }
        function Nn(e, t, r) {
          return vt(e, !1);
        }
        function jn(e) {
          var t = e.prototype;
          return !!(t && t.isReactComponent);
        }
        function xe(e, t, r) {
          if (e == null)
            return "";
          if (typeof e == "function")
            return vt(e, jn(e));
          if (typeof e == "string")
            return Ce(e);
          switch (e) {
            case S:
              return Ce("Suspense");
            case F:
              return Ce("SuspenseList");
          }
          if (typeof e == "object")
            switch (e.$$typeof) {
              case M:
                return Nn(e.render);
              case Y:
                return xe(e.type, t, r);
              case te: {
                var o = e, c = o._payload, p = o._init;
                try {
                  return xe(p(c), t, r);
                } catch {
                }
              }
            }
          return "";
        }
        var yt = {}, bt = H.ReactDebugCurrentFrame;
        function Le(e) {
          if (e) {
            var t = e._owner, r = xe(e.type, e._source, t ? t.type : null);
            bt.setExtraStackFrame(r);
          } else
            bt.setExtraStackFrame(null);
        }
        function In(e, t, r, o, c) {
          {
            var p = Function.call.bind(he);
            for (var u in e)
              if (p(e, u)) {
                var v = void 0;
                try {
                  if (typeof e[u] != "function") {
                    var R = Error((o || "React class") + ": " + r + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    throw R.name = "Invariant Violation", R;
                  }
                  v = e[u](t, u, o, r, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (k) {
                  v = k;
                }
                v && !(v instanceof Error) && (Le(c), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", r, u, typeof v), Le(null)), v instanceof Error && !(v.message in yt) && (yt[v.message] = !0, Le(c), h("Failed %s type: %s", r, v.message), Le(null));
              }
          }
        }
        function ue(e) {
          if (e) {
            var t = e._owner, r = xe(e.type, e._source, t ? t.type : null);
            be(r);
          } else
            be(null);
        }
        var Ve;
        Ve = !1;
        function _t() {
          if (U.current) {
            var e = Z(U.current.type);
            if (e)
              return `

Check the render method of \`` + e + "`.";
          }
          return "";
        }
        function Mn(e) {
          if (e !== void 0) {
            var t = e.fileName.replace(/^.*[\\\/]/, ""), r = e.lineNumber;
            return `

Check your code at ` + t + ":" + r + ".";
          }
          return "";
        }
        function Fn(e) {
          return e != null ? Mn(e.__source) : "";
        }
        var Rt = {};
        function Bn(e) {
          var t = _t();
          if (!t) {
            var r = typeof e == "string" ? e : e.displayName || e.name;
            r && (t = `

Check the top-level render call using <` + r + ">.");
          }
          return t;
        }
        function wt(e, t) {
          if (!(!e._store || e._store.validated || e.key != null)) {
            e._store.validated = !0;
            var r = Bn(t);
            if (!Rt[r]) {
              Rt[r] = !0;
              var o = "";
              e && e._owner && e._owner !== U.current && (o = " It was passed a child from " + Z(e._owner.type) + "."), ue(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', r, o), ue(null);
            }
          }
        }
        function St(e, t) {
          if (typeof e == "object") {
            if (we(e))
              for (var r = 0; r < e.length; r++) {
                var o = e[r];
                ce(o) && wt(o, t);
              }
            else if (ce(e))
              e._store && (e._store.validated = !0);
            else if (e) {
              var c = oe(e);
              if (typeof c == "function" && c !== e.entries)
                for (var p = c.call(e), u; !(u = p.next()).done; )
                  ce(u.value) && wt(u.value, t);
            }
          }
        }
        function Et(e) {
          {
            var t = e.type;
            if (t == null || typeof t == "string")
              return;
            var r;
            if (typeof t == "function")
              r = t.propTypes;
            else if (typeof t == "object" && (t.$$typeof === M || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            t.$$typeof === Y))
              r = t.propTypes;
            else
              return;
            if (r) {
              var o = Z(t);
              In(r, e.props, "prop", o, e);
            } else if (t.PropTypes !== void 0 && !Ve) {
              Ve = !0;
              var c = Z(t);
              h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
            }
            typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
        function zn(e) {
          {
            for (var t = Object.keys(e.props), r = 0; r < t.length; r++) {
              var o = t[r];
              if (o !== "children" && o !== "key") {
                ue(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), ue(null);
                break;
              }
            }
            e.ref !== null && (ue(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), ue(null));
          }
        }
        function Tt(e, t, r) {
          var o = ct(e);
          if (!o) {
            var c = "";
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var p = Fn(t);
            p ? c += p : c += _t();
            var u;
            e === null ? u = "null" : we(e) ? u = "array" : e !== void 0 && e.$$typeof === b ? (u = "<" + (Z(e.type) || "Unknown") + " />", c = " Did you accidentally export a JSX literal instead of a component?") : u = typeof e, h("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", u, c);
          }
          var v = en.apply(this, arguments);
          if (v == null)
            return v;
          if (o)
            for (var R = 2; R < arguments.length; R++)
              St(arguments[R], e);
          return e === C ? zn(v) : Et(v), v;
        }
        var Ct = !1;
        function Vn(e) {
          var t = Tt.bind(null, e);
          return t.type = e, Ct || (Ct = !0, Q("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(t, "type", {
            enumerable: !1,
            get: function() {
              return Q("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
                value: e
              }), e;
            }
          }), t;
        }
        function Un(e, t, r) {
          for (var o = nn.apply(this, arguments), c = 2; c < arguments.length; c++)
            St(arguments[c], o.type);
          return Et(o), o;
        }
        function Wn(e, t) {
          var r = K.transition;
          K.transition = {};
          var o = K.transition;
          K.transition._updatedFibers = /* @__PURE__ */ new Set();
          try {
            e();
          } finally {
            if (K.transition = r, r === null && o._updatedFibers) {
              var c = o._updatedFibers.size;
              c > 10 && Q("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), o._updatedFibers.clear();
            }
          }
        }
        var kt = !1, Oe = null;
        function Yn(e) {
          if (Oe === null)
            try {
              var t = ("require" + Math.random()).slice(0, 7), r = f && f[t];
              Oe = r.call(f, "timers").setImmediate;
            } catch {
              Oe = function(c) {
                kt === !1 && (kt = !0, typeof MessageChannel > "u" && h("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
                var p = new MessageChannel();
                p.port1.onmessage = c, p.port2.postMessage(void 0);
              };
            }
          return Oe(e);
        }
        var le = 0, xt = !1;
        function Lt(e) {
          {
            var t = le;
            le++, I.current === null && (I.current = []);
            var r = I.isBatchingLegacy, o;
            try {
              if (I.isBatchingLegacy = !0, o = e(), !r && I.didScheduleLegacyUpdate) {
                var c = I.current;
                c !== null && (I.didScheduleLegacyUpdate = !1, Ye(c));
              }
            } catch ($) {
              throw Pe(t), $;
            } finally {
              I.isBatchingLegacy = r;
            }
            if (o !== null && typeof o == "object" && typeof o.then == "function") {
              var p = o, u = !1, v = {
                then: function($, j) {
                  u = !0, p.then(function(B) {
                    Pe(t), le === 0 ? Ue(B, $, j) : $(B);
                  }, function(B) {
                    Pe(t), j(B);
                  });
                }
              };
              return !xt && typeof Promise < "u" && Promise.resolve().then(function() {
              }).then(function() {
                u || (xt = !0, h("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
              }), v;
            } else {
              var R = o;
              if (Pe(t), le === 0) {
                var k = I.current;
                k !== null && (Ye(k), I.current = null);
                var L = {
                  then: function($, j) {
                    I.current === null ? (I.current = [], Ue(R, $, j)) : $(R);
                  }
                };
                return L;
              } else {
                var O = {
                  then: function($, j) {
                    $(R);
                  }
                };
                return O;
              }
            }
          }
        }
        function Pe(e) {
          e !== le - 1 && h("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), le = e;
        }
        function Ue(e, t, r) {
          {
            var o = I.current;
            if (o !== null)
              try {
                Ye(o), Yn(function() {
                  o.length === 0 ? (I.current = null, t(e)) : Ue(e, t, r);
                });
              } catch (c) {
                r(c);
              }
            else
              t(e);
          }
        }
        var We = !1;
        function Ye(e) {
          if (!We) {
            We = !0;
            var t = 0;
            try {
              for (; t < e.length; t++) {
                var r = e[t];
                do
                  r = r(!0);
                while (r !== null);
              }
              e.length = 0;
            } catch (o) {
              throw e = e.slice(t + 1), o;
            } finally {
              We = !1;
            }
          }
        }
        var Hn = Tt, qn = Un, Gn = Vn, Kn = {
          map: Te,
          forEach: cn,
          count: sn,
          toArray: un,
          only: ln
        };
        i.Children = Kn, i.Component = w, i.Fragment = C, i.Profiler = d, i.PureComponent = x, i.StrictMode = E, i.Suspense = S, i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = H, i.act = Lt, i.cloneElement = qn, i.createContext = dn, i.createElement = Hn, i.createFactory = Gn, i.createRef = Ht, i.forwardRef = gn, i.isValidElement = ce, i.lazy = hn, i.memo = mn, i.startTransition = Wn, i.unstable_act = Lt, i.useCallback = En, i.useContext = vn, i.useDebugValue = kn, i.useDeferredValue = Ln, i.useEffect = Rn, i.useId = On, i.useImperativeHandle = Cn, i.useInsertionEffect = wn, i.useLayoutEffect = Sn, i.useMemo = Tn, i.useReducer = bn, i.useRef = _n, i.useState = yn, i.useSyncExternalStore = Pn, i.useTransition = xn, i.version = l, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
      }();
    }(de, de.exports)), de.exports;
  }
  process.env.NODE_ENV === "production" ? W.exports = $t() : W.exports = At();
  var J = W.exports;
  const Ke = /* @__PURE__ */ ee(J), Nt = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-plugin-rtl-support",
    version: "1.0.0",
    minAppVersion: "0.0.0",
    displayName: {
      default: "RTL Language Support",
      zh: "RTL语言支持",
      he: "תמיכה בשפות מימין לשמאל",
      ar: "دعم اللغات من اليمين إلى اليسار"
    },
    description: {
      default: "Automatically detects and applies RTL styling for Hebrew, Arabic, and other right-to-left languages in Blinko notes.",
      zh: "自动检测并为Blinko笔记中的希伯来语、阿拉伯语和其他从右到左的语言应用RTL样式。",
      he: "מזהה אוטומטית ומחיל עיצוב RTL לעברית, ערבית ושפות אחרות מימין לשמאל ברשימות Blinko.",
      ar: "يكتشف تلقائياً ويطبق تصميم RTL للعبرية والعربية واللغات الأخرى من اليمين إلى اليسار في ملاحظات Blinko."
    },
    readme: {
      default: "README.md",
      zh: "README_zh.md",
      he: "README_he.md"
    }
  };
  var $e;
  $e = { __e: function(f, i, l, b) {
    for (var g, C, E; i = i.__; ) if ((g = i.__c) && !g.__) try {
      if ((C = g.constructor) && C.getDerivedStateFromError != null && (g.setState(C.getDerivedStateFromError(f)), E = g.__d), g.componentDidCatch != null && (g.componentDidCatch(f, b || {}), E = g.__d), E) return g.__E = g;
    } catch (d) {
      f = d;
    }
    throw f;
  } }, typeof Promise == "function" && Promise.prototype.then.bind(Promise.resolve());
  var jt = 0;
  function a(f, i, l, b, g, C) {
    i || (i = {});
    var E, d, m = i;
    if ("ref" in m) for (d in m = {}, i) d == "ref" ? E = i[d] : m[d] = i[d];
    var A = { type: f, props: m, key: l, ref: E, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --jt, __i: -1, __u: 0, __source: g, __self: C };
    if (typeof f == "function" && (E = f.defaultProps)) for (d in E) m[d] === void 0 && (m[d] = E[d]);
    return $e.vnode && $e.vnode(A), A;
  }
  function It({ detector: f, styler: i }) {
    const [l, b] = J.useState({
      isEnabled: !0,
      detectionConfig: {
        sensitivity: "medium",
        minRTLChars: 3,
        sampleSize: 100
      },
      styleConfig: {
        autoDetect: !0,
        forceDirection: "auto",
        applyToSelectors: [
          ".note-content",
          ".note-editor",
          "textarea",
          ".markdown-content",
          ".note-text"
        ]
      },
      stats: {
        totalProcessed: 0,
        rtlDetected: 0
      }
    });
    J.useEffect(() => {
      l.isEnabled ? i.startObserving() : i.stopObserving();
    }, [l.isEnabled, i]);
    const g = () => {
      b((m) => ({ ...m, isEnabled: !m.isEnabled }));
    }, C = (m) => {
      const A = { ...l.detectionConfig, ...m };
      f.updateConfig(A), b((M) => ({
        ...M,
        detectionConfig: A
      }));
    }, E = (m) => {
      const A = { ...l.styleConfig, ...m };
      i.updateConfig(A), b((M) => ({
        ...M,
        styleConfig: A
      }));
    }, d = (m) => {
      const A = f.detectRTL(m);
      return b((M) => ({
        ...M,
        stats: {
          totalProcessed: M.stats.totalProcessed + 1,
          rtlDetected: M.stats.rtlDetected + (A ? 1 : 0)
        }
      })), A;
    };
    return /* @__PURE__ */ a("div", { className: "rtl-plugin-container", children: [
      /* @__PURE__ */ a("div", { className: "plugin-header", children: [
        /* @__PURE__ */ a("h2", { children: "RTL Language Support" }),
        /* @__PURE__ */ a("div", { className: "plugin-status", children: [
          /* @__PURE__ */ a("label", { className: "switch", children: [
            /* @__PURE__ */ a(
              "input",
              {
                type: "checkbox",
                checked: l.isEnabled,
                onChange: g
              }
            ),
            /* @__PURE__ */ a("span", { className: "slider" })
          ] }),
          /* @__PURE__ */ a("span", { children: l.isEnabled ? "Enabled" : "Disabled" })
        ] })
      ] }),
      /* @__PURE__ */ a("div", { className: "plugin-content", children: [
        /* @__PURE__ */ a("div", { className: "section", children: [
          /* @__PURE__ */ a("h3", { children: "Detection Settings" }),
          /* @__PURE__ */ a("div", { className: "setting-group", children: [
            /* @__PURE__ */ a("label", { children: "Sensitivity:" }),
            /* @__PURE__ */ a(
              "select",
              {
                value: l.detectionConfig.sensitivity,
                onChange: (m) => C({
                  sensitivity: m.target.value
                }),
                children: [
                  /* @__PURE__ */ a("option", { value: "high", children: "High (10%)" }),
                  /* @__PURE__ */ a("option", { value: "medium", children: "Medium (20%)" }),
                  /* @__PURE__ */ a("option", { value: "low", children: "Low (40%)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a("div", { className: "setting-group", children: [
            /* @__PURE__ */ a("label", { children: "Min RTL Characters:" }),
            /* @__PURE__ */ a(
              "input",
              {
                type: "number",
                min: "1",
                max: "20",
                value: l.detectionConfig.minRTLChars,
                onChange: (m) => C({
                  minRTLChars: parseInt(m.target.value)
                })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "section", children: [
          /* @__PURE__ */ a("h3", { children: "Style Settings" }),
          /* @__PURE__ */ a("div", { className: "setting-group", children: [
            /* @__PURE__ */ a("label", { children: "Direction Mode:" }),
            /* @__PURE__ */ a(
              "select",
              {
                value: l.styleConfig.forceDirection,
                onChange: (m) => E({
                  forceDirection: m.target.value
                }),
                children: [
                  /* @__PURE__ */ a("option", { value: "auto", children: "Auto Detect" }),
                  /* @__PURE__ */ a("option", { value: "rtl", children: "Force RTL" }),
                  /* @__PURE__ */ a("option", { value: "ltr", children: "Force LTR" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a("div", { className: "setting-group", children: /* @__PURE__ */ a("label", { children: [
            /* @__PURE__ */ a(
              "input",
              {
                type: "checkbox",
                checked: l.styleConfig.autoDetect,
                onChange: (m) => E({
                  autoDetect: m.target.checked
                })
              }
            ),
            "Auto-detect new content"
          ] }) })
        ] }),
        /* @__PURE__ */ a("div", { className: "section", children: [
          /* @__PURE__ */ a("h3", { children: "Statistics" }),
          /* @__PURE__ */ a("div", { className: "stats", children: [
            /* @__PURE__ */ a("div", { className: "stat-item", children: [
              /* @__PURE__ */ a("span", { children: "Total Processed:" }),
              /* @__PURE__ */ a("span", { children: l.stats.totalProcessed })
            ] }),
            /* @__PURE__ */ a("div", { className: "stat-item", children: [
              /* @__PURE__ */ a("span", { children: "RTL Detected:" }),
              /* @__PURE__ */ a("span", { children: l.stats.rtlDetected })
            ] }),
            /* @__PURE__ */ a("div", { className: "stat-item", children: [
              /* @__PURE__ */ a("span", { children: "Detection Rate:" }),
              /* @__PURE__ */ a("span", { children: [
                l.stats.totalProcessed > 0 ? Math.round(l.stats.rtlDetected / l.stats.totalProcessed * 100) : 0,
                "%"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "section", children: [
          /* @__PURE__ */ a("h3", { children: "Test Detection" }),
          /* @__PURE__ */ a("div", { className: "test-area", children: [
            /* @__PURE__ */ a(
              "textarea",
              {
                placeholder: "Enter text to test RTL detection...",
                onBlur: (m) => {
                  const A = d(m.target.value);
                  alert(`Text is ${A ? "RTL" : "LTR"}`);
                }
              }
            ),
            /* @__PURE__ */ a("p", { className: "test-examples", children: [
              "Try these examples:",
              /* @__PURE__ */ a("br", {}),
              "Hebrew: שלום עולם - זהו טקסט בעברית",
              /* @__PURE__ */ a("br", {}),
              "Arabic: مرحبا بالعالم - هذا نص باللغة العربية",
              /* @__PURE__ */ a("br", {}),
              "English: Hello world - this is English text"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a("style", { children: `
        .rtl-plugin-container {
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .plugin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .plugin-status {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #2196F3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .section {
          margin-bottom: 30px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .section h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #333;
        }

        .setting-group {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .setting-group label {
          min-width: 150px;
          font-weight: 500;
        }

        .setting-group select,
        .setting-group input[type="number"] {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background: #f5f5f5;
          border-radius: 4px;
        }

        .test-area textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
          font-family: inherit;
        }

        .test-examples {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }
      ` })
    ] });
  }
  function Mt() {
    const [f, i] = J.useState({
      enabled: !0,
      sensitivity: "medium",
      forceDirection: "auto",
      autoDetect: !0,
      customSelectors: [
        ".note-content",
        ".note-editor",
        "textarea",
        ".markdown-content",
        ".note-text"
      ]
    }), [l, b] = J.useState(""), [g, C] = J.useState("idle"), E = J.useRef(null);
    J.useEffect(() => {
      const S = localStorage.getItem("blinko-rtl-settings");
      if (S)
        try {
          const F = JSON.parse(S);
          i((Y) => ({ ...Y, ...F }));
        } catch (F) {
          console.error("Failed to load RTL plugin settings:", F);
        }
      return () => {
        E.current && clearTimeout(E.current);
      };
    }, []);
    const d = (S) => {
      C("saving");
      const F = { ...f, ...S };
      i(F), localStorage.setItem("blinko-rtl-settings", JSON.stringify(F)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: F
        })
      ), E.current && clearTimeout(E.current), E.current = window.setTimeout(() => {
        C("saved"), E.current = window.setTimeout(() => C("idle"), 2e3);
      }, 300);
    }, m = () => {
      l.trim() && !f.customSelectors.includes(l.trim()) && (d({
        customSelectors: [...f.customSelectors, l.trim()]
      }), b(""));
    }, A = (S) => {
      d({
        customSelectors: f.customSelectors.filter((F) => F !== S)
      });
    }, M = () => {
      d({
        enabled: !0,
        sensitivity: "medium",
        forceDirection: "auto",
        autoDetect: !0,
        customSelectors: [
          ".note-content",
          ".note-editor",
          "textarea",
          ".markdown-content",
          ".note-text"
        ]
      });
    };
    return /* @__PURE__ */ a("div", { className: "rtl-settings-panel", children: [
      /* @__PURE__ */ a("div", { className: "settings-header", children: [
        /* @__PURE__ */ a("h2", { children: "RTL Language Support Settings" }),
        /* @__PURE__ */ a("p", { children: "Configure automatic RTL detection and styling for Hebrew, Arabic, and other right-to-left languages." })
      ] }),
      /* @__PURE__ */ a("div", { className: "settings-content", children: [
        /* @__PURE__ */ a("div", { className: "setting-section", children: [
          /* @__PURE__ */ a("h3", { children: "General Settings" }),
          /* @__PURE__ */ a("div", { className: "setting-item", children: [
            /* @__PURE__ */ a("label", { className: "setting-label", children: [
              /* @__PURE__ */ a(
                "input",
                {
                  type: "checkbox",
                  checked: f.enabled,
                  onChange: (S) => d({ enabled: S.target.checked })
                }
              ),
              /* @__PURE__ */ a("span", { children: "Enable RTL Support" })
            ] }),
            /* @__PURE__ */ a("p", { className: "setting-description", children: "Automatically detect and apply RTL styling to content" })
          ] }),
          /* @__PURE__ */ a("div", { className: "setting-item", children: [
            /* @__PURE__ */ a("label", { className: "setting-label", children: [
              /* @__PURE__ */ a(
                "input",
                {
                  type: "checkbox",
                  checked: f.autoDetect,
                  onChange: (S) => d({ autoDetect: S.target.checked }),
                  disabled: !f.enabled
                }
              ),
              /* @__PURE__ */ a("span", { children: "Auto-detect New Content" })
            ] }),
            /* @__PURE__ */ a("p", { className: "setting-description", children: "Automatically process new content as it appears" })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "setting-section", children: [
          /* @__PURE__ */ a("h3", { children: "Detection Settings" }),
          /* @__PURE__ */ a("div", { className: "setting-item", children: [
            /* @__PURE__ */ a("label", { className: "setting-label", children: "Detection Sensitivity" }),
            /* @__PURE__ */ a(
              "select",
              {
                value: f.sensitivity,
                onChange: (S) => d({
                  sensitivity: S.target.value
                }),
                disabled: !f.enabled,
                children: [
                  /* @__PURE__ */ a("option", { value: "high", children: "High - 10% RTL characters" }),
                  /* @__PURE__ */ a("option", { value: "medium", children: "Medium - 20% RTL characters" }),
                  /* @__PURE__ */ a("option", { value: "low", children: "Low - 40% RTL characters" })
                ]
              }
            ),
            /* @__PURE__ */ a("p", { className: "setting-description", children: "Minimum percentage of RTL characters needed to trigger RTL styling" })
          ] }),
          /* @__PURE__ */ a("div", { className: "setting-item", children: [
            /* @__PURE__ */ a("label", { className: "setting-label", children: "Direction Override" }),
            /* @__PURE__ */ a(
              "select",
              {
                value: f.forceDirection,
                onChange: (S) => d({
                  forceDirection: S.target.value
                }),
                disabled: !f.enabled,
                children: [
                  /* @__PURE__ */ a("option", { value: "auto", children: "Auto-detect" }),
                  /* @__PURE__ */ a("option", { value: "rtl", children: "Always RTL" }),
                  /* @__PURE__ */ a("option", { value: "ltr", children: "Always LTR" })
                ]
              }
            ),
            /* @__PURE__ */ a("p", { className: "setting-description", children: "Override automatic detection with forced direction" })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "setting-section", children: [
          /* @__PURE__ */ a("h3", { children: "CSS Selectors" }),
          /* @__PURE__ */ a("p", { className: "section-description", children: "Define which elements should be processed for RTL detection" }),
          /* @__PURE__ */ a("div", { className: "selector-list", children: f.customSelectors.map((S, F) => /* @__PURE__ */ a("div", { className: "selector-item", children: [
            /* @__PURE__ */ a("code", { children: S }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: () => A(S),
                className: "remove-btn",
                disabled: !f.enabled,
                children: "×"
              }
            )
          ] }, F)) }),
          /* @__PURE__ */ a("div", { className: "add-selector", children: [
            /* @__PURE__ */ a(
              "input",
              {
                type: "text",
                value: l,
                onChange: (S) => b(S.target.value),
                placeholder: "Enter CSS selector (e.g., .my-content)",
                disabled: !f.enabled,
                onKeyPress: (S) => S.key === "Enter" && m()
              }
            ),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: m,
                disabled: !f.enabled || !l.trim(),
                children: "Add Selector"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "setting-section", children: [
          /* @__PURE__ */ a("div", { className: "advanced-header", children: [
            /* @__PURE__ */ a("h3", { children: "Advanced" }),
            /* @__PURE__ */ a(
              "span",
              {
                className: `save-status ${g !== "idle" ? "visible" : ""}`,
                children: g === "saving" ? "Saving..." : g === "saved" ? "Settings Saved!" : ""
              }
            )
          ] }),
          /* @__PURE__ */ a("div", { className: "setting-actions", children: [
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: M,
                className: "reset-btn",
                children: "Reset to Defaults"
              }
            ),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: () => {
                  const S = JSON.stringify(f, null, 2);
                  navigator.clipboard.writeText(S), alert("Settings copied to clipboard");
                },
                className: "export-btn",
                children: "Export Settings"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a("style", { children: `
        .rtl-settings-panel {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .settings-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #eee;
        }

        .settings-header h2 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .settings-header p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .setting-section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fafafa;
        }

        .setting-section h3 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .section-description {
          margin: 0 0 15px 0;
          color: #666;
          font-size: 14px;
        }

        .setting-item {
          margin-bottom: 20px;
        }

        .setting-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          margin-bottom: 5px;
          cursor: pointer;
        }

        .setting-label input[type="checkbox"] {
          margin: 0;
        }

        .setting-label select {
          margin-left: auto;
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-width: 200px;
        }

        .setting-description {
          margin: 5px 0 0 0;
          font-size: 13px;
          color: #666;
          font-style: italic;
        }

        .selector-list {
          margin-bottom: 15px;
        }

        .selector-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          margin-bottom: 5px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .selector-item code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          color: #333;
        }

        .remove-btn {
          background: #ff4757;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
        }

        .remove-btn:hover:not(:disabled) {
          background: #ff3838;
        }

        .add-selector {
          display: flex;
          gap: 10px;
        }

        .add-selector input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .add-selector button {
          padding: 8px 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-selector button:hover:not(:disabled) {
          background: #0056b3;
        }

        .advanced-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .advanced-header h3 {
          margin: 0;
        }

        .save-status {
          color: #28a745;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .save-status.visible {
          opacity: 1;
        }

        .setting-actions {
          display: flex;
          gap: 10px;
        }

        .reset-btn, .export-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .reset-btn {
          background: #dc3545;
          color: white;
        }

        .reset-btn:hover {
          background: #c82333;
        }

        .export-btn {
          background: #28a745;
          color: white;
        }

        .export-btn:hover {
          background: #218838;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        button:disabled:hover {
          background: initial !important;
        }
      ` })
    ] });
  }
  class Ft {
    constructor(i = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      q(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      q(this, "RTL_RANGES", [
        [1424, 1535],
        // Hebrew
        [1536, 1791],
        // Arabic
        [1792, 1871],
        // Syriac
        [1920, 1983]
        // Thaana
      ]);
      this.config = i;
    }
    /**
     * Check if a character is RTL
     */
    isRTLChar(i) {
      const l = i.charCodeAt(0);
      return this.RTL_RANGES.some(([b, g]) => l >= b && l <= g);
    }
    /**
     * Detect RTL content in text
     */
    detectRTL(i) {
      if (!i || i.length === 0) return !1;
      const l = i.substring(0, this.config.sampleSize);
      let b = 0, g = 0;
      for (const d of l)
        /\s|[.,!?;:()[\]{}]/.test(d) || (g++, this.isRTLChar(d) && b++);
      return b < this.config.minRTLChars ? !1 : (g > 0 ? b / g : 0) >= {
        high: 0.1,
        // 10% RTL chars
        medium: 0.15,
        // 15% RTL chars
        low: 0.4
        // 40% RTL chars
      }[this.config.sensitivity];
    }
    /**
     * Detect RTL in multiple text segments
     */
    detectRTLInSegments(i) {
      return i.map((l) => this.detectRTL(l));
    }
    /**
     * Update detection configuration
     */
    updateConfig(i) {
      this.config = { ...this.config, ...i };
    }
  }
  function Bt(f, i) {
    let l;
    return function(...g) {
      const C = () => {
        l = null, f(...g);
      };
      l && clearTimeout(l), l = setTimeout(C, i);
    };
  }
  class zt {
    constructor(i, l = {
      autoDetect: !0,
      forceDirection: "auto",
      applyToSelectors: [
        ".note-content",
        ".note-editor",
        "textarea",
        ".markdown-content",
        ".note-text"
      ]
    }) {
      q(this, "config");
      q(this, "detector");
      q(this, "observer", null);
      q(this, "styleSheet", null);
      q(this, "debouncedProcessElement");
      this.detector = i, this.config = l, this.injectRTLStyles(), this.debouncedProcessElement = Bt(this.processElement.bind(this), 150);
    }
    /**
     * Inject RTL CSS styles into document
     */
    injectRTLStyles() {
      if (document.getElementById("blinko-rtl-styles")) return;
      const i = document.createElement("style");
      i.id = "blinko-rtl-styles", i.textContent = `
      /* RTL Content Styling */
      .blinko-rtl-content {
        direction: rtl !important;
        text-align: right !important;
        font-family: 'Noto Sans Hebrew', 'Tahoma', 'Arial', sans-serif;
      }

      .blinko-ltr-content {
        direction: ltr !important;
        text-align: left !important;
      }

      /* RTL specific adjustments */
      .blinko-rtl-content input,
      .blinko-rtl-content textarea {
        text-align: right;
        direction: rtl;
      }

      .blinko-rtl-content .note-editor {
        text-align: right;
        direction: rtl;
      }

      /* Mixed content support */
      .blinko-mixed-content {
        unicode-bidi: embed;
      }

      /* RTL toolbar adjustments */
      .blinko-rtl-content .toolbar {
        flex-direction: row-reverse;
      }

      /* RTL button alignment */
      .blinko-rtl-content .button-group {
        flex-direction: row-reverse;
      }

      /* RTL icons that should flip */
      .blinko-rtl-content .icon-arrow-left {
        transform: scaleX(-1);
      }

      .blinko-rtl-content .icon-arrow-right {
        transform: scaleX(-1);
      }

      /* Margin and padding adjustments */
      .blinko-rtl-content .note-item {
        padding-right: 1em;
        padding-left: 0.5em;
      }

      /* Animation support for direction changes */
      .blinko-direction-transition {
        transition: all 0.2s ease-in-out;
      }
    `, document.head.appendChild(i);
    }
    /**
     * Apply RTL styling to element
     */
    applyRTL(i, l) {
      this.config.forceDirection !== "auto" && (l = this.config.forceDirection === "rtl"), i.classList.remove("blinko-rtl-content", "blinko-ltr-content"), i.classList.add("blinko-direction-transition"), l ? (i.classList.add("blinko-rtl-content"), i.setAttribute("dir", "rtl")) : (i.classList.add("blinko-ltr-content"), i.setAttribute("dir", "ltr"));
    }
    /**
     * Start observing DOM for changes
     */
    startObserving() {
      this.observer || (this.observer = new MutationObserver((i) => {
        i.forEach((l) => {
          if (l.type === "childList")
            l.addedNodes.forEach((b) => {
              b.nodeType === Node.ELEMENT_NODE && this.debouncedProcessElement(b);
            });
          else if (l.type === "characterData") {
            const b = l.target.parentElement;
            b && this.debouncedProcessElement(b);
          }
        });
      }), this.observer.observe(document.body, {
        childList: !0,
        subtree: !0,
        characterData: !0
      }));
    }
    /**
     * Stop observing DOM changes
     */
    stopObserving() {
      this.observer && (this.observer.disconnect(), this.observer = null);
    }
    /**
     * Process element for RTL detection and styling
     */
    processElement(i) {
      if (!this.config.autoDetect) return;
      if (this.config.applyToSelectors.some(
        (b) => {
          var g, C;
          return ((g = i.matches) == null ? void 0 : g.call(i, b)) || ((C = i.querySelector) == null ? void 0 : C.call(i, b));
        }
      )) {
        const b = i.textContent || i.value || "";
        if (b) {
          const g = this.detector.detectRTL(b);
          this.applyRTL(i, g);
        }
      }
    }
    /**
     * Update styler configuration
     */
    updateConfig(i) {
      this.config = { ...this.config, ...i };
    }
    /**
     * Clean up styles and observers
     */
    destroy() {
      this.stopObserving();
      const i = document.getElementById("blinko-rtl-styles");
      i && i.remove();
    }
  }
  const Vt = {
    rtl_support: "RTL Support",
    auto_detect: "Auto Detect",
    manual_toggle: "Manual Toggle",
    rtl_enabled: "RTL Enabled",
    rtl_disabled: "RTL Disabled",
    settings: "Settings",
    detection_sensitivity: "Detection Sensitivity",
    high: "High",
    medium: "Medium",
    low: "Low",
    force_rtl: "Force RTL",
    force_ltr: "Force LTR",
    auto: "Auto",
    plugin_description: "This plugin automatically detects Hebrew and Arabic text and applies appropriate RTL styling."
  }, Ut = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Wt = {
    rtl_support: "תמיכה ב-RTL",
    auto_detect: "זיהוי אוטומטי",
    manual_toggle: "החלפה ידנית",
    rtl_enabled: "RTL מופעל",
    rtl_disabled: "RTL מכובה",
    settings: "הגדרות",
    detection_sensitivity: "רגישות זיהוי",
    high: "גבוהה",
    medium: "בינונית",
    low: "נמוכה",
    force_rtl: "אלץ RTL",
    force_ltr: "אלץ LTR",
    auto: "אוטומטי",
    plugin_description: "תוסף זה מזהה אוטומטית טקסט עברי וערבי ומחיל עליו עיצוב RTL מתאים."
  }, Yt = {
    rtl_support: "دعم RTL",
    auto_detect: "الكشف التلقائي",
    manual_toggle: "التبديل اليدوي",
    rtl_enabled: "RTL مفعل",
    rtl_disabled: "RTL معطل",
    settings: "الإعدادات",
    detection_sensitivity: "حساسية الكشف",
    high: "عالية",
    medium: "متوسطة",
    low: "منخفضة",
    force_rtl: "إجبار RTL",
    force_ltr: "إجبار LTR",
    auto: "تلقائي",
    plugin_description: "يكتشف هذا المكون الإضافي تلقائياً النص العربي والعبري ويطبق عليه تصميم RTL المناسب."
  };
  System.register(["react", "react-dom/client"], (f, i) => {
    i.import("react");
    const l = i.import("react-dom/client");
    return {
      execute: () => {
        const b = new Ft(), g = new zt(b);
        function C() {
          console.log("Initializing Blinko RTL Plugin...");
          const E = localStorage.getItem("blinko-rtl-settings");
          if (E)
            try {
              const d = JSON.parse(E);
              d.enabled !== !1 && (g.startObserving(), (d.sensitivity || d.minRTLChars) && b.updateConfig({
                sensitivity: d.sensitivity || "medium",
                minRTLChars: d.minRTLChars || 3
              }), g.updateConfig({
                autoDetect: d.autoDetect !== !1,
                forceDirection: d.forceDirection || "auto",
                applyToSelectors: d.customSelectors || [
                  ".note-content",
                  ".note-editor",
                  "textarea",
                  ".markdown-content",
                  ".note-text"
                ]
              }));
            } catch (d) {
              console.error("Failed to load RTL plugin settings:", d);
            }
          else
            g.startObserving();
          window.addEventListener("rtl-settings-changed", (d) => {
            const m = d.detail;
            m.enabled ? (g.startObserving(), b.updateConfig({
              sensitivity: m.sensitivity,
              minRTLChars: m.minRTLChars || 3
            }), g.updateConfig({
              autoDetect: m.autoDetect,
              forceDirection: m.forceDirection,
              applyToSelectors: m.customSelectors
            })) : g.stopObserving();
          }), window.blinkoRTL = {
            detector: b,
            styler: g,
            test: (d) => {
              const m = b.detectRTL(d);
              return console.log(`Text "${d}" is ${m ? "RTL" : "LTR"}`), m;
            }
          }, console.log("Blinko RTL Plugin initialized successfully");
        }
        f("default", class {
          constructor() {
            q(this, "withSettingPanel", !0);
            q(this, "renderSettingPanel", () => {
              const d = document.createElement("div");
              return l.createRoot(d).render(Ke.createElement(Mt)), d;
            });
            Object.assign(this, Nt);
          }
          async init() {
            this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", C) : C(), window.Blinko.addToolBarIcon({
              name: "rtl-support",
              icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
              placement: "top",
              tooltip: "RTL Support Settings",
              content: () => {
                const d = document.createElement("div");
                return l.createRoot(d).render(Ke.createElement(It, { detector: b, styler: g })), d;
              }
            });
          }
          initI18n() {
            window.Blinko.i18n.addResourceBundle("en", "translation", Vt), window.Blinko.i18n.addResourceBundle("zh", "translation", Ut), window.Blinko.i18n.addResourceBundle("he", "translation", Wt), window.Blinko.i18n.addResourceBundle("ar", "translation", Yt);
          }
          destroy() {
            g.destroy(), console.log("RTL Plugin destroyed");
          }
        });
      }
    };
  });
})();
