import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles, Button, CircularProgress, TablePagination, IconButton, Tooltip } from '@material-ui/core';

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
import { findOrganizationByName, findOrganizationByPublicKey, findOrganizationByAddress } from './requests';

// Material icons
import {
	ArrowForwardIos as ArrowForwardIosIcon,
	Send
} from '@material-ui/icons';
import { mountDataImage, mountDataImageTeste } from 'common/functions';

class OrganizationList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			organizations: null,
			count: 0, //total of elements
			offset: 0, //offset
			rowsPerPage: 4, //limit
		}
	}

	async componentDidMount() {
		await this.searchOrganizations();
	}

	searchOrganizations = async () => {
		const { searchInputValue, filterSelected } = this.props;
		const { offset, rowsPerPage } = this.state;

		switch (filterSelected.value) {
			case 'name': {
				await findOrganizationByName(searchInputValue, offset, rowsPerPage, resp => {
					this.setState({
						organizations: resp.data.organizations.rows,
						count: resp.data.organizations.count
					})
				})
				break;
			}
			case 'publickey': {
				await findOrganizationByPublicKey(searchInputValue, resp => {
					console.log(resp)
				})
				break;
			}
			case 'address': {
				await findOrganizationByAddress(searchInputValue, resp => {
					console.log(resp)
				})
				break;
			}
			default: break;
		}
	}

	handleChangePage = async (event, newPage) => {
		console.log(newPage)
		await this.setState({
			offset: newPage,
			organizations: null
		})
		await this.searchOrganizations();
	}

	handleChangeRowsPerPage = async (event) => {
		await this.setState({
			rowsPerPage: +event.target.value,
			page: 0,
			organizations: null
		})
		await this.searchOrganizations();
	}

	sendSolicitation = organization => {
		console.log(organization)
	}

	render() {
		const { organizations } = this.state;
		const { className, classes, onSelect } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<div className={classes.header}>
					<Typography variant="h6">Organizações</Typography>
					<Typography
						className={classes.subtitle}
						variant="body2"
					>
						{`${this.state.count} organizações encontradas`}
					</Typography>
				</div>
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
							<React.Fragment>
								<ListItem key={organization.id} alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Avatar">{organization.name.substr(0, 1)}</Avatar>
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
											<Send onClick={() => this.sendSolicitation(organization)} />
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
							count={this.state.count}
							rowsPerPage={this.state.rowsPerPage}
							page={this.state.offset}
							labelRowsPerPage=""
							onChangePage={this.handleChangePage}
							onChangeRowsPerPage={this.handleChangeRowsPerPage}
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

OrganizationList.defaultProps = {
	notifications: [],
	onSelect: () => { }
};

export default withStyles(styles)(OrganizationList);
