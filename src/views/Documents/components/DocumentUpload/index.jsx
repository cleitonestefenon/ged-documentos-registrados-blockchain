import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

import uploadImage from '../../../../icons/upload-para-a-nuvem.svg';

// Material helpers
import { withStyles } from '@material-ui/core';
import Dropzone from 'react-dropzone';


// Component styles
import styles from './styles'
import { file } from '@babel/types';


class Upload extends Component {

    state = {
        uploadDocuments: []
    }

    renderDragMessage = (isDragActive) => {
        if(!isDragActive) {
            return <p>Clique aqui ou arraste um arquivo para registrá-lo</p>
        } else {
            return <p>Solte o arquivo para registrá-lo</p>
        }
    }

    onDocuments = (upload) => {
        console.log(upload);
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.upload}>
                <Dropzone maxSize='1' onDropAccepted={event => {
                    this.onDocuments(event);
                }}>
                    {({ getRootProps, getInputProps, isDragActive }) => (

                        <div
                            className={classes.areaUpload}
                            {...getRootProps()}
                            isDragActive={isDragActive}
                        >
                            <input {...getInputProps()} />
                            <div className={classes.areaUploadIcon}>
                                <img src={uploadImage} width='64px' height='74px' alt='Upload Image' style={{width: '100%'}} />                               
                                {this.renderDragMessage(isDragActive)}
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
