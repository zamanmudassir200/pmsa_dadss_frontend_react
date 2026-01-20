const JettyDataFields = {
  ID: {
    key: "j_id",
    title: "Jetty ID",
    description: "Jetty unique id",
    filtertype: "search",
    component: "input",
  },
  NAME: {
    key: "j_name",
    title: "Jetty Name",
    filtertype: "search",
    component: "input",
  },
  LATITUDE: {
    key: "latitude",
    title: "Latitude",
    component: "position-lat",
  },
  LONGITUDE: {
    key: "longitude",
    title: "Longitude",
    component: "position-lng",
  },
  PROVINCE: {
    key: "j_province",
    title: "Province",
    filtertype: "search",
    component: "input",
  },
  ILLEGAL: {
    key: "j_illegal",
    title: "Illegal",
    filtertype: "unique",
    component: "select",
    options: ["Yes", "No"],
  },
};
export default JettyDataFields;
