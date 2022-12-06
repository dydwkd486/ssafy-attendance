import React, { useState, useEffect, useRef } from 'react'
import { Button, Input,Header, Divider,Select, Dropdown, Label } from 'semantic-ui-react'
import img from './사인칸.PNG'

const UserInput = (props) => {
  const [ctx, setCtx] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false);
  const [image, setImage] = useState();
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, 300, 150);

    const i = new Image();
    i.onload = () => {
      context.drawImage(i, 0, 0)
    }
    i.src = img

    setCtx(context)
  }, [])

  const onChange = (e) => {
    const { value, name } = e.target
    
    props.setInputs({
      ...props.inputs,
      [name]: value
    })
    

  }
  const handleOnChange = (e, data) => {
    const { value, name } = data
    
    props.setInputs({
      ...props.inputs,
      [name]: value
    })
 }

  const clearCanvas = () => {
    const c = canvasRef.current.getContext("2d");
    c.fillRect(0, 0, 300, 150);
    c.lineWidth = 2;
    c.strokeStyle = "black";
    c.fillStyle = "rgba(255, 255, 255, 1)";
    const i = new Image();
    i.onload = () => {
      c.drawImage(i, 0, 0)
    }
    i.src = img
    setCtx(c)
    props.setInputs({
      ...props.inputs,
      sign: i
    })
  }

  const startDraw = (event) => {
    event.persist();
    
    if(event.targetTouches){
      const rect = event.target.getBoundingClientRect();
      var offsetX = (event.touches[0].clientX - rect.left) 
      var offsetY = (event.touches[0].clientY - rect.top)
      
    }
    else{
      var { offsetX, offsetY } = event;
    }
    setIsDrawing(true);
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);

      }
    setImage(canvasRef.current.toDataURL())
    // props.setInputs({
    //   ...props.inputs,
    //   sign: image
    // })

  }

  const drawing = ({ nativeEvent }) => {
    if(nativeEvent.targetTouches){
      const rect = nativeEvent.target.getBoundingClientRect();
      var offsetX = (nativeEvent.touches[0].clientX - rect.left) 
      var offsetY = (nativeEvent.touches[0].clientY - rect.top)
      
      
    }
    else{
      var { offsetX, offsetY } = nativeEvent;
    }
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

      }
    }
    setImage(canvasRef.current.toDataURL())
    // props.setInputs({
    //   ...props.inputs,
    //   sign: image
    // })

  }

  const stopDraw = () => {
    setIsDrawing(false);
    
    setImage(canvasRef.current.toDataURL())
    props.setInputs({
      ...props.inputs,
      sign: image
    })
  }

  const attendanceTimeOptions = [
    { key: '0', value: '0', text: '오전' },
    { key: '1', value: '1', text: '오후' },
    { key: '2', value: '2', text: '종일' },
  ]
  const attendanceTypeOptions = [
    { key: '0', value: '0', text: '공가' },
    { key: '1', value: '1', text: '사유' },
  ]

  return (
    <div className="">
      <div className="input-box  input-once">
        <Input label='이름' name="name" onChange={onChange} placeholder="홍길동" /> <br />
      </div>
      <div className="input-box">
        <div className="input-flex">
          <Input label='지역' name="location" onChange={onChange} placeholder="서울" />

          <Input label='반' name="classNum" onChange={onChange} placeholder="13" className="second-input" />
        </div>
      </div>
      <div className="input-box">
        <div className="input-flex">
          <Input label='생년월일' name="birth" onChange={onChange} placeholder="990306" />
        </div>
      </div>
      <Divider />
      <div className="input-box">
        <Header as='h3'>사유 일자</Header>
          <Input  name="attendanceYear" label={{ content: '년' }} labelPosition='right' onChange={onChange} placeholder="2023" style={{width: '100px',marginRight: '50px'}}/>
          {/* <span>/</span> */}
          <Input  name="attendanceMonth" label={{ content: '월' }} labelPosition='right'onChange={onChange} placeholder="11" className="second-input" style={{width: '50px',marginRight: '50px'}}/>
          {/* <span>/</span> */}
          <Input  name="attendanceDay" label={{ content: '일' }} labelPosition='right' onChange={onChange} placeholder="27" className="second-input" style={{width: '50px',marginRight: '50px'}}/>          
      <Header as='h3'>사유 기간</Header>
      <Select name="attendanceTime" onChange={handleOnChange} placeholder='선택해주세요' options={attendanceTimeOptions}/>

      <Header as='h3'>공가/사유 선택, 사유 내용</Header>
      <Input fluid labelPosition='Left' type='text' placeholder='사유내용'>
        <Label>
          <Dropdown name="attendanceType" onChange={handleOnChange} defaultValue='0' options={attendanceTypeOptions}></Dropdown>
        </Label>
        <input name="attendanceText" onChange={onChange}/>
      </Input>
      </div>

      <Header as='h3'>상세 내용</Header>
      <p style={{ color: 'grey' }}>*어떤 이유때문에 사유서를 적성하는지 상세 내용에 작성하시면 됩니다.</p>
      <Input fluid className='text' name="attendanceDetailText" onChange={onChange} placeholder="상세내용"  />

      <Header as='h3'>사유 장소</Header>
      <p style={{ color: 'grey' }}>*어느 장소에서 사유를 하게 되었는지 작성하세요.</p>
      <Input name="attendanceLocation" onChange={onChange} placeholder="장소" />
      <Divider />
      <Header as='h3'>제출일 (월 / 일)</Header>
        <p style={{ color: 'grey' }}>*보통 오늘 날짜를 작성하면 됩니다.</p>
        <div className="input-flex">
          <Input name="month" onChange={onChange} label={{ content: '월' }} labelPosition='right' placeholder="13" defaultValue={props.inputs.month} />
          <span>/</span>
          <Input name="date" onChange={onChange} label={{ content: '일' }} labelPosition='right' placeholder="27" defaultValue={props.inputs.date} className="second-input" />
        </div>

        <Header as='h3'>서명</Header>
        <div className="sign-div">
          <canvas
            id="signCanvas"
            ref={canvasRef}
            style={{ border: '3px solid black',marginRight:'10px' }}
            width={166}
            height={90}
            onMouseDown={startDraw}
            onMouseUp={stopDraw}
            onMouseMove={drawing}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={drawing}
            onTouchEnd={stopDraw}
          ></canvas>
          <Button onClick={clearCanvas}>다시 그리기</Button>
        </div>
    </div>
  )
  
}

export default UserInput
