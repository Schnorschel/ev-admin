import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const ViewEv = props => {
  const [EV, setEV] = useState()
  const [toUpdate, setToUpdate] = useState(false)
  const [toDelete, setToDelete] = useState(false)

  const getEV = async () => {
    const ApiReq = `https://localhost:5001/api/EVehicle/${props.match.params.id}`
    // console.log('Now requesting ' + ApiReq)
    const resp = await axios.get(ApiReq)
    if (resp.status !== 200) {
      return
    }
    setEV(resp.data)
  }

  const deleteEV = async () => {
    const ApiReq = `https://localhost:5001/api/EVehicle/${props.match.params.id}`
    const resp = await axios.delete(ApiReq)
    if (resp.status !== 200) {
      return
    }
    setToDelete(true)
  }

  const handleUpdate = () => {
    console.log('Setting toUpdate to TRUE')
    setToUpdate(true)
  }

  const handleDelete = () => {
    deleteEV()
  }

  useEffect(() => {
    getEV()
  }, [])

  return (
    <>
      {toUpdate ? <Redirect to={`/UpdateEv/${props.match.params.id}`} /> : null}
      {toDelete ? <Redirect to={`/DeleteEv/${props.match.params.id}`} /> : null}
      <h3>View E-Vehicle Detail</h3>
      {EV && (
        <section className="EvDetail">
          <h2>
            {EV.manufacturer} {EV.model}
          </h2>
          <p>EV Type: {EV.evTypeAbbr} </p>
          <p>Battery Capacity: {EV.batteryCapacity} kWh</p>
          {/* prettier-ignore */}
          <button name="updateVehicle" onClick={handleUpdate}>Update</button>
          <button name="deleteVehicle" onClick={handleDelete}>
            Delete
          </button>
        </section>
      )}
    </>
  )
}

export default ViewEv
