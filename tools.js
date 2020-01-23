function findKey(array, key) {
  let found = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].collision == key) {
      found = true;
      break;
    }
  }
  return found;
}

function findIndex(array, key) {
  let i = 0;
  for (i = 0; i < array.length; i++) {
    if (array[i].collision == key) {
      break;
    }
  }
  return i;
}
