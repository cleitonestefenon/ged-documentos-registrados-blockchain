import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from 'components';

// Component styles
import styles from './styles';

// Functions
import { getUserIP } from './requests';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

class AccountProfile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			ip: ''
		}
	}

	async componentDidMount() {
		const name = getFromSessionStorage(KEY_STORAGE.NAME);
		const ip = await getUserIP();

		this.setState({ ip, name })
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
							src="/images/avatars/avatar_1.png"
						/>
					</div>
				</PortletContent>
				<PortletFooter>
					<div>
						<input
							accept="image/*"
							className={classes.inputFile}
							id="contained-button-file"
							multiple
							type="file"
						/>
						<label htmlFor="contained-button-file">
							<Button component="span" className={classes.profileButton}>
								Carregar avatar
              				</Button>
						</label>
					</div>
					<Button variant="text" className={classes.profileButton}>Remover avatar</Button>
				</PortletFooter>
			</Portlet>
		);
	}
}

AccountProfile.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
