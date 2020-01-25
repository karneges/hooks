import React, { useContext, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/currentUser';

const TopBar = () => {
   const [currentUserState] = useContext(CurrentUserContext);
   const {  isLoggedIn, currentUser } = currentUserState

   
   return (
      <nav className="navbar navbar-light">
         <div className="container">
            <Link to="/" className="navbar-brand">
               Medium
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
               <li className="nav-item">
                  <NavLink to="/" exact className="navbar-link">
                     Home
                  </NavLink>
               </li>
               {isLoggedIn === false && (
                  <Fragment>
                     <li className="nav-item">
                        <NavLink to="/login" className="navbar-link">
                           Sign in
                  </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink to="/register" className="navbar-link">
                           Sign up
                  </NavLink>
                     </li>
                  </Fragment>
               )}
               {isLoggedIn && (
                  <Fragment>
                     <li className='nav-item'>
                        <NavLink
                           to={`/profiles/${currentUser.username}`}
                           className="navbar-link">
                           <img className="user-pic"
                              src={currentUser.image}
                              alt=" " />
                           &nbsp;{currentUser.username}
                        </NavLink>
                     </li>
                     <li className='nav-item'>
                        <NavLink to="/articles/new"
                           className="navbar-link">
                           <i className='ion-compose'></i>
                           &nbsp; New Post
                        </NavLink>
                     </li>
                  </Fragment>
               )}

            </ul>
         </div>
      </nav>
   )
}
export default TopBar;