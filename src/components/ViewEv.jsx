import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ViewEv = props => {
  const [EV, setEV] = useState()

  const getEV = async () => {
    const ApiReq = `https://localhost:5001/api/EVehicle/${props.match.params.id}`
    // console.log('Now requesting ' + ApiReq)
    const resp = await axios.get(ApiReq)
    if (resp.status !== 200) {
      return
    }
    setEV(resp.data)
  }

  useEffect(() => {
    getEV()
  }, [])

  return (
    <>
      <h3>View E-Vehicle Detail</h3>
      {EV && (
        <section className="EvDetail">
          <h2>
            {EV.manufacturer} {EV.model}
          </h2>
          <p>EV Type: {EV.evTypeAbbr} </p>
          <p>Battery Capacity: {EV.batteryCapacity} kWh</p>
        </section>
      )}
    </>
  )
}

export default ViewEv
