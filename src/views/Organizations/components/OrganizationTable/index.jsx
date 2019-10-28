import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core';

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
  Chip
} from '@material-ui/core';

// Shared helpers
import { getInitials } from 'helpers';

// Component styles
import styles from './styles';
import { Portlet, PortletContent } from 'components';
import { Done, Timer } from '@material-ui/icons';

class OrganizationTable extends Component {

  componentDidMount() {
    const { page, rowsPerPage } = this.props;

    this.props.searchOrganizations(page, rowsPerPage);
  }

  render() {
    const { classes, className, organizations, handleChangePage, page, handleChangeRowsPerPage, rowsPerPage } = this.props;

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
                        {friend.match ?
                          <Chip label="Aceitou" color="primary" size="small" icon={<Done />} />
                          :
                          <Chip label="Aguardando" color="secondary" size="small" icon={<Timer />} />
                        }
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {friend.publickey}
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
