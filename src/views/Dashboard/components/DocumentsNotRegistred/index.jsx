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
    Add as AddIcon,
    Description as FileIcon,
} from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';
import { countNumberOfDocumentsNotRegistred } from './requests';

class DocumentsNotRegistred extends Component {

    state = {
        documentsCount: 0,
        sinceLastMonth: 0
    }

    componentDidMount() {
        countNumberOfDocumentsNotRegistred(resp => {
            this.setState({
                documentsCount: resp.data.documentsCount,
                sinceLastMonth: resp.data.sinceLastMonth
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
                            variant="body1"
                        >
                            Documentos a registrar
                        </Typography>
                        <Typography
                            align="center"
                            className={classes.value}
                            variant="h3"
                        >
                            {this.state.documentsCount}
                        </Typography>
                    </div>
                    <div className={classes.iconWrapper}>
                        <FileIcon className={classes.icon} />
                    </div>
                </div>
                <div className={classes.footer}>
                    {this.state.sinceLastMonth > 0 ? (
                        <React.Fragment>
                            <Typography
                                className={classes.difference}
                                variant="body2"
                            >
                                <AddIcon />
                                {this.state.sinceLastMonth}
                            </Typography>
                            <Typography className={classes.caption} variant="caption">nos últimos 30 dias</Typography>
                        </React.Fragment>
                    ) : (
                            <Typography className={classes.caption} variant="caption">Nenhum documento na fila de registro</Typography>
                        )}
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
