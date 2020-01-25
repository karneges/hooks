import {Switch,Route} from 'react-router-dom'
import React from 'react';
import GlobalFeed from './pages/globalFeed/global-feed';
import Article from './pages/article/article';
import Authentication from './pages/authentication/authentication';
import TagFeed from './pages/tagFeed/tag-feed';
import YourFeed from './pages/yourFeed/your-feed';


export default () => {
    return (
        <Switch>
            <Route path="/" exact component={GlobalFeed}/>
            <Route path="/tags/:slug"  component={TagFeed}/>
            <Route path="/feed"  component={YourFeed}/>
            <Route path="/login" component={Authentication}/>
            <Route path="/register" component={Authentication}/>
            <Route path="/article/:slug" component={Article}/>
        </Switch>
    )
}