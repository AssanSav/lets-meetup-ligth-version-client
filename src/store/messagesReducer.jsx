import { createSlice } from "@reduxjs/toolkit"
// import moment from "moment"
import { apiCallBegan } from './middleware/http/apiActionCreator';


const slice = createSlice({
  name: "messages",
  initialState: {
    all: [],
    sent: [],
    received: [],
  },

  reducers: {
    createDMessage: (messages, action) => {
      messages.all.push(action.payload.message)
    },

    fetchedMessages: (messages, action) => {
      messages.all = action.payload.messages.data.map(m => m.attributes)
    },

    fetchedSentMessages: (messages, action) => {
      messages.sent = action.payload.sent_messages.data.map((m) => m.attributes)
    },

    fetchedReceivedMessages: (messages, action) => {
      messages.received = action.payload.received_messages.data.map((m) => m.attributes)
    },

    deletedSentMessage: (messages, action) => {
      messages.sent = messages.sent.filter(m => m.id !== action.payload.message.id)
    },

    delededReceivedMessage: (messages, action) => {
      messages.received = messages.received.filter(m => m.id !== action.payload.message.id)
    }
  }
})

const { fetchedMessages, createDMessage, fetchedSentMessages, fetchedReceivedMessages, delededReceivedMessage, deletedSentMessage } = slice.actions
export default slice.reducer


export const fetchMessages = ()  =>  {
  return apiCallBegan({
    url: "/messages",
    onSuccess: fetchedMessages.type
  })
}

export const createMessage = (formData) => apiCallBegan({
  url: "/messages",
  method: "post",
  data: formData,
  onSuccess: createDMessage.type
})

export const fetchSentMessages = () => apiCallBegan({
  url: "/messages-outbox",
  onSuccess: fetchedSentMessages.type
})

export const fetchReceivedMessages = () => apiCallBegan({
  url: "/messages-inbox",
  onSuccess: fetchedReceivedMessages.type
})

export const deleteSentMessage = (message) => apiCallBegan({
  url: `/messages/${message.id}/update_send_message`,
  method: "patch",
  data: message,
  onSuccess: deletedSentMessage.type
})

export const deleteReceivedMessage = (message) => apiCallBegan({
  url: `/messages/${message.id}/update_received_message`,
  method: "put",
  data: message,
  onSuccess: delededReceivedMessage.type
})
