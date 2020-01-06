import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewEvType = () => {
  const [newEVType, setNewEvType] = useState({})
  const [newEvTypeId, setNewEvTypeId] = useState()
  const [toEvTypeDetail, setToEvTypeDetail] = useState(false)

  const createNewEvType = async () => {
    const apiReq = 'https://localhost:5001/api/EvType'
    console.log('Sending POST request to ' + apiReq)
    console.log({ newEVType })
    const resp = axios.post(apiReq, newEVType)
    if (resp.status !== 200) {
      return
    }
    console.log('New EvTypeId: ' + resp.data.id)
    setNewEvTypeId(resp.data.id)
    setToEvTypeDetail(true)
  }

  const updateEvType = e => {
    e.persist()
    setNewEvType(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleFormSubmission = () => {
    createNewEvType()
  }

  // prettier-ignore
  return (
    <>
      {toEvTypeDetail ? <Redirect to={`/ViewEvType/${newEvTypeId}`} /> : null}
      <section>
        <table  className="evForm">
          <tbody>
            <tr><td className="tdLabel">EV Type (Acronym): </td><td><input name="evTypeAbbr" type="text" onChange={updateEvType} value={newEVType.evTypeAbbr}></input></td></tr>
            <tr><td className="tdLabel">EV Short Description: </td><td><input name="evTypeShortDescription" size="52" type="text" onChange={updateEvType} value={newEVType.evTypeShortDescription}></input></td></tr>
            <tr><td className="tdLabel">EV Long Description: </td><td><textarea name="evTypeLongDescription" type="text" onChange={updateEvType} rows="6" cols="40" value={newEVType.evTypeLongDescription}></textarea></td></tr>
            <tr><td></td><td><button name="updateEvType" onClick={handleFormSubmission}>Add</button></td></tr>
          </tbody>
          </table>
      </section>
    </>
  )
}

export default NewEvType
