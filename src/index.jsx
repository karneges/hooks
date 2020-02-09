import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import Routes from './route';
import TopBar from './components/top-bar';
import {  CurrentUserProvider } from './contexts/currentUserContext';
import CurrentUserCheker from './components/current-user-cheker';
const App = () => {
    return (
        <CurrentUserProvider>
            <CurrentUserCheker>
                <Router>
                    <TopBar />
                    <Routes />
                </Router>
            </CurrentUserCheker>
        </CurrentUserProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


