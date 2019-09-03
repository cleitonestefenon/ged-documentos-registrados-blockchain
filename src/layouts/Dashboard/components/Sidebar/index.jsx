import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';

// Material icons
import {
    DashboardOutlined as DashboardIcon,
    ShoppingBasketOutlined as ShoppingBasketIcon,
    SettingsOutlined as SettingsIcon,
    DescriptionOutlined,
    CloudUpload,
    CloudUploadOutlined
} from '@material-ui/icons';

// Component styles
import styles from './styles';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: getFromSessionStorage(KEY_STORAGE.NAME),
            avatar: getFromSessionStorage(KEY_STORAGE.AVATAR)
        }
    }

    render() {
        const { classes, className } = this.props;

        const rootClassName = classNames(classes.root, className);

        return (
            <nav className={rootClassName}>
                <div className={classes.logoWrapper}>
                    <Link
                        className={classes.logoLink}
                        to="/dashboard"
                    >
                        <img
                            alt="Block Share logo"
                            className={classes.logoImage}
                            src="/images/logos/Logo BlochShare.png"
                        />
                    </Link>
                </div>

                <Divider className={classes.logoDivider} />

                <div className={classes.profile}>
                    <Link to="/account">
                        <Avatar
                            //alt="Roman Kutepov"
                            className={classes.avatar}
                            src={this.state.avatar || "/images/avatars/avatar_default.png"}
                        />
                    </Link>
                    <Typography
                        className={classes.nameText}
                        variant="h6"
                    >
                        {this.state.name}
                    </Typography>
                </div>

                <Divider className={classes.profileDivider} />

                <List
                    component="div"
                    disablePadding
                >
                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        component={NavLink}
                        to="/dashboard"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Dashboard"
                        />
                    </ListItem>

                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        component={NavLink}
                        to="/documents"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <DescriptionOutlined />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Documentos"
                        />
                    </ListItem>

                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        component={NavLink}
                        to="/upload"
                    >
                        <ListItemIcon className={classes.listItemIcon}>                            
                            <CloudUploadOutlined />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Upload"
                        />
                    </ListItem>

                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        component={NavLink}
                        to="/products"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <ShoppingBasketIcon />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Products"
                        />
                    </ListItem>

                    <Divider className={classes.listDivider} />

                    <ListItem
                        activeClassName={classes.activeListItem}
                        className={classes.listItem}
                        component={NavLink}
                        to="/settings"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Settings"
                        />
                    </ListItem>
                </List>
            </nav>
        );
    }
}

Sidebar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
