import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// action redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Functions
import { showNotification } from 'config/actions';

// Material helpers
import { withStyles } from '@material-ui/core';

// Components
import Dropzone from 'react-dropzone';
import WithDocument from './WithDocument';
import AlertDialog from 'components/Modal';

// Component styles
import styles from './styles';

//Functions
import { registerDocument } from '../../requests';
import { getBytesFromFile } from 'common/functions';
import { SHA256 } from 'crypto-js';
import WithoutDocument from './WithoutDocument';

class Upload extends Component {

    state = {
        document: null,
        sha256: '',
        loading: false,
        openAlertDialog: false
    }

    onDropAccepted = event => {
        this.setState({
            document: event[0],
            sha256: SHA256(getBytesFromFile(event[0]))
        })
    }

    onClickRegister = async () => {

        this.setState({ loading: true })

        await registerDocument(this.state.document, () => {
            this.props.showNotification({
                variant: 'success',
                message: 'Documento enviado para registro ✔✔',
                callback: () => {
                    this.props.getTransactions();
                }
            })
        }, err => {
            this.props.showNotification({
                variant: 'error',
                message: err && err.error ? err.error : 'Não foi possível registrar este arquivo  😮😮',
                callback: () => {
                    if (err && err.response.data.transaction) {
                        this.setState({
                            openAlertDialog: true,
                            transactionId: err.response.data.transaction.id
                        })
                    }
                }
            })
        }, () => {
            this.resetState();
        })
    }

    resetState = () => {
        this.setState({
            document: null,
            sha256: '',
            loading: false
        })
    }

    onDropRejected = event => {
        this.props.showNotification({
            variant: 'error',
            message: 'Não foi possível registrar este arquivo  😮😮'
        })
    }

    clearDocumentSelected = () => {
        this.setState({ document: null })
    }

    render() {

        const { classes } = this.props;

        const { document,
            sha256,
            openAlertDialog,
            transactionId,
            loading,
            registredWithSuccess } = this.state;

        return (
            <div className={classes.content}>
                <Dropzone
                    maxSize={5000000}
                    multiple={false}
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.onDropRejected}
                    disabled={Boolean(document)}
                >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                        document && document ? (
                            <WithDocument
                                document={this.state.document}
                                sha256={sha256}
                                loading={loading}
                                success={registredWithSuccess}
                                onClickRegister={this.onClickRegister}
                                clearDocumentSelected={this.clearDocumentSelected}
                            />
                        ) : (
                                <WithoutDocument
                                    getRootProps={getRootProps}
                                    isDragActive={isDragActive}
                                    getInputProps={getInputProps}
                                />
                            )
                    )}
                </Dropzone>
                <AlertDialog
                    open={openAlertDialog}
                    handleClose={() => this.setState({ openAlertDialog: false })}
                    dialogTitle="Atenção, documento já registrado!"
                    dialogContentText={`Este documento já foi registrado, você pode encontrá-lo pelo ID ${transactionId}`}
                    onAgreeClick={() => this.setState({ openAlertDialog: false })}
                    agreeNameButton="Confirmar"
                />
            </div>
        );
    }
}

Upload.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default withStyles(styles)(connect(null, mapDispatchToProps)(Upload));
