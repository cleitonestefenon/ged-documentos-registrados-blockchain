import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
	Grid,
	Button,
	IconButton,
	CircularProgress,
	TextField,
	Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

//Services
import { signIn, verifyWalletInformation } from './requests';
import { criptografar } from '../../common/cryptography';

// Redux func
import { showNotification } from 'config/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

class SignIn extends Component {
	state = {
		notification: false,
		notificationMessage: '',
		notificationVariant: 'success',
		values: {
			email: '',
			password: '',
			tokenAuthentication: {}
		},
		touched: {
			email: false,
			password: false
		},
		errors: {
			email: null,
			password: null
		},
		isValid: false,
		isLoading: false,
		submitError: null,
	};

	componentDidMount() {
		const token = getFromSessionStorage(KEY_STORAGE.TOKEN);

		if(token) {
			this.props.history.push('/dashboard');
		}
	}

	handleBack = () => {
		const { history } = this.props;

		history.goBack();
	};

	validateForm = _.debounce(() => {
		const { values } = this.state;

		const newState = { ...this.state };
		const errors = validate(values, schema);

		newState.errors = errors || {};
		newState.isValid = errors ? false : true;

		this.setState(newState);
	}, 300);

	handleFieldChange = (field, value) => {
		const newState = { ...this.state };

		newState.submitError = null;
		newState.touched[field] = true;
		newState.values[field] = value;

		this.setState(newState, this.validateForm);
	};

	handleSignIn = async () => {

		const { history, showNotification } = this.props;
		const { values } = this.state;

		this.setState({ isLoading: true });

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

		this.setState({ isLoading: false });
	};

	render() {
		const { classes } = this.props;
		const {
			values,
			touched,
			errors,
			isValid,
			submitError,
			isLoading
		} = this.state;

		const showEmailError = touched.email && errors.email;
		const showPasswordError = touched.password && errors.password;

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
								>Blockchain: a inovação mais disruptiva desde a invenção da Web</Typography>
								<div className={classes.person}>
									<Typography
										className={classes.name}
										variant="body1"
									>Satoshi Nakamoto</Typography>
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
									>Entrar
									</Typography>
									<div className={classes.fields}>
										<TextField
											className={classes.textField}
											label="Endereço de e-mail"
											name="email"
											onChange={event =>
												this.handleFieldChange('email', event.target.value)
											}
											type="text"
											value={values.email}
											variant="outlined"
										/>
										{showEmailError && (
											<Typography
												className={classes.fieldError}
												variant="body2"
											>
												{errors.email[0]}
											</Typography>
										)}
										<TextField
											className={classes.textField}
											label="Senha"
											name="password"
											onChange={event =>
												this.handleFieldChange('password', event.target.value)
											}
											type="password"
											value={values.password}
											variant="outlined"
										/>
										{showPasswordError && (
											<Typography
												className={classes.fieldError}
												variant="body2"
											>
												{errors.password[0]}
											</Typography>
										)}
									</div>
									{submitError && (
										<Typography
											className={classes.submitError}
											variant="body2"
										>
											{submitError}
										</Typography>
									)}
									{isLoading ? (
										<CircularProgress className={classes.progress} />
									) : (
											<Button
												className={classes.signInButton}
												color="primary"
												disabled={!isValid}
												onClick={this.handleSignIn}
												size="large"
												variant="contained"
											>
												Acessar
                    						</Button>
										)}
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

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default compose(withRouter, withStyles(styles))(connect(null, mapDispatchToProps)(SignIn));