import {Switch,Route} from 'react-router-dom'
import React from 'react';
import GlobalFeed from './pages/globalFeed/global-feed';
import Article from './pages/article/article';
import Authentication from './pages/authentication/authentication';
import TagFeed from './pages/tagFeed/tag-feed';
import YourFeed from './pages/yourFeed/your-feed';
import CreateArticle from './pages/create-articles/create-articles';
import EditArticle from './pages/edit-article/edit-article';
import Settings from './pages/settings-page/settings-page';
import UserProfile from './pages/user-profile/user-profile';


export default () => {
    return (
        <Switch>
            <Route path="/" exact component={GlobalFeed}/>
            <Route path="/settings" exact component={Settings}/>
            <Route path="/profiles/:slug" exact  component={UserProfile}/>
            <Route path="/profiles/:slug/favorites"  component={UserProfile}/>
            <Route path="/articles/new" exact component={CreateArticle}/>
            <Route path="/articles/:slug/edit" exact component={EditArticle}/>
            <Route path="/tags/:slug"  component={TagFeed}/>
            <Route path="/feed"  component={YourFeed}/>
            <Route path="/login" component={Authentication}/>
            <Route path="/register" component={Authentication}/>
            <Route path="/articles/:slug" component={Article}/>
        </Switch>
    )
}