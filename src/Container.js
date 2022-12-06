import React, { useState } from 'react'
import Canvas from './Canvas'
import UserInput from './UserInput'

const Container = () => {
  const today = new Date();
  const [inputs, setInputs] = useState({
    name: '김싸피', 
    birth:'930306',
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    attendanceYear:"2022",
    attendanceMonth:"11",
    attendanceDay:"27",
    attendanceTime:"0",
    attendanceType:"0",
    attendanceText:"1차 면접 참여",
    attendanceDetailText:"1차 면접으로 인한 ",
    attendanceLocation:"집",
    attendMonth: today.getMonth(),
    totalDays: 19,
    attendDays: 19,
    location: '서울',
    classNum: 1,
    sign: '',
  })

  return (
    <div>



      <UserInput inputs={inputs} setInputs={setInputs} />
      <Canvas inputs={inputs} />

    </div>
  )
}

export default Container
