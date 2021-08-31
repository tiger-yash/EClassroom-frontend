import React, { useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { joinClass } from "../actions";



const JoinClassCard = props => {
  const { joinClass,show,cancel,confirm } = props;
  const [classCode, setClassCode] = useState("");

  const submit=()=>{
    confirm()
    joinClass(classCode)
    setClassCode("")
  }

  if (! show) {
    return <></>;
  }
  return (
    <div className="overlay">
            <div className="dialog">
                <div className="dialog__content">
                    <h2 className="dialog__title">Join New Class</h2>
                    <CardContent>
                        <TextField
                          label="Class Code"
                          variant="outlined"
                          className="w-full"
                          value={classCode}
                          onChange={e => setClassCode(e.target.value)}
                        />
                      </CardContent>
                </div>
                <hr />
                <div className="dialog__footer">
                    <button onClick={cancel} className="dialog__cancel">Cancel</button>
                    <button onClick={() => submit() } className="dialog__confirm">Join</button>
                </div>
            </div>
        </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { classData: state.classes[ownProps.classId] };
};

export default connect(mapStateToProps, { joinClass })(JoinClassCard);
