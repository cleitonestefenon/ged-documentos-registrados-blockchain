import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, Grid, Paper, InputBase, IconButton, Popover, Tooltip } from '@material-ui/core';

// Component styles
import styles from './styles';

import { Search, Menu } from '@material-ui/icons';

import OptionsList from './components/OptionsList';

const searchOptions = [
	{ label: 'Nome', value: 'name', inputLabel: "por nome..." },
	{ label: 'E-mail', value: 'email', inputLabel: "pelo e-mail..." }
]

class OrganizationToolbar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			popoverEl: null,
			valueInputBase: '',
			filterSelected: searchOptions[0]
		}
	}

	handleCloseSearchFilter = () => {
		this.setState({ popoverEl: null })
	}

	onSelectFilterOption = option => {
		this.setState({ filterSelected: option });
		this.handleCloseSearchFilter();
	}

	handleMenuOpen = event => {
		this.setState({ popoverEl: event.currentTarget })
	}

	searchOrganizationsWithFilter = () => {
		const { filterSelected, valueInputBase } = this.state;

		this.props.searchOrganizations(filterSelected, valueInputBase);
	}

	handleChangeInputBase = e => {
		this.setState({ valueInputBase: e.target.value })
	}

	render() {
		const { classes } = this.props;
		const { popoverEl, filterSelected, valueInputBase } = this.state;

		return (
			<Grid container direction="row" justify="center" alignItems="center">
				<Paper className={classes.root}>
					<IconButton
						onClick={this.handleMenuOpen}
						className={classes.iconButton}
						aria-label="menu"
					>
						<Menu onClick={this.handleMenuOpen} />
					</IconButton>
					<InputBase
						className={classes.input}
						placeholder={`Pesquisar organização ${filterSelected.inputLabel}`}
						onChange={this.handleChangeInputBase}
						value={valueInputBase}
					/>
					<Tooltip title="Clique para efetuar a pesquisa">
						<IconButton
							className={classes.iconButton}
							aria-label="search"
						>
							<Search onClick={this.searchOrganizationsWithFilter} />
						</IconButton>
					</Tooltip>
				</Paper>
				<Popover
					open={Boolean(popoverEl)}
					anchorEl={popoverEl}
					onClose={this.handleCloseSearchFilter}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					transformOrigin={{ vertical: 'top', horizontal: 'center' }}
				>
					<OptionsList
						searchOptions={searchOptions}
						onSelect={this.onSelectFilterOption}
						filterSelected={filterSelected}
					/>
				</Popover>
			</Grid>
		);
	}
}

OrganizationToolbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(OrganizationToolbar);
