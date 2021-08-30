import React from "react";
import { connect } from "react-redux";
import { Card } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";

const ClassCard = props => {
  const { thisClass } = props;
  console.log(thisClass.classId);
  return <Card>ClassCard</Card>;
};

const mapStateToProps = (state, ownProps) => {
  return { class: state.classes[ownProps.classId] };
};
export default connect(mapStateToProps, {})(ClassCard);
