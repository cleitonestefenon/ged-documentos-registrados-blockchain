import React, { Component } from 'react';

// Material helpers
import { withStyles } from '@material-ui/core';

// Externals
import PropTypes from 'prop-types';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Component styles
import styles from './style';

import { DocumentsTable } from './components';

class DocumentList extends Component {
   render() {
      const { classes } = this.props;
      return (
         <DashboardLayout title="Documentos">
            <div className={classes.root}>
               <DocumentsTable/>
            </div>
         </DashboardLayout>

      );
   }

}

DocumentList.propTypes = {
   className: PropTypes.string,
   classes: PropTypes.object.isRequired
 }; 

export default withStyles(styles)(DocumentList);
