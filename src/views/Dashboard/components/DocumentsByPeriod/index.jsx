import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

import DateFnsUtils from '@date-io/date-fns';

import { format, subDays, isValid, isAfter } from 'date-fns';

import {    MuiPickersUtilsProvider,    KeyboardDatePicker,
} from '@material-ui/pickers'

// Material helpers
import { withStyles, Popover, Grid, Typography } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Material icons
import {    ArrowDropDown as ArrowDropDownIcon,} from '@material-ui/icons';

// Shared components
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletToolbar,
    PortletContent
} from 'components';

// Chart configuration
import { options } from './chart';

// Component styles
import styles from './styles';

// Component requests
import { getDocumentsByPeriod } from './requests';

class DocumentsByPeriod extends Component {

    state = {
        calendarEl: false,
        dataInvalida: false,
        dataInicial: subDays(new Date(), 30),
        dataFinal: new Date(),
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Documentos',
                    backgroundColor: '#0767DB',
                    data: []
                },
            ]
        }
    }

    componentDidMount() {
        this.getDocuments()
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
        if (isValid(date)) {
            this.setState({ dataInicial: date })
        }
    }

    handleDataFinalChange = date => {
        if (isValid(date)) {
            this.setState({ dataFinal: date })
        }
    }

    getDocuments = () => {
        if (isAfter(this.state.dataFinal, this.state.dataInicial)) {

            this.setState({ dataInvalida: false });

            getDocumentsByPeriod(format(this.state.dataInicial, "yyyy-MM-dd'T'00:00:00"), format(this.state.dataFinal, "yyyy-MM-dd'T'23:59:59"), ({ data }) => {

                let labels = [];
                let count = [];

                for (let i = 0; i < data.resp.rows.length; i++) {
                    const element = data.resp.rows[i];
                    const label = format(new Date(element.createdAt), "dd-MM-yyyy");

                    if (labels.indexOf(label) === -1) {
                        labels.push(label);

                        var sumEl = 0;

                        data.resp.rows.forEach(element => {
                            const labelData = format(new Date(element.createdAt), "dd-MM-yyyy");

                            if (labelData === label) {
                                sumEl += 1;
                            }
                        });
                        count.push(sumEl)
                    }
                }
                this.setState({
                    data: {
                        ...this.state.data,
                        labels: labels,
                        datasets: [{
                            ...this.state.data.datasets[0],
                            data: count
                        }]
                    }
                })
            })
            this.handleCloseCalendar()
        } else {
            this.setState({ dataInvalida: true })
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
                            data={this.state.data}
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
                    <div className={classes.rootModal}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Data inicial"
                                    format="dd/MM/yyyy"
                                    value={dataInicial}
                                    onChange={this.handleDataInicialChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Data final"
                                    format="dd/MM/yyyy"
                                    value={dataFinal}
                                    onChange={this.handleDataFinalChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                {this.state.dataInvalida ? (
                                    <Typography variant="caption" color="error">
                                        Data inicial maior que a final. Verifique...
                                    </Typography>
                                ) : null}
                            </Grid>
                            <Grid container direction="row">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.getDocuments}
                                >
                                    Confirmar
                                </Button>
                            </Grid>

                        </MuiPickersUtilsProvider>
                    </div>
                </Popover>
            </Portlet>
        );
    }
}

DocumentsByPeriod.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DocumentsByPeriod);
