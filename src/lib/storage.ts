import { logger } from './logger'

const PREFIX = 'leadrecover:'

export function get<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch (err) {
    logger.error(`storage.get failed for key "${key}"`, err)
    return null
  }
}

export function set<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch (err) {
    logger.error(`storage.set failed for key "${key}"`, err)
    return false
  }
}

export function remove(key: string): boolean {
  try {
    localStorage.removeItem(PREFIX + key)
    return true
  } catch (err) {
    logger.error(`storage.remove failed for key "${key}"`, err)
    return false
  }
}
