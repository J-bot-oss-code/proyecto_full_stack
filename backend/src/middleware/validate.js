const requiredStringFields = [
  'title',
  'company',
  'location',
  'technology',
  'contract',
  'experience',
  'description',
  'aboutCompany',
]

const requiredListFields = ['technologies', 'responsibilities', 'requirements']

export const validateJob = (req, res, next) => {
  const body = req.body

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({
      status: 'fail',
      message: 'El cuerpo de la solicitud debe ser un objeto JSON válido.',
    })
  }

  const errors = []

  for (const field of requiredStringFields) {
    if (
      typeof body[field] !== 'string' ||
      body[field].trim().length === 0
    ) {
      errors.push(`El campo "${field}" es obligatorio y debe ser un texto no vacío.`)
    }
  }

  for (const field of requiredListFields) {
    if (
      !Array.isArray(body[field]) ||
      body[field].length === 0 ||
      body[field].some((item) => typeof item !== 'string' || item.trim().length === 0)
    ) {
      errors.push(`El campo "${field}" debe ser una lista con al menos un elemento.`)
    }
  }

  if (body.technologies && !body.technologies.includes(body.technology)) {
    errors.push('La tecnología principal debe estar incluida en la lista de tecnologías.')
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Errores de validación.',
      errors,
    })
  }

  next()
}
