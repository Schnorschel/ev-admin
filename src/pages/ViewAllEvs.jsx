import React, { useState, useEffect } from 'react'
import EVPreviewTile from '../components/EVPreviewTile'
import axios from 'axios'

const ViewAllEvs = () => {
  const [allEVs, setAllEVs] = useState()

  const getAllEvs = async () => {
    const resp = await axios.get('https://localhost:5001/api/EVehicle')
    if (resp.status !== 200) {
      return
    }
    setAllEVs(resp.data)
  }

  useEffect(() => {
    getAllEvs()
  }, [])

  return (
    <section className="EVsCont">
      {allEVs &&
        allEVs.map(ev => {
          return (
            <EVPreviewTile
              key={ev.id}
              id={ev.id}
              evtypeid={ev.evTypeId}
              manufacturer={ev.manufacturer}
              model={ev.model}
              batterycapacity={ev.batteryCapacity}
            />
          )
        })}
    </section>
  )
}

export default ViewAllEvs
