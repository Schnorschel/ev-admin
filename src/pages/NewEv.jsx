import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewEv = () => {
  const [newEV, setNewEv] = useState({ evTypeId: 1 })
  const [newEvId, setNewEvId] = useState()
  const [evTypes, setEvTypes] = useState([])
  const [toEvDetail, setToEvDetail] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const getEvTypes = async () => {
    const resp = await axios.get('https://localhost:5001/api/EvType')
    if (resp.status !== 200) {
      return
    }
    setEvTypes(resp.data)
  }

  const updateEv = e => {
    e.persist()
    let theValue = e.target.value
    if (e.target.name === 'evTypeId' || e.target.name === 'batteryCapacity') {
      theValue = Number(theValue) // Convert the numeric properties to numbers
    }
    setNewEv(prev => {
      return { ...prev, [e.target.name]: theValue }
    })
  }

  const createNewEv = async () => {
    const apiReq = 'https://localhost:5001/api/EVehicle'
    console.log('Sending POST request to ' + apiReq)
    console.log({ newEV })
    const resp = await axios.post(apiReq, newEV)
    if (resp.status !== 200) {
      console.log(resp.status)
      setErrMsg(resp.status)
      return
    }
    setNewEvId(resp.data.id)
    setToEvDetail(true)
  }

  const handleFormSubmission = () => {
    setErrMsg('')
    createNewEv()
  }

  useEffect(() => {
    getEvTypes()
  }, [])

  return (
    <>
      {toEvDetail ? <Redirect to={`/ViewEv/${newEvId}`} /> : null}
      {errMsg && <div>Error: {errMsg}</div>}
      <h3>Add New Vehicle</h3>
      {evTypes && (
        <table className="evForm">
          {/* prettier-ignore */}
          <tbody>
            <tr>
              <td className="tdLabel">E-Vehicle Type:</td>
              <td>
                <select name="evTypeId" onChange={updateEv}>
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
              <td><input type="text" name="manufacturer" onChange={updateEv}></input></td>
            </tr>
            <tr>
              <td className="tdLabel">Model:</td>
              <td><input type="text" name="model" onChange={updateEv}></input></td>
            </tr>
            <tr>
              <td className="tdLabel">Battery Capacity:</td>
              <td><input type="text" name="batteryCapacity" onChange={updateEv}></input> kWh</td>
            </tr>
            <tr>
              <td></td>
              <td><button name="createEv" onClick={handleFormSubmission}>Add EV</button></td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  )
}

export default NewEv
