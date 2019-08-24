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
import { signUp } from './requests';
import { showNotification } from 'config/actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


validate.validators.checked = validators.checked;

class SignUp extends Component {
   state = {
      values: {
         name: '',
         email: '',
         password: ''
      },
      touched: {
         name: false,
         email: false,
         password: false,
      },
      errors: {
         name: null,
         email: null,
         password: null
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

      const { history, showNotification } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });

      await signUp(values.name, values.email, values.password, () => {
         showNotification({
            message: 'Sua conta foi criada com sucesso!',
            callback: () => history.push('/sign-in')
         });
      }, err => {
         showNotification({ message: err.response.data.error, variant: 'error' })

      })

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

      const showNameError =
         touched.name && errors.name ? errors.name[0] : false;
      const showEmailError =
         touched.email && errors.email ? errors.email[0] : false;
      const showPasswordError =
         touched.password && errors.password ? errors.password[0] : false;

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
                                 name="name"
                                 onChange={event =>
                                    this.handleFieldChange('name', event.target.value)
                                 }
                                 value={values.name}
                                 variant="outlined"
                              />
                              {showNameError && (
                                 <Typography
                                    className={classes.fieldError}
                                    variant="body2"
                                 >
                                    {errors.name[0]}
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

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default compose(withRouter, withStyles(styles))(connect(null, mapDispatchToProps)(SignUp));

