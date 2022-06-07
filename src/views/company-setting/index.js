import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

import Identite from "../../components/form-company/Identite";
import Marque from "../../components/form-company/marque";
import Catalogue from "../../components/form-company/catalogue";
import { setFormStage } from "../../store/rootSlice";
import Cible from "../../components/form-company/cible";
import Article from "../../components/form-company/article";
import "./styles.scss";
import { getProfile } from "../../lib/crud";
import { setProfil } from "../../store/profileSlice";
import { checkAuth } from "../../lib/auth";
import { useNavigate, Link } from "react-router-dom";
import PageLoading from "../../components/PageLoading";

function CompanySetting() {
  const navigate = useNavigate();
  const pageStage = useSelector((state) => state.root.FormStage);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    checkAuth(token)
      .then((res) => res.data)
      .then((data) => {
        getProfile(token)
          .then((res) => res.data)
          .then((data) => {
            dispatch(setProfil(data));
            setLoading(false);
          });
      });
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root"); //persist:root = is profile slice key
    navigate("/");
  };
  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div>
          <div className="background"></div>
          <section className="company-steps-icons container position-relative">
            <div className="row">
              <div className="col-2">
                <div className="d-flex " onClick={handleDisconnect}>
                  <img
                    src="/imgs/logout.png"
                    alt=""
                    style={{ marginRight: "10px" }}
                  />
                  <p className="lg-out" style={{ fontSize: "14px" }}>
                    Déconnexion
                  </p>
                </div>
              </div>
            </div>
            <div className="row  ">
              <div className=" wrapper col-12 col-md-3 offset-md-5">
                <p style={{ fontSize: "16px" }} className="activite ">
                  Création de votre Profil
                </p>
              </div>
            </div>

            <div className="steps-icons">
              <div className={pageStage === 1 ? `step step-active` : `step`}>
                <p
                  className=" d-flex justify-content-center align-items-center step-icon"
                  onClick={() => dispatch(setFormStage(1))}
                >
                  <img src="/imgs/search1.png" alt="" />
                </p>
                <p className="title">Identité</p>
              </div>
              <p className="line"></p>
              <div className={pageStage === 2 ? `step step-active` : `step`}>
                <p
                  className=" d-flex justify-content-center align-items-center step-icon"
                  onClick={() => dispatch(setFormStage(2))}
                >
                  <img src="/imgs/marque.png" alt="" />
                </p>
                <p className="title">Image de marque</p>
              </div>

              <div className={pageStage === 3 ? `step step-active` : `step`}>
                <p
                  className=" d-flex justify-content-center align-items-center step-icon"
                  onClick={() => dispatch(setFormStage(3))}
                >
                  <img src="/imgs/catalogue.png" alt="" />
                </p>
                <p className="title">E-Catalogue</p>
              </div>

              <div className={pageStage === 5 ? `step step-active` : `step`}>
                <p
                  className=" d-flex justify-content-center align-items-center step-icon"
                  onClick={() => dispatch(setFormStage(5))}
                >
                  <img src="/imgs/target.png" alt="" />
                </p>
                <p className="title">Cible</p>
              </div>
            </div>
          </section>

          {/* ---  Profil Creation Steps---- */}
          <div className="">
            {
              {
                1: <Identite />,
                2: <Marque />,
                3: <Catalogue />,
                5: <Cible />,
                4: <Article />,
              }[pageStage]
            }
          </div>
        </div>
      )}
    </>
  );
}

export default CompanySetting;
