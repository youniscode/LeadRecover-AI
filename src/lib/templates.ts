import type { Lead, ReplyContext } from '../types/lead'

export function generateReply(lead: Lead, context: ReplyContext): string {
  switch (context) {
    case 'price_inquiry':
      return `Hi ${lead.name}, thank you for reaching out to ${lead.businessName}! The pricing for our services starts at $X. I would love to discuss your specific needs. Would you be available for a quick call this week?`
    case 'scheduling':
      return `Hi ${lead.name}, thanks for your interest in ${lead.businessName}! I would like to find a time that works for you. Are you available on [day] at [time]? Let me know what works best.`
    case 'follow_up':
      return `Hi ${lead.name}, I wanted to follow up regarding your inquiry about ${lead.businessName}. Have you had a chance to think about it? I am here to answer any questions you might have.`
    case 'general':
      return `Hi ${lead.name}, thank you for contacting ${lead.businessName}! How can I help you today?`
  }
}

export function generateReviewRequest(lead: Lead): string {
  return `Hi ${lead.name}, thank you for choosing ${lead.businessName}! We would really appreciate it if you could take a moment to leave us a Google review. Your feedback helps us serve you better. Here is the link: [Google Review Link]`
}
