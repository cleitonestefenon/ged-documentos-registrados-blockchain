import React, { Component } from 'react';

// Custom components
import { DocumentsList, DocumentUpload } from './components';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Material helpers
import { withStyles, Divider } from '@material-ui/core';

// Component styles
import styles from './style';
import { loadAllTransactions } from './requests';


class DocumentsRegistration extends Component {
    state = {
        transactions: [],
        loading: false,
        rowsPerPage: 10,
        page: 0
    };

    handleChangePage = async (event, page) => {
        await this.setState({ page });
        this.getTransactions();
    };

    handleChangeRowsPerPage = async event => {
        await this.setState({ rowsPerPage: event.target.value });
        this.getTransactions();
    };

    showLoading = () => {
        this.setState({ loading: true })
    }

    hiddenLoading = () => {
        this.setState({ loading: false })
    }

    getTransactions = () => {
        const { page, rowsPerPage } = this.state;

        this.showLoading();

        loadAllTransactions(page, rowsPerPage, transactions => {
            this.setState({ transactions, loading: false });
        }, err => {
            this.hiddenLoading();
            console.error(err);
        })
    }

    render() {

        const { classes } = this.props;
        const { rowsPerPage, page, transactions, loading } = this.state;

        return (
            <DashboardLayout title="Upload">
                <div className={classes.root}>
                    <DocumentUpload getTransactions={this.getTransactions} />
                    <Divider className={classes.listDivider} />
                    <DocumentsList
                        getTransactions={this.getTransactions}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        loading={loading}
                        transactions={transactions}
                    />
                </div>
            </DashboardLayout>
        );
    };
};

export default withStyles(styles)(DocumentsRegistration);
