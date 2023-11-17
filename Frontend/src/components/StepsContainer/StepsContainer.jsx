import React, { useContext, useEffect, useState } from "react";
import styles from "./StepsContainer.module.css";
import Joi from "joi";
import useForm from "../../hooks/useForm";
import Step from "./Step";
import Input from "../../components/Input/Input";

const schema = Joi.object({
    step: Joi.string().min(3).max(400).required(),
  });

function StepsContainer({ callback }) {
    const [steps, setSteps] = useState([]);

    const form = useForm(schema, {
        step: "",
      });

    const addStep = (newStep) => {
        if(form.validate()){
            setSteps([...steps, newStep]);
            form.setValue("step", "");
        };
        callback(steps);
    };

    const removeStep = (elemId) => {
        setSteps(steps.filter((element, id) => elemId != id));
        callback(steps);
    }

    return (
        <>
          <div className={styles.stepsContainer}>
            {steps.map((step, id) => {
                return (
                    <Step step={step} id={id} removeCallback={removeStep} />
                )
            })}
            <div className={styles.formContainer}>
                <span className={styles.stepNumber}>{steps.length + 1}.</span>
                <div className={styles.inputArea}>
                    <label htmlFor="stepInput" className={styles.descLabel}><span className={styles.descLabelSpan}>Step Description*</span></label>
                    <textarea
                        name="stepInput"
                        id="stepInput"
                        rows="5"
                        value={form.values.step}
                        onChange={form.onChange("step")}
                        className={styles.descInput}
                        maxLength={400}
                    />
                </div>
                <button
                    className={styles.addBtn}
                    disabled={!(form.values.step.length > 2)}
                    onClick={() => {addStep(form.values.step)}}>
                    +
                </button>
            </div>
          </div>
        </>
      );
};

export default StepsContainer;