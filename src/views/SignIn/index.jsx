import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
	Grid,
	Button,
	IconButton,
	TextField,
	Typography
} from '@material-ui/core';

import FieldErrorMessage from 'components/FieldErrorMessage';

// Functions
import { criptografar } from 'common/cryptography';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Component styles
import styles from './styles';

// Formik
import { withFormik } from 'formik';

// Yup validator
import * as Yup from "yup";

//Services
import { signIn, verifyWalletInformation } from './requests';

import { defaultFormMessages } from 'common/form';

// Redux func
import { showNotification } from 'config/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';
import { formHasError } from 'views/Account/components/AccountDetails/functions';

const initialValues = {
	email: '',
	password: ''
};

class SignIn extends Component {

	componentDidMount() {
		const token = getFromSessionStorage(KEY_STORAGE.TOKEN);

		if (token) {
			this.props.history.push('/dashboard');
		}
	}

	handleBack = () => {
		const { history } = this.props;

		history.goBack();
	};

	handleSignIn = async () => {

		const { history, showNotification, values } = this.props;

		var email = criptografar(values.email);
		var password = criptografar(values.password);

		await signIn(email, password, resp => {
			showNotification({
				message: `Seja bem-vindo ${String(resp.data.organization.name).toLowerCase()} ❤❤`,
				variant: 'success',
				callback: () => {
					verifyWalletInformation(resp.data.organization.id, () => {
						history.push('/dashboard');
					}, () => {
						history.push('/account');
					});
				}
			});
		}, ({ response }) => {
			let message = "";

			if (response && response.data) {
				message = response.data.error;
			} else {
				message = 'Não foi possível comunicar-se com o servidor.';
			}
			this.props.showNotification({ message, variant: 'error' });
		});

	};

	render() {
		const { classes, values, errors, dirty, touched, setFieldTouched } = this.props;

		return (
			<div className={classes.root}>
				<Grid
					className={classes.grid}
					container
				>
					<Grid
						className={classes.quoteWrapper}
						item
						lg={5}
					>
						<div className={classes.quote}>
							<div className={classes.quoteInner}>
								<Typography
									className={classes.quoteText}
									variant="h1"
								>
									Blockchain: a inovação mais disruptiva desde a invenção da Web
								</Typography>
								<div className={classes.person}>
									<Typography
										className={classes.name}
										variant="body1"
									>
										Satoshi Nakamoto
									</Typography>
								</div>
							</div>
						</div>
					</Grid>
					<Grid
						className={classes.content}
						item
						lg={7}
						xs={12}
					>
						<div className={classes.content}>
							<div className={classes.contentHeader}>
								<IconButton
									className={classes.backButton}
									onClick={this.handleBack}
								>
									<ArrowBackIcon />
								</IconButton>
							</div>

							<div className={classes.contentBody}>
								<form className={classes.form}>
									<Typography
										className={classes.title}
										variant="h2"
									>
										Entrar
									</Typography>
									<div className={classes.fields}>
										<TextField
											className={classes.textField}
											label="Endereço de e-mail"
											name="email"
											error={Boolean(touched['email']) && Boolean(errors.email)}
											onBlur={() => setFieldTouched('email', true)}
											onChange={event => this.props.setFieldValue("email", event.target.value)}
											type="text"
											value={values.email}
											variant="outlined"
										/>
										<FieldErrorMessage touched={touched['email']} errors={errors} field="email" />
										<TextField
											className={classes.textField}
											label="Senha"
											name="password"
											error={Boolean(touched['password']) && Boolean(errors.password)}
											onBlur={() => setFieldTouched('password', true)}
											onChange={event => this.props.setFieldValue("password", event.target.value)}
											type="password"
											value={values.password}
											variant="outlined"
										/>
										<FieldErrorMessage touched={touched['password']} errors={errors} field="password" />
									</div>

									<Button
										className={classes.signInButton}
										color="primary"
										disabled={!dirty || formHasError(errors)}
										onClick={this.handleSignIn}
										size="large"
										variant="contained"
									>
										Acessar
                    				</Button>

									<Typography
										className={classes.signUp}
										variant="body1"
									>
										Ainda não possui conta?{' '}
										<Link
											className={classes.signUpUrl}
											to="/sign-up"
										>
											Cadastre-se
										</Link>
									</Typography>
								</form>
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

SignIn.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

const SignInDetailsForm = withFormik({
	mapPropsToValues: () => ({ ...initialValues }),
	validateOnChange: false,

	validate: values => {
		const errors = {};

		return errors;
	},

	validationSchema: Yup.object({
		email: Yup.string().email('E-mail inválido').required(defaultFormMessages.isRequired),
		password: Yup.string().required(defaultFormMessages.isRequired),
	}),

	handleSubmit: () => { },
})(SignIn);

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default compose(withRouter, withStyles(styles))(connect(null, mapDispatchToProps)(SignInDetailsForm));