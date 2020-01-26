import React from "react";
import BackendErrorMessages from "../../components/backend-error-messages";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Redirect } from "react-router-dom";

const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const apiUrl = "/user";
  const [{ response, error }, doFetch] = useFetch(apiUrl);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false);
  const [,setToken] = useLocalStorage('token')
  const handleSubmit = e => {
    e.preventDefault();
    doFetch({
      method: "put",
      data: {
        ...currentUserState.currentUser,
        image,
        name,
        bio,
        email,
        password
      }
    });
  };
  const logout = (e) => {
    e.preventDefault()
    setToken('')
    dispatch({type:'LOGOUT'})
    setIsSuccessfullLogout(true)
   
  };


  useEffect(() => {
    if (!currentUserState.currentUser) {
      return;
    }
    const { image, username, bio, email } = currentUserState.currentUser;
    setImage(image);
    setName(username);
    setBio(bio);
    setEmail(email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, dispatch]);

  if(isSuccessfullLogout){
    return <Redirect to='/'/>
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Short bio"
                    value={bio}
                    rows="8"
                    onChange={e => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="New password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
