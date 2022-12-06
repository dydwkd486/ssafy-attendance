import React, { useState, useEffect, useRef } from 'react'
// import img from './지원금.PNG'
import img from './사유서1.jpg'
import "./App.css"
import { Button, Modal } from 'semantic-ui-react'
const Canvas = (props) => {
  const [testSrc, setTestSrc] = useState('')
  const [open, setOpen] = React.useState(false)

  const canvasRef = useRef();
  const canvasRefFont = useRef();
  const canvasRefSubmit = useRef();
  const signRef = useRef();
  let canvas, canvasFont, canvasSubmit;
  let ctx, ctxFont, ctxSubmit;
  let image;

  function draw() {

    canvasFont = canvasRefFont.current;
    ctxFont = canvasFont.getContext('2d')
    ctxFont.clearRect(0, 0, 1654, 2339);
    ctxFont.font = '30px serif';

    //이름
    ctxFont.font = '39px serif';
    ctxFont.fillText(props.inputs.name, 515, 1400)// 성명칸 이름
    ctxFont.font = '39px serif';
    ctxFont.fillText(props.inputs.name, 567, 535) //공가/사유 정보 칸에있는 이름

    // 생년월일
    ctxFont.fillText(props.inputs.birth, 1100, 535)

    
    ctxFont.font = '39px serif';
    // 사유 년도
    ctxFont.fillText(props.inputs.attendanceYear, 540, 637)
    // 사유 월
    ctxFont.fillText(props.inputs.attendanceMonth, 720, 637)
    // 사유 일
    ctxFont.fillText(props.inputs.attendanceDay, 850, 637)
    // 사유 기간
    if(props.inputs.attendanceTime==="0"){
      ctxFont.fillText("■", 1003, 639)
    }
    else if(props.inputs.attendanceTime==="1"){
      ctxFont.fillText("■", 1155, 639)
    }
    else{
      ctxFont.fillText("■", 1310, 639)
    }

    // 공가/사유 구분 및 내용
    if(props.inputs.attendanceType==="0"){
      ctxFont.fillText("■", 338, 970)
      ctxFont.fillText(props.inputs.attendanceText, 500, 968)
    }
    else{
      ctxFont.fillText("■", 338, 1020)
      ctxFont.fillText(props.inputs.attendanceText, 500, 1020)
    }
    
    // 세부내용
    if (props.inputs.attendanceDetailText.length<27){
      ctxFont.fillText(props.inputs.attendanceDetailText, 560, 1200)
    }
    else{
      ctxFont.fillText(props.inputs.attendanceDetailText.substring(27, -1), 560, 1200)
      ctxFont.fillText(props.inputs.attendanceDetailText.slice(27), 560, 1269)
    }
    
    // 장소
    ctxFont.fillText(props.inputs.attendanceLocation, 510, 1323)
    
    //맨아래 싸인 부분
    
    ctxFont.drawImage(signRef.current, 1360, 1338)
    
    //년도
    ctxFont.font = 'bold 50px serif';
    ctxFont.fillText((props.inputs.year + ''), 550, 1971) // 맨아래 날짜 연도
    
    //아래쪽 달수 2자리인지 검사
    if (props.inputs.month < 10) {
      ctxFont.fillText("0"+props.inputs.month, 786, 1971)
    } else {
      ctxFont.fillText(props.inputs.month, 786, 1971)
    }
    



    if ((props.inputs.date + '').length === 1) { // 맨 아래 일
      ctxFont.fillText("0"+props.inputs.date, 954, 1971)
    } else {
      ctxFont.fillText(props.inputs.date, 954, 1971)
    }

  }

  function clearCanvas() {
    canvas = canvasRef.current;
    canvasFont = canvasRefFont.current;
    ctx = canvas.getContext('2d')
    ctxFont = canvasFont.getContext('2d')
    image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0)
    }
    image.src = img

  }


  function downloadCanvas() {

    canvas = canvasRef.current;
    canvasFont = canvasRefFont.current;
    canvasSubmit = canvasRefSubmit.current;
    ctx = canvas.getContext('2d')
    ctxFont = canvasFont.getContext('2d')
    ctxSubmit = canvasSubmit.getContext('2d')
    ctxSubmit.drawImage(canvas, 0, 0);
    ctxSubmit.drawImage(canvasFont, 0, 0);

    let link = document.createElement('a');
    const fileName = '' + props.inputs.location + '_' + props.inputs.classNum + '반_' + props.inputs.name
    link.download = fileName + ".JPG";
    link.href = canvasSubmit.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function toImage() {
    draw()
    canvas = canvasRef.current;
    canvasFont = canvasRefFont.current;
    canvasSubmit = canvasRefSubmit.current;
    ctx = canvas.getContext('2d')
    ctxFont = canvasFont.getContext('2d')
    ctxSubmit = canvasSubmit.getContext('2d')
    ctxSubmit.drawImage(canvas, 0, 0);
    ctxSubmit.drawImage(canvasFont, 0, 0);
    setTestSrc(canvasSubmit.toDataURL());
  }

  useEffect(() => {
    clearCanvas()
  })






  return (
    <>
      <div >
        <canvas
          style={{ display: 'none' }}
          id="canvasTop"
          ref={canvasRef}
          width={1654}
          height={2339}
        />
        <canvas
          style={{ display: 'none' }}
          id="canvasBottom"
          ref={canvasRefFont}
          width={1654}
          height={2339}
        />
        <canvas
          style={{ display: 'none' }}
          id="canvasSubmit"
          ref={canvasRefSubmit}
          width={1654}
          height={2339}
        />
      </div>


      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button primary
          onClick={toImage}
          className="generate-button"
        >생성하기</Button>}
        style={{ width: '90%',maxWidth:'1070px' }}
      >
        <Modal.Header style={{ backgroundColor: '#f9fafb' }}> 미리 보기</Modal.Header>
        <Modal.Content image scrolling>


          <Modal.Description>
            <img src={testSrc} alt="이미지 미리보기" />

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={downloadCanvas} primary>
            {'다운로드  >'}
          </Button>
        </Modal.Actions>
      </Modal>
      <img src={props.inputs.sign} ref={signRef} width='10px' style={{ display: 'none' }} alt="sign" />
    </>
  )
}

export default Canvas