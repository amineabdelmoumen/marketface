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

function Profil() {
  const dispatch = useDispatch();
  const [sideBarColumns, setSideBarColumns] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const profil = useSelector((state) => state.profile);
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const profil = await getProfile(token);
    console.log(profil);
    checkAuth(token)
      .then((res) => res.data)
      .then((data) => {
        if (data.profile_completed) {
          navigate("/profil");
        } else {
          getProfile(token)
            .then((res) => res.data)
            .then((data) => {
              dispatch(setProfil(data));

              setLoading(false);
            });
        }
      });
  }, []);

  return (
    <>
      <div>
        <NavBar />
        <div className="container-fluid mt-5">
          <div className="row">
            <div
              className={
                sideBarColumns == 1
                  ? "col-2 position-fixed d-none d-lg-block"
                  : "col-1 position-fixed d-none d-lg-block"
              }
            >
              <SideBar
                setSideBarColumns={setSideBarColumns}
                sideBarColumns={sideBarColumns}
              />
            </div>

            <div
              className={
                sideBarColumns == 1
                  ? "col-12 col-lg-10 offset-lg-2"
                  : "col-12 col-lg-11 offset-lg-1"
              }
            >
              <div className="row">
                <div className="col-12 col-md-3">
                  <CompanyCard />
                </div>
                <div className="col-12 col-md-9">
                  <About />
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profil;
