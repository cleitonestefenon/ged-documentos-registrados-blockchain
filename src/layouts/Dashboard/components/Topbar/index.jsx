import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
	Badge,
	IconButton,
	Popover,
	Toolbar,
	Typography,
} from '@material-ui/core';

// Material icons
import {
	Menu as MenuIcon,
	Close as CloseIcon,
	NotificationsOutlined as NotificationsIcon,
	Input as InputIcon,
	PeopleSharp
} from '@material-ui/icons';

// Custom components
import { NotificationList, SearchOrganizations } from './components';

// Component styles
import styles from './styles';
import AlertDialog from 'components/Modal';

import { getNumberOfNotifications } from './requests';

class Topbar extends Component {

	state = {
		showExitConfirmation: false,
		notifications: [],
		notificationsCount: 0,
		notificationsEl: null,
		searchOrganizationsEl: null
	};

	async componentDidMount() {
		this.refleshCountNotifications();
	}

	getCountNotifications = async () => {
		return await getNumberOfNotifications();
	}

	refleshCountNotifications = async () => {
		const count = await this.getCountNotifications();

		this.setState({ notificationsCount: count })
	}

	handleSignOut = () => {
		const { history } = this.props;

		sessionStorage.clear();
		history.push('/sign-in');
	};

	handleShowSearchOrganizations = event => {
		this.setState({
			searchOrganizationsEl: event.currentTarget
		});
	};
	handleCloseSearchOrganizations = () => {
		this.setState({
			searchOrganizationsEl: null
		});
	};

	handleShowNotifications = event => {
		this.setState({
			notificationsEl: event.currentTarget
		});
	};
	handleCloseNotifications = () => {
		this.setState({
			notificationsEl: null
		});
	};

	render() {
		const { classes, className, title, isSidebarOpen, onToggleSidebar } = this.props;

		const { notificationsCount, notificationsEl, searchOrganizationsEl } = this.state;

		const rootClassName = classNames(classes.root, className);

		const showNotifications = Boolean(notificationsEl);
		const showSearchOrganizations = Boolean(searchOrganizationsEl);

		return (
			<Fragment>
				<div className={rootClassName}>
					<Toolbar className={classes.toolbar}>
						<IconButton
							className={classes.menuButton}
							onClick={onToggleSidebar}
							variant="text"
						>
							{isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
						</IconButton>
						<Typography
							className={classes.title}
							variant="h4"
						>
							{title}
						</Typography>

						<IconButton
							className={classes.peopleIcon}
							onClick={this.handleShowSearchOrganizations}
						>
							<PeopleSharp />
						</IconButton>

						<IconButton
							className={classes.notificationsButton}
							onClick={this.handleShowNotifications}
						>
							<Badge
								badgeContent={notificationsCount}
								color="primary"
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>

						<IconButton
							className={classes.signOutButton}
							onClick={() => this.setState({ showExitConfirmation: true })}
						>
							<InputIcon />
						</IconButton>

					</Toolbar>
				</div>
				<Popover
					anchorEl={notificationsEl}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					onClose={this.handleCloseNotifications}
					open={showNotifications}
					transformOrigin={{ vertical: 'top', horizontal: 'center' }}
				>
					<NotificationList
						onClose={this.handleCloseNotifications}
						onSelect={this.refleshCountNotifications}
					/>
				</Popover>

				<Popover
					anchorEl={searchOrganizationsEl}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					transformOrigin={{ vertical: 'top', horizontal: 'center' }}
					onClose={this.handleCloseSearchOrganizations}
					open={showSearchOrganizations}
				>
					<SearchOrganizations />
				</Popover>

				<AlertDialog
					open={this.state.showExitConfirmation}
					handleClose={() => this.setState({ showExitConfirmation: false })}
					dialogTitle="Confirmação"
					agreeNameButton="Sim"
					disagreeNameButton="Não"
					dialogContentText="Você tem certeza que deseja sair do sistema?"
					onAgreeClick={this.handleSignOut}
					onDisagreeClick={() => this.setState({ showExitConfirmation: false })}
				/>
			</Fragment>
		);
	}
}

Topbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	isSidebarOpen: PropTypes.bool,
	onToggleSidebar: PropTypes.func,
	title: PropTypes.string
};

Topbar.defaultProps = {
	onToggleSidebar: () => { }
};

export default compose(
	withRouter,
	withStyles(styles)
)(Topbar);
