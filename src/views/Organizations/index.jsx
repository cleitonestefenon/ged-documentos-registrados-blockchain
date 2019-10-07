import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions redux
import { showNotification } from 'config/actions';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { OrganizationTable, OrganizationToolbar } from './components';

// Component styles
import styles from './style';

import {
    findAllSharedOrganizations,
    findSharedOrganizationsByEmail,
    findSharedOrganizationsByName
} from './requests';

class Organizations extends Component {

    state = {
        rowsPerPage: 10, //limit
        page: 0, //offset
        organizations: [],
    };

    componentDidMount() {
		this.searchOrganizations();
	}

    searchOrganizations = async (filterSelected, value) => {

        const { page, rowsPerPage } = this.state;

        if (value) {
            if (filterSelected) {
                switch (filterSelected.value) {
                    case 'name': {
                        await findSharedOrganizationsByName(value, page, rowsPerPage, resp => {
                            this.setState({
                                organizations: resp
                            })
                        }, err => {
                            this.props.showNotification({
                                variant: 'error',
                                message: err && err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao localizar seus contatos pareados  😢😢',
                            })
                        })
                        break;
                    }
                    case 'email': {
                        await findSharedOrganizationsByEmail(value, page, rowsPerPage, resp => {
                            this.setState({
                                organizations: resp
                            })
                        }, err => {
                            this.props.showNotification({
                                variant: 'error',
                                message: err && err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao localizar seus contatos pareados  😢😢',
                            })
                        })
                        break;
                    }
                    default: break;
                }
            }
        } else {
            await findAllSharedOrganizations(page, rowsPerPage, resp => {
                this.setState({
                    organizations: resp
                })
            }, err => {
                this.props.showNotification({
                    variant: 'error',
                    message: err && err.response && err.response.data && err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao localizar seus contatos pareados  😢😢',
                })
            })
        }

    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { page, rowsPerPage } = this.state;

        return (
            <DashboardLayout title="Organizações">
                <div className={classes.root}>
                    <OrganizationToolbar
                        searchOrganizations={this.searchOrganizations}
                    />
                    <OrganizationTable
                        className={classes.content}
                        onSelect={this.handleSelect}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        handleChangePage={this.handleChangePage}
                        searchOrganizations={this.searchOrganizations}
                        organizations={this.state.organizations}
                    />
                </div>
            </DashboardLayout>
        );
    }
}

Organizations.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({ showNotification }, dispatch);

export default withStyles(styles)(connect(null, mapDispatchToProps)(Organizations));
