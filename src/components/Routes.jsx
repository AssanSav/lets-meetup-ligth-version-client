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
import Logout from './Logout';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/signin" render={props => <Login {...props} />} />
        <Route path="/signup" render={props => <Signup {...props} />} />
        <Route path="/logout" component={Logout}/>
        <ProtectedRoute  path="/matches" render={props => <Matches history={props} />} />
        <ProtectedRoute  path="/users" render={props => <UsersList {...props} />} />
        <ProtectedRoute  path="/my-profile/:id" render={props => <MyProfile {...props} />} />
        <ProtectedRoute  path="/new-message/:id" render={props => <ChatRoom {...props} />} />
        <ProtectedRoute  path="/upload-photos/:id" render={props => <UploadPhoto {...props} />} />
        <ProtectedRoute  path="/edit-profile/:id" render={props => <EditProfile {...props} />} />
        <ProtectedRoute  path="/profile/:id" render={props => <Profile {...props} />} />
        <ProtectedRoute  path="/received-messages" render={props => <ReceivedMessages {...props} />} />
        <ProtectedRoute  path="/sent-messages" render={props => <SentMessages {...props} />} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/signin" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
}

export default Routes;

