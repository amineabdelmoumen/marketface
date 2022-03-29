import React, { useState, useEffect } from "react";
import { getProfile } from "../../lib/crud";
import { useDispatch, useSelector } from "react-redux";
import About from "./profilComponents/About";
import CompanyCard from "./profilComponents/CompanyCard";
import CompanyDetails from "./profilComponents/CompanyDetails";
import CompanyTeam from "./profilComponents/CompanyTeam";
import NavBar from "./profilComponents/NavBar";
import SideBar from "./profilComponents/SideBar";
import "./styles.scss";
import { setProfil } from "../../store/profileSlice";

function Profil() {
  const dispatch = useDispatch();
  const profil = useSelector((state) => state.profile);
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const response = await getProfile(token);
    console.log(response.data);
    dispatch(setProfil(response.data));
  }, []);
  console.log("identite is", profil);
  return (
    <div>
      <NavBar />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-3 position-fixed d-none d-lg-block">
            <SideBar />
          </div>
          <div className="col-12 col-lg-9 offset-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
