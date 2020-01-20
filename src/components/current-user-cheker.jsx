import React, { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUser';
import useLocalStorage from '../hooks/useLocalStorage';


const CurrentUserCheker = ({ children }) => {
  const [CurrentUserState, setCurrentUserState] = useContext(CurrentUserContext)
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
  }, [])

  useEffect(() => {
    if(!response){
      return
    }
    setCurrentUserState((state) => {
      return {
       ...state,
       isLoading: false,
       isLoggedIn: true,
       currentUser: response.user
      }
    })
  },[response])

  return children
}

export default CurrentUserCheker;