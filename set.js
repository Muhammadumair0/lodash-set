let obj = { a: [{ b: { c: 3 } }] };

// let path = ['a', '0', 'b', 'c'];
// let path = 'a[0].b.c';

function set(object, path, value) {
  if (typeof path === "string") {
    try {
      eval(`object.${path} = ${value}`);
    } catch (e) {}
  }

  if (path.constructor === Array) {
    let stringPath = path.reduce((acc, item) => {
      return (
        acc + `[${Number(item) >= 0 || Number(item) < 0 ? item : `'${item}'`}]`
      );
    }, "");
    try {
      eval(`object${stringPath} = ${value}`);
    } catch (e) {
      generateDynamicProperty(obj, path);
      eval(`object${stringPath} = ${value}`);
    }
  }

  function generateDynamicProperty(obj, path) {
    let value = 0;
    lastKeyIndex = path.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      key = path[i];
      if (!(key in obj)) obj[key] = {};
      obj = obj[key];
    }
    obj[path[lastKeyIndex]] = value;
  }
}
