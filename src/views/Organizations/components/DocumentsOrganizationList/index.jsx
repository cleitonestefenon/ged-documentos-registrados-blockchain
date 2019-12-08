import React, { Component } from 'react';

// Material components
import {
    Avatar,
    withStyles,
    IconButton,
    ListItemText,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    Grid,
    Divider,
    Typography,
    TablePagination,
} from '@material-ui/core';

// Component styles
import styles from './styles';

//Functions
import { findAllDocumentsByOrganization } from './requests';
import { GetApp, Archive } from '@material-ui/icons';
import { format } from 'date-fns/esm';

class DocumentsOrganizationList extends Component {

    state = {
        documents: null,
        rowsPerPage: 5, //limit
        count: 0,
        page: 0, //offset
    };

    componentDidMount() {
        this.getDocuments();
    }

    getDocuments = () => {
        const { organization } = this.props;
        const { page, rowsPerPage } = this.state;

        findAllDocumentsByOrganization(organization.id, page, rowsPerPage, ({ count, rows }) => {
            this.setState({ documents: rows, count })
        }, () => {
            this.setState({ documents: [] })
        });
    }

    handleChangePage = async (event, page) => {
        await this.setState({ page });
        this.getDocuments();
    };

    handleChangeRowsPerPage = async event => {
        await this.setState({ rowsPerPage: event.target.value });
        this.getDocuments();
    };

    render() {
        const { classes } = this.props;
        const { documents, rowsPerPage, page, count } = this.state;
        return (
            <div className={classes.demo}>
                <List dense>
                    {documents && documents.map(document => {
                        if (documents.length === 0) {
                            return (
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Nenhum documento registrado pela organização
                                    </Typography>
                                </Grid>
                            )
                        }
                        return (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Archive />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`Transaction: ${document.transaction}`}
                                    secondary={`Registrado dia ${format(new Date(document.createdAt), "dd/MM/yyyy HH:mm:ss")}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <GetApp />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                    <Divider />
                    <TablePagination
                        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                        component="div"
                        count={count}
                        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                    {/* <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Tooltip title="Trazer documentos anteriores">
                            <IconButton disabled={this.state.limit === 10} aria-label="less" onClick={() => this.handleChangePage((this.state.limit - 10), (this.state.offset - 10))}>
                                <ArrowLeft />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Trazer mais documentos">
                            <IconButton disable={this.state.documents && this.state.documents.length === 0} aria-label="more" onClick={() => this.handleChangePage((this.state.limit + 10), (this.state.offset + 10))}>
                                <ArrowRight />
                            </IconButton>
                        </Tooltip>
                    </Grid> */}

                </List>
            </div>
        );
    }
}

export default withStyles(styles)(DocumentsOrganizationList);
