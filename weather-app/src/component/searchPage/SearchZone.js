import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/searchPage.css";
import axios from "axios";
import shortLocation from "../../js/shortLocation.json";

import sun from '../../img/sun.gif';
import cloud_sun from '../../img/cloud_sun.gif';
import cloud from '../../img/cloud.gif';
import rainSnow from '../../img/rain.gif';
import rain from '../../img/rain.gif';
import snow from '../../img/snow.gif';

const SearchZone = () =>{
  const [inputTxt, setInputTxt] = useState(""); // 검색창 입력
  const [cityData, setCityData] = useState(shortLocation); // 도시정보
  const [matchCity, setMatchCity] = useState([]); // 매치되는 도시
  const [cityIndex, setCityIndex] = useState(0); // 자동완성 매치 index
  const focusLi = useRef(); // 선택한 li 태그
  const deleteLi = useRef(); // 선택하지 않은 li 태그
  const [cityXY, setCityXY] = useState(null); // 도시의 좌표
  const [inputToday, setInputToday] = useState(""); //오늘날짜
  const resultPage = useNavigate();
  const [medium1, setMedium1] = useState("");
  const [medium2, setMedium2] = useState("");
  const [dustDate1, setDustDate1] = useState(""); 
  const [dustDate2, setDustDate2] = useState(""); 
  const [dustCity, setDustCity] = useState(""); //미세먼지용 도시
  const [loadingPop, setLoading] = useState();
  const [infoPopS, setInfoPopS] = useState();
  
  const loading = () =>{
    return(
      <div className="loadingBackground">
        <div className="loadingPopup">
          <img src={ sun }/>
          <p className="loadingP">날씨를 가져오는 중입니다.</p>
        </div>
      </div>
    )
  }
  
  const infoPop = () =>{
    return(
      <div className="loadingBackground">
        <div className="loadingPopup">
          <p className="loadingP">검색을 바르게 해주세요</p>
          <button className="closeBtn" onClick={ ()=>{setInfoPopS(null)} }>닫기</button>
        </div>
      </div>
    )
  }


  const searchInput = (e) =>{
    setInputTxt(e.target.value);
  }
  useEffect(()=>{
    if(inputTxt !== ""){
      // console.log(inputTxt);
      setMatchCity(cityData.filter(city => city.cities.replaceAll(" ","").includes(inputTxt.replaceAll(" ",""))));
    }
  },[inputTxt,cityData]);

  useEffect(()=>{
    const todayNow = new Date();
    let monthSample = Number(todayNow.getMonth()+1);
    monthSample = monthSample <=9? monthSample = '0'+monthSample: monthSample = monthSample;
    let dateSample = todayNow.getDate();
    dateSample = dateSample <=9? dateSample = '0'+dateSample: dateSample = dateSample;
    setInputToday(`${todayNow.getFullYear()}${monthSample}${dateSample}`);
    setDustDate1(`${todayNow.getFullYear()}${todayNow.getMonth()}${todayNow.getDate()}`);
    setDustDate2(`${todayNow.getFullYear()}${todayNow.getMonth()+1}${todayNow.getDate()}`);
  },[]);
  useEffect(()=>{
    // console.log(dustCity);
  },[inputToday,dustDate1,dustDate2,dustCity]);

  /*-- dropdown zone start --*/
  const changeCityWrap = (e) =>{
    return (
      matchCity.map((v,i)=>{
        return(
          <li className="cityLi" key={ i }>
            <p className="cityP" onMouseEnter={ hoverCity } onClick={ clickCity }>
              <span className="spanStyle" ref={ cityIndex === i? focusLi:deleteLi }></span>
              { v.cities }
            </p>
          </li>
        )
      }) 
    )
  }
  /*-- dropdown zone end --*/

  /*-- dropdown select key event start --*/
  const countP = (e) =>{
    let countNum = cityIndex;
    switch(e.key){
      case "ArrowDown":
        countNum ++;
        if(countNum <= matchCity.length-1){
          setCityIndex(countNum);
          setCityXY({
            "locX": matchCity[countNum].locationX,
            "locY": matchCity[countNum].locationY
          });
          setDustCity(matchCity[countNum].countyItem);
          setMedium1(matchCity[countNum].mediumCode);
          setMedium2(matchCity[countNum].mediumCode2);
        }
        break;
      case "ArrowUp":
        countNum --;
        if(countNum >= 0){
          setCityIndex(countNum);
          setCityXY({
            "locX": matchCity[countNum].locationX,
            "locY": matchCity[countNum].locationY
          });
          setDustCity(matchCity[countNum].countyItem);
          setMedium1(matchCity[countNum].mediumCode);
          setMedium2(matchCity[countNum].mediumCode2);
        }
        break;
      case "Enter":
        // console.log(cityXY);
        if(cityXY !== null && inputTxt.length !== parseInt(1)){
          searchCity();
        }else{
          setInfoPopS(infoPop());
        }
        break;
      default:
        // console.log(matchCity[countNum]);
        if(matchCity[countNum] !== undefined && matchCity[countNum] !== null ){
          setCityXY({
            "locX": matchCity[countNum].locationX,
            "locY": matchCity[countNum].locationY
          });
          setDustCity(matchCity[countNum].countyItem);
          setMedium1(matchCity[countNum].mediumCode);
          setMedium2(matchCity[countNum].mediumCode2);
        }
        break;
    }
  }
  /*-- dropdown select key event end --*/

  const hoverCity = (e) =>{
    const ulContent = e.target.parentNode.childNodes;
    const parentContent = e.target.parentNode.parentNode.childNodes;
    parentContent.forEach((v,i,a) => {
      if(v.childNodes[0] === ulContent[0]) {
        setCityIndex(i);
      }
    });
    const selectHover = matchCity.filter((item,index,array) => {
      return item.cities === e.target.textContent
    });
    setCityXY({
      "locX": selectHover[0].locationX,
      "locY": selectHover[0].locationY
    });
    setDustCity(matchCity[0].countyItem);
    setMedium1(matchCity[0].mediumCode);
    setMedium2(matchCity[0].mediumCode2);
  }

  const clickCity = () =>{
    console.log(cityIndex);
    console.log(cityXY);
    console.log(dustCity);
    console.log(matchCity[cityIndex].mediumCode1);
    console.log(matchCity[cityIndex].mediumCode2);
    searchCity();
  }

  const searchCity = () => {
    setLoading(loading());
    console.log(cityXY);
    console.log(dustCity);
    console.log(matchCity[cityIndex]);
    if((matchCity[cityIndex] && cityXY && medium1 && medium2 && dustCity) !== null && (matchCity[cityIndex] && cityXY && medium1 && medium2 && dustCity) !== undefined ){
      console.log("왔옹");
      let queryParams = '';
      const serviceKey = process.env.REACT_APP_SERVICE_KEY;
      const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
      queryParams = '?' + encodeURIComponent('serviceKey') + '='+ serviceKey; /*Service Key*/
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
      queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
      queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(`${inputToday}`); /**/
      queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(`0200`); /**/
      queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(`${cityXY.locX.toString()}`); /**/
      queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(`${cityXY.locY.toString()}`); /**/
     
      const url1 = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa'; //최고 최저
      let queryParams1 = '?' + encodeURIComponent('serviceKey') + `=${serviceKey}`; /* Service Key*/
      queryParams1 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
      queryParams1 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
      queryParams1 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
      queryParams1 += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent(medium1); /* */
      queryParams1 += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(`${inputToday}0600`); /* */
      
      const url2 = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst'; //날씨
      let queryParams2 = '?' + encodeURIComponent('serviceKey') + `=${serviceKey}`; /* Service Key*/
      queryParams2 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
      queryParams2 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
      queryParams2 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
      queryParams2 += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent(medium2); /* */
      queryParams2 += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(`${inputToday}0600`); /* */
      
      let url3 = 'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg'; //미세먼지
      let queryParams3 = '?' + encodeURIComponent('serviceKey') + `=${serviceKey}`; /* Service Key*/
      queryParams3 += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('JSON'); /* */
      queryParams3 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
      queryParams3 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
      queryParams3 += '&' + encodeURIComponent('inqBginDt') + '=' + encodeURIComponent(`${dustDate1}`); /* */
      queryParams3 += '&' + encodeURIComponent('inqEndDt') + '=' + encodeURIComponent(`${dustDate2}`); /* */
      queryParams3 += '&' + encodeURIComponent('msrstnName') + '=' + encodeURIComponent(`${dustCity}`); /* */
      
      (async () => {
        const dataShort = await axios.get(url+queryParams);
        const dataMedium1 = await axios.get(url1+queryParams1);
        const dataMedium2 = await axios.get(url2+queryParams2);
        const fineDust = await axios.get(url3+queryParams3);
        // console.log(fineDust.data.response.body.items);
        const dustDataSet = fineDust.data.response.body.items !== (undefined && null && NaN)? fineDust.data.response.body.items:"-";
        // console.log(dustDataSet);
        resultPage("/result",{
          state : {
            city: matchCity[cityIndex].cities, 
            data:dataShort.data.response.body.items.item,
            dustData: dustDataSet,
            medium1:dataMedium1.data.response.body.items.item[0],
            medium2:dataMedium2.data.response.body.items.item[0]
          }
        });
        // console.log(dataShort.data.response.body.items.item);
      })();
    }
  }
  useEffect(()=>{
  },[loadingPop,infoPopS]);

  useEffect(()=>{
    if(deleteLi.current !== undefined && deleteLi.current !== null){
      deleteLi.current.style.setProperty('border-left', 'transparent');
    }
    if(focusLi.current !== undefined && focusLi.current !== null){
      focusLi.current.style.setProperty('border-left', '10px solid rgb(255,255,255)');
    }
    window.addEventListener("keyup", countP);
    return () => { window.removeEventListener("keyup", countP) };
  },[cityIndex,matchCity,cityXY,medium1,medium2]);

  return (
    <div className="searchZoneWrap">
      { infoPopS? infoPopS:null }
      { loadingPop? loadingPop:null }
      <div>
        <input 
        className="searchZoneInput" 
        type="text" 
        onChange={ searchInput } 
        value={ inputTxt }
        />
      </div>
      <div className="matchCityWrap">
        <ul id="selectCity" >
          { changeCityWrap() }
        </ul>
      </div>
    </div>
  )
}
export default SearchZone;