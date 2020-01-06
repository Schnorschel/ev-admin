import React from 'react'

const DeleteEvType = props => {
  return (
    <section className="deleteConfirm">
      E-Vehicle Type with Id: {props.match.params.id} was successfully deleted.
    </section>
  )
}

export default DeleteEvType
