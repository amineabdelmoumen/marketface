import React, { useState } from "react";

export default function CompanyTeam() {
  const style = "text-bold text-black-50 mt-2";
  const [color, setColor] = useState(1);
  const style2 = {
    height: "50px",
    font: "normal normal normal 13px/13px Montserrat",
  };

  const nextStyle = {
    marginLeft: "60px",
  };
  return (
    <div className="container">
      <div className="row p-3">
        <div className="col-12 col-md-2">
          <p className={style} style={style2}>
            CERTIFICATS
          </p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style} style={style2}>
            MARQUES
          </p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style} style={style2}>
            PARTENAIRES
          </p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style} style={style2}>
            FILIALES
          </p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style} style={style2}>
            EVENNEMENT
          </p>
        </div>
        <div className="col-12 col-md-2">
          <p
            className={
              color == 1
                ? "text-bold text-success mt-2"
                : "text-bold text-primary-50 mt-2"
            }
            style={style2}
          >
            ÉQUIPE
          </p>
        </div>
      </div>
      {color == 1 ? (
        <div className="row m-4 border border-5 border-primary py-5">
          <div className="col-12 col-md-2 offset-lg-1">
            <img src="imgs/member1.png" alt="" />
          </div>
          <div className="col-12 col-md-2 ">
            <img src="imgs/member3.png" alt="" />
          </div>
          <div className="col-12 col-md-2">
            <img src="imgs/member2.png" alt="" />
          </div>
          <div className="col-12 col-md-2 ">
            <img src="imgs/member3.png" alt="" />
          </div>
          <div className="col-12 col-md-2  ">
            <img src="imgs/mem.png" style={nextStyle} alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
