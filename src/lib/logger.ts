type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVEL_MAP: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const currentLevel: LogLevel =
  import.meta.env.MODE === 'development' ? 'debug' : 'warn'

function shouldLog(level: LogLevel): boolean {
  try {
    return LEVEL_MAP[level] >= LEVEL_MAP[currentLevel]
  } catch {
    return false
  }
}

const log =
  (level: LogLevel) =>
  (msg: string, data?: unknown): void => {
    if (!shouldLog(level)) return
    const fn = console[level] ?? console.log
    fn(`[LR] ${msg}`, data ?? '')
  }

export const logger = {
  debug: log('debug'),
  info: log('info'),
  warn: log('warn'),
  error: log('error'),
}
