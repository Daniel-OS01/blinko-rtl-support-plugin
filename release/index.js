var It = Object.defineProperty;
var Dt = (B, m, F) => m in B ? It(B, m, { enumerable: !0, configurable: !0, writable: !0, value: F }) : B[m] = F;
var b = (B, m, F) => (Dt(B, typeof m != "symbol" ? m + "" : m, F), F);
(function() {
  var B, m, F, H, ge, _e, fe, me, te, ne, ie, j = {}, be = [], Ye = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, q = Array.isArray;
  function M(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function oe(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function re(t, e, n) {
    var i, o, s, a = {};
    for (s in e)
      s == "key" ? i = e[s] : s == "ref" ? o = e[s] : a[s] = e[s];
    if (arguments.length > 2 && (a.children = arguments.length > 3 ? B.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (s in t.defaultProps)
        a[s] === void 0 && (a[s] = t.defaultProps[s]);
    return V(t, a, i, o, null);
  }
  function V(t, e, n, i, o) {
    var s = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o ?? ++F, __i: -1, __u: 0 };
    return o == null && m.vnode != null && m.vnode(s), s;
  }
  function N(t) {
    return t.children;
  }
  function A(t, e) {
    this.props = t, this.context = e;
  }
  function O(t, e) {
    if (e == null)
      return t.__ ? O(t.__, t.__i + 1) : null;
    for (var n; e < t.__k.length; e++)
      if ((n = t.__k[e]) != null && n.__e != null)
        return n.__e;
    return typeof t.type == "function" ? O(t) : null;
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
    (!t.__d && (t.__d = !0) && H.push(t) && !G.__r++ || ge != m.debounceRendering) && ((ge = m.debounceRendering) || _e)(G);
  }
  function G() {
    for (var t, e, n, i, o, s, a, c = 1; H.length; )
      H.length > c && H.sort(fe), t = H.shift(), c = H.length, t.__d && (n = void 0, o = (i = (e = t).__v).__e, s = [], a = [], e.__P && ((n = M({}, i)).__v = i.__v + 1, m.vnode && m.vnode(n), se(e.__P, n, i, e.__n, e.__P.namespaceURI, 32 & i.__u ? [o] : null, s, o ?? O(i), !!(32 & i.__u), a), n.__v = i.__v, n.__.__k[n.__i] = n, Te(s, n, a), n.__e != o && ve(n)));
    G.__r = 0;
  }
  function xe(t, e, n, i, o, s, a, c, p, u, h) {
    var l, _, g, w, L, S, v, x = i && i.__k || be, P = e.length;
    for (p = et(n, e, x, p, P), l = 0; l < P; l++)
      (g = n.__k[l]) != null && (_ = g.__i == -1 ? j : x[g.__i] || j, g.__i = l, S = se(t, g, _, o, s, a, c, p, u, h), w = g.__e, g.ref && _.ref != g.ref && (_.ref && ae(_.ref, null, g), h.push(g.ref, g.__c || w, g)), L == null && w != null && (L = w), (v = !!(4 & g.__u)) || _.__k === g.__k ? p = ke(g, p, t, v) : typeof g.type == "function" && S !== void 0 ? p = S : w && (p = w.nextSibling), g.__u &= -7);
    return n.__e = L, p;
  }
  function et(t, e, n, i, o) {
    var s, a, c, p, u, h = n.length, l = h, _ = 0;
    for (t.__k = new Array(o), s = 0; s < o; s++)
      (a = e[s]) != null && typeof a != "boolean" && typeof a != "function" ? (p = s + _, (a = t.__k[s] = typeof a == "string" || typeof a == "number" || typeof a == "bigint" || a.constructor == String ? V(null, a, null, null, null) : q(a) ? V(N, { children: a }, null, null, null) : a.constructor == null && a.__b > 0 ? V(a.type, a.props, a.key, a.ref ? a.ref : null, a.__v) : a).__ = t, a.__b = t.__b + 1, c = null, (u = a.__i = tt(a, n, p, l)) != -1 && (l--, (c = n[u]) && (c.__u |= 2)), c == null || c.__v == null ? (u == -1 && (o > h ? _-- : o < h && _++), typeof a.type != "function" && (a.__u |= 4)) : u != p && (u == p - 1 ? _-- : u == p + 1 ? _++ : (u > p ? _-- : _++, a.__u |= 4))) : t.__k[s] = null;
    if (l)
      for (s = 0; s < h; s++)
        (c = n[s]) != null && !(2 & c.__u) && (c.__e == i && (i = O(c)), Ce(c, c));
    return i;
  }
  function ke(t, e, n, i) {
    var o, s;
    if (typeof t.type == "function") {
      for (o = t.__k, s = 0; o && s < o.length; s++)
        o[s] && (o[s].__ = t, e = ke(o[s], e, n, i));
      return e;
    }
    t.__e != e && (i && (e && t.type && !e.parentNode && (e = O(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function X(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (q(t) ? t.some(function(n) {
      X(n, e);
    }) : e.push(t)), e;
  }
  function tt(t, e, n, i) {
    var o, s, a, c = t.key, p = t.type, u = e[n], h = u != null && (2 & u.__u) == 0;
    if (u === null && t.key == null || h && c == u.key && p == u.type)
      return n;
    if (i > (h ? 1 : 0)) {
      for (o = n - 1, s = n + 1; o >= 0 || s < e.length; )
        if ((u = e[a = o >= 0 ? o-- : s++]) != null && !(2 & u.__u) && c == u.key && p == u.type)
          return a;
    }
    return -1;
  }
  function we(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || Ye.test(e) ? n : n + "px";
  }
  function J(t, e, n, i, o) {
    var s, a;
    e:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof i == "string" && (t.style.cssText = i = ""), i)
            for (e in i)
              n && e in n || we(t.style, e, "");
          if (n)
            for (e in n)
              i && n[e] == i[e] || we(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        s = e != (e = e.replace(me, "$1")), a = e.toLowerCase(), e = a in t || e == "onFocusOut" || e == "onFocusIn" ? a.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = n, n ? i ? n.u = i.u : (n.u = te, t.addEventListener(e, s ? ie : ne, s)) : t.removeEventListener(e, s ? ie : ne, s);
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
  function Se(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.t == null)
          e.t = te++;
        else if (e.t < n.u)
          return;
        return n(m.event ? m.event(e) : e);
      }
    };
  }
  function se(t, e, n, i, o, s, a, c, p, u) {
    var h, l, _, g, w, L, S, v, x, P, y, k, T, $, W, D, U, d = e.type;
    if (e.constructor != null)
      return null;
    128 & n.__u && (p = !!(32 & n.__u), s = [c = e.__e = n.__e]), (h = m.__b) && h(e);
    e:
      if (typeof d == "function")
        try {
          if (v = e.props, x = "prototype" in d && d.prototype.render, P = (h = d.contextType) && i[h.__c], y = h ? P ? P.props.value : h.__ : i, n.__c ? S = (l = e.__c = n.__c).__ = l.__E : (x ? e.__c = l = new d(v, y) : (e.__c = l = new A(v, y), l.constructor = d, l.render = it), P && P.sub(l), l.props = v, l.state || (l.state = {}), l.context = y, l.__n = i, _ = l.__d = !0, l.__h = [], l._sb = []), x && l.__s == null && (l.__s = l.state), x && d.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = M({}, l.__s)), M(l.__s, d.getDerivedStateFromProps(v, l.__s))), g = l.props, w = l.state, l.__v = e, _)
            x && d.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), x && l.componentDidMount != null && l.__h.push(l.componentDidMount);
          else {
            if (x && d.getDerivedStateFromProps == null && v !== g && l.componentWillReceiveProps != null && l.componentWillReceiveProps(v, y), !l.__e && l.shouldComponentUpdate != null && l.shouldComponentUpdate(v, l.__s, y) === !1 || e.__v == n.__v) {
              for (e.__v != n.__v && (l.props = v, l.state = l.__s, l.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(f) {
                f && (f.__ = e);
              }), k = 0; k < l._sb.length; k++)
                l.__h.push(l._sb[k]);
              l._sb = [], l.__h.length && a.push(l);
              break e;
            }
            l.componentWillUpdate != null && l.componentWillUpdate(v, l.__s, y), x && l.componentDidUpdate != null && l.__h.push(function() {
              l.componentDidUpdate(g, w, L);
            });
          }
          if (l.context = y, l.props = v, l.__P = t, l.__e = !1, T = m.__r, $ = 0, x) {
            for (l.state = l.__s, l.__d = !1, T && T(e), h = l.render(l.props, l.state, l.context), W = 0; W < l._sb.length; W++)
              l.__h.push(l._sb[W]);
            l._sb = [];
          } else
            do
              l.__d = !1, T && T(e), h = l.render(l.props, l.state, l.context), l.state = l.__s;
            while (l.__d && ++$ < 25);
          l.state = l.__s, l.getChildContext != null && (i = M(M({}, i), l.getChildContext())), x && !_ && l.getSnapshotBeforeUpdate != null && (L = l.getSnapshotBeforeUpdate(g, w)), D = h, h != null && h.type === N && h.key == null && (D = Re(h.props.children)), c = xe(t, q(D) ? D : [D], e, n, i, o, s, a, c, p, u), l.base = e.__e, e.__u &= -161, l.__h.length && a.push(l), S && (l.__E = l.__ = null);
        } catch (f) {
          if (e.__v = null, p || s != null)
            if (f.then) {
              for (e.__u |= p ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                c = c.nextSibling;
              s[s.indexOf(c)] = null, e.__e = c;
            } else {
              for (U = s.length; U--; )
                oe(s[U]);
              le(e);
            }
          else
            e.__e = n.__e, e.__k = n.__k, f.then || le(e);
          m.__e(f, e, n);
        }
      else
        s == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : c = e.__e = nt(n.__e, e, n, i, o, s, a, p, u);
    return (h = m.diffed) && h(e), 128 & e.__u ? void 0 : c;
  }
  function le(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(le);
  }
  function Te(t, e, n) {
    for (var i = 0; i < n.length; i++)
      ae(n[i], n[++i], n[++i]);
    m.__c && m.__c(e, t), t.some(function(o) {
      try {
        t = o.__h, o.__h = [], t.some(function(s) {
          s.call(o);
        });
      } catch (s) {
        m.__e(s, o.__v);
      }
    });
  }
  function Re(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : q(t) ? t.map(Re) : M({}, t);
  }
  function nt(t, e, n, i, o, s, a, c, p) {
    var u, h, l, _, g, w, L, S = n.props, v = e.props, x = e.type;
    if (x == "svg" ? o = "http://www.w3.org/2000/svg" : x == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), s != null) {
      for (u = 0; u < s.length; u++)
        if ((g = s[u]) && "setAttribute" in g == !!x && (x ? g.localName == x : g.nodeType == 3)) {
          t = g, s[u] = null;
          break;
        }
    }
    if (t == null) {
      if (x == null)
        return document.createTextNode(v);
      t = document.createElementNS(o, x, v.is && v), c && (m.__m && m.__m(e, s), c = !1), s = null;
    }
    if (x == null)
      S === v || c && t.data == v || (t.data = v);
    else {
      if (s = s && B.call(t.childNodes), S = n.props || j, !c && s != null)
        for (S = {}, u = 0; u < t.attributes.length; u++)
          S[(g = t.attributes[u]).name] = g.value;
      for (u in S)
        if (g = S[u], u != "children") {
          if (u == "dangerouslySetInnerHTML")
            l = g;
          else if (!(u in v)) {
            if (u == "value" && "defaultValue" in v || u == "checked" && "defaultChecked" in v)
              continue;
            J(t, u, null, g, o);
          }
        }
      for (u in v)
        g = v[u], u == "children" ? _ = g : u == "dangerouslySetInnerHTML" ? h = g : u == "value" ? w = g : u == "checked" ? L = g : c && typeof g != "function" || S[u] === g || J(t, u, g, S[u], o);
      if (h)
        c || l && (h.__html == l.__html || h.__html == t.innerHTML) || (t.innerHTML = h.__html), e.__k = [];
      else if (l && (t.innerHTML = ""), xe(e.type == "template" ? t.content : t, q(_) ? _ : [_], e, n, i, x == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, a, s ? s[0] : n.__k && O(n, 0), c, p), s != null)
        for (u = s.length; u--; )
          oe(s[u]);
      c || (u = "value", x == "progress" && w == null ? t.removeAttribute("value") : w != null && (w !== t[u] || x == "progress" && !w || x == "option" && w != S[u]) && J(t, u, w, S[u], o), u = "checked", L != null && L != t[u] && J(t, u, L, S[u], o));
    }
    return t;
  }
  function ae(t, e, n) {
    try {
      if (typeof t == "function") {
        var i = typeof t.__u == "function";
        i && t.__u(), i && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (o) {
      m.__e(o, n);
    }
  }
  function Ce(t, e, n) {
    var i, o;
    if (m.unmount && m.unmount(t), (i = t.ref) && (i.current && i.current != t.__e || ae(i, null, e)), (i = t.__c) != null) {
      if (i.componentWillUnmount)
        try {
          i.componentWillUnmount();
        } catch (s) {
          m.__e(s, e);
        }
      i.base = i.__P = null;
    }
    if (i = t.__k)
      for (o = 0; o < i.length; o++)
        i[o] && Ce(i[o], e, n || typeof t.type != "function");
    n || oe(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function it(t, e, n) {
    return this.constructor(t, n);
  }
  function ot(t, e, n) {
    var i, o, s, a;
    e == document && (e = document.documentElement), m.__ && m.__(t, e), o = (i = typeof n == "function") ? null : n && n.__k || e.__k, s = [], a = [], se(e, t = (!i && n || e).__k = re(N, null, [t]), o || j, j, e.namespaceURI, !i && n ? [n] : o ? null : e.firstChild ? B.call(e.childNodes) : null, s, !i && n ? n : o ? o.__e : e.firstChild, i, a), Te(s, t, a);
  }
  B = be.slice, m = { __e: function(t, e, n, i) {
    for (var o, s, a; e = e.__; )
      if ((o = e.__c) && !o.__)
        try {
          if ((s = o.constructor) && s.getDerivedStateFromError != null && (o.setState(s.getDerivedStateFromError(t)), a = o.__d), o.componentDidCatch != null && (o.componentDidCatch(t, i || {}), a = o.__d), a)
            return o.__E = o;
        } catch (c) {
          t = c;
        }
    throw t;
  } }, F = 0, A.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = M({}, this.state), typeof t == "function" && (t = t(M({}, n), this.props)), t && M(n, t), t != null && this.__v && (e && this._sb.push(e), ye(this));
  }, A.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), ye(this));
  }, A.prototype.render = N, H = [], _e = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, fe = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, G.__r = 0, me = /(PointerCapture)$|Capture$/i, te = 0, ne = Se(!1), ie = Se(!0);
  var rt = 0;
  function r(t, e, n, i, o, s) {
    e || (e = {});
    var a, c, p = e;
    if ("ref" in p)
      for (c in p = {}, e)
        c == "ref" ? a = e[c] : p[c] = e[c];
    var u = { type: t, props: p, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --rt, __i: -1, __u: 0, __source: o, __self: s };
    if (typeof t == "function" && (a = t.defaultProps))
      for (c in a)
        p[c] === void 0 && (p[c] = a[c]);
    return m.vnode && m.vnode(u), u;
  }
  var Z, R, de, Le, ce = 0, Ee = [], C = m, Pe = C.__b, $e = C.__r, Be = C.diffed, Me = C.__c, Ae = C.unmount, Fe = C.__;
  function Ie(t, e) {
    C.__h && C.__h(R, t, ce || e), ce = 0;
    var n = R.__H || (R.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function I(t) {
    return ce = 1, st(He, t);
  }
  function st(t, e, n) {
    var i = Ie(Z++, 2);
    if (i.t = t, !i.__c && (i.__ = [n ? n(e) : He(void 0, e), function(c) {
      var p = i.__N ? i.__N[0] : i.__[0], u = i.t(p, c);
      p !== u && (i.__N = [u, i.__[1]], i.__c.setState({}));
    }], i.__c = R, !R.__f)) {
      var o = function(c, p, u) {
        if (!i.__c.__H)
          return !0;
        var h = i.__c.__H.__.filter(function(_) {
          return !!_.__c;
        });
        if (h.every(function(_) {
          return !_.__N;
        }))
          return !s || s.call(this, c, p, u);
        var l = i.__c.props !== c;
        return h.forEach(function(_) {
          if (_.__N) {
            var g = _.__[0];
            _.__ = _.__N, _.__N = void 0, g !== _.__[0] && (l = !0);
          }
        }), s && s.call(this, c, p, u) || l;
      };
      R.__f = !0;
      var s = R.shouldComponentUpdate, a = R.componentWillUpdate;
      R.componentWillUpdate = function(c, p, u) {
        if (this.__e) {
          var h = s;
          s = void 0, o(c, p, u), s = h;
        }
        a && a.call(this, c, p, u);
      }, R.shouldComponentUpdate = o;
    }
    return i.__N || i.__;
  }
  function ue(t, e) {
    var n = Ie(Z++, 3);
    !C.__s && dt(n.__H, e) && (n.__ = t, n.u = e, R.__H.__h.push(n));
  }
  function lt() {
    for (var t; t = Ee.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(K), t.__H.__h.forEach(pe), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], C.__e(e, t.__v);
        }
  }
  C.__b = function(t) {
    R = null, Pe && Pe(t);
  }, C.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Fe && Fe(t, e);
  }, C.__r = function(t) {
    $e && $e(t), Z = 0;
    var e = (R = t.__c).__H;
    e && (de === R ? (e.__h = [], R.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(K), e.__h.forEach(pe), e.__h = [], Z = 0)), de = R;
  }, C.diffed = function(t) {
    Be && Be(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (Ee.push(e) !== 1 && Le === C.requestAnimationFrame || ((Le = C.requestAnimationFrame) || at)(lt)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), de = R = null;
  }, C.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(K), n.__h = n.__h.filter(function(i) {
          return !i.__ || pe(i);
        });
      } catch (i) {
        e.some(function(o) {
          o.__h && (o.__h = []);
        }), e = [], C.__e(i, n.__v);
      }
    }), Me && Me(t, e);
  }, C.unmount = function(t) {
    Ae && Ae(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(i) {
      try {
        K(i);
      } catch (o) {
        e = o;
      }
    }), n.__H = void 0, e && C.__e(e, n.__v));
  };
  var De = typeof requestAnimationFrame == "function";
  function at(t) {
    var e, n = function() {
      clearTimeout(i), De && cancelAnimationFrame(e), setTimeout(t);
    }, i = setTimeout(n, 35);
    De && (e = requestAnimationFrame(n));
  }
  function K(t) {
    var e = R, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), R = e;
  }
  function pe(t) {
    var e = R;
    t.__c = t.__(), R = e;
  }
  function dt(t, e) {
    return !t || t.length !== e.length || e.some(function(n, i) {
      return n !== t[i];
    });
  }
  function He(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ct(t, e) {
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
  (We.prototype = new A()).isPureReactComponent = !0, We.prototype.shouldComponentUpdate = function(t, e) {
    return Ne(this.props, t) || Ne(this.state, e);
  };
  var Oe = m.__b;
  m.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Oe && Oe(t);
  };
  var ut = m.__e;
  m.__e = function(t, e, n, i) {
    if (t.then) {
      for (var o, s = e; s = s.__; )
        if ((o = s.__c) && o.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), o.__c(t, e);
    }
    ut(t, e, n, i);
  };
  var ze = m.unmount;
  function Ue(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(i) {
      typeof i.__c == "function" && i.__c();
    }), t.__c.__H = null), (t = ct({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(i) {
      return Ue(i, e, n);
    })), t;
  }
  function je(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(i) {
      return je(i, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function he() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function qe(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function Q() {
    this.i = null, this.l = null;
  }
  m.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), ze && ze(t);
  }, (he.prototype = new A()).__c = function(t, e) {
    var n = e.__c, i = this;
    i.o == null && (i.o = []), i.o.push(n);
    var o = qe(i.__v), s = !1, a = function() {
      s || (s = !0, n.__R = null, o ? o(c) : c());
    };
    n.__R = a;
    var c = function() {
      if (!--i.__u) {
        if (i.state.__a) {
          var p = i.state.__a;
          i.__v.__k[0] = je(p, p.__c.__P, p.__c.__O);
        }
        var u;
        for (i.setState({ __a: i.__b = null }); u = i.o.pop(); )
          u.forceUpdate();
      }
    };
    i.__u++ || 32 & e.__u || i.setState({ __a: i.__b = i.__v.__k[0] }), t.then(a, a);
  }, he.prototype.componentWillUnmount = function() {
    this.o = [];
  }, he.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), i = this.__v.__k[0].__c;
        this.__v.__k[0] = Ue(this.__b, n, i.__O = i.__P);
      }
      this.__b = null;
    }
    var o = e.__a && re(N, null, t.fallback);
    return o && (o.__u &= -33), [re(N, null, e.__a ? null : t.children), o];
  };
  var Ve = function(t, e, n) {
    if (++n[1] === n[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size))
      for (n = t.i; n; ) {
        for (; n.length > 3; )
          n.pop()();
        if (n[1] < n[0])
          break;
        t.i = n = n[2];
      }
  };
  (Q.prototype = new A()).__a = function(t) {
    var e = this, n = qe(e.__v), i = e.l.get(t);
    return i[0]++, function(o) {
      var s = function() {
        e.props.revealOrder ? (i.push(o), Ve(e, t, i)) : o();
      };
      n ? n(s) : s();
    };
  }, Q.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = X(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, Q.prototype.componentDidUpdate = Q.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      Ve(t, n, e);
    });
  };
  var pt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, ht = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, gt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, _t = /[A-Z0-9]/g, ft = typeof document < "u", mt = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function Ge(t, e, n) {
    return e.__k == null && (e.textContent = ""), ot(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  A.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty(A.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var Xe = m.event;
  function bt() {
  }
  function vt() {
    return this.cancelBubble;
  }
  function yt() {
    return this.defaultPrevented;
  }
  m.event = function(t) {
    return Xe && (t = Xe(t)), t.persist = bt, t.isPropagationStopped = vt, t.isDefaultPrevented = yt, t.nativeEvent = t;
  };
  var xt = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Je = m.vnode;
  m.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, i = e.type, o = {}, s = i.indexOf("-") === -1;
      for (var a in n) {
        var c = n[a];
        if (!(a === "value" && "defaultValue" in n && c == null || ft && a === "children" && i === "noscript" || a === "class" || a === "className")) {
          var p = a.toLowerCase();
          a === "defaultValue" && "value" in n && n.value == null ? a = "value" : a === "download" && c === !0 ? c = "" : p === "translate" && c === "no" ? c = !1 : p[0] === "o" && p[1] === "n" ? p === "ondoubleclick" ? a = "ondblclick" : p !== "onchange" || i !== "input" && i !== "textarea" || mt(n.type) ? p === "onfocus" ? a = "onfocusin" : p === "onblur" ? a = "onfocusout" : gt.test(a) && (a = p) : p = a = "oninput" : s && ht.test(a) ? a = a.replace(_t, "-$&").toLowerCase() : c === null && (c = void 0), p === "oninput" && o[a = p] && (a = "oninputCapture"), o[a] = c;
        }
      }
      i == "select" && o.multiple && Array.isArray(o.value) && (o.value = X(n.children).forEach(function(u) {
        u.props.selected = o.value.indexOf(u.props.value) != -1;
      })), i == "select" && o.defaultValue != null && (o.value = X(n.children).forEach(function(u) {
        u.props.selected = o.multiple ? o.defaultValue.indexOf(u.props.value) != -1 : o.defaultValue == u.props.value;
      })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", xt)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), e.props = o;
    }(t), t.$$typeof = pt, Je && Je(t);
  };
  var Ze = m.__r;
  m.__r = function(t) {
    Ze && Ze(t), t.__c;
  };
  var Ke = m.diffed;
  m.diffed = function(t) {
    Ke && Ke(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  function kt({ detector: t }) {
    const [e, n] = I({ activeBlocks: 0 }), [i, o] = I(15), [s, a] = I(!1), c = window.Blinko.i18n;
    ue(() => {
      const l = () => {
        var w;
        const g = ((w = window.blinkoRTL) == null ? void 0 : w.getStats()) || 0;
        n({ activeBlocks: g });
      };
      l();
      const _ = setInterval(l, 1e3);
      return () => clearInterval(_);
    }, []), ue(() => {
      const l = () => {
        const _ = window.blinkoRTL;
        if (_) {
          let g;
          if (typeof _.getSettings == "function" ? g = _.getSettings() : typeof _.settings == "function" && (g = _.settings()), g && g.threshold !== void 0)
            return o(Math.round(g.threshold * 100)), !0;
        }
        return !1;
      };
      if (!l()) {
        const _ = setInterval(() => {
          l() && clearInterval(_);
        }, 100);
        setTimeout(() => clearInterval(_), 2e3);
      }
    }, []);
    const p = () => {
      var l;
      a(!0), (l = window.blinkoRTL) == null || l.fixSelection(), setTimeout(() => {
        a(!1), window.Blinko.toast.success("Selection processed");
      }, 500);
    }, u = (l) => {
      var g;
      const _ = parseInt(l.target.value);
      o(_), (g = window.blinkoRTL) == null || g.setSensitivity(_ / 100);
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
              var _, g;
              (_ = window.blinkoRTL) == null || _.toggle();
              const l = (g = window.blinkoRTL) == null ? void 0 : g.isEnabled();
              window.Blinko.toast.success(
                l ? c.t("rtl_enabled") : c.t("rtl_disabled")
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
            title: c.t("manual_toggle"),
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
          children: s ? "Processing..." : /* @__PURE__ */ r(N, { children: [
            /* @__PURE__ */ r("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) }),
            "Fix Selected Text"
          ] })
        }
      ) }),
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
            onChange: u,
            style: { width: "100%", cursor: "pointer" }
          }
        ),
        /* @__PURE__ */ r("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#999", marginTop: "4px" }, children: [
          /* @__PURE__ */ r("span", { children: "More Sensitive (1%)" }),
          /* @__PURE__ */ r("span", { children: "Less Sensitive (50%)" })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { style: { marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #eee", fontSize: "11px", color: "#888", textAlign: "center" }, children: "Click 'Fix Selected' to force detection on specific text." })
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
  function wt() {
    var P, y, k, T, $, W, D, U;
    const [t, e] = I({
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
    }), [n, i] = I(""), [o, s] = I(""), [a, c] = I(""), [p, u] = I("");
    window.Blinko.i18n, ue(() => {
      const d = localStorage.getItem("blinko-rtl-settings");
      if (d)
        try {
          const f = JSON.parse(d);
          e((E) => ({ ...E, ...f }));
        } catch (f) {
          console.error("Failed to load RTL plugin settings:", f);
        }
    }, []);
    const h = (d) => {
      const f = { ...t, ...d };
      e(f), localStorage.setItem("blinko-rtl-settings", JSON.stringify(f)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: f
        })
      ), window.Blinko.toast.success("Settings saved!");
    }, l = () => {
      var f;
      if (!o.trim())
        return;
      const d = (f = window.blinkoRTL) == null ? void 0 : f.test(o);
      c(d ? "RTL" : "LTR");
    }, _ = () => {
      var d;
      (d = window.blinkoRTL) == null || d.processAll(), window.Blinko.toast.success("Content processed!");
    }, g = () => {
      n.trim() && !t.targetSelectors.includes(n.trim()) && (h({
        targetSelectors: [...t.targetSelectors, n.trim()]
      }), i(""));
    }, w = (d) => {
      h({
        targetSelectors: t.targetSelectors.filter((f) => f !== d)
      });
    }, L = () => {
      if (!p)
        return;
      const f = [...z, ...t.savedPresets || []].find((E) => E.id === p);
      f && (h({ customCSS: f.css }), window.Blinko.toast.success(`Preset "${f.name}" loaded!`));
    }, S = () => {
      const d = prompt("Enter a name for this CSS preset:");
      if (!d)
        return;
      const f = {
        id: `custom-${Date.now()}`,
        name: d,
        css: t.customCSS,
        isBuiltIn: !1
      };
      h({
        savedPresets: [...t.savedPresets || [], f]
      }), u(f.id);
    }, v = () => {
      if (!p)
        return;
      if (z.some((f) => f.id === p)) {
        window.Blinko.toast.error("Cannot delete built-in presets.");
        return;
      }
      confirm("Are you sure you want to delete this preset?") && (h({
        savedPresets: (t.savedPresets || []).filter((f) => f.id !== p)
      }), u(""));
    }, x = () => {
      const d = {
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
      h(d);
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
                  onClick: _,
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
                    var d;
                    (d = window.blinkoRTL) == null || d.toggle(), window.Blinko.toast.success("RTL toggled!");
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
                    var f;
                    const d = (f = window.blinkoRTL) == null ? void 0 : f.toggleManual();
                    e((E) => ({ ...E, manualToggle: d })), window.Blinko.toast.success(`Manual RTL ${d ? "ON" : "OFF"}`);
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
                  onChange: (d) => h({
                    method: d.target.value
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
                    onChange: (d) => h({ enabled: d.target.checked })
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
                    onChange: (d) => h({ manualMode: d.target.checked }),
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
                    onChange: (d) => h({ mobileView: d.target.checked })
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
                    onChange: (d) => h({ autoDetect: d.target.checked }),
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
                    onChange: (d) => {
                      const f = d.target.checked;
                      h({ manualToggle: f });
                      const E = window.blinkoRTL;
                      E && E.isEnabled() && E.processAll();
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
                    onChange: (d) => {
                      const f = d.target.checked;
                      h({ darkMode: f }), f ? document.body.classList.add("dark") : document.body.classList.remove("dark");
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
                    onChange: (d) => h({ hebrewRegex: d.target.checked }),
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
                    onChange: (d) => h({ arabicRegex: d.target.checked }),
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
                      value: Y.includes(((P = t.visualStyles) == null ? void 0 : P.fontFamily) || "inherit") ? ((y = t.visualStyles) == null ? void 0 : y.fontFamily) || "inherit" : "custom",
                      onChange: (d) => {
                        var E;
                        const f = d.target.value;
                        f === "custom" ? Y.includes(((E = t.visualStyles) == null ? void 0 : E.fontFamily) || "inherit") && h({
                          visualStyles: {
                            ...t.visualStyles,
                            fontFamily: ""
                          }
                        }) : h({
                          visualStyles: {
                            ...t.visualStyles,
                            fontFamily: f
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
                        Y.map((d) => /* @__PURE__ */ r("option", { value: d, children: d === "inherit" ? "Default (Inherit)" : d }, d)),
                        /* @__PURE__ */ r("option", { value: "custom", children: "Custom..." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ r(
                    "input",
                    {
                      type: "text",
                      value: ((k = t.visualStyles) == null ? void 0 : k.fontFamily) || "",
                      onChange: (d) => h({
                        visualStyles: {
                          ...t.visualStyles,
                          fontFamily: d.target.value
                        }
                      }),
                      placeholder: "Custom font name",
                      disabled: !t.enabled,
                      style: {
                        flex: 1,
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        display: Y.includes(((T = t.visualStyles) == null ? void 0 : T.fontFamily) || "inherit") ? "none" : "block"
                      }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ r("div", { children: [
                /* @__PURE__ */ r("label", { style: { display: "flex", justifyContent: "space-between", fontWeight: "500", marginBottom: "8px" }, children: [
                  /* @__PURE__ */ r("span", { children: "Line Height:" }),
                  /* @__PURE__ */ r("span", { children: (($ = t.visualStyles) == null ? void 0 : $.lineHeight) || 1.5 })
                ] }),
                /* @__PURE__ */ r(
                  "input",
                  {
                    type: "range",
                    min: "1.0",
                    max: "3.0",
                    step: "0.1",
                    value: ((W = t.visualStyles) == null ? void 0 : W.lineHeight) || 1.5,
                    onChange: (d) => h({
                      visualStyles: {
                        ...t.visualStyles,
                        lineHeight: parseFloat(d.target.value)
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
                    value: ((U = t.visualStyles) == null ? void 0 : U.paragraphMargin) || 1,
                    onChange: (d) => h({
                      visualStyles: {
                        ...t.visualStyles,
                        paragraphMargin: parseFloat(d.target.value)
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
                      Math.round(t.threshold * 100),
                      "%"
                    ] }),
                    /* @__PURE__ */ r(
                      "input",
                      {
                        type: "range",
                        min: "1",
                        max: "50",
                        value: Math.round(t.threshold * 100),
                        onChange: (d) => {
                          const f = parseInt(d.target.value) / 100;
                          let E = "medium";
                          f < 0.12 ? E = "high" : f > 0.3 && (E = "low"), h({ threshold: f, sensitivity: E });
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
                      onChange: (d) => {
                        const f = d.target.value;
                        h({ sensitivity: f, threshold: {
                          high: 0.1,
                          // 10% RTL chars
                          medium: 0.15,
                          // 15% RTL chars
                          low: 0.4
                          // 40% RTL chars
                        }[f] });
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
                    onChange: (d) => h({ minRTLChars: parseInt(d.target.value) }),
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
                    onChange: (d) => h({ processInterval: parseInt(d.target.value) }),
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
                    onChange: (d) => h({
                      forceDirection: d.target.value
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
                    onChange: (d) => h({ permanentCSS: d.target.checked }),
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
                    value: p,
                    onChange: (d) => u(d.target.value),
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
                      /* @__PURE__ */ r("optgroup", { label: "Built-in Presets", children: z.map((d) => /* @__PURE__ */ r("option", { value: d.id, children: d.name }, d.id)) }),
                      t.savedPresets && t.savedPresets.length > 0 && /* @__PURE__ */ r("optgroup", { label: "Saved Presets", children: t.savedPresets.map((d) => /* @__PURE__ */ r("option", { value: d.id, children: d.name }, d.id)) })
                    ]
                  }
                ),
                /* @__PURE__ */ r(
                  "button",
                  {
                    onClick: L,
                    disabled: !t.enabled || !p,
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
                    onClick: v,
                    disabled: !t.enabled || !p || z.some((d) => d.id === p),
                    style: {
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      opacity: z.some((d) => d.id === p) ? 0.5 : 1
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
                  onChange: (d) => h({ customCSS: d.target.value }),
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
                  onClick: S,
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
                  onClick: () => h({ customCSS: "" }),
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
            /* @__PURE__ */ r("div", { style: { marginBottom: "15px", maxHeight: "150px", overflowY: "auto" }, children: t.targetSelectors.map((d, f) => /* @__PURE__ */ r("div", { style: {
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
              }, children: d }),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => w(d),
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
            ] }, f)) }),
            /* @__PURE__ */ r("div", { style: { display: "flex", gap: "10px" }, children: [
              /* @__PURE__ */ r(
                "input",
                {
                  type: "text",
                  value: n,
                  onChange: (d) => i(d.target.value),
                  placeholder: "e.g., .markdown-body p, .vditor-reset div",
                  disabled: !t.enabled,
                  onKeyPress: (d) => d.key === "Enter" && g(),
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
                  onClick: g,
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
                onChange: (d) => s(d.target.value),
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
                onClick: l,
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
            a && /* @__PURE__ */ r("div", { style: {
              padding: "10px",
              background: a === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${a === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ r("strong", { children: a === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
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
                  onClick: x,
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
                    const d = JSON.stringify(t, null, 2);
                    navigator.clipboard.writeText(d), window.Blinko.toast.success("Settings copied to clipboard");
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
  const St = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "1.0.8",
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
  class Tt {
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
      for (const c of n)
        /\s|[.,!?;:()[\]{}]/.test(c) || (o++, this.isRTLChar(c) && i++);
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
  class Rt {
    constructor(e = !0, n = !0, i = 1) {
      b(this, "name", "Regex");
      // Hebrew regex from userscript
      b(this, "hebrewRegex", /\p{Script=Hebrew}/u);
      // Arabic regex
      b(this, "arabicRegex", /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/);
      b(this, "checkHebrew");
      b(this, "checkArabic");
      b(this, "minRTLChars");
      b(this, "combinedRegex", null);
      this.checkHebrew = e, this.checkArabic = n, this.minRTLChars = i, this.updateCombinedRegex();
    }
    updateCombinedRegex() {
      if (this.minRTLChars <= 1) {
        this.combinedRegex = null;
        return;
      }
      const e = [];
      this.checkHebrew && e.push(this.hebrewRegex.source), this.checkArabic && e.push(this.arabicRegex.source), e.length > 0 ? this.combinedRegex = new RegExp(e.join("|"), "gu") : this.combinedRegex = null;
    }
    detect(e) {
      if (!e)
        return !1;
      if (this.minRTLChars <= 1)
        return !!(this.checkHebrew && this.hebrewRegex.test(e) || this.checkArabic && this.arabicRegex.test(e));
      if (!this.combinedRegex)
        return !1;
      this.combinedRegex.lastIndex = 0;
      let n = 0;
      for (; this.combinedRegex.exec(e) !== null; )
        if (n++, n >= this.minRTLChars)
          return !0;
      return !1;
    }
    updateConfig(e) {
      e.minRTLChars !== void 0 && (this.minRTLChars = e.minRTLChars, this.updateCombinedRegex());
    }
  }
  class Qe {
    constructor(e) {
      b(this, "name", "Combined");
      b(this, "strategies");
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
      b(this, "strategy");
      b(this, "charCodeStrategy");
      b(this, "regexStrategy");
      b(this, "config");
      this.config = {
        sensitivity: "medium",
        minRTLChars: 3,
        sampleSize: 100,
        ...e
      }, this.charCodeStrategy = new Tt(this.config), this.regexStrategy = new Rt(!0, !0, this.config.minRTLChars), this.strategy = new Qe([
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
          this.strategy = new Qe([
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
  class Lt {
    constructor(e, n, i, o) {
      b(this, "config");
      b(this, "renderer");
      b(this, "detector");
      b(this, "settings");
      b(this, "observer", null);
      b(this, "autoProcessInterval", null);
      b(this, "isEnabled", !1);
      this.config = e, this.renderer = n, this.detector = i, this.settings = o;
    }
    updateSettings(e) {
      this.settings = { ...this.settings, ...e };
    }
    /**
     * Process a single element
     */
    processElement(e) {
      if (!e || !this.shouldProcessElement(e))
        return;
      const n = this.getElementText(e);
      if (!n.trim() || n.length < (this.settings.minRTLChars || 2))
        return;
      this.determineDirection(n) ? this.renderer.applyRTL(e) : this.renderer.applyLTR(e), this.settings.mixedContent && this.processChildTextNodes(e);
    }
    /**
     * Process child text nodes for mixed content
     */
    processChildTextNodes(e) {
      if (!e)
        return;
      const n = document.createTreeWalker(
        e,
        NodeFilter.SHOW_TEXT,
        null
      );
      let i;
      for (; i = n.nextNode(); ) {
        const o = i, s = o.textContent || "";
        if (s.trim() && this.detector.detectRTL(s)) {
          const a = o.parentElement;
          a && a !== e && this.shouldProcessElement(a) && this.renderer.applyRTL(a);
        }
      }
    }
    /**
     * Determine direction based on settings and detection
     */
    determineDirection(e) {
      return this.settings.manualToggle || this.settings.forceDirection === "rtl" ? !0 : this.settings.forceDirection === "ltr" ? !1 : this.settings.hebrewRegex && /\p{Script=Hebrew}/u.test(e) || this.settings.arabicRegex && /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(e) ? !0 : this.detector.detectRTL(e);
    }
    /**
     * Check if element should be processed
     */
    shouldProcessElement(e) {
      return !(this.config.selectors.layout.some((i) => i.startsWith(".") ? e.classList.contains(i.substring(1)) || e.closest(i) : i.startsWith("#") ? e.id === i.substring(1) || e.closest(i) : e.matches(i) || e.closest(i)) || this.config.selectors.ignore.some((i) => e.matches(i)));
    }
    /**
     * Get text content from element
     */
    getElementText(e) {
      return e.tagName === "INPUT" || e.tagName === "TEXTAREA" ? e.value || "" : e.textContent || "";
    }
    /**
     * Process all elements matching target selectors
     */
    processAllElements() {
      var i;
      if (!this.isEnabled)
        return;
      const e = this.config.selectors.target.join(", ");
      document.querySelectorAll(e).forEach((o) => {
        this.processElement(o);
      }), (i = this.settings.customSelectors) == null || i.forEach((o) => {
        try {
          document.querySelectorAll(o).forEach((s) => {
            this.processElement(s);
          });
        } catch {
          console.warn(`Invalid custom selector: ${o}`);
        }
      });
    }
    enable() {
      this.isEnabled = !0, this.renderer.injectGlobalStyles(), this.setupObserver(), this.startAutoProcessing(), setTimeout(() => this.processAllElements(), 100);
    }
    disable() {
      this.isEnabled = !1, this.renderer.removeGlobalStyles(), this.stopAutoProcessing(), this.observer && (this.observer.disconnect(), this.observer = null);
      const e = this.config.selectors.target.join(", ");
      document.querySelectorAll(e).forEach((n) => {
        this.renderer.clear(n);
      });
    }
    setupObserver() {
      this.observer && this.observer.disconnect(), this.settings.autoDetect && (this.observer = new MutationObserver((e) => {
        this.isEnabled && e.forEach((n) => {
          if (n.type === "childList")
            n.addedNodes.forEach((i) => {
              if (i.nodeType === Node.ELEMENT_NODE) {
                const o = i;
                this.config.selectors.target.some((a) => o.matches(a)) && this.processElement(o);
                const s = this.config.selectors.target.join(", ");
                o.querySelectorAll(s).forEach((a) => {
                  this.processElement(a);
                });
              }
            });
          else if (n.type === "characterData" || n.type === "attributes") {
            const i = n.target.nodeType === Node.ELEMENT_NODE ? n.target : n.target.parentElement;
            i && this.config.selectors.target.some((o) => i.matches(o)) && this.processElement(i);
          }
        });
      }), this.observer.observe(document.body, {
        childList: !0,
        subtree: !0,
        characterData: !0,
        attributes: !0,
        attributeFilter: ["value", "placeholder"]
        // monitor input value changes if needed (but value isn't an attribute usually)
      }));
    }
    startAutoProcessing() {
      this.autoProcessInterval && clearInterval(this.autoProcessInterval), this.settings.autoDetect && this.isEnabled && (this.autoProcessInterval = setInterval(() => {
        this.isEnabled && this.settings.autoDetect && this.processAllElements();
      }, this.settings.processInterval || 2e3));
    }
    stopAutoProcessing() {
      this.autoProcessInterval && (clearInterval(this.autoProcessInterval), this.autoProcessInterval = null);
    }
  }
  const ee = {
    selectors: {
      target: [
        // Vditor selectors
        ".vditor-reset",
        ".vditor-content",
        ".vditor-ir",
        ".vditor-wysiwyg",
        ".vditor-sv",
        ".vditor-reset p",
        ".vditor-reset div",
        ".vditor-reset span",
        ".vditor-reset h1, .vditor-reset h2, .vditor-reset h3, .vditor-reset h4, .vditor-reset h5, .vditor-reset h6",
        ".vditor-reset li",
        ".vditor-reset blockquote",
        // Markdown selectors
        ".markdown-body",
        ".markdown-body p",
        ".markdown-body div",
        ".markdown-body span",
        ".markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6",
        ".markdown-body li",
        ".markdown-body blockquote",
        ".markdown-body td",
        ".markdown-body th",
        // General text selectors
        "textarea",
        'input[type="text"]',
        'input[type="search"]',
        "[contenteditable]",
        ".content",
        ".text",
        ".note-content",
        ".card-masonry-grid p",
        ".card-masonry-grid div"
      ],
      ignore: [
        "code",
        "pre",
        ".code-block",
        "button",
        'input[type="button"]',
        'input[type="submit"]',
        "select",
        "option"
      ],
      layout: [
        "#page-wrap",
        ".flex",
        ".grid",
        "header",
        "nav",
        ".sidebar",
        ".navigation",
        ".toolbar",
        "footer",
        ".button-group"
      ]
    },
    styles: {
      rtl: {
        direction: "rtl",
        textAlign: "right",
        unicodeBidi: "plaintext"
      },
      ltr: {
        direction: "ltr",
        textAlign: "left",
        unicodeBidi: "normal"
      },
      common: `
      .rtl-detected {
        direction: rtl !important;
        text-align: right !important;
        unicode-bidi: plaintext !important;
      }
      .ltr-detected {
        direction: ltr !important;
        text-align: left !important;
        unicode-bidi: normal !important;
      }

      /* Toggle Button */
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
    `
    },
    attributes: {
      rtl: {
        dir: "rtl"
      },
      ltr: {
        dir: "ltr"
      }
    }
  };
  class Et {
    constructor(e) {
      b(this, "config");
      b(this, "styleElement", null);
      this.config = e;
    }
    applyRTL(e) {
      Object.entries(this.config.attributes.rtl).forEach(([n, i]) => {
        e.setAttribute(n, i);
      }), Object.entries(this.config.styles.rtl).forEach(([n, i]) => {
        e.style[n] = i;
      }), e.classList.add("rtl-detected"), e.classList.remove("ltr-detected");
    }
    applyLTR(e) {
      Object.entries(this.config.attributes.ltr).forEach(([n, i]) => {
        e.setAttribute(n, i);
      }), Object.entries(this.config.styles.ltr).forEach(([n, i]) => {
        e.style[n] = i;
      }), e.classList.add("ltr-detected"), e.classList.remove("rtl-detected");
    }
    clear(e) {
      Object.keys(this.config.attributes.rtl).forEach((i) => e.removeAttribute(i)), Object.keys(this.config.attributes.ltr).forEach((i) => e.removeAttribute(i)), (/* @__PURE__ */ new Set([
        ...Object.keys(this.config.styles.rtl),
        ...Object.keys(this.config.styles.ltr)
      ])).forEach((i) => {
        e.style[i] = "";
      }), e.classList.remove("rtl-detected", "ltr-detected");
    }
    injectGlobalStyles() {
      this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.id = "blinko-rtl-global-styles", this.styleElement.textContent = this.config.styles.common, document.head.appendChild(this.styleElement));
    }
    removeGlobalStyles() {
      this.styleElement && (this.styleElement.remove(), this.styleElement = null);
    }
  }
  class Pt {
    constructor(e) {
      b(this, "button", null);
      b(this, "currentTarget", null);
      b(this, "hideTimeout", null);
      b(this, "options");
      b(this, "isHoveringButton", !1);
      b(this, "styleElement", null);
      b(this, "onMouseOver", (e) => {
        if (!this.options.isEnabled())
          return;
        const i = e.target.closest(this.options.selectors.join(","));
        i && this.showButton(i);
      });
      b(this, "onMouseOut", (e) => {
        this.scheduleHide();
      });
      b(this, "hideButton", () => {
        var e;
        (e = this.button) == null || e.classList.remove("visible");
      });
      b(this, "onButtonClick", (e) => {
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
  class $t {
    constructor(e) {
      b(this, "detector");
      b(this, "isEnabled", !1);
      b(this, "activeToast", null);
      b(this, "handlePaste", (e) => {
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
      var o, s, a, c;
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
      }), (a = i.querySelector("#rtl-btn-original")) == null || a.addEventListener("click", () => {
        this.insertText(n, e), this.removeToast();
      }), (c = i.querySelector(".rtl-toast-close")) == null || c.addEventListener("click", () => {
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
  const Bt = {
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
  }, Mt = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, At = {
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
      const e = new Ct(), n = new Et(ee);
      let i = { ...ee, enabled: !1, sensitivity: "medium", threshold: 0.15, forceDirection: "auto", autoDetect: !0, manualMode: !1, manualToggle: !1, mobileView: !1, darkMode: !1, method: "all", customCSS: "", permanentCSS: !1, visualStyles: {
        fontFamily: "inherit",
        lineHeight: 1.5,
        paragraphMargin: 1
      }, minRTLChars: 2, processInterval: 2e3, hebrewRegex: !0, arabicRegex: !0, mixedContent: !0 };
      const o = new Lt(ee, n, e, i), s = new $t(e);
      let a = null, c = null, p = null;
      function u() {
        i.customCSS && i.permanentCSS ? (p || (p = document.createElement("style"), p.id = "blinko-rtl-permanent-styles", document.head.appendChild(p)), p.textContent = i.customCSS) : p && (p.remove(), p = null);
      }
      let h = null;
      function l() {
        if (!i.enabled) {
          h && (h.remove(), h = null);
          return;
        }
        h || (h = document.createElement("style"), h.id = "blinko-rtl-visual-styles", document.head.appendChild(h));
        const { fontFamily: y = "inherit", lineHeight: k = 1.5, paragraphMargin: T = 1 } = i.visualStyles || {};
        let $ = "";
        i.mobileView ? ($ = `
                @media (max-width: 768px), screen and (max-width: 768px) {
                    .rtl-toggle-btn {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 24px !important;
                        bottom: 20px !important;
                        top: auto !important;
                    }
                    /* Ensure RTL control center is usable on small screens */
                    div[data-plugin="rtl-support"] > div {
                        width: 280px !important;
                        max-width: 90vw !important;
                    }
                }

                /* Force mobile layout if toggled explicitly, even on desktop for testing */
                body.blinko-rtl-mobile .rtl-toggle-btn {
                    width: 60px !important;
                    height: 60px !important;
                    font-size: 24px !important;
                    bottom: 20px !important;
                    top: auto !important;
                }
             `, document.body.classList.add("blinko-rtl-mobile")) : document.body.classList.remove("blinko-rtl-mobile"), h.textContent = `
            :root {
                --rtl-font-family: ${y === "inherit" || !y ? "inherit" : `"${y}", sans-serif`};
                --rtl-line-height: ${k};
                --rtl-paragraph-margin: ${T}em;
            }
            ${$}
        `;
      }
      function _() {
        c || (c = document.createElement("button"), c.className = "rtl-toggle-btn", c.innerHTML = "ع/א", c.title = "Toggle RTL Support", c.style.cssText = `
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
        `, c.addEventListener("click", v), document.body.appendChild(c), g());
      }
      function g() {
        c && (i.enabled ? c.style.background = "#28a745" : c.style.background = "#007bff", i.darkMode ? c.style.border = "2px solid #fff" : c.style.border = "none");
      }
      function w() {
        c && (c.remove(), c = null);
      }
      function L() {
        console.log("Enabling RTL Support..."), i.enabled = !0, localStorage.setItem("blinko-rtl-enabled", "true"), o.updateSettings(i), o.enable(), s.enable(), a || (a = new Pt({
          selectors: ee.selectors.target,
          processElement: (y) => o.processElement(y),
          isEnabled: () => i.enabled
        }), a.init()), u(), l(), g();
      }
      function S() {
        console.log("Disabling RTL Support..."), i.enabled = !1, localStorage.setItem("blinko-rtl-enabled", "false"), o.disable(), s.disable(), a && (a.destroy(), a = null), i.permanentCSS || u(), l(), g();
      }
      function v() {
        i.enabled ? S() : L();
      }
      function x() {
        const y = localStorage.getItem("blinko-rtl-settings");
        if (y)
          try {
            const T = JSON.parse(y);
            i = { ...i, ...T }, e.updateConfig({
              sensitivity: i.sensitivity,
              threshold: i.threshold,
              minRTLChars: i.minRTLChars
            }), o.updateSettings(i), u();
          } catch (T) {
            console.error("Failed to load RTL plugin settings:", T);
          }
        localStorage.getItem("blinko-rtl-enabled") === "true" ? L() : u();
      }
      function P() {
        console.log("Initializing Blinko RTL Plugin (Refactored)..."), x(), _(), window.addEventListener("rtl-settings-changed", (y) => {
          const k = y.detail, T = i.enabled;
          i = { ...i, ...k }, e.updateConfig({
            sensitivity: i.sensitivity,
            threshold: i.threshold,
            minRTLChars: i.minRTLChars
          }), o.updateSettings(i), u(), l(), g(), k.enabled !== void 0 && k.enabled !== T ? k.enabled ? L() : S() : i.enabled && (o.disable(), o.enable());
        }), window.blinkoRTL = {
          toggle: v,
          enable: L,
          disable: S,
          isEnabled: () => i.enabled,
          getSettings: () => ({ ...i }),
          processAll: () => o.processAllElements(),
          processElement: (y) => o.processElement(y),
          toggleManual: () => (i.manualToggle = !i.manualToggle, localStorage.setItem("blinko-rtl-settings", JSON.stringify(i)), o.updateSettings(i), i.enabled && o.processAllElements(), i.manualToggle),
          test: (y) => e.detectRTL(y),
          getStats: () => document.querySelectorAll('.rtl-detected, [dir="rtl"]').length,
          fixSelection: () => {
            const y = window.getSelection();
            if (!y || y.rangeCount === 0)
              return;
            let T = y.getRangeAt(0).commonAncestorContainer;
            if (T.nodeType === Node.TEXT_NODE && (T = T.parentNode), T instanceof HTMLElement) {
              o.processElement(T);
              const $ = T.closest("p, div, li, td, th");
              $ && o.processElement($);
            }
          }
        };
      }
      t("default", class {
        constructor() {
          b(this, "withSettingPanel", !0);
          b(this, "renderSettingPanel", () => {
            const k = document.createElement("div");
            return Ge(/* @__PURE__ */ r(wt, {}), k), k;
          });
          Object.assign(this, St);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", P) : setTimeout(P, 100), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: "RTL Language Support",
            content: () => {
              const k = document.createElement("div");
              return k.setAttribute("data-plugin", "rtl-support"), Ge(/* @__PURE__ */ r(kt, { detector: e }), k), k;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL (ع/א)",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              v();
              const k = window.Blinko.i18n;
              window.Blinko.toast.success(
                i.enabled ? k.t("rtl_enabled") : k.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", Bt), window.Blinko.i18n.addResourceBundle("zh", "translation", Mt), window.Blinko.i18n.addResourceBundle("he", "translation", At), window.Blinko.i18n.addResourceBundle("ar", "translation", Ft);
        }
        destroy() {
          S(), w(), console.log("Blinko RTL Plugin destroyed");
        }
      });
    }
  }));
})();
