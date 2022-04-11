import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <p className="profile d-none d-lg-block"> Profile</p>
        <div className="items">
          <Link to="ciblage">
            <img className=" icon1" src="/imgs/ciblage.png" alt="" />
          </Link>
          <Link to="ciblage">
            <span className="side-text p-1 d-none d-lg-block">Ciblage</span>
          </Link>
          <Link to="Enregistrement">
            <img className=" icon1" src="/imgs/enreg.png" alt="" />
          </Link>
          <Link to="Enregistrement">
            <span className="side-text p-1 d-none d-lg-block">
              Enregistrement
            </span>
          </Link>
          <Link to="Achat">
            <img className=" icon1" src="/imgs/achat.png" alt="" />
          </Link>
          <Link to="Achat">
            <span className="side-text p-1 d-none d-lg-block ">Achat</span>
          </Link>
          <Link to="Vente">
            <img className=" icon1" src="/imgs/vente.png" alt="" />{" "}
          </Link>
          <Link to="Vente">
            <span className="side-text p-1 d-none d-lg-block">Vente</span>
          </Link>
          <Link to="portefeuille">
            <img className="icon1" src="/imgs/porte.png" alt="" />
          </Link>
          <Link to="portefeuille">
            <span className="side-text p-1 d-none d-lg-block">
              Portefeuille
            </span>
          </Link>
          <Link to="statistiques">
            <img className=" icon1" src="/imgs/stat.png" alt="" />
          </Link>
          <Link to="statistiques">
            <span className="side-text p-1 d-none d-lg-block ">
              Statiques generales
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
