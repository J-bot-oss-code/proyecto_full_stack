const MAX_UPLOAD_BYTES = 1.5 * 1024 * 1024
const MAX_STORED_AVATAR_LENGTH = 2_100_000
const USERNAME_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/
const IMAGE_DATA_PATTERN = /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/

export function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => Array.from(word)[0].toLocaleUpperCase('es'))
    .join('') || 'JD'
}

function validateSecureImageUrl(value) {
  let url
  try {
    url = new URL(value)
  } catch (cause) {
    throw new TypeError('Escribe una URL de imagen válida.', { cause })
  }

  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new TypeError('La imagen debe usar una URL HTTPS válida.')
  }

  return url.href
}

async function loadGitHubAvatar(username) {
  if (!USERNAME_PATTERN.test(username)) {
    throw new TypeError('Escribe un nombre de usuario válido de GitHub.')
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 8_000)
  let response
  try {
    response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: { Accept: 'application/vnd.github+json' },
      credentials: 'omit',
      mode: 'cors',
      redirect: 'error',
      signal: controller.signal,
    })
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      throw new Error('La consulta a GitHub tardó demasiado. Inténtalo de nuevo.', { cause })
    }
    throw cause
  } finally {
    window.clearTimeout(timeout)
  }

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? 'No encontramos ese usuario público de GitHub.'
        : 'GitHub no pudo proporcionar el avatar. Inténtalo más tarde.',
    )
  }

  const user = await response.json()
  const avatarUrl = new URL(user.avatar_url)
  if (
    avatarUrl.protocol !== 'https:' ||
    avatarUrl.hostname !== 'avatars.githubusercontent.com' ||
    avatarUrl.username ||
    avatarUrl.password
  ) {
    throw new TypeError('GitHub devolvió una URL de avatar no válida.')
  }

  return avatarUrl.href
}

function readUploadedImage(file) {
  if (!file) throw new TypeError('Selecciona una imagen.')
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    throw new TypeError('El archivo debe ser PNG, JPEG o WebP.')
  }
  if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
    throw new RangeError('La imagen debe pesar menos de 1.5 MB.')
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (
        typeof reader.result !== 'string' ||
        reader.result.length > MAX_STORED_AVATAR_LENGTH ||
        !IMAGE_DATA_PATTERN.test(reader.result)
      ) {
        reject(new TypeError('No se pudo validar el contenido de la imagen.'))
        return
      }
      resolve(reader.result)
    })
    reader.addEventListener('error', () => {
      reject(reader.error ?? new Error('No se pudo leer el archivo seleccionado.'))
    })
    reader.readAsDataURL(file)
  })
}

function verifyImageSource(source) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.referrerPolicy = 'no-referrer'
    image.addEventListener('load', () => {
      if (
        image.naturalWidth === 0 ||
        image.naturalHeight === 0 ||
        image.naturalWidth > 4096 ||
        image.naturalHeight > 4096 ||
        image.naturalWidth * image.naturalHeight > 16_000_000
      ) {
        reject(new RangeError('La imagen tiene dimensiones demasiado grandes.'))
        return
      }
      resolve()
    }, { once: true })
    image.addEventListener('error', () => {
      reject(new TypeError('No se pudo cargar esa imagen. Comprueba la URL o el archivo.'))
    }, { once: true })
    image.src = source
  })
}

export async function resolveAvatarSource({ source, githubUsername, avatarUrl, avatarFile }) {
  if (source === 'github') return loadGitHubAvatar(githubUsername)
  if (source === 'url') return validateSecureImageUrl(avatarUrl)
  if (source === 'upload') return readUploadedImage(avatarFile)
  throw new TypeError('Selecciona una fuente de avatar válida.')
}

export async function validateAvatarSource(source) {
  await verifyImageSource(source)
}
