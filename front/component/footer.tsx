import React from "react";

function Footer() {
  return (
    <div>
      <p className="copyright">
        서비스명 : 테이스트널리티 대표자명 : 이민석 사업자번호 : 163-24-01704{" "}
        문의 : tastenality@gmail.com
      </p>
      <p className="copyright">2022 - 2022 Tastenality</p>
      <ul>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <a href="#">Terms & Conditions</a>
        </li>
        <li>
          <a href="#">Private Policy</a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
