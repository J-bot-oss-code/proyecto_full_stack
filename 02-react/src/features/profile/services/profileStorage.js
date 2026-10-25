const PROFILE_STORAGE_KEY = 'devjobs.profile'
const MAX_STORED_AVATAR_LENGTH = 2_100_000
const IMAGE_DATA_PATTERN = /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/

export function getSavedProfile() {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!storedProfile) return null

    const value = JSON.parse(storedProfile)
    if (
      typeof value !== 'object' ||
      value === null ||
      typeof value.name !== 'string' ||
      value.name.trim().length === 0 ||
      value.name.length > 40 ||
      (value.avatarSrc !== null && typeof value.avatarSrc !== 'string')
    ) {
      localStorage.removeItem(PROFILE_STORAGE_KEY)
      return null
    }

    if (value.avatarSrc?.length > MAX_STORED_AVATAR_LENGTH) {
      localStorage.removeItem(PROFILE_STORAGE_KEY)
      return null
    }

    if (value.avatarSrc === null) return { name: value.name.trim(), avatarSrc: null }
    if (IMAGE_DATA_PATTERN.test(value.avatarSrc)) {
      return { name: value.name.trim(), avatarSrc: value.avatarSrc }
    }

    const avatarUrl = new URL(value.avatarSrc)
    if (avatarUrl.protocol === 'https:' && !avatarUrl.username && !avatarUrl.password) {
      return { name: value.name.trim(), avatarSrc: avatarUrl.href }
    }

    localStorage.removeItem(PROFILE_STORAGE_KEY)
    return null
  } catch (error) {
    console.error('No se pudo leer el perfil local del avatar.', error)
    return null
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}

export function removeSavedProfile() {
  localStorage.removeItem(PROFILE_STORAGE_KEY)
}
