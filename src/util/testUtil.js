export default class testUtil {
  static verifyInjectionContained(injectionUrl, type) {
    // Default is to search for JS injections
    let tagName = 'script';
    let propName = 'src';
    if (type === 'css') {
      tagName = 'link';
      propName = 'href';
    }

    const scriptElems = element.all(by.tagName(tagName));
    const propList = [];
    scriptElems.each((child) => {
      child.getAttribute(propName).then((value) => {
        propList.push(value);
      });
    }).then(() => {
      let containsInjection = false;
      propList.forEach((propValue) => {
        if (propValue.indexOf(injectionUrl) > -1) {
          containsInjection = true;
        }
      });
      expect(containsInjection).toBe(true, `Page does not contain the injection '${injectionUrl}'`);
    });
  }

  static verifyInjectionNotContained(injectionUrl, type) {
    // Default is to search for JS injections
    let tagName = 'script';
    let propName = 'src';
    if (type === 'css') {
      tagName = 'link';
      propName = 'href';
    }

    const scriptElems = element.all(by.tagName(tagName));
    const propList = [];
    scriptElems.each((child) => {
      child.getAttribute(propName).then((value) => {
        propList.push(value);
      });
    }).then(() => {
      let containsInjection = false;
      propList.forEach((propValue) => {
        if (propValue.indexOf(injectionUrl) > -1) {
          containsInjection = true;
        }
      });
      expect(containsInjection).toBe(false, `Page does contain the injection '${injectionUrl}' when it should not`);
    });
  }
}
