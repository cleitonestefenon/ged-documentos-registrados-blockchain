import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  iframe: {
    width: '100%',
    minHeight: '640px',
    border: 0
  }
});

class Upload extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Upload">
        <div className={classes.root}>
          Upload de arquivos
        </div>
      </DashboardLayout>
    );
  }
}

Upload.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Upload);
