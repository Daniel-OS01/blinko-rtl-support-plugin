var Wt = Object.defineProperty;
var Ut = (E, f, F) => f in E ? Wt(E, f, { enumerable: !0, configurable: !0, writable: !0, value: F }) : E[f] = F;
var g = (E, f, F) => (Ut(E, typeof f != "symbol" ? f + "" : f, F), F);
(function() {
  var E, f, F, I, be, ve, ye, xe, re, se, le, V = {}, Se = [], st = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, q = Array.isArray;
  function B(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function ae(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function de(t, e, n) {
    var i, o, r, l = {};
    for (r in e)
      r == "key" ? i = e[r] : r == "ref" ? o = e[r] : l[r] = e[r];
    if (arguments.length > 2 && (l.children = arguments.length > 3 ? E.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (r in t.defaultProps)
        l[r] === void 0 && (l[r] = t.defaultProps[r]);
    return Q(t, l, i, o, null);
  }
  function Q(t, e, n, i, o) {
    var r = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o ?? ++F, __i: -1, __u: 0 };
    return o == null && f.vnode != null && f.vnode(r), r;
  }
  function N(t) {
    return t.children;
  }
  function $(t, e) {
    this.props = t, this.context = e;
  }
  function z(t, e) {
    if (e == null)
      return t.__ ? z(t.__, t.__i + 1) : null;
    for (var n; e < t.__k.length; e++)
      if ((n = t.__k[e]) != null && n.__e != null)
        return n.__e;
    return typeof t.type == "function" ? z(t) : null;
  }
  function ke(t) {
    var e, n;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((n = t.__k[e]) != null && n.__e != null) {
          t.__e = t.__c.base = n.__e;
          break;
        }
      return ke(t);
    }
  }
  function we(t) {
    (!t.__d && (t.__d = !0) && I.push(t) && !Z.__r++ || be != f.debounceRendering) && ((be = f.debounceRendering) || ve)(Z);
  }
  function Z() {
    for (var t, e, n, i, o, r, l, c = 1; I.length; )
      I.length > c && I.sort(ye), t = I.shift(), c = I.length, t.__d && (n = void 0, o = (i = (e = t).__v).__e, r = [], l = [], e.__P && ((n = B({}, i)).__v = i.__v + 1, f.vnode && f.vnode(n), ce(e.__P, n, i, e.__n, e.__P.namespaceURI, 32 & i.__u ? [o] : null, r, o ?? z(i), !!(32 & i.__u), l), n.__v = i.__v, n.__.__k[n.__i] = n, Ee(r, n, l), n.__e != o && ke(n)));
    Z.__r = 0;
  }
  function Te(t, e, n, i, o, r, l, c, p, a, h) {
    var d, v, b, x, m, y, k, w = i && i.__k || Se, M = e.length;
    for (p = lt(n, e, w, p, M), d = 0; d < M; d++)
      (b = n.__k[d]) != null && (v = b.__i == -1 ? V : w[b.__i] || V, b.__i = d, y = ce(t, b, v, o, r, l, c, p, a, h), x = b.__e, b.ref && v.ref != b.ref && (v.ref && pe(v.ref, null, b), h.push(b.ref, b.__c || x, b)), m == null && x != null && (m = x), (k = !!(4 & b.__u)) || v.__k === b.__k ? p = Le(b, p, t, k) : typeof b.type == "function" && y !== void 0 ? p = y : x && (p = x.nextSibling), b.__u &= -7);
    return n.__e = m, p;
  }
  function lt(t, e, n, i, o) {
    var r, l, c, p, a, h = n.length, d = h, v = 0;
    for (t.__k = new Array(o), r = 0; r < o; r++)
      (l = e[r]) != null && typeof l != "boolean" && typeof l != "function" ? (p = r + v, (l = t.__k[r] = typeof l == "string" || typeof l == "number" || typeof l == "bigint" || l.constructor == String ? Q(null, l, null, null, null) : q(l) ? Q(N, { children: l }, null, null, null) : l.constructor == null && l.__b > 0 ? Q(l.type, l.props, l.key, l.ref ? l.ref : null, l.__v) : l).__ = t, l.__b = t.__b + 1, c = null, (a = l.__i = at(l, n, p, d)) != -1 && (d--, (c = n[a]) && (c.__u |= 2)), c == null || c.__v == null ? (a == -1 && (o > h ? v-- : o < h && v++), typeof l.type != "function" && (l.__u |= 4)) : a != p && (a == p - 1 ? v-- : a == p + 1 ? v++ : (a > p ? v-- : v++, l.__u |= 4))) : t.__k[r] = null;
    if (d)
      for (r = 0; r < h; r++)
        (c = n[r]) != null && !(2 & c.__u) && (c.__e == i && (i = z(c)), Ae(c, c));
    return i;
  }
  function Le(t, e, n, i) {
    var o, r;
    if (typeof t.type == "function") {
      for (o = t.__k, r = 0; o && r < o.length; r++)
        o[r] && (o[r].__ = t, e = Le(o[r], e, n, i));
      return e;
    }
    t.__e != e && (i && (e && t.type && !e.parentNode && (e = z(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function Y(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (q(t) ? t.some(function(n) {
      Y(n, e);
    }) : e.push(t)), e;
  }
  function at(t, e, n, i) {
    var o, r, l, c = t.key, p = t.type, a = e[n], h = a != null && (2 & a.__u) == 0;
    if (a === null && t.key == null || h && c == a.key && p == a.type)
      return n;
    if (i > (h ? 1 : 0)) {
      for (o = n - 1, r = n + 1; o >= 0 || r < e.length; )
        if ((a = e[l = o >= 0 ? o-- : r++]) != null && !(2 & a.__u) && c == a.key && p == a.type)
          return l;
    }
    return -1;
  }
  function Ce(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || st.test(e) ? n : n + "px";
  }
  function K(t, e, n, i, o) {
    var r, l;
    e:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof i == "string" && (t.style.cssText = i = ""), i)
            for (e in i)
              n && e in n || Ce(t.style, e, "");
          if (n)
            for (e in n)
              i && n[e] == i[e] || Ce(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        r = e != (e = e.replace(xe, "$1")), l = e.toLowerCase(), e = l in t || e == "onFocusOut" || e == "onFocusIn" ? l.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + r] = n, n ? i ? n.u = i.u : (n.u = re, t.addEventListener(e, r ? le : se, r)) : t.removeEventListener(e, r ? le : se, r);
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
  function Re(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.t == null)
          e.t = re++;
        else if (e.t < n.u)
          return;
        return n(f.event ? f.event(e) : e);
      }
    };
  }
  function ce(t, e, n, i, o, r, l, c, p, a) {
    var h, d, v, b, x, m, y, k, w, M, A, W, H, ie, U, u, _, S = e.type;
    if (e.constructor != null)
      return null;
    128 & n.__u && (p = !!(32 & n.__u), r = [c = e.__e = n.__e]), (h = f.__b) && h(e);
    e:
      if (typeof S == "function")
        try {
          if (k = e.props, w = "prototype" in S && S.prototype.render, M = (h = S.contextType) && i[h.__c], A = h ? M ? M.props.value : h.__ : i, n.__c ? y = (d = e.__c = n.__c).__ = d.__E : (w ? e.__c = d = new S(k, A) : (e.__c = d = new $(k, A), d.constructor = S, d.render = ct), M && M.sub(d), d.props = k, d.state || (d.state = {}), d.context = A, d.__n = i, v = d.__d = !0, d.__h = [], d._sb = []), w && d.__s == null && (d.__s = d.state), w && S.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = B({}, d.__s)), B(d.__s, S.getDerivedStateFromProps(k, d.__s))), b = d.props, x = d.state, d.__v = e, v)
            w && S.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), w && d.componentDidMount != null && d.__h.push(d.componentDidMount);
          else {
            if (w && S.getDerivedStateFromProps == null && k !== b && d.componentWillReceiveProps != null && d.componentWillReceiveProps(k, A), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(k, d.__s, A) === !1 || e.__v == n.__v) {
              for (e.__v != n.__v && (d.props = k, d.state = d.__s, d.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(C) {
                C && (C.__ = e);
              }), W = 0; W < d._sb.length; W++)
                d.__h.push(d._sb[W]);
              d._sb = [], d.__h.length && l.push(d);
              break e;
            }
            d.componentWillUpdate != null && d.componentWillUpdate(k, d.__s, A), w && d.componentDidUpdate != null && d.__h.push(function() {
              d.componentDidUpdate(b, x, m);
            });
          }
          if (d.context = A, d.props = k, d.__P = t, d.__e = !1, H = f.__r, ie = 0, w) {
            for (d.state = d.__s, d.__d = !1, H && H(e), h = d.render(d.props, d.state, d.context), U = 0; U < d._sb.length; U++)
              d.__h.push(d._sb[U]);
            d._sb = [];
          } else
            do
              d.__d = !1, H && H(e), h = d.render(d.props, d.state, d.context), d.state = d.__s;
            while (d.__d && ++ie < 25);
          d.state = d.__s, d.getChildContext != null && (i = B(B({}, i), d.getChildContext())), w && !v && d.getSnapshotBeforeUpdate != null && (m = d.getSnapshotBeforeUpdate(b, x)), u = h, h != null && h.type === N && h.key == null && (u = Me(h.props.children)), c = Te(t, q(u) ? u : [u], e, n, i, o, r, l, c, p, a), d.base = e.__e, e.__u &= -161, d.__h.length && l.push(d), y && (d.__E = d.__ = null);
        } catch (C) {
          if (e.__v = null, p || r != null)
            if (C.then) {
              for (e.__u |= p ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                c = c.nextSibling;
              r[r.indexOf(c)] = null, e.__e = c;
            } else {
              for (_ = r.length; _--; )
                ae(r[_]);
              ue(e);
            }
          else
            e.__e = n.__e, e.__k = n.__k, C.then || ue(e);
          f.__e(C, e, n);
        }
      else
        r == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : c = e.__e = dt(n.__e, e, n, i, o, r, l, p, a);
    return (h = f.diffed) && h(e), 128 & e.__u ? void 0 : c;
  }
  function ue(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(ue);
  }
  function Ee(t, e, n) {
    for (var i = 0; i < n.length; i++)
      pe(n[i], n[++i], n[++i]);
    f.__c && f.__c(e, t), t.some(function(o) {
      try {
        t = o.__h, o.__h = [], t.some(function(r) {
          r.call(o);
        });
      } catch (r) {
        f.__e(r, o.__v);
      }
    });
  }
  function Me(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : q(t) ? t.map(Me) : B({}, t);
  }
  function dt(t, e, n, i, o, r, l, c, p) {
    var a, h, d, v, b, x, m, y = n.props, k = e.props, w = e.type;
    if (w == "svg" ? o = "http://www.w3.org/2000/svg" : w == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), r != null) {
      for (a = 0; a < r.length; a++)
        if ((b = r[a]) && "setAttribute" in b == !!w && (w ? b.localName == w : b.nodeType == 3)) {
          t = b, r[a] = null;
          break;
        }
    }
    if (t == null) {
      if (w == null)
        return document.createTextNode(k);
      t = document.createElementNS(o, w, k.is && k), c && (f.__m && f.__m(e, r), c = !1), r = null;
    }
    if (w == null)
      y === k || c && t.data == k || (t.data = k);
    else {
      if (r = r && E.call(t.childNodes), y = n.props || V, !c && r != null)
        for (y = {}, a = 0; a < t.attributes.length; a++)
          y[(b = t.attributes[a]).name] = b.value;
      for (a in y)
        if (b = y[a], a != "children") {
          if (a == "dangerouslySetInnerHTML")
            d = b;
          else if (!(a in k)) {
            if (a == "value" && "defaultValue" in k || a == "checked" && "defaultChecked" in k)
              continue;
            K(t, a, null, b, o);
          }
        }
      for (a in k)
        b = k[a], a == "children" ? v = b : a == "dangerouslySetInnerHTML" ? h = b : a == "value" ? x = b : a == "checked" ? m = b : c && typeof b != "function" || y[a] === b || K(t, a, b, y[a], o);
      if (h)
        c || d && (h.__html == d.__html || h.__html == t.innerHTML) || (t.innerHTML = h.__html), e.__k = [];
      else if (d && (t.innerHTML = ""), Te(e.type == "template" ? t.content : t, q(v) ? v : [v], e, n, i, w == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, r, l, r ? r[0] : n.__k && z(n, 0), c, p), r != null)
        for (a = r.length; a--; )
          ae(r[a]);
      c || (a = "value", w == "progress" && x == null ? t.removeAttribute("value") : x != null && (x !== t[a] || w == "progress" && !x || w == "option" && x != y[a]) && K(t, a, x, y[a], o), a = "checked", m != null && m != t[a] && K(t, a, m, y[a], o));
    }
    return t;
  }
  function pe(t, e, n) {
    try {
      if (typeof t == "function") {
        var i = typeof t.__u == "function";
        i && t.__u(), i && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (o) {
      f.__e(o, n);
    }
  }
  function Ae(t, e, n) {
    var i, o;
    if (f.unmount && f.unmount(t), (i = t.ref) && (i.current && i.current != t.__e || pe(i, null, e)), (i = t.__c) != null) {
      if (i.componentWillUnmount)
        try {
          i.componentWillUnmount();
        } catch (r) {
          f.__e(r, e);
        }
      i.base = i.__P = null;
    }
    if (i = t.__k)
      for (o = 0; o < i.length; o++)
        i[o] && Ae(i[o], e, n || typeof t.type != "function");
    n || ae(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function ct(t, e, n) {
    return this.constructor(t, n);
  }
  function ut(t, e, n) {
    var i, o, r, l;
    e == document && (e = document.documentElement), f.__ && f.__(t, e), o = (i = typeof n == "function") ? null : n && n.__k || e.__k, r = [], l = [], ce(e, t = (!i && n || e).__k = de(N, null, [t]), o || V, V, e.namespaceURI, !i && n ? [n] : o ? null : e.firstChild ? E.call(e.childNodes) : null, r, !i && n ? n : o ? o.__e : e.firstChild, i, l), Ee(r, t, l);
  }
  E = Se.slice, f = { __e: function(t, e, n, i) {
    for (var o, r, l; e = e.__; )
      if ((o = e.__c) && !o.__)
        try {
          if ((r = o.constructor) && r.getDerivedStateFromError != null && (o.setState(r.getDerivedStateFromError(t)), l = o.__d), o.componentDidCatch != null && (o.componentDidCatch(t, i || {}), l = o.__d), l)
            return o.__E = o;
        } catch (c) {
          t = c;
        }
    throw t;
  } }, F = 0, $.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = B({}, this.state), typeof t == "function" && (t = t(B({}, n), this.props)), t && B(n, t), t != null && this.__v && (e && this._sb.push(e), we(this));
  }, $.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), we(this));
  }, $.prototype.render = N, I = [], ve = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ye = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, Z.__r = 0, xe = /(PointerCapture)$|Capture$/i, re = 0, se = Re(!1), le = Re(!0);
  var pt = 0;
  function s(t, e, n, i, o, r) {
    e || (e = {});
    var l, c, p = e;
    if ("ref" in p)
      for (c in p = {}, e)
        c == "ref" ? l = e[c] : p[c] = e[c];
    var a = { type: t, props: p, key: n, ref: l, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --pt, __i: -1, __u: 0, __source: o, __self: r };
    if (typeof t == "function" && (l = t.defaultProps))
      for (c in l)
        p[c] === void 0 && (p[c] = l[c]);
    return f.vnode && f.vnode(a), a;
  }
  var ee, T, he, Pe, ge = 0, Be = [], L = f, $e = L.__b, De = L.__r, Fe = L.diffed, Ie = L.__c, Ne = L.unmount, He = L.__;
  function ze(t, e) {
    L.__h && L.__h(T, t, ge || e), ge = 0;
    var n = T.__H || (T.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function R(t) {
    return ge = 1, ht(We, t);
  }
  function ht(t, e, n) {
    var i = ze(ee++, 2);
    if (i.t = t, !i.__c && (i.__ = [n ? n(e) : We(void 0, e), function(c) {
      var p = i.__N ? i.__N[0] : i.__[0], a = i.t(p, c);
      p !== a && (i.__N = [a, i.__[1]], i.__c.setState({}));
    }], i.__c = T, !T.__f)) {
      var o = function(c, p, a) {
        if (!i.__c.__H)
          return !0;
        var h = i.__c.__H.__.filter(function(v) {
          return !!v.__c;
        });
        if (h.every(function(v) {
          return !v.__N;
        }))
          return !r || r.call(this, c, p, a);
        var d = i.__c.props !== c;
        return h.forEach(function(v) {
          if (v.__N) {
            var b = v.__[0];
            v.__ = v.__N, v.__N = void 0, b !== v.__[0] && (d = !0);
          }
        }), r && r.call(this, c, p, a) || d;
      };
      T.__f = !0;
      var r = T.shouldComponentUpdate, l = T.componentWillUpdate;
      T.componentWillUpdate = function(c, p, a) {
        if (this.__e) {
          var h = r;
          r = void 0, o(c, p, a), r = h;
        }
        l && l.call(this, c, p, a);
      }, T.shouldComponentUpdate = o;
    }
    return i.__N || i.__;
  }
  function _e(t, e) {
    var n = ze(ee++, 3);
    !L.__s && ft(n.__H, e) && (n.__ = t, n.u = e, T.__H.__h.push(n));
  }
  function gt() {
    for (var t; t = Be.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(te), t.__H.__h.forEach(fe), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], L.__e(e, t.__v);
        }
  }
  L.__b = function(t) {
    T = null, $e && $e(t);
  }, L.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), He && He(t, e);
  }, L.__r = function(t) {
    De && De(t), ee = 0;
    var e = (T = t.__c).__H;
    e && (he === T ? (e.__h = [], T.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(te), e.__h.forEach(fe), e.__h = [], ee = 0)), he = T;
  }, L.diffed = function(t) {
    Fe && Fe(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (Be.push(e) !== 1 && Pe === L.requestAnimationFrame || ((Pe = L.requestAnimationFrame) || _t)(gt)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), he = T = null;
  }, L.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(te), n.__h = n.__h.filter(function(i) {
          return !i.__ || fe(i);
        });
      } catch (i) {
        e.some(function(o) {
          o.__h && (o.__h = []);
        }), e = [], L.__e(i, n.__v);
      }
    }), Ie && Ie(t, e);
  }, L.unmount = function(t) {
    Ne && Ne(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(i) {
      try {
        te(i);
      } catch (o) {
        e = o;
      }
    }), n.__H = void 0, e && L.__e(e, n.__v));
  };
  var Oe = typeof requestAnimationFrame == "function";
  function _t(t) {
    var e, n = function() {
      clearTimeout(i), Oe && cancelAnimationFrame(e), setTimeout(t);
    }, i = setTimeout(n, 35);
    Oe && (e = requestAnimationFrame(n));
  }
  function te(t) {
    var e = T, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), T = e;
  }
  function fe(t) {
    var e = T;
    t.__c = t.__(), T = e;
  }
  function ft(t, e) {
    return !t || t.length !== e.length || e.some(function(n, i) {
      return n !== t[i];
    });
  }
  function We(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function mt(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function Ue(t, e) {
    for (var n in t)
      if (n !== "__source" && !(n in e))
        return !0;
    for (var i in e)
      if (i !== "__source" && t[i] !== e[i])
        return !0;
    return !1;
  }
  function je(t, e) {
    this.props = t, this.context = e;
  }
  (je.prototype = new $()).isPureReactComponent = !0, je.prototype.shouldComponentUpdate = function(t, e) {
    return Ue(this.props, t) || Ue(this.state, e);
  };
  var Ve = f.__b;
  f.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Ve && Ve(t);
  };
  var bt = f.__e;
  f.__e = function(t, e, n, i) {
    if (t.then) {
      for (var o, r = e; r = r.__; )
        if ((o = r.__c) && o.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), o.__c(t, e);
    }
    bt(t, e, n, i);
  };
  var qe = f.unmount;
  function Je(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(i) {
      typeof i.__c == "function" && i.__c();
    }), t.__c.__H = null), (t = mt({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(i) {
      return Je(i, e, n);
    })), t;
  }
  function Ge(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(i) {
      return Ge(i, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function me() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Xe(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function ne() {
    this.i = null, this.l = null;
  }
  f.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), qe && qe(t);
  }, (me.prototype = new $()).__c = function(t, e) {
    var n = e.__c, i = this;
    i.o == null && (i.o = []), i.o.push(n);
    var o = Xe(i.__v), r = !1, l = function() {
      r || (r = !0, n.__R = null, o ? o(c) : c());
    };
    n.__R = l;
    var c = function() {
      if (!--i.__u) {
        if (i.state.__a) {
          var p = i.state.__a;
          i.__v.__k[0] = Ge(p, p.__c.__P, p.__c.__O);
        }
        var a;
        for (i.setState({ __a: i.__b = null }); a = i.o.pop(); )
          a.forceUpdate();
      }
    };
    i.__u++ || 32 & e.__u || i.setState({ __a: i.__b = i.__v.__k[0] }), t.then(l, l);
  }, me.prototype.componentWillUnmount = function() {
    this.o = [];
  }, me.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), i = this.__v.__k[0].__c;
        this.__v.__k[0] = Je(this.__b, n, i.__O = i.__P);
      }
      this.__b = null;
    }
    var o = e.__a && de(N, null, t.fallback);
    return o && (o.__u &= -33), [de(N, null, e.__a ? null : t.children), o];
  };
  var Qe = function(t, e, n) {
    if (++n[1] === n[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size))
      for (n = t.i; n; ) {
        for (; n.length > 3; )
          n.pop()();
        if (n[1] < n[0])
          break;
        t.i = n = n[2];
      }
  };
  (ne.prototype = new $()).__a = function(t) {
    var e = this, n = Xe(e.__v), i = e.l.get(t);
    return i[0]++, function(o) {
      var r = function() {
        e.props.revealOrder ? (i.push(o), Qe(e, t, i)) : o();
      };
      n ? n(r) : r();
    };
  }, ne.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = Y(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, ne.prototype.componentDidUpdate = ne.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      Qe(t, n, e);
    });
  };
  var vt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, yt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, xt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, St = /[A-Z0-9]/g, kt = typeof document < "u", wt = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function Ze(t, e, n) {
    return e.__k == null && (e.textContent = ""), ut(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  $.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty($.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var Ye = f.event;
  function Tt() {
  }
  function Lt() {
    return this.cancelBubble;
  }
  function Ct() {
    return this.defaultPrevented;
  }
  f.event = function(t) {
    return Ye && (t = Ye(t)), t.persist = Tt, t.isPropagationStopped = Lt, t.isDefaultPrevented = Ct, t.nativeEvent = t;
  };
  var Rt = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Ke = f.vnode;
  f.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, i = e.type, o = {}, r = i.indexOf("-") === -1;
      for (var l in n) {
        var c = n[l];
        if (!(l === "value" && "defaultValue" in n && c == null || kt && l === "children" && i === "noscript" || l === "class" || l === "className")) {
          var p = l.toLowerCase();
          l === "defaultValue" && "value" in n && n.value == null ? l = "value" : l === "download" && c === !0 ? c = "" : p === "translate" && c === "no" ? c = !1 : p[0] === "o" && p[1] === "n" ? p === "ondoubleclick" ? l = "ondblclick" : p !== "onchange" || i !== "input" && i !== "textarea" || wt(n.type) ? p === "onfocus" ? l = "onfocusin" : p === "onblur" ? l = "onfocusout" : xt.test(l) && (l = p) : p = l = "oninput" : r && yt.test(l) ? l = l.replace(St, "-$&").toLowerCase() : c === null && (c = void 0), p === "oninput" && o[l = p] && (l = "oninputCapture"), o[l] = c;
        }
      }
      i == "select" && o.multiple && Array.isArray(o.value) && (o.value = Y(n.children).forEach(function(a) {
        a.props.selected = o.value.indexOf(a.props.value) != -1;
      })), i == "select" && o.defaultValue != null && (o.value = Y(n.children).forEach(function(a) {
        a.props.selected = o.multiple ? o.defaultValue.indexOf(a.props.value) != -1 : o.defaultValue == a.props.value;
      })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", Rt)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), e.props = o;
    }(t), t.$$typeof = vt, Ke && Ke(t);
  };
  var et = f.__r;
  f.__r = function(t) {
    et && et(t), t.__c;
  };
  var tt = f.diffed;
  f.diffed = function(t) {
    tt && tt(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  function Et({ detector: t }) {
    const [e, n] = R({ activeBlocks: 0 }), [i, o] = R(15), [r, l] = R(!1), [c, p] = R(!1), a = window.Blinko.i18n;
    _e(() => {
      const x = () => {
        var k;
        const y = ((k = window.blinkoRTL) == null ? void 0 : k.getStats()) || 0;
        n({ activeBlocks: y });
      };
      x();
      const m = setInterval(x, 1e3);
      return () => clearInterval(m);
    }, []), _e(() => {
      const x = () => {
        const m = window.blinkoRTL;
        if (m) {
          let y;
          if (typeof m.getSettings == "function" ? y = m.getSettings() : typeof m.settings == "function" && (y = m.settings()), y && y.threshold !== void 0 && o(Math.round(y.threshold * 100)), y && y.debugMode !== void 0 && p(y.debugMode), y)
            return !0;
        }
        return !1;
      };
      if (!x()) {
        const m = setInterval(() => {
          x() && clearInterval(m);
        }, 100);
        setTimeout(() => clearInterval(m), 2e3);
      }
    }, []);
    const h = () => {
      var x;
      l(!0), (x = window.blinkoRTL) == null || x.fixSelection(), setTimeout(() => {
        l(!1), window.Blinko.toast.success("Selection processed");
      }, 500);
    }, d = (x) => {
      var y;
      const m = parseInt(x.target.value);
      o(m), (y = window.blinkoRTL) == null || y.setSensitivity(m / 100);
    }, v = (x) => {
      const m = x.target.checked;
      p(m);
      const y = window.blinkoRTL;
      y && y.service && typeof y.service.toggleDebugMode == "function" && y.service.toggleDebugMode();
    };
    return /* @__PURE__ */ s("div", { style: {
      padding: "15px",
      fontFamily: "system-ui, sans-serif",
      width: "300px",
      background: "var(--bg-color, white)",
      color: "var(--text-color, black)"
    }, children: [
      /* @__PURE__ */ s("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px"
      }, children: [
        /* @__PURE__ */ s("h3", { style: { margin: 0, fontSize: "16px" }, children: "RTL Control Center" }),
        /* @__PURE__ */ s(
          "button",
          {
            onClick: () => {
              var m, y;
              (m = window.blinkoRTL) == null || m.toggle();
              const x = (y = window.blinkoRTL) == null ? void 0 : y.isEnabled();
              window.Blinko.toast.success(
                x ? a.t("rtl_enabled") : a.t("rtl_disabled")
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
      /* @__PURE__ */ s("div", { style: {
        background: "#f8f9fa",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "15px",
        textAlign: "center",
        borderLeft: "4px solid #007bff"
      }, children: [
        /* @__PURE__ */ s("div", { style: { fontSize: "24px", fontWeight: "bold", color: "#007bff" }, children: e.activeBlocks }),
        /* @__PURE__ */ s("div", { style: { fontSize: "12px", color: "#666" }, children: "Active RTL Blocks" })
      ] }),
      /* @__PURE__ */ s("div", { style: { marginBottom: "20px" }, children: /* @__PURE__ */ s(
        "button",
        {
          onClick: h,
          disabled: r,
          style: {
            width: "100%",
            background: r ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
            cursor: r ? "wait" : "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.2s"
          },
          children: r ? "Processing..." : /* @__PURE__ */ s(N, { children: [
            /* @__PURE__ */ s("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ s("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }) }),
            "Fix Selected Text"
          ] })
        }
      ) }),
      /* @__PURE__ */ s("div", { style: { marginBottom: "15px" }, children: [
        /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px" }, children: [
          /* @__PURE__ */ s(
            "input",
            {
              type: "checkbox",
              checked: c,
              onChange: v,
              style: { marginInlineEnd: "8px" }
            }
          ),
          "Enable Visual Debugger"
        ] }),
        /* @__PURE__ */ s("div", { style: { fontSize: "10px", color: "#888", marginInlineStart: "20px", marginTop: "2px" }, children: "Highlights RTL (Red) and LTR (Blue) blocks" })
      ] }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ s("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }, children: [
          /* @__PURE__ */ s("strong", { children: "Detection Sensitivity" }),
          /* @__PURE__ */ s("span", { style: { color: "#007bff" }, children: [
            i,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ s(
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
        /* @__PURE__ */ s("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#999", marginTop: "4px" }, children: [
          /* @__PURE__ */ s("span", { children: "More Sensitive (1%)" }),
          /* @__PURE__ */ s("span", { children: "Less Sensitive (50%)" })
        ] })
      ] }),
      /* @__PURE__ */ s("div", { style: { marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #eee", fontSize: "11px", color: "#888", textAlign: "center" }, children: "Click 'Fix Selected' to force detection on specific text." }),
      /* @__PURE__ */ s("div", { style: { marginTop: "5px", fontSize: "10px", color: "#aaa", textAlign: "center" }, children: [
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
`, J = [
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
  ], nt = {
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
    targetSelectors: J,
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
  }, G = [
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
      targetSelectors: J,
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
  function Mt() {
    const [t, e] = R({
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
      targetSelectors: J,
      disabledSelectors: [],
      minRTLChars: 3,
      processInterval: 2e3,
      hebrewRegex: !0,
      arabicRegex: !0,
      mixedContent: !0,
      savedPresets: []
    });
    R("");
    const [n, i] = R(""), [o, r] = R(""), [l, c] = R(""), [p, a] = R([]), [h, d] = R(""), [v, b] = R("");
    _e(() => {
      var C, oe;
      (() => {
        var P;
        const D = (P = window.blinkoRTL) == null ? void 0 : P.settings();
        if (D)
          e(D);
        else {
          const j = localStorage.getItem("blinko-rtl-settings");
          if (j)
            try {
              const X = JSON.parse(j);
              e((Ot) => ({ ...Ot, ...X }));
            } catch (X) {
              console.error("Failed to load RTL plugin settings:", X);
            }
        }
      })();
      const _ = (D) => {
        e((P) => ({ ...P, ...D.detail }));
      }, S = (D) => {
        a((P) => [D.detail, ...P].slice(0, 50));
      };
      return (oe = (C = window.blinkoRTL) == null ? void 0 : C.service) != null && oe.getActionLog && a(window.blinkoRTL.service.getActionLog()), window.addEventListener("rtl-settings-changed", _), window.addEventListener("rtl-action-logged", S), () => {
        window.removeEventListener("rtl-settings-changed", _), window.removeEventListener("rtl-action-logged", S);
      };
    }, []);
    const x = (u) => {
      let _ = 0;
      for (let S = 0; S < u.length; S++)
        if (u[S] === "{" && _++, u[S] === "}" && _--, _ < 0)
          return !1;
      return _ === 0;
    }, m = (u) => {
      var S;
      u.dynamicCSS !== void 0 && (x(u.dynamicCSS) ? d("") : d("Invalid CSS: Unbalanced curly braces"));
      const _ = { ...t, ...u };
      e(_), (S = window.blinkoRTL) != null && S.service ? window.blinkoRTL.service.updateSettings(u) : (localStorage.setItem("blinko-rtl-settings", JSON.stringify(_)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: _
        })
      ));
    }, y = () => {
      var _;
      if (!n.trim())
        return;
      const u = (_ = window.blinkoRTL) == null ? void 0 : _.detector;
      if (u) {
        const S = u.detectRTL(n);
        r(S ? "RTL" : "LTR");
      } else
        console.warn("RTL Detector not found via global API");
    }, k = () => {
      window.blinkoRTL && (window.blinkoRTL.processAll(), window.Blinko.toast.success("Content processed!"));
    }, w = () => {
      if (!l)
        return;
      const _ = [...G, ...t.savedPresets || []].find((S) => S.id === l);
      _ && (m({
        customCSS: _.css,
        dynamicCSS: _.dynamicCSS || t.dynamicCSS,
        targetSelectors: _.targetSelectors || t.targetSelectors,
        disabledSelectors: _.disabledSelectors || t.disabledSelectors
      }), window.Blinko.toast.success(`Preset "${_.name}" loaded!`));
    }, M = () => {
      const u = prompt("Enter a name for this Full Preset (CSS, Dynamic Rules, Selectors):");
      if (!u)
        return;
      const _ = {
        id: `custom-${Date.now()}`,
        name: u,
        css: t.customCSS,
        dynamicCSS: t.dynamicCSS,
        targetSelectors: t.targetSelectors,
        disabledSelectors: t.disabledSelectors,
        isBuiltIn: !1
      };
      m({
        savedPresets: [...t.savedPresets || [], _]
      }), c(_.id), window.Blinko.toast.success("Preset saved!");
    }, A = () => {
      if (!l)
        return;
      if (G.some((_) => _.id === l)) {
        window.Blinko.toast.error("Cannot delete built-in presets.");
        return;
      }
      confirm("Are you sure you want to delete this preset?") && (m({
        savedPresets: (t.savedPresets || []).filter((_) => _.id !== l)
      }), c(""));
    }, W = () => {
      if (confirm("Reset all settings to defaults? This cannot be undone.")) {
        const u = {
          ...nt,
          savedPresets: t.savedPresets || []
          // Preserve user presets
        };
        m(u), window.Blinko.toast.success("Settings reset to defaults");
      }
    }, H = () => {
      m({ dynamicCSS: O }), window.Blinko.toast.success("Dynamic CSS reset");
    }, ie = () => {
      const u = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(t, null, 2)), _ = document.createElement("a");
      _.setAttribute("href", u), _.setAttribute("download", "blinko-rtl-settings.json"), document.body.appendChild(_), _.click(), _.remove();
    }, U = (u) => {
      var C;
      const _ = (C = u.target.files) == null ? void 0 : C[0];
      if (!_)
        return;
      const S = new FileReader();
      S.onload = (oe) => {
        var D;
        try {
          const P = (D = oe.target) == null ? void 0 : D.result, j = JSON.parse(P);
          if (typeof j != "object" || j === null)
            throw new Error("Invalid JSON format");
          const X = { ...t, ...j };
          m(X), b(""), window.Blinko.toast.success("Settings imported successfully!");
        } catch (P) {
          console.error("Import failed", P), b("Failed to import settings: Invalid JSON file."), window.Blinko.toast.error("Import failed");
        }
      }, S.readAsText(_), u.target.value = "";
    };
    return /* @__PURE__ */ s(
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
          /* @__PURE__ */ s("div", { style: { marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #eee" }, children: [
            /* @__PURE__ */ s("h2", { style: { margin: "0 0 10px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🔧 Fixed RTL Language Support Settings" }),
            /* @__PURE__ */ s("p", { style: { margin: "0", color: t.darkMode ? "#aaa" : "#666", fontSize: "14px" }, children: "Precise RTL support with manual control and optional permanent CSS injection." })
          ] }),
          /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #007bff",
            borderRadius: "8px",
            background: t.darkMode ? "#2c3e50" : "#f8f9ff"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: "#007bff" }, children: "⚡ Quick Actions" }),
            /* @__PURE__ */ s("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }, children: [
              /* @__PURE__ */ s(
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
              /* @__PURE__ */ s(
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
              )
            ] })
          ] }),
          /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa",
            maxHeight: "300px",
            overflowY: "auto"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "📜 Real-time Action Log" }),
            p.length === 0 ? /* @__PURE__ */ s("p", { style: { color: t.darkMode ? "#aaa" : "#666", fontStyle: "italic" }, children: "No actions recorded yet..." }) : /* @__PURE__ */ s("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "12px", color: t.darkMode ? "#ccc" : "#000" }, children: [
              /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ s("tr", { style: { textAlign: "left", borderBottom: "1px solid #ccc" }, children: [
                /* @__PURE__ */ s("th", { style: { padding: "5px" }, children: "Time" }),
                /* @__PURE__ */ s("th", { style: { padding: "5px" }, children: "Element" }),
                /* @__PURE__ */ s("th", { style: { padding: "5px" }, children: "Action" }),
                /* @__PURE__ */ s("th", { style: { padding: "5px" }, children: "Details" })
              ] }) }),
              /* @__PURE__ */ s("tbody", { children: p.map((u, _) => /* @__PURE__ */ s("tr", { style: { borderBottom: t.darkMode ? "1px solid #444" : "1px solid #eee" }, children: [
                /* @__PURE__ */ s("td", { style: { padding: "5px", whiteSpace: "nowrap" }, children: u.timestamp }),
                /* @__PURE__ */ s("td", { style: { padding: "5px", fontFamily: "monospace" }, title: u.element, children: u.element.length > 20 ? u.element.substring(0, 20) + "..." : u.element }),
                /* @__PURE__ */ s("td", { style: { padding: "5px", color: u.direction === "RTL" ? "#28a745" : "#007bff" }, children: u.direction }),
                /* @__PURE__ */ s("td", { style: { padding: "5px", color: t.darkMode ? "#888" : "#666" }, children: u.textPreview })
              ] }, _)) })
            ] })
          ] }),
          /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🎛️ Mode Settings" }),
            /* @__PURE__ */ s("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enabled,
                    onChange: (u) => m({ enabled: u.target.checked })
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🔧 Enable RTL Support" })
              ] }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualMode,
                    onChange: (u) => m({ manualMode: u.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "✋ Manual Mode (Recommended)" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Manual mode only applies RTL when clearly detected, preventing unwanted changes" }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.mobileView,
                    onChange: (u) => m({ mobileView: u.target.checked })
                  }
                ),
                /* @__PURE__ */ s("span", { children: "📱 Mobile View" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Optimizes layout for mobile devices" }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.debugMode,
                    onChange: (u) => {
                      var S, C;
                      const _ = u.target.checked;
                      m({ debugMode: _ }), (C = (S = window.blinkoRTL) == null ? void 0 : S.service) == null || C.toggleDebugMode();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🐞 Visual Debugger" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Highlights detected RTL (Red) and LTR (Blue) elements with tooltips" }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.autoDetect,
                    onChange: (u) => m({ autoDetect: u.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🤖 Auto-detect All Content" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Continuously processes all content on the page every 2 seconds" }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualToggle,
                    onChange: (u) => {
                      const _ = u.target.checked;
                      m({ manualToggle: _ });
                      const S = window.blinkoRTL;
                      S && S.isEnabled() && S.processAll();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🔄 Manual RTL Toggle" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Forces RTL on all content when enabled, ignores detection" }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.darkMode,
                    onChange: (u) => {
                      const _ = u.target.checked;
                      m({ darkMode: _ }), _ ? document.body.classList.add("dark") : document.body.classList.remove("dark");
                    }
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🌙 Dark Mode Plugin UI" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Applies dark styling to RTL plugin components only" })
            ] })
          ] }),
          /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #6610f2",
            borderRadius: "8px",
            background: t.darkMode ? "#2c2c3e" : "#f8f9ff"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: "#6610f2" }, children: "🎨 Dynamic CSS Rules" }),
            /* @__PURE__ */ s("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: t.darkMode ? "#aaa" : "#666" }, children: "These CSS rules are applied dynamically when RTL or LTR content is detected. Customize the class definitions below to control how detected elements are styled." }),
            /* @__PURE__ */ s("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ s(
                "textarea",
                {
                  value: t.dynamicCSS,
                  onChange: (u) => m({ dynamicCSS: u.target.value }),
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
              h && /* @__PURE__ */ s("div", { style: { color: "red", fontSize: "12px", marginTop: "5px" }, children: h })
            ] }),
            /* @__PURE__ */ s("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ s(
                "button",
                {
                  onClick: H,
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
              /* @__PURE__ */ s(
                "button",
                {
                  onClick: () => {
                    if (h) {
                      window.Blinko.toast.error("Please fix CSS errors before saving.");
                      return;
                    }
                    m({ dynamicCSS: t.dynamicCSS }), window.Blinko.toast.success("Dynamic CSS Settings Saved");
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
          /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #28a745",
            borderRadius: "8px",
            background: t.darkMode ? "#1e3023" : "#f8fff8"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: "#28a745" }, children: "📌 Permanent CSS Settings" }),
            /* @__PURE__ */ s("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.permanentCSS,
                    onChange: (u) => m({ permanentCSS: u.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "Enable Permanent CSS Injection" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "5px 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "This CSS is injected permanently as long as the plugin is enabled, regardless of RTL detection. Use this for global overrides." })
            ] }),
            /* @__PURE__ */ s("div", { style: { marginBottom: "15px", padding: "15px", background: t.darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", borderRadius: "6px" }, children: [
              /* @__PURE__ */ s("label", { style: { display: "block", fontWeight: "500", marginBottom: "8px" }, children: "📚 CSS Presets:" }),
              /* @__PURE__ */ s("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
                /* @__PURE__ */ s(
                  "select",
                  {
                    value: l,
                    onChange: (u) => c(u.target.value),
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
                      /* @__PURE__ */ s("option", { value: "", children: "-- Select a Preset --" }),
                      /* @__PURE__ */ s("optgroup", { label: "Built-in Presets", children: G.map((u) => /* @__PURE__ */ s("option", { value: u.id, children: u.name }, u.id)) }),
                      t.savedPresets && t.savedPresets.length > 0 && /* @__PURE__ */ s("optgroup", { label: "Saved Presets", children: t.savedPresets.map((u) => /* @__PURE__ */ s("option", { value: u.id, children: u.name }, u.id)) })
                    ]
                  }
                ),
                /* @__PURE__ */ s(
                  "button",
                  {
                    onClick: w,
                    disabled: !t.enabled || !l,
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
                /* @__PURE__ */ s(
                  "button",
                  {
                    onClick: A,
                    disabled: !t.enabled || !l || G.some((u) => u.id === l),
                    style: {
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      opacity: G.some((u) => u.id === l) ? 0.5 : 1
                    },
                    title: "Delete selected preset",
                    children: "🗑️"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ s("div", { style: { marginBottom: "15px" }, children: [
              /* @__PURE__ */ s("label", { style: { display: "block", fontWeight: "500", marginBottom: "5px" }, children: "Custom CSS Code (Permanent):" }),
              /* @__PURE__ */ s(
                "textarea",
                {
                  value: t.customCSS,
                  onChange: (u) => m({ customCSS: u.target.value }),
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
            /* @__PURE__ */ s("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ s(
                "button",
                {
                  onClick: M,
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
              /* @__PURE__ */ s(
                "button",
                {
                  onClick: () => m({ customCSS: "" }),
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
          /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🧪 Test RTL Detection" }),
            /* @__PURE__ */ s("div", { style: { marginBottom: "15px" }, children: /* @__PURE__ */ s(
              "textarea",
              {
                value: n,
                onChange: (u) => i(u.target.value),
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
            /* @__PURE__ */ s("div", { style: { display: "flex", gap: "10px", marginBottom: "15px" }, children: /* @__PURE__ */ s(
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
            o && /* @__PURE__ */ s("div", { style: {
              padding: "10px",
              background: o === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${o === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px",
              color: "#333"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ s("strong", { children: o === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
            ] })
          ] }),
          /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🔧 Advanced Actions" }),
            /* @__PURE__ */ s("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }, children: [
              /* @__PURE__ */ s(
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
              /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  onClick: ie,
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
              /* @__PURE__ */ s("label", { style: {
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                display: "inline-block"
              }, children: [
                "📂 Import Settings (JSON)",
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "file",
                    accept: ".json",
                    onChange: U,
                    style: { display: "none" }
                  }
                )
              ] })
            ] }),
            v && /* @__PURE__ */ s("p", { style: { color: "red", marginTop: "10px" }, children: v })
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
  class At {
    constructor(e = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      g(this, "name", "CharacterCode");
      g(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      g(this, "RTL_RANGES", [
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
  class Pt {
    constructor(e = !0, n = !0, i = 0.3, o = 3) {
      g(this, "name", "Regex");
      // Hebrew regex range: 0590-05FF, FB1D-FB4F (Presentation forms A), FB50-FBB1 (Presentation forms B - wait, that's Arabic)
      // Hebrew: \u0590-\u05FF
      g(this, "hebrewPattern", "\\u0590-\\u05FF");
      // Arabic regex range
      g(this, "arabicPattern", "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF");
      g(this, "checkHebrew");
      g(this, "checkArabic");
      g(this, "threshold");
      // Ratio 0.0 - 1.0
      g(this, "minRTLChars", 3);
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
      const r = o.length;
      if (r < this.minRTLChars)
        return e.trim().length >= this.minRTLChars, !1;
      const l = e.length;
      return l === 0 ? !1 : r / l > this.threshold;
    }
  }
  class ot {
    constructor(e) {
      g(this, "name", "Combined");
      g(this, "strategies");
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
  class Bt {
    constructor(e = {}) {
      g(this, "strategy");
      g(this, "charCodeStrategy");
      g(this, "regexStrategy");
      g(this, "config");
      this.config = {
        sensitivity: "medium",
        minRTLChars: 3,
        sampleSize: 100,
        ...e
      }, this.charCodeStrategy = new At(this.config);
      const n = this.getThresholdFromSensitivity(this.config.sensitivity);
      this.regexStrategy = new Pt(!0, !0, n, this.config.minRTLChars), this.strategy = new ot([
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
          this.strategy = new ot([
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
  function rt(t, e, n = !1) {
    let i = null;
    return function(...o) {
      const r = this, l = function() {
        i = null, n || t.apply(r, o);
      }, c = n && !i;
      i && clearTimeout(i), i = setTimeout(l, e), c && t.apply(r, o);
    };
  }
  class $t {
    constructor(e) {
      g(this, "detector");
      g(this, "isEnabled", !1);
      g(this, "activeToast", null);
      g(this, "handlePaste", (e) => {
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
      var o, r, l, c;
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
      }), (r = i.querySelector("#rtl-btn-wrap")) == null || r.addEventListener("click", () => {
        this.insertText(n, this.processWrap(e)), this.removeToast();
      }), (l = i.querySelector("#rtl-btn-original")) == null || l.addEventListener("click", () => {
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
        const i = e, o = i.selectionStart || 0, r = i.selectionEnd || 0;
        i.value = i.value.substring(0, o) + n + i.value.substring(r), i.selectionStart = i.selectionEnd = o + n.length, i.dispatchEvent(new Event("input", { bubbles: !0 }));
      } else if (e.focus(), !document.execCommand("insertText", !1, n)) {
        const o = window.getSelection();
        if (o && o.rangeCount > 0) {
          const r = o.getRangeAt(0);
          r.deleteContents(), r.insertNode(document.createTextNode(n)), r.collapse(!1);
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
  class Dt {
    constructor(e) {
      g(this, "button", null);
      g(this, "currentTarget", null);
      g(this, "hideTimeout", null);
      g(this, "options");
      g(this, "isHoveringButton", !1);
      g(this, "styleElement", null);
      g(this, "onMouseOver", (e) => {
        if (!this.options.isEnabled())
          return;
        let n = e.target;
        if (!n || !document.body.contains(n))
          return;
        if (n.closest('button, a, input, select, textarea, [role="button"], .btn')) {
          this.scheduleHide();
          return;
        }
        const i = n.closest(this.options.selectors.join(","));
        i && this.showButton(i);
      });
      g(this, "onMouseOut", (e) => {
        this.scheduleHide();
      });
      g(this, "hideButton", () => {
        var e;
        (e = this.button) == null || e.classList.remove("visible");
      });
      g(this, "onButtonClick", (e) => {
        if (e.stopPropagation(), e.preventDefault(), !this.currentTarget)
          return;
        const n = this.currentTarget.getAttribute("data-manual-dir"), o = window.getComputedStyle(this.currentTarget).direction === "rtl";
        let r = "ltr";
        n === "ltr" ? r = "rtl" : n === "rtl" ? r = "ltr" : r = o ? "ltr" : "rtl", this.currentTarget.setAttribute("data-manual-dir", r), this.options.processElement(this.currentTarget), r === "rtl" ? (this.currentTarget.style.direction = "rtl", this.currentTarget.style.textAlign = "right", this.currentTarget.classList.add("rtl-force"), this.currentTarget.classList.remove("ltr-force")) : (this.currentTarget.style.direction = "ltr", this.currentTarget.style.textAlign = "left", this.currentTarget.classList.add("ltr-force"), this.currentTarget.classList.remove("rtl-force"));
      });
      this.options = e;
    }
    init() {
      this.createButton(), document.addEventListener("mouseover", this.onMouseOver), document.addEventListener("mouseout", this.onMouseOut), document.addEventListener("scroll", this.hideButton, { capture: !0, passive: !0 });
    }
    destroy() {
      this.button && (this.button.remove(), this.button = null), this.styleElement && (this.styleElement.remove(), this.styleElement = null), document.removeEventListener("mouseover", this.onMouseOver), document.removeEventListener("mouseout", this.onMouseOut), document.removeEventListener("scroll", this.hideButton);
    }
    createButton() {
      this.button || (this.button = document.createElement("div"), this.button.className = "rtl-hover-action-btn", this.button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 9h16"/><path d="M4 9l4-4"/><path d="M20 9l-4 4"/>
        <path d="M20 15H4"/><path d="M20 15l-4 4"/><path d="M4 15l4-4"/>
      </svg>
    `, this.button.title = "Flip Direction", this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .rtl-hover-action-btn {
        position: fixed;
        z-index: 99999; /* Very high z-index */
        background: var(--bg-card, #fff);
        border: 1px solid var(--border-color, #ddd);
        border-radius: 4px;
        padding: 2px 4px; /* Smaller padding */
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
        font-size: 12px;
        height: 20px;
        width: 24px;
      }
      .rtl-hover-action-btn.visible {
        opacity: 1;
        pointer-events: auto;
        transform: scale(1);
      }
      .rtl-hover-action-btn:hover {
        background: var(--bg-hover, #f5f5f5);
        color: var(--primary-color, #0066cc);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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
      const e = this.currentTarget.getBoundingClientRect(), n = e.top;
      let i = e.top - 25, o = e.right - 30;
      n < 30 && (i = e.top + 5), this.button.style.top = `${i}px`, this.button.style.left = `${o}px`;
    }
  }
  class Ft {
    constructor(e) {
      g(this, "detector");
      g(this, "isRTLEnabled", !1);
      g(this, "styleElement", null);
      g(this, "permanentStyleElement", null);
      g(this, "dynamicStyleElement", null);
      g(this, "observer", null);
      g(this, "autoProcessInterval", null);
      // Managers
      g(this, "pasteInterceptor");
      g(this, "hoverManager", null);
      // Optimizations
      g(this, "pendingElements", /* @__PURE__ */ new Set());
      g(this, "debouncedProcessQueue");
      g(this, "debouncedProcessAll");
      // Action Log
      g(this, "actionLog", []);
      g(this, "MAX_LOG_SIZE", 50);
      // Hebrew regex from userscript
      g(this, "hebrewRegex", /\p{Script=Hebrew}/u);
      g(this, "arabicRegex", /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/);
      g(this, "settings", { ...nt, targetSelectors: J });
      g(this, "processElement", (e) => {
        if (!e)
          return;
        if (this.settings.disabledSelectors && this.settings.disabledSelectors.some((o) => e.matches(o))) {
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
        if (this.settings.manualToggle)
          i = !0;
        else if (this.settings.forceDirection === "rtl")
          i = !0;
        else if (this.settings.forceDirection === "ltr")
          i = !1;
        else if (e.matches("pre, code, .code-block, .CodeMirror-line, .notion-code-block")) {
          const r = (n.match(/[\u0590-\u05FF]/g) || []).length, l = (n.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length, c = r + l, p = n.replace(/\s/g, "").length || n.length;
          c / p > 0.6 && (i = !0);
        } else
          i = this.detector.detectRTL(n);
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
      g(this, "processAllElements", () => {
        if (!this.isRTLEnabled)
          return;
        const n = this.settings.targetSelectors.filter(
          (i) => !this.settings.disabledSelectors.includes(i)
        ).join(", ");
        if (console.log("processAllElements selectors:", n), n) {
          const i = document.querySelectorAll(n);
          console.log("processAllElements found elements:", i.length), i.forEach((o) => {
            this.processElement(o);
          });
        }
      });
      this.detector = e, this.loadSettings(), this.pasteInterceptor = new $t(e), this.debouncedProcessAll = rt(() => this.processAllElements(), 200), this.debouncedProcessQueue = rt(() => {
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
            const i = new Set(n.targetSelectors || []), o = [.../* @__PURE__ */ new Set([...J, ...Array.from(i)])];
            this.settings.targetSelectors = o;
          }
          this.settings.dynamicCSS || (this.settings.dynamicCSS = O), this.settings.disabledSelectors || (this.settings.disabledSelectors = []), this.settings.autoDetect === void 0 && (this.settings.autoDetect = !0), this.detector.updateConfig({
            sensitivity: this.settings.sensitivity,
            minRTLChars: this.settings.minRTLChars
          }), this.settings.permanentCSS && this.settings.customCSS && this.injectPermanentCSS();
        } catch (n) {
          console.error("Failed to load RTL plugin settings:", n);
        }
      else
        this.settings.autoDetect = !0;
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
      this.isRTLEnabled = !0, this.injectCSS(), this.injectDynamicCSS(), this.settings.permanentCSS && this.injectPermanentCSS(), this.pasteInterceptor.enable(), this.hoverManager || (this.hoverManager = new Dt({
        selectors: this.settings.targetSelectors,
        processElement: (e) => this.processElement(e),
        isEnabled: () => this.isRTLEnabled
      }), this.hoverManager.init()), this.setupObserver(), this.startAutoProcessing(), this.processAllElements(), setTimeout(() => this.processAllElements(), 500);
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
          (r) => !this.settings.disabledSelectors.includes(r)
        ), o = i.join(", ");
        e.forEach((r) => {
          if (r.type === "childList")
            r.addedNodes.forEach((l) => {
              if (l.nodeType === Node.ELEMENT_NODE) {
                const c = l;
                i.some((p) => c.matches(p)) && (this.pendingElements.add(c), n = !0), o && c.querySelector(o) && (c.querySelectorAll(o).forEach((p) => {
                  this.pendingElements.add(p);
                }), n = !0);
              }
            });
          else if (r.type === "characterData" || r.type === "attributes") {
            const l = r.target.nodeType === Node.ELEMENT_NODE ? r.target : r.target.parentElement;
            l && i.some((c) => l.matches(c)) && (this.pendingElements.add(l), n = !0);
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
  const en = "", It = {
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
  }, Ht = {
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
      const e = new Bt(), n = new Ft(e);
      let i = null;
      function o() {
        if (i)
          return;
        const p = n.getSettings();
        i = document.createElement("button"), i.className = "rtl-toggle-btn", i.innerHTML = "ع/א", i.title = "Toggle RTL Support (Hebrew/Arabic)", i.addEventListener("click", () => {
          n.toggle(), r();
        }), document.body.appendChild(i), p.darkMode && i.classList.add("dark-mode"), r();
      }
      function r() {
        i && (n.isEnabled() ? i.classList.add("active") : i.classList.remove("active"));
      }
      function l() {
        i && (i.remove(), i = null);
      }
      function c() {
        console.log("Initializing Advanced Blinko RTL Plugin..."), o(), localStorage.getItem("blinko-rtl-enabled") === "true" && (n.enable(), r()), window.addEventListener("rtl-settings-changed", (a) => {
          const h = a.detail;
          i && (h.darkMode ? i.classList.add("dark-mode") : i.classList.remove("dark-mode"));
        }), window.blinkoRTL = {
          detector: e,
          service: n,
          // Expose service
          toggle: () => {
            n.toggle(), r();
          },
          enable: () => {
            n.enable(), r();
          },
          disable: () => {
            n.disable(), r();
          },
          isEnabled: () => n.isEnabled(),
          settings: () => n.getSettings(),
          getSettings: () => n.getSettings(),
          // Alias for app.tsx compatibility
          processAll: n.processAllElements,
          processElement: n.processElement,
          toggleManual: () => n.toggleManual(),
          test: (a) => {
            const h = e.detectRTL(a), d = n.detectHebrewRegex(a), v = n.detectArabicRegex(a);
            return console.log(`Text "${a}" -> Original: ${h ? "RTL" : "LTR"}, Hebrew: ${d}, Arabic: ${v}`), h;
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
              const v = d.closest("p, div, li, td, th");
              v && n.processElement(v);
            }
          }
        }, console.log("Advanced Blinko RTL Plugin initialized successfully");
      }
      t("default", class {
        constructor() {
          g(this, "withSettingPanel", !0);
          g(this, "renderSettingPanel", () => {
            const a = document.createElement("div");
            return Ze(/* @__PURE__ */ s(Mt, {}), a), a;
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
              const a = document.createElement("div");
              return a.setAttribute("data-plugin", "rtl-support"), Ze(/* @__PURE__ */ s(Et, { detector: e }), a), a;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL (ع/א)",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              n.toggle(), r();
              const a = window.Blinko.i18n;
              window.Blinko.toast.success(
                n.isEnabled() ? a.t("rtl_enabled") : a.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", It), window.Blinko.i18n.addResourceBundle("zh", "translation", Nt), window.Blinko.i18n.addResourceBundle("he", "translation", Ht), window.Blinko.i18n.addResourceBundle("ar", "translation", zt);
        }
        destroy() {
          n.disable(), l(), console.log("Advanced RTL Plugin destroyed");
        }
      });
    }
  }));
})();
