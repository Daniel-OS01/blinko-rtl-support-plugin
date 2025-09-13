var Ft = Object.defineProperty;
var Ot = (E, h, I) => h in E ? Ft(E, h, { enumerable: !0, configurable: !0, writable: !0, value: I }) : E[h] = I;
var A = (E, h, I) => (Ot(E, typeof h != "symbol" ? h + "" : h, I), I);
(function() {
  var E, h, I, N, ge, me, be, ve, te, ne, oe, V = {}, ye = [], ot = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, J = Array.isArray;
  function M(e, t) {
    for (var n in t)
      e[n] = t[n];
    return e;
  }
  function re(e) {
    e && e.parentNode && e.parentNode.removeChild(e);
  }
  function ie(e, t, n) {
    var o, r, l, s = {};
    for (l in t)
      l == "key" ? o = t[l] : l == "ref" ? r = t[l] : s[l] = t[l];
    if (arguments.length > 2 && (s.children = arguments.length > 3 ? E.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null)
      for (l in e.defaultProps)
        s[l] === void 0 && (s[l] = e.defaultProps[l]);
    return G(e, s, o, r, null);
  }
  function G(e, t, n, o, r) {
    var l = { type: e, props: t, key: n, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++I, __i: -1, __u: 0 };
    return r == null && h.vnode != null && h.vnode(l), l;
  }
  function W(e) {
    return e.children;
  }
  function B(e, t) {
    this.props = e, this.context = t;
  }
  function F(e, t) {
    if (t == null)
      return e.__ ? F(e.__, e.__i + 1) : null;
    for (var n; t < e.__k.length; t++)
      if ((n = e.__k[t]) != null && n.__e != null)
        return n.__e;
    return typeof e.type == "function" ? F(e) : null;
  }
  function xe(e) {
    var t, n;
    if ((e = e.__) != null && e.__c != null) {
      for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
        if ((n = e.__k[t]) != null && n.__e != null) {
          e.__e = e.__c.base = n.__e;
          break;
        }
      return xe(e);
    }
  }
  function ke(e) {
    (!e.__d && (e.__d = !0) && N.push(e) && !X.__r++ || ge != h.debounceRendering) && ((ge = h.debounceRendering) || me)(X);
  }
  function X() {
    for (var e, t, n, o, r, l, s, d = 1; N.length; )
      N.length > d && N.sort(be), e = N.shift(), d = N.length, e.__d && (n = void 0, r = (o = (t = e).__v).__e, l = [], s = [], t.__P && ((n = M({}, o)).__v = o.__v + 1, h.vnode && h.vnode(n), le(t.__P, n, o, t.__n, t.__P.namespaceURI, 32 & o.__u ? [r] : null, l, r ?? F(o), !!(32 & o.__u), s), n.__v = o.__v, n.__.__k[n.__i] = n, Le(l, n, s), n.__e != r && xe(n)));
    X.__r = 0;
  }
  function Re(e, t, n, o, r, l, s, d, p, i, m) {
    var c, b, g, x, S, u, f, y = o && o.__k || ye, C = t.length;
    for (p = rt(n, t, y, p, C), c = 0; c < C; c++)
      (g = n.__k[c]) != null && (b = g.__i == -1 ? V : y[g.__i] || V, g.__i = c, u = le(e, g, b, r, l, s, d, p, i, m), x = g.__e, g.ref && b.ref != g.ref && (b.ref && se(b.ref, null, g), m.push(g.ref, g.__c || x, g)), S == null && x != null && (S = x), (f = !!(4 & g.__u)) || b.__k === g.__k ? p = Te(g, p, e, f) : typeof g.type == "function" && u !== void 0 ? p = u : x && (p = x.nextSibling), g.__u &= -7);
    return n.__e = S, p;
  }
  function rt(e, t, n, o, r) {
    var l, s, d, p, i, m = n.length, c = m, b = 0;
    for (e.__k = new Array(r), l = 0; l < r; l++)
      (s = t[l]) != null && typeof s != "boolean" && typeof s != "function" ? (p = l + b, (s = e.__k[l] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? G(null, s, null, null, null) : J(s) ? G(W, { children: s }, null, null, null) : s.constructor == null && s.__b > 0 ? G(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = e, s.__b = e.__b + 1, d = null, (i = s.__i = it(s, n, p, c)) != -1 && (c--, (d = n[i]) && (d.__u |= 2)), d == null || d.__v == null ? (i == -1 && (r > m ? b-- : r < m && b++), typeof s.type != "function" && (s.__u |= 4)) : i != p && (i == p - 1 ? b-- : i == p + 1 ? b++ : (i > p ? b-- : b++, s.__u |= 4))) : e.__k[l] = null;
    if (c)
      for (l = 0; l < m; l++)
        (d = n[l]) != null && !(2 & d.__u) && (d.__e == o && (o = F(d)), $e(d, d));
    return o;
  }
  function Te(e, t, n, o) {
    var r, l;
    if (typeof e.type == "function") {
      for (r = e.__k, l = 0; r && l < r.length; l++)
        r[l] && (r[l].__ = e, t = Te(r[l], t, n, o));
      return t;
    }
    e.__e != t && (o && (t && e.type && !t.parentNode && (t = F(e)), n.insertBefore(e.__e, t || null)), t = e.__e);
    do
      t = t && t.nextSibling;
    while (t != null && t.nodeType == 8);
    return t;
  }
  function K(e, t) {
    return t = t || [], e == null || typeof e == "boolean" || (J(e) ? e.some(function(n) {
      K(n, t);
    }) : t.push(e)), t;
  }
  function it(e, t, n, o) {
    var r, l, s, d = e.key, p = e.type, i = t[n], m = i != null && (2 & i.__u) == 0;
    if (i === null && e.key == null || m && d == i.key && p == i.type)
      return n;
    if (o > (m ? 1 : 0)) {
      for (r = n - 1, l = n + 1; r >= 0 || l < t.length; )
        if ((i = t[s = r >= 0 ? r-- : l++]) != null && !(2 & i.__u) && d == i.key && p == i.type)
          return s;
    }
    return -1;
  }
  function Se(e, t, n) {
    t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || ot.test(t) ? n : n + "px";
  }
  function Q(e, t, n, o, r) {
    var l, s;
    e:
      if (t == "style")
        if (typeof n == "string")
          e.style.cssText = n;
        else {
          if (typeof o == "string" && (e.style.cssText = o = ""), o)
            for (t in o)
              n && t in n || Se(e.style, t, "");
          if (n)
            for (t in n)
              o && n[t] == o[t] || Se(e.style, t, n[t]);
        }
      else if (t[0] == "o" && t[1] == "n")
        l = t != (t = t.replace(ve, "$1")), s = t.toLowerCase(), t = s in e || t == "onFocusOut" || t == "onFocusIn" ? s.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + l] = n, n ? o ? n.u = o.u : (n.u = te, e.addEventListener(t, l ? oe : ne, l)) : e.removeEventListener(t, l ? oe : ne, l);
      else {
        if (r == "http://www.w3.org/2000/svg")
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
  function we(e) {
    return function(t) {
      if (this.l) {
        var n = this.l[t.type + e];
        if (t.t == null)
          t.t = te++;
        else if (t.t < n.u)
          return;
        return n(h.event ? h.event(t) : t);
      }
    };
  }
  function le(e, t, n, o, r, l, s, d, p, i) {
    var m, c, b, g, x, S, u, f, y, C, $, z, D, U, P, L, j, w = t.type;
    if (t.constructor != null)
      return null;
    128 & n.__u && (p = !!(32 & n.__u), l = [d = t.__e = n.__e]), (m = h.__b) && m(t);
    e:
      if (typeof w == "function")
        try {
          if (f = t.props, y = "prototype" in w && w.prototype.render, C = (m = w.contextType) && o[m.__c], $ = m ? C ? C.props.value : m.__ : o, n.__c ? u = (c = t.__c = n.__c).__ = c.__E : (y ? t.__c = c = new w(f, $) : (t.__c = c = new B(f, $), c.constructor = w, c.render = at), C && C.sub(c), c.props = f, c.state || (c.state = {}), c.context = $, c.__n = o, b = c.__d = !0, c.__h = [], c._sb = []), y && c.__s == null && (c.__s = c.state), y && w.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = M({}, c.__s)), M(c.__s, w.getDerivedStateFromProps(f, c.__s))), g = c.props, x = c.state, c.__v = t, b)
            y && w.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), y && c.componentDidMount != null && c.__h.push(c.componentDidMount);
          else {
            if (y && w.getDerivedStateFromProps == null && f !== g && c.componentWillReceiveProps != null && c.componentWillReceiveProps(f, $), !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(f, c.__s, $) === !1 || t.__v == n.__v) {
              for (t.__v != n.__v && (c.props = f, c.state = c.__s, c.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(H) {
                H && (H.__ = t);
              }), z = 0; z < c._sb.length; z++)
                c.__h.push(c._sb[z]);
              c._sb = [], c.__h.length && s.push(c);
              break e;
            }
            c.componentWillUpdate != null && c.componentWillUpdate(f, c.__s, $), y && c.componentDidUpdate != null && c.__h.push(function() {
              c.componentDidUpdate(g, x, S);
            });
          }
          if (c.context = $, c.props = f, c.__P = e, c.__e = !1, D = h.__r, U = 0, y) {
            for (c.state = c.__s, c.__d = !1, D && D(t), m = c.render(c.props, c.state, c.context), P = 0; P < c._sb.length; P++)
              c.__h.push(c._sb[P]);
            c._sb = [];
          } else
            do
              c.__d = !1, D && D(t), m = c.render(c.props, c.state, c.context), c.state = c.__s;
            while (c.__d && ++U < 25);
          c.state = c.__s, c.getChildContext != null && (o = M(M({}, o), c.getChildContext())), y && !b && c.getSnapshotBeforeUpdate != null && (S = c.getSnapshotBeforeUpdate(g, x)), L = m, m != null && m.type === W && m.key == null && (L = Ce(m.props.children)), d = Re(e, J(L) ? L : [L], t, n, o, r, l, s, d, p, i), c.base = t.__e, t.__u &= -161, c.__h.length && s.push(c), u && (c.__E = c.__ = null);
        } catch (H) {
          if (t.__v = null, p || l != null)
            if (H.then) {
              for (t.__u |= p ? 160 : 128; d && d.nodeType == 8 && d.nextSibling; )
                d = d.nextSibling;
              l[l.indexOf(d)] = null, t.__e = d;
            } else {
              for (j = l.length; j--; )
                re(l[j]);
              ae(t);
            }
          else
            t.__e = n.__e, t.__k = n.__k, H.then || ae(t);
          h.__e(H, t, n);
        }
      else
        l == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : d = t.__e = lt(n.__e, t, n, o, r, l, s, p, i);
    return (m = h.diffed) && m(t), 128 & t.__u ? void 0 : d;
  }
  function ae(e) {
    e && e.__c && (e.__c.__e = !0), e && e.__k && e.__k.forEach(ae);
  }
  function Le(e, t, n) {
    for (var o = 0; o < n.length; o++)
      se(n[o], n[++o], n[++o]);
    h.__c && h.__c(t, e), e.some(function(r) {
      try {
        e = r.__h, r.__h = [], e.some(function(l) {
          l.call(r);
        });
      } catch (l) {
        h.__e(l, r.__v);
      }
    });
  }
  function Ce(e) {
    return typeof e != "object" || e == null || e.__b && e.__b > 0 ? e : J(e) ? e.map(Ce) : M({}, e);
  }
  function lt(e, t, n, o, r, l, s, d, p) {
    var i, m, c, b, g, x, S, u = n.props, f = t.props, y = t.type;
    if (y == "svg" ? r = "http://www.w3.org/2000/svg" : y == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), l != null) {
      for (i = 0; i < l.length; i++)
        if ((g = l[i]) && "setAttribute" in g == !!y && (y ? g.localName == y : g.nodeType == 3)) {
          e = g, l[i] = null;
          break;
        }
    }
    if (e == null) {
      if (y == null)
        return document.createTextNode(f);
      e = document.createElementNS(r, y, f.is && f), d && (h.__m && h.__m(t, l), d = !1), l = null;
    }
    if (y == null)
      u === f || d && e.data == f || (e.data = f);
    else {
      if (l = l && E.call(e.childNodes), u = n.props || V, !d && l != null)
        for (u = {}, i = 0; i < e.attributes.length; i++)
          u[(g = e.attributes[i]).name] = g.value;
      for (i in u)
        if (g = u[i], i != "children") {
          if (i == "dangerouslySetInnerHTML")
            c = g;
          else if (!(i in f)) {
            if (i == "value" && "defaultValue" in f || i == "checked" && "defaultChecked" in f)
              continue;
            Q(e, i, null, g, r);
          }
        }
      for (i in f)
        g = f[i], i == "children" ? b = g : i == "dangerouslySetInnerHTML" ? m = g : i == "value" ? x = g : i == "checked" ? S = g : d && typeof g != "function" || u[i] === g || Q(e, i, g, u[i], r);
      if (m)
        d || c && (m.__html == c.__html || m.__html == e.innerHTML) || (e.innerHTML = m.__html), t.__k = [];
      else if (c && (e.innerHTML = ""), Re(t.type == "template" ? e.content : e, J(b) ? b : [b], t, n, o, y == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, l, s, l ? l[0] : n.__k && F(n, 0), d, p), l != null)
        for (i = l.length; i--; )
          re(l[i]);
      d || (i = "value", y == "progress" && x == null ? e.removeAttribute("value") : x != null && (x !== e[i] || y == "progress" && !x || y == "option" && x != u[i]) && Q(e, i, x, u[i], r), i = "checked", S != null && S != e[i] && Q(e, i, S, u[i], r));
    }
    return e;
  }
  function se(e, t, n) {
    try {
      if (typeof e == "function") {
        var o = typeof e.__u == "function";
        o && e.__u(), o && t == null || (e.__u = e(t));
      } else
        e.current = t;
    } catch (r) {
      h.__e(r, n);
    }
  }
  function $e(e, t, n) {
    var o, r;
    if (h.unmount && h.unmount(e), (o = e.ref) && (o.current && o.current != e.__e || se(o, null, t)), (o = e.__c) != null) {
      if (o.componentWillUnmount)
        try {
          o.componentWillUnmount();
        } catch (l) {
          h.__e(l, t);
        }
      o.base = o.__P = null;
    }
    if (o = e.__k)
      for (r = 0; r < o.length; r++)
        o[r] && $e(o[r], t, n || typeof e.type != "function");
    n || re(e.__e), e.__c = e.__ = e.__e = void 0;
  }
  function at(e, t, n) {
    return this.constructor(e, n);
  }
  function st(e, t, n) {
    var o, r, l, s;
    t == document && (t = document.documentElement), h.__ && h.__(e, t), r = (o = typeof n == "function") ? null : n && n.__k || t.__k, l = [], s = [], le(t, e = (!o && n || t).__k = ie(W, null, [e]), r || V, V, t.namespaceURI, !o && n ? [n] : r ? null : t.firstChild ? E.call(t.childNodes) : null, l, !o && n ? n : r ? r.__e : t.firstChild, o, s), Le(l, e, s);
  }
  E = ye.slice, h = { __e: function(e, t, n, o) {
    for (var r, l, s; t = t.__; )
      if ((r = t.__c) && !r.__)
        try {
          if ((l = r.constructor) && l.getDerivedStateFromError != null && (r.setState(l.getDerivedStateFromError(e)), s = r.__d), r.componentDidCatch != null && (r.componentDidCatch(e, o || {}), s = r.__d), s)
            return r.__E = r;
        } catch (d) {
          e = d;
        }
    throw e;
  } }, I = 0, B.prototype.setState = function(e, t) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = M({}, this.state), typeof e == "function" && (e = e(M({}, n), this.props)), e && M(n, e), e != null && this.__v && (t && this._sb.push(t), ke(this));
  }, B.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), ke(this));
  }, B.prototype.render = W, N = [], me = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, be = function(e, t) {
    return e.__v.__b - t.__v.__b;
  }, X.__r = 0, ve = /(PointerCapture)$|Capture$/i, te = 0, ne = we(!1), oe = we(!0);
  var ct = 0;
  function a(e, t, n, o, r, l) {
    t || (t = {});
    var s, d, p = t;
    if ("ref" in p)
      for (d in p = {}, t)
        d == "ref" ? s = t[d] : p[d] = t[d];
    var i = { type: e, props: p, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --ct, __i: -1, __u: 0, __source: r, __self: l };
    if (typeof e == "function" && (s = e.defaultProps))
      for (d in s)
        p[d] === void 0 && (p[d] = s[d]);
    return h.vnode && h.vnode(i), i;
  }
  var Z, R, ce, Ee, de = 0, Ae = [], T = h, Me = T.__b, Be = T.__r, De = T.diffed, Pe = T.__c, He = T.unmount, Ie = T.__;
  function Ne(e, t) {
    T.__h && T.__h(R, e, de || t), de = 0;
    var n = R.__H || (R.__H = { __: [], __h: [] });
    return e >= n.__.length && n.__.push({}), n.__[e];
  }
  function O(e) {
    return de = 1, dt(Fe, e);
  }
  function dt(e, t, n) {
    var o = Ne(Z++, 2);
    if (o.t = e, !o.__c && (o.__ = [n ? n(t) : Fe(void 0, t), function(d) {
      var p = o.__N ? o.__N[0] : o.__[0], i = o.t(p, d);
      p !== i && (o.__N = [i, o.__[1]], o.__c.setState({}));
    }], o.__c = R, !R.__f)) {
      var r = function(d, p, i) {
        if (!o.__c.__H)
          return !0;
        var m = o.__c.__H.__.filter(function(b) {
          return !!b.__c;
        });
        if (m.every(function(b) {
          return !b.__N;
        }))
          return !l || l.call(this, d, p, i);
        var c = o.__c.props !== d;
        return m.forEach(function(b) {
          if (b.__N) {
            var g = b.__[0];
            b.__ = b.__N, b.__N = void 0, g !== b.__[0] && (c = !0);
          }
        }), l && l.call(this, d, p, i) || c;
      };
      R.__f = !0;
      var l = R.shouldComponentUpdate, s = R.componentWillUpdate;
      R.componentWillUpdate = function(d, p, i) {
        if (this.__e) {
          var m = l;
          l = void 0, r(d, p, i), l = m;
        }
        s && s.call(this, d, p, i);
      }, R.shouldComponentUpdate = r;
    }
    return o.__N || o.__;
  }
  function ut(e, t) {
    var n = Ne(Z++, 3);
    !T.__s && ft(n.__H, t) && (n.__ = e, n.u = t, R.__H.__h.push(n));
  }
  function pt() {
    for (var e; e = Ae.shift(); )
      if (e.__P && e.__H)
        try {
          e.__H.__h.forEach(Y), e.__H.__h.forEach(ue), e.__H.__h = [];
        } catch (t) {
          e.__H.__h = [], T.__e(t, e.__v);
        }
  }
  T.__b = function(e) {
    R = null, Me && Me(e);
  }, T.__ = function(e, t) {
    e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ie && Ie(e, t);
  }, T.__r = function(e) {
    Be && Be(e), Z = 0;
    var t = (R = e.__c).__H;
    t && (ce === R ? (t.__h = [], R.__h = [], t.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (t.__h.forEach(Y), t.__h.forEach(ue), t.__h = [], Z = 0)), ce = R;
  }, T.diffed = function(e) {
    De && De(e);
    var t = e.__c;
    t && t.__H && (t.__H.__h.length && (Ae.push(t) !== 1 && Ee === T.requestAnimationFrame || ((Ee = T.requestAnimationFrame) || _t)(pt)), t.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), ce = R = null;
  }, T.__c = function(e, t) {
    t.some(function(n) {
      try {
        n.__h.forEach(Y), n.__h = n.__h.filter(function(o) {
          return !o.__ || ue(o);
        });
      } catch (o) {
        t.some(function(r) {
          r.__h && (r.__h = []);
        }), t = [], T.__e(o, n.__v);
      }
    }), Pe && Pe(e, t);
  }, T.unmount = function(e) {
    He && He(e);
    var t, n = e.__c;
    n && n.__H && (n.__H.__.forEach(function(o) {
      try {
        Y(o);
      } catch (r) {
        t = r;
      }
    }), n.__H = void 0, t && T.__e(t, n.__v));
  };
  var We = typeof requestAnimationFrame == "function";
  function _t(e) {
    var t, n = function() {
      clearTimeout(o), We && cancelAnimationFrame(t), setTimeout(e);
    }, o = setTimeout(n, 35);
    We && (t = requestAnimationFrame(n));
  }
  function Y(e) {
    var t = R, n = e.__c;
    typeof n == "function" && (e.__c = void 0, n()), R = t;
  }
  function ue(e) {
    var t = R;
    e.__c = e.__(), R = t;
  }
  function ft(e, t) {
    return !e || e.length !== t.length || t.some(function(n, o) {
      return n !== e[o];
    });
  }
  function Fe(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ht(e, t) {
    for (var n in t)
      e[n] = t[n];
    return e;
  }
  function Oe(e, t) {
    for (var n in e)
      if (n !== "__source" && !(n in t))
        return !0;
    for (var o in t)
      if (o !== "__source" && e[o] !== t[o])
        return !0;
    return !1;
  }
  function ze(e, t) {
    this.props = e, this.context = t;
  }
  (ze.prototype = new B()).isPureReactComponent = !0, ze.prototype.shouldComponentUpdate = function(e, t) {
    return Oe(this.props, e) || Oe(this.state, t);
  };
  var Ue = h.__b;
  h.__b = function(e) {
    e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Ue && Ue(e);
  };
  var gt = h.__e;
  h.__e = function(e, t, n, o) {
    if (e.then) {
      for (var r, l = t; l = l.__; )
        if ((r = l.__c) && r.__c)
          return t.__e == null && (t.__e = n.__e, t.__k = n.__k), r.__c(e, t);
    }
    gt(e, t, n, o);
  };
  var je = h.unmount;
  function qe(e, t, n) {
    return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
      typeof o.__c == "function" && o.__c();
    }), e.__c.__H = null), (e = ht({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
      return qe(o, t, n);
    })), e;
  }
  function Ve(e, t, n) {
    return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
      return Ve(o, t, n);
    }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
  }
  function pe() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Je(e) {
    var t = e.__.__c;
    return t && t.__a && t.__a(e);
  }
  function ee() {
    this.i = null, this.l = null;
  }
  h.unmount = function(e) {
    var t = e.__c;
    t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), je && je(e);
  }, (pe.prototype = new B()).__c = function(e, t) {
    var n = t.__c, o = this;
    o.o == null && (o.o = []), o.o.push(n);
    var r = Je(o.__v), l = !1, s = function() {
      l || (l = !0, n.__R = null, r ? r(d) : d());
    };
    n.__R = s;
    var d = function() {
      if (!--o.__u) {
        if (o.state.__a) {
          var p = o.state.__a;
          o.__v.__k[0] = Ve(p, p.__c.__P, p.__c.__O);
        }
        var i;
        for (o.setState({ __a: o.__b = null }); i = o.o.pop(); )
          i.forceUpdate();
      }
    };
    o.__u++ || 32 & t.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(s, s);
  }, pe.prototype.componentWillUnmount = function() {
    this.o = [];
  }, pe.prototype.render = function(e, t) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), o = this.__v.__k[0].__c;
        this.__v.__k[0] = qe(this.__b, n, o.__O = o.__P);
      }
      this.__b = null;
    }
    var r = t.__a && ie(W, null, e.fallback);
    return r && (r.__u &= -33), [ie(W, null, t.__a ? null : e.children), r];
  };
  var Ge = function(e, t, n) {
    if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size))
      for (n = e.i; n; ) {
        for (; n.length > 3; )
          n.pop()();
        if (n[1] < n[0])
          break;
        e.i = n = n[2];
      }
  };
  (ee.prototype = new B()).__a = function(e) {
    var t = this, n = Je(t.__v), o = t.l.get(e);
    return o[0]++, function(r) {
      var l = function() {
        t.props.revealOrder ? (o.push(r), Ge(t, e, o)) : r();
      };
      n ? n(l) : l();
    };
  }, ee.prototype.render = function(e) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var t = K(e.children);
    e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
    for (var n = t.length; n--; )
      this.l.set(t[n], this.i = [1, 0, this.i]);
    return e.children;
  }, ee.prototype.componentDidUpdate = ee.prototype.componentDidMount = function() {
    var e = this;
    this.l.forEach(function(t, n) {
      Ge(e, n, t);
    });
  };
  var mt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, bt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, vt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, yt = /[A-Z0-9]/g, xt = typeof document < "u", kt = function(e) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
  };
  function Xe(e, t, n) {
    return t.__k == null && (t.textContent = ""), st(e, t), typeof n == "function" && n(), e ? e.__c : null;
  }
  B.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
    Object.defineProperty(B.prototype, e, { configurable: !0, get: function() {
      return this["UNSAFE_" + e];
    }, set: function(t) {
      Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
    } });
  });
  var Ke = h.event;
  function Rt() {
  }
  function Tt() {
    return this.cancelBubble;
  }
  function St() {
    return this.defaultPrevented;
  }
  h.event = function(e) {
    return Ke && (e = Ke(e)), e.persist = Rt, e.isPropagationStopped = Tt, e.isDefaultPrevented = St, e.nativeEvent = e;
  };
  var wt = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Qe = h.vnode;
  h.vnode = function(e) {
    typeof e.type == "string" && function(t) {
      var n = t.props, o = t.type, r = {}, l = o.indexOf("-") === -1;
      for (var s in n) {
        var d = n[s];
        if (!(s === "value" && "defaultValue" in n && d == null || xt && s === "children" && o === "noscript" || s === "class" || s === "className")) {
          var p = s.toLowerCase();
          s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && d === !0 ? d = "" : p === "translate" && d === "no" ? d = !1 : p[0] === "o" && p[1] === "n" ? p === "ondoubleclick" ? s = "ondblclick" : p !== "onchange" || o !== "input" && o !== "textarea" || kt(n.type) ? p === "onfocus" ? s = "onfocusin" : p === "onblur" ? s = "onfocusout" : vt.test(s) && (s = p) : p = s = "oninput" : l && bt.test(s) ? s = s.replace(yt, "-$&").toLowerCase() : d === null && (d = void 0), p === "oninput" && r[s = p] && (s = "oninputCapture"), r[s] = d;
        }
      }
      o == "select" && r.multiple && Array.isArray(r.value) && (r.value = K(n.children).forEach(function(i) {
        i.props.selected = r.value.indexOf(i.props.value) != -1;
      })), o == "select" && r.defaultValue != null && (r.value = K(n.children).forEach(function(i) {
        i.props.selected = r.multiple ? r.defaultValue.indexOf(i.props.value) != -1 : r.defaultValue == i.props.value;
      })), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", wt)) : (n.className && !n.class || n.class && n.className) && (r.class = r.className = n.className), t.props = r;
    }(e), e.$$typeof = mt, Qe && Qe(e);
  };
  var Ze = h.__r;
  h.__r = function(e) {
    Ze && Ze(e), e.__c;
  };
  var Ye = h.diffed;
  h.diffed = function(e) {
    Ye && Ye(e);
    var t = e.props, n = e.__e;
    n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
  };
  function Lt({ detector: e }) {
    const [t, n] = O(""), [o, r] = O(""), l = window.Blinko.i18n, s = () => {
      if (!t.trim())
        return;
      const p = e.detectRTL(t);
      r(p ? "RTL" : "LTR"), window.Blinko.toast.success(`Text is ${p ? "RTL" : "LTR"}`);
    }, d = () => {
      var i, m;
      (i = window.blinkoRTL) == null || i.toggle();
      const p = (m = window.blinkoRTL) == null ? void 0 : m.isEnabled();
      window.Blinko.toast.success(
        p ? l.t("rtl_enabled") : l.t("rtl_disabled")
      );
    };
    return /* @__PURE__ */ a("div", { style: { padding: "20px", fontFamily: "system-ui, sans-serif", maxWidth: "400px" }, children: [
      /* @__PURE__ */ a("h2", { children: l.t("rtl_support") }),
      /* @__PURE__ */ a("p", { children: "Click the floating ع/א button to toggle RTL support." }),
      /* @__PURE__ */ a("div", { style: { margin: "20px 0" }, children: /* @__PURE__ */ a(
        "button",
        {
          onClick: d,
          style: {
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer"
          },
          children: l.t("manual_toggle")
        }
      ) }),
      /* @__PURE__ */ a("div", { style: { margin: "20px 0" }, children: [
        /* @__PURE__ */ a("h3", { children: "Test RTL Detection" }),
        /* @__PURE__ */ a(
          "textarea",
          {
            value: t,
            onChange: (p) => n(p.target.value),
            placeholder: "Enter text to test...",
            style: {
              width: "100%",
              height: "80px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical"
            }
          }
        ),
        /* @__PURE__ */ a(
          "button",
          {
            onClick: s,
            style: {
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px"
            },
            children: "Test"
          }
        ),
        o && /* @__PURE__ */ a("div", { style: {
          marginTop: "10px",
          padding: "10px",
          background: "#f8f9fa",
          borderRadius: "4px",
          borderLeft: "4px solid #007bff"
        }, children: [
          "Result: ",
          /* @__PURE__ */ a("strong", { children: o })
        ] }),
        /* @__PURE__ */ a("div", { style: { marginTop: "10px", fontSize: "14px", color: "#666" }, children: [
          /* @__PURE__ */ a("strong", { children: "Examples:" }),
          /* @__PURE__ */ a("br", {}),
          "Hebrew: שלום עולם",
          /* @__PURE__ */ a("br", {}),
          "Arabic: مرحبا بالعالم",
          /* @__PURE__ */ a("br", {}),
          "English: Hello world"
        ] })
      ] })
    ] });
  }
  function Ct() {
    const [e, t] = O({
      enabled: !0,
      sensitivity: "medium",
      forceDirection: "auto",
      autoDetect: !1,
      manualMode: !0,
      manualToggle: !1,
      darkMode: !1,
      method: "all",
      customCSS: "",
      permanentCSS: !1,
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
      mixedContent: !0
    }), [n, o] = O(""), [r, l] = O(""), [s, d] = O("");
    window.Blinko.i18n;
    const p = `/* Enhanced RTL Support from Blinko-RTL.css */
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
}`;
    ut(() => {
      const u = localStorage.getItem("blinko-rtl-settings");
      if (u)
        try {
          const f = JSON.parse(u);
          t((y) => ({ ...y, ...f }));
        } catch (f) {
          console.error("Failed to load RTL plugin settings:", f);
        }
    }, []);
    const i = (u) => {
      const f = { ...e, ...u };
      t(f), localStorage.setItem("blinko-rtl-settings", JSON.stringify(f)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: f
        })
      ), window.Blinko.toast.success("Settings saved!");
    }, m = () => {
      var f;
      if (!r.trim())
        return;
      const u = (f = window.blinkoRTL) == null ? void 0 : f.test(r);
      d(u ? "RTL" : "LTR");
    }, c = () => {
      var u;
      (u = window.blinkoRTL) == null || u.processAll(), window.Blinko.toast.success("Content processed!");
    }, b = () => {
      n.trim() && !e.targetSelectors.includes(n.trim()) && (i({
        targetSelectors: [...e.targetSelectors, n.trim()]
      }), o(""));
    }, g = (u) => {
      i({
        targetSelectors: e.targetSelectors.filter((f) => f !== u)
      });
    }, x = () => {
      i({ customCSS: p }), window.Blinko.toast.success("Default CSS loaded!");
    }, S = () => {
      i({
        enabled: !0,
        sensitivity: "medium",
        forceDirection: "auto",
        autoDetect: !1,
        manualMode: !0,
        manualToggle: !1,
        darkMode: !1,
        method: "all",
        customCSS: "",
        permanentCSS: !1,
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
        mixedContent: !0
      });
    };
    return /* @__PURE__ */ a(
      "div",
      {
        className: e.darkMode ? "rtl-settings-dark" : "",
        style: {
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "system-ui, sans-serif",
          background: e.darkMode ? "#1a1a1a" : "white",
          color: "#000"
        },
        children: [
          /* @__PURE__ */ a("div", { style: { marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #eee" }, children: [
            /* @__PURE__ */ a("h2", { style: { margin: "0 0 10px 0", color: "#333" }, children: "🔧 Fixed RTL Language Support Settings" }),
            /* @__PURE__ */ a("p", { style: { margin: "0", color: e.darkMode ? "#333" : "#666", fontSize: "14px" }, children: "Precise RTL support with manual control and optional permanent CSS injection." })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #007bff",
            borderRadius: "8px",
            background: "#f8f9ff"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#007bff" }, children: "⚡ Quick Actions" }),
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: c,
                  disabled: !e.enabled,
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
                    var u;
                    (u = window.blinkoRTL) == null || u.toggle(), window.Blinko.toast.success("RTL toggled!");
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
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => {
                    var f;
                    const u = (f = window.blinkoRTL) == null ? void 0 : f.toggleManual();
                    t((y) => ({ ...y, manualToggle: u })), window.Blinko.toast.success(`Manual RTL ${u ? "ON" : "OFF"}`);
                  },
                  style: {
                    background: e.manualToggle ? "#28a745" : "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  },
                  children: [
                    "🔄 Manual Toggle ",
                    e.manualToggle ? "ON" : "OFF"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #28a745",
            borderRadius: "8px",
            background: "#f8fff8"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "🔧 RTL Application Method" }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
              "RTL Method:",
              /* @__PURE__ */ a(
                "select",
                {
                  value: e.method,
                  onChange: (u) => i({
                    method: u.target.value
                  }),
                  disabled: !e.enabled,
                  style: {
                    marginLeft: "auto",
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    minWidth: "200px"
                  },
                  children: [
                    /* @__PURE__ */ a("option", { value: "direct", children: "🎯 Direct Styling" }),
                    /* @__PURE__ */ a("option", { value: "attributes", children: "🏷️ HTML Attributes" }),
                    /* @__PURE__ */ a("option", { value: "css", children: "🎨 CSS Classes" }),
                    /* @__PURE__ */ a("option", { value: "unicode", children: "🔤 Unicode Bidi" }),
                    /* @__PURE__ */ a("option", { value: "all", children: "🚀 All Methods (Recommended)" })
                  ]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎛️ Mode Settings" }),
            /* @__PURE__ */ a("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.enabled,
                    onChange: (u) => i({ enabled: u.target.checked })
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🔧 Enable RTL Support" })
              ] }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.manualMode,
                    onChange: (u) => i({ manualMode: u.target.checked }),
                    disabled: !e.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "✋ Manual Mode (Recommended)" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Manual mode only applies RTL when clearly detected, preventing unwanted changes" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.autoDetect,
                    onChange: (u) => i({ autoDetect: u.target.checked }),
                    disabled: !e.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🤖 Auto-detect All Content" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Continuously processes all content on the page every 2 seconds" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.manualToggle,
                    onChange: (u) => {
                      const f = u.target.checked;
                      i({ manualToggle: f });
                      const y = window.blinkoRTL;
                      y && y.isEnabled() && y.processAll();
                    },
                    disabled: !e.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🔄 Manual RTL Toggle" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Forces RTL on all content when enabled, ignores detection" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.darkMode,
                    onChange: (u) => {
                      const f = u.target.checked;
                      i({ darkMode: f }), f ? document.body.classList.add("dark") : document.body.classList.remove("dark");
                    }
                  }
                ),
                /* @__PURE__ */ a("span", { children: "🌙 Dark Mode Plugin UI" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: e.darkMode ? "#333" : "#666" }, children: "Applies dark styling to RTL plugin components only" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.hebrewRegex,
                    onChange: (u) => i({ hebrewRegex: u.target.checked }),
                    disabled: !e.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "📜 Hebrew Regex Detection" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: e.darkMode ? "#333" : "#666" }, children: "Uses Unicode Script property for Hebrew detection" }),
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.arabicRegex,
                    onChange: (u) => i({ arabicRegex: u.target.checked }),
                    disabled: !e.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "📜 Arabic Regex Detection" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: "#666" }, children: "Applies dark styling to RTL plugin components only" })
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎯 Detection Settings" }),
            /* @__PURE__ */ a("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Detection Sensitivity:",
                /* @__PURE__ */ a(
                  "select",
                  {
                    value: e.sensitivity,
                    onChange: (u) => i({
                      sensitivity: u.target.value
                    }),
                    disabled: !e.enabled,
                    style: {
                      marginLeft: "auto",
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      minWidth: "200px"
                    },
                    children: [
                      /* @__PURE__ */ a("option", { value: "high", children: "🔥 High - 10% RTL characters" }),
                      /* @__PURE__ */ a("option", { value: "medium", children: "⚖️ Medium - 20% RTL characters" }),
                      /* @__PURE__ */ a("option", { value: "low", children: "🎯 Low - 40% RTL characters" })
                    ]
                  }
                )
              ] }) }),
              /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Min RTL Characters:",
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    max: "20",
                    value: e.minRTLChars,
                    onChange: (u) => i({ minRTLChars: parseInt(u.target.value) }),
                    disabled: !e.enabled,
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
              /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Process Interval (ms):",
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "number",
                    min: "500",
                    max: "10000",
                    step: "500",
                    value: e.processInterval,
                    onChange: (u) => i({ processInterval: parseInt(u.target.value) }),
                    disabled: !e.enabled,
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
              /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
                "Direction Override:",
                /* @__PURE__ */ a(
                  "select",
                  {
                    value: e.forceDirection,
                    onChange: (u) => i({
                      forceDirection: u.target.value
                    }),
                    disabled: !e.enabled,
                    style: {
                      marginLeft: "auto",
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      minWidth: "200px"
                    },
                    children: [
                      /* @__PURE__ */ a("option", { value: "auto", children: "🤖 Auto-detect" }),
                      /* @__PURE__ */ a("option", { value: "rtl", children: "➡️ Force RTL" }),
                      /* @__PURE__ */ a("option", { value: "ltr", children: "⬅️ Force LTR" })
                    ]
                  }
                )
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #28a745",
            borderRadius: "8px",
            background: "#f8fff8"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "🎨 Permanent CSS Settings" }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ a("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.permanentCSS,
                    onChange: (u) => i({ permanentCSS: u.target.checked }),
                    disabled: !e.enabled
                  }
                ),
                /* @__PURE__ */ a("span", { children: "📌 Enable Permanent CSS Injection" })
              ] }),
              /* @__PURE__ */ a("p", { style: { margin: "5px 0 0 30px", fontSize: "12px", color: "#666" }, children: "CSS will remain active even when RTL is disabled" })
            ] }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ a("label", { style: { display: "block", fontWeight: "500", marginBottom: "5px" }, children: "Custom CSS Code:" }),
              /* @__PURE__ */ a(
                "textarea",
                {
                  value: e.customCSS,
                  onChange: (u) => i({ customCSS: u.target.value }),
                  placeholder: "Enter your custom CSS code here...",
                  disabled: !e.enabled,
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
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: x,
                  disabled: !e.enabled,
                  style: {
                    background: "#17a2b8",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  },
                  children: "📋 Load Default CSS"
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => i({ customCSS: "" }),
                  disabled: !e.enabled,
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
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🎯 Target Selectors" }),
            /* @__PURE__ */ a("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: e.darkMode ? "#333" : "#666" }, children: "Specific elements to process for RTL detection (focused approach)" }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px", maxHeight: "150px", overflowY: "auto" }, children: e.targetSelectors.map((u, f) => /* @__PURE__ */ a("div", { style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              marginBottom: "5px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }, children: [
              /* @__PURE__ */ a("code", { style: {
                fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                fontSize: "13px",
                color: "#333",
                flex: 1
              }, children: u }),
              /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: () => g(u),
                  disabled: !e.enabled,
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
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px" }, children: [
              /* @__PURE__ */ a(
                "input",
                {
                  type: "text",
                  value: n,
                  onChange: (u) => o(u.target.value),
                  placeholder: "e.g., .markdown-body p, .vditor-reset div",
                  disabled: !e.enabled,
                  onKeyPress: (u) => u.key === "Enter" && b(),
                  style: {
                    flex: "1",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: b,
                  disabled: !e.enabled || !n.trim(),
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
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🧪 Test RTL Detection" }),
            /* @__PURE__ */ a("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ a(
              "textarea",
              {
                value: r,
                onChange: (u) => l(u.target.value),
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
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", marginBottom: "15px" }, children: /* @__PURE__ */ a(
              "button",
              {
                onClick: m,
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
            s && /* @__PURE__ */ a("div", { style: {
              padding: "10px",
              background: s === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${s === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ a("strong", { children: s === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
            ] }),
            /* @__PURE__ */ a("div", { style: { fontSize: "14px", color: e.darkMode ? "#333" : "#666", lineHeight: "1.6" }, children: [
              /* @__PURE__ */ a("strong", { children: "🧪 Test Examples:" }),
              /* @__PURE__ */ a("br", {}),
              /* @__PURE__ */ a("strong", { children: "Hebrew:" }),
              " שלום עולם - זהו טקסט בעברית",
              /* @__PURE__ */ a("br", {}),
              /* @__PURE__ */ a("strong", { children: "Arabic:" }),
              " مرحبا بالعالم - هذا نص باللغة العربية",
              /* @__PURE__ */ a("br", {}),
              /* @__PURE__ */ a("strong", { children: "English:" }),
              " Hello world - this is English text"
            ] })
          ] }),
          /* @__PURE__ */ a("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }, children: [
            /* @__PURE__ */ a("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "🔧 Advanced Actions" }),
            /* @__PURE__ */ a("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: S,
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
                  onClick: () => {
                    const u = JSON.stringify(e, null, 2);
                    navigator.clipboard.writeText(u), window.Blinko.toast.success("Settings copied to clipboard");
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
  const $t = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "1.0.5",
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
  class Et {
    constructor(t = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      A(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      A(this, "RTL_RANGES", [
        [1424, 1535],
        // Hebrew
        [1536, 1791],
        // Arabic
        [1792, 1871],
        // Syriac
        [1920, 1983]
        // Thaana
      ]);
      this.config = t;
    }
    /**
     * Check if a character is RTL
     */
    isRTLChar(t) {
      const n = t.charCodeAt(0);
      return this.RTL_RANGES.some(([o, r]) => n >= o && n <= r);
    }
    /**
     * Detect RTL content in text
     */
    detectRTL(t) {
      if (!t || t.length === 0)
        return !1;
      const n = t.substring(0, this.config.sampleSize);
      let o = 0, r = 0;
      for (const d of n)
        /\s|[.,!?;:()[\]{}]/.test(d) || (r++, this.isRTLChar(d) && o++);
      return o < this.config.minRTLChars ? !1 : (r > 0 ? o / r : 0) >= {
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
    detectRTLInSegments(t) {
      return t.map((n) => this.detectRTL(n));
    }
    /**
     * Update detection configuration
     */
    updateConfig(t) {
      this.config = { ...this.config, ...t };
    }
  }
  function At(e, t) {
    let n;
    return function(...r) {
      const l = () => {
        n = null, e(...r);
      };
      n && clearTimeout(n), n = setTimeout(l, t);
    };
  }
  class Mt {
    constructor(t, n = {
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
      A(this, "config");
      A(this, "detector");
      A(this, "observer", null);
      A(this, "styleSheet", null);
      A(this, "debouncedProcessElement");
      this.detector = t, this.config = n, this.injectRTLStyles(), this.debouncedProcessElement = At(this.processElement.bind(this), 150);
    }
    /**
     * Inject RTL CSS styles into document
     */
    injectRTLStyles() {
      if (document.getElementById("blinko-rtl-styles"))
        return;
      const t = document.createElement("style");
      t.id = "blinko-rtl-styles", t.textContent = `
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
    `, document.head.appendChild(t);
    }
    /**
     * Apply RTL styling to element
     */
    applyRTL(t, n) {
      this.config.forceDirection !== "auto" && (n = this.config.forceDirection === "rtl"), t.classList.remove("blinko-rtl-content", "blinko-ltr-content"), t.classList.add("blinko-direction-transition"), n ? (t.classList.add("blinko-rtl-content"), t.setAttribute("dir", "rtl")) : (t.classList.add("blinko-ltr-content"), t.setAttribute("dir", "ltr"));
    }
    /**
     * Start observing DOM for changes
     */
    startObserving() {
      this.observer || (this.observer = new MutationObserver((t) => {
        t.forEach((n) => {
          if (n.type === "childList")
            n.addedNodes.forEach((o) => {
              o.nodeType === Node.ELEMENT_NODE && this.debouncedProcessElement(o);
            });
          else if (n.type === "characterData") {
            const o = n.target.parentElement;
            o && this.debouncedProcessElement(o);
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
    processElement(t) {
      if (!this.config.autoDetect)
        return;
      if (this.config.applyToSelectors.some(
        (o) => {
          var r, l;
          return ((r = t.matches) == null ? void 0 : r.call(t, o)) || ((l = t.querySelector) == null ? void 0 : l.call(t, o));
        }
      )) {
        const o = t.textContent || t.value || "";
        if (o) {
          const r = this.detector.detectRTL(o);
          this.applyRTL(t, r);
        }
      }
    }
    /**
     * Update styler configuration
     */
    updateConfig(t) {
      this.config = { ...this.config, ...t };
    }
    /**
     * Clean up styles and observers
     */
    destroy() {
      this.stopObserving();
      const t = document.getElementById("blinko-rtl-styles");
      t && t.remove();
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
  }, Dt = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Pt = {
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
  }, It = `
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
  System.register([], (e) => ({
    execute: () => {
      const t = new Et(), n = new Mt(t);
      let o = !1, r = null, l = null, s = null, d = null, p = null, i = {
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
        mixedContent: !0
      };
      const m = /\p{Script=Hebrew}/u, c = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
      function b() {
        r || (r = document.createElement("style"), r.id = "blinko-rtl-advanced-styles", r.textContent = It, document.head.appendChild(r));
      }
      function g() {
        i.customCSS && i.permanentCSS && (l || (l = document.createElement("style"), l.id = "blinko-rtl-permanent-styles", document.head.appendChild(l)), l.textContent = i.customCSS);
      }
      function x() {
        l && (l.remove(), l = null);
      }
      function S() {
        r && (r.remove(), r = null), i.permanentCSS || x();
      }
      function u() {
        if (s)
          return;
        s = document.createElement("button"), s.className = "rtl-toggle-btn", s.innerHTML = "ع/א", s.title = "Toggle RTL Support (Hebrew/Arabic)", s.addEventListener("click", he), document.body.appendChild(s), i.darkMode && s.classList.add("dark-mode"), localStorage.getItem("blinko-rtl-enabled") === "true" && _e();
      }
      function f() {
        s && (s.remove(), s = null);
      }
      function y(_, v) {
        v ? (_.style.direction = "rtl", _.style.textAlign = "right", _.style.unicodeBidi = "embed") : (_.style.direction = "ltr", _.style.textAlign = "left", _.style.unicodeBidi = "normal");
      }
      function C(_, v) {
        v ? (_.setAttribute("dir", "rtl"), _.setAttribute("lang", "he")) : (_.setAttribute("dir", "ltr"), _.removeAttribute("lang"));
      }
      function $(_, v) {
        _.classList.remove("rtl-force", "ltr-force", "rtl-auto"), v ? _.classList.add("rtl-force") : _.classList.add("ltr-force");
      }
      function z(_) {
        _.classList.add("rtl-auto"), _.style.unicodeBidi = "plaintext";
      }
      function D(_) {
        return m.test(_);
      }
      function U(_) {
        return c.test(_);
      }
      function P(_) {
        if (!_ || _.closest(".flex, .grid, header, nav, .sidebar, .toolbar, button, .btn"))
          return;
        const v = _.textContent || _.value || "";
        if (!v.trim() || v.length < i.minRTLChars)
          return;
        let k = !1;
        switch (i.manualToggle || i.forceDirection === "rtl" ? k = !0 : i.forceDirection === "ltr" ? k = !1 : i.hebrewRegex && D(v) || i.arabicRegex && U(v) ? k = !0 : k = t.detectRTL(v), i.method) {
          case "direct":
            y(_, k);
            break;
          case "attributes":
            C(_, k);
            break;
          case "css":
            $(_, k);
            break;
          case "unicode":
            z(_);
            break;
          case "all":
          default:
            y(_, k), C(_, k), $(_, k);
            break;
        }
        console.log(`Processed element with text: "${v.substring(0, 50)}..." -> ${k ? "RTL" : "LTR"}`);
      }
      function L() {
        console.log("Processing all elements, RTL enabled:", o, "Method:", i.method);
        let _ = 0;
        i.targetSelectors.forEach((v) => {
          try {
            const k = document.querySelectorAll(v);
            console.log(`Found ${k.length} elements for selector: ${v}`), k.forEach((q) => {
              P(q), _++;
            });
          } catch {
            console.warn(`Invalid selector: ${v}`);
          }
        }), console.log(`Total elements processed: ${_}`);
      }
      function j() {
        d && d.disconnect(), i.autoDetect && (d = new MutationObserver((_) => {
          if (!o)
            return;
          let v = !1;
          _.forEach((k) => {
            k.type === "childList" && k.addedNodes.forEach((q) => {
              if (q.nodeType === Node.ELEMENT_NODE) {
                const tt = q;
                P(tt), i.targetSelectors.forEach((Wt) => {
                  try {
                    tt.querySelectorAll(Wt).forEach((nt) => {
                      P(nt);
                    });
                  } catch {
                  }
                }), v = !0;
              }
            });
          }), v && setTimeout(L, 100);
        }), d.observe(document.body, {
          childList: !0,
          subtree: !0
        }));
      }
      function w() {
        p && clearInterval(p), i.autoDetect && o && (p = setInterval(() => {
          o && i.autoDetect ? L() : (clearInterval(p), p = null);
        }, i.processInterval));
      }
      function H() {
        p && (clearInterval(p), p = null);
      }
      function _e() {
        console.log("Enabling RTL with settings:", i), o = !0, b(), g(), j(), w(), s && s.classList.add("active"), localStorage.setItem("blinko-rtl-enabled", "true"), setTimeout(L, 100);
      }
      function fe() {
        o = !1, S(), H(), d && (d.disconnect(), d = null), s && s.classList.remove("active"), localStorage.setItem("blinko-rtl-enabled", "false"), document.querySelectorAll('[dir="rtl"], [lang="he"], [lang="ar"]').forEach((_) => {
          _.removeAttribute("dir"), _.removeAttribute("lang");
        }), document.querySelectorAll(".rtl-force, .rtl-auto, .ltr-force").forEach((_) => {
          _.classList.remove("rtl-force", "rtl-auto", "ltr-force"), _.style.direction = "", _.style.textAlign = "", _.style.unicodeBidi = "";
        });
      }
      function he() {
        o ? fe() : _e();
      }
      function Nt() {
        const _ = localStorage.getItem("blinko-rtl-settings");
        if (_)
          try {
            const v = JSON.parse(_);
            i = { ...i, ...v }, t.updateConfig({
              sensitivity: i.sensitivity,
              minRTLChars: i.minRTLChars
            }), i.permanentCSS && i.customCSS && g();
          } catch (v) {
            console.error("Failed to load RTL plugin settings:", v);
          }
      }
      function et() {
        console.log("Initializing Advanced Blinko RTL Plugin..."), Nt(), u(), window.addEventListener("rtl-settings-changed", (_) => {
          const v = _.detail;
          i = { ...i, ...v }, t.updateConfig({
            sensitivity: i.sensitivity,
            minRTLChars: i.minRTLChars
          }), i.permanentCSS && i.customCSS ? g() : x(), s && (i.darkMode ? s.classList.add("dark-mode") : s.classList.remove("dark-mode")), j(), w(), o && setTimeout(L, 100);
        }), window.blinkoRTL = {
          detector: t,
          styler: n,
          toggle: he,
          enable: _e,
          disable: fe,
          isEnabled: () => o,
          settings: () => ({ ...i }),
          processAll: L,
          processElement: P,
          toggleManual: () => (i.manualToggle = !i.manualToggle, localStorage.setItem("blinko-rtl-settings", JSON.stringify(i)), o && L(), i.manualToggle),
          test: (_) => {
            const v = t.detectRTL(_), k = D(_), q = U(_);
            return console.log(`Text "${_}" -> Original: ${v ? "RTL" : "LTR"}, Hebrew: ${k}, Arabic: ${q}`), v;
          },
          testHebrew: (_) => D(_),
          testArabic: (_) => U(_)
        }, console.log("Advanced Blinko RTL Plugin initialized successfully");
      }
      e("default", class {
        constructor() {
          A(this, "withSettingPanel", !0);
          A(this, "renderSettingPanel", () => {
            const v = document.createElement("div");
            return Xe(/* @__PURE__ */ a(Ct, {}), v), v;
          });
          Object.assign(this, $t);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", et) : setTimeout(et, 100), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: "RTL Language Support (ع/א)",
            content: () => {
              const v = document.createElement("div");
              return v.setAttribute("data-plugin", "rtl-support"), Xe(/* @__PURE__ */ a(Lt, { detector: t, styler: n }), v), v;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL (ع/א)",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              he();
              const v = window.Blinko.i18n;
              window.Blinko.toast.success(
                o ? v.t("rtl_enabled") : v.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", Bt), window.Blinko.i18n.addResourceBundle("zh", "translation", Dt), window.Blinko.i18n.addResourceBundle("he", "translation", Pt), window.Blinko.i18n.addResourceBundle("ar", "translation", Ht);
        }
        destroy() {
          fe(), f(), H(), d && d.disconnect(), n.destroy(), console.log("Advanced RTL Plugin destroyed");
        }
      });
    }
  }));
})();
