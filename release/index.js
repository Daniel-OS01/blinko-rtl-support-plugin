var Ht = Object.defineProperty;
var Ut = (E, g, F) => g in E ? Ht(E, g, { enumerable: !0, configurable: !0, writable: !0, value: F }) : E[g] = F;
var v = (E, g, F) => (Ut(E, typeof g != "symbol" ? g + "" : g, F), F);
(function() {
  var E, g, F, I, me, be, ye, ve, re, oe, se, j = {}, xe = [], lt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, V = Array.isArray;
  function M(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function le(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function ae(t, e, n) {
    var i, r, o, s = {};
    for (o in e)
      o == "key" ? i = e[o] : o == "ref" ? r = e[o] : s[o] = e[o];
    if (arguments.length > 2 && (s.children = arguments.length > 3 ? E.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (o in t.defaultProps)
        s[o] === void 0 && (s[o] = t.defaultProps[o]);
    return X(t, s, i, r, null);
  }
  function X(t, e, n, i, r) {
    var o = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++F, __i: -1, __u: 0 };
    return r == null && g.vnode != null && g.vnode(o), o;
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
  function Se(t) {
    var e, n;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((n = t.__k[e]) != null && n.__e != null) {
          t.__e = t.__c.base = n.__e;
          break;
        }
      return Se(t);
    }
  }
  function ke(t) {
    (!t.__d && (t.__d = !0) && I.push(t) && !Z.__r++ || me != g.debounceRendering) && ((me = g.debounceRendering) || be)(Z);
  }
  function Z() {
    for (var t, e, n, i, r, o, s, c = 1; I.length; )
      I.length > c && I.sort(ye), t = I.shift(), c = I.length, t.__d && (n = void 0, r = (i = (e = t).__v).__e, o = [], s = [], e.__P && ((n = M({}, i)).__v = i.__v + 1, g.vnode && g.vnode(n), de(e.__P, n, i, e.__n, e.__P.namespaceURI, 32 & i.__u ? [r] : null, o, r ?? H(i), !!(32 & i.__u), s), n.__v = i.__v, n.__.__k[n.__i] = n, Ce(o, n, s), n.__e != r && Se(n)));
    Z.__r = 0;
  }
  function we(t, e, n, i, r, o, s, c, u, a, h) {
    var d, b, f, S, _, y, k, w = i && i.__k || xe, A = e.length;
    for (u = at(n, e, w, u, A), d = 0; d < A; d++)
      (f = n.__k[d]) != null && (b = f.__i == -1 ? j : w[f.__i] || j, f.__i = d, y = de(t, f, b, r, o, s, c, u, a, h), S = f.__e, f.ref && b.ref != f.ref && (b.ref && ue(b.ref, null, f), h.push(f.ref, f.__c || S, f)), _ == null && S != null && (_ = S), (k = !!(4 & f.__u)) || b.__k === f.__k ? u = Te(f, u, t, k) : typeof f.type == "function" && y !== void 0 ? u = y : S && (u = S.nextSibling), f.__u &= -7);
    return n.__e = _, u;
  }
  function at(t, e, n, i, r) {
    var o, s, c, u, a, h = n.length, d = h, b = 0;
    for (t.__k = new Array(r), o = 0; o < r; o++)
      (s = e[o]) != null && typeof s != "boolean" && typeof s != "function" ? (u = o + b, (s = t.__k[o] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? X(null, s, null, null, null) : V(s) ? X(N, { children: s }, null, null, null) : s.constructor == null && s.__b > 0 ? X(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = t, s.__b = t.__b + 1, c = null, (a = s.__i = dt(s, n, u, d)) != -1 && (d--, (c = n[a]) && (c.__u |= 2)), c == null || c.__v == null ? (a == -1 && (r > h ? b-- : r < h && b++), typeof s.type != "function" && (s.__u |= 4)) : a != u && (a == u - 1 ? b-- : a == u + 1 ? b++ : (a > u ? b-- : b++, s.__u |= 4))) : t.__k[o] = null;
    if (d)
      for (o = 0; o < h; o++)
        (c = n[o]) != null && !(2 & c.__u) && (c.__e == i && (i = H(c)), Ae(c, c));
    return i;
  }
  function Te(t, e, n, i) {
    var r, o;
    if (typeof t.type == "function") {
      for (r = t.__k, o = 0; r && o < r.length; o++)
        r[o] && (r[o].__ = t, e = Te(r[o], e, n, i));
      return e;
    }
    t.__e != e && (i && (e && t.type && !e.parentNode && (e = H(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function Q(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (V(t) ? t.some(function(n) {
      Q(n, e);
    }) : e.push(t)), e;
  }
  function dt(t, e, n, i) {
    var r, o, s, c = t.key, u = t.type, a = e[n], h = a != null && (2 & a.__u) == 0;
    if (a === null && t.key == null || h && c == a.key && u == a.type)
      return n;
    if (i > (h ? 1 : 0)) {
      for (r = n - 1, o = n + 1; r >= 0 || o < e.length; )
        if ((a = e[s = r >= 0 ? r-- : o++]) != null && !(2 & a.__u) && c == a.key && u == a.type)
          return s;
    }
    return -1;
  }
  function Le(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || lt.test(e) ? n : n + "px";
  }
  function J(t, e, n, i, r) {
    var o, s;
    e:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof i == "string" && (t.style.cssText = i = ""), i)
            for (e in i)
              n && e in n || Le(t.style, e, "");
          if (n)
            for (e in n)
              i && n[e] == i[e] || Le(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        o = e != (e = e.replace(ve, "$1")), s = e.toLowerCase(), e = s in t || e == "onFocusOut" || e == "onFocusIn" ? s.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = n, n ? i ? n.u = i.u : (n.u = re, t.addEventListener(e, o ? se : oe, o)) : t.removeEventListener(e, o ? se : oe, o);
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
  function Re(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.t == null)
          e.t = re++;
        else if (e.t < n.u)
          return;
        return n(g.event ? g.event(e) : e);
      }
    };
  }
  function de(t, e, n, i, r, o, s, c, u, a) {
    var h, d, b, f, S, _, y, k, w, A, P, W, z, ne, O, p, m, x = e.type;
    if (e.constructor != null)
      return null;
    128 & n.__u && (u = !!(32 & n.__u), o = [c = e.__e = n.__e]), (h = g.__b) && h(e);
    e:
      if (typeof x == "function")
        try {
          if (k = e.props, w = "prototype" in x && x.prototype.render, A = (h = x.contextType) && i[h.__c], P = h ? A ? A.props.value : h.__ : i, n.__c ? y = (d = e.__c = n.__c).__ = d.__E : (w ? e.__c = d = new x(k, P) : (e.__c = d = new $(k, P), d.constructor = x, d.render = ut), A && A.sub(d), d.props = k, d.state || (d.state = {}), d.context = P, d.__n = i, b = d.__d = !0, d.__h = [], d._sb = []), w && d.__s == null && (d.__s = d.state), w && x.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = M({}, d.__s)), M(d.__s, x.getDerivedStateFromProps(k, d.__s))), f = d.props, S = d.state, d.__v = e, b)
            w && x.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), w && d.componentDidMount != null && d.__h.push(d.componentDidMount);
          else {
            if (w && x.getDerivedStateFromProps == null && k !== f && d.componentWillReceiveProps != null && d.componentWillReceiveProps(k, P), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(k, d.__s, P) === !1 || e.__v == n.__v) {
              for (e.__v != n.__v && (d.props = k, d.state = d.__s, d.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(T) {
                T && (T.__ = e);
              }), W = 0; W < d._sb.length; W++)
                d.__h.push(d._sb[W]);
              d._sb = [], d.__h.length && s.push(d);
              break e;
            }
            d.componentWillUpdate != null && d.componentWillUpdate(k, d.__s, P), w && d.componentDidUpdate != null && d.__h.push(function() {
              d.componentDidUpdate(f, S, _);
            });
          }
          if (d.context = P, d.props = k, d.__P = t, d.__e = !1, z = g.__r, ne = 0, w) {
            for (d.state = d.__s, d.__d = !1, z && z(e), h = d.render(d.props, d.state, d.context), O = 0; O < d._sb.length; O++)
              d.__h.push(d._sb[O]);
            d._sb = [];
          } else
            do
              d.__d = !1, z && z(e), h = d.render(d.props, d.state, d.context), d.state = d.__s;
            while (d.__d && ++ne < 25);
          d.state = d.__s, d.getChildContext != null && (i = M(M({}, i), d.getChildContext())), w && !b && d.getSnapshotBeforeUpdate != null && (_ = d.getSnapshotBeforeUpdate(f, S)), p = h, h != null && h.type === N && h.key == null && (p = Ee(h.props.children)), c = we(t, V(p) ? p : [p], e, n, i, r, o, s, c, u, a), d.base = e.__e, e.__u &= -161, d.__h.length && s.push(d), y && (d.__E = d.__ = null);
        } catch (T) {
          if (e.__v = null, u || o != null)
            if (T.then) {
              for (e.__u |= u ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                c = c.nextSibling;
              o[o.indexOf(c)] = null, e.__e = c;
            } else {
              for (m = o.length; m--; )
                le(o[m]);
              ce(e);
            }
          else
            e.__e = n.__e, e.__k = n.__k, T.then || ce(e);
          g.__e(T, e, n);
        }
      else
        o == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : c = e.__e = ct(n.__e, e, n, i, r, o, s, u, a);
    return (h = g.diffed) && h(e), 128 & e.__u ? void 0 : c;
  }
  function ce(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(ce);
  }
  function Ce(t, e, n) {
    for (var i = 0; i < n.length; i++)
      ue(n[i], n[++i], n[++i]);
    g.__c && g.__c(e, t), t.some(function(r) {
      try {
        t = r.__h, r.__h = [], t.some(function(o) {
          o.call(r);
        });
      } catch (o) {
        g.__e(o, r.__v);
      }
    });
  }
  function Ee(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : V(t) ? t.map(Ee) : M({}, t);
  }
  function ct(t, e, n, i, r, o, s, c, u) {
    var a, h, d, b, f, S, _, y = n.props, k = e.props, w = e.type;
    if (w == "svg" ? r = "http://www.w3.org/2000/svg" : w == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), o != null) {
      for (a = 0; a < o.length; a++)
        if ((f = o[a]) && "setAttribute" in f == !!w && (w ? f.localName == w : f.nodeType == 3)) {
          t = f, o[a] = null;
          break;
        }
    }
    if (t == null) {
      if (w == null)
        return document.createTextNode(k);
      t = document.createElementNS(r, w, k.is && k), c && (g.__m && g.__m(e, o), c = !1), o = null;
    }
    if (w == null)
      y === k || c && t.data == k || (t.data = k);
    else {
      if (o = o && E.call(t.childNodes), y = n.props || j, !c && o != null)
        for (y = {}, a = 0; a < t.attributes.length; a++)
          y[(f = t.attributes[a]).name] = f.value;
      for (a in y)
        if (f = y[a], a != "children") {
          if (a == "dangerouslySetInnerHTML")
            d = f;
          else if (!(a in k)) {
            if (a == "value" && "defaultValue" in k || a == "checked" && "defaultChecked" in k)
              continue;
            J(t, a, null, f, r);
          }
        }
      for (a in k)
        f = k[a], a == "children" ? b = f : a == "dangerouslySetInnerHTML" ? h = f : a == "value" ? S = f : a == "checked" ? _ = f : c && typeof f != "function" || y[a] === f || J(t, a, f, y[a], r);
      if (h)
        c || d && (h.__html == d.__html || h.__html == t.innerHTML) || (t.innerHTML = h.__html), e.__k = [];
      else if (d && (t.innerHTML = ""), we(e.type == "template" ? t.content : t, V(b) ? b : [b], e, n, i, w == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, o, s, o ? o[0] : n.__k && H(n, 0), c, u), o != null)
        for (a = o.length; a--; )
          le(o[a]);
      c || (a = "value", w == "progress" && S == null ? t.removeAttribute("value") : S != null && (S !== t[a] || w == "progress" && !S || w == "option" && S != y[a]) && J(t, a, S, y[a], r), a = "checked", _ != null && _ != t[a] && J(t, a, _, y[a], r));
    }
    return t;
  }
  function ue(t, e, n) {
    try {
      if (typeof t == "function") {
        var i = typeof t.__u == "function";
        i && t.__u(), i && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (r) {
      g.__e(r, n);
    }
  }
  function Ae(t, e, n) {
    var i, r;
    if (g.unmount && g.unmount(t), (i = t.ref) && (i.current && i.current != t.__e || ue(i, null, e)), (i = t.__c) != null) {
      if (i.componentWillUnmount)
        try {
          i.componentWillUnmount();
        } catch (o) {
          g.__e(o, e);
        }
      i.base = i.__P = null;
    }
    if (i = t.__k)
      for (r = 0; r < i.length; r++)
        i[r] && Ae(i[r], e, n || typeof t.type != "function");
    n || le(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function ut(t, e, n) {
    return this.constructor(t, n);
  }
  function pt(t, e, n) {
    var i, r, o, s;
    e == document && (e = document.documentElement), g.__ && g.__(t, e), r = (i = typeof n == "function") ? null : n && n.__k || e.__k, o = [], s = [], de(e, t = (!i && n || e).__k = ae(N, null, [t]), r || j, j, e.namespaceURI, !i && n ? [n] : r ? null : e.firstChild ? E.call(e.childNodes) : null, o, !i && n ? n : r ? r.__e : e.firstChild, i, s), Ce(o, t, s);
  }
  E = xe.slice, g = { __e: function(t, e, n, i) {
    for (var r, o, s; e = e.__; )
      if ((r = e.__c) && !r.__)
        try {
          if ((o = r.constructor) && o.getDerivedStateFromError != null && (r.setState(o.getDerivedStateFromError(t)), s = r.__d), r.componentDidCatch != null && (r.componentDidCatch(t, i || {}), s = r.__d), s)
            return r.__E = r;
        } catch (c) {
          t = c;
        }
    throw t;
  } }, F = 0, $.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = M({}, this.state), typeof t == "function" && (t = t(M({}, n), this.props)), t && M(n, t), t != null && this.__v && (e && this._sb.push(e), ke(this));
  }, $.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), ke(this));
  }, $.prototype.render = N, I = [], be = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ye = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, Z.__r = 0, ve = /(PointerCapture)$|Capture$/i, re = 0, oe = Re(!1), se = Re(!0);
  var ht = 0;
  function l(t, e, n, i, r, o) {
    e || (e = {});
    var s, c, u = e;
    if ("ref" in u)
      for (c in u = {}, e)
        c == "ref" ? s = e[c] : u[c] = e[c];
    var a = { type: t, props: u, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --ht, __i: -1, __u: 0, __source: r, __self: o };
    if (typeof t == "function" && (s = t.defaultProps))
      for (c in s)
        u[c] === void 0 && (u[c] = s[c]);
    return g.vnode && g.vnode(a), a;
  }
  var Y, L, pe, Pe, he = 0, Me = [], R = g, $e = R.__b, De = R.__r, Be = R.diffed, Fe = R.__c, Ie = R.unmount, Ne = R.__;
  function ze(t, e) {
    R.__h && R.__h(L, t, he || e), he = 0;
    var n = L.__H || (L.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function C(t) {
    return he = 1, gt(Ue, t);
  }
  function gt(t, e, n) {
    var i = ze(Y++, 2);
    if (i.t = t, !i.__c && (i.__ = [n ? n(e) : Ue(void 0, e), function(c) {
      var u = i.__N ? i.__N[0] : i.__[0], a = i.t(u, c);
      u !== a && (i.__N = [a, i.__[1]], i.__c.setState({}));
    }], i.__c = L, !L.__f)) {
      var r = function(c, u, a) {
        if (!i.__c.__H)
          return !0;
        var h = i.__c.__H.__.filter(function(b) {
          return !!b.__c;
        });
        if (h.every(function(b) {
          return !b.__N;
        }))
          return !o || o.call(this, c, u, a);
        var d = i.__c.props !== c;
        return h.forEach(function(b) {
          if (b.__N) {
            var f = b.__[0];
            b.__ = b.__N, b.__N = void 0, f !== b.__[0] && (d = !0);
          }
        }), o && o.call(this, c, u, a) || d;
      };
      L.__f = !0;
      var o = L.shouldComponentUpdate, s = L.componentWillUpdate;
      L.componentWillUpdate = function(c, u, a) {
        if (this.__e) {
          var h = o;
          o = void 0, r(c, u, a), o = h;
        }
        s && s.call(this, c, u, a);
      }, L.shouldComponentUpdate = r;
    }
    return i.__N || i.__;
  }
  function ge(t, e) {
    var n = ze(Y++, 3);
    !R.__s && mt(n.__H, e) && (n.__ = t, n.u = e, L.__H.__h.push(n));
  }
  function _t() {
    for (var t; t = Me.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(K), t.__H.__h.forEach(_e), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], R.__e(e, t.__v);
        }
  }
  R.__b = function(t) {
    L = null, $e && $e(t);
  }, R.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Ne && Ne(t, e);
  }, R.__r = function(t) {
    De && De(t), Y = 0;
    var e = (L = t.__c).__H;
    e && (pe === L ? (e.__h = [], L.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(K), e.__h.forEach(_e), e.__h = [], Y = 0)), pe = L;
  }, R.diffed = function(t) {
    Be && Be(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (Me.push(e) !== 1 && Pe === R.requestAnimationFrame || ((Pe = R.requestAnimationFrame) || ft)(_t)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), pe = L = null;
  }, R.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(K), n.__h = n.__h.filter(function(i) {
          return !i.__ || _e(i);
        });
      } catch (i) {
        e.some(function(r) {
          r.__h && (r.__h = []);
        }), e = [], R.__e(i, n.__v);
      }
    }), Fe && Fe(t, e);
  }, R.unmount = function(t) {
    Ie && Ie(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(i) {
      try {
        K(i);
      } catch (r) {
        e = r;
      }
    }), n.__H = void 0, e && R.__e(e, n.__v));
  };
  var He = typeof requestAnimationFrame == "function";
  function ft(t) {
    var e, n = function() {
      clearTimeout(i), He && cancelAnimationFrame(e), setTimeout(t);
    }, i = setTimeout(n, 35);
    He && (e = requestAnimationFrame(n));
  }
  function K(t) {
    var e = L, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), L = e;
  }
  function _e(t) {
    var e = L;
    t.__c = t.__(), L = e;
  }
  function mt(t, e) {
    return !t || t.length !== e.length || e.some(function(n, i) {
      return n !== t[i];
    });
  }
  function Ue(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function bt(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function We(t, e) {
    for (var n in t)
      if (n !== "__source" && !(n in e))
        return !0;
    for (var i in e)
      if (i !== "__source" && t[i] !== e[i])
        return !0;
    return !1;
  }
  function Oe(t, e) {
    this.props = t, this.context = e;
  }
  (Oe.prototype = new $()).isPureReactComponent = !0, Oe.prototype.shouldComponentUpdate = function(t, e) {
    return We(this.props, t) || We(this.state, e);
  };
  var je = g.__b;
  g.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), je && je(t);
  };
  var yt = g.__e;
  g.__e = function(t, e, n, i) {
    if (t.then) {
      for (var r, o = e; o = o.__; )
        if ((r = o.__c) && r.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), r.__c(t, e);
    }
    yt(t, e, n, i);
  };
  var Ve = g.unmount;
  function qe(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(i) {
      typeof i.__c == "function" && i.__c();
    }), t.__c.__H = null), (t = bt({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(i) {
      return qe(i, e, n);
    })), t;
  }
  function Ge(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(i) {
      return Ge(i, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function fe() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Xe(t) {
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
    var n = e.__c, i = this;
    i.o == null && (i.o = []), i.o.push(n);
    var r = Xe(i.__v), o = !1, s = function() {
      o || (o = !0, n.__R = null, r ? r(c) : c());
    };
    n.__R = s;
    var c = function() {
      if (!--i.__u) {
        if (i.state.__a) {
          var u = i.state.__a;
          i.__v.__k[0] = Ge(u, u.__c.__P, u.__c.__O);
        }
        var a;
        for (i.setState({ __a: i.__b = null }); a = i.o.pop(); )
          a.forceUpdate();
      }
    };
    i.__u++ || 32 & e.__u || i.setState({ __a: i.__b = i.__v.__k[0] }), t.then(s, s);
  }, fe.prototype.componentWillUnmount = function() {
    this.o = [];
  }, fe.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), i = this.__v.__k[0].__c;
        this.__v.__k[0] = qe(this.__b, n, i.__O = i.__P);
      }
      this.__b = null;
    }
    var r = e.__a && ae(N, null, t.fallback);
    return r && (r.__u &= -33), [ae(N, null, e.__a ? null : t.children), r];
  };
  var Ze = function(t, e, n) {
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
    var e = this, n = Xe(e.__v), i = e.l.get(t);
    return i[0]++, function(r) {
      var o = function() {
        e.props.revealOrder ? (i.push(r), Ze(e, t, i)) : r();
      };
      n ? n(o) : o();
    };
  }, ee.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = Q(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, ee.prototype.componentDidUpdate = ee.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      Ze(t, n, e);
    });
  };
  var vt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, xt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, St = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, kt = /[A-Z0-9]/g, wt = typeof document < "u", Tt = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function Qe(t, e, n) {
    return e.__k == null && (e.textContent = ""), pt(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  $.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty($.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var Je = g.event;
  function Lt() {
  }
  function Rt() {
    return this.cancelBubble;
  }
  function Ct() {
    return this.defaultPrevented;
  }
  g.event = function(t) {
    return Je && (t = Je(t)), t.persist = Lt, t.isPropagationStopped = Rt, t.isDefaultPrevented = Ct, t.nativeEvent = t;
  };
  var Et = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Ye = g.vnode;
  g.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, i = e.type, r = {}, o = i.indexOf("-") === -1;
      for (var s in n) {
        var c = n[s];
        if (!(s === "value" && "defaultValue" in n && c == null || wt && s === "children" && i === "noscript" || s === "class" || s === "className")) {
          var u = s.toLowerCase();
          s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && c === !0 ? c = "" : u === "translate" && c === "no" ? c = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? s = "ondblclick" : u !== "onchange" || i !== "input" && i !== "textarea" || Tt(n.type) ? u === "onfocus" ? s = "onfocusin" : u === "onblur" ? s = "onfocusout" : St.test(s) && (s = u) : u = s = "oninput" : o && xt.test(s) ? s = s.replace(kt, "-$&").toLowerCase() : c === null && (c = void 0), u === "oninput" && r[s = u] && (s = "oninputCapture"), r[s] = c;
        }
      }
      i == "select" && r.multiple && Array.isArray(r.value) && (r.value = Q(n.children).forEach(function(a) {
        a.props.selected = r.value.indexOf(a.props.value) != -1;
      })), i == "select" && r.defaultValue != null && (r.value = Q(n.children).forEach(function(a) {
        a.props.selected = r.multiple ? r.defaultValue.indexOf(a.props.value) != -1 : r.defaultValue == a.props.value;
      })), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", Et)) : (n.className && !n.class || n.class && n.className) && (r.class = r.className = n.className), e.props = r;
    }(t), t.$$typeof = vt, Ye && Ye(t);
  };
  var Ke = g.__r;
  g.__r = function(t) {
    Ke && Ke(t), t.__c;
  };
  var et = g.diffed;
  g.diffed = function(t) {
    et && et(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  function At({ detector: t }) {
    const [e, n] = C({ activeBlocks: 0 }), [i, r] = C(15), [o, s] = C(!1), [c, u] = C(!1), a = window.Blinko.i18n;
    ge(() => {
      const S = () => {
        var k;
        const y = ((k = window.blinkoRTL) == null ? void 0 : k.getStats()) || 0;
        n({ activeBlocks: y });
      };
      S();
      const _ = setInterval(S, 1e3);
      return () => clearInterval(_);
    }, []), ge(() => {
      const S = () => {
        const _ = window.blinkoRTL;
        if (_) {
          let y;
          if (typeof _.getSettings == "function" ? y = _.getSettings() : typeof _.settings == "function" && (y = _.settings()), y && y.threshold !== void 0 && r(Math.round(y.threshold * 100)), y && y.debugMode !== void 0 && u(y.debugMode), y)
            return !0;
        }
        return !1;
      };
      if (!S()) {
        const _ = setInterval(() => {
          S() && clearInterval(_);
        }, 100);
        setTimeout(() => clearInterval(_), 2e3);
      }
    }, []);
    const h = () => {
      var S;
      s(!0), (S = window.blinkoRTL) == null || S.fixSelection(), setTimeout(() => {
        s(!1), window.Blinko.toast.success("Selection processed");
      }, 500);
    }, d = (S) => {
      var y;
      const _ = parseInt(S.target.value);
      r(_), (y = window.blinkoRTL) == null || y.setSensitivity(_ / 100);
    }, b = (S) => {
      const _ = S.target.checked;
      u(_);
      const y = window.blinkoRTL;
      y && y.service && typeof y.service.toggleDebugMode == "function" && y.service.toggleDebugMode();
    };
    return /* @__PURE__ */ l("div", { style: {
      padding: "15px",
      fontFamily: "system-ui, sans-serif",
      width: "300px",
      background: "var(--bg-color, white)",
      color: "var(--text-color, black)"
    }, children: [
      /* @__PURE__ */ l("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px"
      }, children: [
        /* @__PURE__ */ l("h3", { style: { margin: 0, fontSize: "16px" }, children: "RTL Control Center" }),
        /* @__PURE__ */ l(
          "button",
          {
            onClick: () => {
              var _, y;
              (_ = window.blinkoRTL) == null || _.toggle();
              const S = (y = window.blinkoRTL) == null ? void 0 : y.isEnabled();
              window.Blinko.toast.success(
                S ? a.t("rtl_enabled") : a.t("rtl_disabled")
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
            title: a.t("manual_toggle"),
            children: "🔄"
          }
        )
      ] }),
      /* @__PURE__ */ l("div", { style: {
        background: "#f8f9fa",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "15px",
        textAlign: "center",
        borderLeft: "4px solid #007bff"
      }, children: [
        /* @__PURE__ */ l("div", { style: { fontSize: "24px", fontWeight: "bold", color: "#007bff" }, children: e.activeBlocks }),
        /* @__PURE__ */ l("div", { style: { fontSize: "12px", color: "#666" }, children: "Active RTL Blocks" })
      ] }),
      /* @__PURE__ */ l("div", { style: { marginBottom: "20px" }, children: /* @__PURE__ */ l(
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
          children: o ? "Processing..." : /* @__PURE__ */ l(N, { children: [
            /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ l("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) }),
            "Fix Selected Text"
          ] })
        }
      ) }),
      /* @__PURE__ */ l("div", { style: { marginBottom: "15px" }, children: [
        /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px" }, children: [
          /* @__PURE__ */ l(
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
        /* @__PURE__ */ l("div", { style: { fontSize: "10px", color: "#888", marginInlineStart: "20px", marginTop: "2px" }, children: "Highlights RTL (Red) and LTR (Blue) blocks" })
      ] }),
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ l("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }, children: [
          /* @__PURE__ */ l("strong", { children: "Detection Sensitivity" }),
          /* @__PURE__ */ l("span", { style: { color: "#007bff" }, children: [
            i,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ l(
          "input",
          {
            type: "range",
            min: "1",
            max: "50",
            value: i,
            onChange: d,
            style: { width: "100%", cursor: "pointer" }
          }
        ),
        /* @__PURE__ */ l("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#999", marginTop: "4px" }, children: [
          /* @__PURE__ */ l("span", { children: "More Sensitive (1%)" }),
          /* @__PURE__ */ l("span", { children: "Less Sensitive (50%)" })
        ] })
      ] }),
      /* @__PURE__ */ l("div", { style: { marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #eee", fontSize: "11px", color: "#888", textAlign: "center" }, children: "Click 'Fix Selected' to force detection on specific text." }),
      /* @__PURE__ */ l("div", { style: { marginTop: "5px", fontSize: "10px", color: "#aaa", textAlign: "center" }, children: [
        "v",
        "1.1.6"
      ] })
    ] });
  }
  const U = `/* Dynamic CSS Rules for RTL Elements */
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
    dynamicCSS: U,
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
  class Pt {
    constructor(e = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      v(this, "name", "CharacterCode");
      v(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      v(this, "RTL_RANGES", [
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
      for (const c of n)
        /\s|[.,!?;:()[\]{}]/.test(c) || (r++, this.isRTLChar(c) && i++);
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
  class Mt {
    constructor(e = !0, n = !0, i = 0.3, r = 3) {
      v(this, "name", "Regex");
      // Hebrew regex range: 0590-05FF, FB1D-FB4F (Presentation forms A), FB50-FBB1 (Presentation forms B - wait, that's Arabic)
      // Hebrew: \u0590-\u05FF
      v(this, "hebrewPattern", "\\u0590-\\u05FF\\uFB1D-\\uFB4F");
      // Arabic regex range
      v(this, "arabicPattern", "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF");
      v(this, "checkHebrew");
      v(this, "checkArabic");
      v(this, "threshold");
      // Ratio 0.0 - 1.0
      v(this, "minRTLChars", 3);
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
      const o = r.length;
      if (o < this.minRTLChars)
        return e.trim().length >= this.minRTLChars, !1;
      const s = e.length;
      return s === 0 ? !1 : o / s > this.threshold;
    }
  }
  class nt {
    constructor(e) {
      v(this, "name", "Combined");
      v(this, "strategies");
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
  class it {
    constructor(e = {}) {
      v(this, "strategy");
      v(this, "charCodeStrategy");
      v(this, "regexStrategy");
      v(this, "config");
      this.config = {
        sensitivity: "medium",
        minRTLChars: 3,
        sampleSize: 100,
        ...e
      }, this.charCodeStrategy = new Pt(this.config);
      const n = this.getThresholdFromSensitivity(this.config.sensitivity);
      this.regexStrategy = new Mt(!0, !0, n, this.config.minRTLChars), this.strategy = new nt([
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
      dynamicCSS: U,
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
      dynamicCSS: U,
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
    const [n, i] = C(""), [r, o] = C(""), [s, c] = C(""), [u, a] = C([]), [h, d] = C(""), [b, f] = C("");
    ge(() => {
      var T, ie;
      (() => {
        var B;
        const D = (B = window.blinkoRTL) == null ? void 0 : B.settings();
        D && e(D);
      })();
      const m = (D) => {
        e((B) => ({ ...B, ...D.detail }));
      }, x = (D) => {
        a((B) => [D.detail, ...B].slice(0, 50));
      };
      return (ie = (T = window.blinkoRTL) == null ? void 0 : T.service) != null && ie.getActionLog && a(window.blinkoRTL.service.getActionLog()), window.addEventListener("rtl-settings-changed", m), window.addEventListener("rtl-action-logged", x), () => {
        window.removeEventListener("rtl-settings-changed", m), window.removeEventListener("rtl-action-logged", x);
      };
    }, []);
    const S = (p) => {
      let m = 0;
      for (let x = 0; x < p.length; x++)
        if (p[x] === "{" && m++, p[x] === "}" && m--, m < 0)
          return !1;
      return m === 0;
    }, _ = (p) => {
      var x;
      p.dynamicCSS !== void 0 && (S(p.dynamicCSS) ? d("") : d("Invalid CSS: Unbalanced curly braces"));
      const m = { ...t, ...p };
      e(m), (x = window.blinkoRTL) != null && x.service ? window.blinkoRTL.service.updateSettings(p) : (console.warn("RTL Service not found, settings might not persist correctly via StorageManager"), localStorage.setItem("blinko-rtl-settings", JSON.stringify(m)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: m
        })
      ));
    }, y = () => {
      var m;
      if (!n.trim())
        return;
      const p = (m = window.blinkoRTL) == null ? void 0 : m.detector;
      if (p) {
        const x = p.detectRTL(n);
        o(x ? "RTL" : "LTR");
      } else
        try {
          const T = new it().detectRTL(n);
          o(T ? "RTL" : "LTR");
        } catch (x) {
          console.error("Failed to create fallback detector", x), console.warn("RTL Detector not found via global API or fallback");
        }
    }, k = () => {
      window.blinkoRTL && (window.blinkoRTL.processAll(), window.Blinko.toast.success("Content processed!"));
    }, w = () => {
      if (!s)
        return;
      const m = [...q, ...t.savedPresets || []].find((x) => x.id === s);
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
    }, P = () => {
      if (!s)
        return;
      if (q.some((m) => m.id === s)) {
        window.Blinko.toast.error("Cannot delete built-in presets.");
        return;
      }
      confirm("Are you sure you want to delete this preset?") && (_({
        savedPresets: (t.savedPresets || []).filter((m) => m.id !== s)
      }), c(""));
    }, W = () => {
      if (confirm("Reset all settings to defaults? This cannot be undone.")) {
        const p = {
          ...tt,
          savedPresets: t.savedPresets || []
          // Preserve user presets
        };
        _(p), window.Blinko.toast.success("Settings reset to defaults");
      }
    }, z = () => {
      _({ dynamicCSS: U }), window.Blinko.toast.success("Dynamic CSS reset");
    }, ne = () => {
      var m;
      const p = (m = window.blinkoRTL) == null ? void 0 : m.service;
      if (p) {
        const x = "data:text/json;charset=utf-8," + encodeURIComponent(p.exportSettings()), T = document.createElement("a");
        T.setAttribute("href", x), T.setAttribute("download", "blinko-rtl-settings-v1.json"), document.body.appendChild(T), T.click(), T.remove();
      } else
        window.Blinko.toast.error("Export failed: Service not available");
    }, O = (p) => {
      var T;
      const m = (T = p.target.files) == null ? void 0 : T[0];
      if (!m)
        return;
      const x = new FileReader();
      x.onload = (ie) => {
        var D, B;
        try {
          const G = (D = ie.target) == null ? void 0 : D.result, st = (B = window.blinkoRTL) == null ? void 0 : B.service;
          if (st)
            st.importSettings(G), f(""), window.Blinko.toast.success("Settings imported successfully!");
          else
            throw new Error("Service not available");
        } catch (G) {
          console.error("Import failed", G), f("Failed to import settings: " + (G instanceof Error ? G.message : "Invalid file")), window.Blinko.toast.error("Import failed");
        }
      }, x.readAsText(m), p.target.value = "";
    };
    return /* @__PURE__ */ l(
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
          /* @__PURE__ */ l("div", { style: { marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #eee" }, children: [
            /* @__PURE__ */ l("h2", { style: { margin: "0 0 10px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🔧 Fixed RTL Language Support Settings" }),
            /* @__PURE__ */ l("p", { style: { margin: "0", color: t.darkMode ? "#aaa" : "#666", fontSize: "14px" }, children: "Precise RTL support with manual control and optional permanent CSS injection." })
          ] }),
          /* @__PURE__ */ l("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #007bff",
            borderRadius: "8px",
            background: t.darkMode ? "#2c3e50" : "#f8f9ff"
          }, children: [
            /* @__PURE__ */ l("h3", { style: { margin: "0 0 15px 0", color: "#007bff" }, children: "⚡ Quick Actions" }),
            /* @__PURE__ */ l("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }, children: [
              /* @__PURE__ */ l(
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
              /* @__PURE__ */ l(
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
          /* @__PURE__ */ l("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa",
            maxHeight: "300px",
            overflowY: "auto"
          }, children: [
            /* @__PURE__ */ l("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "📜 Real-time Action Log" }),
            u.length === 0 ? /* @__PURE__ */ l("p", { style: { color: t.darkMode ? "#aaa" : "#666", fontStyle: "italic" }, children: "No actions recorded yet..." }) : /* @__PURE__ */ l("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "12px", color: t.darkMode ? "#ccc" : "#000" }, children: [
              /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { style: { textAlign: "left", borderBottom: "1px solid #ccc" }, children: [
                /* @__PURE__ */ l("th", { style: { padding: "5px" }, children: "Time" }),
                /* @__PURE__ */ l("th", { style: { padding: "5px" }, children: "Element" }),
                /* @__PURE__ */ l("th", { style: { padding: "5px" }, children: "Action" }),
                /* @__PURE__ */ l("th", { style: { padding: "5px" }, children: "Details" })
              ] }) }),
              /* @__PURE__ */ l("tbody", { children: u.map((p, m) => /* @__PURE__ */ l("tr", { style: { borderBottom: t.darkMode ? "1px solid #444" : "1px solid #eee" }, children: [
                /* @__PURE__ */ l("td", { style: { padding: "5px", whiteSpace: "nowrap" }, children: p.timestamp }),
                /* @__PURE__ */ l("td", { style: { padding: "5px", fontFamily: "monospace" }, title: p.element, children: p.element.length > 20 ? p.element.substring(0, 20) + "..." : p.element }),
                /* @__PURE__ */ l("td", { style: { padding: "5px", color: p.direction === "RTL" ? "#28a745" : "#007bff" }, children: p.direction }),
                /* @__PURE__ */ l("td", { style: { padding: "5px", color: t.darkMode ? "#888" : "#666" }, children: p.textPreview })
              ] }, m)) })
            ] })
          ] }),
          /* @__PURE__ */ l("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ l("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🎛️ Mode Settings" }),
            /* @__PURE__ */ l("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ l(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enabled,
                    onChange: (p) => _({ enabled: p.target.checked })
                  }
                ),
                /* @__PURE__ */ l("span", { children: "🔧 Enable RTL Support" })
              ] }),
              /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ l(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualMode,
                    onChange: (p) => _({ manualMode: p.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ l("span", { children: "✋ Manual Mode (Recommended)" })
              ] }),
              /* @__PURE__ */ l("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Manual mode only applies RTL when clearly detected, preventing unwanted changes" }),
              /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ l(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.mobileView,
                    onChange: (p) => _({ mobileView: p.target.checked })
                  }
                ),
                /* @__PURE__ */ l("span", { children: "📱 Mobile View" })
              ] }),
              /* @__PURE__ */ l("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Optimizes layout for mobile devices" }),
              /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ l(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.debugMode,
                    onChange: (p) => {
                      var x, T;
                      const m = p.target.checked;
                      _({ debugMode: m }), (T = (x = window.blinkoRTL) == null ? void 0 : x.service) == null || T.toggleDebugMode();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ l("span", { children: "🐞 Visual Debugger" })
              ] }),
              /* @__PURE__ */ l("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Highlights detected RTL (Red) and LTR (Blue) elements with tooltips" }),
              /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ l(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.autoDetect,
                    onChange: (p) => _({ autoDetect: p.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ l("span", { children: "🤖 Auto-detect All Content" })
              ] }),
              /* @__PURE__ */ l("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Continuously processes all content on the page every 2 seconds" }),
              /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ l(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualToggle,
                    onChange: (p) => {
                      const m = p.target.checked;
                      _({ manualToggle: m });
                      const x = window.blinkoRTL;
                      x && x.isEnabled() && x.processAll();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ l("span", { children: "🔄 Manual RTL Toggle" })
              ] }),
              /* @__PURE__ */ l("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Forces RTL on all content when enabled, ignores detection" }),
              /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ l(
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
                /* @__PURE__ */ l("span", { children: "🌙 Dark Mode Plugin UI" })
              ] }),
              /* @__PURE__ */ l("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Applies dark styling to RTL plugin components only" })
            ] })
          ] }),
          /* @__PURE__ */ l("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #6610f2",
            borderRadius: "8px",
            background: t.darkMode ? "#2c2c3e" : "#f8f9ff"
          }, children: [
            /* @__PURE__ */ l("h3", { style: { margin: "0 0 15px 0", color: "#6610f2" }, children: "🎨 Dynamic CSS Rules" }),
            /* @__PURE__ */ l("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#aaa" : "#666" }, children: "These CSS rules are applied dynamically when RTL or LTR content is detected. Customize the class definitions below to control how detected elements are styled." }),
            /* @__PURE__ */ l("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ l(
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
              h && /* @__PURE__ */ l("div", { style: { color: "red", fontSize: "12px", marginTop: "5px" }, children: h })
            ] }),
            /* @__PURE__ */ l("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ l(
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
              /* @__PURE__ */ l(
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
          /* @__PURE__ */ l("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #28a745",
            borderRadius: "8px",
            background: t.darkMode ? "#1e3023" : "#f8fff8"
          }, children: [
            /* @__PURE__ */ l("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "📌 Permanent CSS Settings" }),
            /* @__PURE__ */ l("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ l(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.permanentCSS,
                    onChange: (p) => _({ permanentCSS: p.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ l("span", { children: "Enable Permanent CSS Injection" })
              ] }),
              /* @__PURE__ */ l("p", { style: { margin: "5px 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "This CSS is injected permanently as long as the plugin is enabled, regardless of RTL detection. Use this for global overrides." })
            ] }),
            /* @__PURE__ */ l("div", { style: { marginBottom: "15px", padding: "15px", background: t.darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", borderRadius: "6px" }, children: [
              /* @__PURE__ */ l("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px" }, children: "📚 CSS Presets:" }),
              /* @__PURE__ */ l("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
                /* @__PURE__ */ l(
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
                      /* @__PURE__ */ l("option", { value: "", children: "-- Select a Preset --" }),
                      /* @__PURE__ */ l("optgroup", { label: "Built-in Presets", children: q.map((p) => /* @__PURE__ */ l("option", { value: p.id, children: p.name }, p.id)) }),
                      t.savedPresets && t.savedPresets.length > 0 && /* @__PURE__ */ l("optgroup", { label: "Saved Presets", children: t.savedPresets.map((p) => /* @__PURE__ */ l("option", { value: p.id, children: p.name }, p.id)) })
                    ]
                  }
                ),
                /* @__PURE__ */ l(
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
                /* @__PURE__ */ l(
                  "button",
                  {
                    onClick: P,
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
            /* @__PURE__ */ l("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ l("label", { style: { display: "block", fontWeight: "500", marginBottom: "5px" }, children: "Custom CSS Code (Permanent):" }),
              /* @__PURE__ */ l(
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
            /* @__PURE__ */ l("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ l(
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
              /* @__PURE__ */ l(
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
          /* @__PURE__ */ l("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ l("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🧪 Test RTL Detection" }),
            /* @__PURE__ */ l("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ l(
              "textarea",
              {
                value: n,
                onChange: (p) => i(p.target.value),
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
            /* @__PURE__ */ l("div", { style: { display: "flex", gap: "10px", marginBottom: "15px" }, children: /* @__PURE__ */ l(
              "button",
              {
                onClick: y,
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
            r && /* @__PURE__ */ l("div", { style: {
              padding: "10px",
              background: r === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${r === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px",
              color: "#333"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ l("strong", { children: r === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
            ] })
          ] }),
          /* @__PURE__ */ l("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ l("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🔧 Advanced Actions" }),
            /* @__PURE__ */ l("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
              /* @__PURE__ */ l(
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
              /* @__PURE__ */ l(
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
              /* @__PURE__ */ l("label", { style: {
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                display: "inline-block"
              }, children: [
                "📂 Import Settings (JSON)",
                /* @__PURE__ */ l(
                  "input",
                  {
                    type: "file",
                    accept: ".json",
                    onChange: O,
                    style: { display: "none" }
                  }
                )
              ] })
            ] }),
            b && /* @__PURE__ */ l("p", { style: { color: "red", marginTop: "10px" }, children: b })
          ] })
        ]
      }
    );
  }
  const rt = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "1.1.6",
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
    let i = null;
    return function(...r) {
      const o = this, s = function() {
        i = null, n || t.apply(o, r);
      }, c = n && !i;
      i && clearTimeout(i), i = setTimeout(s, e), c && t.apply(o, r);
    };
  }
  class Dt {
    constructor(e) {
      v(this, "detector");
      v(this, "isEnabled", !1);
      v(this, "activeToast", null);
      v(this, "handlePaste", (e) => {
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
      var r, o, s, c;
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
      }), (o = i.querySelector("#rtl-btn-wrap")) == null || o.addEventListener("click", () => {
        this.insertText(n, this.processWrap(e)), this.removeToast();
      }), (s = i.querySelector("#rtl-btn-original")) == null || s.addEventListener("click", () => {
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
        const i = e, r = i.selectionStart || 0, o = i.selectionEnd || 0;
        i.value = i.value.substring(0, r) + n + i.value.substring(o), i.selectionStart = i.selectionEnd = r + n.length, i.dispatchEvent(new Event("input", { bubbles: !0 }));
      } else if (e.focus(), !document.execCommand("insertText", !1, n)) {
        const r = window.getSelection();
        if (r && r.rangeCount > 0) {
          const o = r.getRangeAt(0);
          o.deleteContents(), o.insertNode(document.createTextNode(n)), o.collapse(!1);
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
  class Bt {
    constructor(e) {
      v(this, "detector");
      v(this, "isRTLEnabled", !1);
      v(this, "styleElement", null);
      v(this, "permanentStyleElement", null);
      v(this, "dynamicStyleElement", null);
      v(this, "observer", null);
      v(this, "autoProcessInterval", null);
      // Managers
      v(this, "pasteInterceptor");
      // Optimizations
      v(this, "pendingElements", /* @__PURE__ */ new Set());
      v(this, "debouncedProcessQueue");
      v(this, "debouncedProcessAll");
      // Action Log
      v(this, "actionLog", []);
      v(this, "MAX_LOG_SIZE", 50);
      // Hebrew regex from userscript
      v(this, "hebrewRegex", /\p{Script=Hebrew}/u);
      v(this, "arabicRegex", /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/);
      v(this, "settings", { ...tt, targetSelectors: te });
      v(this, "processElement", (e) => {
        if (!e)
          return;
        const n = (s, c) => {
          try {
            return s.matches(c);
          } catch (u) {
            return console.warn(`Invalid selector '${c}':`, u), !1;
          }
        };
        if (this.settings.disabledSelectors && this.settings.disabledSelectors.some((s) => n(e, s)))
          return;
        const i = e.textContent || e.value || e.placeholder || "";
        if (!i.trim() || i.length < this.settings.minRTLChars) {
          this.applyCSSClassRTL(e, "neutral");
          return;
        }
        let r = "neutral";
        if (this.settings.manualToggle)
          r = "rtl";
        else if (this.settings.forceDirection === "rtl")
          r = "rtl";
        else if (this.settings.forceDirection === "ltr")
          r = "ltr";
        else if (n(e, "pre, code, .code-block, .CodeMirror-line, .notion-code-block")) {
          const c = (i.match(/[\u0590-\u05FF]/g) || []).length, u = (i.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length, a = c + u, h = i.replace(/\s/g, "").length || i.length;
          a / h > 0.6 ? r = "rtl" : r = "ltr";
        } else
          this.detector.detectRTL(i) ? r = "rtl" : /[a-zA-Z]/.test(i) ? r = "ltr" : r = "neutral";
        const o = e.getAttribute("data-manual-dir");
        switch (o === "rtl" && (r = "rtl"), o === "ltr" && (r = "ltr"), this.logAction(e, r), this.settings.method) {
          case "direct":
            this.applyDirectRTL(e, r);
            break;
          case "attributes":
            this.applyAttributeRTL(e, r);
            break;
          case "css":
            this.applyCSSClassRTL(e, r);
            break;
          case "unicode":
            this.applyUnicodeBidiRTL(e);
            break;
          case "all":
          default:
            this.applyCSSClassRTL(e, r), this.applyAttributeRTL(e, r);
            break;
        }
      });
      v(this, "processAllElements", () => {
        if (!this.isRTLEnabled)
          return;
        this.settings.targetSelectors.filter(
          (n) => !this.settings.disabledSelectors.includes(n)
        ).forEach((n) => {
          try {
            document.querySelectorAll(n).forEach((r) => {
              this.processElement(r);
            });
          } catch (i) {
            console.warn(`Invalid selector in processAllElements: '${n}'`, i);
          }
        });
      });
      this.detector = e, this.storageManager = new StorageManager(), this.loadSettings(), this.pasteInterceptor = new Dt(e), this.debouncedProcessAll = ot(() => this.processAllElements(), 200), this.debouncedProcessQueue = ot(() => {
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
        direction: n.toUpperCase(),
        textPreview: (e.textContent || "").substring(0, 20) + "..."
      };
      this.actionLog.unshift(i), this.actionLog.length > this.MAX_LOG_SIZE && this.actionLog.pop(), window.dispatchEvent(new CustomEvent("rtl-action-logged", { detail: i }));
    }
    isEnabled() {
      return this.isRTLEnabled;
    }
    loadSettings() {
      const e = this.storageManager.load();
      e ? (this.settings = { ...this.settings, ...e }, this.settings.dynamicCSS || (this.settings.dynamicCSS = U), this.settings.disabledSelectors || (this.settings.disabledSelectors = []), this.settings.autoDetect === void 0 && (this.settings.autoDetect = !0), this.detector.updateConfig({
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
      let e = this.settings.dynamicCSS || U;
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
        const i = this.settings.targetSelectors.filter(
          (s) => !this.settings.disabledSelectors.includes(s)
        ), r = [];
        i.forEach((s) => {
          try {
            document.querySelector(s), r.push(s);
          } catch {
          }
        });
        const o = r.join(", ");
        e.forEach((s) => {
          if (s.type === "childList")
            s.addedNodes.forEach((c) => {
              if (c.nodeType === Node.ELEMENT_NODE) {
                const u = c;
                let a = !1;
                for (const h of r)
                  if (u.matches(h)) {
                    a = !0;
                    break;
                  }
                if (a && (this.pendingElements.add(u), n = !0), o)
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
              for (const a of r)
                try {
                  if (c.matches(a)) {
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
  const Yt = "", Ft = {
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
  }, It = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Nt = {
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
  }, zt = {
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
      const e = new it(), n = new Bt(e);
      let i = null;
      function r() {
        if (i)
          return;
        const u = n.getSettings();
        i = document.createElement("button"), i.className = "rtl-toggle-btn", i.innerHTML = "ع/א", i.title = "Toggle RTL Support (Hebrew/Arabic)", i.addEventListener("click", () => {
          n.toggle(), o();
        }), document.body.appendChild(i), u.darkMode && i.classList.add("dark-mode"), o();
      }
      function o() {
        i && (n.isEnabled() ? i.classList.add("active") : i.classList.remove("active"));
      }
      function s() {
        i && (i.remove(), i = null);
      }
      function c() {
        console.log("Initializing Advanced Blinko RTL Plugin..."), r(), localStorage.getItem("blinko-rtl-enabled") === "true" && (n.enable(), o()), window.addEventListener("rtl-settings-changed", (a) => {
          const h = a.detail;
          i && (h.darkMode ? i.classList.add("dark-mode") : i.classList.remove("dark-mode"));
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
          test: (a) => {
            const h = e.detectRTL(a), d = n.detectHebrewRegex(a), b = n.detectArabicRegex(a);
            return console.log(`Text "${a}" -> Original: ${h ? "RTL" : "LTR"}, Hebrew: ${d}, Arabic: ${b}`), h;
          },
          testHebrew: (a) => n.detectHebrewRegex(a),
          testArabic: (a) => n.detectArabicRegex(a),
          getStats: () => document.querySelectorAll('.rtl-force, .rtl-auto, [dir="rtl"]').length,
          setSensitivity: (a) => {
            let h = "medium";
            a < 0.12 ? h = "high" : a > 0.3 && (h = "low"), n.updateSettings({ threshold: a, sensitivity: h });
          },
          fixSelection: () => {
            const a = window.getSelection();
            if (!a || a.rangeCount === 0)
              return;
            let d = a.getRangeAt(0).commonAncestorContainer;
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
          v(this, "withSettingPanel", !0);
          v(this, "renderSettingPanel", () => {
            const a = document.createElement("div");
            return Qe(/* @__PURE__ */ l($t, {}), a), a;
          });
          Object.assign(this, rt);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", c) : setTimeout(c, 100), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: `RTL Language Support (v${rt.version}) (ع/א)`,
            content: () => {
              const a = document.createElement("div");
              return a.setAttribute("data-plugin", "rtl-support"), Qe(/* @__PURE__ */ l(At, { detector: e }), a), a;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL (ع/א)",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              n.toggle(), o();
              const a = window.Blinko.i18n;
              window.Blinko.toast.success(
                n.isEnabled() ? a.t("rtl_enabled") : a.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", Ft), window.Blinko.i18n.addResourceBundle("zh", "translation", It), window.Blinko.i18n.addResourceBundle("he", "translation", Nt), window.Blinko.i18n.addResourceBundle("ar", "translation", zt);
        }
        destroy() {
          n.disable(), s(), console.log("Advanced RTL Plugin destroyed");
        }
      });
    }
  }));
})();
