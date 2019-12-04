import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';

import waitingRegisterImage from './images/waiting.svg';
import registredImage from './images/registred.svg';

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
	Button,
	CardMedia,
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
import { format } from 'date-fns/esm';

const CardItem = ({ title, description, display }) => {
	return (
		<div style={{ margin: '10px 0px 10px 0px' }}>
			<Typography gutterBottom variant="h5" component="h2" display={display}>
				{`${title} `}
			</Typography>
			<Typography variant="body2" color="textSecondary" component="p" display={display}>
				{description}
			</Typography>
		</div>
	)
}

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
		const { classes, className, rowsPerPage, loading, page, transactions, handleChangeRowsPerPage, handleChangePage } = this.props;
		const { anchorEl, detailsOpen, rowSelected } = this.state;

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
											<TableCell align="center">Transação</TableCell>
											<TableCell align="center">Confirmações</TableCell>
											<TableCell align="center">Confirmada</TableCell>
											<TableCell align="center">Data registro</TableCell>
											<TableCell align="center">Ações</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{transactions ? transactions.map(transaction => (
											<TableRow
												className={classes.tableRow}
												hover
												key={transaction.id}
											>
												<TableCell
													align="center"
													className={classes.tableCell}
												>
													<Typography variant="body1">{transaction.transaction}</Typography>
												</TableCell>

												<TableCell
													align="center"
													className={classes.tableCell}
												>
													{transaction.confirmations > 6 ? (
														<Badge max={6} color="primary" variant="standard" badgeContent={transaction.confirmations} />
													) : (
															<Badge max={6} color="secondary" badgeContent={transaction.confirmations || '0'} />
														)
													}
												</TableCell>

												<TableCell
													align="center"
													className={classes.tableCell}
												>
													{transaction.confirmed ? <Check color="primary" /> : <Close color="secondary" />}
												</TableCell>

												<TableCell
													align="center"
													className={classes.tableCell}
												>
													{moment(transaction.createdAt).format('DD/MM/YYYY')}
												</TableCell>

												<TableCell
													align="center"
													className={classes.tableCell}
												>
													<IconButton size="medium">
														<MoreVert onClick={event => this.handleDetailsClick(event, transaction)} />
													</IconButton>
												</TableCell>
											</TableRow>
										)) : null}
									</TableBody>
								</Table>
							)}
					</PerfectScrollbar>
					<TablePagination
						backIconButtonProps={{ 'aria-label': 'Previous Page' }}
						component="div"
						count={transactions.length}
						nextIconButtonProps={{ 'aria-label': 'Next Page' }}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
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
					fullWidth={true}
					open={detailsOpen}
					onClose={this.handleCloseDetailDocument}
					aria-labelledby="responsive-dialog-title"
					maxWidth="sm"
				>
					<DialogTitle id="responsive-dialog-title">
						<Grid
							container
							direction="row"
							justify="flex-end"
							alignItems="center"
						>
							<CloseIcon
								className={classes.closeModalButton}
								onClick={this.handleCloseDetailDocument}
							/>
						</Grid>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{rowSelected && rowSelected ? (
								<React.Fragment>
									<div className={classes.header}>
										{rowSelected.confirmed ? (
											<Grid
												container
												direction="column"
												justify="center"
												alignItems="center"
											>
												<CardMedia
													className={classes.media}
													image={registredImage}
													title="Documento registrado com sucesso"
												/>
												<span>Documento registrado em {format(new Date(rowSelected.createdAt), "dd/MM/yyyy HH:mm:ss")}</span>
											</Grid>
										) : (
												<Grid
													container
													direction="column"
													justify="center"
													alignItems="center"
												>
													<CardMedia
														className={classes.media}
														image={waitingRegisterImage}
														title="Documento aguardando registro"
													/>
													<span>Aguardando registro</span>
												</Grid>
											)}
									</div>
									<CardItem
										title="Confirmações"
										description={
											<Badge
												className={classes.badgeMargin}
												badgeContent={rowSelected.confirmations || '0'}
												color={rowSelected.confirmations ? "primary" : "secondary"}
											/>
										}
									/>
									<CardItem
										title="Hash do documento"
										description={<span style={{ wordBreak: 'break-word' }}>{rowSelected.hash}</span>}
									/>
									<CardItem
										title="OP Return"
										description={<span style={{ wordBreak: 'break-word' }}>{rowSelected.opreturn}</span>}
									/>
									<CardItem
										title="Transaction"
										description={<span style={{ wordBreak: 'break-word' }}>{rowSelected.transaction}</span>}
									/>
								</React.Fragment>
							) : (
									<Typography variant="body2" color="textSecondary" component="p">
										Nenhum documento selecionado
									</Typography>
								)}
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