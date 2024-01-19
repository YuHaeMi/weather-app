# 기상청 open api 날씨정보 

## 실행하기(10182)
> npm start

브라우저에 http://localhost:10182을 입력하여 접속.

## 기능 설명
<img width="323" alt="image" src="https://github.com/YuHaeMi/weather-app/assets/113071904/07ff750c-33aa-48a9-9f7a-abc28ebe24a4">

- 메인 검색 화면
  - input에 날씨를 알고 싶은 도시 입력 시 해당 글자가 모두 포함되는 드롭 앤 다운 형식의 메뉴 형성
  - 마우스, 키보드 조작 가능 (마우스는 click, 키보드는 enter를 누르면 검색이 실행)
  - 잘못된 형식을 입력 후 키보드로 enter 입력 시 경고 팝업 생성
  - 검색 성공 시 로딩 팝업 화면에 생성
- 결과 화면
  - 실시간 날씨
    - 단기 데이터의 현재 날짜&시간의 데이터를 가져와 화면에 출력
    - 미세먼지 데이터도 마찬가지(기준: 0~30 좋음, 31~80 보통, 81~150 나쁨 151 매우 나쁨)
  - 24시간 날씨
    - 오늘 날짜의 03시 데이터부터 23시 데이터를 가져와 화면에 출력
    - 날씨와 예상 온도를 보여줌
    - 웹상에서 가로 스크롤이 가능
    - 현재 시간에 해당하면 '지금'이라고 표기
  - 주간 날씨
    - 오늘 - 10일 후까지의 데이터를 가져와 화면에 출력
    - 날씨, 최저, 최고 온도 표기
    - 오늘, 내일, 모레까지는 단기 데이터의 3일간 데이터로 교체
