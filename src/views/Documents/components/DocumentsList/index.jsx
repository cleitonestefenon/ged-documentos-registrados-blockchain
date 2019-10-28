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
	Card,
	CardActionArea,
	CardMedia,
	CardContent
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
										description={<Badge className={classes.badgeMargin} badgeContent={rowSelected && rowSelected.confirmations} color="primary" />}
									/>
									<CardItem
										title="Hash do documento"
										description={rowSelected.hash}
									/>
									<CardItem
										title="OP Return"
										description={<span style={{ wordBreak: 'break-word' }}>{rowSelected.opreturn}</span>}
									/>
									<CardItem
										title="Transaction"
										description={rowSelected.transaction}
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