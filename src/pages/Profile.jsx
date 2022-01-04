import React, { useState } from "react"
import { Cloudinary } from "../config/thirdParty"
const { REACT_APP_CLOUD_NAME_CLOUDINARY } = process.env
const { REACT_APP_UPLOAD_PRESET_CLOUDINARY } = process.env

export default function ProfilePage () {
  const [ form, setForm ] = useState(null)

  const onChangeFile = (files) => {
    setForm(files[0])
  }

  const onHandleUpload = async () => {
    try {
      const payload = new FormData()
      payload.append('file', form)
      payload.append('upload_preset', REACT_APP_UPLOAD_PRESET_CLOUDINARY)
      payload.append('cloud_name', REACT_APP_CLOUD_NAME_CLOUDINARY)

      const { data } = await Cloudinary().post('/', payload)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container my-5">
      <div className="input-group">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={e => onChangeFile(e?.target?.files)}/>
        </div>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={() => onHandleUpload()}>Upload</button>
        </div>
      </div>
    </div>
  )
}