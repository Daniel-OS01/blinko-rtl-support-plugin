var Ot = Object.defineProperty;
var Ut = (E, g, I) => g in E ? Ot(E, g, { enumerable: !0, configurable: !0, writable: !0, value: I }) : E[g] = I;
var y = (E, g, I) => (Ut(E, typeof g != "symbol" ? g + "" : g, I), I);
(function() {
  var E, g, I, F, me, be, ye, ve, ie, oe, se, j = {}, Se = [], at = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, V = Array.isArray;
  function P(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function ae(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function le(t, e, n) {
    var r, i, o, s = {};
    for (o in e)
      o == "key" ? r = e[o] : o == "ref" ? i = e[o] : s[o] = e[o];
    if (arguments.length > 2 && (s.children = arguments.length > 3 ? E.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (o in t.defaultProps)
        s[o] === void 0 && (s[o] = t.defaultProps[o]);
    return J(t, s, r, i, null);
  }
  function J(t, e, n, r, i) {
    var o = { type: t, props: e, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: i ?? ++I, __i: -1, __u: 0 };
    return i == null && g.vnode != null && g.vnode(o), o;
  }
  function N(t) {
    return t.children;
  }
  function $(t, e) {
    this.props = t, this.context = e;
  }
  function H(t, e) {
    if (e == null)
      return t.__ ? H(t.__, t.__i + 1) : null;
    for (var n; e < t.__k.length; e++)
      if ((n = t.__k[e]) != null && n.__e != null)
        return n.__e;
    return typeof t.type == "function" ? H(t) : null;
  }
  function xe(t) {
    var e, n;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((n = t.__k[e]) != null && n.__e != null) {
          t.__e = t.__c.base = n.__e;
          break;
        }
      return xe(t);
    }
  }
  function ke(t) {
    (!t.__d && (t.__d = !0) && F.push(t) && !K.__r++ || me != g.debounceRendering) && ((me = g.debounceRendering) || be)(K);
  }
  function K() {
    for (var t, e, n, r, i, o, s, c = 1; F.length; )
      F.length > c && F.sort(ye), t = F.shift(), c = F.length, t.__d && (n = void 0, i = (r = (e = t).__v).__e, o = [], s = [], e.__P && ((n = P({}, r)).__v = r.__v + 1, g.vnode && g.vnode(n), de(e.__P, n, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [i] : null, o, i ?? H(r), !!(32 & r.__u), s), n.__v = r.__v, n.__.__k[n.__i] = n, Ce(o, n, s), n.__e != i && xe(n)));
    K.__r = 0;
  }
  function we(t, e, n, r, i, o, s, c, u, l, h) {
    var d, b, f, x, _, v, k, w = r && r.__k || Se, A = e.length;
    for (u = lt(n, e, w, u, A), d = 0; d < A; d++)
      (f = n.__k[d]) != null && (b = f.__i == -1 ? j : w[f.__i] || j, f.__i = d, v = de(t, f, b, i, o, s, c, u, l, h), x = f.__e, f.ref && b.ref != f.ref && (b.ref && ue(b.ref, null, f), h.push(f.ref, f.__c || x, f)), _ == null && x != null && (_ = x), (k = !!(4 & f.__u)) || b.__k === f.__k ? u = Te(f, u, t, k) : typeof f.type == "function" && v !== void 0 ? u = v : x && (u = x.nextSibling), f.__u &= -7);
    return n.__e = _, u;
  }
  function lt(t, e, n, r, i) {
    var o, s, c, u, l, h = n.length, d = h, b = 0;
    for (t.__k = new Array(i), o = 0; o < i; o++)
      (s = e[o]) != null && typeof s != "boolean" && typeof s != "function" ? (u = o + b, (s = t.__k[o] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? J(null, s, null, null, null) : V(s) ? J(N, { children: s }, null, null, null) : s.constructor == null && s.__b > 0 ? J(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = t, s.__b = t.__b + 1, c = null, (l = s.__i = dt(s, n, u, d)) != -1 && (d--, (c = n[l]) && (c.__u |= 2)), c == null || c.__v == null ? (l == -1 && (i > h ? b-- : i < h && b++), typeof s.type != "function" && (s.__u |= 4)) : l != u && (l == u - 1 ? b-- : l == u + 1 ? b++ : (l > u ? b-- : b++, s.__u |= 4))) : t.__k[o] = null;
    if (d)
      for (o = 0; o < h; o++)
        (c = n[o]) != null && !(2 & c.__u) && (c.__e == r && (r = H(c)), Ae(c, c));
    return r;
  }
  function Te(t, e, n, r) {
    var i, o;
    if (typeof t.type == "function") {
      for (i = t.__k, o = 0; i && o < i.length; o++)
        i[o] && (i[o].__ = t, e = Te(i[o], e, n, r));
      return e;
    }
    t.__e != e && (r && (e && t.type && !e.parentNode && (e = H(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function X(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (V(t) ? t.some(function(n) {
      X(n, e);
    }) : e.push(t)), e;
  }
  function dt(t, e, n, r) {
    var i, o, s, c = t.key, u = t.type, l = e[n], h = l != null && (2 & l.__u) == 0;
    if (l === null && t.key == null || h && c == l.key && u == l.type)
      return n;
    if (r > (h ? 1 : 0)) {
      for (i = n - 1, o = n + 1; i >= 0 || o < e.length; )
        if ((l = e[s = i >= 0 ? i-- : o++]) != null && !(2 & l.__u) && c == l.key && u == l.type)
          return s;
    }
    return -1;
  }
  function Re(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || at.test(e) ? n : n + "px";
  }
  function Y(t, e, n, r, i) {
    var o, s;
    e:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof r == "string" && (t.style.cssText = r = ""), r)
            for (e in r)
              n && e in n || Re(t.style, e, "");
          if (n)
            for (e in n)
              r && n[e] == r[e] || Re(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        o = e != (e = e.replace(ve, "$1")), s = e.toLowerCase(), e = s in t || e == "onFocusOut" || e == "onFocusIn" ? s.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = n, n ? r ? n.u = r.u : (n.u = ie, t.addEventListener(e, o ? se : oe, o)) : t.removeEventListener(e, o ? se : oe, o);
      else {
        if (i == "http://www.w3.org/2000/svg")
          e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t)
          try {
            t[e] = n ?? "";
            break e;
          } catch {
          }
        typeof n == "function" || (n == null || n === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
      }
  }
  function Le(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.t == null)
          e.t = ie++;
        else if (e.t < n.u)
          return;
        return n(g.event ? g.event(e) : e);
      }
    };
  }
  function de(t, e, n, r, i, o, s, c, u, l) {
    var h, d, b, f, x, _, v, k, w, A, M, U, z, ne, W, p, m, S = e.type;
    if (e.constructor != null)
      return null;
    128 & n.__u && (u = !!(32 & n.__u), o = [c = e.__e = n.__e]), (h = g.__b) && h(e);
    e:
      if (typeof S == "function")
        try {
          if (k = e.props, w = "prototype" in S && S.prototype.render, A = (h = S.contextType) && r[h.__c], M = h ? A ? A.props.value : h.__ : r, n.__c ? v = (d = e.__c = n.__c).__ = d.__E : (w ? e.__c = d = new S(k, M) : (e.__c = d = new $(k, M), d.constructor = S, d.render = ut), A && A.sub(d), d.props = k, d.state || (d.state = {}), d.context = M, d.__n = r, b = d.__d = !0, d.__h = [], d._sb = []), w && d.__s == null && (d.__s = d.state), w && S.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = P({}, d.__s)), P(d.__s, S.getDerivedStateFromProps(k, d.__s))), f = d.props, x = d.state, d.__v = e, b)
            w && S.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), w && d.componentDidMount != null && d.__h.push(d.componentDidMount);
          else {
            if (w && S.getDerivedStateFromProps == null && k !== f && d.componentWillReceiveProps != null && d.componentWillReceiveProps(k, M), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(k, d.__s, M) === !1 || e.__v == n.__v) {
              for (e.__v != n.__v && (d.props = k, d.state = d.__s, d.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(T) {
                T && (T.__ = e);
              }), U = 0; U < d._sb.length; U++)
                d.__h.push(d._sb[U]);
              d._sb = [], d.__h.length && s.push(d);
              break e;
            }
            d.componentWillUpdate != null && d.componentWillUpdate(k, d.__s, M), w && d.componentDidUpdate != null && d.__h.push(function() {
              d.componentDidUpdate(f, x, _);
            });
          }
          if (d.context = M, d.props = k, d.__P = t, d.__e = !1, z = g.__r, ne = 0, w) {
            for (d.state = d.__s, d.__d = !1, z && z(e), h = d.render(d.props, d.state, d.context), W = 0; W < d._sb.length; W++)
              d.__h.push(d._sb[W]);
            d._sb = [];
          } else
            do
              d.__d = !1, z && z(e), h = d.render(d.props, d.state, d.context), d.state = d.__s;
            while (d.__d && ++ne < 25);
          d.state = d.__s, d.getChildContext != null && (r = P(P({}, r), d.getChildContext())), w && !b && d.getSnapshotBeforeUpdate != null && (_ = d.getSnapshotBeforeUpdate(f, x)), p = h, h != null && h.type === N && h.key == null && (p = Ee(h.props.children)), c = we(t, V(p) ? p : [p], e, n, r, i, o, s, c, u, l), d.base = e.__e, e.__u &= -161, d.__h.length && s.push(d), v && (d.__E = d.__ = null);
        } catch (T) {
          if (e.__v = null, u || o != null)
            if (T.then) {
              for (e.__u |= u ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                c = c.nextSibling;
              o[o.indexOf(c)] = null, e.__e = c;
            } else {
              for (m = o.length; m--; )
                ae(o[m]);
              ce(e);
            }
          else
            e.__e = n.__e, e.__k = n.__k, T.then || ce(e);
          g.__e(T, e, n);
        }
      else
        o == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : c = e.__e = ct(n.__e, e, n, r, i, o, s, u, l);
    return (h = g.diffed) && h(e), 128 & e.__u ? void 0 : c;
  }
  function ce(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(ce);
  }
  function Ce(t, e, n) {
    for (var r = 0; r < n.length; r++)
      ue(n[r], n[++r], n[++r]);
    g.__c && g.__c(e, t), t.some(function(i) {
      try {
        t = i.__h, i.__h = [], t.some(function(o) {
          o.call(i);
        });
      } catch (o) {
        g.__e(o, i.__v);
      }
    });
  }
  function Ee(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : V(t) ? t.map(Ee) : P({}, t);
  }
  function ct(t, e, n, r, i, o, s, c, u) {
    var l, h, d, b, f, x, _, v = n.props, k = e.props, w = e.type;
    if (w == "svg" ? i = "http://www.w3.org/2000/svg" : w == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), o != null) {
      for (l = 0; l < o.length; l++)
        if ((f = o[l]) && "setAttribute" in f == !!w && (w ? f.localName == w : f.nodeType == 3)) {
          t = f, o[l] = null;
          break;
        }
    }
    if (t == null) {
      if (w == null)
        return document.createTextNode(k);
      t = document.createElementNS(i, w, k.is && k), c && (g.__m && g.__m(e, o), c = !1), o = null;
    }
    if (w == null)
      v === k || c && t.data == k || (t.data = k);
    else {
      if (o = o && E.call(t.childNodes), v = n.props || j, !c && o != null)
        for (v = {}, l = 0; l < t.attributes.length; l++)
          v[(f = t.attributes[l]).name] = f.value;
      for (l in v)
        if (f = v[l], l != "children") {
          if (l == "dangerouslySetInnerHTML")
            d = f;
          else if (!(l in k)) {
            if (l == "value" && "defaultValue" in k || l == "checked" && "defaultChecked" in k)
              continue;
            Y(t, l, null, f, i);
          }
        }
      for (l in k)
        f = k[l], l == "children" ? b = f : l == "dangerouslySetInnerHTML" ? h = f : l == "value" ? x = f : l == "checked" ? _ = f : c && typeof f != "function" || v[l] === f || Y(t, l, f, v[l], i);
      if (h)
        c || d && (h.__html == d.__html || h.__html == t.innerHTML) || (t.innerHTML = h.__html), e.__k = [];
      else if (d && (t.innerHTML = ""), we(e.type == "template" ? t.content : t, V(b) ? b : [b], e, n, r, w == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, o, s, o ? o[0] : n.__k && H(n, 0), c, u), o != null)
        for (l = o.length; l--; )
          ae(o[l]);
      c || (l = "value", w == "progress" && x == null ? t.removeAttribute("value") : x != null && (x !== t[l] || w == "progress" && !x || w == "option" && x != v[l]) && Y(t, l, x, v[l], i), l = "checked", _ != null && _ != t[l] && Y(t, l, _, v[l], i));
    }
    return t;
  }
  function ue(t, e, n) {
    try {
      if (typeof t == "function") {
        var r = typeof t.__u == "function";
        r && t.__u(), r && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (i) {
      g.__e(i, n);
    }
  }
  function Ae(t, e, n) {
    var r, i;
    if (g.unmount && g.unmount(t), (r = t.ref) && (r.current && r.current != t.__e || ue(r, null, e)), (r = t.__c) != null) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount();
        } catch (o) {
          g.__e(o, e);
        }
      r.base = r.__P = null;
    }
    if (r = t.__k)
      for (i = 0; i < r.length; i++)
        r[i] && Ae(r[i], e, n || typeof t.type != "function");
    n || ae(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function ut(t, e, n) {
    return this.constructor(t, n);
  }
  function pt(t, e, n) {
    var r, i, o, s;
    e == document && (e = document.documentElement), g.__ && g.__(t, e), i = (r = typeof n == "function") ? null : n && n.__k || e.__k, o = [], s = [], de(e, t = (!r && n || e).__k = le(N, null, [t]), i || j, j, e.namespaceURI, !r && n ? [n] : i ? null : e.firstChild ? E.call(e.childNodes) : null, o, !r && n ? n : i ? i.__e : e.firstChild, r, s), Ce(o, t, s);
  }
  E = Se.slice, g = { __e: function(t, e, n, r) {
    for (var i, o, s; e = e.__; )
      if ((i = e.__c) && !i.__)
        try {
          if ((o = i.constructor) && o.getDerivedStateFromError != null && (i.setState(o.getDerivedStateFromError(t)), s = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), s = i.__d), s)
            return i.__E = i;
        } catch (c) {
          t = c;
        }
    throw t;
  } }, I = 0, $.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = P({}, this.state), typeof t == "function" && (t = t(P({}, n), this.props)), t && P(n, t), t != null && this.__v && (e && this._sb.push(e), ke(this));
  }, $.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), ke(this));
  }, $.prototype.render = N, F = [], be = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ye = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, K.__r = 0, ve = /(PointerCapture)$|Capture$/i, ie = 0, oe = Le(!1), se = Le(!0);
  var ht = 0;
  function a(t, e, n, r, i, o) {
    e || (e = {});
    var s, c, u = e;
    if ("ref" in u)
      for (c in u = {}, e)
        c == "ref" ? s = e[c] : u[c] = e[c];
    var l = { type: t, props: u, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --ht, __i: -1, __u: 0, __source: i, __self: o };
    if (typeof t == "function" && (s = t.defaultProps))
      for (c in s)
        u[c] === void 0 && (u[c] = s[c]);
    return g.vnode && g.vnode(l), l;
  }
  var Z, R, pe, Me, he = 0, Pe = [], L = g, $e = L.__b, De = L.__r, Be = L.diffed, Ie = L.__c, Fe = L.unmount, Ne = L.__;
  function ze(t, e) {
    L.__h && L.__h(R, t, he || e), he = 0;
    var n = R.__H || (R.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function C(t) {
    return he = 1, gt(Oe, t);
  }
  function gt(t, e, n) {
    var r = ze(Z++, 2);
    if (r.t = t, !r.__c && (r.__ = [n ? n(e) : Oe(void 0, e), function(c) {
      var u = r.__N ? r.__N[0] : r.__[0], l = r.t(u, c);
      u !== l && (r.__N = [l, r.__[1]], r.__c.setState({}));
    }], r.__c = R, !R.__f)) {
      var i = function(c, u, l) {
        if (!r.__c.__H)
          return !0;
        var h = r.__c.__H.__.filter(function(b) {
          return !!b.__c;
        });
        if (h.every(function(b) {
          return !b.__N;
        }))
          return !o || o.call(this, c, u, l);
        var d = r.__c.props !== c;
        return h.forEach(function(b) {
          if (b.__N) {
            var f = b.__[0];
            b.__ = b.__N, b.__N = void 0, f !== b.__[0] && (d = !0);
          }
        }), o && o.call(this, c, u, l) || d;
      };
      R.__f = !0;
      var o = R.shouldComponentUpdate, s = R.componentWillUpdate;
      R.componentWillUpdate = function(c, u, l) {
        if (this.__e) {
          var h = o;
          o = void 0, i(c, u, l), o = h;
        }
        s && s.call(this, c, u, l);
      }, R.shouldComponentUpdate = i;
    }
    return r.__N || r.__;
  }
  function ge(t, e) {
    var n = ze(Z++, 3);
    !L.__s && mt(n.__H, e) && (n.__ = t, n.u = e, R.__H.__h.push(n));
  }
  function _t() {
    for (var t; t = Pe.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(Q), t.__H.__h.forEach(_e), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], L.__e(e, t.__v);
        }
  }
  L.__b = function(t) {
    R = null, $e && $e(t);
  }, L.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Ne && Ne(t, e);
  }, L.__r = function(t) {
    De && De(t), Z = 0;
    var e = (R = t.__c).__H;
    e && (pe === R ? (e.__h = [], R.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(Q), e.__h.forEach(_e), e.__h = [], Z = 0)), pe = R;
  }, L.diffed = function(t) {
    Be && Be(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (Pe.push(e) !== 1 && Me === L.requestAnimationFrame || ((Me = L.requestAnimationFrame) || ft)(_t)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), pe = R = null;
  }, L.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(Q), n.__h = n.__h.filter(function(r) {
          return !r.__ || _e(r);
        });
      } catch (r) {
        e.some(function(i) {
          i.__h && (i.__h = []);
        }), e = [], L.__e(r, n.__v);
      }
    }), Ie && Ie(t, e);
  }, L.unmount = function(t) {
    Fe && Fe(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(r) {
      try {
        Q(r);
      } catch (i) {
        e = i;
      }
    }), n.__H = void 0, e && L.__e(e, n.__v));
  };
  var He = typeof requestAnimationFrame == "function";
  function ft(t) {
    var e, n = function() {
      clearTimeout(r), He && cancelAnimationFrame(e), setTimeout(t);
    }, r = setTimeout(n, 35);
    He && (e = requestAnimationFrame(n));
  }
  function Q(t) {
    var e = R, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), R = e;
  }
  function _e(t) {
    var e = R;
    t.__c = t.__(), R = e;
  }
  function mt(t, e) {
    return !t || t.length !== e.length || e.some(function(n, r) {
      return n !== t[r];
    });
  }
  function Oe(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function bt(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function Ue(t, e) {
    for (var n in t)
      if (n !== "__source" && !(n in e))
        return !0;
    for (var r in e)
      if (r !== "__source" && t[r] !== e[r])
        return !0;
    return !1;
  }
  function We(t, e) {
    this.props = t, this.context = e;
  }
  (We.prototype = new $()).isPureReactComponent = !0, We.prototype.shouldComponentUpdate = function(t, e) {
    return Ue(this.props, t) || Ue(this.state, e);
  };
  var je = g.__b;
  g.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), je && je(t);
  };
  var yt = g.__e;
  g.__e = function(t, e, n, r) {
    if (t.then) {
      for (var i, o = e; o = o.__; )
        if ((i = o.__c) && i.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
    }
    yt(t, e, n, r);
  };
  var Ve = g.unmount;
  function qe(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
      typeof r.__c == "function" && r.__c();
    }), t.__c.__H = null), (t = bt({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
      return qe(r, e, n);
    })), t;
  }
  function Ge(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
      return Ge(r, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function fe() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Je(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function ee() {
    this.i = null, this.l = null;
  }
  g.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), Ve && Ve(t);
  }, (fe.prototype = new $()).__c = function(t, e) {
    var n = e.__c, r = this;
    r.o == null && (r.o = []), r.o.push(n);
    var i = Je(r.__v), o = !1, s = function() {
      o || (o = !0, n.__R = null, i ? i(c) : c());
    };
    n.__R = s;
    var c = function() {
      if (!--r.__u) {
        if (r.state.__a) {
          var u = r.state.__a;
          r.__v.__k[0] = Ge(u, u.__c.__P, u.__c.__O);
        }
        var l;
        for (r.setState({ __a: r.__b = null }); l = r.o.pop(); )
          l.forceUpdate();
      }
    };
    r.__u++ || 32 & e.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), t.then(s, s);
  }, fe.prototype.componentWillUnmount = function() {
    this.o = [];
  }, fe.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), r = this.__v.__k[0].__c;
        this.__v.__k[0] = qe(this.__b, n, r.__O = r.__P);
      }
      this.__b = null;
    }
    var i = e.__a && le(N, null, t.fallback);
    return i && (i.__u &= -33), [le(N, null, e.__a ? null : t.children), i];
  };
  var Ke = function(t, e, n) {
    if (++n[1] === n[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size))
      for (n = t.i; n; ) {
        for (; n.length > 3; )
          n.pop()();
        if (n[1] < n[0])
          break;
        t.i = n = n[2];
      }
  };
  (ee.prototype = new $()).__a = function(t) {
    var e = this, n = Je(e.__v), r = e.l.get(t);
    return r[0]++, function(i) {
      var o = function() {
        e.props.revealOrder ? (r.push(i), Ke(e, t, r)) : i();
      };
      n ? n(o) : o();
    };
  }, ee.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = X(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, ee.prototype.componentDidUpdate = ee.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      Ke(t, n, e);
    });
  };
  var vt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, St = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, xt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, kt = /[A-Z0-9]/g, wt = typeof document < "u", Tt = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function Xe(t, e, n) {
    return e.__k == null && (e.textContent = ""), pt(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  $.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty($.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var Ye = g.event;
  function Rt() {
  }
  function Lt() {
    return this.cancelBubble;
  }
  function Ct() {
    return this.defaultPrevented;
  }
  g.event = function(t) {
    return Ye && (t = Ye(t)), t.persist = Rt, t.isPropagationStopped = Lt, t.isDefaultPrevented = Ct, t.nativeEvent = t;
  };
  var Et = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Ze = g.vnode;
  g.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, r = e.type, i = {}, o = r.indexOf("-") === -1;
      for (var s in n) {
        var c = n[s];
        if (!(s === "value" && "defaultValue" in n && c == null || wt && s === "children" && r === "noscript" || s === "class" || s === "className")) {
          var u = s.toLowerCase();
          s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && c === !0 ? c = "" : u === "translate" && c === "no" ? c = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? s = "ondblclick" : u !== "onchange" || r !== "input" && r !== "textarea" || Tt(n.type) ? u === "onfocus" ? s = "onfocusin" : u === "onblur" ? s = "onfocusout" : xt.test(s) && (s = u) : u = s = "oninput" : o && St.test(s) ? s = s.replace(kt, "-$&").toLowerCase() : c === null && (c = void 0), u === "oninput" && i[s = u] && (s = "oninputCapture"), i[s] = c;
        }
      }
      r == "select" && i.multiple && Array.isArray(i.value) && (i.value = X(n.children).forEach(function(l) {
        l.props.selected = i.value.indexOf(l.props.value) != -1;
      })), r == "select" && i.defaultValue != null && (i.value = X(n.children).forEach(function(l) {
        l.props.selected = i.multiple ? i.defaultValue.indexOf(l.props.value) != -1 : i.defaultValue == l.props.value;
      })), n.class && !n.className ? (i.class = n.class, Object.defineProperty(i, "className", Et)) : (n.className && !n.class || n.class && n.className) && (i.class = i.className = n.className), e.props = i;
    }(t), t.$$typeof = vt, Ze && Ze(t);
  };
  var Qe = g.__r;
  g.__r = function(t) {
    Qe && Qe(t), t.__c;
  };
  var et = g.diffed;
  g.diffed = function(t) {
    et && et(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  function At({ detector: t }) {
    const [e, n] = C({ activeBlocks: 0 }), [r, i] = C(15), [o, s] = C(!1), [c, u] = C(!1), l = window.Blinko.i18n;
    ge(() => {
      const x = () => {
        var k;
        const v = ((k = window.blinkoRTL) == null ? void 0 : k.getStats()) || 0;
        n({ activeBlocks: v });
      };
      x();
      const _ = setInterval(x, 1e3);
      return () => clearInterval(_);
    }, []), ge(() => {
      const x = () => {
        const _ = window.blinkoRTL;
        if (_) {
          let v;
          if (typeof _.getSettings == "function" ? v = _.getSettings() : typeof _.settings == "function" && (v = _.settings()), v && v.threshold !== void 0 && i(Math.round(v.threshold * 100)), v && v.debugMode !== void 0 && u(v.debugMode), v)
            return !0;
        }
        return !1;
      };
      if (!x()) {
        const _ = setInterval(() => {
          x() && clearInterval(_);
        }, 100);
        setTimeout(() => clearInterval(_), 2e3);
      }
    }, []);
    const h = () => {
      var x;
      s(!0), (x = window.blinkoRTL) == null || x.fixSelection(), setTimeout(() => {
        s(!1), window.Blinko.toast.success("Selection processed");
      }, 500);
    }, d = (x) => {
      var v;
      const _ = parseInt(x.target.value);
      i(_), (v = window.blinkoRTL) == null || v.setSensitivity(_ / 100);
    }, b = (x) => {
      const _ = x.target.checked;
      u(_);
      const v = window.blinkoRTL;
      v && v.service && typeof v.service.toggleDebugMode == "function" && v.service.toggleDebugMode();
    };
    return /* @__PURE__ */ a("div", { style: {
      padding: "15px",
      fontFamily: "system-ui, sans-serif",
      width: "300px",
      background: "var(--bg-color, white)",
      color: "var(--text-color, black)"
    }, children: [
      /* @__PURE__ */ a("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px"
      }, children: [
        /* @__PURE__ */ a("h3", { style: { margin: 0, fontSize: "16px" }, children: "RTL Control Center" }),
        /* @__PURE__ */ a(
          "button",
          {
            onClick: () => {
              var _, v;
              (_ = window.blinkoRTL) == null || _.toggle();
              const x = (v = window.blinkoRTL) == null ? void 0 : v.isEnabled();
              window.Blinko.toast.success(
                x ? l.t("rtl_enabled") : l.t("rtl_disabled")
              );
            },
            style: {
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              padding: "4px",
              borderRadius: "4px"
            },
            title: l.t("manual_toggle"),
            children: "🔄"
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { style: {
        background: "#f8f9fa",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "15px",
        textAlign: "center",
        borderLeft: "4px solid #007bff"
      }, children: [
        /* @__PURE__ */ a("div", { style: { fontSize: "24px", fontWeight: "bold", color: "#007bff" }, children: e.activeBlocks }),
        /* @__PURE__ */ a("div", { style: { fontSize: "12px", color: "#666" }, children: "Active RTL Blocks" })
      ] }),
      /* @__PURE__ */ a("div", { style: { marginBottom: "20px" }, children: /* @__PURE__ */ a(
        "button",
        {
          onClick: h,
          disabled: o,
          style: {
            width: "100%",
            background: o ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
            cursor: o ? "wait" : "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.2s"
          },
          children: o ? "Processing..." : /* @__PURE__ */ a(N, { children: [
            /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ a("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) }),
            "Fix Selected Text"
          ] })
        }
      ) }),
      /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: [
        /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px" }, children: [
          /* @__PURE__ */ a(
            "input",
            {
              type: "checkbox",
              checked: c,
              onChange: b,
              style: { marginInlineEnd: "8px" }
            }
          ),
          "Enable Visual Debugger"
        ] }),
        /* @__PURE__ */ a("div", { style: { fontSize: "10px", color: "#888", marginInlineStart: "20px", marginTop: "2px" }, children: "Highlights RTL (Red) and LTR (Blue) blocks" })
      ] }),
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ a("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }, children: [
          /* @__PURE__ */ a("strong", { children: "Detection Sensitivity" }),
          /* @__PURE__ */ a("span", { style: { color: "#007bff" }, children: [
            r,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ a(
          "input",
          {
            type: "range",
            min: "1",
            max: "50",
            value: r,
            onChange: d,
            style: { width: "100%", cursor: "pointer" }
          }
        ),
        /* @__PURE__ */ a("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#999", marginTop: "4px" }, children: [
          /* @__PURE__ */ a("span", { children: "More Sensitive (1%)" }),
          /* @__PURE__ */ a("span", { children: "Less Sensitive (50%)" })
        ] })
      ] }),
      /* @__PURE__ */ a("div", { style: { marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #eee", fontSize: "11px", color: "#888", textAlign: "center" }, children: "Click 'Fix Selected' to force detection on specific text." }),
      /* @__PURE__ */ a("div", { style: { marginTop: "5px", fontSize: "10px", color: "#aaa", textAlign: "center" }, children: [
        "v",
        "1.1.4"
      ] })
    ] });
  }
  const O = `/* Dynamic CSS Rules for RTL Elements */
.blinko-detected-rtl {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: embed !important;
}

/* Visual Debugger Styles */
.rtl-debug-mode .rtl-debug-rtl {
    outline: 2px solid rgba(111, 66, 193, 0.8) !important; /* Purple for RTL */
    box-shadow: 0 0 5px rgba(111, 66, 193, 0.5) !important;
    position: relative !important;
}

.rtl-debug-mode .rtl-debug-ltr {
    outline: 2px solid rgba(253, 126, 20, 0.8) !important; /* Orange for LTR */
    box-shadow: 0 0 5px rgba(253, 126, 20, 0.5) !important;
    position: relative !important;
}

.rtl-debug-mode .rtl-debug-rtl::after {
    content: "RTL";
    position: absolute;
    top: -16px;
    right: 0;
    background: #6f42c1;
    color: white;
    font-size: 9px;
    padding: 1px 3px;
    border-radius: 2px;
    z-index: 2147483647;
    pointer-events: none;
    line-height: 1;
    white-space: nowrap;
}

.rtl-debug-mode .rtl-debug-ltr::after {
    content: "LTR";
    position: absolute;
    top: -16px;
    left: 0;
    background: #fd7e14;
    color: white;
    font-size: 9px;
    padding: 1px 3px;
    border-radius: 2px;
    z-index: 2147483647;
    pointer-events: none;
    line-height: 1;
    white-space: nowrap;
}

/* Generic RTL Force - High Specificity */
.rtl-force,
[dir="rtl"].rtl-force,
.markdown-body .rtl-force,
.vditor-reset .rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: embed !important;
}

/* Specific overrides for Inputs and Textareas */
input.rtl-force,
textarea.rtl-force,
.rtl-force input,
.rtl-force textarea {
    direction: rtl !important;
    text-align: right !important;
}

/* Specific overrides for Buttons */
[role="button"].rtl-force,
button.rtl-force,
.btn.rtl-force {
    direction: rtl !important;
    text-align: right !important;
}

/* Applied when LTR is detected */
.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: embed !important;
}
`, te = [
    // Content containers
    ".markdown-body",
    /* Added broad container */
    ".card-masonry-grid",
    /* Added main layout container */
    ".blog-masonry-grid",
    /* Added blog layout container */
    ".markdown-body p",
    ".markdown-body div",
    ".markdown-body span",
    ".markdown-body h1",
    ".markdown-body h2",
    ".markdown-body h3",
    ".markdown-body h4",
    ".markdown-body h5",
    ".markdown-body h6",
    ".markdown-body li",
    ".markdown-body blockquote",
    ".markdown-body td",
    ".markdown-body th",
    ".markdown-body figcaption",
    // Editor elements
    ".vditor-reset p",
    ".vditor-reset div",
    ".vditor-reset span",
    ".vditor-reset h1",
    ".vditor-reset h2",
    ".vditor-reset h3",
    ".vditor-reset h4",
    ".vditor-reset h5",
    ".vditor-reset h6",
    ".vditor-reset li",
    ".vditor-reset blockquote",
    // Code blocks (Explicitly requested to be checked)
    "pre",
    "code",
    ".code-block",
    ".CodeMirror-line",
    ".notion-code-block",
    ".cm-line",
    // Inputs and Editable
    "textarea",
    'input[type="text"]',
    'input[type="search"]',
    'input[type="email"]',
    'input[type="url"]',
    '[contenteditable="true"]',
    "[contenteditable]",
    // UI Elements that might contain text
    '[role="button"]',
    ".btn",
    "button",
    ".checkbox-label",
    "label",
    ".tooltip",
    ".popover",
    ".card-masonry-grid .markdown-body p",
    ".card-masonry-grid .markdown-body div",
    "figcaption",
    // Lists
    "li",
    "ul",
    "ol",
    // Tables
    "td",
    "th",
    "caption"
  ], tt = {
    enabled: !0,
    sensitivity: "medium",
    forceDirection: "auto",
    autoDetect: !0,
    manualMode: !1,
    manualToggle: !1,
    darkMode: !1,
    method: "all",
    customCSS: `
/* Default RTL Styles */
[dir="rtl"] {
  text-align: right;
  direction: rtl;
}
`,
    dynamicCSS: O,
    permanentCSS: !1,
    targetSelectors: te,
    disabledSelectors: [],
    minRTLChars: 2,
    processInterval: 1e3,
    hebrewRegex: !0,
    arabicRegex: !0,
    mixedContent: !0,
    savedPresets: [],
    debugMode: !1,
    visualStyles: {
      fontFamily: "inherit",
      lineHeight: 1.5,
      paragraphMargin: 10
    }
  };
  class Mt {
    constructor(e = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      y(this, "name", "CharacterCode");
      y(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      y(this, "RTL_RANGES", [
        [1424, 1535],
        // Hebrew
        [1536, 1791],
        // Arabic
        [1792, 1871],
        // Syriac
        [1872, 1919],
        // Arabic Supplement
        [1920, 1983],
        // Thaana
        [2208, 2303],
        // Arabic Extended-A
        [64285, 64335],
        // Hebrew Presentation Forms
        [64336, 65023],
        // Arabic Presentation Forms-A
        [65136, 65279]
        // Arabic Presentation Forms-B
      ]);
      this.config = e;
    }
    /**
     * Check if a character is RTL
     */
    isRTLChar(e) {
      const n = e.charCodeAt(0);
      return this.RTL_RANGES.some(([r, i]) => n >= r && n <= i);
    }
    /**
     * Detect RTL content in text
     */
    detect(e) {
      if (!e || e.length === 0)
        return !1;
      const n = e.substring(0, this.config.sampleSize);
      let r = 0, i = 0;
      for (const c of n)
        /\s|[.,!?;:()[\]{}]/.test(c) || (i++, this.isRTLChar(c) && r++);
      return r < this.config.minRTLChars ? !1 : (i > 0 ? r / i : 0) >= {
        high: 0.1,
        // 10% RTL chars
        medium: 0.15,
        // 15% RTL chars
        low: 0.4
        // 40% RTL chars
      }[this.config.sensitivity];
    }
    updateConfig(e) {
      this.config = { ...this.config, ...e };
    }
  }
  class Pt {
    constructor(e = !0, n = !0, r = 0.3, i = 3) {
      y(this, "name", "Regex");
      // Hebrew regex range: 0590-05FF, FB1D-FB4F (Presentation forms A), FB50-FBB1 (Presentation forms B - wait, that's Arabic)
      // Hebrew: \u0590-\u05FF
      y(this, "hebrewPattern", "\\u0590-\\u05FF\\uFB1D-\\uFB4F");
      // Arabic regex range
      y(this, "arabicPattern", "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF");
      y(this, "checkHebrew");
      y(this, "checkArabic");
      y(this, "threshold");
      // Ratio 0.0 - 1.0
      y(this, "minRTLChars", 3);
      this.checkHebrew = e, this.checkArabic = n, this.threshold = r, this.minRTLChars = i;
    }
    updateConfig(e) {
      e.minRTLChars !== void 0 && (this.minRTLChars = e.minRTLChars), e.threshold !== void 0 && (this.threshold = e.threshold);
    }
    detect(e) {
      if (!e || !e.trim())
        return !1;
      let n = [];
      if (this.checkHebrew && n.push(this.hebrewPattern), this.checkArabic && n.push(this.arabicPattern), n.length === 0)
        return !1;
      const r = new RegExp(`[${n.join("")}]`, "g"), i = e.match(r);
      if (!i)
        return !1;
      const o = i.length;
      if (o < this.minRTLChars)
        return e.trim().length >= this.minRTLChars, !1;
      const s = e.length;
      return s === 0 ? !1 : o / s > this.threshold;
    }
  }
  class nt {
    constructor(e) {
      y(this, "name", "Combined");
      y(this, "strategies");
      this.strategies = e;
    }
    detect(e) {
      return this.strategies.some((n) => n.detect(e));
    }
    addStrategy(e) {
      this.strategies.push(e);
    }
    getStrategies() {
      return this.strategies;
    }
  }
  class rt {
    constructor(e = {}) {
      y(this, "strategy");
      y(this, "charCodeStrategy");
      y(this, "regexStrategy");
      y(this, "config");
      this.config = {
        sensitivity: "medium",
        minRTLChars: 3,
        sampleSize: 100,
        ...e
      }, this.charCodeStrategy = new Mt(this.config);
      const n = this.getThresholdFromSensitivity(this.config.sensitivity);
      this.regexStrategy = new Pt(!0, !0, n, this.config.minRTLChars), this.strategy = new nt([
        this.charCodeStrategy,
        this.regexStrategy
      ]);
    }
    getThresholdFromSensitivity(e) {
      switch (e) {
        case "high":
          return 0.1;
        case "medium":
          return 0.15;
        case "low":
          return 0.4;
        default:
          return 0.15;
      }
    }
    setStrategy(e) {
      switch (e) {
        case "CharacterCode":
          this.strategy = this.charCodeStrategy;
          break;
        case "Regex":
          this.strategy = this.regexStrategy;
          break;
        case "Combined":
          this.strategy = new nt([
            this.charCodeStrategy,
            this.regexStrategy
          ]);
          break;
      }
    }
    /**
     * Detect RTL content in text using current strategy
     */
    detectRTL(e) {
      return this.strategy.detect(e);
    }
    /**
     * Detect RTL in multiple text segments
     */
    detectRTLInSegments(e) {
      return e.map((n) => this.detectRTL(n));
    }
    /**
     * Update detection configuration
     */
    updateConfig(e) {
      this.config = { ...this.config, ...e }, this.charCodeStrategy.updateConfig(e);
      const n = this.getThresholdFromSensitivity(this.config.sensitivity);
      this.regexStrategy.updateConfig({
        minRTLChars: e.minRTLChars,
        threshold: n
      });
    }
  }
  const q = [
    {
      id: "default",
      name: "Default CSS",
      css: `/* Enhanced RTL Support from Blinko-RTL.css */
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: plaintext !important;
}

.vditor-reset, .vditor-reset > div, .vditor-reset > p {
    unicode-bidi: plaintext !important;
}

.card-masonry-grid .markdown-body {
    line-height: 1.35 !important;
}

.card-masonry-grid .markdown-body > div {
    margin-bottom: 0.3em !important;
}

*:dir(rtl) input[type="text"], *:dir(rtl) textarea {
    text-align: right !important;
    direction: rtl !important;
}

*:dir(rtl) ol, *:dir(rtl) ul {
    list-style-position: outside !important;
    padding-left: 0 !important;
    padding-right: 2em !important;
}

*:dir(rtl) blockquote {
    border-left: none !important;
    border-right: 3px solid currentcolor !important;
    padding-left: 0 !important;
    padding-right: 0.9em !important;
}`,
      dynamicCSS: O,
      targetSelectors: te,
      disabledSelectors: [],
      isBuiltIn: !0
    },
    {
      id: "app-shell",
      name: "Enhanced RTL (App Shell & UI)",
      css: `/* ==========================================================================
   1. App Shell & UI Protection
   Prevents the main interface (buttons, toolbars, layout) from flipping incorrectly.
   ========================================================================== */
#page-wrap,
#page-wrap > div,
#page-wrap > header,
header,
nav,
.sidebar,
.toolbar,
.flex,
.grid,
button,
.btn {
    direction: unset; /* Or 'ltr' if unset doesn't work specific cases */
}

/* ==========================================================================
   2. General Text Content (BiDi Support)
   Forces browser to auto-detect direction (LTR vs RTL) per paragraph.
   ========================================================================== */
.markdown-body p,
.markdown-body div,
.markdown-body span,
.vditor-reset p,
.vditor-reset div,
.vditor-reset span,
.card-masonry-grid p,
.card-masonry-grid div,
textarea,
[contenteditable],
input[type="text"] {
    unicode-bidi: plaintext !important;
}

/* Specific spacing for editor paragraphs */
.vditor-reset p {
    margin-bottom: 8px;
}

/* Force RTL on the last element to ensure cursor behaves in editor */
.vditor-reset p:last-child,
.vditor-reset blockquote:last-child,
.vditor-reset pre:last-child,
.vditor-reset ul:last-child,
.vditor-reset ol:last-child,
.vditor-reset hr:last-child {
    direction: rtl;
}

/* ==========================================================================
   3. Headings
   Ensures titles respect bidirectional text and spacing.
   ========================================================================== */
.expanded-container .markdown-body h1,
.expanded-container .markdown-body h2,
.expanded-container .markdown-body h3,
.expanded-container .markdown-body h4,
.expanded-container .markdown-body h5,
.expanded-container .markdown-body h6,
.vditor-reset h1,
.vditor-reset h2,
.vditor-reset h3,
.vditor-reset h4,
.vditor-reset h5,
.vditor-reset h6 {
    unicode-bidi: plaintext;
}

/* Heading margins for the editor */
.vditor-reset h1,
.vditor-reset h2,
.vditor-reset h3,
.vditor-reset h4,
.vditor-reset h5,
.vditor-reset h6 {
    margin-top: 12px;
    margin-bottom: 8px;
}

/* ==========================================================================
   4. Lists & Indentation
   Aligns bullets and numbers to the right and handles nesting.
   ========================================================================== */
ol,
ul,
menu,
.markdown-body ul,
.vditor-reset ul,
.vditor-reset ol {
    direction: rtl;
    unicode-bidi: plaintext;
    margin: 0;
}

/* specific padding adjustment for editor lists */
.vditor-reset ul,
.vditor-reset ol {
    padding: 0px 1em 0px 1px;
}

/* ==========================================================================
   5. Tasks & Checkboxes
   Ensures checkboxes align correctly with text.
   ========================================================================== */
.vditor-task {
    direction: rtl;
    margin-left: 0px;
}

.vditor-task input {
    margin: 0;
    direction: rtl;
    unicode-bidi: plaintext;
}

/* ==========================================================================
   6. Expanded / Reading View
   Specific layout tweaks for the expanded note view.
   ========================================================================== */
.expanded-container .markdown-body p,
.expanded-container .markdown-body blockquote,
.expanded-container .markdown-body ul,
.expanded-container .markdown-body ol,
.expanded-container .markdown-body dl,
.expanded-container .markdown-body pre,
.expanded-container .markdown-body details {
    margin-bottom: var(--base-size-8);
    padding: 0px 20px; /* 20PX normalized to lowercase */
    direction: rtl;
    unicode-bidi: plaintext;
}

ul {
    direction: unset;
}`,
      isBuiltIn: !0
    }
  ];
  function $t() {
    const [t, e] = C({
      enabled: !0,
      sensitivity: "medium",
      threshold: 0.15,
      forceDirection: "auto",
      autoDetect: !0,
      // Default to true now
      manualMode: !0,
      manualToggle: !1,
      mobileView: !1,
      darkMode: !1,
      method: "all",
      customCSS: "",
      dynamicCSS: O,
      permanentCSS: !1,
      visualStyles: {
        fontFamily: "inherit",
        lineHeight: 1.5,
        paragraphMargin: 1
      },
      targetSelectors: te,
      disabledSelectors: [],
      minRTLChars: 3,
      processInterval: 2e3,
      hebrewRegex: !0,
      arabicRegex: !0,
      mixedContent: !0,
      savedPresets: []
    });
    C("");
    const [n, r] = C(""), [i, o] = C(""), [s, c] = C(""), [u, l] = C([]), [h, d] = C(""), [b, f] = C("");
    ge(() => {
      var T, re;
      (() => {
        var B;
        const D = (B = window.blinkoRTL) == null ? void 0 : B.settings();
        D && e(D);
      })();
      const m = (D) => {
        e((B) => ({ ...B, ...D.detail }));
      }, S = (D) => {
        l((B) => [D.detail, ...B].slice(0, 50));
      };
      return (re = (T = window.blinkoRTL) == null ? void 0 : T.service) != null && re.getActionLog && l(window.blinkoRTL.service.getActionLog()), window.addEventListener("rtl-settings-changed", m), window.addEventListener("rtl-action-logged", S), () => {
        window.removeEventListener("rtl-settings-changed", m), window.removeEventListener("rtl-action-logged", S);
      };
    }, []);
    const x = (p) => {
      let m = 0;
      for (let S = 0; S < p.length; S++)
        if (p[S] === "{" && m++, p[S] === "}" && m--, m < 0)
          return !1;
      return m === 0;
    }, _ = (p) => {
      var S;
      p.dynamicCSS !== void 0 && (x(p.dynamicCSS) ? d("") : d("Invalid CSS: Unbalanced curly braces"));
      const m = { ...t, ...p };
      e(m), (S = window.blinkoRTL) != null && S.service ? window.blinkoRTL.service.updateSettings(p) : (console.warn("RTL Service not found, settings might not persist correctly via StorageManager"), localStorage.setItem("blinko-rtl-settings", JSON.stringify(m)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: m
        })
      ));
    }, v = () => {
      var m;
      if (!n.trim())
        return;
      const p = (m = window.blinkoRTL) == null ? void 0 : m.detector;
      if (p) {
        const S = p.detectRTL(n);
        o(S ? "RTL" : "LTR");
      } else
        try {
          const T = new rt().detectRTL(n);
          o(T ? "RTL" : "LTR");
        } catch (S) {
          console.error("Failed to create fallback detector", S), console.warn("RTL Detector not found via global API or fallback");
        }
    }, k = () => {
      window.blinkoRTL && (window.blinkoRTL.processAll(), window.Blinko.toast.success("Content processed!"));
    }, w = () => {
      if (!s)
        return;
      const m = [...q, ...t.savedPresets || []].find((S) => S.id === s);
      m && (_({
        customCSS: m.css,
        dynamicCSS: m.dynamicCSS || t.dynamicCSS,
        targetSelectors: m.targetSelectors || t.targetSelectors,
        disabledSelectors: m.disabledSelectors || t.disabledSelectors
      }), window.Blinko.toast.success(`Preset "${m.name}" loaded!`));
    }, A = () => {
      const p = prompt("Enter a name for this Full Preset (CSS, Dynamic Rules, Selectors):");
      if (!p)
        return;
      const m = {
        id: `custom-${Date.now()}`,
        name: p,
        css: t.customCSS,
        dynamicCSS: t.dynamicCSS,
        targetSelectors: t.targetSelectors,
        disabledSelectors: t.disabledSelectors,
        isBuiltIn: !1
      };
      _({
        savedPresets: [...t.savedPresets || [], m]
      }), c(m.id), window.Blinko.toast.success("Preset saved!");
    }, M = () => {
      if (!s)
        return;
      if (q.some((m) => m.id === s)) {
        window.Blinko.toast.error("Cannot delete built-in presets.");
        return;
      }
      confirm("Are you sure you want to delete this preset?") && (_({
        savedPresets: (t.savedPresets || []).filter((m) => m.id !== s)
      }), c(""));
    }, U = () => {
      if (confirm("Reset all settings to defaults? This cannot be undone.")) {
        const p = {
          ...tt,
          savedPresets: t.savedPresets || []
          // Preserve user presets
        };
        _(p), window.Blinko.toast.success("Settings reset to defaults");
      }
    }, z = () => {
      _({ dynamicCSS: O }), window.Blinko.toast.success("Dynamic CSS reset");
    }, ne = () => {
      var m;
      const p = (m = window.blinkoRTL) == null ? void 0 : m.service;
      if (p) {
        const S = "data:text/json;charset=utf-8," + encodeURIComponent(p.exportSettings()), T = document.createElement("a");
        T.setAttribute("href", S), T.setAttribute("download", "blinko-rtl-settings-v1.json"), document.body.appendChild(T), T.click(), T.remove();
      } else
        window.Blinko.toast.error("Export failed: Service not available");
    }, W = (p) => {
      var T;
      const m = (T = p.target.files) == null ? void 0 : T[0];
      if (!m)
        return;
      const S = new FileReader();
      S.onload = (re) => {
        var D, B;
        try {
          const G = (D = re.target) == null ? void 0 : D.result, st = (B = window.blinkoRTL) == null ? void 0 : B.service;
          if (st)
            st.importSettings(G), f(""), window.Blinko.toast.success("Settings imported successfully!");
          else
            throw new Error("Service not available");
        } catch (G) {
          console.error("Import failed", G), f("Failed to import settings: " + (G instanceof Error ? G.message : "Invalid file")), window.Blinko.toast.error("Import failed");
        }
      }, S.readAsText(m), p.target.value = "";
    };
    return /* @__PURE__ */ a(
      "div",
      {
        className: t.darkMode ? "rtl-settings-dark" : "",
        style: {
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "system-ui, sans-serif",
          background: t.darkMode ? "#1a1a1a" : "white",
          color: t.darkMode ? "#e0e0e0" : "#000"
        },
        children: [
          /* @__PURE__ */ a("div", { style: { marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #eee" }, children: [
            /* @__PURE__ */ a("h2", { style: { margin: "0 0 10px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🔧 Fixed RTL Language Support Settings" }),
            /* @__PURE__ */ a("p", { style: { margin: "0", color: t.darkMode ? "#aaa" : "#666", fontSize: "14px" }, children: "Precise RTL support with manual control and optional permanent CSS injection." })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #007bff",
            borderRadius: "8px",
            background: t.darkMode ? "#2c3e50" : "#f8f9ff"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#007bff" }, children: "⚡ Quick Actions" }),
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }, children: [
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: k,
                  disabled: !t.enabled,
                  style: {
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  },
                  children: "🔄 Process All Content"
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => {
                    var p;
                    (p = window.blinkoRTL) == null || p.toggle(), window.Blinko.toast.success("RTL toggled!");
                  },
                  style: {
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  },
                  children: "🔄 Toggle RTL (ع/א)"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa",
            maxHeight: "300px",
            overflowY: "auto"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "📜 Real-time Action Log" }),
            u.length === 0 ? /* @__PURE__ */ a("p", { style: { color: t.darkMode ? "#aaa" : "#666", fontStyle: "italic" }, children: "No actions recorded yet..." }) : /* @__PURE__ */ a("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "12px", color: t.darkMode ? "#ccc" : "#000" }, children: [
              /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ a("tr", { style: { textAlign: "left", borderBottom: "1px solid #ccc" }, children: [
                /* @__PURE__ */ a("th", { style: { padding: "5px" }, children: "Time" }),
                /* @__PURE__ */ a("th", { style: { padding: "5px" }, children: "Element" }),
                /* @__PURE__ */ a("th", { style: { padding: "5px" }, children: "Action" }),
                /* @__PURE__ */ a("th", { style: { padding: "5px" }, children: "Details" })
              ] }) }),
              /* @__PURE__ */ a("tbody", { children: u.map((p, m) => /* @__PURE__ */ a("tr", { style: { borderBottom: t.darkMode ? "1px solid #444" : "1px solid #eee" }, children: [
                /* @__PURE__ */ a("td", { style: { padding: "5px", whiteSpace: "nowrap" }, children: p.timestamp }),
                /* @__PURE__ */ a("td", { style: { padding: "5px", fontFamily: "monospace" }, title: p.element, children: p.element.length > 20 ? p.element.substring(0, 20) + "..." : p.element }),
                /* @__PURE__ */ a("td", { style: { padding: "5px", color: p.direction === "RTL" ? "#28a745" : "#007bff" }, children: p.direction }),
                /* @__PURE__ */ a("td", { style: { padding: "5px", color: t.darkMode ? "#888" : "#666" }, children: p.textPreview })
              ] }, m)) })
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🎛️ Mode Settings" }),
            /* @__PURE__ */ a("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enabled,
                    onChange: (p) => _({ enabled: p.target.checked })
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🔧 Enable RTL Support" })
              ] }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualMode,
                    onChange: (p) => _({ manualMode: p.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "✋ Manual Mode (Recommended)" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Manual mode only applies RTL when clearly detected, preventing unwanted changes" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.mobileView,
                    onChange: (p) => _({ mobileView: p.target.checked })
                  }
                ),
                /* @__PURE__ */ a("span", { children: "📱 Mobile View" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Optimizes layout for mobile devices" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.debugMode,
                    onChange: (p) => {
                      var S, T;
                      const m = p.target.checked;
                      _({ debugMode: m }), (T = (S = window.blinkoRTL) == null ? void 0 : S.service) == null || T.toggleDebugMode();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🐞 Visual Debugger" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Highlights detected RTL (Red) and LTR (Blue) elements with tooltips" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.autoDetect,
                    onChange: (p) => _({ autoDetect: p.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🤖 Auto-detect All Content" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Continuously processes all content on the page every 2 seconds" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualToggle,
                    onChange: (p) => {
                      const m = p.target.checked;
                      _({ manualToggle: m });
                      const S = window.blinkoRTL;
                      S && S.isEnabled() && S.processAll();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🔄 Manual RTL Toggle" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Forces RTL on all content when enabled, ignores detection" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.darkMode,
                    onChange: (p) => {
                      const m = p.target.checked;
                      _({ darkMode: m }), m ? document.body.classList.add("dark") : document.body.classList.remove("dark");
                    }
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🌙 Dark Mode Plugin UI" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Applies dark styling to RTL plugin components only" })
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #6610f2",
            borderRadius: "8px",
            background: t.darkMode ? "#2c2c3e" : "#f8f9ff"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#6610f2" }, children: "🎨 Dynamic CSS Rules" }),
            /* @__PURE__ */ a("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#aaa" : "#666" }, children: "These CSS rules are applied dynamically when RTL or LTR content is detected. Customize the class definitions below to control how detected elements are styled." }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ a(
                "textarea",
                {
                  value: t.dynamicCSS,
                  onChange: (p) => _({ dynamicCSS: p.target.value }),
                  placeholder: "Enter your dynamic CSS rules here...",
                  disabled: !t.enabled,
                  style: {
                    width: "100%",
                    height: "350px",
                    padding: "10px",
                    border: h ? "2px solid red" : "1px solid #ccc",
                    borderRadius: "4px",
                    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                    fontSize: "13px",
                    resize: "vertical",
                    background: t.darkMode ? "#222" : "white",
                    color: t.darkMode ? "#eee" : "black"
                  }
                }
              ),
              h && /* @__PURE__ */ a("div", { style: { color: "red", fontSize: "12px", marginTop: "5px" }, children: h })
            ] }),
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: z,
                  disabled: !t.enabled,
                  style: {
                    background: "#17a2b8",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  },
                  children: "🔄 Reset Dynamic CSS"
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => {
                    if (h) {
                      window.Blinko.toast.error("Please fix CSS errors before saving.");
                      return;
                    }
                    _({ dynamicCSS: t.dynamicCSS }), window.Blinko.toast.success("Dynamic CSS Settings Saved");
                  },
                  disabled: !t.enabled,
                  style: {
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  },
                  children: "💾 Save Settings"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #28a745",
            borderRadius: "8px",
            background: t.darkMode ? "#1e3023" : "#f8fff8"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "📌 Permanent CSS Settings" }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.permanentCSS,
                    onChange: (p) => _({ permanentCSS: p.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "Enable Permanent CSS Injection" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "5px 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "This CSS is injected permanently as long as the plugin is enabled, regardless of RTL detection. Use this for global overrides." })
            ] }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px", padding: "15px", background: t.darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", borderRadius: "6px" }, children: [
              /* @__PURE__ */ a("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px" }, children: "📚 CSS Presets:" }),
              /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
                /* @__PURE__ */ a(
                  "select",
                  {
                    value: s,
                    onChange: (p) => c(p.target.value),
                    disabled: !t.enabled,
                    style: {
                      flex: 1,
                      padding: "8px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      minWidth: "200px",
                      background: t.darkMode ? "#333" : "white",
                      color: t.darkMode ? "#eee" : "black"
                    },
                    children: [
                      /* @__PURE__ */ a("option", { value: "", children: "-- Select a Preset --" }),
                      /* @__PURE__ */ a("optgroup", { label: "Built-in Presets", children: q.map((p) => /* @__PURE__ */ a("option", { value: p.id, children: p.name }, p.id)) }),
                      t.savedPresets && t.savedPresets.length > 0 && /* @__PURE__ */ a("optgroup", { label: "Saved Presets", children: t.savedPresets.map((p) => /* @__PURE__ */ a("option", { value: p.id, children: p.name }, p.id)) })
                    ]
                  }
                ),
                /* @__PURE__ */ a(
                  "button",
                  {
                    onClick: w,
                    disabled: !t.enabled || !s,
                    style: {
                      background: "#17a2b8",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    },
                    children: "📥 Load"
                  }
                ),
                /* @__PURE__ */ a(
                  "button",
                  {
                    onClick: M,
                    disabled: !t.enabled || !s || q.some((p) => p.id === s),
                    style: {
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      opacity: q.some((p) => p.id === s) ? 0.5 : 1
                    },
                    title: "Delete selected preset",
                    children: "🗑️"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ a("label", { style: { display: "block", fontWeight: "500", marginBottom: "5px" }, children: "Custom CSS Code (Permanent):" }),
              /* @__PURE__ */ a(
                "textarea",
                {
                  value: t.customCSS,
                  onChange: (p) => _({ customCSS: p.target.value }),
                  placeholder: "Enter your permanent custom CSS code here...",
                  disabled: !t.enabled,
                  style: {
                    width: "100%",
                    height: "200px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                    fontSize: "13px",
                    resize: "vertical",
                    background: t.darkMode ? "#222" : "white",
                    color: t.darkMode ? "#eee" : "black"
                  }
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: A,
                  disabled: !t.enabled || !t.customCSS.trim(),
                  style: {
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  },
                  children: "💾 Save as New Preset"
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => _({ customCSS: "" }),
                  disabled: !t.enabled,
                  style: {
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  },
                  children: "🗑️ Clear CSS"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🧪 Test RTL Detection" }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ a(
              "textarea",
              {
                value: n,
                onChange: (p) => r(p.target.value),
                placeholder: "Enter text to test RTL detection...",
                style: {
                  width: "100%",
                  height: "80px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  resize: "vertical",
                  fontFamily: "inherit",
                  background: t.darkMode ? "#222" : "white",
                  color: t.darkMode ? "#eee" : "black"
                }
              }
            ) }),
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", marginBottom: "15px" }, children: /* @__PURE__ */ a(
              "button",
              {
                onClick: v,
                style: {
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer"
                },
                children: "🧪 Test Detection"
              }
            ) }),
            i && /* @__PURE__ */ a("div", { style: {
              padding: "10px",
              background: i === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${i === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px",
              color: "#333"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ a("strong", { children: i === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🔧 Advanced Actions" }),
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
              /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: U,
                  style: {
                    padding: "10px 20px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  },
                  children: "🔄 Reset to Defaults"
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: ne,
                  style: {
                    padding: "10px 20px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  },
                  children: "📋 Export Settings (JSON)"
                }
              ),
              /* @__PURE__ */ a("label", { style: {
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                display: "inline-block"
              }, children: [
                "📂 Import Settings (JSON)",
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "file",
                    accept: ".json",
                    onChange: W,
                    style: { display: "none" }
                  }
                )
              ] })
            ] }),
            b && /* @__PURE__ */ a("p", { style: { color: "red", marginTop: "10px" }, children: b })
          ] })
        ]
      }
    );
  }
  const it = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "1.1.4",
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
  function ot(t, e, n = !1) {
    let r = null;
    return function(...i) {
      const o = this, s = function() {
        r = null, n || t.apply(o, i);
      }, c = n && !r;
      r && clearTimeout(r), r = setTimeout(s, e), c && t.apply(o, i);
    };
  }
  class Dt {
    constructor(e) {
      y(this, "detector");
      y(this, "isEnabled", !1);
      y(this, "activeToast", null);
      y(this, "handlePaste", (e) => {
        var i;
        if (!this.isEnabled)
          return;
        const n = e.target;
        if (!this.isEditable(n))
          return;
        const r = (i = e.clipboardData) == null ? void 0 : i.getData("text/plain");
        r && this.detectMixedContent(r) && (e.preventDefault(), e.stopPropagation(), this.showSuggestionToast(r, n));
      });
      this.detector = e;
    }
    enable() {
      this.isEnabled || (document.addEventListener("paste", this.handlePaste, !0), this.isEnabled = !0);
    }
    disable() {
      this.isEnabled && (document.removeEventListener("paste", this.handlePaste, !0), this.removeToast(), this.isEnabled = !1);
    }
    isEditable(e) {
      return e.isContentEditable || e.tagName === "TEXTAREA" || e.tagName === "INPUT" && e.type === "text";
    }
    detectMixedContent(e) {
      const n = (e.match(/[\u0590-\u05FF\u0600-\u06FF]/g) || []).length, r = (e.match(/[a-zA-Z]/g) || []).length;
      return n > 3 && r > 3;
    }
    showSuggestionToast(e, n) {
      var i, o, s, c;
      this.removeToast();
      const r = document.createElement("div");
      r.className = "rtl-paste-toast", r.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong style="display: block; margin-bottom: 5px;">Mixed content detected</strong>
        <p style="margin: 0; font-size: 0.9em; opacity: 0.8;">How would you like to paste this text?</p>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button id="rtl-btn-split" style="flex: 1; padding: 6px 12px; border: none; border-radius: 4px; background: var(--b3-theme-primary, #007bff); color: white; cursor: pointer;">Split Blocks</button>
        <button id="rtl-btn-wrap" style="flex: 1; padding: 6px 12px; border: none; border-radius: 4px; background: var(--b3-theme-secondary, #6c757d); color: white; cursor: pointer;">Wrap (Isolation)</button>
        <button id="rtl-btn-original" style="flex: 1; padding: 6px 12px; border: 1px solid var(--b3-theme-surface-lighter, #ccc); border-radius: 4px; background: transparent; color: inherit; cursor: pointer;">Original</button>
      </div>
      <button class="rtl-toast-close" style="position: absolute; top: 5px; right: 5px; border: none; background: transparent; cursor: pointer; font-size: 16px;">&times;</button>
    `, Object.assign(r.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "var(--b3-theme-surface, #fff)",
        color: "var(--b3-theme-on-surface, #000)",
        border: "1px solid var(--b3-border-color, #ccc)",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: "10000",
        maxWidth: "350px",
        fontFamily: "sans-serif",
        fontSize: "14px"
      }), document.body.appendChild(r), this.activeToast = r, (i = r.querySelector("#rtl-btn-split")) == null || i.addEventListener("click", () => {
        this.insertText(n, this.processSplit(e)), this.removeToast();
      }), (o = r.querySelector("#rtl-btn-wrap")) == null || o.addEventListener("click", () => {
        this.insertText(n, this.processWrap(e)), this.removeToast();
      }), (s = r.querySelector("#rtl-btn-original")) == null || s.addEventListener("click", () => {
        this.insertText(n, e), this.removeToast();
      }), (c = r.querySelector(".rtl-toast-close")) == null || c.addEventListener("click", () => {
        this.removeToast();
      });
    }
    removeToast() {
      this.activeToast && (this.activeToast.remove(), this.activeToast = null);
    }
    insertText(e, n) {
      if (e.tagName === "TEXTAREA" || e.tagName === "INPUT") {
        const r = e, i = r.selectionStart || 0, o = r.selectionEnd || 0;
        r.value = r.value.substring(0, i) + n + r.value.substring(o), r.selectionStart = r.selectionEnd = i + n.length, r.dispatchEvent(new Event("input", { bubbles: !0 }));
      } else if (e.focus(), !document.execCommand("insertText", !1, n)) {
        const i = window.getSelection();
        if (i && i.rangeCount > 0) {
          const o = i.getRangeAt(0);
          o.deleteContents(), o.insertNode(document.createTextNode(n)), o.collapse(!1);
        }
      }
    }
    processSplit(e) {
      const n = /([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g;
      let r = e.replace(n, (i) => `
${i}
`);
      return r = r.replace(/\n{3,}/g, `

`).trim(), r;
    }
    processWrap(e) {
      const n = "⁧", r = "⁩";
      return e.replace(/([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g, `${n}$1${r}`);
    }
  }
  class Bt {
    constructor() {
      y(this, "STORAGE_KEY", "blinko-rtl-settings");
      y(this, "CURRENT_VERSION", 1);
    }
    /**
     * Attempts to retrieve a consistent User ID from the Blinko environment.
     * Checks multiple potential locations for user identity.
     */
    getUserId() {
      try {
        const e = window.Blinko;
        if (e) {
          if (e.user && e.user.id)
            return e.user.id;
          if (e.currentUser && e.currentUser.id)
            return e.currentUser.id;
        }
      } catch {
      }
      return null;
    }
    /**
     * specific key for the current user (or global if anonymous)
     */
    getStorageKey() {
      const e = this.getUserId();
      return e ? `${this.STORAGE_KEY}-${e}` : this.STORAGE_KEY;
    }
    save(e) {
      const n = this.getStorageKey();
      try {
        localStorage.setItem(n, JSON.stringify(e));
      } catch (r) {
        console.error("Failed to save RTL settings:", r);
      }
    }
    load() {
      const e = this.getStorageKey(), n = localStorage.getItem(e);
      if (!n && e !== this.STORAGE_KEY) {
        const r = localStorage.getItem(this.STORAGE_KEY);
        if (r)
          try {
            return JSON.parse(r);
          } catch {
            return null;
          }
      }
      if (n)
        try {
          return JSON.parse(n);
        } catch (r) {
          return console.error("Failed to parse RTL settings:", r), null;
        }
      return null;
    }
    export(e) {
      const n = {
        version: this.CURRENT_VERSION,
        source: "blinko-rtl-support-plugin",
        timestamp: Date.now(),
        data: e
      };
      return JSON.stringify(n, null, 2);
    }
    import(e) {
      let n;
      try {
        n = JSON.parse(e);
      } catch {
        throw new Error("Invalid JSON format");
      }
      if (typeof n != "object" || n === null)
        throw new Error("Invalid import data: Root must be an object");
      if (!n.version && !n.data && n.targetSelectors)
        return this.validateAndSanitize(n);
      if (n.source, !n.data)
        throw new Error("Invalid import data: Missing settings data");
      return this.validateAndSanitize(n.data);
    }
    validateAndSanitize(e) {
      if (!Array.isArray(e.targetSelectors))
        throw new Error("Invalid settings: targetSelectors must be an array");
      if (e.minRTLChars !== void 0 && typeof e.minRTLChars != "number")
        throw new Error("Invalid settings: minRTLChars must be a number");
      return typeof e.dynamicCSS != "string" && (e.dynamicCSS = ""), e;
    }
  }
  class It {
    constructor(e) {
      y(this, "detector");
      y(this, "isRTLEnabled", !1);
      y(this, "styleElement", null);
      y(this, "permanentStyleElement", null);
      y(this, "dynamicStyleElement", null);
      y(this, "observer", null);
      y(this, "autoProcessInterval", null);
      // Managers
      y(this, "pasteInterceptor");
      y(this, "storageManager");
      // Optimizations
      y(this, "pendingElements", /* @__PURE__ */ new Set());
      y(this, "debouncedProcessQueue");
      y(this, "debouncedProcessAll");
      // Action Log
      y(this, "actionLog", []);
      y(this, "MAX_LOG_SIZE", 50);
      // Hebrew regex from userscript
      y(this, "hebrewRegex", /\p{Script=Hebrew}/u);
      y(this, "arabicRegex", /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/);
      y(this, "settings", { ...tt, targetSelectors: te });
      y(this, "processElement", (e) => {
        if (!e)
          return;
        const n = (s, c) => {
          try {
            return s.matches(c);
          } catch (u) {
            return console.warn(`Invalid selector '${c}':`, u), !1;
          }
        };
        if (this.settings.disabledSelectors && this.settings.disabledSelectors.some((s) => n(e, s)) || e.closest(".flex, .grid, header, nav, .sidebar, .toolbar") && n(e, ".flex, .grid, header, nav, .sidebar, .toolbar"))
          return;
        const r = e.textContent || e.value || e.placeholder || "";
        if (!r.trim() || r.length < this.settings.minRTLChars) {
          this.applyCSSClassRTL(e, "neutral");
          return;
        }
        let i = "neutral";
        if (this.settings.manualToggle)
          i = "rtl";
        else if (this.settings.forceDirection === "rtl")
          i = "rtl";
        else if (this.settings.forceDirection === "ltr")
          i = "ltr";
        else if (n(e, "pre, code, .code-block, .CodeMirror-line, .notion-code-block")) {
          const c = (r.match(/[\u0590-\u05FF]/g) || []).length, u = (r.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length, l = c + u, h = r.replace(/\s/g, "").length || r.length;
          l / h > 0.6 ? i = "rtl" : i = "ltr";
        } else
          this.detector.detectRTL(r) ? i = "rtl" : /[a-zA-Z]/.test(r) ? i = "ltr" : i = "neutral";
        const o = e.getAttribute("data-manual-dir");
        switch (o === "rtl" && (i = "rtl"), o === "ltr" && (i = "ltr"), this.logAction(e, i), this.settings.method) {
          case "direct":
            this.applyDirectRTL(e, i);
            break;
          case "attributes":
            this.applyAttributeRTL(e, i);
            break;
          case "css":
            this.applyCSSClassRTL(e, i);
            break;
          case "unicode":
            this.applyUnicodeBidiRTL(e);
            break;
          case "all":
          default:
            this.applyCSSClassRTL(e, i), this.applyAttributeRTL(e, i);
            break;
        }
      });
      y(this, "processAllElements", () => {
        if (!this.isRTLEnabled)
          return;
        this.settings.targetSelectors.filter(
          (n) => !this.settings.disabledSelectors.includes(n)
        ).forEach((n) => {
          try {
            document.querySelectorAll(n).forEach((i) => {
              this.processElement(i);
            });
          } catch (r) {
            console.warn(`Invalid selector in processAllElements: '${n}'`, r);
          }
        });
      });
      this.detector = e, this.storageManager = new Bt(), this.loadSettings(), this.pasteInterceptor = new Dt(e), this.debouncedProcessAll = ot(() => this.processAllElements(), 200), this.debouncedProcessQueue = ot(() => {
        this.processPendingElements();
      }, 50);
    }
    getSettings() {
      return { ...this.settings };
    }
    getActionLog() {
      return [...this.actionLog];
    }
    logAction(e, n) {
      const r = {
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        element: e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + (e.className ? `.${e.className.split(" ").join(".")}` : ""),
        direction: n.toUpperCase(),
        textPreview: (e.textContent || "").substring(0, 20) + "..."
      };
      this.actionLog.unshift(r), this.actionLog.length > this.MAX_LOG_SIZE && this.actionLog.pop(), window.dispatchEvent(new CustomEvent("rtl-action-logged", { detail: r }));
    }
    isEnabled() {
      return this.isRTLEnabled;
    }
    loadSettings() {
      const e = this.storageManager.load();
      e ? (this.settings = { ...this.settings, ...e }, this.settings.dynamicCSS || (this.settings.dynamicCSS = O), this.settings.disabledSelectors || (this.settings.disabledSelectors = []), this.settings.autoDetect === void 0 && (this.settings.autoDetect = !0), this.detector.updateConfig({
        sensitivity: this.settings.sensitivity,
        minRTLChars: this.settings.minRTLChars
      }), this.settings.permanentCSS && this.settings.customCSS && this.injectPermanentCSS()) : this.settings.autoDetect = !0;
    }
    updateSettings(e) {
      this.settings = { ...this.settings, ...e }, this.storageManager.save(this.settings), this.detector.updateConfig({
        sensitivity: this.settings.sensitivity,
        minRTLChars: this.settings.minRTLChars
      }), this.injectCSS(), this.settings.permanentCSS && this.settings.customCSS ? this.injectPermanentCSS() : this.removePermanentCSS(), this.isRTLEnabled && this.injectDynamicCSS(), this.isRTLEnabled && (this.setupObserver(), this.startAutoProcessing(), this.debouncedProcessAll()), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: this.settings
        })
      );
    }
    // Import/Export Proxy Methods
    exportSettings() {
      return this.storageManager.export(this.settings);
    }
    importSettings(e) {
      try {
        const n = this.storageManager.import(e);
        return this.updateSettings(n), !0;
      } catch (n) {
        throw console.error("Import failed:", n), n;
      }
    }
    injectCSS() {
      this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.id = "blinko-dynamic-css", document.head.appendChild(this.styleElement)), this.styleElement.textContent = this.settings.dynamicCSS;
    }
    injectDynamicCSS() {
      this.dynamicStyleElement || (this.dynamicStyleElement = document.createElement("style"), this.dynamicStyleElement.id = "blinko-rtl-dynamic-css", document.head.appendChild(this.dynamicStyleElement));
      let e = this.settings.dynamicCSS || O;
      this.settings.debugMode && (e.includes(".rtl-debug-rtl") || (e += `
/* Visual Debugger - RTL Detected */
.rtl-debug-rtl {
    outline: 2px solid rgba(255, 0, 0, 0.5) !important;
    position: relative !important;
}
.rtl-debug-rtl::after {
    content: "RTL";
    position: absolute;
    top: -15px;
    right: 0;
    background: red;
    color: white;
    font-size: 10px;
    padding: 1px 3px;
    border-radius: 2px;
    z-index: 10000;
    pointer-events: none;
    white-space: nowrap;
}`), e.includes(".rtl-debug-ltr") || (e += `
/* Visual Debugger - LTR Detected */
.rtl-debug-ltr {
    outline: 2px solid rgba(0, 0, 255, 0.3) !important;
    position: relative !important;
}
.rtl-debug-ltr::after {
    content: "LTR";
    position: absolute;
    top: -15px;
    left: 0;
    background: blue;
    color: white;
    font-size: 10px;
    padding: 1px 3px;
    border-radius: 2px;
    z-index: 10000;
    pointer-events: none;
    white-space: nowrap;
}`)), this.dynamicStyleElement.textContent = e;
    }
    removeDynamicCSS() {
      this.dynamicStyleElement && (this.dynamicStyleElement.remove(), this.dynamicStyleElement = null);
    }
    injectPermanentCSS() {
      this.settings.customCSS && this.settings.permanentCSS && (this.permanentStyleElement || (this.permanentStyleElement = document.createElement("style"), this.permanentStyleElement.id = "blinko-rtl-permanent-styles", document.head.appendChild(this.permanentStyleElement)), this.permanentStyleElement.textContent = this.settings.customCSS);
    }
    removePermanentCSS() {
      this.permanentStyleElement && (this.permanentStyleElement.remove(), this.permanentStyleElement = null);
    }
    removeCSS() {
      this.styleElement && (this.styleElement.remove(), this.styleElement = null), this.settings.permanentCSS || this.removePermanentCSS(), this.removeDynamicCSS();
    }
    applyDirectRTL(e, n) {
      n === "rtl" ? (e.classList.add("blinko-detected-rtl"), e.style.direction = "rtl", e.style.textAlign = "right", e.style.unicodeBidi = "embed") : n === "ltr" ? (e.classList.remove("blinko-detected-rtl"), e.style.direction = "ltr", e.style.textAlign = "left", e.style.unicodeBidi = "embed") : (e.classList.remove("blinko-detected-rtl"), e.style.removeProperty("direction"), e.style.removeProperty("text-align"), e.style.removeProperty("unicode-bidi")), this.applyDebugVisuals(e, n);
    }
    applyAttributeRTL(e, n) {
      n === "rtl" ? (e.setAttribute("dir", "rtl"), e.setAttribute("lang", "he")) : n === "ltr" ? (e.setAttribute("dir", "ltr"), e.removeAttribute("lang")) : (e.removeAttribute("dir"), e.removeAttribute("lang")), this.applyDebugVisuals(e, n);
    }
    applyCSSClassRTL(e, n) {
      e.classList.remove("rtl-force", "ltr-force", "rtl-auto"), n === "rtl" ? e.classList.add("rtl-force") : n === "ltr" && e.classList.add("ltr-force"), this.applyDebugVisuals(e, n);
    }
    applyUnicodeBidiRTL(e) {
      e.classList.add("rtl-auto"), e.style.unicodeBidi = "plaintext";
    }
    detectHebrewRegex(e) {
      return this.hebrewRegex.test(e);
    }
    detectArabicRegex(e) {
      return this.arabicRegex.test(e);
    }
    processPendingElements() {
      if (!this.isRTLEnabled) {
        this.pendingElements.clear();
        return;
      }
      this.pendingElements.forEach((e) => {
        document.contains(e) && this.processElement(e);
      }), this.pendingElements.clear();
    }
    enable() {
      this.isRTLEnabled = !0, this.injectCSS(), this.injectDynamicCSS(), this.settings.permanentCSS && this.injectPermanentCSS(), this.pasteInterceptor.enable(), this.setupObserver(), this.startAutoProcessing(), this.processAllElements(), setTimeout(() => this.processAllElements(), 500);
    }
    disable() {
      this.isRTLEnabled = !1, this.removeCSS(), this.pasteInterceptor.disable(), this.stopAutoProcessing(), this.observer && (this.observer.disconnect(), this.observer = null), this.pendingElements.clear();
    }
    toggle() {
      this.isRTLEnabled ? this.disable() : this.enable();
    }
    toggleManual() {
      const e = !this.settings.manualToggle;
      return this.updateSettings({ manualToggle: e }), e;
    }
    toggleDebugMode() {
      const e = !this.settings.debugMode;
      return this.updateSettings({ debugMode: e }), e ? (document.body.classList.add("rtl-debug-mode"), this.injectDynamicCSS(), this.processAllElements()) : (document.body.classList.remove("rtl-debug-mode"), document.querySelectorAll(".rtl-debug-rtl, .rtl-debug-ltr").forEach((n) => {
        n.classList.remove("rtl-debug-rtl", "rtl-debug-ltr"), n.removeAttribute("data-rtl-debug");
      })), e;
    }
    applyDebugVisuals(e, n) {
      this.settings.debugMode ? (e.classList.remove("rtl-debug-rtl", "rtl-debug-ltr"), n === "rtl" ? (e.classList.add("rtl-debug-rtl"), e.setAttribute("data-rtl-debug", "RTL Detected")) : n === "ltr" ? (e.classList.add("rtl-debug-ltr"), e.setAttribute("data-rtl-debug", "LTR Detected")) : e.removeAttribute("data-rtl-debug")) : (e.classList.remove("rtl-debug-rtl", "rtl-debug-ltr"), e.removeAttribute("data-rtl-debug"));
    }
    setupObserver() {
      this.observer && this.observer.disconnect(), this.settings.autoDetect && (this.observer = new MutationObserver((e) => {
        if (!this.isRTLEnabled)
          return;
        let n = !1;
        const r = this.settings.targetSelectors.filter(
          (s) => !this.settings.disabledSelectors.includes(s)
        ), i = [];
        r.forEach((s) => {
          try {
            document.querySelector(s), i.push(s);
          } catch {
          }
        });
        const o = i.join(", ");
        e.forEach((s) => {
          if (s.type === "childList")
            s.addedNodes.forEach((c) => {
              if (c.nodeType === Node.ELEMENT_NODE) {
                const u = c;
                let l = !1;
                for (const h of i)
                  if (u.matches(h)) {
                    l = !0;
                    break;
                  }
                if (l && (this.pendingElements.add(u), n = !0), o)
                  try {
                    const h = u.querySelectorAll(o);
                    h.length > 0 && (h.forEach((d) => {
                      this.pendingElements.add(d);
                    }), n = !0);
                  } catch {
                  }
              }
            });
          else if (s.type === "characterData" || s.type === "attributes") {
            const c = s.target.nodeType === Node.ELEMENT_NODE ? s.target : s.target.parentElement;
            if (c) {
              let u = !1;
              for (const l of i)
                try {
                  if (c.matches(l)) {
                    u = !0;
                    break;
                  }
                } catch {
                }
              u && (this.pendingElements.add(c), n = !0);
            }
          }
        }), n && this.debouncedProcessQueue();
      }), this.observer.observe(document.body, {
        childList: !0,
        subtree: !0,
        characterData: !0,
        attributes: !0,
        attributeFilter: ["value", "placeholder", "contenteditable"]
      }));
    }
    startAutoProcessing() {
      this.autoProcessInterval && clearInterval(this.autoProcessInterval), this.settings.autoDetect && this.isRTLEnabled && (this.autoProcessInterval = setInterval(() => {
        this.isRTLEnabled && this.settings.autoDetect && this.processAllElements();
      }, this.settings.processInterval || 5e3));
    }
    stopAutoProcessing() {
      this.autoProcessInterval && (clearInterval(this.autoProcessInterval), this.autoProcessInterval = null);
    }
  }
  const Qt = "", Ft = {
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
  }, Nt = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, zt = {
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
  }, Ht = {
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
  System.register([], (t) => ({
    execute: () => {
      const e = new rt(), n = new It(e);
      let r = null;
      function i() {
        if (r)
          return;
        const u = n.getSettings();
        r = document.createElement("button"), r.className = "rtl-toggle-btn", r.innerHTML = "ع/א", r.title = "Toggle RTL Support (Hebrew/Arabic)", r.addEventListener("click", () => {
          n.toggle(), o();
        }), document.body.appendChild(r), u.darkMode && r.classList.add("dark-mode"), o();
      }
      function o() {
        r && (n.isEnabled() ? r.classList.add("active") : r.classList.remove("active"));
      }
      function s() {
        r && (r.remove(), r = null);
      }
      function c() {
        console.log("Initializing Advanced Blinko RTL Plugin..."), i(), localStorage.getItem("blinko-rtl-enabled") === "true" && (n.enable(), o()), window.addEventListener("rtl-settings-changed", (l) => {
          const h = l.detail;
          r && (h.darkMode ? r.classList.add("dark-mode") : r.classList.remove("dark-mode"));
        }), window.blinkoRTL = {
          detector: e,
          service: n,
          // Expose service
          toggle: () => {
            n.toggle(), o();
          },
          enable: () => {
            n.enable(), o();
          },
          disable: () => {
            n.disable(), o();
          },
          isEnabled: () => n.isEnabled(),
          settings: () => n.getSettings(),
          getSettings: () => n.getSettings(),
          // Alias for app.tsx compatibility
          processAll: n.processAllElements,
          processElement: n.processElement,
          toggleManual: () => n.toggleManual(),
          test: (l) => {
            const h = e.detectRTL(l), d = n.detectHebrewRegex(l), b = n.detectArabicRegex(l);
            return console.log(`Text "${l}" -> Original: ${h ? "RTL" : "LTR"}, Hebrew: ${d}, Arabic: ${b}`), h;
          },
          testHebrew: (l) => n.detectHebrewRegex(l),
          testArabic: (l) => n.detectArabicRegex(l),
          getStats: () => document.querySelectorAll('.rtl-force, .rtl-auto, [dir="rtl"]').length,
          setSensitivity: (l) => {
            let h = "medium";
            l < 0.12 ? h = "high" : l > 0.3 && (h = "low"), n.updateSettings({ threshold: l, sensitivity: h });
          },
          fixSelection: () => {
            const l = window.getSelection();
            if (!l || l.rangeCount === 0)
              return;
            let d = l.getRangeAt(0).commonAncestorContainer;
            if (d.nodeType === Node.TEXT_NODE && (d = d.parentNode), d instanceof HTMLElement) {
              n.processElement(d);
              const b = d.closest("p, div, li, td, th");
              b && n.processElement(b);
            }
          }
        }, console.log("Advanced Blinko RTL Plugin initialized successfully");
      }
      t("default", class {
        constructor() {
          y(this, "withSettingPanel", !0);
          y(this, "renderSettingPanel", () => {
            const l = document.createElement("div");
            return Xe(/* @__PURE__ */ a($t, {}), l), l;
          });
          Object.assign(this, it);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", c) : setTimeout(c, 100), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: `RTL Language Support (v${it.version}) (ع/א)`,
            content: () => {
              const l = document.createElement("div");
              return l.setAttribute("data-plugin", "rtl-support"), Xe(/* @__PURE__ */ a(At, { detector: e }), l), l;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL (ع/א)",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              n.toggle(), o();
              const l = window.Blinko.i18n;
              window.Blinko.toast.success(
                n.isEnabled() ? l.t("rtl_enabled") : l.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", Ft), window.Blinko.i18n.addResourceBundle("zh", "translation", Nt), window.Blinko.i18n.addResourceBundle("he", "translation", zt), window.Blinko.i18n.addResourceBundle("ar", "translation", Ht);
        }
        destroy() {
          n.disable(), s(), console.log("Advanced RTL Plugin destroyed");
        }
      });
    }
  }));
})();
