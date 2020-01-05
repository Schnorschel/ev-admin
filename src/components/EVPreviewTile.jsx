import React from 'react'
import { Link } from 'react-router-dom'

const EVPreviewTile = props => {
  return (
    <section className="EvTile">
      <Link to={`/ViewEv/${props.id}`}>
        <h2>
          {props.manufacturer} {props.model}
        </h2>
      </Link>
      Battery Capacity: {props.batterycapacity} kWh
    </section>
  )
}

export default EVPreviewTile
