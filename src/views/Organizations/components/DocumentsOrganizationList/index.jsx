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
    Tooltip,
    Divider,
    Typography,
} from '@material-ui/core';

// Component styles
import styles from './styles';

//Functions
import { findAllDocumentsByOrganization } from './requests';
import { ArrowRight, GetApp, Archive, ArrowLeft } from '@material-ui/icons';
import { format } from 'date-fns/esm';

class DocumentsOrganizationList extends Component {

    state = {
        documents: null,
        offset: 0,
        limit: 10
    };

    componentDidMount() {
        const { organization } = this.props;
        const { offset, limit } = this.state;

        this.getDocuments(organization.id, offset, limit);
    }

    getDocuments = (organizationId, offset, limit) => {
        findAllDocumentsByOrganization(organizationId, offset, limit, documents => {
            this.setState({ documents })
        }, () => {
            this.setState({ documents: [] })
        });
    }

    handleChangePage = (limit, offset) => {
        this.setState({ limit, offset })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.offset !== prevState.offset || this.state.limit !== prevState.limit) {
            const { organization } = this.props;
            const { offset, limit } = this.state;

            this.getDocuments(organization.id, offset, limit);
        }
    }

    render() {
        const { classes } = this.props;
        const { documents } = this.state;
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
                    <Grid
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
                    </Grid>

                </List>
            </div>
        );
    }
}

export default withStyles(styles)(DocumentsOrganizationList);
