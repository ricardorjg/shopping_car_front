import React from 'react'

const Item = ({ reference, description, vr_unit }) => (
    <div>{reference}, {description} ({vr_unit})</div>
)

export default Item