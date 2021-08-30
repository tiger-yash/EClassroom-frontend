import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { push } from "connected-react-router";
// import { makeStyles } from "@material-ui/core";

const ClassCard = props => {
  const { classData, push } = props;
  console.log(classData);
  return (
    <Grid item xs={3}>
      <Card variant="outlined" className="w-full h-full">
        <CardContent
          onClick={() => push(`/class/${classData.id}`)}
          className="bg-gray-500 text-white pb-6 cursor-pointer">
          <Typography variant="h6" component="h2" gutterBottom>
            {classData.subject}
          </Typography>
          <Typography variant="subtitle2" component="h2">
            {classData.classCode}
          </Typography>
          {/* <TextField
            label="Subject Name"
            variant="outlined"
            className="w-full"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          /> */}
        </CardContent>
        {/* <CardActions className="display-flex">
          <Button size="medium" className="ml-auto" onClick={() => push(`/class/${classData.id}`)}>
            View
          </Button>
        </CardActions> */}
      </Card>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { classData: state.classes[ownProps.classId] };
};
export default connect(mapStateToProps, { push })(ClassCard);
