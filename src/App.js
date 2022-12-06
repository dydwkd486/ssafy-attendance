import logo from './logo.svg';
import './App.css';

import Container from './Container';

function App() {

  return (

    <div className="App-header">
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" height="100px" width="100px" />
        <h1>SSAFY 사유서 생성기</h1>
        {/* <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdydwkd486.github.io%2Fssafy-sign%2F&count_bg=%231531B2&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EB%B0%A9%EB%AC%B8%EC%9E%90+%EC%88%98&edge_flat=false"/></a> */}
      </div>

      <Container />
      <div className="footer">
      
        <p>&copy;  SSAFY 8기 서울캠퍼스 조용장</p>
        <p>문의사항 / 버그 : dydwkd48670@gmail.com</p>
        
        <h3>
        <details>
        <summary>수정 사항 및 예정 사항</summary>
        {/* <h4>2022.10.31 업데이트 - 모바일에서 서명 작성 가능하게 변경, 방문자수 추가</h4>
        <h4>2022.09.23 업데이트 - 예상 지원금 금액 볼 수 있게 추가</h4> */}
        <h4>예정 사항</h4>
        <h5>- 완성된 자료 PDF 출력</h5>
        <h5>- 증빙서류 추가하기</h5>
        <h5>- 자주 사용하는 문장 선택 기능 추가하기</h5>
        <h5>- 모바일 웹에서도 폰트 이쁘게 나오게 하기</h5>
        </details>
        </h3>
        
      </div>

      

    </div >
    
  );
}

export default App;
