var Wt = Object.defineProperty;
var jt = (E, _, B) => _ in E ? Wt(E, _, { enumerable: !0, configurable: !0, writable: !0, value: B }) : E[_] = B;
var y = (E, _, B) => (jt(E, typeof _ != "symbol" ? _ + "" : _, B), B);
(function() {
  var E, _, B, F, ye, ve, xe, Se, se, ae, le, V = {}, ke = [], dt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, q = Array.isArray;
  function M(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function de(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function ce(t, e, n) {
    var r, i, o, a = {};
    for (o in e)
      o == "key" ? r = e[o] : o == "ref" ? i = e[o] : a[o] = e[o];
    if (arguments.length > 2 && (a.children = arguments.length > 3 ? E.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (o in t.defaultProps)
        a[o] === void 0 && (a[o] = t.defaultProps[o]);
    return X(t, a, r, i, null);
  }
  function X(t, e, n, r, i) {
    var o = { type: t, props: e, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: i ?? ++B, __i: -1, __u: 0 };
    return i == null && _.vnode != null && _.vnode(o), o;
  }
  function N(t) {
    return t.children;
  }
  function $(t, e) {
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
  function we(t) {
    var e, n;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((n = t.__k[e]) != null && n.__e != null) {
          t.__e = t.__c.base = n.__e;
          break;
        }
      return we(t);
    }
  }
  function Te(t) {
    (!t.__d && (t.__d = !0) && F.push(t) && !Y.__r++ || ye != _.debounceRendering) && ((ye = _.debounceRendering) || ve)(Y);
  }
  function Y() {
    for (var t, e, n, r, i, o, a, c = 1; F.length; )
      F.length > c && F.sort(xe), t = F.shift(), c = F.length, t.__d && (n = void 0, i = (r = (e = t).__v).__e, o = [], a = [], e.__P && ((n = M({}, r)).__v = r.__v + 1, _.vnode && _.vnode(n), pe(e.__P, n, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [i] : null, o, i ?? O(r), !!(32 & r.__u), a), n.__v = r.__v, n.__.__k[n.__i] = n, Ae(o, n, a), n.__e != i && we(n)));
    Y.__r = 0;
  }
  function Re(t, e, n, r, i, o, a, c, p, l, h) {
    var d, b, m, x, S, v, f, w = r && r.__k || ke, A = e.length;
    for (p = ct(n, e, w, p, A), d = 0; d < A; d++)
      (m = n.__k[d]) != null && (b = m.__i == -1 ? V : w[m.__i] || V, m.__i = d, v = pe(t, m, b, i, o, a, c, p, l, h), x = m.__e, m.ref && b.ref != m.ref && (b.ref && he(b.ref, null, m), h.push(m.ref, m.__c || x, m)), S == null && x != null && (S = x), (f = !!(4 & m.__u)) || b.__k === m.__k ? p = Le(m, p, t, f) : typeof m.type == "function" && v !== void 0 ? p = v : x && (p = x.nextSibling), m.__u &= -7);
    return n.__e = S, p;
  }
  function ct(t, e, n, r, i) {
    var o, a, c, p, l, h = n.length, d = h, b = 0;
    for (t.__k = new Array(i), o = 0; o < i; o++)
      (a = e[o]) != null && typeof a != "boolean" && typeof a != "function" ? (p = o + b, (a = t.__k[o] = typeof a == "string" || typeof a == "number" || typeof a == "bigint" || a.constructor == String ? X(null, a, null, null, null) : q(a) ? X(N, { children: a }, null, null, null) : a.constructor == null && a.__b > 0 ? X(a.type, a.props, a.key, a.ref ? a.ref : null, a.__v) : a).__ = t, a.__b = t.__b + 1, c = null, (l = a.__i = pt(a, n, p, d)) != -1 && (d--, (c = n[l]) && (c.__u |= 2)), c == null || c.__v == null ? (l == -1 && (i > h ? b-- : i < h && b++), typeof a.type != "function" && (a.__u |= 4)) : l != p && (l == p - 1 ? b-- : l == p + 1 ? b++ : (l > p ? b-- : b++, a.__u |= 4))) : t.__k[o] = null;
    if (d)
      for (o = 0; o < h; o++)
        (c = n[o]) != null && !(2 & c.__u) && (c.__e == r && (r = O(c)), Me(c, c));
    return r;
  }
  function Le(t, e, n, r) {
    var i, o;
    if (typeof t.type == "function") {
      for (i = t.__k, o = 0; i && o < i.length; o++)
        i[o] && (i[o].__ = t, e = Le(i[o], e, n, r));
      return e;
    }
    t.__e != e && (r && (e && t.type && !e.parentNode && (e = O(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function Z(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (q(t) ? t.some(function(n) {
      Z(n, e);
    }) : e.push(t)), e;
  }
  function pt(t, e, n, r) {
    var i, o, a, c = t.key, p = t.type, l = e[n], h = l != null && (2 & l.__u) == 0;
    if (l === null && t.key == null || h && c == l.key && p == l.type)
      return n;
    if (r > (h ? 1 : 0)) {
      for (i = n - 1, o = n + 1; i >= 0 || o < e.length; )
        if ((l = e[a = i >= 0 ? i-- : o++]) != null && !(2 & l.__u) && c == l.key && p == l.type)
          return a;
    }
    return -1;
  }
  function Ce(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || dt.test(e) ? n : n + "px";
  }
  function Q(t, e, n, r, i) {
    var o, a;
    e:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof r == "string" && (t.style.cssText = r = ""), r)
            for (e in r)
              n && e in n || Ce(t.style, e, "");
          if (n)
            for (e in n)
              r && n[e] == r[e] || Ce(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        o = e != (e = e.replace(Se, "$1")), a = e.toLowerCase(), e = a in t || e == "onFocusOut" || e == "onFocusIn" ? a.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = n, n ? r ? n.u = r.u : (n.u = se, t.addEventListener(e, o ? le : ae, o)) : t.removeEventListener(e, o ? le : ae, o);
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
  function Ee(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.t == null)
          e.t = se++;
        else if (e.t < n.u)
          return;
        return n(_.event ? _.event(e) : e);
      }
    };
  }
  function pe(t, e, n, r, i, o, a, c, p, l) {
    var h, d, b, m, x, S, v, f, w, A, P, W, z, ie, j, H, J, u = e.type;
    if (e.constructor != null)
      return null;
    128 & n.__u && (p = !!(32 & n.__u), o = [c = e.__e = n.__e]), (h = _.__b) && h(e);
    e:
      if (typeof u == "function")
        try {
          if (f = e.props, w = "prototype" in u && u.prototype.render, A = (h = u.contextType) && r[h.__c], P = h ? A ? A.props.value : h.__ : r, n.__c ? v = (d = e.__c = n.__c).__ = d.__E : (w ? e.__c = d = new u(f, P) : (e.__c = d = new $(f, P), d.constructor = u, d.render = ht), A && A.sub(d), d.props = f, d.state || (d.state = {}), d.context = P, d.__n = r, b = d.__d = !0, d.__h = [], d._sb = []), w && d.__s == null && (d.__s = d.state), w && u.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = M({}, d.__s)), M(d.__s, u.getDerivedStateFromProps(f, d.__s))), m = d.props, x = d.state, d.__v = e, b)
            w && u.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), w && d.componentDidMount != null && d.__h.push(d.componentDidMount);
          else {
            if (w && u.getDerivedStateFromProps == null && f !== m && d.componentWillReceiveProps != null && d.componentWillReceiveProps(f, P), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(f, d.__s, P) === !1 || e.__v == n.__v) {
              for (e.__v != n.__v && (d.props = f, d.state = d.__s, d.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(g) {
                g && (g.__ = e);
              }), W = 0; W < d._sb.length; W++)
                d.__h.push(d._sb[W]);
              d._sb = [], d.__h.length && a.push(d);
              break e;
            }
            d.componentWillUpdate != null && d.componentWillUpdate(f, d.__s, P), w && d.componentDidUpdate != null && d.__h.push(function() {
              d.componentDidUpdate(m, x, S);
            });
          }
          if (d.context = P, d.props = f, d.__P = t, d.__e = !1, z = _.__r, ie = 0, w) {
            for (d.state = d.__s, d.__d = !1, z && z(e), h = d.render(d.props, d.state, d.context), j = 0; j < d._sb.length; j++)
              d.__h.push(d._sb[j]);
            d._sb = [];
          } else
            do
              d.__d = !1, z && z(e), h = d.render(d.props, d.state, d.context), d.state = d.__s;
            while (d.__d && ++ie < 25);
          d.state = d.__s, d.getChildContext != null && (r = M(M({}, r), d.getChildContext())), w && !b && d.getSnapshotBeforeUpdate != null && (S = d.getSnapshotBeforeUpdate(m, x)), H = h, h != null && h.type === N && h.key == null && (H = Pe(h.props.children)), c = Re(t, q(H) ? H : [H], e, n, r, i, o, a, c, p, l), d.base = e.__e, e.__u &= -161, d.__h.length && a.push(d), v && (d.__E = d.__ = null);
        } catch (g) {
          if (e.__v = null, p || o != null)
            if (g.then) {
              for (e.__u |= p ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                c = c.nextSibling;
              o[o.indexOf(c)] = null, e.__e = c;
            } else {
              for (J = o.length; J--; )
                de(o[J]);
              ue(e);
            }
          else
            e.__e = n.__e, e.__k = n.__k, g.then || ue(e);
          _.__e(g, e, n);
        }
      else
        o == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : c = e.__e = ut(n.__e, e, n, r, i, o, a, p, l);
    return (h = _.diffed) && h(e), 128 & e.__u ? void 0 : c;
  }
  function ue(t) {
    t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(ue);
  }
  function Ae(t, e, n) {
    for (var r = 0; r < n.length; r++)
      he(n[r], n[++r], n[++r]);
    _.__c && _.__c(e, t), t.some(function(i) {
      try {
        t = i.__h, i.__h = [], t.some(function(o) {
          o.call(i);
        });
      } catch (o) {
        _.__e(o, i.__v);
      }
    });
  }
  function Pe(t) {
    return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : q(t) ? t.map(Pe) : M({}, t);
  }
  function ut(t, e, n, r, i, o, a, c, p) {
    var l, h, d, b, m, x, S, v = n.props, f = e.props, w = e.type;
    if (w == "svg" ? i = "http://www.w3.org/2000/svg" : w == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), o != null) {
      for (l = 0; l < o.length; l++)
        if ((m = o[l]) && "setAttribute" in m == !!w && (w ? m.localName == w : m.nodeType == 3)) {
          t = m, o[l] = null;
          break;
        }
    }
    if (t == null) {
      if (w == null)
        return document.createTextNode(f);
      t = document.createElementNS(i, w, f.is && f), c && (_.__m && _.__m(e, o), c = !1), o = null;
    }
    if (w == null)
      v === f || c && t.data == f || (t.data = f);
    else {
      if (o = o && E.call(t.childNodes), v = n.props || V, !c && o != null)
        for (v = {}, l = 0; l < t.attributes.length; l++)
          v[(m = t.attributes[l]).name] = m.value;
      for (l in v)
        if (m = v[l], l != "children") {
          if (l == "dangerouslySetInnerHTML")
            d = m;
          else if (!(l in f)) {
            if (l == "value" && "defaultValue" in f || l == "checked" && "defaultChecked" in f)
              continue;
            Q(t, l, null, m, i);
          }
        }
      for (l in f)
        m = f[l], l == "children" ? b = m : l == "dangerouslySetInnerHTML" ? h = m : l == "value" ? x = m : l == "checked" ? S = m : c && typeof m != "function" || v[l] === m || Q(t, l, m, v[l], i);
      if (h)
        c || d && (h.__html == d.__html || h.__html == t.innerHTML) || (t.innerHTML = h.__html), e.__k = [];
      else if (d && (t.innerHTML = ""), Re(e.type == "template" ? t.content : t, q(b) ? b : [b], e, n, r, w == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, o, a, o ? o[0] : n.__k && O(n, 0), c, p), o != null)
        for (l = o.length; l--; )
          de(o[l]);
      c || (l = "value", w == "progress" && x == null ? t.removeAttribute("value") : x != null && (x !== t[l] || w == "progress" && !x || w == "option" && x != v[l]) && Q(t, l, x, v[l], i), l = "checked", S != null && S != t[l] && Q(t, l, S, v[l], i));
    }
    return t;
  }
  function he(t, e, n) {
    try {
      if (typeof t == "function") {
        var r = typeof t.__u == "function";
        r && t.__u(), r && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (i) {
      _.__e(i, n);
    }
  }
  function Me(t, e, n) {
    var r, i;
    if (_.unmount && _.unmount(t), (r = t.ref) && (r.current && r.current != t.__e || he(r, null, e)), (r = t.__c) != null) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount();
        } catch (o) {
          _.__e(o, e);
        }
      r.base = r.__P = null;
    }
    if (r = t.__k)
      for (i = 0; i < r.length; i++)
        r[i] && Me(r[i], e, n || typeof t.type != "function");
    n || de(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function ht(t, e, n) {
    return this.constructor(t, n);
  }
  function gt(t, e, n) {
    var r, i, o, a;
    e == document && (e = document.documentElement), _.__ && _.__(t, e), i = (r = typeof n == "function") ? null : n && n.__k || e.__k, o = [], a = [], pe(e, t = (!r && n || e).__k = ce(N, null, [t]), i || V, V, e.namespaceURI, !r && n ? [n] : i ? null : e.firstChild ? E.call(e.childNodes) : null, o, !r && n ? n : i ? i.__e : e.firstChild, r, a), Ae(o, t, a);
  }
  E = ke.slice, _ = { __e: function(t, e, n, r) {
    for (var i, o, a; e = e.__; )
      if ((i = e.__c) && !i.__)
        try {
          if ((o = i.constructor) && o.getDerivedStateFromError != null && (i.setState(o.getDerivedStateFromError(t)), a = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), a = i.__d), a)
            return i.__E = i;
        } catch (c) {
          t = c;
        }
    throw t;
  } }, B = 0, $.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s != this.state ? this.__s : this.__s = M({}, this.state), typeof t == "function" && (t = t(M({}, n), this.props)), t && M(n, t), t != null && this.__v && (e && this._sb.push(e), Te(this));
  }, $.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), Te(this));
  }, $.prototype.render = N, F = [], ve = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, xe = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, Y.__r = 0, Se = /(PointerCapture)$|Capture$/i, se = 0, ae = Ee(!1), le = Ee(!0);
  var _t = 0;
  function s(t, e, n, r, i, o) {
    e || (e = {});
    var a, c, p = e;
    if ("ref" in p)
      for (c in p = {}, e)
        c == "ref" ? a = e[c] : p[c] = e[c];
    var l = { type: t, props: p, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --_t, __i: -1, __u: 0, __source: i, __self: o };
    if (typeof t == "function" && (a = t.defaultProps))
      for (c in a)
        p[c] === void 0 && (p[c] = a[c]);
    return _.vnode && _.vnode(l), l;
  }
  var ee, T, ge, $e, _e = 0, Ie = [], R = _, De = R.__b, Be = R.__r, Fe = R.diffed, Ne = R.__c, ze = R.unmount, He = R.__;
  function Oe(t, e) {
    R.__h && R.__h(T, t, _e || e), _e = 0;
    var n = T.__H || (T.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function C(t) {
    return _e = 1, ft(We, t);
  }
  function ft(t, e, n) {
    var r = Oe(ee++, 2);
    if (r.t = t, !r.__c && (r.__ = [n ? n(e) : We(void 0, e), function(c) {
      var p = r.__N ? r.__N[0] : r.__[0], l = r.t(p, c);
      p !== l && (r.__N = [l, r.__[1]], r.__c.setState({}));
    }], r.__c = T, !T.__f)) {
      var i = function(c, p, l) {
        if (!r.__c.__H)
          return !0;
        var h = r.__c.__H.__.filter(function(b) {
          return !!b.__c;
        });
        if (h.every(function(b) {
          return !b.__N;
        }))
          return !o || o.call(this, c, p, l);
        var d = r.__c.props !== c;
        return h.forEach(function(b) {
          if (b.__N) {
            var m = b.__[0];
            b.__ = b.__N, b.__N = void 0, m !== b.__[0] && (d = !0);
          }
        }), o && o.call(this, c, p, l) || d;
      };
      T.__f = !0;
      var o = T.shouldComponentUpdate, a = T.componentWillUpdate;
      T.componentWillUpdate = function(c, p, l) {
        if (this.__e) {
          var h = o;
          o = void 0, i(c, p, l), o = h;
        }
        a && a.call(this, c, p, l);
      }, T.shouldComponentUpdate = i;
    }
    return r.__N || r.__;
  }
  function fe(t, e) {
    var n = Oe(ee++, 3);
    !R.__s && yt(n.__H, e) && (n.__ = t, n.u = e, T.__H.__h.push(n));
  }
  function mt() {
    for (var t; t = Ie.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(te), t.__H.__h.forEach(me), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], R.__e(e, t.__v);
        }
  }
  R.__b = function(t) {
    T = null, De && De(t);
  }, R.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), He && He(t, e);
  }, R.__r = function(t) {
    Be && Be(t), ee = 0;
    var e = (T = t.__c).__H;
    e && (ge === T ? (e.__h = [], T.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(te), e.__h.forEach(me), e.__h = [], ee = 0)), ge = T;
  }, R.diffed = function(t) {
    Fe && Fe(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (Ie.push(e) !== 1 && $e === R.requestAnimationFrame || (($e = R.requestAnimationFrame) || bt)(mt)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), ge = T = null;
  }, R.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(te), n.__h = n.__h.filter(function(r) {
          return !r.__ || me(r);
        });
      } catch (r) {
        e.some(function(i) {
          i.__h && (i.__h = []);
        }), e = [], R.__e(r, n.__v);
      }
    }), Ne && Ne(t, e);
  }, R.unmount = function(t) {
    ze && ze(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(r) {
      try {
        te(r);
      } catch (i) {
        e = i;
      }
    }), n.__H = void 0, e && R.__e(e, n.__v));
  };
  var Ue = typeof requestAnimationFrame == "function";
  function bt(t) {
    var e, n = function() {
      clearTimeout(r), Ue && cancelAnimationFrame(e), setTimeout(t);
    }, r = setTimeout(n, 35);
    Ue && (e = requestAnimationFrame(n));
  }
  function te(t) {
    var e = T, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), T = e;
  }
  function me(t) {
    var e = T;
    t.__c = t.__(), T = e;
  }
  function yt(t, e) {
    return !t || t.length !== e.length || e.some(function(n, r) {
      return n !== t[r];
    });
  }
  function We(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function vt(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function je(t, e) {
    for (var n in t)
      if (n !== "__source" && !(n in e))
        return !0;
    for (var r in e)
      if (r !== "__source" && t[r] !== e[r])
        return !0;
    return !1;
  }
  function Ve(t, e) {
    this.props = t, this.context = e;
  }
  (Ve.prototype = new $()).isPureReactComponent = !0, Ve.prototype.shouldComponentUpdate = function(t, e) {
    return je(this.props, t) || je(this.state, e);
  };
  var qe = _.__b;
  _.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), qe && qe(t);
  };
  var xt = _.__e;
  _.__e = function(t, e, n, r) {
    if (t.then) {
      for (var i, o = e; o = o.__; )
        if ((i = o.__c) && i.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
    }
    xt(t, e, n, r);
  };
  var Ge = _.unmount;
  function Je(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
      typeof r.__c == "function" && r.__c();
    }), t.__c.__H = null), (t = vt({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
      return Je(r, e, n);
    })), t;
  }
  function Ke(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
      return Ke(r, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function be() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Xe(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function ne() {
    this.i = null, this.l = null;
  }
  _.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), Ge && Ge(t);
  }, (be.prototype = new $()).__c = function(t, e) {
    var n = e.__c, r = this;
    r.o == null && (r.o = []), r.o.push(n);
    var i = Xe(r.__v), o = !1, a = function() {
      o || (o = !0, n.__R = null, i ? i(c) : c());
    };
    n.__R = a;
    var c = function() {
      if (!--r.__u) {
        if (r.state.__a) {
          var p = r.state.__a;
          r.__v.__k[0] = Ke(p, p.__c.__P, p.__c.__O);
        }
        var l;
        for (r.setState({ __a: r.__b = null }); l = r.o.pop(); )
          l.forceUpdate();
      }
    };
    r.__u++ || 32 & e.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), t.then(a, a);
  }, be.prototype.componentWillUnmount = function() {
    this.o = [];
  }, be.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), r = this.__v.__k[0].__c;
        this.__v.__k[0] = Je(this.__b, n, r.__O = r.__P);
      }
      this.__b = null;
    }
    var i = e.__a && ce(N, null, t.fallback);
    return i && (i.__u &= -33), [ce(N, null, e.__a ? null : t.children), i];
  };
  var Ye = function(t, e, n) {
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
    var e = this, n = Xe(e.__v), r = e.l.get(t);
    return r[0]++, function(i) {
      var o = function() {
        e.props.revealOrder ? (r.push(i), Ye(e, t, r)) : i();
      };
      n ? n(o) : o();
    };
  }, ne.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = Z(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, ne.prototype.componentDidUpdate = ne.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      Ye(t, n, e);
    });
  };
  var St = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, kt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, wt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Tt = /[A-Z0-9]/g, Rt = typeof document < "u", Lt = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function Ze(t, e, n) {
    return e.__k == null && (e.textContent = ""), gt(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  $.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty($.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var Qe = _.event;
  function Ct() {
  }
  function Et() {
    return this.cancelBubble;
  }
  function At() {
    return this.defaultPrevented;
  }
  _.event = function(t) {
    return Qe && (t = Qe(t)), t.persist = Ct, t.isPropagationStopped = Et, t.isDefaultPrevented = At, t.nativeEvent = t;
  };
  var Pt = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, et = _.vnode;
  _.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, r = e.type, i = {}, o = r.indexOf("-") === -1;
      for (var a in n) {
        var c = n[a];
        if (!(a === "value" && "defaultValue" in n && c == null || Rt && a === "children" && r === "noscript" || a === "class" || a === "className")) {
          var p = a.toLowerCase();
          a === "defaultValue" && "value" in n && n.value == null ? a = "value" : a === "download" && c === !0 ? c = "" : p === "translate" && c === "no" ? c = !1 : p[0] === "o" && p[1] === "n" ? p === "ondoubleclick" ? a = "ondblclick" : p !== "onchange" || r !== "input" && r !== "textarea" || Lt(n.type) ? p === "onfocus" ? a = "onfocusin" : p === "onblur" ? a = "onfocusout" : wt.test(a) && (a = p) : p = a = "oninput" : o && kt.test(a) ? a = a.replace(Tt, "-$&").toLowerCase() : c === null && (c = void 0), p === "oninput" && i[a = p] && (a = "oninputCapture"), i[a] = c;
        }
      }
      r == "select" && i.multiple && Array.isArray(i.value) && (i.value = Z(n.children).forEach(function(l) {
        l.props.selected = i.value.indexOf(l.props.value) != -1;
      })), r == "select" && i.defaultValue != null && (i.value = Z(n.children).forEach(function(l) {
        l.props.selected = i.multiple ? i.defaultValue.indexOf(l.props.value) != -1 : i.defaultValue == l.props.value;
      })), n.class && !n.className ? (i.class = n.class, Object.defineProperty(i, "className", Pt)) : (n.className && !n.class || n.class && n.className) && (i.class = i.className = n.className), e.props = i;
    }(t), t.$$typeof = St, et && et(t);
  };
  var tt = _.__r;
  _.__r = function(t) {
    tt && tt(t), t.__c;
  };
  var nt = _.diffed;
  _.diffed = function(t) {
    nt && nt(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  function Mt({ detector: t }) {
    const [e, n] = C({ activeBlocks: 0 }), [r, i] = C(15), [o, a] = C(!1), [c, p] = C(!1), l = window.Blinko.i18n;
    fe(() => {
      const x = () => {
        var f;
        const v = ((f = window.blinkoRTL) == null ? void 0 : f.getStats()) || 0;
        n({ activeBlocks: v });
      };
      x();
      const S = setInterval(x, 1e3);
      return () => clearInterval(S);
    }, []), fe(() => {
      const x = () => {
        const S = window.blinkoRTL;
        if (S) {
          let v;
          if (typeof S.getSettings == "function" ? v = S.getSettings() : typeof S.settings == "function" && (v = S.settings()), v && v.threshold !== void 0 && i(Math.round(v.threshold * 100)), v && v.debugMode !== void 0 && p(v.debugMode), v)
            return !0;
        }
        return !1;
      };
      if (!x()) {
        const S = setInterval(() => {
          x() && clearInterval(S);
        }, 100);
        setTimeout(() => clearInterval(S), 2e3);
      }
    }, []);
    const h = () => {
      var x;
      a(!0), (x = window.blinkoRTL) == null || x.fixSelection(), setTimeout(() => {
        a(!1), window.Blinko.toast.success("Selection processed");
      }, 500);
    }, d = (x) => {
      var v;
      const S = parseInt(x.target.value);
      i(S), (v = window.blinkoRTL) == null || v.setSensitivity(S / 100);
    }, b = (x) => {
      const S = x.target.checked;
      p(S);
      const v = window.blinkoRTL;
      v && v.service && typeof v.service.toggleDebugMode == "function" && v.service.toggleDebugMode();
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
              var S, v;
              (S = window.blinkoRTL) == null || S.toggle();
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
          children: o ? "Processing..." : /* @__PURE__ */ s(N, { children: [
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
              onChange: b,
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
            r,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ s(
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
        /* @__PURE__ */ s("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#999", marginTop: "4px" }, children: [
          /* @__PURE__ */ s("span", { children: "More Sensitive (1%)" }),
          /* @__PURE__ */ s("span", { children: "Less Sensitive (50%)" })
        ] })
      ] }),
      /* @__PURE__ */ s("div", { style: { marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #eee", fontSize: "11px", color: "#888", textAlign: "center" }, children: "Click 'Fix Selected' to force detection on specific text." }),
      /* @__PURE__ */ s("div", { style: { marginTop: "5px", fontSize: "10px", color: "#aaa", textAlign: "center" }, children: [
        "v",
        "1.1.8"
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
`, re = [
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
  ], rt = {
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
    targetSelectors: re,
    disabledSelectors: [],
    minRTLChars: 2,
    processInterval: 1e3,
    hebrewRegex: !0,
    arabicRegex: !0,
    mixedContent: !0,
    savedPresets: [],
    debugMode: !1,
    enablePasteInterceptor: !0,
    mobileView: !1,
    overrideDirectives: !0,
    visualStyles: {
      fontFamily: "inherit",
      lineHeight: 1.5,
      paragraphMargin: 10
    }
  };
  class $t {
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
  class It {
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
      const a = e.length;
      return a === 0 ? !1 : o / a > this.threshold;
    }
  }
  class it {
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
  class ot {
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
      }, this.charCodeStrategy = new $t(this.config);
      const n = this.getThresholdFromSensitivity(this.config.sensitivity);
      this.regexStrategy = new It(!0, !0, n, this.config.minRTLChars), this.strategy = new it([
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
          this.strategy = new it([
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
  const G = [
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
      targetSelectors: re,
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
  function Dt() {
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
      enablePasteInterceptor: !0,
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
      targetSelectors: re,
      disabledSelectors: [],
      minRTLChars: 3,
      processInterval: 2e3,
      hebrewRegex: !0,
      arabicRegex: !0,
      mixedContent: !0,
      savedPresets: []
    }), [n, r] = C("simple");
    C("");
    const [i, o] = C(""), [a, c] = C(""), [p, l] = C(""), [h, d] = C([]), [b, m] = C(""), [x, S] = C("");
    fe(() => {
      var L, oe;
      (() => {
        var D;
        const I = (D = window.blinkoRTL) == null ? void 0 : D.settings();
        I && e(I);
      })();
      const g = (I) => {
        e((D) => ({ ...D, ...I.detail }));
      }, k = (I) => {
        d((D) => [I.detail, ...D].slice(0, 50));
      };
      return (oe = (L = window.blinkoRTL) == null ? void 0 : L.service) != null && oe.getActionLog && d(window.blinkoRTL.service.getActionLog()), window.addEventListener("rtl-settings-changed", g), window.addEventListener("rtl-action-logged", k), () => {
        window.removeEventListener("rtl-settings-changed", g), window.removeEventListener("rtl-action-logged", k);
      };
    }, []);
    const v = (u) => {
      let g = 0;
      for (let k = 0; k < u.length; k++)
        if (u[k] === "{" && g++, u[k] === "}" && g--, g < 0)
          return !1;
      return g === 0;
    }, f = (u) => {
      var k;
      u.dynamicCSS !== void 0 && (v(u.dynamicCSS) ? m("") : m("Invalid CSS: Unbalanced curly braces"));
      const g = { ...t, ...u };
      e(g), (k = window.blinkoRTL) != null && k.service ? window.blinkoRTL.service.updateSettings(u) : (console.warn("RTL Service not found, settings might not persist correctly via StorageManager"), localStorage.setItem("blinko-rtl-settings", JSON.stringify(g)), window.dispatchEvent(
        new CustomEvent("rtl-settings-changed", {
          detail: g
        })
      ));
    }, w = () => {
      var g;
      if (!i.trim())
        return;
      const u = (g = window.blinkoRTL) == null ? void 0 : g.detector;
      if (u) {
        const k = u.detectRTL(i);
        c(k ? "RTL" : "LTR");
      } else
        try {
          const L = new ot().detectRTL(i);
          c(L ? "RTL" : "LTR");
        } catch (k) {
          console.error("Failed to create fallback detector", k), console.warn("RTL Detector not found via global API or fallback");
        }
    }, A = () => {
      window.blinkoRTL && (window.blinkoRTL.processAll(), window.Blinko.toast.success("Content processed!"));
    }, P = () => {
      if (!p)
        return;
      const g = [...G, ...t.savedPresets || []].find((k) => k.id === p);
      g && (f({
        customCSS: g.css,
        dynamicCSS: g.dynamicCSS || t.dynamicCSS,
        targetSelectors: g.targetSelectors || t.targetSelectors,
        disabledSelectors: g.disabledSelectors || t.disabledSelectors
      }), window.Blinko.toast.success(`Preset "${g.name}" loaded!`));
    }, W = () => {
      const u = prompt("Enter a name for this Full Preset (CSS, Dynamic Rules, Selectors):");
      if (!u)
        return;
      const g = {
        id: `custom-${Date.now()}`,
        name: u,
        css: t.customCSS,
        dynamicCSS: t.dynamicCSS,
        targetSelectors: t.targetSelectors,
        disabledSelectors: t.disabledSelectors,
        isBuiltIn: !1
      };
      f({
        savedPresets: [...t.savedPresets || [], g]
      }), l(g.id), window.Blinko.toast.success("Preset saved!");
    }, z = () => {
      if (!p)
        return;
      if (G.some((g) => g.id === p)) {
        window.Blinko.toast.error("Cannot delete built-in presets.");
        return;
      }
      confirm("Are you sure you want to delete this preset?") && (f({
        savedPresets: (t.savedPresets || []).filter((g) => g.id !== p)
      }), l(""));
    }, ie = () => {
      if (confirm("Reset all settings to defaults? This cannot be undone.")) {
        const u = {
          ...rt,
          savedPresets: t.savedPresets || []
          // Preserve user presets
        };
        f(u), window.Blinko.toast.success("Settings reset to defaults");
      }
    }, j = () => {
      f({ dynamicCSS: U }), window.Blinko.toast.success("Dynamic CSS reset");
    }, H = () => {
      var g;
      const u = (g = window.blinkoRTL) == null ? void 0 : g.service;
      if (u) {
        const k = "data:text/json;charset=utf-8," + encodeURIComponent(u.exportSettings()), L = document.createElement("a");
        L.setAttribute("href", k), L.setAttribute("download", "blinko-rtl-settings-v1.json"), document.body.appendChild(L), L.click(), L.remove();
      } else
        window.Blinko.toast.error("Export failed: Service not available");
    }, J = (u) => {
      var L;
      const g = (L = u.target.files) == null ? void 0 : L[0];
      if (!g)
        return;
      const k = new FileReader();
      k.onload = (oe) => {
        var I, D;
        try {
          const K = (I = oe.target) == null ? void 0 : I.result, lt = (D = window.blinkoRTL) == null ? void 0 : D.service;
          if (lt)
            lt.importSettings(K), S(""), window.Blinko.toast.success("Settings imported successfully!");
          else
            throw new Error("Service not available");
        } catch (K) {
          console.error("Import failed", K), S("Failed to import settings: " + (K instanceof Error ? K.message : "Invalid file")), window.Blinko.toast.error("Import failed");
        }
      }, k.readAsText(g), u.target.value = "";
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
                  onClick: A,
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
            h.length === 0 ? /* @__PURE__ */ s("p", { style: { color: t.darkMode ? "#aaa" : "#666", fontStyle: "italic" }, children: "No actions recorded yet..." }) : /* @__PURE__ */ s("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "12px", color: t.darkMode ? "#ccc" : "#000" }, children: [
              /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ s("tr", { style: { textAlign: "left", borderBottom: "1px solid #ccc" }, children: [
                /* @__PURE__ */ s("th", { style: { padding: "5px" }, children: "Time" }),
                /* @__PURE__ */ s("th", { style: { padding: "5px" }, children: "Element" }),
                /* @__PURE__ */ s("th", { style: { padding: "5px" }, children: "Action" }),
                /* @__PURE__ */ s("th", { style: { padding: "5px" }, children: "Details" })
              ] }) }),
              /* @__PURE__ */ s("tbody", { children: h.map((u, g) => /* @__PURE__ */ s("tr", { style: { borderBottom: t.darkMode ? "1px solid #444" : "1px solid #eee" }, children: [
                /* @__PURE__ */ s("td", { style: { padding: "5px", whiteSpace: "nowrap" }, children: u.timestamp }),
                /* @__PURE__ */ s("td", { style: { padding: "5px", fontFamily: "monospace" }, title: u.element, children: u.element.length > 20 ? u.element.substring(0, 20) + "..." : u.element }),
                /* @__PURE__ */ s("td", { style: { padding: "5px", color: u.direction === "RTL" ? "#28a745" : "#007bff" }, children: u.direction }),
                /* @__PURE__ */ s("td", { style: { padding: "5px", color: t.darkMode ? "#888" : "#666" }, children: u.textPreview })
              ] }, g)) })
            ] })
          ] }),
          /* @__PURE__ */ s("div", { style: { display: "flex", marginBottom: "20px", borderBottom: "1px solid #ddd" }, children: [
            /* @__PURE__ */ s(
              "button",
              {
                onClick: () => r("simple"),
                style: {
                  flex: 1,
                  padding: "10px",
                  background: n === "simple" ? t.darkMode ? "#444" : "#eee" : "transparent",
                  color: t.darkMode ? "#fff" : "#333",
                  border: "none",
                  borderBottom: n === "simple" ? "2px solid #007bff" : "none",
                  cursor: "pointer",
                  fontWeight: "bold"
                },
                children: "Simple"
              }
            ),
            /* @__PURE__ */ s(
              "button",
              {
                onClick: () => r("advanced"),
                style: {
                  flex: 1,
                  padding: "10px",
                  background: n === "advanced" ? t.darkMode ? "#444" : "#eee" : "transparent",
                  color: t.darkMode ? "#fff" : "#333",
                  border: "none",
                  borderBottom: n === "advanced" ? "2px solid #007bff" : "none",
                  cursor: "pointer",
                  fontWeight: "bold"
                },
                children: "Advanced"
              }
            )
          ] }),
          n === "simple" && /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🎛️ Basic Settings" }),
            /* @__PURE__ */ s("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enabled,
                    onChange: (u) => f({ enabled: u.target.checked })
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🔧 Enable RTL Support" })
              ] }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.autoDetect,
                    onChange: (u) => f({ autoDetect: u.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🤖 Auto-detect Content (Recommended)" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Automatically detects Hebrew/Arabic content and applies RTL direction." }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualToggle,
                    onChange: (u) => {
                      const g = u.target.checked;
                      f({ manualToggle: g });
                      const k = window.blinkoRTL;
                      k && k.isEnabled() && k.processAll();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🔄 Force All RTL" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Forces RTL direction on everything, useful if auto-detection misses something." })
            ] })
          ] }),
          n === "advanced" && /* @__PURE__ */ s("div", { style: {
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: t.darkMode ? "#333" : "#fafafa"
          }, children: [
            /* @__PURE__ */ s("h3", { style: { margin: "0 0 15px 0", color: t.darkMode ? "#fff" : "#333" }, children: "🛠️ Advanced Configuration" }),
            /* @__PURE__ */ s("div", { style: { display: "grid", gap: "15px" }, children: [
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.mobileView,
                    onChange: (u) => f({ mobileView: u.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "📱 Mobile Optimization View" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Applies specific CSS fixes for mobile layouts (e.g. preventing horizontal scroll)." }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.enablePasteInterceptor ?? !0,
                    onChange: (u) => f({ enablePasteInterceptor: u.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "📋 Paste Interceptor" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Detects mixed content on paste and offers to split/wrap it." }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.debugMode,
                    onChange: (u) => {
                      var k, L;
                      const g = u.target.checked;
                      f({ debugMode: g }), (L = (k = window.blinkoRTL) == null ? void 0 : k.service) == null || L.toggleDebugMode();
                    },
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🐞 Visual Debugger" })
              ] }),
              /* @__PURE__ */ s("p", { style: { margin: "0 0 0 30px", fontSize: "12px", color: t.darkMode ? "#aaa" : "#666" }, children: "Highlights detected RTL (Red) and LTR (Blue) elements." }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.manualMode,
                    onChange: (u) => f({ manualMode: u.target.checked }),
                    disabled: !t.enabled
                  }
                ),
                /* @__PURE__ */ s("span", { children: "✋ Manual Mode (Strict Detection)" })
              ] }),
              /* @__PURE__ */ s("label", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", cursor: "pointer" }, children: [
                /* @__PURE__ */ s(
                  "input",
                  {
                    type: "checkbox",
                    checked: t.darkMode,
                    onChange: (u) => {
                      const g = u.target.checked;
                      f({ darkMode: g }), g ? document.body.classList.add("dark") : document.body.classList.remove("dark");
                    }
                  }
                ),
                /* @__PURE__ */ s("span", { children: "🌙 Dark Mode Plugin UI" })
              ] })
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
                  onChange: (u) => f({ dynamicCSS: u.target.value }),
                  placeholder: "Enter your dynamic CSS rules here...",
                  disabled: !t.enabled,
                  style: {
                    width: "100%",
                    height: "350px",
                    padding: "10px",
                    border: b ? "2px solid red" : "1px solid #ccc",
                    borderRadius: "4px",
                    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                    fontSize: "13px",
                    resize: "vertical",
                    background: t.darkMode ? "#222" : "white",
                    color: t.darkMode ? "#eee" : "black"
                  }
                }
              ),
              b && /* @__PURE__ */ s("div", { style: { color: "red", fontSize: "12px", marginTop: "5px" }, children: b })
            ] }),
            /* @__PURE__ */ s("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ s(
                "button",
                {
                  onClick: j,
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
                    if (b) {
                      window.Blinko.toast.error("Please fix CSS errors before saving.");
                      return;
                    }
                    f({ dynamicCSS: t.dynamicCSS }), window.Blinko.toast.success("Dynamic CSS Settings Saved");
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
                    onChange: (u) => f({ permanentCSS: u.target.checked }),
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
                    value: p,
                    onChange: (u) => l(u.target.value),
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
                    onClick: P,
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
                /* @__PURE__ */ s(
                  "button",
                  {
                    onClick: z,
                    disabled: !t.enabled || !p || G.some((u) => u.id === p),
                    style: {
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      opacity: G.some((u) => u.id === p) ? 0.5 : 1
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
                  onChange: (u) => f({ customCSS: u.target.value }),
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
                  onClick: W,
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
                  onClick: () => f({ customCSS: "" }),
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
                value: i,
                onChange: (u) => o(u.target.value),
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
                onClick: w,
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
            a && /* @__PURE__ */ s("div", { style: {
              padding: "10px",
              background: a === "RTL" ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
              borderLeft: `4px solid ${a === "RTL" ? "#28a745" : "#dc3545"}`,
              marginBottom: "15px",
              color: "#333"
            }, children: [
              "Detection Result: ",
              /* @__PURE__ */ s("strong", { children: a === "RTL" ? "➡️ RTL" : "⬅️ LTR" })
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
                  onClick: ie,
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
                  onClick: H,
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
                    onChange: J,
                    style: { display: "none" }
                  }
                )
              ] })
            ] }),
            x && /* @__PURE__ */ s("p", { style: { color: "red", marginTop: "10px" }, children: x })
          ] })
        ]
      }
    );
  }
  const st = {
    name: "blinko-plugin-rtl-support",
    author: "Daniel-OS01",
    url: "https://github.com/Daniel-OS01/blinko-rtl-support-plugin",
    version: "1.1.8",
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
  function at(t, e, n = !1) {
    let r = null;
    return function(...i) {
      const o = this, a = function() {
        r = null, n || t.apply(o, i);
      }, c = n && !r;
      r && clearTimeout(r), r = setTimeout(a, e), c && t.apply(o, i);
    };
  }
  class Bt {
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
      var i, o, a, c;
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
      }), (a = r.querySelector("#rtl-btn-original")) == null || a.addEventListener("click", () => {
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
        const r = e;
        if (typeof r.setRangeText == "function") {
          const i = r.selectionStart || 0, o = r.selectionEnd || 0;
          r.setRangeText(n, i, o, "end");
        } else {
          const i = r.selectionStart || 0, o = r.selectionEnd || 0;
          r.value = r.value.substring(0, i) + n + r.value.substring(o), r.selectionStart = r.selectionEnd = i + n.length;
        }
        r.dispatchEvent(new Event("input", { bubbles: !0 }));
      } else {
        e.focus();
        const r = window.getSelection();
        if (r && r.rangeCount > 0) {
          const i = r.getRangeAt(0);
          i.deleteContents();
          const o = document.createTextNode(n);
          i.insertNode(o);
          try {
            i.setStartAfter(o), i.setEndAfter(o), r.removeAllRanges(), r.addRange(i);
          } catch (a) {
            console.warn("Failed to update cursor position:", a);
          }
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
  class Ft {
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
  class Nt {
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
      y(this, "settings", { ...rt, targetSelectors: re });
      y(this, "processElement", (e) => {
        if (!e)
          return;
        const n = (a, c) => {
          try {
            return a.matches(c);
          } catch (p) {
            return console.warn(`Invalid selector '${c}':`, p), !1;
          }
        };
        if (this.settings.disabledSelectors && this.settings.disabledSelectors.some((a) => n(e, a)))
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
          const c = (r.match(/[\u0590-\u05FF]/g) || []).length, p = (r.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length, l = c + p, h = r.replace(/\s/g, "").length || r.length;
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
      this.detector = e, this.storageManager = new Ft(), this.loadSettings(), this.pasteInterceptor = new Bt(e), this.debouncedProcessAll = at(() => this.processAllElements(), 200), this.debouncedProcessQueue = at(() => {
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
      e ? (this.settings = { ...this.settings, ...e }, this.settings.dynamicCSS || (this.settings.dynamicCSS = U), this.settings.disabledSelectors || (this.settings.disabledSelectors = []), this.settings.autoDetect === void 0 && (this.settings.autoDetect = !0), this.settings.enablePasteInterceptor === void 0 && (this.settings.enablePasteInterceptor = !0), this.detector.updateConfig({
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
      this.isRTLEnabled = !0, this.injectCSS(), this.injectDynamicCSS(), this.settings.permanentCSS && this.injectPermanentCSS(), this.settings.enablePasteInterceptor !== !1 && this.pasteInterceptor.enable(), this.applyMobileView(), this.setupObserver(), this.startAutoProcessing(), this.processAllElements(), setTimeout(() => this.processAllElements(), 500);
    }
    disable() {
      this.isRTLEnabled = !1, this.removeCSS(), this.pasteInterceptor.disable(), document.body.classList.remove("blinko-rtl-mobile-view"), this.stopAutoProcessing(), this.observer && (this.observer.disconnect(), this.observer = null), this.pendingElements.clear();
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
          (a) => !this.settings.disabledSelectors.includes(a)
        ), i = [];
        r.forEach((a) => {
          try {
            document.querySelector(a), i.push(a);
          } catch {
          }
        });
        const o = i.join(", ");
        e.forEach((a) => {
          if (a.type === "childList")
            a.addedNodes.forEach((c) => {
              if (c.nodeType === Node.ELEMENT_NODE) {
                const p = c;
                let l = !1;
                for (const h of i)
                  if (p.matches(h)) {
                    l = !0;
                    break;
                  }
                if (l && (this.pendingElements.add(p), n = !0), o)
                  try {
                    const h = p.querySelectorAll(o);
                    h.length > 0 && (h.forEach((d) => {
                      this.pendingElements.add(d);
                    }), n = !0);
                  } catch {
                  }
              }
            });
          else if (a.type === "characterData" || a.type === "attributes") {
            const c = a.target.nodeType === Node.ELEMENT_NODE ? a.target : a.target.parentElement;
            if (c) {
              let p = !1;
              for (const l of i)
                try {
                  if (c.matches(l)) {
                    p = !0;
                    break;
                  }
                } catch {
                }
              p && (this.pendingElements.add(c), n = !0);
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
  const tn = "", zt = {
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
  }, Ht = {
    title: "我的插件",
    countLabel: "计数为 {{count}}",
    successMessage: "成功！"
  }, Ot = {
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
  }, Ut = {
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
      const e = new ot(), n = new Nt(e);
      let r = null;
      function i() {
        if (r)
          return;
        const p = n.getSettings();
        r = document.createElement("button"), r.className = "rtl-toggle-btn", r.innerHTML = "ع/א", r.title = "Toggle RTL Support (Hebrew/Arabic)", r.addEventListener("click", () => {
          n.toggle(), o();
        }), document.body.appendChild(r), p.darkMode && r.classList.add("dark-mode"), o();
      }
      function o() {
        r && (n.isEnabled() ? r.classList.add("active") : r.classList.remove("active"));
      }
      function a() {
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
            return Ze(/* @__PURE__ */ s(Dt, {}), l), l;
          });
          Object.assign(this, st);
        }
        async init() {
          this.initI18n(), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", c) : setTimeout(c, 100), window.Blinko.addToolBarIcon({
            name: "rtl-support",
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
            placement: "top",
            tooltip: `RTL Language Support (v${st.version}) (ع/א)`,
            content: () => {
              const l = document.createElement("div");
              return l.setAttribute("data-plugin", "rtl-support"), Ze(/* @__PURE__ */ s(Mt, { detector: e }), l), l;
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
          window.Blinko.i18n.addResourceBundle("en", "translation", zt), window.Blinko.i18n.addResourceBundle("zh", "translation", Ht), window.Blinko.i18n.addResourceBundle("he", "translation", Ot), window.Blinko.i18n.addResourceBundle("ar", "translation", Ut);
        }
        destroy() {
          n.disable(), a(), console.log("Advanced RTL Plugin destroyed");
        }
      });
    }
  }));
})();
