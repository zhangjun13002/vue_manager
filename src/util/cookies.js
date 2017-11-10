function get(name) {
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ( Array.isArray(document.cookie.match(reg))) {
        var arr = document.cookie.match(reg);
        return unescape(arr[2]);
    }        
    else
        return null;
}

function set(c_name, value, expire) {
    var exdate = new Date();
    exdate.setSeconds(exdate.getSeconds() + expire);
    document.cookie = c_name + "=" + escape(value) + ((expire == null) ? "" : ";expires=" + exdate.toGMTString());
}

function del(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = get(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" +exp.toGMTString();
}

export default { get, set, del }