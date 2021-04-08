import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import DealsContent from "views/Deals/DealsContent.js";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

class Deals extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return <DealsContent />;
  }
}

Deals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles()(Deals);
