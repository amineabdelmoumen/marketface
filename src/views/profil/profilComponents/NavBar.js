import React from "react";

export default function NavBar() {
  return (
    <nav>
      <span className="search-box">
        <img className="search-icon" src="/imgs/search.svg" alt="" />
      </span>
      <div className="nav-icons">
        <img className=" icon" src="/imgs/add-user.svg" alt="" />
        <img className=" icon" src="/imgs/email.svg" alt="" />
        <img className=" icon" src="/imgs/bell.svg" alt="" />

        <img className=" icon" src="/imgs/profile.svg" alt="" />
      </div>
    </nav>
  );
}
