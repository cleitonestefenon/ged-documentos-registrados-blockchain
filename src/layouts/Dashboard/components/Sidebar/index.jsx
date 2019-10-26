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
    DescriptionOutlined,
    CloudUploadOutlined
} from '@material-ui/icons';

// Component styles
import styles from './styles';

// Logos
import logo from './images/logo.png';
import avatar_default from './images/avatar_default.png';

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
                            src={logo}
                            width={220}
                            height={60}
                        />
                    </Link>
                </div>

                <Divider className={classes.logoDivider} />

                <div className={classes.profile}>
                    <Link to="/account">
                        <Avatar
                            className={classes.avatar}
                            src={this.state.avatar || avatar_default}
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
                        to="/organizations"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <DescriptionOutlined />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Organizações"
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
                            primary="Documentos"
                        />
                    </ListItem>

                    <Divider className={classes.listDivider} />
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
