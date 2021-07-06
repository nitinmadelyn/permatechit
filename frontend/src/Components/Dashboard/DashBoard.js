import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Avatar,
  CssBaseline,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Product from "../Product/Product";
import Order from "../Order/Order";
import useStyles from "../../Assets/Styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DashboardIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Dashboard
        </Typography>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="List">
            <Tab label="Orders" {...a11yProps(0)} />
            <Tab label="Products" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} className={classes.tabPanel} index={0}>
          <Order />
        </TabPanel>
        <TabPanel value={value} className={classes.tabPanel} index={1}>
          <Product />
        </TabPanel>
      </div>
    </Container>
  );
}
