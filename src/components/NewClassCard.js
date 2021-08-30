import React, { useState } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { createClass } from "../actions";

const NewClassCard = props => {
  const { createClass } = props;
  const [subject, setSubject] = useState("");
  return (
    <Grid item xs={3}>
      <Card variant="outlined" className="w-full h-full">
        <CardContent>
          <Typography variant="h6" component="h2" className="mb-6" color="textPrimary" gutterBottom>
            Create New Class
          </Typography>
          <TextField
            label="Subject Name"
            variant="outlined"
            className="w-full"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </CardContent>
        <CardActions className="display-flex">
          <Button
            size="medium"
            className="ml-auto"
            onClick={() => createClass({ subject: subject })}>
            Create
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { classData: state.classes[ownProps.classId] };
};

export default connect(mapStateToProps, { createClass })(NewClassCard);
