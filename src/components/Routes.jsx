import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import Login from './SigninForm';
import Signup from './SignupForm';
import UsersList from './UsersList';
import Profile from './Profile';
import Matches from './Matches';
import MyProfile from './MyProfile';
import SentMessages from './SentMessages';
import ReceivedMessages from './ReceivedMessages';
import ChatRoom from './ChatRoom';
import UploadPhoto from './UploadPhoto';
import ProtectedRoute from '../common/protectedRoute';
import EditProfile from './EditProfile';
import NotFound from './NotFond';

const Routes = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/my-profile/:id" render={props => (<MyProfile {...props} />)} />
        <ProtectedRoute exact path="/new-message/:id" render={props => (<ChatRoom {...props} />)} />
        <ProtectedRoute exact path="/upload-photos/:id" render={props => <UploadPhoto {...props} />} />
        <ProtectedRoute exact path="/edit-profile/:id" render={props => (<EditProfile {...props} />)} />
        <ProtectedRoute exact path="/profile/:id" render={props => <Profile {...props} />} />
        <ProtectedRoute exact path="/received-messages" render={props => (<ReceivedMessages {...props} />)} />
        <ProtectedRoute exact path="/sent-messages" render={props => (<SentMessages {...props} />)} />
        <ProtectedRoute exact path="/matches" render={props => <Matches history={props} />} />
        <ProtectedRoute exact path="/users" render={props => <UsersList {...props} />} />
        <Route exact path="/signin" render={props => <Login {...props} />} />
        <Route exact path="/signup" render={props => <Signup {...props} />} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
}

export default Routes;

