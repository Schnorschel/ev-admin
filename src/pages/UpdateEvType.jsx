import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const UpdateEvType = props => {
  const [prevEVType, setPrevEVType] = useState({})
  const [prevEVId, setPrevEVId] = useState()
  const [toEvTypeDetail, setToEvTypeDetail] = useState(false)

  const getEvType = async () => {
    const resp = await axios.get(
      `https://localhost:5001/api/EvType/${props.match.params.id}`
    )
    if (resp.status !== 200) {
      return
    }
    setPrevEVId(resp.data.id)
    setPrevEVType(resp.data)
  }

  const updatePrevEvType = async () => {
    const apiReq = `https://localhost:5001/api/EvType/${props.match.params.id}`
    const resp = await axios.put(apiReq, prevEVType)
    if (resp.status !== 200) {
      return
    }
    setToEvTypeDetail(true)
  }

  const updateEvType = e => {
    e.persist()
    setPrevEVType(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleFormSubmission = () => {
    updatePrevEvType()
  }

  useEffect(() => {
    getEvType()
  }, [])
  return (
    // prettier-ignore
    <>
    {toEvTypeDetail ? <Redirect to={`/ViewEvType/${props.match.params.id}`} /> : null}
    <table  className="evForm">
      <tbody>
        <tr><td className="tdLabel">EV Type (Acronym): </td><td><input name="evTypeAbbr" type="text" onChange={updateEvType} value={prevEVType.evTypeAbbr}></input></td></tr>
        <tr><td className="tdLabel">EV Short Description: </td><td><input name="evTypeShortDescription" size="52" type="text" onChange={updateEvType} value={prevEVType.evTypeShortDescription}></input></td></tr>
        <tr><td className="tdLabel">EV Long Description: </td><td><textarea name="evTypeLongDescription" type="text" onChange={updateEvType} rows="6" cols="40" value={prevEVType.evTypeLongDescription}></textarea></td></tr>
        <tr><td></td><td><button name="updateEvType" onClick={handleFormSubmission}>Update</button></td></tr>
      </tbody>
    </table>
  </>
  )
}

export default UpdateEvType
