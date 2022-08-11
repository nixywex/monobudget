import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <div className={"footer"}>
      <p className={"footer__text"}>
        Цей додаток є неофіційним додатком monobank і зроблений лише в учбових цілях.{" "}
        <span className={"footer__text_warning"}>Не вводьте свій реальний токен</span>, через те, що
        додаток може бути небезпечним. Данний застосунок зроблений для демонстрації роботи з API
        monobank.
      </p>
    </div>
  );
};

export default Footer;
