import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Icon } from "@iconify/react";
import Indentite from "../../components/form-company/Indentite";
import Marque from "../../components/form-company/marque";
import Catalogue from "../../components/form-company/catalogue";
import {setFormStage} from "../../store/rootSlice";
import Cible from "../../components/form-company/cible";
import Article from '../../components/form-company/article';
import "./styles.scss";

function Profil() {
  const pageStage = useSelector((state) => state.root.FormStage);
  const dispatch = useDispatch()
  return (
    <div>
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
            1: <Indentite />,
            2: <Marque />,
            3: <Catalogue />,
            4: <Article />,
            5: <Cible />
          }[pageStage]
        }
      </div>
    </div>
  );
}

export default Profil;
