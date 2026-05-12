export type LeadStatus = 'New' | 'Contacted' | 'Booked' | 'Lost'

export interface Lead {
  id: string
  name: string
  phone: string
  email: string
  businessName: string
  notes: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
}

export interface LeadFormData {
  name: string
  phone: string
  email: string
  businessName: string
  notes: string
}

export type ReplyContext = 'price_inquiry' | 'scheduling' | 'follow_up' | 'general'
