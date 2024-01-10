const logService = (function () {
  const logs: string[] = [];

  return {
    log: (message: string) => logs.push(message),
    logAll: (messages: string[]) => logs.push(...messages),
    get: (): string[] => logs,
  };
})();

export default logService;
