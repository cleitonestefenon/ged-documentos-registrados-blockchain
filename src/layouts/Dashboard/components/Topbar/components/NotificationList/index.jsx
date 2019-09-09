import React, { Component, Fragment } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles, ListItemAvatar, Avatar, Tooltip, IconButton } from '@material-ui/core';

// Material components
import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography
} from '@material-ui/core';

// Material icons
import { Check, Close } from '@material-ui/icons';

// Component styles
import styles from './styles';

import { searchNotifications, acceptInvite, rejectInvitation } from './requests';

class NotificationList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			notifications: []
		}
	}

	async componentDidMount() {
		this.refleshNotifications();
	}

	refleshNotifications = async () => {
		const { data } = await searchNotifications();

		this.setState({
			notifications: data.organizationsInteresteds
		})
	}

	acceptSolicitation = async solicitation => {
		await acceptInvite(solicitation.id);

		this.refleshNotifications();

		await this.props.onSelect();
	}

	rejectSolicitation = async solicitation => {
		await rejectInvitation(solicitation.id);

		this.refleshNotifications();
		
		await this.props.onSelect();
	}

	render() {
		const { className, classes } = this.props;
		const { notifications } = this.state;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				{notifications.length > 0 ? (
					<Fragment>
						<div className={classes.header}>
							<Typography variant="h6">Notificações</Typography>
							<Typography
								className={classes.subtitle}
								variant="body2"
							>
								{notifications.length} nova(s) notificação(ções)
              				</Typography>
						</div>
						<div className={classes.content}>
							<List component="div">
								{notifications.map(notification => (
									<React.Fragment key={notification.id}>
										<ListItem key={notification.id} alignItems="flex-start">
											<ListItemAvatar>
												<Avatar alt="Avatar">{notification.name.substr(0, 1)}</Avatar>
											</ListItemAvatar>
											<ListItemText
												key={notification.id}
												secondary={`${notification.name} deseja compartilhar documentos com você!`}
											/>
											<Tooltip title="Aceitar" aria-label="tooltip">
												<IconButton color="primary" aria-label="arrow">
													<Check color="primary" onClick={() => this.acceptSolicitation(notification)} />
												</IconButton>
											</Tooltip>
											<Tooltip title="Rejeitar" aria-label="tooltip">
												<IconButton aria-label="arrow">
													<Close color="error" onClick={() => this.rejectSolicitation(notification)} />
												</IconButton>
											</Tooltip>
										</ListItem>
										<Divider variant="middle" component="li" />
									</React.Fragment>
								))}
							</List>
						</div>
					</Fragment>
				) : (
						<div className={classes.empty}>
							<div className={classes.emptyImageWrapper}>
								<img
									alt="Empty list"
									className={classes.emptyImage}
									src="/images/empty.png"
								/>
							</div>
							<Typography variant="h4">Nenhuma notificação encontrada...</Typography>
						</div>
					)}
			</div>
		);
	}
}

NotificationList.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	notifications: PropTypes.array.isRequired,
	onSelect: PropTypes.func
};

NotificationList.defaultProps = {
	notifications: [],
	onSelect: () => { }
};

export default withStyles(styles)(NotificationList);
