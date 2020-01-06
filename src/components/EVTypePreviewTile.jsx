import React from 'react'
import { Link } from 'react-router-dom'

const EVTypePreviewTile = props => {
  return (
    <section className="EvTypeTile">
      <Link to={`/ViewEvType/${props.id}`}>
        <h2>{props.evTypeAbbr}</h2>
      </Link>
      <p>{props.evTypeShortDescription}</p>
    </section>
  )
}

export default EVTypePreviewTile
