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
    joinClass({ class_code: classCode })
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


// <Grid item xs={3}>
//       <Card variant="outlined" className="w-full h-full">
//         <CardContent>
//           <Typography variant="h6" component="h2" className="mb-6" color="textPrimary" gutterBottom>
//             Join New Class
//           </Typography>
//           <TextField
//             label="Class Code"
//             variant="outlined"
//             className="w-full"
//             value={classCode}
//             onChange={e => setClassCode(e.target.value)}
//           />
//         </CardContent>
//         <CardActions className="display-flex">
//           <Button
//             size="medium"
//             className="ml-auto"
//             onClick={() => joinClass({ class_code: classCode })}>
//             Join
//           </Button>
//         </CardActions>
//       </Card>
//     </Grid>