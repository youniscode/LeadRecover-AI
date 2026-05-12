import { describe, it, expect } from 'vitest'
import { generateReply, generateReviewRequest } from './templates'
import type { Lead, ReplyContext } from '../types/lead'

function makeLead(overrides?: Partial<Lead>): Lead {
  return {
    id: '1',
    name: 'Alice',
    phone: '555-0100',
    email: 'alice@test.com',
    businessName: 'Alice Bakery',
    notes: '',
    status: 'New',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

const contexts: ReplyContext[] = ['price_inquiry', 'scheduling', 'follow_up', 'general']

describe('generateReply', () => {
  it.each(contexts)('returns a non-empty message for %s', (ctx) => {
    const result = generateReply(makeLead(), ctx)
    expect(result).toBeTruthy()
    expect(result.length).toBeGreaterThan(10)
  })

  it.each(contexts)('includes lead name for %s', (ctx) => {
    const result = generateReply(makeLead(), ctx)
    expect(result).toContain('Alice')
  })

  it.each(contexts)('includes business name for %s', (ctx) => {
    const result = generateReply(makeLead(), ctx)
    expect(result).toContain('Alice Bakery')
  })

  it('returns different messages for each context', () => {
    const messages = contexts.map((ctx) => generateReply(makeLead(), ctx))
    const unique = new Set(messages)
    expect(unique.size).toBe(contexts.length)
  })

  it('handles empty business name gracefully', () => {
    const lead = makeLead({ businessName: '' })
    const result = generateReply(lead, 'general')
    expect(result).toContain('Alice')
    expect(result).not.toContain('undefined')
    expect(result).not.toContain('null')
  })

  it('price_inquiry mentions pricing', () => {
    const result = generateReply(makeLead(), 'price_inquiry')
    expect(result).toContain('pricing')
  })

  it('scheduling mentions scheduling', () => {
    const result = generateReply(makeLead(), 'scheduling')
    expect(result).toContain('[day]')
  })

  it('follow_up mentions following up', () => {
    const result = generateReply(makeLead(), 'follow_up')
    expect(result).toContain('follow up')
  })

  it('general asks how to help', () => {
    const result = generateReply(makeLead(), 'general')
    expect(result).toContain('How can I help')
  })
})

describe('generateReviewRequest', () => {
  it('returns a non-empty message', () => {
    const result = generateReviewRequest(makeLead())
    expect(result).toBeTruthy()
    expect(result.length).toBeGreaterThan(10)
  })

  it('includes lead name', () => {
    const result = generateReviewRequest(makeLead())
    expect(result).toContain('Alice')
  })

  it('includes business name', () => {
    const result = generateReviewRequest(makeLead())
    expect(result).toContain('Alice Bakery')
  })

  it('mentions Google review', () => {
    const result = generateReviewRequest(makeLead())
    expect(result).toContain('Google review')
  })

  it('handles empty business name gracefully', () => {
    const lead = makeLead({ businessName: '' })
    const result = generateReviewRequest(lead)
    expect(result).toContain('Alice')
    expect(result).not.toContain('undefined')
    expect(result).not.toContain('null')
  })
})
