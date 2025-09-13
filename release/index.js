var $e = Object.defineProperty;
var Ee = (w, p, $) => p in w ? $e(w, p, { enumerable: !0, configurable: !0, writable: !0, value: $ }) : w[p] = $;
var R = (w, p, $) => (Ee(w, typeof p != "symbol" ? p + "" : p, $), $);
(function() {
  var w, p, $, P, _t, ct, at, ut, X, K, Z, N = {}, dt = [], Gt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, H = Array.isArray;
  function L(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function Q(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function Y(t, e, n) {
    var o, r, i, _ = {};
    for (i in e)
      i == "key" ? o = e[i] : i == "ref" ? r = e[i] : _[i] = e[i];
    if (arguments.length > 2 && (_.children = arguments.length > 3 ? w.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (i in t.defaultProps)
        _[i] === void 0 && (_[i] = t.defaultProps[i]);
    return U(t, _, o, r, null);
  }
  function U(t, e, n, o, r) {
    var i = { type: t, props: e, key: n, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++$, __i: -1, __u: 0 };
    return r == null && p.vnode != null && p.vnode(i), i;
  }
  function A(t) {
    return t.children;
  }
  function S(t, e) {
    this.props = t, this.context = e;
  }
  function B(t, e) {
    if (e == null)
      return t.__ ? B(t.__, t.__i + 1) : null;
    for (var n; e < t.__k.length; e++)
      if ((n = t.__k[e]) != null && n.__e != null)
        return n.__e;
    return typeof t.type == "function" ? B(t) : null;
  }
  function pt(t) {
    var e, n;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((n = t.__k[e]) != null && n.__e != null) {
          t.__e = t.__c.base = n.__e;
          break;
        }
      return pt(t);
    }
  }
  function ft(t) {
    (!t.__d && (t.__d = !0) && P.push(t) && !z.__r++ || _t != p.debounceRendering) && ((_t = p.debounceRendering) || ct)(z);
  }
  function z() {
    for (var t, e, n, o, r, i, _, c = 1; P.length; )
      P.length > c && P.sort(at), t = P.shift(), c = P.length, t.__d && (n = void 0, r = (o = (e = t).__v).__e, i = [], _ = [], e.__P && ((n = L({}, o)).__v = o.__v + 1, p.vnode && p.vnode(n), tt(e.__P, n, o, e.__n, e.__P.namespaceURI, 32 & o.__u ? [r] : null, i, r ?? B(o), !!(32 & o.__u), _), n.__v = o.__v, n.__.__k[n.__i] = n, bt(i, n, _), n.__e != r && pt(n)));
    z.__r = 0;
  }
  function ht(t, e, n, o, r, i, _, c, a, s, d) {
    var l, h, f, g, m, k, v, b = o && o.__k || dt, E = e.length;
    for (a = Jt(n, e, b, a, E), l = 0; l < E; l++)
      (f = n.__k[l]) != null && (h = f.__i == -1 ? N : b[f.__i] || N, f.__i = l, k = tt(t, f, h, r, i, _, c, a, s, d), g = f.__e, f.ref && h.ref != f.ref && (h.ref && nt(h.ref, null, f), d.push(f.ref, f.__c || g, f)), m == null && g != null && (m = g), (v = !!(4 & f.__u)) || h.__k === f.__k ? a = gt(f, a, t, v) : typeof f.type == "function" && k !== void 0 ? a = k : g && (a = g.nextSibling), f.__u &= -7);
    return n.__e = m, a;
  }
  function Jt(t, e, n, o, r) {
    var i, _, c, a, s, d = n.length, l = d, h = 0;
    for (t.__k = new Array(r), i = 0; i < r; i++)
      (_ = e[i]) != null && typeof _ != "boolean" && typeof _ != "function" ? (a = i + h, (_ = t.__k[i] = typeof _ == "string" || typeof _ == "number" || typeof _ == "bigint" || _.constructor == String ? U(null, _, null, null, null) : H(_) ? U(A, { children: _ }, null, null, null) : _.constructor == null && _.__b > 0 ? U(_.type, _.props, _.key, _.ref ? _.ref : null, _.__v) : _).__ = t, _.__b = t.__b + 1, c = null, (s = _.__i = Xt(_, n, a, l)) != -1 && (l--, (c = n[s]) && (c.__u |= 2)), c == null || c.__v == null ? (s == -1 && (r > d ? h-- : r < d && h++), typeof _.type != "function" && (_.__u |= 4)) : s != a && (s == a - 1 ? h-- : s == a + 1 ? h++ : (s > a ? h-- : h++, _.__u |= 4))) : t.__k[i] = null;
    if (l)
      for (i = 0; i < d; i++)
        (c = n[i]) != null && !(2 & c.__u) && (c.__e == o && (o = B(c)), xt(c, c));
    return o;
  }
  function gt(t, e, n, o) {
    var r, i;
    if (typeof t.type == "function") {
      for (r = t.__k, i = 0; r && i < r.length; i++)
        r[i] && (r[i].__ = t, e = gt(r[i], e, n, o));
      return e;
    }
    t.__e != e && (o && (e && t.type && !e.parentNode && (e = B(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function W(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (H(t) ? t.some(function(n) {
      W(n, e);
    }) : e.push(t)), e;
  }
  function Xt(t, e, n, o) {
    var r, i, _, c = t.key, a = t.type, s = e[n], d = s != null && (2 & s.__u) == 0;
    if (s === null && t.key == null || d && c == s.key && a == s.type)
      return n;
    if (o > (d ? 1 : 0)) {
      for (r = n - 1, i = n + 1; r >= 0 || i < e.length; )
        if ((s = e[_ = r >= 0 ? r-- : i++]) != null && !(2 & s.__u) && c == s.key && a == s.type)
          return _;
    }
    return -1;
  }
  function mt(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || Gt.test(e) ? n : n + "px";
  }
  function I(t, e, n, o, r) {
    var i, _;
    t:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof o == "string" && (t.style.cssText = o = ""), o)
            for (e in o)
              n && e in n || mt(t.style, e, "");
          if (n)
            for (e in n)
              o && n[e] == o[e] || mt(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        i = e != (e = e.replace(ut, "$1")), _ = e.toLowerCase(), e = _ in t || e == "onFocusOut" || e == "onFocusIn" ? _.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + i] = n, n ? o ? n.u = o.u : (n.u = X, t.addEventListener(e, i ? Z : K, i)) : t.removeEventListener(e, i ? Z : K, i);
      else {
        if (r == "http://www.w3.org/2000/svg")
          e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t)
          try {
            t[e] = n ?? "";
            break t;
          } catch {
          }
        typeof n == "function" || (n == null || n === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
      }
  }
  function vt(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.t == null)
          e.t = X++;
        else if (e.t < n.u)
          return;
        return n(p.event ? p.event(e) : e);
      }
    };
  }
  function tt(t, e, n, o, r, i, _, c, a, s) {
    var d, l, h, f, g, m, k, v, b, E, C, G, M, qt, J, O, st, T = e.type;
    if (e.constructor != null)
      return null;
    128 & n.__u && (a = !!(32 & n.__u), i = [c = e.__e = n.__e]), (d = p.__b) && d(e);
    t:
      if (typeof T == "function")
        try {
          if (v = e.props, b = "prototype" in T && T.prototype.render, E = (d = T.contextType) && o[d.__c], C = d ? E ? E.props.value : d.__ : o, n.__c ? k = (l = e.__c = n.__c).__ = l.__E : (b ? e.__c = l = new T(v, C) : (e.__c = l = new S(v, C), l.constructor = T, l.render = Zt), E && E.sub(l), l.props = v, l.state || (l.state = {}), l.context = C, l.__n = o, h = l.__d = !0, l.__h = [], l._sb = []), b && l.__s == null && (l.__s = l.state), b && T.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = L({}, l.__s)), L(l.__s, T.getDerivedStateFromProps(v, l.__s))), f = l.props, g = l.state, l.__v = e, h)
            b && T.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), b && l.componentDidMount != null && l.__h.push(l.componentDidMount);
          else {
            if (b && T.getDerivedStateFromProps == null && v !== f && l.componentWillReceiveProps != null && l.componentWillReceiveProps(v, C), !l.__e && l.shouldComponentUpdate != null && l.shouldComponentUpdate(v, l.__s, C) === !1 || e.__v == n.__v) {
              for (e.__v != n.__v && (l.props = v, l.state = l.__s, l.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(D) {
                D && (D.__ = e);
              }), G = 0; G < l._sb.length; G++)
                l.__h.push(l._sb[G]);
              l._sb = [], l.__h.length && _.push(l);
              break t;
            }
            l.componentWillUpdate != null && l.componentWillUpdate(v, l.__s, C), b && l.componentDidUpdate != null && l.__h.push(function() {
              l.componentDidUpdate(f, g, m);
            });
          }
          if (l.context = C, l.props = v, l.__P = t, l.__e = !1, M = p.__r, qt = 0, b) {
            for (l.state = l.__s, l.__d = !1, M && M(e), d = l.render(l.props, l.state, l.context), J = 0; J < l._sb.length; J++)
              l.__h.push(l._sb[J]);
            l._sb = [];
          } else
            do
              l.__d = !1, M && M(e), d = l.render(l.props, l.state, l.context), l.state = l.__s;
            while (l.__d && ++qt < 25);
          l.state = l.__s, l.getChildContext != null && (o = L(L({}, o), l.getChildContext())), b && !h && l.getSnapshotBeforeUpdate != null && (m = l.getSnapshotBeforeUpdate(f, g)), O = d, d != null && d.type === A && d.key == null && (O = yt(d.props.children)), c = ht(t, H(O) ? O : [O], e, n, o, r, i, _, c, a, s), l.base = e.__e, e.__u &= -161, l.__h.length && _.push(l), k && (l.__E = l.__ = null);
        } catch (D) {
          if (e.__v = null, a || i != null)
            if (D.then) {
              for (e.__u |= a ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                c = c.nextSibling;
              i[i.indexOf(c)] = null, e.__e = c;
            } else {
              for (st = i.length; st--; )
                Q(i[st]);
              et(e);
            }
          else
            e.__e = n.__e, e.__k = n.__k, D.then || et(e);
          p.__e(D, e, n);
        }
      else
        i == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : c = e.__e = Kt(n.__e, e, n, o, r, i, _, a, s);
    return (d = p.diffed) && d(e), 128 & e.__u ? void 0 : c;
  }
  function et(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(et);
  }
  function bt(t, e, n) {
    for (var o = 0; o < n.length; o++)
      nt(n[o], n[++o], n[++o]);
    p.__c && p.__c(e, t), t.some(function(r) {
      try {
        t = r.__h, r.__h = [], t.some(function(i) {
          i.call(r);
        });
      } catch (i) {
        p.__e(i, r.__v);
      }
    });
  }
  function yt(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : H(t) ? t.map(yt) : L({}, t);
  }
  function Kt(t, e, n, o, r, i, _, c, a) {
    var s, d, l, h, f, g, m, k = n.props, v = e.props, b = e.type;
    if (b == "svg" ? r = "http://www.w3.org/2000/svg" : b == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), i != null) {
      for (s = 0; s < i.length; s++)
        if ((f = i[s]) && "setAttribute" in f == !!b && (b ? f.localName == b : f.nodeType == 3)) {
          t = f, i[s] = null;
          break;
        }
    }
    if (t == null) {
      if (b == null)
        return document.createTextNode(v);
      t = document.createElementNS(r, b, v.is && v), c && (p.__m && p.__m(e, i), c = !1), i = null;
    }
    if (b == null)
      k === v || c && t.data == v || (t.data = v);
    else {
      if (i = i && w.call(t.childNodes), k = n.props || N, !c && i != null)
        for (k = {}, s = 0; s < t.attributes.length; s++)
          k[(f = t.attributes[s]).name] = f.value;
      for (s in k)
        if (f = k[s], s != "children") {
          if (s == "dangerouslySetInnerHTML")
            l = f;
          else if (!(s in v)) {
            if (s == "value" && "defaultValue" in v || s == "checked" && "defaultChecked" in v)
              continue;
            I(t, s, null, f, r);
          }
        }
      for (s in v)
        f = v[s], s == "children" ? h = f : s == "dangerouslySetInnerHTML" ? d = f : s == "value" ? g = f : s == "checked" ? m = f : c && typeof f != "function" || k[s] === f || I(t, s, f, k[s], r);
      if (d)
        c || l && (d.__html == l.__html || d.__html == t.innerHTML) || (t.innerHTML = d.__html), e.__k = [];
      else if (l && (t.innerHTML = ""), ht(e.type == "template" ? t.content : t, H(h) ? h : [h], e, n, o, b == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, i, _, i ? i[0] : n.__k && B(n, 0), c, a), i != null)
        for (s = i.length; s--; )
          Q(i[s]);
      c || (s = "value", b == "progress" && g == null ? t.removeAttribute("value") : g != null && (g !== t[s] || b == "progress" && !g || b == "option" && g != k[s]) && I(t, s, g, k[s], r), s = "checked", m != null && m != t[s] && I(t, s, m, k[s], r));
    }
    return t;
  }
  function nt(t, e, n) {
    try {
      if (typeof t == "function") {
        var o = typeof t.__u == "function";
        o && t.__u(), o && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (r) {
      p.__e(r, n);
    }
  }
  function xt(t, e, n) {
    var o, r;
    if (p.unmount && p.unmount(t), (o = t.ref) && (o.current && o.current != t.__e || nt(o, null, e)), (o = t.__c) != null) {
      if (o.componentWillUnmount)
        try {
          o.componentWillUnmount();
        } catch (i) {
          p.__e(i, e);
        }
      o.base = o.__P = null;
    }
    if (o = t.__k)
      for (r = 0; r < o.length; r++)
        o[r] && xt(o[r], e, n || typeof t.type != "function");
    n || Q(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function Zt(t, e, n) {
    return this.constructor(t, n);
  }
  function Qt(t, e, n) {
    var o, r, i, _;
    e == document && (e = document.documentElement), p.__ && p.__(t, e), r = (o = typeof n == "function") ? null : n && n.__k || e.__k, i = [], _ = [], tt(e, t = (!o && n || e).__k = Y(A, null, [t]), r || N, N, e.namespaceURI, !o && n ? [n] : r ? null : e.firstChild ? w.call(e.childNodes) : null, i, !o && n ? n : r ? r.__e : e.firstChild, o, _), bt(i, t, _);
  }
  w = dt.slice, p = { __e: function(t, e, n, o) {
    for (var r, i, _; e = e.__; )
      if ((r = e.__c) && !r.__)
        try {
          if ((i = r.constructor) && i.getDerivedStateFromError != null && (r.setState(i.getDerivedStateFromError(t)), _ = r.__d), r.componentDidCatch != null && (r.componentDidCatch(t, o || {}), _ = r.__d), _)
            return r.__E = r;
        } catch (c) {
          t = c;
        }
    throw t;
  } }, $ = 0, S.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = L({}, this.state), typeof t == "function" && (t = t(L({}, n), this.props)), t && L(n, t), t != null && this.__v && (e && this._sb.push(e), ft(this));
  }, S.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), ft(this));
  }, S.prototype.render = A, P = [], ct = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, at = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, z.__r = 0, ut = /(PointerCapture)$|Capture$/i, X = 0, K = vt(!1), Z = vt(!0);
  var Yt = 0;
  function u(t, e, n, o, r, i) {
    e || (e = {});
    var _, c, a = e;
    if ("ref" in a)
      for (c in a = {}, e)
        c == "ref" ? _ = e[c] : a[c] = e[c];
    var s = { type: t, props: a, key: n, ref: _, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --Yt, __i: -1, __u: 0, __source: r, __self: i };
    if (typeof t == "function" && (_ = t.defaultProps))
      for (c in _)
        a[c] === void 0 && (a[c] = _[c]);
    return p.vnode && p.vnode(s), s;
  }
  var F, y, ot, kt, rt = 0, wt = [], x = p, Tt = x.__b, Rt = x.__r, Lt = x.diffed, St = x.__c, $t = x.unmount, Et = x.__;
  function Ct(t, e) {
    x.__h && x.__h(y, t, rt || e), rt = 0;
    var n = y.__H || (y.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function j(t) {
    return rt = 1, te(At, t);
  }
  function te(t, e, n) {
    var o = Ct(F++, 2);
    if (o.t = t, !o.__c && (o.__ = [n ? n(e) : At(void 0, e), function(c) {
      var a = o.__N ? o.__N[0] : o.__[0], s = o.t(a, c);
      a !== s && (o.__N = [s, o.__[1]], o.__c.setState({}));
    }], o.__c = y, !y.__f)) {
      var r = function(c, a, s) {
        if (!o.__c.__H)
          return !0;
        var d = o.__c.__H.__.filter(function(h) {
          return !!h.__c;
        });
        if (d.every(function(h) {
          return !h.__N;
        }))
          return !i || i.call(this, c, a, s);
        var l = o.__c.props !== c;
        return d.forEach(function(h) {
          if (h.__N) {
            var f = h.__[0];
            h.__ = h.__N, h.__N = void 0, f !== h.__[0] && (l = !0);
          }
        }), i && i.call(this, c, a, s) || l;
      };
      y.__f = !0;
      var i = y.shouldComponentUpdate, _ = y.componentWillUpdate;
      y.componentWillUpdate = function(c, a, s) {
        if (this.__e) {
          var d = i;
          i = void 0, r(c, a, s), i = d;
        }
        _ && _.call(this, c, a, s);
      }, y.shouldComponentUpdate = r;
    }
    return o.__N || o.__;
  }
  function ee(t, e) {
    var n = Ct(F++, 3);
    !x.__s && re(n.__H, e) && (n.__ = t, n.u = e, y.__H.__h.push(n));
  }
  function ne() {
    for (var t; t = wt.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(V), t.__H.__h.forEach(it), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], x.__e(e, t.__v);
        }
  }
  x.__b = function(t) {
    y = null, Tt && Tt(t);
  }, x.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Et && Et(t, e);
  }, x.__r = function(t) {
    Rt && Rt(t), F = 0;
    var e = (y = t.__c).__H;
    e && (ot === y ? (e.__h = [], y.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(V), e.__h.forEach(it), e.__h = [], F = 0)), ot = y;
  }, x.diffed = function(t) {
    Lt && Lt(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (wt.push(e) !== 1 && kt === x.requestAnimationFrame || ((kt = x.requestAnimationFrame) || oe)(ne)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), ot = y = null;
  }, x.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(V), n.__h = n.__h.filter(function(o) {
          return !o.__ || it(o);
        });
      } catch (o) {
        e.some(function(r) {
          r.__h && (r.__h = []);
        }), e = [], x.__e(o, n.__v);
      }
    }), St && St(t, e);
  }, x.unmount = function(t) {
    $t && $t(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(o) {
      try {
        V(o);
      } catch (r) {
        e = r;
      }
    }), n.__H = void 0, e && x.__e(e, n.__v));
  };
  var Pt = typeof requestAnimationFrame == "function";
  function oe(t) {
    var e, n = function() {
      clearTimeout(o), Pt && cancelAnimationFrame(e), setTimeout(t);
    }, o = setTimeout(n, 35);
    Pt && (e = requestAnimationFrame(n));
  }
  function V(t) {
    var e = y, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), y = e;
  }
  function it(t) {
    var e = y;
    t.__c = t.__(), y = e;
  }
  function re(t, e) {
    return !t || t.length !== e.length || e.some(function(n, o) {
      return n !== t[o];
    });
  }
  function At(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ie(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function Bt(t, e) {
    for (var n in t)
      if (n !== "__source" && !(n in e))
        return !0;
    for (var o in e)
      if (o !== "__source" && t[o] !== e[o])
        return !0;
    return !1;
  }
  function Dt(t, e) {
    this.props = t, this.context = e;
  }
  (Dt.prototype = new S()).isPureReactComponent = !0, Dt.prototype.shouldComponentUpdate = function(t, e) {
    return Bt(this.props, t) || Bt(this.state, e);
  };
  var Nt = p.__b;
  p.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Nt && Nt(t);
  };
  var le = p.__e;
  p.__e = function(t, e, n, o) {
    if (t.then) {
      for (var r, i = e; i = i.__; )
        if ((r = i.__c) && r.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), r.__c(t, e);
    }
    le(t, e, n, o);
  };
  var Ht = p.unmount;
  function Mt(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(o) {
      typeof o.__c == "function" && o.__c();
    }), t.__c.__H = null), (t = ie({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(o) {
      return Mt(o, e, n);
    })), t;
  }
  function Ot(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(o) {
      return Ot(o, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function lt() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Ut(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function q() {
    this.i = null, this.l = null;
  }
  p.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), Ht && Ht(t);
  }, (lt.prototype = new S()).__c = function(t, e) {
    var n = e.__c, o = this;
    o.o == null && (o.o = []), o.o.push(n);
    var r = Ut(o.__v), i = !1, _ = function() {
      i || (i = !0, n.__R = null, r ? r(c) : c());
    };
    n.__R = _;
    var c = function() {
      if (!--o.__u) {
        if (o.state.__a) {
          var a = o.state.__a;
          o.__v.__k[0] = Ot(a, a.__c.__P, a.__c.__O);
        }
        var s;
        for (o.setState({ __a: o.__b = null }); s = o.o.pop(); )
          s.forceUpdate();
      }
    };
    o.__u++ || 32 & e.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), t.then(_, _);
  }, lt.prototype.componentWillUnmount = function() {
    this.o = [];
  }, lt.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), o = this.__v.__k[0].__c;
        this.__v.__k[0] = Mt(this.__b, n, o.__O = o.__P);
      }
      this.__b = null;
    }
    var r = e.__a && Y(A, null, t.fallback);
    return r && (r.__u &= -33), [Y(A, null, e.__a ? null : t.children), r];
  };
  var zt = function(t, e, n) {
    if (++n[1] === n[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size))
      for (n = t.i; n; ) {
        for (; n.length > 3; )
          n.pop()();
        if (n[1] < n[0])
          break;
        t.i = n = n[2];
      }
  };
  (q.prototype = new S()).__a = function(t) {
    var e = this, n = Ut(e.__v), o = e.l.get(t);
    return o[0]++, function(r) {
      var i = function() {
        e.props.revealOrder ? (o.push(r), zt(e, t, o)) : r();
      };
      n ? n(i) : i();
    };
  }, q.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = W(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, q.prototype.componentDidUpdate = q.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      zt(t, n, e);
    });
  };
  var se = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, _e = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ce = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, ae = /[A-Z0-9]/g, ue = typeof document < "u", de = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function Wt(t, e, n) {
    return e.__k == null && (e.textContent = ""), Qt(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  S.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty(S.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var It = p.event;
  function pe() {
  }
  function fe() {
    return this.cancelBubble;
  }
  function he() {
    return this.defaultPrevented;
  }
  p.event = function(t) {
    return It && (t = It(t)), t.persist = pe, t.isPropagationStopped = fe, t.isDefaultPrevented = he, t.nativeEvent = t;
  };
  var ge = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Ft = p.vnode;
  p.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, o = e.type, r = {}, i = o.indexOf("-") === -1;
      for (var _ in n) {
        var c = n[_];
        if (!(_ === "value" && "defaultValue" in n && c == null || ue && _ === "children" && o === "noscript" || _ === "class" || _ === "className")) {
          var a = _.toLowerCase();
          _ === "defaultValue" && "value" in n && n.value == null ? _ = "value" : _ === "download" && c === !0 ? c = "" : a === "translate" && c === "no" ? c = !1 : a[0] === "o" && a[1] === "n" ? a === "ondoubleclick" ? _ = "ondblclick" : a !== "onchange" || o !== "input" && o !== "textarea" || de(n.type) ? a === "onfocus" ? _ = "onfocusin" : a === "onblur" ? _ = "onfocusout" : ce.test(_) && (_ = a) : a = _ = "oninput" : i && _e.test(_) ? _ = _.replace(ae, "-$&").toLowerCase() : c === null && (c = void 0), a === "oninput" && r[_ = a] && (_ = "oninputCapture"), r[_] = c;
        }
      }
      o == "select" && r.multiple && Array.isArray(r.value) && (r.value = W(n.children).forEach(function(s) {
        s.props.selected = r.value.indexOf(s.props.value) != -1;
      })), o == "select" && r.defaultValue != null && (r.value = W(n.children).forEach(function(s) {
        s.props.selected = r.multiple ? r.defaultValue.indexOf(s.props.value) != -1 : r.defaultValue == s.props.value;
      })), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", ge)) : (n.className && !n.class || n.class && n.className) && (r.class = r.className = n.className), e.props = r;
    }(t), t.$$typeof = se, Ft && Ft(t);
  };
  var jt = p.__r;
  p.__r = function(t) {
    jt && jt(t), t.__c;
  };
  var Vt = p.diffed;
  p.diffed = function(t) {
    Vt && Vt(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  function me({ detector: t }) {
    const [e, n] = j(""), [o, r] = j(""), i = window.Blinko.i18n, _ = () => {
      if (!e.trim())
        return;
      const a = t.detectRTL(e);
      r(a ? "RTL" : "LTR"), window.Blinko.toast.success(`Text is ${a ? "RTL" : "LTR"}`);
    }, c = () => {
      var s, d;
      (s = window.blinkoRTL) == null || s.toggle();
      const a = (d = window.blinkoRTL) == null ? void 0 : d.isEnabled();
      window.Blinko.toast.success(
        a ? i.t("rtl_enabled") : i.t("rtl_disabled")
      );
    };
    return /* @__PURE__ */ u("div", { style: { padding: "20px", fontFamily: "system-ui, sans-serif", maxWidth: "400px" }, children: [
      /* @__PURE__ */ u("h2", { children: i.t("rtl_support") }),
      /* @__PURE__ */ u("p", { children: "Click the floating ع/א button to toggle RTL support." }),
      /* @__PURE__ */ u("div", { style: { margin: "20px 0" }, children: /* @__PURE__ */ u(
        "button",
        {
          onClick: c,
          style: {
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer"
          },
          children: i.t("manual_toggle")
        }
      ) }),
      /* @__PURE__ */ u("div", { style: { margin: "20px 0" }, children: [
        /* @__PURE__ */ u("h3", { children: "Test RTL Detection" }),
        /* @__PURE__ */ u(
          "textarea",
          {
            value: e,
            onChange: (a) => n(a.target.value),
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
        /* @__PURE__ */ u(
          "button",
          {
            onClick: _,
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
        o && /* @__PURE__ */ u("div", { style: {
          marginTop: "10px",
          padding: "10px",
          background: "#f8f9fa",
          borderRadius: "4px",
          borderLeft: "4px solid #007bff"
        }, children: [
          "Result: ",
          /* @__PURE__ */ u("strong", { children: o })
        ] }),
        /* @__PURE__ */ u("div", { style: { marginTop: "10px", fontSize: "14px", color: "#666" }, children: [
          /* @__PURE__ */ u("strong", { children: "Examples:" }),
          /* @__PURE__ */ u("br", {}),
          "Hebrew: שלום עולם",
          /* @__PURE__ */ u("br", {}),
          "Arabic: مرحبا بالعالم",
          /* @__PURE__ */ u("br", {}),
          "English: Hello world"
        ] })
      ] })
    ] });
  }
  function ve() {
    const [t, e] = j({
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
    }), [n, o] = j(""), r = window.Blinko.i18n;
    ee(() => {
      const s = localStorage.getItem("blinko-rtl-settings");
      if (s)
        try {
          const d = JSON.parse(s);
          e((l) => ({ ...l, ...d }));
        } catch (d) {
          console.error("Failed to load RTL plugin settings:", d);
        }
    }, []);
    const i = (s) => {
      const d = { ...t, ...s };
      e(d), localStorage.setItem("blinko-rtl-settings", JSON.stringify(d)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: d
        })
      ), window.Blinko.toast.success(r.t("settings_saved") || "Settings saved!");
    }, _ = () => {
      n.trim() && !t.customSelectors.includes(n.trim()) && (i({
        customSelectors: [...t.customSelectors, n.trim()]
      }), o(""));
    }, c = (s) => {
      i({
        customSelectors: t.customSelectors.filter((d) => d !== s)
      });
    }, a = () => {
      i({
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
    return /* @__PURE__ */ u("div", { style: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "system-ui, sans-serif"
    }, children: [
      /* @__PURE__ */ u("div", { style: { marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #eee" }, children: [
        /* @__PURE__ */ u("h2", { style: { margin: "0 0 10px 0", color: "#333" }, children: [
          r.t("rtl_support"),
          " ",
          r.t("settings")
        ] }),
        /* @__PURE__ */ u("p", { style: { margin: "0", color: "#666", fontSize: "14px" }, children: r.t("plugin_description") })
      ] }),
      /* @__PURE__ */ u("div", { style: {
        marginBottom: "30px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa"
      }, children: [
        /* @__PURE__ */ u("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "General Settings" }),
        /* @__PURE__ */ u("div", { style: { marginBottom: "20px" }, children: [
          /* @__PURE__ */ u("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
            /* @__PURE__ */ u(
              "input",
              {
                type: "checkbox",
                checked: t.enabled,
                onChange: (s) => i({ enabled: s.target.checked }),
                style: { margin: "0" }
              }
            ),
            /* @__PURE__ */ u("span", { children: r.t("auto_detect") })
          ] }),
          /* @__PURE__ */ u("p", { style: { margin: "5px 0 0 0", fontSize: "13px", color: "#666", fontStyle: "italic" }, children: "Automatically detect and apply RTL styling to content" })
        ] }),
        /* @__PURE__ */ u("div", { style: { marginBottom: "20px" }, children: /* @__PURE__ */ u("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
          "Detection Sensitivity:",
          /* @__PURE__ */ u(
            "select",
            {
              value: t.sensitivity,
              onChange: (s) => i({
                sensitivity: s.target.value
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
                /* @__PURE__ */ u("option", { value: "high", children: [
                  r.t("high"),
                  " - 10% RTL characters"
                ] }),
                /* @__PURE__ */ u("option", { value: "medium", children: [
                  r.t("medium"),
                  " - 20% RTL characters"
                ] }),
                /* @__PURE__ */ u("option", { value: "low", children: [
                  r.t("low"),
                  " - 40% RTL characters"
                ] })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ u("div", { style: { marginBottom: "20px" }, children: /* @__PURE__ */ u("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500" }, children: [
          "Direction Override:",
          /* @__PURE__ */ u(
            "select",
            {
              value: t.forceDirection,
              onChange: (s) => i({
                forceDirection: s.target.value
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
                /* @__PURE__ */ u("option", { value: "auto", children: r.t("auto") }),
                /* @__PURE__ */ u("option", { value: "rtl", children: r.t("force_rtl") }),
                /* @__PURE__ */ u("option", { value: "ltr", children: r.t("force_ltr") })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ u("div", { style: {
        marginBottom: "30px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa"
      }, children: [
        /* @__PURE__ */ u("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "CSS Selectors" }),
        /* @__PURE__ */ u("p", { style: { margin: "0 0 15px 0", fontSize: "14px", color: "#666" }, children: "Define which elements should be processed for RTL detection" }),
        /* @__PURE__ */ u("div", { style: { marginBottom: "15px" }, children: t.customSelectors.map((s, d) => /* @__PURE__ */ u("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          marginBottom: "5px",
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "4px"
        }, children: [
          /* @__PURE__ */ u("code", { style: {
            fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
            fontSize: "13px",
            color: "#333"
          }, children: s }),
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => c(s),
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
                lineHeight: "1"
              },
              children: "×"
            }
          )
        ] }, d)) }),
        /* @__PURE__ */ u("div", { style: { display: "flex", gap: "10px" }, children: [
          /* @__PURE__ */ u(
            "input",
            {
              type: "text",
              value: n,
              onChange: (s) => o(s.target.value),
              placeholder: "Enter CSS selector (e.g., .my-content)",
              disabled: !t.enabled,
              onKeyPress: (s) => s.key === "Enter" && _(),
              style: {
                flex: "1",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: _,
              disabled: !t.enabled || !n.trim(),
              style: {
                padding: "8px 16px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              },
              children: "Add Selector"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u("div", { style: {
        marginBottom: "30px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa"
      }, children: [
        /* @__PURE__ */ u("h3", { style: { margin: "0 0 15px 0", color: "#333" }, children: "Advanced" }),
        /* @__PURE__ */ u("div", { style: { display: "flex", gap: "10px" }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: a,
              style: {
                padding: "10px 20px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500"
              },
              children: "Reset to Defaults"
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => {
                const s = JSON.stringify(t, null, 2);
                navigator.clipboard.writeText(s), window.Blinko.toast.success("Settings copied to clipboard");
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
              children: "Export Settings"
            }
          )
        ] })
      ] })
    ] });
  }
  const be = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "1.0.2",
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
  class ye {
    constructor(e = {
      sensitivity: "medium",
      minRTLChars: 3,
      sampleSize: 100
    }) {
      R(this, "config");
      // Hebrew: \u0590-\u05FF
      // Arabic: \u0600-\u06FF
      // Additional RTL: \u0700-\u074F, \u0780-\u07BF
      R(this, "RTL_RANGES", [
        [1424, 1535],
        // Hebrew
        [1536, 1791],
        // Arabic
        [1792, 1871],
        // Syriac
        [1920, 1983]
        // Thaana
      ]);
      this.config = e;
    }
    /**
     * Check if a character is RTL
     */
    isRTLChar(e) {
      const n = e.charCodeAt(0);
      return this.RTL_RANGES.some(([o, r]) => n >= o && n <= r);
    }
    /**
     * Detect RTL content in text
     */
    detectRTL(e) {
      if (!e || e.length === 0)
        return !1;
      const n = e.substring(0, this.config.sampleSize);
      let o = 0, r = 0;
      for (const c of n)
        /\s|[.,!?;:()[\]{}]/.test(c) || (r++, this.isRTLChar(c) && o++);
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
    detectRTLInSegments(e) {
      return e.map((n) => this.detectRTL(n));
    }
    /**
     * Update detection configuration
     */
    updateConfig(e) {
      this.config = { ...this.config, ...e };
    }
  }
  function xe(t, e) {
    let n;
    return function(...r) {
      const i = () => {
        n = null, t(...r);
      };
      n && clearTimeout(n), n = setTimeout(i, e);
    };
  }
  class ke {
    constructor(e, n = {
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
      R(this, "config");
      R(this, "detector");
      R(this, "observer", null);
      R(this, "styleSheet", null);
      R(this, "debouncedProcessElement");
      this.detector = e, this.config = n, this.injectRTLStyles(), this.debouncedProcessElement = xe(this.processElement.bind(this), 150);
    }
    /**
     * Inject RTL CSS styles into document
     */
    injectRTLStyles() {
      if (document.getElementById("blinko-rtl-styles"))
        return;
      const e = document.createElement("style");
      e.id = "blinko-rtl-styles", e.textContent = `
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
    `, document.head.appendChild(e);
    }
    /**
     * Apply RTL styling to element
     */
    applyRTL(e, n) {
      this.config.forceDirection !== "auto" && (n = this.config.forceDirection === "rtl"), e.classList.remove("blinko-rtl-content", "blinko-ltr-content"), e.classList.add("blinko-direction-transition"), n ? (e.classList.add("blinko-rtl-content"), e.setAttribute("dir", "rtl")) : (e.classList.add("blinko-ltr-content"), e.setAttribute("dir", "ltr"));
    }
    /**
     * Start observing DOM for changes
     */
    startObserving() {
      this.observer || (this.observer = new MutationObserver((e) => {
        e.forEach((n) => {
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
    processElement(e) {
      if (!this.config.autoDetect)
        return;
      if (this.config.applyToSelectors.some(
        (o) => {
          var r, i;
          return ((r = e.matches) == null ? void 0 : r.call(e, o)) || ((i = e.querySelector) == null ? void 0 : i.call(e, o));
        }
      )) {
        const o = e.textContent || e.value || "";
        if (o) {
          const r = this.detector.detectRTL(o);
          this.applyRTL(e, r);
        }
      }
    }
    /**
     * Update styler configuration
     */
    updateConfig(e) {
      this.config = { ...this.config, ...e };
    }
    /**
     * Clean up styles and observers
     */
    destroy() {
      this.stopObserving();
      const e = document.getElementById("blinko-rtl-styles");
      e && e.remove();
    }
  }
  const we = {
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
  }, Te = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Re = {
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
  }, Le = {
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
  }, Se = `
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}
.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: plaintext !important;
}
*:dir(rtl) input[type="text"], *:dir(rtl) textarea {
    text-align: right !important;
    direction: rtl !important;
}
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
`;
  System.register([], (t) => ({
    execute: () => {
      const e = new ye(), n = new ke(e);
      let o = !1, r = null, i = null;
      function _() {
        r || (r = document.createElement("style"), r.id = "blinko-rtl-styles", r.textContent = Se, document.head.appendChild(r));
      }
      function c() {
        r && (r.remove(), r = null);
      }
      function a() {
        if (i)
          return;
        i = document.createElement("button"), i.className = "rtl-toggle-btn", i.innerHTML = "ع/א", i.title = "Toggle RTL Support", i.addEventListener("click", h), document.body.appendChild(i), localStorage.getItem("blinko-rtl-enabled") === "true" && d();
      }
      function s() {
        i && (i.remove(), i = null);
      }
      function d() {
        o = !0, _(), n.startObserving(), i && i.classList.add("active"), localStorage.setItem("blinko-rtl-enabled", "true"), document.querySelectorAll('.markdown-body, textarea, input[type="text"]').forEach((g) => {
          const m = g.textContent || g.value || "";
          e.detectRTL(m) && (g.setAttribute("dir", "rtl"), g.setAttribute("lang", "he"));
        });
      }
      function l() {
        o = !1, c(), n.stopObserving(), i && i.classList.remove("active"), localStorage.setItem("blinko-rtl-enabled", "false"), document.querySelectorAll('[dir="rtl"]').forEach((g) => {
          g.removeAttribute("dir"), g.removeAttribute("lang");
        });
      }
      function h() {
        o ? l() : d();
      }
      function f() {
        console.log("Initializing Blinko RTL Plugin..."), a(), window.blinkoRTL = {
          detector: e,
          styler: n,
          toggle: h,
          enable: d,
          disable: l,
          isEnabled: () => o,
          test: (g) => {
            const m = e.detectRTL(g);
            return console.log(`Text "${g}" is ${m ? "RTL" : "LTR"}`), m;
          }
        }, console.log("Blinko RTL Plugin initialized successfully");
      }
      t("default", class {
        constructor() {
          R(this, "withSettingPanel", !0);
          R(this, "renderSettingPanel", () => {
            const m = document.createElement("div");
            return Wt(/* @__PURE__ */ u(ve, {}), m), m;
          });
          Object.assign(this, be);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", f) : f(), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: "RTL Language Support",
            content: () => {
              const m = document.createElement("div");
              return m.setAttribute("data-plugin", "rtl-support"), Wt(/* @__PURE__ */ u(me, { detector: e, styler: n }), m), m;
            }
          }), window.Blinko.addRightClickMenu({
            name: "rtl-toggle",
            label: "Toggle RTL",
            icon: "material-symbols:format-textdirection-r-to-l",
            onClick: () => {
              h();
              const m = window.Blinko.i18n;
              window.Blinko.toast.success(
                o ? m.t("rtl_enabled") : m.t("rtl_disabled")
              );
            }
          });
        }
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", we), window.Blinko.i18n.addResourceBundle("zh", "translation", Te), window.Blinko.i18n.addResourceBundle("he", "translation", Re), window.Blinko.i18n.addResourceBundle("ar", "translation", Le);
        }
        destroy() {
          l(), s(), n.destroy(), console.log("RTL Plugin destroyed");
        }
      });
    }
  }));
})();
