import { ToastId, useToast } from "@chakra-ui/react";
import {  ReactNode, useEffect, useRef, useState } from "react"
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/services/networkSlice";
interface IProps{
    children:ReactNode;
}
const InternetConnectionProvider = ({children}:IProps)=>{
    const toast = useToast();
    const dispatch = useDispatch();
    const toastIdRef = useRef<ToastId|undefined>(undefined);
    const [isOnLine,setIsOnline]=useState(true);

    function close(){
        if(toastIdRef.current){
            toast.close(toastIdRef.current);
        }
    }

    function addToast(){
        toastIdRef.current=toast({
            title:"You're offline",
            description:'Please make sure you have internet connection',
            status:"warning",
            duration:null,
            isClosable:true,
            icon:<BsWifiOff />
        })
    }

    function onOnline(){
        setIsOnline(true);
        close();
        dispatch(networkMode(true));
    }

    function onOffline(){
        setIsOnline(false);
        dispatch(networkMode(false));
    }

    useEffect(()=>{
        setIsOnline(navigator.onLine);
        window.addEventListener("offline", onOffline);
        window.addEventListener("online",onOnline)
    },[]);

    
    if(!isOnLine)return (
        <>
            {children}
            {addToast()}
        </>
    )
    return children;
}
export default InternetConnectionProvider