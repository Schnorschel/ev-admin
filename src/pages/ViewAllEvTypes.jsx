import React, { useState, useEffect } from 'react'
import EVTypePreviewTile from '../components/EVTypePreviewTile'
import axios from 'axios'

const ViewAllEvTypes = () => {
  const [allEvTypes, setAllEvTypes] = useState()

  const getAllEvTypes = async () => {
    const resp = await axios.get('https://localhost:5001/api/EvType')
    if (resp.status !== 200) {
      return
    }
    setAllEvTypes(resp.data)
  }

  useEffect(() => {
    getAllEvTypes()
  }, [])

  return (
    <section className="EvTypeCont">
      {allEvTypes &&
        allEvTypes.map(evt => {
          return (
            <EVTypePreviewTile
              key={evt.id}
              id={evt.id}
              evTypeAbbr={evt.evTypeAbbr}
              evTypeShortDescription={evt.evTypeShortDescription}
              evTypeLongDescription={evt.evTypeLongDescription}
            />
          )
        })}
    </section>
  )
}

export default ViewAllEvTypes
