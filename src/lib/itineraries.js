import { api } from './api'

export function listItineraries() {
  return api.get('/itineraries')
}

export function getItinerary(itineraryId) {
  return api.get(`/itineraries/${itineraryId}`)
}

export function createItinerary({
  name,
  startDate,
  endDate,
  departureCity,
  travelerCount,
  budget,
  interests,
  destinations,
}) {
  return api.post('/itineraries', {
    name,
    start_date: startDate,
    end_date: endDate,
    departure_city: departureCity,
    traveler_count: travelerCount,
    budget,
    interests,
    destinations,
  })
}

export function addDestination(itineraryId, destination) {
  return api.post(`/itineraries/${itineraryId}/destinations`, destination)
}

export function addActivity(itineraryId, activity) {
  return api.post(`/itineraries/${itineraryId}/activities`, activity)
}
