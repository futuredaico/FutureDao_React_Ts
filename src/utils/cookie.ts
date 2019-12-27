export const setCookie = function (cname: string, cvalue: string, exdays?: number) {
    const path = "path=/";
    if (exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";" + path;
    } else {
        document.cookie = cname + "=" + cvalue + ";" + path;;
    }
}
export const getCookie = function (cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) { return c.substring(name.length, c.length); }
    }
    return "";
}
export const removeCookie = function (key: string) {
    setCookie(key, '', -1);
}