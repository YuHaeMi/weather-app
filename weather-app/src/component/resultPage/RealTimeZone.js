import { React, useState, useEffect, useRef } from "react";
import sun from '../../img/sun.png';
import cloud_sun from '../../img/cloud_sun.png';
import cloud from '../../img/cloud.png';
import rain from '../../img/rain.png';
import snow from '../../img/snow.png';

const RealTimeZone = (props) =>{
  const [nowCity, setNowCity] = useState();
  const [nowTmp, setNowTmp] = useState('');
  const [nowTmn, setNowTmn] = useState('');
  const [nowTmx, setNowTmx] = useState('');
  const [nowReh, setNowReh] = useState();
  const [feelTmp, setFeelTmp] = useState();
  const [pm10Data, setPm10Data] = useState();
  const [skySetting, setSkySetting] = useState({sky1:"맑음", sky3:"구름많음", sky4:"흐림", pty1:"비", pty2:"비/눈", pty3:"눈", pty4:"소나기"});
  const [skyImg, setSkyImg] = useState({sky1:sun, sky3:cloud_sun, sky4:cloud, pty1:rain, pty2:rain, pty3:snow, pty4:rain});
  const [skyState, setSkyState] = useState("");
  const [skyImgStr, setSkyImgStr] = useState("");
  useEffect(()=>{
    if(props.nowData !== null){
      if((props.nowData.cityName||props.nowData.now) !== undefined){
        const temp = Number(props.nowData.now.tmpD);
        const wsd = Number(props.nowData.now.wsdD);
        const reh = Number(props.nowData.now.rehD);
        const sky = Number(props.nowData.now.skyD);
        const pty = Number(props.nowData.now.ptyD);
        setNowCity(props.nowData.cityName);
        setNowTmp(props.nowData.now.tmpD);
        setNowTmn(props.nowData.now.tmnD);
        setNowTmx(props.nowData.now.tmxD);
        setNowReh(props.nowData.now.rehD);
        setPm10Data(props.nowData.now.pm10D);

        if(pty === 0){
          setSkyState(skySetting[`sky${sky}`]);
          setSkyImgStr(skyImg[`sky${sky}`]);
        }else{
          setSkyState(skySetting[`pty${pty}`]);
          setSkyImgStr(skyImg[`sky${sky}`]);
        }

        /*-- 체감온도 start --*/
        const today = new Date();
        //습구온도 공식
        const wetTmp = temp * Math.atan(0.151977 * (reh + 8.313659) ** (1 / 2)) + Math.atan(temp + reh) - Math.atan(reh - 1.67633) + 0.00391838 * (reh ** (3 / 2)) * Math.atan(0.023101 * reh) - 4.686035;
        // 여름 체감온도
        const summerT = 0.2442 + 0.55399 * wetTmp + 0.45535 * temp - 0.0022 * wetTmp * 2 + 0.00278 * wetTmp * temp + 3.0;
        // 겨울 체감온도
        const winterT = 13.12 + 0.6215 * temp - 11.37 * (wsd ** 0.16) + 0.3965 * (wsd ** 0.16) * temp;
        if(today.getMonth()+1 === (5||6||7||8||9)){
          setFeelTmp(parseInt(summerT).toString());
        }else{
          setFeelTmp(parseInt(winterT).toString());
        }
        /*-- 체감온도 end --*/
      }
    }
  },[props.nowData]);
  useEffect(()=>{
  },[nowCity,nowTmp,nowTmn,nowTmx,nowReh,feelTmp,skySetting,skyState,pm10Data,skyImg,skyImgStr]);
  return (
    <div className="realTimeZone">
      <section className="nameZone">
        <p>{ nowCity? nowCity:'찾을 수 없음' }</p>
      </section>
      <section className="commentZone">
        <div className="weatherImg">
          <img src={ skyImgStr }/>
        </div>
        <p>{ skyState }</p>
        <p>{ nowTmp.toString()? nowTmp:null }&#x2103;</p>
      </section>
      <section className="infoZone">
        <article>
          <div>
            <p>최고</p>
            <p>{ nowTmx.toString()? nowTmx:null }&#x2103;</p>
          </div>
          <div>
            <p>최저</p>
            <p>{ nowTmn.toString()? nowTmn:null }&#x2103;</p>
          </div>
          <div>
            <p>습도</p>
            <p>{ nowReh? nowReh:null }%</p>
          </div>
          <div>
            <p>체감온도</p>
            <p>{ feelTmp? feelTmp:null }&#x2103;</p>
          </div>
          <div>
            <p>미세먼지</p>
            <p>{ pm10Data? pm10Data:"-" }</p>
          </div>
        </article>
      </section>
    </div>
  )
}
export default RealTimeZone;