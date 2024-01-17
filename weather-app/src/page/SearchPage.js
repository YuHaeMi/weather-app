import { React, useState, useEffect, useRef } from "react";
import SearchZone from "../component/searchPage/SearchZone";
import "../css/searchPage.css";
const SearchPage = () =>{
  return (
    <section className="searchPageWrap">
      <div>
        <p className="searchP">지역을 선택해 주세요</p>
        <SearchZone/>
      </div>
    </section>
  )
}
export default SearchPage;