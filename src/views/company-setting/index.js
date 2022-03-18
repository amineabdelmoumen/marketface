import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Icon } from "@iconify/react";
import Identite from "../../components/form-company/Identite";
import Marque from "../../components/form-company/marque";
import Catalogue from "../../components/form-company/catalogue";
import {setFormStage} from "../../store/rootSlice";
import Cible from "../../components/form-company/cible";
import Article from '../../components/form-company/article';
import "./styles.scss";
import {getProfile} from "../../lib/crud";
import {setProfil} from "../../store/profileSlice";
import {checkAuth} from "../../lib/auth";
import {useNavigate} from "react-router-dom";
import PageLoading from "../../components/PageLoading";

function CompanySetting() {
  const navigate = useNavigate()
  const pageStage = useSelector((state) => state.root.FormStage);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem('token')
    checkAuth(token)
      .then(res => res.data)
      .then(data => {
        if(data.profile_completed) {
          navigate('/profil')
        }else {
          getProfile(token)
            .then((res) => res.data)
            .then((data) => {
              dispatch(setProfil(data))
              setLoading(false)
            })
        }
      })
  }, [])
  return (
    <>
      {
        loading ?
          <PageLoading />
          :
          <div>
            <div className="background"></div>
            <section className="company-steps-icons">
              <h2>Création de votre profil</h2>
              <div className="steps-icons">
                {/* <p className="line"></p> */}
                <div className={pageStage === 1 ? `step step-active` : `step`}>
                  <p className="step-icon" onClick={() => dispatch(setFormStage(1))}>
                    <Icon id="icon" icon="bi:fingerprint" />
                  </p>
                  <p className="title">Identité</p>
                </div>

                <div className={pageStage === 2 ? `step step-active` : `step`}>
                  <p className="step-icon" onClick={() => dispatch(setFormStage(2))}>
                    <Icon id="icon" icon="fa-solid:bullhorn" />
                  </p>
                  <p className="title">Image de marque</p>
                </div>

                <div className={pageStage === 3 || pageStage === 4 ? `step step-active` : `step`}>
                  <p className="step-icon" onClick={() => dispatch(setFormStage(3))}>
                    <Icon id="icon" icon="iconoir:open-in-browser" />
                  </p>
                  <p className="title">E-Catalogue</p>
                </div>

                <div className={pageStage === 5 ? `step step-active` : `step`}>
                  <p className="step-icon" onClick={() => dispatch(setFormStage(5))}>
                    <Icon id="icon" icon="fluent:target-arrow-16-filled" />
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
                  4: <Article />,
                  5: <Cible />
                }[pageStage]
              }
            </div>
          </div>
      }
    </>
  );
}

export default CompanySetting;
