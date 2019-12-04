import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
   Button,
   Grid,
   IconButton,
   TextField,
   Typography
} from '@material-ui/core';

// Formik
import { withFormik } from 'formik';

// Yup validator
import * as Yup from "yup";


// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Component styles
import styles from './styles';

// Form validation schema
import { signUp } from './requests';
import { showNotification } from 'config/actions';

import FieldErrorMessage from 'components/FieldErrorMessage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { defaultFormMessages } from 'common/form';
import { formHasError } from 'views/Account/components/AccountDetails/functions';

const initialValues = {
   name: '',
   email: '',
   password: ''
}

class SignUp extends Component {

   handleBack = () => {
      const { history } = this.props;

      history.goBack();
   };

   handleSignUp = async () => {

      const { history, showNotification, values } = this.props;

      await signUp(values.name, values.email, values.password, () => {
         showNotification({
            message: 'Sua conta foi criada com sucesso!',
            callback: () => history.push('/sign-in')
         });
      }, err => {
         showNotification({ message: err.response.data.error, variant: 'error' })

      })

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
                              Crie sua conta
                           </Typography>
                           <Typography
                              className={classes.subtitle}
                              variant="body1"
                           >
                              Use seu melhor e-mail e crie uma conta... É gratuito
                           </Typography>

                           <div className={classes.fields}>
                              <TextField
                                 className={classes.textField}
                                 label="Nome completo"
                                 name="name"
                                 error={Boolean(touched['name']) && Boolean(errors.name)}
                                 onBlur={() => setFieldTouched('name', true)}
                                 onChange={event => this.props.setFieldValue("name", event.target.value)}
                                 value={values.name}
                                 variant="outlined"
                              />
                              <FieldErrorMessage touched={touched['name']} errors={errors} field="name" />
                              <TextField
                                 className={classes.textField}
                                 label="Endereço de e-mail"
                                 name="email"
                                 error={Boolean(touched['email']) && Boolean(errors.email)}
                                 onBlur={() => setFieldTouched('email', true)}
                                 onChange={event => this.props.setFieldValue("email", event.target.value)}
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
                              className={classes.signUpButton}
                              color="primary"
                              disabled={!dirty || formHasError(errors)}
                              onClick={this.handleSignUp}
                              size="large"
                              variant="contained"
                           >
                              Cadastrar
                           </Button>

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

const AccountDetailsFormDetailsForm = withFormik({
   mapPropsToValues: () => ({ ...initialValues }),
   validateOnChange: false,

   validate: values => {
      const errors = {};

      return errors;
   },

   validationSchema: Yup.object({
      name: Yup.string().required(defaultFormMessages.isRequired),
      email: Yup.string().email('E-mail inválido').required(defaultFormMessages.isRequired),
      password: Yup.string().required(defaultFormMessages.isRequired),
   }),

   handleSubmit: () => { },
})(SignUp);

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default compose(withRouter, withStyles(styles))(connect(null, mapDispatchToProps)(AccountDetailsFormDetailsForm));

