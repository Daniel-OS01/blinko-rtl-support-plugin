var Yt = Object.defineProperty;
var Jt = (D, m, N) => m in D ? Yt(D, m, { enumerable: !0, configurable: !0, writable: !0, value: N }) : D[m] = N;
var b = (D, m, N) => (Jt(D, typeof m != "symbol" ? m + "" : m, N), N);
(function() {
  var D, m, N, H, Se, we, Te, Re, ae, le, de, Y = {}, Le = [], ut = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, J = Array.isArray;
  function P(t, e) {
    for (var i in e)
      t[i] = e[i];
    return t;
  }
  function ce(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function pe(t, e, i) {
    var r, n, s, a = {};
    for (s in e)
      s == "key" ? r = e[s] : s == "ref" ? n = e[s] : a[s] = e[s];
    if (arguments.length > 2 && (a.children = arguments.length > 3 ? D.call(arguments, 2) : i), typeof t == "function" && t.defaultProps != null)
      for (s in t.defaultProps)
        a[s] === void 0 && (a[s] = t.defaultProps[s]);
    return Q(t, a, r, n, null);
  }
  function Q(t, e, i, r, n) {
    var s = { type: t, props: e, key: i, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: n ?? ++N, __i: -1, __u: 0 };
    return n == null && m.vnode != null && m.vnode(s), s;
  }
  function O(t) {
    return t.children;
  }
  function $(t, e) {
    this.props = t, this.context = e;
  }
  function j(t, e) {
    if (e == null)
      return t.__ ? j(t.__, t.__i + 1) : null;
    for (var i; e < t.__k.length; e++)
      if ((i = t.__k[e]) != null && i.__e != null)
        return i.__e;
    return typeof t.type == "function" ? j(t) : null;
  }
  function Ce(t) {
    var e, i;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((i = t.__k[e]) != null && i.__e != null) {
          t.__e = t.__c.base = i.__e;
          break;
        }
      return Ce(t);
    }
  }
  function Ee(t) {
    (!t.__d && (t.__d = !0) && H.push(t) && !ee.__r++ || Se != m.debounceRendering) && ((Se = m.debounceRendering) || we)(ee);
  }
  function ee() {
    for (var t, e, i, r, n, s, a, c = 1; H.length; )
      H.length > c && H.sort(Te), t = H.shift(), c = H.length, t.__d && (i = void 0, n = (r = (e = t).__v).__e, s = [], a = [], e.__P && ((i = P({}, r)).__v = r.__v + 1, m.vnode && m.vnode(i), ue(e.__P, i, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [n] : null, s, n ?? j(r), !!(32 & r.__u), a), i.__v = r.__v, i.__.__k[i.__i] = i, Be(s, i, a), i.__e != n && Ce(i)));
    ee.__r = 0;
  }
  function Me(t, e, i, r, n, s, a, c, u, l, g) {
    var d, _, f, v, S, y, w, T = r && r.__k || Le, x = e.length;
    for (u = gt(i, e, T, u, x), d = 0; d < x; d++)
      (f = i.__k[d]) != null && (_ = f.__i == -1 ? Y : T[f.__i] || Y, f.__i = d, y = ue(t, f, _, n, s, a, c, u, l, g), v = f.__e, f.ref && _.ref != f.ref && (_.ref && he(_.ref, null, f), g.push(f.ref, f.__c || v, f)), S == null && v != null && (S = v), (w = !!(4 & f.__u)) || _.__k === f.__k ? u = Ae(f, u, t, w) : typeof f.type == "function" && y !== void 0 ? u = y : v && (u = v.nextSibling), f.__u &= -7);
    return i.__e = S, u;
  }
  function gt(t, e, i, r, n) {
    var s, a, c, u, l, g = i.length, d = g, _ = 0;
    for (t.__k = new Array(n), s = 0; s < n; s++)
      (a = e[s]) != null && typeof a != "boolean" && typeof a != "function" ? (u = s + _, (a = t.__k[s] = typeof a == "string" || typeof a == "number" || typeof a == "bigint" || a.constructor == String ? Q(null, a, null, null, null) : J(a) ? Q(O, { children: a }, null, null, null) : a.constructor == null && a.__b > 0 ? Q(a.type, a.props, a.key, a.ref ? a.ref : null, a.__v) : a).__ = t, a.__b = t.__b + 1, c = null, (l = a.__i = ht(a, i, u, d)) != -1 && (d--, (c = i[l]) && (c.__u |= 2)), c == null || c.__v == null ? (l == -1 && (n > g ? _-- : n < g && _++), typeof a.type != "function" && (a.__u |= 4)) : l != u && (l == u - 1 ? _-- : l == u + 1 ? _++ : (l > u ? _-- : _++, a.__u |= 4))) : t.__k[s] = null;
    if (d)
      for (s = 0; s < g; s++)
        (c = i[s]) != null && !(2 & c.__u) && (c.__e == r && (r = j(c)), $e(c, c));
    return r;
  }
  function Ae(t, e, i, r) {
    var n, s;
    if (typeof t.type == "function") {
      for (n = t.__k, s = 0; n && s < n.length; s++)
        n[s] && (n[s].__ = t, e = Ae(n[s], e, i, r));
      return e;
    }
    t.__e != e && (r && (e && t.type && !e.parentNode && (e = j(t)), i.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function te(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (J(t) ? t.some(function(i) {
      te(i, e);
    }) : e.push(t)), e;
  }
  function ht(t, e, i, r) {
    var n, s, a, c = t.key, u = t.type, l = e[i], g = l != null && (2 & l.__u) == 0;
    if (l === null && t.key == null || g && c == l.key && u == l.type)
      return i;
    if (r > (g ? 1 : 0)) {
      for (n = i - 1, s = i + 1; n >= 0 || s < e.length; )
        if ((l = e[a = n >= 0 ? n-- : s++]) != null && !(2 & l.__u) && c == l.key && u == l.type)
          return a;
    }
    return -1;
  }
  function Ie(t, e, i) {
    e[0] == "-" ? t.setProperty(e, i ?? "") : t[e] = i == null ? "" : typeof i != "number" || ut.test(e) ? i : i + "px";
  }
  function ie(t, e, i, r, n) {
    var s, a;
    e:
      if (e == "style")
        if (typeof i == "string")
          t.style.cssText = i;
        else {
          if (typeof r == "string" && (t.style.cssText = r = ""), r)
            for (e in r)
              i && e in i || Ie(t.style, e, "");
          if (i)
            for (e in i)
              r && i[e] == r[e] || Ie(t.style, e, i[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        s = e != (e = e.replace(Re, "$1")), a = e.toLowerCase(), e = a in t || e == "onFocusOut" || e == "onFocusIn" ? a.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = i, i ? r ? i.u = r.u : (i.u = ae, t.addEventListener(e, s ? de : le, s)) : t.removeEventListener(e, s ? de : le, s);
      else {
        if (n == "http://www.w3.org/2000/svg")
          e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t)
          try {
            t[e] = i ?? "";
            break e;
          } catch {
          }
        typeof i == "function" || (i == null || i === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && i == 1 ? "" : i));
      }
  }
  function De(t) {
    return function(e) {
      if (this.l) {
        var i = this.l[e.type + t];
        if (e.t == null)
          e.t = ae++;
        else if (e.t < i.u)
          return;
        return i(m.event ? m.event(e) : e);
      }
    };
  }
  function ue(t, e, i, r, n, s, a, c, u, l) {
    var g, d, _, f, v, S, y, w, T, x, B, q, U, se, G, W, X, I = e.type;
    if (e.constructor != null)
      return null;
    128 & i.__u && (u = !!(32 & i.__u), s = [c = e.__e = i.__e]), (g = m.__b) && g(e);
    e:
      if (typeof I == "function")
        try {
          if (w = e.props, T = "prototype" in I && I.prototype.render, x = (g = I.contextType) && r[g.__c], B = g ? x ? x.props.value : g.__ : r, i.__c ? y = (d = e.__c = i.__c).__ = d.__E : (T ? e.__c = d = new I(w, B) : (e.__c = d = new $(w, B), d.constructor = I, d.render = ft), x && x.sub(d), d.props = w, d.state || (d.state = {}), d.context = B, d.__n = r, _ = d.__d = !0, d.__h = [], d._sb = []), T && d.__s == null && (d.__s = d.state), T && I.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = P({}, d.__s)), P(d.__s, I.getDerivedStateFromProps(w, d.__s))), f = d.props, v = d.state, d.__v = e, _)
            T && I.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), T && d.componentDidMount != null && d.__h.push(d.componentDidMount);
          else {
            if (T && I.getDerivedStateFromProps == null && w !== f && d.componentWillReceiveProps != null && d.componentWillReceiveProps(w, B), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(w, d.__s, B) === !1 || e.__v == i.__v) {
              for (e.__v != i.__v && (d.props = w, d.state = d.__s, d.__d = !1), e.__e = i.__e, e.__k = i.__k, e.__k.some(function(z) {
                z && (z.__ = e);
              }), q = 0; q < d._sb.length; q++)
                d.__h.push(d._sb[q]);
              d._sb = [], d.__h.length && a.push(d);
              break e;
            }
            d.componentWillUpdate != null && d.componentWillUpdate(w, d.__s, B), T && d.componentDidUpdate != null && d.__h.push(function() {
              d.componentDidUpdate(f, v, S);
            });
          }
          if (d.context = B, d.props = w, d.__P = t, d.__e = !1, U = m.__r, se = 0, T) {
            for (d.state = d.__s, d.__d = !1, U && U(e), g = d.render(d.props, d.state, d.context), G = 0; G < d._sb.length; G++)
              d.__h.push(d._sb[G]);
            d._sb = [];
          } else
            do
              d.__d = !1, U && U(e), g = d.render(d.props, d.state, d.context), d.state = d.__s;
            while (d.__d && ++se < 25);
          d.state = d.__s, d.getChildContext != null && (r = P(P({}, r), d.getChildContext())), T && !_ && d.getSnapshotBeforeUpdate != null && (S = d.getSnapshotBeforeUpdate(f, v)), W = g, g != null && g.type === O && g.key == null && (W = Pe(g.props.children)), c = Me(t, J(W) ? W : [W], e, i, r, n, s, a, c, u, l), d.base = e.__e, e.__u &= -161, d.__h.length && a.push(d), y && (d.__E = d.__ = null);
        } catch (z) {
          if (e.__v = null, u || s != null)
            if (z.then) {
              for (e.__u |= u ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                c = c.nextSibling;
              s[s.indexOf(c)] = null, e.__e = c;
            } else {
              for (X = s.length; X--; )
                ce(s[X]);
              ge(e);
            }
          else
            e.__e = i.__e, e.__k = i.__k, z.then || ge(e);
          m.__e(z, e, i);
        }
      else
        s == null && e.__v == i.__v ? (e.__k = i.__k, e.__e = i.__e) : c = e.__e = mt(i.__e, e, i, r, n, s, a, u, l);
    return (g = m.diffed) && g(e), 128 & e.__u ? void 0 : c;
  }
  function ge(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(ge);
  }
  function Be(t, e, i) {
    for (var r = 0; r < i.length; r++)
      he(i[r], i[++r], i[++r]);
    m.__c && m.__c(e, t), t.some(function(n) {
      try {
        t = n.__h, n.__h = [], t.some(function(s) {
          s.call(n);
        });
      } catch (s) {
        m.__e(s, n.__v);
      }
    });
  }
  function Pe(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : J(t) ? t.map(Pe) : P({}, t);
  }
  function mt(t, e, i, r, n, s, a, c, u) {
    var l, g, d, _, f, v, S, y = i.props, w = e.props, T = e.type;
    if (T == "svg" ? n = "http://www.w3.org/2000/svg" : T == "math" ? n = "http://www.w3.org/1998/Math/MathML" : n || (n = "http://www.w3.org/1999/xhtml"), s != null) {
      for (l = 0; l < s.length; l++)
        if ((f = s[l]) && "setAttribute" in f == !!T && (T ? f.localName == T : f.nodeType == 3)) {
          t = f, s[l] = null;
          break;
        }
    }
    if (t == null) {
      if (T == null)
        return document.createTextNode(w);
      t = document.createElementNS(n, T, w.is && w), c && (m.__m && m.__m(e, s), c = !1), s = null;
    }
    if (T == null)
      y === w || c && t.data == w || (t.data = w);
    else {
      if (s = s && D.call(t.childNodes), y = i.props || Y, !c && s != null)
        for (y = {}, l = 0; l < t.attributes.length; l++)
          y[(f = t.attributes[l]).name] = f.value;
      for (l in y)
        if (f = y[l], l != "children") {
          if (l == "dangerouslySetInnerHTML")
            d = f;
          else if (!(l in w)) {
            if (l == "value" && "defaultValue" in w || l == "checked" && "defaultChecked" in w)
              continue;
            ie(t, l, null, f, n);
          }
        }
      for (l in w)
        f = w[l], l == "children" ? _ = f : l == "dangerouslySetInnerHTML" ? g = f : l == "value" ? v = f : l == "checked" ? S = f : c && typeof f != "function" || y[l] === f || ie(t, l, f, y[l], n);
      if (g)
        c || d && (g.__html == d.__html || g.__html == t.innerHTML) || (t.innerHTML = g.__html), e.__k = [];
      else if (d && (t.innerHTML = ""), Me(e.type == "template" ? t.content : t, J(_) ? _ : [_], e, i, r, T == "foreignObject" ? "http://www.w3.org/1999/xhtml" : n, s, a, s ? s[0] : i.__k && j(i, 0), c, u), s != null)
        for (l = s.length; l--; )
          ce(s[l]);
      c || (l = "value", T == "progress" && v == null ? t.removeAttribute("value") : v != null && (v !== t[l] || T == "progress" && !v || T == "option" && v != y[l]) && ie(t, l, v, y[l], n), l = "checked", S != null && S != t[l] && ie(t, l, S, y[l], n));
    }
    return t;
  }
  function he(t, e, i) {
    try {
      if (typeof t == "function") {
        var r = typeof t.__u == "function";
        r && t.__u(), r && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (n) {
      m.__e(n, i);
    }
  }
  function $e(t, e, i) {
    var r, n;
    if (m.unmount && m.unmount(t), (r = t.ref) && (r.current && r.current != t.__e || he(r, null, e)), (r = t.__c) != null) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount();
        } catch (s) {
          m.__e(s, e);
        }
      r.base = r.__P = null;
    }
    if (r = t.__k)
      for (n = 0; n < r.length; n++)
        r[n] && $e(r[n], e, i || typeof t.type != "function");
    i || ce(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function ft(t, e, i) {
    return this.constructor(t, i);
  }
  function bt(t, e, i) {
    var r, n, s, a;
    e == document && (e = document.documentElement), m.__ && m.__(t, e), n = (r = typeof i == "function") ? null : i && i.__k || e.__k, s = [], a = [], ue(e, t = (!r && i || e).__k = pe(O, null, [t]), n || Y, Y, e.namespaceURI, !r && i ? [i] : n ? null : e.firstChild ? D.call(e.childNodes) : null, s, !r && i ? i : n ? n.__e : e.firstChild, r, a), Be(s, t, a);
  }
  D = Le.slice, m = { __e: function(t, e, i, r) {
    for (var n, s, a; e = e.__; )
      if ((n = e.__c) && !n.__)
        try {
          if ((s = n.constructor) && s.getDerivedStateFromError != null && (n.setState(s.getDerivedStateFromError(t)), a = n.__d), n.componentDidCatch != null && (n.componentDidCatch(t, r || {}), a = n.__d), a)
            return n.__E = n;
        } catch (c) {
          t = c;
        }
    throw t;
  } }, N = 0, $.prototype.setState = function(t, e) {
    var i;
    i = this.__s != null && this.__s != this.state ? this.__s : this.__s = P({}, this.state), typeof t == "function" && (t = t(P({}, i), this.props)), t && P(i, t), t != null && this.__v && (e && this._sb.push(e), Ee(this));
  }, $.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), Ee(this));
  }, $.prototype.render = O, H = [], we = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Te = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, ee.__r = 0, Re = /(PointerCapture)$|Capture$/i, ae = 0, le = De(!1), de = De(!0);
  var _t = 0;
  function o(t, e, i, r, n, s) {
    e || (e = {});
    var a, c, u = e;
    if ("ref" in u)
      for (c in u = {}, e)
        c == "ref" ? a = e[c] : u[c] = e[c];
    var l = { type: t, props: u, key: i, ref: a, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --_t, __i: -1, __u: 0, __source: n, __self: s };
    if (typeof t == "function" && (a = t.defaultProps))
      for (c in a)
        u[c] === void 0 && (u[c] = a[c]);
    return m.vnode && m.vnode(l), l;
  }
  var re, L, me, Fe, fe = 0, Ne = [], C = m, ze = C.__b, He = C.__r, Oe = C.diffed, Ue = C.__c, We = C.unmount, je = C.__;
  function Ve(t, e) {
    C.__h && C.__h(L, t, fe || e), fe = 0;
    var i = L.__H || (L.__H = { __: [], __h: [] });
    return t >= i.__.length && i.__.push({}), i.__[t];
  }
  function M(t) {
    return fe = 1, yt(Ge, t);
  }
  function yt(t, e, i) {
    var r = Ve(re++, 2);
    if (r.t = t, !r.__c && (r.__ = [i ? i(e) : Ge(void 0, e), function(c) {
      var u = r.__N ? r.__N[0] : r.__[0], l = r.t(u, c);
      u !== l && (r.__N = [l, r.__[1]], r.__c.setState({}));
    }], r.__c = L, !L.__f)) {
      var n = function(c, u, l) {
        if (!r.__c.__H)
          return !0;
        var g = r.__c.__H.__.filter(function(_) {
          return !!_.__c;
        });
        if (g.every(function(_) {
          return !_.__N;
        }))
          return !s || s.call(this, c, u, l);
        var d = r.__c.props !== c;
        return g.forEach(function(_) {
          if (_.__N) {
            var f = _.__[0];
            _.__ = _.__N, _.__N = void 0, f !== _.__[0] && (d = !0);
          }
        }), s && s.call(this, c, u, l) || d;
      };
      L.__f = !0;
      var s = L.shouldComponentUpdate, a = L.componentWillUpdate;
      L.componentWillUpdate = function(c, u, l) {
        if (this.__e) {
          var g = s;
          s = void 0, n(c, u, l), s = g;
        }
        a && a.call(this, c, u, l);
      }, L.shouldComponentUpdate = n;
    }
    return r.__N || r.__;
  }
  function be(t, e) {
    var i = Ve(re++, 3);
    !C.__s && kt(i.__H, e) && (i.__ = t, i.u = e, L.__H.__h.push(i));
  }
  function vt() {
    for (var t; t = Ne.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(ne), t.__H.__h.forEach(_e), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], C.__e(e, t.__v);
        }
  }
  C.__b = function(t) {
    L = null, ze && ze(t);
  }, C.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), je && je(t, e);
  }, C.__r = function(t) {
    He && He(t), re = 0;
    var e = (L = t.__c).__H;
    e && (me === L ? (e.__h = [], L.__h = [], e.__.forEach(function(i) {
      i.__N && (i.__ = i.__N), i.u = i.__N = void 0;
    })) : (e.__h.forEach(ne), e.__h.forEach(_e), e.__h = [], re = 0)), me = L;
  }, C.diffed = function(t) {
    Oe && Oe(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (Ne.push(e) !== 1 && Fe === C.requestAnimationFrame || ((Fe = C.requestAnimationFrame) || xt)(vt)), e.__H.__.forEach(function(i) {
      i.u && (i.__H = i.u), i.u = void 0;
    })), me = L = null;
  }, C.__c = function(t, e) {
    e.some(function(i) {
      try {
        i.__h.forEach(ne), i.__h = i.__h.filter(function(r) {
          return !r.__ || _e(r);
        });
      } catch (r) {
        e.some(function(n) {
          n.__h && (n.__h = []);
        }), e = [], C.__e(r, i.__v);
      }
    }), Ue && Ue(t, e);
  }, C.unmount = function(t) {
    We && We(t);
    var e, i = t.__c;
    i && i.__H && (i.__H.__.forEach(function(r) {
      try {
        ne(r);
      } catch (n) {
        e = n;
      }
    }), i.__H = void 0, e && C.__e(e, i.__v));
  };
  var qe = typeof requestAnimationFrame == "function";
  function xt(t) {
    var e, i = function() {
      clearTimeout(r), qe && cancelAnimationFrame(e), setTimeout(t);
    }, r = setTimeout(i, 35);
    qe && (e = requestAnimationFrame(i));
  }
  function ne(t) {
    var e = L, i = t.__c;
    typeof i == "function" && (t.__c = void 0, i()), L = e;
  }
  function _e(t) {
    var e = L;
    t.__c = t.__(), L = e;
  }
  function kt(t, e) {
    return !t || t.length !== e.length || e.some(function(i, r) {
      return i !== t[r];
    });
  }
  function Ge(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function St(t, e) {
    for (var i in e)
      t[i] = e[i];
    return t;
  }
  function Ye(t, e) {
    for (var i in t)
      if (i !== "__source" && !(i in e))
        return !0;
    for (var r in e)
      if (r !== "__source" && t[r] !== e[r])
        return !0;
    return !1;
  }
  function Je(t, e) {
    this.props = t, this.context = e;
  }
  (Je.prototype = new $()).isPureReactComponent = !0, Je.prototype.shouldComponentUpdate = function(t, e) {
    return Ye(this.props, t) || Ye(this.state, e);
  };
  var Ke = m.__b;
  m.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Ke && Ke(t);
  };
  var wt = m.__e;
  m.__e = function(t, e, i, r) {
    if (t.then) {
      for (var n, s = e; s = s.__; )
        if ((n = s.__c) && n.__c)
          return e.__e == null && (e.__e = i.__e, e.__k = i.__k), n.__c(t, e);
    }
    wt(t, e, i, r);
  };
  var Xe = m.unmount;
  function Ze(t, e, i) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
      typeof r.__c == "function" && r.__c();
    }), t.__c.__H = null), (t = St({}, t)).__c != null && (t.__c.__P === i && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
      return Ze(r, e, i);
    })), t;
  }
  function Qe(t, e, i) {
    return t && i && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
      return Qe(r, e, i);
    }), t.__c && t.__c.__P === e && (t.__e && i.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = i)), t;
  }
  function ye() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function et(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function oe() {
    this.i = null, this.l = null;
  }
  m.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), Xe && Xe(t);
  }, (ye.prototype = new $()).__c = function(t, e) {
    var i = e.__c, r = this;
    r.o == null && (r.o = []), r.o.push(i);
    var n = et(r.__v), s = !1, a = function() {
      s || (s = !0, i.__R = null, n ? n(c) : c());
    };
    i.__R = a;
    var c = function() {
      if (!--r.__u) {
        if (r.state.__a) {
          var u = r.state.__a;
          r.__v.__k[0] = Qe(u, u.__c.__P, u.__c.__O);
        }
        var l;
        for (r.setState({ __a: r.__b = null }); l = r.o.pop(); )
          l.forceUpdate();
      }
    };
    r.__u++ || 32 & e.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), t.then(a, a);
  }, ye.prototype.componentWillUnmount = function() {
    this.o = [];
  }, ye.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var i = document.createElement("div"), r = this.__v.__k[0].__c;
        this.__v.__k[0] = Ze(this.__b, i, r.__O = r.__P);
      }
      this.__b = null;
    }
    var n = e.__a && pe(O, null, t.fallback);
    return n && (n.__u &= -33), [pe(O, null, e.__a ? null : t.children), n];
  };
  var tt = function(t, e, i) {
    if (++i[1] === i[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size))
      for (i = t.i; i; ) {
        for (; i.length > 3; )
          i.pop()();
        if (i[1] < i[0])
          break;
        t.i = i = i[2];
      }
  };
  (oe.prototype = new $()).__a = function(t) {
    var e = this, i = et(e.__v), r = e.l.get(t);
    return r[0]++, function(n) {
      var s = function() {
        e.props.revealOrder ? (r.push(n), tt(e, t, r)) : n();
      };
      i ? i(s) : s();
    };
  }, oe.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = te(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var i = e.length; i--; )
      this.l.set(e[i], this.i = [1, 0, this.i]);
    return t.children;
  }, oe.prototype.componentDidUpdate = oe.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, i) {
      tt(t, i, e);
    });
  };
  var Tt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Rt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Lt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Ct = /[A-Z0-9]/g, Et = typeof document < "u", Mt = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function it(t, e, i) {
    return e.__k == null && (e.textContent = ""), bt(t, e), typeof i == "function" && i(), t ? t.__c : null;
  }
  $.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty($.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var rt = m.event;
  function At() {
  }
  function It() {
    return this.cancelBubble;
  }
  function Dt() {
    return this.defaultPrevented;
  }
  m.event = function(t) {
    return rt && (t = rt(t)), t.persist = At, t.isPropagationStopped = It, t.isDefaultPrevented = Dt, t.nativeEvent = t;
  };
  var Bt = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, nt = m.vnode;
  m.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var i = e.props, r = e.type, n = {}, s = r.indexOf("-") === -1;
      for (var a in i) {
        var c = i[a];
        if (!(a === "value" && "defaultValue" in i && c == null || Et && a === "children" && r === "noscript" || a === "class" || a === "className")) {
          var u = a.toLowerCase();
          a === "defaultValue" && "value" in i && i.value == null ? a = "value" : a === "download" && c === !0 ? c = "" : u === "translate" && c === "no" ? c = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? a = "ondblclick" : u !== "onchange" || r !== "input" && r !== "textarea" || Mt(i.type) ? u === "onfocus" ? a = "onfocusin" : u === "onblur" ? a = "onfocusout" : Lt.test(a) && (a = u) : u = a = "oninput" : s && Rt.test(a) ? a = a.replace(Ct, "-$&").toLowerCase() : c === null && (c = void 0), u === "oninput" && n[a = u] && (a = "oninputCapture"), n[a] = c;
        }
      }
      r == "select" && n.multiple && Array.isArray(n.value) && (n.value = te(i.children).forEach(function(l) {
        l.props.selected = n.value.indexOf(l.props.value) != -1;
      })), r == "select" && n.defaultValue != null && (n.value = te(i.children).forEach(function(l) {
        l.props.selected = n.multiple ? n.defaultValue.indexOf(l.props.value) != -1 : n.defaultValue == l.props.value;
      })), i.class && !i.className ? (n.class = i.class, Object.defineProperty(n, "className", Bt)) : (i.className && !i.class || i.class && i.className) && (n.class = n.className = i.className), e.props = n;
    }(t), t.$$typeof = Tt, nt && nt(t);
  };
  var ot = m.__r;
  m.__r = function(t) {
    ot && ot(t), t.__c;
  };
  var st = m.diffed;
  m.diffed = function(t) {
    st && st(t);
    var e = t.props, i = t.__e;
    i != null && t.type === "textarea" && "value" in e && e.value !== i.value && (i.value = e.value == null ? "" : e.value);
  };
  function Pt({ detector: t }) {
    const [e, i] = M({ activeBlocks: 0 }), [r, n] = M(15), [s, a] = M(!1), [c, u] = M(!1), l = window.Blinko.i18n;
    be(() => {
      const v = () => {
        var w;
        const y = ((w = window.blinkoRTL) == null ? void 0 : w.getStats()) || 0;
        i({ activeBlocks: y });
      };
      v();
      const S = setInterval(v, 1e3);
      return () => clearInterval(S);
    }, []), be(() => {
      const v = () => {
        const S = window.blinkoRTL;
        if (S) {
          let y;
          if (typeof S.getSettings == "function" ? y = S.getSettings() : typeof S.settings == "function" && (y = S.settings()), y && y.threshold !== void 0 && n(Math.round(y.threshold * 100)), y && y.debugMode !== void 0 && u(y.debugMode), y)
            return !0;
        }
        return !1;
      };
      if (!v()) {
        const S = setInterval(() => {
          v() && clearInterval(S);
        }, 100);
        setTimeout(() => clearInterval(S), 2e3);
      }
    }, []);
    const g = () => {
      var v;
      a(!0), (v = window.blinkoRTL) == null || v.fixSelection(), setTimeout(() => {
        a(!1), window.Blinko.toast.success("Selection processed");
      }, 500);
    }, d = (v) => {
      var y;
      const S = parseInt(v.target.value);
      n(S), (y = window.blinkoRTL) == null || y.setSensitivity(S / 100);
    }, _ = (v) => {
      const S = v.target.checked;
      u(S);
      const y = window.blinkoRTL;
      y && y.service && typeof y.service.toggleDebugMode == "function" && y.service.toggleDebugMode();
    };
    return /* @__PURE__ */ o("div", { style: {
      padding: "15px",
      fontFamily: "system-ui, sans-serif",
      width: "300px",
      background: "var(--bg-color, white)",
      color: "var(--text-color, black)"
    }, children: [
      /* @__PURE__ */ o("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px"
      }, children: [
        /* @__PURE__ */ o("h3", { style: { margin: 0, fontSize: "16px" }, children: "RTL Control Center" }),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: () => {
              var S, y;
              (S = window.blinkoRTL) == null || S.toggle();
              const v = (y = window.blinkoRTL) == null ? void 0 : y.isEnabled();
              window.Blinko.toast.success(
                v ? l.t("rtl_enabled") : l.t("rtl_disabled")
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
      /* @__PURE__ */ o("div", { style: {
        background: "#f8f9fa",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "15px",
        textAlign: "center",
        borderLeft: "4px solid #007bff"
      }, children: [
        /* @__PURE__ */ o("div", { style: { fontSize: "24px", fontWeight: "bold", color: "#007bff" }, children: e.activeBlocks }),
        /* @__PURE__ */ o("div", { style: { fontSize: "12px", color: "#666" }, children: "Active RTL Blocks" })
      ] }),
      /* @__PURE__ */ o("div", { style: { marginBottom: "20px" }, children: /* @__PURE__ */ o(
        "button",
        {
          onClick: g,
          disabled: s,
          style: {
            width: "100%",
            background: s ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
            cursor: s ? "wait" : "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.2s"
          },
          children: s ? "Processing..." : /* @__PURE__ */ o(O, { children: [
            /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ o("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) }),
            "Fix Selected Text"
          ] })
        }
      ) }),
      /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: [
        /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px" }, children: [
          /* @__PURE__ */ o(
            "input",
            {
              type: "checkbox",
              checked: c,
              onChange: _,
              style: { marginInlineEnd: "8px" }
            }
          ),
          "Enable Visual Debugger"
        ] }),
        /* @__PURE__ */ o("div", { style: { fontSize: "10px", color: "#888", marginInlineStart: "20px", marginTop: "2px" }, children: "Highlights RTL (Red) and LTR (Blue) blocks" })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }, children: [
          /* @__PURE__ */ o("strong", { children: "Detection Sensitivity" }),
          /* @__PURE__ */ o("span", { style: { color: "#007bff" }, children: [
            r,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ o(
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
        /* @__PURE__ */ o("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#999", marginTop: "4px" }, children: [
          /* @__PURE__ */ o("span", { children: "More Sensitive (1%)" }),
          /* @__PURE__ */ o("span", { children: "Less Sensitive (50%)" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { style: { marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #eee", fontSize: "11px", color: "#888", textAlign: "center" }, children: "Click 'Fix Selected' to force detection on specific text." }),
      /* @__PURE__ */ o("div", { style: { marginTop: "5px", fontSize: "10px", color: "#aaa", textAlign: "center" }, children: [
        "v",
        "2.0.9"
      ] })
    ] });
  }
  const $t = `
/* Method 1: Direct RTL styling */
.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}

/* Method 2: Hebrew/Arabic detection */
*[lang="he"], *[lang="ar"], *[dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
}

/* Method 3: Unicode bidi for auto-detection */
.rtl-auto {
    unicode-bidi: plaintext !important;
}

/* Method 4: Comprehensive element targeting */
.markdown-body p, .markdown-body div, .markdown-body span,
.vditor-reset p, .vditor-reset div, .vditor-reset span,
.card-masonry-grid p, .card-masonry-grid div,
textarea, [contenteditable], input[type="text"] {
    unicode-bidi: plaintext !important;
}

/* RTL Toggle Button */
.rtl-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
}

.rtl-toggle-btn:hover {
    background: #0056b3;
    transform: scale(1.1);
}

.rtl-toggle-btn.active {
    background: #28a745;
}

.rtl-toggle-btn.dark-mode {
    background: #1a1a1a;
    color: #fff;
}

.rtl-toggle-btn.dark-mode:hover {
    background: #333;
}

.rtl-toggle-btn.dark-mode.active {
    background: #0d7377;
}

/* Dark mode for settings */
.rtl-settings-dark {
    background: #1a1a1a !important;
    color: #eee !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark input, .rtl-settings-dark select, .rtl-settings-dark textarea {
    background: #333 !important;
    color: #ddd !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark button {
    background: #333 !important;
    color: #ddd !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark h2, .rtl-settings-dark h3, .rtl-settings-dark h4,
.rtl-settings-dark p, .rtl-settings-dark span, .rtl-settings-dark label {
    color: #eee !important;
}

.rtl-settings-dark code {
    background: #2a2a2a !important;
    color: #98c379 !important;
}

.rtl-settings-dark small {
    color: #aaa !important;
}

/* Layout preservation */
#page-wrap, #page-wrap > div, #page-wrap > header,
.flex, .grid, header, nav, .sidebar, .toolbar {
    direction: ltr !important;
    unicode-bidi: isolate !important;
}
`, V = `/* Dynamic CSS Rules for RTL Elements */
.blinko-detected-rtl {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
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
    content: attr(data-rtl-debug) " " attr(data-debug-name);
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
    content: attr(data-rtl-debug) " " attr(data-debug-name);
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
    unicode-bidi: isolate !important;
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
    unicode-bidi: isolate !important;
}

/* Task list layout: prevent items collapsing into a horizontal row when RTL is applied */
ul.vditor-task.rtl-force,
ul.vditor-task[dir="rtl"],
[dir="rtl"] ul.vditor-task,
.rtl-force ul.vditor-task {
    display: block !important;
    flex-direction: unset !important;
}

ul.vditor-task.rtl-force > li,
ul.vditor-task[dir="rtl"] > li,
[dir="rtl"] ul.vditor-task > li {
    display: list-item !important;
    width: 100% !important;
}

/* Raw Markdown editor (SV mode) — per-line bidi detection, no forced direction flip */
.vditor-sv,
.vditor-sv textarea {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}
`, ve = [
    // Content containers
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
    // Editor elements (Live Preview / WYSIWYG)
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
    ".vditor-reset ol",
    ".vditor-reset ul",
    ".vditor-reset blockquote",
    // Split View Preview elements
    ".vditor-preview p",
    ".vditor-preview div",
    ".vditor-preview li",
    ".vditor-preview ol",
    ".vditor-preview ul",
    ".vditor-preview span",
    ".vditor-preview h1",
    ".vditor-preview h2",
    ".vditor-preview h3",
    ".vditor-preview h4",
    ".vditor-preview h5",
    ".vditor-preview h6",
    ".vditor-preview blockquote",
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
    ".card-masonry-grid .markdown-body",
    ".blog-masonry-grid .markdown-body",
    "figcaption",
    // Lists
    "li",
    "ul",
    "ol",
    // Tables
    "td",
    "th",
    "caption"
  ], xe = {
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
    dynamicCSS: V,
    permanentCSS: !1,
    targetSelectors: ve,
    disabledSelectors: [".vditor-sv", ".vditor-sv textarea"],
    minRTLChars: 2,
    processInterval: 5e3,
    threshold: 0.15,
    enableManualToggleBtn: !0,
    hebrewRegex: !0,
    arabicRegex: !0,
    mixedContent: !0,
    savedPresets: [],
    debugMode: !1,
    enablePasteInterceptor: !0,
    mobileView: !1,
    overrideDirectives: !0,
    showManualToggle: !0,
    enableActionLog: !0,
    debugShowElementNames: !1,
    visualStyles: {
      fontFamily: "inherit",
      lineHeight: 1.5,
      paragraphMargin: 10
    }
  };
  class Ft {
    constructor(e = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      b(this, "name", "CharacterCode");
      b(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      b(this, "RTL_RANGES", [
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
      const i = e.charCodeAt(0);
      return this.RTL_RANGES.some(([r, n]) => i >= r && i <= n);
    }
    /**
     * Detect RTL content in text
     */
    detect(e) {
      if (!e || e.length === 0)
        return !1;
      const i = e.substring(0, this.config.sampleSize);
      let r = 0, n = 0;
      for (const c of i)
        /\s|[.,!?;:()[\]{}]/.test(c) || (n++, this.isRTLChar(c) && r++);
      return r < this.config.minRTLChars ? !1 : (n > 0 ? r / n : 0) >= {
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
  class Nt {
    constructor(e = !0, i = !0, r = 0.3, n = 3) {
      b(this, "name", "Regex");
      // Hebrew regex range: 0590-05FF, FB1D-FB4F (Presentation forms A), FB50-FBB1 (Presentation forms B - wait, that's Arabic)
      // Hebrew: \u0590-\u05FF
      b(this, "hebrewPattern", "\\u0590-\\u05FF\\uFB1D-\\uFB4F");
      // Arabic regex range
      b(this, "arabicPattern", "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF");
      b(this, "checkHebrew");
      b(this, "checkArabic");
      b(this, "threshold");
      // Ratio 0.0 - 1.0
      b(this, "minRTLChars", 3);
      this.checkHebrew = e, this.checkArabic = i, this.threshold = r, this.minRTLChars = n;
    }
    updateConfig(e) {
      e.minRTLChars !== void 0 && (this.minRTLChars = e.minRTLChars), e.threshold !== void 0 && (this.threshold = e.threshold);
    }
    detect(e) {
      if (!e || !e.trim())
        return !1;
      let i = [];
      if (this.checkHebrew && i.push(this.hebrewPattern), this.checkArabic && i.push(this.arabicPattern), i.length === 0)
        return !1;
      const r = new RegExp(`[${i.join("")}]`, "g"), n = e.match(r);
      if (!n)
        return !1;
      const s = n.length;
      if (s < this.minRTLChars)
        return e.trim().length >= this.minRTLChars, !1;
      const a = e.length;
      return a === 0 ? !1 : s / a > this.threshold;
    }
  }
  class at {
    constructor(e) {
      b(this, "name", "Combined");
      b(this, "strategies");
      this.strategies = e;
    }
    detect(e) {
      return this.strategies.some((i) => i.detect(e));
    }
    addStrategy(e) {
      this.strategies.push(e);
    }
    getStrategies() {
      return this.strategies;
    }
  }
  class lt {
    constructor(e = {}) {
      b(this, "strategy");
      b(this, "charCodeStrategy");
      b(this, "regexStrategy");
      b(this, "config");
      this.config = {
        sensitivity: "medium",
        minRTLChars: 3,
        sampleSize: 100,
        ...e
      }, this.charCodeStrategy = new Ft(this.config);
      const i = this.getThresholdFromSensitivity(this.config.sensitivity);
      this.regexStrategy = new Nt(!0, !0, i, this.config.minRTLChars), this.strategy = new at([
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
          this.strategy = new at([
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
      return e.map((i) => this.detectRTL(i));
    }
    /**
     * Update detection configuration
     */
    updateConfig(e) {
      this.config = { ...this.config, ...e }, this.charCodeStrategy.updateConfig(e);
      const i = this.getThresholdFromSensitivity(this.config.sensitivity);
      this.regexStrategy.updateConfig({
        minRTLChars: e.minRTLChars,
        threshold: i
      });
    }
  }
  const K = [
    {
      id: "default",
      name: "Default CSS",
      css: `/* Enhanced RTL Support from Blinko-RTL.css */
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: isolate !important;
}

.vditor-reset, .vditor-reset > div, .vditor-reset > p {
    unicode-bidi: isolate !important;
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
      dynamicCSS: V,
      targetSelectors: ve,
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
    unicode-bidi: isolate !important;
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
    unicode-bidi: isolate;
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
    unicode-bidi: isolate;
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
    unicode-bidi: isolate;
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
    unicode-bidi: isolate;
}

ul {
    direction: unset;
}`,
      isBuiltIn: !0
    },
    {
      id: "minimal-rtl",
      name: "Minimal RTL (Direction Only)",
      css: `/* Minimal RTL — fixes content direction without touching layout */
[dir="rtl"],
.rtl-force,
[lang="he"],
[lang="ar"],
[lang="fa"],
[lang="ur"] {
    direction: rtl !important;
    text-align: right !important;
}

/* Keep code blocks LTR */
pre, code, .code-block, .cm-line, .CodeMirror-line {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}`,
      isBuiltIn: !0
    },
    {
      id: "hebrew-reading",
      name: "Hebrew Long-Form Reading",
      css: `/* Hebrew Long-Form Reading — optimized typography for Hebrew documents */
.markdown-body,
.vditor-reset {
    unicode-bidi: plaintext;
}

.markdown-body p, .vditor-reset p {
    direction: rtl;
    text-align: right;
    line-height: 1.85;
    margin-bottom: 14px;
    font-size: 17px;
}

.markdown-body h1, .markdown-body h2, .markdown-body h3,
.markdown-body h4, .markdown-body h5, .markdown-body h6,
.vditor-reset h1, .vditor-reset h2, .vditor-reset h3,
.vditor-reset h4, .vditor-reset h5, .vditor-reset h6 {
    direction: rtl;
    text-align: right;
    font-weight: 600;
    margin-bottom: 16px;
}

.markdown-body blockquote, .vditor-reset blockquote {
    direction: rtl;
    border-left: none !important;
    border-right: 4px solid #6f42c1 !important;
    padding-left: 0 !important;
    padding-right: 1em !important;
    font-style: italic;
    color: inherit;
}

.markdown-body ul, .markdown-body ol,
.vditor-reset ul, .vditor-reset ol {
    direction: rtl;
    padding-right: 1.8em;
    padding-left: 0;
}

/* Keep code blocks LTR */
pre, code {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}`,
      isBuiltIn: !0
    },
    {
      id: "mixed-bidi",
      name: "Mixed Hebrew-English BiDi",
      css: `/* Mixed Hebrew-English BiDi — auto-isolates each paragraph direction */
.markdown-body p,
.markdown-body div,
.markdown-body span,
.markdown-body li,
.vditor-reset p,
.vditor-reset div,
.vditor-reset span,
.vditor-reset li,
.card-masonry-grid .markdown-body p,
.card-masonry-grid .markdown-body div {
    unicode-bidi: isolate;
    direction: rtl;
    text-align: right;
}

/* Code blocks always LTR */
pre, code, .code-block, .cm-line, .CodeMirror-line {
    direction: ltr !important;
    unicode-bidi: isolate !important;
    text-align: left !important;
}

/* Input fields: let browser decide per character */
textarea, input[type="text"], [contenteditable] {
    unicode-bidi: plaintext !important;
}

/* Block quotes flip border side */
blockquote {
    border-left: none;
    border-right: 3px solid currentcolor;
    padding-left: 0;
    padding-right: 0.9em;
}`,
      isBuiltIn: !0
    },
    {
      id: "card-grid-rtl",
      name: "Card Grid RTL",
      css: `/* Card Grid RTL — targets card masonry grid layout specifically */
.card-masonry-grid .markdown-body,
.blog-masonry-grid .markdown-body {
    direction: rtl;
    unicode-bidi: isolate;
}

.card-masonry-grid .markdown-body p,
.card-masonry-grid .markdown-body div,
.card-masonry-grid .markdown-body span,
.blog-masonry-grid .markdown-body p,
.blog-masonry-grid .markdown-body div {
    direction: rtl;
    text-align: right;
    unicode-bidi: isolate;
    line-height: 1.35;
}

.card-masonry-grid .markdown-body > div,
.blog-masonry-grid .markdown-body > div {
    margin-bottom: 0.3em;
}

.card-masonry-grid .markdown-body ul,
.card-masonry-grid .markdown-body ol,
.blog-masonry-grid .markdown-body ul {
    direction: rtl;
    padding-right: 1.5em;
    padding-left: 0;
}

/* Protect app shell and non-content areas */
#page-wrap, header, nav, .sidebar, .toolbar, button, .btn {
    direction: ltr !important;
}`,
      isBuiltIn: !0
    }
  ], ke = [
    {
      id: "dynamic-default",
      name: "Default (Full RTL)",
      description: "Full class definitions with task list & SV protection — the default.",
      css: V
    },
    {
      id: "dynamic-minimal",
      name: "Minimal (Classes Only)",
      description: "Just rtl-force / ltr-force classes, no layout overrides.",
      css: `/* Minimal Dynamic CSS — only defines direction classes */
.blinko-detected-rtl {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}`
    },
    {
      id: "dynamic-strict",
      name: "Strict RTL",
      description: "High-specificity overrides covering inputs, tasks, and editors.",
      css: `/* Strict RTL — high-specificity overrides, includes task list & SV protection */
.blinko-detected-rtl,
.rtl-force,
[dir="rtl"].rtl-force,
.markdown-body .rtl-force,
.vditor-reset .rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

input.rtl-force, textarea.rtl-force,
.rtl-force input, .rtl-force textarea {
    direction: rtl !important;
    text-align: right !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}

/* Task list: keep items stacked vertically in RTL */
ul.vditor-task.rtl-force,
ul.vditor-task[dir="rtl"],
[dir="rtl"] ul.vditor-task,
.rtl-force ul.vditor-task {
    display: block !important;
    flex-direction: unset !important;
}

ul.vditor-task.rtl-force > li,
ul.vditor-task[dir="rtl"] > li,
[dir="rtl"] ul.vditor-task > li {
    display: list-item !important;
    width: 100% !important;
}

/* Raw Markdown editor — per-line bidi, no direction flip */
.vditor-sv, .vditor-sv textarea {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}`
    },
    {
      id: "dynamic-bidi-auto",
      name: "Auto BiDi (Plaintext)",
      description: "Uses unicode-bidi: plaintext — browser picks direction per character.",
      css: `/* Auto BiDi — lets the browser handle direction per paragraph via plaintext */
.blinko-detected-rtl,
.rtl-force {
    unicode-bidi: plaintext !important;
    /* No forced direction — browser uses the first strong character */
}

.ltr-force {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}

/* Task list protection even in auto mode */
ul.vditor-task.rtl-force,
ul.vditor-task[dir="rtl"] {
    display: block !important;
    flex-direction: unset !important;
}

ul.vditor-task.rtl-force > li,
ul.vditor-task[dir="rtl"] > li {
    display: list-item !important;
    width: 100% !important;
}

/* Raw Markdown editor — plaintext bidi, no forced flip */
.vditor-sv, .vditor-sv textarea {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}`
    },
    {
      id: "dynamic-debug",
      name: "Debug Visuals Always On",
      description: "Outlines RTL/LTR elements with color without enabling the debug toggle.",
      css: `/* Debug Visuals Always On — outlines RTL/LTR elements without toggling debugger */
.blinko-detected-rtl,
.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
    outline: 2px solid rgba(111, 66, 193, 0.6) !important;
    box-shadow: 0 0 4px rgba(111, 66, 193, 0.3) !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
    outline: 2px solid rgba(253, 126, 20, 0.5) !important;
    box-shadow: 0 0 4px rgba(253, 126, 20, 0.3) !important;
}

/* Task list protection */
ul.vditor-task.rtl-force,
ul.vditor-task[dir="rtl"],
[dir="rtl"] ul.vditor-task {
    display: block !important;
    flex-direction: unset !important;
}

ul.vditor-task.rtl-force > li,
ul.vditor-task[dir="rtl"] > li {
    display: list-item !important;
    width: 100% !important;
}

/* Raw Markdown editor */
.vditor-sv, .vditor-sv textarea {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}`
    }
  ];
  function zt() {
    const [t, e] = M({
      ...xe,
      threshold: 0.15
      // derived UI field, not stored in DEFAULT_SETTINGS by default
    }), [i, r] = M("simple");
    M("");
    const [n, s] = M(""), [a, c] = M(""), [u, l] = M(""), [g, d] = M(""), [_, f] = M([]), [v, S] = M(""), [y, w] = M("");
    be(() => {
      var E, A;
      const p = () => {
        const R = window.blinkoRTL;
        if (R) {
          const F = typeof R.settings == "function" ? R.settings() : typeof R.getSettings == "function" ? R.getSettings() : null;
          if (F)
            return e(F), !0;
        }
        return !1;
      };
      if (!p()) {
        const R = setInterval(() => {
          p() && clearInterval(R);
        }, 100);
        setTimeout(() => clearInterval(R), 3e3);
      }
      const h = (R) => {
        e((F) => ({ ...F, ...R.detail }));
      }, k = (R) => {
        f((F) => [R.detail, ...F].slice(0, 50));
      };
      return (A = (E = window.blinkoRTL) == null ? void 0 : E.service) != null && A.getActionLog && f(window.blinkoRTL.service.getActionLog()), window.addEventListener("rtl-settings-changed", h), window.addEventListener("rtl-action-logged", k), () => {
        window.removeEventListener("rtl-settings-changed", h), window.removeEventListener("rtl-action-logged", k);
      };
    }, []);
    const T = (p) => {
      let h = 0;
      for (let k = 0; k < p.length; k++)
        if (p[k] === "{" && h++, p[k] === "}" && h--, h < 0)
          return !1;
      return h === 0;
    }, x = (p) => {
      var k;
      p.dynamicCSS !== void 0 && (T(p.dynamicCSS) ? S("") : S("Invalid CSS: Unbalanced curly braces"));
      const h = { ...t, ...p };
      e(h), (k = window.blinkoRTL) != null && k.service ? (window.blinkoRTL.service.updateSettings(p), window.Blinko.toast.success("Settings updated")) : (console.warn("RTL Service not found, settings might not persist correctly via StorageManager"), localStorage.setItem("blinko-rtl-settings", JSON.stringify(h)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: h
        })
      ));
    }, B = () => {
      var h;
      if (!n.trim())
        return;
      const p = (h = window.blinkoRTL) == null ? void 0 : h.detector;
      if (p) {
        const k = p.detectRTL(n);
        c(k ? "RTL" : "LTR");
      } else
        try {
          const E = new lt().detectRTL(n);
          c(E ? "RTL" : "LTR");
        } catch (k) {
          console.error("Failed to create fallback detector", k), console.warn("RTL Detector not found via global API or fallback");
        }
    }, q = () => {
      window.blinkoRTL && (window.blinkoRTL.processAll(), window.Blinko.toast.success("Content processed!"));
    }, U = () => {
      if (!u)
        return;
      const h = [...K, ...t.savedPresets || []].find((k) => k.id === u);
      h && (x({
        customCSS: h.css,
        dynamicCSS: h.dynamicCSS || t.dynamicCSS,
        targetSelectors: h.targetSelectors || t.targetSelectors,
        disabledSelectors: h.disabledSelectors || t.disabledSelectors
      }), window.Blinko.toast.success(`Preset "${h.name}" loaded!`));
    }, se = () => {
      const p = prompt("Enter a name for this Full Preset (CSS, Dynamic Rules, Selectors):");
      if (!p)
        return;
      const h = {
        id: `custom-${Date.now()}`,
        name: p,
        css: t.customCSS,
        dynamicCSS: t.dynamicCSS,
        targetSelectors: t.targetSelectors,
        disabledSelectors: t.disabledSelectors,
        isBuiltIn: !1
      };
      x({
        savedPresets: [...t.savedPresets || [], h]
      }), l(h.id), window.Blinko.toast.success("Preset saved!");
    }, G = () => {
      if (!u)
        return;
      if (K.some((h) => h.id === u)) {
        window.Blinko.toast.error("Cannot delete built-in presets.");
        return;
      }
      confirm("Are you sure you want to delete this preset?") && (x({
        savedPresets: (t.savedPresets || []).filter((h) => h.id !== u)
      }), l(""));
    }, W = () => {
      if (confirm("Reset all settings to defaults? This cannot be undone.")) {
        const p = {
          ...xe,
          savedPresets: t.savedPresets || []
          // Preserve user presets
        };
        x(p), window.Blinko.toast.success("Settings reset to defaults");
      }
    }, X = () => {
      x({ dynamicCSS: V }), window.Blinko.toast.success("Dynamic CSS reset");
    }, I = () => {
      if (!g)
        return;
      const p = ke.find((h) => h.id === g);
      p && (x({ dynamicCSS: p.css }), window.Blinko.toast.success(`Dynamic preset "${p.name}" loaded!`));
    }, z = () => {
      var p;
      try {
        let h;
        try {
          const R = (p = window.blinkoRTL) == null ? void 0 : p.service;
          if (R && typeof R.exportSettings == "function")
            h = R.exportSettings();
          else
            throw new Error("Service unavailable");
        } catch (R) {
          console.warn("Exporting from state fallback:", R), h = JSON.stringify({
            version: 1,
            source: "blinko-rtl-support-plugin",
            timestamp: Date.now(),
            data: t
          }, null, 2);
        }
        const k = new Blob([h], { type: "application/json" }), E = URL.createObjectURL(k), A = document.createElement("a");
        A.href = E, A.download = `blinko-rtl-settings-v1-${Date.now()}.json`, document.body.appendChild(A), A.click(), document.body.removeChild(A), URL.revokeObjectURL(E), window.Blinko && window.Blinko.toast.success("Settings exported successfully");
      } catch (h) {
        console.error("Export error:", h), window.Blinko && window.Blinko.toast.error("Export failed");
      }
    }, Gt = (p) => {
      var E;
      const h = (E = p.target.files) == null ? void 0 : E[0];
      if (!h)
        return;
      const k = new FileReader();
      k.onload = (A) => {
        var R, F;
        try {
          const Z = (R = A.target) == null ? void 0 : R.result, pt = (F = window.blinkoRTL) == null ? void 0 : F.service;
          if (pt)
            pt.importSettings(Z), w(""), window.Blinko.toast.success("Settings imported successfully!");
          else
            throw new Error("Service not available");
        } catch (Z) {
          console.error("Import failed", Z), w("Failed to import settings: " + (Z instanceof Error ? Z.message : "Invalid file")), window.Blinko.toast.error("Import failed");
        }
      }, k.readAsText(h), p.target.value = "";
    };
    return /* @__PURE__ */ o(
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
          /* @__PURE__ */ o("div", { style: { marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #eee" }, children: [
            /* @__PURE__ */ o("h2", { style: { margin: "0 0 10px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🔧 Fixed RTL Language Support Settings" }),
            /* @__PURE__ */ o("p", { style: { margin: "0", color: t.darkMode ? "#aaa" : "#666", fontSize: "14px" }, children: "Precise RTL support with manual control and optional permanent CSS injection." })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #007bff",
            borderRadius: "8px",
            background: t.darkMode ? "#2c3e50" : "#f8f9ff"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#007bff" }, children: "⚡ Quick Actions" }),
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: q,
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
              /* @__PURE__ */ o(
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
          t.enableActionLog !== !1 && /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa",
            maxHeight: "300px",
            overflowY: "auto"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "📜 Real-time Action Log" }),
            _.length === 0 ? /* @__PURE__ */ o("p", { style: { color: t.darkMode ? "#aaa" : "#666", fontStyle: "italic" }, children: "No actions recorded yet..." }) : /* @__PURE__ */ o("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "12px", color: t.darkMode ? "#ccc" : "#000" }, children: [
              /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ o("tr", { style: { textAlign: "left", borderBottom: "1px solid #ccc" }, children: [
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Time" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Element" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Action" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Details" })
              ] }) }),
              /* @__PURE__ */ o("tbody", { children: _.map((p, h) => /* @__PURE__ */ o("tr", { style: { borderBottom: t.darkMode ? "1px solid #444" : "1px solid #eee" }, children: [
                /* @__PURE__ */ o("td", { style: { padding: "5px", whiteSpace: "nowrap" }, children: p.timestamp }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", fontFamily: "monospace" }, title: p.element, children: p.element }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", color: p.direction === "RTL" ? "#28a745" : "#007bff" }, children: p.direction }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", color: t.darkMode ? "#888" : "#666" }, children: p.textPreview })
              ] }, h)) })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: { display: "flex", marginBottom: "20px", borderBottom: "1px solid #ddd" }, children: [
            /* @__PURE__ */ o(
              "button",
              {
                onClick: () => r("simple"),
                style: {
                  flex: 1,
                  padding: "10px",
                  background: i === "simple" ? t.darkMode ? "#444" : "#eee" : "transparent",
                  color: t.darkMode ? "#fff" : "#333",
                  border: "none",
                  borderBottom: i === "simple" ? "2px solid #007bff" : "none",
                  cursor: "pointer",
                  fontWeight: "bold"
                },
                children: "Simple"
              }
            ),
            /* @__PURE__ */ o(
              "button",
              {
                onClick: () => r("advanced"),
                style: {
                  flex: 1,
                  padding: "10px",
                  background: i === "advanced" ? t.darkMode ? "#444" : "#eee" : "transparent",
                  color: t.darkMode ? "#fff" : "#333",
                  border: "none",
                  borderBottom: i === "advanced" ? "2px solid #007bff" : "none",
                  cursor: "pointer",
                  fontWeight: "bold"
                },
                children: "Advanced"
              }
            )
          ] }),
          i === "simple" && /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🎛️ Basic Settings" }),
            /* @__PURE__ */ o("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enabled,
                    onChange: (p) => x({ enabled: p.target.checked })
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🔧 Enable RTL Support" })
              ] }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.autoDetect,
                    onChange: (p) => x({ autoDetect: p.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🤖 Auto-detect Content (Recommended)" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Automatically detects Hebrew/Arabic content and applies RTL direction." }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualToggle,
                    onChange: (p) => {
                      const h = p.target.checked;
                      x({ manualToggle: h }), window.Blinko.toast.success("Settings saved");
                      const k = window.blinkoRTL;
                      k && k.isEnabled() && k.processAll();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🔄 Force All RTL" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Forces RTL direction on everything, useful if auto-detection misses something." }),
              /* @__PURE__ */ o("div", { style: { padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "10px" }, children: [
                /* @__PURE__ */ o("label", { style: { display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "14px", fontWeight: "500" }, children: [
                  /* @__PURE__ */ o("span", { children: "Minimum RTL Characters:" }),
                  /* @__PURE__ */ o("span", { children: t.minRTLChars })
                ] }),
                /* @__PURE__ */ o("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  /* @__PURE__ */ o(
                    "input",
                    {
                      type: "range",
                      min: "1",
                      max: "20",
                      value: t.minRTLChars,
                      onChange: (p) => x({ minRTLChars: parseInt(p.target.value) }),
                      style: { flex: 1, cursor: "pointer" }
                    }
                  ),
                  /* @__PURE__ */ o(
                    "input",
                    {
                      type: "number",
                      min: "1",
                      max: "20",
                      value: t.minRTLChars,
                      onChange: (p) => x({ minRTLChars: parseInt(p.target.value) }),
                      style: { width: "60px", padding: "5px" }
                    }
                  )
                ] }),
                /* @__PURE__ */ o("p", { style: { margin: "5px 0 0 0", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: [
                  "Elements with fewer than ",
                  t.minRTLChars,
                  " RTL characters will be ignored."
                ] })
              ] })
            ] })
          ] }),
          i === "advanced" && /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🛠️ Advanced Configuration" }),
            /* @__PURE__ */ o("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ o("div", { style: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px", background: t.darkMode ? "#444" : "#fff" }, children: [
                /* @__PURE__ */ o("label", { style: { display: "block", fontWeight: "500", marginBottom: "5px" }, children: "🔤 Minimum RTL Characters:" }),
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    max: "20",
                    value: t.minRTLChars,
                    onChange: (p) => {
                      const h = parseInt(p.target.value, 10);
                      h > 0 && (x({ minRTLChars: h }), window.Blinko.toast.success("Settings saved"));
                    },
                    disabled: !t.enabled,
                    style: {
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #999",
                      width: "60px",
                      background: t.darkMode ? "#222" : "white",
                      color: t.darkMode ? "#eee" : "black"
                    }
                  }
                ),
                /* @__PURE__ */ o("p", { style: { margin: "5px 0 0 0", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Minimum number of RTL characters required to trigger detection." })
              ] }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.mobileView,
                    onChange: (p) => {
                      x({ mobileView: p.target.checked }), window.Blinko.toast.success("Settings saved");
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "📱 Mobile Optimization View" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Applies specific CSS fixes for mobile layouts (e.g. preventing horizontal scroll)." }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enablePasteInterceptor ?? !0,
                    onChange: (p) => {
                      x({ enablePasteInterceptor: p.target.checked }), window.Blinko.toast.success("Settings saved");
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "📋 Paste Interceptor" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Detects mixed content on paste and offers to split/wrap it." }),
              /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [
                /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                  /* @__PURE__ */ o(
                    "input",
                    {
                      type: "checkbox",
                      checked: t.debugMode,
                      onChange: (p) => {
                        var k, E;
                        const h = p.target.checked;
                        x({ debugMode: h }), (E = (k = window.blinkoRTL) == null ? void 0 : k.service) == null || E.toggleDebugMode(), window.Blinko.toast.success(h ? "Debug Mode Enabled" : "Debug Mode Disabled");
                      },
                      disabled: !t.enabled
                    }
                  ),
                  /* @__PURE__ */ o("span", { children: "🐞 Visual Debugger" })
                ] }),
                t.debugMode && /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer", marginLeft: "30px" }, children: [
                  /* @__PURE__ */ o(
                    "input",
                    {
                      type: "checkbox",
                      checked: t.showElementNames,
                      onChange: (p) => {
                        var k, E, A, R;
                        const h = p.target.checked;
                        x({ showElementNames: h }), window.Blinko.toast.success("Settings saved"), (E = (k = window.blinkoRTL) == null ? void 0 : k.service) == null || E.toggleDebugMode(), (R = (A = window.blinkoRTL) == null ? void 0 : A.service) == null || R.toggleDebugMode();
                      }
                    }
                  ),
                  /* @__PURE__ */ o("span", { children: 'Show Element Names (e.g. "RTL (DIV)")' })
                ] })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Highlights detected RTL (Red) and LTR (Blue) elements." }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.debugShowElementNames,
                    onChange: (p) => {
                      var k, E;
                      const h = p.target.checked;
                      x({ debugShowElementNames: h }), (E = (k = window.blinkoRTL) == null ? void 0 : k.service) == null || E.updateSettings({ debugShowElementNames: h }), window.Blinko && window.Blinko.toast.success(h ? "Element names enabled" : "Element names disabled");
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🏷️ Show Element Names" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Displays the HTML tag name next to the debug label (Requires Visual Debugger)." }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enableActionLog ?? !0,
                    onChange: (p) => {
                      const h = p.target.checked;
                      x({ enableActionLog: h }), window.Blinko && window.Blinko.toast.success(h ? "Action log enabled" : "Action log disabled");
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "📜 Enable Action Log" })
              ] }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.showManualToggle ?? !0,
                    onChange: (p) => {
                      const h = p.target.checked;
                      x({ showManualToggle: h }), window.Blinko && window.Blinko.toast.success(h ? "Toggle button shown" : "Toggle button hidden");
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🖲️ Show Manual Toggle Button" })
              ] }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualMode,
                    onChange: (p) => {
                      x({ manualMode: p.target.checked }), window.Blinko.toast.success("Settings saved");
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "✋ Manual Mode (Strict Detection)" })
              ] }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.darkMode,
                    onChange: (p) => {
                      const h = p.target.checked;
                      x({ darkMode: h }), h ? document.body.classList.add("dark") : document.body.classList.remove("dark");
                    }
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🌙 Dark Mode Plugin UI" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #6610f2",
            borderRadius: "8px",
            background: t.darkMode ? "#2c2c3e" : "#f8f9ff"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#6610f2" }, children: "🎨 Dynamic CSS Rules" }),
            /* @__PURE__ */ o("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#aaa" : "#666" }, children: "These CSS rules are applied dynamically when RTL or LTR content is detected. Customize the class definitions below to control how detected elements are styled." }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px", padding: "15px", background: t.darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", borderRadius: "6px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px", color: t.darkMode ? "#eee" : "#333" }, children: "📚 Dynamic CSS Presets:" }),
              /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "8px" }, children: [
                /* @__PURE__ */ o(
                  "select",
                  {
                    value: g,
                    onChange: (p) => d(p.target.value),
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
                      /* @__PURE__ */ o("option", { value: "", children: "-- Select a Dynamic Preset --" }),
                      ke.map((p) => /* @__PURE__ */ o("option", { value: p.id, children: p.name }, p.id))
                    ]
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    onClick: I,
                    disabled: !t.enabled || !g,
                    style: {
                      background: "#6610f2",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    },
                    children: "📥 Load"
                  }
                )
              ] }),
              g && (() => {
                const p = ke.find((h) => h.id === g);
                return p ? /* @__PURE__ */ o("p", { style: { margin: "0", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666", fontStyle: "italic" }, children: p.description }) : null;
              })()
            ] }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ o(
                "textarea",
                {
                  value: t.dynamicCSS,
                  onChange: (p) => x({ dynamicCSS: p.target.value }),
                  placeholder: "Enter your dynamic CSS rules here...",
                  disabled: !t.enabled,
                  style: {
                    width: "100%",
                    height: "350px",
                    padding: "10px",
                    border: v ? "2px solid red" : "1px solid #ccc",
                    borderRadius: "4px",
                    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                    fontSize: "13px",
                    resize: "vertical",
                    background: t.darkMode ? "#222" : "white",
                    color: t.darkMode ? "#eee" : "black"
                  }
                }
              ),
              v && /* @__PURE__ */ o("div", { style: { color: "red", fontSize: "12px", marginTop: "5px" }, children: v })
            ] }),
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: X,
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
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    if (v) {
                      window.Blinko.toast.error("Please fix CSS errors before saving.");
                      return;
                    }
                    x({ dynamicCSS: t.dynamicCSS }), window.Blinko.toast.success("Dynamic CSS Settings Saved");
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
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #28a745",
            borderRadius: "8px",
            background: t.darkMode ? "#1e3023" : "#f8fff8"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "📌 Permanent CSS Settings" }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.permanentCSS,
                    onChange: (p) => x({ permanentCSS: p.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "Enable Permanent CSS Injection" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "5px 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "This CSS is injected permanently as long as the plugin is enabled, regardless of RTL detection. Use this for global overrides." })
            ] }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px", padding: "15px", background: t.darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", borderRadius: "6px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px" }, children: "📚 CSS Presets:" }),
              /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
                /* @__PURE__ */ o(
                  "select",
                  {
                    value: u,
                    onChange: (p) => l(p.target.value),
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
                      /* @__PURE__ */ o("option", { value: "", children: "-- Select a Preset --" }),
                      /* @__PURE__ */ o("optgroup", { label: "Built-in Presets", children: K.map((p) => /* @__PURE__ */ o("option", { value: p.id, children: p.name }, p.id)) }),
                      t.savedPresets && t.savedPresets.length > 0 && /* @__PURE__ */ o("optgroup", { label: "Saved Presets", children: t.savedPresets.map((p) => /* @__PURE__ */ o("option", { value: p.id, children: p.name }, p.id)) })
                    ]
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    onClick: U,
                    disabled: !t.enabled || !u,
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
                /* @__PURE__ */ o(
                  "button",
                  {
                    onClick: G,
                    disabled: !t.enabled || !u || K.some((p) => p.id === u),
                    style: {
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      opacity: K.some((p) => p.id === u) ? 0.5 : 1
                    },
                    title: "Delete selected preset",
                    children: "🗑️"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "block", fontWeight: "500", marginBottom: "5px" }, children: "Custom CSS Code (Permanent):" }),
              /* @__PURE__ */ o(
                "textarea",
                {
                  value: t.customCSS,
                  onChange: (p) => x({ customCSS: p.target.value }),
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
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: se,
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
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => x({ customCSS: "" }),
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
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🧪 Test RTL Detection" }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ o(
              "textarea",
              {
                value: n,
                onChange: (p) => s(p.target.value),
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
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", marginBottom: "15px" }, children: /* @__PURE__ */ o(
              "button",
              {
                onClick: B,
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
            a && /* @__PURE__ */ o("div", { style: {
              padding: "10px",
              background: a === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${a === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px",
              color: "#333"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ o("strong", { children: a === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🔧 Advanced Actions" }),
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: W,
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
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: z,
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
              /* @__PURE__ */ o("label", { style: {
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                display: "inline-block"
              }, children: [
                "📂 Import Settings (JSON)",
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "file",
                    accept: ".json",
                    onChange: Gt,
                    style: { display: "none" }
                  }
                )
              ] })
            ] }),
            y && /* @__PURE__ */ o("p", { style: { color: "red", marginTop: "10px" }, children: y })
          ] })
        ]
      }
    );
  }
  const dt = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "2.0.9",
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
  function ct(t, e, i = !1) {
    let r = null;
    return function(...n) {
      const s = this, a = function() {
        r = null, i || t.apply(s, n);
      }, c = i && !r;
      r && clearTimeout(r), r = setTimeout(a, e), c && t.apply(s, n);
    };
  }
  class Ht {
    constructor(e) {
      b(this, "detector");
      b(this, "isEnabled", !1);
      b(this, "activeToast", null);
      b(this, "handlePaste", (e) => {
        var n;
        if (!this.isEnabled)
          return;
        const i = e.target;
        if (!this.isEditable(i))
          return;
        const r = (n = e.clipboardData) == null ? void 0 : n.getData("text/plain");
        r && this.detectMixedContent(r) && (e.preventDefault(), e.stopPropagation(), this.showSuggestionToast(r, i));
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
      const i = (e.match(/[\u0590-\u05FF\u0600-\u06FF]/g) || []).length, r = (e.match(/[a-zA-Z]/g) || []).length;
      return i > 3 && r > 3;
    }
    showSuggestionToast(e, i) {
      var n, s, a, c;
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
      }), document.body.appendChild(r), this.activeToast = r, (n = r.querySelector("#rtl-btn-split")) == null || n.addEventListener("click", () => {
        this.insertText(i, this.processSplit(e)), this.removeToast();
      }), (s = r.querySelector("#rtl-btn-wrap")) == null || s.addEventListener("click", () => {
        this.insertText(i, this.processWrap(e)), this.removeToast();
      }), (a = r.querySelector("#rtl-btn-original")) == null || a.addEventListener("click", () => {
        this.insertText(i, e), this.removeToast();
      }), (c = r.querySelector(".rtl-toast-close")) == null || c.addEventListener("click", () => {
        this.removeToast();
      });
    }
    removeToast() {
      this.activeToast && (this.activeToast.remove(), this.activeToast = null);
    }
    insertText(e, i) {
      if (e.tagName === "TEXTAREA" || e.tagName === "INPUT") {
        const r = e;
        if (typeof r.setRangeText == "function") {
          const n = r.selectionStart || 0, s = r.selectionEnd || 0;
          r.setRangeText(i, n, s, "end");
        } else {
          const n = r.selectionStart || 0, s = r.selectionEnd || 0;
          r.value = r.value.substring(0, n) + i + r.value.substring(s), r.selectionStart = r.selectionEnd = n + i.length;
        }
        r.dispatchEvent(new Event("input", { bubbles: !0 }));
      } else {
        e.focus();
        const r = window.getSelection();
        if (r && r.rangeCount > 0) {
          const n = r.getRangeAt(0);
          n.deleteContents();
          const s = document.createTextNode(i);
          n.insertNode(s);
          try {
            n.setStartAfter(s), n.setEndAfter(s), r.removeAllRanges(), r.addRange(n);
          } catch (a) {
            console.warn("Failed to update cursor position:", a);
          }
        }
      }
    }
    processSplit(e) {
      const i = /([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g;
      let r = e.replace(i, (n) => `
${n}
`);
      return r = r.replace(/\n{3,}/g, `

`).trim(), r;
    }
    processWrap(e) {
      const i = "⁧", r = "⁩";
      return e.replace(/([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g, `${i}$1${r}`);
    }
  }
  class Ot {
    constructor() {
      b(this, "STORAGE_KEY", "blinko-rtl-settings");
      b(this, "CURRENT_VERSION", 1);
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
      const i = this.getStorageKey();
      try {
        localStorage.setItem(i, JSON.stringify(e));
      } catch (r) {
        console.error("Failed to save RTL settings:", r);
      }
    }
    load() {
      const e = this.getStorageKey(), i = localStorage.getItem(e);
      if (!i && e !== this.STORAGE_KEY) {
        const r = localStorage.getItem(this.STORAGE_KEY);
        if (r)
          try {
            return JSON.parse(r);
          } catch {
            return null;
          }
      }
      if (i)
        try {
          return JSON.parse(i);
        } catch (r) {
          return console.error("Failed to parse RTL settings:", r), null;
        }
      return null;
    }
    export(e) {
      const i = {
        version: this.CURRENT_VERSION,
        source: "blinko-rtl-support-plugin",
        timestamp: Date.now(),
        data: e
      };
      return JSON.stringify(i, null, 2);
    }
    import(e) {
      let i;
      try {
        i = JSON.parse(e);
      } catch {
        throw new Error("Invalid JSON format");
      }
      if (typeof i != "object" || i === null)
        throw new Error("Invalid import data: Root must be an object");
      if (!i.version && !i.data && i.targetSelectors)
        return this.validateAndSanitize(i);
      if (i.source, !i.data)
        throw new Error("Invalid import data: Missing settings data");
      return this.validateAndSanitize(i.data);
    }
    validateAndSanitize(e) {
      if (!Array.isArray(e.targetSelectors))
        throw new Error("Invalid settings: targetSelectors must be an array");
      if (e.minRTLChars !== void 0 && typeof e.minRTLChars != "number")
        throw new Error("Invalid settings: minRTLChars must be a number");
      return typeof e.dynamicCSS != "string" && (e.dynamicCSS = ""), e;
    }
  }
  class Ut {
    constructor(e) {
      b(this, "detector");
      b(this, "isRTLEnabled", !1);
      b(this, "baseStyleElement", null);
      b(this, "styleElement", null);
      b(this, "permanentStyleElement", null);
      b(this, "dynamicStyleElement", null);
      b(this, "observer", null);
      b(this, "autoProcessInterval", null);
      // Managers
      b(this, "pasteInterceptor");
      b(this, "storageManager");
      // Optimizations
      b(this, "pendingElements", /* @__PURE__ */ new Set());
      b(this, "debouncedProcessQueue");
      b(this, "debouncedProcessAll");
      // Action Log
      b(this, "actionLog", []);
      b(this, "MAX_LOG_SIZE", 50);
      // Hebrew regex from userscript
      b(this, "hebrewRegex", /\p{Script=Hebrew}/u);
      b(this, "arabicRegex", /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/);
      b(this, "settings", { ...xe, targetSelectors: ve });
      b(this, "processElement", (e) => {
        if (!e)
          return;
        const i = (a, c) => {
          try {
            return a.matches(c);
          } catch (u) {
            return console.warn(`Invalid selector '${c}':`, u), !1;
          }
        };
        if (this.settings.disabledSelectors && this.settings.disabledSelectors.some((a) => i(e, a)))
          return;
        const r = e.textContent || e.value || e.placeholder || "";
        if (!r.trim() || r.length < this.settings.minRTLChars) {
          this.applyCSSClassRTL(e, "neutral");
          return;
        }
        let n = "neutral";
        if (this.settings.manualToggle)
          n = "rtl";
        else if (this.settings.forceDirection === "rtl")
          n = "rtl";
        else if (this.settings.forceDirection === "ltr")
          n = "ltr";
        else if (i(e, "pre, code, .code-block, .CodeMirror-line, .notion-code-block")) {
          const c = (r.match(/[\u0590-\u05FF]/g) || []).length, u = (r.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length, l = c + u, g = r.replace(/\s/g, "").length || r.length;
          l / g > 0.6 ? n = "rtl" : n = "ltr";
        } else
          this.detector.detectRTL(r) ? n = "rtl" : /[a-zA-Z]/.test(r) ? n = "ltr" : n = "neutral";
        const s = e.getAttribute("data-manual-dir");
        switch (s === "rtl" && (n = "rtl"), s === "ltr" && (n = "ltr"), this.logAction(e, n), this.settings.method) {
          case "direct":
            this.applyDirectRTL(e, n);
            break;
          case "attributes":
            this.applyAttributeRTL(e, n);
            break;
          case "css":
            this.applyCSSClassRTL(e, n);
            break;
          case "unicode":
            this.applyUnicodeBidiRTL(e);
            break;
          case "all":
          default:
            this.applyCSSClassRTL(e, n), this.applyAttributeRTL(e, n);
            break;
        }
      });
      b(this, "processAllElements", () => {
        if (!this.isRTLEnabled)
          return;
        this.settings.targetSelectors.filter(
          (i) => !this.settings.disabledSelectors.includes(i)
        ).forEach((i) => {
          try {
            document.querySelectorAll(i).forEach((n) => {
              this.processElement(n);
            });
          } catch (r) {
            console.warn(`Invalid selector in processAllElements: '${i}'`, r);
          }
        });
      });
      this.detector = e, this.storageManager = new Ot(), this.loadSettings(), this.pasteInterceptor = new Ht(e), this.debouncedProcessAll = ct(() => this.processAllElements(), 200), this.debouncedProcessQueue = ct(() => {
        this.processPendingElements();
      }, 50);
    }
    getSettings() {
      return { ...this.settings };
    }
    getActionLog() {
      return [...this.actionLog];
    }
    logAction(e, i) {
      if (!this.settings.enableActionLog)
        return;
      const r = {
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        element: e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + (e.className ? `.${e.className.split(" ").join(".")}` : ""),
        direction: i.toUpperCase(),
        textPreview: e.textContent || ""
      };
      this.settings.enableActionLog !== !1 && (this.actionLog.unshift(r), this.actionLog.length > this.MAX_LOG_SIZE && this.actionLog.pop(), window.dispatchEvent(new CustomEvent("rtl-action-logged", { detail: r })));
    }
    isEnabled() {
      return this.isRTLEnabled;
    }
    loadSettings() {
      const e = this.storageManager.load();
      e ? (this.settings = { ...this.settings, ...e }, this.settings.dynamicCSS || (this.settings.dynamicCSS = V), this.settings.disabledSelectors || (this.settings.disabledSelectors = []), this.settings.autoDetect === void 0 && (this.settings.autoDetect = !0), this.settings.enablePasteInterceptor === void 0 && (this.settings.enablePasteInterceptor = !0), this.detector.updateConfig({
        sensitivity: this.settings.sensitivity,
        minRTLChars: this.settings.minRTLChars
      }), this.settings.permanentCSS && this.settings.customCSS && this.injectPermanentCSS()) : (this.settings.autoDetect = !0, this.settings.enablePasteInterceptor = !0);
    }
    updateSettings(e) {
      this.settings = { ...this.settings, ...e }, this.storageManager.save(this.settings), this.detector.updateConfig({
        sensitivity: this.settings.sensitivity,
        minRTLChars: this.settings.minRTLChars
      }), this.injectCSS(), this.settings.permanentCSS && this.settings.customCSS ? this.injectPermanentCSS() : this.removePermanentCSS(), this.isRTLEnabled && this.injectDynamicCSS(), this.isRTLEnabled && (this.setupObserver(), this.startAutoProcessing(), this.debouncedProcessAll(), this.settings.enablePasteInterceptor !== !1 ? this.pasteInterceptor.enable() : this.pasteInterceptor.disable(), this.applyMobileView()), window.dispatchEvent(
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
        const i = this.storageManager.import(e);
        return this.updateSettings(i), !0;
      } catch (i) {
        throw console.error("Import failed:", i), i;
      }
    }
    injectBaseCSS() {
      this.baseStyleElement || (this.baseStyleElement = document.createElement("style"), this.baseStyleElement.id = "blinko-rtl-base-styles", this.baseStyleElement.textContent = $t, document.head.appendChild(this.baseStyleElement));
    }
    injectCSS() {
      this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.id = "blinko-dynamic-css", document.head.appendChild(this.styleElement)), this.styleElement.textContent = this.settings.dynamicCSS;
    }
    injectDynamicCSS() {
      this.dynamicStyleElement || (this.dynamicStyleElement = document.createElement("style"), this.dynamicStyleElement.id = "blinko-rtl-dynamic-css", document.head.appendChild(this.dynamicStyleElement));
      let e = this.settings.dynamicCSS || V;
      this.settings.debugMode && (e.includes(".rtl-debug-rtl") || (e += `
/* Visual Debugger - RTL Detected */
.rtl-debug-rtl {
    outline: 2px solid rgba(255, 0, 0, 0.5) !important;
    position: relative !important;
}
.rtl-debug-rtl::after {
    content: attr(data-rtl-debug) " " attr(data-debug-name);
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
    content: attr(data-rtl-debug) " " attr(data-debug-name);
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
    applyDirectRTL(e, i) {
      i === "rtl" ? (e.classList.add("blinko-detected-rtl"), e.style.direction = "rtl", e.style.textAlign = "right", e.style.unicodeBidi = "isolate") : i === "ltr" ? (e.classList.remove("blinko-detected-rtl"), e.style.direction = "ltr", e.style.textAlign = "left", e.style.unicodeBidi = "isolate") : (e.classList.remove("blinko-detected-rtl"), e.style.removeProperty("direction"), e.style.removeProperty("text-align"), e.style.removeProperty("unicode-bidi")), this.applyDebugVisuals(e, i);
    }
    applyAttributeRTL(e, i) {
      i === "rtl" ? e.setAttribute("dir", "rtl") : i === "ltr" ? e.setAttribute("dir", "ltr") : e.removeAttribute("dir"), this.applyDebugVisuals(e, i);
    }
    applyCSSClassRTL(e, i) {
      e.classList.remove("rtl-force", "ltr-force", "rtl-auto"), i === "rtl" ? e.classList.add("rtl-force") : i === "ltr" && e.classList.add("ltr-force"), this.applyDebugVisuals(e, i);
    }
    applyUnicodeBidiRTL(e) {
      e.classList.add("rtl-auto"), e.style.unicodeBidi = "isolate";
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
      this.isRTLEnabled = !0, this.settings.enabled = !0, this.storageManager.save(this.settings), this.injectCSS(), this.injectDynamicCSS(), this.settings.permanentCSS && this.injectPermanentCSS(), this.settings.enablePasteInterceptor !== !1 && this.pasteInterceptor.enable(), this.applyMobileView(), this.setupObserver(), this.startAutoProcessing(), this.processAllElements(), setTimeout(() => this.processAllElements(), 500);
    }
    disable() {
      this.isRTLEnabled = !1, this.settings.enabled = !1, this.storageManager.save(this.settings), this.removeCSS(), this.pasteInterceptor.disable(), document.body.classList.remove("blinko-rtl-mobile-view"), this.stopAutoProcessing(), this.observer && (this.observer.disconnect(), this.observer = null), this.pendingElements.clear();
    }
    applyMobileView() {
      this.settings.mobileView ? document.body.classList.add("blinko-rtl-mobile-view") : document.body.classList.remove("blinko-rtl-mobile-view");
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
      return this.updateSettings({ debugMode: e }), e ? (document.body.classList.add("rtl-debug-mode"), this.injectDynamicCSS(), this.processAllElements()) : (document.body.classList.remove("rtl-debug-mode"), document.querySelectorAll(".rtl-debug-rtl, .rtl-debug-ltr").forEach((i) => {
        i.classList.remove("rtl-debug-rtl", "rtl-debug-ltr"), i.removeAttribute("data-rtl-debug");
      })), e;
    }
    applyDebugVisuals(e, i) {
      if (this.settings.debugMode) {
        e.classList.remove("rtl-debug-rtl", "rtl-debug-ltr");
        let r = "";
        if (i === "rtl")
          e.classList.add("rtl-debug-rtl"), r = "RTL";
        else if (i === "ltr")
          e.classList.add("rtl-debug-ltr"), r = "LTR";
        else {
          e.removeAttribute("data-rtl-debug"), e.removeAttribute("data-debug-name");
          return;
        }
        if (e.setAttribute("data-rtl-debug", r), this.settings.debugShowElementNames) {
          const n = e.tagName.toLowerCase(), s = e.id ? `#${e.id}` : "", a = `${n}${s}`;
          e.setAttribute("data-debug-name", a);
        } else
          e.removeAttribute("data-debug-name");
      } else
        e.classList.remove("rtl-debug-rtl", "rtl-debug-ltr"), e.removeAttribute("data-rtl-debug"), e.removeAttribute("data-debug-name");
    }
    setupObserver() {
      this.observer && this.observer.disconnect(), this.settings.autoDetect && (this.observer = new MutationObserver((e) => {
        if (!this.isRTLEnabled)
          return;
        let i = !1;
        const r = this.settings.targetSelectors.filter(
          (a) => !this.settings.disabledSelectors.includes(a)
        ), n = [];
        r.forEach((a) => {
          try {
            document.querySelector(a), n.push(a);
          } catch {
          }
        });
        const s = n.join(", ");
        e.forEach((a) => {
          if (a.type === "childList")
            a.addedNodes.forEach((c) => {
              if (c.nodeType === Node.ELEMENT_NODE) {
                const u = c;
                let l = !1;
                for (const g of n)
                  if (u.matches(g)) {
                    l = !0;
                    break;
                  }
                if (l && (this.pendingElements.add(u), i = !0), s)
                  try {
                    const g = u.querySelectorAll(s);
                    g.length > 0 && (g.forEach((d) => {
                      this.pendingElements.add(d);
                    }), i = !0);
                  } catch {
                  }
              }
            });
          else if (a.type === "characterData" || a.type === "attributes") {
            const c = a.target.nodeType === Node.ELEMENT_NODE ? a.target : a.target.parentElement;
            if (c) {
              let u = !1;
              for (const l of n)
                try {
                  if (c.matches(l)) {
                    u = !0;
                    break;
                  }
                } catch {
                }
              u && (this.pendingElements.add(c), i = !0);
            }
          }
        }), i && this.debouncedProcessQueue();
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
  const hi = "", Wt = {
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
  }, jt = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Vt = {
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
  }, qt = {
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
      const e = new lt(), i = new Ut(e);
      i.injectBaseCSS();
      let r = null;
      function n() {
        if (r)
          return;
        const u = i.getSettings();
        u.enableManualToggleBtn !== !1 && (r = document.createElement("button"), r.className = "rtl-toggle-btn", r.textContent = "ع/א", r.title = "Toggle RTL Support (Hebrew/Arabic)", r.addEventListener("click", () => {
          i.toggle(), s();
        }), document.body.appendChild(r), u.darkMode && r.classList.add("dark-mode"), s());
      }
      function s() {
        if (!r)
          return;
        i.getSettings().showManualToggle === !1 ? r.style.display = "none" : r.style.display = "flex", i.isEnabled() ? r.classList.add("active") : r.classList.remove("active");
      }
      function a() {
        r && (r.remove(), r = null);
      }
      function c() {
        console.log("Initializing Advanced Blinko RTL Plugin..."), n(), i.getSettings().enabled && (i.enable(), s()), window.addEventListener("rtl-settings-changed", (l) => {
          const g = l.detail;
          g.enableManualToggleBtn === !1 ? a() : g.enableManualToggleBtn !== !1 && !r && n(), r && (g.darkMode ? r.classList.add("dark-mode") : r.classList.remove("dark-mode"), g.showManualToggle !== void 0 && s());
        });
        const u = {
          detector: e,
          service: i,
          // Expose service
          toggle: () => {
            i.toggle(), s();
          },
          enable: () => {
            i.enable(), s();
          },
          disable: () => {
            i.disable(), s();
          },
          isEnabled: () => i.isEnabled(),
          settings: () => i.getSettings(),
          getSettings: () => i.getSettings(),
          // Alias for app.tsx compatibility
          processAll: i.processAllElements,
          processElement: i.processElement,
          toggleManual: () => i.toggleManual(),
          test: (l) => {
            const g = e.detectRTL(l), d = i.detectHebrewRegex(l), _ = i.detectArabicRegex(l);
            return console.log(`Text "${l}" -> Original: ${g ? "RTL" : "LTR"}, Hebrew: ${d}, Arabic: ${_}`), g;
          },
          testHebrew: (l) => i.detectHebrewRegex(l),
          testArabic: (l) => i.detectArabicRegex(l),
          getStats: () => document.querySelectorAll('.rtl-force, .rtl-auto, [dir="rtl"]').length,
          setSensitivity: (l) => {
            let g = "medium";
            l < 0.12 ? g = "high" : l > 0.3 && (g = "low"), i.updateSettings({ threshold: l, sensitivity: g });
          },
          fixSelection: () => {
            const l = window.getSelection();
            if (!l || l.rangeCount === 0)
              return;
            let d = l.getRangeAt(0).commonAncestorContainer;
            if (d.nodeType === Node.TEXT_NODE && (d = d.parentNode), d instanceof HTMLElement) {
              i.processElement(d);
              const _ = d.closest("p, div, li, td, th");
              _ && i.processElement(_);
            }
          }
        };
        window.blinkoRTL = u, console.log("Advanced Blinko RTL Plugin initialized successfully");
      }
      t("default", class {
        constructor() {
          b(this, "withSettingPanel", !0);
          b(this, "renderSettingPanel", () => {
            const l = document.createElement("div");
            return it(/* @__PURE__ */ o(zt, {}), l), l;
          });
          Object.assign(this, dt);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", c) : setTimeout(c, 100), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: `RTL Language Support (v${dt.version}) (ع/א)`,
            content: () => {
              const l = document.createElement("div");
              return l.setAttribute("data-plugin", "rtl-support"), it(/* @__PURE__ */ o(Pt, { detector: e }), l), l;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL (ع/א)",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              i.toggle(), s();
              const l = window.Blinko.i18n;
              window.Blinko.toast.success(
                i.isEnabled() ? l.t("rtl_enabled") : l.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", Wt), window.Blinko.i18n.addResourceBundle("zh", "translation", jt), window.Blinko.i18n.addResourceBundle("he", "translation", Vt), window.Blinko.i18n.addResourceBundle("ar", "translation", qt);
        }
        destroy() {
          i.disable(), a(), console.log("Advanced RTL Plugin destroyed");
        }
      });
    }
  }));
})();
