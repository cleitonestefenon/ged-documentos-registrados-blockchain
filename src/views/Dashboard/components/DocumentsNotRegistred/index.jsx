import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import {
    ArrowDownward as ArrowDownwardIcon,
    Money as MoneyIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';
import { countNumberOfDocumentsNotRegistred } from './requests';

class DocumentsNotRegistred extends Component {

    state = {
        documentsCount: 0
    }

    componentDidMount() {
        countNumberOfDocumentsNotRegistred(resp => {
            this.setState({ documentsCount: resp.data.documentsCount })
        }, err => {
            console.error(err)
        });
    }

    render() {
        const { classes, className, ...rest } = this.props;

        const rootClassName = classNames(classes.root, className);

        return (
            <Paper
                {...rest}
                className={rootClassName}
            >
                <div className={classes.content}>
                    <div className={classes.details}>
                        <Typography
                            className={classes.title}
                            variant="body2"
                        >
                            Documentos não registrados
                        </Typography>
                        <Typography
                            align="center"
                            className={classes.value}
                            variant="h3"
                        >
                            {this.state.documentsCount || '0'}
                        </Typography>
                    </div>
                    <div className={classes.iconWrapper}>
                        <MoneyIcon className={classes.icon} />
                    </div>
                </div>
                <div className={classes.footer}>
                    <Typography
                        className={classes.difference}
                        variant="body2"
                    >
                        <ArrowDownwardIcon />
                        12%
          </Typography>
                    <Typography
                        className={classes.caption}
                        variant="caption"
                    >
                        Since last month
          </Typography>
                </div>
            </Paper>
        );
    }
}

DocumentsNotRegistred.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DocumentsNotRegistred);
