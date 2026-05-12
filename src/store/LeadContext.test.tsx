import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { LeadProvider, useLeads } from './LeadContext'
import type { LeadFormData } from '../types/lead'

function wrapper({ children }: { children: React.ReactNode }) {
  return <LeadProvider>{children}</LeadProvider>
}

const sampleData: LeadFormData = {
  name: 'Alice',
  phone: '555-0100',
  email: 'alice@test.com',
  businessName: 'Alice Bakery',
  notes: 'Test lead',
}

beforeEach(() => {
  localStorage.clear()
})

describe('useLeads', () => {
  it('provides empty leads and loaded state on mount', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper })

    await waitFor(() => {
      expect(result.current.loaded).toBe(true)
    })

    expect(result.current.leads).toEqual([])
  })

  it('addLead creates a lead with New status and generated id', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper })

    await waitFor(() => {
      expect(result.current.loaded).toBe(true)
    })

    let added: ReturnType<typeof result.current.addLead>
    act(() => {
      added = result.current.addLead(sampleData)
    })

    expect(result.current.leads).toHaveLength(1)
    expect(result.current.leads[0].name).toBe('Alice')
    expect(result.current.leads[0].businessName).toBe('Alice Bakery')
    expect(result.current.leads[0].status).toBe('New')
    expect(result.current.leads[0].id).toBeTruthy()
    expect(result.current.leads[0].createdAt).toBeTruthy()
    expect(result.current.leads[0].updatedAt).toBeTruthy()
    expect(result.current.leads[0].id).toBe(added!.id)
  })

  it('updateStatus changes lead status and updates updatedAt', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper })

    await waitFor(() => {
      expect(result.current.loaded).toBe(true)
    })

    let addedId: string
    act(() => {
      addedId = result.current.addLead(sampleData).id
    })

    const originalUpdatedAt = result.current.leads[0].updatedAt

    await act(async () => {
      await new Promise((r) => setTimeout(r, 5))
    })

    let success = false
    act(() => {
      success = result.current.updateStatus(addedId!, 'Contacted')
    })

    expect(success).toBe(true)
    expect(result.current.leads[0].status).toBe('Contacted')
    expect(result.current.leads[0].updatedAt).not.toBe(originalUpdatedAt)
  })

  it('updateStatus returns false for non-existent id', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper })

    await waitFor(() => {
      expect(result.current.loaded).toBe(true)
    })

    let success = false
    act(() => {
      success = result.current.updateStatus('non-existent', 'Booked')
    })

    expect(success).toBe(false)
  })

  it('deleteLead removes a lead', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper })

    await waitFor(() => {
      expect(result.current.loaded).toBe(true)
    })

    let addedId = ''
    act(() => {
      addedId = result.current.addLead(sampleData).id
    })

    expect(result.current.leads).toHaveLength(1)

    let success = false
    act(() => {
      success = result.current.deleteLead(addedId!)
    })

    expect(success).toBe(true)
    expect(result.current.leads).toHaveLength(0)
  })

  it('deleteLead returns false for non-existent id', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper })

    await waitFor(() => {
      expect(result.current.loaded).toBe(true)
    })

    let success = false
    act(() => {
      success = result.current.deleteLead('non-existent')
    })

    expect(success).toBe(false)
  })

  it('getLeadById returns the correct lead', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper })

    await waitFor(() => {
      expect(result.current.loaded).toBe(true)
    })

    let addedId: string
    act(() => {
      addedId = result.current.addLead(sampleData).id
    })

    const found = result.current.getLeadById(addedId!)
    expect(found?.name).toBe('Alice')

    const notFound = result.current.getLeadById('missing')
    expect(notFound).toBeUndefined()
  })

  it('persists leads to localStorage after add', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper })

    await waitFor(() => {
      expect(result.current.loaded).toBe(true)
    })

    act(() => {
      result.current.addLead(sampleData)
    })

    await waitFor(() => {
      const raw = localStorage.getItem('leadrecover:leads')
      expect(raw).toBeTruthy()
      const parsed = JSON.parse(raw!)
      expect(parsed).toHaveLength(1)
      expect(parsed[0].name).toBe('Alice')
    })
  })
})
