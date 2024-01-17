import { React, useState, useEffect } from "react";
import RealTimeZone from "../component/resultPage/RealTimeZone";
import HoursZone from "../component/resultPage/HoursZone";
import DateWeatherZone from "../component/resultPage/DateWeatherZone";
import { useLocation } from "react-router-dom";
import "../css/resultPage.css";

const ResultPage = () =>{
  const getShortData = useLocation();
  const [cityName, setCityName] = useState("");
  const [sDataDemo, setSDataDemo] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const [nowDate, setNowDate] = useState("");
  const [nowTime, setNowTime] = useState("");
  const [today, setToday] = useState("");
  const [nextDate1, setNextDate1] = useState("");
  const [nextDate2, setNextDate2] = useState("");
  const [weekDate, setWeekDate] = useState(new Date());
  const [dustData, setDustData] = useState();
  useEffect(()=>{
    if(!null && !undefined){

      /*-- 실시간 데이터 start --*/
      const now = new Date();
      // console.log(today);
      setCityName(getShortData.state.city);
      setSDataDemo(getShortData.state.data);
      setNowDate(`${now.getFullYear()}${(now.getMonth()+1)<10? ("0"+(now.getMonth()+1)):now.getMonth()+1}${(now.getDate())<10? ("0"+(now.getDate())):now.getDate()}`);
      setNowTime(`${now.getHours()<10? "0"+now.getHours()+"00" : now.getHours()+"00"}`);
      if((cityName || nowDate || nowTime) !== '' && sDataDemo !== null){
        // console.log(nowDate);
        // console.log(nowTime);
        let tmp = '';
        let tmn = '';
        let tmx = '';
        let reh = '';
        let wsd = '';
        let sky = '';
        let pty = '';
        sDataDemo.filter(item => {
          if(item.fcstDate === nowDate){
            switch(item.category){
              case "TMX":
                tmx = item.fcstValue;
                break;
              case "TMN":
                tmn = item.fcstValue;
                break;
              default:
                break;
            }
            if(item.fcstTime === nowTime){
              switch(item.category){
                case "TMP":
                  tmp = item.fcstValue;
                  break;
                case "REH":
                  reh = item.fcstValue;
                  break;
                case "WSD":
                  wsd = item.fcstValue;
                  break;
                case "PTY":
                  pty = item.fcstValue;
                  break;
                case "SKY":
                  sky = item.fcstValue;
                  break;
                default:
                  break;
              }
            }
          }
        });
      const todayNow = new Date();
      const dustDate = new Date(todayNow);
      const dustDateSet = (`${dustDate.getFullYear()}-${(dustDate.getMonth()+1)<10? "0"+(dustDate.getMonth()+1):dustDate.getMonth()+1}-${(dustDate.getDate()-1)<10? "0"+(dustDate.getDate()-1):(dustDate.getDate()-1)}`);
      // console.log(dustDateSet);
      // console.log(getShortData.state.dustData);
      const yesterdayData = getShortData.state.dustData.filter(item => item.msurDt === dustDateSet);
      let pm10Data = '';
      if(yesterdayData[0] !== (undefined && null)){
        const dustPm10Data = parseInt(yesterdayData[0].pm10Value);
        // 0~30 좋음, 31~80 보통, 81~150나쁨 151 매우나쁨
        if(0 <= dustPm10Data || dustPm10Data <= 30){
          pm10Data = '좋음';
        }else if(31 <= dustPm10Data || dustPm10Data <= 30){
          pm10Data = '보통';
        }else if(81 <= dustPm10Data || dustPm10Data <= 150){
          pm10Data = '나쁨';
        }else if(dustPm10Data >= 151){
          pm10Data = '매우나쁨';
        }
      }else{
        pm10Data = '-';
      }
      /*-- 실시간 데이터 end --*/
      
      /*-- 24시간 데이터 start --*/
      let tmp24 = [];
      let sky24 = [];
      let pty24 = [];
      let time24 = [];
      const hours24 = getShortData.state.data.filter(item => item.fcstDate === nowDate );
      // console.log(hours24.filter(item => item.category === "TMP"));
      const data24 = hours24.filter(item => {
        switch(item.category){
          case "TMP":
            tmp24.push(item.fcstValue);
            break;
          case "SKY":
            sky24.push(item.fcstValue);
            break;
          case "PTY":
            pty24.push(item.fcstValue);
            time24.push(item.fcstTime);
            break;
          default:
            break;
        }
      })
      const dataHours24 = tmp24.map((v,i,a)=>{
        return { [time24[i]]:{tmp24D:v, sky24D: sky24[i], pty24D: pty24[i]} }
      });
      /*-- 24시간 데이터 end --*/

      /*-- 3일 데이터 start --*/
      // console.log(getShortData.state.data);
      const today0 = new Date(now.setDate(now.getDate()));
      const day0 = `${today0.getFullYear()}${(today0.getMonth()+1)<10? ("0"+(today0.getMonth()+1)): today0.getMonth()+1}${(today0.getDate())<10? ("0"+(today0.getDate())):today0.getDate()}`
      setToday(`${today0.getFullYear()}-${(today0.getMonth()+1)<10? ("0"+(today0.getMonth()+1)): today0.getMonth()+1}-${(today0.getDate())<10? ("0"+(today0.getDate())):today0.getDate()}`);
      const nextDay1 = new Date(now.setDate(now.getDate()+1));
      const day1 = `${nextDay1.getFullYear()}${(nextDay1.getMonth()+1)<10? ("0"+(nextDay1.getMonth()+1)):nextDay1.getMonth()+1}${(nextDay1.getDate())<10? ("0"+(nextDay1.getDate())):nextDay1.getDate()}`
      setNextDate1(`${nextDay1.getFullYear()}-${(nextDay1.getMonth()+1)<10? ("0"+(nextDay1.getMonth()+1)):nextDay1.getMonth()+1}-${(nextDay1.getDate())<10? ("0"+(nextDay1.getDate())):nextDay1.getDate()}`);
      const nextDay2 = new Date(now.setDate(now.getDate()+1));
      const day2 = `${nextDay1.getFullYear()}${(nextDay2.getMonth()+1)<10? ("0"+(nextDay2.getMonth()+1)):nextDay2.getMonth()+1}${(nextDay2.getDate())<10? ("0"+(nextDay2.getDate())):nextDay2.getDate()}`
      setNextDate2(`${nextDay1.getFullYear()}-${(nextDay2.getMonth()+1)<10? ("0"+(nextDay2.getMonth()+1)):nextDay2.getMonth()+1}-${(nextDay2.getDate())<10? ("0"+(nextDay2.getDate())):nextDay2.getDate()}`);
      let day0Obj = {}
      let day1Obj = {}
      let day2Obj = {}
      let day3Data = {}
      getShortData.state.data.filter(item =>{
        if(item.category === "TMX"){
          switch(item.fcstDate){
            case day0:
              day0Obj.tmxWD = parseInt(item.fcstValue);
              break;
            case day1:
              day1Obj.tmxWD = parseInt(item.fcstValue);
              break;
            case day2:
              day2Obj.tmxWD = parseInt(item.fcstValue);
              break;
            default:
              break;
          }
        }
        if(item.category === "TMN"){
          switch(item.fcstDate){
            case day0:
              day0Obj.tmnWD = parseInt(item.fcstValue);
              break;
            case day1:
              day1Obj.tmnWD = parseInt(item.fcstValue);
              break;
            case day2:
              day2Obj.tmnWD = parseInt(item.fcstValue);
              break;
            default:
              break;
          }
        }
        if(item.fcstTime === nowTime){
          switch(item.category){
            case "TMP":
              if(item.fcstDate === day0){
                day0Obj.tmpWD = item.fcstValue;
              }
              if(item.fcstDate === day1){
                day1Obj.tmpWD = item.fcstValue;
              }
              if(item.fcstDate === day2){
                day2Obj.tmpWD = item.fcstValue;
              }
              break;
            case "SKY":
              if(item.fcstDate === day0){
                day0Obj.skyWD = item.fcstValue;
              }
              if(item.fcstDate === day1){
                day1Obj.skyWD = item.fcstValue;
              }
              if(item.fcstDate === day2){
                day2Obj.skyWD = item.fcstValue;
              }
              break;
            case "PTY":
              if(item.fcstDate === day0){
                day0Obj.ptyWD = item.fcstValue;
              }
              if(item.fcstDate === day1){
                day1Obj.ptyWD = item.fcstValue;
              }
              if(item.fcstDate === day2){
                day2Obj.ptyWD = item.fcstValue;
              }
              break;
            default:
              break;
            }
        }
      });
      if((today && nextDate1 && nextDate2) !== ''){
        day3Data = {
          [today] : day0Obj,
          [nextDate1] : day1Obj,
          [nextDate2] : day2Obj
        };
        /*-- 3일 데이터 end --*/

        /*-- 주간 데이터 start --*/
        // console.log(weekDate);
        // console.log(getShortData.state.medium2);
        let weatherW = [];
        const weekDataSet = weekDate.map((v,i,a)=>{
          if((i+3)<8){
            weatherW.push(getShortData.state.medium2[`wf${i+3}Am`]);
          }
          if((i+3)>=8){
            weatherW.push(getShortData.state.medium2[`wf${i+3}`]);
          }
          return{
            [v]:{
              "tmxWD": getShortData.state.medium1[`taMax${i+3}`],
              "tmnWD": getShortData.state.medium1[`taMin${i+3}`],
              "skyWD": weatherW[i]
            }
          }
        });
        /*-- 주간 데이터 end --*/
          setRealTimeData({
            cityName:cityName,
            now:{ date:nowDate, skyD: parseInt(sky) ,ptyD: parseInt(pty) ,tmpD: parseInt(tmp), tmnD: parseInt(tmn), tmxD: parseInt(tmx), rehD: parseInt(reh), wsdD: parseFloat(wsd), pm10D:pm10Data },
            hour24D: dataHours24,
            weekD: day3Data,
            weekD10: weekDataSet
          });
        }
      }
    }
  },[sDataDemo,cityName,nowDate,nowTime,today,nextDate1,nextDate2]);
  useEffect(()=>{
    /*-- 주간 데이터 start --*/
    const nowW = new Date();
    const newD = new Date();
    let weekD = [];
    for(let i=3; i<=10; i++){
      // console.log(weekDate);
      weekD.push(new Date(newD.setDate(nowW.getDate()+i)));
    }
    const weekD2 = weekD.map((v,i,a)=>{
      return `${v.getFullYear()}-${v.getMonth()+1<10? "0"+(v.getMonth()+1) :(v.getMonth()+1)}-${v.getDate()<10? ("0"+v.getDate()):v.getDate()}`;
    });
    setWeekDate(weekD2);
    /*-- 주간 데이터 end --*/
  },[realTimeData]);
  return (
    <div className="resultWrap">
      <RealTimeZone nowData={realTimeData}/>
      <HoursZone hoursData={realTimeData}/>
      <DateWeatherZone weekData={realTimeData}/>
    </div>
  )
}
export default ResultPage;