const PROFILE_STORAGE_KEY = "devjobs.profile"
const MAX_UPLOAD_BYTES = 1.5 * 1024 * 1024
const MAX_STORED_AVATAR_LENGTH = 2_100_000
const USERNAME_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/
const IMAGE_DATA_PATTERN = /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/

const profileForm = document.querySelector("[data-avatar-form]")

if (profileForm) {
    const sourceSelect = profileForm.querySelector("#avatar-source")
    const nameInput = profileForm.querySelector("#profile-name")
    const usernameInput = profileForm.querySelector("#github-username")
    const urlInput = profileForm.querySelector("#avatar-url")
    const fileInput = profileForm.querySelector("#avatar-file")
    const statusMessage = profileForm.querySelector("[data-avatar-status]")
    const resetButton = profileForm.querySelector("[data-avatar-reset]")
    const sourceFields = [...profileForm.querySelectorAll("[data-avatar-source]")]
    const avatarImages = [...document.querySelectorAll("[data-avatar-image]")]
    const avatarFallbacks = [...document.querySelectorAll("[data-avatar-fallback]")]
    const profileLabels = [...document.querySelectorAll(".profile-trigger-label")]
    const profileTriggers = [...document.querySelectorAll(".profile-trigger")]

    if (
        !sourceSelect ||
        !nameInput ||
        !usernameInput ||
        !urlInput ||
        !fileInput ||
        !statusMessage ||
        !resetButton ||
        sourceFields.length === 0 ||
        avatarImages.length === 0 ||
        avatarFallbacks.length === 0
    ) {
        throw new Error("Faltan controles necesarios para configurar el avatar.")
    }

    function getInitials(name) {
        const words = name.trim().split(/\s+/).filter(Boolean)
        return words
            .slice(0, 2)
            .map((word) => Array.from(word)[0].toLocaleUpperCase("es"))
            .join("") || "JD"
    }

    function updateAvatar(profile) {
        const displayName = profile?.name || "Mi perfil"
        const avatarSrc = profile?.avatarSrc
        const hasAvatar = typeof avatarSrc === "string" && avatarSrc.length > 0

        for (const label of profileLabels) {
            label.textContent = displayName
        }

        for (const trigger of profileTriggers) {
            trigger.setAttribute("aria-label", `Perfil de ${displayName}`)
        }

        for (const fallback of avatarFallbacks) {
            fallback.textContent = getInitials(displayName)
            fallback.hidden = hasAvatar
        }

        for (const image of avatarImages) {
            image.alt = hasAvatar ? `Avatar de ${displayName}` : ""
            image.hidden = !hasAvatar
            image.referrerPolicy = "no-referrer"
            image.loading = "lazy"
            if (hasAvatar) image.src = avatarSrc
            else image.removeAttribute("src")
        }

        nameInput.value = displayName
    }

    function showStatus(message, isError = false) {
        statusMessage.textContent = message
        statusMessage.classList.toggle("is-error", isError)
    }

    function validateStoredProfile(value) {
        if (
            typeof value !== "object" ||
            value === null ||
            typeof value.name !== "string" ||
            value.name.trim().length === 0 ||
            value.name.length > 40 ||
            (value.avatarSrc !== null && typeof value.avatarSrc !== "string")
        ) {
            return null
        }

        if (value.avatarSrc === null) {
            return { name: value.name.trim(), avatarSrc: null }
        }

        if (
            value.avatarSrc.length > MAX_STORED_AVATAR_LENGTH ||
            IMAGE_DATA_PATTERN.test(value.avatarSrc)
        ) {
            return { name: value.name.trim(), avatarSrc: value.avatarSrc }
        }

        try {
            const url = new URL(value.avatarSrc)
            if (url.protocol === "https:" && !url.username && !url.password) {
                return { name: value.name.trim(), avatarSrc: url.href }
            }
        } catch {
            return null
        }

        return null
    }

    function readSavedProfile() {
        try {
            const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
            if (!storedProfile) return null

            const profile = validateStoredProfile(JSON.parse(storedProfile))
            if (!profile) localStorage.removeItem(PROFILE_STORAGE_KEY)
            return profile
        } catch (error) {
            console.error("No se pudo leer el perfil local del avatar.", error)
            return null
        }
    }

    function saveProfile(profile) {
        try {
            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
            updateAvatar(profile)
            showStatus("Avatar guardado en este navegador.")
        } catch (error) {
            console.error("No se pudo guardar el perfil local del avatar.", error)
            showStatus("No se pudo guardar. La imagen puede ser demasiado grande.", true)
        }
    }

    function updateSourceFields() {
        for (const field of sourceFields) {
            const isSelected = field.dataset.avatarSource === sourceSelect.value
            field.hidden = !isSelected
            const input = field.querySelector("input")
            if (input) {
                input.disabled = !isSelected
                input.required = isSelected
            }
        }
        showStatus("")
    }

    function validateSecureImageUrl(value) {
        let url
        try {
            url = new URL(value)
        } catch {
            throw new TypeError("Escribe una URL de imagen válida.")
        }

        if (url.protocol !== "https:" || url.username || url.password) {
            throw new TypeError("La imagen debe usar una URL HTTPS válida.")
        }

        return url.href
    }

    async function loadGitHubAvatar(username) {
        if (!USERNAME_PATTERN.test(username)) {
            throw new TypeError("Escribe un nombre de usuario válido de GitHub.")
        }

        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), 8_000)
        let response
        try {
            response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
                headers: { Accept: "application/vnd.github+json" },
                credentials: "omit",
                mode: "cors",
                redirect: "error",
                signal: controller.signal
            })
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new Error("La consulta a GitHub tardó demasiado. Inténtalo de nuevo.")
            }
            throw error
        } finally {
            window.clearTimeout(timeout)
        }
        if (!response.ok) {
            throw new Error(response.status === 404
                ? "No encontramos ese usuario público de GitHub."
                : "GitHub no pudo proporcionar el avatar. Inténtalo más tarde.")
        }

        const user = await response.json()
        const avatarUrl = new URL(user.avatar_url)
        if (
            avatarUrl.protocol !== "https:" ||
            avatarUrl.hostname !== "avatars.githubusercontent.com" ||
            avatarUrl.username ||
            avatarUrl.password
        ) {
            throw new TypeError("GitHub devolvió una URL de avatar no válida.")
        }

        return avatarUrl.href
    }

    function readUploadedImage(file) {
        if (!file) throw new TypeError("Selecciona una imagen.")

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"]
        if (!allowedTypes.includes(file.type)) {
            throw new TypeError("El archivo debe ser PNG, JPEG o WebP.")
        }
        if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
            throw new RangeError("La imagen debe pesar menos de 1.5 MB.")
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                if (
                    typeof reader.result !== "string" ||
                    reader.result.length > MAX_STORED_AVATAR_LENGTH ||
                    !IMAGE_DATA_PATTERN.test(reader.result)
                ) {
                    reject(new TypeError("No se pudo validar el contenido de la imagen."))
                    return
                }
                resolve(reader.result)
            })
            reader.addEventListener("error", () => {
                reject(reader.error ?? new Error("No se pudo leer el archivo seleccionado."))
            })
            reader.readAsDataURL(file)
        })
    }

    // Comprueba que la fuente sea una imagen decodificable y de dimensiones razonables.
    function verifyImageSource(source) {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.referrerPolicy = "no-referrer"
            image.addEventListener("load", () => {
                if (
                    image.naturalWidth === 0 ||
                    image.naturalHeight === 0 ||
                    image.naturalWidth > 4096 ||
                    image.naturalHeight > 4096 ||
                    image.naturalWidth * image.naturalHeight > 16_000_000
                ) {
                    reject(new RangeError("La imagen tiene dimensiones demasiado grandes."))
                    return
                }
                resolve()
            }, { once: true })
            image.addEventListener("error", () => {
                reject(new TypeError("No se pudo cargar esa imagen. Comprueba la URL o el archivo."))
            }, { once: true })
            image.src = source
        })
    }

    sourceSelect.addEventListener("change", updateSourceFields)
    profileForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        showStatus("Validando avatar...")

        const name = nameInput.value.trim()
        if (!name || name.length > 40) {
            showStatus("El nombre debe tener entre 1 y 40 caracteres.", true)
            return
        }

        const submitButton = profileForm.querySelector('button[type="submit"]')
        if (!(submitButton instanceof HTMLButtonElement)) {
            throw new Error("No se encontró el botón para guardar el avatar.")
        }

        submitButton.disabled = true
        try {
            let avatarSrc
            if (sourceSelect.value === "github") {
                avatarSrc = await loadGitHubAvatar(usernameInput.value.trim())
            } else if (sourceSelect.value === "url") {
                avatarSrc = validateSecureImageUrl(urlInput.value.trim())
            } else if (sourceSelect.value === "upload") {
                avatarSrc = await readUploadedImage(fileInput.files?.[0])
            } else {
                throw new TypeError("Selecciona una fuente de avatar válida.")
            }

            await verifyImageSource(avatarSrc)
            saveProfile({ name, avatarSrc })
        } catch (error) {
            console.error("No se pudo actualizar el avatar.", error)
            showStatus(error instanceof Error ? error.message : "No se pudo validar el avatar.", true)
        } finally {
            submitButton.disabled = false
        }
    })

    resetButton.addEventListener("click", () => {
        try {
            localStorage.removeItem(PROFILE_STORAGE_KEY)
            updateAvatar(null)
            profileForm.reset()
            updateSourceFields()
            showStatus("Avatar restablecido.")
        } catch (error) {
            console.error("No se pudo restablecer el avatar local.", error)
            showStatus("No se pudo restablecer el avatar.", true)
        }
    })

    for (const image of avatarImages) {
        image.addEventListener("error", () => {
            image.hidden = true
            image.removeAttribute("src")
            const fallback = image.parentElement?.querySelector("[data-avatar-fallback]")
            if (fallback instanceof HTMLElement) fallback.hidden = false
        })
    }

    updateSourceFields()
    updateAvatar(readSavedProfile())
}
