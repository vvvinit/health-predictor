import React, { useEffect } from "react";
import { Col, FloatingLabel, Form, Row, Button } from "react-bootstrap";
import FormComponent from "../Form/form";
import { useState } from "react";
import { Alert, Slide, Snackbar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ProgressComponent from "../ProgressBar";

function Liver() {
  const [features, setFeatures] = useState([]);
  const [Sex, setSex] = useState(0);
  const [Total_Bilirubin, setTotal_Bilirubin] = useState(0);
  const [Direct_Bilirubin, setDirect_Bilirubin] = useState(0);
  const [Alkaline_Phosphotase, setAlkaline_Phosphotase] = useState(0);
  const [Alamine_Aminotransferase, setAlamine_Aminotransferase] = useState(0);
  const [Aspartate_Aminotransferase, setAspartate_Aminotransferase] =
    useState(0);
  const [Age, setAge] = useState(0);
  const [Total_Protiens, setTotal_Protiens] = useState(0);
  const [Albumin, setAlbumin] = useState(0);
  const [Albumin_and_Globulin_Ratio, setAlbumin_and_Globulin_Ratio] =
    useState(0);
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

  function handleClick() {
    fetch("/data", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 4,
        features: [
          Sex,
          Total_Bilirubin,
          Direct_Bilirubin,
          Alkaline_Phosphotase,
          Alamine_Aminotransferase,
          Aspartate_Aminotransferase,
          Age,
          Total_Protiens,
          Albumin,
          Albumin_and_Globulin_Ratio,
        ],
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json["DIAG"], json["PROB_POS"]);
        if (json["DIAG"] === "1") {
          console.log(alertType);
          setIsDaignose(0);
          setProb((json["PROB_NEG"] * 100).toFixed(2));
          setAlertString("There's " + prob + " % chance that you're healthy!");
          setColor(colorArray[1]);
        } else if (json["DIAG"] === "2") {
          setIsDaignose(1);
          setProb((json["PROB_POS"] * 100).toFixed(2));
          setAlertString(
            "There's " + prob + " % chance that you've Heart disease :("
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

  function changeSex(a) {
    setSex(a);
  }
  function changeTotal_Bilirubin(a) {
    setTotal_Bilirubin(a);
  }
  function changeDirect_Bilirubin(a) {
    setDirect_Bilirubin(a);
  }
  function changeAlkaline_Phosphotase(a) {
    setAlkaline_Phosphotase(a);
  }
  function changeAlamine_Aminotransferase(a) {
    setAlamine_Aminotransferase(a);
  }
  function changeAspartate_Aminotransferase(a) {
    setAspartate_Aminotransferase(a);
  }
  function changeAge(a) {
    setAge(a);
  }
  function changeTotal_Protiens(a) {
    setTotal_Protiens(a);
  }
  function changeAlbumin(a) {
    setAlbumin(a);
  }
  function changeAlbumin_and_Globulin_Ratio(a) {
    setAlbumin_and_Globulin_Ratio(a);
  }
  return (
    <div className="py-4">
      <h3 className="mb-4">Please fill the details</h3>

      <Form className="mb-5">
        <Row>
          <Col md={6} className="px-0">
            <FormComponent
              id="fromAge"
              featureName="Age"
              func={changeAge}
            ></FormComponent>
            <FormComponent
              id="fromSex"
              featureName="Sex"
              func={changeSex}
            ></FormComponent>
            <FormComponent
              id="fromTotal_Bilirubin"
              featureName="Total Bilirubin"
              func={changeTotal_Bilirubin}
            ></FormComponent>
            <FormComponent
              id="fromDirect_Bilirubin"
              featureName="Direct Bilirubin"
              func={changeDirect_Bilirubin}
            ></FormComponent>
            <FormComponent
              id="fromAlkaline_Phosphotase"
              featureName="Alkaline Phosphotase"
              func={changeAlkaline_Phosphotase}
            ></FormComponent>
          </Col>
          <Col md={6} className="px-0">
            <FormComponent
              id="fromAlamine_Aminotransferase"
              featureName="Alamine Aminotransferase"
              func={changeAlamine_Aminotransferase}
            ></FormComponent>
            <FormComponent
              id="fromAspartate_Aminotransferase"
              featureName="Aspartate Aminotransferase"
              func={changeAspartate_Aminotransferase}
            ></FormComponent>
            <FormComponent
              id="fromTotal_Protiens"
              featureName="Total Protiens"
              func={changeTotal_Protiens}
            ></FormComponent>
            <FormComponent
              id="fromAlbumin"
              featureName="Albumin"
              func={changeAlbumin}
            ></FormComponent>
            <FormComponent
              id="fromAlbumin_and_Globulin_Ratio"
              featureName="Albumin and Globulin Ratio"
              func={changeAlbumin_and_Globulin_Ratio}
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
          <h4>{"Your Liver Prediction"}</h4>
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
export default Liver;
