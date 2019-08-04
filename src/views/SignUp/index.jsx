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
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Shared utilities
import validators from 'common/validators';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

validate.validators.checked = validators.checked;

// Service methods
const signUp = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class SignUp extends Component {
  state = {
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      policy: false
    },
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      policy: null
    },
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      policy: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

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

  handleSignUp = async () => {
    try {
      const { history } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });

      await signUp({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      });

      history.push('/sign-in');
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error
      });
    }
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

    const showFirstNameError =
      touched.firstName && errors.firstName ? errors.firstName[0] : false;
    const showLastNameError =
      touched.lastName && errors.lastName ? errors.lastName[0] : false;
    const showEmailError =
      touched.email && errors.email ? errors.email[0] : false;
    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;
    const showPolicyError =
      touched.policy && errors.policy ? errors.policy[0] : false;

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
                    By: Satoshi Nakamoto
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
                    Crie sua conta
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    Use seu melhor email e crie uma conta... É gratuito
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Nome completo"
                      name="firstName"
                      onChange={event =>
                        this.handleFieldChange('firstName', event.target.value)
                      }
                      value={values.firstName}
                      variant="outlined"
                    />
                    {showFirstNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.firstName[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Endereço de e-mail"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
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
                        className={classes.signUpButton}
                        color="primary"
                        disabled={!isValid}
                        onClick={this.handleSignUp}
                        size="large"
                        variant="contained"
                      >
                        Cadastrar
                    </Button>
                    )}
                  <Typography
                    className={classes.signIn}
                    variant="body1"
                  >
                    Você já possui conta?{' '}
                    <Link
                      className={classes.signInUrl}
                      to="/sign-in"
                    >
                      Faça login
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

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignUp);
