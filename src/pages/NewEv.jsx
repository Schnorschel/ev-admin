import React, { useState, useEffect } from 'react'
import axios from 'axios'

const NewEv = () => {
  const [newEV, setNewEv] = useState({})
  const [evTypes, setEvTypes] = useState([])

  const getEvTypes = async () => {
    const resp = await axios.get('https://localhost:5001/api/EvType')
    if (resp.status !== 200) {
      return
    }
    setEvTypes(resp.data)
  }

  const updateEv = e => {
    e.persist()
    setNewEv({ ...newEV, [e.target.name]: e.target.value })
  }

  const createNewEv = () => {}

  useEffect(() => {
    getEvTypes()
  }, [])

  return (
    <>
      <h3>Add New Vehicle</h3>
      {evTypes && (
        <table className="evForm">
          {/* prettier-ignore */}
          <tbody>
            <tr>
              <td className="tdLabel">E-Vehicle Type:</td>
              <td>
                <select name="evTypeId">
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
              <td><button name="createEv" onClick={createNewEv}>Add EV</button></td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  )
}

export default NewEv
