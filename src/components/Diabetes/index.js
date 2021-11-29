import React, { useEffect } from "react";
import { Col, FloatingLabel, Form, Row, Button } from "react-bootstrap";
import FormComponent from "../Form/form";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { Slide, Snackbar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ProgressComponent from "../ProgressBar";

function Diabetes() {
  const [Pregnancies, setPregnancies] = useState(0);
  const [Glucose, setGlucose] = useState(0);
  const [BloodPressure, setBloodPressure] = useState(0);
  const [SkinThickness, setSkinThickness] = useState(0);
  const [Insulin, setInsulin] = useState(0);
  const [BMI, setBMI] = useState(0);
  const [DiabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState(0);
  const [Age, setAge] = useState(0);

  const [prob, setProb] = useState(0);

  const colorArray = ["#FF0000", "#63E13D"];
  const [color, setColor] = useState(colorArray[1]);
  const [isDaignose, setIsDaignose] = useState(0);

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState(0);
  const [alertString, setAlertString] = useState(0);

  const [openDailog, setOpenDialog] = useState(false);
  const theme = useTheme();

  const handleClickOpenDailog = () => {
    setOpenDialog(true);
  };

  const handleCloseDailog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (isDaignose == 0) {
      setAlertString("There's " + prob + " % chance that you're healthy!");
    } else {
      setAlertString("There's " + prob + " % chance that you've daibetes :(");
    }
  }, [isDaignose, prob]);

  function handleClick() {
    fetch("/data", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 3,
        features: [
          Pregnancies,
          Glucose,
          BloodPressure,
          SkinThickness,
          Insulin,
          BMI,
          DiabetesPedigreeFunction,
          Age,
        ],
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json["DIAG"], json["PROB_POS"]);
        if (json["DIAG"] === "0") {
          console.log(alertType);
          setIsDaignose(0);
          setProb((json["PROB_NEG"] * 100).toFixed(2));
          setAlertString("There's " + prob + " % chance that you're healthy!");
          setColor(colorArray[1]);
        } else if (json["DIAG"] === "1") {
          setIsDaignose(1);
          setProb((json["PROB_POS"] * 100).toFixed(2));
          setAlertString(
            "There's " + prob + " % chance that you've daibetes :("
          );
          setColor(colorArray[0]);
        }
        setOpenDialog(true);
      });
  }

  useEffect(() => {
    if (isDaignose == 0) {
      setAlertString("There's " + prob + " % chance that you're healthy!");
    } else {
      setAlertString(
        "There's " + prob + " % chance that you've Heart disease :("
      );
    }
  }, [isDaignose, prob]);

  function changePregnancies(a) {
    setPregnancies(a);
  }
  function changeGlucose(a) {
    setGlucose(a);
  }
  function changeBloodPressure(a) {
    setBloodPressure(a);
  }
  function changeSkinThickness(a) {
    setSkinThickness(a);
  }
  function changeInsulin(a) {
    setInsulin(a);
  }
  function changeBMI(a) {
    setBMI(a);
  }
  function changeDiabetesPedigreeFunction(a) {
    setDiabetesPedigreeFunction(a);
  }
  function changeAge(a) {
    setAge(a);
  }
  return (
    <div className="py-4">
      <h3 className="mb-4">Please fill the details</h3>

      <Form className="mb-5">
        <Row>
          <Col md={6} className="px-0">
            <FormComponent
              id="fromPregnancies"
              featureName="Pregnancies"
              func={changePregnancies}
            ></FormComponent>
            <FormComponent
              id="fromGlucose"
              featureName="Glucose"
              func={changeGlucose}
            ></FormComponent>
            <FormComponent
              id="fromBloodPressure"
              featureName="Blood Pressure"
              func={changeBloodPressure}
            ></FormComponent>
            <FormComponent
              id="fromSkinThickness"
              featureName="Skin Thickness:"
              func={changeSkinThickness}
            ></FormComponent>
          </Col>
          <Col md={6} className="px-0">
            <FormComponent
              id="fromInsulin"
              featureName="Insulin"
              func={changeInsulin}
            ></FormComponent>
            <FormComponent
              id="fromBMI"
              featureName="BMI"
              func={changeBMI}
            ></FormComponent>
            <FormComponent
              id="fromDiabetesPedigreeFunction"
              featureName="Diabetes Pedigree Function"
              func={changeDiabetesPedigreeFunction}
            ></FormComponent>
            <FormComponent
              id="fromAge"
              featureName="Age"
              func={changeAge}
            ></FormComponent>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleClick}>
          SUBMIT
        </Button>{" "}
      </Form>

      <Dialog
        open={openDailog}
        onClose={handleCloseDailog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <h4>{"Your Diabetes Prediction"}</h4>
        </DialogTitle>
        <DialogContent>
          <ProgressComponent progressVal={prob} colorVal={color} />
          <DialogContentText>{alertString}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDailog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Diabetes;
