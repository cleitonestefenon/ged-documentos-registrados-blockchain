import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography, LinearProgress } from '@material-ui/core';

// Material icons
import { PeopleOutline as PeopleIcon } from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';
import { countNumberOfFriends } from './requests';

class Friend extends Component {

    state = {
        friendsMatched: 0,
        friendsWaiting: 0,
        total: 0
    }

    componentDidMount() {
        countNumberOfFriends(resp => {
            this.setState({
                friendsMatched: resp.data.friendsMatched,
                friendsWaiting: resp.data.friendsWaiting,
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
                            variant="body1"
                        >
                            Organizações pareadas
                        </Typography>
                        <Typography
                            className={classes.caption}
                            variant="caption"
                        >
                            {this.state.total} convite(s) enviado(s) e {this.state.friendsMatched} aceito(s)
                        </Typography>
                    </div>
                    <div className={classes.iconWrapper}>
                        <PeopleIcon className={classes.icon} />
                    </div>
                </div>
                <div className={classes.footer}>
                    <Typography
                        variant="h4"
                    >
                        {this.state.total > 0 ? (this.state.friendsMatched / this.state.total).toFixed(2) : 0}%
                    </Typography>
                    <LinearProgress
                        value={75.5}
                        variant="determinate"
                    />
                </div>
            </Paper>
        );
    }
}

Friend.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Friend);
