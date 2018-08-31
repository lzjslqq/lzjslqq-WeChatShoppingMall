/**
*
* @license Guriddo jqGrid JS - v5.0.0 - 2015-08-03
* Copyright(c) 2008, Tony Tomov, tony@trirand.com
*
* License: http://guriddo.net/?page_id=103334
*/

!
function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
} (function($) {
    "use strict";
    function _pivotfilter(a, b) {
        var c, d, e, f = [];
        if (!this || "function" != typeof a || a instanceof RegExp) throw new TypeError;
        for (e = this.length, c = 0; e > c; c++) if (this.hasOwnProperty(c) && (d = this[c], a.call(b, d, c, this))) {
            f.push(d);
            break
        }
        return f
    }
    $.jgrid = $.jgrid || {},
    $.jgrid.hasOwnProperty("defaults") || ($.jgrid.defaults = {}),
    $.extend($.jgrid, {
        version: "5.0.0",
        htmlDecode: function(a) {
            return a && ("&nbsp;" === a || "&#160;" === a || 1 === a.length && 160 === a.charCodeAt(0)) ? "": a ? String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : a
        },
        htmlEncode: function(a) {
            return a ? String(a).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : a
        },
        template: function(a) {
            var b, c = $.makeArray(arguments).slice(1),
            d = c.length;
            return null == a && (a = ""),
            a.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
            function(a, e) {
                if (!isNaN(parseInt(e, 10))) return c[parseInt(e, 10)];
                for (b = 0; d > b; b++) if ($.isArray(c[b])) for (var f = c[b], g = f.length; g--;) if (e === f[g].nm) return f[g].v
            })
        },
        msie: "Microsoft Internet Explorer" === navigator.appName,
        msiever: function() {
            var a = -1,
            b = navigator.userAgent,
            c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            return null != c.exec(b) && (a = parseFloat(RegExp.$1)),
            a
        },
        getCellIndex: function(a) {
            var b = $(a);
            return b.is("tr") ? -1 : (b = (b.is("td") || b.is("th") ? b: b.closest("td,th"))[0], $.jgrid.msie ? $.inArray(b, b.parentNode.cells) : b.cellIndex)
        },
        stripHtml: function(a) {
            a = String(a);
            var b = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
            return a ? (a = a.replace(b, ""), a && "&nbsp;" !== a && "&#160;" !== a ? a.replace(/\"/g, "'") : "") : a
        },
        stripPref: function(a, b) {
            var c = $.type(a);
            return ("string" === c || "number" === c) && (a = String(a), b = "" !== a ? String(b).replace(String(a), "") : b),
            b
        },
        parse: function(jsonString) {
            var js = jsonString;
            return "while(1);" === js.substr(0, 9) && (js = js.substr(9)),
            "/*" === js.substr(0, 2) && (js = js.substr(2, js.length - 4)),
            js || (js = "{}"),
            $.jgrid.useJSON === !0 && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(js) : eval("(" + js + ")")
        },
        parseDate: function(a, b, c, d) {
            var e, f, g, h = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
            i = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            j = /[^-+\dA-Z]/g,
            k = new RegExp("^/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)/$"),
            l = "string" == typeof b ? b.match(k) : null,
            m = function(a, b) {
                for (a = String(a), b = parseInt(b, 10) || 2; a.length < b;) a = "0" + a;
                return a
            },
            n = {
                m: 1,
                d: 1,
                y: 1970,
                h: 0,
                i: 0,
                s: 0,
                u: 0
            },
            o = 0,
            p = function(a, b) {
                return 0 === a ? 12 === b && (b = 0) : 12 !== b && (b += 12),
                b
            },
            q = 0;
            if (void 0 === d && (d = $.jgrid.getRegional(this, "formatter.date")), void 0 === d.parseRe && (d.parseRe = /[#%\\\/:_;.,\t\s-]/), d.masks.hasOwnProperty(a) && (a = d.masks[a]), b && null != b) if (isNaN(b - 0) || "u" !== String(a).toLowerCase()) if (b.constructor === Date) o = b;
            else if (null !== l) o = new Date(parseInt(l[1], 10)),
            l[3] && (q = 60 * Number(l[5]) + Number(l[6]), q *= "-" === l[4] ? 1 : -1, q -= o.getTimezoneOffset(), o.setTime(Number(Number(o) + 60 * q * 1e3)));
            else {
                for ("ISO8601Long" === d.srcformat && "Z" === b.charAt(b.length - 1) && (q -= (new Date).getTimezoneOffset()), b = String(b).replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe), a = a.replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe), f = 0, g = a.length; g > f; f++) {
                    switch (a[f]) {
                    case "M":
                        e = $.inArray(b[f], d.monthNames),
                        -1 !== e && 12 > e && (b[f] = e + 1, n.m = b[f]);
                        break;
                    case "F":
                        e = $.inArray(b[f], d.monthNames, 12),
                        -1 !== e && e > 11 && (b[f] = e + 1 - 12, n.m = b[f]);
                        break;
                    case "n":
                        a[f] = "m";
                        break;
                    case "j":
                        a[f] = "d";
                        break;
                    case "a":
                        e = $.inArray(b[f], d.AmPm),
                        -1 !== e && 2 > e && b[f] === d.AmPm[e] && (b[f] = e, n.h = p(b[f], n.h));
                        break;
                    case "A":
                        e = $.inArray(b[f], d.AmPm),
                        -1 !== e && e > 1 && b[f] === d.AmPm[e] && (b[f] = e - 2, n.h = p(b[f], n.h));
                        break;
                    case "g":
                        n.h = parseInt(b[f], 10)
                    }
                    void 0 !== b[f] && (n[a[f].toLowerCase()] = parseInt(b[f], 10))
                }
                if (n.f && (n.m = n.f), 0 === n.m && 0 === n.y && 0 === n.d) return "&#160;";
                n.m = parseInt(n.m, 10) - 1;
                var r = n.y;
                r >= 70 && 99 >= r ? n.y = 1900 + n.y: r >= 0 && 69 >= r && (n.y = 2e3 + n.y),
                o = new Date(n.y, n.m, n.d, n.h, n.i, n.s, n.u),
                q > 0 && o.setTime(Number(Number(o) + 60 * q * 1e3))
            } else o = new Date(1e3 * parseFloat(b));
            else o = new Date(n.y, n.m, n.d, n.h, n.i, n.s, n.u);
            if (d.userLocalTime && 0 === q && (q -= (new Date).getTimezoneOffset(), q > 0 && o.setTime(Number(Number(o) + 60 * q * 1e3))), void 0 === c) return o;
            d.masks.hasOwnProperty(c) ? c = d.masks[c] : c || (c = "Y-m-d");
            var s = o.getHours(),
            t = o.getMinutes(),
            u = o.getDate(),
            v = o.getMonth() + 1,
            w = o.getTimezoneOffset(),
            x = o.getSeconds(),
            y = o.getMilliseconds(),
            z = o.getDay(),
            A = o.getFullYear(),
            B = (z + 6) % 7 + 1,
            C = (new Date(A, v - 1, u) - new Date(A, 0, 1)) / 864e5,
            D = {
                d: m(u),
                D: d.dayNames[z],
                j: u,
                l: d.dayNames[z + 7],
                N: B,
                S: d.S(u),
                w: z,
                z: C,
                W: 5 > B ? Math.floor((C + B - 1) / 7) + 1 : Math.floor((C + B - 1) / 7) || ((new Date(A - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
                F: d.monthNames[v - 1 + 12],
                m: m(v),
                M: d.monthNames[v - 1],
                n: v,
                t: "?",
                L: "?",
                o: "?",
                Y: A,
                y: String(A).substring(2),
                a: 12 > s ? d.AmPm[0] : d.AmPm[1],
                A: 12 > s ? d.AmPm[2] : d.AmPm[3],
                B: "?",
                g: s % 12 || 12,
                G: s,
                h: m(s % 12 || 12),
                H: m(s),
                i: m(t),
                s: m(x),
                u: y,
                e: "?",
                I: "?",
                O: (w > 0 ? "-": "+") + m(100 * Math.floor(Math.abs(w) / 60) + Math.abs(w) % 60, 4),
                P: "?",
                T: (String(o).match(i) || [""]).pop().replace(j, ""),
                Z: "?",
                c: "?",
                r: "?",
                U: Math.floor(o / 1e3)
            };
            return c.replace(h,
            function(a) {
                return D.hasOwnProperty(a) ? D[a] : a.substring(1)
            })
        },
        jqID: function(a) {
            return String(a).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&")
        },
        guid: 1,
        uidPref: "jqg",
        randId: function(a) {
            return (a || $.jgrid.uidPref) + $.jgrid.guid++
        },
        getAccessor: function(a, b) {
            var c, d, e, f = [];
            if ("function" == typeof b) return b(a);
            if (c = a[b], void 0 === c) try {
                if ("string" == typeof b && (f = b.split(".")), e = f.length) for (c = a; c && e--;) d = f.shift(),
                c = c[d]
            } catch(g) {}
            return c
        },
        getXmlData: function(a, b, c) {
            var d, e = "string" == typeof b ? b.match(/^(.*)\[(\w+)\]$/) : null;
            return "function" == typeof b ? b(a) : e && e[2] ? e[1] ? $(e[1], a).attr(e[2]) : $(a).attr(e[2]) : (d = $(b, a), c ? d: d.length > 0 ? $(d).text() : void 0)
        },
        cellWidth: function() {
            var a = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable ui-common-table' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"),
            b = a.appendTo("body").find("td").width();
            return a.remove(),
            Math.abs(b - 5) > .1
        },
        isLocalStorage: function() {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch(a) {
                return ! 1
            }
        },
        getRegional: function(a, b, c) {
            var d;
            return void 0 !== c ? c: (a.p && a.p.regional && $.jgrid.regional && (d = $.jgrid.getAccessor($.jgrid.regional[a.p.regional] || {},
            b)), void 0 === d && (d = $.jgrid.getAccessor($.jgrid, b)), d)
        },
        isMobile: function() {
            try {
                return /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent) ? !0 : !1
            } catch(a) {
                return ! 1
            }
        },
        cell_width: !0,
        ajaxOptions: {},
        from: function(source) {
            var $t = this,
            QueryObject = function(d, q) {
                "string" == typeof d && (d = $.data(d));
                var self = this,
                _data = d,
                _usecase = !0,
                _trim = !1,
                _query = q,
                _stripNum = /[\$,%]/g,
                _lastCommand = null,
                _lastField = null,
                _orDepth = 0,
                _negate = !1,
                _queuedOperator = "",
                _sorting = [],
                _useProperties = !0;
                if ("object" != typeof d || !d.push) throw "data provides is not an array";
                return d.length > 0 && (_useProperties = "object" != typeof d[0] ? !1 : !0),
                this._hasData = function() {
                    return null === _data ? !1 : 0 === _data.length ? !1 : !0
                },
                this._getStr = function(a) {
                    var b = [];
                    return _trim && b.push("jQuery.trim("),
                    b.push("String(" + a + ")"),
                    _trim && b.push(")"),
                    _usecase || b.push(".toLowerCase()"),
                    b.join("")
                },
                this._strComp = function(a) {
                    return "string" == typeof a ? ".toString()": ""
                },
                this._group = function(a, b) {
                    return {
                        field: a.toString(),
                        unique: b,
                        items: []
                    }
                },
                this._toStr = function(a) {
                    return _trim && (a = $.trim(a)),
                    a = a.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"'),
                    _usecase ? a: a.toLowerCase()
                },
                this._funcLoop = function(a) {
                    var b = [];
                    return $.each(_data,
                    function(c, d) {
                        b.push(a(d))
                    }),
                    b
                },
                this._append = function(a) {
                    var b;
                    for (null === _query ? _query = "": _query += "" === _queuedOperator ? " && ": _queuedOperator, b = 0; _orDepth > b; b++) _query += "(";
                    _negate && (_query += "!"),
                    _query += "(" + a + ")",
                    _negate = !1,
                    _queuedOperator = "",
                    _orDepth = 0
                },
                this._setCommand = function(a, b) {
                    _lastCommand = a,
                    _lastField = b
                },
                this._resetNegate = function() {
                    _negate = !1
                },
                this._repeatCommand = function(a, b) {
                    return null === _lastCommand ? self: null !== a && null !== b ? _lastCommand(a, b) : null === _lastField ? _lastCommand(a) : _useProperties ? _lastCommand(_lastField, a) : _lastCommand(a)
                },
                this._equals = function(a, b) {
                    return 0 === self._compare(a, b, 1)
                },
                this._compare = function(a, b, c) {
                    var d = Object.prototype.toString;
                    return void 0 === c && (c = 1),
                    void 0 === a && (a = null),
                    void 0 === b && (b = null),
                    null === a && null === b ? 0 : null === a && null !== b ? 1 : null !== a && null === b ? -1 : "[object Date]" === d.call(a) && "[object Date]" === d.call(b) ? b > a ? -c: a > b ? c: 0 : (_usecase || "number" == typeof a || "number" == typeof b || (a = String(a), b = String(b)), b > a ? -c: a > b ? c: 0)
                },
                this._performSort = function() {
                    0 !== _sorting.length && (_data = self._doSort(_data, 0))
                },
                this._doSort = function(a, b) {
                    var c = _sorting[b].by,
                    d = _sorting[b].dir,
                    e = _sorting[b].type,
                    f = _sorting[b].datefmt,
                    g = _sorting[b].sfunc;
                    if (b === _sorting.length - 1) return self._getOrder(a, c, d, e, f, g);
                    b++;
                    var h, i, j, k = self._getGroup(a, c, d, e, f),
                    l = [];
                    for (h = 0; h < k.length; h++) for (j = self._doSort(k[h].items, b), i = 0; i < j.length; i++) l.push(j[i]);
                    return l
                },
                this._getOrder = function(a, b, c, d, e, f) {
                    var g, h, i, j, k = [],
                    l = [],
                    m = "a" === c ? 1 : -1;
                    void 0 === d && (d = "text"),
                    j = "float" === d || "number" === d || "currency" === d || "numeric" === d ?
                    function(a) {
                        var b = parseFloat(String(a).replace(_stripNum, ""));
                        return isNaN(b) ? Number.NEGATIVE_INFINITY: b
                    }: "int" === d || "integer" === d ?
                    function(a) {
                        return a ? parseFloat(String(a).replace(_stripNum, "")) : Number.NEGATIVE_INFINITY
                    }: "date" === d || "datetime" === d ?
                    function(a) {
                        return $.jgrid.parseDate.call($t, e, a).getTime()
                    }: $.isFunction(d) ? d: function(a) {
                        return a = a ? $.trim(String(a)) : "",
                        _usecase ? a: a.toLowerCase()
                    },
                    $.each(a,
                    function(a, c) {
                        h = "" !== b ? $.jgrid.getAccessor(c, b) : c,
                        void 0 === h && (h = ""),
                        h = j(h, c),
                        l.push({
                            vSort: h,
                            index: a
                        })
                    }),
                    l.sort($.isFunction(f) ?
                    function(a, b) {
                        return a = a.vSort,
                        b = b.vSort,
                        f.call(this, a, b, m)
                    }: function(a, b) {
                        return a = a.vSort,
                        b = b.vSort,
                        self._compare(a, b, m)
                    }),
                    i = 0;
                    for (var n = a.length; n > i;) g = l[i].index,
                    k.push(a[g]),
                    i++;
                    return k
                },
                this._getGroup = function(a, b, c, d, e) {
                    var f, g = [],
                    h = null,
                    i = null;
                    return $.each(self._getOrder(a, b, c, d, e),
                    function(a, c) {
                        f = $.jgrid.getAccessor(c, b),
                        null == f && (f = ""),
                        self._equals(i, f) || (i = f, null !== h && g.push(h), h = self._group(b, f)),
                        h.items.push(c)
                    }),
                    null !== h && g.push(h),
                    g
                },
                this.ignoreCase = function() {
                    return _usecase = !1,
                    self
                },
                this.useCase = function() {
                    return _usecase = !0,
                    self
                },
                this.trim = function() {
                    return _trim = !0,
                    self
                },
                this.noTrim = function() {
                    return _trim = !1,
                    self
                },
                this.execute = function() {
                    var match = _query,
                    results = [];
                    return null === match ? self: ($.each(_data,
                    function() {
                        eval(match) && results.push(this)
                    }), _data = results, self)
                },
                this.data = function() {
                    return _data
                },
                this.select = function(a) {
                    if (self._performSort(), !self._hasData()) return [];
                    if (self.execute(), $.isFunction(a)) {
                        var b = [];
                        return $.each(_data,
                        function(c, d) {
                            b.push(a(d))
                        }),
                        b
                    }
                    return _data
                },
                this.hasMatch = function() {
                    return self._hasData() ? (self.execute(), _data.length > 0) : !1
                },
                this.andNot = function(a, b, c) {
                    return _negate = !_negate,
                    self.and(a, b, c)
                },
                this.orNot = function(a, b, c) {
                    return _negate = !_negate,
                    self.or(a, b, c)
                },
                this.not = function(a, b, c) {
                    return self.andNot(a, b, c)
                },
                this.and = function(a, b, c) {
                    return _queuedOperator = " && ",
                    void 0 === a ? self: self._repeatCommand(a, b, c)
                },
                this.or = function(a, b, c) {
                    return _queuedOperator = " || ",
                    void 0 === a ? self: self._repeatCommand(a, b, c)
                },
                this.orBegin = function() {
                    return _orDepth++,
                    self
                },
                this.orEnd = function() {
                    return null !== _query && (_query += ")"),
                    self
                },
                this.isNot = function(a) {
                    return _negate = !_negate,
                    self.is(a)
                },
                this.is = function(a) {
                    return self._append("this." + a),
                    self._resetNegate(),
                    self
                },
                this._compareValues = function(a, b, c, d, e) {
                    var f;
                    f = _useProperties ? "jQuery.jgrid.getAccessor(this,'" + b + "')": "this",
                    void 0 === c && (c = null);
                    var g = c,
                    h = void 0 === e.stype ? "text": e.stype;
                    if (null !== c) switch (h) {
                    case "int":
                    case "integer":
                        g = isNaN(Number(g)) || "" === g ? "0": g,
                        f = "parseInt(" + f + ",10)",
                        g = "parseInt(" + g + ",10)";
                        break;
                    case "float":
                    case "number":
                    case "numeric":
                        g = String(g).replace(_stripNum, ""),
                        g = isNaN(Number(g)) || "" === g ? "0": g,
                        f = "parseFloat(" + f + ")",
                        g = "parseFloat(" + g + ")";
                        break;
                    case "date":
                    case "datetime":
                        g = String($.jgrid.parseDate.call($t, e.srcfmt || "Y-m-d", g).getTime()),
                        f = 'jQuery.jgrid.parseDate.call(jQuery("#' + $.jgrid.jqID($t.p.id) + '")[0],"' + e.srcfmt + '",' + f + ").getTime()";
                        break;
                    default:
                        f = self._getStr(f),
                        g = self._getStr('"' + self._toStr(g) + '"')
                    }
                    return self._append(f + " " + d + " " + g),
                    self._setCommand(a, b),
                    self._resetNegate(),
                    self
                },
                this.equals = function(a, b, c) {
                    return self._compareValues(self.equals, a, b, "==", c)
                },
                this.notEquals = function(a, b, c) {
                    return self._compareValues(self.equals, a, b, "!==", c)
                },
                this.isNull = function(a, b, c) {
                    return self._compareValues(self.equals, a, null, "===", c)
                },
                this.greater = function(a, b, c) {
                    return self._compareValues(self.greater, a, b, ">", c)
                },
                this.less = function(a, b, c) {
                    return self._compareValues(self.less, a, b, "<", c)
                },
                this.greaterOrEquals = function(a, b, c) {
                    return self._compareValues(self.greaterOrEquals, a, b, ">=", c)
                },
                this.lessOrEquals = function(a, b, c) {
                    return self._compareValues(self.lessOrEquals, a, b, "<=", c)
                },
                this.startsWith = function(a, b) {
                    var c = null == b ? a: b,
                    d = _trim ? $.trim(c.toString()).length: c.toString().length;
                    return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(b) + '"')) : (null != b && (d = _trim ? $.trim(b.toString()).length: b.toString().length), self._append(self._getStr("this") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(a) + '"'))),
                    self._setCommand(self.startsWith, a),
                    self._resetNegate(),
                    self
                },
                this.endsWith = function(a, b) {
                    var c = null == b ? a: b,
                    d = _trim ? $.trim(c.toString()).length: c.toString().length;
                    return self._append(_useProperties ? self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(" + self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".length-" + d + "," + d + ') == "' + self._toStr(b) + '"': self._getStr("this") + ".substr(" + self._getStr("this") + '.length-"' + self._toStr(a) + '".length,"' + self._toStr(a) + '".length) == "' + self._toStr(a) + '"'),
                    self._setCommand(self.endsWith, a),
                    self._resetNegate(),
                    self
                },
                this.contains = function(a, b) {
                    return self._append(_useProperties ? self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + '.indexOf("' + self._toStr(b) + '",0) > -1': self._getStr("this") + '.indexOf("' + self._toStr(a) + '",0) > -1'),
                    self._setCommand(self.contains, a),
                    self._resetNegate(),
                    self
                },
                this.groupBy = function(a, b, c, d) {
                    return self._hasData() ? self._getGroup(_data, a, b, c, d) : null
                },
                this.orderBy = function(a, b, c, d, e) {
                    return b = null == b ? "a": $.trim(b.toString().toLowerCase()),
                    null == c && (c = "text"),
                    null == d && (d = "Y-m-d"),
                    null == e && (e = !1),
                    ("desc" === b || "descending" === b) && (b = "d"),
                    ("asc" === b || "ascending" === b) && (b = "a"),
                    _sorting.push({
                        by: a,
                        dir: b,
                        type: c,
                        datefmt: d,
                        sfunc: e
                    }),
                    self
                },
                self
            };
            return new QueryObject(source, null)
        },
        getMethod: function(a) {
            return this.getAccessor($.fn.jqGrid, a)
        },
        extend: function(a) {
            $.extend($.fn.jqGrid, a),
            this.no_legacy_api || $.fn.extend(a)
        },
        clearBeforeUnload: function(a) {
            var b, c = $("#" + $.jgrid.jqID(a))[0];
            if (c.grid) {
                b = c.grid,
                $.isFunction(b.emptyRows) && b.emptyRows.call(c, !0, !0),
                $(document).unbind("mouseup.jqGrid" + c.p.id),
                $(b.hDiv).unbind("mousemove"),
                $(c).unbind();
                var d, e = b.headers.length,
                f = ["formatCol", "sortData", "updatepager", "refreshIndex", "setHeadCheckBox", "constructTr", "formatter", "addXmlData", "addJSONData", "grid", "p"];
                for (d = 0; e > d; d++) b.headers[d].el = null;
                for (d in b) b.hasOwnProperty(d) && (b[d] = null);
                for (d in c.p) c.p.hasOwnProperty(d) && (c.p[d] = $.isArray(c.p[d]) ? [] : null);
                for (e = f.length, d = 0; e > d; d++) c.hasOwnProperty(f[d]) && (c[f[d]] = null, delete c[f[d]])
            }
        },
        gridUnload: function(a) {
            if (a) {
                a = $.trim(a),
                0 === a.indexOf("#") && (a = a.substring(1));
                var b = $("#" + $.jgrid.jqID(a))[0];
                if (b.grid) {
                    var c = {
                        id: $(b).attr("id"),
                        cl: $(b).attr("class")
                    };
                    b.p.pager && $(b.p.pager).unbind().empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
                    var d = document.createElement("table");
                    d.className = c.cl;
                    var e = $.jgrid.jqID(b.id);
                    $(d).removeClass("ui-jqgrid-btable ui-common-table").insertBefore("#gbox_" + e),
                    1 === $(b.p.pager).parents("#gbox_" + e).length && $(b.p.pager).insertBefore("#gbox_" + e),
                    $.jgrid.clearBeforeUnload(a),
                    $("#gbox_" + e).remove(),
                    $(d).attr({
                        id: c.id
                    }),
                    $("#alertmod_" + $.jgrid.jqID(a)).remove()
                }
            }
        },
        gridDestroy: function(a) {
            if (a) {
                a = $.trim(a),
                0 === a.indexOf("#") && (a = a.substring(1));
                var b = $("#" + $.jgrid.jqID(a))[0];
                if (b.grid) {
                    b.p.pager && $(b.p.pager).remove();
                    try {
                        $.jgrid.clearBeforeUnload(a),
                        $("#gbox_" + $.jgrid.jqID(a)).remove()
                    } catch(c) {}
                }
            }
        },
        styleUI: {
            jQueryUI: {
                common: {
                    disabled: "ui-state-disabled",
                    highlight: "ui-state-highlight",
                    hover: "ui-state-hover",
                    cornerall: "ui-corner-all",
                    cornertop: "ui-corner-top",
                    cornerbottom: "ui-corner-bottom",
                    hidden: "ui-helper-hidden",
                    icon_base: "ui-icon",
                    overlay: "ui-widget-overlay",
                    active: "ui-state-active",
                    error: "ui-state-error",
                    button: "ui-state-default ui-corner-all",
                    content: "ui-widget-content"
                },
                base: {
                    entrieBox: "ui-widget ui-widget-content ui-corner-all",
                    viewBox: "",
                    headerTable: "",
                    headerBox: "ui-state-default",
                    rowTable: "",
                    rowBox: "ui-widget-content",
                    footerTable: "",
                    footerBox: "ui-widget-content",
                    headerDiv: "ui-state-default",
                    gridtitleBox: "ui-widget-header ui-corner-top ui-helper-clearfix",
                    customtoolbarBox: "ui-state-default",
                    loadingBox: "ui-state-default ui-state-active",
                    rownumBox: "ui-state-default",
                    scrollBox: "ui-widget-content",
                    multiBox: "cbox",
                    pagerBox: "ui-state-default ui-corner-bottom",
                    toppagerBox: "ui-state-default",
                    pgInput: "ui-corner-all",
                    pgSelectBox: "ui-widget-content ui-corner-all",
                    pgButtonBox: "ui-corner-all",
                    icon_first: "ui-icon-seek-first",
                    icon_prev: "ui-icon-seek-prev",
                    icon_next: "ui-icon-seek-next",
                    icon_end: "ui-icon-seek-end",
                    icon_asc: "ui-icon-triangle-1-n",
                    icon_desc: "ui-icon-triangle-1-s",
                    icon_caption_open: "ui-icon-circle-triangle-n",
                    icon_caption_close: "ui-icon-circle-triangle-s"
                },
                modal: {
                    modal: "ui-widget ui-widget-content ui-corner-all",
                    header: "ui-widget-header ui-corner-all ui-helper-clearfix",
                    content: "ui-widget-content",
                    resizable: "ui-resizable-handle ui-resizable-se",
                    icon_close: "ui-icon-closethick",
                    icon_resizable: "ui-icon-gripsmall-diagonal-se"
                },
                celledit: {
                    inputClass: "ui-widget-content ui-corner-all"
                },
                inlinedit: {
                    inputClass: "ui-widget-content ui-corner-all",
                    icon_edit_nav: "ui-icon-pencil",
                    icon_add_nav: "ui-icon-plus",
                    icon_save_nav: "ui-icon-disk",
                    icon_cancel_nav: "ui-icon-cancel"
                },
                formedit: {
                    inputClass: "ui-widget-content ui-corner-all",
                    icon_prev: "ui-icon-triangle-1-w",
                    icon_next: "ui-icon-triangle-1-e",
                    icon_save: "ui-icon-disk",
                    icon_close: "ui-icon-close",
                    icon_del: "ui-icon-scissors",
                    icon_cancel: "ui-icon-cancel"
                },
                navigator: {
                    icon_edit_nav: "ui-icon-pencil",
                    icon_add_nav: "ui-icon-plus",
                    icon_del_nav: "ui-icon-trash",
                    icon_search_nav: "ui-icon-search",
                    icon_refresh_nav: "ui-icon-refresh",
                    icon_view_nav: "ui-icon-document",
                    icon_newbutton_nav: "ui-icon-newwin"
                },
                grouping: {
                    icon_plus: "ui-icon-circlesmall-plus",
                    icon_minus: "ui-icon-circlesmall-minus"
                },
                filter: {
                    table_widget: "ui-widget ui-widget-content",
                    srSelect: "ui-widget-content ui-corner-all",
                    srInput: "ui-widget-content ui-corner-all",
                    menu_widget: "ui-widget ui-widget-content ui-corner-all",
                    icon_search: "ui-icon-search",
                    icon_reset: "ui-icon-arrowreturnthick-1-w",
                    icon_query: "ui-icon-comment"
                },
                subgrid: {
                    icon_plus: "ui-icon-plus",
                    icon_minus: "ui-icon-minus",
                    icon_open: "ui-icon-carat-1-sw"
                },
                treegrid: {
                    icon_plus: "ui-icon-triangle-1-",
                    icon_minus: "ui-icon-triangle-1-s",
                    icon_leaf: "ui-icon-radio-off"
                },
                fmatter: {
                    icon_edit: "ui-icon-pencil",
                    icon_add: "ui-icon-plus",
                    icon_save: "ui-icon-disk",
                    icon_cancel: "ui-icon-cancel",
                    icon_del: "ui-icon-trash"
                }
            },
            Bootstrap: {
                common: {
                    disabled: "ui-disabled",
                    highlight: "success",
                    hover: "active",
                    cornerall: "",
                    cornertop: "",
                    cornerbottom: "",
                    hidden: "",
                    icon_base: "glyphicon",
                    overlay: "ui-overlay",
                    active: "active",
                    error: "bg-danger",
                    button: "btn btn-default",
                    content: ""
                },
                base: {
                    entrieBox: "",
                    viewBox: "table-responsive",
                    headerTable: "table table-bordered",
                    headerBox: "",
                    rowTable: "table table-bordered",
                    rowBox: "",
                    footerTable: "table table-bordered",
                    footerBox: "",
                    headerDiv: "",
                    gridtitleBox: "",
                    customtoolbarBox: "",
                    loadingBox: "row",
                    rownumBox: "active",
                    scrollBox: "",
                    multiBox: "checkbox",
                    pagerBox: "",
                    toppagerBox: "",
                    pgInput: "form-control",
                    pgSelectBox: "form-control",
                    pgButtonBox: "",
                    icon_first: "glyphicon-step-backward",
                    icon_prev: "glyphicon-backward",
                    icon_next: "glyphicon-forward",
                    icon_end: "glyphicon-step-forward",
                    icon_asc: "glyphicon-triangle-top",
                    icon_desc: "glyphicon-triangle-bottom",
                    icon_caption_open: "glyphicon-circle-arrow-up",
                    icon_caption_close: "glyphicon-circle-arrow-down"
                },
                modal: {
                    modal: "modal-content",
                    header: "modal-header",
                    title: "modal-title",
                    content: "modal-body",
                    resizable: "ui-resizable-handle ui-resizable-se",
                    icon_close: "glyphicon-remove-circle",
                    icon_resizable: "glyphicon-import"
                },
                celledit: {
                    inputClass: "form-control"
                },
                inlinedit: {
                    inputClass: "form-control",
                    icon_edit_nav: "glyphicon-edit",
                    icon_add_nav: "glyphicon-plus",
                    icon_save_nav: "glyphicon-save",
                    icon_cancel_nav: "glyphicon-remove-circle"
                },
                formedit: {
                    inputClass: "form-control",
                    icon_prev: "glyphicon-step-backward",
                    icon_next: "glyphicon-step-forward",
                    icon_save: "glyphicon-save",
                    icon_close: "glyphicon-remove-circle",
                    icon_del: "glyphicon-trash",
                    icon_cancel: "glyphicon-remove-circle"
                },
                navigator: {
                    icon_edit_nav: "glyphicon-edit",
                    icon_add_nav: "glyphicon-plus",
                    icon_del_nav: "glyphicon-trash",
                    icon_search_nav: "glyphicon-search",
                    icon_refresh_nav: "glyphicon-refresh",
                    icon_view_nav: "glyphicon-info-sign",
                    icon_newbutton_nav: "glyphicon-new-window"
                },
                grouping: {
                    icon_plus: "glyphicon-triangle-right",
                    icon_minus: "glyphicon-triangle-bottom"
                },
                filter: {
                    table_widget: "table table-condensed",
                    srSelect: "form-control",
                    srInput: "form-control",
                    menu_widget: "",
                    icon_search: "glyphicon-search",
                    icon_reset: "glyphicon-refresh",
                    icon_query: "glyphicon-comment"
                },
                subgrid: {
                    icon_plus: "glyphicon-triangle-right",
                    icon_minus: "glyphicon-triangle-bottom",
                    icon_open: "glyphicon-indent-left"
                },
                treegrid: {
                    icon_plus: "glyphicon-triangle-right",
                    icon_minus: "glyphicon-triangle-bottom",
                    icon_leaf: "glyphicon-unchecked"
                },
                fmatter: {
                    icon_edit: "glyphicon-edit",
                    icon_add: "glyphicon-plus",
                    icon_save: "glyphicon-save",
                    icon_cancel: "glyphicon-remove-circle",
                    icon_del: "glyphicon-trash"
                }
            }
        }
    }),
    $.fn.jqGrid = function(a) {
        if ("string" == typeof a) {
            var b = $.jgrid.getMethod(a);
            if (!b) throw "jqGrid - No such method: " + a;
            var c = $.makeArray(arguments).slice(1);
            return b.apply(this, c)
        }
        return this.each(function() {
            if (!this.grid) {
                var b;
                null != a && void 0 !== a.data && (b = a.data, a.data = []);
                var c = $.extend(!0, {
                    url: "",
                    height: 150,
                    page: 1,
                    rowNum: 20,
                    rowTotal: null,
                    records: 0,
                    pager: "",
                    pgbuttons: !0,
                    pginput: !0,
                    colModel: [],
                    rowList: [],
                    colNames: [],
                    sortorder: "asc",
                    sortname: "",
                    datatype: "xml",
                    mtype: "GET",
                    altRows: !1,
                    selarrrow: [],
                    savedRow: [],
                    shrinkToFit: !0,
                    xmlReader: {},
                    jsonReader: {},
                    subGrid: !1,
                    subGridModel: [],
                    reccount: 0,
                    lastpage: 0,
                    lastsort: 0,
                    selrow: null,
                    beforeSelectRow: null,
                    onSelectRow: null,
                    onSortCol: null,
                    ondblClickRow: null,
                    onRightClickRow: null,
                    onPaging: null,
                    onSelectAll: null,
                    onInitGrid: null,
                    loadComplete: null,
                    gridComplete: null,
                    loadError: null,
                    loadBeforeSend: null,
                    afterInsertRow: null,
                    beforeRequest: null,
                    beforeProcessing: null,
                    onHeaderClick: null,
                    viewrecords: !1,
                    loadonce: !1,
                    multiselect: !1,
                    multikey: !1,
                    editurl: null,
                    search: !1,
                    caption: "",
                    hidegrid: !0,
                    hiddengrid: !1,
                    postData: {},
                    userData: {},
                    treeGrid: !1,
                    treeGridModel: "nested",
                    treeReader: {},
                    treeANode: -1,
                    ExpandColumn: null,
                    tree_root_level: 0,
                    prmNames: {
                        page: "page",
                        rows: "rows",
                        sort: "sidx",
                        order: "sord",
                        search: "_search",
                        nd: "nd",
                        id: "id",
                        oper: "oper",
                        editoper: "edit",
                        addoper: "add",
                        deloper: "del",
                        subgridid: "id",
                        npage: null,
                        totalrows: "totalrows"
                    },
                    forceFit: !1,
                    gridstate: "visible",
                    cellEdit: !1,
                    cellsubmit: "remote",
                    nv: 0,
                    loadui: "enable",
                    toolbar: [!1, ""],
                    scroll: !1,
                    multiboxonly: !1,
                    deselectAfterSort: !0,
                    scrollrows: !1,
                    autowidth: !1,
                    scrollOffset: 18,
                    cellLayout: 5,
                    subGridWidth: 20,
                    multiselectWidth: 30,
                    gridview: !0,
                    rownumWidth: 35,
                    rownumbers: !1,
                    pagerpos: "center",
                    recordpos: "right",
                    footerrow: !1,
                    userDataOnFooter: !1,
                    hoverrows: !0,
                    altclass: "ui-priority-secondary",
                    viewsortcols: [!1, "vertical", !0],
                    resizeclass: "",
                    autoencode: !1,
                    remapColumns: [],
                    ajaxGridOptions: {},
                    direction: "ltr",
                    toppager: !1,
                    headertitles: !1,
                    scrollTimeout: 40,
                    data: [],
                    _index: {},
                    grouping: !1,
                    groupingView: {
                        groupField: [],
                        groupOrder: [],
                        groupText: [],
                        groupColumnShow: [],
                        groupSummary: [],
                        showSummaryOnHide: !1,
                        sortitems: [],
                        sortnames: [],
                        summary: [],
                        summaryval: [],
                        plusicon: "",
                        minusicon: "",
                        displayField: [],
                        groupSummaryPos: [],
                        formatDisplayField: [],
                        _locgr: !1
                    },
                    ignoreCase: !0,
                    cmTemplate: {},
                    idPrefix: "",
                    multiSort: !1,
                    minColWidth: 33,
                    scrollPopUp: !1,
                    scrollTopOffset: 0,
                    scrollLeftOffset: "100%",
                    storeNavOptions: !1,
                    regional: "en",
                    styleUI: "jQueryUI",
                    responsive: !1
                },
                $.jgrid.defaults, a);
                void 0 !== b && (c.data = b, a.data = b);
                var d = this,
                e = {
                    headers: [],
                    cols: [],
                    footers: [],
                    dragStart: function(a, b, e) {
                        var f = $(this.bDiv).offset().left;
                        this.resizing = {
                            idx: a,
                            startX: b.pageX,
                            sOL: b.pageX - f
                        },
                        this.hDiv.style.cursor = "col-resize",
                        this.curGbox = $("#rs_m" + $.jgrid.jqID(c.id), "#gbox_" + $.jgrid.jqID(c.id)),
                        this.curGbox.css({
                            display: "block",
                            left: b.pageX - f,
                            top: e[1],
                            height: e[2]
                        }),
                        $(d).triggerHandler("jqGridResizeStart", [b, a]),
                        $.isFunction(c.resizeStart) && c.resizeStart.call(d, b, a),
                        document.onselectstart = function() {
                            return ! 1
                        }
                    },
                    dragMove: function(a) {
                        if (this.resizing) {
                            var b, d, e = a.pageX - this.resizing.startX,
                            f = this.headers[this.resizing.idx],
                            g = "ltr" === c.direction ? f.width + e: f.width - e;
                            g > 33 && (this.curGbox.css({
                                left: this.resizing.sOL + e
                            }), c.forceFit === !0 ? (b = this.headers[this.resizing.idx + c.nv], d = "ltr" === c.direction ? b.width - e: b.width + e, d > c.minColWidth && (f.newWidth = g, b.newWidth = d)) : (this.newWidth = "ltr" === c.direction ? c.tblwidth + e: c.tblwidth - e, f.newWidth = g))
                        }
                    },
                    dragEnd: function(a) {
                        if (this.hDiv.style.cursor = "default", this.resizing) {
                            var b = this.resizing.idx,
                            e = this.headers[b].newWidth || this.headers[b].width;
                            e = parseInt(e, 10),
                            this.resizing = !1,
                            $("#rs_m" + $.jgrid.jqID(c.id)).css("display", "none"),
                            c.colModel[b].width = e,
                            this.headers[b].width = e,
                            this.headers[b].el.style.width = e + "px",
                            this.cols[b].style.width = e + "px",
                            this.footers.length > 0 && (this.footers[b].style.width = e + "px"),
                            c.forceFit === !0 ? (e = this.headers[b + c.nv].newWidth || this.headers[b + c.nv].width, this.headers[b + c.nv].width = e, this.headers[b + c.nv].el.style.width = e + "px", this.cols[b + c.nv].style.width = e + "px", this.footers.length > 0 && (this.footers[b + c.nv].style.width = e + "px"), c.colModel[b + c.nv].width = e) : (c.tblwidth = this.newWidth || c.tblwidth, $("table:first", this.bDiv).css("width", c.tblwidth + "px"), $("table:first", this.hDiv).css("width", c.tblwidth + "px"), this.hDiv.scrollLeft = this.bDiv.scrollLeft, c.footerrow && ($("table:first", this.sDiv).css("width", c.tblwidth + "px"), this.sDiv.scrollLeft = this.bDiv.scrollLeft)),
                            a && ($(d).triggerHandler("jqGridResizeStop", [e, b]), $.isFunction(c.resizeStop) && c.resizeStop.call(d, e, b))
                        }
                        this.curGbox = null,
                        document.onselectstart = function() {
                            return ! 0
                        }
                    },
                    populateVisible: function() {
                        e.timer && clearTimeout(e.timer),
                        e.timer = null;
                        var a = $(e.bDiv).height();
                        if (a) {
                            var b, f, g = $("table:first", e.bDiv);
                            if (g[0].rows.length) try {
                                b = g[0].rows[1],
                                f = b ? $(b).outerHeight() || e.prevRowHeight: e.prevRowHeight
                            } catch(h) {
                                f = e.prevRowHeight
                            }
                            if (f) {
                                e.prevRowHeight = f;
                                var i, j, k, l = c.rowNum,
                                m = e.scrollTop = e.bDiv.scrollTop,
                                n = Math.round(g.position().top) - m,
                                o = n + g.height(),
                                p = f * l;
                                if (a > o && 0 >= n && (void 0 === c.lastpage || (parseInt((o + m + p - 1) / p, 10) || 0) <= c.lastpage) && (j = parseInt((a - o + p - 1) / p, 10) || 1, o >= 0 || 2 > j || c.scroll === !0 ? (i = (Math.round((o + m) / p) || 0) + 1, n = -1) : n = 1), n > 0 && (i = (parseInt(m / p, 10) || 0) + 1, j = (parseInt((m + a) / p, 10) || 0) + 2 - i, k = !0), j) {
                                    if (c.lastpage && (i > c.lastpage || 1 === c.lastpage || i === c.page && i === c.lastpage)) return;
                                    e.hDiv.loading ? e.timer = setTimeout(e.populateVisible, c.scrollTimeout) : (c.page = i, k && (e.selectionPreserver(g[0]), e.emptyRows.call(g[0], !1, !1)), e.populate(j)),
                                    c.scrollPopUp && null != c.lastpage && ($("#scroll_g" + c.id).show().html($.jgrid.template($.jgrid.getRegional(d, "defaults.pgtext", c.pgtext), c.page, c.lastpage)).css({
                                        top: c.scrollTopOffset + m * ((parseInt(c.height, 10) - 45) / (parseInt(f, 10) * parseInt(c.records, 10))) + "px",
                                        left: c.scrollLeftOffset
                                    }), $(this).mouseout(function() {
                                        $("#scroll_g" + c.id).hide()
                                    }))
                                }
                            }
                        }
                    },
                    scrollGrid: function(a) {
                        if (c.scroll) {
                            var b = e.bDiv.scrollTop;
                            void 0 === e.scrollTop && (e.scrollTop = 0),
                            b !== e.scrollTop && (e.scrollTop = b, e.timer && clearTimeout(e.timer), e.timer = setTimeout(e.populateVisible, c.scrollTimeout))
                        }
                        e.hDiv.scrollLeft = e.bDiv.scrollLeft,
                        c.footerrow && (e.sDiv.scrollLeft = e.bDiv.scrollLeft),
                        c.frozenColumns && $(e.fbDiv).scrollTop(e.bDiv.scrollTop),
                        a && a.stopPropagation()
                    },
                    selectionPreserver: function(a) {
                        var b = a.p,
                        c = b.selrow,
                        d = b.selarrrow ? $.makeArray(b.selarrrow) : null,
                        e = a.grid.bDiv.scrollLeft,
                        f = function() {
                            var g;
                            if (b.selrow = null, b.selarrrow = [], b.multiselect && d && d.length > 0) for (g = 0; g < d.length; g++) d[g] !== c && $(a).jqGrid("setSelection", d[g], !1, null);
                            c && $(a).jqGrid("setSelection", c, !1, null),
                            a.grid.bDiv.scrollLeft = e,
                            $(a).unbind(".selectionPreserver", f)
                        };
                        $(a).bind("jqGridGridComplete.selectionPreserver", f)
                    }
                };
                if ("TABLE" !== this.tagName.toUpperCase() || null == this.id) return void alert("Element is not a table or has no id!");
                if (void 0 !== document.documentMode && document.documentMode <= 5) return void alert("Grid can not be used in this ('quirks') mode!");
                var f, g, h, i = 0;
                for (g in $.jgrid.regional) $.jgrid.regional.hasOwnProperty(g) && (0 === i && (f = g), i++);
                if (1 === i && f !== c.regional && (c.regional = f), $(this).empty().attr("tabindex", "0"), this.p = c, this.p.useProp = !!$.fn.prop, 0 === this.p.colNames.length) for (i = 0; i < this.p.colModel.length; i++) this.p.colNames[i] = this.p.colModel[i].label || this.p.colModel[i].name;
                if (this.p.colNames.length !== this.p.colModel.length) return void alert($.jgrid.getRegional(this, "errors.model"));
                var j, k = $.jgrid.getMethod("getStyleUI"),
                l = d.p.styleUI + ".common",
                m = k(l, "disabled", !0),
                n = k(l, "highlight", !0),
                o = k(l, "hover", !0),
                p = k(l, "cornerall", !0),
                q = k(l, "icon_base", !0),
                r = $.jgrid.msie,
                s = [],
                t = [],
                u = [];
                l = d.p.styleUI + ".base",
                j = $("<div " + k(l, "viewBox", !1, "ui-jqgrid-view") + " role='grid'></div>"),
                d.p.direction = $.trim(d.p.direction.toLowerCase()),
                d.p._ald = !1,
                -1 === $.inArray(d.p.direction, ["ltr", "rtl"]) && (d.p.direction = "ltr"),
                h = d.p.direction,
                $(j).insertBefore(this),
                $(this).appendTo(j);
                var v = $("<div " + k(l, "entrieBox", !1, "ui-jqgrid") + "></div>");
                $(v).attr({
                    id: "gbox_" + this.id,
                    dir: h
                }).insertBefore(j),
                $(j).attr("id", "gview_" + this.id).appendTo(v),
                $("<div " + k(d.p.styleUI + ".common", "overlay", !1, "jqgrid-overlay") + " id='lui_" + this.id + "'></div>").insertBefore(j),
                $("<div " + k(l, "loadingBox", !1, "loading") + " id='load_" + this.id + "'>" + $.jgrid.getRegional(d, "defaults.loadtext", this.p.loadtext) + "</div>").insertBefore(j),
                $(this).attr({
                    role: "presentation",
                    "aria-multiselectable": !!this.p.multiselect,
                    "aria-labelledby": "gbox_" + this.id
                });
                var w, x = ["shiftKey", "altKey", "ctrlKey"],
                y = function(a, b) {
                    return a = parseInt(a, 10),
                    isNaN(a) ? b || 0 : a
                },
                z = function(a, b, c, f, g, h) {
                    var i, j, k = d.p.colModel[a],
                    l = k.align,
                    m = 'style="',
                    n = k.classes,
                    o = k.name,
                    p = [];
                    return l && (m += "text-align:" + l + ";"),
                    k.hidden === !0 && (m += "display:none;"),
                    0 === b ? m += "width: " + e.headers[a].width + "px;": ($.isFunction(k.cellattr) || "string" == typeof k.cellattr && null != $.jgrid.cellattr && $.isFunction($.jgrid.cellattr[k.cellattr])) && (i = $.isFunction(k.cellattr) ? k.cellattr: $.jgrid.cellattr[k.cellattr], j = i.call(d, g, c, f, k, h), j && "string" == typeof j && (j = j.replace(/style/i, "style").replace(/title/i, "title"), j.indexOf("title") > -1 && (k.title = !1), j.indexOf("class") > -1 && (n = void 0), p = j.replace(/\-style/g, "-sti").split(/style/), 2 === p.length ? (p[1] = $.trim(p[1].replace(/\-sti/g, "-style").replace("=", "")), (0 === p[1].indexOf("'") || 0 === p[1].indexOf('"')) && (p[1] = p[1].substring(1)), m += p[1].replace(/'/gi, '"')) : m += '"')),
                    p.length || (p[0] = "", m += '"'),
                    m += (void 0 !== n ? ' class="' + n + '"': "") + (k.title && c ? ' title="' + $.jgrid.stripHtml(c) + '"': ""),
                    m += ' aria-describedby="' + d.p.id + "_" + o + '"',
                    m + p[0]
                },
                A = function(a) {
                    return null == a || "" === a ? "&#160;": d.p.autoencode ? $.jgrid.htmlEncode(a) : String(a)
                },
                B = function(a, b, c, e, f) {
                    var g, h = d.p.colModel[c];
                    if (void 0 !== h.formatter) {
                        a = "" !== String(d.p.idPrefix) ? $.jgrid.stripPref(d.p.idPrefix, a) : a;
                        var i = {
                            rowId: a,
                            colModel: h,
                            gid: d.p.id,
                            pos: c,
                            styleUI: d.p.styleUI
                        };
                        g = $.isFunction(h.formatter) ? h.formatter.call(d, b, i, e, f) : $.fmatter ? $.fn.fmatter.call(d, h.formatter, b, i, e, f) : A(b)
                    } else g = A(b);
                    return g
                },
                C = function(a, b, c, d, e, f) {
                    var g, h;
                    return g = B(a, b, c, e, "add"),
                    h = z(c, d, g, e, a, f),
                    '<td role="gridcell" ' + h + ">" + g + "</td>"
                },
                D = function(a, b, c, e, f) {
                    var g = '<input role="checkbox" type="checkbox" id="jqg_' + d.p.id + "_" + a + '" ' + f + ' name="jqg_' + d.p.id + "_" + a + '"' + (e ? 'checked="checked"': "") + "/>",
                    h = z(b, c, "", null, a, !0);
                    return '<td role="gridcell" ' + h + ">" + g + "</td>"
                },
                E = function(a, b, c, d, e) {
                    var f = (parseInt(c, 10) - 1) * parseInt(d, 10) + 1 + b,
                    g = z(a, b, f, null, b, !0);
                    return '<td role="gridcell" ' + e + " " + g + ">" + f + "</td>"
                },
                F = function(a) {
                    var b, c, e = [],
                    f = 0;
                    for (c = 0; c < d.p.colModel.length; c++) b = d.p.colModel[c],
                    "cb" !== b.name && "subgrid" !== b.name && "rn" !== b.name && (e[f] = "local" === a ? b.name: "xml" === a || "xmlstring" === a ? b.xmlmap || b.name: b.jsonmap || b.name, d.p.keyName !== !1 && b.key === !0 && (d.p.keyName = e[f]), f++);
                    return e
                },
                G = function(a) {
                    var b = d.p.remapColumns;
                    return b && b.length || (b = $.map(d.p.colModel,
                    function(a, b) {
                        return b
                    })),
                    a && (b = $.map(b,
                    function(b) {
                        return a > b ? null: b - a
                    })),
                    b
                },
                H = function(a, b) {
                    var c;
                    this.p.deepempty ? $(this.rows).slice(1).remove() : (c = this.rows.length > 0 ? this.rows[0] : null, $(this.firstChild).empty().append(c)),
                    a && this.p.scroll && ($(this.grid.bDiv.firstChild).css({
                        height: "auto"
                    }), $(this.grid.bDiv.firstChild.firstChild).css({
                        height: "0px",
                        display: "none"
                    }), 0 !== this.grid.bDiv.scrollTop && (this.grid.bDiv.scrollTop = 0)),
                    b === !0 && this.p.treeGrid && !this.p.loadonce && (this.p.data = [], this.p._index = {})
                },
                I = function() {
                    var a, b, c, e, f, g, h, i, j, k, l, m = d.p,
                    n = m.data,
                    o = n.length,
                    p = m.localReader,
                    q = m.colModel,
                    r = p.cell,
                    s = (m.multiselect === !0 ? 1 : 0) + (m.subGrid === !0 ? 1 : 0) + (m.rownumbers === !0 ? 1 : 0),
                    t = m.scroll ? $.jgrid.randId() : 1;
                    if ("local" === m.datatype && p.repeatitems === !0) for (j = G(s), k = F("local"), e = m.keyIndex === !1 ? $.isFunction(p.id) ? p.id.call(d, n) : p.id: m.keyIndex, a = 0; o > a; a++) {
                        for (c = n[a], f = $.jgrid.getAccessor(c, e), void 0 === f && ("number" == typeof e && null != q[e + s] && (f = $.jgrid.getAccessor(c, q[e + s].name)), void 0 === f && (f = t + a, r && (g = $.jgrid.getAccessor(c, r) || c, f = null != g && void 0 !== g[e] ? g[e] : f, g = null))), i = {},
                        i[p.id] = f, r && (c = $.jgrid.getAccessor(c, r) || c), l = $.isArray(c) ? j: k, b = 0; b < l.length; b++) h = $.jgrid.getAccessor(c, l[b]),
                        i[q[b + s].name] = h;
                        $.extend(!0, n[a], i)
                    }
                },
                J = function() {
                    var a, b, c, e = d.p.data.length;
                    for (a = d.p.keyName === !1 || d.p.loadonce === !0 ? d.p.localReader.id: d.p.keyName, d.p._index = [], b = 0; e > b; b++) c = $.jgrid.getAccessor(d.p.data[b], a),
                    void 0 === c && (c = String(b + 1)),
                    d.p._index[c] = b
                },
                K = function(a, b, c, e, f) {
                    var g, h = "-1",
                    i = "",
                    j = b ? "display:none;": "",
                    k = $(d).triggerHandler("jqGridRowAttr", [e, f, a]);
                    if ("object" != typeof k && (k = $.isFunction(d.p.rowattr) ? d.p.rowattr.call(d, e, f, a) : "string" == typeof d.p.rowattr && null != $.jgrid.rowattr && $.isFunction($.jgrid.rowattr[d.p.rowattr]) ? $.jgrid.rowattr[d.p.rowattr].call(d, e, f, a) : {}), !$.isEmptyObject(k)) {
                        k.hasOwnProperty("id") && (a = k.id, delete k.id),
                        k.hasOwnProperty("tabindex") && (h = k.tabindex, delete k.tabindex),
                        k.hasOwnProperty("style") && (j += k.style, delete k.style),
                        k.hasOwnProperty("class") && (c += " " + k["class"], delete k["class"]);
                        try {
                            delete k.role
                        } catch(l) {}
                        for (g in k) k.hasOwnProperty(g) && (i += " " + g + "=" + k[g])
                    }
                    return '<tr role="row" id="' + a + '" tabindex="' + h + '" class="' + c + '"' + ("" === j ? "": ' style="' + j + '"') + i + ">"
                },
                L = function(a, b, c, e) {
                    var f = new Date,
                    g = "local" !== d.p.datatype && d.p.loadonce || "xmlstring" === d.p.datatype,
                    h = "_id_",
                    i = d.p.xmlReader,
                    j = "local" === d.p.datatype ? "local": "xml";
                    if (g && (d.p.data = [], d.p._index = {},
                    d.p.localReader.id = h), d.p.reccount = 0, $.isXMLDoc(a)) { - 1 !== d.p.treeANode || d.p.scroll ? b = b > 1 ? b: 1 : (H.call(d, !1, !0), b = 1);
                        var m, n, o, p, q, r, s, t, u, v, w = $(d),
                        x = 0,
                        z = d.p.multiselect === !0 ? 1 : 0,
                        A = 0,
                        B = d.p.rownumbers === !0 ? 1 : 0,
                        I = [],
                        J = {},
                        L = [],
                        M = d.p.altRows === !0 ? d.p.altclass: "",
                        N = k(l, "rowBox", !0, "jqgrow ui-row-" + d.p.direction);
                        d.p.subGrid === !0 && (A = 1, p = $.jgrid.getMethod("addSubGridCell")),
                        i.repeatitems || (I = F(j)),
                        q = d.p.keyName === !1 ? $.isFunction(i.id) ? i.id.call(d, a) : i.id: d.p.keyName,
                        r = -1 === String(q).indexOf("[") ? I.length ?
                        function(a, b) {
                            return $(q, a).text() || b
                        }: function(a, b) {
                            return $(i.cell, a).eq(q).text() || b
                        }: function(a, b) {
                            return a.getAttribute(q.replace(/[\[\]]/g, "")) || b
                        },
                        d.p.userData = {},
                        d.p.page = y($.jgrid.getXmlData(a, i.page), d.p.page),
                        d.p.lastpage = y($.jgrid.getXmlData(a, i.total), 1),
                        d.p.records = y($.jgrid.getXmlData(a, i.records)),
                        $.isFunction(i.userdata) ? d.p.userData = i.userdata.call(d, a) || {}: $.jgrid.getXmlData(a, i.userdata, !0).each(function() {
                            d.p.userData[this.getAttribute("name")] = $(this).text()
                        });
                        var O = $.jgrid.getXmlData(a, i.root, !0);
                        O = $.jgrid.getXmlData(O, i.row, !0),
                        O || (O = []);
                        var P, Q = O.length,
                        R = 0,
                        S = [],
                        T = parseInt(d.p.rowNum, 10),
                        U = d.p.scroll ? $.jgrid.randId() : 1;
                        if (Q > 0 && d.p.page <= 0 && (d.p.page = 1), O && Q) {
                            e && (T *= e + 1);
                            var V, W = $.isFunction(d.p.afterInsertRow),
                            X = !1,
                            Y = $("#" + $.jgrid.jqID(d.p.id) + " tbody:first"),
                            Z = B ? k(l, "rownumBox", !1, "jqgrid-rownum") : "",
                            _ = z ? k(l, "multiBox", !1, "cbox") : "";
                            for (d.p.grouping && (X = d.p.groupingView.groupCollapse === !0, V = $.jgrid.getMethod("groupingPrepare")); Q > R;) {
                                t = O[R],
                                u = r(t, U + R),
                                u = d.p.idPrefix + u,
                                P = 0 === b ? 0 : b + 1,
                                v = N + ((P + R) % 2 === 1 ? " " + M: "");
                                var ab = L.length;
                                if (L.push(""), B && L.push(E(0, R, d.p.page, d.p.rowNum, Z)), z && L.push(D(u, B, R, !1, _)), A && L.push(p.call(w, z + B, R + b)), i.repeatitems) {
                                    s || (s = G(z + A + B));
                                    var bb = $.jgrid.getXmlData(t, i.cell, !0);
                                    $.each(s,
                                    function(a) {
                                        var c = bb[this];
                                        return c ? (o = c.textContent || c.text, J[d.p.colModel[a + z + A + B].name] = o, void L.push(C(u, o, a + z + A + B, R + b, t, J))) : !1
                                    })
                                } else for (m = 0; m < I.length; m++) o = $.jgrid.getXmlData(t, I[m]),
                                J[d.p.colModel[m + z + A + B].name] = o,
                                L.push(C(u, o, m + z + A + B, R + b, t, J));
                                if (L[ab] = K(u, X, v, J, t), L.push("</tr>"), d.p.grouping && (S.push(L), d.p.groupingView._locgr || V.call(w, J, R), L = []), (g || d.p.treeGrid === !0 && !d.p._ald) && (J[h] = $.jgrid.stripPref(d.p.idPrefix, u), d.p.data.push(J), d.p._index[J[h]] = d.p.data.length - 1), d.p.gridview === !1 && (Y.append(L.join("")), w.triggerHandler("jqGridAfterInsertRow", [u, J, t]), W && d.p.afterInsertRow.call(d, u, J, t), L = []), J = {},
                                x++, R++, x === T) break
                            }
                        }
                        if (d.p.gridview === !0 && (n = d.p.treeANode > -1 ? d.p.treeANode: 0, d.p.grouping ? g || (w.jqGrid("groupingRender", S, d.p.colModel.length, d.p.page, T), S = null) : d.p.treeGrid === !0 && n > 0 ? $(d.rows[n]).after(L.join("")) : (Y.append(L.join("")), d.grid.cols = d.rows[0].cells)), d.p.subGrid === !0) try {
                            w.jqGrid("addSubGrid", z + B)
                        } catch(cb) {}
                        if (d.p.totaltime = new Date - f, x > 0 && 0 === d.p.records && (d.p.records = Q), L = null, d.p.treeGrid === !0) try {
                            w.jqGrid("setTreeNode", n + 1, x + n + 1)
                        } catch(db) {}
                        if (d.p.reccount = x, d.p.treeANode = -1, d.p.userDataOnFooter && w.jqGrid("footerData", "set", d.p.userData, !0), g && (d.p.records = Q, d.p.lastpage = Math.ceil(Q / T)), c || d.updatepager(!1, !0), g) {
                            for (; Q > x;) {
                                if (t = O[x], u = r(t, x + U), u = d.p.idPrefix + u, i.repeatitems) {
                                    s || (s = G(z + A + B));
                                    var eb = $.jgrid.getXmlData(t, i.cell, !0);
                                    $.each(s,
                                    function(a) {
                                        var b = eb[this];
                                        return b ? (o = b.textContent || b.text, void(J[d.p.colModel[a + z + A + B].name] = o)) : !1
                                    })
                                } else for (m = 0; m < I.length; m++) o = $.jgrid.getXmlData(t, I[m]),
                                J[d.p.colModel[m + z + A + B].name] = o;
                                J[h] = $.jgrid.stripPref(d.p.idPrefix, u),
                                d.p.grouping && V.call(w, J, x),
                                d.p.data.push(J),
                                d.p._index[J[h]] = d.p.data.length - 1,
                                J = {},
                                x++
                            }
                            d.p.grouping && (d.p.groupingView._locgr = !0, w.jqGrid("groupingRender", S, d.p.colModel.length, d.p.page, T), S = null)
                        }
                    }
                },
                M = function(a, b, c, e) {
                    var f = new Date;
                    if (a) { - 1 !== d.p.treeANode || d.p.scroll ? b = b > 1 ? b: 1 : (H.call(d, !1, !0), b = 1);
                        var g, h, i = "_id_",
                        j = "local" !== d.p.datatype && d.p.loadonce || "jsonstring" === d.p.datatype;
                        j && (d.p.data = [], d.p._index = {},
                        d.p.localReader.id = i),
                        d.p.reccount = 0,
                        "local" === d.p.datatype ? (g = d.p.localReader, h = "local") : (g = d.p.jsonReader, h = "json");
                        var m, o, p, q, r, s, t, u, v, w, x, z, A = $(d),
                        B = 0,
                        I = [],
                        J = d.p.multiselect ? 1 : 0,
                        L = d.p.subGrid === !0 ? 1 : 0,
                        M = d.p.rownumbers === !0 ? 1 : 0,
                        N = G(J + L + M),
                        O = F(h),
                        P = {},
                        Q = [],
                        R = d.p.altRows === !0 ? d.p.altclass: "",
                        S = k(l, "rowBox", !0, "jqgrow ui-row-" + d.p.direction);
                        d.p.page = y($.jgrid.getAccessor(a, g.page), d.p.page),
                        d.p.lastpage = y($.jgrid.getAccessor(a, g.total), 1),
                        d.p.records = y($.jgrid.getAccessor(a, g.records)),
                        d.p.userData = $.jgrid.getAccessor(a, g.userdata) || {},
                        L && (r = $.jgrid.getMethod("addSubGridCell")),
                        v = d.p.keyName === !1 ? $.isFunction(g.id) ? g.id.call(d, a) : g.id: d.p.keyName,
                        u = $.jgrid.getAccessor(a, g.root),
                        null == u && $.isArray(a) && (u = a),
                        u || (u = []),
                        t = u.length,
                        o = 0,
                        t > 0 && d.p.page <= 0 && (d.p.page = 1);
                        var T, U, V = parseInt(d.p.rowNum, 10),
                        W = d.p.scroll ? $.jgrid.randId() : 1,
                        X = !1;
                        e && (V *= e + 1),
                        "local" !== d.p.datatype || d.p.deselectAfterSort || (X = !0);
                        var Y, Z = $.isFunction(d.p.afterInsertRow),
                        _ = [],
                        ab = !1,
                        bb = $("#" + $.jgrid.jqID(d.p.id) + " tbody:first"),
                        cb = M ? k(l, "rownumBox", !1, "jqgrid-rownum") : "",
                        db = J ? k(l, "multiBox", !1, "cbox") : "";
                        for (d.p.grouping && (ab = d.p.groupingView.groupCollapse === !0, Y = $.jgrid.getMethod("groupingPrepare")); t > o;) {
                            if (q = u[o], x = $.jgrid.getAccessor(q, v), void 0 === x && ("number" == typeof v && null != d.p.colModel[v + J + L + M] && (x = $.jgrid.getAccessor(q, d.p.colModel[v + J + L + M].name)), void 0 === x && (x = W + o, 0 === I.length && g.cell))) {
                                var eb = $.jgrid.getAccessor(q, g.cell) || q;
                                x = null != eb && void 0 !== eb[v] ? eb[v] : x,
                                eb = null
                            }
                            x = d.p.idPrefix + x,
                            T = 1 === b ? 0 : b,
                            z = S + ((T + o) % 2 === 1 ? " " + R: ""),
                            X && (U = d.p.multiselect ? -1 !== $.inArray(x, d.p.selarrrow) : x === d.p.selrow);
                            var fb = Q.length;
                            for (Q.push(""), M && Q.push(E(0, o, d.p.page, d.p.rowNum, cb)), J && Q.push(D(x, M, o, U, db)), L && Q.push(r.call(A, J + M, o + b)), s = O, g.repeatitems && (g.cell && (q = $.jgrid.getAccessor(q, g.cell) || q), $.isArray(q) && (s = N)), p = 0; p < s.length; p++) m = $.jgrid.getAccessor(q, s[p]),
                            P[d.p.colModel[p + J + L + M].name] = m,
                            Q.push(C(x, m, p + J + L + M, o + b, q, P));
                            if (z += U ? " " + n: "", Q[fb] = K(x, ab, z, P, q), Q.push("</tr>"), d.p.grouping && (_.push(Q), d.p.groupingView._locgr || Y.call(A, P, o), Q = []), (j || d.p.treeGrid === !0 && !d.p._ald) && (P[i] = $.jgrid.stripPref(d.p.idPrefix, x), d.p.data.push(P), d.p._index[P[i]] = d.p.data.length - 1), d.p.gridview === !1 && (bb.append(Q.join("")), A.triggerHandler("jqGridAfterInsertRow", [x, P, q]), Z && d.p.afterInsertRow.call(d, x, P, q), Q = []), P = {},
                            B++, o++, B === V) break
                        }
                        if (d.p.gridview === !0 && (w = d.p.treeANode > -1 ? d.p.treeANode: 0, d.p.grouping ? j || (A.jqGrid("groupingRender", _, d.p.colModel.length, d.p.page, V), _ = null) : d.p.treeGrid === !0 && w > 0 ? $(d.rows[w]).after(Q.join("")) : (bb.append(Q.join("")), d.grid.cols = d.rows[0].cells)), d.p.subGrid === !0) try {
                            A.jqGrid("addSubGrid", J + M)
                        } catch(gb) {}
                        if (d.p.totaltime = new Date - f, B > 0 && 0 === d.p.records && (d.p.records = t), Q = null, d.p.treeGrid === !0) try {
                            A.jqGrid("setTreeNode", w + 1, B + w + 1)
                        } catch(hb) {}
                        if (d.p.reccount = B, d.p.treeANode = -1, d.p.userDataOnFooter && A.jqGrid("footerData", "set", d.p.userData, !0), j && (d.p.records = t, d.p.lastpage = Math.ceil(t / V)), c || d.updatepager(!1, !0), j) {
                            for (; t > B && u[B];) {
                                if (q = u[B], x = $.jgrid.getAccessor(q, v), void 0 === x && ("number" == typeof v && null != d.p.colModel[v + J + L + M] && (x = $.jgrid.getAccessor(q, d.p.colModel[v + J + L + M].name)), void 0 === x && (x = W + B, 0 === I.length && g.cell))) {
                                    var ib = $.jgrid.getAccessor(q, g.cell) || q;
                                    x = null != ib && void 0 !== ib[v] ? ib[v] : x,
                                    ib = null
                                }
                                if (q) {
                                    for (x = d.p.idPrefix + x, s = O, g.repeatitems && (g.cell && (q = $.jgrid.getAccessor(q, g.cell) || q), $.isArray(q) && (s = N)), p = 0; p < s.length; p++) P[d.p.colModel[p + J + L + M].name] = $.jgrid.getAccessor(q, s[p]);
                                    P[i] = $.jgrid.stripPref(d.p.idPrefix, x),
                                    d.p.grouping && Y.call(A, P, B),
                                    d.p.data.push(P),
                                    d.p._index[P[i]] = d.p.data.length - 1,
                                    P = {}
                                }
                                B++
                            }
                            d.p.grouping && (d.p.groupingView._locgr = !0, A.jqGrid("groupingRender", _, d.p.colModel.length, d.p.page, V), _ = null)
                        }
                    }
                },
                N = function() {
                    function a(b) {
                        var c, e, f, g, h, i, k = 0;
                        if (null != b.groups) {
                            for (e = b.groups.length && "OR" === b.groupOp.toString().toUpperCase(), e && q.orBegin(), c = 0; c < b.groups.length; c++) {
                                k > 0 && e && q.or();
                                try {
                                    a(b.groups[c])
                                } catch(l) {
                                    alert(l)
                                }
                                k++
                            }
                            e && q.orEnd()
                        }
                        if (null != b.rules) try {
                            for (f = b.rules.length && "OR" === b.groupOp.toString().toUpperCase(), f && q.orBegin(), c = 0; c < b.rules.length; c++) h = b.rules[c],
                            g = b.groupOp.toString().toUpperCase(),
                            p[h.op] && h.field && (k > 0 && g && "OR" === g && (q = q.or()), i = j[h.field], "date" === i.stype && i.srcfmt && i.newfmt && i.srcfmt !== i.newfmt && (h.data = $.jgrid.parseDate.call(d, i.newfmt, h.data, i.srcfmt)), q = p[h.op](q, g)(h.field, h.data, j[h.field])),
                            k++;
                            f && q.orEnd()
                        } catch(m) {
                            alert(m)
                        }
                    }
                    var b, c, e, f, g = d.p.multiSort ? [] : "",
                    h = [],
                    i = !1,
                    j = {},
                    k = [],
                    l = [];
                    if ($.isArray(d.p.data)) {
                        var m, n, o = d.p.grouping ? d.p.groupingView: !1;
                        if ($.each(d.p.colModel,
                        function() {
                            if (c = this.sorttype || "text", "date" === c || "datetime" === c ? (this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? (b = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat: $.jgrid.getRegional(d, "formatter.date.srcformat"), e = this.formatoptions && this.formatoptions.newformat ? this.formatoptions.newformat: $.jgrid.getRegional(d, "formatter.date.newformat")) : b = e = this.datefmt || "Y-m-d", j[this.name] = {
                                stype: c,
                                srcfmt: b,
                                newfmt: e,
                                sfunc: this.sortfunc || null
                            }) : j[this.name] = {
                                stype: c,
                                srcfmt: "",
                                newfmt: "",
                                sfunc: this.sortfunc || null
                            },
                            d.p.grouping) for (n = 0, m = o.groupField.length; m > n; n++) if (this.name === o.groupField[n]) {
                                var a = this.name;
                                this.index && (a = this.index),
                                k[n] = j[a],
                                l[n] = a
                            }
                            d.p.multiSort || i || this.index !== d.p.sortname && this.name !== d.p.sortname || (g = this.name, i = !0)
                        }), d.p.multiSort && (g = s, h = t), d.p.treeGrid && d.p._sort) return void $(d).jqGrid("SortTree", g, d.p.sortorder, j[g].stype || "text", j[g].srcfmt || "");
                        var p = {
                            eq: function(a) {
                                return a.equals
                            },
                            ne: function(a) {
                                return a.notEquals
                            },
                            lt: function(a) {
                                return a.less
                            },
                            le: function(a) {
                                return a.lessOrEquals
                            },
                            gt: function(a) {
                                return a.greater
                            },
                            ge: function(a) {
                                return a.greaterOrEquals
                            },
                            cn: function(a) {
                                return a.contains
                            },
                            nc: function(a, b) {
                                return "OR" === b ? a.orNot().contains: a.andNot().contains
                            },
                            bw: function(a) {
                                return a.startsWith
                            },
                            bn: function(a, b) {
                                return "OR" === b ? a.orNot().startsWith: a.andNot().startsWith
                            },
                            en: function(a, b) {
                                return "OR" === b ? a.orNot().endsWith: a.andNot().endsWith
                            },
                            ew: function(a) {
                                return a.endsWith
                            },
                            ni: function(a, b) {
                                return "OR" === b ? a.orNot().equals: a.andNot().equals
                            },
                            "in": function(a) {
                                return a.equals
                            },
                            nu: function(a) {
                                return a.isNull
                            },
                            nn: function(a, b) {
                                return "OR" === b ? a.orNot().isNull: a.andNot().isNull
                            }
                        },
                        q = $.jgrid.from.call(d, d.p.data);
                        if (d.p.ignoreCase && (q = q.ignoreCase()), d.p.search === !0) {
                            var r = d.p.postData.filters;
                            if (r)"string" == typeof r && (r = $.jgrid.parse(r)),
                            a(r);
                            else try {
                                f = j[d.p.postData.searchField],
                                "date" === f.stype && f.srcfmt && f.newfmt && f.srcfmt !== f.newfmt && (d.p.postData.searchString = $.jgrid.parseDate.call(d, f.newfmt, d.p.postData.searchString, f.srcfmt)),
                                q = p[d.p.postData.searchOper](q)(d.p.postData.searchField, d.p.postData.searchString, j[d.p.postData.searchField])
                            } catch(u) {}
                        } else d.p.treeGrid && "nested" === d.p.treeGridModel && q.orderBy(d.p.treeReader.left_field, "asc", "integer", "", null);
                        if (d.p.treeGrid && "adjacency" === d.p.treeGridModel && (m = 0, g = null), d.p.grouping) for (n = 0; m > n; n++) q.orderBy(l[n], o.groupOrder[n], k[n].stype, k[n].srcfmt);
                        d.p.multiSort ? $.each(g,
                        function(a) {
                            q.orderBy(this, h[a], j[this].stype, j[this].srcfmt, j[this].sfunc)
                        }) : g && d.p.sortorder && i && ("DESC" === d.p.sortorder.toUpperCase() ? q.orderBy(d.p.sortname, "d", j[g].stype, j[g].srcfmt, j[g].sfunc) : q.orderBy(d.p.sortname, "a", j[g].stype, j[g].srcfmt, j[g].sfunc));
                        var v = q.select(),
                        w = parseInt(d.p.rowNum, 10),
                        x = v.length,
                        y = parseInt(d.p.page, 10),
                        z = Math.ceil(x / w),
                        A = {};
                        if ((d.p.search || d.p.resetsearch) && d.p.grouping && d.p.groupingView._locgr) {
                            d.p.groupingView.groups = [];
                            var B, C, D, E = $.jgrid.getMethod("groupingPrepare");
                            if (d.p.footerrow && d.p.userDataOnFooter) {
                                for (C in d.p.userData) d.p.userData.hasOwnProperty(C) && (d.p.userData[C] = 0);
                                D = !0
                            }
                            for (B = 0; x > B; B++) {
                                if (D) for (C in d.p.userData) d.p.userData.hasOwnProperty(C) && (d.p.userData[C] += parseFloat(v[B][C] || 0));
                                E.call($(d), v[B], B, w)
                            }
                        }
                        return v = d.p.treeGrid && d.p.search ? $(d).jqGrid("searchTree", v) : v.slice((y - 1) * w, y * w),
                        q = null,
                        j = null,
                        A[d.p.localReader.total] = z,
                        A[d.p.localReader.page] = y,
                        A[d.p.localReader.records] = x,
                        A[d.p.localReader.root] = v,
                        A[d.p.localReader.userdata] = d.p.userData,
                        v = null,
                        A
                    }
                },
                O = function(a, b) {
                    var c, e, f, g, h, i, j, n, p = "",
                    q = d.p.pager ? $.jgrid.jqID(d.p.pager.substr(1)) : "",
                    r = q ? "_" + q: "",
                    s = d.p.toppager ? "_" + d.p.toppager.substr(1) : "";
                    if (f = parseInt(d.p.page, 10) - 1, 0 > f && (f = 0), f *= parseInt(d.p.rowNum, 10), h = f + d.p.reccount, d.p.scroll) {
                        var t = $("tbody:first > tr:gt(0)", d.grid.bDiv);
                        f = h - t.length,
                        d.p.reccount = t.length;
                        var u = t.outerHeight() || d.grid.prevRowHeight;
                        if (u) {
                            var v = f * u,
                            w = parseInt(d.p.records, 10) * u;
                            $(">div:first", d.grid.bDiv).css({
                                height: w
                            }).children("div:first").css({
                                height: v,
                                display: v ? "": "none"
                            }),
                            0 === d.grid.bDiv.scrollTop && d.p.page > 1 && (d.grid.bDiv.scrollTop = d.p.rowNum * (d.p.page - 1) * u)
                        }
                        d.grid.bDiv.scrollLeft = d.grid.hDiv.scrollLeft
                    }
                    if (p = d.p.pager || "", p += d.p.toppager ? p ? "," + d.p.toppager: d.p.toppager: "") {
                        if (j = $.jgrid.getRegional(d, "formatter.integer"), c = y(d.p.page), e = y(d.p.lastpage), $(".selbox", p)[this.p.useProp ? "prop": "attr"]("disabled", !1), d.p.pginput === !0 && ($("#input" + r).html($.jgrid.template($.jgrid.getRegional(d, "defaults.pgtext", d.p.pgtext) || "", "<input " + k(l, "pgInput", !1, "ui-pg-input") + " type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(q) + "'></span>")), d.p.toppager && $("#input_t" + s).html($.jgrid.template($.jgrid.getRegional(d, "defaults.pgtext", d.p.pgtext) || "", "<input " + k(l, "pgInput", !1, "ui-pg-input") + " type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(q) + "_toppager'></span>")), $(".ui-pg-input", p).val(d.p.page), n = d.p.toppager ? "#sp_1" + r + ",#sp_1" + r + "_toppager": "#sp_1" + r, $(n).html($.fmatter ? $.fmatter.util.NumberFormat(d.p.lastpage, j) : d.p.lastpage)), d.p.viewrecords) if (0 === d.p.reccount) $(".ui-paging-info", p).html($.jgrid.getRegional(d, "defaults.emptyrecords", d.p.emptyrecords));
                        else {
                            g = f + 1,
                            i = d.p.records,
                            $.fmatter && (g = $.fmatter.util.NumberFormat(g, j), h = $.fmatter.util.NumberFormat(h, j), i = $.fmatter.util.NumberFormat(i, j));
                            var x = $.jgrid.getRegional(d, "defaults.recordtext", d.p.recordtext);
                            $(".ui-paging-info", p).html($.jgrid.template(x, g, h, i))
                        }
                        d.p.pgbuttons === !0 && (0 >= c && (c = e = 0), 1 === c || 0 === c ? ($("#first" + r + ", #prev" + r).addClass(m).removeClass(o), d.p.toppager && $("#first_t" + s + ", #prev_t" + s).addClass(m).removeClass(o)) : ($("#first" + r + ", #prev" + r).removeClass(m), d.p.toppager && $("#first_t" + s + ", #prev_t" + s).removeClass(m)), c === e || 0 === c ? ($("#next" + r + ", #last" + r).addClass(m).removeClass(o), d.p.toppager && $("#next_t" + s + ", #last_t" + s).addClass(m).removeClass(o)) : ($("#next" + r + ", #last" + r).removeClass(m), d.p.toppager && $("#next_t" + s + ", #last_t" + s).removeClass(m)))
                    }
                    a === !0 && d.p.rownumbers === !0 && $(">td.jqgrid-rownum", d.rows).each(function(a) {
                        $(this).html(f + 1 + a)
                    }),
                    b && d.p.jqgdnd && $(d).jqGrid("gridDnD", "updateDnD"),
                    $(d).triggerHandler("jqGridGridComplete"),
                    $.isFunction(d.p.gridComplete) && d.p.gridComplete.call(d),
                    $(d).triggerHandler("jqGridAfterGridComplete")
                },
                P = function() {
                    d.grid.hDiv.loading = !0,
                    d.p.hiddengrid || $(d).jqGrid("progressBar", {
                        method: "show",
                        loadtype: d.p.loadui,
                        htmlcontent: $.jgrid.getRegional(d, "defaults.loadtext", d.p.loadtext)
                    })
                },
                Q = function() {
                    d.grid.hDiv.loading = !1,
                    $(d).jqGrid("progressBar", {
                        method: "hide",
                        loadtype: d.p.loadui
                    })
                },
                R = function(a) {
                    if (!d.grid.hDiv.loading) {
                        var b, c, e = d.p.scroll && a === !1,
                        f = {},
                        g = d.p.prmNames;
                        d.p.page <= 0 && (d.p.page = Math.min(1, d.p.lastpage)),
                        null !== g.search && (f[g.search] = d.p.search),
                        null !== g.nd && (f[g.nd] = (new Date).getTime()),
                        null !== g.rows && (f[g.rows] = d.p.rowNum),
                        null !== g.page && (f[g.page] = d.p.page),
                        null !== g.sort && (f[g.sort] = d.p.sortname),
                        null !== g.order && (f[g.order] = d.p.sortorder),
                        null !== d.p.rowTotal && null !== g.totalrows && (f[g.totalrows] = d.p.rowTotal);
                        var h = $.isFunction(d.p.loadComplete),
                        i = h ? d.p.loadComplete: null,
                        j = 0;
                        if (a = a || 1, a > 1 ? null !== g.npage ? (f[g.npage] = a, j = a - 1, a = 1) : i = function(b) {
                            d.p.page++,
                            d.grid.hDiv.loading = !1,
                            h && d.p.loadComplete.call(d, b),
                            R(a - 1)
                        }: null !== g.npage && delete d.p.postData[g.npage], d.p.grouping) {
                            $(d).jqGrid("groupingSetup");
                            var k, l = d.p.groupingView,
                            m = "";
                            for (k = 0; k < l.groupField.length; k++) {
                                var n = l.groupField[k];
                                $.each(d.p.colModel,
                                function(a, b) {
                                    b.name === n && b.index && (n = b.index)
                                }),
                                m += n + " " + l.groupOrder[k] + ", "
                            }
                            f[g.sort] = m + f[g.sort]
                        }
                        $.extend(d.p.postData, f);
                        var o = d.p.scroll ? d.rows.length - 1 : 1,
                        p = $(d).triggerHandler("jqGridBeforeRequest");
                        if (p === !1 || "stop" === p) return;
                        if ($.isFunction(d.p.datatype)) return void d.p.datatype.call(d, d.p.postData, "load_" + d.p.id, o, a, j);
                        if ($.isFunction(d.p.beforeRequest) && (p = d.p.beforeRequest.call(d), void 0 === p && (p = !0), p === !1)) return;
                        switch (b = d.p.datatype.toLowerCase()) {
                        case "json":
                        case "jsonp":
                        case "xml":
                        case "script":
                            $.ajax($.extend({
                                url:
                                d.p.url,
                                type: d.p.mtype,
                                dataType: b,
                                data: $.isFunction(d.p.serializeGridData) ? d.p.serializeGridData.call(d, d.p.postData) : d.p.postData,
                                success: function(c, f, g) {
                                    return $.isFunction(d.p.beforeProcessing) && d.p.beforeProcessing.call(d, c, f, g) === !1 ? void Q() : ("xml" === b ? L(c, o, a > 1, j) : M(c, o, a > 1, j), $(d).triggerHandler("jqGridLoadComplete", [c]), i && i.call(d, c), $(d).triggerHandler("jqGridAfterLoadComplete", [c]), e && d.grid.populateVisible(), (d.p.loadonce || d.p.treeGrid) && (d.p.datatype = "local"), c = null, void(1 === a && Q()))
                                },
                                error: function(b, c, e) {
                                    $.isFunction(d.p.loadError) && d.p.loadError.call(d, b, c, e),
                                    1 === a && Q(),
                                    b = null
                                },
                                beforeSend: function(a, b) {
                                    var c = !0;
                                    return $.isFunction(d.p.loadBeforeSend) && (c = d.p.loadBeforeSend.call(d, a, b)),
                                    void 0 === c && (c = !0),
                                    c === !1 ? !1 : void P()
                                }
                            },
                            $.jgrid.ajaxOptions, d.p.ajaxGridOptions));
                            break;
                        case "xmlstring":
                            P(),
                            c = "string" != typeof d.p.datastr ? d.p.datastr: $.parseXML(d.p.datastr),
                            L(c),
                            $(d).triggerHandler("jqGridLoadComplete", [c]),
                            h && d.p.loadComplete.call(d, c),
                            $(d).triggerHandler("jqGridAfterLoadComplete", [c]),
                            d.p.datatype = "local",
                            d.p.datastr = null,
                            Q();
                            break;
                        case "jsonstring":
                            P(),
                            c = "string" == typeof d.p.datastr ? $.jgrid.parse(d.p.datastr) : d.p.datastr,
                            M(c),
                            $(d).triggerHandler("jqGridLoadComplete", [c]),
                            h && d.p.loadComplete.call(d, c),
                            $(d).triggerHandler("jqGridAfterLoadComplete", [c]),
                            d.p.datatype = "local",
                            d.p.datastr = null,
                            Q();
                            break;
                        case "local":
                        case "clientside":
                            P(),
                            d.p.datatype = "local",
                            d.p._ald = !0;
                            var q = N();
                            M(q, o, a > 1, j),
                            $(d).triggerHandler("jqGridLoadComplete", [q]),
                            i && i.call(d, q),
                            $(d).triggerHandler("jqGridAfterLoadComplete", [q]),
                            e && d.grid.populateVisible(),
                            Q(),
                            d.p._ald = !1
                        }
                        d.p._sort = !1
                    }
                },
                S = function(a) {
                    $("#cb_" + $.jgrid.jqID(d.p.id), d.grid.hDiv)[d.p.useProp ? "prop": "attr"]("checked", a);
                    var b = d.p.frozenColumns ? d.p.id + "_frozen": "";
                    b && $("#cb_" + $.jgrid.jqID(d.p.id), d.grid.fhDiv)[d.p.useProp ? "prop": "attr"]("checked", a)
                },
                T = function(a, b) {
                    var c, e, f, g, i, j, n, p = "<td class='ui-pg-button " + m + "'><span class='ui-separator'></span></td>",
                    r = "",
                    s = "<table class='ui-pg-table ui-common-table ui-paging-pager'><tbody><tr>",
                    t = "",
                    u = function(a, b) {
                        var c;
                        return $.isFunction(d.p.onPaging) && (c = d.p.onPaging.call(d, a, b)),
                        "stop" === c ? !1 : (d.p.selrow = null, d.p.multiselect && (d.p.selarrrow = [], S(!1)), d.p.savedRow = [], !0)
                    };
                    if (a = a.substr(1), b += "_" + a, c = "pg_" + a, e = a + "_left", f = a + "_center", g = a + "_right", $("#" + $.jgrid.jqID(a)).append("<div id='" + c + "' class='ui-pager-control' role='group'><table class='ui-pg-table ui-common-table ui-pager-table'><tbody><tr><td id='" + e + "' align='left'></td><td id='" + f + "' align='center' style='white-space:pre;'></td><td id='" + g + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr"), d.p.rowList.length > 0) {
                        t = '<td dir="' + h + '">',
                        t += "<select " + k(l, "pgSelectBox", !1, "ui-pg-selbox") + ' role="listbox" title="' + ($.jgrid.getRegional(d, "defaults.pgrecs", d.p.pgrecs) || "") + '">';
                        var v;
                        for (n = 0; n < d.p.rowList.length; n++) v = d.p.rowList[n].toString().split(":"),
                        1 === v.length && (v[1] = v[0]),
                        t += '<option role="option" value="' + v[0] + '"' + (y(d.p.rowNum, 0) === y(v[0], 0) ? ' selected="selected"': "") + ">" + v[1] + "</option>";
                        t += "</select></td>"
                    }
                    if ("rtl" === h && (s += t), d.p.pginput === !0 && (r = "<td id='input" + b + "' dir='" + h + "'>" + $.jgrid.template($.jgrid.getRegional(d, "defaults.pgtext", d.p.pgtext) || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(a) + "'></span>") + "</td>"), d.p.pgbuttons === !0) {
                        var w = ["first" + b, "prev" + b, "next" + b, "last" + b],
                        x = k(l, "pgButtonBox", !0, "ui-pg-button"),
                        z = [$.jgrid.getRegional(d, "defaults.pgfirst", d.p.pgfirst) || "", $.jgrid.getRegional(d, "defaults.pgprev", d.p.pgprev) || "", $.jgrid.getRegional(d, "defaults.pgnext", d.p.pgnext) || "", $.jgrid.getRegional(d, "defaults.pglast", d.p.pglast) || ""];
                        "rtl" === h && (w.reverse(), z.reverse()),
                        s += "<td id='" + w[0] + "' class='" + x + "' title='" + z[0] + "'><span " + k(l, "icon_first", !1, q) + "></span></td>",
                        s += "<td id='" + w[1] + "' class='" + x + "'  title='" + z[1] + "'><span " + k(l, "icon_prev", !1, q) + "></span></td>",
                        s += "" !== r ? p + r + p: "",
                        s += "<td id='" + w[2] + "' class='" + x + "' title='" + z[2] + "'><span " + k(l, "icon_next", !1, q) + "></span></td>",
                        s += "<td id='" + w[3] + "' class='" + x + "' title='" + z[3] + "'><span " + k(l, "icon_end", !1, q) + "></span></td>"
                    } else "" !== r && (s += r);
                    "ltr" === h && (s += t),
                    s += "</tr></tbody></table>",
                    d.p.viewrecords === !0 && $("td#" + a + "_" + d.p.recordpos, "#" + c).append("<div dir='" + h + "' style='text-align:" + d.p.recordpos + "' class='ui-paging-info'></div>"),
                    $("td#" + a + "_" + d.p.pagerpos, "#" + c).append(s),
                    j = $("#gbox_" + $.jgrid.jqID(d.p.id)).css("font-size") || "11px",
                    $("#gbox_" + $.jgrid.jqID(d.p.id)).append("<div id='testpg' " + k(l, "entrieBox", !1, "ui-jqgrid") + " style='font-size:" + j + ";visibility:hidden;' ></div>"),
                    i = $(s).clone().appendTo("#testpg").width(),
                    $("#testpg").remove(),
                    i > 0 && ("" !== r && (i += 50), $("td#" + a + "_" + d.p.pagerpos, "#" + c).width(i)),
                    d.p._nvtd = [],
                    d.p._nvtd[0] = Math.floor(i ? (d.p.width - i) / 2 : d.p.width / 3),
                    d.p._nvtd[1] = 0,
                    s = null,
                    $(".ui-pg-selbox", "#" + c).bind("change",
                    function() {
                        return u("records", this) ? (d.p.page = Math.round(d.p.rowNum * (d.p.page - 1) / this.value - .5) + 1, d.p.rowNum = this.value, d.p.pager && $(".ui-pg-selbox", d.p.pager).val(this.value), d.p.toppager && $(".ui-pg-selbox", d.p.toppager).val(this.value), R(), !1) : !1
                    }),
                    d.p.pgbuttons === !0 && ($(".ui-pg-button", "#" + c).hover(function() {
                        $(this).hasClass(m) ? this.style.cursor = "default": ($(this).addClass(o), this.style.cursor = "pointer")
                    },
                    function() {
                        $(this).hasClass(m) || ($(this).removeClass(o), this.style.cursor = "default")
                    }), $("#first" + $.jgrid.jqID(b) + ", #prev" + $.jgrid.jqID(b) + ", #next" + $.jgrid.jqID(b) + ", #last" + $.jgrid.jqID(b)).click(function() {
                        if ($(this).hasClass(m)) return ! 1;
                        var a = y(d.p.page, 1),
                        c = y(d.p.lastpage, 1),
                        e = !1,
                        f = !0,
                        g = !0,
                        h = !0,
                        i = !0;
                        return 0 === c || 1 === c ? (f = !1, g = !1, h = !1, i = !1) : c > 1 && a >= 1 ? 1 === a ? (f = !1, g = !1) : a === c && (h = !1, i = !1) : c > 1 && 0 === a && (h = !1, i = !1, a = c - 1),
                        u(this.id.split("_")[0], this) ? (this.id === "first" + b && f && (d.p.page = 1, e = !0), this.id === "prev" + b && g && (d.p.page = a - 1, e = !0), this.id === "next" + b && h && (d.p.page = a + 1, e = !0), this.id === "last" + b && i && (d.p.page = c, e = !0), e && R(), !1) : !1
                    })),
                    d.p.pginput === !0 && $("#" + c).on("keypress", "input.ui-pg-input",
                    function(a) {
                        var b = a.charCode || a.keyCode || 0;
                        return 13 === b ? u("user", this) ? ($(this).val(y($(this).val(), 1)), d.p.page = $(this).val() > 0 ? $(this).val() : d.p.page, R(), !1) : !1 : this
                    })
                },
                U = function(a, b) {
                    var c, e = d.p.colModel,
                    f = d.p.frozenColumns ? b: d.grid.headers[a].el,
                    g = "";
                    $("span.ui-grid-ico-sort", f).addClass(m),
                    $(f).attr("aria-selected", "false"),
                    c = "local" === d.p.datatype ? e[a].name: e[a].index || e[a].name,
                    e[a].lso ? "asc" === e[a].lso ? (e[a].lso += "-desc", g = "desc") : "desc" === e[a].lso ? (e[a].lso += "-asc", g = "asc") : ("asc-desc" === e[a].lso || "desc-asc" === e[a].lso) && (e[a].lso = "") : e[a].lso = g = e[a].firstsortorder || "asc",
                    g ? ($("span.s-ico", f).show(), $("span.ui-icon-" + g, f).removeClass(m), $(f).attr("aria-selected", "true")) : d.p.viewsortcols[0] || $("span.s-ico", f).hide();
                    var h = s.indexOf(c); - 1 === h ? (s.push(c), t.push(g)) : g ? t[h] = g: (t.splice(h, 1), s.splice(h, 1)),
                    d.p.sortorder = "",
                    d.p.sortname = "";
                    for (var i = 0,
                    j = s.length; j > i; i++) i > 0 && (d.p.sortname += ", "),
                    d.p.sortname += s[i],
                    i !== j - 1 && (d.p.sortname += " " + t[i]);
                    d.p.sortorder = t[j - 1]
                },
                V = function(a, b, c, e, f) {
                    if (d.p.colModel[b].sortable && !(d.p.savedRow.length > 0)) {
                        if (c || (d.p.lastsort === b && "" !== d.p.sortname ? "asc" === d.p.sortorder ? d.p.sortorder = "desc": "desc" === d.p.sortorder && (d.p.sortorder = "asc") : d.p.sortorder = d.p.colModel[b].firstsortorder || "asc", d.p.page = 1), d.p.multiSort) U(b, f);
                        else {
                            if (e) {
                                if (d.p.lastsort === b && d.p.sortorder === e && !c) return;
                                d.p.sortorder = e
                            }
                            var g, h = d.grid.headers[d.p.lastsort] ? d.grid.headers[d.p.lastsort].el: null,
                            i = d.p.frozenColumns ? f: d.grid.headers[b].el,
                            j = "single" === d.p.viewsortcols[1] ? !0 : !1;
                            g = $(h).find("span.ui-grid-ico-sort"),
                            g.addClass(m),
                            j && $(g).css("display", "none"),
                            $(h).attr("aria-selected", "false"),
                            d.p.frozenColumns && (g = d.grid.fhDiv.find("span.ui-grid-ico-sort"), g.addClass(m), j && g.css("display", "none"), d.grid.fhDiv.find("th").attr("aria-selected", "false")),
                            g = $(i).find("span.ui-icon-" + d.p.sortorder),
                            g.removeClass(m),
                            j && g.css("display", ""),
                            $(i).attr("aria-selected", "true"),
                            d.p.viewsortcols[0] || (d.p.lastsort !== b ? (d.p.frozenColumns && d.grid.fhDiv.find("span.s-ico").hide(), $("span.s-ico", h).hide(), $("span.s-ico", i).show()) : "" === d.p.sortname && $("span.s-ico", i).show()),
                            a = a.substring(5 + d.p.id.length + 1),
                            d.p.sortname = d.p.colModel[b].index || a
                        }
                        if ("stop" === $(d).triggerHandler("jqGridSortCol", [d.p.sortname, b, d.p.sortorder])) return void(d.p.lastsort = b);
                        if ($.isFunction(d.p.onSortCol) && "stop" === d.p.onSortCol.call(d, d.p.sortname, b, d.p.sortorder)) return void(d.p.lastsort = b);
                        if ("local" === d.p.datatype ? d.p.deselectAfterSort && $(d).jqGrid("resetSelection") : (d.p.selrow = null, d.p.multiselect && S(!1), d.p.selarrrow = [], d.p.savedRow = []), d.p.scroll) {
                            var k = d.grid.bDiv.scrollLeft;
                            H.call(d, !0, !1),
                            d.grid.hDiv.scrollLeft = k
                        }
                        d.p.subGrid && "local" === d.p.datatype && $("td.sgexpanded", "#" + $.jgrid.jqID(d.p.id)).each(function() {
                            $(this).trigger("click")
                        }),
                        d.p._sort = !0,
                        R(),
                        d.p.lastsort = b,
                        d.p.sortname !== a && b && (d.p.lastsort = b)
                    }
                },
                W = function() {
                    var a, b, c, f, g = 0,
                    h = $.jgrid.cell_width ? 0 : y(d.p.cellLayout, 0),
                    i = 0,
                    j = y(d.p.scrollOffset, 0),
                    k = !1,
                    l = 0;
                    $.each(d.p.colModel,
                    function() {
                        if (void 0 === this.hidden && (this.hidden = !1), d.p.grouping && d.p.autowidth) {
                            var a = $.inArray(this.name, d.p.groupingView.groupField);
                            a >= 0 && d.p.groupingView.groupColumnShow.length > a && (this.hidden = !d.p.groupingView.groupColumnShow[a])
                        }
                        this.widthOrg = b = y(this.width, 0),
                        this.hidden === !1 && (g += b + h, this.fixed ? l += b + h: i++)
                    }),
                    isNaN(d.p.width) && (d.p.width = g + (d.p.shrinkToFit !== !1 || isNaN(d.p.height) ? 0 : j)),
                    e.width = d.p.width,
                    d.p.tblwidth = g,
                    d.p.shrinkToFit === !1 && d.p.forceFit === !0 && (d.p.forceFit = !1),
                    d.p.shrinkToFit === !0 && i > 0 && (c = e.width - h * i - l, isNaN(d.p.height) || (c -= j, k = !0), g = 0, $.each(d.p.colModel,
                    function(e) {
                        this.hidden !== !1 || this.fixed || (b = Math.round(c * this.width / (d.p.tblwidth - h * i - l)), this.width = b, g += b, a = e)
                    }), f = 0, k ? e.width - l - (g + h * i) !== j && (f = e.width - l - (g + h * i) - j) : k || 1 === Math.abs(e.width - l - (g + h * i)) || (f = e.width - l - (g + h * i)), d.p.colModel[a].width += f, d.p.tblwidth = g + f + h * i + l, d.p.tblwidth > d.p.width && (d.p.colModel[a].width -= d.p.tblwidth - parseInt(d.p.width, 10), d.p.tblwidth = d.p.width))
                },
                X = function(a) {
                    var b, c = a,
                    e = a;
                    for (b = a + 1; b < d.p.colModel.length; b++) if (d.p.colModel[b].hidden !== !0) {
                        e = b;
                        break
                    }
                    return e - c
                },
                Y = function(a) {
                    var b = $(d.grid.headers[a].el),
                    c = [b.position().left + b.outerWidth()];
                    return "rtl" === d.p.direction && (c[0] = d.p.width - c[0]),
                    c[0] -= d.grid.bDiv.scrollLeft,
                    c.push($(d.grid.hDiv).position().top),
                    c.push($(d.grid.bDiv).offset().top - $(d.grid.hDiv).offset().top + $(d.grid.bDiv).height()),
                    c
                },
                Z = function(a) {
                    var b, c = d.grid.headers,
                    e = $.jgrid.getCellIndex(a);
                    for (b = 0; b < c.length; b++) if (a === c[b].el) {
                        e = b;
                        break
                    }
                    return e
                };
                for (this.p.id = this.id, -1 === $.inArray(d.p.multikey, x) && (d.p.multikey = !1), d.p.keyName = !1, i = 0; i < d.p.colModel.length; i++) w = "string" == typeof d.p.colModel[i].template ? null != $.jgrid.cmTemplate && "object" == typeof $.jgrid.cmTemplate[d.p.colModel[i].template] ? $.jgrid.cmTemplate[d.p.colModel[i].template] : {}: d.p.colModel[i].template,
                d.p.colModel[i] = $.extend(!0, {},
                d.p.cmTemplate, w || {},
                d.p.colModel[i]),
                d.p.keyName === !1 && d.p.colModel[i].key === !0 && (d.p.keyName = d.p.colModel[i].name);
                if (d.p.sortorder = d.p.sortorder.toLowerCase(), $.jgrid.cell_width = $.jgrid.cellWidth(), d.p.grouping === !0 && (d.p.scroll = !1, d.p.rownumbers = !1, d.p.treeGrid = !1, d.p.gridview = !0), this.p.treeGrid === !0) {
                    try {
                        $(this).jqGrid("setTreeGrid")
                    } catch(_) {}
                    "local" !== d.p.datatype && (d.p.localReader = {
                        id: "_id_"
                    })
                }
                if (this.p.subGrid) try {
                    $(d).jqGrid("setSubGrid")
                } catch(ab) {}
                this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"), this.p.colModel.unshift({
                    name: "cb",
                    width: $.jgrid.cell_width ? d.p.multiselectWidth + d.p.cellLayout: d.p.multiselectWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    align: "center",
                    fixed: !0,
                    frozen: !0
                })),
                this.p.rownumbers && (this.p.colNames.unshift(""), this.p.colModel.unshift({
                    name: "rn",
                    width: d.p.rownumWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    align: "center",
                    fixed: !0,
                    frozen: !0
                })),
                d.p.xmlReader = $.extend(!0, {
                    root: "rows",
                    row: "row",
                    page: "rows>page",
                    total: "rows>total",
                    records: "rows>records",
                    repeatitems: !0,
                    cell: "cell",
                    id: "[id]",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        row: "row",
                        repeatitems: !0,
                        cell: "cell"
                    }
                },
                d.p.xmlReader),
                d.p.jsonReader = $.extend(!0, {
                    root: "rows",
                    page: "page",
                    total: "total",
                    records: "records",
                    repeatitems: !0,
                    cell: "cell",
                    id: "id",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        repeatitems: !0,
                        cell: "cell"
                    }
                },
                d.p.jsonReader),
                d.p.localReader = $.extend(!0, {
                    root: "rows",
                    page: "page",
                    total: "total",
                    records: "records",
                    repeatitems: !1,
                    cell: "cell",
                    id: "id",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        repeatitems: !0,
                        cell: "cell"
                    }
                },
                d.p.localReader),
                d.p.scroll && (d.p.pgbuttons = !1, d.p.pginput = !1, d.p.rowList = []),
                d.p.data.length && (I(), J());
                var bb, cb, db, eb, fb, gb, hb, ib, jb = "<thead><tr class='ui-jqgrid-labels' role='row'>",
                kb = "",
                lb = "",
                mb = "";
                if (d.p.shrinkToFit === !0 && d.p.forceFit === !0) for (i = d.p.colModel.length - 1; i >= 0; i--) if (!d.p.colModel[i].hidden) {
                    d.p.colModel[i].resizable = !1;
                    break
                }
                if ("horizontal" === d.p.viewsortcols[1] ? (lb = " ui-i-asc", mb = " ui-i-desc") : "single" === d.p.viewsortcols[1] && (lb = " ui-single-sort-asc", mb = " ui-single-sort-desc", kb = " style='display:none'", d.p.viewsortcols[0] = !1), bb = r ? "class='ui-th-div-ie'": "", ib = "<span class='s-ico' style='display:none'>", ib += "<span sort='asc'  class='ui-grid-ico-sort ui-icon-asc" + lb + " ui-sort-" + h + " " + m + " " + q + " " + k(l, "icon_asc", !0) + "'" + kb + "></span>", ib += "<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + mb + " ui-sort-" + h + " " + m + " " + q + " " + k(l, "icon_desc", !0) + "'" + kb + "></span></span>", d.p.multiSort && d.p.sortname) for (s = d.p.sortname.split(","), i = 0; i < s.length; i++) u = $.trim(s[i]).split(" "),
                s[i] = $.trim(u[0]),
                t[i] = u[1] ? $.trim(u[1]) : d.p.sortorder || "asc";
                for (i = 0; i < this.p.colNames.length; i++) {
                    var nb = d.p.headertitles ? ' title="' + $.jgrid.stripHtml(d.p.colNames[i]) + '"': "";
                    jb += "<th id='" + d.p.id + "_" + d.p.colModel[i].name + "' role='columnheader' " + k(l, "headerBox", !1, "ui-th-column ui-th-" + h) + " " + nb + ">",
                    cb = d.p.colModel[i].index || d.p.colModel[i].name,
                    jb += "<div id='jqgh_" + d.p.id + "_" + d.p.colModel[i].name + "' " + bb + ">" + d.p.colNames[i],
                    d.p.colModel[i].width = d.p.colModel[i].width ? parseInt(d.p.colModel[i].width, 10) : 150,
                    "boolean" != typeof d.p.colModel[i].title && (d.p.colModel[i].title = !0),
                    d.p.colModel[i].lso = "",
                    cb === d.p.sortname && (d.p.lastsort = i),
                    d.p.multiSort && (u = $.inArray(cb, s), -1 !== u && (d.p.colModel[i].lso = t[u])),
                    jb += ib + "</div></th>"
                }
                if (jb += "</tr></thead>", ib = null, $(this).append(jb), $("thead tr:first th", this).hover(function() {
                    $(this).addClass(o)
                },
                function() {
                    $(this).removeClass(o)
                }), this.p.multiselect) {
                    var ob, pb = [];
                    $("#cb_" + $.jgrid.jqID(d.p.id), this).bind("click",
                    function() {
                        d.p.selarrrow = [];
                        var a = d.p.frozenColumns === !0 ? d.p.id + "_frozen": "";
                        this.checked ? ($(d.rows).each(function(b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass(m) || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(this.id))[d.p.useProp ? "prop": "attr"]("checked", !0), $(this).addClass(n).attr("aria-selected", "true"), d.p.selarrrow.push(this.id), d.p.selrow = this.id, a && ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(this.id), d.grid.fbDiv)[d.p.useProp ? "prop": "attr"]("checked", !0), $("#" + $.jgrid.jqID(this.id), d.grid.fbDiv).addClass(n))))
                        }), ob = !0, pb = []) : ($(d.rows).each(function(b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass(m) || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(this.id))[d.p.useProp ? "prop": "attr"]("checked", !1), $(this).removeClass(n).attr("aria-selected", "false"), pb.push(this.id), a && ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(this.id), d.grid.fbDiv)[d.p.useProp ? "prop": "attr"]("checked", !1), $("#" + $.jgrid.jqID(this.id), d.grid.fbDiv).removeClass(n))))
                        }), d.p.selrow = null, ob = !1),
                        $(d).triggerHandler("jqGridSelectAll", [ob ? d.p.selarrrow: pb, ob]),
                        $.isFunction(d.p.onSelectAll) && d.p.onSelectAll.call(d, ob ? d.p.selarrrow: pb, ob)
                    })
                }
                if (d.p.autowidth === !0) {
                    var qb = $(v).innerWidth();
                    d.p.width = qb > 0 ? qb: "nw"
                }
                W(),
                $(v).css("width", e.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + d.p.id + "'>&#160;</div>"),
                d.p.scrollPopUp && $(v).append("<div " + k(l, "scrollBox", !1, "loading ui-scroll-popup") + " id='scroll_g" + d.p.id + "'></div>"),
                $(j).css("width", e.width + "px"),
                jb = $("thead:first", d).get(0);
                var rb = "";
                d.p.footerrow && (rb += "<table role='presentation' style='width:" + d.p.tblwidth + "px' " + k(l, "footerTable", !1, "ui-jqgrid-ftable ui-common-table") + "><tbody><tr role='row' " + k(l, "footerBox", !1, "footrow footrow-" + h) + ">");
                var sb = $("tr:first", jb),
                tb = "<tr class='jqgfirstrow' role='row'>";
                if (d.p.disableClick = !1, $("th", sb).each(function(a) {
                    db = d.p.colModel[a].width,
                    void 0 === d.p.colModel[a].resizable && (d.p.colModel[a].resizable = !0),
                    d.p.colModel[a].resizable ? (eb = document.createElement("span"), $(eb).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + h).css("cursor", "col-resize"), $(this).addClass(d.p.resizeclass)) : eb = "",
                    $(this).css("width", db + "px").prepend(eb),
                    eb = null;
                    var b = "";
                    d.p.colModel[a].hidden && ($(this).css("display", "none"), b = "display:none;"),
                    tb += "<td role='gridcell' style='height:0px;width:" + db + "px;" + b + "'></td>",
                    e.headers[a] = {
                        width: db,
                        el: this
                    },
                    kb = d.p.colModel[a].sortable,
                    "boolean" != typeof kb && (d.p.colModel[a].sortable = !0, kb = !0);
                    var c = d.p.colModel[a].name;
                    "cb" !== c && "subgrid" !== c && "rn" !== c && d.p.viewsortcols[2] && $(">div", this).addClass("ui-jqgrid-sortable"),
                    kb && (d.p.multiSort ? d.p.viewsortcols[0] ? ($("div span.s-ico", this).show(), d.p.colModel[a].lso && $("div span.ui-icon-" + d.p.colModel[a].lso, this).removeClass(m).css("display", "")) : d.p.colModel[a].lso && ($("div span.s-ico", this).show(), $("div span.ui-icon-" + d.p.colModel[a].lso, this).removeClass(m).css("display", "")) : d.p.viewsortcols[0] ? ($("div span.s-ico", this).show(), a === d.p.lastsort && $("div span.ui-icon-" + d.p.sortorder, this).removeClass(m).css("display", "")) : a === d.p.lastsort && "" !== d.p.sortname && ($("div span.s-ico", this).show(), $("div span.ui-icon-" + d.p.sortorder, this).removeClass(m).css("display", ""))),
                    d.p.footerrow && (rb += "<td role='gridcell' " + z(a, 0, "", null, "", !1) + ">&#160;</td>")
                }).mousedown(function(a) {
                    if (1 === $(a.target).closest("th>span.ui-jqgrid-resize").length) {
                        var b = Z(this);
                        return d.p.forceFit === !0 && (d.p.nv = X(b)),
                        e.dragStart(b, a, Y(b)),
                        !1
                    }
                }).click(function(a) {
                    if (d.p.disableClick) return d.p.disableClick = !1,
                    !1;
                    var b, c, e = "th>div.ui-jqgrid-sortable";
                    d.p.viewsortcols[2] || (e = "th>div>span>span.ui-grid-ico-sort");
                    var f = $(a.target).closest(e);
                    if (1 === f.length) {
                        var g;
                        if (d.p.frozenColumns) {
                            var h = $(this)[0].id.substring(d.p.id.length + 1);
                            $(d.p.colModel).each(function(a) {
                                return this.name === h ? (g = a, !1) : void 0
                            })
                        } else g = Z(this);
                        return d.p.viewsortcols[2] || (b = !0, c = f.attr("sort")),
                        null != g && V($("div", this)[0].id, g, b, c, this),
                        !1
                    }
                }), d.p.sortable && $.fn.sortable) try {
                    $(d).jqGrid("sortableColumns", sb)
                } catch(ub) {}
                d.p.footerrow && (rb += "</tr></tbody></table>"),
                tb += "</tr>",
                hb = document.createElement("tbody"),
                this.appendChild(hb),
                $(this).addClass(k(l, "rowTable", !0, "ui-jqgrid-btable ui-common-table")).append(tb),
                tb = null;
                var vb = $("<table " + k(l, "headerTable", !1, "ui-jqgrid-htable ui-common-table") + " style='width:" + d.p.tblwidth + "px' role='presentation' aria-labelledby='gbox_" + this.id + "'></table>").append(jb),
                wb = d.p.caption && d.p.hiddengrid === !0 ? !0 : !1,
                xb = $("<div class='ui-jqgrid-hbox" + ("rtl" === h ? "-rtl": "") + "'></div>");
                jb = null,
                e.hDiv = document.createElement("div"),
                e.hDiv.style.width = e.width + "px",
                e.hDiv.className = k(l, "headerDiv", !0, "ui-jqgrid-hdiv"),
                $(e.hDiv).append(xb),
                $(xb).append(vb),
                vb = null,
                wb && $(e.hDiv).hide(),
                d.p.pager && ("string" == typeof d.p.pager ? "#" !== d.p.pager.substr(0, 1) && (d.p.pager = "#" + d.p.pager) : d.p.pager = "#" + $(d.p.pager).attr("id"), $(d.p.pager).css({
                    width: e.width + "px"
                }).addClass(k(l, "pagerBox", !0, "ui-jqgrid-pager")).appendTo(v), wb && $(d.p.pager).hide(), T(d.p.pager, "")),
                d.p.cellEdit === !1 && d.p.hoverrows === !0 && $(d).bind("mouseover",
                function(a) {
                    gb = $(a.target).closest("tr.jqgrow"),
                    "ui-subgrid" !== $(gb).attr("class") && $(gb).addClass(o)
                }).bind("mouseout",
                function(a) {
                    gb = $(a.target).closest("tr.jqgrow"),
                    $(gb).removeClass(o)
                });
                var yb, zb, Ab;
                $(d).before(e.hDiv).click(function(a) {
                    if (fb = a.target, gb = $(fb, d.rows).closest("tr.jqgrow"), 0 === $(gb).length || gb[0].className.indexOf(m) > -1 || ($(fb, d).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== d.id) return this;
                    var b = $(fb).hasClass("cbox"),
                    c = $(d).triggerHandler("jqGridBeforeSelectRow", [gb[0].id, a]);
                    if (c = c === !1 || "stop" === c ? !1 : !0, $.isFunction(d.p.beforeSelectRow)) {
                        var e = d.p.beforeSelectRow.call(d, gb[0].id, a); (e === !1 || "stop" === e) && (c = !1)
                    }
                    if ("A" !== fb.tagName && ("INPUT" !== fb.tagName && "TEXTAREA" !== fb.tagName && "OPTION" !== fb.tagName && "SELECT" !== fb.tagName || b)) {
                        if (yb = gb[0].id, fb = $(fb).closest("tr.jqgrow>td"), fb.length > 0 && (zb = $.jgrid.getCellIndex(fb), Ab = $(fb).closest("td,th").html(), $(d).triggerHandler("jqGridCellSelect", [yb, zb, Ab, a]), $.isFunction(d.p.onCellSelect) && d.p.onCellSelect.call(d, yb, zb, Ab, a)), d.p.cellEdit === !0) if (d.p.multiselect && b && c) $(d).jqGrid("setSelection", yb, !0, a);
                        else if (fb.length > 0) {
                            yb = gb[0].rowIndex;
                            try {
                                $(d).jqGrid("editCell", yb, zb, !0)
                            } catch(f) {}
                        }
                        if (c) if (d.p.multikey) a[d.p.multikey] ? $(d).jqGrid("setSelection", yb, !0, a) : d.p.multiselect && b && (b = $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + yb).is(":checked"), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + yb)[d.p.useProp ? "prop": "attr"]("checked", !b));
                        else if (d.p.multiselect && d.p.multiboxonly) if (b) $(d).jqGrid("setSelection", yb, !0, a);
                        else {
                            var g = d.p.frozenColumns ? d.p.id + "_frozen": "";
                            $(d.p.selarrrow).each(function(a, b) {
                                var c = $(d).jqGrid("getGridRowById", b);
                                c && $(c).removeClass(n),
                                $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b))[d.p.useProp ? "prop": "attr"]("checked", !1),
                                g && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(g)).removeClass(n), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(g))[d.p.useProp ? "prop": "attr"]("checked", !1))
                            }),
                            d.p.selarrrow = [],
                            $(d).jqGrid("setSelection", yb, !0, a)
                        } else $(d).jqGrid("setSelection", yb, !0, a)
                    }
                }).bind("reloadGrid",
                function(a, b) {
                    if (d.p.treeGrid === !0 && (d.p.datatype = d.p.treedatatype), b = b || {},
                    b.current && d.grid.selectionPreserver(d), "local" === d.p.datatype ? ($(d).jqGrid("resetSelection"), d.p.data.length && (I(), J())) : d.p.treeGrid || (d.p.selrow = null, d.p.multiselect && (d.p.selarrrow = [], S(!1)), d.p.savedRow = []), d.p.scroll && H.call(d, !0, !1), b.page) {
                        var c = b.page;
                        c > d.p.lastpage && (c = d.p.lastpage),
                        1 > c && (c = 1),
                        d.p.page = c,
                        d.grid.bDiv.scrollTop = d.grid.prevRowHeight ? (c - 1) * d.grid.prevRowHeight * d.p.rowNum: 0
                    }
                    return d.grid.prevRowHeight && d.p.scroll && void 0 === b.page ? (delete d.p.lastpage, d.grid.populateVisible()) : d.grid.populate(),
                    d.p.inlineNav === !0 && $(d).jqGrid("showAddEditButtons"),
                    !1
                }).dblclick(function(a) {
                    if (fb = a.target, gb = $(fb, d.rows).closest("tr.jqgrow"), 0 !== $(gb).length) {
                        yb = gb[0].rowIndex,
                        zb = $.jgrid.getCellIndex(fb);
                        var b = $(d).triggerHandler("jqGridDblClickRow", [$(gb).attr("id"), yb, zb, a]);
                        return null != b ? b: $.isFunction(d.p.ondblClickRow) && (b = d.p.ondblClickRow.call(d, $(gb).attr("id"), yb, zb, a), null != b) ? b: void 0
                    }
                }).bind("contextmenu",
                function(a) {
                    if (fb = a.target, gb = $(fb, d.rows).closest("tr.jqgrow"), 0 !== $(gb).length) {
                        d.p.multiselect || $(d).jqGrid("setSelection", gb[0].id, !0, a),
                        yb = gb[0].rowIndex,
                        zb = $.jgrid.getCellIndex(fb);
                        var b = $(d).triggerHandler("jqGridRightClickRow", [$(gb).attr("id"), yb, zb, a]);
                        return null != b ? b: $.isFunction(d.p.onRightClickRow) && (b = d.p.onRightClickRow.call(d, $(gb).attr("id"), yb, zb, a), null != b) ? b: void 0
                    }
                }),
                e.bDiv = document.createElement("div"),
                r && "auto" === String(d.p.height).toLowerCase() && (d.p.height = "100%"),
                $(e.bDiv).append($('<div style="position:relative;"></div>').append("<div></div>").append(this)).addClass("ui-jqgrid-bdiv").css({
                    height: d.p.height + (isNaN(d.p.height) ? "": "px"),
                    width: e.width + "px"
                }).scroll(e.scrollGrid),
                $("table:first", e.bDiv).css({
                    width: d.p.tblwidth + "px"
                }),
                $.support.tbody || 2 === $("tbody", this).length && $("tbody:gt(0)", this).remove(),
                d.p.multikey && ($.jgrid.msie ? $(e.bDiv).bind("selectstart",
                function() {
                    return ! 1
                }) : $(e.bDiv).bind("mousedown",
                function() {
                    return ! 1
                })),
                wb && $(e.bDiv).hide();
                var Bb = q + " " + k(l, "icon_caption_open", !0),
                Cb = q + " " + k(l, "icon_caption_close", !0);
                e.cDiv = document.createElement("div");
                var Db = d.p.hidegrid === !0 ? $("<a role='link' class='ui-jqgrid-titlebar-close HeaderButton " + p + "' title='" + ($.jgrid.getRegional(d, "defaults.showhide", d.p.showhide) || "") + "' />").hover(function() {
                    Db.addClass(o)
                },
                function() {
                    Db.removeClass(o)
                }).append("<span class='ui-jqgrid-headlink " + Bb + "'></span>").css("rtl" === h ? "left": "right", "0px") : "";
                if ($(e.cDiv).append(Db).append("<span class='ui-jqgrid-title'>" + d.p.caption + "</span>").addClass("ui-jqgrid-titlebar ui-jqgrid-caption" + ("rtl" === h ? "-rtl": "") + " " + k(l, "gridtitleBox", !0)), $(e.cDiv).insertBefore(e.hDiv), d.p.toolbar[0]) {
                    var Eb = k(l, "customtoolbarBox", !0, "ui-userdata");
                    e.uDiv = document.createElement("div"),
                    "top" === d.p.toolbar[1] ? $(e.uDiv).insertBefore(e.hDiv) : "bottom" === d.p.toolbar[1] && $(e.uDiv).insertAfter(e.hDiv),
                    "both" === d.p.toolbar[1] ? (e.ubDiv = document.createElement("div"), $(e.uDiv).addClass(Eb + " ui-userdata-top").attr("id", "t_" + this.id).insertBefore(e.hDiv).width(e.width), $(e.ubDiv).addClass(Eb + " ui-userdata-bottom").attr("id", "tb_" + this.id).insertAfter(e.hDiv).width(e.width), wb && $(e.ubDiv).hide()) : $(e.uDiv).width(e.width).addClass(Eb + " ui-userdata-top").attr("id", "t_" + this.id),
                    wb && $(e.uDiv).hide()
                }
                if (d.p.toppager && (d.p.toppager = $.jgrid.jqID(d.p.id) + "_toppager", e.topDiv = $("<div id='" + d.p.toppager + "'></div>")[0], d.p.toppager = "#" + d.p.toppager, $(e.topDiv).addClass(k(l, "toppagerBox", !0, "ui-jqgrid-toppager")).width(e.width).insertBefore(e.hDiv), T(d.p.toppager, "_t")), d.p.footerrow && (e.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0], xb = $("<div class='ui-jqgrid-hbox" + ("rtl" === h ? "-rtl": "") + "'></div>"), $(e.sDiv).append(xb).width(e.width).insertAfter(e.hDiv), $(xb).append(rb), e.footers = $(".ui-jqgrid-ftable", e.sDiv)[0].rows[0].cells, d.p.rownumbers && (e.footers[0].className = k(l, "rownumBox", !0, "jqgrid-rownum")), wb && $(e.sDiv).hide()), xb = null, d.p.caption) {
                    var Fb = d.p.datatype;
                    d.p.hidegrid === !0 && ($(".ui-jqgrid-titlebar-close", e.cDiv).click(function(a) {
                        var b, c = $.isFunction(d.p.onHeaderClick),
                        f = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-toppager, .ui-jqgrid-pager, .ui-jqgrid-sdiv",
                        g = this;
                        return d.p.toolbar[0] === !0 && ("both" === d.p.toolbar[1] && (f += ", #" + $(e.ubDiv).attr("id")), f += ", #" + $(e.uDiv).attr("id")),
                        b = $(f, "#gview_" + $.jgrid.jqID(d.p.id)).length,
                        "visible" === d.p.gridstate ? $(f, "#gbox_" + $.jgrid.jqID(d.p.id)).slideUp("fast",
                        function() {
                            b--,
                            0 === b && ($("span", g).removeClass(Bb).addClass(Cb), d.p.gridstate = "hidden", $("#gbox_" + $.jgrid.jqID(d.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(d.p.id)).hide(), $(d).triggerHandler("jqGridHeaderClick", [d.p.gridstate, a]), c && (wb || d.p.onHeaderClick.call(d, d.p.gridstate, a)))
                        }) : "hidden" === d.p.gridstate && $(f, "#gbox_" + $.jgrid.jqID(d.p.id)).slideDown("fast",
                        function() {
                            b--,
                            0 === b && ($("span", g).removeClass(Cb).addClass(Bb), wb && (d.p.datatype = Fb, R(), wb = !1), d.p.gridstate = "visible", $("#gbox_" + $.jgrid.jqID(d.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(d.p.id)).show(), $(d).triggerHandler("jqGridHeaderClick", [d.p.gridstate, a]), c && (wb || d.p.onHeaderClick.call(d, d.p.gridstate, a)))
                        }),
                        !1
                    }), wb && (d.p.datatype = "local", $(".ui-jqgrid-titlebar-close", e.cDiv).trigger("click")))
                } else $(e.cDiv).hide(),
                d.p.toppager || $(e.hDiv).addClass(k(d.p.styleUI + ".common", "cornertop", !0));
                if ($(e.hDiv).after(e.bDiv).mousemove(function(a) {
                    return e.resizing ? (e.dragMove(a), !1) : void 0
                }), $(".ui-jqgrid-labels", e.hDiv).bind("selectstart",
                function() {
                    return ! 1
                }), $(document).bind("mouseup.jqGrid" + d.p.id,
                function() {
                    return e.resizing ? (e.dragEnd(!0), !1) : !0
                }), d.formatCol = z, d.sortData = V, d.updatepager = O, d.refreshIndex = J, d.setHeadCheckBox = S, d.constructTr = K, d.formatter = function(a, b, c, d, e) {
                    return B(a, b, c, d, e)
                },
                $.extend(e, {
                    populate: R,
                    emptyRows: H,
                    beginReq: P,
                    endReq: Q
                }), this.grid = e, d.addXmlData = function(a) {
                    L(a)
                },
                d.addJSONData = function(a) {
                    M(a)
                },
                this.grid.cols = this.rows[0].cells, $(d).triggerHandler("jqGridInitGrid"), $.isFunction(d.p.onInitGrid) && d.p.onInitGrid.call(d), R(), d.p.hiddengrid = !1, d.p.responsive) {
                    var Gb = "onorientationchange" in window,
                    Hb = Gb ? "orientationchange": "resize";
                    $(window).on(Hb,
                    function() {
                        $(d).jqGrid("resizeGrid")
                    })
                }
            }
        })
    },
    $.jgrid.extend({
        getGridParam: function(a, b) {
            var c, d = this[0];
            if (d && d.grid) {
                if (void 0 === b && "string" != typeof b && (b = "jqGrid"), c = d.p, "jqGrid" !== b) try {
                    c = $(d).data(b)
                } catch(e) {
                    c = d.p
                }
                return a ? void 0 !== c[a] ? c[a] : null: c
            }
        },
        setGridParam: function(a, b) {
            return this.each(function() {
                if (null == b && (b = !1), this.grid && "object" == typeof a) if (b === !0) {
                    var c = $.extend({},
                    this.p, a);
                    this.p = c
                } else $.extend(!0, this.p, a)
            })
        },
        getGridRowById: function(a) {
            var b;
            return this.each(function() {
                try {
                    for (var c = this.rows.length; c--;) if (a.toString() === this.rows[c].id) {
                        b = this.rows[c];
                        break
                    }
                } catch(d) {
                    b = $(this.grid.bDiv).find("#" + $.jgrid.jqID(a))
                }
            }),
            b
        },
        getDataIDs: function() {
            var a, b = [],
            c = 0,
            d = 0;
            return this.each(function() {
                if (a = this.rows.length, a && a > 0) for (; a > c;) $(this.rows[c]).hasClass("jqgrow") && (b[d] = this.rows[c].id, d++),
                c++
            }),
            b
        },
        setSelection: function(a, b, c) {
            return this.each(function() {
                function d(a) {
                    var b = $(l.grid.bDiv)[0].clientHeight,
                    c = $(l.grid.bDiv)[0].scrollTop,
                    d = $(l.rows[a]).position().top,
                    e = l.rows[a].clientHeight;
                    d + e >= b + c ? $(l.grid.bDiv)[0].scrollTop = d - (b + c) + e + c: b + c > d && c > d && ($(l.grid.bDiv)[0].scrollTop = d)
                }
                var e, f, g, h, i, j, k, l = this,
                m = $.jgrid.getMethod("getStyleUI"),
                n = m(l.p.styleUI + ".common", "highlight", !0),
                o = m(l.p.styleUI + ".common", "disabled", !0);
                void 0 !== a && (b = b === !1 ? !1 : !0, f = $(l).jqGrid("getGridRowById", a), !f || !f.className || f.className.indexOf(o) > -1 || (l.p.scrollrows === !0 && (g = $(l).jqGrid("getGridRowById", a).rowIndex, g >= 0 && d(g)), l.p.frozenColumns === !0 && (j = l.p.id + "_frozen"), l.p.multiselect ? (l.setHeadCheckBox(!1), l.p.selrow = f.id, h = $.inArray(l.p.selrow, l.p.selarrrow), -1 === h ? ("ui-subgrid" !== f.className && $(f).addClass(n).attr("aria-selected", "true"), e = !0, l.p.selarrrow.push(l.p.selrow)) : ("ui-subgrid" !== f.className && $(f).removeClass(n).attr("aria-selected", "false"), e = !1, l.p.selarrrow.splice(h, 1), i = l.p.selarrrow[0], l.p.selrow = void 0 === i ? null: i), $("#jqg_" + $.jgrid.jqID(l.p.id) + "_" + $.jgrid.jqID(f.id))[l.p.useProp ? "prop": "attr"]("checked", e), j && ( - 1 === h ? $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass(n) : $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).removeClass(n), $("#jqg_" + $.jgrid.jqID(l.p.id) + "_" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j))[l.p.useProp ? "prop": "attr"]("checked", e)), b && ($(l).triggerHandler("jqGridSelectRow", [f.id, e, c]), l.p.onSelectRow && l.p.onSelectRow.call(l, f.id, e, c))) : "ui-subgrid" !== f.className && (l.p.selrow !== f.id ? (k = $(l).jqGrid("getGridRowById", l.p.selrow), k && $(k).removeClass(n).attr({
                    "aria-selected": "false",
                    tabindex: "-1"
                }), $(f).addClass(n).attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }), j && ($("#" + $.jgrid.jqID(l.p.selrow), "#" + $.jgrid.jqID(j)).removeClass(n), $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass(n)), e = !0) : e = !1, l.p.selrow = f.id, b && ($(l).triggerHandler("jqGridSelectRow", [f.id, e, c]), l.p.onSelectRow && l.p.onSelectRow.call(l, f.id, e, c)))))
            })
        },
        resetSelection: function(a) {
            return this.each(function() {
                var b, c, d = this,
                e = $.jgrid.getMethod("getStyleUI"),
                f = e(d.p.styleUI + ".common", "highlight", !0),
                g = e(d.p.styleUI + ".common", "hover", !0);
                if (d.p.frozenColumns === !0 && (c = d.p.id + "_frozen"), void 0 !== a) {
                    if (b = a === d.p.selrow ? d.p.selrow: a, $("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(b)).removeClass(f).attr("aria-selected", "false"), c && $("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass(f), d.p.multiselect) {
                        $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(d.p.id))[d.p.useProp ? "prop": "attr"]("checked", !1),
                        c && $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop": "attr"]("checked", !1),
                        d.setHeadCheckBox(!1);
                        var h = $.inArray($.jgrid.jqID(b), d.p.selarrrow); - 1 !== h && d.p.selarrrow.splice(h, 1)
                    }
                    d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, b),
                    b = null
                } else d.p.multiselect ? ($(d.p.selarrrow).each(function(a, b) {
                    $($(d).jqGrid("getGridRowById", b)).removeClass(f).attr("aria-selected", "false"),
                    $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b))[d.p.useProp ? "prop": "attr"]("checked", !1),
                    c && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass(f), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop": "attr"]("checked", !1)),
                    d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, b)
                }), d.setHeadCheckBox(!1), d.p.selarrrow = [], d.p.selrow = null) : d.p.selrow && ($("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(d.p.selrow)).removeClass(f).attr("aria-selected", "false"), c && $("#" + $.jgrid.jqID(d.p.selrow), "#" + $.jgrid.jqID(c)).removeClass(f), d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, d.p.selrow), d.p.selrow = null);
                d.p.cellEdit === !0 && parseInt(d.p.iCol, 10) >= 0 && parseInt(d.p.iRow, 10) >= 0 && ($("td:eq(" + d.p.iCol + ")", d.rows[d.p.iRow]).removeClass("edit-cell " + f), $(d.rows[d.p.iRow]).removeClass("selected-row " + g)),
                d.p.savedRow = []
            })
        },
        getRowData: function(a, b) {
            var c, d, e = {},
            f = !1,
            g = 0;
            return this.each(function() {
                var h, i, j = this;
                if (null == a) f = !0,
                c = [],
                d = j.rows.length;
                else {
                    if (i = $(j).jqGrid("getGridRowById", a), !i) return e;
                    d = 2
                }
                for (b && b === !0 && j.p.data.length > 0 || (b = !1); d > g;) f && (i = j.rows[g]),
                $(i).hasClass("jqgrow") && (b ? e = j.p.data[j.p._index[i.id]] : $('td[role="gridcell"]', i).each(function(a) {
                    if (h = j.p.colModel[a].name, "cb" !== h && "subgrid" !== h && "rn" !== h) if (j.p.treeGrid === !0 && h === j.p.ExpandColumn) e[h] = $.jgrid.htmlDecode($("span:first", this).html());
                    else try {
                        e[h] = $.unformat.call(j, this, {
                            rowId: i.id,
                            colModel: j.p.colModel[a]
                        },
                        a)
                    } catch(b) {
                        e[h] = $.jgrid.htmlDecode($(this).html())
                    }
                }), f && (c.push(e), e = {})),
                g++
            }),
            c || e
        },
        delRowData: function(a) {
            var b, c, d, e = !1;
            return this.each(function() {
                var f = this;
                if (b = $(f).jqGrid("getGridRowById", a), !b) return ! 1;
                if (f.p.subGrid && (d = $(b).next(), d.hasClass("ui-subgrid") && d.remove()), $(b).remove(), f.p.records--, f.p.reccount--, f.updatepager(!0, !1), e = !0, f.p.multiselect && (c = $.inArray(a, f.p.selarrrow), -1 !== c && f.p.selarrrow.splice(c, 1)), f.p.selrow = f.p.multiselect && f.p.selarrrow.length > 0 ? f.p.selarrrow[f.p.selarrrow.length - 1] : null, "local" === f.p.datatype) {
                    var g = $.jgrid.stripPref(f.p.idPrefix, a),
                    h = f.p._index[g];
                    void 0 !== h && (f.p.data.splice(h, 1), f.refreshIndex())
                }
                if (f.p.altRows === !0 && e) {
                    var i = f.p.altclass;
                    $(f.rows).each(function(a) {
                        a % 2 === 1 ? $(this).addClass(i) : $(this).removeClass(i)
                    })
                }
            }),
            e
        },
        setRowData: function(a, b, c) {
            var d, e, f = !0;
            return this.each(function() {
                if (!this.grid) return ! 1;
                var g, h, i = this,
                j = typeof c,
                k = {};
                if (h = $(this).jqGrid("getGridRowById", a), !h) return ! 1;
                if (b) try {
                    if ($(this.p.colModel).each(function(c) {
                        d = this.name;
                        var f = $.jgrid.getAccessor(b, d);
                        void 0 !== f && (k[d] = this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? $.unformat.date.call(i, f, this) : f, g = i.formatter(a, k[d], c, b, "edit"), e = this.title ? {
                            title: $.jgrid.stripHtml(g)
                        }: {},
                        i.p.treeGrid === !0 && d === i.p.ExpandColumn ? $("td[role='gridcell']:eq(" + c + ") > span:first", h).html(g).attr(e) : $("td[role='gridcell']:eq(" + c + ")", h).html(g).attr(e))
                    }), "local" === i.p.datatype) {
                        var l, m = $.jgrid.stripPref(i.p.idPrefix, a),
                        n = i.p._index[m];
                        if (i.p.treeGrid) for (l in i.p.treeReader) i.p.treeReader.hasOwnProperty(l) && delete k[i.p.treeReader[l]];
                        void 0 !== n && (i.p.data[n] = $.extend(!0, i.p.data[n], k)),
                        k = null
                    }
                } catch(o) {
                    f = !1
                }
                f && ("string" === j ? $(h).addClass(c) : null !== c && "object" === j && $(h).css(c), $(i).triggerHandler("jqGridAfterGridComplete"))
            }),
            f
        },
        addRowData: function(a, b, c, d) { - 1 == ["first", "last", "before", "after"].indexOf(c) && (c = "last");
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = !1,
            t = "",
            u = "",
            v = "";
            return b && ($.isArray(b) ? (m = !0, n = a) : (b = [b], m = !1), this.each(function() {
                var w = this,
                x = b.length;
                i = w.p.rownumbers === !0 ? 1 : 0,
                g = w.p.multiselect === !0 ? 1 : 0,
                h = w.p.subGrid === !0 ? 1 : 0,
                m || (void 0 !== a ? a = String(a) : (a = $.jgrid.randId(), w.p.keyName !== !1 && (n = w.p.keyName, void 0 !== b[0][n] && (a = b[0][n])))),
                o = w.p.altclass;
                var y, z = 0,
                A = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "rowBox", !0, "jqgrow ui-row-" + w.p.direction),
                B = {},
                C = $.isFunction(w.p.afterInsertRow) ? !0 : !1;
                for (i && (t = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "rownumBox", !1, "jqgrid-rownum")), g && (u = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "multiBox", !1, "cbox")); x > z;) {
                    if (p = b[z], f = [], y = A, m) {
                        try {
                            a = p[n],
                            void 0 === a && (a = $.jgrid.randId())
                        } catch(D) {
                            a = $.jgrid.randId()
                        }
                        y += w.p.altRows === !0 && (w.rows.length - 1) % 2 === 0 ? " " + o: ""
                    }
                    for (r = a, a = w.p.idPrefix + a, i && (v = w.formatCol(0, 1, "", null, a, !0), f[f.length] = '<td role="gridcell" ' + t + " " + v + ">0</td>"), g && (l = '<input role="checkbox" type="checkbox" id="jqg_' + w.p.id + "_" + a + '" ' + u + "/>", v = w.formatCol(i, 1, "", null, a, !0), f[f.length] = '<td role="gridcell" ' + v + ">" + l + "</td>"), h && (f[f.length] = $(w).jqGrid("addSubGridCell", g + i, 1)), k = g + h + i; k < w.p.colModel.length; k++) q = w.p.colModel[k],
                    e = q.name,
                    B[e] = p[e],
                    l = w.formatter(a, $.jgrid.getAccessor(p, e), k, p),
                    v = w.formatCol(k, 1, l, p, a, B),
                    f[f.length] = '<td role="gridcell" ' + v + ">" + l + "</td>";
                    if (f.unshift(w.constructTr(a, !1, y, B, p)), f[f.length] = "</tr>", 0 === w.rows.length) $("table:first", w.grid.bDiv).append(f.join(""));
                    else switch (c) {
                    case "last":
                        $(w.rows[w.rows.length - 1]).after(f.join("")),
                        j = w.rows.length - 1;
                        break;
                    case "first":
                        $(w.rows[0]).after(f.join("")),
                        j = 1;
                        break;
                    case "after":
                        j = $(w).jqGrid("getGridRowById", d),
                        j && ($(w.rows[j.rowIndex + 1]).hasClass("ui-subgrid") ? $(w.rows[j.rowIndex + 1]).after(f) : $(j).after(f.join("")), j = j.rowIndex + 1);
                        break;
                    case "before":
                        j = $(w).jqGrid("getGridRowById", d),
                        j && ($(j).before(f.join("")), j = j.rowIndex - 1)
                    }
                    w.p.subGrid === !0 && $(w).jqGrid("addSubGrid", g + i, j),
                    w.p.records++,
                    w.p.reccount++,
                    $(w).triggerHandler("jqGridAfterInsertRow", [a, p, p]),
                    C && w.p.afterInsertRow.call(w, a, p, p),
                    z++,
                    "local" === w.p.datatype && (B[w.p.localReader.id] = r, w.p._index[r] = w.p.data.length, w.p.data.push(B), B = {})
                }
                w.p.altRows !== !0 || m || ("last" === c ? (w.rows.length - 1) % 2 === 0 && $(w.rows[w.rows.length - 1]).addClass(o) : $(w.rows).each(function(a) {
                    a % 2 === 0 ? $(this).addClass(o) : $(this).removeClass(o)
                })),
                w.updatepager(!0, !0),
                s = !0
            })),
            s
        },
        footerData: function(a, b, c) {
            function d(a) {
                var b;
                for (b in a) if (a.hasOwnProperty(b)) return ! 1;
                return ! 0
            }
            var e, f, g = !1,
            h = {};
            return void 0 === a && (a = "get"),
            "boolean" != typeof c && (c = !0),
            a = a.toLowerCase(),
            this.each(function() {
                var i, j = this;
                return j.grid && j.p.footerrow ? "set" === a && d(b) ? !1 : (g = !0, void $(this.p.colModel).each(function(d) {
                    e = this.name,
                    "set" === a ? void 0 !== b[e] && (i = c ? j.formatter("", b[e], d, b, "edit") : b[e], f = this.title ? {
                        title: $.jgrid.stripHtml(i)
                    }: {},
                    $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html(i).attr(f), g = !0) : "get" === a && (h[e] = $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html())
                })) : !1
            }),
            "get" === a ? h: g
        },
        showHideCol: function(a, b) {
            return this.each(function() {
                var c, d = this,
                e = !1,
                f = $.jgrid.cell_width ? 0 : d.p.cellLayout;
                if (d.grid) {
                    "string" == typeof a && (a = [a]),
                    b = "none" !== b ? "": "none";
                    var g = "" === b ? !0 : !1,
                    h = d.p.groupHeader && ($.isArray(d.p.groupHeader) || $.isFunction(d.p.groupHeader));
                    if (h && $(d).jqGrid("destroyGroupHeader", !1), $(this.p.colModel).each(function(h) {
                        if ( - 1 !== $.inArray(this.name, a) && this.hidden === g) {
                            if (d.p.frozenColumns === !0 && this.frozen === !0) return ! 0;
                            $("tr[role=row]", d.grid.hDiv).each(function() {
                                $(this.cells[h]).css("display", b)
                            }),
                            $(d.rows).each(function() {
                                $(this).hasClass("jqgroup") || $(this.cells[h]).css("display", b)
                            }),
                            d.p.footerrow && $("tr.footrow td:eq(" + h + ")", d.grid.sDiv).css("display", b),
                            c = parseInt(this.width, 10),
                            "none" === b ? d.p.tblwidth -= c + f: d.p.tblwidth += c + f,
                            this.hidden = !g,
                            e = !0,
                            $(d).triggerHandler("jqGridShowHideCol", [g, this.name, h])
                        }
                    }), e === !0 && (d.p.shrinkToFit !== !0 || isNaN(d.p.height) || (d.p.tblwidth += parseInt(d.p.scrollOffset, 10)), $(d).jqGrid("setGridWidth", d.p.shrinkToFit === !0 ? d.p.tblwidth: d.p.width)), h) {
                        var i = $.extend([], d.p.groupHeader);
                        d.p.groupHeader = null;
                        for (var j = 0; j < i.length; j++) $(d).jqGrid("setGroupHeaders", i[j])
                    }
                }
            })
        },
        hideCol: function(a) {
            return this.each(function() {
                $(this).jqGrid("showHideCol", a, "none")
            })
        },
        showCol: function(a) {
            return this.each(function() {
                $(this).jqGrid("showHideCol", a, "")
            })
        },
        remapColumns: function(a, b, c) {
            function d(b) {
                var c;
                c = b.length ? $.makeArray(b) : $.extend({},
                b),
                $.each(a,
                function(a) {
                    b[a] = c[this]
                })
            }
            function e(b, c) {
                $(">tr" + (c || ""), b).each(function() {
                    var b = this,
                    c = $.makeArray(b.cells);
                    $.each(a,
                    function() {
                        var a = c[this];
                        a && b.appendChild(a)
                    })
                })
            }
            var f = this.get(0);
            d(f.p.colModel),
            d(f.p.colNames),
            d(f.grid.headers),
            e($("thead:first", f.grid.hDiv), c && ":not(.ui-jqgrid-labels)"),
            b && e($("#" + $.jgrid.jqID(f.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot"),
            f.p.footerrow && e($("tbody:first", f.grid.sDiv)),
            f.p.remapColumns && (f.p.remapColumns.length ? d(f.p.remapColumns) : f.p.remapColumns = $.makeArray(a)),
            f.p.lastsort = $.inArray(f.p.lastsort, a),
            f.p.treeGrid && (f.p.expColInd = $.inArray(f.p.expColInd, a)),
            $(f).triggerHandler("jqGridRemapColumns", [a, b, c])
        },
        setGridWidth: function(a, b) {
            return this.each(function() {
                if (this.grid) {
                    var c, d, e, f, g = this,
                    h = 0,
                    i = $.jgrid.cell_width ? 0 : g.p.cellLayout,
                    j = 0,
                    k = !1,
                    l = g.p.scrollOffset,
                    m = 0;
                    if ("boolean" != typeof b && (b = g.p.shrinkToFit), !isNaN(a)) {
                        if (a = parseInt(a, 10), g.grid.width = g.p.width = a, $("#gbox_" + $.jgrid.jqID(g.p.id)).css("width", a + "px"), $("#gview_" + $.jgrid.jqID(g.p.id)).css("width", a + "px"), $(g.grid.bDiv).css("width", a + "px"), $(g.grid.hDiv).css("width", a + "px"), g.p.pager && $(g.p.pager).css("width", a + "px"), g.p.toppager && $(g.p.toppager).css("width", a + "px"), g.p.toolbar[0] === !0 && ($(g.grid.uDiv).css("width", a + "px"), "both" === g.p.toolbar[1] && $(g.grid.ubDiv).css("width", a + "px")), g.p.footerrow && $(g.grid.sDiv).css("width", a + "px"), b === !1 && g.p.forceFit === !0 && (g.p.forceFit = !1), b === !0) {
                            if ($.each(g.p.colModel,
                            function() {
                                this.hidden === !1 && (c = this.widthOrg, h += c + i, this.fixed ? m += c + i: j++)
                            }), 0 === j) return;
                            g.p.tblwidth = h,
                            e = a - i * j - m,
                            isNaN(g.p.height) || ($(g.grid.bDiv)[0].clientHeight < $(g.grid.bDiv)[0].scrollHeight || 1 === g.rows.length) && (k = !0, e -= l),
                            h = 0;
                            var n = g.grid.cols.length > 0;
                            if ($.each(g.p.colModel,
                            function(a) {
                                if (this.hidden === !1 && !this.fixed) {
                                    if (c = this.widthOrg, c = Math.round(e * c / (g.p.tblwidth - i * j - m)), 0 > c) return;
                                    this.width = c,
                                    h += c,
                                    g.grid.headers[a].width = c,
                                    g.grid.headers[a].el.style.width = c + "px",
                                    g.p.footerrow && (g.grid.footers[a].style.width = c + "px"),
                                    n && (g.grid.cols[a].style.width = c + "px"),
                                    d = a
                                }
                            }), !d) return;
                            if (f = 0, k ? a - m - (h + i * j) !== l && (f = a - m - (h + i * j) - l) : 1 !== Math.abs(a - m - (h + i * j)) && (f = a - m - (h + i * j)), g.p.colModel[d].width += f, g.p.tblwidth = h + f + i * j + m, g.p.tblwidth > a) {
                                var o = g.p.tblwidth - parseInt(a, 10);
                                g.p.tblwidth = a,
                                c = g.p.colModel[d].width = g.p.colModel[d].width - o
                            } else c = g.p.colModel[d].width;
                            g.grid.headers[d].width = c,
                            g.grid.headers[d].el.style.width = c + "px",
                            n && (g.grid.cols[d].style.width = c + "px"),
                            g.p.footerrow && (g.grid.footers[d].style.width = c + "px")
                        }
                        g.p.tblwidth && ($("table:first", g.grid.bDiv).css("width", g.p.tblwidth + "px"), $("table:first", g.grid.hDiv).css("width", g.p.tblwidth + "px"), g.grid.hDiv.scrollLeft = g.grid.bDiv.scrollLeft, g.p.footerrow && $("table:first", g.grid.sDiv).css("width", g.p.tblwidth + "px"))
                    }
                }
            })
        },
        setGridHeight: function(a) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    var c = $(b.grid.bDiv);
                    c.css({
                        height: a + (isNaN(a) ? "": "px")
                    }),
                    b.p.frozenColumns === !0 && $("#" + $.jgrid.jqID(b.p.id) + "_frozen").parent().height(c.height() - 16),
                    b.p.height = a,
                    b.p.scroll && b.grid.populateVisible()
                }
            })
        },
        setCaption: function(a) {
            return this.each(function() {
                var b = $(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "cornertop", !0);
                this.p.caption = a,
                $(".ui-jqgrid-title, .ui-jqgrid-title-rtl", this.grid.cDiv).html(a),
                $(this.grid.cDiv).show(),
                $(this.grid.hDiv).removeClass(b)
            })
        },
        setLabel: function(a, b, c, d) {
            return this.each(function() {
                var e = this,
                f = -1;
                if (e.grid && void 0 !== a && ($(e.p.colModel).each(function(b) {
                    return this.name === a ? (f = b, !1) : void 0
                }), f >= 0)) {
                    var g = $("tr.ui-jqgrid-labels th:eq(" + f + ")", e.grid.hDiv);
                    if (b) {
                        var h = $(".s-ico", g);
                        $("[id^=jqgh_]", g).empty().html(b).append(h),
                        e.p.colNames[f] = b
                    }
                    c && ("string" == typeof c ? $(g).addClass(c) : $(g).css(c)),
                    "object" == typeof d && $(g).attr(d)
                }
            })
        },
        setCell: function(a, b, c, d, e, f) {
            return this.each(function() {
                var g, h, i = this,
                j = -1;
                if (i.grid && (isNaN(b) ? $(i.p.colModel).each(function(a) {
                    return this.name === b ? (j = a, !1) : void 0
                }) : j = parseInt(b, 10), j >= 0)) {
                    var k = $(i).jqGrid("getGridRowById", a);
                    if (k) {
                        var l = $("td:eq(" + j + ")", k),
                        m = 0,
                        n = [];
                        if ("" !== c || f === !0) {
                            if (void 0 !== k.cells) for (; m < k.cells.length;) n.push(k.cells[m].innerHTML),
                            m++;
                            if (g = i.formatter(a, c, j, n, "edit"), h = i.p.colModel[j].title ? {
                                title: $.jgrid.stripHtml(g)
                            }: {},
                            i.p.treeGrid && $(".tree-wrap", $(l)).length > 0 ? $("span", $(l)).html(g).attr(h) : $(l).html(g).attr(h), "local" === i.p.datatype) {
                                var o, p = i.p.colModel[j];
                                c = p.formatter && "string" == typeof p.formatter && "date" === p.formatter ? $.unformat.date.call(i, c, p) : c,
                                o = i.p._index[$.jgrid.stripPref(i.p.idPrefix, a)],
                                void 0 !== o && (i.p.data[o][p.name] = c)
                            }
                        }
                        "string" == typeof d ? $(l).addClass(d) : d && $(l).css(d),
                        "object" == typeof e && $(l).attr(e)
                    }
                }
            })
        },
        getCell: function(a, b) {
            var c = !1;
            return this.each(function() {
                var d = this,
                e = -1;
                if (d.grid && (isNaN(b) ? $(d.p.colModel).each(function(a) {
                    return this.name === b ? (e = a, !1) : void 0
                }) : e = parseInt(b, 10), e >= 0)) {
                    var f = $(d).jqGrid("getGridRowById", a);
                    if (f) try {
                        c = $.unformat.call(d, $("td:eq(" + e + ")", f), {
                            rowId: f.id,
                            colModel: d.p.colModel[e]
                        },
                        e)
                    } catch(g) {
                        c = $.jgrid.htmlDecode($("td:eq(" + e + ")", f).html())
                    }
                }
            }),
            c
        },
        getCol: function(a, b, c) {
            var d, e, f, g, h = [],
            i = 0;
            return b = "boolean" != typeof b ? !1 : b,
            void 0 === c && (c = !1),
            this.each(function() {
                var j = this,
                k = -1;
                if (j.grid && (isNaN(a) ? $(j.p.colModel).each(function(b) {
                    return this.name === a ? (k = b, !1) : void 0
                }) : k = parseInt(a, 10), k >= 0)) {
                    var l = j.rows.length,
                    m = 0,
                    n = 0;
                    if (l && l > 0) {
                        for (; l > m;) {
                            if ($(j.rows[m]).hasClass("jqgrow")) {
                                try {
                                    d = $.unformat.call(j, $(j.rows[m].cells[k]), {
                                        rowId: j.rows[m].id,
                                        colModel: j.p.colModel[k]
                                    },
                                    k)
                                } catch(o) {
                                    d = $.jgrid.htmlDecode(j.rows[m].cells[k].innerHTML)
                                }
                                c ? (g = parseFloat(d), isNaN(g) || (i += g, void 0 === f && (f = e = g), e = Math.min(e, g), f = Math.max(f, g), n++)) : h.push(b ? {
                                    id: j.rows[m].id,
                                    value: d
                                }: d)
                            }
                            m++
                        }
                        if (c) switch (c.toLowerCase()) {
                        case "sum":
                            h = i;
                            break;
                        case "avg":
                            h = i / n;
                            break;
                        case "count":
                            h = l - 1;
                            break;
                        case "min":
                            h = e;
                            break;
                        case "max":
                            h = f
                        }
                    }
                }
            }),
            h
        },
        clearGridData: function(a) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    if ("boolean" != typeof a && (a = !1), b.p.deepempty) $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:gt(0)").remove();
                    else {
                        var c = $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:first")[0];
                        $("#" + $.jgrid.jqID(b.p.id) + " tbody:first").empty().append(c)
                    }
                    b.p.footerrow && a && $(".ui-jqgrid-ftable td", b.grid.sDiv).html("&#160;"),
                    b.p.selrow = null,
                    b.p.selarrrow = [],
                    b.p.savedRow = [],
                    b.p.records = 0,
                    b.p.page = 1,
                    b.p.lastpage = 0,
                    b.p.reccount = 0,
                    b.p.data = [],
                    b.p._index = {},
                    b.updatepager(!0, !1)
                }
            })
        },
        getInd: function(a, b) {
            var c, d = !1;
            return this.each(function() {
                c = $(this).jqGrid("getGridRowById", a),
                c && (d = b === !0 ? c: c.rowIndex)
            }),
            d
        },
        bindKeys: function(a) {
            var b = $.extend({
                onEnter: null,
                onSpace: null,
                onLeftKey: null,
                onRightKey: null,
                scrollingRows: !0
            },
            a || {});
            return this.each(function() {
                var a = this;
                $("body").is("[role]") || $("body").attr("role", "application"),
                a.p.scrollrows = b.scrollingRows,
                $(a).keydown(function(c) {
                    var d, e, f, g = $(a).find("tr[tabindex=0]")[0],
                    h = a.p.treeReader.expanded_field;
                    if (g) if (f = a.p._index[$.jgrid.stripPref(a.p.idPrefix, g.id)], 37 === c.keyCode || 38 === c.keyCode || 39 === c.keyCode || 40 === c.keyCode) {
                        if (38 === c.keyCode) {
                            if (e = g.previousSibling, d = "", e) if ($(e).is(":hidden")) {
                                for (; e;) if (e = e.previousSibling, !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                    d = e.id;
                                    break
                                }
                            } else d = e.id;
                            $(a).jqGrid("setSelection", d, !0, c),
                            c.preventDefault()
                        }
                        if (40 === c.keyCode) {
                            if (e = g.nextSibling, d = "", e) if ($(e).is(":hidden")) {
                                for (; e;) if (e = e.nextSibling, !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                    d = e.id;
                                    break
                                }
                            } else d = e.id;
                            $(a).jqGrid("setSelection", d, !0, c),
                            c.preventDefault()
                        }
                        37 === c.keyCode && (a.p.treeGrid && a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"), $(a).triggerHandler("jqGridKeyLeft", [a.p.selrow]), $.isFunction(b.onLeftKey) && b.onLeftKey.call(a, a.p.selrow)),
                        39 === c.keyCode && (a.p.treeGrid && !a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"), $(a).triggerHandler("jqGridKeyRight", [a.p.selrow]), $.isFunction(b.onRightKey) && b.onRightKey.call(a, a.p.selrow))
                    } else 13 === c.keyCode ? ($(a).triggerHandler("jqGridKeyEnter", [a.p.selrow]), $.isFunction(b.onEnter) && b.onEnter.call(a, a.p.selrow)) : 32 === c.keyCode && ($(a).triggerHandler("jqGridKeySpace", [a.p.selrow]), $.isFunction(b.onSpace) && b.onSpace.call(a, a.p.selrow))
                })
            })
        },
        unbindKeys: function() {
            return this.each(function() {
                $(this).unbind("keydown")
            })
        },
        getLocalRow: function(a) {
            var b, c = !1;
            return this.each(function() {
                void 0 !== a && (b = this.p._index[$.jgrid.stripPref(this.p.idPrefix, a)], b >= 0 && (c = this.p.data[b]))
            }),
            c
        },
        progressBar: function(a) {
            return a = $.extend({
                htmlcontent: "",
                method: "hide",
                loadtype: "disable"
            },
            a || {}),
            this.each(function() {
                var b, c, d = "show" === a.method ? !0 : !1,
                e = $("#load_" + $.jgrid.jqID(this.p.id)),
                f = $(window).scrollTop();
                switch ("" !== a.htmlcontent && e.html(a.htmlcontent), a.loadtype) {
                case "disable":
                    break;
                case "enable":
                    e.toggle(d);
                    break;
                case "block":
                    $("#lui_" + $.jgrid.jqID(this.p.id)).toggle(d),
                    e.toggle(d)
                }
                e.is(":visible") && (b = e.offsetParent(), e.css("top", ""), e.offset().top < f && (c = Math.min(10 + f - b.offset().top, b.height() - e.height()), e.css("top", c + "px")))
            })
        },
        getColProp: function(a) {
            var b = {},
            c = this[0];
            if (!c.grid) return ! 1;
            var d, e = c.p.colModel;
            for (d = 0; d < e.length; d++) if (e[d].name === a) {
                b = e[d];
                break
            }
            return b
        },
        setColProp: function(a, b) {
            return this.each(function() {
                if (this.grid && b) {
                    var c, d = this.p.colModel;
                    for (c = 0; c < d.length; c++) if (d[c].name === a) {
                        $.extend(!0, this.p.colModel[c], b);
                        break
                    }
                }
            })
        },
        sortGrid: function(a, b, c) {
            return this.each(function() {
                var d, e = this,
                f = -1,
                g = !1;
                if (e.grid) {
                    for (a || (a = e.p.sortname), d = 0; d < e.p.colModel.length; d++) if (e.p.colModel[d].index === a || e.p.colModel[d].name === a) {
                        f = d,
                        e.p.frozenColumns === !0 && e.p.colModel[d].frozen === !0 && (g = e.grid.fhDiv.find("#" + e.p.id + "_" + a));
                        break
                    }
                    if ( - 1 !== f) {
                        var h = e.p.colModel[f].sortable;
                        g || (g = e.grid.headers[f].el),
                        "boolean" != typeof h && (h = !0),
                        "boolean" != typeof b && (b = !1),
                        h && e.sortData("jqgh_" + e.p.id + "_" + a, f, b, c, g)
                    }
                }
            })
        },
        setGridState: function(a) {
            return this.each(function() {
                if (this.grid) {
                    var b = this,
                    c = $(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_open", !0),
                    d = $(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_close", !0);
                    "hidden" === a ? ($(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + $.jgrid.jqID(b.p.id)).slideUp("fast"), b.p.pager && $(b.p.pager).slideUp("fast"), b.p.toppager && $(b.p.toppager).slideUp("fast"), b.p.toolbar[0] === !0 && ("both" === b.p.toolbar[1] && $(b.grid.ubDiv).slideUp("fast"), $(b.grid.uDiv).slideUp("fast")), b.p.footerrow && $(".ui-jqgrid-sdiv", "#gbox_" + $.jgrid.jqID(b.p.id)).slideUp("fast"), $(".ui-jqgrid-headlink", b.grid.cDiv).removeClass(c).addClass(d), b.p.gridstate = "hidden") : "visible" === a && ($(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + $.jgrid.jqID(b.p.id)).slideDown("fast"), b.p.pager && $(b.p.pager).slideDown("fast"), b.p.toppager && $(b.p.toppager).slideDown("fast"), b.p.toolbar[0] === !0 && ("both" === b.p.toolbar[1] && $(b.grid.ubDiv).slideDown("fast"), $(b.grid.uDiv).slideDown("fast")), b.p.footerrow && $(".ui-jqgrid-sdiv", "#gbox_" + $.jgrid.jqID(b.p.id)).slideDown("fast"), $(".ui-jqgrid-headlink", b.grid.cDiv).removeClass(d).addClass(c), b.p.gridstate = "visible")
                }
            })
        },
        setFrozenColumns: function() {
            return this.each(function() {
                if (this.grid) {
                    var a = this,
                    b = a.p.colModel,
                    c = 0,
                    d = b.length,
                    e = -1,
                    f = !1,
                    g = $(a).jqGrid("getStyleUI", a.p.styleUI + ".base", "headerDiv", !0, "ui-jqgrid-hdiv"),
                    h = $(a).jqGrid("getStyleUI", a.p.styleUI + ".common", "hover", !0);
                    if (a.p.subGrid !== !0 && a.p.treeGrid !== !0 && a.p.cellEdit !== !0 && !a.p.sortable && !a.p.scroll) {
                        for (a.p.rownumbers && c++, a.p.multiselect && c++; d > c && b[c].frozen === !0;) f = !0,
                        e = c,
                        c++;
                        if (e >= 0 && f) {
                            var i = a.p.caption ? $(a.grid.cDiv).outerHeight() : 0,
                            j = $(".ui-jqgrid-htable", "#gview_" + $.jgrid.jqID(a.p.id)).height();
                            a.p.toppager && (i += $(a.grid.topDiv).outerHeight()),
                            a.p.toolbar[0] === !0 && "bottom" !== a.p.toolbar[1] && (i += $(a.grid.uDiv).outerHeight()),
                            a.grid.fhDiv = $('<div style="position:absolute;' + ("rtl" === a.p.direction ? "right:0;": "left:0;") + "top:" + i + "px;height:" + j + 'px;" class="frozen-div ' + g + '"></div>'),
                            a.grid.fbDiv = $('<div style="position:absolute;' + ("rtl" === a.p.direction ? "right:0;": "left:0;") + "top:" + (parseInt(i, 10) + parseInt(j, 10) + 1) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>'),
                            $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fhDiv);
                            var k = $(".ui-jqgrid-htable", "#gview_" + $.jgrid.jqID(a.p.id)).clone(!0);
                            if (a.p.groupHeader) {
                                $("tr.jqg-first-row-header, tr.jqg-third-row-header", k).each(function() {
                                    $("th:gt(" + e + ")", this).remove()
                                });
                                var l, m, n = -1,
                                o = -1;
                                $("tr.jqg-second-row-header th", k).each(function() {
                                    return l = parseInt($(this).attr("colspan"), 10),
                                    m = parseInt($(this).attr("rowspan"), 10),
                                    m && (n++, o++),
                                    l && (n += l, o++),
                                    n === e ? (o = e, !1) : void 0
                                }),
                                n !== e && (o = e),
                                $("tr.jqg-second-row-header", k).each(function() {
                                    $("th:gt(" + o + ")", this).remove()
                                })
                            } else $("tr", k).each(function() {
                                $("th:gt(" + e + ")", this).remove()
                            });
                            if ($(k).width(1), $(a.grid.fhDiv).append(k).mousemove(function(b) {
                                return a.grid.resizing ? (a.grid.dragMove(b), !1) : void 0
                            }), a.p.footerrow) {
                                var p = $(".ui-jqgrid-bdiv", "#gview_" + $.jgrid.jqID(a.p.id)).height();
                                a.grid.fsDiv = $('<div style="position:absolute;left:0px;top:' + (parseInt(i, 10) + parseInt(j, 10) + parseInt(p, 10) + 1) + 'px;" class="frozen-sdiv ui-jqgrid-sdiv"></div>'),
                                $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fsDiv);
                                var q = $(".ui-jqgrid-ftable", "#gview_" + $.jgrid.jqID(a.p.id)).clone(!0);
                                $("tr", q).each(function() {
                                    $("td:gt(" + e + ")", this).remove()
                                }),
                                $(q).width(1),
                                $(a.grid.fsDiv).append(q)
                            }
                            $(a).bind("jqGridResizeStop.setFrozenColumns",
                            function(b, c, d) {
                                var e = $(".ui-jqgrid-htable", a.grid.fhDiv);
                                $("th:eq(" + d + ")", e).width(c);
                                var f = $(".ui-jqgrid-btable", a.grid.fbDiv);
                                if ($("tr:first td:eq(" + d + ")", f).width(c), a.p.footerrow) {
                                    var g = $(".ui-jqgrid-ftable", a.grid.fsDiv);
                                    $("tr:first td:eq(" + d + ")", g).width(c)
                                }
                            }),
                            $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fbDiv),
                            $(a.grid.fbDiv).bind("mousewheel DOMMouseScroll",
                            function(b) {
                                var c = $(a.grid.bDiv).scrollTop();
                                $(a.grid.bDiv).scrollTop(b.originalEvent.wheelDelta > 0 || b.originalEvent.detail < 0 ? c - 25 : c + 25),
                                b.preventDefault()
                            }),
                            a.p.hoverrows === !0 && $("#" + $.jgrid.jqID(a.p.id)).unbind("mouseover").unbind("mouseout"),
                            $(a).bind("jqGridAfterGridComplete.setFrozenColumns",
                            function() {
                                $("#" + $.jgrid.jqID(a.p.id) + "_frozen").remove(),
                                $(a.grid.fbDiv).height($(a.grid.bDiv).height() - 16);
                                var b = $("#" + $.jgrid.jqID(a.p.id)).clone(!0);
                                $("tr[role=row]", b).each(function() {
                                    $("td[role=gridcell]:gt(" + e + ")", this).remove()
                                }),
                                $(b).width(1).attr("id", a.p.id + "_frozen"),
                                $(a.grid.fbDiv).append(b),
                                a.p.hoverrows === !0 && ($("tr.jqgrow", b).hover(function() {
                                    $(this).addClass(h),
                                    $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id)).addClass(h)
                                },
                                function() {
                                    $(this).removeClass(h),
                                    $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id)).removeClass(h)
                                }), $("tr.jqgrow", "#" + $.jgrid.jqID(a.p.id)).hover(function() {
                                    $(this).addClass(h),
                                    $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id) + "_frozen").addClass(h)
                                },
                                function() {
                                    $(this).removeClass(h),
                                    $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id) + "_frozen").removeClass(h)
                                })),
                                b = null
                            }),
                            a.grid.hDiv.loading || $(a).triggerHandler("jqGridAfterGridComplete"),
                            a.p.frozenColumns = !0
                        }
                    }
                }
            })
        },
        destroyFrozenColumns: function() {
            return this.each(function() {
                if (this.grid && this.p.frozenColumns === !0) {
                    var a = this,
                    b = $(a).jqGrid("getStyleUI", a.p.styleUI + ".common", "hover", !0);
                    if ($(a.grid.fhDiv).remove(), $(a.grid.fbDiv).remove(), a.grid.fhDiv = null, a.grid.fbDiv = null, a.p.footerrow && ($(a.grid.fsDiv).remove(), a.grid.fsDiv = null), $(this).unbind(".setFrozenColumns"), a.p.hoverrows === !0) {
                        var c;
                        $("#" + $.jgrid.jqID(a.p.id)).bind("mouseover",
                        function(a) {
                            c = $(a.target).closest("tr.jqgrow"),
                            "ui-subgrid" !== $(c).attr("class") && $(c).addClass(b)
                        }).bind("mouseout",
                        function(a) {
                            c = $(a.target).closest("tr.jqgrow"),
                            $(c).removeClass(b)
                        })
                    }
                    this.p.frozenColumns = !1
                }
            })
        },
        resizeColumn: function(a, b) {
            return this.each(function() {
                var c, d, e, f = this.grid,
                g = this.p,
                h = g.colModel,
                i = h.length;
                if ("string" == typeof a) {
                    for (c = 0; i > c; c++) if (h[c].name === a) {
                        a = c;
                        break
                    }
                } else a = parseInt(a, 10);
                if (b = parseInt(b, 10), !("number" != typeof a || 0 > a || a > h.length - 1 || "number" != typeof b || b < g.minColWidth)) {
                    if (g.forceFit) for (g.nv = 0, c = a + 1; i > c; c++) if (h[c].hidden !== !0) {
                        g.nv = c - a;
                        break
                    }
                    if (f.resizing = {
                        idx: a
                    },
                    d = b - f.headers[a].width, g.forceFit) {
                        if (e = f.headers[a + g.nv].width - d, e < g.minColWidth) return;
                        f.headers[a + g.nv].newWidth = f.headers[a + g.nv].width - d
                    }
                    f.newWidth = g.tblwidth + d,
                    f.headers[a].newWidth = b,
                    f.dragEnd(!1)
                }
            })
        },
        getStyleUI: function(a, b, c, d) {
            try {
                var e = "",
                f = a.split("."),
                g = "";
                switch (c || (e = "class=", g = '"'), null == d && (d = ""), f.length) {
                case 1:
                    e += g + d + " " + $.jgrid.styleUI[f[0]][b] + g;
                    break;
                case 2:
                    e += g + d + " " + $.jgrid.styleUI[f[0]][f[1]][b] + g
                }
            } catch(h) {
                e = ""
            }
            return $.trim(e)
        },
        resizeGrid: function(a) {
            return this.each(function() {
                var b = this;
                void 0 === a && (a = 500),
                setTimeout(function() {
                    var a = $(window).width(),
                    c = $("#gbox_" + $.jgrid.jqID(b.p.id)).parent().width(),
                    d = b.p.width;
                    d = a - c > 3 ? c: a,
                    $("#" + $.jgrid.jqID(b.p.id)).jqGrid("setGridWidth", d)
                },
                a)
            })
        }
    }),
    $.jgrid.extend({
        editCell: function(a, b, c) {
            return this.each(function() {
                var d, e, f, g, h = this,
                i = $(this).jqGrid("getStyleUI", h.p.styleUI + ".common", "highlight", !0),
                j = $(this).jqGrid("getStyleUI", h.p.styleUI + ".common", "hover", !0),
                k = $(this).jqGrid("getStyleUI", h.p.styleUI + ".celledit", "inputClass", !0);
                if (h.grid && h.p.cellEdit === !0) {
                    if (b = parseInt(b, 10), h.p.selrow = h.rows[a].id, h.p.knv || $(h).jqGrid("GridNav"), h.p.savedRow.length > 0) {
                        if (c === !0 && a == h.p.iRow && b == h.p.iCol) return;
                        $(h).jqGrid("saveCell", h.p.savedRow[0].id, h.p.savedRow[0].ic)
                    } else window.setTimeout(function() {
                        $("#" + $.jgrid.jqID(h.p.knv)).attr("tabindex", "-1").focus()
                    },
                    1);
                    if (g = h.p.colModel[b], d = g.name, "subgrid" !== d && "cb" !== d && "rn" !== d) {
                        if (f = $("td:eq(" + b + ")", h.rows[a]), g.editable !== !0 || c !== !0 || f.hasClass("not-editable-cell") || $.isFunction(h.p.isCellEditable) && !h.p.isCellEditable.call(h, d, a, b)) parseInt(h.p.iCol, 10) >= 0 && parseInt(h.p.iRow, 10) >= 0 && $(h.rows[h.p.iRow]).removeClass("selected-row " + j).find("td:eq(" + h.p.iCol + ")").removeClass("edit-cell " + i),
                        f.addClass("edit-cell " + i),
                        $(h.rows[a]).addClass("selected-row " + j),
                        e = f.html().replace(/\&#160\;/gi, ""),
                        $(h).triggerHandler("jqGridSelectCell", [h.rows[a].id, d, e, a, b]),
                        $.isFunction(h.p.onSelectCell) && h.p.onSelectCell.call(h, h.rows[a].id, d, e, a, b);
                        else {
                            parseInt(h.p.iCol, 10) >= 0 && parseInt(h.p.iRow, 10) >= 0 && $(h.rows[h.p.iRow]).removeClass("selected-row " + j).find("td:eq(" + h.p.iCol + ")").removeClass("edit-cell " + i),
                            $(f).addClass("edit-cell " + i),
                            $(h.rows[a]).addClass("selected-row " + j);
                            try {
                                e = $.unformat.call(h, f, {
                                    rowId: h.rows[a].id,
                                    colModel: g
                                },
                                b)
                            } catch(l) {
                                e = g.edittype && "textarea" === g.edittype ? $(f).text() : $(f).html()
                            }
                            if (h.p.autoencode && (e = $.jgrid.htmlDecode(e)), g.edittype || (g.edittype = "text"), h.p.savedRow.push({
                                id: a,
                                ic: b,
                                name: d,
                                v: e
                            }), ("&nbsp;" === e || "&#160;" === e || 1 === e.length && 160 === e.charCodeAt(0)) && (e = ""), $.isFunction(h.p.formatCell)) {
                                var m = h.p.formatCell.call(h, h.rows[a].id, d, e, a, b);
                                void 0 !== m && (e = m)
                            }
                            $(h).triggerHandler("jqGridBeforeEditCell", [h.rows[a].id, d, e, a, b]),
                            $.isFunction(h.p.beforeEditCell) && h.p.beforeEditCell.call(h, h.rows[a].id, d, e, a, b);
                            var n = $.extend({},
                            g.editoptions || {},
                            {
                                id: a + "_" + d,
                                name: d,
                                rowId: h.rows[a].id,
                                oper: "edit"
                            }),
                            o = $.jgrid.createEl.call(h, g.edittype, n, e, !0, $.extend({},
                            $.jgrid.ajaxOptions, h.p.ajaxSelectOptions || {}));
                            $.inArray(g.edittype, ["text", "textarea", "password", "select"]) > -1 && $(o).addClass(k),
                            $(f).html("").append(o).attr("tabindex", "0"),
                            $.jgrid.bindEv.call(h, o, n),
                            window.setTimeout(function() {
                                $(o).focus()
                            },
                            1),
                            $("input, select, textarea", f).bind("keydown",
                            function(c) {
                                if (27 === c.keyCode && ($("input.hasDatepicker", f).length > 0 ? $(".ui-datepicker").is(":hidden") ? $(h).jqGrid("restoreCell", a, b) : $("input.hasDatepicker", f).datepicker("hide") : $(h).jqGrid("restoreCell", a, b)), 13 === c.keyCode && !c.shiftKey) return $(h).jqGrid("saveCell", a, b),
                                !1;
                                if (9 === c.keyCode) {
                                    if (h.grid.hDiv.loading) return ! 1;
                                    c.shiftKey ? $(h).jqGrid("prevCell", a, b) : $(h).jqGrid("nextCell", a, b)
                                }
                                c.stopPropagation()
                            }),
                            $(h).triggerHandler("jqGridAfterEditCell", [h.rows[a].id, d, e, a, b]),
                            $.isFunction(h.p.afterEditCell) && h.p.afterEditCell.call(h, h.rows[a].id, d, e, a, b)
                        }
                        h.p.iCol = b,
                        h.p.iRow = a
                    }
                }
            })
        },
        saveCell: function(a, b) {
            return this.each(function() {
                var c, d = this,
                e = $.jgrid.getRegional(this, "errors"),
                f = $.jgrid.getRegional(this, "edit");
                if (d.grid && d.p.cellEdit === !0) {
                    if (c = d.p.savedRow.length >= 1 ? 0 : null, null !== c) {
                        var g, h, i = $("td:eq(" + b + ")", d.rows[a]),
                        j = d.p.colModel[b],
                        k = j.name,
                        l = $.jgrid.jqID(k);
                        switch (j.edittype) {
                        case "select":
                            if (j.editoptions.multiple) {
                                var m = $("#" + a + "_" + l, d.rows[a]),
                                n = [];
                                g = $(m).val(),
                                g ? g.join(",") : g = "",
                                $("option:selected", m).each(function(a, b) {
                                    n[a] = $(b).text()
                                }),
                                h = n.join(",")
                            } else g = $("#" + a + "_" + l + " option:selected", d.rows[a]).val(),
                            h = $("#" + a + "_" + l + " option:selected", d.rows[a]).text();
                            j.formatter && (h = g);
                            break;
                        case "checkbox":
                            var o = ["Yes", "No"];
                            j.editoptions && (o = j.editoptions.value.split(":")),
                            g = $("#" + a + "_" + l, d.rows[a]).is(":checked") ? o[0] : o[1],
                            h = g;
                            break;
                        case "password":
                        case "text":
                        case "textarea":
                        case "button":
                            g = $("#" + a + "_" + l, d.rows[a]).val(),
                            h = g;
                            break;
                        case "custom":
                            try {
                                if (!j.editoptions || !$.isFunction(j.editoptions.custom_value)) throw "e1";
                                if (g = j.editoptions.custom_value.call(d, $(".customelement", i), "get"), void 0 === g) throw "e2";
                                h = g
                            } catch(p) {
                                "e1" === p ? $.jgrid.info_dialog(e.errcap, "function 'custom_value' " + f.msg.nodefined, f.bClose, {
                                    styleUI: d.p.styleUI
                                }) : "e2" === p ? $.jgrid.info_dialog(e.errcap, "function 'custom_value' " + f.msg.novalue, f.bClose, {
                                    styleUI: d.p.styleUI
                                }) : $.jgrid.info_dialog(e.errcap, p.message, f.bClose, {
                                    styleUI: d.p.styleUI
                                })
                            }
                        }
                        if (h !== d.p.savedRow[c].v) {
                            var q = $(d).triggerHandler("jqGridBeforeSaveCell", [d.rows[a].id, k, g, a, b]);
                            if (q && (g = q, h = q), $.isFunction(d.p.beforeSaveCell)) {
                                var r = d.p.beforeSaveCell.call(d, d.rows[a].id, k, g, a, b);
                                r && (g = r, h = r)
                            }
                            var s = $.jgrid.checkValues.call(d, g, b);
                            if (s[0] === !0) {
                                var t = $(d).triggerHandler("jqGridBeforeSubmitCell", [d.rows[a].id, k, g, a, b]) || {};
                                if ($.isFunction(d.p.beforeSubmitCell) && (t = d.p.beforeSubmitCell.call(d, d.rows[a].id, k, g, a, b), t || (t = {})), $("input.hasDatepicker", i).length > 0 && $("input.hasDatepicker", i).datepicker("hide"), "remote" === d.p.cellsubmit) if (d.p.cellurl) {
                                    var u = {};
                                    d.p.autoencode && (g = $.jgrid.htmlEncode(g)),
                                    u[k] = g;
                                    var v, w, x;
                                    x = d.p.prmNames,
                                    v = x.id,
                                    w = x.oper,
                                    u[v] = $.jgrid.stripPref(d.p.idPrefix, d.rows[a].id),
                                    u[w] = x.editoper,
                                    u = $.extend(t, u),
                                    $(d).jqGrid("progressBar", {
                                        method: "show",
                                        loadtype: d.p.loadui,
                                        htmlcontent: $.jgrid.getRegional(d, "defaults.savetext")
                                    }),
                                    d.grid.hDiv.loading = !0,
                                    $.ajax($.extend({
                                        url: d.p.cellurl,
                                        data: $.isFunction(d.p.serializeCellData) ? d.p.serializeCellData.call(d, u) : u,
                                        type: "POST",
                                        complete: function(c, j) {
                                            if ($(d).jqGrid("progressBar", {
                                                method: "hide",
                                                loadtype: d.p.loadui
                                            }), d.grid.hDiv.loading = !1, "success" === j) {
                                                var l = $(d).triggerHandler("jqGridAfterSubmitCell", [d, c, u.id, k, g, a, b]) || [!0, ""];
                                                l[0] === !0 && $.isFunction(d.p.afterSubmitCell) && (l = d.p.afterSubmitCell.call(d, c, u.id, k, g, a, b)),
                                                l[0] === !0 ? ($(i).empty(), $(d).jqGrid("setCell", d.rows[a].id, b, h, !1, !1, !0), $(i).addClass("dirty-cell"), $(d.rows[a]).addClass("edited"), $(d).triggerHandler("jqGridAfterSaveCell", [d.rows[a].id, k, g, a, b]), $.isFunction(d.p.afterSaveCell) && d.p.afterSaveCell.call(d, d.rows[a].id, k, g, a, b), d.p.savedRow.splice(0, 1)) : ($.jgrid.info_dialog(e.errcap, l[1], f.bClose, {
                                                    styleUI: d.p.styleUI
                                                }), $(d).jqGrid("restoreCell", a, b))
                                            }
                                        },
                                        error: function(c, g, h) {
                                            $("#lui_" + $.jgrid.jqID(d.p.id)).hide(),
                                            d.grid.hDiv.loading = !1,
                                            $(d).triggerHandler("jqGridErrorCell", [c, g, h]),
                                            $.isFunction(d.p.errorCell) ? (d.p.errorCell.call(d, c, g, h), $(d).jqGrid("restoreCell", a, b)) : ($.jgrid.info_dialog(e.errcap, c.status + " : " + c.statusText + "<br/>" + g, f.bClose, {
                                                styleUI: d.p.styleUI
                                            }), $(d).jqGrid("restoreCell", a, b))
                                        }
                                    },
                                    $.jgrid.ajaxOptions, d.p.ajaxCellOptions || {}))
                                } else try {
                                    $.jgrid.info_dialog(e.errcap, e.nourl, f.bClose, {
                                        styleUI: d.p.styleUI
                                    }),
                                    $(d).jqGrid("restoreCell", a, b)
                                } catch(p) {}
                                "clientArray" === d.p.cellsubmit && ($(i).empty(), $(d).jqGrid("setCell", d.rows[a].id, b, h, !1, !1, !0), $(i).addClass("dirty-cell"), $(d.rows[a]).addClass("edited"), $(d).triggerHandler("jqGridAfterSaveCell", [d.rows[a].id, k, g, a, b]), $.isFunction(d.p.afterSaveCell) && d.p.afterSaveCell.call(d, d.rows[a].id, k, g, a, b), d.p.savedRow.splice(0, 1))
                            } else try {
                                window.setTimeout(function() {
                                    $.jgrid.info_dialog(e.errcap, g + " " + s[1], f.bClose, {
                                        styleUI: d.p.styleUI
                                    })
                                },
                                100),
                                $(d).jqGrid("restoreCell", a, b)
                            } catch(p) {}
                        } else $(d).jqGrid("restoreCell", a, b)
                    }
                    window.setTimeout(function() {
                        $("#" + $.jgrid.jqID(d.p.knv)).attr("tabindex", "-1").focus()
                    },
                    0)
                }
            })
        },
        restoreCell: function(a, b) {
            return this.each(function() {
                var c, d = this;
                if (d.grid && d.p.cellEdit === !0) {
                    if (c = d.p.savedRow.length >= 1 ? 0 : null, null !== c) {
                        var e = $("td:eq(" + b + ")", d.rows[a]);
                        if ($.isFunction($.fn.datepicker)) try {
                            $("input.hasDatepicker", e).datepicker("hide")
                        } catch(f) {}
                        $(e).empty().attr("tabindex", "-1"),
                        $(d).jqGrid("setCell", d.rows[a].id, b, d.p.savedRow[c].v, !1, !1, !0),
                        $(d).triggerHandler("jqGridAfterRestoreCell", [d.rows[a].id, d.p.savedRow[c].v, a, b]),
                        $.isFunction(d.p.afterRestoreCell) && d.p.afterRestoreCell.call(d, d.rows[a].id, d.p.savedRow[c].v, a, b),
                        d.p.savedRow.splice(0, 1)
                    }
                    window.setTimeout(function() {
                        $("#" + d.p.knv).attr("tabindex", "-1").focus()
                    },
                    0)
                }
            })
        },
        nextCell: function(a, b) {
            return this.each(function() {
                var c, d = this,
                e = !1;
                if (d.grid && d.p.cellEdit === !0) {
                    for (c = b + 1; c < d.p.colModel.length; c++) if (d.p.colModel[c].editable === !0 && (!$.isFunction(d.p.isCellEditable) || d.p.isCellEditable.call(d, d.p.colModel[c].name, a, c))) {
                        e = c;
                        break
                    }
                    e !== !1 ? $(d).jqGrid("editCell", a, e, !0) : d.p.savedRow.length > 0 && $(d).jqGrid("saveCell", a, b)
                }
            })
        },
        prevCell: function(a, b) {
            return this.each(function() {
                var c, d = this,
                e = !1;
                if (d.grid && d.p.cellEdit === !0) {
                    for (c = b - 1; c >= 0; c--) if (d.p.colModel[c].editable === !0 && (!$.isFunction(d.p.isCellEditable) || d.p.isCellEditable.call(d, d.p.colModel[c].name, a, c))) {
                        e = c;
                        break
                    }
                    e !== !1 ? $(d).jqGrid("editCell", a, e, !0) : d.p.savedRow.length > 0 && $(d).jqGrid("saveCell", a, b)
                }
            })
        },
        GridNav: function() {
            return this.each(function() {
                function a(a, b, d) {
                    if ("v" === d.substr(0, 1)) {
                        var e = $(c.grid.bDiv)[0].clientHeight,
                        f = $(c.grid.bDiv)[0].scrollTop,
                        g = c.rows[a].offsetTop + c.rows[a].clientHeight,
                        h = c.rows[a].offsetTop;
                        "vd" === d && g >= e && ($(c.grid.bDiv)[0].scrollTop = $(c.grid.bDiv)[0].scrollTop + c.rows[a].clientHeight),
                        "vu" === d && f > h && ($(c.grid.bDiv)[0].scrollTop = $(c.grid.bDiv)[0].scrollTop - c.rows[a].clientHeight)
                    }
                    if ("h" === d) {
                        var i = $(c.grid.bDiv)[0].clientWidth,
                        j = $(c.grid.bDiv)[0].scrollLeft,
                        k = c.rows[a].cells[b].offsetLeft + c.rows[a].cells[b].clientWidth,
                        l = c.rows[a].cells[b].offsetLeft;
                        k >= i + parseInt(j, 10) ? $(c.grid.bDiv)[0].scrollLeft = $(c.grid.bDiv)[0].scrollLeft + c.rows[a].cells[b].clientWidth: j > l && ($(c.grid.bDiv)[0].scrollLeft = $(c.grid.bDiv)[0].scrollLeft - c.rows[a].cells[b].clientWidth)
                    }
                }
                function b(a, b) {
                    var d, e;
                    if ("lft" === b) for (d = a + 1, e = a; e >= 0; e--) if (c.p.colModel[e].hidden !== !0) {
                        d = e;
                        break
                    }
                    if ("rgt" === b) for (d = a - 1, e = a; e < c.p.colModel.length; e++) if (c.p.colModel[e].hidden !== !0) {
                        d = e;
                        break
                    }
                    return d
                }
                var c = this;
                if (c.grid && c.p.cellEdit === !0) {
                    c.p.knv = c.p.id + "_kn";
                    var d, e, f = $("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + c.p.knv + "'></div></div>");
                    $(f).insertBefore(c.grid.cDiv),
                    $("#" + c.p.knv).focus().keydown(function(f) {
                        switch (e = f.keyCode, "rtl" === c.p.direction && (37 === e ? e = 39 : 39 === e && (e = 37)), e) {
                        case 38:
                            c.p.iRow - 1 > 0 && (a(c.p.iRow - 1, c.p.iCol, "vu"), $(c).jqGrid("editCell", c.p.iRow - 1, c.p.iCol, !1));
                            break;
                        case 40:
                            c.p.iRow + 1 <= c.rows.length - 1 && (a(c.p.iRow + 1, c.p.iCol, "vd"), $(c).jqGrid("editCell", c.p.iRow + 1, c.p.iCol, !1));
                            break;
                        case 37:
                            c.p.iCol - 1 >= 0 && (d = b(c.p.iCol - 1, "lft"), a(c.p.iRow, d, "h"), $(c).jqGrid("editCell", c.p.iRow, d, !1));
                            break;
                        case 39:
                            c.p.iCol + 1 <= c.p.colModel.length - 1 && (d = b(c.p.iCol + 1, "rgt"), a(c.p.iRow, d, "h"), $(c).jqGrid("editCell", c.p.iRow, d, !1));
                            break;
                        case 13:
                            parseInt(c.p.iCol, 10) >= 0 && parseInt(c.p.iRow, 10) >= 0 && $(c).jqGrid("editCell", c.p.iRow, c.p.iCol, !0);
                            break;
                        default:
                            return ! 0
                        }
                        return ! 1
                    })
                }
            })
        },
        getChangedCells: function(a) {
            var b = [];
            return a || (a = "all"),
            this.each(function() {
                var c, d = this;
                d.grid && d.p.cellEdit === !0 && $(d.rows).each(function(e) {
                    var f = {};
                    $(this).hasClass("edited") && ($("td", this).each(function(b) {
                        if (c = d.p.colModel[b].name, "cb" !== c && "subgrid" !== c) if ("dirty" === a) {
                            if ($(this).hasClass("dirty-cell")) try {
                                f[c] = $.unformat.call(d, this, {
                                    rowId: d.rows[e].id,
                                    colModel: d.p.colModel[b]
                                },
                                b)
                            } catch(g) {
                                f[c] = $.jgrid.htmlDecode($(this).html())
                            }
                        } else try {
                            f[c] = $.unformat.call(d, this, {
                                rowId: d.rows[e].id,
                                colModel: d.p.colModel[b]
                            },
                            b)
                        } catch(g) {
                            f[c] = $.jgrid.htmlDecode($(this).html())
                        }
                    }), f.id = this.id, b.push(f))
                })
            }),
            b
        }
    }),
    $.extend($.jgrid, {
        showModal: function(a) {
            a.w.show()
        },
        closeModal: function(a) {
            a.w.hide().attr("aria-hidden", "true"),
            a.o && a.o.remove()
        },
        hideModal: function(a, b) {
            b = $.extend({
                jqm: !0,
                gb: "",
                removemodal: !1,
                formprop: !1,
                form: ""
            },
            b || {});
            var c = b.gb && "string" == typeof b.gb && "#gbox_" === b.gb.substr(0, 6) ? $("#" + b.gb.substr(6))[0] : !1;
            if (b.onClose) {
                var d = c ? b.onClose.call(c, a) : b.onClose(a);
                if ("boolean" == typeof d && !d) return
            }
            if (b.formprop && c && b.form) {
                var e = $(a)[0].style.height,
                f = $(a)[0].style.width;
                e.indexOf("px") > -1 && (e = parseFloat(e)),
                f.indexOf("px") > -1 && (f = parseFloat(f));
                var g, h;
                "edit" === b.form ? (g = "#" + $.jgrid.jqID("FrmGrid_" + b.gb.substr(6)), h = "formProp") : "view" === b.form && (g = "#" + $.jgrid.jqID("ViewGrid_" + b.gb.substr(6)), h = "viewProp"),
                $(c).data(h, {
                    top: parseFloat($(a).css("top")),
                    left: parseFloat($(a).css("left")),
                    width: f,
                    height: e,
                    dataheight: $(g).height(),
                    datawidth: $(g).width()
                })
            }
            if ($.fn.jqm && b.jqm === !0) $(a).attr("aria-hidden", "true").jqmHide();
            else {
                if ("" !== b.gb) try {
                    $(".jqgrid-overlay:first", b.gb).hide()
                } catch(i) {}
                $(a).hide().attr("aria-hidden", "true")
            }
            b.removemodal && $(a).remove()
        },
        findPos: function(a) {
            var b = 0,
            c = 0;
            if (a.offsetParent) do b += a.offsetLeft,
            c += a.offsetTop;
            while (a = a.offsetParent);
            return [b, c]
        },
        createModal: function(a, b, c, d, e, f, g) {
            c = $.extend(!0, {},
            $.jgrid.jqModal || {},
            c);
            var h = this,
            i = "rtl" === $(c.gbox).attr("dir") ? !0 : !1,
            j = $.jgrid.styleUI[c.styleUI || "jQueryUI"].modal,
            k = $.jgrid.styleUI[c.styleUI || "jQueryUI"].common,
            l = document.createElement("div");
            g = $.extend({},
            g || {}),
            l.className = "ui-jqdialog " + j.modal,
            l.id = a.themodal;
            var m = document.createElement("div");
            m.className = "ui-jqdialog-titlebar " + j.header,
            m.id = a.modalhead,
            $(m).append("<span class='ui-jqdialog-title'>" + c.caption + "</span>");
            var n = $("<a class='ui-jqdialog-titlebar-close " + k.cornerall + "'></a>").hover(function() {
                n.addClass(k.hover)
            },
            function() {
                n.removeClass(k.hover)
            }).append("<span class='" + k.icon_base + " " + j.icon_close + "'></span>");
            $(m).append(n),
            i ? (l.dir = "rtl", $(".ui-jqdialog-title", m).css("float", "right"), $(".ui-jqdialog-titlebar-close", m).css("left", "0.3em")) : (l.dir = "ltr", $(".ui-jqdialog-title", m).css("float", "left"), $(".ui-jqdialog-titlebar-close", m).css("right", "0.3em"));
            var o = document.createElement("div");
            $(o).addClass("ui-jqdialog-content " + j.content).attr("id", a.modalcontent),
            $(o).append(b),
            l.appendChild(o),
            $(l).prepend(m),
            f === !0 ? $("body").append(l) : "string" == typeof f ? $(f).append(l) : $(l).insertBefore(d),
            $(l).css(g),
            void 0 === c.jqModal && (c.jqModal = !0);
            var p = {};
            if ($.fn.jqm && c.jqModal === !0) {
                if (0 === c.left && 0 === c.top && c.overlay) {
                    var q = [];
                    q = $.jgrid.findPos(e),
                    c.left = q[0] + 4,
                    c.top = q[1] + 4
                }
                p.top = c.top + "px",
                p.left = c.left
            } else(0 !== c.left || 0 !== c.top) && (p.left = c.left, p.top = c.top + "px");
            if ($("a.ui-jqdialog-titlebar-close", m).click(function() {
                var b = $("#" + $.jgrid.jqID(a.themodal)).data("onClose") || c.onClose,
                d = $("#" + $.jgrid.jqID(a.themodal)).data("gbox") || c.gbox;
                return h.hideModal("#" + $.jgrid.jqID(a.themodal), {
                    gb: d,
                    jqm: c.jqModal,
                    onClose: b,
                    removemodal: c.removemodal || !1,
                    formprop: !c.recreateForm || !1,
                    form: c.form || ""
                }),
                !1
            }), 0 !== c.width && c.width || (c.width = 300), 0 !== c.height && c.height || (c.height = 200), !c.zIndex) {
                var r = $(d).parents("*[role=dialog]").filter(":first").css("z-index");
                c.zIndex = r ? parseInt(r, 10) + 2 : 950
            }
            var s = 0;
            if (i && p.left && !f && (s = $(c.gbox).width() - (isNaN(c.width) ? 0 : parseInt(c.width, 10)) - 8, p.left = parseInt(p.left, 10) + parseInt(s, 10)), p.left && (p.left += "px"), $(l).css($.extend({
                width: isNaN(c.width) ? "auto": c.width + "px",
                height: isNaN(c.height) ? "auto": c.height + "px",
                zIndex: c.zIndex,
                overflow: "hidden"
            },
            p)).attr({
                tabIndex: "-1",
                role: "dialog",
                "aria-labelledby": a.modalhead,
                "aria-hidden": "true"
            }), void 0 === c.drag && (c.drag = !0), void 0 === c.resize && (c.resize = !0), c.drag) if ($(m).css("cursor", "move"), $.fn.jqDrag) $(l).jqDrag(m);
            else try {
                $(l).draggable({
                    handle: $("#" + $.jgrid.jqID(m.id))
                })
            } catch(t) {}
            if (c.resize) if ($.fn.jqResize) $(l).append("<div class='jqResize " + j.resizable + " " + k.icon_base + " " + j.icon_resizable + "'></div>"),
            $("#" + $.jgrid.jqID(a.themodal)).jqResize(".jqResize", a.scrollelm ? "#" + $.jgrid.jqID(a.scrollelm) : !1);
            else try {
                $(l).resizable({
                    handles: "se, sw",
                    alsoResize: a.scrollelm ? "#" + $.jgrid.jqID(a.scrollelm) : !1
                })
            } catch(u) {}
            c.closeOnEscape === !0 && $(l).keydown(function(b) {
                if (27 === b.which) {
                    var d = $("#" + $.jgrid.jqID(a.themodal)).data("onClose") || c.onClose;
                    h.hideModal("#" + $.jgrid.jqID(a.themodal), {
                        gb: c.gbox,
                        jqm: c.jqModal,
                        onClose: d,
                        removemodal: c.removemodal || !1,
                        formprop: !c.recreateForm || !1,
                        form: c.form || ""
                    })
                }
            })
        },
        viewModal: function(a, b) {
            if (b = $.extend({
                toTop: !0,
                overlay: 10,
                modal: !1,
                overlayClass: "ui-widget-overlay",
                onShow: $.jgrid.showModal,
                onHide: $.jgrid.closeModal,
                gbox: "",
                jqm: !0,
                jqM: !0
            },
            b || {}), void 0 === b.focusField && (b.focusField = 0), b.focusField = "number" == typeof b.focusField && b.focusField >= 0 ? parseInt(b.focusField, 10) : "boolean" != typeof b.focusField || b.focusField ? 0 : !1, $.fn.jqm && b.jqm === !0) b.jqM ? $(a).attr("aria-hidden", "false").jqm(b).jqmShow() : $(a).attr("aria-hidden", "false").jqmShow();
            else if ("" !== b.gbox && ($(".jqgrid-overlay:first", b.gbox).show(), $(a).data("gbox", b.gbox)), $(a).show().attr("aria-hidden", "false"), b.focusField >= 0) try {
                $(":input:visible", a)[parseInt(b.focusField, 10)].focus()
            } catch(c) {}
        },
        info_dialog: function(a, b, c, d) {
            var e = {
                width: 290,
                height: "auto",
                dataheight: "auto",
                drag: !0,
                resize: !1,
                left: 250,
                top: 170,
                zIndex: 1e3,
                jqModal: !0,
                modal: !1,
                closeOnEscape: !0,
                align: "center",
                buttonalign: "center",
                buttons: []
            };
            $.extend(!0, e, $.jgrid.jqModal || {},
            {
                caption: "<b>" + a + "</b>"
            },
            d || {});
            var f = e.jqModal,
            g = this,
            h = $.jgrid.styleUI[e.styleUI || "jQueryUI"].modal,
            i = $.jgrid.styleUI[e.styleUI || "jQueryUI"].common;
            $.fn.jqm && !f && (f = !1);
            var j, k = "";
            if (e.buttons.length > 0) for (j = 0; j < e.buttons.length; j++) void 0 === e.buttons[j].id && (e.buttons[j].id = "info_button_" + j),
            k += "<a id='" + e.buttons[j].id + "' class='fm-button " + i.button + "'>" + e.buttons[j].text + "</a>";
            var l = isNaN(e.dataheight) ? e.dataheight: e.dataheight + "px",
            m = "text-align:" + e.align + ";",
            n = "<div id='info_id'>";
            n += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + l + ";" + m + "'>" + b + "</div>",
            n += c ? "<div class='" + h.header + "' style='text-align:" + e.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button " + i.button + "'>" + c + "</a>" + k + "</div>": "" !== k ? "<div class='" + h.header + "' style='text-align:" + e.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>" + k + "</div>": "",
            n += "</div>";
            try {
                "false" === $("#info_dialog").attr("aria-hidden") && $.jgrid.hideModal("#info_dialog", {
                    jqm: f
                }),
                $("#info_dialog").remove()
            } catch(o) {}
            $.jgrid.createModal({
                themodal: "info_dialog",
                modalhead: "info_head",
                modalcontent: "info_content",
                scrollelm: "infocnt"
            },
            n, e, "", "", !0),
            k && $.each(e.buttons,
            function(a) {
                $("#" + $.jgrid.jqID(this.id), "#info_id").bind("click",
                function() {
                    return e.buttons[a].onClick.call($("#info_dialog")),
                    !1
                })
            }),
            $("#closedialog", "#info_id").click(function() {
                return g.hideModal("#info_dialog", {
                    jqm: f,
                    onClose: $("#info_dialog").data("onClose") || e.onClose,
                    gb: $("#info_dialog").data("gbox") || e.gbox
                }),
                !1
            }),
            $(".fm-button", "#info_dialog").hover(function() {
                $(this).addClass(i.hover)
            },
            function() {
                $(this).removeClass(i.hover)
            }),
            $.isFunction(e.beforeOpen) && e.beforeOpen(),
            $.jgrid.viewModal("#info_dialog", {
                onHide: function(a) {
                    a.w.hide().remove(),
                    a.o && a.o.remove()
                },
                modal: e.modal,
                jqm: f
            }),
            $.isFunction(e.afterOpen) && e.afterOpen();
            try {
                $("#info_dialog").focus()
            } catch(p) {}
        },
        bindEv: function(a, b) {
            var c = this;
            $.isFunction(b.dataInit) && b.dataInit.call(c, a, b),
            b.dataEvents && $.each(b.dataEvents,
            function() {
                void 0 !== this.data ? $(a).bind(this.type, this.data, this.fn) : $(a).bind(this.type, this.fn)
            })
        },
        createEl: function(a, b, c, d, e) {
            function f(a, b, c) {
                var d = ["dataInit", "dataEvents", "dataUrl", "buildSelect", "sopt", "searchhidden", "defaultValue", "attr", "custom_element", "custom_value", "oper"];
                void 0 !== c && $.isArray(c) && $.merge(d, c),
                $.each(b,
                function(b, c) { - 1 === $.inArray(b, d) && $(a).attr(b, c)
                }),
                b.hasOwnProperty("id") || $(a).attr("id", $.jgrid.randId())
            }
            var g = "",
            h = this;
            switch (a) {
            case "textarea":
                g = document.createElement("textarea"),
                d ? b.cols || $(g).css({
                    width: "98%"
                }) : b.cols || (b.cols = 20),
                b.rows || (b.rows = 2),
                ("&nbsp;" === c || "&#160;" === c || 1 === c.length && 160 === c.charCodeAt(0)) && (c = ""),
                g.value = c,
                f(g, b),
                $(g).attr({
                    role: "textbox",
                    multiline: "true"
                });
                break;
            case "checkbox":
                if (g = document.createElement("input"), g.type = "checkbox", b.value) {
                    var i = b.value.split(":");
                    c === i[0] && (g.checked = !0, g.defaultChecked = !0),
                    g.value = i[0],
                    $(g).attr("offval", i[1])
                } else {
                    var j = (c + "").toLowerCase();
                    j.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== j ? (g.checked = !0, g.defaultChecked = !0, g.value = c) : g.value = "on",
                    $(g).attr("offval", "off")
                }
                f(g, b, ["value"]),
                $(g).attr("role", "checkbox");
                break;
            case "select":
                g = document.createElement("select"),
                g.setAttribute("role", "select");
                var k, l = [];
                if (b.multiple === !0 ? (k = !0, g.multiple = "multiple", $(g).attr("aria-multiselectable", "true")) : k = !1, null != b.dataUrl) {
                    var m = null,
                    n = b.postData || e.postData;
                    try {
                        m = b.rowId
                    } catch(o) {}
                    h.p && h.p.idPrefix && (m = $.jgrid.stripPref(h.p.idPrefix, m)),
                    $.ajax($.extend({
                        url: $.isFunction(b.dataUrl) ? b.dataUrl.call(h, m, c, String(b.name)) : b.dataUrl,
                        type: "GET",
                        dataType: "html",
                        data: $.isFunction(n) ? n.call(h, m, c, String(b.name)) : n,
                        context: {
                            elem: g,
                            options: b,
                            vl: c
                        },
                        success: function(a) {
                            var b, c = [],
                            d = this.elem,
                            e = this.vl,
                            g = $.extend({},
                            this.options),
                            i = g.multiple === !0,
                            j = g.cacheUrlData === !0,
                            k = "",
                            l = $.isFunction(g.buildSelect) ? g.buildSelect.call(h, a) : a;
                            "string" == typeof l && (l = $($.trim(l)).html()),
                            l && ($(d).append(l), f(d, g, n ? ["postData"] : void 0), void 0 === g.size && (g.size = i ? 3 : 1), i ? (c = e.split(","), c = $.map(c,
                            function(a) {
                                return $.trim(a)
                            })) : c[0] = $.trim(e), setTimeout(function() {
                                if ($("option", d).each(function(a) {
                                    b = $(this).text(),
                                    e = $(this).val() || b,
                                    j && (k += (0 !== a ? ";": "") + e + ":" + b),
                                    0 === a && d.multiple && (this.selected = !1),
                                    $(this).attr("role", "option"),
                                    ($.inArray($.trim(b), c) > -1 || $.inArray($.trim(e), c) > -1) && (this.selected = "selected")
                                }), j) if ("edit" === g.oper) $(h).jqGrid("setColProp", g.name, {
                                    editoptions: {
                                        buildSelect: null,
                                        dataUrl: null,
                                        value: k
                                    }
                                });
                                else if ("search" === g.oper) $(h).jqGrid("setColProp", g.name, {
                                    searchoptions: {
                                        dataUrl: null,
                                        value: k
                                    }
                                });
                                else if ("filter" === g.oper && $("#fbox_" + h.p.id)[0].p) {
                                    var a, f = $("#fbox_" + h.p.id)[0].p.columns;
                                    $.each(f,
                                    function() {
                                        return a = this.index || this.name,
                                        g.name === a ? (this.searchoptions.dataUrl = null, this.searchoptions.value = k, !1) : void 0
                                    })
                                }
                                $(h).triggerHandler("jqGridAddEditAfterSelectUrlComplete", [d])
                            },
                            0))
                        }
                    },
                    e || {}))
                } else if (b.value) {
                    var p;
                    void 0 === b.size && (b.size = k ? 3 : 1),
                    k && (l = c.split(","), l = $.map(l,
                    function(a) {
                        return $.trim(a)
                    })),
                    "function" == typeof b.value && (b.value = b.value());
                    var q, r, s, t, u, v, w = void 0 === b.separator ? ":": b.separator,
                    x = void 0 === b.delimiter ? ";": b.delimiter;
                    if ("string" == typeof b.value) for (q = b.value.split(x), p = 0; p < q.length; p++) r = q[p].split(w),
                    r.length > 2 && (r[1] = $.map(r,
                    function(a, b) {
                        return b > 0 ? a: void 0
                    }).join(w)),
                    s = document.createElement("option"),
                    s.setAttribute("role", "option"),
                    s.value = r[0],
                    s.innerHTML = r[1],
                    g.appendChild(s),
                    k || $.trim(r[0]) !== $.trim(c) && $.trim(r[1]) !== $.trim(c) || (s.selected = "selected"),
                    k && ($.inArray($.trim(r[1]), l) > -1 || $.inArray($.trim(r[0]), l) > -1) && (s.selected = "selected");
                    else if ("[object Array]" === Object.prototype.toString.call(b.value)) for (t = b.value, p = 0; p < t.length; p++) 2 === t[p].length && (u = t[p][0], v = t[p][1], s = document.createElement("option"), s.setAttribute("role", "option"), s.value = u, s.innerHTML = v, g.appendChild(s), k || $.trim(u) !== $.trim(c) && $.trim(v) !== $.trim(c) || (s.selected = "selected"), k && ($.inArray($.trim(v), l) > -1 || $.inArray($.trim(u), l) > -1) && (s.selected = "selected"));
                    else if ("object" == typeof b.value) {
                        t = b.value;
                        for (u in t) t.hasOwnProperty(u) && (s = document.createElement("option"), s.setAttribute("role", "option"), s.value = u, s.innerHTML = t[u], g.appendChild(s), k || $.trim(u) !== $.trim(c) && $.trim(t[u]) !== $.trim(c) || (s.selected = "selected"), k && ($.inArray($.trim(t[u]), l) > -1 || $.inArray($.trim(u), l) > -1) && (s.selected = "selected"))
                    }
                    f(g, b, ["value"])
                }
                break;
            case "image":
            case "file":
                g = document.createElement("input"),
                g.type = a,
                f(g, b);
                break;
            case "custom":
                g = document.createElement("span");
                try {
                    if (!$.isFunction(b.custom_element)) throw "e1";
                    var y = b.custom_element.call(h, c, b);
                    if (!y) throw "e2";
                    y = $(y).addClass("customelement").attr({
                        id: b.id,
                        name: b.name
                    }),
                    $(g).empty().append(y)
                } catch(o) {
                    var z = $.jgrid.getRegional(h, "errors"),
                    A = $.jgrid.getRegional(h, "edit");
                    "e1" === o ? $.jgrid.info_dialog(z.errcap, "function 'custom_element' " + A.msg.nodefined, A.bClose, {
                        styleUI: h.p.styleUI
                    }) : "e2" === o ? $.jgrid.info_dialog(z.errcap, "function 'custom_element' " + A.msg.novalue, A.bClose, {
                        styleUI: h.p.styleUI
                    }) : $.jgrid.info_dialog(z.errcap, "string" == typeof o ? o: o.message, A.bClose, {
                        styleUI: h.p.styleUI
                    })
                }
                break;
            default:
                var B;
                B = "button" === a ? "button": "textbox",
                g = document.createElement("input"),
                g.type = a,
                g.value = c,
                f(g, b),
                "button" !== a && (d ? b.size || $(g).css({
                    width: "96%"
                }) : b.size || (b.size = 20)),
                $(g).attr("role", B)
            }
            return g
        },
        checkDate: function(a, b) {
            var c, d = function(a) {
                return a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? 28 : 29
            },
            e = {};
            if (a = a.toLowerCase(), c = -1 !== a.indexOf("/") ? "/": -1 !== a.indexOf("-") ? "-": -1 !== a.indexOf(".") ? ".": "/", a = a.split(c), b = b.split(c), 3 !== b.length) return ! 1;
            var f, g, h = -1,
            i = -1,
            j = -1;
            for (g = 0; g < a.length; g++) {
                var k = isNaN(b[g]) ? 0 : parseInt(b[g], 10);
                e[a[g]] = k,
                f = a[g],
                -1 !== f.indexOf("y") && (h = g),
                -1 !== f.indexOf("m") && (j = g),
                -1 !== f.indexOf("d") && (i = g)
            }
            f = "y" === a[h] || "yyyy" === a[h] ? 4 : "yy" === a[h] ? 2 : -1;
            var l, m = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return - 1 === h ? !1 : (l = e[a[h]].toString(), 2 === f && 1 === l.length && (f = 1), l.length !== f || 0 === e[a[h]] && "00" !== b[h] ? !1 : -1 === j ? !1 : (l = e[a[j]].toString(), l.length < 1 || e[a[j]] < 1 || e[a[j]] > 12 ? !1 : -1 === i ? !1 : (l = e[a[i]].toString(), l.length < 1 || e[a[i]] < 1 || e[a[i]] > 31 || 2 === e[a[j]] && e[a[i]] > d(e[a[h]]) || e[a[i]] > m[e[a[j]]] ? !1 : !0)))
        },
        isEmpty: function(a) {
            return a.match(/^\s+$/) || "" === a ? !0 : !1
        },
        checkTime: function(a) {
            var b, c = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/;
            if (!$.jgrid.isEmpty(a)) {
                if (b = a.match(c), !b) return ! 1;
                if (b[3]) {
                    if (b[1] < 1 || b[1] > 12) return ! 1
                } else if (b[1] > 23) return ! 1;
                if (b[2] > 59) return ! 1
            }
            return ! 0
        },
        checkValues: function(a, b, c, d) {
            var e, f, g, h, i, j, k = this,
            l = k.p.colModel,
            m = $.jgrid.getRegional(this, "edit.msg");
            if (void 0 === c) if ("string" == typeof b) {
                for (f = 0, i = l.length; i > f; f++) if (l[f].name === b) {
                    e = l[f].editrules,
                    b = f,
                    null != l[f].formoptions && (g = l[f].formoptions.label);
                    break
                }
            } else b >= 0 && (e = l[b].editrules);
            else e = c,
            g = void 0 === d ? "_": d;
            if (e) {
                if (g || (g = null != k.p.colNames ? k.p.colNames[b] : l[b].label), e.required === !0 && $.jgrid.isEmpty(a)) return [!1, g + ": " + m.required, ""];
                var n = e.required === !1 ? !1 : !0;
                if (e.number === !0 && (n !== !1 || !$.jgrid.isEmpty(a)) && isNaN(a)) return [!1, g + ": " + m.number, ""];
                if (void 0 !== e.minValue && !isNaN(e.minValue) && parseFloat(a) < parseFloat(e.minValue)) return [!1, g + ": " + m.minValue + " " + e.minValue, ""];
                if (void 0 !== e.maxValue && !isNaN(e.maxValue) && parseFloat(a) > parseFloat(e.maxValue)) return [!1, g + ": " + m.maxValue + " " + e.maxValue, ""];
                var o;
                if (e.email === !0 && !(n === !1 && $.jgrid.isEmpty(a) || (o = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, o.test(a)))) return [!1, g + ": " + m.email, ""];
                if (e.integer === !0 && (n !== !1 || !$.jgrid.isEmpty(a))) {
                    if (isNaN(a)) return [!1, g + ": " + m.integer, ""];
                    if (a % 1 !== 0 || -1 !== a.indexOf(".")) return [!1, g + ": " + m.integer, ""]
                }
                if (e.date === !0 && !(n === !1 && $.jgrid.isEmpty(a) || (l[b].formatoptions && l[b].formatoptions.newformat ? (h = l[b].formatoptions.newformat, j = $.jgrid.getRegional(k, "formatter.date.masks"), j && j.hasOwnProperty(h) && (h = j[h])) : h = l[b].datefmt || "Y-m-d", $.jgrid.checkDate(h, a)))) return [!1, g + ": " + m.date + " - " + h, ""];
                if (e.time === !0 && !(n === !1 && $.jgrid.isEmpty(a) || $.jgrid.checkTime(a))) return [!1, g + ": " + m.date + " - hh:mm (am/pm)", ""];
                if (e.url === !0 && !(n === !1 && $.jgrid.isEmpty(a) || (o = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i, o.test(a)))) return [!1, g + ": " + m.url, ""];
                if (e.custom === !0 && (n !== !1 || !$.jgrid.isEmpty(a))) {
                    if ($.isFunction(e.custom_func)) {
                        var p = e.custom_func.call(k, a, g, b);
                        return $.isArray(p) ? p: [!1, m.customarray, ""]
                    }
                    return [!1, m.customfcheck, ""]
                }
            }
            return [!0, "", ""]
        }
    }),
    $.fn.jqFilter = function(a) {
        if ("string" == typeof a) {
            var b = $.fn.jqFilter[a];
            if (!b) throw "jqFilter - No such method: " + a;
            var c = $.makeArray(arguments).slice(1);
            return b.apply(this, c)
        }
        var d = $.extend(!0, {
            filter: null,
            columns: [],
            sortStrategy: null,
            onChange: null,
            afterRedraw: null,
            checkValues: null,
            error: !1,
            errmsg: "",
            errorcheck: !0,
            showQuery: !0,
            sopt: null,
            ops: [],
            operands: null,
            numopts: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"],
            stropts: ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"],
            strarr: ["text", "string", "blob"],
            groupOps: [{
                op: "AND",
                text: "AND"
            },
            {
                op: "OR",
                text: "OR"
            }],
            groupButton: !0,
            ruleButtons: !0,
            direction: "ltr"
        },
        $.jgrid.filter, a || {});
        return this.each(function() {
            if (!this.filter) {
                this.p = d,
                (null === this.p.filter || void 0 === this.p.filter) && (this.p.filter = {
                    groupOp: this.p.groupOps[0].op,
                    rules: [],
                    groups: []
                }),
                null != this.p.sortStrategy && $.isFunction(this.p.sortStrategy) && this.p.columns.sort(this.p.sortStrategy);
                var a, b, c = this.p.columns.length,
                e = /msie/i.test(navigator.userAgent) && !window.opera;
                if (this.p.initFilter = $.extend(!0, {},
                this.p.filter), c) {
                    for (a = 0; c > a; a++) b = this.p.columns[a],
                    b.stype ? b.inputtype = b.stype: b.inputtype || (b.inputtype = "text"),
                    b.sorttype ? b.searchtype = b.sorttype: b.searchtype || (b.searchtype = "string"),
                    void 0 === b.hidden && (b.hidden = !1),
                    b.label || (b.label = b.name),
                    b.index && (b.name = b.index),
                    b.hasOwnProperty("searchoptions") || (b.searchoptions = {}),
                    b.hasOwnProperty("searchrules") || (b.searchrules = {});
                    var f = function() {
                        return $("#" + $.jgrid.jqID(d.id))[0] || null
                    },
                    g = f(),
                    h = $.jgrid.styleUI[g.p.styleUI || "jQueryUI"].filter,
                    i = $.jgrid.styleUI[g.p.styleUI || "jQueryUI"].common;
                    this.p.showQuery && $(this).append("<table class='queryresult " + h.table_widget + "' style='display:block;max-width:440px;border:0px none;' dir='" + this.p.direction + "'><tbody><tr><td class='query'></td></tr></tbody></table>");
                    var j = function(a, b) {
                        var c = [!0, ""],
                        e = f();
                        if ($.isFunction(b.searchrules)) c = b.searchrules.call(e, a, b);
                        else if ($.jgrid && $.jgrid.checkValues) try {
                            c = $.jgrid.checkValues.call(e, a, -1, b.searchrules, b.label)
                        } catch(g) {}
                        c && c.length && c[0] === !1 && (d.error = !c[0], d.errmsg = c[1])
                    };
                    this.onchange = function() {
                        return this.p.error = !1,
                        this.p.errmsg = "",
                        $.isFunction(this.p.onChange) ? this.p.onChange.call(this, this.p) : !1
                    },
                    this.reDraw = function() {
                        $("table.group:first", this).remove();
                        var a = this.createTableForGroup(d.filter, null);
                        $(this).append(a),
                        $.isFunction(this.p.afterRedraw) && this.p.afterRedraw.call(this, this.p)
                    },
                    this.createTableForGroup = function(a, b) {
                        var c, e = this,
                        f = $("<table class='group " + h.table_widget + " ui-search-table' style='border:0px none;'><tbody></tbody></table>"),
                        g = "left";
                        "rtl" === this.p.direction && (g = "right", f.attr("dir", "rtl")),
                        null === b && f.append("<tr class='error' style='display:none;'><th colspan='5' class='" + i.error + "' align='" + g + "'></th></tr>");
                        var j = $("<tr></tr>");
                        f.append(j);
                        var k = $("<th colspan='5' align='" + g + "'></th>");
                        if (j.append(k), this.p.ruleButtons === !0) {
                            var l = $("<select class='opsel " + h.srSelect + "'></select>");
                            k.append(l);
                            var m, n = "";
                            for (c = 0; c < d.groupOps.length; c++) m = a.groupOp === e.p.groupOps[c].op ? " selected='selected'": "",
                            n += "<option value='" + e.p.groupOps[c].op + "'" + m + ">" + e.p.groupOps[c].text + "</option>";
                            l.append(n).bind("change",
                            function() {
                                a.groupOp = $(l).val(),
                                e.onchange()
                            })
                        }
                        var o = "<span></span>";
                        if (this.p.groupButton && (o = $("<input type='button' value='+ {}' title='Add subgroup' class='add-group " + i.button + "'/>"), o.bind("click",
                        function() {
                            return void 0 === a.groups && (a.groups = []),
                            a.groups.push({
                                groupOp: d.groupOps[0].op,
                                rules: [],
                                groups: []
                            }),
                            e.reDraw(),
                            e.onchange(),
                            !1
                        })), k.append(o), this.p.ruleButtons === !0) {
                            var p, q = $("<input type='button' value='+' title='Add rule' class='add-rule ui-add " + i.button + "'/>");
                            q.bind("click",
                            function() {
                                for (void 0 === a.rules && (a.rules = []), c = 0; c < e.p.columns.length; c++) {
                                    var b = void 0 === e.p.columns[c].search ? !0 : e.p.columns[c].search,
                                    d = e.p.columns[c].hidden === !0,
                                    f = e.p.columns[c].searchoptions.searchhidden === !0;
                                    if (f && b || b && !d) {
                                        p = e.p.columns[c];
                                        break
                                    }
                                }
                                var g;
                                return g = p.searchoptions.sopt ? p.searchoptions.sopt: e.p.sopt ? e.p.sopt: -1 !== $.inArray(p.searchtype, e.p.strarr) ? e.p.stropts: e.p.numopts,
                                a.rules.push({
                                    field: p.name,
                                    op: g[0],
                                    data: ""
                                }),
                                e.reDraw(),
                                !1
                            }),
                            k.append(q)
                        }
                        if (null !== b) {
                            var r = $("<input type='button' value='-' title='Delete group' class='delete-group " + i.button + "'/>");
                            k.append(r),
                            r.bind("click",
                            function() {
                                for (c = 0; c < b.groups.length; c++) if (b.groups[c] === a) {
                                    b.groups.splice(c, 1);
                                    break
                                }
                                return e.reDraw(),
                                e.onchange(),
                                !1
                            })
                        }
                        if (void 0 !== a.groups) for (c = 0; c < a.groups.length; c++) {
                            var s = $("<tr></tr>");
                            f.append(s);
                            var t = $("<td class='first'></td>");
                            s.append(t);
                            var u = $("<td colspan='4'></td>");
                            u.append(this.createTableForGroup(a.groups[c], a)),
                            s.append(u)
                        }
                        if (void 0 === a.groupOp && (a.groupOp = e.p.groupOps[0].op), void 0 !== a.rules) for (c = 0; c < a.rules.length; c++) f.append(this.createTableRowForRule(a.rules[c], a));
                        return f
                    },
                    this.createTableRowForRule = function(a, b) {
                        var c, g, j, k, l, m = this,
                        n = f(),
                        o = $("<tr></tr>"),
                        p = "";
                        o.append("<td class='first'></td>");
                        var q = $("<td class='columns'></td>");
                        o.append(q);
                        var r, s = $("<select class='" + h.srSelect + "'></select>"),
                        t = [];
                        q.append(s),
                        s.bind("change",
                        function() {
                            for (a.field = $(s).val(), j = $(this).parents("tr:first"), $(".data", j).empty(), c = 0; c < m.p.columns.length; c++) if (m.p.columns[c].name === a.field) {
                                k = m.p.columns[c];
                                break
                            }
                            if (k) {
                                k.searchoptions.id = $.jgrid.randId(),
                                k.searchoptions.name = a.field,
                                k.searchoptions.oper = "filter",
                                e && "text" === k.inputtype && (k.searchoptions.size || (k.searchoptions.size = 10));
                                var b = $.jgrid.createEl.call(n, k.inputtype, k.searchoptions, "", !0, m.p.ajaxSelectOptions || {},
                                !0);
                                $(b).addClass("input-elm " + h.srInput),
                                g = k.searchoptions.sopt ? k.searchoptions.sopt: m.p.sopt ? m.p.sopt: -1 !== $.inArray(k.searchtype, m.p.strarr) ? m.p.stropts: m.p.numopts;
                                var d = "",
                                f = 0;
                                for (t = [], $.each(m.p.ops,
                                function() {
                                    t.push(this.oper)
                                }), c = 0; c < g.length; c++) r = $.inArray(g[c], t),
                                -1 !== r && (0 === f && (a.op = m.p.ops[r].oper), d += "<option value='" + m.p.ops[r].oper + "'>" + m.p.ops[r].text + "</option>", f++);
                                if ($(".selectopts", j).empty().append(d), $(".selectopts", j)[0].selectedIndex = 0, $.jgrid.msie && $.jgrid.msiever() < 9) {
                                    var i = parseInt($("select.selectopts", j)[0].offsetWidth, 10) + 1;
                                    $(".selectopts", j).width(i),
                                    $(".selectopts", j).css("width", "auto")
                                }
                                $(".data", j).append(b),
                                $.jgrid.bindEv.call(n, b, k.searchoptions),
                                $(".input-elm", j).bind("change",
                                function(b) {
                                    var c = b.target;
                                    a.data = "SPAN" === c.nodeName.toUpperCase() && k.searchoptions && $.isFunction(k.searchoptions.custom_value) ? k.searchoptions.custom_value.call(n, $(c).children(".customelement:first"), "get") : c.value,
                                    m.onchange()
                                }),
                                setTimeout(function() {
                                    a.data = $(b).val(),
                                    m.onchange()
                                },
                                0)
                            }
                        });
                        var u = 0;
                        for (c = 0; c < m.p.columns.length; c++) {
                            var v = void 0 === m.p.columns[c].search ? !0 : m.p.columns[c].search,
                            w = m.p.columns[c].hidden === !0,
                            x = m.p.columns[c].searchoptions.searchhidden === !0; (x && v || v && !w) && (l = "", a.field === m.p.columns[c].name && (l = " selected='selected'", u = c), p += "<option value='" + m.p.columns[c].name + "'" + l + ">" + m.p.columns[c].label + "</option>")
                        }
                        s.append(p);
                        var y = $("<td class='operators'></td>");
                        o.append(y),
                        k = d.columns[u],
                        k.searchoptions.id = $.jgrid.randId(),
                        e && "text" === k.inputtype && (k.searchoptions.size || (k.searchoptions.size = 10)),
                        k.searchoptions.name = a.field,
                        k.searchoptions.oper = "filter";
                        var z = $.jgrid.createEl.call(n, k.inputtype, k.searchoptions, a.data, !0, m.p.ajaxSelectOptions || {},
                        !0); ("nu" === a.op || "nn" === a.op) && ($(z).attr("readonly", "true"), $(z).attr("disabled", "true"));
                        var A = $("<select class='selectopts " + h.srSelect + "'></select>");
                        for (y.append(A), A.bind("change",
                        function() {
                            a.op = $(A).val(),
                            j = $(this).parents("tr:first");
                            var b = $(".input-elm", j)[0];
                            "nu" === a.op || "nn" === a.op ? (a.data = "", "SELECT" !== b.tagName.toUpperCase() && (b.value = ""), b.setAttribute("readonly", "true"), b.setAttribute("disabled", "true")) : ("SELECT" === b.tagName.toUpperCase() && (a.data = b.value), b.removeAttribute("readonly"), b.removeAttribute("disabled")),
                            m.onchange()
                        }), g = k.searchoptions.sopt ? k.searchoptions.sopt: m.p.sopt ? m.p.sopt: -1 !== $.inArray(k.searchtype, m.p.strarr) ? m.p.stropts: m.p.numopts, p = "", $.each(m.p.ops,
                        function() {
                            t.push(this.oper)
                        }), c = 0; c < g.length; c++) r = $.inArray(g[c], t),
                        -1 !== r && (l = a.op === m.p.ops[r].oper ? " selected='selected'": "", p += "<option value='" + m.p.ops[r].oper + "'" + l + ">" + m.p.ops[r].text + "</option>");
                        A.append(p);
                        var B = $("<td class='data'></td>");
                        o.append(B),
                        B.append(z),
                        $.jgrid.bindEv.call(n, z, k.searchoptions),
                        $(z).addClass("input-elm " + h.srInput).bind("change",
                        function() {
                            a.data = "custom" === k.inputtype ? k.searchoptions.custom_value.call(n, $(this).children(".customelement:first"), "get") : $(this).val(),
                            m.onchange()
                        });
                        var C = $("<td></td>");
                        if (o.append(C), this.p.ruleButtons === !0) {
                            var D = $("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del " + i.button + "'/>");
                            C.append(D),
                            D.bind("click",
                            function() {
                                for (c = 0; c < b.rules.length; c++) if (b.rules[c] === a) {
                                    b.rules.splice(c, 1);
                                    break
                                }
                                return m.reDraw(),
                                m.onchange(),
                                !1
                            })
                        }
                        return o
                    },
                    this.getStringForGroup = function(a) {
                        var b, c = "(";
                        if (void 0 !== a.groups) for (b = 0; b < a.groups.length; b++) {
                            c.length > 1 && (c += " " + a.groupOp + " ");
                            try {
                                c += this.getStringForGroup(a.groups[b])
                            } catch(d) {
                                alert(d)
                            }
                        }
                        if (void 0 !== a.rules) try {
                            for (b = 0; b < a.rules.length; b++) c.length > 1 && (c += " " + a.groupOp + " "),
                            c += this.getStringForRule(a.rules[b])
                        } catch(e) {
                            alert(e)
                        }
                        return c += ")",
                        "()" === c ? "": c
                    },
                    this.getStringForRule = function(a) {
                        var b, c, e, f, g = "",
                        h = "",
                        i = ["int", "integer", "float", "number", "currency"];
                        for (b = 0; b < this.p.ops.length; b++) if (this.p.ops[b].oper === a.op) {
                            g = this.p.operands.hasOwnProperty(a.op) ? this.p.operands[a.op] : "",
                            h = this.p.ops[b].oper;
                            break
                        }
                        for (b = 0; b < this.p.columns.length; b++) if (this.p.columns[b].name === a.field) {
                            c = this.p.columns[b];
                            break
                        }
                        return void 0 === c ? "": (f = a.data, ("bw" === h || "bn" === h) && (f += "%"), ("ew" === h || "en" === h) && (f = "%" + f), ("cn" === h || "nc" === h) && (f = "%" + f + "%"), ("in" === h || "ni" === h) && (f = " (" + f + ")"), d.errorcheck && j(a.data, c), e = -1 !== $.inArray(c.searchtype, i) || "nn" === h || "nu" === h ? a.field + " " + g + " " + f: a.field + " " + g + ' "' + f + '"')
                    },
                    this.resetFilter = function() {
                        this.p.filter = $.extend(!0, {},
                        this.p.initFilter),
                        this.reDraw(),
                        this.onchange()
                    },
                    this.hideError = function() {
                        $("th." + i.error, this).html(""),
                        $("tr.error", this).hide()
                    },
                    this.showError = function() {
                        $("th." + i.error, this).html(this.p.errmsg),
                        $("tr.error", this).show()
                    },
                    this.toUserFriendlyString = function() {
                        return this.getStringForGroup(d.filter)
                    },
                    this.toString = function() {
                        function a(a) {
                            if (c.p.errorcheck) {
                                var b, d;
                                for (b = 0; b < c.p.columns.length; b++) if (c.p.columns[b].name === a.field) {
                                    d = c.p.columns[b];
                                    break
                                }
                                d && j(a.data, d)
                            }
                            return a.op + "(item." + a.field + ",'" + a.data + "')"
                        }
                        function b(c) {
                            var d, e = "(";
                            if (void 0 !== c.groups) for (d = 0; d < c.groups.length; d++) e.length > 1 && (e += "OR" === c.groupOp ? " || ": " && "),
                            e += b(c.groups[d]);
                            if (void 0 !== c.rules) for (d = 0; d < c.rules.length; d++) e.length > 1 && (e += "OR" === c.groupOp ? " || ": " && "),
                            e += a(c.rules[d]);
                            return e += ")",
                            "()" === e ? "": e
                        }
                        var c = this;
                        return b(this.p.filter)
                    },
                    this.reDraw(),
                    this.p.showQuery && this.onchange(),
                    this.filter = !0
                }
            }
        })
    },
    $.extend($.fn.jqFilter, {
        toSQLString: function() {
            var a = "";
            return this.each(function() {
                a = this.toUserFriendlyString()
            }),
            a
        },
        filterData: function() {
            var a;
            return this.each(function() {
                a = this.p.filter
            }),
            a
        },
        getParameter: function(a) {
            return void 0 !== a && this.p.hasOwnProperty(a) ? this.p[a] : this.p
        },
        resetFilter: function() {
            return this.each(function() {
                this.resetFilter()
            })
        },
        addFilter: function(a) {
            "string" == typeof a && (a = $.jgrid.parse(a)),
            this.each(function() {
                this.p.filter = a,
                this.reDraw(),
                this.onchange()
            })
        }
    }),
    $.jgrid.extend({
        filterToolbar: function(a) {
            var b = $.jgrid.getRegional(this[0], "search");
            return a = $.extend({
                autosearch: !0,
                autosearchDelay: 500,
                searchOnEnter: !0,
                beforeSearch: null,
                afterSearch: null,
                beforeClear: null,
                afterClear: null,
                searchurl: "",
                stringResult: !1,
                groupOp: "AND",
                defaultSearch: "bw",
                searchOperators: !1,
                resetIcon: "x",
                operands: {
                    eq: "==",
                    ne: "!",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "^",
                    bn: "!^",
                    "in": "=",
                    ni: "!=",
                    ew: "|",
                    en: "!@",
                    cn: "~",
                    nc: "!~",
                    nu: "#",
                    nn: "!#"
                }
            },
            b, a || {}),
            this.each(function() {
                var c = this;
                if (!c.p.filterToolbar) {
                    $(c).data("filterToolbar") || $(c).data("filterToolbar", a),
                    c.p.force_regional && (a = $.extend(a, b));
                    var d, e = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].filter,
                    f = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common,
                    g = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].base,
                    h = function() {
                        var b, d, e, f = {},
                        g = 0,
                        h = {};
                        $.each(c.p.colModel,
                        function() {
                            var i = $("#gs_" + c.p.idPrefix + $.jgrid.jqID(this.name), this.frozen === !0 && c.p.frozenColumns === !0 ? c.grid.fhDiv: c.grid.hDiv);
                            if (d = this.index || this.name, e = a.searchOperators ? i.parent().prev().children("a").attr("soper") || a.defaultSearch: this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "select" === this.stype ? "eq": a.defaultSearch, b = "custom" === this.stype && $.isFunction(this.searchoptions.custom_value) && i.length > 0 && "SPAN" === i[0].nodeName.toUpperCase() ? this.searchoptions.custom_value.call(c, i.children(".customelement:first"), "get") : i.val(), b || "nu" === e || "nn" === e) f[d] = b,
                            h[d] = e,
                            g++;
                            else try {
                                delete c.p.postData[d]
                            } catch(j) {}
                        });
                        var i = g > 0 ? !0 : !1;
                        if (a.stringResult === !0 || "local" === c.p.datatype || a.searchOperators === !0) {
                            var j = '{"groupOp":"' + a.groupOp + '","rules":[',
                            k = 0;
                            $.each(f,
                            function(a, b) {
                                k > 0 && (j += ","),
                                j += '{"field":"' + a + '",',
                                j += '"op":"' + h[a] + '",',
                                b += "",
                                j += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}',
                                k++
                            }),
                            j += "]}",
                            $.extend(c.p.postData, {
                                filters: j
                            }),
                            $.each(["searchField", "searchString", "searchOper"],
                            function(a, b) {
                                c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                            })
                        } else $.extend(c.p.postData, f);
                        var l;
                        c.p.searchurl && (l = c.p.url, $(c).jqGrid("setGridParam", {
                            url: c.p.searchurl
                        }));
                        var m = "stop" === $(c).triggerHandler("jqGridToolbarBeforeSearch") ? !0 : !1; ! m && $.isFunction(a.beforeSearch) && (m = a.beforeSearch.call(c)),
                        m || $(c).jqGrid("setGridParam", {
                            search: i
                        }).trigger("reloadGrid", [{
                            page: 1
                        }]),
                        l && $(c).jqGrid("setGridParam", {
                            url: l
                        }),
                        $(c).triggerHandler("jqGridToolbarAfterSearch"),
                        $.isFunction(a.afterSearch) && a.afterSearch.call(c)
                    },
                    i = function(b) {
                        var d, e = {},
                        f = 0;
                        b = "boolean" != typeof b ? !0 : b,
                        $.each(c.p.colModel,
                        function() {
                            var a, b = $("#gs_" + c.p.idPrefix + $.jgrid.jqID(this.name), this.frozen === !0 && c.p.frozenColumns === !0 ? c.grid.fhDiv: c.grid.hDiv);
                            switch (this.searchoptions && void 0 !== this.searchoptions.defaultValue && (a = this.searchoptions.defaultValue), d = this.index || this.name, this.stype) {
                            case "select":
                                if (b.find("option").each(function(b) {
                                    return 0 === b && (this.selected = !0),
                                    $(this).val() === a ? (this.selected = !0, !1) : void 0
                                }), void 0 !== a) e[d] = a,
                                f++;
                                else try {
                                    delete c.p.postData[d]
                                } catch(g) {}
                                break;
                            case "text":
                                if (b.val(a || ""), void 0 !== a) e[d] = a,
                                f++;
                                else try {
                                    delete c.p.postData[d]
                                } catch(h) {}
                                break;
                            case "custom":
                                $.isFunction(this.searchoptions.custom_value) && b.length > 0 && "SPAN" === b[0].nodeName.toUpperCase() && this.searchoptions.custom_value.call(c, b.children(".customelement:first"), "set", a || "")
                            }
                        });
                        var g = f > 0 ? !0 : !1;
                        if (c.p.resetsearch = !0, a.stringResult === !0 || "local" === c.p.datatype) {
                            var h = '{"groupOp":"' + a.groupOp + '","rules":[',
                            i = 0;
                            $.each(e,
                            function(a, b) {
                                i > 0 && (h += ","),
                                h += '{"field":"' + a + '",',
                                h += '"op":"eq",',
                                b += "",
                                h += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}',
                                i++
                            }),
                            h += "]}",
                            $.extend(c.p.postData, {
                                filters: h
                            }),
                            $.each(["searchField", "searchString", "searchOper"],
                            function(a, b) {
                                c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                            })
                        } else $.extend(c.p.postData, e);
                        var j;
                        c.p.searchurl && (j = c.p.url, $(c).jqGrid("setGridParam", {
                            url: c.p.searchurl
                        }));
                        var k = "stop" === $(c).triggerHandler("jqGridToolbarBeforeClear") ? !0 : !1; ! k && $.isFunction(a.beforeClear) && (k = a.beforeClear.call(c)),
                        k || b && $(c).jqGrid("setGridParam", {
                            search: g
                        }).trigger("reloadGrid", [{
                            page: 1
                        }]),
                        j && $(c).jqGrid("setGridParam", {
                            url: j
                        }),
                        $(c).triggerHandler("jqGridToolbarAfterClear"),
                        $.isFunction(a.afterClear) && a.afterClear()
                    },
                    j = function() {
                        var a = $("tr.ui-search-toolbar", c.grid.hDiv),
                        b = c.p.frozenColumns === !0 ? $("tr.ui-search-toolbar", c.grid.fhDiv) : !1;
                        "none" === a.css("display") ? (a.show(), b && b.show()) : (a.hide(), b && b.hide())
                    },
                    k = function(b, d, g) {
                        $("#sopt_menu").remove(),
                        d = parseInt(d, 10),
                        g = parseInt(g, 10) + 18;
                        for (var i, j, k = $(".ui-jqgrid-view").css("font-size") || "11px", l = '<ul id="sopt_menu" class="ui-search-menu modal-content" role="menu" tabindex="0" style="font-size:' + k + ";left:" + d + "px;top:" + g + 'px;">', m = $(b).attr("soper"), n = [], o = 0, p = $(b).attr("colname"), q = c.p.colModel.length; q > o && c.p.colModel[o].name !== p;) o++;
                        var r = c.p.colModel[o],
                        s = $.extend({},
                        r.searchoptions);
                        for (s.sopt || (s.sopt = [], s.sopt[0] = "select" === r.stype ? "eq": a.defaultSearch), $.each(a.odata,
                        function() {
                            n.push(this.oper)
                        }), o = 0; o < s.sopt.length; o++) j = $.inArray(s.sopt[o], n),
                        -1 !== j && (i = m === a.odata[j].oper ? f.highlight: "", l += '<li class="ui-menu-item ' + i + '" role="presentation"><a class="' + f.cornerall + ' g-menu-item" tabindex="0" role="menuitem" value="' + a.odata[j].oper + '" oper="' + a.operands[a.odata[j].oper] + '"><table class="ui-common-table"><tr><td width="25px">' + a.operands[a.odata[j].oper] + "</td><td>" + a.odata[j].text + "</td></tr></table></a></li>");
                        l += "</ul>",
                        $("body").append(l),
                        $("#sopt_menu").addClass("ui-menu " + e.menu_widget),
                        $("#sopt_menu > li > a").hover(function() {
                            $(this).addClass(f.hover)
                        },
                        function() {
                            $(this).removeClass(f.hover)
                        }).click(function() {
                            var d = $(this).attr("value"),
                            e = $(this).attr("oper");
                            if ($(c).triggerHandler("jqGridToolbarSelectOper", [d, e, b]), $("#sopt_menu").hide(), $(b).text(e).attr("soper", d), a.autosearch === !0) {
                                var f = $(b).parent().next().children()[0]; ($(f).val() || "nu" === d || "nn" === d) && h()
                            }
                        })
                    },
                    l = $("<tr class='ui-search-toolbar' role='row'></tr>");
                    $.each(c.p.colModel,
                    function(b) {
                        var f, i, j, k, m, n, o, p = this,
                        q = "",
                        r = "=",
                        s = $("<th role='columnheader' class='" + g.headerBox + " ui-th-" + c.p.direction + "' id='gsh_" + c.p.id + "_" + p.name + "' ></th>"),
                        t = $("<div></div>"),
                        u = $("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper' headers=''></td><td class='ui-search-input' headers=''></td><td class='ui-search-clear' headers=''></td></tr></table>");
                        if (this.hidden === !0 && $(s).css("display", "none"), this.search = this.search === !1 ? !1 : !0, void 0 === this.stype && (this.stype = "text"), f = $.extend({},
                        this.searchoptions || {},
                        {
                            name: p.index || p.name,
                            id: "gs_" + c.p.idPrefix + p.name,
                            oper: "search"
                        }), this.search) {
                            if (a.searchOperators) {
                                for (i = f.sopt ? f.sopt[0] : "select" === p.stype ? "eq": a.defaultSearch, j = 0; j < a.odata.length; j++) if (a.odata[j].oper === i) {
                                    r = a.operands[i] || "";
                                    break
                                }
                                k = null != f.searchtitle ? f.searchtitle: a.operandTitle,
                                q = "<a title='" + k + "' style='padding-right: 0.5em;' soper='" + i + "' class='soptclass' colname='" + this.name + "'>" + r + "</a>"
                            }
                            switch ($("td:eq(0)", u).attr("colindex", b).append(q), void 0 === f.clearSearch && (f.clearSearch = !0), f.clearSearch ? (m = a.resetTitle || "Clear Search Value", $("td:eq(2)", u).append("<a title='" + m + "' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>" + a.resetIcon + "</a>")) : $("td:eq(2)", u).hide(), this.surl && (f.dataUrl = this.surl), n = "", f.defaultValue && (n = $.isFunction(f.defaultValue) ? f.defaultValue.call(c) : f.defaultValue), o = $.jgrid.createEl.call(c, this.stype, f, n, !1, $.extend({},
                            $.jgrid.ajaxOptions, c.p.ajaxSelectOptions || {})), $(o).css({
                                width: "100%"
                            }).addClass(e.srInput), $("td:eq(1)", u).append(o), $(t).append(u), this.stype) {
                            case "select":
                                a.autosearch === !0 && (f.dataEvents = [{
                                    type: "change",
                                    fn: function() {
                                        return h(),
                                        !1
                                    }
                                }]);
                                break;
                            case "text":
                                a.autosearch === !0 && (f.dataEvents = a.searchOnEnter ? [{
                                    type: "keypress",
                                    fn: function(a) {
                                        var b = a.charCode || a.keyCode || 0;
                                        return 13 === b ? (h(), !1) : this
                                    }
                                }] : [{
                                    type: "keydown",
                                    fn: function(b) {
                                        var c = b.which;
                                        switch (c) {
                                        case 13:
                                            return ! 1;
                                        case 9:
                                        case 16:
                                        case 37:
                                        case 38:
                                        case 39:
                                        case 40:
                                        case 27:
                                            break;
                                        default:
                                            d && clearTimeout(d),
                                            d = setTimeout(function() {
                                                h()
                                            },
                                            a.autosearchDelay)
                                        }
                                    }
                                }])
                            }
                            $.jgrid.bindEv.call(c, o, f)
                        }
                        $(s).append(t),
                        $(l).append(s),
                        a.searchOperators || $("td:eq(0)", u).hide()
                    }),
                    $("table thead", c.grid.hDiv).append(l),
                    a.searchOperators && ($(".soptclass", l).click(function(a) {
                        var b = $(this).offset(),
                        c = b.left,
                        d = b.top;
                        k(this, c, d),
                        a.stopPropagation()
                    }), $("body").on("click",
                    function(a) {
                        "soptclass" !== a.target.className && $("#sopt_menu").hide()
                    })),
                    $(".clearsearchclass", l).click(function() {
                        var b = $(this).parents("tr:first"),
                        d = parseInt($("td.ui-search-oper", b).attr("colindex"), 10),
                        e = $.extend({},
                        c.p.colModel[d].searchoptions || {}),
                        f = e.defaultValue ? e.defaultValue: "";
                        "select" === c.p.colModel[d].stype ? f ? $("td.ui-search-input select", b).val(f) : $("td.ui-search-input select", b)[0].selectedIndex = 0 : $("td.ui-search-input input", b).val(f),
                        a.autosearch === !0 && h()
                    }),
                    this.p.filterToolbar = !0,
                    this.triggerToolbar = h,
                    this.clearToolbar = i,
                    this.toggleToolbar = j
                }
            })
        },
        destroyFilterToolbar: function() {
            return this.each(function() {
                this.p.filterToolbar && (this.triggerToolbar = null, this.clearToolbar = null, this.toggleToolbar = null, this.p.filterToolbar = !1, $(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove())
            })
        },
        searchGrid: function(a) {
            var b = $.jgrid.getRegional(this[0], "search");
            return a = $.extend(!0, {
                recreateFilter: !1,
                drag: !0,
                sField: "searchField",
                sValue: "searchString",
                sOper: "searchOper",
                sFilter: "filters",
                loadDefaults: !0,
                beforeShowSearch: null,
                afterShowSearch: null,
                onInitializeSearch: null,
                afterRedraw: null,
                afterChange: null,
                sortStrategy: null,
                closeAfterSearch: !1,
                closeAfterReset: !1,
                closeOnEscape: !1,
                searchOnEnter: !1,
                multipleSearch: !1,
                multipleGroup: !1,
                top: 0,
                left: 0,
                jqModal: !0,
                modal: !1,
                resize: !0,
                width: 450,
                height: "auto",
                dataheight: "auto",
                showQuery: !1,
                errorcheck: !0,
                sopt: null,
                stringResult: void 0,
                onClose: null,
                onSearch: null,
                onReset: null,
                toTop: !0,
                overlay: 30,
                columns: [],
                tmplNames: null,
                tmplFilters: null,
                tmplLabel: " Template: ",
                showOnLoad: !1,
                layer: null,
                operands: {
                    eq: "=",
                    ne: "<>",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "LIKE",
                    bn: "NOT LIKE",
                    "in": "IN",
                    ni: "NOT IN",
                    ew: "LIKE",
                    en: "NOT LIKE",
                    cn: "LIKE",
                    nc: "NOT LIKE",
                    nu: "IS NULL",
                    nn: "ISNOT NULL"
                }
            },
            b, a || {}),
            this.each(function() {
                function b(b) {
                    f = $(c).triggerHandler("jqGridFilterBeforeShow", [b]),
                    void 0 === f && (f = !0),
                    f && $.isFunction(a.beforeShowSearch) && (f = a.beforeShowSearch.call(c, b)),
                    f && ($.jgrid.viewModal("#" + $.jgrid.jqID(h.themodal), {
                        gbox: "#gbox_" + $.jgrid.jqID(e),
                        jqm: a.jqModal,
                        modal: a.modal,
                        overlay: a.overlay,
                        toTop: a.toTop
                    }), $(c).triggerHandler("jqGridFilterAfterShow", [b]), $.isFunction(a.afterShowSearch) && a.afterShowSearch.call(c, b))
                }
                var c = this;
                if (c.grid) {
                    var d, e = "fbox_" + c.p.id,
                    f = !0,
                    g = !0,
                    h = {
                        themodal: "searchmod" + e,
                        modalhead: "searchhd" + e,
                        modalcontent: "searchcnt" + e,
                        scrollelm: e
                    },
                    i = c.p.postData[a.sFilter],
                    j = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].filter,
                    k = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common;
                    if (a.styleUI = c.p.styleUI, "string" == typeof i && (i = $.jgrid.parse(i)), a.recreateFilter === !0 && $("#" + $.jgrid.jqID(h.themodal)).remove(), void 0 !== $("#" + $.jgrid.jqID(h.themodal))[0]) b($("#fbox_" + $.jgrid.jqID(c.p.id)));
                    else {
                        var l = $("<div><div id='" + e + "' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_" + $.jgrid.jqID(c.p.id)),
                        m = "left",
                        n = "";
                        "rtl" === c.p.direction && (m = "right", n = " style='text-align:left'", l.attr("dir", "rtl"));
                        var o, p, q = $.extend([], c.p.colModel),
                        r = "<a id='" + e + "_search' class='fm-button " + k.button + " fm-button-icon-right ui-search'><span class='" + k.icon_base + " " + j.icon_search + "'></span>" + a.Find + "</a>",
                        s = "<a id='" + e + "_reset' class='fm-button " + k.button + " fm-button-icon-left ui-reset'><span class='" + k.icon_base + " " + j.icon_reset + "'></span>" + a.Reset + "</a>",
                        t = "",
                        u = "",
                        v = !1,
                        w = -1;
                        if (a.showQuery && (t = "<a id='" + e + "_query' class='fm-button " + k.button + " fm-button-icon-left'><span class='" + k.icon_base + " " + j.icon_query + "'></span>Query</a>"), a.columns.length ? (q = a.columns, w = 0, o = q[0].index || q[0].name) : $.each(q,
                        function(a, b) {
                            if (b.label || (b.label = c.p.colNames[a]), !v) {
                                var d = void 0 === b.search ? !0 : b.search,
                                e = b.hidden === !0,
                                f = b.searchoptions && b.searchoptions.searchhidden === !0; (f && d || d && !e) && (v = !0, o = b.index || b.name, w = a)
                            }
                        }), !i && o || a.multipleSearch === !1) {
                            var x = "eq";
                            w >= 0 && q[w].searchoptions && q[w].searchoptions.sopt ? x = q[w].searchoptions.sopt[0] : a.sopt && a.sopt.length && (x = a.sopt[0]),
                            i = {
                                groupOp: "AND",
                                rules: [{
                                    field: o,
                                    op: x,
                                    data: ""
                                }]
                            }
                        }
                        v = !1,
                        a.tmplNames && a.tmplNames.length && (v = !0, u = "<tr><td class='ui-search-label'>" + a.tmplLabel + "</td>", u += "<td><select class='ui-template " + j.srSelect + "'>", u += "<option value='default'>Default</option>", $.each(a.tmplNames,
                        function(a, b) {
                            u += "<option value='" + a + "'>" + b + "</option>"
                        }), u += "</select></td></tr>"),
                        p = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + e + "_2'><tbody><tr><td colspan='2'><hr class='" + k.content + "' style='margin:1px'/></td></tr>" + u + "<tr><td class='EditButton' style='text-align:" + m + "'>" + s + "</td><td class='EditButton' " + n + ">" + t + r + "</td></tr></tbody></table>",
                        e = $.jgrid.jqID(e),
                        $("#" + e).jqFilter({
                            columns: q,
                            sortStrategy: a.sortStrategy,
                            filter: a.loadDefaults ? i: null,
                            showQuery: a.showQuery,
                            errorcheck: a.errorcheck,
                            sopt: a.sopt,
                            groupButton: a.multipleGroup,
                            ruleButtons: a.multipleSearch,
                            afterRedraw: a.afterRedraw,
                            ops: a.odata,
                            operands: a.operands,
                            ajaxSelectOptions: c.p.ajaxSelectOptions,
                            groupOps: a.groupOps,
                            onChange: function() {
                                this.p.showQuery && $(".query", this).html(this.toUserFriendlyString()),
                                $.isFunction(a.afterChange) && a.afterChange.call(c, $("#" + e), a)
                            },
                            direction: c.p.direction,
                            id: c.p.id
                        }),
                        l.append(p),
                        v && a.tmplFilters && a.tmplFilters.length && $(".ui-template", l).bind("change",
                        function() {
                            var b = $(this).val();
                            return "default" === b ? $("#" + e).jqFilter("addFilter", i) : $("#" + e).jqFilter("addFilter", a.tmplFilters[parseInt(b, 10)]),
                            !1
                        }),
                        a.multipleGroup === !0 && (a.multipleSearch = !0),
                        $(c).triggerHandler("jqGridFilterInitialize", [$("#" + e)]),
                        $.isFunction(a.onInitializeSearch) && a.onInitializeSearch.call(c, $("#" + e)),
                        a.gbox = "#gbox_" + e,
                        a.layer ? $.jgrid.createModal(h, l, a, "#gview_" + $.jgrid.jqID(c.p.id), $("#gbox_" + $.jgrid.jqID(c.p.id))[0], "#" + $.jgrid.jqID(a.layer), {
                            position: "relative"
                        }) : $.jgrid.createModal(h, l, a, "#gview_" + $.jgrid.jqID(c.p.id), $("#gbox_" + $.jgrid.jqID(c.p.id))[0]),
                        (a.searchOnEnter || a.closeOnEscape) && $("#" + $.jgrid.jqID(h.themodal)).keydown(function(b) {
                            var c = $(b.target);
                            return ! a.searchOnEnter || 13 !== b.which || c.hasClass("add-group") || c.hasClass("add-rule") || c.hasClass("delete-group") || c.hasClass("delete-rule") || c.hasClass("fm-button") && c.is("[id$=_query]") ? a.closeOnEscape && 27 === b.which ? ($("#" + $.jgrid.jqID(h.modalhead)).find(".ui-jqdialog-titlebar-close").click(), !1) : void 0 : ($("#" + e + "_search").click(), !1)
                        }),
                        t && $("#" + e + "_query").bind("click",
                        function() {
                            return $(".queryresult", l).toggle(),
                            !1
                        }),
                        void 0 === a.stringResult && (a.stringResult = a.multipleSearch),
                        $("#" + e + "_search").bind("click",
                        function() {
                            var b, f, i = {};
                            if (d = $("#" + e), d.find(".input-elm:focus").change(), f = d.jqFilter("filterData"), a.errorcheck && (d[0].hideError(), a.showQuery || d.jqFilter("toSQLString"), d[0].p.error)) return d[0].showError(),
                            !1;
                            if (a.stringResult) {
                                try {
                                    b = JSON.stringify(f)
                                } catch(j) {}
                                "string" == typeof b && (i[a.sFilter] = b, $.each([a.sField, a.sValue, a.sOper],
                                function() {
                                    i[this] = ""
                                }))
                            } else a.multipleSearch ? (i[a.sFilter] = f, $.each([a.sField, a.sValue, a.sOper],
                            function() {
                                i[this] = ""
                            })) : (i[a.sField] = f.rules[0].field, i[a.sValue] = f.rules[0].data, i[a.sOper] = f.rules[0].op, i[a.sFilter] = "");
                            return c.p.search = !0,
                            $.extend(c.p.postData, i),
                            g = $(c).triggerHandler("jqGridFilterSearch"),
                            void 0 === g && (g = !0),
                            g && $.isFunction(a.onSearch) && (g = a.onSearch.call(c, c.p.filters)),
                            g !== !1 && $(c).trigger("reloadGrid", [{
                                page: 1
                            }]),
                            a.closeAfterSearch && $.jgrid.hideModal("#" + $.jgrid.jqID(h.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(c.p.id),
                                jqm: a.jqModal,
                                onClose: a.onClose
                            }),
                            !1
                        }),
                        $("#" + e + "_reset").bind("click",
                        function() {
                            var b = {},
                            d = $("#" + e);
                            return c.p.search = !1,
                            c.p.resetsearch = !0,
                            a.multipleSearch === !1 ? b[a.sField] = b[a.sValue] = b[a.sOper] = "": b[a.sFilter] = "",
                            d[0].resetFilter(),
                            v && $(".ui-template", l).val("default"),
                            $.extend(c.p.postData, b),
                            g = $(c).triggerHandler("jqGridFilterReset"),
                            void 0 === g && (g = !0),
                            g && $.isFunction(a.onReset) && (g = a.onReset.call(c)),
                            g !== !1 && $(c).trigger("reloadGrid", [{
                                page: 1
                            }]),
                            a.closeAfterReset && $.jgrid.hideModal("#" + $.jgrid.jqID(h.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(c.p.id),
                                jqm: a.jqModal,
                                onClose: a.onClose
                            }),
                            !1
                        }),
                        b($("#" + e)),
                        $(".fm-button:not(." + k.disabled + ")", l).hover(function() {
                            $(this).addClass(k.hover)
                        },
                        function() {
                            $(this).removeClass(k.hover)
                        })
                    }
                }
            })
        }
    });
    var rp_ge = {};
    if ($.jgrid.extend({
        editGridRow: function(a, b) {
            var c = $.jgrid.getRegional(this[0], "edit"),
            d = this[0].p.styleUI,
            e = $.jgrid.styleUI[d].formedit,
            f = $.jgrid.styleUI[d].common;
            return b = $.extend(!0, {
                top: 0,
                left: 0,
                width: "500",
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: null,
                mtype: "POST",
                clearAfterAdd: !0,
                closeAfterEdit: !1,
                reloadAfterSubmit: !0,
                onInitializeForm: null,
                beforeInitData: null,
                beforeShowForm: null,
                afterShowForm: null,
                beforeSubmit: null,
                afterSubmit: null,
                onclickSubmit: null,
                afterComplete: null,
                onclickPgButtons: null,
                afterclickPgButtons: null,
                editData: {},
                recreateForm: !1,
                jqModal: !0,
                closeOnEscape: !1,
                addedrow: "first",
                topinfo: "",
                bottominfo: "",
                saveicon: [],
                closeicon: [],
                savekey: [!1, 13],
                navkeys: [!1, 38, 40],
                checkOnSubmit: !1,
                checkOnUpdate: !1,
                _savedData: {},
                processing: !1,
                onClose: null,
                ajaxEditOptions: {},
                serializeEditData: null,
                viewPagerButtons: !0,
                overlayClass: f.overlay,
                removemodal: !0,
                form: "edit",
                template: null,
                focusField: !0
            },
            c, b || {}),
            rp_ge[$(this)[0].p.id] = b,
            this.each(function() {
                function c() {
                    return $(x).find(".FormElement").each(function() {
                        var a = $(".customelement", this);
                        if (a.length) {
                            var b = a[0],
                            c = $(b).attr("name");
                            $.each(p.p.colModel,
                            function() {
                                if (this.name === c && this.editoptions && $.isFunction(this.editoptions.custom_value)) {
                                    try {
                                        if (r[c] = this.editoptions.custom_value.call(p, $("#" + $.jgrid.jqID(c), x), "get"), void 0 === r[c]) throw "e1"
                                    } catch(a) {
                                        "e1" === a ? $.jgrid.info_dialog(D.errcap, "function 'custom_value' " + rp_ge[$(this)[0]].p.msg.novalue, rp_ge[$(this)[0]].p.bClose, {
                                            styleUI: rp_ge[$(this)[0]].p.styleUI
                                        }) : $.jgrid.info_dialog(D.errcap, a.message, rp_ge[$(this)[0]].p.bClose, {
                                            styleUI: rp_ge[$(this)[0]].p.styleUI
                                        })
                                    }
                                    return ! 0
                                }
                            })
                        } else {
                            switch ($(this).get(0).type) {
                            case "checkbox":
                                if ($(this).is(":checked")) r[this.name] = $(this).val();
                                else {
                                    var d = $(this).attr("offval");
                                    r[this.name] = d
                                }
                                break;
                            case "select-one":
                                r[this.name] = $("option:selected", this).val();
                                break;
                            case "select-multiple":
                                r[this.name] = $(this).val(),
                                r[this.name] = r[this.name] ? r[this.name].join(",") : "";
                                var e = [];
                                $("option:selected", this).each(function(a, b) {
                                    e[a] = $(b).text()
                                });
                                break;
                            case "password":
                            case "text":
                            case "textarea":
                            case "button":
                                r[this.name] = $(this).val()
                            }
                            p.p.autoencode && (r[this.name] = $.jgrid.htmlEncode(r[this.name]))
                        }
                    }),
                    !0
                }
                function d(a, b, c, d) {
                    var f, g, h, i, j, k, l, m = 0,
                    n = [],
                    o = !1,
                    q = "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>",
                    r = "";
                    for (l = 1; d >= l; l++) r += q;
                    if ("_empty" !== a && (o = $(b).jqGrid("getInd", a)), $(b.p.colModel).each(function(l) {
                        if (f = this.name, g = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, j = g ? "style='display:none'": "", "cb" !== f && "subgrid" !== f && this.editable === !0 && "rn" !== f) {
                            if (o === !1) i = "";
                            else if (f === b.p.ExpandColumn && b.p.treeGrid === !0) i = $("td[role='gridcell']:eq(" + l + ")", b.rows[o]).text();
                            else {
                                try {
                                    i = $.unformat.call(b, $("td[role='gridcell']:eq(" + l + ")", b.rows[o]), {
                                        rowId: a,
                                        colModel: this
                                    },
                                    l)
                                } catch(q) {
                                    i = this.edittype && "textarea" === this.edittype ? $("td[role='gridcell']:eq(" + l + ")", b.rows[o]).text() : $("td[role='gridcell']:eq(" + l + ")", b.rows[o]).html()
                                } (!i || "&nbsp;" === i || "&#160;" === i || 1 === i.length && 160 === i.charCodeAt(0)) && (i = "")
                            }
                            var s = $.extend({},
                            this.editoptions || {},
                            {
                                id: f,
                                name: f,
                                rowId: a,
                                oper: "edit"
                            }),
                            t = $.extend({},
                            {
                                elmprefix: "",
                                elmsuffix: "",
                                rowabove: !1,
                                rowcontent: ""
                            },
                            this.formoptions || {}),
                            u = parseInt(t.rowpos, 10) || m + 1,
                            w = parseInt(2 * (parseInt(t.colpos, 10) || 1), 10);
                            if ("_empty" === a && s.defaultValue && (i = $.isFunction(s.defaultValue) ? s.defaultValue.call(p) : s.defaultValue), this.edittype || (this.edittype = "text"), p.p.autoencode && (i = $.jgrid.htmlDecode(i)), k = $.jgrid.createEl.call(p, this.edittype, s, i, !1, $.extend({},
                            $.jgrid.ajaxOptions, b.p.ajaxSelectOptions || {})), "select" === this.edittype && (i = $(k).val(), "select-multiple" === $(k).get(0).type && i && (i = i.join(","))), "checkbox" === this.edittype && (i = $(k).is(":checked") ? $(k).val() : $(k).attr("offval")), (rp_ge[p.p.id].checkOnSubmit || rp_ge[p.p.id].checkOnUpdate) && (rp_ge[p.p.id]._savedData[f] = i), $(k).addClass("FormElement"), $.inArray(this.edittype, ["text", "textarea", "password", "select"]) > -1 && $(k).addClass(e.inputClass), C) $(I).find("#" + f).replaceWith(k);
                            else {
                                if (h = $(c).find("tr[rowpos=" + u + "]"), t.rowabove) {
                                    var x = $("<tr><td class='contentinfo' colspan='" + 2 * d + "'>" + t.rowcontent + "</td></tr>");
                                    $(c).append(x),
                                    x[0].rp = u
                                }
                                0 === h.length && (h = $("<tr " + j + " rowpos='" + u + "'></tr>").addClass("FormData").attr("id", "tr_" + f), $(h).append(r), $(c).append(h), h[0].rp = u),
                                $("td:eq(" + (w - 2) + ")", h[0]).html("<label for='" + f + "'>" + (void 0 === t.label ? b.p.colNames[l] : t.label) + "</label>"),
                                $("td:eq(" + (w - 1) + ")", h[0]).append(t.elmprefix).append(k).append(t.elmsuffix)
                            }
                            "custom" === this.edittype && $.isFunction(s.custom_value) && s.custom_value.call(p, $("#" + f, v), "set", i),
                            $.jgrid.bindEv.call(p, k, s),
                            n[m] = l,
                            m++
                        }
                    }), m > 0) {
                        var s;
                        C ? (s = "<div class='FormData' style='display:none'><input class='FormElement' id='id_g' type='text' name='" + b.p.id + "_id' value='" + a + "'/>", $(I).append(s)) : (s = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * d - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + b.p.id + "_id' value='" + a + "'/></td></tr>"), s[0].rp = m + 999, $(c).append(s)),
                        (rp_ge[p.p.id].checkOnSubmit || rp_ge[p.p.id].checkOnUpdate) && (rp_ge[p.p.id]._savedData[b.p.id + "_id"] = a)
                    }
                    return n
                }
                function g(a, b, c) {
                    var d, e, f, g, h, i, j = 0; (rp_ge[p.p.id].checkOnSubmit || rp_ge[p.p.id].checkOnUpdate) && (rp_ge[p.p.id]._savedData = {},
                    rp_ge[p.p.id]._savedData[b.p.id + "_id"] = a);
                    var k = b.p.colModel;
                    if ("_empty" === a) return $(k).each(function() {
                        d = this.name,
                        g = $.extend({},
                        this.editoptions || {}),
                        f = $("#" + $.jgrid.jqID(d), c),
                        f && f.length && null !== f[0] && (h = "", "custom" === this.edittype && $.isFunction(g.custom_value) ? g.custom_value.call(p, $("#" + d, c), "set", h) : g.defaultValue ? (h = $.isFunction(g.defaultValue) ? g.defaultValue.call(p) : g.defaultValue, "checkbox" === f[0].type ? (i = h.toLowerCase(), i.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== i ? (f[0].checked = !0, f[0].defaultChecked = !0, f[0].value = h) : (f[0].checked = !1, f[0].defaultChecked = !1)) : f.val(h)) : "checkbox" === f[0].type ? (f[0].checked = !1, f[0].defaultChecked = !1, h = $(f).attr("offval")) : f[0].type && "select" === f[0].type.substr(0, 6) ? f[0].selectedIndex = 0 : f.val(h), (rp_ge[p.p.id].checkOnSubmit === !0 || rp_ge[p.p.id].checkOnUpdate) && (rp_ge[p.p.id]._savedData[d] = h))
                    }),
                    void $("#id_g", c).val(a);
                    var l = $(b).jqGrid("getInd", a, !0);
                    l && ($('td[role="gridcell"]', l).each(function(f) {
                        if (d = k[f].name, "cb" !== d && "subgrid" !== d && "rn" !== d && k[f].editable === !0) {
                            if (d === b.p.ExpandColumn && b.p.treeGrid === !0) e = $(this).text();
                            else try {
                                e = $.unformat.call(b, $(this), {
                                    rowId: a,
                                    colModel: k[f]
                                },
                                f)
                            } catch(g) {
                                e = "textarea" === k[f].edittype ? $(this).text() : $(this).html()
                            }
                            switch (p.p.autoencode && (e = $.jgrid.htmlDecode(e)), (rp_ge[p.p.id].checkOnSubmit === !0 || rp_ge[p.p.id].checkOnUpdate) && (rp_ge[p.p.id]._savedData[d] = e), d = $.jgrid.jqID(d), k[f].edittype) {
                            case "password":
                            case "text":
                            case "button":
                            case "image":
                            case "textarea":
                                ("&nbsp;" === e || "&#160;" === e || 1 === e.length && 160 === e.charCodeAt(0)) && (e = ""),
                                $("#" + d, c).val(e);
                                break;
                            case "select":
                                var h = e.split(",");
                                h = $.map(h,
                                function(a) {
                                    return $.trim(a)
                                }),
                                $("#" + d + " option", c).each(function() {
                                    this.selected = k[f].editoptions.multiple || $.trim(e) !== $.trim($(this).text()) && h[0] !== $.trim($(this).text()) && h[0] !== $.trim($(this).val()) ? k[f].editoptions.multiple && ($.inArray($.trim($(this).text()), h) > -1 || $.inArray($.trim($(this).val()), h) > -1) ? !0 : !1 : !0
                                }),
                                (rp_ge[p.p.id].checkOnSubmit === !0 || rp_ge[p.p.id].checkOnUpdate) && (e = $("#" + d, c).val(), k[f].editoptions.multiple && (e = e.join(",")), rp_ge[p.p.id]._savedData[d] = e);
                                break;
                            case "checkbox":
                                if (e = String(e), k[f].editoptions && k[f].editoptions.value) {
                                    var i = k[f].editoptions.value.split(":");
                                    $("#" + d, c)[p.p.useProp ? "prop": "attr"](i[0] === e ? {
                                        checked: !0,
                                        defaultChecked: !0
                                    }: {
                                        checked: !1,
                                        defaultChecked: !1
                                    })
                                } else e = e.toLowerCase(),
                                e.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== e ? ($("#" + d, c)[p.p.useProp ? "prop": "attr"]("checked", !0), $("#" + d, c)[p.p.useProp ? "prop": "attr"]("defaultChecked", !0)) : ($("#" + d, c)[p.p.useProp ? "prop": "attr"]("checked", !1), $("#" + d, c)[p.p.useProp ? "prop": "attr"]("defaultChecked", !1)); (rp_ge[p.p.id].checkOnSubmit === !0 || rp_ge[p.p.id].checkOnUpdate) && (e = $("#" + d, c).is(":checked") ? $("#" + d, c).val() : $("#" + d, c).attr("offval"));
                                break;
                            case "custom":
                                try {
                                    if (!k[f].editoptions || !$.isFunction(k[f].editoptions.custom_value)) throw "e1";
                                    k[f].editoptions.custom_value.call(p, $("#" + d, c), "set", e)
                                } catch(l) {
                                    "e1" === l ? $.jgrid.info_dialog(D.errcap, "function 'custom_value' " + rp_ge[$(this)[0]].p.msg.nodefined, $.rp_ge[$(this)[0]].p.bClose, {
                                        styleUI: rp_ge[$(this)[0]].p.styleUI
                                    }) : $.jgrid.info_dialog(D.errcap, l.message, $.rp_ge[$(this)[0]].p.bClose, {
                                        styleUI: rp_ge[$(this)[0]].p.styleUI
                                    })
                                }
                            }
                            j++
                        }
                    }), j > 0 && $("#id_g", x).val(a))
                }
                function h() {
                    $.each(p.p.colModel,
                    function(a, b) {
                        b.editoptions && b.editoptions.NullIfEmpty === !0 && r.hasOwnProperty(b.name) && "" === r[b.name] && (r[b.name] = "null")
                    })
                }
                function i() {
                    var a, c, d, e, i, j, k, l = [!0, "", ""],
                    m = {},
                    n = p.p.prmNames,
                    o = $(p).triggerHandler("jqGridAddEditBeforeCheckValues", [$(v), t]);
                    o && "object" == typeof o && (r = o),
                    $.isFunction(rp_ge[p.p.id].beforeCheckValues) && (o = rp_ge[p.p.id].beforeCheckValues.call(p, r, $(v), t), o && "object" == typeof o && (r = o));
                    for (e in r) if (r.hasOwnProperty(e) && (l = $.jgrid.checkValues.call(p, r[e], e), l[0] === !1)) break;
                    if (h(), l[0] && (m = $(p).triggerHandler("jqGridAddEditClickSubmit", [rp_ge[p.p.id], r, t]), void 0 === m && $.isFunction(rp_ge[p.p.id].onclickSubmit) && (m = rp_ge[p.p.id].onclickSubmit.call(p, rp_ge[p.p.id], r, t) || {}), l = $(p).triggerHandler("jqGridAddEditBeforeSubmit", [r, $(v), t]), void 0 === l && (l = [!0, "", ""]), l[0] && $.isFunction(rp_ge[p.p.id].beforeSubmit) && (l = rp_ge[p.p.id].beforeSubmit.call(p, r, $(v), t))), l[0] && !rp_ge[p.p.id].processing) {
                        if (rp_ge[p.p.id].processing = !0, $("#sData", x + "_2").addClass(f.active), k = rp_ge[p.p.id].url || $(p).jqGrid("getGridParam", "editurl"), d = n.oper, c = "clientArray" === k ? p.p.keyName: n.id, r[d] = "_empty" === $.trim(r[p.p.id + "_id"]) ? n.addoper: n.editoper, r[d] !== n.addoper ? r[c] = r[p.p.id + "_id"] : void 0 === r[c] && (r[c] = r[p.p.id + "_id"]), delete r[p.p.id + "_id"], r = $.extend(r, rp_ge[p.p.id].editData, m), p.p.treeGrid === !0) {
                            if (r[d] === n.addoper) {
                                i = $(p).jqGrid("getGridParam", "selrow");
                                var q = "adjacency" === p.p.treeGridModel ? p.p.treeReader.parent_id_field: "parent_id";
                                r[q] = i
                            }
                            for (j in p.p.treeReader) if (p.p.treeReader.hasOwnProperty(j)) {
                                var s = p.p.treeReader[j];
                                if (r.hasOwnProperty(s)) {
                                    if (r[d] === n.addoper && "parent_id_field" === j) continue;
                                    delete r[s]
                                }
                            }
                        }
                        r[c] = $.jgrid.stripPref(p.p.idPrefix, r[c]);
                        var w = $.extend({
                            url: k,
                            type: rp_ge[p.p.id].mtype,
                            data: $.isFunction(rp_ge[p.p.id].serializeEditData) ? rp_ge[p.p.id].serializeEditData.call(p, r) : r,
                            complete: function(e, h) {
                                var j;
                                if ($("#sData", x + "_2").removeClass(f.active), r[c] = p.p.idPrefix + r[c], e.status >= 300 && 304 !== e.status ? (l[0] = !1, l[1] = $(p).triggerHandler("jqGridAddEditErrorTextFormat", [e, t]), l[1] = $.isFunction(rp_ge[p.p.id].errorTextFormat) ? rp_ge[p.p.id].errorTextFormat.call(p, e, t) : h + " Status: '" + e.statusText + "'. Error code: " + e.status) : (l = $(p).triggerHandler("jqGridAddEditAfterSubmit", [e, r, t]), void 0 === l && (l = [!0, "", ""]), l[0] && $.isFunction(rp_ge[p.p.id].afterSubmit) && (l = rp_ge[p.p.id].afterSubmit.call(p, e, r, t))), l[0] === !1) $(".FormError", v).html(l[1]),
                                $(".FormError", v).show();
                                else if (p.p.autoencode && $.each(r,
                                function(a, b) {
                                    r[a] = $.jgrid.htmlDecode(b)
                                }), r[d] === n.addoper ? (l[2] || (l[2] = $.jgrid.randId()), null == r[c] || "_empty" === r[c] ? r[c] = l[2] : l[2] = r[c], rp_ge[p.p.id].reloadAfterSubmit ? $(p).trigger("reloadGrid") : p.p.treeGrid === !0 ? $(p).jqGrid("addChildNode", l[2], i, r) : $(p).jqGrid("addRowData", l[2], r, b.addedrow), rp_ge[p.p.id].closeAfterAdd ? (p.p.treeGrid !== !0 && $(p).jqGrid("setSelection", l[2]), $.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                    gb: "#gbox_" + $.jgrid.jqID(u),
                                    jqm: b.jqModal,
                                    onClose: rp_ge[p.p.id].onClose,
                                    removemodal: rp_ge[p.p.id].removemodal,
                                    formprop: !rp_ge[p.p.id].recreateForm,
                                    form: rp_ge[p.p.id].form
                                })) : rp_ge[p.p.id].clearAfterAdd && g("_empty", p, v)) : (rp_ge[p.p.id].reloadAfterSubmit ? ($(p).trigger("reloadGrid"), rp_ge[p.p.id].closeAfterEdit || setTimeout(function() {
                                    $(p).jqGrid("setSelection", r[c])
                                },
                                1e3)) : p.p.treeGrid === !0 ? $(p).jqGrid("setTreeRow", r[c], r) : $(p).jqGrid("setRowData", r[c], r), rp_ge[p.p.id].closeAfterEdit && $.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                    gb: "#gbox_" + $.jgrid.jqID(u),
                                    jqm: b.jqModal,
                                    onClose: rp_ge[p.p.id].onClose,
                                    removemodal: rp_ge[p.p.id].removemodal,
                                    formprop: !rp_ge[p.p.id].recreateForm,
                                    form: rp_ge[p.p.id].form
                                })), $.isFunction(rp_ge[p.p.id].afterComplete) && (a = e, setTimeout(function() {
                                    $(p).triggerHandler("jqGridAddEditAfterComplete", [a, r, $(v), t]),
                                    rp_ge[p.p.id].afterComplete.call(p, a, r, $(v), t),
                                    a = null
                                },
                                500)), (rp_ge[p.p.id].checkOnSubmit || rp_ge[p.p.id].checkOnUpdate) && ($(v).data("disabled", !1), "_empty" !== rp_ge[p.p.id]._savedData[p.p.id + "_id"])) for (j in rp_ge[p.p.id]._savedData) rp_ge[p.p.id]._savedData.hasOwnProperty(j) && r[j] && (rp_ge[p.p.id]._savedData[j] = r[j]);
                                rp_ge[p.p.id].processing = !1;
                                try {
                                    $(":input:visible", v)[0].focus()
                                } catch(k) {}
                            }
                        },
                        $.jgrid.ajaxOptions, rp_ge[p.p.id].ajaxEditOptions);
                        if (w.url || rp_ge[p.p.id].useDataProxy || ($.isFunction(p.p.dataProxy) ? rp_ge[p.p.id].useDataProxy = !0 : (l[0] = !1, l[1] += " " + D.nourl)), l[0]) if (rp_ge[p.p.id].useDataProxy) {
                            var z = p.p.dataProxy.call(p, w, "set_" + p.p.id);
                            void 0 === z && (z = [!0, ""]),
                            z[0] === !1 ? (l[0] = !1, l[1] = z[1] || "Error deleting the selected row!") : (w.data.oper === n.addoper && rp_ge[p.p.id].closeAfterAdd && $.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(u),
                                jqm: b.jqModal,
                                onClose: rp_ge[p.p.id].onClose,
                                removemodal: rp_ge[p.p.id].removemodal,
                                formprop: !rp_ge[p.p.id].recreateForm,
                                form: rp_ge[p.p.id].form
                            }), w.data.oper === n.editoper && rp_ge[p.p.id].closeAfterEdit && $.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(u),
                                jqm: b.jqModal,
                                onClose: rp_ge[p.p.id].onClose,
                                removemodal: rp_ge[p.p.id].removemodal,
                                formprop: !rp_ge[p.p.id].recreateForm,
                                form: rp_ge[p.p.id].form
                            }))
                        } else "clientArray" === w.url ? (rp_ge[p.p.id].reloadAfterSubmit = !1, r = w.data, w.complete({
                            status: 200,
                            statusText: ""
                        },
                        "")) : $.ajax(w)
                    }
                    l[0] === !1 && ($(".FormError", v).html(l[1]), $(".FormError", v).show())
                }
                function j(a, b) {
                    var c, d = !1;
                    for (c in a) if (a.hasOwnProperty(c) && a[c] != b[c]) {
                        d = !0;
                        break
                    }
                    return d
                }
                function k() {
                    var a = !0;
                    return $(".FormError", v).hide(),
                    rp_ge[p.p.id].checkOnUpdate && (r = {},
                    c(), s = j(r, rp_ge[p.p.id]._savedData), s && ($(v).data("disabled", !0), $(".confirm", "#" + y.themodal).show(), a = !1)),
                    a
                }
                function l() {
                    var b;
                    if ("_empty" !== a && void 0 !== p.p.savedRow && p.p.savedRow.length > 0 && $.isFunction($.fn.jqGrid.restoreRow)) for (b = 0; b < p.p.savedRow.length; b++) if (p.p.savedRow[b].id === a) {
                        $(p).jqGrid("restoreRow", a);
                        break
                    }
                }
                function m(a, b) {
                    var c = b[1].length - 1;
                    0 === a ? $("#pData", q).addClass(f.disabled) : void 0 !== b[1][a - 1] && $("#" + $.jgrid.jqID(b[1][a - 1])).hasClass(f.disabled) ? $("#pData", q).addClass(f.disabled) : $("#pData", q).removeClass(f.disabled),
                    a === c ? $("#nData", q).addClass(f.disabled) : void 0 !== b[1][a + 1] && $("#" + $.jgrid.jqID(b[1][a + 1])).hasClass(f.disabled) ? $("#nData", q).addClass(f.disabled) : $("#nData", q).removeClass(f.disabled)
                }
                function n() {
                    var a = $(p).jqGrid("getDataIDs"),
                    b = $("#id_g", x).val(),
                    c = $.inArray(b, a);
                    return [c, a]
                }
                function o(a) {
                    var b = "";
                    return "string" == typeof a && (b = a.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
                    function(a, b) {
                        return '<span id="' + b + '" ></span>'
                    })),
                    b
                }
                var p = this;
                if (p.grid && a) {
                    var q, r, s, t, u = p.p.id,
                    v = "FrmGrid_" + u,
                    w = "TblGrid_" + u,
                    x = "#" + $.jgrid.jqID(w),
                    y = {
                        themodal: "editmod" + u,
                        modalhead: "edithd" + u,
                        modalcontent: "editcnt" + u,
                        scrollelm: v
                    },
                    z = !0,
                    A = 1,
                    B = 0,
                    C = "string" == typeof rp_ge[p.p.id].template && rp_ge[p.p.id].template.length > 0,
                    D = $.jgrid.getRegional(this, "errors");
                    rp_ge[p.p.id].styleUI = p.p.styleUI || "jQueryUI",
                    $.jgrid.isMobile() && (rp_ge[p.p.id].resize = !1),
                    "new" === a ? (a = "_empty", t = "add", b.caption = rp_ge[p.p.id].addCaption) : (b.caption = rp_ge[p.p.id].editCaption, t = "edit"),
                    b.recreateForm || $(p).data("formProp") && $.extend(rp_ge[$(this)[0].p.id], $(p).data("formProp"));
                    var E = !0;
                    b.checkOnUpdate && b.jqModal && !b.modal && (E = !1);
                    var F, G = isNaN(rp_ge[$(this)[0].p.id].dataheight) ? rp_ge[$(this)[0].p.id].dataheight: rp_ge[$(this)[0].p.id].dataheight + "px",
                    H = isNaN(rp_ge[$(this)[0].p.id].datawidth) ? rp_ge[$(this)[0].p.id].datawidth: rp_ge[$(this)[0].p.id].datawidth + "px",
                    I = $("<form name='FormPost' id='" + v + "' class='FormGrid' onSubmit='return false;' style='width:" + H + ";height:" + G + ";'></form>").data("disabled", !1);
                    if (C ? (F = o(rp_ge[$(this)[0].p.id].template), q = x) : (F = $("<table id='" + w + "' class='EditTable ui-common-table'><tbody></tbody></table>"), q = x + "_2"), v = "#" + $.jgrid.jqID(v), $(I).append("<div class='FormError " + f.error + "' style='display:none;'></div>"), $(I).append("<div class='tinfo topinfo'>" + rp_ge[p.p.id].topinfo + "</div>"), $(p.p.colModel).each(function() {
                        var a = this.formoptions;
                        A = Math.max(A, a ? a.colpos || 0 : 0),
                        B = Math.max(B, a ? a.rowpos || 0 : 0)
                    }), $(I).append(F), z = $(p).triggerHandler("jqGridAddEditBeforeInitData", [I, t]), void 0 === z && (z = !0), z && $.isFunction(rp_ge[p.p.id].beforeInitData) && (z = rp_ge[p.p.id].beforeInitData.call(p, I, t)), z !== !1) {
                        l(),
                        d(a, p, F, A);
                        var J = "rtl" === p.p.direction ? !0 : !1,
                        K = J ? "nData": "pData",
                        L = J ? "pData": "nData",
                        M = "<a id='" + K + "' class='fm-button " + f.button + "'><span class='" + f.icon_base + " " + e.icon_prev + "'></span></a>",
                        N = "<a id='" + L + "' class='fm-button " + f.button + "'><span class='" + f.icon_base + " " + e.icon_next + "'></span></a>",
                        O = "<a id='sData' class='fm-button " + f.button + "'>" + b.bSubmit + "</a>",
                        P = "<a id='cData' class='fm-button " + f.button + "'>" + b.bCancel + "</a>",
                        Q = "<table style='height:auto' class='EditTable ui-common-table' id='" + w + "_2'><tbody><tr><td colspan='2'><hr class='" + f.content + "' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>" + (J ? N + M: M + N) + "</td><td class='EditButton'>" + O + P + "</td></tr>";
                        if (Q += "</tbody></table>", B > 0) {
                            var R = [];
                            $.each($(F)[0].rows,
                            function(a, b) {
                                R[a] = b
                            }),
                            R.sort(function(a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }),
                            $.each(R,
                            function(a, b) {
                                $("tbody", F).append(b)
                            })
                        }
                        b.gbox = "#gbox_" + $.jgrid.jqID(u);
                        var S = !1;
                        b.closeOnEscape === !0 && (b.closeOnEscape = !1, S = !0);
                        var T;
                        if (C ? ($(I).find("#pData").replaceWith(M), $(I).find("#nData").replaceWith(N), $(I).find("#sData").replaceWith(O), $(I).find("#cData").replaceWith(P), T = $("<div id=" + w + "></div>").append(I)) : T = $("<div></div>").append(I).append(Q), $(I).append("<div class='binfo topinfo bottominfo'>" + rp_ge[p.p.id].bottominfo + "</div>"), $.jgrid.createModal(y, T, rp_ge[$(this)[0].p.id], "#gview_" + $.jgrid.jqID(p.p.id), $("#gbox_" + $.jgrid.jqID(p.p.id))[0]), J && ($("#pData, #nData", x + "_2").css("float", "right"), $(".EditButton", x + "_2").css("text-align", "left")), rp_ge[p.p.id].topinfo && $(".tinfo", v).show(), rp_ge[p.p.id].bottominfo && $(".binfo", v).show(), T = null, Q = null, $("#" + $.jgrid.jqID(y.themodal)).keydown(function(a) {
                            var c = a.target;
                            if ($(v).data("disabled") === !0) return ! 1;
                            if (rp_ge[p.p.id].savekey[0] === !0 && a.which === rp_ge[p.p.id].savekey[1] && "TEXTAREA" !== c.tagName) return $("#sData", x + "_2").trigger("click"),
                            !1;
                            if (27 === a.which) return k() ? (S && $.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                gb: b.gbox,
                                jqm: b.jqModal,
                                onClose: rp_ge[p.p.id].onClose,
                                removemodal: rp_ge[p.p.id].removemodal,
                                formprop: !rp_ge[p.p.id].recreateForm,
                                form: rp_ge[p.p.id].form
                            }), !1) : !1;
                            if (rp_ge[p.p.id].navkeys[0] === !0) {
                                if ("_empty" === $("#id_g", x).val()) return ! 0;
                                if (a.which === rp_ge[p.p.id].navkeys[1]) return $("#pData", q).trigger("click"),
                                !1;
                                if (a.which === rp_ge[p.p.id].navkeys[2]) return $("#nData", q).trigger("click"),
                                !1
                            }
                        }), b.checkOnUpdate && ($("a.ui-jqdialog-titlebar-close span", "#" + $.jgrid.jqID(y.themodal)).removeClass("jqmClose"), $("a.ui-jqdialog-titlebar-close", "#" + $.jgrid.jqID(y.themodal)).unbind("click").click(function() {
                            return k() ? ($.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(u),
                                jqm: b.jqModal,
                                onClose: rp_ge[p.p.id].onClose,
                                removemodal: rp_ge[p.p.id].removemodal,
                                formprop: !rp_ge[p.p.id].recreateForm,
                                form: rp_ge[p.p.id].form
                            }), !1) : !1
                        })), b.saveicon = $.extend([!0, "left", e.icon_save], b.saveicon), b.closeicon = $.extend([!0, "left", e.icon_close], b.closeicon), b.saveicon[0] === !0 && $("#sData", q).addClass("right" === b.saveicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.saveicon[2] + "'></span>"), b.closeicon[0] === !0 && $("#cData", q).addClass("right" === b.closeicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.closeicon[2] + "'></span>"), rp_ge[p.p.id].checkOnSubmit || rp_ge[p.p.id].checkOnUpdate) {
                            O = "<a id='sNew' class='fm-button " + f.button + "' style='z-index:1002'>" + b.bYes + "</a>",
                            N = "<a id='nNew' class='fm-button " + f.button + "' style='z-index:1002;margin-left:5px'>" + b.bNo + "</a>",
                            P = "<a id='cNew' class='fm-button " + f.button + "' style='z-index:1002;margin-left:5px;'>" + b.bExit + "</a>";
                            var U = b.zIndex || 999;
                            U++,
                            $("<div class='" + b.overlayClass + " jqgrid-overlay confirm' style='z-index:" + U + ";display:none;'>&#160;</div><div class='confirm ui-jqconfirm " + f.content + "' style='z-index:" + (U + 1) + "'>" + b.saveData + "<br/><br/>" + O + N + P + "</div>").insertAfter(v),
                            $("#sNew", "#" + $.jgrid.jqID(y.themodal)).click(function() {
                                return i(),
                                $(v).data("disabled", !1),
                                $(".confirm", "#" + $.jgrid.jqID(y.themodal)).hide(),
                                !1
                            }),
                            $("#nNew", "#" + $.jgrid.jqID(y.themodal)).click(function() {
                                return $(".confirm", "#" + $.jgrid.jqID(y.themodal)).hide(),
                                $(v).data("disabled", !1),
                                setTimeout(function() {
                                    $(":input:visible", v)[0].focus()
                                },
                                0),
                                !1
                            }),
                            $("#cNew", "#" + $.jgrid.jqID(y.themodal)).click(function() {
                                return $(".confirm", "#" + $.jgrid.jqID(y.themodal)).hide(),
                                $(v).data("disabled", !1),
                                $.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                    gb: "#gbox_" + $.jgrid.jqID(u),
                                    jqm: b.jqModal,
                                    onClose: rp_ge[p.p.id].onClose,
                                    removemodal: rp_ge[p.p.id].removemodal,
                                    formprop: !rp_ge[p.p.id].recreateForm,
                                    form: rp_ge[p.p.id].form
                                }),
                                !1
                            })
                        }
                        $(p).triggerHandler("jqGridAddEditInitializeForm", [$(v), t]),
                        $.isFunction(rp_ge[p.p.id].onInitializeForm) && rp_ge[p.p.id].onInitializeForm.call(p, $(v), t),
                        "_empty" !== a && rp_ge[p.p.id].viewPagerButtons ? $("#pData,#nData", q).show() : $("#pData,#nData", q).hide(),
                        $(p).triggerHandler("jqGridAddEditBeforeShowForm", [$(v), t]),
                        $.isFunction(rp_ge[p.p.id].beforeShowForm) && rp_ge[p.p.id].beforeShowForm.call(p, $(v), t),
                        $("#" + $.jgrid.jqID(y.themodal)).data("onClose", rp_ge[p.p.id].onClose),
                        $.jgrid.viewModal("#" + $.jgrid.jqID(y.themodal), {
                            gbox: "#gbox_" + $.jgrid.jqID(u),
                            jqm: b.jqModal,
                            overlay: b.overlay,
                            modal: b.modal,
                            overlayClass: b.overlayClass,
                            focusField: b.focusField,
                            onHide: function(a) {
                                var b = $("#editmod" + u)[0].style.height,
                                c = $("#editmod" + u)[0].style.width;
                                b.indexOf("px") > -1 && (b = parseFloat(b)),
                                c.indexOf("px") > -1 && (c = parseFloat(c)),
                                $(p).data("formProp", {
                                    top: parseFloat($(a.w).css("top")),
                                    left: parseFloat($(a.w).css("left")),
                                    width: c,
                                    height: b,
                                    dataheight: $(v).height(),
                                    datawidth: $(v).width()
                                }),
                                a.w.remove(),
                                a.o && a.o.remove()
                            }
                        }),
                        E || $("." + $.jgrid.jqID(b.overlayClass)).click(function() {
                            return k() ? ($.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(u),
                                jqm: b.jqModal,
                                onClose: rp_ge[p.p.id].onClose,
                                removemodal: rp_ge[p.p.id].removemodal,
                                formprop: !rp_ge[p.p.id].recreateForm,
                                form: rp_ge[p.p.id].form
                            }), !1) : !1
                        }),
                        $(".fm-button", "#" + $.jgrid.jqID(y.themodal)).hover(function() {
                            $(this).addClass(f.hover)
                        },
                        function() {
                            $(this).removeClass(f.hover)
                        }),
                        $("#sData", q).click(function() {
                            return r = {},
                            $(".FormError", v).hide(),
                            c(),
                            "_empty" === r[p.p.id + "_id"] ? i() : b.checkOnSubmit === !0 ? (s = j(r, rp_ge[p.p.id]._savedData), s ? ($(v).data("disabled", !0), $(".confirm", "#" + $.jgrid.jqID(y.themodal)).show()) : i()) : i(),
                            !1
                        }),
                        $("#cData", q).click(function() {
                            return k() ? ($.jgrid.hideModal("#" + $.jgrid.jqID(y.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(u),
                                jqm: b.jqModal,
                                onClose: rp_ge[p.p.id].onClose,
                                removemodal: rp_ge[p.p.id].removemodal,
                                formprop: !rp_ge[p.p.id].recreateForm,
                                form: rp_ge[p.p.id].form
                            }), !1) : !1
                        }),
                        $("#nData", q).click(function() {
                            if (!k()) return ! 1;
                            $(".FormError", v).hide();
                            var a = n();
                            if (a[0] = parseInt(a[0], 10), -1 !== a[0] && a[1][a[0] + 1]) {
                                $(p).triggerHandler("jqGridAddEditClickPgButtons", ["next", $(v), a[1][a[0]]]);
                                var c;
                                if ($.isFunction(b.onclickPgButtons) && (c = b.onclickPgButtons.call(p, "next", $(v), a[1][a[0]]), void 0 !== c && c === !1)) return ! 1;
                                if ($("#" + $.jgrid.jqID(a[1][a[0] + 1])).hasClass(f.disabled)) return ! 1;
                                g(a[1][a[0] + 1], p, v),
                                $(p).jqGrid("setSelection", a[1][a[0] + 1]),
                                $(p).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", $(v), a[1][a[0]]]),
                                $.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons.call(p, "next", $(v), a[1][a[0] + 1]),
                                m(a[0] + 1, a)
                            }
                            return ! 1
                        }),
                        $("#pData", q).click(function() {
                            if (!k()) return ! 1;
                            $(".FormError", v).hide();
                            var a = n();
                            if ( - 1 !== a[0] && a[1][a[0] - 1]) {
                                $(p).triggerHandler("jqGridAddEditClickPgButtons", ["prev", $(v), a[1][a[0]]]);
                                var c;
                                if ($.isFunction(b.onclickPgButtons) && (c = b.onclickPgButtons.call(p, "prev", $(v), a[1][a[0]]), void 0 !== c && c === !1)) return ! 1;
                                if ($("#" + $.jgrid.jqID(a[1][a[0] - 1])).hasClass(f.disabled)) return ! 1;
                                g(a[1][a[0] - 1], p, v),
                                $(p).jqGrid("setSelection", a[1][a[0] - 1]),
                                $(p).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", $(v), a[1][a[0]]]),
                                $.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons.call(p, "prev", $(v), a[1][a[0] - 1]),
                                m(a[0] - 1, a)
                            }
                            return ! 1
                        }),
                        $(p).triggerHandler("jqGridAddEditAfterShowForm", [$(v), t]),
                        $.isFunction(rp_ge[p.p.id].afterShowForm) && rp_ge[p.p.id].afterShowForm.call(p, $(v), t);
                        var V = n();
                        m(V[0], V)
                    }
                }
            })
        },
        viewGridRow: function(a, b) {
            var c = $.jgrid.getRegional(this[0], "view"),
            d = this[0].p.styleUI,
            e = $.jgrid.styleUI[d].formedit,
            f = $.jgrid.styleUI[d].common;
            return b = $.extend(!0, {
                top: 0,
                left: 0,
                width: 500,
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                jqModal: !0,
                closeOnEscape: !1,
                labelswidth: "30%",
                closeicon: [],
                navkeys: [!1, 38, 40],
                onClose: null,
                beforeShowForm: null,
                beforeInitData: null,
                viewPagerButtons: !0,
                recreateForm: !1,
                removemodal: !0,
                form: "view"
            },
            c, b || {}),
            rp_ge[$(this)[0].p.id] = b,
            this.each(function() {
                function c() { (rp_ge[j.p.id].closeOnEscape === !0 || rp_ge[j.p.id].navkeys[0] === !0) && setTimeout(function() {
                        $(".ui-jqdialog-titlebar-close", "#" + $.jgrid.jqID(p.modalhead)).attr("tabindex", "-1").focus()
                    },
                    0)
                }
                function d(a, c, d, e) {
                    var g, h, i, j, k, l, m, n, o, p = 0,
                    q = [],
                    r = !1,
                    s = "<td class='CaptionTD form-view-label " + f.content + "' width='" + b.labelswidth + "'>&#160;</td><td class='DataTD form-view-data ui-helper-reset " + f.content + "'>&#160;</td>",
                    t = "",
                    u = "<td class='CaptionTD form-view-label " + f.content + "'>&#160;</td><td class='DataTD form-view-data " + f.content + "'>&#160;</td>",
                    v = ["integer", "number", "currency"],
                    w = 0,
                    x = 0;
                    for (l = 1; e >= l; l++) t += 1 === l ? s: u;
                    if ($(c.p.colModel).each(function() {
                        h = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1,
                        h || "right" !== this.align || (this.formatter && -1 !== $.inArray(this.formatter, v) ? w = Math.max(w, parseInt(this.width, 10)) : x = Math.max(x, parseInt(this.width, 10)))
                    }), m = 0 !== w ? w: 0 !== x ? x: 0, r = $(c).jqGrid("getInd", a), $(c.p.colModel).each(function(a) {
                        if (g = this.name, n = !1, h = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, k = h ? "style='display:none'": "", o = "boolean" != typeof this.viewable ? !0 : this.viewable, "cb" !== g && "subgrid" !== g && "rn" !== g && o) {
                            j = r === !1 ? "": g === c.p.ExpandColumn && c.p.treeGrid === !0 ? $("td:eq(" + a + ")", c.rows[r]).text() : $("td:eq(" + a + ")", c.rows[r]).html(),
                            n = "right" === this.align && 0 !== m ? !0 : !1;
                            var b = $.extend({},
                            {
                                rowabove: !1,
                                rowcontent: ""
                            },
                            this.formoptions || {}),
                            f = parseInt(b.rowpos, 10) || p + 1,
                            l = parseInt(2 * (parseInt(b.colpos, 10) || 1), 10);
                            if (b.rowabove) {
                                var s = $("<tr><td class='contentinfo' colspan='" + 2 * e + "'>" + b.rowcontent + "</td></tr>");
                                $(d).append(s),
                                s[0].rp = f
                            }
                            i = $(d).find("tr[rowpos=" + f + "]"),
                            0 === i.length && (i = $("<tr " + k + " rowpos='" + f + "'></tr>").addClass("FormData").attr("id", "trv_" + g), $(i).append(t), $(d).append(i), i[0].rp = f),
                            $("td:eq(" + (l - 2) + ")", i[0]).html("<b>" + (void 0 === b.label ? c.p.colNames[a] : b.label) + "</b>"),
                            $("td:eq(" + (l - 1) + ")", i[0]).append("<span>" + j + "</span>").attr("id", "v_" + g),
                            n && $("td:eq(" + (l - 1) + ") span", i[0]).css({
                                "text-align": "right",
                                width: m + "px"
                            }),
                            q[p] = a,
                            p++
                        }
                    }), p > 0) {
                        var y = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * e - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + a + "'/></td></tr>");
                        y[0].rp = p + 99,
                        $(d).append(y)
                    }
                    return q
                }
                function g(a, b) {
                    var c, d, e, f, g = 0;
                    f = $(b).jqGrid("getInd", a, !0),
                    f && ($("td", f).each(function(a) {
                        c = b.p.colModel[a].name,
                        d = b.p.colModel[a].editrules && b.p.colModel[a].editrules.edithidden === !0 ? !1 : b.p.colModel[a].hidden === !0 ? !0 : !1,
                        "cb" !== c && "subgrid" !== c && "rn" !== c && (e = c === b.p.ExpandColumn && b.p.treeGrid === !0 ? $(this).text() : $(this).html(), c = $.jgrid.jqID("v_" + c), $("#" + c + " span", "#" + m).html(e), d && $("#" + c, "#" + m).parents("tr:first").hide(), g++)
                    }), g > 0 && $("#id_g", "#" + m).val(a))
                }
                function h(a, b) {
                    var c = b[1].length - 1;
                    0 === a ? $("#pData", "#" + m + "_2").addClass(f.disabled) : void 0 !== b[1][a - 1] && $("#" + $.jgrid.jqID(b[1][a - 1])).hasClass(f.disabled) ? $("#pData", m + "_2").addClass(f.disabled) : $("#pData", "#" + m + "_2").removeClass(f.disabled),
                    a === c ? $("#nData", "#" + m + "_2").addClass(f.disabled) : void 0 !== b[1][a + 1] && $("#" + $.jgrid.jqID(b[1][a + 1])).hasClass(f.disabled) ? $("#nData", m + "_2").addClass(f.disabled) : $("#nData", "#" + m + "_2").removeClass(f.disabled)
                }
                function i() {
                    var a = $(j).jqGrid("getDataIDs"),
                    b = $("#id_g", "#" + m).val(),
                    c = $.inArray(b, a);
                    return [c, a]
                }
                var j = this;
                if (j.grid && a) {
                    var k = j.p.id,
                    l = "ViewGrid_" + $.jgrid.jqID(k),
                    m = "ViewTbl_" + $.jgrid.jqID(k),
                    n = "ViewGrid_" + k,
                    o = "ViewTbl_" + k,
                    p = {
                        themodal: "viewmod" + k,
                        modalhead: "viewhd" + k,
                        modalcontent: "viewcnt" + k,
                        scrollelm: l
                    },
                    q = $.isFunction(rp_ge[j.p.id].beforeInitData) ? rp_ge[j.p.id].beforeInitData: !1,
                    r = !0,
                    s = 1,
                    t = 0;
                    rp_ge[j.p.id].styleUI = j.p.styleUI || "jQueryUI",
                    b.recreateForm || $(j).data("viewProp") && $.extend(rp_ge[$(this)[0].p.id], $(j).data("viewProp"));
                    var u = isNaN(rp_ge[$(this)[0].p.id].dataheight) ? rp_ge[$(this)[0].p.id].dataheight: rp_ge[$(this)[0].p.id].dataheight + "px",
                    v = isNaN(rp_ge[$(this)[0].p.id].datawidth) ? rp_ge[$(this)[0].p.id].datawidth: rp_ge[$(this)[0].p.id].datawidth + "px",
                    w = $("<form name='FormPost' id='" + n + "' class='FormGrid' style='width:" + v + ";height:" + u + ";'></form>"),
                    x = $("<table id='" + o + "' class='EditTable ViewTable'><tbody></tbody></table>");
                    if ($(j.p.colModel).each(function() {
                        var a = this.formoptions;
                        s = Math.max(s, a ? a.colpos || 0 : 0),
                        t = Math.max(t, a ? a.rowpos || 0 : 0)
                    }), $(w).append(x), q && (r = q.call(j, w), void 0 === r && (r = !0)), r !== !1) {
                        d(a, j, x, s);
                        var y = "rtl" === j.p.direction ? !0 : !1,
                        z = y ? "nData": "pData",
                        A = y ? "pData": "nData",
                        B = "<a id='" + z + "' class='fm-button " + f.button + "'><span class='" + f.icon_base + " " + e.icon_prev + "'></span></a>",
                        C = "<a id='" + A + "' class='fm-button " + f.button + "'><span class='" + f.icon_base + " " + e.icon_next + "'></span></a>",
                        D = "<a id='cData' class='fm-button " + f.button + "'>" + b.bClose + "</a>";
                        if (t > 0) {
                            var E = [];
                            $.each($(x)[0].rows,
                            function(a, b) {
                                E[a] = b
                            }),
                            E.sort(function(a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }),
                            $.each(E,
                            function(a, b) {
                                $("tbody", x).append(b)
                            })
                        }
                        b.gbox = "#gbox_" + $.jgrid.jqID(k);
                        var F = $("<div></div>").append(w).append("<table border='0' class='EditTable' id='" + m + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + b.labelswidth + "'>" + (y ? C + B: B + C) + "</td><td class='EditButton'>" + D + "</td></tr></tbody></table>");
                        $.jgrid.createModal(p, F, rp_ge[$(this)[0].p.id], "#gview_" + $.jgrid.jqID(j.p.id), $("#gview_" + $.jgrid.jqID(j.p.id))[0]),
                        y && ($("#pData, #nData", "#" + m + "_2").css("float", "right"), $(".EditButton", "#" + m + "_2").css("text-align", "left")),
                        b.viewPagerButtons || $("#pData, #nData", "#" + m + "_2").hide(),
                        F = null,
                        $("#" + p.themodal).keydown(function(a) {
                            if (27 === a.which) return rp_ge[j.p.id].closeOnEscape && $.jgrid.hideModal("#" + $.jgrid.jqID(p.themodal), {
                                gb: b.gbox,
                                jqm: b.jqModal,
                                onClose: b.onClose,
                                removemodal: rp_ge[j.p.id].removemodal,
                                formprop: !rp_ge[j.p.id].recreateForm,
                                form: rp_ge[j.p.id].form
                            }),
                            !1;
                            if (b.navkeys[0] === !0) {
                                if (a.which === b.navkeys[1]) return $("#pData", "#" + m + "_2").trigger("click"),
                                !1;
                                if (a.which === b.navkeys[2]) return $("#nData", "#" + m + "_2").trigger("click"),
                                !1
                            }
                        }),
                        b.closeicon = $.extend([!0, "left", e.icon_close], b.closeicon),
                        b.closeicon[0] === !0 && $("#cData", "#" + m + "_2").addClass("right" === b.closeicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.closeicon[2] + "'></span>"),
                        $.isFunction(b.beforeShowForm) && b.beforeShowForm.call(j, $("#" + l)),
                        $.jgrid.viewModal("#" + $.jgrid.jqID(p.themodal), {
                            gbox: "#gbox_" + $.jgrid.jqID(k),
                            jqm: b.jqModal,
                            overlay: b.overlay,
                            modal: b.modal,
                            onHide: function(a) {
                                $(j).data("viewProp", {
                                    top: parseFloat($(a.w).css("top")),
                                    left: parseFloat($(a.w).css("left")),
                                    width: $(a.w).width(),
                                    height: $(a.w).height(),
                                    dataheight: $("#" + l).height(),
                                    datawidth: $("#" + l).width()
                                }),
                                a.w.remove(),
                                a.o && a.o.remove()
                            }
                        }),
                        $(".fm-button:not(." + f.disabled + ")", "#" + m + "_2").hover(function() {
                            $(this).addClass(f.hover)
                        },
                        function() {
                            $(this).removeClass(f.hover)
                        }),
                        c(),
                        $("#cData", "#" + m + "_2").click(function() {
                            return $.jgrid.hideModal("#" + $.jgrid.jqID(p.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(k),
                                jqm: b.jqModal,
                                onClose: b.onClose,
                                removemodal: rp_ge[j.p.id].removemodal,
                                formprop: !rp_ge[j.p.id].recreateForm,
                                form: rp_ge[j.p.id].form
                            }),
                            !1
                        }),
                        $("#nData", "#" + m + "_2").click(function() {
                            $("#FormError", "#" + m).hide();
                            var a = i();
                            return a[0] = parseInt(a[0], 10),
                            -1 !== a[0] && a[1][a[0] + 1] && ($.isFunction(b.onclickPgButtons) && b.onclickPgButtons.call(j, "next", $("#" + l), a[1][a[0]]), g(a[1][a[0] + 1], j), $(j).jqGrid("setSelection", a[1][a[0] + 1]), $.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons.call(j, "next", $("#" + l), a[1][a[0] + 1]), h(a[0] + 1, a)),
                            c(),
                            !1
                        }),
                        $("#pData", "#" + m + "_2").click(function() {
                            $("#FormError", "#" + m).hide();
                            var a = i();
                            return - 1 !== a[0] && a[1][a[0] - 1] && ($.isFunction(b.onclickPgButtons) && b.onclickPgButtons.call(j, "prev", $("#" + l), a[1][a[0]]), g(a[1][a[0] - 1], j), $(j).jqGrid("setSelection", a[1][a[0] - 1]), $.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons.call(j, "prev", $("#" + l), a[1][a[0] - 1]), h(a[0] - 1, a)),
                            c(),
                            !1
                        });
                        var G = i();
                        h(G[0], G)
                    }
                }
            })
        },
        delGridRow: function(a, b) {
            var c = $.jgrid.getRegional(this[0], "del"),
            d = this[0].p.styleUI,
            e = $.jgrid.styleUI[d].formedit,
            f = $.jgrid.styleUI[d].common;
            return b = $.extend(!0, {
                top: 0,
                left: 0,
                width: 240,
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: "",
                mtype: "POST",
                reloadAfterSubmit: !0,
                beforeShowForm: null,
                beforeInitData: null,
                afterShowForm: null,
                beforeSubmit: null,
                onclickSubmit: null,
                afterSubmit: null,
                jqModal: !0,
                closeOnEscape: !1,
                delData: {},
                delicon: [],
                cancelicon: [],
                onClose: null,
                ajaxDelOptions: {},
                processing: !1,
                serializeDelData: null,
                useDataProxy: !1
            },
            c, b || {}),
            rp_ge[$(this)[0].p.id] = b,
            this.each(function() {
                var c = this;
                if (c.grid && a) {
                    var d, g, h, i, j = $.isFunction(rp_ge[c.p.id].beforeShowForm),
                    k = $.isFunction(rp_ge[c.p.id].afterShowForm),
                    l = $.isFunction(rp_ge[c.p.id].beforeInitData) ? rp_ge[c.p.id].beforeInitData: !1,
                    m = c.p.id,
                    n = {},
                    o = !0,
                    p = "DelTbl_" + $.jgrid.jqID(m),
                    q = "DelTbl_" + m,
                    r = {
                        themodal: "delmod" + m,
                        modalhead: "delhd" + m,
                        modalcontent: "delcnt" + m,
                        scrollelm: p
                    };
                    if (rp_ge[c.p.id].styleUI = c.p.styleUI || "jQueryUI", $.isArray(a) && (a = a.join()), void 0 !== $("#" + $.jgrid.jqID(r.themodal))[0]) {
                        if (l && (o = l.call(c, $("#" + p)), void 0 === o && (o = !0)), o === !1) return;
                        $("#DelData>td", "#" + p).text(a),
                        $("#DelError", "#" + p).hide(),
                        rp_ge[c.p.id].processing === !0 && (rp_ge[c.p.id].processing = !1, $("#dData", "#" + p).removeClass(f.active)),
                        j && rp_ge[c.p.id].beforeShowForm.call(c, $("#" + p)),
                        $.jgrid.viewModal("#" + $.jgrid.jqID(r.themodal), {
                            gbox: "#gbox_" + $.jgrid.jqID(m),
                            jqm: rp_ge[c.p.id].jqModal,
                            jqM: !1,
                            overlay: rp_ge[c.p.id].overlay,
                            modal: rp_ge[c.p.id].modal
                        }),
                        k && rp_ge[c.p.id].afterShowForm.call(c, $("#" + p))
                    } else {
                        var s = isNaN(rp_ge[c.p.id].dataheight) ? rp_ge[c.p.id].dataheight: rp_ge[c.p.id].dataheight + "px",
                        t = isNaN(b.datawidth) ? b.datawidth: b.datawidth + "px",
                        u = "<div id='" + q + "' class='formdata' style='width:" + t + ";overflow:auto;position:relative;height:" + s + ";'>";
                        u += "<table class='DelTable'><tbody>",
                        u += "<tr id='DelError' style='display:none'><td class='" + f.error + "'></td></tr>",
                        u += "<tr id='DelData' style='display:none'><td >" + a + "</td></tr>",
                        u += '<tr><td class="delmsg" style="white-space:pre;">' + rp_ge[c.p.id].msg + "</td></tr><tr><td >&#160;</td></tr>",
                        u += "</tbody></table></div>";
                        var v = "<a id='dData' class='fm-button " + f.button + "'>" + b.bSubmit + "</a>",
                        w = "<a id='eData' class='fm-button " + f.button + "'>" + b.bCancel + "</a>";
                        if (u += "<table class='EditTable ui-common-table' id='" + p + "_2'><tbody><tr><td><hr class='" + f.content + "' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>" + v + "&#160;" + w + "</td></tr></tbody></table>", b.gbox = "#gbox_" + $.jgrid.jqID(m), $.jgrid.createModal(r, u, rp_ge[c.p.id], "#gview_" + $.jgrid.jqID(c.p.id), $("#gview_" + $.jgrid.jqID(c.p.id))[0]), l && (o = l.call(c, $(u)), void 0 === o && (o = !0)), o === !1) return;
                        $(".fm-button", "#" + p + "_2").hover(function() {
                            $(this).addClass(f.hover)
                        },
                        function() {
                            $(this).removeClass(f.hover)
                        }),
                        b.delicon = $.extend([!0, "left", e.icon_del], rp_ge[c.p.id].delicon),
                        b.cancelicon = $.extend([!0, "left", e.icon_cancel], rp_ge[c.p.id].cancelicon),
                        b.delicon[0] === !0 && $("#dData", "#" + p + "_2").addClass("right" === b.delicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.delicon[2] + "'></span>"),
                        b.cancelicon[0] === !0 && $("#eData", "#" + p + "_2").addClass("right" === b.cancelicon[1] ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.cancelicon[2] + "'></span>"),
                        $("#dData", "#" + p + "_2").click(function() {
                            var a, e = [!0, ""],
                            j = $("#DelData>td", "#" + p).text();
                            if (n = {},
                            $.isFunction(rp_ge[c.p.id].onclickSubmit) && (n = rp_ge[c.p.id].onclickSubmit.call(c, rp_ge[c.p.id], j) || {}), $.isFunction(rp_ge[c.p.id].beforeSubmit) && (e = rp_ge[c.p.id].beforeSubmit.call(c, j)), e[0] && !rp_ge[c.p.id].processing) {
                                if (rp_ge[c.p.id].processing = !0, h = c.p.prmNames, d = $.extend({},
                                rp_ge[c.p.id].delData, n), i = h.oper, d[i] = h.deloper, g = h.id, j = String(j).split(","), !j.length) return ! 1;
                                for (a in j) j.hasOwnProperty(a) && (j[a] = $.jgrid.stripPref(c.p.idPrefix, j[a]));
                                d[g] = j.join(),
                                $(this).addClass(f.active);
                                var k = $.extend({
                                    url: rp_ge[c.p.id].url || $(c).jqGrid("getGridParam", "editurl"),
                                    type: rp_ge[c.p.id].mtype,
                                    data: $.isFunction(rp_ge[c.p.id].serializeDelData) ? rp_ge[c.p.id].serializeDelData.call(c, d) : d,
                                    complete: function(a, g) {
                                        var h;
                                        if ($("#dData", "#" + p + "_2").removeClass(f.active), a.status >= 300 && 304 !== a.status ? (e[0] = !1, e[1] = $.isFunction(rp_ge[c.p.id].errorTextFormat) ? rp_ge[c.p.id].errorTextFormat.call(c, a) : g + " Status: '" + a.statusText + "'. Error code: " + a.status) : $.isFunction(rp_ge[c.p.id].afterSubmit) && (e = rp_ge[c.p.id].afterSubmit.call(c, a, d)), e[0] === !1) $("#DelError>td", "#" + p).html(e[1]),
                                        $("#DelError", "#" + p).show();
                                        else {
                                            if (rp_ge[c.p.id].reloadAfterSubmit && "local" !== c.p.datatype) $(c).trigger("reloadGrid");
                                            else {
                                                if (c.p.treeGrid === !0) try {
                                                    $(c).jqGrid("delTreeNode", c.p.idPrefix + j[0])
                                                } catch(i) {} else for (h = 0; h < j.length; h++) $(c).jqGrid("delRowData", c.p.idPrefix + j[h]);
                                                c.p.selrow = null,
                                                c.p.selarrrow = []
                                            }
                                            $.isFunction(rp_ge[c.p.id].afterComplete) && setTimeout(function() {
                                                rp_ge[c.p.id].afterComplete.call(c, a, j)
                                            },
                                            500)
                                        }
                                        rp_ge[c.p.id].processing = !1,
                                        e[0] && $.jgrid.hideModal("#" + $.jgrid.jqID(r.themodal), {
                                            gb: "#gbox_" + $.jgrid.jqID(m),
                                            jqm: b.jqModal,
                                            onClose: rp_ge[c.p.id].onClose
                                        })
                                    }
                                },
                                $.jgrid.ajaxOptions, rp_ge[c.p.id].ajaxDelOptions);
                                if (k.url || rp_ge[c.p.id].useDataProxy || ($.isFunction(c.p.dataProxy) ? rp_ge[c.p.id].useDataProxy = !0 : (e[0] = !1, e[1] += " " + $.jgrid.getRegional(c, "errors.nourl"))), e[0]) if (rp_ge[c.p.id].useDataProxy) {
                                    var l = c.p.dataProxy.call(c, k, "del_" + c.p.id);
                                    void 0 === l && (l = [!0, ""]),
                                    l[0] === !1 ? (e[0] = !1, e[1] = l[1] || "Error deleting the selected row!") : $.jgrid.hideModal("#" + $.jgrid.jqID(r.themodal), {
                                        gb: "#gbox_" + $.jgrid.jqID(m),
                                        jqm: b.jqModal,
                                        onClose: rp_ge[c.p.id].onClose
                                    })
                                } else "clientArray" === k.url ? (d = k.data, k.complete({
                                    status: 200,
                                    statusText: ""
                                },
                                "")) : $.ajax(k)
                            }
                            return e[0] === !1 && ($("#DelError>td", "#" + p).html(e[1]), $("#DelError", "#" + p).show()),
                            !1
                        }),
                        $("#eData", "#" + p + "_2").click(function() {
                            return $.jgrid.hideModal("#" + $.jgrid.jqID(r.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(m),
                                jqm: rp_ge[c.p.id].jqModal,
                                onClose: rp_ge[c.p.id].onClose
                            }),
                            !1
                        }),
                        j && rp_ge[c.p.id].beforeShowForm.call(c, $("#" + p)),
                        $.jgrid.viewModal("#" + $.jgrid.jqID(r.themodal), {
                            gbox: "#gbox_" + $.jgrid.jqID(m),
                            jqm: rp_ge[c.p.id].jqModal,
                            overlay: rp_ge[c.p.id].overlay,
                            modal: rp_ge[c.p.id].modal
                        }),
                        k && rp_ge[c.p.id].afterShowForm.call(c, $("#" + p))
                    }
                    rp_ge[c.p.id].closeOnEscape === !0 && setTimeout(function() {
                        $(".ui-jqdialog-titlebar-close", "#" + $.jgrid.jqID(r.modalhead)).attr("tabindex", "-1").focus()
                    },
                    0)
                }
            })
        },
        navGrid: function(a, b, c, d, e, f, g) {
            var h = $.jgrid.getRegional(this[0], "nav"),
            i = this[0].p.styleUI,
            j = $.jgrid.styleUI[i].navigator,
            k = $.jgrid.styleUI[i].common;
            return b = $.extend({
                edit: !0,
                editicon: j.icon_edit_nav,
                add: !0,
                addicon: j.icon_add_nav,
                del: !0,
                delicon: j.icon_del_nav,
                search: !0,
                searchicon: j.icon_search_nav,
                refresh: !0,
                refreshicon: j.icon_refresh_nav,
                refreshstate: "firstpage",
                view: !1,
                viewicon: j.icon_view_nav,
                position: "left",
                closeOnEscape: !0,
                beforeRefresh: null,
                afterRefresh: null,
                cloneToTop: !1,
                alertwidth: 200,
                alertheight: "auto",
                alerttop: null,
                alertleft: null,
                alertzIndex: null,
                dropmenu: !1
            },
            h, b || {}),
            this.each(function() {
                if (!this.p.navGrid) {
                    var j, l, m, n = {
                        themodal: "alertmod_" + this.p.id,
                        modalhead: "alerthd_" + this.p.id,
                        modalcontent: "alertcnt_" + this.p.id
                    },
                    o = this;
                    if (o.grid && "string" == typeof a) {
                        $(o).data("navGrid") || $(o).data("navGrid", b),
                        m = $(o).data("navGrid"),
                        o.p.force_regional && (m = $.extend(m, h)),
                        void 0 === $("#" + n.themodal)[0] && (m.alerttop || m.alertleft || (void 0 !== window.innerWidth ? (m.alertleft = window.innerWidth, m.alerttop = window.innerHeight) : void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth ? (m.alertleft = document.documentElement.clientWidth, m.alerttop = document.documentElement.clientHeight) : (m.alertleft = 1024, m.alerttop = 768), m.alertleft = m.alertleft / 2 - parseInt(m.alertwidth, 10) / 2, m.alerttop = m.alerttop / 2 - 25), $.jgrid.createModal(n, "<div>" + m.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>", {
                            gbox: "#gbox_" + $.jgrid.jqID(o.p.id),
                            jqModal: !0,
                            drag: !0,
                            resize: !0,
                            caption: m.alertcap,
                            top: m.alerttop,
                            left: m.alertleft,
                            width: m.alertwidth,
                            height: m.alertheight,
                            closeOnEscape: m.closeOnEscape,
                            zIndex: m.alertzIndex,
                            styleUI: o.p.styleUI
                        },
                        "#gview_" + $.jgrid.jqID(o.p.id), $("#gbox_" + $.jgrid.jqID(o.p.id))[0], !0));
                        var p, q = 1,
                        r = function() {
                            $(this).hasClass(k.disabled) || $(this).addClass(k.hover)
                        },
                        s = function() {
                            $(this).removeClass(k.hover)
                        };
                        for (m.cloneToTop && o.p.toppager && (q = 2), p = 0; q > p; p++) {
                            var t, u, v, w = $("<table class='ui-pg-table navtable ui-common-table'><tbody><tr></tr></tbody></table>"),
                            x = "<td class='ui-pg-button " + k.disabled + "' style='width:4px;'><span class='ui-separator'></span></td>";
                            0 === p ? (u = a, v = o.p.id, u === o.p.toppager && (v += "_top", q = 1)) : (u = o.p.toppager, v = o.p.id + "_top"),
                            "rtl" === o.p.direction && $(w).attr("dir", "rtl").css("float", "right"),
                            d = d || {},
                            m.add && (t = $("<td class='ui-pg-button " + k.cornerall + "'></td>"), $(t).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.addicon + "'></span>" + m.addtext + "</div>"), $("tr", w).append(t), $(t, w).attr({
                                title: m.addtitle || "",
                                id: d.id || "add_" + v
                            }).click(function() {
                                return $(this).hasClass(k.disabled) || ($.isFunction(m.addfunc) ? m.addfunc.call(o) : $(o).jqGrid("editGridRow", "new", d)),
                                !1
                            }).hover(r, s), t = null),
                            c = c || {},
                            m.edit && (t = $("<td class='ui-pg-button " + k.cornerall + "'></td>"), $(t).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.editicon + "'></span>" + m.edittext + "</div>"), $("tr", w).append(t), $(t, w).attr({
                                title: m.edittitle || "",
                                id: c.id || "edit_" + v
                            }).click(function() {
                                if (!$(this).hasClass(k.disabled)) {
                                    var a = o.p.selrow;
                                    a ? $.isFunction(m.editfunc) ? m.editfunc.call(o, a) : $(o).jqGrid("editGridRow", a, c) : ($.jgrid.viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + $.jgrid.jqID(o.p.id),
                                        jqm: !0
                                    }), $("#jqg_alrt").focus())
                                }
                                return ! 1
                            }).hover(r, s), t = null),
                            g = g || {},
                            m.view && (t = $("<td class='ui-pg-button " + k.cornerall + "'></td>"), $(t).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.viewicon + "'></span>" + m.viewtext + "</div>"), $("tr", w).append(t), $(t, w).attr({
                                title: m.viewtitle || "",
                                id: g.id || "view_" + v
                            }).click(function() {
                                if (!$(this).hasClass(k.disabled)) {
                                    var a = o.p.selrow;
                                    a ? $.isFunction(m.viewfunc) ? m.viewfunc.call(o, a) : $(o).jqGrid("viewGridRow", a, g) : ($.jgrid.viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + $.jgrid.jqID(o.p.id),
                                        jqm: !0
                                    }), $("#jqg_alrt").focus())
                                }
                                return ! 1
                            }).hover(r, s), t = null),
                            e = e || {},
                            m.del && (t = $("<td class='ui-pg-button " + k.cornerall + "'></td>"), $(t).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.delicon + "'></span>" + m.deltext + "</div>"), $("tr", w).append(t), $(t, w).attr({
                                title: m.deltitle || "",
                                id: e.id || "del_" + v
                            }).click(function() {
                                if (!$(this).hasClass(k.disabled)) {
                                    var a;
                                    o.p.multiselect ? (a = o.p.selarrrow, 0 === a.length && (a = null)) : a = o.p.selrow,
                                    a ? $.isFunction(m.delfunc) ? m.delfunc.call(o, a) : $(o).jqGrid("delGridRow", a, e) : ($.jgrid.viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + $.jgrid.jqID(o.p.id),
                                        jqm: !0
                                    }), $("#jqg_alrt").focus())
                                }
                                return ! 1
                            }).hover(r, s), t = null),
                            (m.add || m.edit || m.del || m.view) && $("tr", w).append(x),
                            f = f || {},
                            m.search && (t = $("<td class='ui-pg-button " + k.cornerall + "'></td>"), $(t).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.searchicon + "'></span>" + m.searchtext + "</div>"), $("tr", w).append(t), $(t, w).attr({
                                title: m.searchtitle || "",
                                id: f.id || "search_" + v
                            }).click(function() {
                                return $(this).hasClass(k.disabled) || ($.isFunction(m.searchfunc) ? m.searchfunc.call(o, f) : $(o).jqGrid("searchGrid", f)),
                                !1
                            }).hover(r, s), f.showOnLoad && f.showOnLoad === !0 && $(t, w).click(), t = null),
                            m.refresh && (t = $("<td class='ui-pg-button " + k.cornerall + "'></td>"), $(t).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.refreshicon + "'></span>" + m.refreshtext + "</div>"), $("tr", w).append(t), $(t, w).attr({
                                title: m.refreshtitle || "",
                                id: "refresh_" + v
                            }).click(function() {
                                if (!$(this).hasClass(k.disabled)) {
                                    $.isFunction(m.beforeRefresh) && m.beforeRefresh.call(o),
                                    o.p.search = !1,
                                    o.p.resetsearch = !0;
                                    try {
                                        if ("currentfilter" !== m.refreshstate) {
                                            var a = o.p.id;
                                            o.p.postData.filters = "";
                                            try {
                                                $("#fbox_" + $.jgrid.jqID(a)).jqFilter("resetFilter")
                                            } catch(b) {}
                                            $.isFunction(o.clearToolbar) && o.clearToolbar.call(o, !1)
                                        }
                                    } catch(c) {}
                                    switch (m.refreshstate) {
                                    case "firstpage":
                                        $(o).trigger("reloadGrid", [{
                                            page: 1
                                        }]);
                                        break;
                                    case "current":
                                    case "currentfilter":
                                        $(o).trigger("reloadGrid", [{
                                            current: !0
                                        }])
                                    }
                                    $.isFunction(m.afterRefresh) && m.afterRefresh.call(o)
                                }
                                return ! 1
                            }).hover(r, s), t = null),
                            l = $(".ui-jqgrid").css("font-size") || "11px",
                            $("body").append("<div id='testpg2' class='ui-jqgrid " + $.jgrid.styleUI[i].base.entrieBox + "' style='font-size:" + l + ";visibility:hidden;' ></div>"),
                            j = $(w).clone().appendTo("#testpg2").width(),
                            $("#testpg2").remove(),
                            o.p._nvtd && (m.dropmenu ? (w = null, $(o).jqGrid("_buildNavMenu", u, v, b, c, d, e, f, g)) : j > o.p._nvtd[0] ? (o.p.responsive ? (w = null, $(o).jqGrid("_buildNavMenu", u, v, b, c, d, e, f, g)) : $(u + "_" + m.position, u).width(j), o.p._nvtd[0] = j) : $(u + "_" + m.position, u).append(w), o.p._nvtd[1] = j),
                            o.p.navGrid = !0
                        }
                        o.p.storeNavOptions && (o.p.navOptions = m, o.p.editOptions = c, o.p.addOptions = d, o.p.delOptions = e, o.p.searchOptions = f, o.p.viewOptions = g)
                    }
                }
            })
        },
        navButtonAdd: function(a, b) {
            var c = this[0].p.styleUI,
            d = $.jgrid.styleUI[c].navigator;
            return b = $.extend({
                caption: "newButton",
                title: "",
                buttonicon: d.icon_newbutton_nav,
                onClickButton: null,
                position: "last",
                cursor: "pointer"
            },
            b || {}),
            this.each(function() {
                if (this.grid) {
                    "string" == typeof a && 0 !== a.indexOf("#") && (a = "#" + $.jgrid.jqID(a));
                    var d = $(".navtable", a)[0],
                    e = this,
                    f = $.jgrid.styleUI[c].common.disabled,
                    g = $.jgrid.styleUI[c].common.hover,
                    h = $.jgrid.styleUI[c].common.cornerall,
                    i = $.jgrid.styleUI[c].common.icon_base;
                    if (d) {
                        if (b.id && void 0 !== $("#" + $.jgrid.jqID(b.id), d)[0]) return;
                        var j = $("<td></td>");
                        $(j).addClass("ui-pg-button " + h).append("NONE" === b.buttonicon.toString().toUpperCase() ? "<div class='ui-pg-div'>" + b.caption + "</div>": "<div class='ui-pg-div'><span class='" + i + " " + b.buttonicon + "'></span>" + b.caption + "</div>"),
                        b.id && $(j).attr("id", b.id),
                        "first" === b.position ? 0 === d.rows[0].cells.length ? $("tr", d).append(j) : $("tr td:eq(0)", d).before(j) : $("tr", d).append(j),
                        $(j, d).attr("title", b.title || "").click(function(a) {
                            return $(this).hasClass(f) || $.isFunction(b.onClickButton) && b.onClickButton.call(e, a),
                            !1
                        }).hover(function() {
                            $(this).hasClass(f) || $(this).addClass(g)
                        },
                        function() {
                            $(this).removeClass(g)
                        })
                    } else if (d = $(".dropdownmenu", a)[0]) {
                        var k = $(d).val(),
                        l = b.id || $.jgrid.randId(),
                        m = $('<li class="ui-menu-item" role="presentation"><a class="' + h + ' g-menu-item" tabindex="0" role="menuitem" id="' + l + '">' + (b.caption || b.title) + "</a></li>");
                        k && ("first" === b.position ? $("#" + k).prepend(m) : $("#" + k).append(m), $(m).on("click",
                        function(a) {
                            return $(this).hasClass(f) || ($("#" + k).hide(), $.isFunction(b.onClickButton) && b.onClickButton.call(e, a)),
                            !1
                        }).find("a").hover(function() {
                            $(this).hasClass(f) || $(this).addClass(g)
                        },
                        function() {
                            $(this).removeClass(g)
                        }))
                    }
                }
            })
        },
        navSeparatorAdd: function(a, b) {
            var c = this[0].p.styleUI,
            d = $.jgrid.styleUI[c].common;
            return b = $.extend({
                sepclass: "ui-separator",
                sepcontent: "",
                position: "last"
            },
            b || {}),
            this.each(function() {
                if (this.grid) {
                    "string" == typeof a && 0 !== a.indexOf("#") && (a = "#" + $.jgrid.jqID(a));
                    var c, e, f = $(".navtable", a)[0];
                    f ? (c = "<td class='ui-pg-button " + d.disabled + "' style='width:4px;'><span class='" + b.sepclass + "'></span>" + b.sepcontent + "</td>", "first" === b.position ? 0 === f.rows[0].cells.length ? $("tr", f).append(c) : $("tr td:eq(0)", f).before(c) : $("tr", f).append(c)) : (f = $(".dropdownmenu", a)[0], c = "<li class='ui-menu-item " + d.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'></li>", f && (e = $(f).val(), e && ("first" === b.position ? $("#" + e).prepend(c) : $("#" + e).append(c))))
                }
            })
        },
        _buildNavMenu: function(a, b, c, d, e, f, g, h) {
            return this.each(function() {
                var i = this,
                j = i.p.styleUI,
                k = ($.jgrid.styleUI[j].navigator, $.jgrid.styleUI[j].filter),
                l = $.jgrid.styleUI[j].common,
                m = "form_menu_" + $.jgrid.randId(),
                n = "<button class='dropdownmenu " + l.button + "' value='" + m + "'>Actions</button>";
                $(a + "_" + c.position, a).append(n);
                var o = {
                    themodal: "alertmod_" + this.p.id,
                    modalhead: "alerthd_" + this.p.id,
                    modalcontent: "alertcnt_" + this.p.id
                },
                p = function() {
                    var a, j, n = $(".ui-jqgrid-view").css("font-size") || "11px",
                    p = $('<ul id="' + m + '" class="ui-nav-menu modal-content" role="menu" tabindex="0" style="display:none;font-size:' + n + '"></ul>');
                    c.add && (e = e || {},
                    a = e.id || "add_" + b, j = $('<li class="ui-menu-item" role="presentation"><a class="' + l.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.addtext || c.addtitle) + "</a></li>").click(function() {
                        return $(this).hasClass(l.disabled) || ($.isFunction(c.addfunc) ? c.addfunc.call(i) : $(i).jqGrid("editGridRow", "new", e), $(p).hide()),
                        !1
                    }), $(p).append(j)),
                    c.edit && (d = d || {},
                    a = d.id || "edit_" + b, j = $('<li class="ui-menu-item" role="presentation"><a class="' + l.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.edittext || c.edittitle) + "</a></li>").click(function() {
                        if (!$(this).hasClass(l.disabled)) {
                            var a = i.p.selrow;
                            a ? $.isFunction(c.editfunc) ? c.editfunc.call(i, a) : $(i).jqGrid("editGridRow", a, d) : ($.jgrid.viewModal("#" + o.themodal, {
                                gbox: "#gbox_" + $.jgrid.jqID(i.p.id),
                                jqm: !0
                            }), $("#jqg_alrt").focus()),
                            $(p).hide()
                        }
                        return ! 1
                    }), $(p).append(j)),
                    c.view && (h = h || {},
                    a = h.id || "view_" + b, j = $('<li class="ui-menu-item" role="presentation"><a class="' + l.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.viewtext || c.viewtitle) + "</a></li>").click(function() {
                        if (!$(this).hasClass(l.disabled)) {
                            var a = i.p.selrow;
                            a ? $.isFunction(c.editfunc) ? c.viewfunc.call(i, a) : $(i).jqGrid("viewGridRow", a, h) : ($.jgrid.viewModal("#" + o.themodal, {
                                gbox: "#gbox_" + $.jgrid.jqID(i.p.id),
                                jqm: !0
                            }), $("#jqg_alrt").focus()),
                            $(p).hide()
                        }
                        return ! 1
                    }), $(p).append(j)),
                    c.del && (f = f || {},
                    a = f.id || "del_" + b, j = $('<li class="ui-menu-item" role="presentation"><a class="' + l.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.deltext || c.deltitle) + "</a></li>").click(function() {
                        if (!$(this).hasClass(l.disabled)) {
                            var a;
                            i.p.multiselect ? (a = i.p.selarrrow, 0 === a.length && (a = null)) : a = i.p.selrow,
                            a ? $.isFunction(c.delfunc) ? c.delfunc.call(i, a) : $(i).jqGrid("delGridRow", a, f) : ($.jgrid.viewModal("#" + o.themodal, {
                                gbox: "#gbox_" + $.jgrid.jqID(i.p.id),
                                jqm: !0
                            }), $("#jqg_alrt").focus()),
                            $(p).hide()
                        }
                        return ! 1
                    }), $(p).append(j)),
                    (c.add || c.edit || c.del || c.view) && $(p).append("<li class='ui-menu-item " + l.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'></li>"),
                    c.search && (g = g || {},
                    a = g.id || "search_" + b, j = $('<li class="ui-menu-item" role="presentation"><a class="' + l.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.searchtext || c.searchtitle) + "</a></li>").click(function() {
                        return $(this).hasClass(l.disabled) || ($.isFunction(c.searchfunc) ? c.searchfunc.call(i, g) : $(i).jqGrid("searchGrid", g), $(p).hide()),
                        !1
                    }), $(p).append(j), g.showOnLoad && g.showOnLoad === !0 && $(j).click()),
                    c.refresh && (a = g.id || "search_" + b, j = $('<li class="ui-menu-item" role="presentation"><a class="' + l.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.refreshtext || c.refreshtitle) + "</a></li>").click(function() {
                        if (!$(this).hasClass(l.disabled)) {
                            $.isFunction(c.beforeRefresh) && c.beforeRefresh.call(i),
                            i.p.search = !1,
                            i.p.resetsearch = !0;
                            try {
                                if ("currentfilter" !== c.refreshstate) {
                                    var a = i.p.id;
                                    i.p.postData.filters = "";
                                    try {
                                        $("#fbox_" + $.jgrid.jqID(a)).jqFilter("resetFilter")
                                    } catch(b) {}
                                    $.isFunction(i.clearToolbar) && i.clearToolbar.call(i, !1)
                                }
                            } catch(d) {}
                            switch (c.refreshstate) {
                            case "firstpage":
                                $(i).trigger("reloadGrid", [{
                                    page: 1
                                }]);
                                break;
                            case "current":
                            case "currentfilter":
                                $(i).trigger("reloadGrid", [{
                                    current: !0
                                }])
                            }
                            $.isFunction(c.afterRefresh) && c.afterRefresh.call(i),
                            $(p).hide()
                        }
                        return ! 1
                    }), $(p).append(j)),
                    $(p).hide(),
                    $("body").append(p),
                    $("#" + m).addClass("ui-menu " + k.menu_widget),
                    $("#" + m + " > li > a").hover(function() {
                        $(this).addClass(l.hover)
                    },
                    function() {
                        $(this).removeClass(l.hover)
                    })
                };
                p(),
                $(".dropdownmenu").on("click",
                function() {
                    var a = $(this).offset(),
                    b = a.left,
                    c = parseInt(a.top),
                    d = $(this).val();
                    $("#" + d).show().css({
                        top: c - ($("#" + d).height() + 10) + "px",
                        left: b + "px"
                    })
                }),
                $("body").on("click",
                function(a) {
                    $(a.target).hasClass("dropdownmenu") || $("#" + m).hide()
                })
            })
        },
        GridToForm: function(a, b) {
            return this.each(function() {
                var c, d = this;
                if (d.grid) {
                    var e = $(d).jqGrid("getRowData", a);
                    if (e) for (c in e) e.hasOwnProperty(c) && ($("[name=" + $.jgrid.jqID(c) + "]", b).is("input:radio") || $("[name=" + $.jgrid.jqID(c) + "]", b).is("input:checkbox") ? $("[name=" + $.jgrid.jqID(c) + "]", b).each(function() {
                        $(this).val() == e[c] ? $(this)[d.p.useProp ? "prop": "attr"]("checked", !0) : $(this)[d.p.useProp ? "prop": "attr"]("checked", !1)
                    }) : $("[name=" + $.jgrid.jqID(c) + "]", b).val(e[c]))
                }
            })
        },
        FormToGrid: function(a, b, c, d) {
            return this.each(function() {
                var e = this;
                if (e.grid) {
                    c || (c = "set"),
                    d || (d = "first");
                    var f = $(b).serializeArray(),
                    g = {};
                    $.each(f,
                    function(a, b) {
                        g[b.name] = b.value
                    }),
                    "add" === c ? $(e).jqGrid("addRowData", a, g, d) : "set" === c && $(e).jqGrid("setRowData", a, g)
                }
            })
        }
    }), $.jgrid.extend({
        groupingSetup: function() {
            return this.each(function() {
                var a, b, c, d = this,
                e = d.p.colModel,
                f = d.p.groupingView,
                g = $.jgrid.styleUI[d.p.styleUI || "jQueryUI"].grouping;
                if (null === f || "object" != typeof f && !$.isFunction(f)) d.p.grouping = !1;
                else if (f.plusicon || (f.plusicon = g.icon_plus), f.minusicon || (f.minusicon = g.icon_minus), f.groupField.length) {
                    for (void 0 === f.visibiltyOnNextGrouping && (f.visibiltyOnNextGrouping = []), f.lastvalues = [], f._locgr || (f.groups = []), f.counters = [], a = 0; a < f.groupField.length; a++) f.groupOrder[a] || (f.groupOrder[a] = "asc"),
                    f.groupText[a] || (f.groupText[a] = "{0}"),
                    "boolean" != typeof f.groupColumnShow[a] && (f.groupColumnShow[a] = !0),
                    "boolean" != typeof f.groupSummary[a] && (f.groupSummary[a] = !1),
                    f.groupSummaryPos[a] || (f.groupSummaryPos[a] = "footer"),
                    f.groupColumnShow[a] === !0 ? (f.visibiltyOnNextGrouping[a] = !0, $(d).jqGrid("showCol", f.groupField[a])) : (f.visibiltyOnNextGrouping[a] = $("#" + $.jgrid.jqID(d.p.id + "_" + f.groupField[a])).is(":visible"), $(d).jqGrid("hideCol", f.groupField[a]));
                    for (f.summary = [], f.hideFirstGroupCol && (f.formatDisplayField[0] = function(a) {
                        return a
                    }), b = 0, c = e.length; c > b; b++) f.hideFirstGroupCol && (e[b].hidden || f.groupField[0] !== e[b].name || (e[b].formatter = function() {
                        return ""
                    })),
                    e[b].summaryType && f.summary.push(e[b].summaryDivider ? {
                        nm: e[b].name,
                        st: e[b].summaryType,
                        v: "",
                        sd: e[b].summaryDivider,
                        vd: "",
                        sr: e[b].summaryRound,
                        srt: e[b].summaryRoundType || "round"
                    }: {
                        nm: e[b].name,
                        st: e[b].summaryType,
                        v: "",
                        sr: e[b].summaryRound,
                        srt: e[b].summaryRoundType || "round"
                    })
                } else d.p.grouping = !1
            })
        },
        groupingPrepare: function(a, b) {
            return this.each(function() {
                var c, d, e, f, g, h = this.p.groupingView,
                i = this,
                j = function() {
                    $.isFunction(this.st) ? this.v = this.st.call(i, this.v, this.nm, a) : (this.v = $(i).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, a), "avg" === this.st.toLowerCase() && this.sd && (this.vd = $(i).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, a)))
                },
                k = h.groupField.length,
                l = 0;
                for (c = 0; k > c; c++) d = h.groupField[c],
                f = h.displayField[c],
                e = a[d],
                g = null == f ? null: a[f],
                null == g && (g = e),
                void 0 !== e && (0 === b ? (h.groups.push({
                    idx: c,
                    dataIndex: d,
                    value: e,
                    displayValue: g,
                    startRow: b,
                    cnt: 1,
                    summary: []
                }), h.lastvalues[c] = e, h.counters[c] = {
                    cnt: 1,
                    pos: h.groups.length - 1,
                    summary: $.extend(!0, [], h.summary)
                },
                $.each(h.counters[c].summary, j), h.groups[h.counters[c].pos].summary = h.counters[c].summary) : "object" == typeof e || ($.isArray(h.isInTheSameGroup) && $.isFunction(h.isInTheSameGroup[c]) ? h.isInTheSameGroup[c].call(i, h.lastvalues[c], e, c, h) : h.lastvalues[c] === e) ? 1 === l ? (h.groups.push({
                    idx: c,
                    dataIndex: d,
                    value: e,
                    displayValue: g,
                    startRow: b,
                    cnt: 1,
                    summary: []
                }), h.lastvalues[c] = e, h.counters[c] = {
                    cnt: 1,
                    pos: h.groups.length - 1,
                    summary: $.extend(!0, [], h.summary)
                },
                $.each(h.counters[c].summary, j), h.groups[h.counters[c].pos].summary = h.counters[c].summary) : (h.counters[c].cnt += 1, h.groups[h.counters[c].pos].cnt = h.counters[c].cnt, $.each(h.counters[c].summary, j), h.groups[h.counters[c].pos].summary = h.counters[c].summary) : (h.groups.push({
                    idx: c,
                    dataIndex: d,
                    value: e,
                    displayValue: g,
                    startRow: b,
                    cnt: 1,
                    summary: []
                }), h.lastvalues[c] = e, l = 1, h.counters[c] = {
                    cnt: 1,
                    pos: h.groups.length - 1,
                    summary: $.extend(!0, [], h.summary)
                },
                $.each(h.counters[c].summary, j), h.groups[h.counters[c].pos].summary = h.counters[c].summary))
            }),
            this
        },
        groupingToggle: function(a) {
            return this.each(function() {
                var b = this,
                c = b.p.groupingView,
                d = a.split("_"),
                e = parseInt(d[d.length - 2], 10);
                d.splice(d.length - 2, 2);
                var f, g, h = d.join("_"),
                i = c.minusicon,
                j = c.plusicon,
                k = $("#" + $.jgrid.jqID(a)),
                l = k.length ? k[0].nextSibling: null,
                m = $("#" + $.jgrid.jqID(a) + " span.tree-wrap-" + b.p.direction),
                n = function(a) {
                    var b = $.map(a.split(" "),
                    function(a) {
                        return a.substring(0, h.length + 1) === h + "_" ? parseInt(a.substring(h.length + 1), 10) : void 0
                    });
                    return b.length > 0 ? b[0] : void 0
                },
                o = !1,
                p = !1,
                q = b.p.frozenColumns ? b.p.id + "_frozen": !1,
                r = q ? $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(q)) : !1,
                s = r && r.length ? r[0].nextSibling: null;
                if (m.hasClass(i)) {
                    if (c.showSummaryOnHide) {
                        if (l) for (; l && (f = n(l.className), !(void 0 !== f && e >= f));) $(l).hide(),
                        l = l.nextSibling,
                        q && ($(s).hide(), s = s.nextSibling)
                    } else if (l) for (; l && (f = n(l.className), !(void 0 !== f && e >= f));) $(l).hide(),
                    l = l.nextSibling,
                    q && ($(s).hide(), s = s.nextSibling);
                    m.removeClass(i).addClass(j),
                    o = !0
                } else {
                    if (l) for (g = void 0; l;) {
                        if (f = n(l.className), void 0 === g && (g = void 0 === f), p = $(l).hasClass("ui-subgrid") && $(l).hasClass("ui-sg-collapsed"), void 0 !== f) {
                            if (e >= f) break;
                            f === e + 1 && (p || ($(l).show().find(">td>span.tree-wrap-" + b.p.direction).removeClass(i).addClass(j), q && $(s).show().find(">td>span.tree-wrap-" + b.p.direction).removeClass(i).addClass(j)))
                        } else g && (p || ($(l).show(), q && $(s).show()));
                        l = l.nextSibling,
                        q && (s = s.nextSibling)
                    }
                    m.removeClass(j).addClass(i)
                }
                $(b).triggerHandler("jqGridGroupingClickGroup", [a, o]),
                $.isFunction(b.p.onClickGroup) && b.p.onClickGroup.call(b, a, o)
            }),
            !1
        },
        groupingRender: function(a, b, c, d) {
            return this.each(function() {
                function e(a, b, c) {
                    var d, e = !1;
                    if (0 === b) e = c[a];
                    else {
                        var f = c[a].idx;
                        if (0 === f) e = c[a];
                        else for (d = a; d >= 0; d--) if (c[d].idx === f - b) {
                            e = c[d];
                            break
                        }
                    }
                    return e
                }
                function f(a, c, d, f) {
                    var g, h, i = e(a, c, d),
                    k = j.p.colModel,
                    l = i.cnt,
                    m = "";
                    for (h = f; b > h; h++) {
                        var n = "<td " + j.formatCol(h, 1, "") + ">&#160;</td>",
                        o = "{0}";
                        $.each(i.summary,
                        function() {
                            if (this.nm === k[h].name) {
                                k[h].summaryTpl && (o = k[h].summaryTpl),
                                "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd: this.v && l > 0 && (this.v = this.v / l));
                                try {
                                    this.groupCount = i.cnt,
                                    this.groupIndex = i.dataIndex,
                                    this.groupValue = i.value,
                                    g = j.formatter("", this.v, h, this)
                                } catch(a) {
                                    g = this.v
                                }
                                return n = "<td " + j.formatCol(h, 1, "") + ">" + $.jgrid.template(o, g) + "</td>",
                                !1
                            }
                        }),
                        m += n
                    }
                    return m
                }
                var g, h, i, j = this,
                k = j.p.groupingView,
                l = "",
                m = "",
                n = k.groupCollapse ? k.plusicon: k.minusicon,
                o = [],
                p = k.groupField.length,
                q = $.jgrid.styleUI[j.p.styleUI || "jQueryUI"].common;
                n = n + " tree-wrap-" + j.p.direction,
                $.each(j.p.colModel,
                function(a, b) {
                    var c;
                    for (c = 0; p > c; c++) if (k.groupField[c] === b.name) {
                        o[c] = a;
                        break
                    }
                });
                var r, s = 0,
                t = $.makeArray(k.groupSummary);
                t.reverse(),
                r = j.p.multiselect ? ' colspan="2"': "",
                $.each(k.groups,
                function(e, u) {
                    if (k._locgr && !(u.startRow + u.cnt > (c - 1) * d && u.startRow < c * d)) return ! 0;
                    s++,
                    h = j.p.id + "ghead_" + u.idx,
                    g = h + "_" + e,
                    m = "<span style='cursor:pointer;margin-right:8px;margin-left:5px;' class='" + q.icon_base + " " + n + "' onclick=\"jQuery('#" + $.jgrid.jqID(j.p.id) + "').jqGrid('groupingToggle','" + g + "');return false;\"></span>";
                    try {
                        $.isArray(k.formatDisplayField) && $.isFunction(k.formatDisplayField[u.idx]) ? (u.displayValue = k.formatDisplayField[u.idx].call(j, u.displayValue, u.value, j.p.colModel[o[u.idx]], u.idx, k), i = u.displayValue) : i = j.formatter(g, u.displayValue, o[u.idx], u.value)
                    } catch(v) {
                        i = u.displayValue
                    }
                    var w = "";
                    w = $.isFunction(k.groupText[u.idx]) ? k.groupText[u.idx].call(j, i, u.cnt, u.summary) : $.jgrid.template(k.groupText[u.idx], i, u.cnt, u.summary),
                    "string" != typeof w && "number" != typeof w && (w = i),
                    "header" === k.groupSummaryPos[u.idx] ? (l += '<tr id="' + g + '"' + (k.groupCollapse && u.idx > 0 ? ' style="display:none;" ': " ") + 'role="row" class= "' + q.content + " jqgroup ui-row-" + j.p.direction + " " + h + '"><td style="padding-left:' + 12 * u.idx + 'px;"' + r + ">" + m + w + "</td>", l += f(e, 0, k.groups, k.groupColumnShow[u.idx] === !1 ? "" === r ? 2 : 3 : "" === r ? 1 : 2), l += "</tr>") : l += '<tr id="' + g + '"' + (k.groupCollapse && u.idx > 0 ? ' style="display:none;" ': " ") + 'role="row" class= "' + q.content + " jqgroup ui-row-" + j.p.direction + " " + h + '"><td style="padding-left:' + 12 * u.idx + 'px;" colspan="' + (k.groupColumnShow[u.idx] === !1 ? b - 1 : b) + '">' + m + w + "</td></tr>";
                    var x = p - 1 === u.idx;
                    if (x) {
                        var y, z, A = k.groups[e + 1],
                        B = 0,
                        C = u.startRow,
                        D = void 0 !== A ? A.startRow: k.groups[e].startRow + k.groups[e].cnt;
                        for (k._locgr && (B = (c - 1) * d, B > u.startRow && (C = B)), y = C; D > y && a[y - B]; y++) l += a[y - B].join("");
                        if ("header" !== k.groupSummaryPos[u.idx]) {
                            var E;
                            if (void 0 !== A) {
                                for (E = 0; E < k.groupField.length && A.dataIndex !== k.groupField[E]; E++);
                                s = k.groupField.length - E
                            }
                            for (z = 0; s > z; z++) if (t[z]) {
                                var F = "";
                                k.groupCollapse && !k.showSummaryOnHide && (F = ' style="display:none;"'),
                                l += "<tr" + F + ' jqfootlevel="' + (u.idx - z) + '" role="row" class="' + q.content + " jqfoot ui-row-" + j.p.direction + '">',
                                l += f(e, z, k.groups, 0),
                                l += "</tr>"
                            }
                            s = E
                        }
                    }
                }),
                $("#" + $.jgrid.jqID(j.p.id) + " tbody:first").append(l),
                l = null
            })
        },
        groupingGroupBy: function(a, b) {
            return this.each(function() {
                var c = this;
                "string" == typeof a && (a = [a]);
                var d = c.p.groupingView;
                c.p.grouping = !0,
                d._locgr = !1,
                void 0 === d.visibiltyOnNextGrouping && (d.visibiltyOnNextGrouping = []);
                var e;
                for (e = 0; e < d.groupField.length; e++) ! d.groupColumnShow[e] && d.visibiltyOnNextGrouping[e] && $(c).jqGrid("showCol", d.groupField[e]);
                for (e = 0; e < a.length; e++) d.visibiltyOnNextGrouping[e] = $("#" + $.jgrid.jqID(c.p.id) + "_" + $.jgrid.jqID(a[e])).is(":visible");
                c.p.groupingView = $.extend(c.p.groupingView, b || {}),
                d.groupField = a,
                $(c).trigger("reloadGrid")
            })
        },
        groupingRemove: function(a) {
            return this.each(function() {
                var b = this;
                if (void 0 === a && (a = !0), b.p.grouping = !1, a === !0) {
                    var c, d = b.p.groupingView;
                    for (c = 0; c < d.groupField.length; c++) ! d.groupColumnShow[c] && d.visibiltyOnNextGrouping[c] && $(b).jqGrid("showCol", d.groupField);
                    $("tr.jqgroup, tr.jqfoot", "#" + $.jgrid.jqID(b.p.id) + " tbody:first").remove(),
                    $("tr.jqgrow:hidden", "#" + $.jgrid.jqID(b.p.id) + " tbody:first").show()
                } else $(b).trigger("reloadGrid")
            })
        },
        groupingCalculations: {
            handler: function(a, b, c, d, e, f) {
                var g = {
                    sum: function() {
                        return parseFloat(b || 0) + parseFloat(f[c] || 0)
                    },
                    min: function() {
                        return "" === b ? parseFloat(f[c] || 0) : Math.min(parseFloat(b), parseFloat(f[c] || 0))
                    },
                    max: function() {
                        return "" === b ? parseFloat(f[c] || 0) : Math.max(parseFloat(b), parseFloat(f[c] || 0))
                    },
                    count: function() {
                        return "" === b && (b = 0),
                        f.hasOwnProperty(c) ? b + 1 : 0
                    },
                    avg: function() {
                        return g.sum()
                    }
                };
                if (!g[a]) throw "jqGrid Grouping No such method: " + a;
                var h = g[a]();
                if (null != d) if ("fixed" === e) h = h.toFixed(d);
                else {
                    var i = Math.pow(10, d);
                    h = Math.round(h * i) / i
                }
                return h
            }
        },
        setGroupHeaders: function(a) {
            return a = $.extend({
                useColSpanStyle: !1,
                groupHeaders: []
            },
            a || {}),
            this.each(function() {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p = this,
                q = 0,
                r = p.p.colModel,
                s = r.length,
                t = p.grid.headers,
                u = $("table.ui-jqgrid-htable", p.grid.hDiv),
                v = u.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"),
                w = u.children("thead"),
                x = u.find(".jqg-first-row-header"),
                y = $.jgrid.styleUI[p.p.styleUI || "jQueryUI"].base;
                p.p.groupHeader || (p.p.groupHeader = []),
                p.p.groupHeader.push(a),
                void 0 === x[0] ? x = $("<tr>", {
                    role: "row",
                    "aria-hidden": "true"
                }).addClass("jqg-first-row-header").css("height", "auto") : x.empty();
                var z, A = function(a, b) {
                    var c, d = b.length;
                    for (c = 0; d > c; c++) if (b[c].startColumnName === a) return c;
                    return - 1
                };
                for ($(p).prepend(w), d = $("<tr>", {
                    role: "row"
                }).addClass("ui-jqgrid-labels jqg-third-row-header"), b = 0; s > b; b++) if (f = t[b].el, g = $(f), c = r[b], h = {
                    height: "0px",
                    width: t[b].width + "px",
                    display: c.hidden ? "none": ""
                },
                $("<th>", {
                    role: "gridcell"
                }).css(h).addClass("ui-first-th-" + p.p.direction).appendTo(x), f.style.width = "", i = A(c.name, a.groupHeaders), i >= 0) {
                    for (j = a.groupHeaders[i], k = j.numberOfColumns, l = j.titleText, n = j.className || "", m = 0, i = 0; k > i && s > b + i; i++) r[b + i].hidden || m++;
                    e = $("<th>").attr({
                        role: "columnheader"
                    }).addClass(y.headerBox + " ui-th-column-header ui-th-" + p.p.direction + " " + n).html(l),
                    m > 0 && e.attr("colspan", String(m)),
                    p.p.headertitles && e.attr("title", e.text()),
                    0 === m && e.hide(),
                    g.before(e),
                    d.append(f),
                    q = k - 1
                } else 0 === q ? a.useColSpanStyle ? g.attr("rowspan", "2") : ($("<th>", {
                    role: "columnheader"
                }).addClass(y.headerBox + " ui-th-column-header ui-th-" + p.p.direction).css({
                    display: c.hidden ? "none": ""
                }).insertBefore(g), d.append(f)) : (d.append(f), q--);
                o = $(p).children("thead"),
                o.prepend(x),
                d.insertAfter(v),
                u.append(o),
                a.useColSpanStyle && (u.find("span.ui-jqgrid-resize").each(function() {
                    var a = $(this).parent();
                    a.is(":visible") && (this.style.cssText = "height: " + a.height() + "px !important; cursor: col-resize;")
                }), u.find("div.ui-jqgrid-sortable").each(function() {
                    var a = $(this),
                    b = a.parent();
                    b.is(":visible") && b.is(":has(span.ui-jqgrid-resize)") && a.css("top", (b.height() - a.outerHeight()) / 2 - 4 + "px")
                })),
                z = o.find("tr.jqg-first-row-header"),
                $(p).bind("jqGridResizeStop.setGroupHeaders",
                function(a, b, c) {
                    z.find("th").eq(c).width(b)
                })
            })
        },
        destroyGroupHeader: function(a) {
            return void 0 === a && (a = !0),
            this.each(function() {
                var b, c, d, e, f, g, h, i = this,
                j = i.grid,
                k = $("table.ui-jqgrid-htable thead", j.hDiv),
                l = i.p.colModel;
                if (j) {
                    for ($(this).unbind(".setGroupHeaders"), b = $("<tr>", {
                        role: "row"
                    }).addClass("ui-jqgrid-labels"), e = j.headers, c = 0, d = e.length; d > c; c++) {
                        h = l[c].hidden ? "none": "",
                        f = $(e[c].el).width(e[c].width).css("display", h);
                        try {
                            f.removeAttr("rowSpan")
                        } catch(m) {
                            f.attr("rowSpan", 1)
                        }
                        b.append(f),
                        g = f.children("span.ui-jqgrid-resize"),
                        g.length > 0 && (g[0].style.height = ""),
                        f.children("div")[0].style.top = ""
                    }
                    $(k).children("tr.ui-jqgrid-labels").remove(),
                    $(k).prepend(b),
                    a === !0 && $(i).jqGrid("setGridParam", {
                        groupHeader: null
                    })
                }
            })
        }
    }), $.jgrid = $.jgrid || {},
    $.extend($.jgrid, {
        saveState: function(a, b) {
            if (b = $.extend({
                useStorage: !0,
                storageType: "localStorage",
                beforeSetItem: null,
                compression: !1,
                compressionModule: "LZString",
                compressionMethod: "compressToUTF16"
            },
            b || {}), a) {
                var c, d, e = "",
                f = "",
                g = $("#" + a)[0];
                if (g.grid) {
                    if (d = $(g).data("inlineNav"), d && g.p.inlineNav && $(g).jqGrid("setGridParam", {
                        _iN: d
                    }), d = $(g).data("filterToolbar"), d && g.p.filterToolbar && $(g).jqGrid("setGridParam", {
                        _fT: d
                    }), e = $(g).jqGrid("jqGridExport", {
                        exptype: "jsonstring",
                        ident: "",
                        root: ""
                    }), $(g.grid.bDiv).find(".ui-jqgrid-btable tr:gt(0)").each(function(a, b) {
                        f += b.outerHTML
                    }), $.isFunction(b.beforeSetItem) && (c = b.beforeSetItem.call(g, e), null != c && (e = c)), b.compression && b.compressionModule) try {
                        c = window[b.compressionModule][b.compressionMethod](e),
                        null != c && (e = c, f = window[b.compressionModule][b.compressionMethod](f))
                    } catch(h) {}
                    if (b.useStorage && $.jgrid.isLocalStorage()) try {
                        window[b.storageType].setItem("jqGrid" + g.p.id, e),
                        window[b.storageType].setItem("jqGrid" + g.p.id + "_data", f)
                    } catch(h) {
                        22 === h.code && alert("Local storage limit is over!")
                    }
                    return e
                }
            }
        },
        loadState: function(a, b, c) {
            if (c = $.extend({
                useStorage: !0,
                storageType: "localStorage",
                clearAfterLoad: !1,
                beforeSetGrid: null,
                decompression: !1,
                decompressionModule: "LZString",
                decompressionMethod: "decompressFromUTF16"
            },
            c || {}), a) {
                var d, e, f, g, h, i = $("#" + a)[0];
                if (i.grid && $.jgrid.gridUnload(a), c.useStorage) try {
                    b = window[c.storageType].getItem("jqGrid" + i.id),
                    f = window[c.storageType].getItem("jqGrid" + i.id + "_data")
                } catch(j) {}
                if (b) {
                    if (c.decompression && c.decompressionModule) try {
                        d = window[c.decompressionModule][c.decompressionMethod](b),
                        null != d && (b = d, f = window[c.decompressionModule][c.decompressionMethod](f))
                    } catch(j) {}
                    if (d = jqGridUtils.parse(b), d && "object" === $.type(d)) {
                        $.isFunction(c.beforeSetGrid) && (e = c.beforeSetGrid(d), e && "object" === $.type(e) && (d = e));
                        var k = function(a) {
                            var b;
                            return b = a
                        },
                        l = {
                            reccount: d.reccount,
                            records: d.records,
                            lastpage: d.lastpage,
                            shrinkToFit: k(d.shrinkToFit),
                            data: k(d.data),
                            datatype: k(d.datatype),
                            grouping: k(d.grouping)
                        };
                        d.shrinkToFit = !1,
                        d.data = [],
                        d.datatype = "local",
                        d.grouping = !1,
                        d.navGrid = !1,
                        d.inlineNav && (g = k(d._iN), d._iN = null, delete d._iN),
                        d.filterToolbar && (h = k(d._fT), d._fT = null, delete d._fT);
                        var m = $("#" + a).jqGrid(d);
                        m.append(f),
                        m.jqGrid("setGridParam", l),
                        d.storeNavOptions && m.jqGrid("navGrid", d.pager, d.navOptions, d.editOptions, d.addOptions, d.delOptions, d.searchOptions, d.viewOptions),
                        d.inlineNav && g && (m.jqGrid("setGridParam", {
                            inlineNav: !1
                        }), m.jqGrid("inlineNav", d.pager, g)),
                        d.filterToolbar && h && (m.jqGrid("setGridParam", {
                            filterToolbar: !1
                        }), m.jqGrid("filterToolbar", h)),
                        m[0].updatepager(!0, !0),
                        c.clearAfterLoad && (window[c.storageType].removeItem("jqGrid" + i.id), window[c.storageType].removeItem("jqGrid" + i.id + "_data"))
                    } else alert("can not convert to object")
                }
            }
        },
        setRegional: function(a, b) {
            $.jgrid.saveState(a, {
                storageType: "sessionStorage"
            }),
            $.jgrid.loadState(a, null, {
                storageType: "sessionStorage",
                beforeSetGrid: function(a) {
                    return a.regional = b.regional,
                    a.force_regional = !0,
                    a
                }
            });
            var c = $("#" + a)[0],
            d = $(c).jqGrid("getGridParam", "colModel"),
            e = -1,
            f = $.jgrid.getRegional(c, "nav");
            $.each(d,
            function(a) {
                return this.formatter && "actions" === this.formatter ? (e = a, !1) : void 0
            }),
            -1 !== e && f && $("#" + a + " tbody tr").each(function() {
                var a = this.cells[e];
                $(a).find(".ui-inline-edit").attr("title", f.edittitle),
                $(a).find(".ui-inline-del").attr("title", f.deltitle),
                $(a).find(".ui-inline-save").attr("title", f.savetitle),
                $(a).find(".ui-inline-cancel").attr("title", f.canceltitle)
            });
            try {
                window.sessionStorage.removeItem("jqGrid" + c.id),
                window.sessionStorage.removeItem("jqGrid" + c.id + "_data")
            } catch(g) {}
        },
        jqGridImport: function(a, b) {
            b = $.extend({
                imptype: "xml",
                impstring: "",
                impurl: "",
                mtype: "GET",
                impData: {},
                xmlGrid: {
                    config: "root>grid",
                    data: "root>rows"
                },
                jsonGrid: {
                    config: "grid",
                    data: "data"
                },
                ajaxOptions: {}
            },
            b || {});
            var c = (0 === a.indexOf("#") ? "": "#") + $.jgrid.jqID(a),
            d = function(a, b) {
                var d, e, f, g = $(b.xmlGrid.config, a)[0],
                h = $(b.xmlGrid.data, a)[0];
                if (jqGridUtils.xmlToJSON) {
                    d = jqGridUtils.xmlToJSON(g);
                    for (f in d) d.hasOwnProperty(f) && (e = d[f]);
                    if (h) {
                        var i = d.grid.datatype;
                        d.grid.datatype = "xmlstring",
                        d.grid.datastr = a,
                        $(c).jqGrid(e).jqGrid("setGridParam", {
                            datatype: i
                        })
                    } else setTimeout(function() {
                        $(c).jqGrid(e)
                    },
                    0)
                } else alert("xml2json or parse are not present")
            },
            e = function(a, b) {
                if (a && "string" == typeof a) {
                    var d = jqGridUtils.parse(a),
                    e = d[b.jsonGrid.config],
                    f = d[b.jsonGrid.data];
                    if (f) {
                        var g = e.datatype;
                        e.datatype = "jsonstring",
                        e.datastr = f,
                        $(c).jqGrid(e).jqGrid("setGridParam", {
                            datatype: g
                        })
                    } else $(c).jqGrid(e)
                }
            };
            switch (b.imptype) {
            case "xml":
                $.ajax($.extend({
                    url:
                    b.impurl,
                    type: b.mtype,
                    data: b.impData,
                    dataType: "xml",
                    complete: function(a, e) {
                        "success" === e && (d(a.responseXML, b), $(c).triggerHandler("jqGridImportComplete", [a, b]), $.isFunction(b.importComplete) && b.importComplete(a)),
                        a = null
                    }
                },
                b.ajaxOptions));
                break;
            case "xmlstring":
                if (b.impstring && "string" == typeof b.impstring) {
                    var f = $.parseXML(b.impstring);
                    f && (d(f, b), $(c).triggerHandler("jqGridImportComplete", [f, b]), $.isFunction(b.importComplete) && b.importComplete(f))
                }
                break;
            case "json":
                $.ajax($.extend({
                    url:
                    b.impurl,
                    type: b.mtype,
                    data: b.impData,
                    dataType: "json",
                    complete: function(a) {
                        try {
                            e(a.responseText, b),
                            $(c).triggerHandler("jqGridImportComplete", [a, b]),
                            $.isFunction(b.importComplete) && b.importComplete(a)
                        } catch(d) {}
                        a = null
                    }
                },
                b.ajaxOptions));
                break;
            case "jsonstring":
                b.impstring && "string" == typeof b.impstring && (e(b.impstring, b), $(c).triggerHandler("jqGridImportComplete", [b.impstring, b]), $.isFunction(b.importComplete) && b.importComplete(b.impstring))
            }
        }
    }), $.jgrid.extend({
        jqGridExport: function(a) {
            a = $.extend({
                exptype: "xmlstring",
                root: "grid",
                ident: "	",
                addOptions: {}
            },
            a || {});
            var b = null;
            return this.each(function() {
                if (this.grid) {
                    var c, d = $.extend(!0, {},
                    $(this).jqGrid("getGridParam"), a.addOptions);
                    if (d.rownumbers && (d.colNames.splice(0, 1), d.colModel.splice(0, 1)), d.multiselect && (d.colNames.splice(0, 1), d.colModel.splice(0, 1)), d.subGrid && (d.colNames.splice(0, 1), d.colModel.splice(0, 1)), d.knv = null, d.treeGrid) for (c in d.treeReader) d.treeReader.hasOwnProperty(c) && (d.colNames.splice(d.colNames.length - 1), d.colModel.splice(d.colModel.length - 1));
                    switch (a.exptype) {
                    case "xmlstring":
                        b = "<" + a.root + ">" + jqGridUtils.jsonToXML(d, {
                            xmlDecl: ""
                        }) + "</" + a.root + ">";
                        break;
                    case "jsonstring":
                        b = jqGridUtils.stringify(d),
                        a.root && (b = "{" + a.root + ":" + b + "}")
                    }
                }
            }),
            b
        },
        excelExport: function(a) {
            return a = $.extend({
                exptype: "remote",
                url: null,
                oper: "oper",
                tag: "excel",
                exportOptions: {}
            },
            a || {}),
            this.each(function() {
                if (this.grid) {
                    var b;
                    if ("remote" === a.exptype) {
                        var c = $.extend({},
                        this.p.postData);
                        c[a.oper] = a.tag;
                        var d = jQuery.param(c);
                        b = -1 !== a.url.indexOf("?") ? a.url + "&" + d: a.url + "?" + d,
                        window.location = b
                    }
                }
            })
        }
    }), $.jgrid.inlineEdit = $.jgrid.inlineEdit || {},
    $.jgrid.extend({
        editRow: function(a, b, c, d, e, f, g, h, i) {
            var j = {},
            k = $.makeArray(arguments).slice(1);
            return "object" === $.type(k[0]) ? j = k[0] : (void 0 !== b && (j.keys = b), $.isFunction(c) && (j.oneditfunc = c), $.isFunction(d) && (j.successfunc = d), void 0 !== e && (j.url = e), void 0 !== f && (j.extraparam = f), $.isFunction(g) && (j.aftersavefunc = g), $.isFunction(h) && (j.errorfunc = h), $.isFunction(i) && (j.afterrestorefunc = i)),
            j = $.extend(!0, {
                keys: !1,
                oneditfunc: null,
                successfunc: null,
                url: null,
                extraparam: {},
                aftersavefunc: null,
                errorfunc: null,
                afterrestorefunc: null,
                restoreAfterError: !0,
                mtype: "POST",
                focusField: !0
            },
            $.jgrid.inlineEdit, j),
            this.each(function() {
                var b, c, d, e, f, g, h = this,
                i = 0,
                k = null,
                l = {},
                m = $(this).jqGrid("getStyleUI", h.p.styleUI + ".inlinedit", "inputClass", !0);
                h.grid && (e = $(h).jqGrid("getInd", a, !0), e !== !1 && (g = $.isFunction(j.beforeEditRow) ? j.beforeEditRow.call(h, j, a) : void 0, void 0 === g && (g = !0), g && (d = $(e).attr("editable") || "0", "0" !== d || $(e).hasClass("not-editable-row") || (f = h.p.colModel, $('td[role="gridcell"]', e).each(function(d) {
                    b = f[d].name;
                    var e = h.p.treeGrid === !0 && b === h.p.ExpandColumn;
                    if (e) c = $("span:first", this).html();
                    else try {
                        c = $.unformat.call(h, this, {
                            rowId: a,
                            colModel: f[d]
                        },
                        d)
                    } catch(g) {
                        c = f[d].edittype && "textarea" === f[d].edittype ? $(this).text() : $(this).html()
                    }
                    if ("cb" !== b && "subgrid" !== b && "rn" !== b && (h.p.autoencode && (c = $.jgrid.htmlDecode(c)), l[b] = c, f[d].editable === !0)) {
                        null === k && (k = d),
                        e ? $("span:first", this).html("") : $(this).html("");
                        var j = $.extend({},
                        f[d].editoptions || {},
                        {
                            id: a + "_" + b,
                            name: b,
                            rowId: a,
                            oper: "edit"
                        });
                        f[d].edittype || (f[d].edittype = "text"),
                        ("&nbsp;" === c || "&#160;" === c || 1 === c.length && 160 === c.charCodeAt(0)) && (c = "");
                        var n = $.jgrid.createEl.call(h, f[d].edittype, j, c, !0, $.extend({},
                        $.jgrid.ajaxOptions, h.p.ajaxSelectOptions || {}));
                        $(n).addClass("editable inline-edit-cell"),
                        $.inArray(f[d].edittype, ["text", "textarea", "password", "select"]) > -1 && $(n).addClass(m),
                        e ? $("span:first", this).append(n) : $(this).append(n),
                        $.jgrid.bindEv.call(h, n, j),
                        "select" === f[d].edittype && void 0 !== f[d].editoptions && f[d].editoptions.multiple === !0 && void 0 === f[d].editoptions.dataUrl && $.jgrid.msie && $(n).width($(n).width()),
                        i++
                    }
                }), i > 0 && (l.id = a, h.p.savedRow.push(l), $(e).attr("editable", "1"), j.focusField && ("number" == typeof j.focusField && parseInt(j.focusField, 10) <= f.length && (k = j.focusField), setTimeout(function() {
                    var a = $("td:eq(" + k + ") :input:visible", e).not(":disabled");
                    a.length > 0 && a.focus()
                },
                0)), j.keys === !0 && $(e).bind("keyup",
                function(b) {
                    if (27 === b.keyCode) {
                        if ($(h).jqGrid("restoreRow", a, j.afterrestorefunc), h.p.inlineNav) try {
                            $(h).jqGrid("showAddEditButtons")
                        } catch(c) {}
                        return ! 1
                    }
                    if (13 === b.keyCode) {
                        var d = b.target;
                        if ("TEXTAREA" === d.tagName) return ! 0;
                        if ($(h).jqGrid("saveRow", a, j) && h.p.inlineNav) try {
                            $(h).jqGrid("showAddEditButtons")
                        } catch(e) {}
                        return ! 1
                    }
                }), $(h).triggerHandler("jqGridInlineEditRow", [a, j]), $.isFunction(j.oneditfunc) && j.oneditfunc.call(h, a))))))
            })
        },
        saveRow: function(a, b, c, d, e, f, g) {
            var h = $.makeArray(arguments).slice(1),
            i = {},
            j = this[0];
            "object" === $.type(h[0]) ? i = h[0] : ($.isFunction(b) && (i.successfunc = b), void 0 !== c && (i.url = c), void 0 !== d && (i.extraparam = d), $.isFunction(e) && (i.aftersavefunc = e), $.isFunction(f) && (i.errorfunc = f), $.isFunction(g) && (i.afterrestorefunc = g)),
            i = $.extend(!0, {
                successfunc: null,
                url: null,
                extraparam: {},
                aftersavefunc: null,
                errorfunc: null,
                afterrestorefunc: null,
                restoreAfterError: !0,
                mtype: "POST",
                saveui: "enable",
                savetext: $.jgrid.getRegional(j, "defaults.savetext")
            },
            $.jgrid.inlineEdit, i);
            var k, l, m, n, o, p = !1,
            q = {},
            r = {},
            s = {},
            t = !1,
            u = $.trim($(j).jqGrid("getStyleUI", j.p.styleUI + ".common", "error", !0));
            if (!j.grid) return p;
            if (o = $(j).jqGrid("getInd", a, !0), o === !1) return p;
            var v = $.jgrid.getRegional(this, "errors"),
            w = $.jgrid.getRegional(this, "edit"),
            x = $.isFunction(i.beforeSaveRow) ? i.beforeSaveRow.call(j, i, a) : void 0;
            if (void 0 === x && (x = !0), x) {
                if (l = $(o).attr("editable"), i.url = i.url || j.p.editurl, "1" === l) {
                    var y;
                    if ($('td[role="gridcell"]', o).each(function(a) {
                        if (y = j.p.colModel[a], k = y.name, "cb" !== k && "subgrid" !== k && y.editable === !0 && "rn" !== k && !$(this).hasClass("not-editable-cell")) {
                            switch (y.edittype) {
                            case "checkbox":
                                var b = ["Yes", "No"];
                                y.editoptions && (b = y.editoptions.value.split(":")),
                                q[k] = $("input", this).is(":checked") ? b[0] : b[1];
                                break;
                            case "text":
                            case "password":
                            case "textarea":
                            case "button":
                                q[k] = $("input, textarea", this).val();
                                break;
                            case "select":
                                if (y.editoptions.multiple) {
                                    var c = $("select", this),
                                    d = [];
                                    q[k] = $(c).val(),
                                    q[k] = q[k] ? q[k].join(",") : "",
                                    $("select option:selected", this).each(function(a, b) {
                                        d[a] = $(b).text()
                                    }),
                                    r[k] = d.join(",")
                                } else q[k] = $("select option:selected", this).val(),
                                r[k] = $("select option:selected", this).text();
                                y.formatter && "select" === y.formatter && (r = {});
                                break;
                            case "custom":
                                try {
                                    if (!y.editoptions || !$.isFunction(y.editoptions.custom_value)) throw "e1";
                                    if (q[k] = y.editoptions.custom_value.call(j, $(".customelement", this), "get"), void 0 === q[k]) throw "e2"
                                } catch(e) {
                                    "e1" === e ? $.jgrid.info_dialog(v.errcap, "function 'custom_value' " + w.msg.nodefined, w.bClose, {
                                        styleUI: j.p.styleUI
                                    }) : $.jgrid.info_dialog(v.errcap, e.message, w.bClose, {
                                        styleUI: j.p.styleUI
                                    })
                                }
                            }
                            if (n = $.jgrid.checkValues.call(j, q[k], a), n[0] === !1) return ! 1;
                            j.p.autoencode && (q[k] = $.jgrid.htmlEncode(q[k])),
                            "clientArray" !== i.url && y.editoptions && y.editoptions.NullIfEmpty === !0 && "" === q[k] && (s[k] = "null", t = !0)
                        }
                    }), n[0] === !1) {
                        try {
                            var z = $(j).jqGrid("getGridRowById", a),
                            A = $.jgrid.findPos(z);
                            $.jgrid.info_dialog(v.errcap, n[1], w.bClose, {
                                left: A[0],
                                top: A[1] + $(z).outerHeight(),
                                styleUI: j.p.styleUI
                            })
                        } catch(B) {
                            alert(n[1])
                        }
                        return p
                    }
                    var C, D = j.p.prmNames,
                    E = a;
                    if (C = j.p.keyName === !1 ? D.id: j.p.keyName, q) {
                        if (q[D.oper] = D.editoper, void 0 === q[C] || "" === q[C]) q[C] = a;
                        else if (o.id !== j.p.idPrefix + q[C]) {
                            var F = $.jgrid.stripPref(j.p.idPrefix, a);
                            if (void 0 !== j.p._index[F] && (j.p._index[q[C]] = j.p._index[F], delete j.p._index[F]), a = j.p.idPrefix + q[C], $(o).attr("id", a), j.p.selrow === E && (j.p.selrow = a), $.isArray(j.p.selarrrow)) {
                                var G = $.inArray(E, j.p.selarrrow);
                                G >= 0 && (j.p.selarrrow[G] = a)
                            }
                            if (j.p.multiselect) {
                                var H = "jqg_" + j.p.id + "_" + a;
                                $("input.cbox", o).attr("id", H).attr("name", H)
                            }
                        }
                        void 0 === j.p.inlineData && (j.p.inlineData = {}),
                        q = $.extend({},
                        q, j.p.inlineData, i.extraparam)
                    }
                    if ("clientArray" === i.url) {
                        q = $.extend({},
                        q, r),
                        j.p.autoencode && $.each(q,
                        function(a, b) {
                            q[a] = $.jgrid.htmlDecode(b)
                        });
                        var I, J = $(j).jqGrid("setRowData", a, q);
                        for ($(o).attr("editable", "0"), I = 0; I < j.p.savedRow.length; I++) if (String(j.p.savedRow[I].id) === String(E)) {
                            m = I;
                            break
                        }
                        m >= 0 && j.p.savedRow.splice(m, 1),
                        $(j).triggerHandler("jqGridInlineAfterSaveRow", [a, J, q, i]),
                        $.isFunction(i.aftersavefunc) && i.aftersavefunc.call(j, a, J, q, i),
                        p = !0,
                        $(o).removeClass("jqgrid-new-row").unbind("keydown")
                    } else $(j).jqGrid("progressBar", {
                        method: "show",
                        loadtype: i.saveui,
                        htmlcontent: i.savetext
                    }),
                    s = $.extend({},
                    q, s),
                    s[C] = $.jgrid.stripPref(j.p.idPrefix, s[C]),
                    $.ajax($.extend({
                        url: i.url,
                        data: $.isFunction(j.p.serializeRowData) ? j.p.serializeRowData.call(j, s) : s,
                        type: i.mtype,
                        async: !1,
                        complete: function(b, c) {
                            if ($(j).jqGrid("progressBar", {
                                method: "hide",
                                loadtype: i.saveui,
                                htmlcontent: i.savetext
                            }), "success" === c) {
                                var d, e, f = !0;
                                if (d = $(j).triggerHandler("jqGridInlineSuccessSaveRow", [b, a, i]), $.isArray(d) || (d = [!0, s]), d[0] && $.isFunction(i.successfunc) && (d = i.successfunc.call(j, b)), $.isArray(d) ? (f = d[0], q = d[1] || q) : f = d, f === !0) {
                                    for (j.p.autoencode && $.each(q,
                                    function(a, b) {
                                        q[a] = $.jgrid.htmlDecode(b)
                                    }), t && $.each(q,
                                    function(a) {
                                        "null" === q[a] && (q[a] = "")
                                    }), q = $.extend({},
                                    q, r), $(j).jqGrid("setRowData", a, q), $(o).attr("editable", "0"), e = 0; e < j.p.savedRow.length; e++) if (String(j.p.savedRow[e].id) === String(a)) {
                                        m = e;
                                        break
                                    }
                                    m >= 0 && j.p.savedRow.splice(m, 1),
                                    $(j).triggerHandler("jqGridInlineAfterSaveRow", [a, b, q, i]),
                                    $.isFunction(i.aftersavefunc) && i.aftersavefunc.call(j, a, b, q, i),
                                    p = !0,
                                    $(o).removeClass("jqgrid-new-row").unbind("keydown")
                                } else $(j).triggerHandler("jqGridInlineErrorSaveRow", [a, b, c, null, i]),
                                $.isFunction(i.errorfunc) && i.errorfunc.call(j, a, b, c, null),
                                i.restoreAfterError === !0 && $(j).jqGrid("restoreRow", a, i.afterrestorefunc)
                            }
                        },
                        error: function(b, c, d) {
                            if ($("#lui_" + $.jgrid.jqID(j.p.id)).hide(), $(j).triggerHandler("jqGridInlineErrorSaveRow", [a, b, c, d, i]), $.isFunction(i.errorfunc)) i.errorfunc.call(j, a, b, c, d);
                            else {
                                var e = b.responseText || b.statusText;
                                try {
                                    $.jgrid.info_dialog(v.errcap, '<div class="' + u + '">' + e + "</div>", w.bClose, {
                                        buttonalign: "right",
                                        styleUI: j.p.styleUI
                                    })
                                } catch(f) {
                                    alert(e)
                                }
                            }
                            i.restoreAfterError === !0 && $(j).jqGrid("restoreRow", a, i.afterrestorefunc)
                        }
                    },
                    $.jgrid.ajaxOptions, j.p.ajaxRowOptions || {}))
                }
                return p
            }
        },
        restoreRow: function(a, b) {
            var c = $.makeArray(arguments).slice(1),
            d = {};
            return "object" === $.type(c[0]) ? d = c[0] : $.isFunction(b) && (d.afterrestorefunc = b),
            d = $.extend(!0, {},
            $.jgrid.inlineEdit, d),
            this.each(function() {
                var b, c, e = this,
                f = -1,
                g = {};
                if (e.grid && (b = $(e).jqGrid("getInd", a, !0), b !== !1)) {
                    var h = $.isFunction(d.beforeCancelRow) ? d.beforeCancelRow.call(e, d, a) : void 0;
                    if (void 0 === h && (h = !0), h) {
                        for (c = 0; c < e.p.savedRow.length; c++) if (String(e.p.savedRow[c].id) === String(a)) {
                            f = c;
                            break
                        }
                        if (f >= 0) {
                            if ($.isFunction($.fn.datepicker)) try {
                                $("input.hasDatepicker", "#" + $.jgrid.jqID(b.id)).datepicker("hide")
                            } catch(i) {}
                            $.each(e.p.colModel,
                            function() {
                                this.editable === !0 && e.p.savedRow[f].hasOwnProperty(this.name) && (g[this.name] = e.p.savedRow[f][this.name])
                            }),
                            $(e).jqGrid("setRowData", a, g),
                            $(b).attr("editable", "0").unbind("keydown"),
                            e.p.savedRow.splice(f, 1),
                            $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(e.p.id)).hasClass("jqgrid-new-row") && setTimeout(function() {
                                $(e).jqGrid("delRowData", a),
                                $(e).jqGrid("showAddEditButtons")
                            },
                            0)
                        }
                        $(e).triggerHandler("jqGridInlineAfterRestoreRow", [a]),
                        $.isFunction(d.afterrestorefunc) && d.afterrestorefunc.call(e, a)
                    }
                }
            })
        },
        addRow: function(a) {
            return a = $.extend(!0, {
                rowID: null,
                initdata: {},
                position: "first",
                useDefValues: !0,
                useFormatter: !1,
                addRowParams: {
                    extraparam: {}
                }
            },
            a || {}),
            this.each(function() {
                if (this.grid) {
                    var b = this,
                    c = $.isFunction(a.beforeAddRow) ? a.beforeAddRow.call(b, a.addRowParams) : void 0;
                    if (void 0 === c && (c = !0), c) if (a.rowID = $.isFunction(a.rowID) ? a.rowID.call(b, a) : null != a.rowID ? a.rowID: $.jgrid.randId(), a.useDefValues === !0 && $(b.p.colModel).each(function() {
                        if (this.editoptions && this.editoptions.defaultValue) {
                            var c = this.editoptions.defaultValue,
                            d = $.isFunction(c) ? c.call(b) : c;
                            a.initdata[this.name] = d
                        }
                    }), $(b).jqGrid("addRowData", a.rowID, a.initdata, a.position), a.rowID = b.p.idPrefix + a.rowID, $("#" + $.jgrid.jqID(a.rowID), "#" + $.jgrid.jqID(b.p.id)).addClass("jqgrid-new-row"), a.useFormatter) $("#" + $.jgrid.jqID(a.rowID) + " .ui-inline-edit", "#" + $.jgrid.jqID(b.p.id)).click();
                    else {
                        var d = b.p.prmNames,
                        e = d.oper;
                        a.addRowParams.extraparam[e] = d.addoper,
                        $(b).jqGrid("editRow", a.rowID, a.addRowParams),
                        $(b).jqGrid("setSelection", a.rowID)
                    }
                }
            })
        },
        inlineNav: function(a, b) {
            var c = this[0],
            d = $.jgrid.getRegional(c, "nav"),
            e = $.jgrid.styleUI[c.p.styleUI].inlinedit;
            return b = $.extend(!0, {
                edit: !0,
                editicon: e.icon_edit_nav,
                add: !0,
                addicon: e.icon_add_nav,
                save: !0,
                saveicon: e.icon_save_nav,
                cancel: !0,
                cancelicon: e.icon_cancel_nav,
                addParams: {
                    addRowParams: {
                        extraparam: {}
                    }
                },
                editParams: {},
                restoreAfterSelect: !0
            },
            d, b || {}),
            this.each(function() {
                if (this.grid && !this.p.inlineNav) {
                    var e = $.jgrid.jqID(c.p.id),
                    f = $.trim($(c).jqGrid("getStyleUI", c.p.styleUI + ".common", "disabled", !0));
                    if (c.p.navGrid || $(c).jqGrid("navGrid", a, {
                        refresh: !1,
                        edit: !1,
                        add: !1,
                        del: !1,
                        search: !1,
                        view: !1
                    }), $(c).data("inlineNav") || $(c).data("inlineNav", b), c.p.force_regional && (b = $.extend(b, d)), c.p.inlineNav = !0, b.addParams.useFormatter === !0) {
                        var g, h = c.p.colModel;
                        for (g = 0; g < h.length; g++) if (h[g].formatter && "actions" === h[g].formatter) {
                            if (h[g].formatoptions) {
                                var i = {
                                    keys: !1,
                                    onEdit: null,
                                    onSuccess: null,
                                    afterSave: null,
                                    onError: null,
                                    afterRestore: null,
                                    extraparam: {},
                                    url: null
                                },
                                j = $.extend(i, h[g].formatoptions);
                                b.addParams.addRowParams = {
                                    keys: j.keys,
                                    oneditfunc: j.onEdit,
                                    successfunc: j.onSuccess,
                                    url: j.url,
                                    extraparam: j.extraparam,
                                    aftersavefunc: j.afterSave,
                                    errorfunc: j.onError,
                                    afterrestorefunc: j.afterRestore
                                }
                            }
                            break
                        }
                    }
                    b.add && $(c).jqGrid("navButtonAdd", a, {
                        caption: b.addtext,
                        title: b.addtitle,
                        buttonicon: b.addicon,
                        id: c.p.id + "_iladd",
                        onClickButton: function() {
                            $(c).jqGrid("addRow", b.addParams),
                            b.addParams.useFormatter || ($("#" + e + "_ilsave").removeClass(f), $("#" + e + "_ilcancel").removeClass(f), $("#" + e + "_iladd").addClass(f), $("#" + e + "_iledit").addClass(f))
                        }
                    }),
                    b.edit && $(c).jqGrid("navButtonAdd", a, {
                        caption: b.edittext,
                        title: b.edittitle,
                        buttonicon: b.editicon,
                        id: c.p.id + "_iledit",
                        onClickButton: function() {
                            var a = $(c).jqGrid("getGridParam", "selrow");
                            a ? ($(c).jqGrid("editRow", a, b.editParams), $("#" + e + "_ilsave").removeClass(f), $("#" + e + "_ilcancel").removeClass(f), $("#" + e + "_iladd").addClass(f), $("#" + e + "_iledit").addClass(f)) : ($.jgrid.viewModal("#alertmod_" + e, {
                                gbox: "#gbox_" + e,
                                jqm: !0
                            }), $("#jqg_alrt").focus())
                        }
                    }),
                    b.save && ($(c).jqGrid("navButtonAdd", a, {
                        caption: b.savetext || "",
                        title: b.savetitle || "Save row",
                        buttonicon: b.saveicon,
                        id: c.p.id + "_ilsave",
                        onClickButton: function() {
                            var a = c.p.savedRow[0].id;
                            if (a) {
                                var d = c.p.prmNames,
                                f = d.oper,
                                g = b.editParams;
                                $("#" + $.jgrid.jqID(a), "#" + e).hasClass("jqgrid-new-row") ? (b.addParams.addRowParams.extraparam[f] = d.addoper, g = b.addParams.addRowParams) : (b.editParams.extraparam || (b.editParams.extraparam = {}), b.editParams.extraparam[f] = d.editoper),
                                $(c).jqGrid("saveRow", a, g) && $(c).jqGrid("showAddEditButtons")
                            } else $.jgrid.viewModal("#alertmod_" + e, {
                                gbox: "#gbox_" + e,
                                jqm: !0
                            }),
                            $("#jqg_alrt").focus()
                        }
                    }), $("#" + e + "_ilsave").addClass(f)),
                    b.cancel && ($(c).jqGrid("navButtonAdd", a, {
                        caption: b.canceltext || "",
                        title: b.canceltitle || "Cancel row editing",
                        buttonicon: b.cancelicon,
                        id: c.p.id + "_ilcancel",
                        onClickButton: function() {
                            var a = c.p.savedRow[0].id,
                            d = b.editParams;
                            a ? ($("#" + $.jgrid.jqID(a), "#" + e).hasClass("jqgrid-new-row") && (d = b.addParams.addRowParams), $(c).jqGrid("restoreRow", a, d), $(c).jqGrid("showAddEditButtons")) : ($.jgrid.viewModal("#alertmod", {
                                gbox: "#gbox_" + e,
                                jqm: !0
                            }), $("#jqg_alrt").focus())
                        }
                    }), $("#" + e + "_ilcancel").addClass(f)),
                    b.restoreAfterSelect === !0 && $(c).bind("jqGridBeforeSelectRow.inlineNav",
                    function(a, d) {
                        c.p.savedRow.length > 0 && c.p.inlineNav === !0 && d !== c.p.selrow && null !== c.p.selrow && (c.p.selrow === b.addParams.rowID ? $(c).jqGrid("delRowData", c.p.selrow) : $(c).jqGrid("restoreRow", c.p.selrow, b.editParams), $(c).jqGrid("showAddEditButtons"))
                    })
                }
            })
        },
        showAddEditButtons: function() {
            return this.each(function() {
                if (this.grid) {
                    var a = $.jgrid.jqID(this.p.id),
                    b = $.trim($(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "disabled", !0));
                    $("#" + a + "_ilsave").addClass(b),
                    $("#" + a + "_ilcancel").addClass(b),
                    $("#" + a + "_iladd").removeClass(b),
                    $("#" + a + "_iledit").removeClass(b)
                }
            })
        }
    }), $.jgrid.msie && 8 === $.jgrid.msiever() && ($.expr[":"].hidden = function(a) {
        return 0 === a.offsetWidth || 0 === a.offsetHeight || "none" === a.style.display
    }), $.jgrid._multiselect = !1, $.ui && $.ui.multiselect) {
        if ($.ui.multiselect.prototype._setSelected) {
            var setSelected = $.ui.multiselect.prototype._setSelected;
            $.ui.multiselect.prototype._setSelected = function(a, b) {
                var c = setSelected.call(this, a, b);
                if (b && this.selectedList) {
                    var d = this.element;
                    this.selectedList.find("li").each(function() {
                        $(this).data("optionLink") && $(this).data("optionLink").remove().appendTo(d)
                    })
                }
                return c
            }
        }
        $.ui.multiselect.prototype.destroy && ($.ui.multiselect.prototype.destroy = function() {
            this.element.show(),
            this.container.remove(),
            void 0 === $.Widget ? $.widget.prototype.destroy.apply(this, arguments) : $.Widget.prototype.destroy.apply(this, arguments)
        }),
        $.jgrid._multiselect = !0
    }
    $.jgrid.extend({
        sortableColumns: function(a) {
            return this.each(function() {
                function b() {
                    c.p.disableClick = !0
                }
                var c = this,
                d = $.jgrid.jqID(c.p.id),
                e = {
                    tolerance: "pointer",
                    axis: "x",
                    scrollSensitivity: "1",
                    items: ">th:not(:has(#jqgh_" + d + "_cb,#jqgh_" + d + "_rn,#jqgh_" + d + "_subgrid),:hidden)",
                    placeholder: {
                        element: function(a) {
                            var b = $(document.createElement(a[0].nodeName)).addClass(a[0].className + " ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0];
                            return b
                        },
                        update: function(a, b) {
                            b.height(a.currentItem.innerHeight() - parseInt(a.currentItem.css("paddingTop") || 0, 10) - parseInt(a.currentItem.css("paddingBottom") || 0, 10)),
                            b.width(a.currentItem.innerWidth() - parseInt(a.currentItem.css("paddingLeft") || 0, 10) - parseInt(a.currentItem.css("paddingRight") || 0, 10))
                        }
                    },
                    update: function(a, b) {
                        var d = $(b.item).parent(),
                        e = $(">th", d),
                        f = c.p.colModel,
                        g = {},
                        h = c.p.id + "_";
                        $.each(f,
                        function(a) {
                            g[this.name] = a
                        });
                        var i = [];
                        e.each(function() {
                            var a = $(">div", this).get(0).id.replace(/^jqgh_/, "").replace(h, "");
                            g.hasOwnProperty(a) && i.push(g[a])
                        }),
                        $(c).jqGrid("remapColumns", i, !0, !0),
                        $.isFunction(c.p.sortable.update) && c.p.sortable.update(i),
                        setTimeout(function() {
                            c.p.disableClick = !1
                        },
                        50)
                    }
                };
                if (c.p.sortable.options ? $.extend(e, c.p.sortable.options) : $.isFunction(c.p.sortable) && (c.p.sortable = {
                    update: c.p.sortable
                }), e.start) {
                    var f = e.start;
                    e.start = function(a, c) {
                        b(),
                        f.call(this, a, c)
                    }
                } else e.start = b;
                c.p.sortable.exclude && (e.items += ":not(" + c.p.sortable.exclude + ")");
                var g = a.sortable(e),
                h = g.data("sortable") || g.data("uiSortable");
                null != h && (h.data("sortable").floating = !0)
            })
        },
        columnChooser: function(a) {
            function b(a, b, c) {
                var d, e;
                return b >= 0 ? (d = a.slice(), e = d.splice(b, Math.max(a.length - b, b)), b > a.length && (b = a.length), d[b] = c, d.concat(e)) : a
            }
            function c(a, b) {
                a && ("string" == typeof a ? $.fn[a] && $.fn[a].apply(b, $.makeArray(arguments).slice(2)) : $.isFunction(a) && a.apply(b, $.makeArray(arguments).slice(2)))
            }
            var d, e, f, g, h, i, j, k = this,
            l = {},
            m = [],
            n = k.jqGrid("getGridParam", "colModel"),
            o = k.jqGrid("getGridParam", "colNames"),
            p = function(a) {
                return $.ui.multiselect.prototype && a.data($.ui.multiselect.prototype.widgetFullName || $.ui.multiselect.prototype.widgetName) || a.data("ui-multiselect") || a.data("multiselect")
            },
            q = $.jgrid.getRegional(this[0], "col");
            if (!$("#colchooser_" + $.jgrid.jqID(k[0].p.id)).length) {
                if (d = $('<div id="colchooser_' + k[0].p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>'), e = $("select", d), a = $.extend({
                    width: 400,
                    height: 240,
                    classname: null,
                    done: function(a) {
                        a && k.jqGrid("remapColumns", a, !0)
                    },
                    msel: "multiselect",
                    dlog: "dialog",
                    dialog_opts: {
                        minWidth: 470,
                        dialogClass: "ui-jqdialog"
                    },
                    dlog_opts: function(a) {
                        var b = {};
                        return b[a.bSubmit] = function() {
                            a.apply_perm(),
                            a.cleanup(!1)
                        },
                        b[a.bCancel] = function() {
                            a.cleanup(!0)
                        },
                        $.extend(!0, {
                            buttons: b,
                            close: function() {
                                a.cleanup(!0)
                            },
                            modal: a.modal || !1,
                            resizable: a.resizable || !0,
                            width: a.width + 70,
                            resize: function() {
                                var a = p(e),
                                b = a.container.closest(".ui-dialog-content");
                                b.length > 0 && "object" == typeof b[0].style ? b[0].style.width = "": b.css("width", ""),
                                a.selectedList.height(Math.max(a.selectedContainer.height() - a.selectedActions.outerHeight() - 1, 1)),
                                a.availableList.height(Math.max(a.availableContainer.height() - a.availableActions.outerHeight() - 1, 1))
                            }
                        },
                        a.dialog_opts || {})
                    },
                    apply_perm: function() {
                        var c = [];
                        $("option", e).each(function() {
                            $(this).is("[selected]") ? k.jqGrid("showCol", n[this.value].name) : k.jqGrid("hideCol", n[this.value].name)
                        }),
                        $("option[selected]", e).each(function() {
                            c.push(parseInt(this.value, 10))
                        }),
                        $.each(c,
                        function() {
                            delete l[n[parseInt(this, 10)].name]
                        }),
                        $.each(l,
                        function() {
                            var a = parseInt(this, 10);
                            c = b(c, a, a)
                        }),
                        a.done && a.done.call(k, c),
                        k.jqGrid("setGridWidth", k[0].p.width, k[0].p.shrinkToFit)
                    },
                    cleanup: function(b) {
                        c(a.dlog, d, "destroy"),
                        c(a.msel, e, "destroy"),
                        d.remove(),
                        b && a.done && a.done.call(k)
                    },
                    msel_opts: {}
                },
                q, a || {}), $.ui && $.ui.multiselect && $.ui.multiselect.defaults) {
                    if (!$.jgrid._multiselect) return void alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
                    a.msel_opts = $.extend($.ui.multiselect.defaults, a.msel_opts)
                }
                a.caption && d.attr("title", a.caption),
                a.classname && (d.addClass(a.classname), e.addClass(a.classname)),
                a.width && ($(">div", d).css({
                    width: a.width,
                    margin: "0 auto"
                }), e.css("width", a.width)),
                a.height && ($(">div", d).css("height", a.height), e.css("height", a.height - 10)),
                e.empty(),
                $.each(n,
                function(a) {
                    return l[this.name] = a,
                    this.hidedlg ? void(this.hidden || m.push(a)) : void e.append("<option value='" + a + "' " + (this.hidden ? "": "selected='selected'") + ">" + $.jgrid.stripHtml(o[a]) + "</option>")
                }),
                f = $.isFunction(a.dlog_opts) ? a.dlog_opts.call(k, a) : a.dlog_opts,
                c(a.dlog, d, f),
                g = $.isFunction(a.msel_opts) ? a.msel_opts.call(k, a) : a.msel_opts,
                c(a.msel, e, g),
                h = $("#colchooser_" + $.jgrid.jqID(k[0].p.id)),
                h.css({
                    margin: "auto"
                }),
                h.find(">div").css({
                    width: "100%",
                    height: "100%",
                    margin: "auto"
                }),
                i = p(e),
                i.container.css({
                    width: "100%",
                    height: "100%",
                    margin: "auto"
                }),
                i.selectedContainer.css({
                    width: 100 * i.options.dividerLocation + "%",
                    height: "100%",
                    margin: "auto",
                    boxSizing: "border-box"
                }),
                i.availableContainer.css({
                    width: 100 - 100 * i.options.dividerLocation + "%",
                    height: "100%",
                    margin: "auto",
                    boxSizing: "border-box"
                }),
                i.selectedList.css("height", "auto"),
                i.availableList.css("height", "auto"),
                j = Math.max(i.selectedList.height(), i.availableList.height()),
                j = Math.min(j, $(window).height()),
                i.selectedList.css("height", j),
                i.availableList.css("height", j)
            }
        },
        sortableRows: function(a) {
            return this.each(function() {
                var b = this;
                b.grid && (b.p.treeGrid || $.fn.sortable && (a = $.extend({
                    cursor: "move",
                    axis: "y",
                    items: " > .jqgrow"
                },
                a || {}), a.start && $.isFunction(a.start) ? (a._start_ = a.start, delete a.start) : a._start_ = !1, a.update && $.isFunction(a.update) ? (a._update_ = a.update, delete a.update) : a._update_ = !1, a.start = function(c, d) {
                    if ($(d.item).css("border-width", "0"), $("td", d.item).each(function(a) {
                        this.style.width = b.grid.cols[a].style.width
                    }), b.p.subGrid) {
                        var e = $(d.item).attr("id");
                        try {
                            $(b).jqGrid("collapseSubGridRow", e)
                        } catch(f) {}
                    }
                    a._start_ && a._start_.apply(this, [c, d])
                },
                a.update = function(c, d) {
                    $(d.item).css("border-width", ""),
                    b.p.rownumbers === !0 && $("td.jqgrid-rownum", b.rows).each(function(a) {
                        $(this).html(a + 1 + (parseInt(b.p.page, 10) - 1) * parseInt(b.p.rowNum, 10))
                    }),
                    a._update_ && a._update_.apply(this, [c, d])
                },
                $("tbody:first", b).sortable(a), $("tbody:first > .jqgrow", b).disableSelection()))
            })
        },
        gridDnD: function(a) {
            return this.each(function() {
                function b() {
                    var a = $.data(e, "dnd");
                    $("tr.jqgrow:not(.ui-draggable)", e).draggable($.isFunction(a.drag) ? a.drag.call($(e), a) : a.drag)
                }
                var c, d, e = this;
                if (e.grid && !e.p.treeGrid && $.fn.draggable && $.fn.droppable) {
                    var f = "<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>";
                    if (void 0 === $("#jqgrid_dnd")[0] && $("body").append(f), "string" == typeof a && "updateDnD" === a && e.p.jqgdnd === !0) return void b();
                    if (a = $.extend({
                        drag: function(a) {
                            return $.extend({
                                start: function(b, c) {
                                    var d, f;
                                    if (e.p.subGrid) {
                                        f = $(c.helper).attr("id");
                                        try {
                                            $(e).jqGrid("collapseSubGridRow", f)
                                        } catch(g) {}
                                    }
                                    for (d = 0; d < $.data(e, "dnd").connectWith.length; d++) 0 === $($.data(e, "dnd").connectWith[d]).jqGrid("getGridParam", "reccount") && $($.data(e, "dnd").connectWith[d]).jqGrid("addRowData", "jqg_empty_row", {});
                                    c.helper.addClass("ui-state-highlight"),
                                    $("td", c.helper).each(function(a) {
                                        this.style.width = e.grid.headers[a].width + "px"
                                    }),
                                    a.onstart && $.isFunction(a.onstart) && a.onstart.call($(e), b, c)
                                },
                                stop: function(b, c) {
                                    var d, f;
                                    for (c.helper.dropped && !a.dragcopy && (f = $(c.helper).attr("id"), void 0 === f && (f = $(this).attr("id")), $(e).jqGrid("delRowData", f)), d = 0; d < $.data(e, "dnd").connectWith.length; d++) $($.data(e, "dnd").connectWith[d]).jqGrid("delRowData", "jqg_empty_row");
                                    a.onstop && $.isFunction(a.onstop) && a.onstop.call($(e), b, c)
                                }
                            },
                            a.drag_opts || {})
                        },
                        drop: function(a) {
                            return $.extend({
                                accept: function(a) {
                                    if (!$(a).hasClass("jqgrow")) return a;
                                    var b = $(a).closest("table.ui-jqgrid-btable");
                                    if (b.length > 0 && void 0 !== $.data(b[0], "dnd")) {
                                        var c = $.data(b[0], "dnd").connectWith;
                                        return - 1 !== $.inArray("#" + $.jgrid.jqID(this.id), c) ? !0 : !1
                                    }
                                    return ! 1
                                },
                                drop: function(b, c) {
                                    if ($(c.draggable).hasClass("jqgrow")) {
                                        var d = $(c.draggable).attr("id"),
                                        f = c.draggable.parent().parent().jqGrid("getRowData", d);
                                        if (!a.dropbyname) {
                                            var g, h, i = 0,
                                            j = {},
                                            k = $("#" + $.jgrid.jqID(this.id)).jqGrid("getGridParam", "colModel");
                                            try {
                                                for (h in f) f.hasOwnProperty(h) && (g = k[i].name, "cb" !== g && "rn" !== g && "subgrid" !== g && f.hasOwnProperty(h) && k[i] && (j[g] = f[h]), i++);
                                                f = j
                                            } catch(l) {}
                                        }
                                        if (c.helper.dropped = !0, a.beforedrop && $.isFunction(a.beforedrop)) {
                                            var m = a.beforedrop.call(this, b, c, f, $("#" + $.jgrid.jqID(e.p.id)), $(this));
                                            void 0 !== m && null !== m && "object" == typeof m && (f = m)
                                        }
                                        if (c.helper.dropped) {
                                            var n;
                                            a.autoid && ($.isFunction(a.autoid) ? n = a.autoid.call(this, f) : (n = Math.ceil(1e3 * Math.random()), n = a.autoidprefix + n)),
                                            $("#" + $.jgrid.jqID(this.id)).jqGrid("addRowData", n, f, a.droppos)
                                        }
                                        a.ondrop && $.isFunction(a.ondrop) && a.ondrop.call(this, b, c, f)
                                    }
                                }
                            },
                            a.drop_opts || {})
                        },
                        onstart: null,
                        onstop: null,
                        beforedrop: null,
                        ondrop: null,
                        drop_opts: {
                            activeClass: "ui-state-active",
                            hoverClass: "ui-state-hover"
                        },
                        drag_opts: {
                            revert: "invalid",
                            helper: "clone",
                            cursor: "move",
                            appendTo: "#jqgrid_dnd",
                            zIndex: 5e3
                        },
                        dragcopy: !1,
                        dropbyname: !1,
                        droppos: "first",
                        autoid: !0,
                        autoidprefix: "dnd_"
                    },
                    a || {}), a.connectWith) for (a.connectWith = a.connectWith.split(","), a.connectWith = $.map(a.connectWith,
                    function(a) {
                        return $.trim(a)
                    }), $.data(e, "dnd", a), 0 === e.p.reccount || e.p.jqgdnd || b(), e.p.jqgdnd = !0, c = 0; c < a.connectWith.length; c++) d = a.connectWith[c],
                    $(d).droppable($.isFunction(a.drop) ? a.drop.call($(e), a) : a.drop)
                }
            })
        },
        gridResize: function(opts) {
            return this.each(function() {
                var $t = this,
                gID = $.jgrid.jqID($t.p.id),
                req;
                if ($t.grid && $.fn.resizable) {
                    if (opts = $.extend({},
                    opts || {}), opts.alsoResize ? (opts._alsoResize_ = opts.alsoResize, delete opts.alsoResize) : opts._alsoResize_ = !1, opts.stop && $.isFunction(opts.stop) ? (opts._stop_ = opts.stop, delete opts.stop) : opts._stop_ = !1, opts.stop = function(a, b) {
                        $($t).jqGrid("setGridParam", {
                            height: $("#gview_" + gID + " .ui-jqgrid-bdiv").height()
                        }),
                        $($t).jqGrid("setGridWidth", b.size.width, opts.shrinkToFit),
                        opts._stop_ && opts._stop_.call($t, a, b),
                        $t.p.caption && $("#gbox_" + gID).css({
                            height: "auto"
                        }),
                        $t.p.frozenColumns && (req && clearTimeout(req), req = setTimeout(function() {
                            req && clearTimeout(req),
                            $("#" + gID).jqGrid("destroyFrozenColumns"),
                            $("#" + gID).jqGrid("setFrozenColumns")
                        }))
                    },
                    opts._alsoResize_) {
                        var optstest = "{'#gview_" + gID + " .ui-jqgrid-bdiv':true,'" + opts._alsoResize_ + "':true}";
                        opts.alsoResize = eval("(" + optstest + ")")
                    } else opts.alsoResize = $(".ui-jqgrid-bdiv", "#gview_" + gID);
                    delete opts._alsoResize_,
                    $("#gbox_" + gID).resizable(opts)
                }
            })
        }
    }),
    $.assocArraySize = function(a) {
        var b, c = 0;
        for (b in a) a.hasOwnProperty(b) && c++;
        return c
    },
    $.jgrid.extend({
        pivotSetup: function(a, b) {
            var c = [],
            d = [],
            e = [],
            f = [],
            g = [],
            h = {
                grouping: !0,
                groupingView: {
                    groupField: [],
                    groupSummary: [],
                    groupSummaryPos: []
                }
            },
            i = [],
            j = $.extend({
                rowTotals: !1,
                rowTotalsText: "Total",
                colTotals: !1,
                groupSummary: !0,
                groupSummaryPos: "header",
                frozenStaticCols: !1
            },
            b || {});
            return this.each(function() {
                function b(a, b, c) {
                    var d;
                    return d = _pivotfilter.call(a, b, c),
                    d.length > 0 ? d[0] : null
                }
                function k(a, b) {
                    var c, d = 0,
                    e = !0;
                    for (c in a) if (a.hasOwnProperty(c)) {
                        if (a[c] != this[d]) {
                            e = !1;
                            break
                        }
                        if (d++, d >= this.length) break
                    }
                    return e && (p = b),
                    e
                }
                function l(a, b, c, d) {
                    var e;
                    switch (a) {
                    case "sum":
                        e = parseFloat(b || 0) + parseFloat(d[c] || 0);
                        break;
                    case "count":
                        ("" === b || null == b) && (b = 0),
                        e = d.hasOwnProperty(c) ? b + 1 : 0;
                        break;
                    case "min":
                        e = "" === b || null == b ? parseFloat(d[c] || 0) : Math.min(parseFloat(b), parseFloat(d[c] || 0));
                        break;
                    case "max":
                        e = "" === b || null == b ? parseFloat(d[c] || 0) : Math.max(parseFloat(b), parseFloat(d[c] || 0))
                    }
                    return e
                }
                function m(a, b, c, d) {
                    var e, h, i, j, k = b.length,
                    m = "",
                    n = [];
                    for ($.isArray(c) ? (j = c.length, n = c) : (j = 1, n[0] = c), f = [], g = [], f.root = 0, i = 0; j > i; i++) {
                        var o, p = [];
                        for (e = 0; k > e; e++) {
                            if (null == c) h = $.trim(b[e].member) + "_" + b[e].aggregator,
                            o = h,
                            n[0] = b[e].label || b[e].aggregator + " " + $.trim(b[e].member);
                            else {
                                o = c[i].replace(/\s+/g, "");
                                try {
                                    h = 1 === k ? m + o: m + o + "_" + b[e].aggregator + "_" + String(e)
                                } catch(q) {}
                                n[i] = c[i]
                            }
                            h = isNaN(parseInt(h, 10)) ? h: h + " ",
                            d[h] = p[h] = l(b[e].aggregator, d[h], b[e].member, a),
                            1 >= i && "_r_Totals" !== o && "" === m && (m = o)
                        }
                        f[h] = p,
                        g[h] = n[i]
                    }
                    return d
                }
                function n(a) {
                    var b, d, e, f, g;
                    for (e in a) if (a.hasOwnProperty(e)) {
                        if ("object" != typeof a[e]) {
                            if ("level" === e) {
                                if (void 0 === J[a.level] && (J[a.level] = "", a.level > 0 && "_r_Totals" !== a.text && (i[a.level - 1] = {
                                    useColSpanStyle: !1,
                                    groupHeaders: []
                                })), J[a.level] !== a.text && a.children.length && "_r_Totals" !== a.text && a.level > 0) {
                                    i[a.level - 1].groupHeaders.push({
                                        titleText: a.label,
                                        numberOfColumns: 0
                                    });
                                    var h = i[a.level - 1].groupHeaders.length - 1,
                                    k = 0 === h ? L: K + t;
                                    if (a.level - 1 === (j.rowTotals ? 1 : 0) && h > 0) {
                                        for (var l = 0,
                                        m = 0; h > m; m++) l += i[a.level - 1].groupHeaders[m].numberOfColumns;
                                        l && (k = l + r)
                                    }
                                    c[k] && (i[a.level - 1].groupHeaders[h].startColumnName = c[k].name, i[a.level - 1].groupHeaders[h].numberOfColumns = c.length - k),
                                    K = c.length
                                }
                                J[a.level] = a.text
                            }
                            if (a.level === s && "level" === e && s > 0) if (t > 1) {
                                var o = 1;
                                for (b in a.fields) a.fields.hasOwnProperty(b) && (1 === o && i[s - 1].groupHeaders.push({
                                    startColumnName: b,
                                    numberOfColumns: 1,
                                    titleText: a.label || a.text
                                }), o++);
                                i[s - 1].groupHeaders[i[s - 1].groupHeaders.length - 1].numberOfColumns = o - 1
                            } else i.splice(s - 1, 1)
                        }
                        if (null != a[e] && "object" == typeof a[e] && n(a[e]), "level" === e && a.level > 0 && a.level === (0 === s ? a.level: s)) {
                            d = 0;
                            for (b in a.fields) if (a.fields.hasOwnProperty(b)) {
                                g = {};
                                for (f in j.aggregates[d]) if (j.aggregates[d].hasOwnProperty(f)) switch (f) {
                                case "member":
                                case "label":
                                case "aggregator":
                                    break;
                                default:
                                    g[f] = j.aggregates[d][f]
                                }
                                t > 1 ? (g.name = b, g.label = j.aggregates[d].label || a.label) : (g.name = a.text, g.label = "_r_Totals" === a.text ? j.rowTotalsText: a.label),
                                c.push(g),
                                d++
                            }
                        }
                    }
                }
                var o, p, q, r, s, t, u, v, w = a.length,
                x = 0;
                if (j.rowTotals && j.yDimension.length > 0) {
                    var y = j.yDimension[0].dataName;
                    j.yDimension.splice(0, 0, {
                        dataName: y
                    }),
                    j.yDimension[0].converter = function() {
                        return "_r_Totals"
                    }
                }
                if (r = $.isArray(j.xDimension) ? j.xDimension.length: 0, s = j.yDimension.length, t = $.isArray(j.aggregates) ? j.aggregates.length: 0, 0 === r || 0 === t) throw "xDimension or aggregates optiona are not set!";
                var z;
                for (q = 0; r > q; q++) z = {
                    name: j.xDimension[q].dataName,
                    frozen: j.frozenStaticCols
                },
                null == j.xDimension[q].isGroupField && (j.xDimension[q].isGroupField = !0),
                z = $.extend(!0, z, j.xDimension[q]),
                c.push(z);
                for (var A = r - 1,
                B = {}; w > x;) {
                    o = a[x];
                    var C = [],
                    D = [];
                    u = {},
                    q = 0;
                    do C[q] = $.trim(o[j.xDimension[q].dataName]),
                    u[j.xDimension[q].dataName] = C[q],
                    q++;
                    while (r > q);
                    var E = 0;
                    if (p = -1, v = b(d, k, C)) {
                        if (p >= 0) {
                            if (E = 0, s >= 1) {
                                for (E = 0; s > E; E++) D[E] = $.trim(o[j.yDimension[E].dataName]),
                                j.yDimension[E].converter && $.isFunction(j.yDimension[E].converter) && (D[E] = j.yDimension[E].converter.call(this, D[E], C, D));
                                v = m(o, j.aggregates, D, v)
                            } else 0 === s && (v = m(o, j.aggregates, null, v));
                            d[p] = v
                        }
                    } else {
                        if (E = 0, s >= 1) {
                            for (E = 0; s > E; E++) D[E] = $.trim(o[j.yDimension[E].dataName]),
                            j.yDimension[E].converter && $.isFunction(j.yDimension[E].converter) && (D[E] = j.yDimension[E].converter.call(this, D[E], C, D));
                            u = m(o, j.aggregates, D, u)
                        } else 0 === s && (u = m(o, j.aggregates, null, u));
                        d.push(u)
                    }
                    var F, G = 0,
                    H = null,
                    I = null;
                    for (F in f) if (f.hasOwnProperty(F)) {
                        if (0 === G) B.children && void 0 !== B.children || (B = {
                            text: F,
                            level: 0,
                            children: [],
                            label: F
                        }),
                        H = B.children;
                        else {
                            for (I = null, q = 0; q < H.length; q++) if (H[q].text === F) {
                                I = H[q];
                                break
                            }
                            I ? H = I.children: (H.push({
                                children: [],
                                text: F,
                                level: G,
                                fields: f[F],
                                label: g[F]
                            }), H = H[H.length - 1].children)
                        }
                        G++
                    }
                    x++
                }
                var J = [],
                K = c.length,
                L = K;
                s > 0 && (i[s - 1] = {
                    useColSpanStyle: !1,
                    groupHeaders: []
                }),
                n(B);
                var M;
                if (j.colTotals) for (var N = d.length; N--;) for (q = r; q < c.length; q++) M = c[q].name,
                e[M] ? e[M] += parseFloat(d[N][M] || 0) : e[M] = parseFloat(d[N][M] || 0);
                if (A > 0) for (q = 0; A > q; q++) c[q].isGroupField && (h.groupingView.groupField.push(c[q].name), h.groupingView.groupSummary.push(j.groupSummary), h.groupingView.groupSummaryPos.push(j.groupSummaryPos));
                else h.grouping = !1;
                h.sortname = c[A].name,
                h.groupingView.hideFirstGroupCol = !0
            }),
            {
                colModel: c,
                rows: d,
                groupOptions: h,
                groupHeaders: i,
                summary: e
            }
        },
        jqPivot: function(a, b, c, d) {
            return this.each(function() {
                function e(a) {
                    var d, e = jQuery(f).jqGrid("pivotSetup", a, b),
                    g = $.assocArraySize(e.summary) > 0 ? !0 : !1,
                    h = $.jgrid.from.call(f, e.rows);
                    for (d = 0; d < e.groupOptions.groupingView.groupField.length; d++) h.orderBy(e.groupOptions.groupingView.groupField[d], "a", "text", "");
                    jQuery(f).jqGrid($.extend(!0, {
                        datastr: $.extend(h.select(), g ? {
                            userdata: e.summary
                        }: {}),
                        datatype: "jsonstring",
                        footerrow: g,
                        userDataOnFooter: g,
                        colModel: e.colModel,
                        viewrecords: !0,
                        sortname: b.xDimension[0].dataName
                    },
                    e.groupOptions, c || {}));
                    var i = e.groupHeaders;
                    if (i.length) for (d = 0; d < i.length; d++) i[d] && i[d].groupHeaders.length && jQuery(f).jqGrid("setGroupHeaders", i[d]);
                    b.frozenStaticCols && jQuery(f).jqGrid("setFrozenColumns")
                }
                var f = this;
                "string" == typeof a ? $.ajax($.extend({
                    url: a,
                    dataType: "json",
                    success: function(a) {
                        e($.jgrid.getAccessor(a, d && d.reader ? d.reader: "rows"))
                    }
                },
                d || {})) : e(a)
            })
        }
    }),
    $.jgrid.extend({
        setSubGrid: function() {
            return this.each(function() {
                var a, b, c = this,
                d = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].subgrid,
                e = {
                    plusicon: d.icon_plus,
                    minusicon: d.icon_minus,
                    openicon: d.icon_open,
                    expandOnLoad: !1,
                    delayOnLoad: 50,
                    selectOnExpand: !1,
                    selectOnCollapse: !1,
                    reloadOnExpand: !0
                };
                if (c.p.subGridOptions = $.extend(e, c.p.subGridOptions || {}), c.p.colNames.unshift(""), c.p.colModel.unshift({
                    name: "subgrid",
                    width: $.jgrid.cell_width ? c.p.subGridWidth + c.p.cellLayout: c.p.subGridWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    fixed: !0
                }), a = c.p.subGridModel, a[0]) for (a[0].align = $.extend([], a[0].align || []), b = 0; b < a[0].name.length; b++) a[0].align[b] = a[0].align[b] || "left"
            })
        },
        addSubGridCell: function(a, b) {
            var c, d, e, f = "";
            return this.each(function() {
                f = this.formatCol(a, b),
                d = this.p.id,
                c = this.p.subGridOptions.plusicon,
                e = $.jgrid.styleUI[this.p.styleUI || "jQueryUI"].common
            }),
            '<td role="gridcell" aria-describedby="' + d + '_subgrid" class="ui-sgcollapsed sgcollapsed" ' + f + "><a style='cursor:pointer;' class='ui-sghref'><span class='" + e.icon_base + " " + c + "'></span></a></td>"
        },
        addSubGrid: function(a, b) {
            return this.each(function() {
                var c = this;
                if (c.grid) {
                    var d, e, f, g, h, i = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].base,
                    j = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common,
                    k = function(a, b, d) {
                        var e = $("<td align='" + c.p.subGridModel[0].align[d] + "'></td>").html(b);
                        $(a).append(e)
                    },
                    l = function(a, b) {
                        var d, e, f, g = $("<table class='" + i.rowTable + " ui-common-table'><tbody></tbody></table>"),
                        h = $("<tr></tr>");
                        for (e = 0; e < c.p.subGridModel[0].name.length; e++) d = $("<th class='" + i.headerBox + " ui-th-subgrid ui-th-column ui-th-" + c.p.direction + "'></th>"),
                        $(d).html(c.p.subGridModel[0].name[e]),
                        $(d).width(c.p.subGridModel[0].width[e]),
                        $(h).append(d);
                        $(g).append(h),
                        a && (f = c.p.xmlReader.subgrid, $(f.root + " " + f.row, a).each(function() {
                            if (h = $("<tr class='" + j.content + " ui-subtblcell'></tr>"), f.repeatitems === !0) $(f.cell, this).each(function(a) {
                                k(h, $(this).text() || "&#160;", a)
                            });
                            else {
                                var a = c.p.subGridModel[0].mapping || c.p.subGridModel[0].name;
                                if (a) for (e = 0; e < a.length; e++) k(h, $(a[e], this).text() || "&#160;", e)
                            }
                            $(g).append(h)
                        }));
                        var l = $("table:first", c.grid.bDiv).attr("id") + "_";
                        return $("#" + $.jgrid.jqID(l + b)).append(g),
                        c.grid.hDiv.loading = !1,
                        $("#load_" + $.jgrid.jqID(c.p.id)).hide(),
                        !1
                    },
                    m = function(a, b) {
                        var d, e, f, g, h, l, m = $("<table class='" + i.rowTable + " ui-common-table'><tbody></tbody></table>"),
                        n = $("<tr></tr>");
                        for (f = 0; f < c.p.subGridModel[0].name.length; f++) d = $("<th class='" + i.headerBox + " ui-th-subgrid ui-th-column ui-th-" + c.p.direction + "'></th>"),
                        $(d).html(c.p.subGridModel[0].name[f]),
                        $(d).width(c.p.subGridModel[0].width[f]),
                        $(n).append(d);
                        if ($(m).append(n), a && (h = c.p.jsonReader.subgrid, e = $.jgrid.getAccessor(a, h.root), void 0 !== e)) for (f = 0; f < e.length; f++) {
                            if (g = e[f], n = $("<tr class='" + j.content + " ui-subtblcell'></tr>"), h.repeatitems === !0) for (h.cell && (g = g[h.cell]), l = 0; l < g.length; l++) k(n, g[l] || "&#160;", l);
                            else {
                                var o = c.p.subGridModel[0].mapping || c.p.subGridModel[0].name;
                                if (o.length) for (l = 0; l < o.length; l++) k(n, g[o[l]] || "&#160;", l)
                            }
                            $(m).append(n)
                        }
                        var p = $("table:first", c.grid.bDiv).attr("id") + "_";
                        return $("#" + $.jgrid.jqID(p + b)).append(m),
                        c.grid.hDiv.loading = !1,
                        $("#load_" + $.jgrid.jqID(c.p.id)).hide(),
                        !1
                    },
                    n = function(a) {
                        var b, d, e, f;
                        if (b = $(a).attr("id"), d = {
                            nd_: (new Date).getTime()
                        },
                        d[c.p.prmNames.subgridid] = b, !c.p.subGridModel[0]) return ! 1;
                        if (c.p.subGridModel[0].params) for (f = 0; f < c.p.subGridModel[0].params.length; f++) for (e = 0; e < c.p.colModel.length; e++) c.p.colModel[e].name === c.p.subGridModel[0].params[f] && (d[c.p.colModel[e].name] = $("td:eq(" + e + ")", a).text().replace(/\&#160\;/gi, ""));
                        if (!c.grid.hDiv.loading) switch (c.grid.hDiv.loading = !0, $("#load_" + $.jgrid.jqID(c.p.id)).show(), c.p.subgridtype || (c.p.subgridtype = c.p.datatype), $.isFunction(c.p.subgridtype) ? c.p.subgridtype.call(c, d) : c.p.subgridtype = c.p.subgridtype.toLowerCase(), c.p.subgridtype) {
                        case "xml":
                        case "json":
                            $.ajax($.extend({
                                type:
                                c.p.mtype,
                                url: $.isFunction(c.p.subGridUrl) ? c.p.subGridUrl.call(c, d) : c.p.subGridUrl,
                                dataType: c.p.subgridtype,
                                data: $.isFunction(c.p.serializeSubGridData) ? c.p.serializeSubGridData.call(c, d) : d,
                                complete: function(a) {
                                    "xml" === c.p.subgridtype ? l(a.responseXML, b) : m($.jgrid.parse(a.responseText), b),
                                    a = null
                                }
                            },
                            $.jgrid.ajaxOptions, c.p.ajaxSubgridOptions || {}))
                        }
                        return ! 1
                    },
                    o = 0;
                    $.each(c.p.colModel,
                    function() { (this.hidden === !0 || "rn" === this.name || "cb" === this.name) && o++
                    });
                    var p = c.rows.length,
                    q = 1;
                    for (void 0 !== b && b > 0 && (q = b, p = b + 1); p > q;) $(c.rows[q]).hasClass("jqgrow") && (c.p.scroll && $(c.rows[q].cells[a]).unbind("click"), $(c.rows[q].cells[a]).bind("click",
                    function() {
                        var b = $(this).parent("tr")[0];
                        if (e = c.p.id, d = b.id, h = $("#" + e + "_" + d + "_expandedContent"), $(this).hasClass("sgcollapsed")) {
                            if (g = $(c).triggerHandler("jqGridSubGridBeforeExpand", [e + "_" + d, d]), g = g === !1 || "stop" === g ? !1 : !0, g && $.isFunction(c.p.subGridBeforeExpand) && (g = c.p.subGridBeforeExpand.call(c, e + "_" + d, d)), g === !1) return ! 1;
                            c.p.subGridOptions.reloadOnExpand === !0 || c.p.subGridOptions.reloadOnExpand === !1 && !h.hasClass("ui-subgrid") ? (f = a >= 1 ? "<td colspan='" + a + "'>&#160;</td>": "", $(b).after("<tr role='row' id='" + e + "_" + d + "_expandedContent' class='ui-subgrid ui-sg-expanded'>" + f + "<td class='" + j.content + " subgrid-cell'><span class='" + j.icon_base + " " + c.p.subGridOptions.openicon + "'></span></td><td colspan='" + parseInt(c.p.colNames.length - 1 - o, 10) + "' class='" + j.content + " subgrid-data'><div id=" + e + "_" + d + " class='tablediv'></div></td></tr>"), $(c).triggerHandler("jqGridSubGridRowExpanded", [e + "_" + d, d]), $.isFunction(c.p.subGridRowExpanded) ? c.p.subGridRowExpanded.call(c, e + "_" + d, d) : n(b)) : h.show().removeClass("ui-sg-collapsed").addClass("ui-sg-expanded"),
                            $(this).html("<a style='cursor:pointer;' class='ui-sghref'><span class='" + j.icon_base + " " + c.p.subGridOptions.minusicon + "'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded"),
                            c.p.subGridOptions.selectOnExpand && $(c).jqGrid("setSelection", d)
                        } else if ($(this).hasClass("sgexpanded")) {
                            if (g = $(c).triggerHandler("jqGridSubGridRowColapsed", [e + "_" + d, d]), g = g === !1 || "stop" === g ? !1 : !0, g && $.isFunction(c.p.subGridRowColapsed) && (g = c.p.subGridRowColapsed.call(c, e + "_" + d, d)), g === !1) return ! 1;
                            c.p.subGridOptions.reloadOnExpand === !0 ? h.remove(".ui-subgrid") : h.hasClass("ui-subgrid") && h.hide().addClass("ui-sg-collapsed").removeClass("ui-sg-expanded"),
                            $(this).html("<a style='cursor:pointer;' class='ui-sghref'><span class='" + j.icon_base + " " + c.p.subGridOptions.plusicon + "'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed"),
                            c.p.subGridOptions.selectOnCollapse && $(c).jqGrid("setSelection", d)
                        }
                        return ! 1
                    })),
                    q++;
                    c.p.subGridOptions.expandOnLoad === !0 && $(c.rows).filter(".jqgrow").each(function(a, b) {
                        $(b.cells[0]).click()
                    }),
                    c.subGridXml = function(a, b) {
                        l(a, b)
                    },
                    c.subGridJson = function(a, b) {
                        m(a, b)
                    }
                }
            })
        },
        expandSubGridRow: function(a) {
            return this.each(function() {
                var b = this;
                if ((b.grid || a) && b.p.subGrid === !0) {
                    var c = $(this).jqGrid("getInd", a, !0);
                    if (c) {
                        var d = $("td.sgcollapsed", c)[0];
                        d && $(d).trigger("click")
                    }
                }
            })
        },
        collapseSubGridRow: function(a) {
            return this.each(function() {
                var b = this;
                if ((b.grid || a) && b.p.subGrid === !0) {
                    var c = $(this).jqGrid("getInd", a, !0);
                    if (c) {
                        var d = $("td.sgexpanded", c)[0];
                        d && $(d).trigger("click")
                    }
                }
            })
        },
        toggleSubGridRow: function(a) {
            return this.each(function() {
                var b = this;
                if ((b.grid || a) && b.p.subGrid === !0) {
                    var c = $(this).jqGrid("getInd", a, !0);
                    if (c) {
                        var d = $("td.sgcollapsed", c)[0];
                        d ? $(d).trigger("click") : (d = $("td.sgexpanded", c)[0], d && $(d).trigger("click"))
                    }
                }
            })
        }
    }),
    $.jgrid.extend({
        setTreeNode: function(a, b) {
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) for (var d, e, f, g, h, i, j, k, l = c.p.expColInd,
                m = c.p.treeReader.expanded_field,
                n = c.p.treeReader.leaf_field,
                o = c.p.treeReader.level_field,
                p = c.p.treeReader.icon_field,
                q = c.p.treeReader.loaded,
                r = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common; b > a;) {
                    var s, t = $.jgrid.stripPref(c.p.idPrefix, c.rows[a].id),
                    u = c.p._index[t];
                    j = c.p.data[u],
                    "nested" === c.p.treeGridModel && (j[n] || (d = parseInt(j[c.p.treeReader.left_field], 10), e = parseInt(j[c.p.treeReader.right_field], 10), j[n] = e === d + 1 ? "true": "false", c.rows[a].cells[c.p._treeleafpos].innerHTML = j[n])),
                    f = parseInt(j[o], 10),
                    0 === c.p.tree_root_level ? (g = f + 1, h = f) : (g = f, h = f - 1),
                    i = "<div class='tree-wrap tree-wrap-" + c.p.direction + "' style='width:" + 18 * g + "px;'>",
                    i += "<div style='" + ("rtl" === c.p.direction ? "right:": "left:") + 18 * h + "px;' class='" + r.icon_base + " ",
                    void 0 !== j[q] && (j[q] = "true" === j[q] || j[q] === !0 ? !0 : !1),
                    "true" === j[n] || j[n] === !0 ? (i += (void 0 !== j[p] && "" !== j[p] ? j[p] : c.p.treeIcons.leaf) + " tree-leaf treeclick", j[n] = !0, k = "leaf") : (j[n] = !1, k = ""),
                    j[m] = ("true" === j[m] || j[m] === !0 ? !0 : !1) && (j[q] || void 0 === j[q]),
                    i += j[m] === !1 ? j[n] === !0 ? "'": c.p.treeIcons.plus + " tree-plus treeclick'": j[n] === !0 ? "'": c.p.treeIcons.minus + " tree-minus treeclick'",
                    i += "></div></div>",
                    $(c.rows[a].cells[l]).wrapInner("<span class='cell-wrapper" + k + "'></span>").prepend(i),
                    f !== parseInt(c.p.tree_root_level, 10) && (s = $(c).jqGrid("isVisibleNode", j), s || $(c.rows[a]).css("display", "none")),
                    $(c.rows[a].cells[l]).find("div.treeclick").bind("click",
                    function(a) {
                        var b = a.target || a.srcElement,
                        d = $.jgrid.stripPref(c.p.idPrefix, $(b, c.rows).closest("tr.jqgrow")[0].id),
                        e = c.p._index[d];
                        return c.p.data[e][n] || (c.p.data[e][m] ? ($(c).jqGrid("collapseRow", c.p.data[e]), $(c).jqGrid("collapseNode", c.p.data[e])) : ($(c).jqGrid("expandRow", c.p.data[e]), $(c).jqGrid("expandNode", c.p.data[e]))),
                        !1
                    }),
                    c.p.ExpandColClick === !0 && $(c.rows[a].cells[l]).find("span.cell-wrapper").css("cursor", "pointer").bind("click",
                    function(a) {
                        var b = a.target || a.srcElement,
                        d = $.jgrid.stripPref(c.p.idPrefix, $(b, c.rows).closest("tr.jqgrow")[0].id),
                        e = c.p._index[d];
                        return c.p.data[e][n] || (c.p.data[e][m] ? ($(c).jqGrid("collapseRow", c.p.data[e]), $(c).jqGrid("collapseNode", c.p.data[e])) : ($(c).jqGrid("expandRow", c.p.data[e]), $(c).jqGrid("expandNode", c.p.data[e]))),
                        $(c).jqGrid("setSelection", d),
                        !1
                    }),
                    a++
                }
            })
        },
        setTreeGrid: function() {
            return this.each(function() {
                var a, b, c, d, e = this,
                f = 0,
                g = !1,
                h = [],
                i = $.jgrid.styleUI[e.p.styleUI || "jQueryUI"].treegrid;
                if (e.p.treeGrid) {
                    e.p.treedatatype || $.extend(e.p, {
                        treedatatype: e.p.datatype
                    }),
                    e.p.loadonce && (e.p.treedatatype = "local"),
                    e.p.subGrid = !1,
                    e.p.altRows = !1,
                    e.p.pgbuttons = !1,
                    e.p.pginput = !1,
                    e.p.gridview = !0,
                    null === e.p.rowTotal && (e.p.rowNum = 1e4),
                    e.p.multiselect = !1,
                    e.p.rowList = [],
                    e.p.expColInd = 0,
                    a = i.icon_plus,
                    "jQueryUI" === e.p.styleUI && (a += "rtl" === e.p.direction ? "w": "e"),
                    e.p.treeIcons = $.extend({
                        plus: a,
                        minus: i.icon_minus,
                        leaf: i.icon_leaf
                    },
                    e.p.treeIcons || {}),
                    "nested" === e.p.treeGridModel ? e.p.treeReader = $.extend({
                        level_field: "level",
                        left_field: "lft",
                        right_field: "rgt",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded",
                        loaded: "loaded",
                        icon_field: "icon"
                    },
                    e.p.treeReader) : "adjacency" === e.p.treeGridModel && (e.p.treeReader = $.extend({
                        level_field: "level",
                        parent_id_field: "parent",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded",
                        loaded: "loaded",
                        icon_field: "icon"
                    },
                    e.p.treeReader));
                    for (c in e.p.colModel) if (e.p.colModel.hasOwnProperty(c)) {
                        b = e.p.colModel[c].name,
                        b !== e.p.ExpandColumn || g || (g = !0, e.p.expColInd = f),
                        f++;
                        for (d in e.p.treeReader) e.p.treeReader.hasOwnProperty(d) && e.p.treeReader[d] === b && h.push(b)
                    }
                    $.each(e.p.treeReader,
                    function(a, b) {
                        b && -1 === $.inArray(b, h) && ("leaf_field" === a && (e.p._treeleafpos = f), f++, e.p.colNames.push(b), e.p.colModel.push({
                            name: b,
                            width: 1,
                            hidden: !0,
                            sortable: !1,
                            resizable: !1,
                            hidedlg: !0,
                            editable: !0,
                            search: !1
                        }))
                    })
                }
            })
        },
        expandRow: function(a) {
            this.each(function() {
                var b = this;
                if (b.grid && b.p.treeGrid) {
                    var c = $(b).jqGrid("getNodeChildren", a),
                    d = b.p.treeReader.expanded_field,
                    e = a[b.p.localReader.id],
                    f = $.isFunction(b.p.beforeExpandTreeGridRow) ? b.p.beforeExpandTreeGridRow.call(b, e, a, c) : !0;
                    f !== !1 && ($(c).each(function() {
                        var a = b.p.idPrefix + $.jgrid.getAccessor(this, b.p.localReader.id);
                        $($(b).jqGrid("getGridRowById", a)).css("display", ""),
                        this[d] && $(b).jqGrid("expandRow", this)
                    }), $.isFunction(b.p.afterExpandTreeGridRow) && b.p.afterExpandTreeGridRow.call(b, e, a, c))
                }
            })
        },
        collapseRow: function(a) {
            this.each(function() {
                var b = this;
                if (b.grid && b.p.treeGrid) {
                    var c = $(b).jqGrid("getNodeChildren", a),
                    d = b.p.treeReader.expanded_field,
                    e = a[b.p.localReader.id],
                    f = $.isFunction(b.p.beforeCollapseTreeGridRow) ? b.p.beforeCollapseTreeGridRow.call(b, e, a, c) : !0;
                    f !== !1 && ($(c).each(function() {
                        var a = b.p.idPrefix + $.jgrid.getAccessor(this, b.p.localReader.id);
                        $($(b).jqGrid("getGridRowById", a)).css("display", "none"),
                        this[d] && $(b).jqGrid("collapseRow", this)
                    }), $.isFunction(b.p.afterCollapseTreeGridRow) && b.p.afterCollapseTreeGridRow.call(b, e, a, c))
                }
            })
        },
        getRootNodes: function(a) {
            var b = [];
            return this.each(function() {
                var c, d, e, f = this;
                if (f.grid && f.p.treeGrid) switch ("boolean" != typeof a && (a = !1), e = a ? $(f).jqGrid("getRowData", null, !0) : f.p.data, f.p.treeGridModel) {
                case "nested":
                    c = f.p.treeReader.level_field,
                    $(e).each(function() {
                        parseInt(this[c], 10) === parseInt(f.p.tree_root_level, 10) && b.push(a ? f.p.data[f.p._index[this[f.p.keyName]]] : this)
                    });
                    break;
                case "adjacency":
                    d = f.p.treeReader.parent_id_field,
                    $(e).each(function() { (null === this[d] || "null" === String(this[d]).toLowerCase()) && b.push(a ? f.p.data[f.p._index[this[f.p.keyName]]] : this)
                    })
                }
            }),
            b
        },
        getNodeDepth: function(a) {
            var b = null;
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var c = this;
                    switch (c.p.treeGridModel) {
                    case "nested":
                        var d = c.p.treeReader.level_field;
                        b = parseInt(a[d], 10) - parseInt(c.p.tree_root_level, 10);
                        break;
                    case "adjacency":
                        b = $(c).jqGrid("getNodeAncestors", a).length
                    }
                }
            }),
            b
        },
        getNodeParent: function(a) {
            var b = null;
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) switch (c.p.treeGridModel) {
                case "nested":
                    var d = c.p.treeReader.left_field,
                    e = c.p.treeReader.right_field,
                    f = c.p.treeReader.level_field,
                    g = parseInt(a[d], 10),
                    h = parseInt(a[e], 10),
                    i = parseInt(a[f], 10);
                    $(this.p.data).each(function() {
                        return parseInt(this[f], 10) === i - 1 && parseInt(this[d], 10) < g && parseInt(this[e], 10) > h ? (b = this, !1) : void 0
                    });
                    break;
                case "adjacency":
                    for (var j = c.p.treeReader.parent_id_field,
                    k = c.p.localReader.id,
                    l = a[k], m = c.p._index[l]; m--;) if (c.p.data[m][k] === $.jgrid.stripPref(c.p.idPrefix, a[j])) {
                        b = c.p.data[m];
                        break
                    }
                }
            }),
            b
        },
        getNodeChildren: function(a) {
            var b = [];
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) switch (c.p.treeGridModel) {
                case "nested":
                    var d = c.p.treeReader.left_field,
                    e = c.p.treeReader.right_field,
                    f = c.p.treeReader.level_field,
                    g = parseInt(a[d], 10),
                    h = parseInt(a[e], 10),
                    i = parseInt(a[f], 10);
                    $(this.p.data).each(function() {
                        parseInt(this[f], 10) === i + 1 && parseInt(this[d], 10) > g && parseInt(this[e], 10) < h && b.push(this)
                    });
                    break;
                case "adjacency":
                    var j = c.p.treeReader.parent_id_field,
                    k = c.p.localReader.id;
                    $(this.p.data).each(function() {
                        this[j] == $.jgrid.stripPref(c.p.idPrefix, a[k]) && b.push(this)
                    })
                }
            }),
            b
        },
        getFullTreeNode: function(a, b) {
            var c = [];
            return this.each(function() {
                var d, e = this,
                f = e.p.treeReader.expanded_field;
                if (e.grid && e.p.treeGrid) switch ((null == b || "boolean" != typeof b) && (b = !1), e.p.treeGridModel) {
                case "nested":
                    var g = e.p.treeReader.left_field,
                    h = e.p.treeReader.right_field,
                    i = e.p.treeReader.level_field,
                    j = parseInt(a[g], 10),
                    k = parseInt(a[h], 10),
                    l = parseInt(a[i], 10);
                    $(this.p.data).each(function() {
                        parseInt(this[i], 10) >= l && parseInt(this[g], 10) >= j && parseInt(this[g], 10) <= k && (b && (this[f] = !0), c.push(this))
                    });
                    break;
                case "adjacency":
                    if (a) {
                        c.push(a);
                        var m = e.p.treeReader.parent_id_field,
                        n = e.p.localReader.id;
                        $(this.p.data).each(function(a) {
                            for (d = c.length, a = 0; d > a; a++) if ($.jgrid.stripPref(e.p.idPrefix, c[a][n]) === this[m]) {
                                b && (this[f] = !0),
                                c.push(this);
                                break
                            }
                        })
                    }
                }
            }),
            c
        },
        getNodeAncestors: function(a) {
            var b = [];
            return this.each(function() {
                if (this.grid && this.p.treeGrid) for (var c = $(this).jqGrid("getNodeParent", a); c;) b.push(c),
                c = $(this).jqGrid("getNodeParent", c)
            }),
            b
        },
        isVisibleNode: function(a) {
            var b = !0;
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d = $(c).jqGrid("getNodeAncestors", a),
                    e = c.p.treeReader.expanded_field;
                    $(d).each(function() {
                        return b = b && this[e],
                        b ? void 0 : !1
                    })
                }
            }),
            b
        },
        isNodeLoaded: function(a) {
            var b;
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d = c.p.treeReader.leaf_field,
                    e = c.p.treeReader.loaded;
                    b = void 0 !== a ? void 0 !== a[e] ? a[e] : a[d] || $(c).jqGrid("getNodeChildren", a).length > 0 ? !0 : !1 : !1
                }
            }),
            b
        },
        reloadNode: function(a) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var b = this.p.localReader.id,
                    c = this.p.selrow;
                    $(this).jqGrid("delChildren", a[b]);
                    var d = this.p.treeReader.expanded_field,
                    e = this.p.treeReader.parent_id_field,
                    f = this.p.treeReader.loaded,
                    g = this.p.treeReader.level_field,
                    h = this.p.treeReader.left_field,
                    i = this.p.treeReader.right_field,
                    j = $.jgrid.getAccessor(a, this.p.localReader.id),
                    k = $("#" + j, this.grid.bDiv)[0];
                    a[d] = !0,
                    $("div.treeclick", k).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"),
                    this.p.treeANode = k.rowIndex,
                    this.p.datatype = this.p.treedatatype,
                    "nested" === this.p.treeGridModel ? $(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: j,
                            n_left: a[h],
                            n_right: a[i],
                            n_level: a[g]
                        }
                    }) : $(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: j,
                            parentid: a[e],
                            n_level: a[g]
                        }
                    }),
                    $(this).trigger("reloadGrid"),
                    a[f] = !0,
                    "nested" === this.p.treeGridModel ? $(this).jqGrid("setGridParam", {
                        selrow: c,
                        postData: {
                            nodeid: "",
                            n_left: "",
                            n_right: "",
                            n_level: ""
                        }
                    }) : $(this).jqGrid("setGridParam", {
                        selrow: c,
                        postData: {
                            nodeid: "",
                            parentid: "",
                            n_level: ""
                        }
                    })
                }
            })
        },
        expandNode: function(a) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var b = this.p.treeReader.expanded_field,
                    c = this.p.treeReader.parent_id_field,
                    d = this.p.treeReader.loaded,
                    e = this.p.treeReader.level_field,
                    f = this.p.treeReader.left_field,
                    g = this.p.treeReader.right_field;
                    if (!a[b]) {
                        var h = $.jgrid.getAccessor(a, this.p.localReader.id),
                        i = $("#" + this.p.idPrefix + $.jgrid.jqID(h), this.grid.bDiv)[0],
                        j = this.p._index[h],
                        k = $.isFunction(this.p.beforeExpandTreeGridNode) ? this.p.beforeExpandTreeGridNode.call(this, h, a) : !0;
                        if (k === !1) return;
                        $(this).jqGrid("isNodeLoaded", this.p.data[j]) ? (a[b] = !0, $("div.treeclick", i).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")) : this.grid.hDiv.loading || (a[b] = !0, $("div.treeclick", i).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"), this.p.treeANode = i.rowIndex, this.p.datatype = this.p.treedatatype, "nested" === this.p.treeGridModel ? $(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: h,
                                n_left: a[f],
                                n_right: a[g],
                                n_level: a[e]
                            }
                        }) : $(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: h,
                                parentid: a[c],
                                n_level: a[e]
                            }
                        }), $(this).trigger("reloadGrid"), a[d] = !0, "nested" === this.p.treeGridModel ? $(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: "",
                                n_left: "",
                                n_right: "",
                                n_level: ""
                            }
                        }) : $(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: "",
                                parentid: "",
                                n_level: ""
                            }
                        })),
                        $.isFunction(this.p.afterExpandTreeGridNode) && this.p.afterExpandTreeGridNode.call(this, h, a)
                    }
                }
            })
        },
        collapseNode: function(a) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var b = this.p.treeReader.expanded_field;
                    if (a[b]) {
                        var c = $.jgrid.getAccessor(a, this.p.localReader.id),
                        d = $.isFunction(this.p.beforeCollapseTreeGridNode) ? this.p.beforeCollapseTreeGridNode.call(this, c, a) : !0,
                        e = $("#" + this.p.idPrefix + $.jgrid.jqID(c), this.grid.bDiv)[0];
                        if (a[b] = !1, d === !1) return;
                        $("div.treeclick", e).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus"),
                        $.isFunction(this.p.afterCollapseTreeGridNode) && this.p.afterCollapseTreeGridNode.call(this, c, a)
                    }
                }
            })
        },
        SortTree: function(a, b, c, d) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var e, f, g, h, i, j = [],
                    k = this,
                    l = $(this).jqGrid("getRootNodes", k.p.search);
                    for (h = $.jgrid.from.call(this, l), h.orderBy(a, b, c, d), i = h.select(), e = 0, f = i.length; f > e; e++) g = i[e],
                    j.push(g),
                    $(this).jqGrid("collectChildrenSortTree", j, g, a, b, c, d);
                    $.each(j,
                    function(a) {
                        var b = $.jgrid.getAccessor(this, k.p.localReader.id);
                        $("#" + $.jgrid.jqID(k.p.id) + " tbody tr:eq(" + a + ")").after($("tr#" + $.jgrid.jqID(b), k.grid.bDiv))
                    }),
                    h = null,
                    i = null,
                    j = null
                }
            })
        },
        searchTree: function(a) {
            var b, c, d, e = a.length || 0,
            f = [],
            g = [],
            h = [];
            return this.each(function() {
                if (this.grid && this.p.treeGrid && e) for (c = this.p.localReader.id, b = 0; e > b; b++) f = $(this).jqGrid("getNodeAncestors", a[b]),
                f.length || f.push(a[b]),
                d = f[f.length - 1][c],
                -1 === $.inArray(d, g) && (g.push(d), f = $(this).jqGrid("getFullTreeNode", f[f.length - 1], !0), h = h.concat(f))
            }),
            h
        },
        collectChildrenSortTree: function(a, b, c, d, e, f) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var g, h, i, j, k, l;
                    for (j = $(this).jqGrid("getNodeChildren", b), k = $.jgrid.from.call(this, j), k.orderBy(c, d, e, f), l = k.select(), g = 0, h = l.length; h > g; g++) i = l[g],
                    a.push(i),
                    $(this).jqGrid("collectChildrenSortTree", a, i, c, d, e, f)
                }
            })
        },
        setTreeRow: function(a, b) {
            var c = !1;
            return this.each(function() {
                var d = this;
                d.grid && d.p.treeGrid && (c = $(d).jqGrid("setRowData", a, b))
            }),
            c
        },
        delTreeNode: function(a) {
            return this.each(function() {
                var b, c, d, e, f, g = this,
                h = g.p.localReader.id,
                i = g.p.treeReader.left_field,
                j = g.p.treeReader.right_field;
                if (g.grid && g.p.treeGrid) {
                    var k = g.p._index[a];
                    if (void 0 !== k) {
                        c = parseInt(g.p.data[k][j], 10),
                        d = c - parseInt(g.p.data[k][i], 10) + 1;
                        var l = $(g).jqGrid("getFullTreeNode", g.p.data[k]);
                        if (l.length > 0) for (b = 0; b < l.length; b++) $(g).jqGrid("delRowData", l[b][h]);
                        if ("nested" === g.p.treeGridModel) {
                            if (e = $.jgrid.from.call(g, g.p.data).greater(i, c, {
                                stype: "integer"
                            }).select(), e.length) for (f in e) e.hasOwnProperty(f) && (e[f][i] = parseInt(e[f][i], 10) - d);
                            if (e = $.jgrid.from.call(g, g.p.data).greater(j, c, {
                                stype: "integer"
                            }).select(), e.length) for (f in e) e.hasOwnProperty(f) && (e[f][j] = parseInt(e[f][j], 10) - d)
                        }
                    }
                }
            })
        },
        delChildren: function(a) {
            return this.each(function() {
                var b, c, d, e, f = this,
                g = f.p.localReader.id,
                h = f.p.treeReader.left_field,
                i = f.p.treeReader.right_field;
                if (f.grid && f.p.treeGrid) {
                    var j = f.p._index[a];
                    if (void 0 !== j) {
                        b = parseInt(f.p.data[j][i], 10),
                        c = b - parseInt(f.p.data[j][h], 10) + 1;
                        var k = $(f).jqGrid("getFullTreeNode", f.p.data[j]);
                        if (k.length > 0) for (var l = 0; l < k.length; l++) k[l][g] !== a && $(f).jqGrid("delRowData", k[l][g]);
                        if ("nested" === f.p.treeGridModel) {
                            if (d = $.jgrid.from(f.p.data).greater(h, b, {
                                stype: "integer"
                            }).select(), d.length) for (e in d) d.hasOwnProperty(e) && (d[e][h] = parseInt(d[e][h], 10) - c);
                            if (d = $.jgrid.from(f.p.data).greater(i, b, {
                                stype: "integer"
                            }).select(), d.length) for (e in d) d.hasOwnProperty(e) && (d[e][i] = parseInt(d[e][i], 10) - c)
                        }
                    }
                }
            })
        },
        addChildNode: function(a, b, c, d) {
            var e = this[0];
            if (c) {
                var f, g, h, i, j, k, l, m, n = e.p.treeReader.expanded_field,
                o = e.p.treeReader.leaf_field,
                p = e.p.treeReader.level_field,
                q = e.p.treeReader.parent_id_field,
                r = e.p.treeReader.left_field,
                s = e.p.treeReader.right_field,
                t = e.p.treeReader.loaded,
                u = 0,
                v = b;
                if (void 0 === d && (d = !1), null == a) {
                    if (j = e.p.data.length - 1, j >= 0) for (; j >= 0;) u = Math.max(u, parseInt(e.p.data[j][e.p.localReader.id], 10)),
                    j--;
                    a = u + 1
                }
                var w = $(e).jqGrid("getInd", b);
                if (l = !1, void 0 === b || null === b || "" === b) b = null,
                v = null,
                f = "last",
                i = e.p.tree_root_level,
                j = e.p.data.length + 1;
                else {
                    f = "after",
                    g = e.p._index[b],
                    h = e.p.data[g],
                    b = h[e.p.localReader.id],
                    i = parseInt(h[p], 10) + 1;
                    var x = $(e).jqGrid("getFullTreeNode", h);
                    x.length ? (j = x[x.length - 1][e.p.localReader.id], v = j, j = $(e).jqGrid("getInd", v) + 1) : j = $(e).jqGrid("getInd", b) + 1,
                    h[o] && (l = !0, h[n] = !0, $(e.rows[w]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(e.p.treeIcons.leaf + " tree-leaf").addClass(e.p.treeIcons.minus + " tree-minus"), e.p.data[g][o] = !1, h[t] = !0)
                }
                if (k = j + 1, void 0 === c[n] && (c[n] = !1), void 0 === c[t] && (c[t] = !1), c[p] = i, void 0 === c[o] && (c[o] = !0), "adjacency" === e.p.treeGridModel && (c[q] = b), "nested" === e.p.treeGridModel) {
                    var y, z, A;
                    if (null !== b) {
                        if (m = parseInt(h[s], 10), y = $.jgrid.from.call(e, e.p.data), y = y.greaterOrEquals(s, m, {
                            stype: "integer"
                        }), z = y.select(), z.length) for (A in z) z.hasOwnProperty(A) && (z[A][r] = z[A][r] > m ? parseInt(z[A][r], 10) + 2 : z[A][r], z[A][s] = z[A][s] >= m ? parseInt(z[A][s], 10) + 2 : z[A][s]);
                        c[r] = m,
                        c[s] = m + 1
                    } else {
                        if (m = parseInt($(e).jqGrid("getCol", s, !1, "max"), 10), z = $.jgrid.from.call(e, e.p.data).greater(r, m, {
                            stype: "integer"
                        }).select(), z.length) for (A in z) z.hasOwnProperty(A) && (z[A][r] = parseInt(z[A][r], 10) + 2);
                        if (z = $.jgrid.from.call(e, e.p.data).greater(s, m, {
                            stype: "integer"
                        }).select(), z.length) for (A in z) z.hasOwnProperty(A) && (z[A][s] = parseInt(z[A][s], 10) + 2);
                        c[r] = m + 1,
                        c[s] = m + 2
                    }
                } (null === b || $(e).jqGrid("isNodeLoaded", h) || l) && ($(e).jqGrid("addRowData", a, c, f, v), $(e).jqGrid("setTreeNode", j, k)),
                h && !h[n] && d && $(e.rows[w]).find("div.treeclick").click()
            }
        }
    }),
    $.fn.jqDrag = function(a) {
        return i(this, a, "d")
    },
    $.fn.jqResize = function(a, b) {
        return i(this, a, "r", b)
    },
    $.jqDnR = {
        dnr: {},
        e: 0,
        drag: function(a) {
            return "d" == M.k ? E.css({
                left: M.X + a.pageX - M.pX,
                top: M.Y + a.pageY - M.pY
            }) : (E.css({
                width: Math.max(a.pageX - M.pX + M.W, 0),
                height: Math.max(a.pageY - M.pY + M.H, 0)
            }), M1 && E1.css({
                width: Math.max(a.pageX - M1.pX + M1.W, 0),
                height: Math.max(a.pageY - M1.pY + M1.H, 0)
            })),
            !1
        },
        stop: function() {
            $(document).unbind("mousemove", J.drag).unbind("mouseup", J.stop)
        }
    };
    var J = $.jqDnR,
    M = J.dnr,
    E = J.e,
    E1, M1, i = function(a, b, c, d) {
        return a.each(function() {
            b = b ? $(b, a) : a,
            b.bind("mousedown", {
                e: a,
                k: c
            },
            function(a) {
                var b = a.data,
                c = {};
                if (E = b.e, E1 = d ? $(d) : !1, "relative" != E.css("position")) try {
                    E.position(c)
                } catch(e) {}
                if (M = {
                    X: c.left || f("left") || 0,
                    Y: c.top || f("top") || 0,
                    W: f("width") || E[0].scrollWidth || 0,
                    H: f("height") || E[0].scrollHeight || 0,
                    pX: a.pageX,
                    pY: a.pageY,
                    k: b.k
                },
                M1 = E1 && "d" != b.k ? {
                    X: c.left || f1("left") || 0,
                    Y: c.top || f1("top") || 0,
                    W: E1[0].offsetWidth || f1("width") || 0,
                    H: E1[0].offsetHeight || f1("height") || 0,
                    pX: a.pageX,
                    pY: a.pageY,
                    k: b.k
                }: !1, $("input.hasDatepicker", E[0])[0]) try {
                    $("input.hasDatepicker", E[0]).datepicker("hide")
                } catch(g) {}
                return $(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop),
                !1
            })
        })
    },
    f = function(a) {
        return parseInt(E.css(a), 10) || !1
    },
    f1 = function(a) {
        return parseInt(E1.css(a), 10) || !1
    };
    $.fn.jqm = function(a) {
        var b = {
            overlay: 50,
            closeoverlay: !0,
            overlayClass: "jqmOverlay",
            closeClass: "jqmClose",
            trigger: ".jqModal",
            ajax: F,
            ajaxText: "",
            target: F,
            modal: F,
            toTop: F,
            onShow: F,
            onHide: F,
            onLoad: F
        };
        return this.each(function() {
            return this._jqm ? H[this._jqm].c = $.extend({},
            H[this._jqm].c, a) : (s++, this._jqm = s, H[s] = {
                c: $.extend(b, $.jqm.params, a),
                a: F,
                w: $(this).addClass("jqmID" + s),
                s: s
            },
            void(b.trigger && $(this).jqmAddTrigger(b.trigger)))
        })
    },
    $.fn.jqmAddClose = function(a) {
        return hs(this, a, "jqmHide")
    },
    $.fn.jqmAddTrigger = function(a) {
        return hs(this, a, "jqmShow")
    },
    $.fn.jqmShow = function(a) {
        return this.each(function() {
            $.jqm.open(this._jqm, a)
        })
    },
    $.fn.jqmHide = function(a) {
        return this.each(function() {
            $.jqm.close(this._jqm, a)
        })
    },
    $.jqm = {
        hash: {},
        open: function(a, b) {
            var c = H[a],
            d = c.c,
            f = "." + d.closeClass,
            g = parseInt(c.w.css("z-index"));
            g = g > 0 ? g: 3e3;
            var h = $("<div></div>").css({
                height: "100%",
                width: "100%",
                position: "fixed",
                left: 0,
                top: 0,
                "z-index": g - 1,
                opacity: d.overlay / 100
            });
            if (c.a) return F;
            if (c.t = b, c.a = !0, c.w.css("z-index", g), d.modal ? (A[0] || setTimeout(function() {
                new L("bind")
            },
            1), A.push(a)) : d.overlay > 0 ? d.closeoverlay && c.w.jqmAddClose(h) : h = F, c.o = h ? h.addClass(d.overlayClass).prependTo("body") : F, d.ajax) {
                var i = d.target || c.w,
                j = d.ajax;
                i = "string" == typeof i ? $(i, c.w) : $(i),
                j = "@" === j.substr(0, 1) ? $(b).attr(j.substring(1)) : j,
                i.html(d.ajaxText).load(j,
                function() {
                    d.onLoad && d.onLoad.call(this, c),
                    f && c.w.jqmAddClose($(f, c.w)),
                    e(c)
                })
            } else f && c.w.jqmAddClose($(f, c.w));
            return d.toTop && c.o && c.w.before('<span id="jqmP' + c.w[0]._jqm + '"></span>').insertAfter(c.o),
            d.onShow ? d.onShow(c) : c.w.show(),
            e(c),
            F
        },
        close: function(a) {
            var b = H[a];
            return b.a ? (b.a = F, A[0] && (A.pop(), A[0] || new L("unbind")), b.c.toTop && b.o && $("#jqmP" + b.w[0]._jqm).after(b.w).remove(), b.c.onHide ? b.c.onHide(b) : (b.w.hide(), b.o && b.o.remove()), F) : F
        },
        params: {}
    };
    var s = 0,
    H = $.jqm.hash,
    A = [],
    F = !1,
    e = function(a) {
        void 0 === a.c.focusField && (a.c.focusField = 0),
        a.c.focusField >= 0 && f(a)
    },
    f = function(a) {
        try {
            $(":input:visible", a.w)[parseInt(a.c.focusField, 10)].focus()
        } catch(b) {}
    },
    L = function(a) {
        $(document)[a]("keypress", m)[a]("keydown", m)[a]("mousedown", m)
    },
    m = function(a) {
        var b = H[A[A.length - 1]],
        c = !$(a.target).parents(".jqmID" + b.s)[0];
        return c && ($(".jqmID" + b.s).each(function() {
            var b = $(this),
            d = b.offset();
            return d.top <= a.pageY && a.pageY <= d.top + b.height() && d.left <= a.pageX && a.pageX <= d.left + b.width() ? (c = !1, !1) : void 0
        }), f(b)),
        !c
    },
    hs = function(a, b, c) {
        return a.each(function() {
            var a = this._jqm;
            $(b).each(function() {
                this[c] || (this[c] = [], $(this).click(function() {
                    for (var a in {
                        jqmShow: 1,
                        jqmHide: 1
                    }) for (var b in this[a]) H[this[a][b]] && H[this[a][b]].w[a](this);
                    return F
                })),
                this[c].push(a)
            })
        })
    };
    $.fmatter = {},
    $.extend($.fmatter, {
        isBoolean: function(a) {
            return "boolean" == typeof a
        },
        isObject: function(a) {
            return a && ("object" == typeof a || $.isFunction(a)) || !1
        },
        isString: function(a) {
            return "string" == typeof a
        },
        isNumber: function(a) {
            return "number" == typeof a && isFinite(a)
        },
        isValue: function(a) {
            return this.isObject(a) || this.isString(a) || this.isNumber(a) || this.isBoolean(a)
        },
        isEmpty: function(a) {
            return ! this.isString(a) && this.isValue(a) ? !1 : this.isValue(a) ? (a = $.trim(a).replace(/\&nbsp\;/gi, "").replace(/\&#160\;/gi, ""), "" === a) : !0
        }
    }),
    $.fn.fmatter = function(a, b, c, d, e) {
        var f = b;
        c = $.extend({},
        $.jgrid.getRegional(this, "formatter"), c);
        try {
            f = $.fn.fmatter[a].call(this, b, c, d, e)
        } catch(g) {}
        return f
    },
    $.fmatter.util = {
        NumberFormat: function(a, b) {
            if ($.fmatter.isNumber(a) || (a *= 1), $.fmatter.isNumber(a)) {
                var c, d = 0 > a,
                e = String(a),
                f = b.decimalSeparator || ".";
                if ($.fmatter.isNumber(b.decimalPlaces)) {
                    var g = b.decimalPlaces,
                    h = Math.pow(10, g);
                    if (e = String(Math.round(a * h) / h), c = e.lastIndexOf("."), g > 0) for (0 > c ? (e += f, c = e.length - 1) : "." !== f && (e = e.replace(".", f)); e.length - 1 - c < g;) e += "0"
                }
                if (b.thousandsSeparator) {
                    var i = b.thousandsSeparator;
                    c = e.lastIndexOf(f),
                    c = c > -1 ? c: e.length;
                    var j, k = e.substring(c),
                    l = -1;
                    for (j = c; j > 0; j--) l++,
                    l % 3 === 0 && j !== c && (!d || j > 1) && (k = i + k),
                    k = e.charAt(j - 1) + k;
                    e = k
                }
                return e = b.prefix ? b.prefix + e: e,
                e = b.suffix ? e + b.suffix: e
            }
            return a
        }
    },
    $.fn.fmatter.defaultFormat = function(a, b) {
        return $.fmatter.isValue(a) && "" !== a ? a: b.defaultValue || "&#160;"
    },
    $.fn.fmatter.email = function(a, b) {
        return $.fmatter.isEmpty(a) ? $.fn.fmatter.defaultFormat(a, b) : '<a href="mailto:' + a + '">' + a + "</a>"
    },
    $.fn.fmatter.checkbox = function(a, b) {
        var c, d = $.extend({},
        b.checkbox);
        void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = $.extend({},
        d, b.colModel.formatoptions)),
        c = d.disabled === !0 ? 'disabled="disabled"': "",
        ($.fmatter.isEmpty(a) || void 0 === a) && (a = $.fn.fmatter.defaultFormat(a, d)),
        a = String(a),
        a = (a + "").toLowerCase();
        var e = a.search(/(false|f|0|no|n|off|undefined)/i) < 0 ? " checked='checked' ": "";
        return '<input type="checkbox" ' + e + ' value="' + a + '" offval="no" ' + c + "/>"
    },
    $.fn.fmatter.link = function(a, b) {
        var c = {
            target: b.target
        },
        d = "";
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (c = $.extend({},
        c, b.colModel.formatoptions)),
        c.target && (d = "target=" + c.target),
        $.fmatter.isEmpty(a) ? $.fn.fmatter.defaultFormat(a, b) : "<a " + d + ' href="' + a + '">' + a + "</a>"
    },
    $.fn.fmatter.showlink = function(a, b) {
        var c, d = {
            baseLinkUrl: b.baseLinkUrl,
            showAction: b.showAction,
            addParam: b.addParam || "",
            target: b.target,
            idName: b.idName
        },
        e = "";
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = $.extend({},
        d, b.colModel.formatoptions)),
        d.target && (e = "target=" + d.target),
        c = d.baseLinkUrl + d.showAction + "?" + d.idName + "=" + b.rowId + d.addParam,
        $.fmatter.isString(a) || $.fmatter.isNumber(a) ? "<a " + e + ' href="' + c + '">' + a + "</a>": $.fn.fmatter.defaultFormat(a, b)
    },
    $.fn.fmatter.integer = function(a, b) {
        var c = $.extend({},
        b.integer);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (c = $.extend({},
        c, b.colModel.formatoptions)),
        $.fmatter.isEmpty(a) ? c.defaultValue: $.fmatter.util.NumberFormat(a, c)
    },
    $.fn.fmatter.number = function(a, b) {
        var c = $.extend({},
        b.number);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (c = $.extend({},
        c, b.colModel.formatoptions)),
        $.fmatter.isEmpty(a) ? c.defaultValue: $.fmatter.util.NumberFormat(a, c)
    },
    $.fn.fmatter.currency = function(a, b) {
        var c = $.extend({},
        b.currency);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (c = $.extend({},
        c, b.colModel.formatoptions)),
        $.fmatter.isEmpty(a) ? c.defaultValue: $.fmatter.util.NumberFormat(a, c)
    },
    $.fn.fmatter.date = function(a, b, c, d) {
        var e = $.extend({},
        b.date);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (e = $.extend({},
        e, b.colModel.formatoptions)),
        e.reformatAfterEdit || "edit" !== d ? $.fmatter.isEmpty(a) ? $.fn.fmatter.defaultFormat(a, b) : $.jgrid.parseDate.call(this, e.srcformat, a, e.newformat, e) : $.fn.fmatter.defaultFormat(a, b)
    },
    $.fn.fmatter.select = function(a, b) {
        a = String(a);
        var c, d, e = !1,
        f = [];
        if (void 0 !== b.colModel.formatoptions ? (e = b.colModel.formatoptions.value, c = void 0 === b.colModel.formatoptions.separator ? ":": b.colModel.formatoptions.separator, d = void 0 === b.colModel.formatoptions.delimiter ? ";": b.colModel.formatoptions.delimiter) : void 0 !== b.colModel.editoptions && (e = b.colModel.editoptions.value, c = void 0 === b.colModel.editoptions.separator ? ":": b.colModel.editoptions.separator, d = void 0 === b.colModel.editoptions.delimiter ? ";": b.colModel.editoptions.delimiter), e) {
            var g, h = (null != b.colModel.editoptions && b.colModel.editoptions.multiple === !0) == !0 ? !0 : !1,
            i = [];
            if (h && (i = a.split(","), i = $.map(i,
            function(a) {
                return $.trim(a)
            })), $.fmatter.isString(e)) {
                var j, k = e.split(d),
                l = 0;
                for (j = 0; j < k.length; j++) if (g = k[j].split(c), g.length > 2 && (g[1] = $.map(g,
                function(a, b) {
                    return b > 0 ? a: void 0
                }).join(c)), h) $.inArray(g[0], i) > -1 && (f[l] = g[1], l++);
                else if ($.trim(g[0]) === $.trim(a)) {
                    f[0] = g[1];
                    break
                }
            } else $.fmatter.isObject(e) && (h ? f = $.map(i,
            function(a) {
                return e[a]
            }) : f[0] = e[a] || "")
        }
        return a = f.join(", "),
        "" === a ? $.fn.fmatter.defaultFormat(a, b) : a
    },
    $.fn.fmatter.rowactions = function(a) {
        var b = $(this).closest("tr.jqgrow"),
        c = b.attr("id"),
        d = $(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1"),
        e = $("#" + d),
        f = e[0],
        g = f.p,
        h = g.colModel[$.jgrid.getCellIndex(this)],
        i = h.frozen ? $("tr#" + c + " td:eq(" + $.jgrid.getCellIndex(this) + ") > div", e) : $(this).parent(),
        j = {
            extraparam: {}
        },
        k = function(a, b) {
            $.isFunction(j.afterSave) && j.afterSave.call(f, a, b),
            i.find("div.ui-inline-edit,div.ui-inline-del").show(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").hide()
        },
        l = function(a) {
            $.isFunction(j.afterRestore) && j.afterRestore.call(f, a),
            i.find("div.ui-inline-edit,div.ui-inline-del").show(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").hide()
        };
        void 0 !== h.formatoptions && (j = $.extend(j, h.formatoptions)),
        void 0 !== g.editOptions && (j.editOptions = g.editOptions),
        void 0 !== g.delOptions && (j.delOptions = g.delOptions),
        b.hasClass("jqgrid-new-row") && (j.extraparam[g.prmNames.oper] = g.prmNames.addoper);
        var m = {
            keys: j.keys,
            oneditfunc: j.onEdit,
            successfunc: j.onSuccess,
            url: j.url,
            extraparam: j.extraparam,
            aftersavefunc: k,
            errorfunc: j.onError,
            afterrestorefunc: l,
            restoreAfterError: j.restoreAfterError,
            mtype: j.mtype
        };
        switch (a) {
        case "edit":
            e.jqGrid("editRow", c, m),
            i.find("div.ui-inline-edit,div.ui-inline-del").hide(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").show(),
            e.triggerHandler("jqGridAfterGridComplete");
            break;
        case "save":
            e.jqGrid("saveRow", c, m) && (i.find("div.ui-inline-edit,div.ui-inline-del").show(), i.find("div.ui-inline-save,div.ui-inline-cancel").hide(), e.triggerHandler("jqGridAfterGridComplete"));
            break;
        case "cancel":
            e.jqGrid("restoreRow", c, l),
            i.find("div.ui-inline-edit,div.ui-inline-del").show(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").hide(),
            e.triggerHandler("jqGridAfterGridComplete");
            break;
        case "del":
            e.jqGrid("delGridRow", c, j.delOptions);
            break;
        case "formedit":
            e.jqGrid("setSelection", c),
            e.jqGrid("editGridRow", c, j.editOptions)
        }
    },
    $.fn.fmatter.actions = function(a, b) {
        var c, d = {
            keys: !1,
            editbutton: !0,
            delbutton: !0,
            editformbutton: !1
        },
        e = b.rowId,
        f = "",
        g = $.jgrid.getRegional(this, "nav"),
        h = $.jgrid.styleUI[b.styleUI || "jQueryUI"].fmatter,
        i = $.jgrid.styleUI[b.styleUI || "jQueryUI"].common;
        if (void 0 !== b.colModel.formatoptions && (d = $.extend(d, b.colModel.formatoptions)), void 0 === e || $.fmatter.isEmpty(e)) return "";
        var j = "onmouseover=jQuery(this).addClass('" + i.hover + "'); onmouseout=jQuery(this).removeClass('" + i.hover + "');  ";
        return d.editformbutton ? (c = "id='jEditButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); " + j, f += "<div title='" + g.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + c + "><span class='" + i.icon_base + " " + h.icon_edit + "'></span></div>") : d.editbutton && (c = "id='jEditButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); " + j, f += "<div title='" + g.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + c + "><span class='" + i.icon_base + " " + h.icon_edit + "'></span></div>"),
        d.delbutton && (c = "id='jDeleteButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); " + j, f += "<div title='" + g.deltitle + "' style='float:left;' class='ui-pg-div ui-inline-del' " + c + "><span class='" + i.icon_base + " " + h.icon_del + "'></span></div>"),
        c = "id='jSaveButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); " + j,
        f += "<div title='" + g.savetitle + "' style='float:left;display:none' class='ui-pg-div ui-inline-save' " + c + "><span class='" + i.icon_base + " " + h.icon_save + "'></span></div>",
        c = "id='jCancelButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); " + j,
        f += "<div title='" + g.canceltitle + "' style='float:left;display:none;' class='ui-pg-div ui-inline-cancel' " + c + "><span class='" + i.icon_base + " " + h.icon_cancel + "'></span></div>",
        "<div style='margin-left:8px;'>" + f + "</div>"
    },
    $.unformat = function(a, b, c, d) {
        var e, f, g = b.colModel.formatter,
        h = b.colModel.formatoptions || {},
        i = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
        j = b.colModel.unformat || $.fn.fmatter[g] && $.fn.fmatter[g].unformat;
        if (void 0 !== j && $.isFunction(j)) e = j.call(this, $(a).text(), b, a);
        else if (void 0 !== g && $.fmatter.isString(g)) {
            var k, l = $.jgrid.getRegional(this, "formatter") || {};
            switch (g) {
            case "integer":
                h = $.extend({},
                l.integer, h),
                f = h.thousandsSeparator.replace(i, "\\$1"),
                k = new RegExp(f, "g"),
                e = $(a).text().replace(k, "");
                break;
            case "number":
                h = $.extend({},
                l.number, h),
                f = h.thousandsSeparator.replace(i, "\\$1"),
                k = new RegExp(f, "g"),
                e = $(a).text().replace(k, "").replace(h.decimalSeparator, ".");
                break;
            case "currency":
                h = $.extend({},
                l.currency, h),
                f = h.thousandsSeparator.replace(i, "\\$1"),
                k = new RegExp(f, "g"),
                e = $(a).text(),
                h.prefix && h.prefix.length && (e = e.substr(h.prefix.length)),
                h.suffix && h.suffix.length && (e = e.substr(0, e.length - h.suffix.length)),
                e = e.replace(k, "").replace(h.decimalSeparator, ".");
                break;
            case "checkbox":
                var m = b.colModel.editoptions ? b.colModel.editoptions.value.split(":") : ["Yes", "No"];
                e = $("input", a).is(":checked") ? m[0] : m[1];
                break;
            case "select":
                e = $.unformat.select(a, b, c, d);
                break;
            case "actions":
                return "";
            default:
                e = $(a).text()
            }
        }
        return void 0 !== e ? e: d === !0 ? $(a).text() : $.jgrid.htmlDecode($(a).html())
    },
    $.unformat.select = function(a, b, c, d) {
        var e = [],
        f = $(a).text();
        if (d === !0) return f;
        var g = $.extend({},
        void 0 !== b.colModel.formatoptions ? b.colModel.formatoptions: b.colModel.editoptions),
        h = void 0 === g.separator ? ":": g.separator,
        i = void 0 === g.delimiter ? ";": g.delimiter;
        if (g.value) {
            var j, k = g.value,
            l = g.multiple === !0 ? !0 : !1,
            m = [];
            if (l && (m = f.split(","), m = $.map(m,
            function(a) {
                return $.trim(a)
            })), $.fmatter.isString(k)) {
                var n, o = k.split(i),
                p = 0;
                for (n = 0; n < o.length; n++) if (j = o[n].split(h), j.length > 2 && (j[1] = $.map(j,
                function(a, b) {
                    return b > 0 ? a: void 0
                }).join(h)), l) $.inArray($.trim(j[1]), m) > -1 && (e[p] = j[0], p++);
                else if ($.trim(j[1]) === $.trim(f)) {
                    e[0] = j[0];
                    break
                }
            } else($.fmatter.isObject(k) || $.isArray(k)) && (l || (m[0] = f), e = $.map(m,
            function(a) {
                var b;
                return $.each(k,
                function(c, d) {
                    return d === a ? (b = c, !1) : void 0
                }),
                void 0 !== b ? b: void 0
            }));
            return e.join(", ")
        }
        return f || ""
    },
    $.unformat.date = function(a, b) {
        var c = $.jgrid.getRegional(this, "formatter.date") || {};
        return void 0 !== b.formatoptions && (c = $.extend({},
        c, b.formatoptions)),
        $.fmatter.isEmpty(a) ? $.fn.fmatter.defaultFormat(a, b) : $.jgrid.parseDate.call(this, c.newformat, a, c.srcformat, c)
    },
    window.jqGridUtils = {
        stringify: function(a) {
            return JSON.stringify(a,
            function(a, b) {
                return "function" == typeof b ? b.toString() : b
            })
        },
        parse: function(str) {
            return JSON.parse(str,
            function(key, value) {
                return "string" == typeof value && -1 !== value.indexOf("function") ? eval("(" + value + ")") : value
            })
        },
        encode: function(a) {
            return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        jsonToXML: function(a, b) {
            var c = $.extend({
                xmlDecl: '<?xml version="1.0" encoding="UTF-8" ?>\n',
                attr_prefix: "-",
                encode: !0
            },
            b || {}),
            d = this,
            e = function(a, b) {
                return "#text" === a ? c.encode ? d.encode(b) : b: "function" == typeof b ? "<" + a + "><![CDATA[" + b + "]]></" + a + ">\n": "" === b ? "<" + a + ">__EMPTY_STRING_</" + a + ">\n": "<" + a + ">" + (c.encode ? d.encode(b) : b) + "</" + a + ">\n"
            },
            f = function(a, b) {
                for (var c = [], d = 0; d < b.length; d++) {
                    var h = b[d];
                    c[c.length] = "undefined" == typeof h || null == h ? "<" + a + " />": "object" == typeof h && h.constructor == Array ? f(a, h) : "object" == typeof h ? g(a, h) : e(a, h)
                }
                return c.length || (c[0] = "<" + a + ">__EMPTY_ARRAY_</" + a + ">\n"),
                c.join("")
            },
            g = function(a, b) {
                var h = [],
                i = [];
                for (var j in b) if (b.hasOwnProperty(j)) {
                    var k = b[j];
                    j.charAt(0) !== c.attr_prefix ? h[h.length] = null == k ? "<" + j + " />": "object" == typeof k && k.constructor === Array ? f(j, k) : "object" == typeof k ? g(j, k) : e(j, k) : i[i.length] = " " + j.substring(1) + '="' + (c.encode ? d.encode(k) : k) + '"'
                }
                var l = i.join(""),
                m = h.join("");
                return null == a || (m = h.length > 0 ? m.match(/\n/) ? "<" + a + l + ">\n" + m + "</" + a + ">\n": "<" + a + l + ">" + m + "</" + a + ">\n": "<" + a + l + " />\n"),
                m
            },
            h = g(null, a);
            return c.xmlDecl + h
        },
        xmlToJSON: function(root, options) {
            var o = $.extend({
                force_array: [],
                attr_prefix: "-"
            },
            options || {});
            if (root) {
                var __force_array = {};
                if (o.force_array) for (var i = 0; i < o.force_array.length; i++) __force_array[o.force_array[i]] = 1;
                "string" == typeof root && (root = $.parseXML(root)),
                root.documentElement && (root = root.documentElement);
                var addNode = function(hash, key, cnts, val) {
                    if ("string" == typeof val) if ( - 1 !== val.indexOf("function")) val = eval("(" + val + ")");
                    else switch (val) {
                    case "__EMPTY_ARRAY_":
                        val = [];
                        break;
                    case "__EMPTY_STRING_":
                        val = "";
                        break;
                    case "false":
                        val = !1;
                        break;
                    case "true":
                        val = !0
                    }
                    __force_array[key] ? (1 === cnts && (hash[key] = []), hash[key][hash[key].length] = val) : 1 === cnts ? hash[key] = val: 2 === cnts ? hash[key] = [hash[key], val] : hash[key][hash[key].length] = val
                },
                parseElement = function(a) {
                    if (7 !== a.nodeType) {
                        if (3 === a.nodeType || 4 === a.nodeType) {
                            var b = a.nodeValue.match(/[^\x00-\x20]/);
                            if (null == b) return;
                            return a.nodeValue
                        }
                        var c, d, e, f, g = {};
                        if (a.attributes && a.attributes.length) for (c = {},
                        d = 0; d < a.attributes.length; d++) e = a.attributes[d].nodeName,
                        "string" == typeof e && (f = a.attributes[d].nodeValue, f && (e = o.attr_prefix + e, "undefined" == typeof g[e] && (g[e] = 0), g[e]++, addNode(c, e, g[e], f)));
                        if (a.childNodes && a.childNodes.length) {
                            var h = !0;
                            for (c && (h = !1), d = 0; d < a.childNodes.length && h; d++) {
                                var i = a.childNodes[d].nodeType;
                                3 !== i && 4 !== i && (h = !1)
                            }
                            if (h) for (c || (c = ""), d = 0; d < a.childNodes.length; d++) c += a.childNodes[d].nodeValue;
                            else for (c || (c = {}), d = 0; d < a.childNodes.length; d++) e = a.childNodes[d].nodeName,
                            "string" == typeof e && (f = parseElement(a.childNodes[d]), f && ("undefined" == typeof g[e] && (g[e] = 0), g[e]++, addNode(c, e, g[e], f)))
                        }
                        return c
                    }
                },
                json = parseElement(root);
                if (__force_array[root.nodeName] && (json = [json]), 11 !== root.nodeType) {
                    var tmp = {};
                    tmp[root.nodeName] = json,
                    json = tmp
                }
                return json
            }
        }
    }
});
//# sourceMappingURL=jquery.jqGrid.min.js.map
