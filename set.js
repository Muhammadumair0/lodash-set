function set(object, path, value) {
  if (typeof path === "string") {
      eval(`object.${path} = ${value}`);
  }

  if(path.constructor === Array) {p
     let stringPath = path.reduce((acc, item) => {
         if(Number(item) === 0) {
            return acc + `[${item}]`;
        } else {
            return acc + `.${item}`
         }
      }, '');
      eval(`object${stringPath} = ${value}`);
  }
}
// let object = { 'a': [{ 'b': { 'c': 3 } }] };
// stringPath = 'a[0].b.c';
// arrayPath = ['x', '0', 'y', 'z'];
