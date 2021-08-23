import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import MovieList from './components/FetchData';
import Login from './components/Login';
import MovieDetails from './components/MovieDetails';
import BookMyShow from './components/BookMyShow';

import './custom.css'

export default () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/movielist' component={MovieList} />
            <Route exact path='/movie/:id' component={MovieDetails} />
            <Route exact path='/movie/book/:id' component={BookMyShow} />
        </Switch>
    </Layout>
);
