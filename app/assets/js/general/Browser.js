
export class Browser {

  static getBrowserClass() {
    var userAgent = navigator.userAgent.toLowerCase();

    if (/edge/i.test(userAgent)) {
        return 'edge';
    } else if (/rv:11/i.test(userAgent)) {
        return 'ie11';
    } else if (/msie 10/i.test(userAgent)) {
        return 'ie10';
    } else if (/opr/i.test(userAgent)) {
        return 'opera';
    } else if (/chrome/i.test(userAgent)) {
        return 'chrome';
    } else if (/firefox/i.test(userAgent)) {
        return 'firefox';
    } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
        return 'safari';
    }

    return undefined;
  }

}

