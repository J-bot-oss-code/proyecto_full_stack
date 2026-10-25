import { useRef, useState } from 'react'
import { getInitials, resolveAvatarSource, validateAvatarSource } from '../services/avatarService.js'
import { getSavedProfile, removeSavedProfile, saveProfile } from '../services/profileStorage.js'

export default function ProfileMenu() {
  const [profile, setProfile] = useState(getSavedProfile)
  const [name, setName] = useState(() => profile?.name ?? 'Mi perfil')
  const [source, setSource] = useState('github')
  const [githubUsername, setGithubUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [status, setStatus] = useState('')
  const [statusIsError, setStatusIsError] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const fileInput = useRef(null)
  const displayName = profile?.name ?? 'Mi perfil'
  const hasAvatar = Boolean(profile?.avatarSrc) && !imageFailed

  async function handleSubmit(event) {
    event.preventDefault()
    setStatusIsError(false)
    setStatus('Validando avatar...')

    const trimmedName = name.trim()
    if (!trimmedName || trimmedName.length > 40) {
      setStatus('El nombre debe tener entre 1 y 40 caracteres.')
      setStatusIsError(true)
      return
    }

    setIsSaving(true)
    try {
      const avatarSrc = await resolveAvatarSource({
        source,
        githubUsername: githubUsername.trim(),
        avatarUrl: avatarUrl.trim(),
        avatarFile,
      })
      await validateAvatarSource(avatarSrc)
      const nextProfile = { name: trimmedName, avatarSrc }
      saveProfile(nextProfile)
      setProfile(nextProfile)
      setImageFailed(false)
      setStatus('Avatar guardado en este navegador.')
    } catch (error) {
      console.error('No se pudo actualizar el avatar.', error)
      setStatus(error instanceof Error ? error.message : 'No se pudo validar el avatar.')
      setStatusIsError(true)
    } finally {
      setIsSaving(false)
    }
  }

  function handleReset() {
    try {
      removeSavedProfile()
      setProfile(null)
      setName('Mi perfil')
      setSource('github')
      setGithubUsername('')
      setAvatarUrl('')
      setAvatarFile(null)
      if (fileInput.current) fileInput.current.value = ''
      setImageFailed(false)
      setStatus('Avatar restablecido.')
      setStatusIsError(false)
    } catch (error) {
      console.error('No se pudo restablecer el avatar local.', error)
      setStatus('No se pudo restablecer el avatar.')
      setStatusIsError(true)
    }
  }

  return (
    <details className="profile-menu">
      <summary className="profile-trigger" aria-label={`Perfil de ${displayName}`}>
        {!hasAvatar && (
          <span className="avatar-fallback" aria-hidden="true">{getInitials(displayName)}</span>
        )}
        {hasAvatar && (
          <img
            className="profile-avatar"
            src={profile.avatarSrc}
            alt={`Avatar de ${displayName}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="profile-trigger-label">{displayName}</span>
      </summary>
      <form className="profile-panel" onSubmit={handleSubmit}>
        <h2>Personaliza tu avatar</h2>
        <label htmlFor="profile-name">Nombre para mostrar</label>
        <input
          id="profile-name"
          type="text"
          maxLength="40"
          autoComplete="nickname"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="avatar-source">Fuente del avatar</label>
        <select
          id="avatar-source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value)
            setStatus('')
          }}
        >
          <option value="github">GitHub</option>
          <option value="url">URL de imagen HTTPS</option>
          <option value="upload">Subir imagen</option>
        </select>

        {source === 'github' && (
          <div className="avatar-source-field">
            <label htmlFor="github-username">Usuario público de GitHub</label>
            <input
              id="github-username"
              type="text"
              maxLength="39"
              autoComplete="off"
              placeholder="octocat"
              value={githubUsername}
              onChange={(event) => setGithubUsername(event.target.value)}
              required
            />
          </div>
        )}
        {source === 'url' && (
          <div className="avatar-source-field">
            <label htmlFor="avatar-url">URL de imagen (HTTPS)</label>
            <input
              id="avatar-url"
              type="url"
              maxLength="2048"
              autoComplete="url"
              placeholder="https://ejemplo.com/avatar.jpg"
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
              required
            />
          </div>
        )}
        {source === 'upload' && (
          <div className="avatar-source-field">
            <label htmlFor="avatar-file">Imagen PNG, JPEG o WebP (máx. 1.5 MB)</label>
            <input
              ref={fileInput}
              id="avatar-file"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)}
              required
            />
          </div>
        )}

        <p className="profile-note">
          Se guarda solo en este navegador. GitHub usa el avatar público; no inicia sesión.
        </p>
        <p className={`profile-status${statusIsError ? ' is-error' : ''}`} role="status" aria-live="polite">
          {status}
        </p>
        <div className="profile-actions">
          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Validando...' : 'Guardar avatar'}
          </button>
          <button type="button" onClick={handleReset} disabled={isSaving}>Restablecer</button>
        </div>
      </form>
    </details>
  )
}
