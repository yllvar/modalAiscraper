let logs: string[] = [];

export function log(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}`;
  console.log(logMessage);
  logs.push(logMessage);
}

export function getLogs() {
  return logs;
}

export function clearLogs() {
  logs = [];
}

