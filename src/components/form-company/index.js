import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formStage, formCompany } from "../../store/rootSlice";
import Indentite from "./Indentite";
import "./styles.scss";

function FormUserCompany({ pageTitle, submitButtonText, previousButton }) {
  // redux
  const dispatch = useDispatch();

  // get Redux store values for FormUserCompany
  const currentStage = useSelector((state) => state.FormStage); // for previous button
  const stateSignup1 = useSelector((state) => state.FormUserCompany.signup1);
  const stateSignup2 = useSelector((state) => state.FormUserCompany.signup2);

  const state = useSelector((state) => state);
  const stateOutput = `JSON Data Form-Company: ${JSON.stringify(
    state,
    null,
    2
  )}`;
  //console.log(stateOutput) // output to console.log

  // toggle checkboxes onchange
  const [isChecked1, setIsChecked1] = useState(stateSignup1 || false); // from redux initial state or form
  const [isChecked2, setIsChecked2] = useState(stateSignup2 || false); // from redux initial state or form
  const handleChange1 = (e) => {
    setIsChecked1(!isChecked1);
  };
  const handleChange2 = (e) => {
    setIsChecked2(!isChecked2);
  };

  // onsubmit
  const [isSubmitted, setIsSubmitted] = useState(false); // state for form status
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    setIsSubmitted(true); // update form status to submitted
  };

  useEffect(() => {
    if (isSubmitted) {
      // check if form status submitted

      // update Redux Store Slice
      dispatch(
        formStage(3) // update formStage and move to next stage
      );
      dispatch(
        formCompany({
          signup1: isChecked1, // update form checkbox status
          signup2: isChecked2,
        })
      );
    }
  }, [isSubmitted, dispatch, stateOutput, isChecked1, isChecked2]);

  return (
    <>
      <Indentite />
      {/* <h2>{pageTitle || "Company"}</h2>

      <form name="form-Company" id="form-Company" onSubmit={handleSubmit}>
        <p className="form-boxes">
          <input
            type="checkbox"
            id="signup1"
            name="signup1"
            onChange={handleChange1}
            checked={isChecked1}
          />
          <label htmlFor="signup1">
            Recieve updates about Tray.io product by email
          </label>
        </p>

        <p className="form-boxes">
          <input
            type="checkbox"
            id="signup2"
            name="signup2"
            onChange={handleChange2}
            checked={isChecked2}
          />
          <label htmlFor="signup2">
            Recieve communication by email for other products created by the
            Tray.io team
          </label>
        </p>

        <div className="btn-array">
          {previousButton && (
            <p>
              <input
                type="submit"
                value={`Back`}
                onClick={() => dispatch(formStage(currentStage - 1))}
              />
            </p>
          )}
          <p>
            <input type="submit" value={submitButtonText || "Submit"} />
          </p>
        </div>
      </form> */}
    </>
  );
}

export default FormUserCompany;
