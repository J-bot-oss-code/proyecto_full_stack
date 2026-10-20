import { loadJobs } from "./jobs-data.js"
import "./avatar.js"

// Lee el identificador del empleo desde la URL.
const jobId = new URLSearchParams(window.location.search).get("id")
const detailContainer = document.querySelector("#job-detail")
const breadcrumbTitle = document.querySelector("#breadcrumb-title")

if (!detailContainer || !breadcrumbTitle) {
    throw new Error("No se encontraron los elementos necesarios para mostrar el empleo.")
}

// Crea secciones de texto sin interpretar los datos del JSON como HTML.
function createTextSection(title, text) {
    const section = document.createElement("section")
    section.className = "job-detail-section"

    const heading = document.createElement("h2")
    heading.textContent = title

    const paragraph = document.createElement("p")
    paragraph.textContent = text

    section.append(heading, paragraph)
    return section
}

// Crea listas con texto plano para responsabilidades o requisitos.
function createListSection(title, items) {
    const section = document.createElement("section")
    section.className = "job-detail-section"

    const heading = document.createElement("h2")
    heading.textContent = title

    const list = document.createElement("ul")
    list.className = "job-detail-list"

    for (const item of items) {
        const listItem = document.createElement("li")
        listItem.textContent = item
        list.append(listItem)
    }

    section.append(heading, list)
    return section
}

// Muestra el error como texto y conserva el detalle técnico en la consola.
function showDetailError(message, error) {
    if (error) console.error(message, error)
    const errorMessage = document.createElement("p")
    errorMessage.className = "job-not-found"
    errorMessage.textContent = message
    detailContainer.replaceChildren(errorMessage)
}

// Conecta ambos botones para que la postulación tenga un solo estado visual.
function connectApplyButtons(applyButton, bottomApplyButton) {
    for (const button of [applyButton, bottomApplyButton]) {
        button.addEventListener("click", () => {
            for (const applyAction of [applyButton, bottomApplyButton]) {
                applyAction.textContent = "Postulación enviada"
                applyAction.classList.add("is-applied")
                applyAction.disabled = true
            }
        })
    }
}

// Construye la página con elementos DOM y texto plano, nunca con HTML del JSON.
function renderJob(job) {
    document.title = `${job.title} | DevJobs`
    breadcrumbTitle.textContent = job.title

    const heading = document.createElement("header")
    heading.className = "job-detail-heading"

    const headingText = document.createElement("div")
    const title = document.createElement("h1")
    title.textContent = job.title
    const company = document.createElement("p")
    company.className = "job-detail-company"
    company.textContent = `${job.company} · ${job.location}`
    headingText.append(title, company)

    const applyButton = document.createElement("button")
    applyButton.type = "button"
    applyButton.className = "btn-apply"
    applyButton.textContent = "Aplicar ahora"
    heading.append(headingText, applyButton)

    const tags = document.createElement("div")
    tags.className = "job-detail-tags"
    for (const tag of [job.contract, job.experience, ...job.technologies]) {
        const tagElement = document.createElement("span")
        tagElement.className = "job-detail-tag"
        tagElement.textContent = tag
        tags.append(tagElement)
    }

    const bottomAction = document.createElement("div")
    bottomAction.className = "job-detail-bottom-action"
    const bottomApplyButton = applyButton.cloneNode(true)
    bottomAction.append(bottomApplyButton)
    connectApplyButtons(applyButton, bottomApplyButton)

    detailContainer.replaceChildren(
        heading,
        createTextSection("Descripción del puesto", job.description),
        createListSection("Responsabilidades", job.responsibilities),
        createListSection("Requisitos", job.requirements),
        createTextSection("Acerca de la empresa", job.aboutCompany),
        tags,
        bottomAction
    )
}

// Carga los datos validados y busca el empleo solicitado por su identificador.
async function loadJobDetail() {
    if (!jobId) {
        showDetailError("No se indicó qué empleo quieres consultar.")
        return
    }

    try {
        const jobs = await loadJobs()
        const job = jobs.find((item) => item.id === jobId)

        if (!job) {
            showDetailError("No encontramos ese empleo. Vuelve a la búsqueda para elegir otro.")
            return
        }

        renderJob(job)
    } catch (error) {
        showDetailError(
            "No se pudo cargar el detalle del empleo. Comprueba data.json e inténtalo de nuevo.",
            error
        )
    }
}

loadJobDetail()
