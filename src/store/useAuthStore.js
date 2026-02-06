import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser : null,
    isCheckingAuth : true,
    isSigningUp : false,
    isLoggingIn : false,
    isLoggingOut : false,
    signUp : async (data) => {
        try{
            set({isSigningUp : true})
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data})

            toast.success("Account created successfully")
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
        } catch (err){
            toast.error("Error logging out: ", err.message);
            console.log("Logout error", err)
        } 
    }
   
}))

