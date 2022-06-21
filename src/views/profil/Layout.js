import React, { useState } from "react";
import NavBar from "./profilComponents/NavBar";
import SideBar from "./profilComponents/SideBar";

export default function Layout({
  children,
  setProfilSection,
  setArticleType,

  companySection,
  setCompanySection,
  entrepriseSection,
  setEntrepriseSection,
}) {
  const [sideBarColumns, setSideBarColumns] = useState(0);
  return (
    <div>
      <div className="row">
        <div className="col-md-2 logo-marketface  d-none d-lg-block position-relative ">
          <img
            className="position-fixed"
            src="/imgs/marketface.png"
            alt="marketface image"
          />
        </div>
        <div className="col-12 col-md-10 marketface">
          {" "}
          <NavBar />
        </div>
      </div>
      <div className="row">
        <div
          className="col-2 position-fixed d-none d-lg-block"
          /* className={
         // sideBarColumns == 1
            ? "col-2 position-fixed d-none d-lg-block"
           // : "col-1 position-fixed d-none d-lg-block"
        } */
        >
          <SideBar
            setSideBarColumns={setSideBarColumns}
            sideBarColumns={sideBarColumns}
            setProfilSection={setProfilSection}
            setArticleType={setArticleType}
            companySection={companySection}
            setCompanySection={setCompanySection}
            entrepriseSection={entrepriseSection}
            setEntrepriseSection={setEntrepriseSection}
          />
        </div>

        <div
          className="col-12 col-lg-10 offset-lg-2"
          /* className={
          sideBarColumns == 1
            ? "col-12 col-lg-10 offset-lg-2"
            : "col-12 col-lg-11 offset-lg-1"
        } */
        >
          <div className="row  p-4" style={{ background: " #FAFBFF" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
