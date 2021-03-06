import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import { API } from "../config/api"
import { useHistory } from 'react-router-dom'

export default function LoginPage () {
  const [ form, setForm ] = useState({
    email: '',
    password: ''
  })
  const history = useHistory()

  const onLogin = async () => {
    try {
      if (!form.email) {
        toast('Please input email !', {
          type: 'error'
        })
      } 
      if (!form.password) {
        toast('Please input password !', {
          type: 'error'
        })
      }
      if (form.email && form.password) {
        // const response = await API().post('/auth/login', form, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // console.log(response.data)
        
        // const id = 1
        // API().delete(`/user/${id}`)
        // .then(response => console.log(response.data))
        
        // API().patch(`/likes/${id}`, {}, { headers: { 'Content-Type' : 'application/json' }} )

        const { data } = await API().post('/auth/login', form)
        if (data?.token) {
          localStorage.setItem('token', data?.token)
          history.push('/profile')
        }
      }
    } catch (error) {
      console.log(error)
      toast(error?.response?.data?.message || 'Internal Server Error', {
        type: 'error'
      })
    }

  }

  return (
    <div className="container">
      <h1 className="my-5 text-center">Login Page</h1>
      <div className="mx-5 px-5">
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">email</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" value={form?.email} onChange={e => setForm({ ...form, email: e.target?.value })} />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" value={form?.password} onChange={e => setForm({ ...form, password: e.target?.value })}/>
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-end">
          <button className="btn btn-primary" onClick={() => onLogin()}>Sign In</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}