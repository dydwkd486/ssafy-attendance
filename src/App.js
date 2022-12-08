import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';

import Container1 from './Container';
import { Container,Grid } from 'semantic-ui-react'
import Canvas from './Canvas';
function App() {
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
    addImage:[],
  })
  return (
  <>
  <Container style={{width: '1400px'}}>
    <div className="mainHeader">
      <img src={logo} className="App-logo" alt="logo" height="100px" width="100px" />
      <h1>SSAFY 사유서 생성기</h1>
    </div>
    <Grid columns={2} stackable divided>
        <Grid.Column width={8}>
          <Container1 inputs={inputs} setInputs={setInputs}/>
        </Grid.Column>
        <Grid.Column width={8}>
          <Canvas inputs={inputs} />
        </Grid.Column>
    </Grid>
    <div className="footer">
      
      <p>&copy;  SSAFY 8기 서울캠퍼스 조용장</p>
      <p>문의사항 / 버그 : dydwkd48670@gmail.com</p>
      
      <h3>
      <details>
      <summary>수정 사항 및 예정 사항</summary>
      <h4>2022.12.07 업데이트 - 완성된 자료 PDF 출력</h4>
      <h4>2022.12.08 업데이트 - 1초에 한번씩 새로고침 될 수 있게 변경</h4>
      <h4>예정 사항</h4>
      <h5>- 증빙서류 추가하기</h5>
      <h5>- 자주 사용하는 문장 선택 기능 추가하기</h5>
      <h5>- 모바일 웹에서도 폰트 이쁘게 나오게 하기</h5>
      <h5>- 증빙자료 추가하기</h5>
      <h5>- 추가하면 결과도 PDF에 추가 되게 하기</h5>
      <h5>- 자주 사용하는 문장 선택 기능 추가하기</h5>
      </details>
      </h3>
      
    </div>
  </Container>

  </>
  );
}

export default App;
