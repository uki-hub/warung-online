const logService = (function () {
  const logs: Array<string> = [];

  return {
    log: (message: string) => logs.push(message),
    logAll: (messages: Array<string>) => logs.push(...messages),
    get: (): Array<string> => logs,
  };
})();

export default logService;
