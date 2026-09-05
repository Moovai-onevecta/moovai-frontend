import { api } from './api'

/**
 * Structured chat turn with the itinerary-planning assistant.
 * `messages` is [{ role: 'user'|'assistant', content }], oldest first.
 * `context` is optional trip-shaped grounding: { brief, preferences, cities }.
 * Returns { reply, suggested_actions }.
 */
export function chatAssistant(messages, context) {
  return api.post('/ai/chat/assistant', { messages, context })
}

export function suggestDestinations(brief, preferences, numSuggestions = 3) {
  return api.post('/ai/destinations/suggest', {
    brief,
    preferences,
    num_suggestions: numSuggestions,
  })
}

export function generateItinerary(payload) {
  return api.post('/ai/itineraries/generate', payload)
}
