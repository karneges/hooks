import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrentUserContext } from '../../contexts/currentUser';
import BackendErrorMessages from './components/backend-error-messages';

const Authentication = (props) => {

  const isLogin = props.match.path === '/login';
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const descriptionLink = isLogin ? '/register' : '/login';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiUrl = isLogin ? '/users/login' : '/users';
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessfulSubmit,setIsSuccessfulSubmit] = useState(false)
  const [{ isLoading, response,error}, doFetch] = useFetch(apiUrl);
  const [,setToken] = useLocalStorage('token')
  const [,dispatch] = useContext(CurrentUserContext)
  
  
  const onhandleSubmit = (event) => {
    event.preventDefault();
    const user = isLogin ? { email, password } : { email, password, username }
    doFetch({
      method: 'post',
      data: {
        user
      }
    })
  }
  useEffect(() => {
    if (!response) {
      
      return
    }
    setToken(response.user.token)
    setIsSuccessfulSubmit(true)
    dispatch({type:'SET_AUTHORIZED',payload:response.user})
  }, [response,setToken,dispatch])

  if(isSuccessfulSubmit){
    return <Redirect to ="/"/>
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            {error && <BackendErrorMessages 
            backednErrors={error.errors}/>}
            <form
              onSubmit={onhandleSubmit}>
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input type="text"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className='form-control form-control-lg'
                      placeholder='User name' />
                  </fieldset>
                )}

                <fieldset className="form-group">
                  <input type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='form-control form-control-lg'
                    placeholder='Email' />
                </fieldset>
                <fieldset className="form-group">
                  <input type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control form-control-lg'
                    placeholder='password' />
                </fieldset>
                <button className='btn btn-lg btn-primary pull-xs-right btn-block'
                  disabled={isLoading}
                  type='submit'>
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Authentication;