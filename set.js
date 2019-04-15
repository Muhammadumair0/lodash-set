let obj = { a: [{ b: { c: 3 } }] };

// let path = ['a', '0', 'b', 'c'];
// let path = 'a[0].b.c';

function set(object, path, value) {
  if (typeof path === "string") {
    try {
      eval(`object.${path} = ${value}`);
    } catch (e) {
      generateDynamicPropertyForStringPath(obj, path);
      eval(`object.${path} = ${value}`);
    }
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
      generateDynamicPropertyForArrayPath(obj, path);
      eval(`object${stringPath} = ${value}`);
    }
  }

  function generateDynamicPropertyForStringPath(obj, path) {
    let resultArray = [];
    let count = 0;
    let arrayPath = path.split("");
    for (let i = 0; i < arrayPath.length; i++) {
      if (arrayPath[i] != "[" && arrayPath[i] != "]" && arrayPath[i] != ".") {
        resultArray[count++] = arrayPath[i];
      }
    }
    generateDynamicPropertyForArrayPath(obj, resultArray);
  }

  function generateDynamicPropertyForArrayPath(obj, path) {
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
