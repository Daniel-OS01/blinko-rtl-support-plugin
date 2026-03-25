var Bu = Object.defineProperty;
var Su = (ne, R, pe) => R in ne ? Bu(ne, R, { enumerable: !0, configurable: !0, writable: !0, value: pe }) : ne[R] = pe;
var mt = (ne, R, pe) => (Su(ne, typeof R != "symbol" ? R + "" : R, pe), pe);
(function() {
  var ne, R, pe, Dt, De, _t, vt, wt, bt, Ke, Ye, et, Ct, Be = {}, yt = [], An = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Ue = Array.isArray;
  function le(e, t) {
    for (var n in t)
      e[n] = t[n];
    return e;
  }
  function tt(e) {
    e && e.parentNode && e.parentNode.removeChild(e);
  }
  function ve(e, t, n) {
    var u, a, i, c = {};
    for (i in t)
      i == "key" ? u = t[i] : i == "ref" ? a = t[i] : c[i] = t[i];
    if (arguments.length > 2 && (c.children = arguments.length > 3 ? ne.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null)
      for (i in e.defaultProps)
        c[i] === void 0 && (c[i] = e.defaultProps[i]);
    return Se(e, c, u, a, null);
  }
  function Se(e, t, n, u, a) {
    var i = { type: e, props: t, key: n, ref: u, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: a ?? ++pe, __i: -1, __u: 0 };
    return a == null && R.vnode != null && R.vnode(i), i;
  }
  function $n() {
    return { current: null };
  }
  function de(e) {
    return e.children;
  }
  function re(e, t) {
    this.props = e, this.context = t;
  }
  function we(e, t) {
    if (t == null)
      return e.__ ? we(e.__, e.__i + 1) : null;
    for (var n; t < e.__k.length; t++)
      if ((n = e.__k[t]) != null && n.__e != null)
        return n.__e;
    return typeof e.type == "function" ? we(e) : null;
  }
  function kt(e) {
    var t, n;
    if ((e = e.__) != null && e.__c != null) {
      for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
        if ((n = e.__k[t]) != null && n.__e != null) {
          e.__e = e.__c.base = n.__e;
          break;
        }
      return kt(e);
    }
  }
  function nt(e) {
    (!e.__d && (e.__d = !0) && De.push(e) && !Le.__r++ || _t !== R.debounceRendering) && ((_t = R.debounceRendering) || vt)(Le);
  }
  function Le() {
    for (var e, t, n, u, a, i, c, g = 1; De.length; )
      De.length > g && De.sort(wt), e = De.shift(), g = De.length, e.__d && (n = void 0, a = (u = (t = e).__v).__e, i = [], c = [], t.__P && ((n = le({}, u)).__v = u.__v + 1, R.vnode && R.vnode(n), rt(t.__P, n, u, t.__n, t.__P.namespaceURI, 32 & u.__u ? [a] : null, i, a ?? we(u), !!(32 & u.__u), c), n.__v = u.__v, n.__.__k[n.__i] = n, $t(i, n, c), n.__e != a && kt(n)));
    Le.__r = 0;
  }
  function Ft(e, t, n, u, a, i, c, g, D, _, E) {
    var m, I, x, N, O, U, $ = u && u.__k || yt, P = t.length;
    for (D = Bn(n, t, $, D, P), m = 0; m < P; m++)
      (x = n.__k[m]) != null && (I = x.__i === -1 ? Be : $[x.__i] || Be, x.__i = m, U = rt(e, x, I, a, i, c, g, D, _, E), N = x.__e, x.ref && I.ref != x.ref && (I.ref && ut(I.ref, null, x), E.push(x.ref, x.__c || N, x)), O == null && N != null && (O = N), 4 & x.__u || I.__k === x.__k ? D = Et(x, D, e) : typeof x.type == "function" && U !== void 0 ? D = U : N && (D = N.nextSibling), x.__u &= -7);
    return n.__e = O, D;
  }
  function Bn(e, t, n, u, a) {
    var i, c, g, D, _, E = n.length, m = E, I = 0;
    for (e.__k = new Array(a), i = 0; i < a; i++)
      (c = t[i]) != null && typeof c != "boolean" && typeof c != "function" ? (D = i + I, (c = e.__k[i] = typeof c == "string" || typeof c == "number" || typeof c == "bigint" || c.constructor == String ? Se(null, c, null, null, null) : Ue(c) ? Se(de, { children: c }, null, null, null) : c.constructor === void 0 && c.__b > 0 ? Se(c.type, c.props, c.key, c.ref ? c.ref : null, c.__v) : c).__ = e, c.__b = e.__b + 1, g = null, (_ = c.__i = Sn(c, n, D, m)) !== -1 && (m--, (g = n[_]) && (g.__u |= 2)), g == null || g.__v === null ? (_ == -1 && I--, typeof c.type != "function" && (c.__u |= 4)) : _ != D && (_ == D - 1 ? I-- : _ == D + 1 ? I++ : (_ > D ? I-- : I++, c.__u |= 4))) : e.__k[i] = null;
    if (m)
      for (i = 0; i < E; i++)
        (g = n[i]) != null && !(2 & g.__u) && (g.__e == u && (u = we(g)), Bt(g, g));
    return u;
  }
  function Et(e, t, n) {
    var u, a;
    if (typeof e.type == "function") {
      for (u = e.__k, a = 0; u && a < u.length; a++)
        u[a] && (u[a].__ = e, t = Et(u[a], t, n));
      return t;
    }
    e.__e != t && (t && e.type && !n.contains(t) && (t = we(e)), n.insertBefore(e.__e, t || null), t = e.__e);
    do
      t = t && t.nextSibling;
    while (t != null && t.nodeType == 8);
    return t;
  }
  function Te(e, t) {
    return t = t || [], e == null || typeof e == "boolean" || (Ue(e) ? e.some(function(n) {
      Te(n, t);
    }) : t.push(e)), t;
  }
  function Sn(e, t, n, u) {
    var a, i, c = e.key, g = e.type, D = t[n];
    if (D === null || D && c == D.key && g === D.type && !(2 & D.__u))
      return n;
    if (u > (D != null && !(2 & D.__u) ? 1 : 0))
      for (a = n - 1, i = n + 1; a >= 0 || i < t.length; ) {
        if (a >= 0) {
          if ((D = t[a]) && !(2 & D.__u) && c == D.key && g === D.type)
            return a;
          a--;
        }
        if (i < t.length) {
          if ((D = t[i]) && !(2 & D.__u) && c == D.key && g === D.type)
            return i;
          i++;
        }
      }
    return -1;
  }
  function xt(e, t, n) {
    t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || An.test(t) ? n : n + "px";
  }
  function He(e, t, n, u, a) {
    var i;
    e:
      if (t == "style")
        if (typeof n == "string")
          e.style.cssText = n;
        else {
          if (typeof u == "string" && (e.style.cssText = u = ""), u)
            for (t in u)
              n && t in n || xt(e.style, t, "");
          if (n)
            for (t in n)
              u && n[t] === u[t] || xt(e.style, t, n[t]);
        }
      else if (t[0] == "o" && t[1] == "n")
        i = t != (t = t.replace(bt, "$1")), t = t.toLowerCase() in e || t == "onFocusOut" || t == "onFocusIn" ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + i] = n, n ? u ? n.t = u.t : (n.t = Ke, e.addEventListener(t, i ? et : Ye, i)) : e.removeEventListener(t, i ? et : Ye, i);
      else {
        if (a == "http://www.w3.org/2000/svg")
          t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e)
          try {
            e[t] = n ?? "";
            break e;
          } catch {
          }
        typeof n == "function" || (n == null || n === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
      }
  }
  function At(e) {
    return function(t) {
      if (this.l) {
        var n = this.l[t.type + e];
        if (t.u == null)
          t.u = Ke++;
        else if (t.u < n.t)
          return;
        return n(R.event ? R.event(t) : t);
      }
    };
  }
  function rt(e, t, n, u, a, i, c, g, D, _) {
    var E, m, I, x, N, O, U, $, P, q, X, M, ce, ue, ae, ee, oe, V = t.type;
    if (t.constructor !== void 0)
      return null;
    128 & n.__u && (D = !!(32 & n.__u), i = [g = t.__e = n.__e]), (E = R.__b) && E(t);
    e:
      if (typeof V == "function")
        try {
          if ($ = t.props, P = "prototype" in V && V.prototype.render, q = (E = V.contextType) && u[E.__c], X = E ? q ? q.props.value : E.__ : u, n.__c ? U = (m = t.__c = n.__c).__ = m.__E : (P ? t.__c = m = new V($, X) : (t.__c = m = new re($, X), m.constructor = V, m.render = Rn), q && q.sub(m), m.props = $, m.state || (m.state = {}), m.context = X, m.__n = u, I = m.__d = !0, m.__h = [], m._sb = []), P && m.__s == null && (m.__s = m.state), P && V.getDerivedStateFromProps != null && (m.__s == m.state && (m.__s = le({}, m.__s)), le(m.__s, V.getDerivedStateFromProps($, m.__s))), x = m.props, N = m.state, m.__v = t, I)
            P && V.getDerivedStateFromProps == null && m.componentWillMount != null && m.componentWillMount(), P && m.componentDidMount != null && m.__h.push(m.componentDidMount);
          else {
            if (P && V.getDerivedStateFromProps == null && $ !== x && m.componentWillReceiveProps != null && m.componentWillReceiveProps($, X), !m.__e && (m.shouldComponentUpdate != null && m.shouldComponentUpdate($, m.__s, X) === !1 || t.__v == n.__v)) {
              for (t.__v != n.__v && (m.props = $, m.state = m.__s, m.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(G) {
                G && (G.__ = t);
              }), M = 0; M < m._sb.length; M++)
                m.__h.push(m._sb[M]);
              m._sb = [], m.__h.length && c.push(m);
              break e;
            }
            m.componentWillUpdate != null && m.componentWillUpdate($, m.__s, X), P && m.componentDidUpdate != null && m.__h.push(function() {
              m.componentDidUpdate(x, N, O);
            });
          }
          if (m.context = X, m.props = $, m.__P = e, m.__e = !1, ce = R.__r, ue = 0, P) {
            for (m.state = m.__s, m.__d = !1, ce && ce(t), E = m.render(m.props, m.state, m.context), ae = 0; ae < m._sb.length; ae++)
              m.__h.push(m._sb[ae]);
            m._sb = [];
          } else
            do
              m.__d = !1, ce && ce(t), E = m.render(m.props, m.state, m.context), m.state = m.__s;
            while (m.__d && ++ue < 25);
          m.state = m.__s, m.getChildContext != null && (u = le(le({}, u), m.getChildContext())), P && !I && m.getSnapshotBeforeUpdate != null && (O = m.getSnapshotBeforeUpdate(x, N)), g = Ft(e, Ue(ee = E != null && E.type === de && E.key == null ? E.props.children : E) ? ee : [ee], t, n, u, a, i, c, g, D, _), m.base = t.__e, t.__u &= -161, m.__h.length && c.push(m), U && (m.__E = m.__ = null);
        } catch (G) {
          if (t.__v = null, D || i != null)
            if (G.then) {
              for (t.__u |= D ? 160 : 128; g && g.nodeType == 8 && g.nextSibling; )
                g = g.nextSibling;
              i[i.indexOf(g)] = null, t.__e = g;
            } else
              for (oe = i.length; oe--; )
                tt(i[oe]);
          else
            t.__e = n.__e, t.__k = n.__k;
          R.__e(G, t, n);
        }
      else
        i == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : g = t.__e = Tn(n.__e, t, n, u, a, i, c, D, _);
    return (E = R.diffed) && E(t), 128 & t.__u ? void 0 : g;
  }
  function $t(e, t, n) {
    for (var u = 0; u < n.length; u++)
      ut(n[u], n[++u], n[++u]);
    R.__c && R.__c(t, e), e.some(function(a) {
      try {
        e = a.__h, a.__h = [], e.some(function(i) {
          i.call(a);
        });
      } catch (i) {
        R.__e(i, a.__v);
      }
    });
  }
  function Tn(e, t, n, u, a, i, c, g, D) {
    var _, E, m, I, x, N, O, U = n.props, $ = t.props, P = t.type;
    if (P == "svg" ? a = "http://www.w3.org/2000/svg" : P == "math" ? a = "http://www.w3.org/1998/Math/MathML" : a || (a = "http://www.w3.org/1999/xhtml"), i != null) {
      for (_ = 0; _ < i.length; _++)
        if ((x = i[_]) && "setAttribute" in x == !!P && (P ? x.localName == P : x.nodeType == 3)) {
          e = x, i[_] = null;
          break;
        }
    }
    if (e == null) {
      if (P == null)
        return document.createTextNode($);
      e = document.createElementNS(a, P, $.is && $), g && (R.__m && R.__m(t, i), g = !1), i = null;
    }
    if (P === null)
      U === $ || g && e.data === $ || (e.data = $);
    else {
      if (i = i && ne.call(e.childNodes), U = n.props || Be, !g && i != null)
        for (U = {}, _ = 0; _ < e.attributes.length; _++)
          U[(x = e.attributes[_]).name] = x.value;
      for (_ in U)
        if (x = U[_], _ != "children") {
          if (_ == "dangerouslySetInnerHTML")
            m = x;
          else if (!(_ in $)) {
            if (_ == "value" && "defaultValue" in $ || _ == "checked" && "defaultChecked" in $)
              continue;
            He(e, _, null, x, a);
          }
        }
      for (_ in $)
        x = $[_], _ == "children" ? I = x : _ == "dangerouslySetInnerHTML" ? E = x : _ == "value" ? N = x : _ == "checked" ? O = x : g && typeof x != "function" || U[_] === x || He(e, _, x, U[_], a);
      if (E)
        g || m && (E.__html === m.__html || E.__html === e.innerHTML) || (e.innerHTML = E.__html), t.__k = [];
      else if (m && (e.innerHTML = ""), Ft(t.type === "template" ? e.content : e, Ue(I) ? I : [I], t, n, u, P == "foreignObject" ? "http://www.w3.org/1999/xhtml" : a, i, c, i ? i[0] : n.__k && we(n, 0), g, D), i != null)
        for (_ = i.length; _--; )
          tt(i[_]);
      g || (_ = "value", P == "progress" && N == null ? e.removeAttribute("value") : N !== void 0 && (N !== e[_] || P == "progress" && !N || P == "option" && N !== U[_]) && He(e, _, N, U[_], a), _ = "checked", O !== void 0 && O !== e[_] && He(e, _, O, U[_], a));
    }
    return e;
  }
  function ut(e, t, n) {
    try {
      if (typeof e == "function") {
        var u = typeof e.__u == "function";
        u && e.__u(), u && t == null || (e.__u = e(t));
      } else
        e.current = t;
    } catch (a) {
      R.__e(a, n);
    }
  }
  function Bt(e, t, n) {
    var u, a;
    if (R.unmount && R.unmount(e), (u = e.ref) && (u.current && u.current !== e.__e || ut(u, null, t)), (u = e.__c) != null) {
      if (u.componentWillUnmount)
        try {
          u.componentWillUnmount();
        } catch (i) {
          R.__e(i, t);
        }
      u.base = u.__P = null;
    }
    if (u = e.__k)
      for (a = 0; a < u.length; a++)
        u[a] && Bt(u[a], t, n || typeof e.type != "function");
    n || tt(e.__e), e.__c = e.__ = e.__e = void 0;
  }
  function Rn(e, t, n) {
    return this.constructor(e, n);
  }
  function ot(e, t, n) {
    var u, a, i, c;
    t == document && (t = document.documentElement), R.__ && R.__(e, t), a = (u = typeof n == "function") ? null : n && n.__k || t.__k, i = [], c = [], rt(t, e = (!u && n || t).__k = ve(de, null, [e]), a || Be, Be, t.namespaceURI, !u && n ? [n] : a ? null : t.firstChild ? ne.call(t.childNodes) : null, i, !u && n ? n : a ? a.__e : t.firstChild, u, c), $t(i, e, c);
  }
  function St(e, t) {
    ot(e, t, St);
  }
  function zn(e, t, n) {
    var u, a, i, c, g = le({}, e.props);
    for (i in e.type && e.type.defaultProps && (c = e.type.defaultProps), t)
      i == "key" ? u = t[i] : i == "ref" ? a = t[i] : g[i] = t[i] === void 0 && c !== void 0 ? c[i] : t[i];
    return arguments.length > 2 && (g.children = arguments.length > 3 ? ne.call(arguments, 2) : n), Se(e.type, g, u || e.key, a || e.ref, null);
  }
  function In(e) {
    function t(n) {
      var u, a;
      return this.getChildContext || (u = /* @__PURE__ */ new Set(), (a = {})[t.__c] = this, this.getChildContext = function() {
        return a;
      }, this.componentWillUnmount = function() {
        u = null;
      }, this.shouldComponentUpdate = function(i) {
        this.props.value !== i.value && u.forEach(function(c) {
          c.__e = !0, nt(c);
        });
      }, this.sub = function(i) {
        u.add(i);
        var c = i.componentWillUnmount;
        i.componentWillUnmount = function() {
          u && u.delete(i), c && c.call(i);
        };
      }), n.children;
    }
    return t.__c = "__cC" + Ct++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(n, u) {
      return n.children(u);
    }).contextType = t, t;
  }
  ne = yt.slice, R = { __e: function(e, t, n, u) {
    for (var a, i, c; t = t.__; )
      if ((a = t.__c) && !a.__)
        try {
          if ((i = a.constructor) && i.getDerivedStateFromError != null && (a.setState(i.getDerivedStateFromError(e)), c = a.__d), a.componentDidCatch != null && (a.componentDidCatch(e, u || {}), c = a.__d), c)
            return a.__E = a;
        } catch (g) {
          e = g;
        }
    throw e;
  } }, pe = 0, Dt = function(e) {
    return e != null && e.constructor == null;
  }, re.prototype.setState = function(e, t) {
    var n;
    n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = le({}, this.state), typeof e == "function" && (e = e(le({}, n), this.props)), e && le(n, e), e != null && this.__v && (t && this._sb.push(t), nt(this));
  }, re.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), nt(this));
  }, re.prototype.render = de, De = [], vt = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, wt = function(e, t) {
    return e.__v.__b - t.__v.__b;
  }, Le.__r = 0, bt = /(PointerCapture)$|Capture$/i, Ke = 0, Ye = At(!1), et = At(!0), Ct = 0;
  const Pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Component: re,
    Fragment: de,
    cloneElement: zn,
    createContext: In,
    createElement: ve,
    createRef: $n,
    h: ve,
    hydrate: St,
    get isValidElement() {
      return Dt;
    },
    get options() {
      return R;
    },
    render: ot,
    toChildArray: Te
  }, Symbol.toStringTag, { value: "Module" }));
  var Mn = 0;
  function A(e, t, n, u, a, i) {
    t || (t = {});
    var c, g, D = t;
    if ("ref" in D)
      for (g in D = {}, t)
        g == "ref" ? c = t[g] : D[g] = t[g];
    var _ = { type: e, props: D, key: n, ref: c, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --Mn, __i: -1, __u: 0, __source: a, __self: i };
    if (typeof e == "function" && (c = e.defaultProps))
      for (g in c)
        D[g] === void 0 && (D[g] = c[g]);
    return R.vnode && R.vnode(_), _;
  }
  var Re, j, it, Tt, je = 0, Rt = [], W = R, zt = W.__b, It = W.__r, Pt = W.diffed, Mt = W.__c, Ot = W.unmount, Nt = W.__;
  function at(e, t) {
    W.__h && W.__h(j, e, je || t), je = 0;
    var n = j.__H || (j.__H = { __: [], __h: [] });
    return e >= n.__.length && n.__.push({}), n.__[e];
  }
  function ie(e) {
    return je = 1, On(Ht, e);
  }
  function On(e, t, n) {
    var u = at(Re++, 2);
    if (u.t = e, !u.__c && (u.__ = [n ? n(t) : Ht(void 0, t), function(g) {
      var D = u.__N ? u.__N[0] : u.__[0], _ = u.t(D, g);
      D !== _ && (u.__N = [_, u.__[1]], u.__c.setState({}));
    }], u.__c = j, !j.__f)) {
      var a = function(g, D, _) {
        if (!u.__c.__H)
          return !0;
        var E = u.__c.__H.__.filter(function(I) {
          return !!I.__c;
        });
        if (E.every(function(I) {
          return !I.__N;
        }))
          return !i || i.call(this, g, D, _);
        var m = u.__c.props !== g;
        return E.forEach(function(I) {
          if (I.__N) {
            var x = I.__[0];
            I.__ = I.__N, I.__N = void 0, x !== I.__[0] && (m = !0);
          }
        }), i && i.call(this, g, D, _) || m;
      };
      j.__f = !0;
      var i = j.shouldComponentUpdate, c = j.componentWillUpdate;
      j.componentWillUpdate = function(g, D, _) {
        if (this.__e) {
          var E = i;
          i = void 0, a(g, D, _), i = E;
        }
        c && c.call(this, g, D, _);
      }, j.shouldComponentUpdate = a;
    }
    return u.__N || u.__;
  }
  function be(e, t) {
    var n = at(Re++, 3);
    !W.__s && Lt(n.__H, t) && (n.__ = e, n.u = t, j.__H.__h.push(n));
  }
  function Nn(e) {
    return je = 5, Un(function() {
      return { current: e };
    }, []);
  }
  function Un(e, t) {
    var n = at(Re++, 7);
    return Lt(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
  }
  function Ln() {
    for (var e; e = Rt.shift(); )
      if (e.__P && e.__H)
        try {
          e.__H.__h.forEach(We), e.__H.__h.forEach(st), e.__H.__h = [];
        } catch (t) {
          e.__H.__h = [], W.__e(t, e.__v);
        }
  }
  W.__b = function(e) {
    j = null, zt && zt(e);
  }, W.__ = function(e, t) {
    e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Nt && Nt(e, t);
  }, W.__r = function(e) {
    It && It(e), Re = 0;
    var t = (j = e.__c).__H;
    t && (it === j ? (t.__h = [], j.__h = [], t.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (t.__h.forEach(We), t.__h.forEach(st), t.__h = [], Re = 0)), it = j;
  }, W.diffed = function(e) {
    Pt && Pt(e);
    var t = e.__c;
    t && t.__H && (t.__H.__h.length && (Rt.push(t) !== 1 && Tt === W.requestAnimationFrame || ((Tt = W.requestAnimationFrame) || Hn)(Ln)), t.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), it = j = null;
  }, W.__c = function(e, t) {
    t.some(function(n) {
      try {
        n.__h.forEach(We), n.__h = n.__h.filter(function(u) {
          return !u.__ || st(u);
        });
      } catch (u) {
        t.some(function(a) {
          a.__h && (a.__h = []);
        }), t = [], W.__e(u, n.__v);
      }
    }), Mt && Mt(e, t);
  }, W.unmount = function(e) {
    Ot && Ot(e);
    var t, n = e.__c;
    n && n.__H && (n.__H.__.forEach(function(u) {
      try {
        We(u);
      } catch (a) {
        t = a;
      }
    }), n.__H = void 0, t && W.__e(t, n.__v));
  };
  var Ut = typeof requestAnimationFrame == "function";
  function Hn(e) {
    var t, n = function() {
      clearTimeout(u), Ut && cancelAnimationFrame(t), setTimeout(e);
    }, u = setTimeout(n, 100);
    Ut && (t = requestAnimationFrame(n));
  }
  function We(e) {
    var t = j, n = e.__c;
    typeof n == "function" && (e.__c = void 0, n()), j = t;
  }
  function st(e) {
    var t = j;
    e.__c = e.__(), j = t;
  }
  function Lt(e, t) {
    return !e || e.length !== t.length || t.some(function(n, u) {
      return n !== e[u];
    });
  }
  function Ht(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function jn(e, t) {
    for (var n in t)
      e[n] = t[n];
    return e;
  }
  function jt(e, t) {
    for (var n in e)
      if (n !== "__source" && !(n in t))
        return !0;
    for (var u in t)
      if (u !== "__source" && e[u] !== t[u])
        return !0;
    return !1;
  }
  function Wt(e, t) {
    this.props = e, this.context = t;
  }
  (Wt.prototype = new re()).isPureReactComponent = !0, Wt.prototype.shouldComponentUpdate = function(e, t) {
    return jt(this.props, e) || jt(this.state, t);
  };
  var qt = R.__b;
  R.__b = function(e) {
    e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), qt && qt(e);
  };
  var Wn = R.__e;
  R.__e = function(e, t, n, u) {
    if (e.then) {
      for (var a, i = t; i = i.__; )
        if ((a = i.__c) && a.__c)
          return t.__e == null && (t.__e = n.__e, t.__k = n.__k), a.__c(e, t);
    }
    Wn(e, t, n, u);
  };
  var Vt = R.unmount;
  function Zt(e, t, n) {
    return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(u) {
      typeof u.__c == "function" && u.__c();
    }), e.__c.__H = null), (e = jn({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c = null), e.__k = e.__k && e.__k.map(function(u) {
      return Zt(u, t, n);
    })), e;
  }
  function Gt(e, t, n) {
    return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(u) {
      return Gt(u, t, n);
    }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
  }
  function lt() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Qt(e) {
    var t = e.__.__c;
    return t && t.__a && t.__a(e);
  }
  function qe() {
    this.i = null, this.l = null;
  }
  R.unmount = function(e) {
    var t = e.__c;
    t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Vt && Vt(e);
  }, (lt.prototype = new re()).__c = function(e, t) {
    var n = t.__c, u = this;
    u.o == null && (u.o = []), u.o.push(n);
    var a = Qt(u.__v), i = !1, c = function() {
      i || (i = !0, n.__R = null, a ? a(g) : g());
    };
    n.__R = c;
    var g = function() {
      if (!--u.__u) {
        if (u.state.__a) {
          var D = u.state.__a;
          u.__v.__k[0] = Gt(D, D.__c.__P, D.__c.__O);
        }
        var _;
        for (u.setState({ __a: u.__b = null }); _ = u.o.pop(); )
          _.forceUpdate();
      }
    };
    u.__u++ || 32 & t.__u || u.setState({ __a: u.__b = u.__v.__k[0] }), e.then(c, c);
  }, lt.prototype.componentWillUnmount = function() {
    this.o = [];
  }, lt.prototype.render = function(e, t) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), u = this.__v.__k[0].__c;
        this.__v.__k[0] = Zt(this.__b, n, u.__O = u.__P);
      }
      this.__b = null;
    }
    var a = t.__a && ve(de, null, e.fallback);
    return a && (a.__u &= -33), [ve(de, null, t.__a ? null : e.children), a];
  };
  var Xt = function(e, t, n) {
    if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size))
      for (n = e.i; n; ) {
        for (; n.length > 3; )
          n.pop()();
        if (n[1] < n[0])
          break;
        e.i = n = n[2];
      }
  };
  (qe.prototype = new re()).__a = function(e) {
    var t = this, n = Qt(t.__v), u = t.l.get(e);
    return u[0]++, function(a) {
      var i = function() {
        t.props.revealOrder ? (u.push(a), Xt(t, e, u)) : a();
      };
      n ? n(i) : i();
    };
  }, qe.prototype.render = function(e) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var t = Te(e.children);
    e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
    for (var n = t.length; n--; )
      this.l.set(t[n], this.i = [1, 0, this.i]);
    return e.children;
  }, qe.prototype.componentDidUpdate = qe.prototype.componentDidMount = function() {
    var e = this;
    this.l.forEach(function(t, n) {
      Xt(e, n, t);
    });
  };
  var qn = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Vn = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Zn = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Gn = /[A-Z0-9]/g, Qn = typeof document < "u", Xn = function(e) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
  };
  function Jt(e, t, n) {
    return t.__k == null && (t.textContent = ""), ot(e, t), typeof n == "function" && n(), e ? e.__c : null;
  }
  re.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
    Object.defineProperty(re.prototype, e, { configurable: !0, get: function() {
      return this["UNSAFE_" + e];
    }, set: function(t) {
      Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
    } });
  });
  var Kt = R.event;
  function Jn() {
  }
  function Kn() {
    return this.cancelBubble;
  }
  function Yn() {
    return this.defaultPrevented;
  }
  R.event = function(e) {
    return Kt && (e = Kt(e)), e.persist = Jn, e.isPropagationStopped = Kn, e.isDefaultPrevented = Yn, e.nativeEvent = e;
  };
  var er = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Yt = R.vnode;
  R.vnode = function(e) {
    typeof e.type == "string" && function(t) {
      var n = t.props, u = t.type, a = {}, i = u.indexOf("-") === -1;
      for (var c in n) {
        var g = n[c];
        if (!(c === "value" && "defaultValue" in n && g == null || Qn && c === "children" && u === "noscript" || c === "class" || c === "className")) {
          var D = c.toLowerCase();
          c === "defaultValue" && "value" in n && n.value == null ? c = "value" : c === "download" && g === !0 ? g = "" : D === "translate" && g === "no" ? g = !1 : D[0] === "o" && D[1] === "n" ? D === "ondoubleclick" ? c = "ondblclick" : D !== "onchange" || u !== "input" && u !== "textarea" || Xn(n.type) ? D === "onfocus" ? c = "onfocusin" : D === "onblur" ? c = "onfocusout" : Zn.test(c) && (c = D) : D = c = "oninput" : i && Vn.test(c) ? c = c.replace(Gn, "-$&").toLowerCase() : g === null && (g = void 0), D === "oninput" && a[c = D] && (c = "oninputCapture"), a[c] = g;
        }
      }
      u == "select" && a.multiple && Array.isArray(a.value) && (a.value = Te(n.children).forEach(function(_) {
        _.props.selected = a.value.indexOf(_.props.value) != -1;
      })), u == "select" && a.defaultValue != null && (a.value = Te(n.children).forEach(function(_) {
        _.props.selected = a.multiple ? a.defaultValue.indexOf(_.props.value) != -1 : a.defaultValue == _.props.value;
      })), n.class && !n.className ? (a.class = n.class, Object.defineProperty(a, "className", er)) : (n.className && !n.class || n.class && n.className) && (a.class = a.className = n.className), t.props = a;
    }(e), e.$$typeof = qn, Yt && Yt(e);
  };
  var en = R.__r;
  R.__r = function(e) {
    en && en(e), e.__c;
  };
  var tn = R.diffed;
  R.diffed = function(e) {
    tn && tn(e);
    var t = e.props, n = e.__e;
    n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
  };
  const nn = [
    {
      id: "dark",
      name: "深色模式",
      backgroundColor: "#1a1a1a",
      textColor: "#ffffff",
      dateColor: "#a0aec0",
      tagBackgroundColor: "#2d3748",
      tagTextColor: "#e2e8f0",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      borderRadius: "15px",
      accentColor: "#3b82f6"
    },
    {
      id: "light",
      name: "浅色模式",
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a",
      dateColor: "#4a5568",
      tagBackgroundColor: "#edf2f7",
      tagTextColor: "#2d3748",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      borderRadius: "15px",
      accentColor: "#3b82f6"
    },
    {
      id: "sepia",
      name: "复古风格",
      backgroundColor: "#f8f2e4",
      textColor: "#433422",
      dateColor: "#8c7851",
      tagBackgroundColor: "#e6d7c3",
      tagTextColor: "#5c4935",
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      borderRadius: "10px",
      accentColor: "#c59d5f"
    },
    {
      id: "ocean",
      name: "海洋风格",
      backgroundColor: "#e0f7fa",
      textColor: "#006064",
      dateColor: "#0097a7",
      tagBackgroundColor: "#b2ebf2",
      tagTextColor: "#00838f",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      borderRadius: "20px",
      accentColor: "#00acc1"
    },
    {
      id: "forest",
      name: "森林风格",
      backgroundColor: "#e8f5e9",
      textColor: "#1b5e20",
      dateColor: "#388e3c",
      tagBackgroundColor: "#c8e6c9",
      tagTextColor: "#2e7d32",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      borderRadius: "12px",
      accentColor: "#43a047"
    }
  ];
  function tr({
    selectedTemplate: e,
    onSelectTemplate: t,
    className: n = "",
    children: u
  }) {
    const [a, i] = ie(!1);
    return be(() => {
      const c = () => {
        const g = window.innerWidth;
        i(g <= 768);
      };
      return c(), window.addEventListener("resize", c), () => window.removeEventListener("resize", c);
    }, []), /* @__PURE__ */ A("div", { className: `${n} w-full overflow-x-auto`, children: [
      /* @__PURE__ */ A("div", { className: "flex justify-center", children: /* @__PURE__ */ A(
        "div",
        {
          className: `flex ${a ? "gap-3" : "gap-4"}`,
          style: {
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "10px",
            scrollbarWidth: "thin",
            msOverflowStyle: "none"
          },
          children: nn.map((c) => /* @__PURE__ */ A(
            nr,
            {
              template: c,
              isSelected: e.id === c.id,
              onClick: () => t(c),
              isMobile: a
            },
            c.id
          ))
        }
      ) }),
      u
    ] });
  }
  function nr({
    template: e,
    isSelected: t,
    onClick: n,
    isMobile: u
  }) {
    const a = u ? 68 : 90, i = u ? 24 : 30;
    return /* @__PURE__ */ A(
      "div",
      {
        className: `flex-shrink-0 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out select-none ${t ? "transform scale-105" : "hover:scale-105"}`,
        onClick: n,
        style: {
          marginBottom: u ? "4px" : "8px",
          minWidth: `${a}px`
        },
        children: [
          /* @__PURE__ */ A(
            "div",
            {
              className: "relative mb-1 md:mb-2 overflow-hidden",
              style: {
                width: `${a}px`,
                height: `${a}px`,
                borderRadius: "12px",
                boxShadow: t ? `0 0 0 2px ${e.accentColor || "#3b82f6"}, 0 4px 12px rgba(0, 0, 0, 0.15)` : "0 2px 6px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s ease-in-out",
                transform: t ? "translateY(-2px)" : "translateY(0)"
              },
              children: [
                t && /* @__PURE__ */ A(
                  "div",
                  {
                    className: "absolute top-2 right-2 z-10 rounded-full flex items-center justify-center",
                    style: {
                      width: "20px",
                      height: "20px",
                      backgroundColor: "white",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    },
                    children: /* @__PURE__ */ A(
                      "svg",
                      {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /* @__PURE__ */ A(
                          "path",
                          {
                            d: "M20 6L9 17L4 12",
                            stroke: e.accentColor || "#3b82f6",
                            strokeWidth: "3",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ A(
                  "div",
                  {
                    className: "w-full rounded-t-xl",
                    style: {
                      backgroundColor: e.backgroundColor,
                      height: `${i}px`,
                      borderBottom: "1px solid rgba(0,0,0,0.05)"
                    }
                  }
                ),
                /* @__PURE__ */ A(
                  "div",
                  {
                    className: "w-full h-full p-2",
                    style: {
                      backgroundColor: "#f8f9fa"
                    },
                    children: /* @__PURE__ */ A("div", { className: "flex flex-col gap-1.5 mt-0.5", children: [
                      /* @__PURE__ */ A(
                        "div",
                        {
                          className: "h-1.5 rounded-sm",
                          style: {
                            backgroundColor: e.textColor,
                            width: "90%",
                            opacity: 0.9
                          }
                        }
                      ),
                      /* @__PURE__ */ A(
                        "div",
                        {
                          className: "h-1 rounded-sm",
                          style: {
                            backgroundColor: e.textColor,
                            width: "80%",
                            opacity: 0.7
                          }
                        }
                      ),
                      /* @__PURE__ */ A(
                        "div",
                        {
                          className: "h-1 rounded-sm",
                          style: {
                            backgroundColor: e.textColor,
                            width: "85%",
                            opacity: 0.7
                          }
                        }
                      ),
                      /* @__PURE__ */ A("div", { className: "flex gap-1 mt-1", children: [
                        /* @__PURE__ */ A(
                          "div",
                          {
                            className: "h-1.5 rounded-full",
                            style: {
                              backgroundColor: e.tagBackgroundColor,
                              width: "24%"
                            }
                          }
                        ),
                        /* @__PURE__ */ A(
                          "div",
                          {
                            className: "h-1.5 rounded-full",
                            style: {
                              backgroundColor: e.tagBackgroundColor,
                              width: "18%"
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ A(
                        "div",
                        {
                          className: "h-1 rounded-sm self-end mt-0.5",
                          style: {
                            backgroundColor: e.dateColor,
                            width: "30%",
                            opacity: 0.8
                          }
                        }
                      )
                    ] })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ A(
            "span",
            {
              className: `text-xs md:text-sm font-medium text-center transition-colors duration-200 px-1 py-0.5 rounded ${t ? "bg-gray-100 text-gray-800" : "text-gray-600"}`,
              style: {
                maxWidth: `${a}px`,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              },
              children: e.name
            }
          )
        ]
      }
    );
  }
  function rr(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function rn(e) {
    if (e.__esModule)
      return e;
    var t = e.default;
    if (typeof t == "function") {
      var n = function u() {
        return this instanceof u ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
      };
      n.prototype = t.prototype;
    } else
      n = {};
    return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(u) {
      var a = Object.getOwnPropertyDescriptor(e, u);
      Object.defineProperty(n, u, a.get ? a : {
        enumerable: !0,
        get: function() {
          return e[u];
        }
      });
    }), n;
  }
  const ur = /* @__PURE__ */ rn(Pn);
  var un, or = {};
  function K(e, t, n) {
    if (e.nodeType === 3) {
      var u = "textContent" in e ? e.textContent : e.nodeValue || "";
      if (K.options.trim !== !1) {
        var a = t === 0 || t === n.length - 1;
        if ((!(u = u.match(/^[\s\n]+$/g) && K.options.trim !== "all" ? " " : u.replace(/(^[\s\n]+|[\s\n]+$)/g, K.options.trim === "all" || a ? "" : " ")) || u === " ") && n.length > 1 && a)
          return null;
      }
      return u;
    }
    if (e.nodeType !== 1)
      return null;
    var i = String(e.nodeName).toLowerCase();
    if (i === "script" && !K.options.allowScripts)
      return null;
    var c, g, D = K.h(i, function(_) {
      var E = _ && _.length;
      if (!E)
        return null;
      for (var m = {}, I = 0; I < E; I++) {
        var x = _[I], N = x.name, O = x.value;
        N.substring(0, 2) === "on" && K.options.allowEvents && (O = new Function(O)), m[N] = O;
      }
      return m;
    }(e.attributes), (g = (c = e.childNodes) && Array.prototype.map.call(c, K).filter(ir)) && g.length ? g : null);
    return K.visitor && K.visitor(D), D;
  }
  var on, ir = function(e) {
    return e;
  }, ar = {};
  function Ve(e) {
    var t = (e.type || "").toLowerCase(), n = Ve.map;
    n && n.hasOwnProperty(t) ? (e.type = n[t], e.props = Object.keys(e.props || {}).reduce(function(u, a) {
      var i;
      return u[i = a, i.replace(/-(.)/g, function(c, g) {
        return g.toUpperCase();
      })] = e.props[a], u;
    }, {})) : e.type = t.replace(/[^a-z0-9-]/i, "");
  }
  const sr = function(e) {
    function t() {
      e.apply(this, arguments);
    }
    return e && (t.__proto__ = e), (t.prototype = Object.create(e && e.prototype)).constructor = t, t.setReviver = function(n) {
      on = n;
    }, t.prototype.shouldComponentUpdate = function(n) {
      var u = this.props;
      return n.wrap !== u.wrap || n.type !== u.type || n.markup !== u.markup;
    }, t.prototype.setComponents = function(n) {
      if (this.map = {}, n) {
        for (var u in n)
          if (n.hasOwnProperty(u)) {
            var a = u.replace(/([A-Z]+)([A-Z][a-z0-9])|([a-z0-9]+)([A-Z])/g, "$1$3-$2$4").toLowerCase();
            this.map[a] = n[u];
          }
      }
    }, t.prototype.render = function(n) {
      var u = n.wrap;
      u === void 0 && (u = !0);
      var a, i = n.type, c = n.markup, g = n.components, D = n.reviver, _ = n.onError, E = n["allow-scripts"], m = n["allow-events"], I = n.trim, x = function(P, q) {
        var X = {};
        for (var M in P)
          Object.prototype.hasOwnProperty.call(P, M) && q.indexOf(M) === -1 && (X[M] = P[M]);
        return X;
      }(n, ["wrap", "type", "markup", "components", "reviver", "onError", "allow-scripts", "allow-events", "trim"]), N = D || this.reviver || this.constructor.prototype.reviver || on || ve;
      this.setComponents(g);
      var O = { allowScripts: E, allowEvents: m, trim: I };
      try {
        a = function(P, q, X, M, ce) {
          var ue = function(oe, V) {
            var G, ke, fe, Fe, Ee = V === "html" ? "text/html" : "application/xml";
            V === "html" ? (Fe = "body", fe = `<!DOCTYPE html>
<html><body>` + oe + "</body></html>") : (Fe = "xml", fe = `<?xml version="1.0" encoding="UTF-8"?>
<xml>` + oe + "</xml>");
            try {
              G = new DOMParser().parseFromString(fe, Ee);
            } catch (he) {
              ke = he;
            }
            if (G || V !== "html" || ((G = un || (un = function() {
              if (document.implementation && document.implementation.createHTMLDocument)
                return document.implementation.createHTMLDocument("");
              var he = document.createElement("iframe");
              return he.style.cssText = "position:absolute; left:0; top:-999em; width:1px; height:1px; overflow:hidden;", he.setAttribute("sandbox", "allow-forms"), document.body.appendChild(he), he.contentWindow.document;
            }())).open(), G.write(fe), G.close()), G) {
              var _e = G.getElementsByTagName(Fe)[0], te = _e.firstChild;
              return oe && !te && (_e.error = "Document parse failed."), te && String(te.nodeName).toLowerCase() === "parsererror" && (te.removeChild(te.firstChild), te.removeChild(te.lastChild), _e.error = te.textContent || te.nodeValue || ke || "Unknown error", _e.removeChild(te)), _e;
            }
          }(P, q);
          if (ue && ue.error)
            throw new Error(ue.error);
          var ae = ue && ue.body || ue;
          Ve.map = M || ar;
          var ee = ae && function(oe, V, G, ke) {
            return K.visitor = V, K.h = G, K.options = ke || or, K(oe);
          }(ae, Ve, X, ce);
          return Ve.map = null, ee && ee.props && ee.props.children || null;
        }(c, i, N, this.map, O);
      } catch (P) {
        _ ? _({ error: P }) : typeof console < "u" && console.error && console.error("preact-markup: " + P);
      }
      if (u === !1)
        return a || null;
      var U = x.hasOwnProperty("className") ? "className" : "class", $ = x[U];
      return $ ? $.splice ? $.splice(0, 0, "markup") : typeof $ == "string" ? x[U] += " markup" : typeof $ == "object" && ($.markup = !0) : x[U] = "markup", N("div", x, a || null);
    }, t;
  }(re), lr = /* @__PURE__ */ rn(/* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: sr
  }, Symbol.toStringTag, { value: "Module" })));
  var an = {};
  (function(e) {
    function t(p, d) {
      for (var h = 0; h < d.length; h++) {
        var r = d[h];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(p, D(r.key), r);
      }
    }
    function n(p, d, h) {
      return d && t(p.prototype, d), h && t(p, h), Object.defineProperty(p, "prototype", {
        writable: !1
      }), p;
    }
    function u() {
      return u = Object.assign ? Object.assign.bind() : function(p) {
        for (var d = 1; d < arguments.length; d++) {
          var h = arguments[d];
          for (var r in h)
            Object.prototype.hasOwnProperty.call(h, r) && (p[r] = h[r]);
        }
        return p;
      }, u.apply(this, arguments);
    }
    function a(p, d) {
      if (p) {
        if (typeof p == "string")
          return i(p, d);
        var h = Object.prototype.toString.call(p).slice(8, -1);
        if (h === "Object" && p.constructor && (h = p.constructor.name), h === "Map" || h === "Set")
          return Array.from(p);
        if (h === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(h))
          return i(p, d);
      }
    }
    function i(p, d) {
      (d == null || d > p.length) && (d = p.length);
      for (var h = 0, r = new Array(d); h < d; h++)
        r[h] = p[h];
      return r;
    }
    function c(p, d) {
      var h = typeof Symbol < "u" && p[Symbol.iterator] || p["@@iterator"];
      if (h)
        return (h = h.call(p)).next.bind(h);
      if (Array.isArray(p) || (h = a(p)) || d && p && typeof p.length == "number") {
        h && (p = h);
        var r = 0;
        return function() {
          return r >= p.length ? {
            done: !0
          } : {
            done: !1,
            value: p[r++]
          };
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function g(p, d) {
      if (typeof p != "object" || p === null)
        return p;
      var h = p[Symbol.toPrimitive];
      if (h !== void 0) {
        var r = h.call(p, d || "default");
        if (typeof r != "object")
          return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (d === "string" ? String : Number)(p);
    }
    function D(p) {
      var d = g(p, "string");
      return typeof d == "symbol" ? d : String(d);
    }
    function _() {
      return {
        async: !1,
        baseUrl: null,
        breaks: !1,
        extensions: null,
        gfm: !0,
        headerIds: !0,
        headerPrefix: "",
        highlight: null,
        hooks: null,
        langPrefix: "language-",
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1
      };
    }
    e.defaults = _();
    function E(p) {
      e.defaults = p;
    }
    var m = /[&<>"']/, I = new RegExp(m.source, "g"), x = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, N = new RegExp(x.source, "g"), O = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, U = function(d) {
      return O[d];
    };
    function $(p, d) {
      if (d) {
        if (m.test(p))
          return p.replace(I, U);
      } else if (x.test(p))
        return p.replace(N, U);
      return p;
    }
    var P = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
    function q(p) {
      return p.replace(P, function(d, h) {
        return h = h.toLowerCase(), h === "colon" ? ":" : h.charAt(0) === "#" ? h.charAt(1) === "x" ? String.fromCharCode(parseInt(h.substring(2), 16)) : String.fromCharCode(+h.substring(1)) : "";
      });
    }
    var X = /(^|[^\[])\^/g;
    function M(p, d) {
      p = typeof p == "string" ? p : p.source, d = d || "";
      var h = {
        replace: function(o, l) {
          return l = l.source || l, l = l.replace(X, "$1"), p = p.replace(o, l), h;
        },
        getRegex: function() {
          return new RegExp(p, d);
        }
      };
      return h;
    }
    var ce = /[^\w:]/g, ue = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    function ae(p, d, h) {
      if (p) {
        var r;
        try {
          r = decodeURIComponent(q(h)).replace(ce, "").toLowerCase();
        } catch {
          return null;
        }
        if (r.indexOf("javascript:") === 0 || r.indexOf("vbscript:") === 0 || r.indexOf("data:") === 0)
          return null;
      }
      d && !ue.test(h) && (h = ke(d, h));
      try {
        h = encodeURI(h).replace(/%25/g, "%");
      } catch {
        return null;
      }
      return h;
    }
    var ee = {}, oe = /^[^:]+:\/*[^/]*$/, V = /^([^:]+:)[\s\S]*$/, G = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    function ke(p, d) {
      ee[" " + p] || (oe.test(p) ? ee[" " + p] = p + "/" : ee[" " + p] = Ee(p, "/", !0)), p = ee[" " + p];
      var h = p.indexOf(":") === -1;
      return d.substring(0, 2) === "//" ? h ? d : p.replace(V, "$1") + d : d.charAt(0) === "/" ? h ? d : p.replace(G, "$1") + d : p + d;
    }
    var fe = {
      exec: function() {
      }
    };
    function Fe(p, d) {
      var h = p.replace(/\|/g, function(l, s, f) {
        for (var w = !1, b = s; --b >= 0 && f[b] === "\\"; )
          w = !w;
        return w ? "|" : " |";
      }), r = h.split(/ \|/), o = 0;
      if (r[0].trim() || r.shift(), r.length > 0 && !r[r.length - 1].trim() && r.pop(), r.length > d)
        r.splice(d);
      else
        for (; r.length < d; )
          r.push("");
      for (; o < r.length; o++)
        r[o] = r[o].trim().replace(/\\\|/g, "|");
      return r;
    }
    function Ee(p, d, h) {
      var r = p.length;
      if (r === 0)
        return "";
      for (var o = 0; o < r; ) {
        var l = p.charAt(r - o - 1);
        if (l === d && !h)
          o++;
        else if (l !== d && h)
          o++;
        else
          break;
      }
      return p.slice(0, r - o);
    }
    function _e(p, d) {
      if (p.indexOf(d[1]) === -1)
        return -1;
      for (var h = p.length, r = 0, o = 0; o < h; o++)
        if (p[o] === "\\")
          o++;
        else if (p[o] === d[0])
          r++;
        else if (p[o] === d[1] && (r--, r < 0))
          return o;
      return -1;
    }
    function te(p) {
      p && p.sanitize && !p.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
    }
    function he(p, d) {
      if (d < 1)
        return "";
      for (var h = ""; d > 1; )
        d & 1 && (h += p), d >>= 1, p += p;
      return h + p;
    }
    function Fn(p, d, h, r) {
      var o = d.href, l = d.title ? $(d.title) : null, s = p[1].replace(/\\([\[\]])/g, "$1");
      if (p[0].charAt(0) !== "!") {
        r.state.inLink = !0;
        var f = {
          type: "link",
          raw: h,
          href: o,
          title: l,
          text: s,
          tokens: r.inlineTokens(s)
        };
        return r.state.inLink = !1, f;
      }
      return {
        type: "image",
        raw: h,
        href: o,
        title: l,
        text: $(s)
      };
    }
    function _u(p, d) {
      var h = p.match(/^(\s+)(?:```)/);
      if (h === null)
        return d;
      var r = h[1];
      return d.split(`
`).map(function(o) {
        var l = o.match(/^\s+/);
        if (l === null)
          return o;
        var s = l[0];
        return s.length >= r.length ? o.slice(r.length) : o;
      }).join(`
`);
    }
    var Xe = /* @__PURE__ */ function() {
      function p(h) {
        this.options = h || e.defaults;
      }
      var d = p.prototype;
      return d.space = function(r) {
        var o = this.rules.block.newline.exec(r);
        if (o && o[0].length > 0)
          return {
            type: "space",
            raw: o[0]
          };
      }, d.code = function(r) {
        var o = this.rules.block.code.exec(r);
        if (o) {
          var l = o[0].replace(/^ {1,4}/gm, "");
          return {
            type: "code",
            raw: o[0],
            codeBlockStyle: "indented",
            text: this.options.pedantic ? l : Ee(l, `
`)
          };
        }
      }, d.fences = function(r) {
        var o = this.rules.block.fences.exec(r);
        if (o) {
          var l = o[0], s = _u(l, o[3] || "");
          return {
            type: "code",
            raw: l,
            lang: o[2] ? o[2].trim().replace(this.rules.inline._escapes, "$1") : o[2],
            text: s
          };
        }
      }, d.heading = function(r) {
        var o = this.rules.block.heading.exec(r);
        if (o) {
          var l = o[2].trim();
          if (/#$/.test(l)) {
            var s = Ee(l, "#");
            (this.options.pedantic || !s || / $/.test(s)) && (l = s.trim());
          }
          return {
            type: "heading",
            raw: o[0],
            depth: o[1].length,
            text: l,
            tokens: this.lexer.inline(l)
          };
        }
      }, d.hr = function(r) {
        var o = this.rules.block.hr.exec(r);
        if (o)
          return {
            type: "hr",
            raw: o[0]
          };
      }, d.blockquote = function(r) {
        var o = this.rules.block.blockquote.exec(r);
        if (o) {
          var l = o[0].replace(/^ *>[ \t]?/gm, ""), s = this.lexer.state.top;
          this.lexer.state.top = !0;
          var f = this.lexer.blockTokens(l);
          return this.lexer.state.top = s, {
            type: "blockquote",
            raw: o[0],
            tokens: f,
            text: l
          };
        }
      }, d.list = function(r) {
        var o = this.rules.block.list.exec(r);
        if (o) {
          var l, s, f, w, b, y, F, z, C, T, v, L, Z = o[1].trim(), se = Z.length > 1, H = {
            type: "list",
            raw: "",
            ordered: se,
            start: se ? +Z.slice(0, -1) : "",
            loose: !1,
            items: []
          };
          Z = se ? "\\d{1,9}\\" + Z.slice(-1) : "\\" + Z, this.options.pedantic && (Z = se ? Z : "[*+-]");
          for (var Q = new RegExp("^( {0,3}" + Z + ")((?:[	 ][^\\n]*)?(?:\\n|$))"); r && (L = !1, !(!(o = Q.exec(r)) || this.rules.block.hr.test(r))); ) {
            if (l = o[0], r = r.substring(l.length), z = o[2].split(`
`, 1)[0].replace(/^\t+/, function(Ne) {
              return " ".repeat(3 * Ne.length);
            }), C = r.split(`
`, 1)[0], this.options.pedantic ? (w = 2, v = z.trimLeft()) : (w = o[2].search(/[^ ]/), w = w > 4 ? 1 : w, v = z.slice(w), w += o[1].length), y = !1, !z && /^ *$/.test(C) && (l += C + `
`, r = r.substring(C.length + 1), L = !0), !L)
              for (var Ie = new RegExp("^ {0," + Math.min(3, w - 1) + "}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))"), Pe = new RegExp("^ {0," + Math.min(3, w - 1) + "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"), me = new RegExp("^ {0," + Math.min(3, w - 1) + "}(?:```|~~~)"), $e = new RegExp("^ {0," + Math.min(3, w - 1) + "}#"); r && (T = r.split(`
`, 1)[0], C = T, this.options.pedantic && (C = C.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), !(me.test(C) || $e.test(C) || Ie.test(C) || Pe.test(r))); ) {
                if (C.search(/[^ ]/) >= w || !C.trim())
                  v += `
` + C.slice(w);
                else {
                  if (y || z.search(/[^ ]/) >= 4 || me.test(z) || $e.test(z) || Pe.test(z))
                    break;
                  v += `
` + C;
                }
                !y && !C.trim() && (y = !0), l += T + `
`, r = r.substring(T.length + 1), z = C.slice(w);
              }
            H.loose || (F ? H.loose = !0 : /\n *\n *$/.test(l) && (F = !0)), this.options.gfm && (s = /^\[[ xX]\] /.exec(v), s && (f = s[0] !== "[ ] ", v = v.replace(/^\[[ xX]\] +/, ""))), H.items.push({
              type: "list_item",
              raw: l,
              task: !!s,
              checked: f,
              loose: !1,
              text: v
            }), H.raw += l;
          }
          H.items[H.items.length - 1].raw = l.trimRight(), H.items[H.items.length - 1].text = v.trimRight(), H.raw = H.raw.trimRight();
          var Me = H.items.length;
          for (b = 0; b < Me; b++)
            if (this.lexer.state.top = !1, H.items[b].tokens = this.lexer.blockTokens(H.items[b].text, []), !H.loose) {
              var Oe = H.items[b].tokens.filter(function(Ne) {
                return Ne.type === "space";
              }), $u = Oe.length > 0 && Oe.some(function(Ne) {
                return /\n.*\n/.test(Ne.raw);
              });
              H.loose = $u;
            }
          if (H.loose)
            for (b = 0; b < Me; b++)
              H.items[b].loose = !0;
          return H;
        }
      }, d.html = function(r) {
        var o = this.rules.block.html.exec(r);
        if (o) {
          var l = {
            type: "html",
            raw: o[0],
            pre: !this.options.sanitizer && (o[1] === "pre" || o[1] === "script" || o[1] === "style"),
            text: o[0]
          };
          if (this.options.sanitize) {
            var s = this.options.sanitizer ? this.options.sanitizer(o[0]) : $(o[0]);
            l.type = "paragraph", l.text = s, l.tokens = this.lexer.inline(s);
          }
          return l;
        }
      }, d.def = function(r) {
        var o = this.rules.block.def.exec(r);
        if (o) {
          var l = o[1].toLowerCase().replace(/\s+/g, " "), s = o[2] ? o[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "", f = o[3] ? o[3].substring(1, o[3].length - 1).replace(this.rules.inline._escapes, "$1") : o[3];
          return {
            type: "def",
            tag: l,
            raw: o[0],
            href: s,
            title: f
          };
        }
      }, d.table = function(r) {
        var o = this.rules.block.table.exec(r);
        if (o) {
          var l = {
            type: "table",
            header: Fe(o[1]).map(function(F) {
              return {
                text: F
              };
            }),
            align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            rows: o[3] && o[3].trim() ? o[3].replace(/\n[ \t]*$/, "").split(`
`) : []
          };
          if (l.header.length === l.align.length) {
            l.raw = o[0];
            var s = l.align.length, f, w, b, y;
            for (f = 0; f < s; f++)
              /^ *-+: *$/.test(l.align[f]) ? l.align[f] = "right" : /^ *:-+: *$/.test(l.align[f]) ? l.align[f] = "center" : /^ *:-+ *$/.test(l.align[f]) ? l.align[f] = "left" : l.align[f] = null;
            for (s = l.rows.length, f = 0; f < s; f++)
              l.rows[f] = Fe(l.rows[f], l.header.length).map(function(F) {
                return {
                  text: F
                };
              });
            for (s = l.header.length, w = 0; w < s; w++)
              l.header[w].tokens = this.lexer.inline(l.header[w].text);
            for (s = l.rows.length, w = 0; w < s; w++)
              for (y = l.rows[w], b = 0; b < y.length; b++)
                y[b].tokens = this.lexer.inline(y[b].text);
            return l;
          }
        }
      }, d.lheading = function(r) {
        var o = this.rules.block.lheading.exec(r);
        if (o)
          return {
            type: "heading",
            raw: o[0],
            depth: o[2].charAt(0) === "=" ? 1 : 2,
            text: o[1],
            tokens: this.lexer.inline(o[1])
          };
      }, d.paragraph = function(r) {
        var o = this.rules.block.paragraph.exec(r);
        if (o) {
          var l = o[1].charAt(o[1].length - 1) === `
` ? o[1].slice(0, -1) : o[1];
          return {
            type: "paragraph",
            raw: o[0],
            text: l,
            tokens: this.lexer.inline(l)
          };
        }
      }, d.text = function(r) {
        var o = this.rules.block.text.exec(r);
        if (o)
          return {
            type: "text",
            raw: o[0],
            text: o[0],
            tokens: this.lexer.inline(o[0])
          };
      }, d.escape = function(r) {
        var o = this.rules.inline.escape.exec(r);
        if (o)
          return {
            type: "escape",
            raw: o[0],
            text: $(o[1])
          };
      }, d.tag = function(r) {
        var o = this.rules.inline.tag.exec(r);
        if (o)
          return !this.lexer.state.inLink && /^<a /i.test(o[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(o[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(o[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(o[0]) && (this.lexer.state.inRawBlock = !1), {
            type: this.options.sanitize ? "text" : "html",
            raw: o[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(o[0]) : $(o[0]) : o[0]
          };
      }, d.link = function(r) {
        var o = this.rules.inline.link.exec(r);
        if (o) {
          var l = o[2].trim();
          if (!this.options.pedantic && /^</.test(l)) {
            if (!/>$/.test(l))
              return;
            var s = Ee(l.slice(0, -1), "\\");
            if ((l.length - s.length) % 2 === 0)
              return;
          } else {
            var f = _e(o[2], "()");
            if (f > -1) {
              var w = o[0].indexOf("!") === 0 ? 5 : 4, b = w + o[1].length + f;
              o[2] = o[2].substring(0, f), o[0] = o[0].substring(0, b).trim(), o[3] = "";
            }
          }
          var y = o[2], F = "";
          if (this.options.pedantic) {
            var z = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(y);
            z && (y = z[1], F = z[3]);
          } else
            F = o[3] ? o[3].slice(1, -1) : "";
          return y = y.trim(), /^</.test(y) && (this.options.pedantic && !/>$/.test(l) ? y = y.slice(1) : y = y.slice(1, -1)), Fn(o, {
            href: y && y.replace(this.rules.inline._escapes, "$1"),
            title: F && F.replace(this.rules.inline._escapes, "$1")
          }, o[0], this.lexer);
        }
      }, d.reflink = function(r, o) {
        var l;
        if ((l = this.rules.inline.reflink.exec(r)) || (l = this.rules.inline.nolink.exec(r))) {
          var s = (l[2] || l[1]).replace(/\s+/g, " ");
          if (s = o[s.toLowerCase()], !s) {
            var f = l[0].charAt(0);
            return {
              type: "text",
              raw: f,
              text: f
            };
          }
          return Fn(l, s, l[0], this.lexer);
        }
      }, d.emStrong = function(r, o, l) {
        l === void 0 && (l = "");
        var s = this.rules.inline.emStrong.lDelim.exec(r);
        if (s && !(s[3] && l.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))) {
          var f = s[1] || s[2] || "";
          if (!f || f && (l === "" || this.rules.inline.punctuation.exec(l))) {
            var w = s[0].length - 1, b, y, F = w, z = 0, C = s[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
            for (C.lastIndex = 0, o = o.slice(-1 * r.length + w); (s = C.exec(o)) != null; )
              if (b = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !!b) {
                if (y = b.length, s[3] || s[4]) {
                  F += y;
                  continue;
                } else if ((s[5] || s[6]) && w % 3 && !((w + y) % 3)) {
                  z += y;
                  continue;
                }
                if (F -= y, !(F > 0)) {
                  y = Math.min(y, y + F + z);
                  var T = r.slice(0, w + s.index + (s[0].length - b.length) + y);
                  if (Math.min(w, y) % 2) {
                    var v = T.slice(1, -1);
                    return {
                      type: "em",
                      raw: T,
                      text: v,
                      tokens: this.lexer.inlineTokens(v)
                    };
                  }
                  var L = T.slice(2, -2);
                  return {
                    type: "strong",
                    raw: T,
                    text: L,
                    tokens: this.lexer.inlineTokens(L)
                  };
                }
              }
          }
        }
      }, d.codespan = function(r) {
        var o = this.rules.inline.code.exec(r);
        if (o) {
          var l = o[2].replace(/\n/g, " "), s = /[^ ]/.test(l), f = /^ /.test(l) && / $/.test(l);
          return s && f && (l = l.substring(1, l.length - 1)), l = $(l, !0), {
            type: "codespan",
            raw: o[0],
            text: l
          };
        }
      }, d.br = function(r) {
        var o = this.rules.inline.br.exec(r);
        if (o)
          return {
            type: "br",
            raw: o[0]
          };
      }, d.del = function(r) {
        var o = this.rules.inline.del.exec(r);
        if (o)
          return {
            type: "del",
            raw: o[0],
            text: o[2],
            tokens: this.lexer.inlineTokens(o[2])
          };
      }, d.autolink = function(r, o) {
        var l = this.rules.inline.autolink.exec(r);
        if (l) {
          var s, f;
          return l[2] === "@" ? (s = $(this.options.mangle ? o(l[1]) : l[1]), f = "mailto:" + s) : (s = $(l[1]), f = s), {
            type: "link",
            raw: l[0],
            text: s,
            href: f,
            tokens: [{
              type: "text",
              raw: s,
              text: s
            }]
          };
        }
      }, d.url = function(r, o) {
        var l;
        if (l = this.rules.inline.url.exec(r)) {
          var s, f;
          if (l[2] === "@")
            s = $(this.options.mangle ? o(l[0]) : l[0]), f = "mailto:" + s;
          else {
            var w;
            do
              w = l[0], l[0] = this.rules.inline._backpedal.exec(l[0])[0];
            while (w !== l[0]);
            s = $(l[0]), l[1] === "www." ? f = "http://" + l[0] : f = l[0];
          }
          return {
            type: "link",
            raw: l[0],
            text: s,
            href: f,
            tokens: [{
              type: "text",
              raw: s,
              text: s
            }]
          };
        }
      }, d.inlineText = function(r, o) {
        var l = this.rules.inline.text.exec(r);
        if (l) {
          var s;
          return this.lexer.state.inRawBlock ? s = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(l[0]) : $(l[0]) : l[0] : s = $(this.options.smartypants ? o(l[0]) : l[0]), {
            type: "text",
            raw: l[0],
            text: s
          };
        }
      }, p;
    }(), B = {
      newline: /^(?: *(?:\n|$))+/,
      code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
      fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
      hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
      html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
      def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
      table: fe,
      lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
      // regex template, placeholders will be replaced according to different paragraph
      // interruption rules of commonmark and the original markdown spec:
      _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
      text: /^[^\n]+/
    };
    B._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/, B._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/, B.def = M(B.def).replace("label", B._label).replace("title", B._title).getRegex(), B.bullet = /(?:[*+-]|\d{1,9}[.)])/, B.listItemStart = M(/^( *)(bull) */).replace("bull", B.bullet).getRegex(), B.list = M(B.list).replace(/bull/g, B.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + B.def.source + ")").getRegex(), B._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", B._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, B.html = M(B.html, "i").replace("comment", B._comment).replace("tag", B._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), B.paragraph = M(B._paragraph).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", B._tag).getRegex(), B.blockquote = M(B.blockquote).replace("paragraph", B.paragraph).getRegex(), B.normal = u({}, B), B.gfm = u({}, B.normal, {
      table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
      // Cells
    }), B.gfm.table = M(B.gfm.table).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", B._tag).getRegex(), B.gfm.paragraph = M(B._paragraph).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", B.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", B._tag).getRegex(), B.pedantic = u({}, B.normal, {
      html: M(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", B._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: fe,
      // fences not supported
      lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
      paragraph: M(B.normal._paragraph).replace("hr", B.hr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", B.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    });
    var k = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: fe,
      tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
      // CDATA section
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(ref)\]/,
      nolink: /^!?\[(ref)\](?:\[\])?/,
      reflinkSearch: "reflink|nolink(?!\\()",
      emStrong: {
        lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
        //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
        //          () Skip orphan inside strong                                      () Consume to delim     (1) #***                (2) a***#, a***                             (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
        rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
        rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
        // ^- Not allowed for _
      },
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      br: /^( {2,}|\\)\n(?!\s*$)/,
      del: fe,
      text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
      punctuation: /^([\spunctuation])/
    };
    k._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~", k.punctuation = M(k.punctuation).replace(/punctuation/g, k._punctuation).getRegex(), k.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g, k.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g, k._comment = M(B._comment).replace("(?:-->|$)", "-->").getRegex(), k.emStrong.lDelim = M(k.emStrong.lDelim).replace(/punct/g, k._punctuation).getRegex(), k.emStrong.rDelimAst = M(k.emStrong.rDelimAst, "g").replace(/punct/g, k._punctuation).getRegex(), k.emStrong.rDelimUnd = M(k.emStrong.rDelimUnd, "g").replace(/punct/g, k._punctuation).getRegex(), k._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, k._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, k._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, k.autolink = M(k.autolink).replace("scheme", k._scheme).replace("email", k._email).getRegex(), k._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, k.tag = M(k.tag).replace("comment", k._comment).replace("attribute", k._attribute).getRegex(), k._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, k._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, k._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, k.link = M(k.link).replace("label", k._label).replace("href", k._href).replace("title", k._title).getRegex(), k.reflink = M(k.reflink).replace("label", k._label).replace("ref", B._label).getRegex(), k.nolink = M(k.nolink).replace("ref", B._label).getRegex(), k.reflinkSearch = M(k.reflinkSearch, "g").replace("reflink", k.reflink).replace("nolink", k.nolink).getRegex(), k.normal = u({}, k), k.pedantic = u({}, k.normal, {
      strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
      },
      em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
      },
      link: M(/^!?\[(label)\]\((.*?)\)/).replace("label", k._label).getRegex(),
      reflink: M(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", k._label).getRegex()
    }), k.gfm = u({}, k.normal, {
      escape: M(k.escape).replace("])", "~|])").getRegex(),
      _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    }), k.gfm.url = M(k.gfm.url, "i").replace("email", k.gfm._extended_email).getRegex(), k.breaks = u({}, k.gfm, {
      br: M(k.br).replace("{2,}", "*").getRegex(),
      text: M(k.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    });
    function vu(p) {
      return p.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
    }
    function En(p) {
      var d = "", h, r, o = p.length;
      for (h = 0; h < o; h++)
        r = p.charCodeAt(h), Math.random() > 0.5 && (r = "x" + r.toString(16)), d += "&#" + r + ";";
      return d;
    }
    var xe = /* @__PURE__ */ function() {
      function p(h) {
        this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = h || e.defaults, this.options.tokenizer = this.options.tokenizer || new Xe(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
          inLink: !1,
          inRawBlock: !1,
          top: !0
        };
        var r = {
          block: B.normal,
          inline: k.normal
        };
        this.options.pedantic ? (r.block = B.pedantic, r.inline = k.pedantic) : this.options.gfm && (r.block = B.gfm, this.options.breaks ? r.inline = k.breaks : r.inline = k.gfm), this.tokenizer.rules = r;
      }
      p.lex = function(r, o) {
        var l = new p(o);
        return l.lex(r);
      }, p.lexInline = function(r, o) {
        var l = new p(o);
        return l.inlineTokens(r);
      };
      var d = p.prototype;
      return d.lex = function(r) {
        r = r.replace(/\r\n|\r/g, `
`), this.blockTokens(r, this.tokens);
        for (var o; o = this.inlineQueue.shift(); )
          this.inlineTokens(o.src, o.tokens);
        return this.tokens;
      }, d.blockTokens = function(r, o) {
        var l = this;
        o === void 0 && (o = []), this.options.pedantic ? r = r.replace(/\t/g, "    ").replace(/^ +$/gm, "") : r = r.replace(/^( *)(\t+)/gm, function(F, z, C) {
          return z + "    ".repeat(C.length);
        });
        for (var s, f, w, b; r; )
          if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(function(F) {
            return (s = F.call({
              lexer: l
            }, r, o)) ? (r = r.substring(s.raw.length), o.push(s), !0) : !1;
          }))) {
            if (s = this.tokenizer.space(r)) {
              r = r.substring(s.raw.length), s.raw.length === 1 && o.length > 0 ? o[o.length - 1].raw += `
` : o.push(s);
              continue;
            }
            if (s = this.tokenizer.code(r)) {
              r = r.substring(s.raw.length), f = o[o.length - 1], f && (f.type === "paragraph" || f.type === "text") ? (f.raw += `
` + s.raw, f.text += `
` + s.text, this.inlineQueue[this.inlineQueue.length - 1].src = f.text) : o.push(s);
              continue;
            }
            if (s = this.tokenizer.fences(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.heading(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.hr(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.blockquote(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.list(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.html(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.def(r)) {
              r = r.substring(s.raw.length), f = o[o.length - 1], f && (f.type === "paragraph" || f.type === "text") ? (f.raw += `
` + s.raw, f.text += `
` + s.raw, this.inlineQueue[this.inlineQueue.length - 1].src = f.text) : this.tokens.links[s.tag] || (this.tokens.links[s.tag] = {
                href: s.href,
                title: s.title
              });
              continue;
            }
            if (s = this.tokenizer.table(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.lheading(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (w = r, this.options.extensions && this.options.extensions.startBlock && function() {
              var F = 1 / 0, z = r.slice(1), C = void 0;
              l.options.extensions.startBlock.forEach(function(T) {
                C = T.call({
                  lexer: this
                }, z), typeof C == "number" && C >= 0 && (F = Math.min(F, C));
              }), F < 1 / 0 && F >= 0 && (w = r.substring(0, F + 1));
            }(), this.state.top && (s = this.tokenizer.paragraph(w))) {
              f = o[o.length - 1], b && f.type === "paragraph" ? (f.raw += `
` + s.raw, f.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = f.text) : o.push(s), b = w.length !== r.length, r = r.substring(s.raw.length);
              continue;
            }
            if (s = this.tokenizer.text(r)) {
              r = r.substring(s.raw.length), f = o[o.length - 1], f && f.type === "text" ? (f.raw += `
` + s.raw, f.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = f.text) : o.push(s);
              continue;
            }
            if (r) {
              var y = "Infinite loop on byte: " + r.charCodeAt(0);
              if (this.options.silent) {
                console.error(y);
                break;
              } else
                throw new Error(y);
            }
          }
        return this.state.top = !0, o;
      }, d.inline = function(r, o) {
        return o === void 0 && (o = []), this.inlineQueue.push({
          src: r,
          tokens: o
        }), o;
      }, d.inlineTokens = function(r, o) {
        var l = this;
        o === void 0 && (o = []);
        var s, f, w, b = r, y, F, z;
        if (this.tokens.links) {
          var C = Object.keys(this.tokens.links);
          if (C.length > 0)
            for (; (y = this.tokenizer.rules.inline.reflinkSearch.exec(b)) != null; )
              C.includes(y[0].slice(y[0].lastIndexOf("[") + 1, -1)) && (b = b.slice(0, y.index) + "[" + he("a", y[0].length - 2) + "]" + b.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
        }
        for (; (y = this.tokenizer.rules.inline.blockSkip.exec(b)) != null; )
          b = b.slice(0, y.index) + "[" + he("a", y[0].length - 2) + "]" + b.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (; (y = this.tokenizer.rules.inline.escapedEmSt.exec(b)) != null; )
          b = b.slice(0, y.index + y[0].length - 2) + "++" + b.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex), this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
        for (; r; )
          if (F || (z = ""), F = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(function(v) {
            return (s = v.call({
              lexer: l
            }, r, o)) ? (r = r.substring(s.raw.length), o.push(s), !0) : !1;
          }))) {
            if (s = this.tokenizer.escape(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.tag(r)) {
              r = r.substring(s.raw.length), f = o[o.length - 1], f && s.type === "text" && f.type === "text" ? (f.raw += s.raw, f.text += s.text) : o.push(s);
              continue;
            }
            if (s = this.tokenizer.link(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.reflink(r, this.tokens.links)) {
              r = r.substring(s.raw.length), f = o[o.length - 1], f && s.type === "text" && f.type === "text" ? (f.raw += s.raw, f.text += s.text) : o.push(s);
              continue;
            }
            if (s = this.tokenizer.emStrong(r, b, z)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.codespan(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.br(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.del(r)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (s = this.tokenizer.autolink(r, En)) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (!this.state.inLink && (s = this.tokenizer.url(r, En))) {
              r = r.substring(s.raw.length), o.push(s);
              continue;
            }
            if (w = r, this.options.extensions && this.options.extensions.startInline && function() {
              var v = 1 / 0, L = r.slice(1), Z = void 0;
              l.options.extensions.startInline.forEach(function(se) {
                Z = se.call({
                  lexer: this
                }, L), typeof Z == "number" && Z >= 0 && (v = Math.min(v, Z));
              }), v < 1 / 0 && v >= 0 && (w = r.substring(0, v + 1));
            }(), s = this.tokenizer.inlineText(w, vu)) {
              r = r.substring(s.raw.length), s.raw.slice(-1) !== "_" && (z = s.raw.slice(-1)), F = !0, f = o[o.length - 1], f && f.type === "text" ? (f.raw += s.raw, f.text += s.text) : o.push(s);
              continue;
            }
            if (r) {
              var T = "Infinite loop on byte: " + r.charCodeAt(0);
              if (this.options.silent) {
                console.error(T);
                break;
              } else
                throw new Error(T);
            }
          }
        return o;
      }, n(p, null, [{
        key: "rules",
        get: function() {
          return {
            block: B,
            inline: k
          };
        }
      }]), p;
    }(), Je = /* @__PURE__ */ function() {
      function p(h) {
        this.options = h || e.defaults;
      }
      var d = p.prototype;
      return d.code = function(r, o, l) {
        var s = (o || "").match(/\S*/)[0];
        if (this.options.highlight) {
          var f = this.options.highlight(r, s);
          f != null && f !== r && (l = !0, r = f);
        }
        return r = r.replace(/\n$/, "") + `
`, s ? '<pre><code class="' + this.options.langPrefix + $(s) + '">' + (l ? r : $(r, !0)) + `</code></pre>
` : "<pre><code>" + (l ? r : $(r, !0)) + `</code></pre>
`;
      }, d.blockquote = function(r) {
        return `<blockquote>
` + r + `</blockquote>
`;
      }, d.html = function(r) {
        return r;
      }, d.heading = function(r, o, l, s) {
        if (this.options.headerIds) {
          var f = this.options.headerPrefix + s.slug(l);
          return "<h" + o + ' id="' + f + '">' + r + "</h" + o + `>
`;
        }
        return "<h" + o + ">" + r + "</h" + o + `>
`;
      }, d.hr = function() {
        return this.options.xhtml ? `<hr/>
` : `<hr>
`;
      }, d.list = function(r, o, l) {
        var s = o ? "ol" : "ul", f = o && l !== 1 ? ' start="' + l + '"' : "";
        return "<" + s + f + `>
` + r + "</" + s + `>
`;
      }, d.listitem = function(r) {
        return "<li>" + r + `</li>
`;
      }, d.checkbox = function(r) {
        return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
      }, d.paragraph = function(r) {
        return "<p>" + r + `</p>
`;
      }, d.table = function(r, o) {
        return o && (o = "<tbody>" + o + "</tbody>"), `<table>
<thead>
` + r + `</thead>
` + o + `</table>
`;
      }, d.tablerow = function(r) {
        return `<tr>
` + r + `</tr>
`;
      }, d.tablecell = function(r, o) {
        var l = o.header ? "th" : "td", s = o.align ? "<" + l + ' align="' + o.align + '">' : "<" + l + ">";
        return s + r + ("</" + l + `>
`);
      }, d.strong = function(r) {
        return "<strong>" + r + "</strong>";
      }, d.em = function(r) {
        return "<em>" + r + "</em>";
      }, d.codespan = function(r) {
        return "<code>" + r + "</code>";
      }, d.br = function() {
        return this.options.xhtml ? "<br/>" : "<br>";
      }, d.del = function(r) {
        return "<del>" + r + "</del>";
      }, d.link = function(r, o, l) {
        if (r = ae(this.options.sanitize, this.options.baseUrl, r), r === null)
          return l;
        var s = '<a href="' + r + '"';
        return o && (s += ' title="' + o + '"'), s += ">" + l + "</a>", s;
      }, d.image = function(r, o, l) {
        if (r = ae(this.options.sanitize, this.options.baseUrl, r), r === null)
          return l;
        var s = '<img src="' + r + '" alt="' + l + '"';
        return o && (s += ' title="' + o + '"'), s += this.options.xhtml ? "/>" : ">", s;
      }, d.text = function(r) {
        return r;
      }, p;
    }(), dt = /* @__PURE__ */ function() {
      function p() {
      }
      var d = p.prototype;
      return d.strong = function(r) {
        return r;
      }, d.em = function(r) {
        return r;
      }, d.codespan = function(r) {
        return r;
      }, d.del = function(r) {
        return r;
      }, d.html = function(r) {
        return r;
      }, d.text = function(r) {
        return r;
      }, d.link = function(r, o, l) {
        return "" + l;
      }, d.image = function(r, o, l) {
        return "" + l;
      }, d.br = function() {
        return "";
      }, p;
    }(), gt = /* @__PURE__ */ function() {
      function p() {
        this.seen = {};
      }
      var d = p.prototype;
      return d.serialize = function(r) {
        return r.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
      }, d.getNextSafeSlug = function(r, o) {
        var l = r, s = 0;
        if (this.seen.hasOwnProperty(l)) {
          s = this.seen[r];
          do
            s++, l = r + "-" + s;
          while (this.seen.hasOwnProperty(l));
        }
        return o || (this.seen[r] = s, this.seen[l] = 0), l;
      }, d.slug = function(r, o) {
        o === void 0 && (o = {});
        var l = this.serialize(r);
        return this.getNextSafeSlug(l, o.dryrun);
      }, p;
    }(), Ae = /* @__PURE__ */ function() {
      function p(h) {
        this.options = h || e.defaults, this.options.renderer = this.options.renderer || new Je(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new dt(), this.slugger = new gt();
      }
      p.parse = function(r, o) {
        var l = new p(o);
        return l.parse(r);
      }, p.parseInline = function(r, o) {
        var l = new p(o);
        return l.parseInline(r);
      };
      var d = p.prototype;
      return d.parse = function(r, o) {
        o === void 0 && (o = !0);
        var l = "", s, f, w, b, y, F, z, C, T, v, L, Z, se, H, Q, Ie, Pe, me, $e, Me = r.length;
        for (s = 0; s < Me; s++) {
          if (v = r[s], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[v.type] && ($e = this.options.extensions.renderers[v.type].call({
            parser: this
          }, v), $e !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(v.type))) {
            l += $e || "";
            continue;
          }
          switch (v.type) {
            case "space":
              continue;
            case "hr": {
              l += this.renderer.hr();
              continue;
            }
            case "heading": {
              l += this.renderer.heading(this.parseInline(v.tokens), v.depth, q(this.parseInline(v.tokens, this.textRenderer)), this.slugger);
              continue;
            }
            case "code": {
              l += this.renderer.code(v.text, v.lang, v.escaped);
              continue;
            }
            case "table": {
              for (C = "", z = "", b = v.header.length, f = 0; f < b; f++)
                z += this.renderer.tablecell(this.parseInline(v.header[f].tokens), {
                  header: !0,
                  align: v.align[f]
                });
              for (C += this.renderer.tablerow(z), T = "", b = v.rows.length, f = 0; f < b; f++) {
                for (F = v.rows[f], z = "", y = F.length, w = 0; w < y; w++)
                  z += this.renderer.tablecell(this.parseInline(F[w].tokens), {
                    header: !1,
                    align: v.align[w]
                  });
                T += this.renderer.tablerow(z);
              }
              l += this.renderer.table(C, T);
              continue;
            }
            case "blockquote": {
              T = this.parse(v.tokens), l += this.renderer.blockquote(T);
              continue;
            }
            case "list": {
              for (L = v.ordered, Z = v.start, se = v.loose, b = v.items.length, T = "", f = 0; f < b; f++)
                Q = v.items[f], Ie = Q.checked, Pe = Q.task, H = "", Q.task && (me = this.renderer.checkbox(Ie), se ? Q.tokens.length > 0 && Q.tokens[0].type === "paragraph" ? (Q.tokens[0].text = me + " " + Q.tokens[0].text, Q.tokens[0].tokens && Q.tokens[0].tokens.length > 0 && Q.tokens[0].tokens[0].type === "text" && (Q.tokens[0].tokens[0].text = me + " " + Q.tokens[0].tokens[0].text)) : Q.tokens.unshift({
                  type: "text",
                  text: me
                }) : H += me), H += this.parse(Q.tokens, se), T += this.renderer.listitem(H, Pe, Ie);
              l += this.renderer.list(T, L, Z);
              continue;
            }
            case "html": {
              l += this.renderer.html(v.text);
              continue;
            }
            case "paragraph": {
              l += this.renderer.paragraph(this.parseInline(v.tokens));
              continue;
            }
            case "text": {
              for (T = v.tokens ? this.parseInline(v.tokens) : v.text; s + 1 < Me && r[s + 1].type === "text"; )
                v = r[++s], T += `
` + (v.tokens ? this.parseInline(v.tokens) : v.text);
              l += o ? this.renderer.paragraph(T) : T;
              continue;
            }
            default: {
              var Oe = 'Token with "' + v.type + '" type was not found.';
              if (this.options.silent) {
                console.error(Oe);
                return;
              } else
                throw new Error(Oe);
            }
          }
        }
        return l;
      }, d.parseInline = function(r, o) {
        o = o || this.renderer;
        var l = "", s, f, w, b = r.length;
        for (s = 0; s < b; s++) {
          if (f = r[s], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[f.type] && (w = this.options.extensions.renderers[f.type].call({
            parser: this
          }, f), w !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(f.type))) {
            l += w || "";
            continue;
          }
          switch (f.type) {
            case "escape": {
              l += o.text(f.text);
              break;
            }
            case "html": {
              l += o.html(f.text);
              break;
            }
            case "link": {
              l += o.link(f.href, f.title, this.parseInline(f.tokens, o));
              break;
            }
            case "image": {
              l += o.image(f.href, f.title, f.text);
              break;
            }
            case "strong": {
              l += o.strong(this.parseInline(f.tokens, o));
              break;
            }
            case "em": {
              l += o.em(this.parseInline(f.tokens, o));
              break;
            }
            case "codespan": {
              l += o.codespan(f.text);
              break;
            }
            case "br": {
              l += o.br();
              break;
            }
            case "del": {
              l += o.del(this.parseInline(f.tokens, o));
              break;
            }
            case "text": {
              l += o.text(f.text);
              break;
            }
            default: {
              var y = 'Token with "' + f.type + '" type was not found.';
              if (this.options.silent) {
                console.error(y);
                return;
              } else
                throw new Error(y);
            }
          }
        }
        return l;
      }, p;
    }(), ze = /* @__PURE__ */ function() {
      function p(h) {
        this.options = h || e.defaults;
      }
      var d = p.prototype;
      return d.preprocess = function(r) {
        return r;
      }, d.postprocess = function(r) {
        return r;
      }, p;
    }();
    ze.passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess"]);
    function wu(p, d, h) {
      return function(r) {
        if (r.message += `
Please report this to https://github.com/markedjs/marked.`, p) {
          var o = "<p>An error occurred:</p><pre>" + $(r.message + "", !0) + "</pre>";
          if (d)
            return Promise.resolve(o);
          if (h) {
            h(null, o);
            return;
          }
          return o;
        }
        if (d)
          return Promise.reject(r);
        if (h) {
          h(r);
          return;
        }
        throw r;
      };
    }
    function xn(p, d) {
      return function(h, r, o) {
        typeof r == "function" && (o = r, r = null);
        var l = u({}, r);
        r = u({}, S.defaults, l);
        var s = wu(r.silent, r.async, o);
        if (typeof h > "u" || h === null)
          return s(new Error("marked(): input parameter is undefined or null"));
        if (typeof h != "string")
          return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(h) + ", string expected"));
        if (te(r), r.hooks && (r.hooks.options = r), o) {
          var f = r.highlight, w;
          try {
            r.hooks && (h = r.hooks.preprocess(h)), w = p(h, r);
          } catch (C) {
            return s(C);
          }
          var b = function(T) {
            var v;
            if (!T)
              try {
                r.walkTokens && S.walkTokens(w, r.walkTokens), v = d(w, r), r.hooks && (v = r.hooks.postprocess(v));
              } catch (L) {
                T = L;
              }
            return r.highlight = f, T ? s(T) : o(null, v);
          };
          if (!f || f.length < 3 || (delete r.highlight, !w.length))
            return b();
          var y = 0;
          S.walkTokens(w, function(C) {
            C.type === "code" && (y++, setTimeout(function() {
              f(C.text, C.lang, function(T, v) {
                if (T)
                  return b(T);
                v != null && v !== C.text && (C.text = v, C.escaped = !0), y--, y === 0 && b();
              });
            }, 0));
          }), y === 0 && b();
          return;
        }
        if (r.async)
          return Promise.resolve(r.hooks ? r.hooks.preprocess(h) : h).then(function(C) {
            return p(C, r);
          }).then(function(C) {
            return r.walkTokens ? Promise.all(S.walkTokens(C, r.walkTokens)).then(function() {
              return C;
            }) : C;
          }).then(function(C) {
            return d(C, r);
          }).then(function(C) {
            return r.hooks ? r.hooks.postprocess(C) : C;
          }).catch(s);
        try {
          r.hooks && (h = r.hooks.preprocess(h));
          var F = p(h, r);
          r.walkTokens && S.walkTokens(F, r.walkTokens);
          var z = d(F, r);
          return r.hooks && (z = r.hooks.postprocess(z)), z;
        } catch (C) {
          return s(C);
        }
      };
    }
    function S(p, d, h) {
      return xn(xe.lex, Ae.parse)(p, d, h);
    }
    S.options = S.setOptions = function(p) {
      return S.defaults = u({}, S.defaults, p), E(S.defaults), S;
    }, S.getDefaults = _, S.defaults = e.defaults, S.use = function() {
      for (var p = S.defaults.extensions || {
        renderers: {},
        childTokens: {}
      }, d = arguments.length, h = new Array(d), r = 0; r < d; r++)
        h[r] = arguments[r];
      h.forEach(function(o) {
        var l = u({}, o);
        if (l.async = S.defaults.async || l.async || !1, o.extensions && (o.extensions.forEach(function(f) {
          if (!f.name)
            throw new Error("extension name required");
          if (f.renderer) {
            var w = p.renderers[f.name];
            w ? p.renderers[f.name] = function() {
              for (var b = arguments.length, y = new Array(b), F = 0; F < b; F++)
                y[F] = arguments[F];
              var z = f.renderer.apply(this, y);
              return z === !1 && (z = w.apply(this, y)), z;
            } : p.renderers[f.name] = f.renderer;
          }
          if (f.tokenizer) {
            if (!f.level || f.level !== "block" && f.level !== "inline")
              throw new Error("extension level must be 'block' or 'inline'");
            p[f.level] ? p[f.level].unshift(f.tokenizer) : p[f.level] = [f.tokenizer], f.start && (f.level === "block" ? p.startBlock ? p.startBlock.push(f.start) : p.startBlock = [f.start] : f.level === "inline" && (p.startInline ? p.startInline.push(f.start) : p.startInline = [f.start]));
          }
          f.childTokens && (p.childTokens[f.name] = f.childTokens);
        }), l.extensions = p), o.renderer && function() {
          var f = S.defaults.renderer || new Je(), w = function(F) {
            var z = f[F];
            f[F] = function() {
              for (var C = arguments.length, T = new Array(C), v = 0; v < C; v++)
                T[v] = arguments[v];
              var L = o.renderer[F].apply(f, T);
              return L === !1 && (L = z.apply(f, T)), L;
            };
          };
          for (var b in o.renderer)
            w(b);
          l.renderer = f;
        }(), o.tokenizer && function() {
          var f = S.defaults.tokenizer || new Xe(), w = function(F) {
            var z = f[F];
            f[F] = function() {
              for (var C = arguments.length, T = new Array(C), v = 0; v < C; v++)
                T[v] = arguments[v];
              var L = o.tokenizer[F].apply(f, T);
              return L === !1 && (L = z.apply(f, T)), L;
            };
          };
          for (var b in o.tokenizer)
            w(b);
          l.tokenizer = f;
        }(), o.hooks && function() {
          var f = S.defaults.hooks || new ze(), w = function(F) {
            var z = f[F];
            ze.passThroughHooks.has(F) ? f[F] = function(C) {
              if (S.defaults.async)
                return Promise.resolve(o.hooks[F].call(f, C)).then(function(v) {
                  return z.call(f, v);
                });
              var T = o.hooks[F].call(f, C);
              return z.call(f, T);
            } : f[F] = function() {
              for (var C = arguments.length, T = new Array(C), v = 0; v < C; v++)
                T[v] = arguments[v];
              var L = o.hooks[F].apply(f, T);
              return L === !1 && (L = z.apply(f, T)), L;
            };
          };
          for (var b in o.hooks)
            w(b);
          l.hooks = f;
        }(), o.walkTokens) {
          var s = S.defaults.walkTokens;
          l.walkTokens = function(f) {
            var w = [];
            return w.push(o.walkTokens.call(this, f)), s && (w = w.concat(s.call(this, f))), w;
          };
        }
        S.setOptions(l);
      });
    }, S.walkTokens = function(p, d) {
      for (var h = [], r = function() {
        var f = l.value;
        switch (h = h.concat(d.call(S, f)), f.type) {
          case "table": {
            for (var w = c(f.header), b; !(b = w()).done; ) {
              var y = b.value;
              h = h.concat(S.walkTokens(y.tokens, d));
            }
            for (var F = c(f.rows), z; !(z = F()).done; )
              for (var C = z.value, T = c(C), v; !(v = T()).done; ) {
                var L = v.value;
                h = h.concat(S.walkTokens(L.tokens, d));
              }
            break;
          }
          case "list": {
            h = h.concat(S.walkTokens(f.items, d));
            break;
          }
          default:
            S.defaults.extensions && S.defaults.extensions.childTokens && S.defaults.extensions.childTokens[f.type] ? S.defaults.extensions.childTokens[f.type].forEach(function(Z) {
              h = h.concat(S.walkTokens(f[Z], d));
            }) : f.tokens && (h = h.concat(S.walkTokens(f.tokens, d)));
        }
      }, o = c(p), l; !(l = o()).done; )
        r();
      return h;
    }, S.parseInline = xn(xe.lexInline, Ae.parseInline), S.Parser = Ae, S.parser = Ae.parse, S.Renderer = Je, S.TextRenderer = dt, S.Lexer = xe, S.lexer = xe.lex, S.Tokenizer = Xe, S.Slugger = gt, S.Hooks = ze, S.parse = S;
    var bu = S.options, Cu = S.setOptions, yu = S.use, ku = S.walkTokens, Fu = S.parseInline, Eu = S, xu = Ae.parse, Au = xe.lex;
    e.Hooks = ze, e.Lexer = xe, e.Parser = Ae, e.Renderer = Je, e.Slugger = gt, e.TextRenderer = dt, e.Tokenizer = Xe, e.getDefaults = _, e.lexer = Au, e.marked = S, e.options = bu, e.parse = Eu, e.parseInline = Fu, e.parser = xu, e.setOptions = Cu, e.use = yu, e.walkTokens = ku;
  })(an);
  const cr = ur, fr = lr.default, { marked: hr } = an;
  var pr = dr;
  function dr(e, t) {
    t = t || {};
    const n = t.h || cr.h;
    let u;
    if (typeof e == "string")
      u = e, e = {};
    else if (e && typeof e.markdown == "string")
      u = e.markdown;
    else
      throw new Error("Invalid arguments. Markdown requires either a `<String>` or object: `{markdown: <String>}`");
    const a = e.markupOpts || t.markupOpts || {}, i = e.markedOpts || t.markedOpts || e.markdownOpts || t.markdownOpts || {};
    return (e.markdownOpts || t.markdownOpts) && console.warn("DEPRECATED: `.markdownOpts` Use `.markedOpts`"), n(fr, Object.assign({
      markup: hr(u, i),
      trim: !1,
      type: "html"
    }, a));
  }
  const gr = /* @__PURE__ */ rr(pr);
  function mr(e) {
    return new Date(e).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  }
  function Dr({
    content: e,
    createdAt: t,
    tags: n,
    template: u,
    attachments: a = []
  }) {
    const [i, c] = ie(window.innerWidth <= 768);
    be(() => {
      const E = () => {
        c(window.innerWidth <= 768);
      };
      return window.addEventListener("resize", E), () => window.removeEventListener("resize", E);
    }, []);
    const g = a.filter(
      (E) => E.type && E.type.startsWith("image/")
    ), D = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: ${u.tagBackgroundColor};
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: ${u.tagTextColor};
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: ${u.dateColor};
    }
  `, _ = `
    .markdown-content {
      font-size: ${i ? "0.9rem" : "1rem"};
      line-height: 1.7;
    }
    
    .markdown-content h1, 
    .markdown-content h2, 
    .markdown-content h3, 
    .markdown-content h4, 
    .markdown-content h5, 
    .markdown-content h6 {
      color: ${u.textColor};
      font-weight: bold;
      margin-top: ${i ? "0.8rem" : "1.2rem"};
      margin-bottom: ${i ? "0.6rem" : "0.8rem"};
      line-height: 1.3;
    }
    
    .markdown-content h1 {
      font-size: ${i ? "1.3rem" : "1.7rem"};
    }
    
    .markdown-content h2 {
      font-size: ${i ? "1.15rem" : "1.5rem"};
    }
    
    .markdown-content h3 {
      font-size: ${i ? "1rem" : "1.3rem"};
    }
    
    .markdown-content p {
      margin-bottom: ${i ? "0.6rem" : "0.8rem"};
      line-height: 1.7;
    }
    
    .markdown-content ul, 
    .markdown-content ol {
      padding-left: ${i ? "1rem" : "1.2rem"};
      margin-bottom: ${i ? "0.6rem" : "0.8rem"};
    }
    
    .markdown-content li {
      margin-bottom: ${i ? "0.3rem" : "0.4rem"};
    }
    
    .markdown-content code {
      background-color: ${u.tagBackgroundColor};
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-size: ${i ? "0.7rem" : "0.85rem"};
      font-family: monospace;
    }
    
    .markdown-content pre {
      background-color: ${u.tagBackgroundColor};
      padding: ${i ? "0.6rem" : "0.8rem"};
      border-radius: 0.4rem;
      overflow: auto;
      margin-bottom: ${i ? "0.6rem" : "0.8rem"};
      max-width: 100%;
    }
    
    .markdown-content pre code {
      background-color: transparent;
      padding: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    
    .markdown-content blockquote {
      border-left: 3px solid ${u.tagBackgroundColor};
      padding-left: ${i ? "0.6rem" : "0.8rem"};
      margin-left: 0;
      margin-bottom: ${i ? "0.6rem" : "0.8rem"};
      color: ${u.dateColor};
    }
    
    .markdown-content a {
      color: ${u.accentColor || "#3b82f6"};
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .markdown-content a:hover {
      color: ${u.accentColor ? u.accentColor : "#2563eb"};
      text-decoration: underline;
    }
    
    .markdown-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.4rem;
      margin-bottom: ${i ? "0.6rem" : "0.8rem"};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }
    
    .markdown-content hr {
      border: none;
      border-top: 1px solid ${u.tagBackgroundColor};
      margin: ${i ? "1rem 0" : "1.2rem 0"};
    }
    
    /* Improved table styles */
    .markdown-content table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: ${i ? "0.6rem" : "0.8rem"};
      overflow-x: auto;
      display: block;
      border-radius: 0.4rem;
      border: 1px solid ${u.tagBackgroundColor};
    }
    
    .markdown-content th, 
    .markdown-content td {
      border: 1px solid ${u.tagBackgroundColor};
      padding: ${i ? "0.3rem" : "0.6rem"};
      text-align: left;
    }
    
    .markdown-content th {
      background-color: ${u.tagBackgroundColor};
      font-weight: bold;
      color: ${u.tagTextColor};
    }
    
    /* Improved code block styles */
    .markdown-content pre {
      background-color: ${u.backgroundColor === "#1a1a1a" ? "#2d3748" : u.tagBackgroundColor};
      border-radius: 0.4rem;
      margin: ${i ? "0.6rem 0" : "0.8rem 0"};
      overflow-x: auto;
      position: relative;
      padding-top: ${i ? "1.5rem" : "2rem"};
    }
    
    .markdown-content pre::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      height: 0.75rem;
      width: 0.75rem;
      border-radius: 50%;
      background: #ff5f56;
      box-shadow: 1.25rem 0 0 #ffbd2e, 2.5rem 0 0 #27c93f;
    }
    
    .markdown-content pre code {
      display: block;
      padding: 0 ${i ? "0.6rem" : "1rem"} ${i ? "0.6rem" : "1rem"};
      overflow-x: auto;
      background-color: transparent;
      color: ${u.backgroundColor === "#1a1a1a" ? "#f8f8f2" : u.textColor};
      font-family: 'Fira Code', monospace, 'Courier New', Courier;
      font-size: ${i ? "0.7rem" : "0.8rem"};
      line-height: 1.6;
    }
    
    /* Language banner for code blocks */
    .markdown-content pre[class*="language-"]::after {
      content: attr(class);
      content: attr(data-lang);
      position: absolute;
      top: 0;
      right: 1rem;
      padding: 0 0.5rem;
      text-transform: uppercase;
      font-size: 0.7rem;
      color: ${u.dateColor};
    }
  `;
    return /* @__PURE__ */ A(de, { children: [
      /* @__PURE__ */ A("style", { children: D }),
      /* @__PURE__ */ A("style", { children: _ }),
      /* @__PURE__ */ A(
        "div",
        {
          className: "right-3 text-xs md:text-base font-medium",
          style: { color: u.dateColor },
          children: mr(t)
        }
      ),
      /* @__PURE__ */ A("div", { className: "markdown-content mt-2", children: /* @__PURE__ */ A(gr, { markdown: e }) }),
      /* @__PURE__ */ A("div", { className: "mt-2 md:mt-4 custom-scrollbar max-h-full", children: g.length > 0 && /* @__PURE__ */ A("div", { className: "mb-4 md:mb-6 flex flex-wrap gap-2", children: g.map((E, m) => /* @__PURE__ */ A(
        "img",
        {
          src: E.path,
          alt: `Attachment ${m + 1}`,
          className: "max-w-full rounded-lg",
          style: {
            maxHeight: "300px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
          }
        },
        m
      )) }) })
    ] });
  }
  function _r(e, t) {
    if (e.match(/^[a-z]+:\/\//i))
      return e;
    if (e.match(/^\/\//))
      return window.location.protocol + e;
    if (e.match(/^[a-z]+:/i))
      return e;
    const n = document.implementation.createHTMLDocument(), u = n.createElement("base"), a = n.createElement("a");
    return n.head.appendChild(u), n.body.appendChild(a), t && (u.href = t), a.href = e, a.href;
  }
  const vr = (() => {
    let e = 0;
    const t = () => (
      // eslint-disable-next-line no-bitwise
      `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
    );
    return () => (e += 1, `u${t()}${e}`);
  })();
  function ge(e) {
    const t = [];
    for (let n = 0, u = e.length; n < u; n++)
      t.push(e[n]);
    return t;
  }
  let Ce = null;
  function sn(e = {}) {
    return Ce || (e.includeStyleProperties ? (Ce = e.includeStyleProperties, Ce) : (Ce = ge(window.getComputedStyle(document.documentElement)), Ce));
  }
  function Ze(e, t) {
    const u = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
    return u ? parseFloat(u.replace("px", "")) : 0;
  }
  function wr(e) {
    const t = Ze(e, "border-left-width"), n = Ze(e, "border-right-width");
    return e.clientWidth + t + n;
  }
  function br(e) {
    const t = Ze(e, "border-top-width"), n = Ze(e, "border-bottom-width");
    return e.clientHeight + t + n;
  }
  function ln(e, t = {}) {
    const n = t.width || wr(e), u = t.height || br(e);
    return { width: n, height: u };
  }
  function Cr() {
    let e, t;
    try {
      t = process;
    } catch {
    }
    const n = t && t.env ? t.env.devicePixelRatio : null;
    return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
  }
  const Y = 16384;
  function yr(e) {
    (e.width > Y || e.height > Y) && (e.width > Y && e.height > Y ? e.width > e.height ? (e.height *= Y / e.width, e.width = Y) : (e.width *= Y / e.height, e.height = Y) : e.width > Y ? (e.height *= Y / e.width, e.width = Y) : (e.width *= Y / e.height, e.height = Y));
  }
  function Ge(e) {
    return new Promise((t, n) => {
      const u = new Image();
      u.onload = () => {
        u.decode().then(() => {
          requestAnimationFrame(() => t(u));
        });
      }, u.onerror = n, u.crossOrigin = "anonymous", u.decoding = "async", u.src = e;
    });
  }
  async function kr(e) {
    return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
  }
  async function Fr(e, t, n) {
    const u = "http://www.w3.org/2000/svg", a = document.createElementNS(u, "svg"), i = document.createElementNS(u, "foreignObject");
    return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), kr(a);
  }
  const J = (e, t) => {
    if (e instanceof t)
      return !0;
    const n = Object.getPrototypeOf(e);
    return n === null ? !1 : n.constructor.name === t.name || J(n, t);
  };
  function Er(e) {
    const t = e.getPropertyValue("content");
    return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
  }
  function xr(e, t) {
    return sn(t).map((n) => {
      const u = e.getPropertyValue(n), a = e.getPropertyPriority(n);
      return `${n}: ${u}${a ? " !important" : ""};`;
    }).join(" ");
  }
  function Ar(e, t, n, u) {
    const a = `.${e}:${t}`, i = n.cssText ? Er(n) : xr(n, u);
    return document.createTextNode(`${a}{${i}}`);
  }
  function cn(e, t, n, u) {
    const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
    if (i === "" || i === "none")
      return;
    const c = vr();
    try {
      t.className = `${t.className} ${c}`;
    } catch {
      return;
    }
    const g = document.createElement("style");
    g.appendChild(Ar(c, n, a, u)), t.appendChild(g);
  }
  function $r(e, t, n) {
    cn(e, t, ":before", n), cn(e, t, ":after", n);
  }
  const fn = "application/font-woff", hn = "image/jpeg", Br = {
    woff: fn,
    woff2: fn,
    ttf: "application/font-truetype",
    eot: "application/vnd.ms-fontobject",
    png: "image/png",
    jpg: hn,
    jpeg: hn,
    gif: "image/gif",
    tiff: "image/tiff",
    svg: "image/svg+xml",
    webp: "image/webp"
  };
  function Sr(e) {
    const t = /\.([^./]*?)$/g.exec(e);
    return t ? t[1] : "";
  }
  function ct(e) {
    const t = Sr(e).toLowerCase();
    return Br[t] || "";
  }
  function Tr(e) {
    return e.split(/,/)[1];
  }
  function ft(e) {
    return e.search(/^(data:)/) !== -1;
  }
  function pn(e, t) {
    return `data:${t};base64,${e}`;
  }
  async function dn(e, t, n) {
    const u = await fetch(e, t);
    if (u.status === 404)
      throw new Error(`Resource "${u.url}" not found`);
    const a = await u.blob();
    return new Promise((i, c) => {
      const g = new FileReader();
      g.onerror = c, g.onloadend = () => {
        try {
          i(n({ res: u, result: g.result }));
        } catch (D) {
          c(D);
        }
      }, g.readAsDataURL(a);
    });
  }
  const ht = {};
  function Rr(e, t, n) {
    let u = e.replace(/\?.*/, "");
    return n && (u = e), /ttf|otf|eot|woff2?/i.test(u) && (u = u.replace(/.*\//, "")), t ? `[${t}]${u}` : u;
  }
  async function pt(e, t, n) {
    const u = Rr(e, t, n.includeQueryParams);
    if (ht[u] != null)
      return ht[u];
    n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
    let a;
    try {
      const i = await dn(e, n.fetchRequestInit, ({ res: c, result: g }) => (t || (t = c.headers.get("Content-Type") || ""), Tr(g)));
      a = pn(i, t);
    } catch (i) {
      a = n.imagePlaceholder || "";
      let c = `Failed to fetch resource: ${e}`;
      i && (c = typeof i == "string" ? i : i.message), c && console.warn(c);
    }
    return ht[u] = a, a;
  }
  async function zr(e) {
    const t = e.toDataURL();
    return t === "data:," ? e.cloneNode(!1) : Ge(t);
  }
  async function Ir(e, t) {
    if (e.currentSrc) {
      const i = document.createElement("canvas"), c = i.getContext("2d");
      i.width = e.clientWidth, i.height = e.clientHeight, c == null || c.drawImage(e, 0, 0, i.width, i.height);
      const g = i.toDataURL();
      return Ge(g);
    }
    const n = e.poster, u = ct(n), a = await pt(n, u, t);
    return Ge(a);
  }
  async function Pr(e, t) {
    var n;
    try {
      if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
        return await Qe(e.contentDocument.body, t, !0);
    } catch {
    }
    return e.cloneNode(!1);
  }
  async function Mr(e, t) {
    return J(e, HTMLCanvasElement) ? zr(e) : J(e, HTMLVideoElement) ? Ir(e, t) : J(e, HTMLIFrameElement) ? Pr(e, t) : e.cloneNode(gn(e));
  }
  const Or = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", gn = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
  async function Nr(e, t, n) {
    var u, a;
    if (gn(t))
      return t;
    let i = [];
    return Or(e) && e.assignedNodes ? i = ge(e.assignedNodes()) : J(e, HTMLIFrameElement) && (!((u = e.contentDocument) === null || u === void 0) && u.body) ? i = ge(e.contentDocument.body.childNodes) : i = ge(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || J(e, HTMLVideoElement) || await i.reduce((c, g) => c.then(() => Qe(g, n)).then((D) => {
      D && t.appendChild(D);
    }), Promise.resolve()), t;
  }
  function Ur(e, t, n) {
    const u = t.style;
    if (!u)
      return;
    const a = window.getComputedStyle(e);
    a.cssText ? (u.cssText = a.cssText, u.transformOrigin = a.transformOrigin) : sn(n).forEach((i) => {
      let c = a.getPropertyValue(i);
      i === "font-size" && c.endsWith("px") && (c = `${Math.floor(parseFloat(c.substring(0, c.length - 2))) - 0.1}px`), J(e, HTMLIFrameElement) && i === "display" && c === "inline" && (c = "block"), i === "d" && t.getAttribute("d") && (c = `path(${t.getAttribute("d")})`), u.setProperty(i, c, a.getPropertyPriority(i));
    });
  }
  function Lr(e, t) {
    J(e, HTMLTextAreaElement) && (t.innerHTML = e.value), J(e, HTMLInputElement) && t.setAttribute("value", e.value);
  }
  function Hr(e, t) {
    if (J(e, HTMLSelectElement)) {
      const n = t, u = Array.from(n.children).find((a) => e.value === a.getAttribute("value"));
      u && u.setAttribute("selected", "");
    }
  }
  function jr(e, t, n) {
    return J(t, Element) && (Ur(e, t, n), $r(e, t, n), Lr(e, t), Hr(e, t)), t;
  }
  async function Wr(e, t) {
    const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
    if (n.length === 0)
      return e;
    const u = {};
    for (let i = 0; i < n.length; i++) {
      const g = n[i].getAttribute("xlink:href");
      if (g) {
        const D = e.querySelector(g), _ = document.querySelector(g);
        !D && _ && !u[g] && (u[g] = await Qe(_, t, !0));
      }
    }
    const a = Object.values(u);
    if (a.length) {
      const i = "http://www.w3.org/1999/xhtml", c = document.createElementNS(i, "svg");
      c.setAttribute("xmlns", i), c.style.position = "absolute", c.style.width = "0", c.style.height = "0", c.style.overflow = "hidden", c.style.display = "none";
      const g = document.createElementNS(i, "defs");
      c.appendChild(g);
      for (let D = 0; D < a.length; D++)
        g.appendChild(a[D]);
      e.appendChild(c);
    }
    return e;
  }
  async function Qe(e, t, n) {
    return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((u) => Mr(u, t)).then((u) => Nr(e, u, t)).then((u) => jr(e, u, t)).then((u) => Wr(u, t));
  }
  const mn = /url\((['"]?)([^'"]+?)\1\)/g, qr = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Vr = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
  function Zr(e) {
    const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
  }
  function Gr(e) {
    const t = [];
    return e.replace(mn, (n, u, a) => (t.push(a), n)), t.filter((n) => !ft(n));
  }
  async function Qr(e, t, n, u, a) {
    try {
      const i = n ? _r(t, n) : t, c = ct(t);
      let g;
      if (a) {
        const D = await a(i);
        g = pn(D, c);
      } else
        g = await pt(i, c, u);
      return e.replace(Zr(t), `$1${g}$3`);
    } catch {
    }
    return e;
  }
  function Xr(e, { preferredFontFormat: t }) {
    return t ? e.replace(Vr, (n) => {
      for (; ; ) {
        const [u, , a] = qr.exec(n) || [];
        if (!a)
          return "";
        if (a === t)
          return `src: ${u};`;
      }
    }) : e;
  }
  function Dn(e) {
    return e.search(mn) !== -1;
  }
  async function _n(e, t, n) {
    if (!Dn(e))
      return e;
    const u = Xr(e, n);
    return Gr(u).reduce((i, c) => i.then((g) => Qr(g, c, t, n)), Promise.resolve(u));
  }
  async function ye(e, t, n) {
    var u;
    const a = (u = t.style) === null || u === void 0 ? void 0 : u.getPropertyValue(e);
    if (a) {
      const i = await _n(a, null, n);
      return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
    }
    return !1;
  }
  async function Jr(e, t) {
    await ye("background", e, t) || await ye("background-image", e, t), await ye("mask", e, t) || await ye("-webkit-mask", e, t) || await ye("mask-image", e, t) || await ye("-webkit-mask-image", e, t);
  }
  async function Kr(e, t) {
    const n = J(e, HTMLImageElement);
    if (!(n && !ft(e.src)) && !(J(e, SVGImageElement) && !ft(e.href.baseVal)))
      return;
    const u = n ? e.src : e.href.baseVal, a = await pt(u, ct(u), t);
    await new Promise((i, c) => {
      e.onload = i, e.onerror = t.onImageErrorHandler ? (...D) => {
        try {
          i(t.onImageErrorHandler(...D));
        } catch (_) {
          c(_);
        }
      } : c;
      const g = e;
      g.decode && (g.decode = i), g.loading === "lazy" && (g.loading = "eager"), n ? (e.srcset = "", e.src = a) : e.href.baseVal = a;
    });
  }
  async function Yr(e, t) {
    const u = ge(e.childNodes).map((a) => vn(a, t));
    await Promise.all(u).then(() => e);
  }
  async function vn(e, t) {
    J(e, Element) && (await Jr(e, t), await Kr(e, t), await Yr(e, t));
  }
  function eu(e, t) {
    const { style: n } = e;
    t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
    const u = t.style;
    return u != null && Object.keys(u).forEach((a) => {
      n[a] = u[a];
    }), e;
  }
  const wn = {};
  async function bn(e) {
    let t = wn[e];
    if (t != null)
      return t;
    const u = await (await fetch(e)).text();
    return t = { url: e, cssText: u }, wn[e] = t, t;
  }
  async function Cn(e, t) {
    let n = e.cssText;
    const u = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (c) => {
      let g = c.replace(u, "$1");
      return g.startsWith("https://") || (g = new URL(g, e.url).href), dn(g, t.fetchRequestInit, ({ result: D }) => (n = n.replace(c, `url(${D})`), [c, D]));
    });
    return Promise.all(i).then(() => n);
  }
  function yn(e) {
    if (e == null)
      return [];
    const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
    let u = e.replace(n, "");
    const a = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
    for (; ; ) {
      const D = a.exec(u);
      if (D === null)
        break;
      t.push(D[0]);
    }
    u = u.replace(a, "");
    const i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, c = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", g = new RegExp(c, "gi");
    for (; ; ) {
      let D = i.exec(u);
      if (D === null) {
        if (D = g.exec(u), D === null)
          break;
        i.lastIndex = g.lastIndex;
      } else
        g.lastIndex = i.lastIndex;
      t.push(D[0]);
    }
    return t;
  }
  async function tu(e, t) {
    const n = [], u = [];
    return e.forEach((a) => {
      if ("cssRules" in a)
        try {
          ge(a.cssRules || []).forEach((i, c) => {
            if (i.type === CSSRule.IMPORT_RULE) {
              let g = c + 1;
              const D = i.href, _ = bn(D).then((E) => Cn(E, t)).then((E) => yn(E).forEach((m) => {
                try {
                  a.insertRule(m, m.startsWith("@import") ? g += 1 : a.cssRules.length);
                } catch (I) {
                  console.error("Error inserting rule from remote css", {
                    rule: m,
                    error: I
                  });
                }
              })).catch((E) => {
                console.error("Error loading remote css", E.toString());
              });
              u.push(_);
            }
          });
        } catch (i) {
          const c = e.find((g) => g.href == null) || document.styleSheets[0];
          a.href != null && u.push(bn(a.href).then((g) => Cn(g, t)).then((g) => yn(g).forEach((D) => {
            c.insertRule(D, c.cssRules.length);
          })).catch((g) => {
            console.error("Error loading remote stylesheet", g);
          })), console.error("Error inlining remote css file", i);
        }
    }), Promise.all(u).then(() => (e.forEach((a) => {
      if ("cssRules" in a)
        try {
          ge(a.cssRules || []).forEach((i) => {
            n.push(i);
          });
        } catch (i) {
          console.error(`Error while reading CSS rules from ${a.href}`, i);
        }
    }), n));
  }
  function nu(e) {
    return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Dn(t.style.getPropertyValue("src")));
  }
  async function ru(e, t) {
    if (e.ownerDocument == null)
      throw new Error("Provided element is not within a Document");
    const n = ge(e.ownerDocument.styleSheets), u = await tu(n, t);
    return nu(u);
  }
  function kn(e) {
    return e.trim().replace(/["']/g, "");
  }
  function uu(e) {
    const t = /* @__PURE__ */ new Set();
    function n(u) {
      (u.style.fontFamily || getComputedStyle(u).fontFamily).split(",").forEach((i) => {
        t.add(kn(i));
      }), Array.from(u.children).forEach((i) => {
        i instanceof HTMLElement && n(i);
      });
    }
    return n(e), t;
  }
  async function ou(e, t) {
    const n = await ru(e, t), u = uu(e);
    return (await Promise.all(n.filter((i) => u.has(kn(i.style.fontFamily))).map((i) => {
      const c = i.parentStyleSheet ? i.parentStyleSheet.href : null;
      return _n(i.cssText, c, t);
    }))).join(`
`);
  }
  async function iu(e, t) {
    const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await ou(e, t);
    if (n) {
      const u = document.createElement("style"), a = document.createTextNode(n);
      u.appendChild(a), e.firstChild ? e.insertBefore(u, e.firstChild) : e.appendChild(u);
    }
  }
  async function au(e, t = {}) {
    const { width: n, height: u } = ln(e, t), a = await Qe(e, t, !0);
    return await iu(a, t), await vn(a, t), eu(a, t), await Fr(a, n, u);
  }
  async function su(e, t = {}) {
    const { width: n, height: u } = ln(e, t), a = await au(e, t), i = await Ge(a), c = document.createElement("canvas"), g = c.getContext("2d"), D = t.pixelRatio || Cr(), _ = t.canvasWidth || n, E = t.canvasHeight || u;
    return c.width = _ * D, c.height = E * D, t.skipAutoScale || yr(c), c.style.width = `${_}`, c.style.height = `${E}`, t.backgroundColor && (g.fillStyle = t.backgroundColor, g.fillRect(0, 0, c.width, c.height)), g.drawImage(i, 0, 0, c.width, c.height), c;
  }
  async function lu(e, t = {}) {
    return (await su(e, t)).toDataURL();
  }
  function cu() {
    const e = (/* @__PURE__ */ new Date()).getTime(), t = Math.floor(Math.random() * 1e4);
    return `share-image-${e}-${t}.png`;
  }
  async function fu(e, t = {}) {
    if (!e)
      return t.setErrorMessage && t.setErrorMessage("Element not found"), null;
    try {
      const n = e.getBoundingClientRect();
      console.log("Element dimensions:", n.width, n.height);
      const u = {
        backgroundColor: t.backgroundColor || "#ffffff",
        width: n.width,
        height: n.height,
        style: {
          // 确保元素样式正确
          transform: "none",
          width: `${n.width}px`,
          height: `${n.height}px`
        },
        pixelRatio: 2,
        // 高清图
        skipAutoScale: !0,
        cacheBust: !0
      };
      console.log("Generating image with config:", u);
      const a = await lu(e, u);
      return console.log("Image generated successfully"), a;
    } catch (n) {
      return console.error("Error generating image:", n), t.setErrorMessage && t.setErrorMessage(
        `Error generating image: ${n instanceof Error ? n.message : String(n)}`
      ), null;
    }
  }
  function hu(e, t = cu()) {
    const n = document.createElement("a");
    n.download = t, n.href = e, n.click();
  }
  function pu({ note: e }) {
    const [t, n] = ie(
      nn[0]
    ), [u, a] = ie(!1), [i, c] = ie(!1), [g, D] = ie(null), [_, E] = ie("50%");
    ie(!1);
    const m = Nn(null);
    be(() => {
      const N = () => {
        const O = window.innerWidth <= 768;
        c(O), E(O ? "90%" : "50%");
      };
      return N(), window.addEventListener("resize", N), () => {
        window.removeEventListener("resize", N);
      };
    }, []), be(() => {
      I(!1);
    }, []), be(() => {
      t && I(!1);
    }, [t]);
    const I = async (N = !1) => {
      if (!(!m.current || u)) {
        console.log("Starting image generation"), a(!0), D(null);
        try {
          const O = m.current, U = O.style.position, $ = O.style.width;
          O.style.position = "relative", O.style.width = i ? "90vw" : "50vw", await new Promise((q) => setTimeout(q, 100));
          const P = await fu(O, {
            setErrorMessage: (q) => {
              console.log("Error message:", q), q && D(q);
            },
            backgroundColor: t.backgroundColor
          });
          if (O.style.position = U, O.style.width = $, P)
            console.log("Image generated successfully"), N && hu(P);
          else
            throw new Error("Failed to generate image");
        } catch (O) {
          console.error("Error generating image:", O), D(
            `${window.Blinko.i18n.t("errorGenerating")}${O instanceof Error ? O.message : String(O)}`
          );
        } finally {
          a(!1);
        }
      }
    };
    return /* @__PURE__ */ A(
      "div",
      {
        className: "w-full flex flex-col justify-start items-center p-2 md:p-5",
        style: {
          overflow: "auto",
          height: "90vh"
        },
        children: [
          /* @__PURE__ */ A(
            "div",
            {
              className: "w-full max-w-full mb-3 md:mb-4 overflow-x-auto ",
              style: {
                minHeight: i ? "120px" : "150px"
              },
              children: /* @__PURE__ */ A(
                tr,
                {
                  selectedTemplate: t,
                  onSelectTemplate: n
                }
              )
            }
          ),
          /* @__PURE__ */ A("div", { className: "w-full flex justify-center mb-4 gap-2", children: /* @__PURE__ */ A(
            "button",
            {
              onClick: () => {
                I(!0);
              },
              className: "bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg border-none text-sm font-medium flex items-center gap-2 transition-all duration-200 active:scale-[0.98]",
              disabled: u,
              children: u ? window.Blinko.i18n.t("generatingImage") : window.Blinko.i18n.t("downLoadImage")
            }
          ) }),
          /* @__PURE__ */ A(
            "div",
            {
              ref: m,
              className: "rounded-xl p-4 md:p-[60px] flex flex-col relative transition-all duration-300",
              style: {
                backgroundColor: t.backgroundColor,
                color: t.textColor,
                fontFamily: t.fontFamily || "system-ui, sans-serif",
                borderRadius: t.borderRadius || "15px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                width: _,
                height: "fit-content"
              },
              children: /* @__PURE__ */ A(
                Dr,
                {
                  content: (e == null ? void 0 : e.content) || "",
                  createdAt: (e == null ? void 0 : e.createdAt) || (/* @__PURE__ */ new Date()).toISOString(),
                  tags: (e == null ? void 0 : e.tags) || [],
                  template: t,
                  attachments: (e == null ? void 0 : e.attachments) || []
                }
              )
            }
          ),
          g && /* @__PURE__ */ A("div", { className: "mt-3 md:mt-4 p-2 md:p-3 bg-red-100 text-red-700 rounded-md text-xs md:text-sm", children: g }),
          u && /* @__PURE__ */ A("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ A("div", { className: "bg-white p-4 md:p-5 rounded-lg shadow-lg flex flex-col items-center", children: [
            /* @__PURE__ */ A("div", { className: "w-6 h-6 md:w-8 md:h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2 md:mb-3" }),
            /* @__PURE__ */ A("p", { className: "text-gray-800 text-sm md:text-base", children: window.Blinko.i18n.t("generating") })
          ] }) })
        ]
      }
    );
  }
  function du() {
    const [e, t] = ie(""), [n, u] = ie(!0), a = window.Blinko.i18n;
    be(() => {
      window.Blinko.api.config.getPluginConfig.query({
        pluginName: "my-note-plugin"
      }).then((c) => {
        t(c.apiToken);
      });
    }, []);
    const i = async () => {
      window.Blinko.toast.success(a.t("settingsSaved")), window.Blinko.closeDialog(), await window.Blinko.api.config.setPluginConfig.mutate({
        pluginName: "my-note-plugin",
        key: "apiToken",
        value: e
      }), window.Blinko.api.config.getPluginConfig.query({
        pluginName: "my-note-plugin"
      });
    };
    return /* @__PURE__ */ A("div", { className: "max-w-2xl mx-auto p-2 rounded-lg", children: [
      /* @__PURE__ */ A("div", { className: "mb-6", children: /* @__PURE__ */ A("label", { className: "block text-sm font-medium mb-2", children: [
        a.t("apiTokenLabel"),
        /* @__PURE__ */ A(
          "input",
          {
            value: e,
            onChange: (c) => t(c.currentTarget.value),
            placeholder: a.t("enterApiToken"),
            className: "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm bg-primary!"
          }
        )
      ] }) }),
      /* @__PURE__ */ A("div", { className: "mb-6", children: /* @__PURE__ */ A("label", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ A(
          "input",
          {
            type: "checkbox",
            checked: n,
            onChange: (c) => u(c.currentTarget.checked),
            className: "h-4 w-4 text-primary-foreground bg-primary rounded"
          }
        ),
        /* @__PURE__ */ A("span", { className: "text-sm text-desc", children: a.t("enableNotifications") })
      ] }) }),
      /* @__PURE__ */ A(
        "button",
        {
          onClick: i,
          className: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-primary text-primary-foreground",
          children: a.t("saveSettings")
        }
      )
    ] });
  }
  const gu = {
    title: "My Plugin",
    countLabel: "Count is {{count}}",
    successMessage: "Success!",
    downLoadImage: "Download Image",
    generatingImage: "Generating...",
    generating: "Generating image...",
    errorGenerating: "Error generating image: ",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    sepiaMode: "Vintage Style",
    oceanStyle: "Ocean Style",
    forestStyle: "Forest Style",
    customTemplate: "Custom Template",
    createCustomTemplate: "Create Custom Template",
    templateName: "Template Name",
    backgroundColor: "Background Color",
    textColor: "Text Color",
    dateColor: "Date Color",
    tagBackgroundColor: "Tag Background Color",
    tagTextColor: "Tag Text Color",
    accentColor: "Accent Color",
    font: "Font",
    borderRadius: "Border Radius",
    saveTemplate: "Save Template",
    systemDefaultFont: "System Default Font",
    serifFont: "Serif Font",
    monospaceFont: "Monospace Font",
    handwritingFont: "Handwriting Font",
    generateShareImage: "Generate Share Image"
  }, mu = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！",
    downLoadImage: "下载图片",
    generatingImage: "生成中...",
    generating: "正在生成图片...",
    errorGenerating: "生成图片时发生错误: ",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    sepiaMode: "复古风格",
    oceanStyle: "海洋风格",
    forestStyle: "森林风格",
    customTemplate: "自定义模板",
    createCustomTemplate: "创建自定义模板",
    templateName: "模板名称",
    backgroundColor: "背景颜色",
    textColor: "文本颜色",
    dateColor: "日期颜色",
    tagBackgroundColor: "标签背景颜色",
    tagTextColor: "标签文本颜色",
    accentColor: "强调色",
    font: "字体",
    borderRadius: "圆角大小",
    saveTemplate: "保存模板",
    systemDefaultFont: "系统默认字体",
    serifFont: "衬线字体 (Serif)",
    monospaceFont: "等宽字体 (Monospace)",
    handwritingFont: "手写体 (Comic Sans)",
    generateShareImage: "生成分享图片"
  }, Du = {
    name: "generate-share-image",
    author: "blinko-offical",
    url: "https://github.com/blinko-space/generate-share-image",
    version: "0.0.6",
    minAppVersion: "0.0.0",
    displayName: {
      default: "Generate share image",
      zh: "生成分享图片"
    },
    description: {
      default: "Use for right-click notes to generate sharing diagrams.",
      zh: "用于右键笔记生成分享图"
    },
    readme: {
      default: "README.md",
      zh: "README_zh.md"
    }
  };
  System.register([], (e) => ({
    execute: () => {
      e("default", class {
        constructor() {
          // Flag indicating this plugin has a settings panel
          mt(this, "withSettingPanel", !0);
          /**
           * Renders the settings panel UI
           * @returns {HTMLElement} Container element with rendered settings component
           */
          mt(this, "renderSettingPanel", () => {
            const n = document.createElement("div");
            return Jt(/* @__PURE__ */ A(du, {}), n), n;
          });
          Object.assign(this, Du);
        }
        /**
         * Initializes the plugin
         * Sets up toolbar icons, right-click menus, and AI write prompts
         */
        async init() {
          this.initI18n(), window.Blinko.addRightClickMenu({
            name: "generate-share-image",
            label: window.Blinko.i18n.t("generateShareImage"),
            icon: "tabler:share",
            onClick: (n) => {
              console.log(JSON.parse(JSON.stringify(n))), window.Blinko.showDialog({
                title: window.Blinko.i18n.t("generateShareImage"),
                size: "full",
                content: () => {
                  const u = document.createElement("div");
                  return u.setAttribute("data-plugin", "generate-share-image"), Jt(/* @__PURE__ */ A(pu, { note: {
                    title: n.title,
                    content: n.content,
                    createdAt: n.createdAt,
                    tags: n.tags.map((a) => a.name),
                    attachments: n.attachments ? n.attachments.map((a) => ({
                      path: a.path,
                      type: a.type
                    })) : []
                  } }), u), u;
                }
              });
            }
          });
        }
        /**
         * Initializes internationalization resources
         * Adds English and Chinese translation bundles
         */
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", gu), window.Blinko.i18n.addResourceBundle("zh", "translation", mu);
        }
        /**
         * Cleanup function called when plugin is disabled
         */
        destroy() {
          console.log("Plugin destroyed");
        }
      });
    }
  }));
})();
