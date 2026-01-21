var Qt = Object.defineProperty;
var Yt = (A, m, I) => m in A ? Qt(A, m, { enumerable: !0, configurable: !0, writable: !0, value: I }) : A[m] = I;
var _ = (A, m, I) => (Yt(A, typeof m != "symbol" ? m + "" : m, I), I);
(function() {
  var A, m, I, H, xe, Se, we, ke, ae, de, ce, X = {}, Te = [], ht = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, J = Array.isArray;
  function D(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function pe(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function ue(t, e, n) {
    var i, r, s, a = {};
    for (s in e)
      s == "key" ? i = e[s] : s == "ref" ? r = e[s] : a[s] = e[s];
    if (arguments.length > 2 && (a.children = arguments.length > 3 ? A.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (s in t.defaultProps)
        a[s] === void 0 && (a[s] = t.defaultProps[s]);
    return Y(t, a, i, r, null);
  }
  function Y(t, e, n, i, r) {
    var s = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++I, __i: -1, __u: 0 };
    return r == null && m.vnode != null && m.vnode(s), s;
  }
  function N(t) {
    return t.children;
  }
  function F(t, e) {
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
  function Re(t) {
    var e, n;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((n = t.__k[e]) != null && n.__e != null) {
          t.__e = t.__c.base = n.__e;
          break;
        }
      return Re(t);
    }
  }
  function Ce(t) {
    (!t.__d && (t.__d = !0) && H.push(t) && !Z.__r++ || xe != m.debounceRendering) && ((xe = m.debounceRendering) || Se)(Z);
  }
  function Z() {
    for (var t, e, n, i, r, s, a, p = 1; H.length; )
      H.length > p && H.sort(we), t = H.shift(), p = H.length, t.__d && (n = void 0, r = (i = (e = t).__v).__e, s = [], a = [], e.__P && ((n = D({}, i)).__v = i.__v + 1, m.vnode && m.vnode(n), he(e.__P, n, i, e.__n, e.__P.namespaceURI, 32 & i.__u ? [r] : null, s, r ?? O(i), !!(32 & i.__u), a), n.__v = i.__v, n.__.__k[n.__i] = n, Pe(s, n, a), n.__e != r && Re(n)));
    Z.__r = 0;
  }
  function Le(t, e, n, i, r, s, a, p, u, d, f) {
    var c, y, b, S, h, v, w, k = i && i.__k || Te, P = e.length;
    for (u = gt(n, e, k, u, P), c = 0; c < P; c++)
      (b = n.__k[c]) != null && (y = b.__i == -1 ? X : k[b.__i] || X, b.__i = c, v = he(t, b, y, r, s, a, p, u, d, f), S = b.__e, b.ref && y.ref != b.ref && (y.ref && fe(y.ref, null, b), f.push(b.ref, b.__c || S, b)), h == null && S != null && (h = S), (w = !!(4 & b.__u)) || y.__k === b.__k ? u = Ee(b, u, t, w) : typeof b.type == "function" && v !== void 0 ? u = v : S && (u = S.nextSibling), b.__u &= -7);
    return n.__e = h, u;
  }
  function gt(t, e, n, i, r) {
    var s, a, p, u, d, f = n.length, c = f, y = 0;
    for (t.__k = new Array(r), s = 0; s < r; s++)
      (a = e[s]) != null && typeof a != "boolean" && typeof a != "function" ? (u = s + y, (a = t.__k[s] = typeof a == "string" || typeof a == "number" || typeof a == "bigint" || a.constructor == String ? Y(null, a, null, null, null) : J(a) ? Y(N, { children: a }, null, null, null) : a.constructor == null && a.__b > 0 ? Y(a.type, a.props, a.key, a.ref ? a.ref : null, a.__v) : a).__ = t, a.__b = t.__b + 1, p = null, (d = a.__i = ft(a, n, u, c)) != -1 && (c--, (p = n[d]) && (p.__u |= 2)), p == null || p.__v == null ? (d == -1 && (r > f ? y-- : r < f && y++), typeof a.type != "function" && (a.__u |= 4)) : d != u && (d == u - 1 ? y-- : d == u + 1 ? y++ : (d > u ? y-- : y++, a.__u |= 4))) : t.__k[s] = null;
    if (c)
      for (s = 0; s < f; s++)
        (p = n[s]) != null && !(2 & p.__u) && (p.__e == i && (i = O(p)), De(p, p));
    return i;
  }
  function Ee(t, e, n, i) {
    var r, s;
    if (typeof t.type == "function") {
      for (r = t.__k, s = 0; r && s < r.length; s++)
        r[s] && (r[s].__ = t, e = Ee(r[s], e, n, i));
      return e;
    }
    t.__e != e && (i && (e && t.type && !e.parentNode && (e = O(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function K(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (J(t) ? t.some(function(n) {
      K(n, e);
    }) : e.push(t)), e;
  }
  function ft(t, e, n, i) {
    var r, s, a, p = t.key, u = t.type, d = e[n], f = d != null && (2 & d.__u) == 0;
    if (d === null && t.key == null || f && p == d.key && u == d.type)
      return n;
    if (i > (f ? 1 : 0)) {
      for (r = n - 1, s = n + 1; r >= 0 || s < e.length; )
        if ((d = e[a = r >= 0 ? r-- : s++]) != null && !(2 & d.__u) && p == d.key && u == d.type)
          return a;
    }
    return -1;
  }
  function Me(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || ht.test(e) ? n : n + "px";
  }
  function ee(t, e, n, i, r) {
    var s, a;
    e:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof i == "string" && (t.style.cssText = i = ""), i)
            for (e in i)
              n && e in n || Me(t.style, e, "");
          if (n)
            for (e in n)
              i && n[e] == i[e] || Me(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        s = e != (e = e.replace(ke, "$1")), a = e.toLowerCase(), e = a in t || e == "onFocusOut" || e == "onFocusIn" ? a.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = n, n ? i ? n.u = i.u : (n.u = ae, t.addEventListener(e, s ? ce : de, s)) : t.removeEventListener(e, s ? ce : de, s);
      else {
        if (r == "http://www.w3.org/2000/svg")
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
  function Ae(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.t == null)
          e.t = ae++;
        else if (e.t < n.u)
          return;
        return n(m.event ? m.event(e) : e);
      }
    };
  }
  function he(t, e, n, i, r, s, a, p, u, d) {
    var f, c, y, b, S, h, v, w, k, P, B, V, z, re, q, W, G, C = e.type;
    if (e.constructor != null)
      return null;
    128 & n.__u && (u = !!(32 & n.__u), s = [p = e.__e = n.__e]), (f = m.__b) && f(e);
    e:
      if (typeof C == "function")
        try {
          if (w = e.props, k = "prototype" in C && C.prototype.render, P = (f = C.contextType) && i[f.__c], B = f ? P ? P.props.value : f.__ : i, n.__c ? v = (c = e.__c = n.__c).__ = c.__E : (k ? e.__c = c = new C(w, B) : (e.__c = c = new F(w, B), c.constructor = C, c.render = mt), P && P.sub(c), c.props = w, c.state || (c.state = {}), c.context = B, c.__n = i, y = c.__d = !0, c.__h = [], c._sb = []), k && c.__s == null && (c.__s = c.state), k && C.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = D({}, c.__s)), D(c.__s, C.getDerivedStateFromProps(w, c.__s))), b = c.props, S = c.state, c.__v = e, y)
            k && C.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), k && c.componentDidMount != null && c.__h.push(c.componentDidMount);
          else {
            if (k && C.getDerivedStateFromProps == null && w !== b && c.componentWillReceiveProps != null && c.componentWillReceiveProps(w, B), !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(w, c.__s, B) === !1 || e.__v == n.__v) {
              for (e.__v != n.__v && (c.props = w, c.state = c.__s, c.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function($) {
                $ && ($.__ = e);
              }), V = 0; V < c._sb.length; V++)
                c.__h.push(c._sb[V]);
              c._sb = [], c.__h.length && a.push(c);
              break e;
            }
            c.componentWillUpdate != null && c.componentWillUpdate(w, c.__s, B), k && c.componentDidUpdate != null && c.__h.push(function() {
              c.componentDidUpdate(b, S, h);
            });
          }
          if (c.context = B, c.props = w, c.__P = t, c.__e = !1, z = m.__r, re = 0, k) {
            for (c.state = c.__s, c.__d = !1, z && z(e), f = c.render(c.props, c.state, c.context), q = 0; q < c._sb.length; q++)
              c.__h.push(c._sb[q]);
            c._sb = [];
          } else
            do
              c.__d = !1, z && z(e), f = c.render(c.props, c.state, c.context), c.state = c.__s;
            while (c.__d && ++re < 25);
          c.state = c.__s, c.getChildContext != null && (i = D(D({}, i), c.getChildContext())), k && !y && c.getSnapshotBeforeUpdate != null && (h = c.getSnapshotBeforeUpdate(b, S)), W = f, f != null && f.type === N && f.key == null && (W = Be(f.props.children)), p = Le(t, J(W) ? W : [W], e, n, i, r, s, a, p, u, d), c.base = e.__e, e.__u &= -161, c.__h.length && a.push(c), v && (c.__E = c.__ = null);
        } catch ($) {
          if (e.__v = null, u || s != null)
            if ($.then) {
              for (e.__u |= u ? 160 : 128; p && p.nodeType == 8 && p.nextSibling; )
                p = p.nextSibling;
              s[s.indexOf(p)] = null, e.__e = p;
            } else {
              for (G = s.length; G--; )
                pe(s[G]);
              ge(e);
            }
          else
            e.__e = n.__e, e.__k = n.__k, $.then || ge(e);
          m.__e($, e, n);
        }
      else
        s == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : p = e.__e = _t(n.__e, e, n, i, r, s, a, u, d);
    return (f = m.diffed) && f(e), 128 & e.__u ? void 0 : p;
  }
  function ge(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(ge);
  }
  function Pe(t, e, n) {
    for (var i = 0; i < n.length; i++)
      fe(n[i], n[++i], n[++i]);
    m.__c && m.__c(e, t), t.some(function(r) {
      try {
        t = r.__h, r.__h = [], t.some(function(s) {
          s.call(r);
        });
      } catch (s) {
        m.__e(s, r.__v);
      }
    });
  }
  function Be(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : J(t) ? t.map(Be) : D({}, t);
  }
  function _t(t, e, n, i, r, s, a, p, u) {
    var d, f, c, y, b, S, h, v = n.props, w = e.props, k = e.type;
    if (k == "svg" ? r = "http://www.w3.org/2000/svg" : k == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), s != null) {
      for (d = 0; d < s.length; d++)
        if ((b = s[d]) && "setAttribute" in b == !!k && (k ? b.localName == k : b.nodeType == 3)) {
          t = b, s[d] = null;
          break;
        }
    }
    if (t == null) {
      if (k == null)
        return document.createTextNode(w);
      t = document.createElementNS(r, k, w.is && w), p && (m.__m && m.__m(e, s), p = !1), s = null;
    }
    if (k == null)
      v === w || p && t.data == w || (t.data = w);
    else {
      if (s = s && A.call(t.childNodes), v = n.props || X, !p && s != null)
        for (v = {}, d = 0; d < t.attributes.length; d++)
          v[(b = t.attributes[d]).name] = b.value;
      for (d in v)
        if (b = v[d], d != "children") {
          if (d == "dangerouslySetInnerHTML")
            c = b;
          else if (!(d in w)) {
            if (d == "value" && "defaultValue" in w || d == "checked" && "defaultChecked" in w)
              continue;
            ee(t, d, null, b, r);
          }
        }
      for (d in w)
        b = w[d], d == "children" ? y = b : d == "dangerouslySetInnerHTML" ? f = b : d == "value" ? S = b : d == "checked" ? h = b : p && typeof b != "function" || v[d] === b || ee(t, d, b, v[d], r);
      if (f)
        p || c && (f.__html == c.__html || f.__html == t.innerHTML) || (t.innerHTML = f.__html), e.__k = [];
      else if (c && (t.innerHTML = ""), Le(e.type == "template" ? t.content : t, J(y) ? y : [y], e, n, i, k == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, s, a, s ? s[0] : n.__k && O(n, 0), p, u), s != null)
        for (d = s.length; d--; )
          pe(s[d]);
      p || (d = "value", k == "progress" && S == null ? t.removeAttribute("value") : S != null && (S !== t[d] || k == "progress" && !S || k == "option" && S != v[d]) && ee(t, d, S, v[d], r), d = "checked", h != null && h != t[d] && ee(t, d, h, v[d], r));
    }
    return t;
  }
  function fe(t, e, n) {
    try {
      if (typeof t == "function") {
        var i = typeof t.__u == "function";
        i && t.__u(), i && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (r) {
      m.__e(r, n);
    }
  }
  function De(t, e, n) {
    var i, r;
    if (m.unmount && m.unmount(t), (i = t.ref) && (i.current && i.current != t.__e || fe(i, null, e)), (i = t.__c) != null) {
      if (i.componentWillUnmount)
        try {
          i.componentWillUnmount();
        } catch (s) {
          m.__e(s, e);
        }
      i.base = i.__P = null;
    }
    if (i = t.__k)
      for (r = 0; r < i.length; r++)
        i[r] && De(i[r], e, n || typeof t.type != "function");
    n || pe(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function mt(t, e, n) {
    return this.constructor(t, n);
  }
  function bt(t, e, n) {
    var i, r, s, a;
    e == document && (e = document.documentElement), m.__ && m.__(t, e), r = (i = typeof n == "function") ? null : n && n.__k || e.__k, s = [], a = [], he(e, t = (!i && n || e).__k = ue(N, null, [t]), r || X, X, e.namespaceURI, !i && n ? [n] : r ? null : e.firstChild ? A.call(e.childNodes) : null, s, !i && n ? n : r ? r.__e : e.firstChild, i, a), Pe(s, t, a);
  }
  A = Te.slice, m = { __e: function(t, e, n, i) {
    for (var r, s, a; e = e.__; )
      if ((r = e.__c) && !r.__)
        try {
          if ((s = r.constructor) && s.getDerivedStateFromError != null && (r.setState(s.getDerivedStateFromError(t)), a = r.__d), r.componentDidCatch != null && (r.componentDidCatch(t, i || {}), a = r.__d), a)
            return r.__E = r;
        } catch (p) {
          t = p;
        }
    throw t;
  } }, I = 0, F.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = D({}, this.state), typeof t == "function" && (t = t(D({}, n), this.props)), t && D(n, t), t != null && this.__v && (e && this._sb.push(e), Ce(this));
  }, F.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), Ce(this));
  }, F.prototype.render = N, H = [], Se = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, we = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, Z.__r = 0, ke = /(PointerCapture)$|Capture$/i, ae = 0, de = Ae(!1), ce = Ae(!0);
  var yt = 0;
  function o(t, e, n, i, r, s) {
    e || (e = {});
    var a, p, u = e;
    if ("ref" in u)
      for (p in u = {}, e)
        p == "ref" ? a = e[p] : u[p] = e[p];
    var d = { type: t, props: u, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --yt, __i: -1, __u: 0, __source: r, __self: s };
    if (typeof t == "function" && (a = t.defaultProps))
      for (p in a)
        u[p] === void 0 && (u[p] = a[p]);
    return m.vnode && m.vnode(d), d;
  }
  var te, T, _e, Fe, me = 0, $e = [], R = m, Ie = R.__b, He = R.__r, Ne = R.diffed, ze = R.__c, We = R.unmount, Oe = R.__;
  function Ue(t, e) {
    R.__h && R.__h(T, t, me || e), me = 0;
    var n = T.__H || (T.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function E(t) {
    return me = 1, vt(Ve, t);
  }
  function vt(t, e, n) {
    var i = Ue(te++, 2);
    if (i.t = t, !i.__c && (i.__ = [n ? n(e) : Ve(void 0, e), function(p) {
      var u = i.__N ? i.__N[0] : i.__[0], d = i.t(u, p);
      u !== d && (i.__N = [d, i.__[1]], i.__c.setState({}));
    }], i.__c = T, !T.__f)) {
      var r = function(p, u, d) {
        if (!i.__c.__H)
          return !0;
        var f = i.__c.__H.__.filter(function(y) {
          return !!y.__c;
        });
        if (f.every(function(y) {
          return !y.__N;
        }))
          return !s || s.call(this, p, u, d);
        var c = i.__c.props !== p;
        return f.forEach(function(y) {
          if (y.__N) {
            var b = y.__[0];
            y.__ = y.__N, y.__N = void 0, b !== y.__[0] && (c = !0);
          }
        }), s && s.call(this, p, u, d) || c;
      };
      T.__f = !0;
      var s = T.shouldComponentUpdate, a = T.componentWillUpdate;
      T.componentWillUpdate = function(p, u, d) {
        if (this.__e) {
          var f = s;
          s = void 0, r(p, u, d), s = f;
        }
        a && a.call(this, p, u, d);
      }, T.shouldComponentUpdate = r;
    }
    return i.__N || i.__;
  }
  function be(t, e) {
    var n = Ue(te++, 3);
    !R.__s && wt(n.__H, e) && (n.__ = t, n.u = e, T.__H.__h.push(n));
  }
  function xt() {
    for (var t; t = $e.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(ne), t.__H.__h.forEach(ye), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], R.__e(e, t.__v);
        }
  }
  R.__b = function(t) {
    T = null, Ie && Ie(t);
  }, R.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Oe && Oe(t, e);
  }, R.__r = function(t) {
    He && He(t), te = 0;
    var e = (T = t.__c).__H;
    e && (_e === T ? (e.__h = [], T.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(ne), e.__h.forEach(ye), e.__h = [], te = 0)), _e = T;
  }, R.diffed = function(t) {
    Ne && Ne(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && ($e.push(e) !== 1 && Fe === R.requestAnimationFrame || ((Fe = R.requestAnimationFrame) || St)(xt)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), _e = T = null;
  }, R.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(ne), n.__h = n.__h.filter(function(i) {
          return !i.__ || ye(i);
        });
      } catch (i) {
        e.some(function(r) {
          r.__h && (r.__h = []);
        }), e = [], R.__e(i, n.__v);
      }
    }), ze && ze(t, e);
  }, R.unmount = function(t) {
    We && We(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(i) {
      try {
        ne(i);
      } catch (r) {
        e = r;
      }
    }), n.__H = void 0, e && R.__e(e, n.__v));
  };
  var je = typeof requestAnimationFrame == "function";
  function St(t) {
    var e, n = function() {
      clearTimeout(i), je && cancelAnimationFrame(e), setTimeout(t);
    }, i = setTimeout(n, 35);
    je && (e = requestAnimationFrame(n));
  }
  function ne(t) {
    var e = T, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), T = e;
  }
  function ye(t) {
    var e = T;
    t.__c = t.__(), T = e;
  }
  function wt(t, e) {
    return !t || t.length !== e.length || e.some(function(n, i) {
      return n !== t[i];
    });
  }
  function Ve(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function kt(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function qe(t, e) {
    for (var n in t)
      if (n !== "__source" && !(n in e))
        return !0;
    for (var i in e)
      if (i !== "__source" && t[i] !== e[i])
        return !0;
    return !1;
  }
  function Ge(t, e) {
    this.props = t, this.context = e;
  }
  (Ge.prototype = new F()).isPureReactComponent = !0, Ge.prototype.shouldComponentUpdate = function(t, e) {
    return qe(this.props, t) || qe(this.state, e);
  };
  var Xe = m.__b;
  m.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Xe && Xe(t);
  };
  var Tt = m.__e;
  m.__e = function(t, e, n, i) {
    if (t.then) {
      for (var r, s = e; s = s.__; )
        if ((r = s.__c) && r.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), r.__c(t, e);
    }
    Tt(t, e, n, i);
  };
  var Je = m.unmount;
  function Qe(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(i) {
      typeof i.__c == "function" && i.__c();
    }), t.__c.__H = null), (t = kt({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(i) {
      return Qe(i, e, n);
    })), t;
  }
  function Ye(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(i) {
      return Ye(i, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function ve() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Ze(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function ie() {
    this.i = null, this.l = null;
  }
  m.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), Je && Je(t);
  }, (ve.prototype = new F()).__c = function(t, e) {
    var n = e.__c, i = this;
    i.o == null && (i.o = []), i.o.push(n);
    var r = Ze(i.__v), s = !1, a = function() {
      s || (s = !0, n.__R = null, r ? r(p) : p());
    };
    n.__R = a;
    var p = function() {
      if (!--i.__u) {
        if (i.state.__a) {
          var u = i.state.__a;
          i.__v.__k[0] = Ye(u, u.__c.__P, u.__c.__O);
        }
        var d;
        for (i.setState({ __a: i.__b = null }); d = i.o.pop(); )
          d.forceUpdate();
      }
    };
    i.__u++ || 32 & e.__u || i.setState({ __a: i.__b = i.__v.__k[0] }), t.then(a, a);
  }, ve.prototype.componentWillUnmount = function() {
    this.o = [];
  }, ve.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), i = this.__v.__k[0].__c;
        this.__v.__k[0] = Qe(this.__b, n, i.__O = i.__P);
      }
      this.__b = null;
    }
    var r = e.__a && ue(N, null, t.fallback);
    return r && (r.__u &= -33), [ue(N, null, e.__a ? null : t.children), r];
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
  (ie.prototype = new F()).__a = function(t) {
    var e = this, n = Ze(e.__v), i = e.l.get(t);
    return i[0]++, function(r) {
      var s = function() {
        e.props.revealOrder ? (i.push(r), Ke(e, t, i)) : r();
      };
      n ? n(s) : s();
    };
  }, ie.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = K(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, ie.prototype.componentDidUpdate = ie.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      Ke(t, n, e);
    });
  };
  var Rt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Ct = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Lt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Et = /[A-Z0-9]/g, Mt = typeof document < "u", At = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function et(t, e, n) {
    return e.__k == null && (e.textContent = ""), bt(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  F.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty(F.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var tt = m.event;
  function Pt() {
  }
  function Bt() {
    return this.cancelBubble;
  }
  function Dt() {
    return this.defaultPrevented;
  }
  m.event = function(t) {
    return tt && (t = tt(t)), t.persist = Pt, t.isPropagationStopped = Bt, t.isDefaultPrevented = Dt, t.nativeEvent = t;
  };
  var Ft = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, nt = m.vnode;
  m.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, i = e.type, r = {}, s = i.indexOf("-") === -1;
      for (var a in n) {
        var p = n[a];
        if (!(a === "value" && "defaultValue" in n && p == null || Mt && a === "children" && i === "noscript" || a === "class" || a === "className")) {
          var u = a.toLowerCase();
          a === "defaultValue" && "value" in n && n.value == null ? a = "value" : a === "download" && p === !0 ? p = "" : u === "translate" && p === "no" ? p = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? a = "ondblclick" : u !== "onchange" || i !== "input" && i !== "textarea" || At(n.type) ? u === "onfocus" ? a = "onfocusin" : u === "onblur" ? a = "onfocusout" : Lt.test(a) && (a = u) : u = a = "oninput" : s && Ct.test(a) ? a = a.replace(Et, "-$&").toLowerCase() : p === null && (p = void 0), u === "oninput" && r[a = u] && (a = "oninputCapture"), r[a] = p;
        }
      }
      i == "select" && r.multiple && Array.isArray(r.value) && (r.value = K(n.children).forEach(function(d) {
        d.props.selected = r.value.indexOf(d.props.value) != -1;
      })), i == "select" && r.defaultValue != null && (r.value = K(n.children).forEach(function(d) {
        d.props.selected = r.multiple ? r.defaultValue.indexOf(d.props.value) != -1 : r.defaultValue == d.props.value;
      })), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", Ft)) : (n.className && !n.class || n.class && n.className) && (r.class = r.className = n.className), e.props = r;
    }(t), t.$$typeof = Rt, nt && nt(t);
  };
  var it = m.__r;
  m.__r = function(t) {
    it && it(t), t.__c;
  };
  var ot = m.diffed;
  m.diffed = function(t) {
    ot && ot(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  function $t({ detector: t }) {
    const [e, n] = E({ activeBlocks: 0 }), [i, r] = E(15), [s, a] = E(!1), [p, u] = E(!1), d = window.Blinko.i18n;
    be(() => {
      const S = () => {
        var w;
        const v = ((w = window.blinkoRTL) == null ? void 0 : w.getStats()) || 0;
        n({ activeBlocks: v });
      };
      S();
      const h = setInterval(S, 1e3);
      return () => clearInterval(h);
    }, []), be(() => {
      const S = () => {
        const h = window.blinkoRTL;
        if (h) {
          let v;
          if (typeof h.getSettings == "function" ? v = h.getSettings() : typeof h.settings == "function" && (v = h.settings()), v && v.threshold !== void 0 && r(Math.round(v.threshold * 100)), v && v.debugMode !== void 0 && u(v.debugMode), v)
            return !0;
        }
        return !1;
      };
      if (!S()) {
        const h = setInterval(() => {
          S() && clearInterval(h);
        }, 100);
        setTimeout(() => clearInterval(h), 2e3);
      }
    }, []);
    const f = () => {
      var S;
      a(!0), (S = window.blinkoRTL) == null || S.fixSelection(), setTimeout(() => {
        a(!1), window.Blinko.toast.success("Selection processed");
      }, 500);
    }, c = (S) => {
      var v;
      const h = parseInt(S.target.value);
      r(h), (v = window.blinkoRTL) == null || v.setSensitivity(h / 100);
    }, y = (S) => {
      const h = S.target.checked;
      u(h);
      const v = window.blinkoRTL;
      v && v.service && typeof v.service.toggleDebugMode == "function" && v.service.toggleDebugMode();
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
              var h, v;
              (h = window.blinkoRTL) == null || h.toggle();
              const S = (v = window.blinkoRTL) == null ? void 0 : v.isEnabled();
              window.Blinko.toast.success(
                S ? d.t("rtl_enabled") : d.t("rtl_disabled")
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
            title: d.t("manual_toggle"),
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
          onClick: f,
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
          children: s ? "Processing..." : /* @__PURE__ */ o(N, { children: [
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
              checked: p,
              onChange: y,
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
            i,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ o(
          "input",
          {
            type: "range",
            min: "1",
            max: "50",
            value: i,
            onChange: c,
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
        "1.1.2"
      ] })
    ] });
  }
  const M = `/* Dynamic CSS Rules for RTL Elements */
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
`, U = [
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
  ], It = {
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
    dynamicCSS: M,
    permanentCSS: !1,
    targetSelectors: U,
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
  }, j = [
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
      dynamicCSS: M,
      targetSelectors: U,
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
  ], oe = [
    "inherit",
    "Arial",
    "Arial Hebrew",
    "David",
    "Miriam",
    "Segoe UI",
    "Tahoma"
  ];
  function Ht() {
    var G, C, $, at, dt, ct, pt, ut;
    const [t, e] = E({
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
      dynamicCSS: M,
      permanentCSS: !1,
      dynamicCSS: M,
      visualStyles: {
        fontFamily: "inherit",
        lineHeight: 1.5,
        paragraphMargin: 1
      },
      targetSelectors: U,
      disabledSelectors: [],
      minRTLChars: 3,
      processInterval: 2e3,
      hebrewRegex: !0,
      arabicRegex: !0,
      mixedContent: !0,
      savedPresets: []
    }), [n, i] = E(""), [r, s] = E(""), [a, p] = E(""), [u, d] = E(""), [f, c] = E([]), [y, b] = E("");
    window.Blinko.i18n, be(() => {
      var x, L, se;
      const l = (x = window.blinkoRTL) == null ? void 0 : x.settings();
      if (l)
        e(l);
      else {
        const le = localStorage.getItem("blinko-rtl-settings");
        if (le)
          try {
            const Q = JSON.parse(le);
            e((Jt) => ({ ...Jt, ...Q }));
          } catch (Q) {
            console.error("Failed to load RTL plugin settings:", Q);
          }
      }
      (se = (L = window.blinkoRTL) == null ? void 0 : L.service) != null && se.getActionLog && c(window.blinkoRTL.service.getActionLog());
      const g = (le) => {
        c((Q) => [le.detail, ...Q].slice(0, 50));
      };
      return window.addEventListener("rtl-action-logged", g), () => {
        window.removeEventListener("rtl-action-logged", g);
      };
    }, []);
    const S = (l) => {
      let g = 0;
      for (let x = 0; x < l.length; x++)
        if (l[x] === "{" && g++, l[x] === "}" && g--, g < 0)
          return !1;
      return g === 0;
    }, h = (l) => {
      var x;
      l.dynamicCSS !== void 0 && (S(l.dynamicCSS) ? b("") : b("Invalid CSS: Unbalanced curly braces"));
      const g = { ...t, ...l };
      e(g), (x = window.blinkoRTL) != null && x.service ? window.blinkoRTL.service.updateSettings(l) : (localStorage.setItem("blinko-rtl-settings", JSON.stringify(g)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: g
        })
      ));
    }, v = () => {
      var g;
      if (!r.trim())
        return;
      const l = (g = window.blinkoRTL) == null ? void 0 : g.test(r);
      p(l ? "RTL" : "LTR");
    }, w = () => {
      var l;
      (l = window.blinkoRTL) == null || l.processAll(), window.Blinko.toast.success("Content processed!");
    }, k = () => {
      n.trim() && !t.targetSelectors.includes(n.trim()) && (h({
        targetSelectors: [...t.targetSelectors, n.trim()]
      }), i(""));
    }, P = (l) => {
      h({
        targetSelectors: t.targetSelectors.filter((g) => g !== l),
        disabledSelectors: t.disabledSelectors.filter((g) => g !== l)
      });
    }, B = (l, g) => {
      const x = t.disabledSelectors.includes(l);
      let L;
      g ? L = t.disabledSelectors.filter((se) => se !== l) : x ? L = t.disabledSelectors : L = [...t.disabledSelectors, l], h({ disabledSelectors: L });
    }, V = () => {
      if (!u)
        return;
      const g = [...j, ...t.savedPresets || []].find((x) => x.id === u);
      g && (h({
        customCSS: g.css,
        dynamicCSS: g.dynamicCSS || t.dynamicCSS,
        targetSelectors: g.targetSelectors || t.targetSelectors,
        disabledSelectors: g.disabledSelectors || t.disabledSelectors
      }), window.Blinko.toast.success(`Preset "${g.name}" loaded!`));
    }, z = () => {
      const l = prompt("Enter a name for this Full Preset (CSS, Dynamic Rules, Selectors):");
      if (!l)
        return;
      const g = {
        id: `custom-${Date.now()}`,
        name: l,
        css: t.customCSS,
        dynamicCSS: t.dynamicCSS,
        targetSelectors: t.targetSelectors,
        disabledSelectors: t.disabledSelectors,
        isBuiltIn: !1
      };
      h({
        savedPresets: [...t.savedPresets || [], g]
      }), d(g.id);
    }, re = () => {
      if (!u)
        return;
      if (j.some((g) => g.id === u)) {
        window.Blinko.toast.error("Cannot delete built-in presets.");
        return;
      }
      confirm("Are you sure you want to delete this preset?") && (h({
        savedPresets: (t.savedPresets || []).filter((g) => g.id !== u)
      }), d(""));
    }, q = () => {
      const l = {
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
        dynamicCSS: M,
        permanentCSS: !1,
        dynamicCSS: M,
        visualStyles: {
          fontFamily: "inherit",
          lineHeight: 1.5,
          paragraphMargin: 1
        },
        targetSelectors: U,
        disabledSelectors: [],
        minRTLChars: 3,
        processInterval: 2e3,
        hebrewRegex: !0,
        arabicRegex: !0,
        mixedContent: !0,
        savedPresets: t.savedPresets || []
      };
      h(l), window.Blinko.toast.success("Settings reset to defaults");
    }, W = () => {
      h({ dynamicCSS: M });
    };
    return [...j, ...t.savedPresets || []], /* @__PURE__ */ o(
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
          /* @__PURE__ */ o("div", { style: { marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #eee" }, children: [
            /* @__PURE__ */ o("h2", { style: { margin: "0 0 10px 0", color: "#333" }, children: "🔧 Fixed RTL Language Support Settings" }),
            /* @__PURE__ */ o("p", { style: { margin: "0", color: t.darkMode ? "#333" : "#666", fontSize: "14px" }, children: "Precise RTL support with manual control and optional permanent CSS injection." })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #007bff",
            borderRadius: "8px",
            background: "#f8f9ff"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#007bff" }, children: "⚡ Quick Actions" }),
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: w,
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
                    var l;
                    (l = window.blinkoRTL) == null || l.toggle(), window.Blinko.toast.success("RTL toggled!");
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
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    var g;
                    const l = (g = window.blinkoRTL) == null ? void 0 : g.toggleManual();
                    e((x) => ({ ...x, manualToggle: l })), window.Blinko.toast.success(`Manual RTL ${l ? "ON" : "OFF"}`);
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
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    var g;
                    const l = (g = window.blinkoRTL) == null ? void 0 : g.toggleDebugMode();
                    e((x) => ({ ...x, debugMode: l })), window.Blinko.toast.success(`Debug Mode ${l ? "ON" : "OFF"}`);
                  },
                  style: {
                    background: t.debugMode ? "#6610f2" : "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  },
                  children: [
                    "🐞 Visual Debugger ",
                    t.debugMode ? "ON" : "OFF"
                  ]
                }
              )
            ] }),
            t.debugMode && /* @__PURE__ */ o("div", { style: { fontSize: "12px", color: "#6610f2", background: "rgba(102, 16, 242, 0.1)", padding: "10px", borderRadius: "4px" }, children: [
              /* @__PURE__ */ o("strong", { children: "Debug Mode Active:" }),
              " RTL/LTR elements are highlighted with colored outlines. ",
              /* @__PURE__ */ o("br", {}),
              "Red = RTL Detected, Blue = LTR Detected."
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa",
            maxHeight: "300px",
            overflowY: "auto"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "📜 Real-time Action Log" }),
            f.length === 0 ? /* @__PURE__ */ o("p", { style: { color: "#666", fontStyle: "italic" }, children: "No actions recorded yet..." }) : /* @__PURE__ */ o("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "12px" }, children: [
              /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ o("tr", { style: { textAlign: "left", borderBottom: "1px solid #ccc" }, children: [
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Time" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Element" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Action" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Details" })
              ] }) }),
              /* @__PURE__ */ o("tbody", { children: f.map((l, g) => /* @__PURE__ */ o("tr", { style: { borderBottom: "1px solid #eee" }, children: [
                /* @__PURE__ */ o("td", { style: { padding: "5px", whiteSpace: "nowrap" }, children: l.timestamp }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", fontFamily: "monospace" }, title: l.element, children: l.element.length > 20 ? l.element.substring(0, 20) + "..." : l.element }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", color: l.action.includes("RTL") ? "green" : "blue" }, children: l.action }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", color: "#666" }, children: l.details })
              ] }, g)) })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #6610f2",
            borderRadius: "8px",
            background: "#f8f9ff"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#6610f2" }, children: "🎨 Dynamic CSS Rules" }),
            /* @__PURE__ */ o("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#333" : "#666" }, children: "These CSS rules are applied dynamically when RTL or LTR content is detected. Customize the class definitions below to control how detected elements are styled. This single source of truth controls all detected element styling." }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ o(
                "textarea",
                {
                  value: t.dynamicCSS,
                  onChange: (l) => h({ dynamicCSS: l.target.value }),
                  placeholder: "Enter your dynamic CSS rules here...",
                  disabled: !t.enabled,
                  style: {
                    width: "100%",
                    height: "350px",
                    padding: "10px",
                    border: y ? "2px solid red" : "1px solid #ccc",
                    borderRadius: "4px",
                    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                    fontSize: "13px",
                    resize: "vertical"
                  }
                }
              ),
              y && /* @__PURE__ */ o("div", { style: { color: "red", fontSize: "12px", marginTop: "5px" }, children: y })
            ] }),
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => h({ dynamicCSS: M }),
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
                    if (y) {
                      window.Blinko.toast.error("Please fix CSS errors before saving.");
                      return;
                    }
                    window.Blinko.toast.success("Dynamic CSS Settings Saved");
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
            ] }),
            /* @__PURE__ */ o("div", { style: { marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #ddd" }, children: [
              /* @__PURE__ */ o("h4", { style: { margin: "0 0 10px 0", fontSize: "14px", color: "#6610f2" }, children: "Active Injected Stylesheet (Read-only Verification):" }),
              /* @__PURE__ */ o("div", { style: {
                background: "#eee",
                padding: "10px",
                borderRadius: "4px",
                maxHeight: "150px",
                overflowY: "auto",
                fontSize: "11px",
                fontFamily: "monospace",
                whiteSpace: "pre-wrap"
              }, children: t.dynamicCSS })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #28a745",
            borderRadius: "8px",
            background: "#f8fff8"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "🔧 RTL Application Method" }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
              "RTL Method:",
              /* @__PURE__ */ o(
                "select",
                {
                  value: t.method,
                  onChange: (l) => h({
                    method: l.target.value
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
                    /* @__PURE__ */ o("option", { value: "direct", children: "🎯 Direct Styling" }),
                    /* @__PURE__ */ o("option", { value: "attributes", children: "🏷️ HTML Attributes" }),
                    /* @__PURE__ */ o("option", { value: "css", children: "🎨 CSS Classes" }),
                    /* @__PURE__ */ o("option", { value: "unicode", children: "🔤 Unicode Bidi" }),
                    /* @__PURE__ */ o("option", { value: "all", children: "🚀 All Methods (Recommended)" })
                  ]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #fd7e14",
            borderRadius: "8px",
            background: "#fff9f0"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#fd7e14" }, children: "🎨 Dynamic CSS Rules" }),
            /* @__PURE__ */ o("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#333" : "#666" }, children: [
              "These styles are automatically injected when RTL is detected. The class ",
              /* @__PURE__ */ o("code", { children: ".blinko-detected-rtl" }),
              " is applied to RTL elements."
            ] }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ o(
              "textarea",
              {
                value: t.dynamicCSS || M,
                onChange: (l) => h({ dynamicCSS: l.target.value }),
                placeholder: "Enter your dynamic CSS rules here...",
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
            ) }),
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: /* @__PURE__ */ o(
              "button",
              {
                onClick: W,
                disabled: !t.enabled,
                style: {
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer"
                },
                children: "🔄 Reset to Default"
              }
            ) })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎛️ Mode Settings" }),
            /* @__PURE__ */ o("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enabled,
                    onChange: (l) => h({ enabled: l.target.checked })
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🔧 Enable RTL Support" })
              ] }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualMode,
                    onChange: (l) => h({ manualMode: l.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "✋ Manual Mode (Recommended)" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Manual mode only applies RTL when clearly detected, preventing unwanted changes" }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.mobileView,
                    onChange: (l) => h({ mobileView: l.target.checked })
                  }
                ),
                /* @__PURE__ */ o("span", { children: "📱 Mobile View" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Optimizes layout for mobile devices" }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.debugMode,
                    onChange: (l) => {
                      var x, L;
                      const g = l.target.checked;
                      h({ debugMode: g }), (L = (x = window.blinkoRTL) == null ? void 0 : x.service) == null || L.toggleDebugMode();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🐞 Visual Debugger" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Highlights detected RTL (Red) and LTR (Blue) elements with tooltips" }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.autoDetect,
                    onChange: (l) => h({ autoDetect: l.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🤖 Auto-detect All Content" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Continuously processes all content on the page every 2 seconds" }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualToggle,
                    onChange: (l) => {
                      const g = l.target.checked;
                      h({ manualToggle: g });
                      const x = window.blinkoRTL;
                      x && x.isEnabled() && x.processAll();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🔄 Manual RTL Toggle" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Forces RTL on all content when enabled, ignores detection" }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.darkMode,
                    onChange: (l) => {
                      const g = l.target.checked;
                      h({ darkMode: g }), g ? document.body.classList.add("dark") : document.body.classList.remove("dark");
                    }
                  }
                ),
                /* @__PURE__ */ o("span", { children: "🌙 Dark Mode Plugin UI" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#333" : "#666" }, children: "Applies dark styling to RTL plugin components only" }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.hebrewRegex,
                    onChange: (l) => h({ hebrewRegex: l.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "📜 Hebrew Regex Detection" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#333" : "#666" }, children: "Uses Unicode Script property for Hebrew detection" }),
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.arabicRegex,
                    onChange: (l) => h({ arabicRegex: l.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "📜 Arabic Regex Detection" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Applies dark styling to RTL plugin components only" })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #17a2b8",
            borderRadius: "8px",
            background: "#f0faff"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#17a2b8" }, children: "📊 Real-time Action Log" }),
            /* @__PURE__ */ o("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#333" : "#666" }, children: "Shows real-time detection and application updates for transparency." }),
            /* @__PURE__ */ o("div", { style: {
              maxHeight: "200px",
              overflowY: "auto",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "12px",
              fontFamily: "Monaco, monospace"
            }, children: f.length === 0 ? /* @__PURE__ */ o("div", { style: { color: "#999", textAlign: "center", padding: "20px" }, children: "No actions logged yet..." }) : /* @__PURE__ */ o("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
              /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ o("tr", { style: { borderBottom: "1px solid #eee", textAlign: "left" }, children: [
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Time" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Element" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Dir" }),
                /* @__PURE__ */ o("th", { style: { padding: "5px" }, children: "Content" })
              ] }) }),
              /* @__PURE__ */ o("tbody", { children: f.map((l, g) => /* @__PURE__ */ o("tr", { style: { borderBottom: "1px solid #f5f5f5" }, children: [
                /* @__PURE__ */ o("td", { style: { padding: "5px", color: "#666" }, children: l.timestamp }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", color: "#007bff" }, children: l.element }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", fontWeight: "bold", color: l.direction === "RTL" ? "#28a745" : "#dc3545" }, children: l.direction }),
                /* @__PURE__ */ o("td", { style: { padding: "5px", color: "#333" }, children: l.textPreview })
              ] }, g)) })
            ] }) })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎯 Target Selectors" }),
            /* @__PURE__ */ o("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#333" : "#666" }, children: "Specific elements to process for RTL detection (focused approach)" }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px", maxHeight: "300px", overflowY: "auto" }, children: t.targetSelectors.map((l, g) => {
              const x = (t.disabledSelectors || []).includes(l);
              return /* @__PURE__ */ o("div", { style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                marginBottom: "5px",
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                opacity: x ? 0.6 : 1
              }, children: [
                /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", flex: 1, cursor: "pointer" }, children: [
                  /* @__PURE__ */ o(
                    "input",
                    {
                      type: "checkbox",
                      checked: !x,
                      onChange: (L) => B(l, L.target.checked),
                      disabled: !t.enabled
                    }
                  ),
                  /* @__PURE__ */ o("code", { style: {
                    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                    fontSize: "13px",
                    color: "#333",
                    textDecoration: x ? "line-through" : "none"
                  }, children: l })
                ] }),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    onClick: () => P(l),
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
              ] }, g);
            }) }),
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px" }, children: [
              /* @__PURE__ */ o(
                "input",
                {
                  type: "text",
                  value: n,
                  onChange: (l) => i(l.target.value),
                  placeholder: "e.g., .markdown-body p, .vditor-reset div",
                  disabled: !t.enabled,
                  onKeyPress: (l) => l.key === "Enter" && k(),
                  style: {
                    flex: "1",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: k,
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
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #6610f2",
            borderRadius: "8px",
            background: "#f8f9ff"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#6610f2" }, children: "🎨 Visual Style Editor" }),
            /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
              /* @__PURE__ */ o("div", { children: [
                /* @__PURE__ */ o("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px" }, children: "Font Family:" }),
                /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px" }, children: [
                  /* @__PURE__ */ o(
                    "select",
                    {
                      value: oe.includes(((G = t.visualStyles) == null ? void 0 : G.fontFamily) || "inherit") ? ((C = t.visualStyles) == null ? void 0 : C.fontFamily) || "inherit" : "custom",
                      onChange: (l) => {
                        var x;
                        const g = l.target.value;
                        g === "custom" ? oe.includes(((x = t.visualStyles) == null ? void 0 : x.fontFamily) || "inherit") && h({
                          visualStyles: {
                            ...t.visualStyles,
                            fontFamily: ""
                          }
                        }) : h({
                          visualStyles: {
                            ...t.visualStyles,
                            fontFamily: g
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
                        oe.map((l) => /* @__PURE__ */ o("option", { value: l, children: l === "inherit" ? "Default (Inherit)" : l }, l)),
                        /* @__PURE__ */ o("option", { value: "custom", children: "Custom..." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ o(
                    "input",
                    {
                      type: "text",
                      value: (($ = t.visualStyles) == null ? void 0 : $.fontFamily) || "",
                      onChange: (l) => h({
                        visualStyles: {
                          ...t.visualStyles,
                          fontFamily: l.target.value
                        }
                      }),
                      placeholder: "Custom font name",
                      disabled: !t.enabled,
                      style: {
                        flex: 1,
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        display: oe.includes(((at = t.visualStyles) == null ? void 0 : at.fontFamily) || "inherit") ? "none" : "block"
                      }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ o("div", { children: [
                /* @__PURE__ */ o("label", { style: { display: "flex", justifyContent: "space-between", fontWeight: "500", marginBottom: "8px" }, children: [
                  /* @__PURE__ */ o("span", { children: "Line Height:" }),
                  /* @__PURE__ */ o("span", { children: ((dt = t.visualStyles) == null ? void 0 : dt.lineHeight) || 1.5 })
                ] }),
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "range",
                    min: "1.0",
                    max: "3.0",
                    step: "0.1",
                    value: ((ct = t.visualStyles) == null ? void 0 : ct.lineHeight) || 1.5,
                    onChange: (l) => h({
                      visualStyles: {
                        ...t.visualStyles,
                        lineHeight: parseFloat(l.target.value)
                      }
                    }),
                    disabled: !t.enabled,
                    style: { width: "100%" }
                  }
                )
              ] }),
              /* @__PURE__ */ o("div", { children: [
                /* @__PURE__ */ o("label", { style: { display: "flex", justifyContent: "space-between", fontWeight: "500", marginBottom: "8px" }, children: [
                  /* @__PURE__ */ o("span", { children: "Paragraph Spacing (em):" }),
                  /* @__PURE__ */ o("span", { children: [
                    ((pt = t.visualStyles) == null ? void 0 : pt.paragraphMargin) || 1,
                    "em"
                  ] })
                ] }),
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "range",
                    min: "0",
                    max: "3.0",
                    step: "0.1",
                    value: ((ut = t.visualStyles) == null ? void 0 : ut.paragraphMargin) || 1,
                    onChange: (l) => h({
                      visualStyles: {
                        ...t.visualStyles,
                        paragraphMargin: parseFloat(l.target.value)
                      }
                    }),
                    disabled: !t.enabled,
                    style: { width: "100%" }
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎯 Detection Settings" }),
            /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: "15px" }, children: [
              /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o("label", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Detection Sensitivity:",
                /* @__PURE__ */ o("div", { style: { marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", width: "100%", maxWidth: "300px" }, children: [
                  /* @__PURE__ */ o("div", { style: { display: "flex", alignItems: "center", gap: "10px", width: "100%", justifyContent: "flex-end" }, children: [
                    /* @__PURE__ */ o("span", { style: { fontSize: "12px", color: "#666" }, children: [
                      Math.round((t.threshold || 0.15) * 100),
                      "%"
                    ] }),
                    /* @__PURE__ */ o(
                      "input",
                      {
                        type: "range",
                        min: "1",
                        max: "50",
                        value: Math.round((t.threshold || 0.15) * 100),
                        onChange: (l) => {
                          const g = parseInt(l.target.value) / 100;
                          let x = "medium";
                          g < 0.12 ? x = "high" : g > 0.3 && (x = "low"), h({ threshold: g, sensitivity: x });
                        },
                        disabled: !t.enabled,
                        style: { width: "150px" }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o(
                    "select",
                    {
                      value: t.sensitivity,
                      onChange: (l) => {
                        const g = l.target.value;
                        h({ sensitivity: g, threshold: {
                          high: 0.1,
                          // 10% RTL chars
                          medium: 0.15,
                          // 15% RTL chars
                          low: 0.4
                          // 40% RTL chars
                        }[g] });
                      },
                      disabled: !t.enabled,
                      style: {
                        padding: "5px 10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        minWidth: "200px"
                      },
                      children: [
                        /* @__PURE__ */ o("option", { value: "high", children: "🔥 High - 10% RTL characters" }),
                        /* @__PURE__ */ o("option", { value: "medium", children: "⚖️ Medium - 15% RTL characters" }),
                        /* @__PURE__ */ o("option", { value: "low", children: "🎯 Low - 40% RTL characters" })
                      ]
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Min RTL Characters:",
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    max: "20",
                    value: t.minRTLChars,
                    onChange: (l) => h({ minRTLChars: parseInt(l.target.value) }),
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
              /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Process Interval (ms):",
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "number",
                    min: "500",
                    max: "10000",
                    step: "500",
                    value: t.processInterval,
                    onChange: (l) => h({ processInterval: parseInt(l.target.value) }),
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
              /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Direction Override:",
                /* @__PURE__ */ o(
                  "select",
                  {
                    value: t.forceDirection,
                    onChange: (l) => h({
                      forceDirection: l.target.value
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
                      /* @__PURE__ */ o("option", { value: "auto", children: "🤖 Auto-detect" }),
                      /* @__PURE__ */ o("option", { value: "rtl", children: "➡️ Force RTL" }),
                      /* @__PURE__ */ o("option", { value: "ltr", children: "⬅️ Force LTR" })
                    ]
                  }
                )
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #28a745",
            borderRadius: "8px",
            background: "#f8fff8"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "🎨 Permanent CSS Settings" }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.permanentCSS,
                    onChange: (l) => h({ permanentCSS: l.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ o("span", { children: "📌 Enable Permanent CSS Injection" })
              ] }),
              /* @__PURE__ */ o("p", { style: { margin: "5px 0 0 30px", fontSize: "12px", color: "#666" }, children: "CSS will remain active even when RTL is disabled" })
            ] }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px", padding: "15px", background: "rgba(0,0,0,0.03)", borderRadius: "6px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px" }, children: "📚 CSS Presets:" }),
              /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
                /* @__PURE__ */ o(
                  "select",
                  {
                    value: u,
                    onChange: (l) => d(l.target.value),
                    disabled: !t.enabled,
                    style: {
                      flex: 1,
                      padding: "8px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      minWidth: "200px"
                    },
                    children: [
                      /* @__PURE__ */ o("option", { value: "", children: "-- Select a Preset --" }),
                      /* @__PURE__ */ o("optgroup", { label: "Built-in Presets", children: j.map((l) => /* @__PURE__ */ o("option", { value: l.id, children: l.name }, l.id)) }),
                      t.savedPresets && t.savedPresets.length > 0 && /* @__PURE__ */ o("optgroup", { label: "Saved Presets", children: t.savedPresets.map((l) => /* @__PURE__ */ o("option", { value: l.id, children: l.name }, l.id)) })
                    ]
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    onClick: V,
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
                    onClick: re,
                    disabled: !t.enabled || !u || j.some((l) => l.id === u),
                    style: {
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      opacity: j.some((l) => l.id === u) ? 0.5 : 1
                    },
                    title: "Delete selected preset (Built-in presets cannot be deleted)",
                    children: "🗑️"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ o("label", { style: { display: "block", fontWeight: "500", marginBottom: "5px" }, children: "Custom CSS Code:" }),
              /* @__PURE__ */ o(
                "textarea",
                {
                  value: t.customCSS,
                  onChange: (l) => h({ customCSS: l.target.value }),
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
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: z,
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
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🧪 Test RTL Detection" }),
            /* @__PURE__ */ o("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ o(
              "textarea",
              {
                value: r,
                onChange: (l) => s(l.target.value),
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
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", marginBottom: "15px" }, children: /* @__PURE__ */ o(
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
            a && /* @__PURE__ */ o("div", { style: {
              padding: "10px",
              background: a === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${a === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ o("strong", { children: a === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
            ] }),
            /* @__PURE__ */ o("div", { style: { fontSize: "14px", color: t.darkMode ? "#333" : "#666", lineHeight: "1.6" }, children: [
              /* @__PURE__ */ o("strong", { children: "🧪 Test Examples:" }),
              /* @__PURE__ */ o("br", {}),
              /* @__PURE__ */ o("strong", { children: "Hebrew:" }),
              " שלום עולם - זהו טקסט בעברית",
              /* @__PURE__ */ o("br", {}),
              /* @__PURE__ */ o("strong", { children: "Arabic:" }),
              " مرحبا بالعالم - هذا نص باللغة العربية",
              /* @__PURE__ */ o("br", {}),
              /* @__PURE__ */ o("strong", { children: "English:" }),
              " Hello world - this is English text"
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ o("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🔧 Advanced Actions" }),
            /* @__PURE__ */ o("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: q,
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
                  onClick: () => {
                    const l = JSON.stringify(t, null, 2);
                    navigator.clipboard.writeText(l), window.Blinko.toast.success("Settings copied to clipboard");
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
  const rt = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "1.1.2",
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
  class Nt {
    constructor(e = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      _(this, "name", "CharacterCode");
      _(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      _(this, "RTL_RANGES", [
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
      return this.RTL_RANGES.some(([i, r]) => n >= i && n <= r);
    }
    /**
     * Detect RTL content in text
     */
    detect(e) {
      if (!e || e.length === 0)
        return !1;
      const n = e.substring(0, this.config.sampleSize);
      let i = 0, r = 0;
      for (const p of n)
        /\s|[.,!?;:()[\]{}]/.test(p) || (r++, this.isRTLChar(p) && i++);
      return i < this.config.minRTLChars ? !1 : (r > 0 ? i / r : 0) >= {
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
  class zt {
    constructor(e = !0, n = !0, i = 0.3, r = 3) {
      _(this, "name", "Regex");
      // Hebrew regex range: 0590-05FF, FB1D-FB4F (Presentation forms A), FB50-FBB1 (Presentation forms B - wait, that's Arabic)
      // Hebrew: \u0590-\u05FF
      _(this, "hebrewPattern", "\\u0590-\\u05FF");
      // Arabic regex range
      _(this, "arabicPattern", "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF");
      _(this, "checkHebrew");
      _(this, "checkArabic");
      _(this, "threshold");
      // Ratio 0.0 - 1.0
      _(this, "minRTLChars", 3);
      this.checkHebrew = e, this.checkArabic = n, this.threshold = i, this.minRTLChars = r;
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
      const i = new RegExp(`[${n.join("")}]`, "g"), r = e.match(i);
      if (!r)
        return !1;
      const s = r.length;
      if (s < this.minRTLChars)
        return e.trim().length >= this.minRTLChars, !1;
      const a = e.length;
      return a === 0 ? !1 : s / a > this.threshold;
    }
  }
  class st {
    constructor(e) {
      _(this, "name", "Combined");
      _(this, "strategies");
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
  class Wt {
    constructor(e = {}) {
      _(this, "strategy");
      _(this, "charCodeStrategy");
      _(this, "regexStrategy");
      _(this, "config");
      this.config = {
        sensitivity: "medium",
        minRTLChars: 3,
        sampleSize: 100,
        ...e
      }, this.charCodeStrategy = new Nt(this.config), this.regexStrategy = new zt(!0, !0, 0.3, this.config.minRTLChars), this.strategy = new st([
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
          this.strategy = new st([
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
  function lt(t, e, n = !1) {
    let i = null;
    return function(...r) {
      const s = this, a = function() {
        i = null, n || t.apply(s, r);
      }, p = n && !i;
      i && clearTimeout(i), i = setTimeout(a, e), p && t.apply(s, r);
    };
  }
  class Ot {
    constructor(e) {
      _(this, "detector");
      _(this, "isEnabled", !1);
      _(this, "activeToast", null);
      _(this, "handlePaste", (e) => {
        var r;
        if (!this.isEnabled)
          return;
        const n = e.target;
        if (!this.isEditable(n))
          return;
        const i = (r = e.clipboardData) == null ? void 0 : r.getData("text/plain");
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
      var r, s, a, p;
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
      }), document.body.appendChild(i), this.activeToast = i, (r = i.querySelector("#rtl-btn-split")) == null || r.addEventListener("click", () => {
        this.insertText(n, this.processSplit(e)), this.removeToast();
      }), (s = i.querySelector("#rtl-btn-wrap")) == null || s.addEventListener("click", () => {
        this.insertText(n, this.processWrap(e)), this.removeToast();
      }), (a = i.querySelector("#rtl-btn-original")) == null || a.addEventListener("click", () => {
        this.insertText(n, e), this.removeToast();
      }), (p = i.querySelector(".rtl-toast-close")) == null || p.addEventListener("click", () => {
        this.removeToast();
      });
    }
    removeToast() {
      this.activeToast && (this.activeToast.remove(), this.activeToast = null);
    }
    insertText(e, n) {
      if (e.tagName === "TEXTAREA" || e.tagName === "INPUT") {
        const i = e, r = i.selectionStart || 0, s = i.selectionEnd || 0;
        i.value = i.value.substring(0, r) + n + i.value.substring(s), i.selectionStart = i.selectionEnd = r + n.length, i.dispatchEvent(new Event("input", { bubbles: !0 }));
      } else if (e.focus(), !document.execCommand("insertText", !1, n)) {
        const r = window.getSelection();
        if (r && r.rangeCount > 0) {
          const s = r.getRangeAt(0);
          s.deleteContents(), s.insertNode(document.createTextNode(n)), s.collapse(!1);
        }
      }
    }
    processSplit(e) {
      const n = /([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g;
      let i = e.replace(n, (r) => `
${r}
`);
      return i = i.replace(/\n{3,}/g, `

`).trim(), i;
    }
    processWrap(e) {
      const n = "⁧", i = "⁩";
      return e.replace(/([\u0590-\u05FF\u0600-\u06FF]+[\s\u0590-\u05FF\u0600-\u06FF]*)/g, `${n}$1${i}`);
    }
  }
  class Ut {
    constructor(e) {
      _(this, "button", null);
      _(this, "currentTarget", null);
      _(this, "hideTimeout", null);
      _(this, "options");
      _(this, "isHoveringButton", !1);
      _(this, "styleElement", null);
      _(this, "onMouseOver", (e) => {
        if (!this.options.isEnabled())
          return;
        const i = e.target.closest(this.options.selectors.join(","));
        i && this.showButton(i);
      });
      _(this, "onMouseOut", (e) => {
        this.scheduleHide();
      });
      _(this, "hideButton", () => {
        var e;
        (e = this.button) == null || e.classList.remove("visible");
      });
      _(this, "onButtonClick", (e) => {
        if (e.stopPropagation(), !this.currentTarget)
          return;
        const n = this.currentTarget.getAttribute("data-manual-dir"), r = window.getComputedStyle(this.currentTarget).direction === "rtl";
        let s = "ltr";
        n === "ltr" ? s = "rtl" : n === "rtl" ? s = "ltr" : s = r ? "ltr" : "rtl", this.currentTarget.setAttribute("data-manual-dir", s), this.options.processElement(this.currentTarget);
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
        z-index: 9998;
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
      this.button.getBoundingClientRect(), e.top;
      const n = Math.min(e.right - 30, window.innerWidth - 40);
      this.button.style.top = e.top + 2 + "px", this.button.style.left = n + "px";
    }
  }
  class jt {
    constructor(e) {
      _(this, "detector");
      _(this, "isRTLEnabled", !1);
      _(this, "styleElement", null);
      _(this, "permanentStyleElement", null);
      _(this, "dynamicStyleElement", null);
      _(this, "observer", null);
      _(this, "autoProcessInterval", null);
      // Managers
      _(this, "pasteInterceptor");
      _(this, "hoverManager", null);
      // Optimizations
      _(this, "pendingElements", /* @__PURE__ */ new Set());
      _(this, "debouncedProcessQueue");
      _(this, "debouncedProcessAll");
      // Action Log
      _(this, "actionLog", []);
      _(this, "MAX_LOG_SIZE", 50);
      // Hebrew regex from userscript
      _(this, "hebrewRegex", /\p{Script=Hebrew}/u);
      _(this, "arabicRegex", /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/);
      _(this, "settings", { ...It, targetSelectors: U });
      _(this, "processElement", (e) => {
        if (!e)
          return;
        if (this.settings.disabledSelectors && this.settings.disabledSelectors.some((s) => e.matches(s))) {
          console.log("Skipping disabled element:", e.tagName);
          return;
        }
        e.closest(".flex, .grid, header, nav, .sidebar, .toolbar");
        const n = e.textContent || e.value || e.placeholder || "";
        if (console.log("Processing element:", e.tagName, "Text:", n.substring(0, 10)), !n.trim() || n.length < this.settings.minRTLChars) {
          console.log("Skipping short text");
          return;
        }
        let i = !1;
        const r = e.getAttribute("data-manual-dir");
        if (r === "rtl")
          i = !0;
        else if (r === "ltr")
          i = !1;
        else if (this.settings.manualToggle)
          i = !0;
        else if (this.settings.forceDirection === "rtl")
          i = !0;
        else if (this.settings.forceDirection === "ltr")
          i = !1;
        else if (e.matches("pre, code, .code-block, .CodeMirror-line, .notion-code-block")) {
          const a = (n.match(/[\u0590-\u05FF]/g) || []).length, p = (n.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length, u = a + p, d = n.replace(/\s/g, "").length || n.length;
          u / d > 0.6 && (i = !0);
        } else
          this.settings.hebrewRegex && this.detectHebrewRegex(n) || this.settings.arabicRegex && this.detectArabicRegex(n) ? i = !0 : i = this.detector.detectRTL(n);
        switch (this.logAction(e, i), this.settings.method) {
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
            this.applyCSSClassRTL(e, i), this.applyAttributeRTL(e, i), this.applyDirectRTL(e, i);
            break;
        }
        this.settings.processMixedContent && this.settings.mixedContent;
      });
      _(this, "processAllElements", () => {
        if (!this.isRTLEnabled)
          return;
        const n = this.settings.targetSelectors.filter(
          (i) => !this.settings.disabledSelectors.includes(i)
        ).join(", ");
        if (console.log("processAllElements selectors:", n), n) {
          const i = document.querySelectorAll(n);
          console.log("processAllElements found elements:", i.length), i.forEach((r) => {
            this.processElement(r);
          });
        }
      });
      _(this, "handleInput", (e) => {
        const n = e.target;
        n && (n.tagName === "INPUT" || n.tagName === "TEXTAREA" || n.isContentEditable) && (this.pendingElements.add(n), this.debouncedProcessQueue());
      });
      this.detector = e, this.loadSettings(), this.pasteInterceptor = new Ot(e), this.debouncedProcessAll = lt(() => this.processAllElements(), 200), this.debouncedProcessQueue = lt(() => {
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
      const i = {
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        element: e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + (e.className ? `.${e.className.split(" ").join(".")}` : ""),
        direction: n ? "RTL" : "LTR",
        textPreview: (e.textContent || "").substring(0, 20) + "..."
      };
      this.actionLog.unshift(i), this.actionLog.length > this.MAX_LOG_SIZE && this.actionLog.pop(), window.dispatchEvent(new CustomEvent("rtl-action-logged", { detail: i }));
    }
    isEnabled() {
      return this.isRTLEnabled;
    }
    loadSettings() {
      const e = localStorage.getItem("blinko-rtl-settings");
      if (e)
        try {
          const n = JSON.parse(e);
          if (this.settings = { ...this.settings, ...n }, !n.targetSelectors || n.targetSelectors.length < 5) {
            const i = new Set(n.targetSelectors || []), r = [.../* @__PURE__ */ new Set([...U, ...Array.from(i)])];
            this.settings.targetSelectors = r;
          }
          this.settings.dynamicCSS || (this.settings.dynamicCSS = M), this.settings.disabledSelectors || (this.settings.disabledSelectors = []), this.detector.updateConfig({
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
      }), this.injectCSS(), this.settings.permanentCSS && this.settings.customCSS ? this.injectPermanentCSS() : this.removePermanentCSS(), this.isRTLEnabled && this.injectDynamicCSS(), this.isRTLEnabled && (this.setupObserver(), this.startAutoProcessing(), this.debouncedProcessAll()), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: this.settings
        })
      );
    }
    injectCSS() {
      this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.id = "blinko-dynamic-css", document.head.appendChild(this.styleElement)), this.styleElement.textContent = this.settings.dynamicCSS;
    }
    injectDynamicCSS() {
      this.dynamicStyleElement || (this.dynamicStyleElement = document.createElement("style"), this.dynamicStyleElement.id = "blinko-rtl-dynamic-css", document.head.appendChild(this.dynamicStyleElement));
      let e = this.settings.dynamicCSS || M;
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
    // Method 1: Direct style application
    // DEPRECATED: Moving to class-based application only, but kept for legacy method 'direct' if user specifically requests it
    // However, we align it to avoid inline conflict with dynamic CSS
    applyDirectRTL(e, n) {
      n ? (e.classList.add("blinko-detected-rtl"), e.style.direction = "rtl", e.style.textAlign = "right", e.style.unicodeBidi = "embed") : (e.classList.remove("blinko-detected-rtl"), e.style.removeProperty("direction"), e.style.removeProperty("text-align"), e.style.removeProperty("unicode-bidi")), this.applyDebugVisuals(e, n);
    }
    // Method 2: Attribute-based RTL
    applyAttributeRTL(e, n) {
      n ? (e.setAttribute("dir", "rtl"), e.setAttribute("lang", "he")) : (e.setAttribute("dir", "ltr"), e.removeAttribute("lang")), this.applyDebugVisuals(e, n);
    }
    // Method 3: CSS class-based RTL (Primary Method)
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
      this.isRTLEnabled = !0, this.injectCSS(), this.injectDynamicCSS(), this.settings.permanentCSS && this.injectPermanentCSS(), this.pasteInterceptor.enable(), this.hoverManager || (this.hoverManager = new Ut({
        selectors: this.settings.targetSelectors,
        processElement: (e) => this.processElement(e),
        isEnabled: () => this.isRTLEnabled
      }), this.hoverManager.init()), document.addEventListener("input", this.handleInput, { capture: !0, passive: !0 }), this.setupObserver(), this.startAutoProcessing(), this.debouncedProcessAll();
    }
    disable() {
      this.isRTLEnabled = !1, this.removeCSS(), this.pasteInterceptor.disable(), this.hoverManager && (this.hoverManager.destroy(), this.hoverManager = null), document.removeEventListener("input", this.handleInput), this.stopAutoProcessing(), this.observer && (this.observer.disconnect(), this.observer = null), this.pendingElements.clear();
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
      this.settings.debugMode ? (e.classList.remove("rtl-debug-rtl", "rtl-debug-ltr"), n ? (e.classList.add("rtl-debug-rtl"), e.setAttribute("data-rtl-debug", "RTL Detected")) : (e.classList.add("rtl-debug-ltr"), e.setAttribute("data-rtl-debug", "LTR Detected"))) : (e.classList.remove("rtl-debug-rtl", "rtl-debug-ltr"), e.removeAttribute("data-rtl-debug"));
    }
    setupObserver() {
      this.observer && this.observer.disconnect(), this.settings.autoDetect && (this.observer = new MutationObserver((e) => {
        if (!this.isRTLEnabled)
          return;
        let n = !1;
        const i = this.settings.targetSelectors.filter(
          (s) => !this.settings.disabledSelectors.includes(s)
        ), r = i.join(", ");
        e.forEach((s) => {
          if (s.type === "childList")
            s.addedNodes.forEach((a) => {
              if (a.nodeType === Node.ELEMENT_NODE) {
                const p = a;
                i.some((u) => p.matches(u)) && (this.pendingElements.add(p), n = !0), r && p.querySelector(r) && (p.querySelectorAll(r).forEach((u) => {
                  this.pendingElements.add(u);
                }), n = !0);
              }
            });
          else if (s.type === "characterData" || s.type === "attributes") {
            const a = s.target.nodeType === Node.ELEMENT_NODE ? s.target : s.target.parentElement;
            a && i.some((p) => a.matches(p)) && (this.pendingElements.add(a), n = !0);
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
  const dn = "", Vt = {
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
  }, qt = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Gt = {
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
  }, Xt = {
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
      const e = new Wt(), n = new jt(e);
      let i = null;
      function r() {
        if (i)
          return;
        const u = n.getSettings();
        i = document.createElement("button"), i.className = "rtl-toggle-btn", i.innerHTML = "ع/א", i.title = "Toggle RTL Support (Hebrew/Arabic)", i.addEventListener("click", () => {
          n.toggle(), s();
        }), document.body.appendChild(i), u.darkMode && i.classList.add("dark-mode"), s();
      }
      function s() {
        i && (n.isEnabled() ? i.classList.add("active") : i.classList.remove("active"));
      }
      function a() {
        i && (i.remove(), i = null);
      }
      function p() {
        console.log("Initializing Advanced Blinko RTL Plugin..."), r(), localStorage.getItem("blinko-rtl-enabled") === "true" && (n.enable(), s()), window.addEventListener("rtl-settings-changed", (d) => {
          const f = d.detail;
          i && (f.darkMode ? i.classList.add("dark-mode") : i.classList.remove("dark-mode"));
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
          test: (d) => {
            const f = e.detectRTL(d), c = n.detectHebrewRegex(d), y = n.detectArabicRegex(d);
            return console.log(`Text "${d}" -> Original: ${f ? "RTL" : "LTR"}, Hebrew: ${c}, Arabic: ${y}`), f;
          },
          testHebrew: (d) => n.detectHebrewRegex(d),
          testArabic: (d) => n.detectArabicRegex(d),
          getStats: () => document.querySelectorAll('.rtl-force, .rtl-auto, [dir="rtl"]').length,
          setSensitivity: (d) => {
            let f = "medium";
            d < 0.12 ? f = "high" : d > 0.3 && (f = "low"), n.updateSettings({ threshold: d, sensitivity: f });
          },
          fixSelection: () => {
            const d = window.getSelection();
            if (!d || d.rangeCount === 0)
              return;
            let c = d.getRangeAt(0).commonAncestorContainer;
            if (c.nodeType === Node.TEXT_NODE && (c = c.parentNode), c instanceof HTMLElement) {
              n.processElement(c);
              const y = c.closest("p, div, li, td, th");
              y && n.processElement(y);
            }
          }
        }, console.log("Advanced Blinko RTL Plugin initialized successfully");
      }
      t("default", class {
        constructor() {
          _(this, "withSettingPanel", !0);
          _(this, "renderSettingPanel", () => {
            const d = document.createElement("div");
            return et(/* @__PURE__ */ o(Ht, {}), d), d;
          });
          Object.assign(this, rt);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", p) : setTimeout(p, 100), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: `RTL Language Support (v${rt.version}) (ع/א)`,
            content: () => {
              const d = document.createElement("div");
              return d.setAttribute("data-plugin", "rtl-support"), et(/* @__PURE__ */ o($t, { detector: e }), d), d;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL (ع/א)",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              n.toggle(), s();
              const d = window.Blinko.i18n;
              window.Blinko.toast.success(
                n.isEnabled() ? d.t("rtl_enabled") : d.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", Vt), window.Blinko.i18n.addResourceBundle("zh", "translation", qt), window.Blinko.i18n.addResourceBundle("he", "translation", Gt), window.Blinko.i18n.addResourceBundle("ar", "translation", Xt);
        }
        destroy() {
          n.disable(), a(), console.log("Advanced RTL Plugin destroyed");
        }
      });
    }
  }));
})();
