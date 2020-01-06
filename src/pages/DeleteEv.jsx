import React from 'react'

const DeleteEv = props => {
  return (
    <section className="deleteConfirm">
      E-Vehicle with Id: {props.match.params.id} was successfully deleted.
    </section>
  )
}

export default DeleteEv
