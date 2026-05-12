import { describe, it, expect, beforeEach } from 'vitest'
import { get, set, remove } from './storage'

beforeEach(() => {
  localStorage.clear()
})

describe('storage', () => {
  it('set and get round-trip works', () => {
    const data = { name: 'Alice', count: 3 }
    const result = set('test-key', data)
    expect(result).toBe(true)
    expect(get<typeof data>('test-key')).toEqual(data)
  })

  it('stores arrays correctly', () => {
    const items = [1, 2, 3]
    set('arr', items)
    expect(get<number[]>('arr')).toEqual([1, 2, 3])
  })

  it('returns null for missing keys', () => {
    expect(get('nothing-here')).toBeNull()
  })

  it('returns null for empty string value', () => {
    localStorage.setItem('leadrecover:empty', '')
    expect(get('empty')).toBeNull()
  })

  it('remove deletes a stored value', () => {
    set('temp', 'value')
    expect(get('temp')).toBe('value')
    const removed = remove('temp')
    expect(removed).toBe(true)
    expect(get('temp')).toBeNull()
  })

  it('remove returns true for non-existent key', () => {
    const removed = remove('never-set')
    expect(removed).toBe(true)
  })

  it('returns null for invalid JSON and does not crash', () => {
    localStorage.setItem('leadrecover:bad', 'not-valid-json')
    const result = get('bad')
    expect(result).toBeNull()
  })

  it('handles malformed JSON gracefully', () => {
    localStorage.setItem('leadrecover:broken', '{broken')
    expect(get('broken')).toBeNull()
  })

  it('stores and retrieves primitive values', () => {
    set('str', 'hello')
    expect(get<string>('str')).toBe('hello')

    set('num', 42)
    expect(get<number>('num')).toBe(42)

    set('bool', true)
    expect(get<boolean>('bool')).toBe(true)
  })
})
