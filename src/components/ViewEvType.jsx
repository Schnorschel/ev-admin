import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const ViewEvType = props => {
  const [evTypes, setEvTypes] = useState()
  const [toEvTypeUpdate, setToEvTypeUpdate] = useState(false)
  const [toEvTypeDelete, setToEvTypeDelete] = useState(false)

  // prettier-ignore
  const getEvTypes = async () => {
    const apiReq = `https://localhost:5001/api/EvType/${props.match.params.id}`
    console.log('Sending GET request to ' + apiReq)
    const resp = await axios.get(apiReq)
    if (resp.status !== 200) {
      return
    }
    setEvTypes(resp.data)
  }

  const deleteEvType = async () => {
    const apiReq = `https://localhost:5001/api/EvType/${props.match.params.id}`
    const resp = await axios.delete(apiReq)
    if (resp.status !== 200) {
      return
    }
    setToEvTypeDelete(true)
  }

  const handleUpdate = () => {
    setToEvTypeUpdate(true)
  }

  const handleDelete = () => {
    deleteEvType()
  }

  useEffect(() => {
    getEvTypes()
  }, [])

  return (
    // prettier-ignore
    <>
      {toEvTypeUpdate ? ( <Redirect to={`/UpdateEvType/${props.match.params.id}`} /> ) : null}
      {toEvTypeDelete ? ( <Redirect to={`/DeleteEvType/${props.match.params.id}`} /> ) : null}
      {evTypes && (
        <section>
          <h3>
            {evTypes.evTypeAbbr} - {evTypes.evTypeShortDescription}
          </h3>
          {evTypes.evTypeLongDescription && (
            <ul>
              {evTypes.evTypeLongDescription.split(';').map((cl, index) => {
                return <li key={index}>{cl.trim()}</li>
              })}
            </ul>
          )}
          <button name="updateEvType" className="updateEvTypeButton" onClick={handleUpdate}>Update</button>
          <button name="updateEvType" className="deleteEvTypeButton" onClick={handleDelete}>Delete</button>
        </section>
      )}
    </>
  )
}

export default ViewEvType
