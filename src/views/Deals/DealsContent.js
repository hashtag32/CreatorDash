import { getCurrentDate } from "components/Internal/VisuElements.js";
import { uploadFile } from "components/Internal/DBFunctions.js";

import AppBar from "@material-ui/core/AppBar";
import Assignment from "@material-ui/icons/Assignment";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardActions from "@material-ui/core/CardActions";
import CardBody from "components/Card/CardBody.js";
import CardContent from "@material-ui/core/CardContent";
import CardFooter from "components/Card/CardFooter.js";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from "@material-ui/core/Checkbox";
import { CommonCompsData } from "components/Internal/DefaultData";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DefaultCategories } from "components/Internal/DefaultData.js";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Input from "@material-ui/core/Input";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Link from "react-router-dom/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import Rating from '@material-ui/lab/Rating';

import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import VisuComp from "components/Internal/VisuComp";
import Warning from "@material-ui/icons/Warning";
import { connect } from "react-redux";
import { publicKeyProvided } from "components/Internal/Extraction";
import { withStyles } from "@material-ui/core/styles";

function valueLabelFormat(value) {
  if (value > 1000000) {
    return `${Math.round(value / 1000000)}M`;
  }
  if (value > 1000) {
    return `${Math.round(value / 1000)}k`;
  }

  return Math.round(value);
}

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(4, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  selectionMenu: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  formControl: {
    width: "100%",
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    height: "200px",
  },
  cardContent: {
    flexGrow: 0,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
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
  deleteButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    color: "white",
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
  cardDescription: {
    paddingTop: "24px",
    paddingBottom: "16px",
  },
});

class DealsContent extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      platformAnchorEl: null,
      platform: {
        Instagram: true,
        Tiktok: true,
        Facebook: true,
        Youtube: true,
        Blog: true,
      },
      categoryAnchorEl: null,
      category: {
        Food: true,
        Health: true,
        Beauty: true,
        Travel: true,
        Fashion: true,
        Fitness: true,
      },
      typeAnchorEl: null,
      type: {
        ProductPlacement: true,
        Advertising: true,
        Shoutout: true,
        Review: true,
      },
      subs: [1, 5],
      age: "None",
      dbNameMedRecords: "MedRecords",
      dbNameCategories: "CategoryList",
      MedRecords: [],
      CategoryList: DefaultCategories,
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
      openDocModal: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.updateComp();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    this.updateComp();
  }

  updateComp = async () => {
    this.fetchTable();

    // Display Modal after
    if (publicKeyProvided()) {
      await this.timeout(10000);
      this.openDocModal();
    }
  };

  openDocModal = () => {
    this.setState({
      openDocModal: true,
    });
  };

  testfunc = () => {
    console.log(this.state);
  };

  // DB functions
  fetchTable = () => {
    this.TableFetch(this.state.dbNameMedRecords);
    this.TableFetch(this.state.dbNameCategories);
  };

  // Is called when table is changed
  uploadTable = () => {
    this.TableChanged(this.state.dbNameMedRecords, this.state.MedRecords);
    this.TableChanged(this.state.dbNameCategories, this.state.CategoryList);
  };

  // Data Table changes
  addnewCategory = (newCategory) => {
    this.setState(
      (prevState) => {
        const CategoryList = [...prevState.CategoryList];
        CategoryList.push(newCategory);
        return { ...prevState, CategoryList };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  removeCategory = (CategoryToRemove) => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }
    this.setState(
      (prevState) => {
        const CategoryList = [...prevState.CategoryList];
        CategoryList.splice(CategoryList.indexOf(CategoryToRemove), 1);
        return { ...prevState, CategoryList };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  addnewMedRecord = (category) => {
    console.log("called addNewMedRecord");

    var newMedRecord = {
      files: [],
      date: getCurrentDate(),
      doctor: "Dr. Mustermann",
      disease: "Neuer Befund",
      category: category,
      open: false,
    };

    this.setState(
      (prevState) => {
        const MedRecords = [...prevState.MedRecords];
        MedRecords.push(newMedRecord);
        return { ...prevState, MedRecords };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  changeMedRecord = (medRecord, key, value) => {
    var newData = { ...medRecord, [key]: value };

    this.setState(
      (prevState) => {
        const MedRecords = [...prevState.MedRecords];
        MedRecords[MedRecords.indexOf(medRecord)] = newData;
        return { ...prevState, MedRecords };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  removeMedRecord = (MedRecordToRemove) => {
    this.setState(
      (prevState) => {
        const MedRecords = [...prevState.MedRecords];
        MedRecords.splice(MedRecords.indexOf(MedRecordToRemove), 1);
        return { ...prevState, MedRecords };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  // UI functions
  //todo: not save in db, only visu
  openModal = (medRecord) => {
    this.changeMedRecord(medRecord, "open", true);
  };

  // handleClose = (medRecord) => {
  //   this.changeMedRecord(medRecord, "open", false);
  // };

  // handleCloseModal = () => {
  //   this.setState({
  //     openDocModal: false,
  //   });
  // };

  tableChanges = (medRecord, property, event) => {
    this.changeMedRecord(medRecord, property, event.target.value);
  };

  addValueToOptionList = (newValue) => {
    this.addnewCategory(newValue);
  };

  // Rendering functions
  getMedRecord = (category) => {
    var MedRecordList = [];
    this.state.MedRecords.forEach((medRecord) => {
      if (medRecord.category == category.title) {
        MedRecordList.push(medRecord);
      }
    });

    return MedRecordList;
  };

  uploadImageAction = (event, medRecord) => {
    event.preventDefault();
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    // Create new medRecord here and overwrite all (also list of files)
    var files = medRecord.files;

    Array.from(event.target.files).forEach(async (fileToUpload) => {
      var filesize = (fileToUpload.size / 1024 / 1024).toFixed(4); // MB

      if (filesize > 20) {
        this.displayPopUp("Datei zu groß", "danger");
        return;
      }

      var isImage = fileToUpload.type.includes("image");
      //todo: cleaner error catching
      await uploadFile(fileToUpload).then((fileLink) => {
        files.push({
          link: fileLink,
          isImage: isImage,
          name: fileToUpload.name,
        });
      });

      this.changeMedRecord(medRecord, "files", files);
    });
  };

  // handleClick = (anchorElementName, event) => {
  //   this.setState({
  //     anchorEl: event.currentTarget,
  //   });
  // };

  handleAnchorClick = (anchorElementName, event) => {
    this.setState({
      [anchorElementName]: event.currentTarget,
    });
  };

  handleCloseCategory = () => {
    this.setState({
      categoryAnchorEl: null,
    });
  };

  handleCloseMenu = (anchorElementName, ev) => {
    console.log(anchorElementName);
    console.log(ev);
    this.setState({
      [anchorElementName]: null,
    });
  };

  handleCheckboxChange = (checkBoxElement, key, event) => {
    var checkBoxData = { ...this.state[checkBoxElement] };

    checkBoxData[key] = event.target.checked;

    this.setState({ [checkBoxElement]: checkBoxData });
  };

  handleSliderChange = (event, newValue) => {
    this.setState({
      subs: newValue,
    });
  };

  render() {
    const { classes } = this.props;
    const cards = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
    ];

    const content = [
      {
        image:
          "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/199483932/original/1443b1d8f2dd19c1f254f1f535c7e86e2bc1a39f.jpg",
        company: "Coca-Cola",
        companyLogo: "https://img.icons8.com/color/452/coca-cola.png",
        created: "8. April 2021",
        description:
          "We're looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.",
        platform: "tiktok",
        type: "Advertising",
        subs: "100k",
        budget: "5000$",
        rating: 4,
      },
    ];

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative"></AppBar>
        <main>
          <Button onClick={this.testfunc}>Testfun</Button>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Your Deals
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Find your deals with brands and companies. Go and filter for
                your interests.
              </Typography>

              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link style={{ textDecoration: "none" }} to="/signUp">
                      <Button variant="contained" color="primary">
                        Register
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link style={{ textDecoration: "none" }} to="/signIn">
                      <Button variant="outlined" color="primary">
                        Login
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>

          <Container className={classes.selectionMenu} maxWidth="md">
            <Card>
              <CardBody>
                <Box
                  display="flex"
                  flexDirection="row"
                  bgcolor="background.paper"
                >
                  <Box p={1}>
                    <SearchIcon />
                  </Box>
                  <Box width={1} p={1}>
                    <Input
                      placeholder="Search "
                      fullWidth={true}
                      disableUnderline={true}
                    >
                      Search
                    </Input>
                  </Box>
                </Box>
                <Divider />

                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      size="large"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(ev) =>
                        this.handleAnchorClick("typeAnchorEl", ev)
                      }
                    >
                      Type
                      <KeyboardArrowDownIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.typeAnchorEl}
                      open={Boolean(this.state.typeAnchorEl)}
                      onClose={(ev) => this.handleCloseMenu("typeAnchorEl", ev)}
                    >
                      {Object.keys(this.state.type).map((key) => (
                        <MenuItem>
                          <FormControlLabel
                            style={{ color: "#000000" }}
                            control={
                              <Checkbox
                                color="primary"
                                onChange={(ev) =>
                                  this.handleCheckboxChange("type", key, ev)
                                }
                                checked={this.state.type[key]}
                              />
                            }
                            label={key}
                          />
                        </MenuItem>
                      ))}
                    </Menu>
                  </GridItem>

                  <GridItem
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      size="large"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(ev) =>
                        this.handleAnchorClick("platformAnchorEl", ev)
                      }
                    >
                      Platform
                      <KeyboardArrowDownIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.platformAnchorEl}
                      open={Boolean(this.state.platformAnchorEl)}
                      onClose={(ev) =>
                        this.handleCloseMenu("platformAnchorEl", ev)
                      }
                    >
                      {Object.keys(this.state.platform).map((key) => (
                        <MenuItem>
                          <FormControlLabel
                            style={{ color: "#000000" }}
                            control={
                              <Checkbox
                                color="primary"
                                onChange={(ev) =>
                                  this.handleCheckboxChange("platform", key, ev)
                                }
                                checked={this.state.platform[key]}
                              />
                            }
                            label={key}
                          />
                        </MenuItem>
                      ))}
                    </Menu>
                  </GridItem>

                  <GridItem
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      size="large"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(ev) =>
                        this.handleAnchorClick("categoryAnchorEl", ev)
                      }
                    >
                      Category
                      <KeyboardArrowDownIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.categoryAnchorEl}
                      open={Boolean(this.state.categoryAnchorEl)}
                      onClose={(ev) =>
                        this.handleCloseMenu("categoryAnchorEl", ev)
                      }
                    >
                      {Object.keys(this.state.category).map((key) => (
                        <MenuItem>
                          <FormControlLabel
                            style={{ color: "#000000" }}
                            control={
                              <Checkbox
                                color="primary"
                                onChange={(ev) =>
                                  this.handleCheckboxChange("category", key, ev)
                                }
                                checked={this.state.category[key]}
                                name="Instagram"
                              />
                            }
                            label={key}
                          />
                        </MenuItem>
                      ))}
                    </Menu>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={6}
                    md={3}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      bgcolor="background.paper"
                    >
                      <Box p={1}>
                        <Typography id="continuous-slider">
                          Subscriptions
                        </Typography>
                      </Box>
                      <Box width={1} p={1}>
                        <Slider
                          min={2}
                          step={0.1}
                          max={5}
                          valueLabelFormat={valueLabelFormat}
                          scale={(x) => x ** 10}
                          value={this.state.subs}
                          onChange={this.handleSliderChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                        />
                      </Box>
                    </Box>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </Container>

          {/* Content */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {content.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.image}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      {/* Horizontal Box */}
                      <Box
                        display="flex"
                        flexDirection="row"
                        bgcolor="background.paper"
                      >
                        <Box p={1}>
                          <Avatar
                            alt="Remy Sharp"
                            src={card.companyLogo}
                            className={classes.small}
                          />
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          bgcolor="background.paper"
                        >
                          {/* Horizontal Box */}
                          <Box>
                            <Typography variant="h5" component="h2">
                              {card.company}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2">
                              {card.created}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        className={classes.cardDescription}
                      >
                        {card.description}
                      </Typography>

                      {/* 3 Columns */}
                      <GridContainer>
                        <GridItem
                         xs={12}
                         sm={4}
                         md={4}
                          style={{ textAlign: "center" }}
                        >
                          <Box>
                            <Typography variant="subtitle2">
                              {card.budget}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2">Budget</Typography>
                          </Box>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                    style={{ paddingLeft: "24px", paddingTop:"24px" }}

                        >
                          <Box>
                            <Typography variant="subtitle2">Europe</Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2">Location</Typography>
                          </Box>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                          style={{ textAlign: "center" }}
                        >
                          <Box>
                            <Typography variant="subtitle2">
                              Full-time
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2">Type</Typography>
                          </Box>
                        </GridItem>
                      </GridContainer>
                    </CardContent>
                    <Divider />

                    <CardActions>
                    <Typography variant="body2"> {card.subs} Subs</Typography>

                      <Rating name="half-rating" value={card.rating} readOnly />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

DealsContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const DealsContentWithRedux = connect(mapStateToProps)(DealsContent);

export default withStyles(styles)(DealsContentWithRedux);
