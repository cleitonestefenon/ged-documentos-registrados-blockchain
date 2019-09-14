import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

// Shared helpers
import { getInitials } from 'helpers';

// Component styles
import styles from './styles';
import { Portlet, PortletContent } from 'components';
import { findAllOrganizations } from '../requests';
import { async } from 'q';

class OrganizationTable extends Component {
  state = {
    selectedOrganizations: [],
    organizations: [],
    rowsPerPage: 10, //limit
    page: 0 //offset
  };

  componentDidMount() {
    this.searchOrganizations();
  }

  searchOrganizations = async () => {
    const { page, rowsPerPage } = this.state;
    await findAllOrganizations(page, rowsPerPage, resp => {
      this.setState({
        organizations: resp
      })
    }, err => {

    })
  }

  handleSelectAll = event => {
    const { users, onSelect, user } = this.props;

    let selectedOrganizations;

    if (event.target.checked) {
      selectedOrganizations = users.map(friend => user.id);
    } else {
      selectedOrganizations = [];
    }

    this.setState({ selectedOrganizations });

    onSelect(selectedOrganizations);
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedOrganizations } = this.state;

    const selectedIndex = selectedOrganizations.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedOrganizations, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedOrganizations.slice(1));
    } else if (selectedIndex === selectedOrganizations.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedOrganizations.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedOrganizations.slice(0, selectedIndex),
        selectedOrganizations.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedOrganizations: newSelectedUsers });

    onSelect(newSelectedUsers);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, friend, users } = this.props;
    const { activeTab, organizations, rowsPerPage, page, searchOrganization } = this.state;
    
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                      checked={false}
                      color="primary"
                      indeterminate={false}
                      onChange={() => {}}
                    />
                    Nome
                  </TableCell>
                  <TableCell align="left">E-mail</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Chave Pública</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organizations
                  .map(friend => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={friend.id}
                      selected={organizations.indexOf(friend.id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Checkbox
                            checked={organizations.indexOf(friend.id) !== -1}
                            color="primary"
                            onChange={event =>
                              this.handleSelectOne(event, friend.id)
                            }
                            value="true"
                          />
                          <Avatar
                            className={classes.avatar}
                            src={friend.avatarUrl}
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
                        {friend.match ? 'Aceitou' : 'Aguardando'}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {friend.publickey}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(friend.email).format('DD/MM/YYYY')}
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
            //count={friend.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
          {/* <button onClick={() => organizations.map(friend => {console.log(friend.Invited.name)})}>trazer</button> */}
        </PortletContent>
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
