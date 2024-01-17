import { React, useState, useEffect, useRef } from "react";
import { useHorizontalScroll } from "../../js/useSideScroll";
import sun from '../../img/sun.png';
import cloud_sun from '../../img/cloud_sun.png';
import cloud from '../../img/cloud.png';
import rain from '../../img/rain.png';
import snow from '../../img/snow.png';

const DateWeatherZone = (props) =>{
  const [day3Data, setDay3Data] = useState();
  const [day10Data, setDay10Data] = useState();
  const [skySetting, setSkySetting] = useState({sky1:sun, sky3:cloud_sun, sky4:cloud, pty1:rain, pty2:rain, pty3:snow, pty4:rain});
  const [weekDay, setWeekDay] = useState(['일','월','화','수','목','금','토']);
  const scrollRef = useHorizontalScroll();
  useEffect(()=>{
    if(props.weekData !== null){
      const now = new Date();
      const today0 = new Date();
      const nextDay1 = new Date(now.setDate(now.getDate()+1));
      const nextDay2 = new Date(now.setDate(now.getDate()+1));

      // console.log(today0);
      // console.log(nextDay1);
      // console.log(nextDay2);
      
      const weekData = props.weekData;
      // console.log(weekData.weekD10);
      let day3Array = [];
      let skyState = '';
      setDay3Data(
        Object.keys(weekData.weekD).map((v,i,a) =>{
          const day3Item = new Date(v);
          const sky = Object.values(weekData.weekD)[i].skyWD;
          const pty = Object.values(weekData.weekD)[i].ptyWD;
          if(pty !== 0){
            skyState = skySetting[`sky${sky}`];
          }else{
            skyState = skySetting[`pty${pty}`];
          }
          switch(day3Item.getFullYear(),day3Item.getMonth(),day3Item.getDate()){
            case today0.getFullYear(),today0.getMonth(),today0.getDate():
              day3Array.push("오늘");
              break;
            case nextDay1.getFullYear(),nextDay1.getMonth(),nextDay1.getDate():
              day3Array.push("내일");
              break;
            case nextDay2.getFullYear(),nextDay2.getMonth(),nextDay2.getDate():
              day3Array.push("모레");
              break;
          }
          return(
          <div className="day3Zone" key={i}>
            <div>
              <p>{ day3Array[i] }</p>
              <div>
                <img src={skyState}/>
              </div>
              <p className="tmpZone">
                <span>
                  { Object.values(weekData.weekD)[i].tmxWD.toString() }&#x2103;
                </span>
                <span>
                  { Object.values(weekData.weekD)[i].tmnWD.toString() }&#x2103;
                </span>
              </p>
            </div>
          </div>
          )
        })
      );
      // console.log(weekData.weekD10);
      let weekSky = [];
      setDay10Data(
        weekData.weekD10.map((v,i,a)=>{
          // console.log(Object.values(skySetting).indexOf(Object.values(skySetting).includes(v[Object.keys(v)].skyWD)))
          switch(v[Object.keys(v)].skyWD){
            case "맑음":
              weekSky.push(skySetting[`sky1`]);
              break;
            case "구름많음":
              weekSky.push(skySetting[`sky3`]);
              break;
            case "흐림":
              weekSky.push(skySetting[`sky4`]);
              break;
            case "비":
              weekSky.push(skySetting[`pty1`]);
              break;
            case "비/눈":
              weekSky.push(skySetting[`pty2`]);
              break;
            case "눈":
              weekSky.push(skySetting[`pty3`]);
              break;
            case "소나기":
              weekSky.push(skySetting[`pty4`]);
              break;
            default:
              break;
          }
          const wDate = new Date(Object.keys(v));
          return(
            <div className="weekZone" key={i}>
              <div>
                <p className="weekDayDate">
                  <span>
                    {wDate.getDate()}일
                  </span>
                  <span>
                    ({weekDay[wDate.getDay()]})
                  </span>
                </p>
                <div>
                  <img src={ weekSky[i] }/>
                </div>
                <p className="tmpZone">
                  <span>
                    {v[Object.keys(v)].tmxWD}&#x2103;
                  </span>
                  <span>
                    {v[Object.keys(v)].tmnWD}&#x2103;
                  </span>
                </p>
              </div>
            </div>
          )
        })
      )
    }
  },[props.weekData]);

  useEffect(()=>{},[day3Data,day10Data]);
  return(
    <div className="dateWeatherZone">
      <section className="dateWrap">
        <article className="weekWrap">
          <p>
            <span>
              Weekly
            </span>
            <span>
              이번 주 날씨 정보입니다.
            </span>
          </p>
        </article>
        <article className="dayWrap" ref={ scrollRef }>
          { day3Data }
          { day10Data }
        </article>
      </section>
    </div>
  )
}
export default DateWeatherZone;