export   const calculateAverageLast = (
    a?: number | null,
    b?: number | null,
    c?: number | null
  ): number | string => {
    let array = []
    typeof a === 'number' ? array.push(a) : null
    typeof b === 'number' ? array.push(b) : null
    typeof c === 'number' ? array.push(c) : null
    const sum = array.reduce((a, b) => a + b, 0)
    const average = sum / array.length
    if (array.length > 0) {
      return Number(average.toFixed(2))
    } else {
      return 'Data not available at this time'
    }
  }