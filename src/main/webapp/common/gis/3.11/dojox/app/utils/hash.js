//>>built
define("dojox/app/utils/hash",["dojo/_base/lang"],function(k){var f={getParams:function(a){var c;if(a&&a.length){for(;0<a.indexOf("(");){var b=a.indexOf("("),d=a.indexOf(")"),b=a.substring(b,d+1);c||(c={});c=f.getParamObj(c,b);d=b.substring(1,b.indexOf("\x26"));a=a.replace(b,d)}a=a.split("\x26");for(b=0;b<a.length;b++){var e=a[b].split("\x3d"),d=e[0],e=encodeURIComponent(e[1]||"");d&&e&&(c||(c={}),c[d]=e)}}return c},getParamObj:function(a,c){for(var b,d=c.substring(1,c.indexOf("\x26")),e=c.substring(c.indexOf("\x26"),
c.length-1).split("\x26"),f=0;f<e.length;f++){var g=e[f].split("\x3d"),h=g[0],g=encodeURIComponent(g[1]||"");h&&g&&(b||(b={}),b[h]=g)}a[d]=b;return a},buildWithParams:function(a,c){"#"!==a.charAt(0)&&(a="#"+a);for(var b in c){var d=c[b];k.isObject(d)?a=f.addViewParams(a,b,d):b&&null!=d&&(a=a+"\x26"+b+"\x3d"+c[b])}return a},addViewParams:function(a,c,b){"#"!==a.charAt(0)&&(a="#"+a);var d=a.indexOf(c);if(0<d&&("#"==a.charAt(d-1)||"+"==a.charAt(d-1))&&("\x26"==a.charAt(d+c.length)||"+"==a.charAt(d+c.length)||
"-"==a.charAt(d+c.length))){var e=a.substring(d-1,d+c.length+1);b=f.getParamString(b);c=a.charAt(d-1)+"("+c+b+")"+a.charAt(d+c.length);a=a.replace(e,c)}return a},getParamString:function(a){var c="",b;for(b in a){var d=a[b];b&&null!=d&&(c=c+"\x26"+b+"\x3d"+a[b])}return c},getTarget:function(a,c){for(c||(c="");0<a.indexOf("(");){var b=a.indexOf("("),d=a.indexOf(")"),b=a.substring(b,d+1),d=b.substring(1,b.indexOf("\x26"));a=a.replace(b,d)}return((a&&"#"==a.charAt(0)?a.substr(1):a)||c).split("\x26")[0]}};
return f});