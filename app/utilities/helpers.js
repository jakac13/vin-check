export const kmDriven = (carData) => {
    const kmRange = carData?.razpon_km;
    const km = carData?.km;
    let result = {text: 'No data', color: 'black'}

    if (kmRange === '+0'){
      result = {text: '0-10.000', color: 'green'}
    } else if (kmRange === '+10000') {
      result = {text: km, color: 'green'}
    } else if(kmRange === '+50000') {
      result = {text: km, color: '#a3cc61'}
    } else if(kmRange === '+100000') {
      result = {text: km, color: '#a2a63c'}
    } else if(kmRange === '+150000') {
      result = {text: km, color: '#a2a63c'}
    } else if (kmRange === '+200000') {
      result = {text: km, color: 'orange'}
    } else if (kmRange === '+300000') {
      result = {text: km, color: 'red'}
    }
    return result;
}