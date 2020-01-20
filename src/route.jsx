import {Switch,Route} from 'react-router-dom'
import React from 'react';
import GlobalFeed from './pages/globalFeed/global-feed';
import Article from './pages/article/article';
import Authentication from './pages/authentication/authentication';
export default () => {
    return (
        <Switch>
            <Route path="/" exact component={GlobalFeed}/>
            <Route path="/login" component={Authentication}/>
            <Route path="/register" component={Authentication}/>
            <Route path="/articles/:slug" component={Article}/>
        </Switch>
    )
}