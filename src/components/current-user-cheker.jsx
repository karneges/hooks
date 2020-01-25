import  { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUser';
import useLocalStorage from '../hooks/useLocalStorage';


const CurrentUserCheker = ({ children }) => {
  const [, setCurrentUserState] = useContext(CurrentUserContext)
  const [{ response }, doFetch] = useFetch('/user')
  const [token] = useLocalStorage('token')

  useEffect(() => {
    if(!token) {
      setCurrentUserState((state) => {
        return {
          ...state,
          isLoggedIn: false
        }
      })
      
      return;
    }
    doFetch();
    setCurrentUserState((state) => {
      return {
        ...state,
        isLoading: true
      }
    })
  }, [doFetch, setCurrentUserState, token])

  useEffect(() => {
    if(!response){
      return
    }
    setCurrentUserState((state) => {
      return {
       ...state,
       isLoading: false,
       currentUser: response.user,
       isLoggedIn: true,
       
      }
    })
  },[response, setCurrentUserState])

  return children
}

export default CurrentUserCheker;