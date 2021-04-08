import {
  DefaultMedRecord,
} from "components/Internal/DefaultData";
import {
  writeRequest,
} from "components/Internal/DBFunctions.js";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "components/CustomButtons/Button.js";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Checkbox from "@material-ui/core/Checkbox";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import Link from 'react-router-dom/Link';

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PropTypes from "prop-types";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VisuComp from "components/Internal/VisuComp.js";
import { withStyles } from "@material-ui/core/styles";

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}




const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  margin: {
    margin: "0",
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  submitButton: {
    marginTop: 20,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    marginBottom: 50,
    marginTop: 50,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },

  cardFooter: {
    color: "#9e9e9e",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
});

function getListItem(content) {
  return (
    <GridItem xs={12} sm={6} md={4}>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon
            style={{ height: "25px", width: "25px", color: "#4caf50" }}
          />
        </ListItemIcon>
        <ListItemText primary={content} />
      </ListItem>
    </GridItem>
  );
}

class Premium extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      uploadFiles: [],
      selectedRequest: "",
      answerMessage: "",
      medRecord: {
        ...DefaultMedRecord,
      },
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
  }

  componentDidMount() {
    this.updateComp();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.updateComp();
    }
  }

  // Required from CommonProps
  updateComp = () => {};

  subscribe = async () => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    var requestData = {};

    writeRequest(requestData, "premium_buy").then(() => {
      this.displayPopUp(
        "Dieses Feature kommt in Kürze. Danke für das Verständnis."
      );
    });
  };

  recommend = async () => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    var requestData = {};

    writeRequest(requestData, "premium_recommend").then(() => {
      this.displayPopUp(
        "Dieses Feature kommt in Kürze. Danke für das Verständnis."
      );
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* Sign in with Google  */}
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

Premium.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Premium);
