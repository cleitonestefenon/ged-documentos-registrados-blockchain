import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, Paper, Divider, ListItem, ListItemSecondaryAction, Checkbox, List, ListItemAvatar, ListItemText, Avatar, Radio, Tooltip } from '@material-ui/core';

// Material components
import {
	Badge,
	IconButton,
	Popover,
	Toolbar,
	Typography,
	InputBase
} from '@material-ui/core';

// Material icons
import {
	Menu as MenuIcon,
	Close as CloseIcon,
	NotificationsOutlined as NotificationsIcon,
	Input as InputIcon,
	Search as SearchIcon
} from '@material-ui/icons';

// Shared services
import { getNotifications } from 'services/notification';

// Custom components
import { NotificationList } from './components';

// Component styles
import styles from './styles';
import AlertDialog from 'components/Modal';
import OrganizationList from './components/OrganizationList';
import SearchOptionsList from './components/SearchOptionsList';

const searchOptions = [
	{ label: 'Nome', value: 'name', icon: 'N', inputLabel: "por nome..." },
	{ label: 'Chave pública', value: 'publickey', icon: 'C', inputLabel: "pela chave pública..." },
	{ label: 'Endereço', value: 'address', icon: 'E', inputLabel: "pelo endereço..." }
]

class Topbar extends Component {
	signal = true;

	state = {
		showExitConfirmation: false,
		filterSelected: { label: 'Nome', value: 'name', icon: 'N', inputLabel: "por nome..." },
		searchInputValue: '',
		notifications: [],
		notificationsLimit: 4,
		notificationsCount: 0,
		notificationsEl: null,
		searchFilterEl: null,
		searchEl: null
	};

	async getNotifications() {
		try {
			const { notificationsLimit } = this.state;

			const { notifications, notificationsCount } = await getNotifications(
				notificationsLimit
			);

			if (this.signal) {
				this.setState({
					notifications,
					notificationsCount
				});
			}
		} catch (error) {
			return;
		}
	}

	componentDidMount() {
		this.signal = true;
		this.getNotifications();
	}

	componentWillUnmount() {
		this.signal = false;
	}

	handleSignOut = () => {
		const { history } = this.props;

		sessionStorage.clear();
		history.push('/sign-in');
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

	handleShowOrganizations = () => {
		this.setState({
			searchEl: document.getElementById("inputBaseSearchFilter")
		});
	};

	handleCloseOrganizations = () => {
		this.setState({
			searchEl: null
		});
	};

	handleShowSearchFilter = event => {
		this.setState({
			searchFilterEl: event.currentTarget
		});
	};

	handleCloseSearchFilter = () => {
		this.setState({
			searchFilterEl: null
		});
	};

	onSelectFilterOption = option => {
		this.setState({ filterSelected: option });
		this.handleCloseSearchFilter();
	}

	onChangeInput = e => {
		this.setState({ searchInputValue: e.target.value });
	}

	render() {
		const { classes, className, title, isSidebarOpen, onToggleSidebar } = this.props;

		const { notifications, notificationsCount, notificationsEl, searchEl, searchInputValue, searchFilterEl, filterSelected } = this.state;

		const rootClassName = classNames(classes.root, className);

		const showNotifications = Boolean(notificationsEl);
		const showOrganizations = Boolean(searchEl);
		const showSearchFilter = Boolean(searchFilterEl)

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
						<div className={classes.searchContent}>
							<Tooltip title="Troque o filtro para pesquisar da maneira desejada">
								<IconButton className={classes.iconButton} aria-label="menu" onClick={this.handleShowSearchFilter}>
									<MenuIcon onClick={this.handleShowSearchFilter} />
								</IconButton>
							</Tooltip>
							<Tooltip title="Conecte-se com outras organizações para trocar documentos">
								<InputBase
									id="inputBaseSearchFilter"
									className={classes.inputSearch}
									onChange={this.onChangeInput}
									placeholder={`Pesquisar organização ${filterSelected.inputLabel}`}
									inputProps={{ 'aria-label': 'search google maps' }}
								/>
							</Tooltip>
							<Tooltip title="Clique para pesqusiar">
								<IconButton className={classes.iconButton} aria-label="search" onClick={this.handleShowOrganizations}>
									<SearchIcon onClick={this.handleShowOrganizations} />
								</IconButton>
							</Tooltip>
						</div>
						<IconButton
							className={classes.notificationsButton}
							onClick={this.handleShowNotifications}
						>
							<Badge
								badgeContent={notificationsCount}
								color="primary"
								variant="dot"
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
						notifications={notifications}
						onSelect={this.handleCloseNotifications}
					/>
				</Popover>

				<Popover
					anchorEl={searchEl}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					onClose={this.handleCloseOrganizations}
					open={showOrganizations}
					transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<OrganizationList
						searchInputValue={searchInputValue}
						filterSelected={filterSelected}
					/>
				</Popover>

				<Popover
					anchorEl={searchFilterEl}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					onClose={this.handleCloseSearchFilter}
					open={showSearchFilter}
					transformOrigin={{ vertical: 'top', horizontal: 'center' }}
				>
					<SearchOptionsList
						searchOptions={searchOptions}
						onSelect={this.onSelectFilterOption}
						filterSelected={filterSelected}
					/>
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
