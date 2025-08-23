var nn = Object.defineProperty;
var on = (Se, se, E) => se in Se ? nn(Se, se, { enumerable: !0, configurable: !0, writable: !0, value: E }) : Se[se] = E;
var me = (Se, se, E) => on(Se, typeof se != "symbol" ? se + "" : se, E);
(function() {
  function Se(_) {
    return _ && _.__esModule && Object.prototype.hasOwnProperty.call(_, "default") ? _.default : _;
  }
  var se = { exports: {} }, E = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Ht;
  function Rr() {
    if (Ht) return E;
    Ht = 1;
    var _ = Symbol.for("react.element"), s = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), N = Symbol.for("react.provider"), M = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), V = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), x = Symbol.iterator;
    function W(n) {
      return n === null || typeof n != "object" ? null : (n = x && n[x] || n["@@iterator"], typeof n == "function" ? n : null);
    }
    var te = { isMounted: function() {
      return !1;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, pe = Object.assign, Ie = {};
    function ue(n, c, S) {
      this.props = n, this.context = c, this.refs = Ie, this.updater = S || te;
    }
    ue.prototype.isReactComponent = {}, ue.prototype.setState = function(n, c) {
      if (typeof n != "object" && typeof n != "function" && n != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, n, c, "setState");
    }, ue.prototype.forceUpdate = function(n) {
      this.updater.enqueueForceUpdate(this, n, "forceUpdate");
    };
    function ce() {
    }
    ce.prototype = ue.prototype;
    function q(n, c, S) {
      this.props = n, this.context = c, this.refs = Ie, this.updater = S || te;
    }
    var Re = q.prototype = new ce();
    Re.constructor = q, pe(Re, ue.prototype), Re.isPureReactComponent = !0;
    var le = Array.isArray, G = Object.prototype.hasOwnProperty, ne = { current: null }, ve = { key: !0, ref: !0, __self: !0, __source: !0 };
    function ye(n, c, S) {
      var j, O = {}, U = null, I = null;
      if (c != null) for (j in c.ref !== void 0 && (I = c.ref), c.key !== void 0 && (U = "" + c.key), c) G.call(c, j) && !ve.hasOwnProperty(j) && (O[j] = c[j]);
      var A = arguments.length - 2;
      if (A === 1) O.children = S;
      else if (1 < A) {
        for (var D = Array(A), J = 0; J < A; J++) D[J] = arguments[J + 2];
        O.children = D;
      }
      if (n && n.defaultProps) for (j in A = n.defaultProps, A) O[j] === void 0 && (O[j] = A[j]);
      return { $$typeof: _, type: n, key: U, ref: I, props: O, _owner: ne.current };
    }
    function Ce(n, c) {
      return { $$typeof: _, type: n.type, key: c, ref: n.ref, props: n.props, _owner: n._owner };
    }
    function je(n) {
      return typeof n == "object" && n !== null && n.$$typeof === _;
    }
    function Je(n) {
      var c = { "=": "=0", ":": "=2" };
      return "$" + n.replace(/[=:]/g, function(S) {
        return c[S];
      });
    }
    var ke = /\/+/g;
    function oe(n, c) {
      return typeof n == "object" && n !== null && n.key != null ? Je("" + n.key) : c.toString(36);
    }
    function ie(n, c, S, j, O) {
      var U = typeof n;
      (U === "undefined" || U === "boolean") && (n = null);
      var I = !1;
      if (n === null) I = !0;
      else switch (U) {
        case "string":
        case "number":
          I = !0;
          break;
        case "object":
          switch (n.$$typeof) {
            case _:
            case s:
              I = !0;
          }
      }
      if (I) return I = n, O = O(I), n = j === "" ? "." + oe(I, 0) : j, le(O) ? (S = "", n != null && (S = n.replace(ke, "$&/") + "/"), ie(O, c, S, "", function(J) {
        return J;
      })) : O != null && (je(O) && (O = Ce(O, S + (!O.key || I && I.key === O.key ? "" : ("" + O.key).replace(ke, "$&/") + "/") + n)), c.push(O)), 1;
      if (I = 0, j = j === "" ? "." : j + ":", le(n)) for (var A = 0; A < n.length; A++) {
        U = n[A];
        var D = j + oe(U, A);
        I += ie(U, c, S, D, O);
      }
      else if (D = W(n), typeof D == "function") for (n = D.call(n), A = 0; !(U = n.next()).done; ) U = U.value, D = j + oe(U, A++), I += ie(U, c, S, D, O);
      else if (U === "object") throw c = String(n), Error("Objects are not valid as a React child (found: " + (c === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : c) + "). If you meant to render a collection of children, use an array instead.");
      return I;
    }
    function Q(n, c, S) {
      if (n == null) return n;
      var j = [], O = 0;
      return ie(n, j, "", "", function(U) {
        return c.call(S, U, O++);
      }), j;
    }
    function fe(n) {
      if (n._status === -1) {
        var c = n._result;
        c = c(), c.then(function(S) {
          (n._status === 0 || n._status === -1) && (n._status = 1, n._result = S);
        }, function(S) {
          (n._status === 0 || n._status === -1) && (n._status = 2, n._result = S);
        }), n._status === -1 && (n._status = 0, n._result = c);
      }
      if (n._status === 1) return n._result.default;
      throw n._result;
    }
    var g = { current: null }, he = { transition: null }, Oe = { ReactCurrentDispatcher: g, ReactCurrentBatchConfig: he, ReactCurrentOwner: ne };
    function be() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    return E.Children = { map: Q, forEach: function(n, c, S) {
      Q(n, function() {
        c.apply(this, arguments);
      }, S);
    }, count: function(n) {
      var c = 0;
      return Q(n, function() {
        c++;
      }), c;
    }, toArray: function(n) {
      return Q(n, function(c) {
        return c;
      }) || [];
    }, only: function(n) {
      if (!je(n)) throw Error("React.Children.only expected to receive a single React element child.");
      return n;
    } }, E.Component = ue, E.Fragment = v, E.Profiler = w, E.PureComponent = q, E.StrictMode = b, E.Suspense = h, E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oe, E.act = be, E.cloneElement = function(n, c, S) {
      if (n == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + n + ".");
      var j = pe({}, n.props), O = n.key, U = n.ref, I = n._owner;
      if (c != null) {
        if (c.ref !== void 0 && (U = c.ref, I = ne.current), c.key !== void 0 && (O = "" + c.key), n.type && n.type.defaultProps) var A = n.type.defaultProps;
        for (D in c) G.call(c, D) && !ve.hasOwnProperty(D) && (j[D] = c[D] === void 0 && A !== void 0 ? A[D] : c[D]);
      }
      var D = arguments.length - 2;
      if (D === 1) j.children = S;
      else if (1 < D) {
        A = Array(D);
        for (var J = 0; J < D; J++) A[J] = arguments[J + 2];
        j.children = A;
      }
      return { $$typeof: _, type: n.type, key: O, ref: U, props: j, _owner: I };
    }, E.createContext = function(n) {
      return n = { $$typeof: M, _currentValue: n, _currentValue2: n, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, n.Provider = { $$typeof: N, _context: n }, n.Consumer = n;
    }, E.createElement = ye, E.createFactory = function(n) {
      var c = ye.bind(null, n);
      return c.type = n, c;
    }, E.createRef = function() {
      return { current: null };
    }, E.forwardRef = function(n) {
      return { $$typeof: y, render: n };
    }, E.isValidElement = je, E.lazy = function(n) {
      return { $$typeof: L, _payload: { _status: -1, _result: n }, _init: fe };
    }, E.memo = function(n, c) {
      return { $$typeof: V, type: n, compare: c === void 0 ? null : c };
    }, E.startTransition = function(n) {
      var c = he.transition;
      he.transition = {};
      try {
        n();
      } finally {
        he.transition = c;
      }
    }, E.unstable_act = be, E.useCallback = function(n, c) {
      return g.current.useCallback(n, c);
    }, E.useContext = function(n) {
      return g.current.useContext(n);
    }, E.useDebugValue = function() {
    }, E.useDeferredValue = function(n) {
      return g.current.useDeferredValue(n);
    }, E.useEffect = function(n, c) {
      return g.current.useEffect(n, c);
    }, E.useId = function() {
      return g.current.useId();
    }, E.useImperativeHandle = function(n, c, S) {
      return g.current.useImperativeHandle(n, c, S);
    }, E.useInsertionEffect = function(n, c) {
      return g.current.useInsertionEffect(n, c);
    }, E.useLayoutEffect = function(n, c) {
      return g.current.useLayoutEffect(n, c);
    }, E.useMemo = function(n, c) {
      return g.current.useMemo(n, c);
    }, E.useReducer = function(n, c, S) {
      return g.current.useReducer(n, c, S);
    }, E.useRef = function(n) {
      return g.current.useRef(n);
    }, E.useState = function(n) {
      return g.current.useState(n);
    }, E.useSyncExternalStore = function(n, c, S) {
      return g.current.useSyncExternalStore(n, c, S);
    }, E.useTransition = function() {
      return g.current.useTransition();
    }, E.version = "18.3.1", E;
  }
  var qe = { exports: {} };
  /**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  qe.exports;
  var qt;
  function Er() {
    return qt || (qt = 1, function(_, s) {
      process.env.NODE_ENV !== "production" && function() {
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        var v = "18.3.1", b = Symbol.for("react.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), V = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), pe = Symbol.for("react.lazy"), Ie = Symbol.for("react.offscreen"), ue = Symbol.iterator, ce = "@@iterator";
        function q(e) {
          if (e === null || typeof e != "object")
            return null;
          var t = ue && e[ue] || e[ce];
          return typeof t == "function" ? t : null;
        }
        var Re = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        }, le = {
          transition: null
        }, G = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: !1,
          didScheduleLegacyUpdate: !1
        }, ne = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        }, ve = {}, ye = null;
        function Ce(e) {
          ye = e;
        }
        ve.setExtraStackFrame = function(e) {
          ye = e;
        }, ve.getCurrentStack = null, ve.getStackAddendum = function() {
          var e = "";
          ye && (e += ye);
          var t = ve.getCurrentStack;
          return t && (e += t() || ""), e;
        };
        var je = !1, Je = !1, ke = !1, oe = !1, ie = !1, Q = {
          ReactCurrentDispatcher: Re,
          ReactCurrentBatchConfig: le,
          ReactCurrentOwner: ne
        };
        Q.ReactDebugCurrentFrame = ve, Q.ReactCurrentActQueue = G;
        function fe(e) {
          {
            for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
              o[i - 1] = arguments[i];
            he("warn", e, o);
          }
        }
        function g(e) {
          {
            for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
              o[i - 1] = arguments[i];
            he("error", e, o);
          }
        }
        function he(e, t, o) {
          {
            var i = Q.ReactDebugCurrentFrame, l = i.getStackAddendum();
            l !== "" && (t += "%s", o = o.concat([l]));
            var m = o.map(function(p) {
              return String(p);
            });
            m.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, m);
          }
        }
        var Oe = {};
        function be(e, t) {
          {
            var o = e.constructor, i = o && (o.displayName || o.name) || "ReactClass", l = i + "." + t;
            if (Oe[l])
              return;
            g("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, i), Oe[l] = !0;
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
          enqueueForceUpdate: function(e, t, o) {
            be(e, "forceUpdate");
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
          enqueueReplaceState: function(e, t, o, i) {
            be(e, "replaceState");
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
          enqueueSetState: function(e, t, o, i) {
            be(e, "setState");
          }
        }, c = Object.assign, S = {};
        Object.freeze(S);
        function j(e, t, o) {
          this.props = e, this.context = t, this.refs = S, this.updater = o || n;
        }
        j.prototype.isReactComponent = {}, j.prototype.setState = function(e, t) {
          if (typeof e != "object" && typeof e != "function" && e != null)
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          this.updater.enqueueSetState(this, e, t, "setState");
        }, j.prototype.forceUpdate = function(e) {
          this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        };
        {
          var O = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          }, U = function(e, t) {
            Object.defineProperty(j.prototype, e, {
              get: function() {
                fe("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
              }
            });
          };
          for (var I in O)
            O.hasOwnProperty(I) && U(I, O[I]);
        }
        function A() {
        }
        A.prototype = j.prototype;
        function D(e, t, o) {
          this.props = e, this.context = t, this.refs = S, this.updater = o || n;
        }
        var J = D.prototype = new A();
        J.constructor = D, c(J, j.prototype), J.isPureReactComponent = !0;
        function xt() {
          var e = {
            current: null
          };
          return Object.seal(e), e;
        }
        var it = Array.isArray;
        function Fe(e) {
          return it(e);
        }
        function wt(e) {
          {
            var t = typeof Symbol == "function" && Symbol.toStringTag, o = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
            return o;
          }
        }
        function Me(e) {
          try {
            return Ee(e), !1;
          } catch {
            return !0;
          }
        }
        function Ee(e) {
          return "" + e;
        }
        function Pe(e) {
          if (Me(e))
            return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", wt(e)), Ee(e);
        }
        function at(e, t, o) {
          var i = e.displayName;
          if (i)
            return i;
          var l = t.displayName || t.name || "";
          return l !== "" ? o + "(" + l + ")" : o;
        }
        function Le(e) {
          return e.displayName || "Context";
        }
        function ge(e) {
          if (e == null)
            return null;
          if (typeof e.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
            return e.displayName || e.name || null;
          if (typeof e == "string")
            return e;
          switch (e) {
            case N:
              return "Fragment";
            case w:
              return "Portal";
            case y:
              return "Profiler";
            case M:
              return "StrictMode";
            case x:
              return "Suspense";
            case W:
              return "SuspenseList";
          }
          if (typeof e == "object")
            switch (e.$$typeof) {
              case V:
                var t = e;
                return Le(t) + ".Consumer";
              case h:
                var o = e;
                return Le(o._context) + ".Provider";
              case L:
                return at(e, e.render, "ForwardRef");
              case te:
                var i = e.displayName || null;
                return i !== null ? i : ge(e.type) || "Memo";
              case pe: {
                var l = e, m = l._payload, p = l._init;
                try {
                  return ge(p(m));
                } catch {
                  return null;
                }
              }
            }
          return null;
        }
        var De = Object.prototype.hasOwnProperty, Ve = {
          key: !0,
          ref: !0,
          __self: !0,
          __source: !0
        }, st, ut, Ue;
        Ue = {};
        function Xe(e) {
          if (De.call(e, "ref")) {
            var t = Object.getOwnPropertyDescriptor(e, "ref").get;
            if (t && t.isReactWarning)
              return !1;
          }
          return e.ref !== void 0;
        }
        function Qe(e) {
          if (De.call(e, "key")) {
            var t = Object.getOwnPropertyDescriptor(e, "key").get;
            if (t && t.isReactWarning)
              return !1;
          }
          return e.key !== void 0;
        }
        function Tt(e, t) {
          var o = function() {
            st || (st = !0, g("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
          };
          o.isReactWarning = !0, Object.defineProperty(e, "key", {
            get: o,
            configurable: !0
          });
        }
        function ct(e, t) {
          var o = function() {
            ut || (ut = !0, g("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
          };
          o.isReactWarning = !0, Object.defineProperty(e, "ref", {
            get: o,
            configurable: !0
          });
        }
        function lt(e) {
          if (typeof e.ref == "string" && ne.current && e.__self && ne.current.stateNode !== e.__self) {
            var t = ge(ne.current.type);
            Ue[t] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', t, e.ref), Ue[t] = !0);
          }
        }
        var Ze = function(e, t, o, i, l, m, p) {
          var R = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: b,
            // Built-in properties that belong on the element
            type: e,
            key: t,
            ref: o,
            props: p,
            // Record the component responsible for creating this element.
            _owner: m
          };
          return R._store = {}, Object.defineProperty(R._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: !1
          }), Object.defineProperty(R, "_self", {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: i
          }), Object.defineProperty(R, "_source", {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: l
          }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
        };
        function St(e, t, o) {
          var i, l = {}, m = null, p = null, R = null, k = null;
          if (t != null) {
            Xe(t) && (p = t.ref, lt(t)), Qe(t) && (Pe(t.key), m = "" + t.key), R = t.__self === void 0 ? null : t.__self, k = t.__source === void 0 ? null : t.__source;
            for (i in t)
              De.call(t, i) && !Ve.hasOwnProperty(i) && (l[i] = t[i]);
          }
          var F = arguments.length - 2;
          if (F === 1)
            l.children = o;
          else if (F > 1) {
            for (var B = Array(F), Y = 0; Y < F; Y++)
              B[Y] = arguments[Y + 2];
            Object.freeze && Object.freeze(B), l.children = B;
          }
          if (e && e.defaultProps) {
            var H = e.defaultProps;
            for (i in H)
              l[i] === void 0 && (l[i] = H[i]);
          }
          if (m || p) {
            var X = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
            m && Tt(l, X), p && ct(l, X);
          }
          return Ze(e, m, p, R, k, ne.current, l);
        }
        function Ct(e, t) {
          var o = Ze(e.type, t, e.ref, e._self, e._source, e._owner, e.props);
          return o;
        }
        function jt(e, t, o) {
          if (e == null)
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
          var i, l = c({}, e.props), m = e.key, p = e.ref, R = e._self, k = e._source, F = e._owner;
          if (t != null) {
            Xe(t) && (p = t.ref, F = ne.current), Qe(t) && (Pe(t.key), m = "" + t.key);
            var B;
            e.type && e.type.defaultProps && (B = e.type.defaultProps);
            for (i in t)
              De.call(t, i) && !Ve.hasOwnProperty(i) && (t[i] === void 0 && B !== void 0 ? l[i] = B[i] : l[i] = t[i]);
          }
          var Y = arguments.length - 2;
          if (Y === 1)
            l.children = o;
          else if (Y > 1) {
            for (var H = Array(Y), X = 0; X < Y; X++)
              H[X] = arguments[X + 2];
            l.children = H;
          }
          return Ze(e.type, m, p, R, k, F, l);
        }
        function xe(e) {
          return typeof e == "object" && e !== null && e.$$typeof === b;
        }
        var ft = ".", kt = ":";
        function et(e) {
          var t = /[=:]/g, o = {
            "=": "=0",
            ":": "=2"
          }, i = e.replace(t, function(l) {
            return o[l];
          });
          return "$" + i;
        }
        var tt = !1, we = /\/+/g;
        function We(e) {
          return e.replace(we, "$&/");
        }
        function $e(e, t) {
          return typeof e == "object" && e !== null && e.key != null ? (Pe(e.key), et("" + e.key)) : t.toString(36);
        }
        function Ae(e, t, o, i, l) {
          var m = typeof e;
          (m === "undefined" || m === "boolean") && (e = null);
          var p = !1;
          if (e === null)
            p = !0;
          else
            switch (m) {
              case "string":
              case "number":
                p = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case b:
                  case w:
                    p = !0;
                }
            }
          if (p) {
            var R = e, k = l(R), F = i === "" ? ft + $e(R, 0) : i;
            if (Fe(k)) {
              var B = "";
              F != null && (B = We(F) + "/"), Ae(k, t, B, "", function(rn) {
                return rn;
              });
            } else k != null && (xe(k) && (k.key && (!R || R.key !== k.key) && Pe(k.key), k = Ct(
              k,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              o + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (k.key && (!R || R.key !== k.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                We("" + k.key) + "/"
              ) : "") + F
            )), t.push(k));
            return 1;
          }
          var Y, H, X = 0, ee = i === "" ? ft : i + kt;
          if (Fe(e))
            for (var Rt = 0; Rt < e.length; Rt++)
              Y = e[Rt], H = ee + $e(Y, Rt), X += Ae(Y, t, o, H, l);
          else {
            var zt = q(e);
            if (typeof zt == "function") {
              var yr = e;
              zt === yr.entries && (tt || fe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), tt = !0);
              for (var en = zt.call(yr), br, tn = 0; !(br = en.next()).done; )
                Y = br.value, H = ee + $e(Y, tn++), X += Ae(Y, t, o, H, l);
            } else if (m === "object") {
              var _r = String(e);
              throw new Error("Objects are not valid as a React child (found: " + (_r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : _r) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return X;
        }
        function Be(e, t, o) {
          if (e == null)
            return e;
          var i = [], l = 0;
          return Ae(e, i, "", "", function(m) {
            return t.call(o, m, l++);
          }), i;
        }
        function dt(e) {
          var t = 0;
          return Be(e, function() {
            t++;
          }), t;
        }
        function Ot(e, t, o) {
          Be(e, function() {
            t.apply(this, arguments);
          }, o);
        }
        function pt(e) {
          return Be(e, function(t) {
            return t;
          }) || [];
        }
        function vt(e) {
          if (!xe(e))
            throw new Error("React.Children.only expected to receive a single React element child.");
          return e;
        }
        function Pt(e) {
          var t = {
            $$typeof: V,
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
            $$typeof: h,
            _context: t
          };
          var o = !1, i = !1, l = !1;
          {
            var m = {
              $$typeof: V,
              _context: t
            };
            Object.defineProperties(m, {
              Provider: {
                get: function() {
                  return i || (i = !0, g("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), t.Provider;
                },
                set: function(p) {
                  t.Provider = p;
                }
              },
              _currentValue: {
                get: function() {
                  return t._currentValue;
                },
                set: function(p) {
                  t._currentValue = p;
                }
              },
              _currentValue2: {
                get: function() {
                  return t._currentValue2;
                },
                set: function(p) {
                  t._currentValue2 = p;
                }
              },
              _threadCount: {
                get: function() {
                  return t._threadCount;
                },
                set: function(p) {
                  t._threadCount = p;
                }
              },
              Consumer: {
                get: function() {
                  return o || (o = !0, g("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), t.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return t.displayName;
                },
                set: function(p) {
                  l || (fe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", p), l = !0);
                }
              }
            }), t.Consumer = m;
          }
          return t._currentRenderer = null, t._currentRenderer2 = null, t;
        }
        var Ne = -1, Ye = 0, rt = 1, Lt = 2;
        function Dt(e) {
          if (e._status === Ne) {
            var t = e._result, o = t();
            if (o.then(function(m) {
              if (e._status === Ye || e._status === Ne) {
                var p = e;
                p._status = rt, p._result = m;
              }
            }, function(m) {
              if (e._status === Ye || e._status === Ne) {
                var p = e;
                p._status = Lt, p._result = m;
              }
            }), e._status === Ne) {
              var i = e;
              i._status = Ye, i._result = o;
            }
          }
          if (e._status === rt) {
            var l = e._result;
            return l === void 0 && g(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like:
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, l), "default" in l || g(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like:
  const MyComponent = lazy(() => import('./MyComponent'))`, l), l.default;
          } else
            throw e._result;
        }
        function $t(e) {
          var t = {
            // We use these fields to store the result.
            _status: Ne,
            _result: e
          }, o = {
            $$typeof: pe,
            _payload: t,
            _init: Dt
          };
          {
            var i, l;
            Object.defineProperties(o, {
              defaultProps: {
                configurable: !0,
                get: function() {
                  return i;
                },
                set: function(m) {
                  g("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), i = m, Object.defineProperty(o, "defaultProps", {
                    enumerable: !0
                  });
                }
              },
              propTypes: {
                configurable: !0,
                get: function() {
                  return l;
                },
                set: function(m) {
                  g("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), l = m, Object.defineProperty(o, "propTypes", {
                    enumerable: !0
                  });
                }
              }
            });
          }
          return o;
        }
        function At(e) {
          e != null && e.$$typeof === te ? g("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? g("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && g("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && g("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
          var t = {
            $$typeof: L,
            render: e
          };
          {
            var o;
            Object.defineProperty(t, "displayName", {
              enumerable: !1,
              configurable: !0,
              get: function() {
                return o;
              },
              set: function(i) {
                o = i, !e.name && !e.displayName && (e.displayName = i);
              }
            });
          }
          return t;
        }
        var r;
        r = Symbol.for("react.module.reference");
        function u(e) {
          return !!(typeof e == "string" || typeof e == "function" || e === N || e === y || ie || e === M || e === x || e === W || oe || e === Ie || je || Je || ke || typeof e == "object" && e !== null && (e.$$typeof === pe || e.$$typeof === te || e.$$typeof === h || e.$$typeof === V || e.$$typeof === L || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          e.$$typeof === r || e.getModuleId !== void 0));
        }
        function f(e, t) {
          u(e) || g("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
          var o = {
            $$typeof: te,
            type: e,
            compare: t === void 0 ? null : t
          };
          {
            var i;
            Object.defineProperty(o, "displayName", {
              enumerable: !1,
              configurable: !0,
              get: function() {
                return i;
              },
              set: function(l) {
                i = l, !e.name && !e.displayName && (e.displayName = l);
              }
            });
          }
          return o;
        }
        function d() {
          var e = Re.current;
          return e === null && g(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
        }
        function P(e) {
          var t = d();
          if (e._context !== void 0) {
            var o = e._context;
            o.Consumer === e ? g("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : o.Provider === e && g("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
          }
          return t.useContext(e);
        }
        function $(e) {
          var t = d();
          return t.useState(e);
        }
        function C(e, t, o) {
          var i = d();
          return i.useReducer(e, t, o);
        }
        function T(e) {
          var t = d();
          return t.useRef(e);
        }
        function Z(e, t) {
          var o = d();
          return o.useEffect(e, t);
        }
        function z(e, t) {
          var o = d();
          return o.useInsertionEffect(e, t);
        }
        function K(e, t) {
          var o = d();
          return o.useLayoutEffect(e, t);
        }
        function ae(e, t) {
          var o = d();
          return o.useCallback(e, t);
        }
        function Te(e, t) {
          var o = d();
          return o.useMemo(e, t);
        }
        function _e(e, t, o) {
          var i = d();
          return i.useImperativeHandle(e, t, o);
        }
        function re(e, t) {
          {
            var o = d();
            return o.useDebugValue(e, t);
          }
        }
        function nt() {
          var e = d();
          return e.useTransition();
        }
        function Nt(e) {
          var t = d();
          return t.useDeferredValue(e);
        }
        function It() {
          var e = d();
          return e.useId();
        }
        function Ar(e, t, o) {
          var i = d();
          return i.useSyncExternalStore(e, t, o);
        }
        var ot = 0, Xt, Qt, Zt, er, tr, rr, nr;
        function or() {
        }
        or.__reactDisabledLog = !0;
        function Nr() {
          {
            if (ot === 0) {
              Xt = console.log, Qt = console.info, Zt = console.warn, er = console.error, tr = console.group, rr = console.groupCollapsed, nr = console.groupEnd;
              var e = {
                configurable: !0,
                enumerable: !0,
                value: or,
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
            ot++;
          }
        }
        function Ir() {
          {
            if (ot--, ot === 0) {
              var e = {
                configurable: !0,
                enumerable: !0,
                writable: !0
              };
              Object.defineProperties(console, {
                log: c({}, e, {
                  value: Xt
                }),
                info: c({}, e, {
                  value: Qt
                }),
                warn: c({}, e, {
                  value: Zt
                }),
                error: c({}, e, {
                  value: er
                }),
                group: c({}, e, {
                  value: tr
                }),
                groupCollapsed: c({}, e, {
                  value: rr
                }),
                groupEnd: c({}, e, {
                  value: nr
                })
              });
            }
            ot < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
        var Ft = Q.ReactCurrentDispatcher, Mt;
        function ht(e, t, o) {
          {
            if (Mt === void 0)
              try {
                throw Error();
              } catch (l) {
                var i = l.stack.trim().match(/\n( *(at )?)/);
                Mt = i && i[1] || "";
              }
            return `
` + Mt + e;
          }
        }
        var Vt = !1, gt;
        {
          var Fr = typeof WeakMap == "function" ? WeakMap : Map;
          gt = new Fr();
        }
        function ir(e, t) {
          if (!e || Vt)
            return "";
          {
            var o = gt.get(e);
            if (o !== void 0)
              return o;
          }
          var i;
          Vt = !0;
          var l = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var m;
          m = Ft.current, Ft.current = null, Nr();
          try {
            if (t) {
              var p = function() {
                throw Error();
              };
              if (Object.defineProperty(p.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(p, []);
                } catch (ee) {
                  i = ee;
                }
                Reflect.construct(e, [], p);
              } else {
                try {
                  p.call();
                } catch (ee) {
                  i = ee;
                }
                e.call(p.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ee) {
                i = ee;
              }
              e();
            }
          } catch (ee) {
            if (ee && i && typeof ee.stack == "string") {
              for (var R = ee.stack.split(`
`), k = i.stack.split(`
`), F = R.length - 1, B = k.length - 1; F >= 1 && B >= 0 && R[F] !== k[B]; )
                B--;
              for (; F >= 1 && B >= 0; F--, B--)
                if (R[F] !== k[B]) {
                  if (F !== 1 || B !== 1)
                    do
                      if (F--, B--, B < 0 || R[F] !== k[B]) {
                        var Y = `
` + R[F].replace(" at new ", " at ");
                        return e.displayName && Y.includes("<anonymous>") && (Y = Y.replace("<anonymous>", e.displayName)), typeof e == "function" && gt.set(e, Y), Y;
                      }
                    while (F >= 1 && B >= 0);
                  break;
                }
            }
          } finally {
            Vt = !1, Ft.current = m, Ir(), Error.prepareStackTrace = l;
          }
          var H = e ? e.displayName || e.name : "", X = H ? ht(H) : "";
          return typeof e == "function" && gt.set(e, X), X;
        }
        function Mr(e, t, o) {
          return ir(e, !1);
        }
        function Vr(e) {
          var t = e.prototype;
          return !!(t && t.isReactComponent);
        }
        function mt(e, t, o) {
          if (e == null)
            return "";
          if (typeof e == "function")
            return ir(e, Vr(e));
          if (typeof e == "string")
            return ht(e);
          switch (e) {
            case x:
              return ht("Suspense");
            case W:
              return ht("SuspenseList");
          }
          if (typeof e == "object")
            switch (e.$$typeof) {
              case L:
                return Mr(e.render);
              case te:
                return mt(e.type, t, o);
              case pe: {
                var i = e, l = i._payload, m = i._init;
                try {
                  return mt(m(l), t, o);
                } catch {
                }
              }
            }
          return "";
        }
        var ar = {}, sr = Q.ReactDebugCurrentFrame;
        function yt(e) {
          if (e) {
            var t = e._owner, o = mt(e.type, e._source, t ? t.type : null);
            sr.setExtraStackFrame(o);
          } else
            sr.setExtraStackFrame(null);
        }
        function Ur(e, t, o, i, l) {
          {
            var m = Function.call.bind(De);
            for (var p in e)
              if (m(e, p)) {
                var R = void 0;
                try {
                  if (typeof e[p] != "function") {
                    var k = Error((i || "React class") + ": " + o + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    throw k.name = "Invariant Violation", k;
                  }
                  R = e[p](t, p, i, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (F) {
                  R = F;
                }
                R && !(R instanceof Error) && (yt(l), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", o, p, typeof R), yt(null)), R instanceof Error && !(R.message in ar) && (ar[R.message] = !0, yt(l), g("Failed %s type: %s", o, R.message), yt(null));
              }
          }
        }
        function ze(e) {
          if (e) {
            var t = e._owner, o = mt(e.type, e._source, t ? t.type : null);
            Ce(o);
          } else
            Ce(null);
        }
        var Ut;
        Ut = !1;
        function ur() {
          if (ne.current) {
            var e = ge(ne.current.type);
            if (e)
              return `

Check the render method of \`` + e + "`.";
          }
          return "";
        }
        function Wr(e) {
          if (e !== void 0) {
            var t = e.fileName.replace(/^.*[\\\/]/, ""), o = e.lineNumber;
            return `

Check your code at ` + t + ":" + o + ".";
          }
          return "";
        }
        function Br(e) {
          return e != null ? Wr(e.__source) : "";
        }
        var cr = {};
        function Yr(e) {
          var t = ur();
          if (!t) {
            var o = typeof e == "string" ? e : e.displayName || e.name;
            o && (t = `

Check the top-level render call using <` + o + ">.");
          }
          return t;
        }
        function lr(e, t) {
          if (!(!e._store || e._store.validated || e.key != null)) {
            e._store.validated = !0;
            var o = Yr(t);
            if (!cr[o]) {
              cr[o] = !0;
              var i = "";
              e && e._owner && e._owner !== ne.current && (i = " It was passed a child from " + ge(e._owner.type) + "."), ze(e), g('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', o, i), ze(null);
            }
          }
        }
        function fr(e, t) {
          if (typeof e == "object") {
            if (Fe(e))
              for (var o = 0; o < e.length; o++) {
                var i = e[o];
                xe(i) && lr(i, t);
              }
            else if (xe(e))
              e._store && (e._store.validated = !0);
            else if (e) {
              var l = q(e);
              if (typeof l == "function" && l !== e.entries)
                for (var m = l.call(e), p; !(p = m.next()).done; )
                  xe(p.value) && lr(p.value, t);
            }
          }
        }
        function dr(e) {
          {
            var t = e.type;
            if (t == null || typeof t == "string")
              return;
            var o;
            if (typeof t == "function")
              o = t.propTypes;
            else if (typeof t == "object" && (t.$$typeof === L || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            t.$$typeof === te))
              o = t.propTypes;
            else
              return;
            if (o) {
              var i = ge(t);
              Ur(o, e.props, "prop", i, e);
            } else if (t.PropTypes !== void 0 && !Ut) {
              Ut = !0;
              var l = ge(t);
              g("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", l || "Unknown");
            }
            typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && g("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
        function zr(e) {
          {
            for (var t = Object.keys(e.props), o = 0; o < t.length; o++) {
              var i = t[o];
              if (i !== "children" && i !== "key") {
                ze(e), g("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", i), ze(null);
                break;
              }
            }
            e.ref !== null && (ze(e), g("Invalid attribute `ref` supplied to `React.Fragment`."), ze(null));
          }
        }
        function pr(e, t, o) {
          var i = u(e);
          if (!i) {
            var l = "";
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var m = Br(t);
            m ? l += m : l += ur();
            var p;
            e === null ? p = "null" : Fe(e) ? p = "array" : e !== void 0 && e.$$typeof === b ? (p = "<" + (ge(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : p = typeof e, g("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, l);
          }
          var R = St.apply(this, arguments);
          if (R == null)
            return R;
          if (i)
            for (var k = 2; k < arguments.length; k++)
              fr(arguments[k], e);
          return e === N ? zr(R) : dr(R), R;
        }
        var vr = !1;
        function Hr(e) {
          var t = pr.bind(null, e);
          return t.type = e, vr || (vr = !0, fe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(t, "type", {
            enumerable: !1,
            get: function() {
              return fe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
                value: e
              }), e;
            }
          }), t;
        }
        function qr(e, t, o) {
          for (var i = jt.apply(this, arguments), l = 2; l < arguments.length; l++)
            fr(arguments[l], i.type);
          return dr(i), i;
        }
        function Kr(e, t) {
          var o = le.transition;
          le.transition = {};
          var i = le.transition;
          le.transition._updatedFibers = /* @__PURE__ */ new Set();
          try {
            e();
          } finally {
            if (le.transition = o, o === null && i._updatedFibers) {
              var l = i._updatedFibers.size;
              l > 10 && fe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
            }
          }
        }
        var hr = !1, bt = null;
        function Gr(e) {
          if (bt === null)
            try {
              var t = ("require" + Math.random()).slice(0, 7), o = _ && _[t];
              bt = o.call(_, "timers").setImmediate;
            } catch {
              bt = function(l) {
                hr === !1 && (hr = !0, typeof MessageChannel > "u" && g("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
                var m = new MessageChannel();
                m.port1.onmessage = l, m.port2.postMessage(void 0);
              };
            }
          return bt(e);
        }
        var He = 0, gr = !1;
        function mr(e) {
          {
            var t = He;
            He++, G.current === null && (G.current = []);
            var o = G.isBatchingLegacy, i;
            try {
              if (G.isBatchingLegacy = !0, i = e(), !o && G.didScheduleLegacyUpdate) {
                var l = G.current;
                l !== null && (G.didScheduleLegacyUpdate = !1, Yt(l));
              }
            } catch (H) {
              throw _t(t), H;
            } finally {
              G.isBatchingLegacy = o;
            }
            if (i !== null && typeof i == "object" && typeof i.then == "function") {
              var m = i, p = !1, R = {
                then: function(H, X) {
                  p = !0, m.then(function(ee) {
                    _t(t), He === 0 ? Wt(ee, H, X) : H(ee);
                  }, function(ee) {
                    _t(t), X(ee);
                  });
                }
              };
              return !gr && typeof Promise < "u" && Promise.resolve().then(function() {
              }).then(function() {
                p || (gr = !0, g("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
              }), R;
            } else {
              var k = i;
              if (_t(t), He === 0) {
                var F = G.current;
                F !== null && (Yt(F), G.current = null);
                var B = {
                  then: function(H, X) {
                    G.current === null ? (G.current = [], Wt(k, H, X)) : H(k);
                  }
                };
                return B;
              } else {
                var Y = {
                  then: function(H, X) {
                    H(k);
                  }
                };
                return Y;
              }
            }
          }
        }
        function _t(e) {
          e !== He - 1 && g("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), He = e;
        }
        function Wt(e, t, o) {
          {
            var i = G.current;
            if (i !== null)
              try {
                Yt(i), Gr(function() {
                  i.length === 0 ? (G.current = null, t(e)) : Wt(e, t, o);
                });
              } catch (l) {
                o(l);
              }
            else
              t(e);
          }
        }
        var Bt = !1;
        function Yt(e) {
          if (!Bt) {
            Bt = !0;
            var t = 0;
            try {
              for (; t < e.length; t++) {
                var o = e[t];
                do
                  o = o(!0);
                while (o !== null);
              }
              e.length = 0;
            } catch (i) {
              throw e = e.slice(t + 1), i;
            } finally {
              Bt = !1;
            }
          }
        }
        var Jr = pr, Xr = qr, Qr = Hr, Zr = {
          map: Be,
          forEach: Ot,
          count: dt,
          toArray: pt,
          only: vt
        };
        s.Children = Zr, s.Component = j, s.Fragment = N, s.Profiler = y, s.PureComponent = D, s.StrictMode = M, s.Suspense = x, s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q, s.act = mr, s.cloneElement = Xr, s.createContext = Pt, s.createElement = Jr, s.createFactory = Qr, s.createRef = xt, s.forwardRef = At, s.isValidElement = xe, s.lazy = $t, s.memo = f, s.startTransition = Kr, s.unstable_act = mr, s.useCallback = ae, s.useContext = P, s.useDebugValue = re, s.useDeferredValue = Nt, s.useEffect = Z, s.useId = It, s.useImperativeHandle = _e, s.useInsertionEffect = z, s.useLayoutEffect = K, s.useMemo = Te, s.useReducer = C, s.useRef = T, s.useState = $, s.useSyncExternalStore = Ar, s.useTransition = nt, s.version = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
      }();
    }(qe, qe.exports)), qe.exports;
  }
  process.env.NODE_ENV === "production" ? se.exports = Rr() : se.exports = Er();
  var de = se.exports;
  const Kt = /* @__PURE__ */ Se(de), xr = {
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
  var Et = { exports: {} }, Ke = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Gt;
  function wr() {
    if (Gt) return Ke;
    Gt = 1;
    var _ = de, s = Symbol.for("react.element"), v = Symbol.for("react.fragment"), b = Object.prototype.hasOwnProperty, w = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, N = { key: !0, ref: !0, __self: !0, __source: !0 };
    function M(y, h, V) {
      var L, x = {}, W = null, te = null;
      V !== void 0 && (W = "" + V), h.key !== void 0 && (W = "" + h.key), h.ref !== void 0 && (te = h.ref);
      for (L in h) b.call(h, L) && !N.hasOwnProperty(L) && (x[L] = h[L]);
      if (y && y.defaultProps) for (L in h = y.defaultProps, h) x[L] === void 0 && (x[L] = h[L]);
      return { $$typeof: s, type: y, key: W, ref: te, props: x, _owner: w.current };
    }
    return Ke.Fragment = v, Ke.jsx = M, Ke.jsxs = M, Ke;
  }
  var Ge = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Jt;
  function Tr() {
    return Jt || (Jt = 1, process.env.NODE_ENV !== "production" && function() {
      var _ = de, s = Symbol.for("react.element"), v = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), M = Symbol.for("react.provider"), y = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), te = Symbol.for("react.offscreen"), pe = Symbol.iterator, Ie = "@@iterator";
      function ue(r) {
        if (r === null || typeof r != "object")
          return null;
        var u = pe && r[pe] || r[Ie];
        return typeof u == "function" ? u : null;
      }
      var ce = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function q(r) {
        {
          for (var u = arguments.length, f = new Array(u > 1 ? u - 1 : 0), d = 1; d < u; d++)
            f[d - 1] = arguments[d];
          Re("error", r, f);
        }
      }
      function Re(r, u, f) {
        {
          var d = ce.ReactDebugCurrentFrame, P = d.getStackAddendum();
          P !== "" && (u += "%s", f = f.concat([P]));
          var $ = f.map(function(C) {
            return String(C);
          });
          $.unshift("Warning: " + u), Function.prototype.apply.call(console[r], console, $);
        }
      }
      var le = !1, G = !1, ne = !1, ve = !1, ye = !1, Ce;
      Ce = Symbol.for("react.module.reference");
      function je(r) {
        return !!(typeof r == "string" || typeof r == "function" || r === b || r === N || ye || r === w || r === V || r === L || ve || r === te || le || G || ne || typeof r == "object" && r !== null && (r.$$typeof === W || r.$$typeof === x || r.$$typeof === M || r.$$typeof === y || r.$$typeof === h || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        r.$$typeof === Ce || r.getModuleId !== void 0));
      }
      function Je(r, u, f) {
        var d = r.displayName;
        if (d)
          return d;
        var P = u.displayName || u.name || "";
        return P !== "" ? f + "(" + P + ")" : f;
      }
      function ke(r) {
        return r.displayName || "Context";
      }
      function oe(r) {
        if (r == null)
          return null;
        if (typeof r.tag == "number" && q("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
          return r.displayName || r.name || null;
        if (typeof r == "string")
          return r;
        switch (r) {
          case b:
            return "Fragment";
          case v:
            return "Portal";
          case N:
            return "Profiler";
          case w:
            return "StrictMode";
          case V:
            return "Suspense";
          case L:
            return "SuspenseList";
        }
        if (typeof r == "object")
          switch (r.$$typeof) {
            case y:
              var u = r;
              return ke(u) + ".Consumer";
            case M:
              var f = r;
              return ke(f._context) + ".Provider";
            case h:
              return Je(r, r.render, "ForwardRef");
            case x:
              var d = r.displayName || null;
              return d !== null ? d : oe(r.type) || "Memo";
            case W: {
              var P = r, $ = P._payload, C = P._init;
              try {
                return oe(C($));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var ie = Object.assign, Q = 0, fe, g, he, Oe, be, n, c;
      function S() {
      }
      S.__reactDisabledLog = !0;
      function j() {
        {
          if (Q === 0) {
            fe = console.log, g = console.info, he = console.warn, Oe = console.error, be = console.group, n = console.groupCollapsed, c = console.groupEnd;
            var r = {
              configurable: !0,
              enumerable: !0,
              value: S,
              writable: !0
            };
            Object.defineProperties(console, {
              info: r,
              log: r,
              warn: r,
              error: r,
              group: r,
              groupCollapsed: r,
              groupEnd: r
            });
          }
          Q++;
        }
      }
      function O() {
        {
          if (Q--, Q === 0) {
            var r = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: ie({}, r, {
                value: fe
              }),
              info: ie({}, r, {
                value: g
              }),
              warn: ie({}, r, {
                value: he
              }),
              error: ie({}, r, {
                value: Oe
              }),
              group: ie({}, r, {
                value: be
              }),
              groupCollapsed: ie({}, r, {
                value: n
              }),
              groupEnd: ie({}, r, {
                value: c
              })
            });
          }
          Q < 0 && q("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var U = ce.ReactCurrentDispatcher, I;
      function A(r, u, f) {
        {
          if (I === void 0)
            try {
              throw Error();
            } catch (P) {
              var d = P.stack.trim().match(/\n( *(at )?)/);
              I = d && d[1] || "";
            }
          return `
` + I + r;
        }
      }
      var D = !1, J;
      {
        var xt = typeof WeakMap == "function" ? WeakMap : Map;
        J = new xt();
      }
      function it(r, u) {
        if (!r || D)
          return "";
        {
          var f = J.get(r);
          if (f !== void 0)
            return f;
        }
        var d;
        D = !0;
        var P = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var $;
        $ = U.current, U.current = null, j();
        try {
          if (u) {
            var C = function() {
              throw Error();
            };
            if (Object.defineProperty(C.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(C, []);
              } catch (re) {
                d = re;
              }
              Reflect.construct(r, [], C);
            } else {
              try {
                C.call();
              } catch (re) {
                d = re;
              }
              r.call(C.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (re) {
              d = re;
            }
            r();
          }
        } catch (re) {
          if (re && d && typeof re.stack == "string") {
            for (var T = re.stack.split(`
`), Z = d.stack.split(`
`), z = T.length - 1, K = Z.length - 1; z >= 1 && K >= 0 && T[z] !== Z[K]; )
              K--;
            for (; z >= 1 && K >= 0; z--, K--)
              if (T[z] !== Z[K]) {
                if (z !== 1 || K !== 1)
                  do
                    if (z--, K--, K < 0 || T[z] !== Z[K]) {
                      var ae = `
` + T[z].replace(" at new ", " at ");
                      return r.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", r.displayName)), typeof r == "function" && J.set(r, ae), ae;
                    }
                  while (z >= 1 && K >= 0);
                break;
              }
          }
        } finally {
          D = !1, U.current = $, O(), Error.prepareStackTrace = P;
        }
        var Te = r ? r.displayName || r.name : "", _e = Te ? A(Te) : "";
        return typeof r == "function" && J.set(r, _e), _e;
      }
      function Fe(r, u, f) {
        return it(r, !1);
      }
      function wt(r) {
        var u = r.prototype;
        return !!(u && u.isReactComponent);
      }
      function Me(r, u, f) {
        if (r == null)
          return "";
        if (typeof r == "function")
          return it(r, wt(r));
        if (typeof r == "string")
          return A(r);
        switch (r) {
          case V:
            return A("Suspense");
          case L:
            return A("SuspenseList");
        }
        if (typeof r == "object")
          switch (r.$$typeof) {
            case h:
              return Fe(r.render);
            case x:
              return Me(r.type, u, f);
            case W: {
              var d = r, P = d._payload, $ = d._init;
              try {
                return Me($(P), u, f);
              } catch {
              }
            }
          }
        return "";
      }
      var Ee = Object.prototype.hasOwnProperty, Pe = {}, at = ce.ReactDebugCurrentFrame;
      function Le(r) {
        if (r) {
          var u = r._owner, f = Me(r.type, r._source, u ? u.type : null);
          at.setExtraStackFrame(f);
        } else
          at.setExtraStackFrame(null);
      }
      function ge(r, u, f, d, P) {
        {
          var $ = Function.call.bind(Ee);
          for (var C in r)
            if ($(r, C)) {
              var T = void 0;
              try {
                if (typeof r[C] != "function") {
                  var Z = Error((d || "React class") + ": " + f + " type `" + C + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[C] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Z.name = "Invariant Violation", Z;
                }
                T = r[C](u, C, d, f, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (z) {
                T = z;
              }
              T && !(T instanceof Error) && (Le(P), q("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", f, C, typeof T), Le(null)), T instanceof Error && !(T.message in Pe) && (Pe[T.message] = !0, Le(P), q("Failed %s type: %s", f, T.message), Le(null));
            }
        }
      }
      var De = Array.isArray;
      function Ve(r) {
        return De(r);
      }
      function st(r) {
        {
          var u = typeof Symbol == "function" && Symbol.toStringTag, f = u && r[Symbol.toStringTag] || r.constructor.name || "Object";
          return f;
        }
      }
      function ut(r) {
        try {
          return Ue(r), !1;
        } catch {
          return !0;
        }
      }
      function Ue(r) {
        return "" + r;
      }
      function Xe(r) {
        if (ut(r))
          return q("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", st(r)), Ue(r);
      }
      var Qe = ce.ReactCurrentOwner, Tt = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, ct, lt;
      function Ze(r) {
        if (Ee.call(r, "ref")) {
          var u = Object.getOwnPropertyDescriptor(r, "ref").get;
          if (u && u.isReactWarning)
            return !1;
        }
        return r.ref !== void 0;
      }
      function St(r) {
        if (Ee.call(r, "key")) {
          var u = Object.getOwnPropertyDescriptor(r, "key").get;
          if (u && u.isReactWarning)
            return !1;
        }
        return r.key !== void 0;
      }
      function Ct(r, u) {
        typeof r.ref == "string" && Qe.current;
      }
      function jt(r, u) {
        {
          var f = function() {
            ct || (ct = !0, q("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", u));
          };
          f.isReactWarning = !0, Object.defineProperty(r, "key", {
            get: f,
            configurable: !0
          });
        }
      }
      function xe(r, u) {
        {
          var f = function() {
            lt || (lt = !0, q("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", u));
          };
          f.isReactWarning = !0, Object.defineProperty(r, "ref", {
            get: f,
            configurable: !0
          });
        }
      }
      var ft = function(r, u, f, d, P, $, C) {
        var T = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: s,
          // Built-in properties that belong on the element
          type: r,
          key: u,
          ref: f,
          props: C,
          // Record the component responsible for creating this element.
          _owner: $
        };
        return T._store = {}, Object.defineProperty(T._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(T, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: d
        }), Object.defineProperty(T, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: P
        }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
      };
      function kt(r, u, f, d, P) {
        {
          var $, C = {}, T = null, Z = null;
          f !== void 0 && (Xe(f), T = "" + f), St(u) && (Xe(u.key), T = "" + u.key), Ze(u) && (Z = u.ref, Ct(u, P));
          for ($ in u)
            Ee.call(u, $) && !Tt.hasOwnProperty($) && (C[$] = u[$]);
          if (r && r.defaultProps) {
            var z = r.defaultProps;
            for ($ in z)
              C[$] === void 0 && (C[$] = z[$]);
          }
          if (T || Z) {
            var K = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
            T && jt(C, K), Z && xe(C, K);
          }
          return ft(r, T, Z, P, d, Qe.current, C);
        }
      }
      var et = ce.ReactCurrentOwner, tt = ce.ReactDebugCurrentFrame;
      function we(r) {
        if (r) {
          var u = r._owner, f = Me(r.type, r._source, u ? u.type : null);
          tt.setExtraStackFrame(f);
        } else
          tt.setExtraStackFrame(null);
      }
      var We;
      We = !1;
      function $e(r) {
        return typeof r == "object" && r !== null && r.$$typeof === s;
      }
      function Ae() {
        {
          if (et.current) {
            var r = oe(et.current.type);
            if (r)
              return `

Check the render method of \`` + r + "`.";
          }
          return "";
        }
      }
      function Be(r) {
        return "";
      }
      var dt = {};
      function Ot(r) {
        {
          var u = Ae();
          if (!u) {
            var f = typeof r == "string" ? r : r.displayName || r.name;
            f && (u = `

Check the top-level render call using <` + f + ">.");
          }
          return u;
        }
      }
      function pt(r, u) {
        {
          if (!r._store || r._store.validated || r.key != null)
            return;
          r._store.validated = !0;
          var f = Ot(u);
          if (dt[f])
            return;
          dt[f] = !0;
          var d = "";
          r && r._owner && r._owner !== et.current && (d = " It was passed a child from " + oe(r._owner.type) + "."), we(r), q('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', f, d), we(null);
        }
      }
      function vt(r, u) {
        {
          if (typeof r != "object")
            return;
          if (Ve(r))
            for (var f = 0; f < r.length; f++) {
              var d = r[f];
              $e(d) && pt(d, u);
            }
          else if ($e(r))
            r._store && (r._store.validated = !0);
          else if (r) {
            var P = ue(r);
            if (typeof P == "function" && P !== r.entries)
              for (var $ = P.call(r), C; !(C = $.next()).done; )
                $e(C.value) && pt(C.value, u);
          }
        }
      }
      function Pt(r) {
        {
          var u = r.type;
          if (u == null || typeof u == "string")
            return;
          var f;
          if (typeof u == "function")
            f = u.propTypes;
          else if (typeof u == "object" && (u.$$typeof === h || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          u.$$typeof === x))
            f = u.propTypes;
          else
            return;
          if (f) {
            var d = oe(u);
            ge(f, r.props, "prop", d, r);
          } else if (u.PropTypes !== void 0 && !We) {
            We = !0;
            var P = oe(u);
            q("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", P || "Unknown");
          }
          typeof u.getDefaultProps == "function" && !u.getDefaultProps.isReactClassApproved && q("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Ne(r) {
        {
          for (var u = Object.keys(r.props), f = 0; f < u.length; f++) {
            var d = u[f];
            if (d !== "children" && d !== "key") {
              we(r), q("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), we(null);
              break;
            }
          }
          r.ref !== null && (we(r), q("Invalid attribute `ref` supplied to `React.Fragment`."), we(null));
        }
      }
      var Ye = {};
      function rt(r, u, f, d, P, $) {
        {
          var C = je(r);
          if (!C) {
            var T = "";
            (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var Z = Be();
            Z ? T += Z : T += Ae();
            var z;
            r === null ? z = "null" : Ve(r) ? z = "array" : r !== void 0 && r.$$typeof === s ? (z = "<" + (oe(r.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : z = typeof r, q("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", z, T);
          }
          var K = kt(r, u, f, P, $);
          if (K == null)
            return K;
          if (C) {
            var ae = u.children;
            if (ae !== void 0)
              if (d)
                if (Ve(ae)) {
                  for (var Te = 0; Te < ae.length; Te++)
                    vt(ae[Te], r);
                  Object.freeze && Object.freeze(ae);
                } else
                  q("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                vt(ae, r);
          }
          if (Ee.call(u, "key")) {
            var _e = oe(r), re = Object.keys(u).filter(function(It) {
              return It !== "key";
            }), nt = re.length > 0 ? "{key: someKey, " + re.join(": ..., ") + ": ...}" : "{key: someKey}";
            if (!Ye[_e + nt]) {
              var Nt = re.length > 0 ? "{" + re.join(": ..., ") + ": ...}" : "{}";
              q(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, nt, _e, Nt, _e), Ye[_e + nt] = !0;
            }
          }
          return r === b ? Ne(K) : Pt(K), K;
        }
      }
      function Lt(r, u, f) {
        return rt(r, u, f, !0);
      }
      function Dt(r, u, f) {
        return rt(r, u, f, !1);
      }
      var $t = Dt, At = Lt;
      Ge.Fragment = b, Ge.jsx = $t, Ge.jsxs = At;
    }()), Ge;
  }
  process.env.NODE_ENV === "production" ? Et.exports = wr() : Et.exports = Tr();
  var a = Et.exports;
  function Sr({ detector: _, styler: s }) {
    const [v, b] = de.useState({
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
    de.useEffect(() => {
      v.isEnabled ? s.startObserving() : s.stopObserving();
    }, [v.isEnabled, s]);
    const w = () => {
      b((h) => ({ ...h, isEnabled: !h.isEnabled }));
    }, N = (h) => {
      const V = { ...v.detectionConfig, ...h };
      _.updateConfig(V), b((L) => ({
        ...L,
        detectionConfig: V
      }));
    }, M = (h) => {
      const V = { ...v.styleConfig, ...h };
      s.updateConfig(V), b((L) => ({
        ...L,
        styleConfig: V
      }));
    }, y = (h) => {
      const V = _.detectRTL(h);
      return b((L) => ({
        ...L,
        stats: {
          totalProcessed: L.stats.totalProcessed + 1,
          rtlDetected: L.stats.rtlDetected + (V ? 1 : 0)
        }
      })), V;
    };
    return /* @__PURE__ */ a.jsxs("div", { className: "rtl-plugin-container", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "plugin-header", children: [
        /* @__PURE__ */ a.jsx("h2", { children: "RTL Language Support" }),
        /* @__PURE__ */ a.jsxs("div", { className: "plugin-status", children: [
          /* @__PURE__ */ a.jsxs("label", { className: "switch", children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "checkbox",
                checked: v.isEnabled,
                onChange: w
              }
            ),
            /* @__PURE__ */ a.jsx("span", { className: "slider" })
          ] }),
          /* @__PURE__ */ a.jsx("span", { children: v.isEnabled ? "Enabled" : "Disabled" })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "plugin-content", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ a.jsx("h3", { children: "Detection Settings" }),
          /* @__PURE__ */ a.jsxs("div", { className: "setting-group", children: [
            /* @__PURE__ */ a.jsx("label", { children: "Sensitivity:" }),
            /* @__PURE__ */ a.jsxs(
              "select",
              {
                value: v.detectionConfig.sensitivity,
                onChange: (h) => N({
                  sensitivity: h.target.value
                }),
                children: [
                  /* @__PURE__ */ a.jsx("option", { value: "high", children: "High (10%)" }),
                  /* @__PURE__ */ a.jsx("option", { value: "medium", children: "Medium (20%)" }),
                  /* @__PURE__ */ a.jsx("option", { value: "low", children: "Low (40%)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "setting-group", children: [
            /* @__PURE__ */ a.jsx("label", { children: "Min RTL Characters:" }),
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "number",
                min: "1",
                max: "20",
                value: v.detectionConfig.minRTLChars,
                onChange: (h) => N({
                  minRTLChars: parseInt(h.target.value)
                })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ a.jsx("h3", { children: "Style Settings" }),
          /* @__PURE__ */ a.jsxs("div", { className: "setting-group", children: [
            /* @__PURE__ */ a.jsx("label", { children: "Direction Mode:" }),
            /* @__PURE__ */ a.jsxs(
              "select",
              {
                value: v.styleConfig.forceDirection,
                onChange: (h) => M({
                  forceDirection: h.target.value
                }),
                children: [
                  /* @__PURE__ */ a.jsx("option", { value: "auto", children: "Auto Detect" }),
                  /* @__PURE__ */ a.jsx("option", { value: "rtl", children: "Force RTL" }),
                  /* @__PURE__ */ a.jsx("option", { value: "ltr", children: "Force LTR" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a.jsx("div", { className: "setting-group", children: /* @__PURE__ */ a.jsxs("label", { children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "checkbox",
                checked: v.styleConfig.autoDetect,
                onChange: (h) => M({
                  autoDetect: h.target.checked
                })
              }
            ),
            "Auto-detect new content"
          ] }) })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ a.jsx("h3", { children: "Statistics" }),
          /* @__PURE__ */ a.jsxs("div", { className: "stats", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "stat-item", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Total Processed:" }),
              /* @__PURE__ */ a.jsx("span", { children: v.stats.totalProcessed })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "stat-item", children: [
              /* @__PURE__ */ a.jsx("span", { children: "RTL Detected:" }),
              /* @__PURE__ */ a.jsx("span", { children: v.stats.rtlDetected })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "stat-item", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Detection Rate:" }),
              /* @__PURE__ */ a.jsxs("span", { children: [
                v.stats.totalProcessed > 0 ? Math.round(v.stats.rtlDetected / v.stats.totalProcessed * 100) : 0,
                "%"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ a.jsx("h3", { children: "Test Detection" }),
          /* @__PURE__ */ a.jsxs("div", { className: "test-area", children: [
            /* @__PURE__ */ a.jsx(
              "textarea",
              {
                placeholder: "Enter text to test RTL detection...",
                onBlur: (h) => {
                  const V = y(h.target.value);
                  alert(`Text is ${V ? "RTL" : "LTR"}`);
                }
              }
            ),
            /* @__PURE__ */ a.jsxs("p", { className: "test-examples", children: [
              "Try these examples:",
              /* @__PURE__ */ a.jsx("br", {}),
              "Hebrew: שלום עולם - זהו טקסט בעברית",
              /* @__PURE__ */ a.jsx("br", {}),
              "Arabic: مرحبا بالعالم - هذا نص باللغة العربية",
              /* @__PURE__ */ a.jsx("br", {}),
              "English: Hello world - this is English text"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("style", { children: `
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
  function Cr() {
    const [_, s] = de.useState({
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
    }), [v, b] = de.useState(""), [w, N] = de.useState("idle"), M = de.useRef(null);
    de.useEffect(() => {
      const x = localStorage.getItem("blinko-rtl-settings");
      if (x)
        try {
          const W = JSON.parse(x);
          s((te) => ({ ...te, ...W }));
        } catch (W) {
          console.error("Failed to load RTL plugin settings:", W);
        }
      return () => {
        M.current && clearTimeout(M.current);
      };
    }, []);
    const y = (x) => {
      N("saving");
      const W = { ..._, ...x };
      s(W), localStorage.setItem("blinko-rtl-settings", JSON.stringify(W)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: W
        })
      ), M.current && clearTimeout(M.current), M.current = window.setTimeout(() => {
        N("saved"), M.current = window.setTimeout(() => N("idle"), 2e3);
      }, 300);
    }, h = () => {
      v.trim() && !_.customSelectors.includes(v.trim()) && (y({
        customSelectors: [..._.customSelectors, v.trim()]
      }), b(""));
    }, V = (x) => {
      y({
        customSelectors: _.customSelectors.filter((W) => W !== x)
      });
    }, L = () => {
      y({
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
    return /* @__PURE__ */ a.jsxs("div", { className: "rtl-settings-panel", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "settings-header", children: [
        /* @__PURE__ */ a.jsx("h2", { children: "RTL Language Support Settings" }),
        /* @__PURE__ */ a.jsx("p", { children: "Configure automatic RTL detection and styling for Hebrew, Arabic, and other right-to-left languages." })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "settings-content", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "setting-section", children: [
          /* @__PURE__ */ a.jsx("h3", { children: "General Settings" }),
          /* @__PURE__ */ a.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ a.jsxs("label", { className: "setting-label", children: [
              /* @__PURE__ */ a.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: _.enabled,
                  onChange: (x) => y({ enabled: x.target.checked })
                }
              ),
              /* @__PURE__ */ a.jsx("span", { children: "Enable RTL Support" })
            ] }),
            /* @__PURE__ */ a.jsx("p", { className: "setting-description", children: "Automatically detect and apply RTL styling to content" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ a.jsxs("label", { className: "setting-label", children: [
              /* @__PURE__ */ a.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: _.autoDetect,
                  onChange: (x) => y({ autoDetect: x.target.checked }),
                  disabled: !_.enabled
                }
              ),
              /* @__PURE__ */ a.jsx("span", { children: "Auto-detect New Content" })
            ] }),
            /* @__PURE__ */ a.jsx("p", { className: "setting-description", children: "Automatically process new content as it appears" })
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "setting-section", children: [
          /* @__PURE__ */ a.jsx("h3", { children: "Detection Settings" }),
          /* @__PURE__ */ a.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ a.jsx("label", { className: "setting-label", children: "Detection Sensitivity" }),
            /* @__PURE__ */ a.jsxs(
              "select",
              {
                value: _.sensitivity,
                onChange: (x) => y({
                  sensitivity: x.target.value
                }),
                disabled: !_.enabled,
                children: [
                  /* @__PURE__ */ a.jsx("option", { value: "high", children: "High - 10% RTL characters" }),
                  /* @__PURE__ */ a.jsx("option", { value: "medium", children: "Medium - 20% RTL characters" }),
                  /* @__PURE__ */ a.jsx("option", { value: "low", children: "Low - 40% RTL characters" })
                ]
              }
            ),
            /* @__PURE__ */ a.jsx("p", { className: "setting-description", children: "Minimum percentage of RTL characters needed to trigger RTL styling" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ a.jsx("label", { className: "setting-label", children: "Direction Override" }),
            /* @__PURE__ */ a.jsxs(
              "select",
              {
                value: _.forceDirection,
                onChange: (x) => y({
                  forceDirection: x.target.value
                }),
                disabled: !_.enabled,
                children: [
                  /* @__PURE__ */ a.jsx("option", { value: "auto", children: "Auto-detect" }),
                  /* @__PURE__ */ a.jsx("option", { value: "rtl", children: "Always RTL" }),
                  /* @__PURE__ */ a.jsx("option", { value: "ltr", children: "Always LTR" })
                ]
              }
            ),
            /* @__PURE__ */ a.jsx("p", { className: "setting-description", children: "Override automatic detection with forced direction" })
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "setting-section", children: [
          /* @__PURE__ */ a.jsx("h3", { children: "CSS Selectors" }),
          /* @__PURE__ */ a.jsx("p", { className: "section-description", children: "Define which elements should be processed for RTL detection" }),
          /* @__PURE__ */ a.jsx("div", { className: "selector-list", children: _.customSelectors.map((x, W) => /* @__PURE__ */ a.jsxs("div", { className: "selector-item", children: [
            /* @__PURE__ */ a.jsx("code", { children: x }),
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                onClick: () => V(x),
                className: "remove-btn",
                disabled: !_.enabled,
                children: "×"
              }
            )
          ] }, W)) }),
          /* @__PURE__ */ a.jsxs("div", { className: "add-selector", children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "text",
                value: v,
                onChange: (x) => b(x.target.value),
                placeholder: "Enter CSS selector (e.g., .my-content)",
                disabled: !_.enabled,
                onKeyPress: (x) => x.key === "Enter" && h()
              }
            ),
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                onClick: h,
                disabled: !_.enabled || !v.trim(),
                children: "Add Selector"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "setting-section", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "advanced-header", children: [
            /* @__PURE__ */ a.jsx("h3", { children: "Advanced" }),
            /* @__PURE__ */ a.jsx(
              "span",
              {
                className: `save-status ${w !== "idle" ? "visible" : ""}`,
                children: w === "saving" ? "Saving..." : w === "saved" ? "Settings Saved!" : ""
              }
            )
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "setting-actions", children: [
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                onClick: L,
                className: "reset-btn",
                children: "Reset to Defaults"
              }
            ),
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  const x = JSON.stringify(_, null, 2);
                  navigator.clipboard.writeText(x), alert("Settings copied to clipboard");
                },
                className: "export-btn",
                children: "Export Settings"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("style", { children: `
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
  class jr {
    constructor(s = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      me(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      me(this, "RTL_RANGES", [
        [1424, 1535],
        // Hebrew
        [1536, 1791],
        // Arabic
        [1792, 1871],
        // Syriac
        [1920, 1983]
        // Thaana
      ]);
      this.config = s;
    }
    /**
     * Check if a character is RTL
     */
    isRTLChar(s) {
      const v = s.charCodeAt(0);
      return this.RTL_RANGES.some(([b, w]) => v >= b && v <= w);
    }
    /**
     * Detect RTL content in text
     */
    detectRTL(s) {
      if (!s || s.length === 0) return !1;
      const v = s.substring(0, this.config.sampleSize);
      let b = 0, w = 0;
      for (const y of v)
        /\s|[.,!?;:()[\]{}]/.test(y) || (w++, this.isRTLChar(y) && b++);
      return b < this.config.minRTLChars ? !1 : (w > 0 ? b / w : 0) >= {
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
    detectRTLInSegments(s) {
      return s.map((v) => this.detectRTL(v));
    }
    /**
     * Update detection configuration
     */
    updateConfig(s) {
      this.config = { ...this.config, ...s };
    }
  }
  function kr(_, s) {
    let v;
    return function(...w) {
      const N = () => {
        v = null, _(...w);
      };
      v && clearTimeout(v), v = setTimeout(N, s);
    };
  }
  class Or {
    constructor(s, v = {
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
      me(this, "config");
      me(this, "detector");
      me(this, "observer", null);
      me(this, "styleSheet", null);
      me(this, "debouncedProcessElement");
      this.detector = s, this.config = v, this.injectRTLStyles(), this.debouncedProcessElement = kr(this.processElement.bind(this), 150);
    }
    /**
     * Inject RTL CSS styles into document
     */
    injectRTLStyles() {
      if (document.getElementById("blinko-rtl-styles")) return;
      const s = document.createElement("style");
      s.id = "blinko-rtl-styles", s.textContent = `
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
    `, document.head.appendChild(s);
    }
    /**
     * Apply RTL styling to element
     */
    applyRTL(s, v) {
      this.config.forceDirection !== "auto" && (v = this.config.forceDirection === "rtl"), s.classList.remove("blinko-rtl-content", "blinko-ltr-content"), s.classList.add("blinko-direction-transition"), v ? (s.classList.add("blinko-rtl-content"), s.setAttribute("dir", "rtl")) : (s.classList.add("blinko-ltr-content"), s.setAttribute("dir", "ltr"));
    }
    /**
     * Start observing DOM for changes
     */
    startObserving() {
      this.observer || (this.observer = new MutationObserver((s) => {
        s.forEach((v) => {
          if (v.type === "childList")
            v.addedNodes.forEach((b) => {
              b.nodeType === Node.ELEMENT_NODE && this.debouncedProcessElement(b);
            });
          else if (v.type === "characterData") {
            const b = v.target.parentElement;
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
    processElement(s) {
      if (!this.config.autoDetect) return;
      if (this.config.applyToSelectors.some(
        (b) => {
          var w, N;
          return ((w = s.matches) == null ? void 0 : w.call(s, b)) || ((N = s.querySelector) == null ? void 0 : N.call(s, b));
        }
      )) {
        const b = s.textContent || s.value || "";
        if (b) {
          const w = this.detector.detectRTL(b);
          this.applyRTL(s, w);
        }
      }
    }
    /**
     * Update styler configuration
     */
    updateConfig(s) {
      this.config = { ...this.config, ...s };
    }
    /**
     * Clean up styles and observers
     */
    destroy() {
      this.stopObserving();
      const s = document.getElementById("blinko-rtl-styles");
      s && s.remove();
    }
  }
  const Pr = {
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
  }, Lr = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Dr = {
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
  }, $r = {
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
  System.register(["react", "react-dom/client"], (_, s) => {
    s.import("react");
    const v = s.import("react-dom/client");
    return {
      execute: () => {
        const b = new jr(), w = new Or(b);
        function N() {
          console.log("Initializing Blinko RTL Plugin...");
          const M = localStorage.getItem("blinko-rtl-settings");
          if (M)
            try {
              const y = JSON.parse(M);
              y.enabled !== !1 && (w.startObserving(), (y.sensitivity || y.minRTLChars) && b.updateConfig({
                sensitivity: y.sensitivity || "medium",
                minRTLChars: y.minRTLChars || 3
              }), w.updateConfig({
                autoDetect: y.autoDetect !== !1,
                forceDirection: y.forceDirection || "auto",
                applyToSelectors: y.customSelectors || [
                  ".note-content",
                  ".note-editor",
                  "textarea",
                  ".markdown-content",
                  ".note-text"
                ]
              }));
            } catch (y) {
              console.error("Failed to load RTL plugin settings:", y);
            }
          else
            w.startObserving();
          window.addEventListener("rtl-settings-changed", (y) => {
            const h = y.detail;
            h.enabled ? (w.startObserving(), b.updateConfig({
              sensitivity: h.sensitivity,
              minRTLChars: h.minRTLChars || 3
            }), w.updateConfig({
              autoDetect: h.autoDetect,
              forceDirection: h.forceDirection,
              applyToSelectors: h.customSelectors
            })) : w.stopObserving();
          }), window.blinkoRTL = {
            detector: b,
            styler: w,
            test: (y) => {
              const h = b.detectRTL(y);
              return console.log(`Text "${y}" is ${h ? "RTL" : "LTR"}`), h;
            }
          }, console.log("Blinko RTL Plugin initialized successfully");
        }
        _("default", class {
          constructor() {
            me(this, "withSettingPanel", !0);
            me(this, "renderSettingPanel", () => {
              const y = document.createElement("div");
              return v.createRoot(y).render(Kt.createElement(Cr)), y;
            });
            Object.assign(this, xr);
          }
          async init() {
            this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", N) : N(), window.Blinko.addToolBarIcon({
              name: "rtl-support",
              icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
              placement: "top",
              tooltip: "RTL Support Settings",
              content: () => {
                const y = document.createElement("div");
                return v.createRoot(y).render(Kt.createElement(Sr, { detector: b, styler: w })), y;
              }
            });
          }
          initI18n() {
            window.Blinko.i18n.addResourceBundle("en", "translation", Pr), window.Blinko.i18n.addResourceBundle("zh", "translation", Lr), window.Blinko.i18n.addResourceBundle("he", "translation", Dr), window.Blinko.i18n.addResourceBundle("ar", "translation", $r);
          }
          destroy() {
            w.destroy(), console.log("RTL Plugin destroyed");
          }
        });
      }
    };
  });
})();
