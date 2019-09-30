import React, { Component, Fragment } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles, Tooltip, IconButton, InputBase, Popover, Divider } from '@material-ui/core';

// Component styles
import styles from './styles';
import { Menu, Search } from '@material-ui/icons';
import SearchOptionsList from './SearchOptionsList';
import OrganizationList from './OrganizationList';

// action redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


//Common functions
import { showNotification } from 'config/actions';

//Requests
import {
	findOrganizationByName,
	findOrganizationByPublicKey,
	findOrganizationByAddress,
	sendInvite
} from './requests';
import { removeElementOfList } from 'common/functions';

const searchOptions = [
	{ label: 'Nome', value: 'name', inputLabel: "por nome..." },
	{ label: 'Chave pública', value: 'publickey', inputLabel: "pela chave pública..." },
	{ label: 'Endereço', value: 'address', inputLabel: "pelo endereço..." }
]

class SearchOrganizations extends Component {

	constructor(props) {
		super(props);

		this.state = {
			filterSelected: { label: 'Nome', value: 'name', icon: 'N', inputLabel: "por nome..." },
			searchFilterEl: null,
			searchInputValue: '',
			organizations: [],
			count: 0, //total of elements
			offset: 0, //offset
			rowsPerPage: 4, //limit
		}
	}

	async componentDidMount() {
		this.searchOrganizations();
	}

	searchOrganizations = async () => {
		const { offset, rowsPerPage, filterSelected, searchInputValue } = this.state;

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
				await findOrganizationByPublicKey(searchInputValue, offset, rowsPerPage, resp => {
					this.setState({
						organizations: resp.data.organizations.rows,
						count: resp.data.organizations.count
					})
				})
				break;
			}
			case 'address': {
				await findOrganizationByAddress(searchInputValue, offset, rowsPerPage, resp => {
					this.setState({
						organizations: resp.data.organizations.rows,
						count: resp.data.organizations.count
					})
				})
				break;
			}
			default: break;
		}
	}

	sendSolicitation = organization => {
		const { organizations } = this.state;

		sendInvite(organization.id, resp => {
			this.setState({
				organizations: removeElementOfList(organizations, false, 'id', organization.id)
			})
			this.props.showNotification({
				message: 'Convite enviado com sucesso! 😎',
				variant: 'success'
			})
		}, () => {
			this.props.showNotification({
				message: 'Ops, ocorreu um erro ao enviar o convite. 😢',
				variant: 'error'
			})
		});
	}

	handleChangePage = async (event, newPage) => {
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

	onSelectFilterOption = option => {
		this.setState({ filterSelected: option });
		this.handleCloseSearchFilter();
	}

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

	onChangeInput = e => {
		this.setState({ searchInputValue: e.target.value });
	}

	render() {
		const { className, classes } = this.props;

		const { filterSelected,
			searchFilterEl,
			searchInputValue,
			organizations,
			count,
			offset,
			rowsPerPage } = this.state;

		const showSearchFilter = Boolean(searchFilterEl);

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<Fragment>
					<div className={classes.header}>
						<Tooltip title="Trocar filtro">
							<IconButton aria-label="menu" onClick={this.handleShowSearchFilter}>
								<Menu onClick={this.handleShowSearchFilter} />
							</IconButton>
						</Tooltip>
						<InputBase
							className={classes.inputSearch}
							onChange={this.onChangeInput}
							placeholder={`Pesquisar organização ${filterSelected.inputLabel}`}
							inputProps={{ 'aria-label': 'search organizations' }}
						/>
						<Tooltip title="Pesquisar">
							<IconButton aria-label="search" onClick={this.searchOrganizations}>
								<Search onClick={this.searchOrganizations} />
							</IconButton>
						</Tooltip>
					</div>

					<Divider />

					<div className={classes.content}>
						<OrganizationList
							organizations={organizations}
							searchOrganizations={this.searchOrganizations}
							searchInputValue={searchInputValue}
							filterSelected={filterSelected}
							handleChangeRowsPerPage={this.handleChangeRowsPerPage}
							handleChangePage={this.handleChangePage}
							sendSolicitation={this.sendSolicitation}
							count={count}
							offset={offset}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</Fragment>

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
			</div>
		);
	}
}

SearchOrganizations.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	notifications: PropTypes.array.isRequired,
	onSelect: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default withStyles(styles)(connect(null, mapDispatchToProps)(SearchOrganizations));
