import React, { useState, useEffect, use } from "react";
import { getProfile } from "../../lib/crud";
import { checkAuth } from "../../lib/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import About from "./profilComponents/About";
import CompanyCard from "./profilComponents/CompanyCard";
import CompanyDetails from "./profilComponents/CompanyDetails";
import CompanyTeam from "./profilComponents/CompanyTeam";
import PageLoading from "../../components/PageLoading";
import NavBar from "./profilComponents/NavBar";
import SideBar from "./profilComponents/SideBar";
import "./styles.scss";
import { setProfil, setReferences } from "../../store/profileSlice";
import Layout from "./Layout";
import Identity from "./profilComponents/Identity";

function Profil() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profilSection, setProfilSection] = useState(1);

  useEffect(async () => {
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
  const style = {
    marginRight: "10px",
  };

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div>
          <Layout setProfilSection={setProfilSection}>
            <div className="row">
              <div className="col-12 col-md-3">
                <CompanyCard />
              </div>

              {profilSection == 1 ? (
                <div className="col-12 col-md-9">
                  <div className="row mb-4 mt-2 ">
                    <div className="d-flex  flex-wrap position-relative">
                      <div className="xfg-line"></div>
                      <div
                        className={
                          tab == 1 ? "xfg xfg-clicked position-relative" : "xfg"
                        }
                        onClick={() => setTab(1)}
                      >
                        {tab == 1 ? <div className="xfg-line-elem"></div> : ""}
                        <p> A propos</p>
                      </div>
                      <div
                        className={
                          tab == 2 ? "xfg xfg-clicked position-relative" : "xfg"
                        }
                        onClick={() => setTab(2)}
                      >
                        {" "}
                        {tab == 2 ? <div className="xfg-line-elem"></div> : ""}
                        <p>Identité</p>
                      </div>
                      <div
                        className={
                          tab == 3
                            ? "xfg xfg-clicked  position-relative"
                            : "xfg"
                        }
                        onClick={() => setTab(3)}
                      >
                        {" "}
                        {tab == 3 ? <div className="xfg-line-elem"></div> : ""}
                        <p>Equipe</p>
                      </div>
                      <div
                        className={
                          tab == 4
                            ? "xfg xfg-clicked  position-relative"
                            : "xfg"
                        }
                        onClick={() => setTab(4)}
                      >
                        {tab == 4 ? <div className="xfg-line-elem"></div> : ""}
                        <p>Références</p>
                      </div>
                      <div
                        className={
                          tab == 5
                            ? "xfg xfg-clicked  position-relative"
                            : "xfg"
                        }
                        onClick={() => setTab(5)}
                      >
                        {tab == 5 ? <div className="xfg-line-elem"></div> : ""}
                        <p>Marque(s)</p>
                      </div>
                      <div
                        className={
                          tab == 6
                            ? "xfg xfg-clicked  position-relative"
                            : "xfg"
                        }
                        onClick={() => setTab(6)}
                      >
                        {tab == 6 ? <div className="xfg-line-elem"></div> : ""}
                        <p>Evènement(s)</p>{" "}
                      </div>
                      <div
                        className={
                          tab == 7
                            ? "xfg xfg-clicked  position-relative"
                            : "xfg"
                        }
                        onClick={() => setTab(7)}
                      >
                        {tab == 7 ? <div className="xfg-line-elem"></div> : ""}
                        <p>Catalogue</p>
                      </div>
                      <div
                        className={
                          tab == 8
                            ? "xfg xfg-clicked  position-relative"
                            : "xfg"
                        }
                        onClick={() => setTab(8)}
                      >
                        {tab == 8 ? <div className="xfg-line-elem"></div> : ""}
                        <p>Service</p>
                      </div>
                      <div
                        className={
                          tab == 9
                            ? "xfg xfg-clicked  position-relative"
                            : "xfg"
                        }
                        onClick={() => setTab(9)}
                        style={{ marginRight: "0" }}
                      >
                        {tab == 9 ? <div className="xfg-line-elem"></div> : ""}
                        <p>Bien immobilier</p>
                      </div>
                    </div>
                  </div>
                  {
                    {
                      1: <About />,
                      2: <Identity />,
                    }[tab]
                  }
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="row mt-2">
              <div className="col-12 col-md-12">
                <CompanyDetails />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-md-12 about1">
                <CompanyTeam />
              </div>
            </div>
          </Layout>
        </div>
      )}
    </>
  );
}

export default Profil;
