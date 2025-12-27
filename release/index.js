var Ht = Object.defineProperty;
var Nt = (E, g, B) => g in E ? Ht(E, g, { enumerable: !0, configurable: !0, writable: !0, value: B }) : E[g] = B;
var f = (E, g, B) => (Nt(E, typeof g != "symbol" ? g + "" : g, B), B);
(function() {
  var E, g, B, F, ge, _e, fe, me, ee, te, ne, U = {}, be = [], tt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, j = Array.isArray;
  function M(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function ie(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function re(t, e, n) {
    var i, o, s, d = {};
    for (s in e)
      s == "key" ? i = e[s] : s == "ref" ? o = e[s] : d[s] = e[s];
    if (arguments.length > 2 && (d.children = arguments.length > 3 ? E.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (s in t.defaultProps)
        d[s] === void 0 && (d[s] = t.defaultProps[s]);
    return q(t, d, i, o, null);
  }
  function q(t, e, n, i, o) {
    var s = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o ?? ++B, __i: -1, __u: 0 };
    return o == null && g.vnode != null && g.vnode(s), s;
  }
  function I(t) {
    return t.children;
  }
  function P(t, e) {
    this.props = t, this.context = e;
  }
  function W(t, e) {
    if (e == null)
      return t.__ ? W(t.__, t.__i + 1) : null;
    for (var n; e < t.__k.length; e++)
      if ((n = t.__k[e]) != null && n.__e != null)
        return n.__e;
    return typeof t.type == "function" ? W(t) : null;
  }
  function ve(t) {
    var e, n;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((n = t.__k[e]) != null && n.__e != null) {
          t.__e = t.__c.base = n.__e;
          break;
        }
      return ve(t);
    }
  }
  function ye(t) {
    (!t.__d && (t.__d = !0) && F.push(t) && !J.__r++ || ge != g.debounceRendering) && ((ge = g.debounceRendering) || _e)(J);
  }
  function J() {
    for (var t, e, n, i, o, s, d, u = 1; F.length; )
      F.length > u && F.sort(fe), t = F.shift(), u = F.length, t.__d && (n = void 0, o = (i = (e = t).__v).__e, s = [], d = [], e.__P && ((n = M({}, i)).__v = i.__v + 1, g.vnode && g.vnode(n), oe(e.__P, n, i, e.__n, e.__P.namespaceURI, 32 & i.__u ? [o] : null, s, o ?? W(i), !!(32 & i.__u), d), n.__v = i.__v, n.__.__k[n.__i] = n, Te(s, n, d), n.__e != o && ve(n)));
    J.__r = 0;
  }
  function xe(t, e, n, i, o, s, d, u, h, l, p) {
    var a, b, m, y, x, v, S, k = i && i.__k || be, L = e.length;
    for (h = nt(n, e, k, h, L), a = 0; a < L; a++)
      (m = n.__k[a]) != null && (b = m.__i == -1 ? U : k[m.__i] || U, m.__i = a, v = oe(t, m, b, o, s, d, u, h, l, p), y = m.__e, m.ref && b.ref != m.ref && (b.ref && le(b.ref, null, m), p.push(m.ref, m.__c || y, m)), x == null && y != null && (x = y), (S = !!(4 & m.__u)) || b.__k === m.__k ? h = Se(m, h, t, S) : typeof m.type == "function" && v !== void 0 ? h = v : y && (h = y.nextSibling), m.__u &= -7);
    return n.__e = x, h;
  }
  function nt(t, e, n, i, o) {
    var s, d, u, h, l, p = n.length, a = p, b = 0;
    for (t.__k = new Array(o), s = 0; s < o; s++)
      (d = e[s]) != null && typeof d != "boolean" && typeof d != "function" ? (h = s + b, (d = t.__k[s] = typeof d == "string" || typeof d == "number" || typeof d == "bigint" || d.constructor == String ? q(null, d, null, null, null) : j(d) ? q(I, { children: d }, null, null, null) : d.constructor == null && d.__b > 0 ? q(d.type, d.props, d.key, d.ref ? d.ref : null, d.__v) : d).__ = t, d.__b = t.__b + 1, u = null, (l = d.__i = it(d, n, h, a)) != -1 && (a--, (u = n[l]) && (u.__u |= 2)), u == null || u.__v == null ? (l == -1 && (o > p ? b-- : o < p && b++), typeof d.type != "function" && (d.__u |= 4)) : l != h && (l == h - 1 ? b-- : l == h + 1 ? b++ : (l > h ? b-- : b++, d.__u |= 4))) : t.__k[s] = null;
    if (a)
      for (s = 0; s < p; s++)
        (u = n[s]) != null && !(2 & u.__u) && (u.__e == i && (i = W(u)), Le(u, u));
    return i;
  }
  function Se(t, e, n, i) {
    var o, s;
    if (typeof t.type == "function") {
      for (o = t.__k, s = 0; o && s < o.length; s++)
        o[s] && (o[s].__ = t, e = Se(o[s], e, n, i));
      return e;
    }
    t.__e != e && (i && (e && t.type && !e.parentNode && (e = W(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function G(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (j(t) ? t.some(function(n) {
      G(n, e);
    }) : e.push(t)), e;
  }
  function it(t, e, n, i) {
    var o, s, d, u = t.key, h = t.type, l = e[n], p = l != null && (2 & l.__u) == 0;
    if (l === null && t.key == null || p && u == l.key && h == l.type)
      return n;
    if (i > (p ? 1 : 0)) {
      for (o = n - 1, s = n + 1; o >= 0 || s < e.length; )
        if ((l = e[d = o >= 0 ? o-- : s++]) != null && !(2 & l.__u) && u == l.key && h == l.type)
          return d;
    }
    return -1;
  }
  function ke(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || tt.test(e) ? n : n + "px";
  }
  function Q(t, e, n, i, o) {
    var s, d;
    e:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof i == "string" && (t.style.cssText = i = ""), i)
            for (e in i)
              n && e in n || ke(t.style, e, "");
          if (n)
            for (e in n)
              i && n[e] == i[e] || ke(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        s = e != (e = e.replace(me, "$1")), d = e.toLowerCase(), e = d in t || e == "onFocusOut" || e == "onFocusIn" ? d.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = n, n ? i ? n.u = i.u : (n.u = ee, t.addEventListener(e, s ? ne : te, s)) : t.removeEventListener(e, s ? ne : te, s);
      else {
        if (o == "http://www.w3.org/2000/svg")
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
  function we(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.t == null)
          e.t = ee++;
        else if (e.t < n.u)
          return;
        return n(g.event ? g.event(e) : e);
      }
    };
  }
  function oe(t, e, n, i, o, s, d, u, h, l) {
    var p, a, b, m, y, x, v, S, k, L, C, H, $, V, N, D, O, c = e.type;
    if (e.constructor != null)
      return null;
    128 & n.__u && (h = !!(32 & n.__u), s = [u = e.__e = n.__e]), (p = g.__b) && p(e);
    e:
      if (typeof c == "function")
        try {
          if (S = e.props, k = "prototype" in c && c.prototype.render, L = (p = c.contextType) && i[p.__c], C = p ? L ? L.props.value : p.__ : i, n.__c ? v = (a = e.__c = n.__c).__ = a.__E : (k ? e.__c = a = new c(S, C) : (e.__c = a = new P(S, C), a.constructor = c, a.render = ot), L && L.sub(a), a.props = S, a.state || (a.state = {}), a.context = C, a.__n = i, b = a.__d = !0, a.__h = [], a._sb = []), k && a.__s == null && (a.__s = a.state), k && c.getDerivedStateFromProps != null && (a.__s == a.state && (a.__s = M({}, a.__s)), M(a.__s, c.getDerivedStateFromProps(S, a.__s))), m = a.props, y = a.state, a.__v = e, b)
            k && c.getDerivedStateFromProps == null && a.componentWillMount != null && a.componentWillMount(), k && a.componentDidMount != null && a.__h.push(a.componentDidMount);
          else {
            if (k && c.getDerivedStateFromProps == null && S !== m && a.componentWillReceiveProps != null && a.componentWillReceiveProps(S, C), !a.__e && a.shouldComponentUpdate != null && a.shouldComponentUpdate(S, a.__s, C) === !1 || e.__v == n.__v) {
              for (e.__v != n.__v && (a.props = S, a.state = a.__s, a.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(_) {
                _ && (_.__ = e);
              }), H = 0; H < a._sb.length; H++)
                a.__h.push(a._sb[H]);
              a._sb = [], a.__h.length && d.push(a);
              break e;
            }
            a.componentWillUpdate != null && a.componentWillUpdate(S, a.__s, C), k && a.componentDidUpdate != null && a.__h.push(function() {
              a.componentDidUpdate(m, y, x);
            });
          }
          if (a.context = C, a.props = S, a.__P = t, a.__e = !1, $ = g.__r, V = 0, k) {
            for (a.state = a.__s, a.__d = !1, $ && $(e), p = a.render(a.props, a.state, a.context), N = 0; N < a._sb.length; N++)
              a.__h.push(a._sb[N]);
            a._sb = [];
          } else
            do
              a.__d = !1, $ && $(e), p = a.render(a.props, a.state, a.context), a.state = a.__s;
            while (a.__d && ++V < 25);
          a.state = a.__s, a.getChildContext != null && (i = M(M({}, i), a.getChildContext())), k && !b && a.getSnapshotBeforeUpdate != null && (x = a.getSnapshotBeforeUpdate(m, y)), D = p, p != null && p.type === I && p.key == null && (D = Re(p.props.children)), u = xe(t, j(D) ? D : [D], e, n, i, o, s, d, u, h, l), a.base = e.__e, e.__u &= -161, a.__h.length && d.push(a), v && (a.__E = a.__ = null);
        } catch (_) {
          if (e.__v = null, h || s != null)
            if (_.then) {
              for (e.__u |= h ? 160 : 128; u && u.nodeType == 8 && u.nextSibling; )
                u = u.nextSibling;
              s[s.indexOf(u)] = null, e.__e = u;
            } else {
              for (O = s.length; O--; )
                ie(s[O]);
              se(e);
            }
          else
            e.__e = n.__e, e.__k = n.__k, _.then || se(e);
          g.__e(_, e, n);
        }
      else
        s == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : u = e.__e = rt(n.__e, e, n, i, o, s, d, h, l);
    return (p = g.diffed) && p(e), 128 & e.__u ? void 0 : u;
  }
  function se(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(se);
  }
  function Te(t, e, n) {
    for (var i = 0; i < n.length; i++)
      le(n[i], n[++i], n[++i]);
    g.__c && g.__c(e, t), t.some(function(o) {
      try {
        t = o.__h, o.__h = [], t.some(function(s) {
          s.call(o);
        });
      } catch (s) {
        g.__e(s, o.__v);
      }
    });
  }
  function Re(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : j(t) ? t.map(Re) : M({}, t);
  }
  function rt(t, e, n, i, o, s, d, u, h) {
    var l, p, a, b, m, y, x, v = n.props, S = e.props, k = e.type;
    if (k == "svg" ? o = "http://www.w3.org/2000/svg" : k == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), s != null) {
      for (l = 0; l < s.length; l++)
        if ((m = s[l]) && "setAttribute" in m == !!k && (k ? m.localName == k : m.nodeType == 3)) {
          t = m, s[l] = null;
          break;
        }
    }
    if (t == null) {
      if (k == null)
        return document.createTextNode(S);
      t = document.createElementNS(o, k, S.is && S), u && (g.__m && g.__m(e, s), u = !1), s = null;
    }
    if (k == null)
      v === S || u && t.data == S || (t.data = S);
    else {
      if (s = s && E.call(t.childNodes), v = n.props || U, !u && s != null)
        for (v = {}, l = 0; l < t.attributes.length; l++)
          v[(m = t.attributes[l]).name] = m.value;
      for (l in v)
        if (m = v[l], l != "children") {
          if (l == "dangerouslySetInnerHTML")
            a = m;
          else if (!(l in S)) {
            if (l == "value" && "defaultValue" in S || l == "checked" && "defaultChecked" in S)
              continue;
            Q(t, l, null, m, o);
          }
        }
      for (l in S)
        m = S[l], l == "children" ? b = m : l == "dangerouslySetInnerHTML" ? p = m : l == "value" ? y = m : l == "checked" ? x = m : u && typeof m != "function" || v[l] === m || Q(t, l, m, v[l], o);
      if (p)
        u || a && (p.__html == a.__html || p.__html == t.innerHTML) || (t.innerHTML = p.__html), e.__k = [];
      else if (a && (t.innerHTML = ""), xe(e.type == "template" ? t.content : t, j(b) ? b : [b], e, n, i, k == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, d, s ? s[0] : n.__k && W(n, 0), u, h), s != null)
        for (l = s.length; l--; )
          ie(s[l]);
      u || (l = "value", k == "progress" && y == null ? t.removeAttribute("value") : y != null && (y !== t[l] || k == "progress" && !y || k == "option" && y != v[l]) && Q(t, l, y, v[l], o), l = "checked", x != null && x != t[l] && Q(t, l, x, v[l], o));
    }
    return t;
  }
  function le(t, e, n) {
    try {
      if (typeof t == "function") {
        var i = typeof t.__u == "function";
        i && t.__u(), i && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (o) {
      g.__e(o, n);
    }
  }
  function Le(t, e, n) {
    var i, o;
    if (g.unmount && g.unmount(t), (i = t.ref) && (i.current && i.current != t.__e || le(i, null, e)), (i = t.__c) != null) {
      if (i.componentWillUnmount)
        try {
          i.componentWillUnmount();
        } catch (s) {
          g.__e(s, e);
        }
      i.base = i.__P = null;
    }
    if (i = t.__k)
      for (o = 0; o < i.length; o++)
        i[o] && Le(i[o], e, n || typeof t.type != "function");
    n || ie(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function ot(t, e, n) {
    return this.constructor(t, n);
  }
  function st(t, e, n) {
    var i, o, s, d;
    e == document && (e = document.documentElement), g.__ && g.__(t, e), o = (i = typeof n == "function") ? null : n && n.__k || e.__k, s = [], d = [], oe(e, t = (!i && n || e).__k = re(I, null, [t]), o || U, U, e.namespaceURI, !i && n ? [n] : o ? null : e.firstChild ? E.call(e.childNodes) : null, s, !i && n ? n : o ? o.__e : e.firstChild, i, d), Te(s, t, d);
  }
  E = be.slice, g = { __e: function(t, e, n, i) {
    for (var o, s, d; e = e.__; )
      if ((o = e.__c) && !o.__)
        try {
          if ((s = o.constructor) && s.getDerivedStateFromError != null && (o.setState(s.getDerivedStateFromError(t)), d = o.__d), o.componentDidCatch != null && (o.componentDidCatch(t, i || {}), d = o.__d), d)
            return o.__E = o;
        } catch (u) {
          t = u;
        }
    throw t;
  } }, B = 0, P.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = M({}, this.state), typeof t == "function" && (t = t(M({}, n), this.props)), t && M(n, t), t != null && this.__v && (e && this._sb.push(e), ye(this));
  }, P.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), ye(this));
  }, P.prototype.render = I, F = [], _e = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, fe = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, J.__r = 0, me = /(PointerCapture)$|Capture$/i, ee = 0, te = we(!1), ne = we(!0);
  var lt = 0;
  function r(t, e, n, i, o, s) {
    e || (e = {});
    var d, u, h = e;
    if ("ref" in h)
      for (u in h = {}, e)
        u == "ref" ? d = e[u] : h[u] = e[u];
    var l = { type: t, props: h, key: n, ref: d, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --lt, __i: -1, __u: 0, __source: o, __self: s };
    if (typeof t == "function" && (d = t.defaultProps))
      for (u in d)
        h[u] === void 0 && (h[u] = d[u]);
    return g.vnode && g.vnode(l), l;
  }
  var X, w, ae, Ce, de = 0, Ee = [], R = g, Me = R.__b, Pe = R.__r, Ae = R.diffed, Be = R.__c, $e = R.unmount, De = R.__;
  function Fe(t, e) {
    R.__h && R.__h(w, t, de || e), de = 0;
    var n = w.__H || (w.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function A(t) {
    return de = 1, at(He, t);
  }
  function at(t, e, n) {
    var i = Fe(X++, 2);
    if (i.t = t, !i.__c && (i.__ = [n ? n(e) : He(void 0, e), function(u) {
      var h = i.__N ? i.__N[0] : i.__[0], l = i.t(h, u);
      h !== l && (i.__N = [l, i.__[1]], i.__c.setState({}));
    }], i.__c = w, !w.__f)) {
      var o = function(u, h, l) {
        if (!i.__c.__H)
          return !0;
        var p = i.__c.__H.__.filter(function(b) {
          return !!b.__c;
        });
        if (p.every(function(b) {
          return !b.__N;
        }))
          return !s || s.call(this, u, h, l);
        var a = i.__c.props !== u;
        return p.forEach(function(b) {
          if (b.__N) {
            var m = b.__[0];
            b.__ = b.__N, b.__N = void 0, m !== b.__[0] && (a = !0);
          }
        }), s && s.call(this, u, h, l) || a;
      };
      w.__f = !0;
      var s = w.shouldComponentUpdate, d = w.componentWillUpdate;
      w.componentWillUpdate = function(u, h, l) {
        if (this.__e) {
          var p = s;
          s = void 0, o(u, h, l), s = p;
        }
        d && d.call(this, u, h, l);
      }, w.shouldComponentUpdate = o;
    }
    return i.__N || i.__;
  }
  function ce(t, e) {
    var n = Fe(X++, 3);
    !R.__s && ut(n.__H, e) && (n.__ = t, n.u = e, w.__H.__h.push(n));
  }
  function dt() {
    for (var t; t = Ee.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(Z), t.__H.__h.forEach(ue), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], R.__e(e, t.__v);
        }
  }
  R.__b = function(t) {
    w = null, Me && Me(t);
  }, R.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), De && De(t, e);
  }, R.__r = function(t) {
    Pe && Pe(t), X = 0;
    var e = (w = t.__c).__H;
    e && (ae === w ? (e.__h = [], w.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(Z), e.__h.forEach(ue), e.__h = [], X = 0)), ae = w;
  }, R.diffed = function(t) {
    Ae && Ae(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (Ee.push(e) !== 1 && Ce === R.requestAnimationFrame || ((Ce = R.requestAnimationFrame) || ct)(dt)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), ae = w = null;
  }, R.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(Z), n.__h = n.__h.filter(function(i) {
          return !i.__ || ue(i);
        });
      } catch (i) {
        e.some(function(o) {
          o.__h && (o.__h = []);
        }), e = [], R.__e(i, n.__v);
      }
    }), Be && Be(t, e);
  }, R.unmount = function(t) {
    $e && $e(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(i) {
      try {
        Z(i);
      } catch (o) {
        e = o;
      }
    }), n.__H = void 0, e && R.__e(e, n.__v));
  };
  var Ie = typeof requestAnimationFrame == "function";
  function ct(t) {
    var e, n = function() {
      clearTimeout(i), Ie && cancelAnimationFrame(e), setTimeout(t);
    }, i = setTimeout(n, 35);
    Ie && (e = requestAnimationFrame(n));
  }
  function Z(t) {
    var e = w, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), w = e;
  }
  function ue(t) {
    var e = w;
    t.__c = t.__(), w = e;
  }
  function ut(t, e) {
    return !t || t.length !== e.length || e.some(function(n, i) {
      return n !== t[i];
    });
  }
  function He(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function pt(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function Ne(t, e) {
    for (var n in t)
      if (n !== "__source" && !(n in e))
        return !0;
    for (var i in e)
      if (i !== "__source" && t[i] !== e[i])
        return !0;
    return !1;
  }
  function We(t, e) {
    this.props = t, this.context = e;
  }
  (We.prototype = new P()).isPureReactComponent = !0, We.prototype.shouldComponentUpdate = function(t, e) {
    return Ne(this.props, t) || Ne(this.state, e);
  };
  var ze = g.__b;
  g.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), ze && ze(t);
  };
  var ht = g.__e;
  g.__e = function(t, e, n, i) {
    if (t.then) {
      for (var o, s = e; s = s.__; )
        if ((o = s.__c) && o.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), o.__c(t, e);
    }
    ht(t, e, n, i);
  };
  var Oe = g.unmount;
  function Ue(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(i) {
      typeof i.__c == "function" && i.__c();
    }), t.__c.__H = null), (t = pt({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(i) {
      return Ue(i, e, n);
    })), t;
  }
  function je(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(i) {
      return je(i, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function pe() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Ve(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function K() {
    this.i = null, this.l = null;
  }
  g.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), Oe && Oe(t);
  }, (pe.prototype = new P()).__c = function(t, e) {
    var n = e.__c, i = this;
    i.o == null && (i.o = []), i.o.push(n);
    var o = Ve(i.__v), s = !1, d = function() {
      s || (s = !0, n.__R = null, o ? o(u) : u());
    };
    n.__R = d;
    var u = function() {
      if (!--i.__u) {
        if (i.state.__a) {
          var h = i.state.__a;
          i.__v.__k[0] = je(h, h.__c.__P, h.__c.__O);
        }
        var l;
        for (i.setState({ __a: i.__b = null }); l = i.o.pop(); )
          l.forceUpdate();
      }
    };
    i.__u++ || 32 & e.__u || i.setState({ __a: i.__b = i.__v.__k[0] }), t.then(d, d);
  }, pe.prototype.componentWillUnmount = function() {
    this.o = [];
  }, pe.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), i = this.__v.__k[0].__c;
        this.__v.__k[0] = Ue(this.__b, n, i.__O = i.__P);
      }
      this.__b = null;
    }
    var o = e.__a && re(I, null, t.fallback);
    return o && (o.__u &= -33), [re(I, null, e.__a ? null : t.children), o];
  };
  var qe = function(t, e, n) {
    if (++n[1] === n[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size))
      for (n = t.i; n; ) {
        for (; n.length > 3; )
          n.pop()();
        if (n[1] < n[0])
          break;
        t.i = n = n[2];
      }
  };
  (K.prototype = new P()).__a = function(t) {
    var e = this, n = Ve(e.__v), i = e.l.get(t);
    return i[0]++, function(o) {
      var s = function() {
        e.props.revealOrder ? (i.push(o), qe(e, t, i)) : o();
      };
      n ? n(s) : s();
    };
  }, K.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = G(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, K.prototype.componentDidUpdate = K.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      qe(t, n, e);
    });
  };
  var gt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, _t = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ft = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, mt = /[A-Z0-9]/g, bt = typeof document < "u", vt = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function Je(t, e, n) {
    return e.__k == null && (e.textContent = ""), st(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  P.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty(P.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var Ge = g.event;
  function yt() {
  }
  function xt() {
    return this.cancelBubble;
  }
  function St() {
    return this.defaultPrevented;
  }
  g.event = function(t) {
    return Ge && (t = Ge(t)), t.persist = yt, t.isPropagationStopped = xt, t.isDefaultPrevented = St, t.nativeEvent = t;
  };
  var kt = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Qe = g.vnode;
  g.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, i = e.type, o = {}, s = i.indexOf("-") === -1;
      for (var d in n) {
        var u = n[d];
        if (!(d === "value" && "defaultValue" in n && u == null || bt && d === "children" && i === "noscript" || d === "class" || d === "className")) {
          var h = d.toLowerCase();
          d === "defaultValue" && "value" in n && n.value == null ? d = "value" : d === "download" && u === !0 ? u = "" : h === "translate" && u === "no" ? u = !1 : h[0] === "o" && h[1] === "n" ? h === "ondoubleclick" ? d = "ondblclick" : h !== "onchange" || i !== "input" && i !== "textarea" || vt(n.type) ? h === "onfocus" ? d = "onfocusin" : h === "onblur" ? d = "onfocusout" : ft.test(d) && (d = h) : h = d = "oninput" : s && _t.test(d) ? d = d.replace(mt, "-$&").toLowerCase() : u === null && (u = void 0), h === "oninput" && o[d = h] && (d = "oninputCapture"), o[d] = u;
        }
      }
      i == "select" && o.multiple && Array.isArray(o.value) && (o.value = G(n.children).forEach(function(l) {
        l.props.selected = o.value.indexOf(l.props.value) != -1;
      })), i == "select" && o.defaultValue != null && (o.value = G(n.children).forEach(function(l) {
        l.props.selected = o.multiple ? o.defaultValue.indexOf(l.props.value) != -1 : o.defaultValue == l.props.value;
      })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", kt)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), e.props = o;
    }(t), t.$$typeof = gt, Qe && Qe(t);
  };
  var Xe = g.__r;
  g.__r = function(t) {
    Xe && Xe(t), t.__c;
  };
  var Ze = g.diffed;
  g.diffed = function(t) {
    Ze && Ze(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  function wt({ detector: t }) {
    const [e, n] = A({ activeBlocks: 0 }), [i, o] = A(15), [s, d] = A(!1), [u, h] = A(!1), l = window.Blinko.i18n;
    ce(() => {
      const y = () => {
        var S;
        const v = ((S = window.blinkoRTL) == null ? void 0 : S.getStats()) || 0;
        n({ activeBlocks: v });
      };
      y();
      const x = setInterval(y, 1e3);
      return () => clearInterval(x);
    }, []), ce(() => {
      const y = () => {
        const x = window.blinkoRTL;
        if (x) {
          let v;
          if (typeof x.getSettings == "function" ? v = x.getSettings() : typeof x.settings == "function" && (v = x.settings()), v && v.threshold !== void 0 && o(Math.round(v.threshold * 100)), v && v.debugMode !== void 0 && h(v.debugMode), v)
            return !0;
        }
        return !1;
      };
      if (!y()) {
        const x = setInterval(() => {
          y() && clearInterval(x);
        }, 100);
        setTimeout(() => clearInterval(x), 2e3);
      }
    }, []);
    const p = () => {
      var y;
      d(!0), (y = window.blinkoRTL) == null || y.fixSelection(), setTimeout(() => {
        d(!1), window.Blinko.toast.success("Selection processed");
      }, 500);
    }, a = (y) => {
      var v;
      const x = parseInt(y.target.value);
      o(x), (v = window.blinkoRTL) == null || v.setSensitivity(x / 100);
    }, b = (y) => {
      const x = y.target.checked;
      h(x);
      const v = window.blinkoRTL;
      v && v.service && typeof v.service.toggleDebugMode == "function" && v.service.toggleDebugMode();
    };
    return /* @__PURE__ */ r("div", { style: {
      padding: "15px",
      fontFamily: "system-ui, sans-serif",
      width: "300px",
      background: "var(--bg-color, white)",
      color: "var(--text-color, black)"
    }, children: [
      /* @__PURE__ */ r("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px"
      }, children: [
        /* @__PURE__ */ r("h3", { style: { margin: 0, fontSize: "16px" }, children: "RTL Control Center" }),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => {
              var x, v;
              (x = window.blinkoRTL) == null || x.toggle();
              const y = (v = window.blinkoRTL) == null ? void 0 : v.isEnabled();
              window.Blinko.toast.success(
                y ? l.t("rtl_enabled") : l.t("rtl_disabled")
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
      /* @__PURE__ */ r("div", { style: {
        background: "#f8f9fa",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "15px",
        textAlign: "center",
        borderLeft: "4px solid #007bff"
      }, children: [
        /* @__PURE__ */ r("div", { style: { fontSize: "24px", fontWeight: "bold", color: "#007bff" }, children: e.activeBlocks }),
        /* @__PURE__ */ r("div", { style: { fontSize: "12px", color: "#666" }, children: "Active RTL Blocks" })
      ] }),
      /* @__PURE__ */ r("div", { style: { marginBottom: "20px" }, children: /* @__PURE__ */ r(
        "button",
        {
          onClick: p,
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
          children: s ? "Processing..." : /* @__PURE__ */ r(I, { children: [
            /* @__PURE__ */ r("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) }),
            "Fix Selected Text"
          ] })
        }
      ) }),
      /* @__PURE__ */ r("div", { style: { marginBottom: "15px" }, children: [
        /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px" }, children: [
          /* @__PURE__ */ r(
            "input",
            {
              type: "checkbox",
              checked: u,
              onChange: b,
              style: { marginInlineEnd: "8px" }
            }
          ),
          "Enable Visual Debugger"
        ] }),
        /* @__PURE__ */ r("div", { style: { fontSize: "10px", color: "#888", marginInlineStart: "20px", marginTop: "2px" }, children: "Highlights RTL (Red) and LTR (Blue) blocks" })
      ] }),
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ r("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }, children: [
          /* @__PURE__ */ r("strong", { children: "Detection Sensitivity" }),
          /* @__PURE__ */ r("span", { style: { color: "#007bff" }, children: [
            i,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ r(
          "input",
          {
            type: "range",
            min: "1",
            max: "50",
            value: i,
            onChange: a,
            style: { width: "100%", cursor: "pointer" }
          }
        ),
        /* @__PURE__ */ r("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#999", marginTop: "4px" }, children: [
          /* @__PURE__ */ r("span", { children: "More Sensitive (1%)" }),
          /* @__PURE__ */ r("span", { children: "Less Sensitive (50%)" })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { style: { marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #eee", fontSize: "11px", color: "#888", textAlign: "center" }, children: "Click 'Fix Selected' to force detection on specific text." }),
      /* @__PURE__ */ r("div", { style: { marginTop: "5px", fontSize: "10px", color: "#aaa", textAlign: "center" }, children: [
        "v",
        "1.0.11"
      ] })
    ] });
  }
  const z = [
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
  ], Y = [
    "inherit",
    "Arial",
    "Arial Hebrew",
    "David",
    "Miriam",
    "Segoe UI",
    "Tahoma"
  ];
  function Tt() {
    var L, C, H, $, V, N, D, O;
    const [t, e] = A({
      enabled: !0,
      sensitivity: "medium",
      threshold: 0.15,
      forceDirection: "auto",
      autoDetect: !1,
      manualMode: !0,
      manualToggle: !1,
      mobileView: !1,
      darkMode: !1,
      method: "all",
      customCSS: "",
      permanentCSS: !1,
      visualStyles: {
        fontFamily: "inherit",
        lineHeight: 1.5,
        paragraphMargin: 1
      },
      targetSelectors: [
        ".markdown-body p",
        ".vditor-reset p",
        "textarea",
        "[contenteditable]"
      ],
      minRTLChars: 3,
      processInterval: 2e3,
      hebrewRegex: !0,
      arabicRegex: !0,
      mixedContent: !0,
      savedPresets: []
    }), [n, i] = A(""), [o, s] = A(""), [d, u] = A(""), [h, l] = A("");
    window.Blinko.i18n, ce(() => {
      var _;
      const c = (_ = window.blinkoRTL) == null ? void 0 : _.settings();
      if (c)
        e(c);
      else {
        const T = localStorage.getItem("blinko-rtl-settings");
        if (T)
          try {
            const he = JSON.parse(T);
            e((It) => ({ ...It, ...he }));
          } catch (he) {
            console.error("Failed to load RTL plugin settings:", he);
          }
      }
    }, []);
    const p = (c) => {
      var T;
      const _ = { ...t, ...c };
      e(_), (T = window.blinkoRTL) != null && T.service ? window.blinkoRTL.service.updateSettings(c) : (localStorage.setItem("blinko-rtl-settings", JSON.stringify(_)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: _
        })
      )), window.Blinko.toast.success("Settings saved!");
    }, a = () => {
      var _;
      if (!o.trim())
        return;
      const c = (_ = window.blinkoRTL) == null ? void 0 : _.test(o);
      u(c ? "RTL" : "LTR");
    }, b = () => {
      var c;
      (c = window.blinkoRTL) == null || c.processAll(), window.Blinko.toast.success("Content processed!");
    }, m = () => {
      n.trim() && !t.targetSelectors.includes(n.trim()) && (p({
        targetSelectors: [...t.targetSelectors, n.trim()]
      }), i(""));
    }, y = (c) => {
      p({
        targetSelectors: t.targetSelectors.filter((_) => _ !== c)
      });
    }, x = () => {
      if (!h)
        return;
      const _ = [...z, ...t.savedPresets || []].find((T) => T.id === h);
      _ && (p({ customCSS: _.css }), window.Blinko.toast.success(`Preset "${_.name}" loaded!`));
    }, v = () => {
      const c = prompt("Enter a name for this CSS preset:");
      if (!c)
        return;
      const _ = {
        id: `custom-${Date.now()}`,
        name: c,
        css: t.customCSS,
        isBuiltIn: !1
      };
      p({
        savedPresets: [...t.savedPresets || [], _]
      }), l(_.id);
    }, S = () => {
      if (!h)
        return;
      if (z.some((_) => _.id === h)) {
        window.Blinko.toast.error("Cannot delete built-in presets.");
        return;
      }
      confirm("Are you sure you want to delete this preset?") && (p({
        savedPresets: (t.savedPresets || []).filter((_) => _.id !== h)
      }), l(""));
    }, k = () => {
      const c = {
        enabled: !0,
        sensitivity: "medium",
        threshold: 0.15,
        forceDirection: "auto",
        autoDetect: !1,
        manualMode: !0,
        manualToggle: !1,
        darkMode: !1,
        method: "all",
        customCSS: "",
        permanentCSS: !1,
        visualStyles: {
          fontFamily: "inherit",
          lineHeight: 1.5,
          paragraphMargin: 1
        },
        targetSelectors: [
          ".markdown-body p",
          ".vditor-reset p",
          "textarea",
          "[contenteditable]"
        ],
        minRTLChars: 3,
        processInterval: 2e3,
        hebrewRegex: !0,
        arabicRegex: !0,
        mixedContent: !0,
        savedPresets: t.savedPresets || []
      };
      p(c);
    };
    return [...z, ...t.savedPresets || []], /* @__PURE__ */ r(
      "div",
      {
        className: t.darkMode ? "rtl-settings-dark" : "",
        style: {
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "system-ui, sans-serif",
          background: t.darkMode ? "#1a1a1a" : "white",
          color: "#000"
        },
        children: [
          /* @__PURE__ */ r("div", { style: { marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #eee" }, children: [
            /* @__PURE__ */ r("h2", { style: { margin: "0 0 10px 0", color: "#333" }, children: "🔧 Fixed RTL Language Support Settings" }),
            /* @__PURE__ */ r("p", { style: { margin: "0", color: t.darkMode ? "#333" : "#666", fontSize: "14px" }, children: "Precise RTL support with manual control and optional permanent CSS injection." })
          ] }),
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #007bff",
            borderRadius: "8px",
            background: "#f8f9ff"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#007bff" }, children: "⚡ Quick Actions" }),
            /* @__PURE__ */ r("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: b,
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
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => {
                    var c;
                    (c = window.blinkoRTL) == null || c.toggle(), window.Blinko.toast.success("RTL toggled!");
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
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => {
                    var _;
                    const c = (_ = window.blinkoRTL) == null ? void 0 : _.toggleManual();
                    e((T) => ({ ...T, manualToggle: c })), window.Blinko.toast.success(`Manual RTL ${c ? "ON" : "OFF"}`);
                  },
                  style: {
                    background: t.manualToggle ? "#28a745" : "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  },
                  children: [
                    "🔄 Manual Toggle ",
                    t.manualToggle ? "ON" : "OFF"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #28a745",
            borderRadius: "8px",
            background: "#f8fff8"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "🔧 RTL Application Method" }),
            /* @__PURE__ */ r("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
              "RTL Method:",
              /* @__PURE__ */ r(
                "select",
                {
                  value: t.method,
                  onChange: (c) => p({
                    method: c.target.value
                  }),
                  disabled: !t.enabled,
                  style: {
                    marginLeft: "auto",
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    minWidth: "200px"
                  },
                  children: [
                    /* @__PURE__ */ r("option", { value: "direct", children: "🎯 Direct Styling" }),
                    /* @__PURE__ */ r("option", { value: "attributes", children: "🏷️ HTML Attributes" }),
                    /* @__PURE__ */ r("option", { value: "css", children: "🎨 CSS Classes" }),
                    /* @__PURE__ */ r("option", { value: "unicode", children: "🔤 Unicode Bidi" }),
                    /* @__PURE__ */ r("option", { value: "all", children: "🚀 All Methods (Recommended)" })
                  ]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎛️ Mode Settings" }),
            /* @__PURE__ */ r("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enabled,
                    onChange: (c) => p({ enabled: c.target.checked })
                  }
                ),
                /* @__PURE__ */ r("span", { children: "🔧 Enable RTL Support" })
              ] }),
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualMode,
                    onChange: (c) => p({ manualMode: c.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ r("span", { children: "✋ Manual Mode (Recommended)" })
              ] }),
              /* @__PURE__ */ r("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Manual mode only applies RTL when clearly detected, preventing unwanted changes" }),
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.mobileView,
                    onChange: (c) => p({ mobileView: c.target.checked })
                  }
                ),
                /* @__PURE__ */ r("span", { children: "📱 Mobile View" })
              ] }),
              /* @__PURE__ */ r("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Optimizes layout for mobile devices" }),
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.autoDetect,
                    onChange: (c) => p({ autoDetect: c.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ r("span", { children: "🤖 Auto-detect All Content" })
              ] }),
              /* @__PURE__ */ r("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Continuously processes all content on the page every 2 seconds" }),
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualToggle,
                    onChange: (c) => {
                      const _ = c.target.checked;
                      p({ manualToggle: _ });
                      const T = window.blinkoRTL;
                      T && T.isEnabled() && T.processAll();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ r("span", { children: "🔄 Manual RTL Toggle" })
              ] }),
              /* @__PURE__ */ r("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Forces RTL on all content when enabled, ignores detection" }),
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.darkMode,
                    onChange: (c) => {
                      const _ = c.target.checked;
                      p({ darkMode: _ }), _ ? document.body.classList.add("dark") : document.body.classList.remove("dark");
                    }
                  }
                ),
                /* @__PURE__ */ r("span", { children: "🌙 Dark Mode Plugin UI" })
              ] }),
              /* @__PURE__ */ r("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#333" : "#666" }, children: "Applies dark styling to RTL plugin components only" }),
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.hebrewRegex,
                    onChange: (c) => p({ hebrewRegex: c.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ r("span", { children: "📜 Hebrew Regex Detection" })
              ] }),
              /* @__PURE__ */ r("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#333" : "#666" }, children: "Uses Unicode Script property for Hebrew detection" }),
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.arabicRegex,
                    onChange: (c) => p({ arabicRegex: c.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ r("span", { children: "📜 Arabic Regex Detection" })
              ] }),
              /* @__PURE__ */ r("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Applies dark styling to RTL plugin components only" })
            ] })
          ] }),
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #6610f2",
            borderRadius: "8px",
            background: "#f8f9ff"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#6610f2" }, children: "🎨 Visual Style Editor" }),
            /* @__PURE__ */ r("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
              /* @__PURE__ */ r("div", { children: [
                /* @__PURE__ */ r("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px" }, children: "Font Family:" }),
                /* @__PURE__ */ r("div", { style: { display: "flex", gap: "10px" }, children: [
                  /* @__PURE__ */ r(
                    "select",
                    {
                      value: Y.includes(((L = t.visualStyles) == null ? void 0 : L.fontFamily) || "inherit") ? ((C = t.visualStyles) == null ? void 0 : C.fontFamily) || "inherit" : "custom",
                      onChange: (c) => {
                        var T;
                        const _ = c.target.value;
                        _ === "custom" ? Y.includes(((T = t.visualStyles) == null ? void 0 : T.fontFamily) || "inherit") && p({
                          visualStyles: {
                            ...t.visualStyles,
                            fontFamily: ""
                          }
                        }) : p({
                          visualStyles: {
                            ...t.visualStyles,
                            fontFamily: _
                          }
                        });
                      },
                      disabled: !t.enabled,
                      style: {
                        flex: 1,
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                      },
                      children: [
                        Y.map((c) => /* @__PURE__ */ r("option", { value: c, children: c === "inherit" ? "Default (Inherit)" : c }, c)),
                        /* @__PURE__ */ r("option", { value: "custom", children: "Custom..." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ r(
                    "input",
                    {
                      type: "text",
                      value: ((H = t.visualStyles) == null ? void 0 : H.fontFamily) || "",
                      onChange: (c) => p({
                        visualStyles: {
                          ...t.visualStyles,
                          fontFamily: c.target.value
                        }
                      }),
                      placeholder: "Custom font name",
                      disabled: !t.enabled,
                      style: {
                        flex: 1,
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        display: Y.includes((($ = t.visualStyles) == null ? void 0 : $.fontFamily) || "inherit") ? "none" : "block"
                      }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ r("div", { children: [
                /* @__PURE__ */ r("label", { style: { display: "flex", justifyContent: "space-between", fontWeight: "500", marginBottom: "8px" }, children: [
                  /* @__PURE__ */ r("span", { children: "Line Height:" }),
                  /* @__PURE__ */ r("span", { children: ((V = t.visualStyles) == null ? void 0 : V.lineHeight) || 1.5 })
                ] }),
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "range",
                    min: "1.0",
                    max: "3.0",
                    step: "0.1",
                    value: ((N = t.visualStyles) == null ? void 0 : N.lineHeight) || 1.5,
                    onChange: (c) => p({
                      visualStyles: {
                        ...t.visualStyles,
                        lineHeight: parseFloat(c.target.value)
                      }
                    }),
                    disabled: !t.enabled,
                    style: { width: "100%" }
                  }
                )
              ] }),
              /* @__PURE__ */ r("div", { children: [
                /* @__PURE__ */ r("label", { style: { display: "flex", justifyContent: "space-between", fontWeight: "500", marginBottom: "8px" }, children: [
                  /* @__PURE__ */ r("span", { children: "Paragraph Spacing (em):" }),
                  /* @__PURE__ */ r("span", { children: [
                    ((D = t.visualStyles) == null ? void 0 : D.paragraphMargin) || 1,
                    "em"
                  ] })
                ] }),
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "range",
                    min: "0",
                    max: "3.0",
                    step: "0.1",
                    value: ((O = t.visualStyles) == null ? void 0 : O.paragraphMargin) || 1,
                    onChange: (c) => p({
                      visualStyles: {
                        ...t.visualStyles,
                        paragraphMargin: parseFloat(c.target.value)
                      }
                    }),
                    disabled: !t.enabled,
                    style: { width: "100%" }
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎯 Detection Settings" }),
            /* @__PURE__ */ r("div", { style: { display: "flex", flexDirection: "column", gap: "15px" }, children: [
              /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r("label", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Detection Sensitivity:",
                /* @__PURE__ */ r("div", { style: { marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", width: "100%", maxWidth: "300px" }, children: [
                  /* @__PURE__ */ r("div", { style: { display: "flex", alignItems: "center", gap: "10px", width: "100%", justifyContent: "flex-end" }, children: [
                    /* @__PURE__ */ r("span", { style: { fontSize: "12px", color: "#666" }, children: [
                      Math.round((t.threshold || 0.15) * 100),
                      "%"
                    ] }),
                    /* @__PURE__ */ r(
                      "input",
                      {
                        type: "range",
                        min: "1",
                        max: "50",
                        value: Math.round((t.threshold || 0.15) * 100),
                        onChange: (c) => {
                          const _ = parseInt(c.target.value) / 100;
                          let T = "medium";
                          _ < 0.12 ? T = "high" : _ > 0.3 && (T = "low"), p({ threshold: _, sensitivity: T });
                        },
                        disabled: !t.enabled,
                        style: { width: "150px" }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r(
                    "select",
                    {
                      value: t.sensitivity,
                      onChange: (c) => {
                        const _ = c.target.value;
                        p({ sensitivity: _, threshold: {
                          high: 0.1,
                          // 10% RTL chars
                          medium: 0.15,
                          // 15% RTL chars
                          low: 0.4
                          // 40% RTL chars
                        }[_] });
                      },
                      disabled: !t.enabled,
                      style: {
                        padding: "5px 10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        minWidth: "200px"
                      },
                      children: [
                        /* @__PURE__ */ r("option", { value: "high", children: "🔥 High - 10% RTL characters" }),
                        /* @__PURE__ */ r("option", { value: "medium", children: "⚖️ Medium - 15% RTL characters" }),
                        /* @__PURE__ */ r("option", { value: "low", children: "🎯 Low - 40% RTL characters" })
                      ]
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Min RTL Characters:",
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    max: "20",
                    value: t.minRTLChars,
                    onChange: (c) => p({ minRTLChars: parseInt(c.target.value) }),
                    disabled: !t.enabled,
                    style: {
                      marginLeft: "auto",
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      width: "80px"
                    }
                  }
                )
              ] }) }),
              /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Process Interval (ms):",
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "number",
                    min: "500",
                    max: "10000",
                    step: "500",
                    value: t.processInterval,
                    onChange: (c) => p({ processInterval: parseInt(c.target.value) }),
                    disabled: !t.enabled,
                    style: {
                      marginLeft: "auto",
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      width: "100px"
                    }
                  }
                )
              ] }) }),
              /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Direction Override:",
                /* @__PURE__ */ r(
                  "select",
                  {
                    value: t.forceDirection,
                    onChange: (c) => p({
                      forceDirection: c.target.value
                    }),
                    disabled: !t.enabled,
                    style: {
                      marginLeft: "auto",
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      minWidth: "200px"
                    },
                    children: [
                      /* @__PURE__ */ r("option", { value: "auto", children: "🤖 Auto-detect" }),
                      /* @__PURE__ */ r("option", { value: "rtl", children: "➡️ Force RTL" }),
                      /* @__PURE__ */ r("option", { value: "ltr", children: "⬅️ Force LTR" })
                    ]
                  }
                )
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #28a745",
            borderRadius: "8px",
            background: "#f8fff8"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "🎨 Permanent CSS Settings" }),
            /* @__PURE__ */ r("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ r("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.permanentCSS,
                    onChange: (c) => p({ permanentCSS: c.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ r("span", { children: "📌 Enable Permanent CSS Injection" })
              ] }),
              /* @__PURE__ */ r("p", { style: { margin: "5px 0 0 30px", fontSize: "12px", color: "#666" }, children: "CSS will remain active even when RTL is disabled" })
            ] }),
            /* @__PURE__ */ r("div", { style: { marginBottom: "15px", padding: "15px", background: "rgba(0,0,0,0.03)", borderRadius: "6px" }, children: [
              /* @__PURE__ */ r("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px" }, children: "📚 CSS Presets:" }),
              /* @__PURE__ */ r("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
                /* @__PURE__ */ r(
                  "select",
                  {
                    value: h,
                    onChange: (c) => l(c.target.value),
                    disabled: !t.enabled,
                    style: {
                      flex: 1,
                      padding: "8px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      minWidth: "200px"
                    },
                    children: [
                      /* @__PURE__ */ r("option", { value: "", children: "-- Select a Preset --" }),
                      /* @__PURE__ */ r("optgroup", { label: "Built-in Presets", children: z.map((c) => /* @__PURE__ */ r("option", { value: c.id, children: c.name }, c.id)) }),
                      t.savedPresets && t.savedPresets.length > 0 && /* @__PURE__ */ r("optgroup", { label: "Saved Presets", children: t.savedPresets.map((c) => /* @__PURE__ */ r("option", { value: c.id, children: c.name }, c.id)) })
                    ]
                  }
                ),
                /* @__PURE__ */ r(
                  "button",
                  {
                    onClick: x,
                    disabled: !t.enabled || !h,
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
                /* @__PURE__ */ r(
                  "button",
                  {
                    onClick: S,
                    disabled: !t.enabled || !h || z.some((c) => c.id === h),
                    style: {
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      opacity: z.some((c) => c.id === h) ? 0.5 : 1
                    },
                    title: "Delete selected preset (Built-in presets cannot be deleted)",
                    children: "🗑️"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ r("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ r("label", { style: { display: "block", fontWeight: "500", marginBottom: "5px" }, children: "Custom CSS Code:" }),
              /* @__PURE__ */ r(
                "textarea",
                {
                  value: t.customCSS,
                  onChange: (c) => p({ customCSS: c.target.value }),
                  placeholder: "Enter your custom CSS code here...",
                  disabled: !t.enabled,
                  style: {
                    width: "100%",
                    height: "200px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                    fontSize: "13px",
                    resize: "vertical"
                  }
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: v,
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
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => p({ customCSS: "" }),
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
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎯 Target Selectors" }),
            /* @__PURE__ */ r("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#333" : "#666" }, children: "Specific elements to process for RTL detection (focused approach)" }),
            /* @__PURE__ */ r("div", { style: { marginBottom: "15px", maxHeight: "150px", overflowY: "auto" }, children: t.targetSelectors.map((c, _) => /* @__PURE__ */ r("div", { style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              marginBottom: "5px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }, children: [
              /* @__PURE__ */ r("code", { style: {
                fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                fontSize: "13px",
                color: "#333",
                flex: 1
              }, children: c }),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => y(c),
                  disabled: !t.enabled,
                  style: {
                    background: "#ff4757",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    fontSize: "16px",
                    lineHeight: "1",
                    marginLeft: "10px"
                  },
                  children: "×"
                }
              )
            ] }, _)) }),
            /* @__PURE__ */ r("div", { style: { display: "flex", gap: "10px" }, children: [
              /* @__PURE__ */ r(
                "input",
                {
                  type: "text",
                  value: n,
                  onChange: (c) => i(c.target.value),
                  placeholder: "e.g., .markdown-body p, .vditor-reset div",
                  disabled: !t.enabled,
                  onKeyPress: (c) => c.key === "Enter" && m(),
                  style: {
                    flex: "1",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: m,
                  disabled: !t.enabled || !n.trim(),
                  style: {
                    padding: "8px 16px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  },
                  children: "Add"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🧪 Test RTL Detection" }),
            /* @__PURE__ */ r("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ r(
              "textarea",
              {
                value: o,
                onChange: (c) => s(c.target.value),
                placeholder: "Enter text to test RTL detection...",
                style: {
                  width: "100%",
                  height: "80px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  resize: "vertical",
                  fontFamily: "inherit"
                }
              }
            ) }),
            /* @__PURE__ */ r("div", { style: { display: "flex", gap: "10px", marginBottom: "15px" }, children: /* @__PURE__ */ r(
              "button",
              {
                onClick: a,
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
            d && /* @__PURE__ */ r("div", { style: {
              padding: "10px",
              background: d === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${d === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ r("strong", { children: d === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
            ] }),
            /* @__PURE__ */ r("div", { style: { fontSize: "14px", color: t.darkMode ? "#333" : "#666", lineHeight: "1.6" }, children: [
              /* @__PURE__ */ r("strong", { children: "🧪 Test Examples:" }),
              /* @__PURE__ */ r("br", {}),
              /* @__PURE__ */ r("strong", { children: "Hebrew:" }),
              " שלום עולם - זהו טקסט בעברית",
              /* @__PURE__ */ r("br", {}),
              /* @__PURE__ */ r("strong", { children: "Arabic:" }),
              " مرحبا بالعالم - هذا نص باللغة العربية",
              /* @__PURE__ */ r("br", {}),
              /* @__PURE__ */ r("strong", { children: "English:" }),
              " Hello world - this is English text"
            ] })
          ] }),
          /* @__PURE__ */ r("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ r("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🔧 Advanced Actions" }),
            /* @__PURE__ */ r("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: k,
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
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const c = JSON.stringify(t, null, 2);
                    navigator.clipboard.writeText(c), window.Blinko.toast.success("Settings copied to clipboard");
                  },
                  style: {
                    padding: "10px 20px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  },
                  children: "📋 Export Settings"
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
  const Ke = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "1.0.11",
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
  class Rt {
    constructor(e = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      f(this, "name", "CharacterCode");
      f(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      f(this, "RTL_RANGES", [
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
        [2208, 2303]
        // Arabic Extended-A
      ]);
      this.config = e;
    }
    /**
     * Check if a character is RTL
     */
    isRTLChar(e) {
      const n = e.charCodeAt(0);
      return this.RTL_RANGES.some(([i, o]) => n >= i && n <= o);
    }
    /**
     * Detect RTL content in text
     */
    detect(e) {
      if (!e || e.length === 0)
        return !1;
      const n = e.substring(0, this.config.sampleSize);
      let i = 0, o = 0;
      for (const u of n)
        /\s|[.,!?;:()[\]{}]/.test(u) || (o++, this.isRTLChar(u) && i++);
      return i < this.config.minRTLChars ? !1 : (o > 0 ? i / o : 0) >= {
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
  class Lt {
    constructor(e = !0, n = !0, i = 0.3, o = 3) {
      f(this, "name", "Regex");
      // Hebrew regex range: 0590-05FF, FB1D-FB4F (Presentation forms A), FB50-FBB1 (Presentation forms B - wait, that's Arabic)
      // Hebrew: \u0590-\u05FF
      f(this, "hebrewPattern", "\\u0590-\\u05FF");
      // Arabic regex range
      f(this, "arabicPattern", "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF");
      f(this, "checkHebrew");
      f(this, "checkArabic");
      f(this, "threshold");
      // Ratio 0.0 - 1.0
      f(this, "minRTLChars", 3);
      this.checkHebrew = e, this.checkArabic = n, this.threshold = i, this.minRTLChars = o;
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
      const i = new RegExp(`[${n.join("")}]`, "g"), o = e.match(i);
      if (!o)
        return !1;
      const s = o.length;
      if (s < this.minRTLChars)
        return e.trim().length >= this.minRTLChars, !1;
      const d = e.length;
      return d === 0 ? !1 : s / d > this.threshold;
    }
  }
  class Ye {
    constructor(e) {
      f(this, "name", "Combined");
      f(this, "strategies");
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
  class Ct {
    constructor(e = {}) {
      f(this, "strategy");
      f(this, "charCodeStrategy");
      f(this, "regexStrategy");
      f(this, "config");
      this.config = {
        sensitivity: "medium",
        minRTLChars: 3,
        sampleSize: 100,
        ...e
      }, this.charCodeStrategy = new Rt(this.config), this.regexStrategy = new Lt(!0, !0, 0.3, this.config.minRTLChars), this.strategy = new Ye([
        this.charCodeStrategy,
        this.regexStrategy
      ]);
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
          this.strategy = new Ye([
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
      this.charCodeStrategy.updateConfig(e), this.regexStrategy.updateConfig({ minRTLChars: e.minRTLChars }), this.config = { ...this.config, ...e };
    }
  }
  const Et = `
/* Method 1: Direct RTL styling */
.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: embed !important;
}

.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: embed !important;
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

/* Method 4: CSS content detection */
p:has-text(/[֐-׿؀-ۿ]/),
div:has-text(/[֐-׿؀-ۿ]/) {
    direction: rtl !important;
    text-align: right !important;
}

/* Method 5: Comprehensive element targeting */
.markdown-body p, .markdown-body div, .markdown-body span,
.vditor-reset p, .vditor-reset div, .vditor-reset span,
.card-masonry-grid p, .card-masonry-grid div,
textarea, [contenteditable], input[type="text"] {
    unicode-bidi: plaintext !important;
}

/* RTL Toggle Button */
.rtl-toggle-btn {
    position: fixed;
    top: 20px;
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
    color: #000 !important;
}

.rtl-settings-dark input, .rtl-settings-dark select, .rtl-settings-dark textarea {
    background: #333 !important;
    color: #000 !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark button {
    background: #333 !important;
    color: #000 !important;
    border: 1px solid #555 !important;
}

.rtl-settings-dark h2, .rtl-settings-dark h3, .rtl-settings-dark h4,
.rtl-settings-dark p, .rtl-settings-dark span, .rtl-settings-dark label {
    color: #000 !important;
}

.rtl-settings-dark code {
    background: #2a2a2a !important;
    color: #000 !important;
}

.rtl-settings-dark small {
    color: #333 !important;
}

/* Layout preservation */
#page-wrap, #page-wrap > div, #page-wrap > header,
.flex, .grid, header, nav, .sidebar, .toolbar, button, .btn {
    direction: ltr !important;
    unicode-bidi: isolate !important;
}
`;
  function et(t, e, n = !1) {
    let i = null;
    return function(...o) {
      const s = this, d = function() {
        i = null, n || t.apply(s, o);
      }, u = n && !i;
      i && clearTimeout(i), i = setTimeout(d, e), u && t.apply(s, o);
    };
  }
  class Mt {
    constructor(e) {
      f(this, "detector");
      f(this, "isEnabled", !1);
      f(this, "activeToast", null);
      f(this, "handlePaste", (e) => {
        var o;
        if (!this.isEnabled)
          return;
        const n = e.target;
        if (!this.isEditable(n))
          return;
        const i = (o = e.clipboardData) == null ? void 0 : o.getData("text/plain");
        i && this.detectMixedContent(i) && (e.preventDefault(), e.stopPropagation(), this.showSuggestionToast(i, n));
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
      const n = (e.match(/[\u0590-\u05FF\u0600-\u06FF]/g) || []).length, i = (e.match(/[a-zA-Z]/g) || []).length;
      return n > 3 && i > 3;
    }
    showSuggestionToast(e, n) {
      var o, s, d, u;
      this.removeToast();
      const i = document.createElement("div");
      i.className = "rtl-paste-toast", i.innerHTML = `
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
    `, Object.assign(i.style, {
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
      }), document.body.appendChild(i), this.activeToast = i, (o = i.querySelector("#rtl-btn-split")) == null || o.addEventListener("click", () => {
        this.insertText(n, this.processSplit(e)), this.removeToast();
      }), (s = i.querySelector("#rtl-btn-wrap")) == null || s.addEventListener("click", () => {
        this.insertText(n, this.processWrap(e)), this.removeToast();
      }), (d = i.querySelector("#rtl-btn-original")) == null || d.addEventListener("click", () => {
        this.insertText(n, e), this.removeToast();
      }), (u = i.querySelector(".rtl-toast-close")) == null || u.addEventListener("click", () => {
        this.removeToast();
      });
    }
    removeToast() {
      this.activeToast && (this.activeToast.remove(), this.activeToast = null);
    }
    insertText(e, n) {
      if (e.tagName === "TEXTAREA" || e.tagName === "INPUT") {
        const i = e, o = i.selectionStart || 0, s = i.selectionEnd || 0;
        i.value = i.value.substring(0, o) + n + i.value.substring(s), i.selectionStart = i.selectionEnd = o + n.length, i.dispatchEvent(new Event("input", { bubbles: !0 }));
      } else if (e.focus(), !document.execCommand("insertText", !1, n)) {
        const o = window.getSelection();
        if (o && o.rangeCount > 0) {
          const s = o.getRangeAt(0);
          s.deleteContents(), s.insertNode(document.createTextNode(n)), s.collapse(!1);
        }
      }
    }
    processSplit(e) {
      const n = /([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g;
      let i = e.replace(n, (o) => `
${o}
`);
      return i = i.replace(/\n{3,}/g, `

`).trim(), i;
    }
    processWrap(e) {
      const n = "⁧", i = "⁩";
      return e.replace(/([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g, `${n}$1${i}`);
    }
  }
  class Pt {
    constructor(e) {
      f(this, "button", null);
      f(this, "currentTarget", null);
      f(this, "hideTimeout", null);
      f(this, "options");
      f(this, "isHoveringButton", !1);
      f(this, "styleElement", null);
      f(this, "onMouseOver", (e) => {
        if (!this.options.isEnabled())
          return;
        const i = e.target.closest(this.options.selectors.join(","));
        i && this.showButton(i);
      });
      f(this, "onMouseOut", (e) => {
        this.scheduleHide();
      });
      f(this, "hideButton", () => {
        var e;
        (e = this.button) == null || e.classList.remove("visible");
      });
      f(this, "onButtonClick", (e) => {
        if (e.stopPropagation(), !this.currentTarget)
          return;
        const n = this.currentTarget.getAttribute("data-manual-dir"), o = window.getComputedStyle(this.currentTarget).direction === "rtl";
        let s = "ltr";
        n === "ltr" ? s = "rtl" : n === "rtl" ? s = "ltr" : s = o ? "ltr" : "rtl", this.currentTarget.setAttribute("data-manual-dir", s), this.options.processElement(this.currentTarget);
      });
      this.options = e;
    }
    init() {
      this.createButton(), document.addEventListener("mouseover", this.onMouseOver), document.addEventListener("mouseout", this.onMouseOut), document.addEventListener("scroll", this.hideButton, { capture: !0, passive: !0 });
    }
    destroy() {
      this.button && (this.button.remove(), this.button = null), document.removeEventListener("mouseover", this.onMouseOver), document.removeEventListener("mouseout", this.onMouseOut), document.removeEventListener("scroll", this.hideButton);
    }
    createButton() {
      this.button || (this.button = document.createElement("div"), this.button.className = "rtl-hover-action-btn", this.button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 9h16"/><path d="M4 9l4-4"/><path d="M20 9l-4 4"/>
        <path d="M20 15H4"/><path d="M20 15l-4 4"/><path d="M4 15l4-4"/>
      </svg>
    `, this.button.title = "Flip Direction", this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .rtl-hover-action-btn {
        position: fixed;
        z-index: 10000;
        background: var(--bg-card, #fff);
        border: 1px solid var(--border-color, #ddd);
        border-radius: 4px;
        padding: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
        transform: scale(0.9);
        color: var(--text-color, #333);
      }
      .rtl-hover-action-btn.visible {
        opacity: 1;
        pointer-events: auto;
        transform: scale(1);
      }
      .rtl-hover-action-btn:hover {
        background: var(--bg-hover, #f5f5f5);
        color: var(--primary-color, #0066cc);
      }
    `, document.head.appendChild(this.styleElement), document.body.appendChild(this.button), this.button.addEventListener("click", this.onButtonClick), this.button.addEventListener("mouseenter", () => {
        this.isHoveringButton = !0;
      }), this.button.addEventListener("mouseleave", () => {
        this.isHoveringButton = !1, this.scheduleHide();
      }));
    }
    showButton(e) {
      var n, i;
      this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = null), !(this.currentTarget === e && ((n = this.button) != null && n.classList.contains("visible"))) && (this.currentTarget = e, this.updateButtonPosition(), (i = this.button) == null || i.classList.add("visible"));
    }
    scheduleHide() {
      this.hideTimeout && clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout(() => {
        this.isHoveringButton || this.hideButton();
      }, 300);
    }
    updateButtonPosition() {
      if (!this.button || !this.currentTarget)
        return;
      const e = this.currentTarget.getBoundingClientRect();
      this.button.getBoundingClientRect(), e.top, this.button.style.top = e.top + 2 + "px", this.button.style.left = e.right - 30 + "px";
    }
  }
  class At {
    constructor(e) {
      f(this, "detector");
      f(this, "isRTLEnabled", !1);
      f(this, "styleElement", null);
      f(this, "permanentStyleElement", null);
      f(this, "observer", null);
      f(this, "autoProcessInterval", null);
      // Managers
      f(this, "pasteInterceptor");
      f(this, "hoverManager", null);
      // Optimizations
      f(this, "pendingElements", /* @__PURE__ */ new Set());
      f(this, "debouncedProcessQueue");
      f(this, "debouncedProcessAll");
      // Hebrew regex from userscript
      f(this, "hebrewRegex", /\p{Script=Hebrew}/u);
      f(this, "arabicRegex", /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/);
      f(this, "settings", {
        enabled: !1,
        sensitivity: "medium",
        forceDirection: "auto",
        autoDetect: !0,
        manualMode: !1,
        manualToggle: !1,
        darkMode: !1,
        method: "all",
        customCSS: "",
        permanentCSS: !1,
        targetSelectors: [
          ".markdown-body p",
          ".markdown-body div",
          ".vditor-reset p",
          ".vditor-reset div",
          ".card-masonry-grid .markdown-body p",
          ".card-masonry-grid .markdown-body div",
          "textarea",
          '[contenteditable="true"]',
          'input[type="text"]',
          ".CodeMirror-line",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "span",
          "li",
          "td",
          "th"
        ],
        minRTLChars: 2,
        processInterval: 2e3,
        hebrewRegex: !0,
        arabicRegex: !0,
        mixedContent: !0,
        savedPresets: [],
        // Defaults for extended properties
        vditorSupport: !0,
        markdownSupport: !0,
        enhancedTextProcessing: !0,
        processMixedContent: !1,
        debugMode: !1
      });
      f(this, "processElement", (e) => {
        if (!e)
          return;
        const n = e.tagName.toLowerCase();
        if (n === "pre" || n === "code" || e.classList.contains("code-block")) {
          this.applyDirectRTL(e, !1);
          return;
        }
        if (e.closest(".flex, .grid, header, nav, .sidebar, .toolbar, button, .btn"))
          return;
        const i = e.textContent || e.value || "";
        if (!i.trim() || i.length < this.settings.minRTLChars)
          return;
        let o = !1;
        switch (this.settings.manualToggle || this.settings.forceDirection === "rtl" ? o = !0 : this.settings.forceDirection === "ltr" ? o = !1 : this.settings.hebrewRegex && this.detectHebrewRegex(i) || this.settings.arabicRegex && this.detectArabicRegex(i) ? o = !0 : o = this.detector.detectRTL(i), this.settings.method) {
          case "direct":
            this.applyDirectRTL(e, o);
            break;
          case "attributes":
            this.applyAttributeRTL(e, o);
            break;
          case "css":
            this.applyCSSClassRTL(e, o);
            break;
          case "unicode":
            this.applyUnicodeBidiRTL(e);
            break;
          case "all":
          default:
            this.applyDirectRTL(e, o), this.applyAttributeRTL(e, o), this.applyCSSClassRTL(e, o);
            break;
        }
        this.settings.processMixedContent && this.settings.mixedContent;
      });
      f(this, "processAllElements", () => {
        if (!this.isRTLEnabled)
          return;
        const e = this.settings.targetSelectors.join(", ");
        e && document.querySelectorAll(e).forEach((n) => {
          this.processElement(n);
        }), document.querySelectorAll("pre, code, .code-block").forEach((n) => {
          this.applyDirectRTL(n, !1);
        });
      });
      this.detector = e, this.loadSettings(), this.pasteInterceptor = new Mt(e), this.debouncedProcessAll = et(() => this.processAllElements(), 200), this.debouncedProcessQueue = et(() => {
        this.processPendingElements();
      }, 50);
    }
    getSettings() {
      return { ...this.settings };
    }
    isEnabled() {
      return this.isRTLEnabled;
    }
    loadSettings() {
      const e = localStorage.getItem("blinko-rtl-settings");
      if (e)
        try {
          const n = JSON.parse(e);
          this.settings = { ...this.settings, ...n }, this.detector.updateConfig({
            sensitivity: this.settings.sensitivity,
            minRTLChars: this.settings.minRTLChars
          }), this.settings.permanentCSS && this.settings.customCSS && this.injectPermanentCSS();
        } catch (n) {
          console.error("Failed to load RTL plugin settings:", n);
        }
    }
    updateSettings(e) {
      this.settings = { ...this.settings, ...e }, localStorage.setItem("blinko-rtl-settings", JSON.stringify(this.settings)), this.detector.updateConfig({
        sensitivity: this.settings.sensitivity,
        minRTLChars: this.settings.minRTLChars
      }), this.settings.permanentCSS && this.settings.customCSS ? this.injectPermanentCSS() : this.removePermanentCSS(), this.isRTLEnabled && (this.setupObserver(), this.startAutoProcessing(), this.debouncedProcessAll()), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: this.settings
        })
      );
    }
    injectCSS() {
      this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.id = "blinko-rtl-advanced-styles", this.styleElement.textContent = Et, document.head.appendChild(this.styleElement));
    }
    injectPermanentCSS() {
      this.settings.customCSS && this.settings.permanentCSS && (this.permanentStyleElement || (this.permanentStyleElement = document.createElement("style"), this.permanentStyleElement.id = "blinko-rtl-permanent-styles", document.head.appendChild(this.permanentStyleElement)), this.permanentStyleElement.textContent = this.settings.customCSS);
    }
    removePermanentCSS() {
      this.permanentStyleElement && (this.permanentStyleElement.remove(), this.permanentStyleElement = null);
    }
    removeCSS() {
      this.styleElement && (this.styleElement.remove(), this.styleElement = null), this.settings.permanentCSS || this.removePermanentCSS();
    }
    // Method 1: Direct style application
    applyDirectRTL(e, n) {
      n ? (e.style.direction = "rtl", e.style.textAlign = "start", e.style.unicodeBidi = "embed") : (e.style.direction = "ltr", e.style.textAlign = "start", e.style.unicodeBidi = "normal"), this.applyDebugVisuals(e, n);
    }
    // Method 2: Attribute-based RTL
    applyAttributeRTL(e, n) {
      n ? (e.setAttribute("dir", "rtl"), e.setAttribute("lang", "he")) : (e.setAttribute("dir", "ltr"), e.removeAttribute("lang")), this.applyDebugVisuals(e, n);
    }
    // Method 3: CSS class-based RTL
    applyCSSClassRTL(e, n) {
      e.classList.remove("rtl-force", "ltr-force", "rtl-auto"), n ? e.classList.add("rtl-force") : e.classList.add("ltr-force"), this.applyDebugVisuals(e, n);
    }
    // Method 4: Unicode bidi method
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
      this.isRTLEnabled = !0, this.injectCSS(), this.settings.permanentCSS && this.injectPermanentCSS(), this.pasteInterceptor.enable(), this.hoverManager || (this.hoverManager = new Pt({
        selectors: this.settings.targetSelectors,
        processElement: (e) => this.processElement(e),
        isEnabled: () => this.isRTLEnabled
      }), this.hoverManager.init()), this.setupObserver(), this.startAutoProcessing(), this.debouncedProcessAll();
    }
    disable() {
      this.isRTLEnabled = !1, this.removeCSS(), this.pasteInterceptor.disable(), this.hoverManager && (this.hoverManager.destroy(), this.hoverManager = null), this.stopAutoProcessing(), this.observer && (this.observer.disconnect(), this.observer = null), this.pendingElements.clear();
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
      return this.updateSettings({ debugMode: e }), e ? (document.body.classList.add("rtl-debug-mode"), this.processAllElements()) : (document.body.classList.remove("rtl-debug-mode"), document.querySelectorAll(".rtl-debug-rtl, .rtl-debug-ltr").forEach((n) => {
        n.classList.remove("rtl-debug-rtl", "rtl-debug-ltr");
      })), e;
    }
    applyDebugVisuals(e, n) {
      this.settings.debugMode && (e.classList.remove("rtl-debug-rtl", "rtl-debug-ltr"), n ? (e.classList.add("rtl-debug-rtl"), e.setAttribute("data-rtl-debug", "RTL Detected")) : (e.classList.add("rtl-debug-ltr"), e.setAttribute("data-rtl-debug", "LTR Detected")));
    }
    setupObserver() {
      this.observer && this.observer.disconnect(), this.settings.autoDetect && (this.observer = new MutationObserver((e) => {
        if (!this.isRTLEnabled)
          return;
        let n = !1;
        e.forEach((i) => {
          if (i.type === "childList")
            i.addedNodes.forEach((o) => {
              if (o.nodeType === Node.ELEMENT_NODE) {
                const s = o;
                this.settings.targetSelectors.some((u) => s.matches(u)) && (this.pendingElements.add(s), n = !0);
                const d = this.settings.targetSelectors.join(", ");
                d && s.querySelector(d) && (s.querySelectorAll(d).forEach((u) => {
                  this.pendingElements.add(u);
                }), n = !0);
              }
            });
          else if (i.type === "characterData" || i.type === "attributes") {
            const o = i.target.nodeType === Node.ELEMENT_NODE ? i.target : i.target.parentElement;
            o && this.settings.targetSelectors.some((s) => o.matches(s)) && (this.pendingElements.add(o), n = !0);
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
  const Xt = "", Bt = {
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
  }, $t = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Dt = {
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
  }, Ft = {
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
      const e = new Ct(), n = new At(e);
      let i = null;
      function o() {
        if (i)
          return;
        const h = n.getSettings();
        i = document.createElement("button"), i.className = "rtl-toggle-btn", i.innerHTML = "ع/א", i.title = "Toggle RTL Support (Hebrew/Arabic)", i.addEventListener("click", () => {
          n.toggle(), s();
        }), document.body.appendChild(i), h.darkMode && i.classList.add("dark-mode"), s();
      }
      function s() {
        i && (n.isEnabled() ? i.classList.add("active") : i.classList.remove("active"));
      }
      function d() {
        i && (i.remove(), i = null);
      }
      function u() {
        console.log("Initializing Advanced Blinko RTL Plugin..."), o(), localStorage.getItem("blinko-rtl-enabled") === "true" && (n.enable(), s()), window.addEventListener("rtl-settings-changed", (l) => {
          const p = l.detail;
          i && (p.darkMode ? i.classList.add("dark-mode") : i.classList.remove("dark-mode"));
        }), window.blinkoRTL = {
          detector: e,
          service: n,
          // Expose service
          toggle: () => {
            n.toggle(), s();
          },
          enable: () => {
            n.enable(), s();
          },
          disable: () => {
            n.disable(), s();
          },
          isEnabled: () => n.isEnabled(),
          settings: () => n.getSettings(),
          getSettings: () => n.getSettings(),
          // Alias for app.tsx compatibility
          processAll: n.processAllElements,
          processElement: n.processElement,
          toggleManual: () => n.toggleManual(),
          test: (l) => {
            const p = e.detectRTL(l), a = n.detectHebrewRegex(l), b = n.detectArabicRegex(l);
            return console.log(`Text "${l}" -> Original: ${p ? "RTL" : "LTR"}, Hebrew: ${a}, Arabic: ${b}`), p;
          },
          testHebrew: (l) => n.detectHebrewRegex(l),
          testArabic: (l) => n.detectArabicRegex(l),
          getStats: () => document.querySelectorAll('.rtl-force, .rtl-auto, [dir="rtl"]').length,
          setSensitivity: (l) => {
            let p = "medium";
            l < 0.12 ? p = "high" : l > 0.3 && (p = "low"), n.updateSettings({ threshold: l, sensitivity: p });
          },
          fixSelection: () => {
            const l = window.getSelection();
            if (!l || l.rangeCount === 0)
              return;
            let a = l.getRangeAt(0).commonAncestorContainer;
            if (a.nodeType === Node.TEXT_NODE && (a = a.parentNode), a instanceof HTMLElement) {
              n.processElement(a);
              const b = a.closest("p, div, li, td, th");
              b && n.processElement(b);
            }
          }
        }, console.log("Advanced Blinko RTL Plugin initialized successfully");
      }
      t("default", class {
        constructor() {
          f(this, "withSettingPanel", !0);
          f(this, "renderSettingPanel", () => {
            const l = document.createElement("div");
            return Je(/* @__PURE__ */ r(Tt, {}), l), l;
          });
          Object.assign(this, Ke);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", u) : setTimeout(u, 100), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: `RTL Language Support (v${Ke.version}) (ع/א)`,
            content: () => {
              const l = document.createElement("div");
              return l.setAttribute("data-plugin", "rtl-support"), Je(/* @__PURE__ */ r(wt, { detector: e }), l), l;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL (ع/א)",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              n.toggle(), s();
              const l = window.Blinko.i18n;
              window.Blinko.toast.success(
                n.isEnabled() ? l.t("rtl_enabled") : l.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", Bt), window.Blinko.i18n.addResourceBundle("zh", "translation", $t), window.Blinko.i18n.addResourceBundle("he", "translation", Dt), window.Blinko.i18n.addResourceBundle("ar", "translation", Ft);
        }
        destroy() {
          n.disable(), d(), console.log("Advanced RTL Plugin destroyed");
        }
      });
    }
  }));
})();
