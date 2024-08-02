import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
import axios from 'axios'

export const Appbar = () => {

    const navigate = useNavigate()

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mt-1">
                <button onClick={(e)=>{
                    localStorage.removeItem("token")
                    navigate("/signup")
                }} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Logout</button>
            </div>
            <div className="flex flex-col justify-center h-full mt-1">
                <button onClick={async (e)=>{
                    await axios.delete("http://localhost:3000/api/v1/user/delete",{
                        headers:{
                            Authorization: 'Bearer ' + localStorage.getItem("token")
                        }
                    })
                    navigate("/signup")
                }} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button>
            </div>
            <div className="flex flex-col justify-center h-full mr-4">
                
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    P
                </div>
            </div>
        </div>
    </div>
}