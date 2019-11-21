import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, IconButton, InputAdornment, Tooltip } from '@material-ui/core';

// Material components
import { Button, TextField } from '@material-ui/core';

// Shared components
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent,
    PortletFooter
} from 'components';

import Modal from 'components/Modal';

import FieldErrorMessage from 'components/FieldErrorMessage';

// Component styles
import styles from './styles';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

// action redux
import { showNotification } from 'config/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Formik
import { withFormik } from 'formik';

// Yup validator
import * as Yup from "yup";

//functions
import { defaultFormMessages } from 'common/form';
import { formHasError } from './functions';
import { save, getWalletInformation, update } from './requests';
import { descriptografar } from '../../../../common/cryptography';

const initialValues = {
    id: '',
    publickey: '',
    privatekey: '',
    wif: '',
    address: ''
};

class Account extends Component {
    state = {
        userName: getFromSessionStorage(KEY_STORAGE.NAME),
        email: getFromSessionStorage(KEY_STORAGE.EMAIL),
        organizationId: getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID),
        visibilityPrivateKey: false,
        modalOpen: false
    };

    async componentDidMount() {
        const { organizationId } = this.state;

        await getWalletInformation(organizationId, resp => {
            this.updateForm(resp);
        }, err => {
            if (err.error) {
                this.props.showNotification({
                    message: err.error,
                    variant: 'error',
                    callback: () => {
                        this.setState({ modalOpen: true })
                    }
                })
            } else {
                this.props.showNotification({
                    message: 'Você ainda não configurou sua carteira!? 🤔🤔',
                    variant: 'warning',
                    callback: () => {
                        this.setState({ modalOpen: true })
                    }
                })
            }
        })
    }

    updateForm(wallet) {
        this.props.resetForm({
            ...wallet.data.wallet,
            privatekey: descriptografar(wallet.data.wallet.privatekey)
        });
    }

    handleSubmit = async () => {
        const { errors, values, submitForm, showNotification } = this.props;

        submitForm();

        if (!formHasError(errors)) {
            if (!values || !values.id) {
                await save(this.state.organizationId, values, resp => {
                    showNotification({
                        message: 'Agora sua carteira está pronta para ser usada. 😍😍',
                        callback: () => {
                            this.updateForm(resp);
                        }
                    })
                }, err => {
                    showNotification({
                        message: 'Ocorreu um erro ao salvar seua carteira. 😢😢',
                        variant: 'error'
                    })
                })

            } else {
                await update(this.state.organizationId, values, resp => {
                    showNotification({
                        message: 'Sua carteira foi atualizada com sucesso. 🤪🤪',
                        callback: () => {
                            this.updateForm(resp);
                        }
                    })
                }, err => {
                    showNotification({
                        message: 'Ocorreu um erro ao salvar sua carteira. 😢😢',
                        variant: 'error'
                    })
                })
            }
        }
    };

    handleCancel = () => {
        const { initialValues, resetForm } = this.props;

        resetForm(initialValues);
    }

    render() {
        const { classes, className, values, errors, dirty, touched, setFieldTouched, ...rest } = this.props;
        const { userName, email, visibilityPrivateKey } = this.state;

        const rootClassName = classNames(classes.root, className);

        return (
            <React.Fragment>
                <Modal
                    open={this.state.modalOpen}
                    handleClose={() => this.setState({ modalOpen: false })}
                    dialogTitle="Leia atentamente antes de prosseguir"
                    dialogContentText="Você precisará configurar sua carteira antes de fazer qualquer operação no sistema. Não fique preocupado, será rápido."
                    onAgreeClick={() => this.setState({ modalOpen: false })}
                    agreeNameButton="Entendi"
                />
                <Portlet
                    {...rest}
                    className={rootClassName}
                >
                    <PortletHeader>
                        <PortletLabel
                            title="Informações sobre o usuário"
                        />
                    </PortletHeader>
                    <PortletContent noPadding>
                        <form
                            autoComplete="off"
                            noValidate
                        >
                            <div className={classes.field}>
                                <TextField
                                    className={classes.textField}
                                    label="Nome do usuário"
                                    margin="dense"
                                    disabled
                                    value={userName}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    label="Email do usuário"
                                    margin="dense"
                                    value={email}
                                    variant="outlined"
                                    disabled
                                />
                            </div>
                        </form>
                    </PortletContent>
                </Portlet>
                <Portlet
                    {...rest}
                    className={rootClassName}
                >
                    <PortletHeader>
                        <PortletLabel
                            title="Informações sobre a carteira"
                        />
                    </PortletHeader>
                    <PortletContent noPadding>
                        <div className={classes.field}>
                            <TextField
                                className={classes.textField}
                                label="Chave pública"
                                margin="dense"
                                value={values.publickey}
                                name="publickey"
                                onBlur={() => setFieldTouched('publickey', true)}
                                variant="outlined"
                                onChange={event => this.props.setFieldValue("publickey", event.target.value)}
                            />
                            <FieldErrorMessage touched={touched['publickey']} errors={errors} field="publickey" />

                            <TextField
                                margin="dense"
                                onBlur={() => setFieldTouched('privatekey', true)}
                                className={classes.textField}
                                variant="outlined"
                                type={visibilityPrivateKey ? 'text' : 'password'}
                                label="Chave privada"
                                value={values.privatekey}
                                name="privatekey"
                                onChange={event => this.props.setFieldValue("privatekey", event.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                aria-label="toggle password visibility"
                                                onClick={() => this.setState({ visibilityPrivateKey: !visibilityPrivateKey })}
                                                onMouseDown={event => event.preventDefault}
                                            >
                                                {visibilityPrivateKey ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FieldErrorMessage touched={touched['privatekey']} errors={errors} field="privatekey" />

                            <TextField
                                className={classes.textField}
                                label="WIF"
                                margin="dense"
                                value={values.wif}
                                name="wif"
                                onBlur={() => setFieldTouched('wif', true)}
                                onChange={event => this.props.setFieldValue("wif", event.target.value)}
                                variant="outlined"
                            />
                            <FieldErrorMessage touched={touched['wif']} errors={errors} field="wif" />

                            <Tooltip title="Endereço da sua carteira digital">
                                <TextField
                                    className={classes.textField}
                                    label="Endereço"
                                    margin="dense"
                                    value={values.address}
                                    name="address"
                                    onBlur={() => setFieldTouched('address', true)}
                                    onChange={event => this.props.setFieldValue("address", event.target.value)}
                                    variant="outlined"
                                />
                            </Tooltip>
                            <FieldErrorMessage touched={touched['address']} errors={errors} field="address" />
                        </div>
                    </PortletContent>
                    <PortletFooter>
                        <Button
                            className={classes.button}
                            color="primary"
                            disabled={!dirty}
                            onClick={this.handleSubmit}
                            variant="contained"
                        >
                            Salvar
                        </Button>
                        <Button
                            className={classes.button}
                            color="secondary"
                            disabled={!dirty}
                            onClick={this.handleCancel}
                            variant="contained"
                        >
                            Cancelar
                        </Button>
                    </PortletFooter>
                </Portlet>
            </React.Fragment>
        );
    }
}

Account.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

const AccountDetailsForm = withFormik({
    mapPropsToValues: () => ({ ...initialValues }),
    validateOnChange: false,

    validate: values => {
        const errors = {};

        return errors;
    },

    validationSchema: Yup.object({
        publickey: Yup.string().required(defaultFormMessages.isRequired),
        privatekey: Yup.string().required(defaultFormMessages.isRequired),
        wif: Yup.string().required(defaultFormMessages.isRequired),
        address: Yup.string().required(defaultFormMessages.isRequired),
    }),

    handleSubmit: () => { },
})(Account);

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default withStyles(styles)(connect(null, mapDispatchToProps)(AccountDetailsForm));
