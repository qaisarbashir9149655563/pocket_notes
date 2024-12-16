import NotesGroup from "../NotesGroup/NotesGroup";
import StylesLeftSidePannel from "./LeftSidePannel.module.css";
import React, { useState, useEffect } from "react";

const LeftSidePannel = ({ handleClick,handleUserIdClicked, id, groupName, color, create }) => {
  const [clickedButton, setClickedButton] = useState(null);
  
  const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = JSON.parse(storedDataString) || [];
  const newId =
    storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;

  const newData = {
    id: newId,
    groupName: groupName,
    color: color,
    create: create,
  };
  

  const submitCheck = () => {
    if (groupName !== "" && create === true) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (submitCheck()) {
      storedData.push(newData);
      localStorage.setItem("groupNamesData", JSON.stringify(storedData));
    }
  }, [groupName, create, newData]);


  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };

  const buttonStyle = (buttonId) => {
    return {
      backgroundColor: clickedButton === buttonId ? "#DAE5F5" : "transparent",
      color: "white",
      minWidth: "100%",
      minHeight: "61px",
      display: "flex",
      justifyContent: "flex-start",
      cursor:'pointer'
      };
  };

  return (
    <div className={StylesLeftSidePannel.leftSidePannel}>
      <h1>Pocket Notes</h1>
      <div className={StylesLeftSidePannel.center}>
        <button
          className={StylesLeftSidePannel.createNotesGroup}
          onClick={() => handleClick(true)}
        > 
          {" "}
          <img src="assets/+.svg" alt="+" style={{ minWidth: "14px" }} />
        </button>
        <div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              gap:"20px"
            }}
          >
            {storedData.map((group) =>
              group.create ? (
                <div className={StylesLeftSidePannel.notesGroupSlected}>
                  
                  <span
                    className={StylesLeftSidePannel.act}
                    style={buttonStyle(group.id)}
                    onClick={(_) => {
                      handleUserIdClicked(group.id);
                      handleButtonClick(group.id);
                    }}
                  >
                    <NotesGroup
                      key={group.id}
                      groupName={group.groupName}
                      color={group.color}
                      buttonColorId={group.id}
                    />
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidePannel;
