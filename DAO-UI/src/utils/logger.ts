type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  context?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private createLogEntry(level: LogLevel, message: string, data?: any, context?: string): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      context,
    };
  }

  private addLog(entry: LogEntry) {
    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      const logColor = {
        info: '#2196F3',
        warn: '#FF9800',
        error: '#F44336',
        debug: '#9C27B0',
      }[entry.level];

      console.log(
        `%c${entry.timestamp} [${entry.level.toUpperCase()}]${entry.context ? ` [${entry.context}]` : ''}: ${entry.message}`,
        `color: ${logColor}; font-weight: bold;`
      );
      if (entry.data) {
        console.log(entry.data);
      }
    }
  }

  info(message: string, data?: any, context?: string) {
    this.addLog(this.createLogEntry('info', message, data, context));
  }

  warn(message: string, data?: any, context?: string) {
    this.addLog(this.createLogEntry('warn', message, data, context));
  }

  error(message: string, data?: any, context?: string) {
    this.addLog(this.createLogEntry('error', message, data, context));
  }

  debug(message: string, data?: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      this.addLog(this.createLogEntry('debug', message, data, context));
    }
  }

  getLogs(level?: LogLevel, context?: string): LogEntry[] {
    return this.logs.filter(log => 
      (!level || log.level === level) && 
      (!context || log.context === context)
    );
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = Logger.getInstance(); 