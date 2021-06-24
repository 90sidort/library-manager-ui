// import React from "react";

// import useStyles from "../../styles/books.styles";

// const Authors = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       {errorMessage && (
//         <SimpleModal errorMessage={errorMessage} cancelError={clearError} />
//       )}
//       {loading && !errorMessage && (
//         <Grid container spacing={2} className={classes.formGrid}>
//           <Grid item xs={12} className={classes.formGrid}>
//             <CircularProgress
//               color="secondary"
//               style={{
//                 width: "20%",
//                 height: "20%",
//                 margin: "auto",
//               }}
//             />
//           </Grid>
//         </Grid>
//       )}
//       {!loading && (
//         <React.Fragment>
//           <Accordion
//             expanded={expanded === "add"}
//             onChange={handleChange("add")}
//             className={classes.form}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMore />}
//               aria-controls="add-content"
//               id="add-header"
//             >
//               <Typography className={classes.heading}>Add</Typography>
//               <Typography className={classes.secondaryHeading}>
//                 Add new author to the database
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>Add authors</AccordionDetails>
//           </Accordion>
//           <Accordion
//             expanded={expanded === "list"}
//             onChange={handleChange("list")}
//             className={classes.form}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMore />}
//               aria-controls="list-content"
//               id="list-header"
//             >
//               <Typography className={classes.heading}>Authors</Typography>
//               <Typography className={classes.secondaryHeading}>
//                 Search for authors
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>Placholder for authors list</AccordionDetails>
//           </Accordion>
//         </React.Fragment>
//       )}
//     </div>
//   );
// };

// export default Authors;
