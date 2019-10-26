import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';

// Material helpers
import {
	withStyles,
	IconButton,
	Badge,
	Menu,
	MenuItem,
	ListItemText,
	Grid,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from '@material-ui/core';

// Material components
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TablePagination
} from '@material-ui/core';

// Component styles
import styles from './styles';
import { Portlet, PortletContent } from 'components';

import {
	Check,
	Close,
	MoreVert,
	Close as CloseIcon
} from '@material-ui/icons';

class DocumentsList extends Component {
	state = {
		anchorEl: null,
		rowSelected: null,
		detailsOpen: false
	};

	componentDidMount() {
		this.props.getTransactions();
	}

	handleDetailsClick = (event, rowSelected) => {
		this.setState({
			anchorEl: event.currentTarget,
			rowSelected
		})
	}

	handleCloseDetails = () => {
		this.setState({ anchorEl: null })
	}

	handleOpenDetailDocument = () => {
		this.setState({ detailsOpen: true })
	}

	handleCloseDetailDocument = () => {
		this.setState({ detailsOpen: false })
		this.handleCloseDetails();
	}

	render() {
		const { classes, className, rowsPerPage, loading, page, transactions } = this.props;
		const { anchorEl, detailsOpen, rowSelected } = this.state;
console.log(rowSelected)
		const rootClassName = classNames(classes.root, className);

		return (
			<Portlet className={rootClassName}>
				<PortletContent noPadding>
					<PerfectScrollbar>
						{loading ? (
							<Grid container justify="center" alignItems="center" className={classes.loading}>
								<CircularProgress />
							</Grid>
						) : (
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell align="left">Transação</TableCell>
											<TableCell align="left">Confirmações</TableCell>
											<TableCell align="left">Confirmada</TableCell>
											<TableCell align="left">Data registro</TableCell>
											<TableCell align="left">Ações</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{transactions ? transactions.map(el => (
											<TableRow
												className={classes.tableRow}
												hover
												key={el.id}
											>
												<TableCell
													align="center"
													className={classes.tableCell}
												>
													<Typography variant="body1">{el.transaction}</Typography>
												</TableCell>

												<TableCell
													align="center"
													className={classes.tableCell}
												>
													{el.confirmations > 6 ? (
														<Badge max={6} color="primary" variant="standard" badgeContent={el.confirmations} />
													) : (
															<Badge max={6} color="secondary" badgeContent={el.confirmations || '0'} />
														)
													}
												</TableCell>

												<TableCell
													align="center"
													className={classes.tableCell}
												>
													{el.confirmed ? <Check color="primary" /> : <Close color="secondary" />}
												</TableCell>

												<TableCell
													align="center"
													className={classes.tableCell}
												>
													{moment(el.createdAt).format('DD/MM/YYYY')}
												</TableCell>

												<TableCell
													align="center"
													className={classes.tableCell}
												>
													<IconButton size="medium">
														<MoreVert onClick={event => this.handleDetailsClick(event, el)} />
													</IconButton>
												</TableCell>
											</TableRow>
										)) : null}
									</TableBody>
								</Table>
							)}
					</PerfectScrollbar>
					<TablePagination
						backIconButtonProps={{
							'aria-label': 'Previous Page'
						}}
						component="div"
						count={transactions.length}
						nextIconButtonProps={{
							'aria-label': 'Next Page'
						}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
						page={page}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={[5, 10, 25]}
					/>
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={this.handleCloseDetails}
					>
						<MenuItem>
							<ListItemText
								primary="Detalhar"
								onClick={this.handleOpenDetailDocument}
							/>
						</MenuItem>
					</Menu>
				</PortletContent>
				<Dialog
					fullScreen={false}
					open={detailsOpen}
					onClose={this.handleCloseDetailDocument}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center"
						>
							<span>Detalhamento do documento</span>
							<CloseIcon
								className={classes.closeModalButton}
								onClick={this.handleCloseDetailDocument}
							/>
						</Grid>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Let Google help apps determine location. This means sending anonymous location data to
							Google, even when no apps are running.
          				</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCloseDetailDocument} color="primary">
							Retornar à listagem
          				</Button>
					</DialogActions>
				</Dialog>
			</Portlet>
		);
	}
}

DocumentsList.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	onSelect: PropTypes.func,
	onShowDetails: PropTypes.func,
	transactions: PropTypes.array.isRequired
};

DocumentsList.defaultProps = {
	transactions: [],
	onSelect: () => { },
	onShowDetails: () => { }
};

export default compose(withRouter, withStyles(styles))(DocumentsList);