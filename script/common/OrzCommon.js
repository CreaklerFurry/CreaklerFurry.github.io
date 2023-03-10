var sha256 = function (data, isBigCase) {
    if (isBigCase === void 0) { isBigCase = true; }
    var 
    /* Function */
    safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }, S = function (X, n) { return ((X >>> n) | (X << (32 - n))); }, R = function (X, n) { return (X >>> n); }, Ch = function (x, y, z) { return ((x & y) ^ ((~x) & z)); }, Maj = function (x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }, Sigma0256 = function (x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }, Sigma1256 = function (x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }, Gamma0256 = function (x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }, Gamma1256 = function (x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); };
    var core_sha256 = function (m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2), HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19), W = new Array(64), a, b, c, d, e, f, g, h, T1, T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
            for (var j = 0; j < 64; j++) {
                if (j < 16)
                    W[j] = m[j + i];
                else
                    W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
            ;
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        ;
        return HASH;
    };
    function str2binb(data) {
        var bin = Array(), mask = (1 << 8) - 1;
        for (var i = 0; i < data.length * 8; i += 8) {
            bin[i >> 5] |= (data.charCodeAt(i / 8) & mask) << (24 - i % 32);
        }
        ;
        return bin;
    }
    ;
    function Utf8Encode(string) {
        var utfTextResult = "";
        string = string.replace(/\r\n/g, "\n");
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utfTextResult += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utfTextResult += String.fromCharCode((c >> 6) | 192);
                utfTextResult += String.fromCharCode((c & 63) | 128);
            }
            else {
                utfTextResult += String.fromCharCode((c >> 12) | 224);
                utfTextResult += String.fromCharCode(((c >> 6) & 63) | 128);
                utfTextResult += String.fromCharCode((c & 63) | 128);
            }
            ;
        }
        ;
        return utfTextResult;
    }
    ;
    function binb2hex(binarray) {
        var hexTab = isBigCase ? "0123456789ABCDEF" : "0123456789abcdef", strResult = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            strResult += hexTab
                .charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF)
                + hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        ;
        return strResult;
    }
    ;
    data = Utf8Encode(data);
    return binb2hex(core_sha256(str2binb(data), data.length * 8));
}, formatTime = function (format) {
    if (format === void 0) { format = 'yy-MM-dd HH:mm:ss.SS'; }
    var dt = new Date(), y = dt.getFullYear(), d = dt.getDate(), M = dt.getMonth() + 1, H = dt.getHours(), m = dt.getMinutes(), s = dt.getSeconds(), S = dt.getMilliseconds();
    function zeroFill(data, maxLength) {
        var string = '';
        for (var a = 0; a < maxLength - data.toString().length; a++) {
            string += '0';
        }
        ;
        return string + data.toString();
    }
    ;
    return format.replace(/yy/g, zeroFill(y, 2))
        .replace(/MM/g, zeroFill(M, 2))
        .replace(/dd/g, zeroFill(d, 2))
        .replace(/HH/g, zeroFill(H, 2))
        .replace(/mm/g, zeroFill(m, 2))
        .replace(/ss/g, zeroFill(s, 2))
        .replace(/SS/g, zeroFill(S, 3))
        .replace(/[A-Za-z]+/g, '');
}, deepClone = function (target) {
    var map = new WeakMap();
    var isObject = function (target) {
        return (typeof target === 'object' && target) || typeof target === 'function';
    }, clone = function (data) {
        if (!isObject(data)) {
            return data;
        }
        ;
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data);
        }
        ;
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())();
        }
        ;
        var exist = map.get(data);
        if (exist) {
            return exist;
        }
        ;
        if (data instanceof Map) {
            var result_1 = new Map();
            map.set(data, result_1);
            data.forEach(function (val, key) {
                if (isObject(val)) {
                    result_1.set(key, clone(val));
                }
                else {
                    result_1.set(key, val);
                }
                ;
            });
            return result_1;
        }
        ;
        if (data instanceof Set) {
            var result_2 = new Set();
            map.set(data, result_2);
            data.forEach(function (val) {
                if (isObject(val)) {
                    result_2.add(clone(val));
                }
                else {
                    result_2.add(val);
                }
                ;
            });
            return result_2;
        }
        ;
        var keys = Reflect.ownKeys(data);
        var allDesc = Object.getOwnPropertyDescriptors(data);
        var result = Object.create(Object.getPrototypeOf(data), allDesc);
        map.set(data, result);
        keys.forEach(function (key) {
            var val = data[key];
            if (isObject(val)) {
                result[key] = clone(val);
            }
            else {
                result[key] = val;
            }
            ;
        });
        return result;
    };
    return clone(target);
}, getCaller = function (step) {
    if (step === void 0) { step = 3; }
    var errStack = '', callerLog = [], callerLine = [];
    try { // Get errStack.
        errStack = new Error().stack || '';
    }
    catch (_a) { }
    ;
    callerLine = errStack.split('\n    at ')[step].split(' ');
    if (errStack == '')
        return;
    if (!_OrzConf.isFireFox) {
        // Chrome Edge...
        callerLog
            = (callerLine === null || callerLine === void 0 ? void 0 : callerLine.toString().split(':')) || [];
        // return
        return {
            callerFn: callerLine[0] || '<anonymous>',
            fileName: callerLog[0] == '<anonymous>' ? '' : callerLog[0],
            position: {
                col: parseInt(callerLog[2]) || 0,
                row: parseInt(callerLog[1]) || 0
            }
        };
    }
    else {
        // FireFox
    }
    ;
}, StringAs = function (string) {
    return '"' + string.replace(/(\\|\"|\n|\r|\t)/g, "\\$1") + '"';
}, hashTable = (function () {
    var symbol = Symbol();
    function HashCode(key) {
        if (typeof key === "number")
            return key;
        if (typeof key !== "string")
            throw TypeError('key error');
        var hash = 0;
        for (var i = 0, len = key.length; i < len; i++)
            hash += key.charCodeAt(i);
        return hash % 37;
    }
    var Valuepair = /** @class */ (function () {
        function Valuepair(key, value) {
            // @ts-ignore
            this.key = key;
            // @ts-ignore
            this.value = value;
        }
        return Valuepair;
    }());
    return /** @class */ (function () {
        function HashTable() {
            this[symbol] = [];
        }
        HashTable.prototype.put = function (key, value) {
            if (key !== null && value !== null) {
                var position = HashCode(key);
                if (!this[symbol][position])
                    this[symbol][position] = new Valuepair(key, value);
                else {
                    var index = position + 1;
                    while (this[symbol][index])
                        index++;
                    this[symbol][index] = new Valuepair(key, value);
                    return true;
                }
                ;
            }
            ;
            return false;
        };
        ;
        HashTable.prototype.get = function (key) {
            var position = HashCode(key);
            if (this[symbol][position] !== null) {
                if (this[symbol][position].key === key)
                    return this[symbol][position].value;
                else {
                    var index = position + 1;
                    while (this[symbol][index] !== null && this[symbol][index].key !== key)
                        index++;
                    return this[symbol][index].value;
                }
                ;
            }
            ;
            return undefined;
        };
        ;
        HashTable.prototype.remove = function (key) {
            var position = HashCode(key);
            if (this[symbol][position]) {
                if (this[symbol][position].key === key)
                    this[symbol].splice(position, 1);
                var index = position + 1;
                while (this[symbol][index] && this[symbol][index].key !== key)
                    index++;
                this[symbol].splice(index, 1);
                return true;
            }
            ;
            return false;
        };
        ;
        return HashTable;
    }());
})();
