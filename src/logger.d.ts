type Logger = {
  debug: (message: any, ...optionalParams: any[]) => void;
  info: (message: any, ...optionalParams: any[]) => void;
  warn: (message: any, ...optionalParams: any[]) => void;
  error: (message: any, ...optionalParams: any[]) => void;
};

interface Window {
  log: Logger;
}

declare const log: Logger;
