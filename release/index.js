var nn = Object.defineProperty;
var on = (je, se, R) => se in je ? nn(je, se, { enumerable: !0, configurable: !0, writable: !0, value: R }) : je[se] = R;
var me = (je, se, R) => (on(je, typeof se != "symbol" ? se + "" : se, R), R);
(function() {
  function je(_) {
    return _ && _.__esModule && Object.prototype.hasOwnProperty.call(_, "default") ? _.default : _;
  }
  var se = { exports: {} }, R = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var qt;
  function xr() {
    if (qt)
      return R;
    qt = 1;
    var _ = Symbol.for("react.element"), c = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), N = Symbol.for("react.provider"), M = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), V = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), E = Symbol.iterator;
    function U(n) {
      return n === null || typeof n != "object" ? null : (n = E && n[E] || n["@@iterator"], typeof n == "function" ? n : null);
    }
    var te = { isMounted: function() {
      return !1;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, pe = Object.assign, Ve = {};
    function ce(n, u, S) {
      this.props = n, this.context = u, this.refs = Ve, this.updater = S || te;
    }
    ce.prototype.isReactComponent = {}, ce.prototype.setState = function(n, u) {
      if (typeof n != "object" && typeof n != "function" && n != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, n, u, "setState");
    }, ce.prototype.forceUpdate = function(n) {
      this.updater.enqueueForceUpdate(this, n, "forceUpdate");
    };
    function ue() {
    }
    ue.prototype = ce.prototype;
    function z(n, u, S) {
      this.props = n, this.context = u, this.refs = Ve, this.updater = S || te;
    }
    var xe = z.prototype = new ue();
    xe.constructor = z, pe(xe, ce.prototype), xe.isPureReactComponent = !0;
    var le = Array.isArray, G = Object.prototype.hasOwnProperty, oe = { current: null }, ve = { key: !0, ref: !0, __self: !0, __source: !0 };
    function ye(n, u, S) {
      var j, P = {}, W = null, I = null;
      if (u != null)
        for (j in u.ref !== void 0 && (I = u.ref), u.key !== void 0 && (W = "" + u.key), u)
          G.call(u, j) && !ve.hasOwnProperty(j) && (P[j] = u[j]);
      var A = arguments.length - 2;
      if (A === 1)
        P.children = S;
      else if (1 < A) {
        for (var D = Array(A), J = 0; J < A; J++)
          D[J] = arguments[J + 2];
        P.children = D;
      }
      if (n && n.defaultProps)
        for (j in A = n.defaultProps, A)
          P[j] === void 0 && (P[j] = A[j]);
      return { $$typeof: _, type: n, key: W, ref: I, props: P, _owner: oe.current };
    }
    function ke(n, u) {
      return { $$typeof: _, type: n.type, key: u, ref: n.ref, props: n.props, _owner: n._owner };
    }
    function Oe(n) {
      return typeof n == "object" && n !== null && n.$$typeof === _;
    }
    function Xe(n) {
      var u = { "=": "=0", ":": "=2" };
      return "$" + n.replace(/[=:]/g, function(S) {
        return u[S];
      });
    }
    var Pe = /\/+/g;
    function re(n, u) {
      return typeof n == "object" && n !== null && n.key != null ? Xe("" + n.key) : u.toString(36);
    }
    function ae(n, u, S, j, P) {
      var W = typeof n;
      (W === "undefined" || W === "boolean") && (n = null);
      var I = !1;
      if (n === null)
        I = !0;
      else
        switch (W) {
          case "string":
          case "number":
            I = !0;
            break;
          case "object":
            switch (n.$$typeof) {
              case _:
              case c:
                I = !0;
            }
        }
      if (I)
        return I = n, P = P(I), n = j === "" ? "." + re(I, 0) : j, le(P) ? (S = "", n != null && (S = n.replace(Pe, "$&/") + "/"), ae(P, u, S, "", function(J) {
          return J;
        })) : P != null && (Oe(P) && (P = ke(P, S + (!P.key || I && I.key === P.key ? "" : ("" + P.key).replace(Pe, "$&/") + "/") + n)), u.push(P)), 1;
      if (I = 0, j = j === "" ? "." : j + ":", le(n))
        for (var A = 0; A < n.length; A++) {
          W = n[A];
          var D = j + re(W, A);
          I += ae(W, u, S, D, P);
        }
      else if (D = U(n), typeof D == "function")
        for (n = D.call(n), A = 0; !(W = n.next()).done; )
          W = W.value, D = j + re(W, A++), I += ae(W, u, S, D, P);
      else if (W === "object")
        throw u = String(n), Error("Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead.");
      return I;
    }
    function Q(n, u, S) {
      if (n == null)
        return n;
      var j = [], P = 0;
      return ae(n, j, "", "", function(W) {
        return u.call(S, W, P++);
      }), j;
    }
    function fe(n) {
      if (n._status === -1) {
        var u = n._result;
        u = u(), u.then(function(S) {
          (n._status === 0 || n._status === -1) && (n._status = 1, n._result = S);
        }, function(S) {
          (n._status === 0 || n._status === -1) && (n._status = 2, n._result = S);
        }), n._status === -1 && (n._status = 0, n._result = u);
      }
      if (n._status === 1)
        return n._result.default;
      throw n._result;
    }
    var h = { current: null }, he = { transition: null }, Le = { ReactCurrentDispatcher: h, ReactCurrentBatchConfig: he, ReactCurrentOwner: oe };
    function be() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    return R.Children = { map: Q, forEach: function(n, u, S) {
      Q(n, function() {
        u.apply(this, arguments);
      }, S);
    }, count: function(n) {
      var u = 0;
      return Q(n, function() {
        u++;
      }), u;
    }, toArray: function(n) {
      return Q(n, function(u) {
        return u;
      }) || [];
    }, only: function(n) {
      if (!Oe(n))
        throw Error("React.Children.only expected to receive a single React element child.");
      return n;
    } }, R.Component = ce, R.Fragment = p, R.Profiler = w, R.PureComponent = z, R.StrictMode = b, R.Suspense = v, R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Le, R.act = be, R.cloneElement = function(n, u, S) {
      if (n == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + n + ".");
      var j = pe({}, n.props), P = n.key, W = n.ref, I = n._owner;
      if (u != null) {
        if (u.ref !== void 0 && (W = u.ref, I = oe.current), u.key !== void 0 && (P = "" + u.key), n.type && n.type.defaultProps)
          var A = n.type.defaultProps;
        for (D in u)
          G.call(u, D) && !ve.hasOwnProperty(D) && (j[D] = u[D] === void 0 && A !== void 0 ? A[D] : u[D]);
      }
      var D = arguments.length - 2;
      if (D === 1)
        j.children = S;
      else if (1 < D) {
        A = Array(D);
        for (var J = 0; J < D; J++)
          A[J] = arguments[J + 2];
        j.children = A;
      }
      return { $$typeof: _, type: n.type, key: P, ref: W, props: j, _owner: I };
    }, R.createContext = function(n) {
      return n = { $$typeof: M, _currentValue: n, _currentValue2: n, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, n.Provider = { $$typeof: N, _context: n }, n.Consumer = n;
    }, R.createElement = ye, R.createFactory = function(n) {
      var u = ye.bind(null, n);
      return u.type = n, u;
    }, R.createRef = function() {
      return { current: null };
    }, R.forwardRef = function(n) {
      return { $$typeof: m, render: n };
    }, R.isValidElement = Oe, R.lazy = function(n) {
      return { $$typeof: L, _payload: { _status: -1, _result: n }, _init: fe };
    }, R.memo = function(n, u) {
      return { $$typeof: V, type: n, compare: u === void 0 ? null : u };
    }, R.startTransition = function(n) {
      var u = he.transition;
      he.transition = {};
      try {
        n();
      } finally {
        he.transition = u;
      }
    }, R.unstable_act = be, R.useCallback = function(n, u) {
      return h.current.useCallback(n, u);
    }, R.useContext = function(n) {
      return h.current.useContext(n);
    }, R.useDebugValue = function() {
    }, R.useDeferredValue = function(n) {
      return h.current.useDeferredValue(n);
    }, R.useEffect = function(n, u) {
      return h.current.useEffect(n, u);
    }, R.useId = function() {
      return h.current.useId();
    }, R.useImperativeHandle = function(n, u, S) {
      return h.current.useImperativeHandle(n, u, S);
    }, R.useInsertionEffect = function(n, u) {
      return h.current.useInsertionEffect(n, u);
    }, R.useLayoutEffect = function(n, u) {
      return h.current.useLayoutEffect(n, u);
    }, R.useMemo = function(n, u) {
      return h.current.useMemo(n, u);
    }, R.useReducer = function(n, u, S) {
      return h.current.useReducer(n, u, S);
    }, R.useRef = function(n) {
      return h.current.useRef(n);
    }, R.useState = function(n) {
      return h.current.useState(n);
    }, R.useSyncExternalStore = function(n, u, S) {
      return h.current.useSyncExternalStore(n, u, S);
    }, R.useTransition = function() {
      return h.current.useTransition();
    }, R.version = "18.3.1", R;
  }
  var Ke = { exports: {} };
  /**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  Ke.exports;
  var Kt;
  function Er() {
    return Kt || (Kt = 1, function(_, c) {
      process.env.NODE_ENV !== "production" && function() {
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        var p = "18.3.1", b = Symbol.for("react.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), V = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), U = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), pe = Symbol.for("react.lazy"), Ve = Symbol.for("react.offscreen"), ce = Symbol.iterator, ue = "@@iterator";
        function z(e) {
          if (e === null || typeof e != "object")
            return null;
          var t = ce && e[ce] || e[ue];
          return typeof t == "function" ? t : null;
        }
        var xe = {
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
        }, oe = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        }, ve = {}, ye = null;
        function ke(e) {
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
        var Oe = !1, Xe = !1, Pe = !1, re = !1, ae = !1, Q = {
          ReactCurrentDispatcher: xe,
          ReactCurrentBatchConfig: le,
          ReactCurrentOwner: oe
        };
        Q.ReactDebugCurrentFrame = ve, Q.ReactCurrentActQueue = G;
        function fe(e) {
          {
            for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
              o[a - 1] = arguments[a];
            he("warn", e, o);
          }
        }
        function h(e) {
          {
            for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
              o[a - 1] = arguments[a];
            he("error", e, o);
          }
        }
        function he(e, t, o) {
          {
            var a = Q.ReactDebugCurrentFrame, f = a.getStackAddendum();
            f !== "" && (t += "%s", o = o.concat([f]));
            var g = o.map(function(d) {
              return String(d);
            });
            g.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, g);
          }
        }
        var Le = {};
        function be(e, t) {
          {
            var o = e.constructor, a = o && (o.displayName || o.name) || "ReactClass", f = a + "." + t;
            if (Le[f])
              return;
            h("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, a), Le[f] = !0;
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
          enqueueReplaceState: function(e, t, o, a) {
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
          enqueueSetState: function(e, t, o, a) {
            be(e, "setState");
          }
        }, u = Object.assign, S = {};
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
          var P = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          }, W = function(e, t) {
            Object.defineProperty(j.prototype, e, {
              get: function() {
                fe("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
              }
            });
          };
          for (var I in P)
            P.hasOwnProperty(I) && W(I, P[I]);
        }
        function A() {
        }
        A.prototype = j.prototype;
        function D(e, t, o) {
          this.props = e, this.context = t, this.refs = S, this.updater = o || n;
        }
        var J = D.prototype = new A();
        J.constructor = D, u(J, j.prototype), J.isPureReactComponent = !0;
        function wt() {
          var e = {
            current: null
          };
          return Object.seal(e), e;
        }
        var nt = Array.isArray;
        function We(e) {
          return nt(e);
        }
        function Tt(e) {
          {
            var t = typeof Symbol == "function" && Symbol.toStringTag, o = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
            return o;
          }
        }
        function Ue(e) {
          try {
            return Ee(e), !1;
          } catch {
            return !0;
          }
        }
        function Ee(e) {
          return "" + e;
        }
        function De(e) {
          if (Ue(e))
            return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Tt(e)), Ee(e);
        }
        function ot(e, t, o) {
          var a = e.displayName;
          if (a)
            return a;
          var f = t.displayName || t.name || "";
          return f !== "" ? o + "(" + f + ")" : o;
        }
        function $e(e) {
          return e.displayName || "Context";
        }
        function ge(e) {
          if (e == null)
            return null;
          if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
            return e.displayName || e.name || null;
          if (typeof e == "string")
            return e;
          switch (e) {
            case N:
              return "Fragment";
            case w:
              return "Portal";
            case m:
              return "Profiler";
            case M:
              return "StrictMode";
            case E:
              return "Suspense";
            case U:
              return "SuspenseList";
          }
          if (typeof e == "object")
            switch (e.$$typeof) {
              case V:
                var t = e;
                return $e(t) + ".Consumer";
              case v:
                var o = e;
                return $e(o._context) + ".Provider";
              case L:
                return ot(e, e.render, "ForwardRef");
              case te:
                var a = e.displayName || null;
                return a !== null ? a : ge(e.type) || "Memo";
              case pe: {
                var f = e, g = f._payload, d = f._init;
                try {
                  return ge(d(g));
                } catch {
                  return null;
                }
              }
            }
          return null;
        }
        var Ae = Object.prototype.hasOwnProperty, Be = {
          key: !0,
          ref: !0,
          __self: !0,
          __source: !0
        }, at, it, Ye;
        Ye = {};
        function Qe(e) {
          if (Ae.call(e, "ref")) {
            var t = Object.getOwnPropertyDescriptor(e, "ref").get;
            if (t && t.isReactWarning)
              return !1;
          }
          return e.ref !== void 0;
        }
        function we(e) {
          if (Ae.call(e, "key")) {
            var t = Object.getOwnPropertyDescriptor(e, "key").get;
            if (t && t.isReactWarning)
              return !1;
          }
          return e.key !== void 0;
        }
        function St(e, t) {
          var o = function() {
            at || (at = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
          };
          o.isReactWarning = !0, Object.defineProperty(e, "key", {
            get: o,
            configurable: !0
          });
        }
        function st(e, t) {
          var o = function() {
            it || (it = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
          };
          o.isReactWarning = !0, Object.defineProperty(e, "ref", {
            get: o,
            configurable: !0
          });
        }
        function ct(e) {
          if (typeof e.ref == "string" && oe.current && e.__self && oe.current.stateNode !== e.__self) {
            var t = ge(oe.current.type);
            Ye[t] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', t, e.ref), Ye[t] = !0);
          }
        }
        var Ne = function(e, t, o, a, f, g, d) {
          var x = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: b,
            // Built-in properties that belong on the element
            type: e,
            key: t,
            ref: o,
            props: d,
            // Record the component responsible for creating this element.
            _owner: g
          };
          return x._store = {}, Object.defineProperty(x._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: !1
          }), Object.defineProperty(x, "_self", {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: a
          }), Object.defineProperty(x, "_source", {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: f
          }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
        };
        function Ct(e, t, o) {
          var a, f = {}, g = null, d = null, x = null, k = null;
          if (t != null) {
            Qe(t) && (d = t.ref, ct(t)), we(t) && (De(t.key), g = "" + t.key), x = t.__self === void 0 ? null : t.__self, k = t.__source === void 0 ? null : t.__source;
            for (a in t)
              Ae.call(t, a) && !Be.hasOwnProperty(a) && (f[a] = t[a]);
          }
          var F = arguments.length - 2;
          if (F === 1)
            f.children = o;
          else if (F > 1) {
            for (var B = Array(F), Y = 0; Y < F; Y++)
              B[Y] = arguments[Y + 2];
            Object.freeze && Object.freeze(B), f.children = B;
          }
          if (e && e.defaultProps) {
            var q = e.defaultProps;
            for (a in q)
              f[a] === void 0 && (f[a] = q[a]);
          }
          if (g || d) {
            var X = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
            g && St(f, X), d && st(f, X);
          }
          return Ne(e, g, d, x, k, oe.current, f);
        }
        function jt(e, t) {
          var o = Ne(e.type, t, e.ref, e._self, e._source, e._owner, e.props);
          return o;
        }
        function kt(e, t, o) {
          if (e == null)
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
          var a, f = u({}, e.props), g = e.key, d = e.ref, x = e._self, k = e._source, F = e._owner;
          if (t != null) {
            Qe(t) && (d = t.ref, F = oe.current), we(t) && (De(t.key), g = "" + t.key);
            var B;
            e.type && e.type.defaultProps && (B = e.type.defaultProps);
            for (a in t)
              Ae.call(t, a) && !Be.hasOwnProperty(a) && (t[a] === void 0 && B !== void 0 ? f[a] = B[a] : f[a] = t[a]);
          }
          var Y = arguments.length - 2;
          if (Y === 1)
            f.children = o;
          else if (Y > 1) {
            for (var q = Array(Y), X = 0; X < Y; X++)
              q[X] = arguments[X + 2];
            f.children = q;
          }
          return Ne(e.type, g, d, x, k, F, f);
        }
        function Te(e) {
          return typeof e == "object" && e !== null && e.$$typeof === b;
        }
        var ut = ".", Ot = ":";
        function Pt(e) {
          var t = /[=:]/g, o = {
            "=": "=0",
            ":": "=2"
          }, a = e.replace(t, function(f) {
            return o[f];
          });
          return "$" + a;
        }
        var ze = !1, lt = /\/+/g;
        function _e(e) {
          return e.replace(lt, "$&/");
        }
        function Ie(e, t) {
          return typeof e == "object" && e !== null && e.key != null ? (De(e.key), Pt("" + e.key)) : t.toString(36);
        }
        function Se(e, t, o, a, f) {
          var g = typeof e;
          (g === "undefined" || g === "boolean") && (e = null);
          var d = !1;
          if (e === null)
            d = !0;
          else
            switch (g) {
              case "string":
              case "number":
                d = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case b:
                  case w:
                    d = !0;
                }
            }
          if (d) {
            var x = e, k = f(x), F = a === "" ? ut + Ie(x, 0) : a;
            if (We(k)) {
              var B = "";
              F != null && (B = _e(F) + "/"), Se(k, t, B, "", function(rn) {
                return rn;
              });
            } else
              k != null && (Te(k) && (k.key && (!x || x.key !== k.key) && De(k.key), k = jt(
                k,
                // Keep both the (mapped) and old keys if they differ, just as
                // traverseAllChildren used to do for objects as children
                o + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                (k.key && (!x || x.key !== k.key) ? (
                  // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                  // eslint-disable-next-line react-internal/safe-string-coercion
                  _e("" + k.key) + "/"
                ) : "") + F
              )), t.push(k));
            return 1;
          }
          var Y, q, X = 0, ee = a === "" ? ut : a + Ot;
          if (We(e))
            for (var xt = 0; xt < e.length; xt++)
              Y = e[xt], q = ee + Ie(Y, xt), X += Se(Y, t, o, q, f);
          else {
            var Ht = z(e);
            if (typeof Ht == "function") {
              var br = e;
              Ht === br.entries && (ze || fe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ze = !0);
              for (var en = Ht.call(br), _r, tn = 0; !(_r = en.next()).done; )
                Y = _r.value, q = ee + Ie(Y, tn++), X += Se(Y, t, o, q, f);
            } else if (g === "object") {
              var Rr = String(e);
              throw new Error("Objects are not valid as a React child (found: " + (Rr === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : Rr) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return X;
        }
        function Fe(e, t, o) {
          if (e == null)
            return e;
          var a = [], f = 0;
          return Se(e, a, "", "", function(g) {
            return t.call(o, g, f++);
          }), a;
        }
        function Lt(e) {
          var t = 0;
          return Fe(e, function() {
            t++;
          }), t;
        }
        function ft(e, t, o) {
          Fe(e, function() {
            t.apply(this, arguments);
          }, o);
        }
        function Dt(e) {
          return Fe(e, function(t) {
            return t;
          }) || [];
        }
        function dt(e) {
          if (!Te(e))
            throw new Error("React.Children.only expected to receive a single React element child.");
          return e;
        }
        function pt(e) {
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
            $$typeof: v,
            _context: t
          };
          var o = !1, a = !1, f = !1;
          {
            var g = {
              $$typeof: V,
              _context: t
            };
            Object.defineProperties(g, {
              Provider: {
                get: function() {
                  return a || (a = !0, h("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), t.Provider;
                },
                set: function(d) {
                  t.Provider = d;
                }
              },
              _currentValue: {
                get: function() {
                  return t._currentValue;
                },
                set: function(d) {
                  t._currentValue = d;
                }
              },
              _currentValue2: {
                get: function() {
                  return t._currentValue2;
                },
                set: function(d) {
                  t._currentValue2 = d;
                }
              },
              _threadCount: {
                get: function() {
                  return t._threadCount;
                },
                set: function(d) {
                  t._threadCount = d;
                }
              },
              Consumer: {
                get: function() {
                  return o || (o = !0, h("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), t.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return t.displayName;
                },
                set: function(d) {
                  f || (fe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", d), f = !0);
                }
              }
            }), t.Consumer = g;
          }
          return t._currentRenderer = null, t._currentRenderer2 = null, t;
        }
        var Me = -1, Ze = 0, et = 1, vt = 2;
        function $t(e) {
          if (e._status === Me) {
            var t = e._result, o = t();
            if (o.then(function(g) {
              if (e._status === Ze || e._status === Me) {
                var d = e;
                d._status = et, d._result = g;
              }
            }, function(g) {
              if (e._status === Ze || e._status === Me) {
                var d = e;
                d._status = vt, d._result = g;
              }
            }), e._status === Me) {
              var a = e;
              a._status = Ze, a._result = o;
            }
          }
          if (e._status === et) {
            var f = e._result;
            return f === void 0 && h(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, f), "default" in f || h(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, f), f.default;
          } else
            throw e._result;
        }
        function At(e) {
          var t = {
            // We use these fields to store the result.
            _status: Me,
            _result: e
          }, o = {
            $$typeof: pe,
            _payload: t,
            _init: $t
          };
          {
            var a, f;
            Object.defineProperties(o, {
              defaultProps: {
                configurable: !0,
                get: function() {
                  return a;
                },
                set: function(g) {
                  h("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), a = g, Object.defineProperty(o, "defaultProps", {
                    enumerable: !0
                  });
                }
              },
              propTypes: {
                configurable: !0,
                get: function() {
                  return f;
                },
                set: function(g) {
                  h("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), f = g, Object.defineProperty(o, "propTypes", {
                    enumerable: !0
                  });
                }
              }
            });
          }
          return o;
        }
        function Nt(e) {
          e != null && e.$$typeof === te ? h("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? h("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && h("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && h("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
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
              set: function(a) {
                o = a, !e.name && !e.displayName && (e.displayName = a);
              }
            });
          }
          return t;
        }
        var ht;
        ht = Symbol.for("react.module.reference");
        function r(e) {
          return !!(typeof e == "string" || typeof e == "function" || e === N || e === m || ae || e === M || e === E || e === U || re || e === Ve || Oe || Xe || Pe || typeof e == "object" && e !== null && (e.$$typeof === pe || e.$$typeof === te || e.$$typeof === v || e.$$typeof === V || e.$$typeof === L || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          e.$$typeof === ht || e.getModuleId !== void 0));
        }
        function s(e, t) {
          r(e) || h("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
          var o = {
            $$typeof: te,
            type: e,
            compare: t === void 0 ? null : t
          };
          {
            var a;
            Object.defineProperty(o, "displayName", {
              enumerable: !1,
              configurable: !0,
              get: function() {
                return a;
              },
              set: function(f) {
                a = f, !e.name && !e.displayName && (e.displayName = f);
              }
            });
          }
          return o;
        }
        function l() {
          var e = xe.current;
          return e === null && h(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
        }
        function y(e) {
          var t = l();
          if (e._context !== void 0) {
            var o = e._context;
            o.Consumer === e ? h("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : o.Provider === e && h("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
          }
          return t.useContext(e);
        }
        function O(e) {
          var t = l();
          return t.useState(e);
        }
        function $(e, t, o) {
          var a = l();
          return a.useReducer(e, t, o);
        }
        function C(e) {
          var t = l();
          return t.useRef(e);
        }
        function T(e, t) {
          var o = l();
          return o.useEffect(e, t);
        }
        function Z(e, t) {
          var o = l();
          return o.useInsertionEffect(e, t);
        }
        function H(e, t) {
          var o = l();
          return o.useLayoutEffect(e, t);
        }
        function K(e, t) {
          var o = l();
          return o.useCallback(e, t);
        }
        function ie(e, t) {
          var o = l();
          return o.useMemo(e, t);
        }
        function Ce(e, t, o) {
          var a = l();
          return a.useImperativeHandle(e, t, o);
        }
        function Re(e, t) {
          {
            var o = l();
            return o.useDebugValue(e, t);
          }
        }
        function ne() {
          var e = l();
          return e.useTransition();
        }
        function tt(e) {
          var t = l();
          return t.useDeferredValue(e);
        }
        function It() {
          var e = l();
          return e.useId();
        }
        function Ft(e, t, o) {
          var a = l();
          return a.useSyncExternalStore(e, t, o);
        }
        var rt = 0, Qt, Zt, er, tr, rr, nr, or;
        function ar() {
        }
        ar.__reactDisabledLog = !0;
        function Nr() {
          {
            if (rt === 0) {
              Qt = console.log, Zt = console.info, er = console.warn, tr = console.error, rr = console.group, nr = console.groupCollapsed, or = console.groupEnd;
              var e = {
                configurable: !0,
                enumerable: !0,
                value: ar,
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
            rt++;
          }
        }
        function Ir() {
          {
            if (rt--, rt === 0) {
              var e = {
                configurable: !0,
                enumerable: !0,
                writable: !0
              };
              Object.defineProperties(console, {
                log: u({}, e, {
                  value: Qt
                }),
                info: u({}, e, {
                  value: Zt
                }),
                warn: u({}, e, {
                  value: er
                }),
                error: u({}, e, {
                  value: tr
                }),
                group: u({}, e, {
                  value: rr
                }),
                groupCollapsed: u({}, e, {
                  value: nr
                }),
                groupEnd: u({}, e, {
                  value: or
                })
              });
            }
            rt < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
        var Mt = Q.ReactCurrentDispatcher, Vt;
        function gt(e, t, o) {
          {
            if (Vt === void 0)
              try {
                throw Error();
              } catch (f) {
                var a = f.stack.trim().match(/\n( *(at )?)/);
                Vt = a && a[1] || "";
              }
            return `
` + Vt + e;
          }
        }
        var Wt = !1, mt;
        {
          var Fr = typeof WeakMap == "function" ? WeakMap : Map;
          mt = new Fr();
        }
        function ir(e, t) {
          if (!e || Wt)
            return "";
          {
            var o = mt.get(e);
            if (o !== void 0)
              return o;
          }
          var a;
          Wt = !0;
          var f = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var g;
          g = Mt.current, Mt.current = null, Nr();
          try {
            if (t) {
              var d = function() {
                throw Error();
              };
              if (Object.defineProperty(d.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(d, []);
                } catch (ee) {
                  a = ee;
                }
                Reflect.construct(e, [], d);
              } else {
                try {
                  d.call();
                } catch (ee) {
                  a = ee;
                }
                e.call(d.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ee) {
                a = ee;
              }
              e();
            }
          } catch (ee) {
            if (ee && a && typeof ee.stack == "string") {
              for (var x = ee.stack.split(`
`), k = a.stack.split(`
`), F = x.length - 1, B = k.length - 1; F >= 1 && B >= 0 && x[F] !== k[B]; )
                B--;
              for (; F >= 1 && B >= 0; F--, B--)
                if (x[F] !== k[B]) {
                  if (F !== 1 || B !== 1)
                    do
                      if (F--, B--, B < 0 || x[F] !== k[B]) {
                        var Y = `
` + x[F].replace(" at new ", " at ");
                        return e.displayName && Y.includes("<anonymous>") && (Y = Y.replace("<anonymous>", e.displayName)), typeof e == "function" && mt.set(e, Y), Y;
                      }
                    while (F >= 1 && B >= 0);
                  break;
                }
            }
          } finally {
            Wt = !1, Mt.current = g, Ir(), Error.prepareStackTrace = f;
          }
          var q = e ? e.displayName || e.name : "", X = q ? gt(q) : "";
          return typeof e == "function" && mt.set(e, X), X;
        }
        function Mr(e, t, o) {
          return ir(e, !1);
        }
        function Vr(e) {
          var t = e.prototype;
          return !!(t && t.isReactComponent);
        }
        function yt(e, t, o) {
          if (e == null)
            return "";
          if (typeof e == "function")
            return ir(e, Vr(e));
          if (typeof e == "string")
            return gt(e);
          switch (e) {
            case E:
              return gt("Suspense");
            case U:
              return gt("SuspenseList");
          }
          if (typeof e == "object")
            switch (e.$$typeof) {
              case L:
                return Mr(e.render);
              case te:
                return yt(e.type, t, o);
              case pe: {
                var a = e, f = a._payload, g = a._init;
                try {
                  return yt(g(f), t, o);
                } catch {
                }
              }
            }
          return "";
        }
        var sr = {}, cr = Q.ReactDebugCurrentFrame;
        function bt(e) {
          if (e) {
            var t = e._owner, o = yt(e.type, e._source, t ? t.type : null);
            cr.setExtraStackFrame(o);
          } else
            cr.setExtraStackFrame(null);
        }
        function Wr(e, t, o, a, f) {
          {
            var g = Function.call.bind(Ae);
            for (var d in e)
              if (g(e, d)) {
                var x = void 0;
                try {
                  if (typeof e[d] != "function") {
                    var k = Error((a || "React class") + ": " + o + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    throw k.name = "Invariant Violation", k;
                  }
                  x = e[d](t, d, a, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (F) {
                  x = F;
                }
                x && !(x instanceof Error) && (bt(f), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", o, d, typeof x), bt(null)), x instanceof Error && !(x.message in sr) && (sr[x.message] = !0, bt(f), h("Failed %s type: %s", o, x.message), bt(null));
              }
          }
        }
        function He(e) {
          if (e) {
            var t = e._owner, o = yt(e.type, e._source, t ? t.type : null);
            ke(o);
          } else
            ke(null);
        }
        var Ut;
        Ut = !1;
        function ur() {
          if (oe.current) {
            var e = ge(oe.current.type);
            if (e)
              return `

Check the render method of \`` + e + "`.";
          }
          return "";
        }
        function Ur(e) {
          if (e !== void 0) {
            var t = e.fileName.replace(/^.*[\\\/]/, ""), o = e.lineNumber;
            return `

Check your code at ` + t + ":" + o + ".";
          }
          return "";
        }
        function Br(e) {
          return e != null ? Ur(e.__source) : "";
        }
        var lr = {};
        function Yr(e) {
          var t = ur();
          if (!t) {
            var o = typeof e == "string" ? e : e.displayName || e.name;
            o && (t = `

Check the top-level render call using <` + o + ">.");
          }
          return t;
        }
        function fr(e, t) {
          if (!(!e._store || e._store.validated || e.key != null)) {
            e._store.validated = !0;
            var o = Yr(t);
            if (!lr[o]) {
              lr[o] = !0;
              var a = "";
              e && e._owner && e._owner !== oe.current && (a = " It was passed a child from " + ge(e._owner.type) + "."), He(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', o, a), He(null);
            }
          }
        }
        function dr(e, t) {
          if (typeof e == "object") {
            if (We(e))
              for (var o = 0; o < e.length; o++) {
                var a = e[o];
                Te(a) && fr(a, t);
              }
            else if (Te(e))
              e._store && (e._store.validated = !0);
            else if (e) {
              var f = z(e);
              if (typeof f == "function" && f !== e.entries)
                for (var g = f.call(e), d; !(d = g.next()).done; )
                  Te(d.value) && fr(d.value, t);
            }
          }
        }
        function pr(e) {
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
              var a = ge(t);
              Wr(o, e.props, "prop", a, e);
            } else if (t.PropTypes !== void 0 && !Ut) {
              Ut = !0;
              var f = ge(t);
              h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", f || "Unknown");
            }
            typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
        function zr(e) {
          {
            for (var t = Object.keys(e.props), o = 0; o < t.length; o++) {
              var a = t[o];
              if (a !== "children" && a !== "key") {
                He(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), He(null);
                break;
              }
            }
            e.ref !== null && (He(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), He(null));
          }
        }
        function vr(e, t, o) {
          var a = r(e);
          if (!a) {
            var f = "";
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (f += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var g = Br(t);
            g ? f += g : f += ur();
            var d;
            e === null ? d = "null" : We(e) ? d = "array" : e !== void 0 && e.$$typeof === b ? (d = "<" + (ge(e.type) || "Unknown") + " />", f = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, h("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, f);
          }
          var x = Ct.apply(this, arguments);
          if (x == null)
            return x;
          if (a)
            for (var k = 2; k < arguments.length; k++)
              dr(arguments[k], e);
          return e === N ? zr(x) : pr(x), x;
        }
        var hr = !1;
        function Hr(e) {
          var t = vr.bind(null, e);
          return t.type = e, hr || (hr = !0, fe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(t, "type", {
            enumerable: !1,
            get: function() {
              return fe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
                value: e
              }), e;
            }
          }), t;
        }
        function qr(e, t, o) {
          for (var a = kt.apply(this, arguments), f = 2; f < arguments.length; f++)
            dr(arguments[f], a.type);
          return pr(a), a;
        }
        function Kr(e, t) {
          var o = le.transition;
          le.transition = {};
          var a = le.transition;
          le.transition._updatedFibers = /* @__PURE__ */ new Set();
          try {
            e();
          } finally {
            if (le.transition = o, o === null && a._updatedFibers) {
              var f = a._updatedFibers.size;
              f > 10 && fe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), a._updatedFibers.clear();
            }
          }
        }
        var gr = !1, _t = null;
        function Gr(e) {
          if (_t === null)
            try {
              var t = ("require" + Math.random()).slice(0, 7), o = _ && _[t];
              _t = o.call(_, "timers").setImmediate;
            } catch {
              _t = function(f) {
                gr === !1 && (gr = !0, typeof MessageChannel > "u" && h("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
                var g = new MessageChannel();
                g.port1.onmessage = f, g.port2.postMessage(void 0);
              };
            }
          return _t(e);
        }
        var qe = 0, mr = !1;
        function yr(e) {
          {
            var t = qe;
            qe++, G.current === null && (G.current = []);
            var o = G.isBatchingLegacy, a;
            try {
              if (G.isBatchingLegacy = !0, a = e(), !o && G.didScheduleLegacyUpdate) {
                var f = G.current;
                f !== null && (G.didScheduleLegacyUpdate = !1, zt(f));
              }
            } catch (q) {
              throw Rt(t), q;
            } finally {
              G.isBatchingLegacy = o;
            }
            if (a !== null && typeof a == "object" && typeof a.then == "function") {
              var g = a, d = !1, x = {
                then: function(q, X) {
                  d = !0, g.then(function(ee) {
                    Rt(t), qe === 0 ? Bt(ee, q, X) : q(ee);
                  }, function(ee) {
                    Rt(t), X(ee);
                  });
                }
              };
              return !mr && typeof Promise < "u" && Promise.resolve().then(function() {
              }).then(function() {
                d || (mr = !0, h("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
              }), x;
            } else {
              var k = a;
              if (Rt(t), qe === 0) {
                var F = G.current;
                F !== null && (zt(F), G.current = null);
                var B = {
                  then: function(q, X) {
                    G.current === null ? (G.current = [], Bt(k, q, X)) : q(k);
                  }
                };
                return B;
              } else {
                var Y = {
                  then: function(q, X) {
                    q(k);
                  }
                };
                return Y;
              }
            }
          }
        }
        function Rt(e) {
          e !== qe - 1 && h("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), qe = e;
        }
        function Bt(e, t, o) {
          {
            var a = G.current;
            if (a !== null)
              try {
                zt(a), Gr(function() {
                  a.length === 0 ? (G.current = null, t(e)) : Bt(e, t, o);
                });
              } catch (f) {
                o(f);
              }
            else
              t(e);
          }
        }
        var Yt = !1;
        function zt(e) {
          if (!Yt) {
            Yt = !0;
            var t = 0;
            try {
              for (; t < e.length; t++) {
                var o = e[t];
                do
                  o = o(!0);
                while (o !== null);
              }
              e.length = 0;
            } catch (a) {
              throw e = e.slice(t + 1), a;
            } finally {
              Yt = !1;
            }
          }
        }
        var Jr = vr, Xr = qr, Qr = Hr, Zr = {
          map: Fe,
          forEach: ft,
          count: Lt,
          toArray: Dt,
          only: dt
        };
        c.Children = Zr, c.Component = j, c.Fragment = N, c.Profiler = m, c.PureComponent = D, c.StrictMode = M, c.Suspense = E, c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q, c.act = yr, c.cloneElement = Xr, c.createContext = pt, c.createElement = Jr, c.createFactory = Qr, c.createRef = wt, c.forwardRef = Nt, c.isValidElement = Te, c.lazy = At, c.memo = s, c.startTransition = Kr, c.unstable_act = yr, c.useCallback = K, c.useContext = y, c.useDebugValue = Re, c.useDeferredValue = tt, c.useEffect = T, c.useId = It, c.useImperativeHandle = Ce, c.useInsertionEffect = Z, c.useLayoutEffect = H, c.useMemo = ie, c.useReducer = $, c.useRef = C, c.useState = O, c.useSyncExternalStore = Ft, c.useTransition = ne, c.version = p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
      }();
    }(Ke, Ke.exports)), Ke.exports;
  }
  process.env.NODE_ENV === "production" ? se.exports = xr() : se.exports = Er();
  var de = se.exports;
  const Gt = /* @__PURE__ */ je(de), wr = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-plugin-rtl-support",
    version: "1.0.1",
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
  var Et = { exports: {} }, Ge = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Jt;
  function Tr() {
    if (Jt)
      return Ge;
    Jt = 1;
    var _ = de, c = Symbol.for("react.element"), p = Symbol.for("react.fragment"), b = Object.prototype.hasOwnProperty, w = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, N = { key: !0, ref: !0, __self: !0, __source: !0 };
    function M(m, v, V) {
      var L, E = {}, U = null, te = null;
      V !== void 0 && (U = "" + V), v.key !== void 0 && (U = "" + v.key), v.ref !== void 0 && (te = v.ref);
      for (L in v)
        b.call(v, L) && !N.hasOwnProperty(L) && (E[L] = v[L]);
      if (m && m.defaultProps)
        for (L in v = m.defaultProps, v)
          E[L] === void 0 && (E[L] = v[L]);
      return { $$typeof: c, type: m, key: U, ref: te, props: E, _owner: w.current };
    }
    return Ge.Fragment = p, Ge.jsx = M, Ge.jsxs = M, Ge;
  }
  var Je = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var Xt;
  function Sr() {
    return Xt || (Xt = 1, process.env.NODE_ENV !== "production" && function() {
      var _ = de, c = Symbol.for("react.element"), p = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), M = Symbol.for("react.provider"), m = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), te = Symbol.for("react.offscreen"), pe = Symbol.iterator, Ve = "@@iterator";
      function ce(r) {
        if (r === null || typeof r != "object")
          return null;
        var s = pe && r[pe] || r[Ve];
        return typeof s == "function" ? s : null;
      }
      var ue = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function z(r) {
        {
          for (var s = arguments.length, l = new Array(s > 1 ? s - 1 : 0), y = 1; y < s; y++)
            l[y - 1] = arguments[y];
          xe("error", r, l);
        }
      }
      function xe(r, s, l) {
        {
          var y = ue.ReactDebugCurrentFrame, O = y.getStackAddendum();
          O !== "" && (s += "%s", l = l.concat([O]));
          var $ = l.map(function(C) {
            return String(C);
          });
          $.unshift("Warning: " + s), Function.prototype.apply.call(console[r], console, $);
        }
      }
      var le = !1, G = !1, oe = !1, ve = !1, ye = !1, ke;
      ke = Symbol.for("react.module.reference");
      function Oe(r) {
        return !!(typeof r == "string" || typeof r == "function" || r === b || r === N || ye || r === w || r === V || r === L || ve || r === te || le || G || oe || typeof r == "object" && r !== null && (r.$$typeof === U || r.$$typeof === E || r.$$typeof === M || r.$$typeof === m || r.$$typeof === v || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        r.$$typeof === ke || r.getModuleId !== void 0));
      }
      function Xe(r, s, l) {
        var y = r.displayName;
        if (y)
          return y;
        var O = s.displayName || s.name || "";
        return O !== "" ? l + "(" + O + ")" : l;
      }
      function Pe(r) {
        return r.displayName || "Context";
      }
      function re(r) {
        if (r == null)
          return null;
        if (typeof r.tag == "number" && z("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
          return r.displayName || r.name || null;
        if (typeof r == "string")
          return r;
        switch (r) {
          case b:
            return "Fragment";
          case p:
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
            case m:
              var s = r;
              return Pe(s) + ".Consumer";
            case M:
              var l = r;
              return Pe(l._context) + ".Provider";
            case v:
              return Xe(r, r.render, "ForwardRef");
            case E:
              var y = r.displayName || null;
              return y !== null ? y : re(r.type) || "Memo";
            case U: {
              var O = r, $ = O._payload, C = O._init;
              try {
                return re(C($));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var ae = Object.assign, Q = 0, fe, h, he, Le, be, n, u;
      function S() {
      }
      S.__reactDisabledLog = !0;
      function j() {
        {
          if (Q === 0) {
            fe = console.log, h = console.info, he = console.warn, Le = console.error, be = console.group, n = console.groupCollapsed, u = console.groupEnd;
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
      function P() {
        {
          if (Q--, Q === 0) {
            var r = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: ae({}, r, {
                value: fe
              }),
              info: ae({}, r, {
                value: h
              }),
              warn: ae({}, r, {
                value: he
              }),
              error: ae({}, r, {
                value: Le
              }),
              group: ae({}, r, {
                value: be
              }),
              groupCollapsed: ae({}, r, {
                value: n
              }),
              groupEnd: ae({}, r, {
                value: u
              })
            });
          }
          Q < 0 && z("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var W = ue.ReactCurrentDispatcher, I;
      function A(r, s, l) {
        {
          if (I === void 0)
            try {
              throw Error();
            } catch (O) {
              var y = O.stack.trim().match(/\n( *(at )?)/);
              I = y && y[1] || "";
            }
          return `
` + I + r;
        }
      }
      var D = !1, J;
      {
        var wt = typeof WeakMap == "function" ? WeakMap : Map;
        J = new wt();
      }
      function nt(r, s) {
        if (!r || D)
          return "";
        {
          var l = J.get(r);
          if (l !== void 0)
            return l;
        }
        var y;
        D = !0;
        var O = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var $;
        $ = W.current, W.current = null, j();
        try {
          if (s) {
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
              } catch (ne) {
                y = ne;
              }
              Reflect.construct(r, [], C);
            } else {
              try {
                C.call();
              } catch (ne) {
                y = ne;
              }
              r.call(C.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (ne) {
              y = ne;
            }
            r();
          }
        } catch (ne) {
          if (ne && y && typeof ne.stack == "string") {
            for (var T = ne.stack.split(`
`), Z = y.stack.split(`
`), H = T.length - 1, K = Z.length - 1; H >= 1 && K >= 0 && T[H] !== Z[K]; )
              K--;
            for (; H >= 1 && K >= 0; H--, K--)
              if (T[H] !== Z[K]) {
                if (H !== 1 || K !== 1)
                  do
                    if (H--, K--, K < 0 || T[H] !== Z[K]) {
                      var ie = `
` + T[H].replace(" at new ", " at ");
                      return r.displayName && ie.includes("<anonymous>") && (ie = ie.replace("<anonymous>", r.displayName)), typeof r == "function" && J.set(r, ie), ie;
                    }
                  while (H >= 1 && K >= 0);
                break;
              }
          }
        } finally {
          D = !1, W.current = $, P(), Error.prepareStackTrace = O;
        }
        var Ce = r ? r.displayName || r.name : "", Re = Ce ? A(Ce) : "";
        return typeof r == "function" && J.set(r, Re), Re;
      }
      function We(r, s, l) {
        return nt(r, !1);
      }
      function Tt(r) {
        var s = r.prototype;
        return !!(s && s.isReactComponent);
      }
      function Ue(r, s, l) {
        if (r == null)
          return "";
        if (typeof r == "function")
          return nt(r, Tt(r));
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
            case v:
              return We(r.render);
            case E:
              return Ue(r.type, s, l);
            case U: {
              var y = r, O = y._payload, $ = y._init;
              try {
                return Ue($(O), s, l);
              } catch {
              }
            }
          }
        return "";
      }
      var Ee = Object.prototype.hasOwnProperty, De = {}, ot = ue.ReactDebugCurrentFrame;
      function $e(r) {
        if (r) {
          var s = r._owner, l = Ue(r.type, r._source, s ? s.type : null);
          ot.setExtraStackFrame(l);
        } else
          ot.setExtraStackFrame(null);
      }
      function ge(r, s, l, y, O) {
        {
          var $ = Function.call.bind(Ee);
          for (var C in r)
            if ($(r, C)) {
              var T = void 0;
              try {
                if (typeof r[C] != "function") {
                  var Z = Error((y || "React class") + ": " + l + " type `" + C + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[C] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Z.name = "Invariant Violation", Z;
                }
                T = r[C](s, C, y, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (H) {
                T = H;
              }
              T && !(T instanceof Error) && ($e(O), z("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", y || "React class", l, C, typeof T), $e(null)), T instanceof Error && !(T.message in De) && (De[T.message] = !0, $e(O), z("Failed %s type: %s", l, T.message), $e(null));
            }
        }
      }
      var Ae = Array.isArray;
      function Be(r) {
        return Ae(r);
      }
      function at(r) {
        {
          var s = typeof Symbol == "function" && Symbol.toStringTag, l = s && r[Symbol.toStringTag] || r.constructor.name || "Object";
          return l;
        }
      }
      function it(r) {
        try {
          return Ye(r), !1;
        } catch {
          return !0;
        }
      }
      function Ye(r) {
        return "" + r;
      }
      function Qe(r) {
        if (it(r))
          return z("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", at(r)), Ye(r);
      }
      var we = ue.ReactCurrentOwner, St = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, st, ct, Ne;
      Ne = {};
      function Ct(r) {
        if (Ee.call(r, "ref")) {
          var s = Object.getOwnPropertyDescriptor(r, "ref").get;
          if (s && s.isReactWarning)
            return !1;
        }
        return r.ref !== void 0;
      }
      function jt(r) {
        if (Ee.call(r, "key")) {
          var s = Object.getOwnPropertyDescriptor(r, "key").get;
          if (s && s.isReactWarning)
            return !1;
        }
        return r.key !== void 0;
      }
      function kt(r, s) {
        if (typeof r.ref == "string" && we.current && s && we.current.stateNode !== s) {
          var l = re(we.current.type);
          Ne[l] || (z('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', re(we.current.type), r.ref), Ne[l] = !0);
        }
      }
      function Te(r, s) {
        {
          var l = function() {
            st || (st = !0, z("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
          };
          l.isReactWarning = !0, Object.defineProperty(r, "key", {
            get: l,
            configurable: !0
          });
        }
      }
      function ut(r, s) {
        {
          var l = function() {
            ct || (ct = !0, z("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
          };
          l.isReactWarning = !0, Object.defineProperty(r, "ref", {
            get: l,
            configurable: !0
          });
        }
      }
      var Ot = function(r, s, l, y, O, $, C) {
        var T = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: c,
          // Built-in properties that belong on the element
          type: r,
          key: s,
          ref: l,
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
          value: y
        }), Object.defineProperty(T, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: O
        }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
      };
      function Pt(r, s, l, y, O) {
        {
          var $, C = {}, T = null, Z = null;
          l !== void 0 && (Qe(l), T = "" + l), jt(s) && (Qe(s.key), T = "" + s.key), Ct(s) && (Z = s.ref, kt(s, O));
          for ($ in s)
            Ee.call(s, $) && !St.hasOwnProperty($) && (C[$] = s[$]);
          if (r && r.defaultProps) {
            var H = r.defaultProps;
            for ($ in H)
              C[$] === void 0 && (C[$] = H[$]);
          }
          if (T || Z) {
            var K = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
            T && Te(C, K), Z && ut(C, K);
          }
          return Ot(r, T, Z, O, y, we.current, C);
        }
      }
      var ze = ue.ReactCurrentOwner, lt = ue.ReactDebugCurrentFrame;
      function _e(r) {
        if (r) {
          var s = r._owner, l = Ue(r.type, r._source, s ? s.type : null);
          lt.setExtraStackFrame(l);
        } else
          lt.setExtraStackFrame(null);
      }
      var Ie;
      Ie = !1;
      function Se(r) {
        return typeof r == "object" && r !== null && r.$$typeof === c;
      }
      function Fe() {
        {
          if (ze.current) {
            var r = re(ze.current.type);
            if (r)
              return `

Check the render method of \`` + r + "`.";
          }
          return "";
        }
      }
      function Lt(r) {
        {
          if (r !== void 0) {
            var s = r.fileName.replace(/^.*[\\\/]/, ""), l = r.lineNumber;
            return `

Check your code at ` + s + ":" + l + ".";
          }
          return "";
        }
      }
      var ft = {};
      function Dt(r) {
        {
          var s = Fe();
          if (!s) {
            var l = typeof r == "string" ? r : r.displayName || r.name;
            l && (s = `

Check the top-level render call using <` + l + ">.");
          }
          return s;
        }
      }
      function dt(r, s) {
        {
          if (!r._store || r._store.validated || r.key != null)
            return;
          r._store.validated = !0;
          var l = Dt(s);
          if (ft[l])
            return;
          ft[l] = !0;
          var y = "";
          r && r._owner && r._owner !== ze.current && (y = " It was passed a child from " + re(r._owner.type) + "."), _e(r), z('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, y), _e(null);
        }
      }
      function pt(r, s) {
        {
          if (typeof r != "object")
            return;
          if (Be(r))
            for (var l = 0; l < r.length; l++) {
              var y = r[l];
              Se(y) && dt(y, s);
            }
          else if (Se(r))
            r._store && (r._store.validated = !0);
          else if (r) {
            var O = ce(r);
            if (typeof O == "function" && O !== r.entries)
              for (var $ = O.call(r), C; !(C = $.next()).done; )
                Se(C.value) && dt(C.value, s);
          }
        }
      }
      function Me(r) {
        {
          var s = r.type;
          if (s == null || typeof s == "string")
            return;
          var l;
          if (typeof s == "function")
            l = s.propTypes;
          else if (typeof s == "object" && (s.$$typeof === v || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          s.$$typeof === E))
            l = s.propTypes;
          else
            return;
          if (l) {
            var y = re(s);
            ge(l, r.props, "prop", y, r);
          } else if (s.PropTypes !== void 0 && !Ie) {
            Ie = !0;
            var O = re(s);
            z("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", O || "Unknown");
          }
          typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && z("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Ze(r) {
        {
          for (var s = Object.keys(r.props), l = 0; l < s.length; l++) {
            var y = s[l];
            if (y !== "children" && y !== "key") {
              _e(r), z("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", y), _e(null);
              break;
            }
          }
          r.ref !== null && (_e(r), z("Invalid attribute `ref` supplied to `React.Fragment`."), _e(null));
        }
      }
      var et = {};
      function vt(r, s, l, y, O, $) {
        {
          var C = Oe(r);
          if (!C) {
            var T = "";
            (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var Z = Lt(O);
            Z ? T += Z : T += Fe();
            var H;
            r === null ? H = "null" : Be(r) ? H = "array" : r !== void 0 && r.$$typeof === c ? (H = "<" + (re(r.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : H = typeof r, z("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", H, T);
          }
          var K = Pt(r, s, l, O, $);
          if (K == null)
            return K;
          if (C) {
            var ie = s.children;
            if (ie !== void 0)
              if (y)
                if (Be(ie)) {
                  for (var Ce = 0; Ce < ie.length; Ce++)
                    pt(ie[Ce], r);
                  Object.freeze && Object.freeze(ie);
                } else
                  z("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                pt(ie, r);
          }
          if (Ee.call(s, "key")) {
            var Re = re(r), ne = Object.keys(s).filter(function(Ft) {
              return Ft !== "key";
            }), tt = ne.length > 0 ? "{key: someKey, " + ne.join(": ..., ") + ": ...}" : "{key: someKey}";
            if (!et[Re + tt]) {
              var It = ne.length > 0 ? "{" + ne.join(": ..., ") + ": ...}" : "{}";
              z(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, tt, Re, It, Re), et[Re + tt] = !0;
            }
          }
          return r === b ? Ze(K) : Me(K), K;
        }
      }
      function $t(r, s, l) {
        return vt(r, s, l, !0);
      }
      function At(r, s, l) {
        return vt(r, s, l, !1);
      }
      var Nt = At, ht = $t;
      Je.Fragment = b, Je.jsx = Nt, Je.jsxs = ht;
    }()), Je;
  }
  process.env.NODE_ENV === "production" ? Et.exports = Tr() : Et.exports = Sr();
  var i = Et.exports;
  function Cr({ detector: _, styler: c }) {
    const [p, b] = de.useState({
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
      p.isEnabled ? c.startObserving() : c.stopObserving();
    }, [p.isEnabled, c]);
    const w = () => {
      b((v) => ({ ...v, isEnabled: !v.isEnabled }));
    }, N = (v) => {
      const V = { ...p.detectionConfig, ...v };
      _.updateConfig(V), b((L) => ({
        ...L,
        detectionConfig: V
      }));
    }, M = (v) => {
      const V = { ...p.styleConfig, ...v };
      c.updateConfig(V), b((L) => ({
        ...L,
        styleConfig: V
      }));
    }, m = (v) => {
      const V = _.detectRTL(v);
      return b((L) => ({
        ...L,
        stats: {
          totalProcessed: L.stats.totalProcessed + 1,
          rtlDetected: L.stats.rtlDetected + (V ? 1 : 0)
        }
      })), V;
    };
    return /* @__PURE__ */ i.jsxs("div", { className: "rtl-plugin-container", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "plugin-header", children: [
        /* @__PURE__ */ i.jsx("h2", { children: "RTL Language Support" }),
        /* @__PURE__ */ i.jsxs("div", { className: "plugin-status", children: [
          /* @__PURE__ */ i.jsxs("label", { className: "switch", children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: p.isEnabled,
                onChange: w
              }
            ),
            /* @__PURE__ */ i.jsx("span", { className: "slider" })
          ] }),
          /* @__PURE__ */ i.jsx("span", { children: p.isEnabled ? "Enabled" : "Disabled" })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "plugin-content", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ i.jsx("h3", { children: "Detection Settings" }),
          /* @__PURE__ */ i.jsxs("div", { className: "setting-group", children: [
            /* @__PURE__ */ i.jsx("label", { children: "Sensitivity:" }),
            /* @__PURE__ */ i.jsxs(
              "select",
              {
                value: p.detectionConfig.sensitivity,
                onChange: (v) => N({
                  sensitivity: v.target.value
                }),
                children: [
                  /* @__PURE__ */ i.jsx("option", { value: "high", children: "High (10%)" }),
                  /* @__PURE__ */ i.jsx("option", { value: "medium", children: "Medium (20%)" }),
                  /* @__PURE__ */ i.jsx("option", { value: "low", children: "Low (40%)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "setting-group", children: [
            /* @__PURE__ */ i.jsx("label", { children: "Min RTL Characters:" }),
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "number",
                min: "1",
                max: "20",
                value: p.detectionConfig.minRTLChars,
                onChange: (v) => N({
                  minRTLChars: parseInt(v.target.value)
                })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ i.jsx("h3", { children: "Style Settings" }),
          /* @__PURE__ */ i.jsxs("div", { className: "setting-group", children: [
            /* @__PURE__ */ i.jsx("label", { children: "Direction Mode:" }),
            /* @__PURE__ */ i.jsxs(
              "select",
              {
                value: p.styleConfig.forceDirection,
                onChange: (v) => M({
                  forceDirection: v.target.value
                }),
                children: [
                  /* @__PURE__ */ i.jsx("option", { value: "auto", children: "Auto Detect" }),
                  /* @__PURE__ */ i.jsx("option", { value: "rtl", children: "Force RTL" }),
                  /* @__PURE__ */ i.jsx("option", { value: "ltr", children: "Force LTR" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "setting-group", children: /* @__PURE__ */ i.jsxs("label", { children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: p.styleConfig.autoDetect,
                onChange: (v) => M({
                  autoDetect: v.target.checked
                })
              }
            ),
            "Auto-detect new content"
          ] }) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ i.jsx("h3", { children: "Statistics" }),
          /* @__PURE__ */ i.jsxs("div", { className: "stats", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "stat-item", children: [
              /* @__PURE__ */ i.jsx("span", { children: "Total Processed:" }),
              /* @__PURE__ */ i.jsx("span", { children: p.stats.totalProcessed })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "stat-item", children: [
              /* @__PURE__ */ i.jsx("span", { children: "RTL Detected:" }),
              /* @__PURE__ */ i.jsx("span", { children: p.stats.rtlDetected })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "stat-item", children: [
              /* @__PURE__ */ i.jsx("span", { children: "Detection Rate:" }),
              /* @__PURE__ */ i.jsxs("span", { children: [
                p.stats.totalProcessed > 0 ? Math.round(p.stats.rtlDetected / p.stats.totalProcessed * 100) : 0,
                "%"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ i.jsx("h3", { children: "Test Detection" }),
          /* @__PURE__ */ i.jsxs("div", { className: "test-area", children: [
            /* @__PURE__ */ i.jsx(
              "textarea",
              {
                placeholder: "Enter text to test RTL detection...",
                onBlur: (v) => {
                  const V = m(v.target.value);
                  alert(`Text is ${V ? "RTL" : "LTR"}`);
                }
              }
            ),
            /* @__PURE__ */ i.jsxs("p", { className: "test-examples", children: [
              "Try these examples:",
              /* @__PURE__ */ i.jsx("br", {}),
              "Hebrew: שלום עולם - זהו טקסט בעברית",
              /* @__PURE__ */ i.jsx("br", {}),
              "Arabic: مرحبا بالعالم - هذا نص باللغة العربية",
              /* @__PURE__ */ i.jsx("br", {}),
              "English: Hello world - this is English text"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("style", { children: `
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
  function jr() {
    const [_, c] = de.useState({
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
    }), [p, b] = de.useState(""), [w, N] = de.useState("idle"), M = de.useRef(null);
    de.useEffect(() => {
      const E = localStorage.getItem("blinko-rtl-settings");
      if (E)
        try {
          const U = JSON.parse(E);
          c((te) => ({ ...te, ...U }));
        } catch (U) {
          console.error("Failed to load RTL plugin settings:", U);
        }
      return () => {
        M.current && clearTimeout(M.current);
      };
    }, []);
    const m = (E) => {
      N("saving");
      const U = { ..._, ...E };
      c(U), localStorage.setItem("blinko-rtl-settings", JSON.stringify(U)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: U
        })
      ), M.current && clearTimeout(M.current), M.current = window.setTimeout(() => {
        N("saved"), M.current = window.setTimeout(() => N("idle"), 2e3);
      }, 300);
    }, v = () => {
      p.trim() && !_.customSelectors.includes(p.trim()) && (m({
        customSelectors: [..._.customSelectors, p.trim()]
      }), b(""));
    }, V = (E) => {
      m({
        customSelectors: _.customSelectors.filter((U) => U !== E)
      });
    }, L = () => {
      m({
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
    return /* @__PURE__ */ i.jsxs("div", { className: "rtl-settings-panel", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "settings-header", children: [
        /* @__PURE__ */ i.jsx("h2", { children: "RTL Language Support Settings" }),
        /* @__PURE__ */ i.jsx("p", { children: "Configure automatic RTL detection and styling for Hebrew, Arabic, and other right-to-left languages." })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-content", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "setting-section", children: [
          /* @__PURE__ */ i.jsx("h3", { children: "General Settings" }),
          /* @__PURE__ */ i.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ i.jsxs("label", { className: "setting-label", children: [
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: _.enabled,
                  onChange: (E) => m({ enabled: E.target.checked })
                }
              ),
              /* @__PURE__ */ i.jsx("span", { children: "Enable RTL Support" })
            ] }),
            /* @__PURE__ */ i.jsx("p", { className: "setting-description", children: "Automatically detect and apply RTL styling to content" })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ i.jsxs("label", { className: "setting-label", children: [
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: _.autoDetect,
                  onChange: (E) => m({ autoDetect: E.target.checked }),
                  disabled: !_.enabled
                }
              ),
              /* @__PURE__ */ i.jsx("span", { children: "Auto-detect New Content" })
            ] }),
            /* @__PURE__ */ i.jsx("p", { className: "setting-description", children: "Automatically process new content as it appears" })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "setting-section", children: [
          /* @__PURE__ */ i.jsx("h3", { children: "Detection Settings" }),
          /* @__PURE__ */ i.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ i.jsx("label", { className: "setting-label", children: "Detection Sensitivity" }),
            /* @__PURE__ */ i.jsxs(
              "select",
              {
                value: _.sensitivity,
                onChange: (E) => m({
                  sensitivity: E.target.value
                }),
                disabled: !_.enabled,
                children: [
                  /* @__PURE__ */ i.jsx("option", { value: "high", children: "High - 10% RTL characters" }),
                  /* @__PURE__ */ i.jsx("option", { value: "medium", children: "Medium - 20% RTL characters" }),
                  /* @__PURE__ */ i.jsx("option", { value: "low", children: "Low - 40% RTL characters" })
                ]
              }
            ),
            /* @__PURE__ */ i.jsx("p", { className: "setting-description", children: "Minimum percentage of RTL characters needed to trigger RTL styling" })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ i.jsx("label", { className: "setting-label", children: "Direction Override" }),
            /* @__PURE__ */ i.jsxs(
              "select",
              {
                value: _.forceDirection,
                onChange: (E) => m({
                  forceDirection: E.target.value
                }),
                disabled: !_.enabled,
                children: [
                  /* @__PURE__ */ i.jsx("option", { value: "auto", children: "Auto-detect" }),
                  /* @__PURE__ */ i.jsx("option", { value: "rtl", children: "Always RTL" }),
                  /* @__PURE__ */ i.jsx("option", { value: "ltr", children: "Always LTR" })
                ]
              }
            ),
            /* @__PURE__ */ i.jsx("p", { className: "setting-description", children: "Override automatic detection with forced direction" })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "setting-section", children: [
          /* @__PURE__ */ i.jsx("h3", { children: "CSS Selectors" }),
          /* @__PURE__ */ i.jsx("p", { className: "section-description", children: "Define which elements should be processed for RTL detection" }),
          /* @__PURE__ */ i.jsx("div", { className: "selector-list", children: _.customSelectors.map((E, U) => /* @__PURE__ */ i.jsxs("div", { className: "selector-item", children: [
            /* @__PURE__ */ i.jsx("code", { children: E }),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                onClick: () => V(E),
                className: "remove-btn",
                disabled: !_.enabled,
                children: "×"
              }
            )
          ] }, U)) }),
          /* @__PURE__ */ i.jsxs("div", { className: "add-selector", children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "text",
                value: p,
                onChange: (E) => b(E.target.value),
                placeholder: "Enter CSS selector (e.g., .my-content)",
                disabled: !_.enabled,
                onKeyPress: (E) => E.key === "Enter" && v()
              }
            ),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                onClick: v,
                disabled: !_.enabled || !p.trim(),
                children: "Add Selector"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "setting-section", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "advanced-header", children: [
            /* @__PURE__ */ i.jsx("h3", { children: "Advanced" }),
            /* @__PURE__ */ i.jsx(
              "span",
              {
                className: `save-status ${w !== "idle" ? "visible" : ""}`,
                children: w === "saving" ? "Saving..." : w === "saved" ? "Settings Saved!" : ""
              }
            )
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "setting-actions", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                onClick: L,
                className: "reset-btn",
                children: "Reset to Defaults"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  const E = JSON.stringify(_, null, 2);
                  navigator.clipboard.writeText(E), alert("Settings copied to clipboard");
                },
                className: "export-btn",
                children: "Export Settings"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("style", { children: `
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
  class kr {
    constructor(c = {
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
      this.config = c;
    }
    /**
     * Check if a character is RTL
     */
    isRTLChar(c) {
      const p = c.charCodeAt(0);
      return this.RTL_RANGES.some(([b, w]) => p >= b && p <= w);
    }
    /**
     * Detect RTL content in text
     */
    detectRTL(c) {
      if (!c || c.length === 0)
        return !1;
      const p = c.substring(0, this.config.sampleSize);
      let b = 0, w = 0;
      for (const m of p)
        /\s|[.,!?;:()[\]{}]/.test(m) || (w++, this.isRTLChar(m) && b++);
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
    detectRTLInSegments(c) {
      return c.map((p) => this.detectRTL(p));
    }
    /**
     * Update detection configuration
     */
    updateConfig(c) {
      this.config = { ...this.config, ...c };
    }
  }
  function Or(_, c) {
    let p;
    return function(...w) {
      const N = () => {
        p = null, _(...w);
      };
      p && clearTimeout(p), p = setTimeout(N, c);
    };
  }
  class Pr {
    constructor(c, p = {
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
      this.detector = c, this.config = p, this.injectRTLStyles(), this.debouncedProcessElement = Or(this.processElement.bind(this), 150);
    }
    /**
     * Inject RTL CSS styles into document
     */
    injectRTLStyles() {
      if (document.getElementById("blinko-rtl-styles"))
        return;
      const c = document.createElement("style");
      c.id = "blinko-rtl-styles", c.textContent = `
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
    `, document.head.appendChild(c);
    }
    /**
     * Apply RTL styling to element
     */
    applyRTL(c, p) {
      this.config.forceDirection !== "auto" && (p = this.config.forceDirection === "rtl"), c.classList.remove("blinko-rtl-content", "blinko-ltr-content"), c.classList.add("blinko-direction-transition"), p ? (c.classList.add("blinko-rtl-content"), c.setAttribute("dir", "rtl")) : (c.classList.add("blinko-ltr-content"), c.setAttribute("dir", "ltr"));
    }
    /**
     * Start observing DOM for changes
     */
    startObserving() {
      this.observer || (this.observer = new MutationObserver((c) => {
        c.forEach((p) => {
          if (p.type === "childList")
            p.addedNodes.forEach((b) => {
              b.nodeType === Node.ELEMENT_NODE && this.debouncedProcessElement(b);
            });
          else if (p.type === "characterData") {
            const b = p.target.parentElement;
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
    processElement(c) {
      if (!this.config.autoDetect)
        return;
      if (this.config.applyToSelectors.some(
        (b) => {
          var w, N;
          return ((w = c.matches) == null ? void 0 : w.call(c, b)) || ((N = c.querySelector) == null ? void 0 : N.call(c, b));
        }
      )) {
        const b = c.textContent || c.value || "";
        if (b) {
          const w = this.detector.detectRTL(b);
          this.applyRTL(c, w);
        }
      }
    }
    /**
     * Update styler configuration
     */
    updateConfig(c) {
      this.config = { ...this.config, ...c };
    }
    /**
     * Clean up styles and observers
     */
    destroy() {
      this.stopObserving();
      const c = document.getElementById("blinko-rtl-styles");
      c && c.remove();
    }
  }
  const Lr = {
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
  }, Dr = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, $r = {
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
  }, Ar = {
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
  System.register(["react", "react-dom/client"], (_, c) => {
    c.import("react");
    const p = c.import("react-dom/client");
    return {
      execute: () => {
        const b = new kr(), w = new Pr(b);
        function N() {
          console.log("Initializing Blinko RTL Plugin...");
          const M = localStorage.getItem("blinko-rtl-settings");
          if (M)
            try {
              const m = JSON.parse(M);
              m.enabled !== !1 && (w.startObserving(), (m.sensitivity || m.minRTLChars) && b.updateConfig({
                sensitivity: m.sensitivity || "medium",
                minRTLChars: m.minRTLChars || 3
              }), w.updateConfig({
                autoDetect: m.autoDetect !== !1,
                forceDirection: m.forceDirection || "auto",
                applyToSelectors: m.customSelectors || [
                  ".note-content",
                  ".note-editor",
                  "textarea",
                  ".markdown-content",
                  ".note-text"
                ]
              }));
            } catch (m) {
              console.error("Failed to load RTL plugin settings:", m);
            }
          else
            w.startObserving();
          window.addEventListener("rtl-settings-changed", (m) => {
            const v = m.detail;
            v.enabled ? (w.startObserving(), b.updateConfig({
              sensitivity: v.sensitivity,
              minRTLChars: v.minRTLChars || 3
            }), w.updateConfig({
              autoDetect: v.autoDetect,
              forceDirection: v.forceDirection,
              applyToSelectors: v.customSelectors
            })) : w.stopObserving();
          }), window.blinkoRTL = {
            detector: b,
            styler: w,
            test: (m) => {
              const v = b.detectRTL(m);
              return console.log(`Text "${m}" is ${v ? "RTL" : "LTR"}`), v;
            }
          }, console.log("Blinko RTL Plugin initialized successfully");
        }
        _("default", class {
          constructor() {
            me(this, "withSettingPanel", !0);
            me(this, "renderSettingPanel", () => {
              const m = document.createElement("div");
              return p.createRoot(m).render(Gt.createElement(jr)), m;
            });
            Object.assign(this, wr);
          }
          async init() {
            this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", N) : N(), window.Blinko.addToolBarIcon({
              name: "rtl-support",
              icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
              placement: "top",
              tooltip: "RTL Support Settings",
              content: () => {
                const m = document.createElement("div");
                return p.createRoot(m).render(Gt.createElement(Cr, { detector: b, styler: w })), m;
              }
            });
          }
          initI18n() {
            window.Blinko.i18n.addResourceBundle("en", "translation", Lr), window.Blinko.i18n.addResourceBundle("zh", "translation", Dr), window.Blinko.i18n.addResourceBundle("he", "translation", $r), window.Blinko.i18n.addResourceBundle("ar", "translation", Ar);
          }
          destroy() {
            w.destroy(), console.log("RTL Plugin destroyed");
          }
        });
      }
    };
  });
})();
