import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../styles.scss";
export default function SideBar({
  setSideBarColumns,
  sideBarColumns,
  setProfilSection,
  setCompanySection,
  companySection,
}) {
  console.log(setSideBarColumns, sideBarColumns);
  const navigate = useNavigate();
  const [sideLinks, setSideLinks] = useState(0);
  const [bgcolor, setBgcolor] = useState(1);

  const style = {
    height: "20px",
    width: "106%",
    paddingTop: "25px",
    paddingBottom: "25px",
    borderRadius: "4px",
  };
  const setData = (id) => {
    setBgcolor(id);
    setProfilSection(id);
  };

  return (
    <div
      className="sidebar-container"
      onMouseMove={() => setSideBarColumns(1)}
      onMouseLeave={() => setSideBarColumns(0)}
    >
      <div className="items">
        <div
          onClick={() => setData(1)}
          className="elem1 d-flex align-items-center position-relative"
          style={bgcolor == 1 ? { ...style, background: "#36A9E1" } : style}
          /* */
        >
          {bgcolor == 1 ? <p className="line-s"></p> : ""}

          <div
            className="d-flex align-items-center"
            style={{ height: "20px", width: "30px", marginLeft: "16px" }}
          >
            <img
              className=""
              src={bgcolor == 1 ? "/imgs/apercu12.png" : "/imgs/aperc10.png"}
              alt=""
            />
          </div>

          <div style={{ height: "20px" }}>
            <span
              className={
                bgcolor == 1
                  ? " side-text text-white d-none d-lg-block "
                  : "side-text  d-none d-lg-block"
              }
            >
              Aperçu
            </span>
          </div>
        </div>

        <div
          onClick={() => setData(2)}
          className="elem1 d-flex align-items-center "
          style={bgcolor == 2 ? { ...style, background: "#36A9E1" } : style}
          /* */
        >
          {bgcolor == 2 ? <p className="line-s"></p> : ""}
          <div className="auc ">
            <img
              className=""
              src={bgcolor == 2 ? "/imgs/icon-auc.png" : "/imgs/auction2.png"}
              alt=""
            />
          </div>
          <div
            className="d-flex align-items-center"
            style={{ height: "20px", width: "30px", marginLeft: "16px" }}
          >
            <img
              className=""
              src={bgcolor == 2 ? "/imgs/shape12.png" : "/imgs/shape11.png"}
              alt=""
            />
          </div>
          <div style={{ height: "20px" }}>
            <span
              className={
                bgcolor == 2
                  ? " side-text text-white  d-none d-lg-block "
                  : "side-text d-none d-lg-block"
              }
            >
              Mon entreprise
            </span>

            {bgcolor == 2 ? (
              <div style={{ marginTop: "28px", marginLeft: "-8px" }}>
                <p
                  className={
                    companySection == 1 ? "if-grn xfg-clicked" : "if-grn "
                  }
                  onClick={() => setCompanySection(1)}
                >
                  {" "}
                  Identite
                </p>
                <p className="if-grn">Image de marque</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          onClick={() => setData(3)}
          className="elem1 d-flex align-items-center "
          style={
            bgcolor == 3
              ? { ...style, background: "#36A9E1" }
              : bgcolor == 2
              ? { ...style, marginTop: "70px" }
              : style
          }
          /* */
        >
          {bgcolor == 3 ? <p className="line-s"></p> : ""}
          <div className="auc">
            <img
              className=""
              src={bgcolor == 3 ? "/imgs/icon-auc.png" : "/imgs/auction2.png"}
              alt=""
            />
          </div>
          <div
            className="d-flex align-items-center"
            style={{ height: "20px", width: "30px", marginLeft: "16px" }}
          >
            <img className="" src="/imgs/cat.png" alt="" />
          </div>
          <div style={{ height: "20px" }}>
            <span
              className={
                bgcolor == 3
                  ? " side-text text-white  d-none d-lg-block "
                  : "side-text  d-none d-lg-block"
              }
            >
              Mon catalogue
            </span>
            {bgcolor == 3 ? (
              <div style={{ marginTop: "28px" }}>
                <p
                  className={
                    companySection == 1 ? "if-grn xfg-clicked" : "if-grn "
                  }
                  onClick={() => setCompanySection(1)}
                >
                  {" "}
                  Produit
                </p>
                <p
                  className={
                    companySection == 2 ? "if-grn xfg-clicked" : "if-grn "
                  }
                  onClick={() => setCompanySection(2)}
                >
                  {" "}
                  Service
                </p>
                <p
                  className={
                    companySection == 3 ? "if-grn xfg-clicked" : "if-grn "
                  }
                  onClick={() => setCompanySection(3)}
                >
                  {" "}
                  Immobilier
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          onClick={() => setBgcolor(4)}
          className="elem1 d-flex align-items-center "
          style={
            bgcolor == 4
              ? { ...style, background: "#36A9E1" }
              : bgcolor == 3
              ? { ...style, marginTop: "90px" }
              : style
          }
          /* */
        >
          {bgcolor == 4 ? <p className="line-s"></p> : ""}

          <div
            className="d-flex align-items-center"
            style={{ height: "20px", width: "30px", marginLeft: "16px" }}
          >
            <img className="" src="/imgs/Status1.png" alt="" />
          </div>
          <div style={{ height: "20px" }}>
            <span
              className={
                bgcolor == 4
                  ? " side-text text-white d-none d-lg-block "
                  : "side-text  d-none d-lg-block"
              }
            >
              Mes notifications
            </span>
          </div>
        </div>
        <div
          onClick={() => setBgcolor(5)}
          className="elem1 d-flex align-items-center "
          style={bgcolor == 5 ? { ...style, background: "#36A9E1" } : style}
          /* */
        >
          {bgcolor == 5 ? <p className="line-s"></p> : ""}
          <div
            className="d-flex align-items-center"
            style={{ height: "20px", width: "30px", marginLeft: "16px" }}
          >
            <img className="" src="/imgs/echange.png" alt="" />
          </div>
          <div style={{ height: "20px" }}>
            <span
              className={
                bgcolor == 5
                  ? " side-text text-white  d-none d-lg-block "
                  : "side-text  d-none d-lg-block"
              }
            >
              Mes echange
            </span>
          </div>
        </div>
        <div
          onClick={() => setBgcolor(6)}
          className="elem1 d-flex align-items-center "
          style={bgcolor == 6 ? { ...style, background: "#36A9E1" } : style}
          /* */
        >
          {bgcolor == 6 ? <p className="line-s"></p> : ""}

          <div
            className="d-flex align-items-center"
            style={{ height: "20px", width: "30px", marginLeft: "16px" }}
          >
            <img className="" src="/imgs/phone.png" alt="" />
          </div>
          <div style={{ height: "20px" }}>
            <span
              className={
                bgcolor == 6
                  ? " side-text text-white d-none d-lg-block "
                  : "side-text d-none d-lg-block"
              }
            >
              Contacter nous
            </span>
          </div>
        </div>
        <div
          onClick={() => setBgcolor(7)}
          className="elem1 d-flex align-items-center "
          style={bgcolor == 7 ? { ...style, background: "#36A9E1" } : style}
          /* */
        >
          {bgcolor == 7 ? <p className="line-s"></p> : ""}

          <div
            className="d-flex align-items-center"
            style={{ height: "20px", width: "30px", marginLeft: "16px" }}
          >
            <img className="" src="" alt="" />
          </div>
          <div style={{ height: "20px" }}>
            <span
              className={
                bgcolor == 7
                  ? " side-text text-white  d-none d-lg-block "
                  : "side-text  d-none d-lg-block"
              }
            >
              Mon Centre d'aide
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
