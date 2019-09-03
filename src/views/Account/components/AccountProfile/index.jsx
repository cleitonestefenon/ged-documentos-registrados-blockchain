import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from 'components';

// action redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Component styles
import styles from './styles';

// Functions
import { getUserIP, saveAvatar } from './requests';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';
import { loadAvatar } from 'common/functions';
import { showNotification } from 'config/actions';


class AccountProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            ip: '',
            avatar: getFromSessionStorage(KEY_STORAGE.AVATAR)
        }
    }

    async componentDidMount() {
        const name = getFromSessionStorage(KEY_STORAGE.NAME);
        const ip = await getUserIP();

        this.setState({ ip, name })
    }

    arrayBufferToBase64 = buffer => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    };

    handleCaptureImage = async ({ target }) => {
        const formData = new FormData();
        formData.append('file', target.files[0]);

        await saveAvatar(formData, async resp => {
            await loadAvatar(resp.data._id, avatar => {
                this.setState({ avatar })
            });
        }, err => {
            console.log(`erro Extenção ${err}`)
            this.props.showNotification({
                message: 'Esse arquivo infelizmente não é suportado. 😢😢',
                variant: 'error'
            })
        })
    };

    render() {
        const { classes, className, ...rest } = this.props;

        const rootClassName = classNames(classes.root, className);

        return (
            <Portlet
                {...rest}
                className={rootClassName}
            >
                <PortletContent>
                    <div className={classes.details}>
                        <div className={classes.info}>
                            <Typography variant="h2">{this.state.name}</Typography>
                            <Typography
                                className={classes.locationText}
                                variant="body1"
                            >
                                {this.state.ip}
                            </Typography>
                        </div>
                        <Avatar
                            className={classes.avatar}
                            src={this.state.avatar || "/images/avatars/avatar_default.png"}
                        />
                    </div>
                </PortletContent>
                <PortletFooter>
                    <div>
                        <input
                            accept="image/png"
                            className={classes.inputFile}
                            id="contained-button-file"
                            onChange={this.handleCaptureImage}
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button component="span" className={classes.profileButton}>
                                Carregar avatar
              				</Button>
                        </label>
                    </div>
                    <Button disabled={!this.state.organizationAvatar} variant="text" className={classes.profileButton}>
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(AccountProfile));
