import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material components
import {
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    Chip,
    withStyles,
    IconButton,
    Dialog,
    Grid,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Menu,
    MenuItem,
    ListItemText,
} from '@material-ui/core';

// Shared helpers
import { getInitials } from 'helpers';

// Component styles
import styles from './styles';
import { Portlet, PortletContent } from 'components';
import { Done, Timer, MoreVert, Close as CloseIcon } from '@material-ui/icons';
import avatarDefault from './images/avatar_default.png';

//Functions
import { mountDataImage } from 'common/functions';
import { DocumentsOrganizationList } from '../index.jsx';

class OrganizationTable extends Component {

    state = {
        anchorEl: null,
        rowSelected: null,
        detailsOpen: false,
        avatar: null
    };

    componentDidMount() {
        const { page, rowsPerPage } = this.props;

        this.props.searchOrganizations(page, rowsPerPage);
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

    montarAvatar = oidPhoto => {
        mountDataImage(oidPhoto)
            .then(avatar => {
                this.setState({ avatar })
            })
    }

    handleOpenDetailOrganization = () => {

        this.montarAvatar(this.state.rowSelected.oidphoto);

        this.setState({
            detailsOpen: true,
            avatar: avatarDefault
        })
    }

    handleCloseDetailOrganization = () => {
        this.setState({ detailsOpen: false })
        this.handleCloseDetails();
    }

    render() {
        const { classes, className, organizations, handleChangePage, page, handleChangeRowsPerPage, rowsPerPage } = this.props;
        const { anchorEl, detailsOpen, rowSelected, avatar } = this.state;

        const rootClassName = classNames(classes.root, className);

        return (
            <Portlet className={rootClassName}>
                <PortletContent noPadding>
                    <PerfectScrollbar>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Nome</TableCell>
                                    <TableCell align="left">E-mail</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {organizations
                                    .map(friend => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={friend.id}
                                        >
                                            <TableCell className={classes.tableCell}>
                                                <div className={classes.tableCellInner}>
                                                    <Avatar
                                                        className={classes.avatar}
                                                    >
                                                        {getInitials(friend.name)}
                                                    </Avatar>
                                                    <Link to="#">
                                                        <Typography
                                                            className={classes.nameText}
                                                            variant="body1"
                                                        >
                                                            {friend.name}
                                                        </Typography>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>
                                                {friend.email}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>
                                                {friend.match ?
                                                    <Chip label="Pareado" color="primary" size="small" icon={<Done />} />
                                                    :
                                                    <Chip label="Aguardando" color="secondary" size="small" icon={<Timer />} />
                                                }
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className={classes.tableCell}
                                            >
                                                <IconButton size="medium">
                                                    <MoreVert onClick={event => this.handleDetailsClick(event, friend)} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </PerfectScrollbar>
                    <TablePagination
                        backIconButtonProps={{
                            'aria-label': 'Previous Page'
                        }}
                        component="div"
                        count={organizations.length}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page'
                        }}
                        onChangePage={e => handleChangePage(e)}
                        onChangeRowsPerPage={e => handleChangeRowsPerPage(e)}
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
                                onClick={this.handleOpenDetailOrganization}
                            />
                        </MenuItem>
                    </Menu>
                </PortletContent>
                <Dialog
                    fullScreen={false}
                    fullWidth={true}
                    scroll="body"
                    open={detailsOpen}
                    onClose={this.handleCloseDetailOrganization}
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
                                onClick={this.handleCloseDetailOrganization}
                            />
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {rowSelected && rowSelected ? (
                                <React.Fragment>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Avatar
                                            alt="Avatar"
                                            src={avatar}
                                            className={classes.bigAvatar}
                                        />
                                        <Typography variant="body1" color="textSecondary" component="p">
                                            {rowSelected.name}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" component="p">
                                            {rowSelected.email}
                                        </Typography>
                                    </Grid>
                                    <DocumentsOrganizationList
                                        organization={rowSelected}
                                    />
                                </React.Fragment>
                            ) : (
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Nenhuma organização selecionada
                                        </Typography>
                                    </Grid>
                                )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDetailOrganization} color="primary">
                            Retornar à listagem
          				</Button>
                    </DialogActions>
                </Dialog>
            </Portlet>
        );
    }
}

OrganizationTable.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    users: PropTypes.array.isRequired
};

OrganizationTable.defaultProps = {
    users: [],
    onSelect: () => { },
    onShowDetails: () => { }
};



export default withStyles(styles)(OrganizationTable);
