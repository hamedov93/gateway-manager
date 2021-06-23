export const api_url = 'http://localhost:3000/api'

export const apiUrl = uri => uri ? api_url + '/' + uri : api_url

export const myNumber = val => isNaN(val) ? 0 : Math.round(Number(val) * 100)/100

export const ucFirst = str => {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
}

export const isObject = obj => {
  var type = typeof obj
  return (type === 'function') || (type === 'object' && !!obj);
}
