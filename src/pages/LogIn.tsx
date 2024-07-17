import { useEffect, useState } from "react"
import { usePost } from "../hooks/usePost"
import { useNavigate } from "react-router-dom"

interface form {
    email: string,
    password: string
}

function LogIn() {
    const [postData, postState] = usePost("http://localhost:3000/api/sign-in")
    const navigate = useNavigate()

    const [form, setForm] = useState<form>({
        email: "",
        password: ""
    })

    useEffect(()=> {
        if(postState.response.message === 'Success')
            navigate("/home")
    },[postState.response])

    const submit = async (e: React.FormEvent<HTMLFormElement> ) => {
        try{
        e.preventDefault()
        await postData({email: form.email, password: form.password})
       
        
    }catch(err){
        if(err instanceof Error) console.log(err.message)
    }

    }

  return (
    <div>
        <form onSubmit={submit} className="flex flex-col">
            <input className="border m-1" placeholder="Type Email" value={form.email} onChange={e => {setForm({...form, email: e.target.value})}} type="email"/>
            <input className="border m-1" placeholder="Type Password" value={form.password} onChange={e => {setForm({...form, password: e.target.value})}} type="password"/>
            <button type="submit" >Submit</button>
        </form>
    </div>
  )
}

export default LogIn