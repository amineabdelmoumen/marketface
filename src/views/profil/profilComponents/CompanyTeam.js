import React from "react";

export default function CompanyTeam() {
  const style = "text-bold text-black-50 mt-2";
  const style2 = {
    height: "50px",
  };
  return (
    <div className="container">
      <div className="row p-3">
        <div className="col-12 col-md-2">
          <p className={style}>CERTIFICATS</p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style}>MARQUES</p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style}>PARTENAIRES</p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style}>FILIALES</p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style}>EVENNEMENT</p>
        </div>
        <div className="col-12 col-md-2">
          <p className={style}>Equipe</p>
        </div>
      </div>

      <div className="row m-4 border border-5 border-primary py-5">
        <div className="col-12 col-md-2 offset-md-2">
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
          <img src="imgs/mem.png" alt="" />
        </div>
      </div>
    </div>
  );
}
