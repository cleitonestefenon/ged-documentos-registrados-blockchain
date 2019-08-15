// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import { tsConstructorType } from '@babel/types';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles(theme => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 4),
//   },
// }));

// export default function SimpleModal() {

//   const classes = useStyles();
//   // getModalStyle is not a pure function, we roll the style only on the first render
//   const [modalStyle] = React.useState(getModalStyle);
//   return (
//     <Modal
//       aria-labelledby="simple-modal-title"
//       aria-describedby="simple-modal-description"
//       open={this.props.open}
//       onClose={this.props.handleClose}
//     >
//       <div style={modalStyle} className={classes.paper}>
//         <h2 id="simple-modal-title">{this.props.title}</h2>
//         <p id="simple-modal-description">
//           {this.props.description}
//         </p>
//         <SimpleModal />
//       </div>
//     </Modal>
//   );
// }