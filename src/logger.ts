const debugLog = (() => {
  // tslint:disable-next-line: no-console
  return Function.prototype.bind.call(console.debug, console, '%c%o', 'color: rgb(110,171,206)');
})();

const infoLog = (() => {
  // tslint:disable-next-line: no-console
  return Function.prototype.bind.call(console.info, console, '%o');
})();

const warnLog = (() => {
  return Function.prototype.bind.call(console.warn, console, '%o');
})();

const errorLog = (() => {
  return Function.prototype.bind.call(console.error, console, '%o');
})();

window.log = {
  debug: debugLog,
  info: infoLog,
  warn: warnLog,
  error: errorLog,
};
