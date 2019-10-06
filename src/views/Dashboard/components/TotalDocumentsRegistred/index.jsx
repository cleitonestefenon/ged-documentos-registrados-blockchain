import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import { Attachment } from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

import { countNumberTotalOfDocuments } from './requests';

class TotalDocumentsRegistred extends Component {

    state = {
        total: 0
    }

    componentDidMount() {
        countNumberTotalOfDocuments(resp => {
            this.setState({
                total: resp.data.total
            })
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
                            NÚMERO TOTAL DE DOCUMENTOS
                        </Typography>
                        <Typography
                            className={classes.value}
                            variant="h1"
                        >
                            {this.state.total}
                        </Typography>
                    </div>
                    <div className={classes.iconWrapper}>
                        <Attachment className={classes.icon} />
                    </div>
                </div>
            </Paper>
        );
    }
}

TotalDocumentsRegistred.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TotalDocumentsRegistred);
