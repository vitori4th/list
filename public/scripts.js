function checkField(event) {
  const valueToCheck = ['item']

  const isEmpty = valueToCheck.find(function (value) {
    const checkIfIsString = typeof event.target[value].value === 'string'
    const checkIsEmpty = !event.target[value].value.trim()

    if (checkIfIsString && checkIsEmpty) {
      return true
    }
  })

  if (isEmpty) {
    event.preventDefault()
    alert('Por favor, preencha o campo vazio!')
  }
}
