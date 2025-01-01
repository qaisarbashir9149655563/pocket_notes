import LeftPannel from "../LeftPannel/LeftPannel";
import RightPannel from "../RightPannel/RightPannel";
import StyleHome from "./Home.module.css";
import React, { useState} from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Notes from "../Notes/Notes";



const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [colorChoice, setColorChoice] = React.useState(false);
  const [colorgroupChoice,setColorgroupChoice]=useState(false);
  const [userIdClicked,setUserIdClicked] = useState(0);

  const COLORS = {
    color1: "#B38BFA",
    color2: "#FF79F2", 
    color3: "#43E6FC",
    color4: "#F19576",
    color5: "#0047FF",
    color6: "#6691FF"
  };


const handleUserIdClicked = IDnum => {
  setUserIdClicked(IDnum);
};
  
  const [createGroup, setCreateGroup] = useState({
    id: 0,
    groupName: "",
    color: "",
    create: false,
  });

  const { id, groupName, color, create } = createGroup;

  const submitCheck = () => {
    if (colorChoice === true && groupName !== "" ) {
      return true;
    } else {
      return false;
    }
  };

  const handleClick = (open) => {
    setOpen(open);
  };

  const handleNotesChange = (e) => {
    setCreateGroup({ ...createGroup, groupName: e.target.value });
    setColorgroupChoice(true);
  };

  const handleSubmit = (e) => {
    console.log(submitCheck + "submitCheck");
    if (submitCheck() === true) {
      setCreateGroup({ ...createGroup, create: true });
      setOpen(false);
    }
  };


  const handleColorSelect = (color) => {
    setCreateGroup({ ...createGroup, color });
    setColorChoice(true);
  };

  return (
    <>
  <div className={StyleHome.homeContainer}>
        {submitCheck() ? (
          <div className={StyleHome.mobileHidden}>
          <LeftPannel
            handleClick={handleClick}
            handleUserIdClicked={handleUserIdClicked}
            id={id}
            groupName={groupName}
            color={color}
            create={create}
          />
          </div>
        ) : (
          <div className={StyleHome.mobileHidden}>
          <LeftPannel handleClick={handleClick}handleUserIdClicked={handleUserIdClicked} />
          </div>
        )}
        {
          (userIdClicked>0) ? (
            <div className={StyleHome.mobileHidden}>
            <Notes userIdClicked={userIdClicked} colorgroupChoice={colorChoice}/>
            </div>
          ):(
            <div className={StyleHome.mobileHidden}>
            <RightPannel />
          </div>
          )
        }
       { submitCheck() && isVisible ? (
        <div className={StyleHome.desktopHidden}>
          <LeftPannel
            handleClick={handleClick}
            handleUserIdClicked={handleUserIdClicked}
            id={id}
            groupName={groupName}
            color={color}
            create={create}
           
          />
          </div>
        ) : (
          (isVisible) ?(
          <div className={StyleHome.desktopHidden} onClick={()=>setIsVisible(false)}>
          <LeftPannel handleClick={handleClick} handleUserIdClicked={handleUserIdClicked}/>
          {console.log(isVisible)}
          </div>
          )
        :(null)
        )
        }
        {
          (userIdClicked>0) ? (
            <div className={StyleHome.desktopHidden}>
            <Notes userIdClicked={userIdClicked}/>
            </div>
          ):(
            open > 0 && (
              <div className={StyleHome.desktopHidden}>
                <LeftPannel
                  handleClick={handleClick}
                  handleUserIdClicked={handleUserIdClicked}
                  id={id}
                  groupName={groupName}
                  color={color}
                  create={create}
                />
              </div>
            )
          )
        }

      </div>
      <Modal
        open={open}
        onClose={() => {setOpen(false);window.location.reload()}}
        closeOnOverlayClick={true}
        center={true}
        showCloseIcon={false}
      >
        <h2 className={StyleHome.heading}>Create New Notes group</h2>
        <form action="">
          <p>
            <label htmlFor="GroupName">
              <span className={StyleHome.subheading}> Group Name</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <input
                type="text"
                placeholder="   Enter your group name...."
                className={StyleHome.placeHold}
                onChange={(e) => handleNotesChange(e)}
              />
              {colorgroupChoice === false && groupName === "" ? (
            <p style={{ color: "red" }}>Please Enter Group Name!</p>
          ) : null}
            </label>
          </p>
          <p className={StyleHome.Choosecolour}>
            <label htmlFor="Choosecolour">
              <span className={StyleHome.subheading}>Choose colour</span>
              <span className="StyleHome.ChoosecolourBreak">
                &nbsp;&nbsp;
                {Object.values(COLORS).map((color, index) => (
                  <button
                    key={`color-${index + 1}`}
                    type="button"
                    className={StyleHome[`colorButton${index + 1}`]}
                    onClick={() => handleColorSelect(color)}
                  ></button>
                ))}
                &nbsp;&nbsp;
              </span>
            </label>
          </p>
          {colorChoice === false ? (
            <p style={{ color: "red" }}>Please Choose The Color!</p>
          ) : null}
          <input
            type="submit"
            value="Create"
            className={StyleHome.create}
            onClick={handleSubmit}
          />
        </form>
      </Modal>    
    </>
  );
};

export default Home;


