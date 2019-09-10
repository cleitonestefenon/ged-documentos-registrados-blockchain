import React, { Component } from 'react';

// Custom components
import { DocumentsList, DocumentUpload } from './components';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Material helpers
import { withStyles, Divider } from '@material-ui/core';

// Component styles
import styles from './style';

class DocumentsRegistration extends Component {
    render() {

        const { classes } = this.props;

        return (
            <DashboardLayout title="Upload">
                <div className={classes.root}>
                    <DocumentUpload />
                    <Divider className={classes.listDivider} />
                    <DocumentsList />
                </div>
            </DashboardLayout>
        );
    };
};

export default withStyles(styles)(DocumentsRegistration);
