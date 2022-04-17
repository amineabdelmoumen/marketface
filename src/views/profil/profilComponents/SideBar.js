import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SideBar({ setSideBarColumns, sideBarColumns }) {
  console.log(setSideBarColumns, sideBarColumns);
  const navigate = useNavigate();
  const [sideLinks, setSideLinks] = useState(0);
  return (
    <div className="sidebar">
      <div
        className="sidebar-container"
        onMouseMove={() => setSideBarColumns(1)}
        onMouseLeave={() => setSideBarColumns(0)}
      >
        <div className="items">
          <div className="d-flex">
            <Link to="ciblage">
              <img className=" icon1" src="/imgs/ciblage.png" alt="" />
            </Link>
            {sideBarColumns == 1 ? (
              <Link to="ciblage">
                <span className="side-text p-1 d-none d-lg-block">Ciblage</span>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            <Link to="Enregistrement">
              <img className=" icon1" src="/imgs/enreg.png" alt="" />
            </Link>
            {sideBarColumns == 1 ? (
              <Link to="Enregistrement">
                <span className="side-text p-1 d-none d-lg-block">
                  Enregistrement
                </span>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            <Link to="Achat">
              <img className=" icon1" src="/imgs/achat.png" alt="" />
            </Link>

            {sideBarColumns == 1 ? (
              <Link to="Achat">
                <span className="side-text p-1 d-none d-lg-block ">Achat</span>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            <Link to="Vente">
              <img className=" icon1" src="/imgs/vente.png" alt="" />{" "}
            </Link>

            {sideBarColumns == 1 ? (
              <Link to="Vente">
                <span className="side-text p-1 d-none d-lg-block">Vente</span>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            <Link to="portefeuille">
              <img className="icon1" src="/imgs/porte.png" alt="" />
            </Link>
            {sideBarColumns == 1 ? (
              <Link to="portefeuille">
                <span className="side-text p-1 d-none d-lg-block">
                  Portefeuille
                </span>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            <Link to="statistiques">
              <img className=" icon1" src="/imgs/stat.png" alt="" />
            </Link>
            {sideBarColumns == 1 ? (
              <Link to="statistiques">
                <span className="side-text p-1 d-none d-lg-block ">
                  Statiques generales
                </span>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
