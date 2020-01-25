import {parse} from 'query-string'

export const range = (start,end) => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr[i] = i
  }
  return arr
}



export const limit  = 10

export const getPaginator = (search) => {
  const  parsedSearch = parse(search)  
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
  const offset = currentPage * 10 - limit
  return {currentPage,offset}

}