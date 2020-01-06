import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const UpdateEv = props => {
  const [prevEV, setPrevEV] = useState({})
  const [prevEVId, setPrevEVId] = useState()
  const [evTypes, setEvTypes] = useState([])
  const [toEvDetail, setToEvDetail] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const getEvTypes = async () => {
    const resp = await axios.get('https://localhost:5001/api/EvType')
    if (resp.status !== 200) {
      setErrMsg(resp.status)
      return
    }
    setErrMsg('')
    setEvTypes(resp.data)
  }

  const getEVehicle = async () => {
    const resp = await axios.get(
      `https://localhost:5001/api/EVehicle/${props.match.params.id}`
    )
    if (resp.status !== 200) {
      setErrMsg(resp.status)
      return
    }
    setErrMsg('')
    setPrevEVId(resp.data.id)
    setPrevEV(resp.data)
    console.log(resp.data)
  }

  // prettier-ignore
  const updatePrevEV = async () => {
    const apiReq = `https://localhost:5001/api/EVehicle/${props.match.params.id}`
    console.log('Submitting PUT request to ' + apiReq)
    console.log({prevEV})
    const resp = await axios.put(apiReq, {...prevEV, batteryCapacity: Number(prevEV.batteryCapacity), evTypeId: Number(prevEV.evTypeId)})
    if (resp.status !== 200) {
      setErrMsg(resp.status)
      return
    }
    setErrMsg('')
    setToEvDetail(true)
  }

  const handleFormSubmission = () => {
    setErrMsg('')
    // bc = Number(prevEV.batteryCapacity)
    setPrevEV(prev => {
      return {
        ...prev,
        batteryCapacity: Number(prev.batteryCapacity),
        evTypeId: Number(prev.evTypeId),
      }
    })
    updatePrevEV()
  }

  const updateEv = e => {
    e.persist()
    // let theValue = e.target.value
    // if (e.target.name === 'evTypeId' || e.target.name === 'batteryCapacity') {
    //   theValue = Number(theValue) // Convert the numeric properties to numbers
    // }
    setPrevEV(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  useEffect(() => {
    getEvTypes()
    getEVehicle()
  }, [])

  return (
    <>
      {toEvDetail ? <Redirect to={`/ViewEv/${prevEVId}`} /> : null}
      {errMsg && <div>Error: {errMsg}</div>}
      <h3>Update Existing Vehicle</h3>
      {evTypes && prevEV && (
        <table className="evForm">
          {/* prettier-ignore */}
          <tbody>
          <tr>
            <td className="tdLabel">E-Vehicle Type:</td>
            <td>
              <select name="evTypeId" onChange={updateEv} value={prevEV.evTypeId} >
                {evTypes.map(evt => {
                  return (
                    <option name="evTypeId" value={evt.id} key={evt.id}>{evt.evTypeAbbr}</option>
                  )
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="tdLabel">Manufacturer:</td>
            <td><input type="text" name="manufacturer" onChange={updateEv} value={prevEV.manufacturer}></input></td>
          </tr>
          <tr>
            <td className="tdLabel">Model:</td>
            <td><input type="text" name="model" onChange={updateEv} value={prevEV.model}></input></td>
          </tr>
          <tr>
            <td className="tdLabel">Battery Capacity:</td>
            <td><input type="text" name="batteryCapacity" onChange={updateEv} value={prevEV.batteryCapacity}></input> kWh</td>
          </tr>
          <tr>
            <td></td>
            <td><button name="createEv" onClick={handleFormSubmission}>Update EV</button></td>
          </tr>
        </tbody>
        </table>
      )}
    </>
  )
}

export default UpdateEv
