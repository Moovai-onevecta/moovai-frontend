import { api, ApiError } from './api'

/** Returns the caller's traveler profile, or null if they haven't completed signup yet. */
export async function getMyProfile() {
  try {
    return await api.get('/users/me')
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null
    throw err
  }
}

export function upsertMyProfile(payload) {
  return api.put('/users/me', payload)
}
