import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import type { Lead, LeadFormData, LeadStatus } from '../types/lead'
import { get, set } from '../lib/storage'
import { logger } from '../lib/logger'

const STORAGE_KEY = 'leads'

interface LeadState {
  leads: Lead[]
  loaded: boolean
}

type LeadAction =
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'UPDATE_STATUS'; payload: { id: string; status: LeadStatus } }
  | { type: 'DELETE_LEAD'; payload: { id: string } }
  | { type: 'LOAD'; payload: Lead[] }

function leadReducer(state: LeadState, action: LeadAction): LeadState {
  switch (action.type) {
    case 'LOAD':
      return { ...state, leads: action.payload, loaded: true }
    case 'ADD_LEAD':
      return { ...state, leads: [...state.leads, action.payload] }
    case 'UPDATE_STATUS':
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.payload.id
            ? { ...l, status: action.payload.status, updatedAt: new Date().toISOString() }
            : l,
        ),
      }
    case 'DELETE_LEAD':
      return { ...state, leads: state.leads.filter((l) => l.id !== action.payload.id) }
    default:
      return state
  }
}

interface LeadContextValue {
  leads: Lead[]
  loaded: boolean
  addLead: (data: LeadFormData) => Lead
  updateStatus: (id: string, status: LeadStatus) => boolean
  deleteLead: (id: string) => boolean
  getLeadById: (id: string) => Lead | undefined
}

const LeadContext = createContext<LeadContextValue | null>(null)

function LeadProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(leadReducer, { leads: [], loaded: false })
  const leadsRef = useRef(state.leads)
  leadsRef.current = state.leads

  useEffect(() => {
    const stored = get<Lead[]>(STORAGE_KEY)
    const leads = Array.isArray(stored) ? stored : []
    logger.info(`loaded ${leads.length} leads from storage`)
    dispatch({ type: 'LOAD', payload: leads })
  }, [])

  useEffect(() => {
    if (state.loaded) {
      set(STORAGE_KEY, state.leads)
    }
  }, [state.leads, state.loaded])

  const addLead = useCallback((data: LeadFormData): Lead => {
    const now = new Date().toISOString()
    const lead: Lead = {
      id: crypto.randomUUID(),
      ...data,
      status: 'New',
      createdAt: now,
      updatedAt: now,
    }
    dispatch({ type: 'ADD_LEAD', payload: lead })
    logger.info(`lead added: ${lead.id}`)
    return lead
  }, [])

  const updateStatus = useCallback((id: string, status: LeadStatus): boolean => {
    const exists = leadsRef.current.some((l) => l.id === id)
    if (!exists) {
      logger.warn(`updateStatus failed: lead ${id} not found`)
      return false
    }
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } })
    logger.info(`lead ${id} status updated to ${status}`)
    return true
  }, [])

  const deleteLead = useCallback((id: string): boolean => {
    const exists = leadsRef.current.some((l) => l.id === id)
    if (!exists) {
      logger.warn(`deleteLead failed: lead ${id} not found`)
      return false
    }
    dispatch({ type: 'DELETE_LEAD', payload: { id } })
    logger.info(`lead deleted: ${id}`)
    return true
  }, [])

  const getLeadById = useCallback(
    (id: string): Lead | undefined => leadsRef.current.find((l) => l.id === id),
    [],
  )

  return (
    <LeadContext.Provider
      value={{
        leads: state.leads,
        loaded: state.loaded,
        addLead,
        updateStatus,
        deleteLead,
        getLeadById,
      }}
    >
      {children}
    </LeadContext.Provider>
  )
}

function useLeads(): LeadContextValue {
  const ctx = useContext(LeadContext)
  if (!ctx) {
    throw new Error('useLeads must be used within LeadProvider')
  }
  return ctx
}

export { LeadProvider, useLeads }
