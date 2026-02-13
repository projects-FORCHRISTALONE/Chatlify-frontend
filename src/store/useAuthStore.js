import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"
export const useAuthStore = create((set,get)=>({
    authUser : null,
    isCheckingAuth : true,
    isSigningUp : false,
    isLoggingIn : false,
    isLoggingOut : false,
    socket : null,
    onlineUsers: null,
    signUp : async (data) => {
        try{
            set({isSigningUp : true})
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data})

            toast.success("Account created successfully")
            get().connectSocket()
        }catch(err){
            toast.error(err.response.data.message)
        } finally {
            set({isSigningUp : false})
        }
    },
    checkAuth : async () => {
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
            get().connectSocket()
        } catch(err){
            console.log('Error in authCheck', err)
            set({authUser: null})
        } finally {
            set({isCheckingAuth : false})
        }
    },
    login: async (data) => {
        try{
            set({isLoggingIn : true})
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data})

            toast.success("Logged In successfully")

            get().connectSocket()
        }catch(err){
            toast.error(err.response.data.message)
        } finally {
            set({isLoggingIn : false})
        }
    },

    logout : async () => {
        try{
            const res = await axiosInstance.post("/auth/logout");
            set({authUser : null});
            toast.success("Logged out successfully");
            get().disconnectSocket()
        } catch (err){
            toast.error("Error logging out: ", err.message);
            console.log("Logout error", err)
        } 
    },

    updateProfile : async (data) => {
        try {
            const res = await axiosInstance.put('/auth/update-profile',data);
            set({authUser : res.data})
            toast.success("Profile updated successfully")

        } catch (err) {
            console.log("Error in update profile:", err);
            toast.error(err.response.data.message)
        }
    },

    connectSocket : () => {
        const {authUser} = get()
        if (!authUser || get().socket?.connected) return ;

        const socket = io(BASE_URL, {
            withCredentials : true
        })

        socket.connect();

        set({socket: socket});

        //listen for online users event
        socket.on("getOnlineUsers", (userIds)=>{
            set({onlineUsers: userIds})
        })

    },

    disconnectSocket: ()=> {
        if (get().socket?.connected) get().socket.disconnect();
    },
   
}))

