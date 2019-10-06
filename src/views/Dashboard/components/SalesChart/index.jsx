import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

import DateFnsUtils from '@date-io/date-fns';

import { format, subDays } from 'date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'

// Material helpers
import { withStyles, Popover, Grid } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Material icons
import {
    ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';

// Shared components
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletToolbar,
    PortletContent
} from 'components';

// Chart configuration
import { data, options } from './chart';

// Component styles
import styles from './styles';

class SalesChart extends Component {

    state = {
        calendarEl: false,
        dataInicial: subDays(new Date(), 7),
        dataFinal: new Date()
    }


    handleShowCalendar = event => {
        this.setState({
            calendarEl: event.currentTarget
        });
    };
    handleCloseCalendar = () => {
        this.setState({
            calendarEl: null
        });
    };

    handleDataInicialChange = date => {
        this.setState({ dataInicial: date })
        this.getDocuments()
    }

    handleDataFinalChange = date => {
        this.setState({ dataFinal: date })
        this.getDocuments()
    }

    getDocuments = () => {
        if(this.state.dataInicial < this.state.dataFinal) {
            console.log('teste')
            this.handleCloseCalendar()
        }
    }

    render() {
        const { classes, className, ...rest } = this.props;
        const { calendarEl, dataInicial, dataFinal } = this.state;

        const rootClassName = classNames(classes.root, className);

        const showCalendar = Boolean(calendarEl);;

        return (
            <Portlet
                {...rest}
                className={rootClassName}
            >
                <PortletHeader noDivider>
                    <PortletLabel title={`Registros por período: ${format(this.state.dataInicial, "dd/MM/yyyy")} - ${format(this.state.dataFinal, "dd/MM/yyyy")}`} />
                    <PortletToolbar>
                        <Button
                            className={classes.dropdownButton}
                            size="small"
                            variant="text"
                            onClick={this.handleShowCalendar}
                        >
                            Período <ArrowDropDownIcon />
                        </Button>
                    </PortletToolbar>
                </PortletHeader>
                <PortletContent>
                    <div className={classes.chartWrapper}>
                        <Bar
                            data={data}
                            options={options}
                        />
                    </div>
                </PortletContent>
                <Popover
                    open={showCalendar}
                    anchorEl={calendarEl}
                    onClose={this.handleCloseCalendar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around" className={classes.rootModal}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Data inicial"
                                value={dataInicial}
                                onChange={this.handleDataInicialChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Data final"
                                value={dataFinal}
                                onChange={this.handleDataFinalChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Popover>
            </Portlet>
        );
    }
}

SalesChart.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SalesChart);
