import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, Divider } from '@material-ui/core';
import Dropzone from 'react-dropzone';

// Component styles
import styles from './styles'

// Material icons
import { CloudUploadOutlined } from '@material-ui/icons';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';


class Upload extends Component {
    render() {
        const { classes } = this.props;

        //https://www.youtube.com/watch?v=G5UZmvkLWSQ

        return (
            <DashboardLayout title="Upload">
                <div className={classes.upload}>
                    <Dropzone onDropAccepted={() => { }}>
                        {({ }) => (
                            <div className={classes.areaUpload}>
                                <div className={classes.areaUploadIcon}>
                                    <CloudUploadOutlined />
                                    <p>Arraste um arquivo aqui para registrá-lo</p>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </div>
                
                <Divider className={classes.listDivider} />

            </DashboardLayout>
        );
    }
}

Upload.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Upload);
