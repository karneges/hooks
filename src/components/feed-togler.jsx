import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/currentUserContext';

const FeedToggler = ({ tagName }) => {

  const [currentUserState] = useContext(CurrentUserContext)

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn &&(
        <li className="nav-item">
          <NavLink to="/feed"
            className='nav-link'>
            Your Feed
          </NavLink>
        </li>
        )}
        <li className="nav-item">
          <NavLink to="/" 
            className='nav-link' exact>
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`}
              className='nav-link' exact>
              {tagName}
              <i className='ion-pound'></i>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FeedToggler;