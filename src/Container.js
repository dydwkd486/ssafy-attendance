import React, { useState } from 'react'
import Canvas from './Canvas'
import UserInput from './UserInput'

const Container = (props) => {
  return (
    <div>
      <UserInput inputs={props.inputs} setInputs={props.setInputs} />
      {/* <Canvas inputs={props.inputs} /> */}
    </div>
  )
}
export default Container
