import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles, CircularProgress, TablePagination, IconButton, Tooltip } from '@material-ui/core';

// Material components
import {
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography
} from '@material-ui/core';

// Component styles
import styles from './styles';

// Material icons
import { Send } from '@material-ui/icons';

class OrganizationList extends Component {

	render() {
		const { className, classes, organizations, count, offset, rowsPerPage } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<List className={classes.root}>
					{organizations ? organizations.length === 0 ? (
						<Typography
							className={classes.subtitle}
							variant="body2"
							style={{ textAlign: 'center' }}
						>
							Nenhuma organização encontrada
						</Typography>
					) : organizations.map(organization => {
						return (
							<React.Fragment key={organization.id}>
								<ListItem key={organization.id} alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Avatar">{organization.name ? organization.name.substr(0, 1) : ""}</Avatar>
									</ListItemAvatar>
									<ListItemText
										key={organization.id}
										primary={organization.name}
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													className={classes.inline}
													color="textPrimary"
												>
													{organization.email}
												</Typography>
											</React.Fragment>
										}
									/>
									<Tooltip title="Enviar convite" aria-label="tooltip">
										<IconButton aria-label="arrow">
											<Send onClick={() => this.props.sendSolicitation(organization)} />
										</IconButton>
									</Tooltip>
								</ListItem>
								<Divider variant="inset" component="li" />
							</React.Fragment>
						)
					}) : (
							<div className={classes.progressWrapper}>
								<CircularProgress />
							</div>
						)
					}
					<div className={classes.footer}>
						<TablePagination
							rowsPerPageOptions={[4, 8, 12]}
							component="div"
							count={count}
							rowsPerPage={rowsPerPage}
							page={offset}
							labelRowsPerPage=""
							onChangePage={this.props.handleChangePage}
							onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
						/>
					</div>
				</List>
			</div>
		);
	}
}

OrganizationList.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	notifications: PropTypes.array.isRequired,
	onSelect: PropTypes.func
};


export default withStyles(styles)(OrganizationList);
