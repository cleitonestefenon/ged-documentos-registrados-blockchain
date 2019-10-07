import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';

// Material helpers
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from 'components';

// action redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

// Component styles
import styles from './styles';

// Functions
import { getUserIP, saveAvatar, removeAvatar } from './requests';
import { getFromSessionStorage, saveAsSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';
import { loadAvatar } from 'common/functions';
import { showNotification } from 'config/actions';


class AccountProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            ip: '',
            loading: false,
            avatar: getFromSessionStorage(KEY_STORAGE.AVATAR),
        }
    }

    async componentDidMount() {
        const name = getFromSessionStorage(KEY_STORAGE.NAME);
        const ip = await getUserIP();

        this.setState({ ip, name })
    }

    showLoading = () => {
        this.setState({ loading: true })
    }

    hiddenLoading = () => {
        this.setState({ loading: false })
    }

    handleCaptureImage = ({ target }) => {

        this.showLoading();

        const formData = new FormData();
        formData.append('file', target.files[0]);

        saveAvatar(formData, resp => {
            loadAvatar(resp.data._id, () => {
                this.props.showNotification({
                    message: 'Avatar atualizado com sucesso! 👻👻',
                    variant: 'success',
                    callback: () => {
                        this.hiddenLoading();
                        saveAsSessionStorage(KEY_STORAGE.AVATAR_ID, resp.data._id);
                        window.location.reload();
                    }
                })
            });
        }, err => {
            this.props.showNotification({
                message: 'Esse arquivo infelizmente não é suportado. 😢😢',
                variant: 'error',
                callback: () => {
                    this.hiddenLoading();
                }
            })
        })
    };

    deleteAvatar = () => {

        this.showLoading();

        removeAvatar(() => {
            this.props.showNotification({
                message: 'Avatar removido com sucesso ✌✌',
                variant: 'success',
                callback: () => {
                    this.hiddenLoading();
                    saveAsSessionStorage(KEY_STORAGE.AVATAR, '');
                    saveAsSessionStorage(KEY_STORAGE.AVATAR_ID, '');
                    window.location.reload();
                }
            })
            this.setState({ avatar: null, loading: false })
        }, err => {
            this.props.showNotification({
                message: 'Ops, alguma coisa deu errado. Tente daqui a pouco!',
                variant: 'error',
                callback: () => {
                    this.hiddenLoading();
                }
            })
        });
    }

    render() {
        const { classes, className, ...rest } = this.props;

        const rootClassName = classNames(classes.root, className);

        return (
            <Portlet
                {...rest}
                className={rootClassName}
            >
                <PortletContent>
                    {this.state.loading ? (
                        <Grid container justify="center" alignItems="center">
                            <CircularProgress />
                        </Grid>
                    ) : (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography noWrap={false} variant="h4">
                                                {this.state.name}
                                            </Typography>
                                            <Typography variant="h6">
                                                {this.state.ip}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        className={classes.avatar}
                                        src={this.state.avatar || "/images/avatars/avatar_default.png"}
                                    />
                                </Grid>
                            </Grid>
                        )
                    }
                </PortletContent>
                <PortletFooter>
                    <div>
                        <input
                            accept="image/*"
                            className={classes.inputFile}
                            id="contained-button-file"
                            onChange={this.handleCaptureImage}
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button component="span" className={classes.profileButton}>
                                Trocar avatar
                            </Button>
                        </label>
                    </div>
                    <Button
                        disabled={!this.state.avatar}
                        variant="text"
                        className={classes.profileButton}
                        onClick={this.deleteAvatar}
                    >
                        Remover avatar
					</Button>
                </PortletFooter>
            </Portlet>
        );
    }
}

AccountProfile.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default compose(withRouter, withStyles(styles))(connect(null, mapDispatchToProps)(AccountProfile));