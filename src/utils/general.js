const validateRut = (rutText) => {
  const regex = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/

  if (!regex.test(rutText)) return false

  let tmp = rutText.split('-')
  let digv = tmp[1]
  let rut = tmp[0]
  if (digv == 'K') digv = 'k'
  return dv(rut) == digv
}

const dv = (T) => {
  let M = 0,
    S = 1

  for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11
  return S ? S - 1 : 'k'
}

export const validateDni = (dni) => {
  return validateRut(dni)
}
