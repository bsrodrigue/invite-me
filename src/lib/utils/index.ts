export function getWordCount(str) {
  return str.split(' ').filter(function(num) {
    return num != ''
  }).length;
}

export const truncate = (str: string, len: number) => str.length > len ? str.slice(0, len) + "..." : str;

export function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
