window.log = {
  debug(): void {
    const args = [...arguments];
    args[0] = '%c' + args[0];
    args.splice(1, 0, 'color: rgb(110,171,206)');
    console.log.apply(console, args);
  },
  info(): void {
    const args = [...arguments];
    args[0] = '%c' + args[0];
    args.splice(1, 0, 'color: rgb(75,154,137');
    console.log.apply(console, args);
  },
  warn(): void {
    const args = [...arguments];
    args[0] = '%c' + args[0];
    args.splice(1, 0, 'color: rgb(201,200,137)');
    console.log.apply(console, args);
  },
  error(): void {
    const args = [...arguments];
    args[0] = '%c' + args[0];
    args.splice(1, 0, 'color: rgb(165,106,102');
    console.log.apply(console, args);
  },
};
