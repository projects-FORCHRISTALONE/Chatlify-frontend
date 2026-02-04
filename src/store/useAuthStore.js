import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    authUser : {name : "unworthyslaveTOCHRIST", id : 123, },
    isLoading : false,
    login : ()=>{
        console.log("ALL THANKS AND GLORY TO THE LORD ALONE")
        set({isLoading : true})
    }
}))

