/**
 * 深复制对象
 * @param {object} 被复制的对象
 */
function clone(o) {
    var str, newobj = o.constructor === Array ? [] : {};
    if (typeof o !== 'object'){
        return;
    } else if (window.JSON){
        str = JSON.stringify(o);
        newobj = JSON.parse(str);
    } else {
        for(var i in o){
            newobj[i] = typeof o[i] === 'object' ? cloneObj(o[i]) : o[i]; 
        }
    }
    return newobj;
}

function copy(o) {
    var obj = {};
    for (var prop in o) {
        if (o.hasOwnProperty(prop)) {
            obj[prop] = o[prop];
        }
    }
    return obj;
}

/**
 * 浅复制
 * @params {object...} args - 多个被复制的对象
 */
function extend() {
    var obj = {};
    each(arguments, function (arg) {
        each(arg, function (val, key) {
            obj[key] = val;
        });
    });
    return obj;
}


/**
 * 反序列化 'a=1&b=2&c=d+e' 形式的 querystring 为 对象 {a: 1, b: 2, c: 'd e'}
 * @param {string} queryString - 被查找的 querystring，默认为当前的 location.search
 */
function parseQueryString2Object(queryString) {
    queryString = (queryString || location.queryString).replace(/^\?/, '');
    var queryArr = queryString.split('&'),
        i,
        queryKeyVal,
        queryObj = {};
    if (queryArr.length) {
        for (i = 0; i < queryArr.length; i++) {
            queryKeyVal = queryArr[i].split('=');
            if (queryKeyVal.length === 2) {
                if(queryKeyVal[1]==='%s'){
                    queryObj[queryKeyVal[0]] = queryKeyVal[1];
                }else{
                    queryObj[queryKeyVal[0]] = decodeURIComponent(queryKeyVal[1]);
                }
            }
        }
    }
    return queryObj;
}