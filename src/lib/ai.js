import { api } from './api'

/**
 * Structured chat turn with the itinerary-planning assistant.
 * `itineraryId` is the owning itinerary — the backend persists this turn's
 * messages/suggested actions to that itinerary's chat history.
 * `messages` is [{ role: 'user'|'assistant', content }], oldest first.
 * `context` is optional trip-shaped grounding: { brief, preferences, cities }.
 * Returns { reply, suggested_actions }.
 */
export function chatAssistant(itineraryId, messages, context) {
  return api.post('/ai/chat/assistant', {
    itinerary_id: itineraryId,
    messages,
    context,
  })
}

/** Records whether the traveler approved or skipped a suggested action. */
export function resolveChatAction(itineraryId, actionId, accepted) {
  return api.post(`/ai/chat/${itineraryId}/actions/${actionId}/resolve`, { accepted })
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
