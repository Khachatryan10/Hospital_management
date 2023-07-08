import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface NotificationsDataTypes {
    id: string,
    sender_name: string,
    sender_last_name: string,
    seen: boolean
}

interface  NotificationsI {
    notifications: NotificationsDataTypes[]
}

const initialState: NotificationsI = {
    notifications: []
} 

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotificationData: (state, action:PayloadAction<NotificationsDataTypes>) => {
                state.notifications.push(action.payload)
        },

        updateNotificationSeen: (state, action:PayloadAction<string>) => {
            state.notifications.map(data => {
                if (data.id === action.payload){
                    data.seen = true
                }
                return data
            })
        },

        removeNotificationData: (state) => {
            state.notifications = []
        }

    }
})

export const notificationsSliceReducer = notificationsSlice.reducer
export const { addNotificationData, updateNotificationSeen, removeNotificationData} = notificationsSlice.actions