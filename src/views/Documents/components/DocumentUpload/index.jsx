import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

import uploadImage from '../../../../icons/upload-para-a-nuvem.svg';

// Material helpers
import { withStyles } from '@material-ui/core';
import Dropzone from 'react-dropzone';


// Component styles
import styles from './styles'


class Upload extends Component {
    render() {
        const { classes } = this.props;

        //https://www.youtube.com/watch?v=G5UZmvkLWSQ

        return (
            <div className={classes.upload}>
                <Dropzone onDropAccepted={() => { }}>
                    {({ getRootProps, getInputProps, isDragActive }) => (

                        <div
                            className={classes.areaUpload}
                            {...getRootProps()}
                            isDragActive={isDragActive}
                        >
                            <input {...getInputProps()} />
                            <div className={classes.areaUploadIcon}>
                                <img src={uploadImage} width='64px' height='64px' alt='Upload Image' style={{width: '100%'}} />                               
                                <p>Clique aqui ou arraste um arquivo para registrá-lo</p>
                            </div>

                        </div>
                    )}
                </Dropzone>
            </div>
        );
    }
}

Upload.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Upload);
