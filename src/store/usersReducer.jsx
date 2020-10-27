import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './middleware/http/apiActionCreator';


const slice = createSlice({
  name: "users",
  initialState: {
    all: [],
    user: {},
    profile: {},
    interests: [],
    matches: [],
    status: false,
    loading: true,
  },

  reducers: {
    session: (users, action) => {
      users.loading = true
      users.status = action.payload.loggedIn
      users.user = action.payload.user.data.attributes;
      users.all = action.payload.users
      users.interests = action.payload.user.data.attributes.interests
    },

    signin: (users, action) => {
      users.user = action.payload.user.data.attributes;
      users.status = action.payload.loggedIn
    },

    signup: (users, action) => {
      users.user = action.payload.user.data.attributes;
      users.status = action.payload.loggedIn;
    },

    fetchedUsers: (users, action) => {
      users.all = action.payload.users.data.map((u) => u.attributes);
    },

    fetchedProfile: (users, action) => {
      users.profile = action.payload.user.data.attributes;
      users.myInterests = action.payload.interests
    },

    fetchedMatches: (users, action) => {
      users.matches = action.payload.matches
    },

    upLoadedPhoto: (users, action) => {
      users.user = action.payload.user.data.attributes;
      users.status = true;
    },

    editedProfile: (users, action) => {
      users.user = action.payload.user.data.attributes;
      users.myInterests = action.payload.interests
    },

    deletedUser: (users, action) => {
      users.user = {};
      users.status = false
    },

    logout: (users, action) => {
      users.user = {};
      users.status = false;
    }
  }
})

const { session, signin, signup, deletedUser, logout, upLoadedPhoto, editedProfile, fetchedUsers, fetchedProfile, fetchedMatches } = slice.actions
export default slice.reducer


export const sessionStatus = () => apiCallBegan({
  url: "/session/status",
  onSuccess: session.type,
})

export const signupUser = (formData) => {
  return apiCallBegan({
    url: "/users",
    method: "post",
    data: formData,
    onSuccess: signup.type
  })
}

export const signinUser = (formData) => {
  return apiCallBegan({
    url: "/login",
    method: "post",
    data: formData,
    onSuccess: signin.type
  })
}

export const editProfile = (user) => {
  const {age, bio, body_shape, children, city, educattion, email, ethnicity, gender, height, id, interests, orientation, relationship, username, visibility} = user
  const interest_ids = interests.filter(i => i.id)
  // debugger
  return apiCallBegan({
    url: `users/${user.id}`,
    method: "patch",
    data: { user: { age, bio, interest_ids, body_shape, children, city, educattion, email, ethnicity, gender, height, id, orientation, relationship, username, visibility}},
    onSuccess: editedProfile.type
  })
}

export const uploadPhoto = (formData) => {
  return apiCallBegan({
    url: `/avatars/${formData.user_id}`,
    method: "patch",
    data: formData,
    onSuccess: upLoadedPhoto.type
  })
}

export const deleteUser = (user) => apiCallBegan({
  url: `/users/${user.id}`,
  method: "delete",
  data: user,
  onSuccess: deletedUser.type
})

export const logoutUser = (userId) => apiCallBegan({
  url: `/logout/${userId}`,
  method: "delete",
  onSuccess: logout.type
})

export const fetchUsers = () => apiCallBegan({
  url: "/users",
  onSuccess: fetchedUsers.type
})

export const fetchProfile = (profileId) => apiCallBegan({
  url: `users/${profileId}`,
  onSuccess: fetchedProfile.type
})

export const fetchMatches = () => apiCallBegan({
  url: "/matches",
  onSuccess: fetchedMatches.type
})