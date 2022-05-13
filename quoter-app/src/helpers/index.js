export const getYearDifference = year => {
  return new Date().getFullYear() - year
}

export const calculateMarca = marca => {
  let increment

  switch (marca) {
    case '1':
      increment = 1.30
      break
    case '2':
      increment = 1.15
      break
    case '3':
      increment = 1.05
    default: break
  }
  return increment
}

export const calculatePlan = plan => {
  return plan === '1' ? 1.2 : 1.5
}

export const formatMoney = quantity => {
  return quantity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}
