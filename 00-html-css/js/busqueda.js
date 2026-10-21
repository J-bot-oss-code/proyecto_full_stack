import { loadJobs as fetchJobs } from "./jobs-data.js"
import "./avatar.js"

// Guardamos los elementos de la página para leer filtros y actualizar resultados.
const jobListSection = document.querySelector("#job-listings")
const searchForm = document.querySelector("#job-search-form")
const searchInput = document.querySelector("#job-search")
const technologyFilter = document.querySelector("#technology-filter")
const locationFilter = document.querySelector("#location-filter")
const contractFilter = document.querySelector("#contract-filter")
const experienceFilter = document.querySelector("#experience-filter")
const resultCount = document.querySelector("#results-count")
const emptyState = document.querySelector("#empty-state")

if (
    !jobListSection ||
    !searchForm ||
    !searchInput ||
    !technologyFilter ||
    !locationFilter ||
    !contractFilter ||
    !experienceFilter ||
    !resultCount ||
    !emptyState
) {
    throw new Error("No se encontraron todos los elementos necesarios para buscar empleos.")
}

let jobs = []

// Si la búsqueda llega desde inicio.html, coloca el término en el campo de búsqueda.
const initialSearch = new URLSearchParams(window.location.search).get("q")
if (initialSearch) {
    searchInput.value = initialSearch.trim().slice(0, 120)
}

// Normalizamos texto para que las búsquedas ignoren mayúsculas y tildes.
function normalizeText(value) {
    return value
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

// Comprueba si un empleo coincide con el texto y los filtros seleccionados.
function jobMatchesFilters(job, searchTerm) {
    const searchableText = normalizeText(
        [
            job.title,
            job.company,
            job.location,
            job.description,
            job.technology,
            ...job.technologies
        ].join(" ")
    )

    return (
        searchableText.includes(searchTerm) &&
        (!technologyFilter.value || job.technologies.includes(technologyFilter.value)) &&
        (!locationFilter.value || job.location === locationFilter.value) &&
        (!contractFilter.value || job.contract === contractFilter.value) &&
        (!experienceFilter.value || job.experience === experienceFilter.value)
    )
}

// Crea una tarjeta desde los datos del JSON y agrega atributos para consultarlos en el DOM.
function createJobCard(job) {
    const card = document.createElement("article")
    card.className = "job-card"
    card.dataset.technology = job.technology
    card.dataset.contract = job.contract
    card.dataset.experience = job.experience
    card.dataset.location = job.location

    const info = document.createElement("div")
    info.className = "job-info"

    const title = document.createElement("h3")
    const detailLink = document.createElement("a")
    detailLink.className = "job-detail-link"
    detailLink.href = `detalle-empleo.html?id=${encodeURIComponent(job.id)}`
    detailLink.textContent = job.title
    title.append(detailLink)

    const companyLocation = document.createElement("p")
    companyLocation.className = "company-location"
    companyLocation.textContent = `${job.company} | ${job.location} | ${job.experience}`

    const description = document.createElement("p")
    description.className = "job-description"
    description.textContent = job.description

    const tags = document.createElement("p")
    tags.className = "job-tags"
    tags.textContent = `${job.technologies.join(" · ")} · ${job.contract}`

    info.append(title, companyLocation, description, tags)

    const action = document.createElement("div")
    action.className = "job-action"
    const applyButton = document.createElement("button")
    applyButton.type = "button"
    applyButton.className = "btn-apply"
    applyButton.textContent = "Aplicar"
    applyButton.setAttribute("aria-label", `Aplicar a ${job.title}`)
    action.append(applyButton)

    card.append(info, action)
    return card
}

// Renderiza solo los empleos que coinciden y actualiza el mensaje de resultados.
function renderJobs() {
    const searchTerm = normalizeText(searchInput.value.trim().slice(0, 120))
    const matchingJobs = jobs.filter((job) => jobMatchesFilters(job, searchTerm))

    jobListSection.replaceChildren(...matchingJobs.map(createJobCard))
    resultCount.textContent = `(${matchingJobs.length} ${matchingJobs.length === 1 ? "empleo" : "empleos"})`
    emptyState.hidden = matchingJobs.length > 0
}

// Muestra un error visible si el navegador no puede cargar o interpretar data.json.
function showLoadingError(error) {
    console.error("No se pudieron cargar los empleos desde data.json.", error)
    jobListSection.replaceChildren()
    resultCount.textContent = ""
    emptyState.hidden = false
    emptyState.textContent = "No se pudieron cargar los empleos. Comprueba data.json y vuelve a intentarlo."
}

// Descarga y valida el JSON antes de permitir que los filtros muestren empleos.
async function loadJobs() {
    try {
        jobs = await fetchJobs()
        renderJobs()
    } catch (error) {
        showLoadingError(error)
    }
}

// La búsqueda se actualiza al escribir, enviar el formulario o cambiar un filtro.
searchInput.addEventListener("input", renderJobs)
searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    renderJobs()
})

for (const filter of [technologyFilter, locationFilter, contractFilter, experienceFilter]) {
    filter.addEventListener("change", renderJobs)
}

// Delegación de eventos: un solo listener sirve para todos los botones de postulación.
jobListSection.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return

    const applyButton = event.target.closest(".btn-apply")
    if (!applyButton) return

    applyButton.textContent = "Postulación enviada"
    applyButton.classList.add("is-applied")
    applyButton.disabled = true
})

loadJobs()
