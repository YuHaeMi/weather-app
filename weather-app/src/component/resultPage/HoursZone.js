import { React, useState, useEffect, useRef } from "react";
import { useHorizontalScroll } from "../../js/useSideScroll";
import sun from '../../img/sun.png';
import cloud_sun from '../../img/cloud_sun.png';
import cloud from '../../img/cloud.png';
import rain from '../../img/rain.png';
import snow from '../../img/snow.png';

const HoursZone = (props) =>{
  const [data24Hours, setData24Hours] = useState();
  const [skySetting, setSkySetting] = useState({sky1:sun, sky3:cloud_sun, sky4:cloud, pty1:rain, pty2:rain, pty3:snow, pty4:rain});
  const scrollRef = useHorizontalScroll();
  useEffect(()=>{
    if(props.hoursData !== (null && undefined)){
      const nowT = new Date();
      // console.log(nowT.getHours());
      const newNow = `${nowT.getHours() < 10? "0"+nowT.getHours()+"00" : nowT.getHours()+"00"}`
      let skyState = '';
      setData24Hours(props.hoursData.hour24D.map((v,i,a)=>{
        const pty = v[Object.keys(v)].pty24D;
        const sky = v[Object.keys(v)].sky24D;
        if(pty !== 0){
          skyState = skySetting[`sky${sky}`];
        }else{
          skyState = skySetting[`pty${pty}`];
        }
        return (
          <div key={i} className={ `timeWrapDiv${Object.keys(v).toString() === newNow? 'Background':''}` }>
            <p style={{ color:Object.keys(v).toString() === newNow? '#fff':'#333'  }}>{ Object.keys(v).toString() === newNow? "지금" : Object.keys(v).toString().slice(0,2)+"시" }</p>
            <div>
              <img src={skyState}/>
            </div>
            <p style={{ color:Object.keys(v).toString() === newNow? '#fff':'#333'  }}>{ v[Object.keys(v)].tmp24D }&#x2103;</p>
          </div>
        )
      })
      )
    }
  },[props.hoursData]);
  useEffect(()=>{
    if(data24Hours !==  undefined){

    }
  },[data24Hours,skySetting]);
  return (
    <div className="hoursZone">
      <section className="hoursWrap">
        <article className="todayWrap">
          <p>
            <span>
              Today
            </span>
            <span>
              24시간동안의 날씨정보 입니다.
            </span>
          </p>
        </article>
        <article className="timeWrap" ref={ scrollRef }>
          <div>
            { data24Hours? data24Hours:null }
          </div>
        </article>
      </section>
    </div>
  )
}
export default HoursZone;