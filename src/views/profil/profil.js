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
import AbouIdentity from "./profilComponents/IdentityComponents/AbouIdentity";
import Catalogue from "./profilComponents/IdentityComponents/generalInfo";
import LegalInfo from "./profilComponents/IdentityComponents/legalInfo";
import FinancialInfo from "./profilComponents/IdentityComponents/financialInfo";
import ContactInfo from "./profilComponents/IdentityComponents/contactInfo";
import ProductList from "./profilComponents/catalogueComponent/productList";
import ProductForm from "./profilComponents/catalogueComponent/ProductForm";
import ServiceList from "./profilComponents/catalogueComponent/serviceList";
import ServiceMenu from "./profilComponents/catalogueComponent/ServiceMenu";
import ImmobilierForm from "./profilComponents/catalogueComponent/ImmobilierForm";
import ImmobilierList from "./profilComponents/catalogueComponent/immobilierList";

function Profil() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profilSection, setProfilSection] = useState(1);
  const profil = useSelector((state) => state.profile);
  const [identitySection, setIdentitySection] = useState(1);
  const [companySection, setCompanySection] = useState(1);
  const [progress, setProgress] = useState(1);
  const [action, setAction] = useState(1);
  useEffect(() => {
    if (Object.keys(profil.identite).length !== 0) {
      setProgress((old) => old + 1);
    }
    if (profil.articles.length !== 0) {
      setProgress((old) => old + 1);
    }
    if (Object.keys(profil.catalogue).length !== 0) {
      setProgress((old) => old + 1);
    }
    if (profil.marque.length !== 0) {
      setProgress((old) => old + 1);
    }
    if (profil.references.length !== 0) {
      setProgress((old) => old + 1);
    }
    if (profil.cible.length !== 0) {
      setProgress((old) => old + 1);
    }
    if (profil.register.length !== 0) {
      setProgress((old) => old + 1);
    }
  }, []);

  useEffect(async () => {
    const token = localStorage.getItem("token");

    checkAuth(token)
      .then((res) => res.data)
      .then((data) => {
        getProfile(token)
          .then((res) => res.data)
          .then((data) => {
            console.log("profil", data);
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
          <Layout
            setProfilSection={setProfilSection}
            setCompanySection={setCompanySection}
            companySection={companySection}
          >
            {profilSection == 1 ? (
              <div className="row">
                <div className="col-12 col-md-3">
                  <div className="row mb-2">
                    <div className=" col-6 col-md-8">
                      <p className="fty">Mon profile</p>
                    </div>
                  </div>
                  <CompanyCard />
                </div>
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
              </div>
            ) : (
              ""
            )}
            {profilSection == 2 && companySection == 1 ? (
              <div className="row">
                <div className="col-12 col-md-4">
                  <AbouIdentity
                    identitySection={identitySection}
                    setIdentitySection={setIdentitySection}
                    progress={progress}
                  />
                </div>

                <div className="col-12 col-md-8" style={{ marginTop: "41px" }}>
                  {
                    {
                      1: <Catalogue />,
                      2: <LegalInfo />,
                      3: <FinancialInfo />,
                      4: <ContactInfo />,
                    }[identitySection]
                  }
                </div>
              </div>
            ) : (
              ""
            )}
            {profilSection == 3 && companySection == 1 ? (
              <div className="row">
                {/* <div className="row">
                  <div className=" col-6 col-md-3">
                    <p className="fty">Produit</p>
                  </div>

                  <div className=" col-6 col-md-3">
                    <p className="fty">Service</p>
                  </div>

                  <div className=" col-6 col-md-3">
                    <p className="fty">Immobilier</p>
                  </div>
                </div> */}

                <div className="row">
                  <div className=" col-6 col-md-3">
                    <CompanyCard />
                  </div>

                  <div
                    className="col-12 col-md-9"
                    style={{ marginTop: "41px" }}
                  >
                    {
                      {
                        1: <ProductList setAction={setAction} />,
                        2: <ProductForm setAction={setAction} />,
                      }[action]
                    }
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {profilSection == 3 && companySection == 2 ? (
              <div className="row">
                {/* <div className="row">
                  <div className=" col-6 col-md-3">
                    <p className="fty">Produit</p>
                  </div>

                  <div className=" col-6 col-md-3">
                    <p className="fty">Service</p>
                  </div>

                  <div className=" col-6 col-md-3">
                    <p className="fty">Immobilier</p>
                  </div>
                </div> */}

                <div className="row">
                  <div className=" col-6 col-md-3">
                    <CompanyCard />
                  </div>

                  <div
                    className="col-12 col-md-9"
                    style={{ marginTop: "41px" }}
                  >
                    {
                      {
                        1: <ServiceList setAction={setAction} />,
                        2: <ServiceMenu setAction={setAction} />,
                      }[action]
                    }
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {profilSection == 3 && companySection == 3 ? (
              <div className="row">
                {/* <div className="row">
                  <div className=" col-6 col-md-3">
                    <p className="fty">Produit</p>
                  </div>

                  <div className=" col-6 col-md-3">
                    <p className="fty">Service</p>
                  </div>

                  <div className=" col-6 col-md-3">
                    <p className="fty">Immobilier</p>
                  </div>
                </div> */}

                <div className="row">
                  <div className=" col-6 col-md-3">
                    <CompanyCard />
                  </div>

                  <div
                    className="col-12 col-md-9"
                    style={{ marginTop: "41px" }}
                  >
                    {
                      {
                        1: <ImmobilierList setAction={setAction} />,
                        2: <ImmobilierForm setAction={setAction} />,
                      }[action]
                    }
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/*  <div className="row mt-2">
              <div className="col-12 col-md-12">
                <CompanyDetails />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-md-12 about1">
                <CompanyTeam />
              </div>
            </div> */}
          </Layout>
        </div>
      )}
    </>
  );
}

export default Profil;
