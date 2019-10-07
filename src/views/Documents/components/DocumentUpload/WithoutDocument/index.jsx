import React, { Component } from 'react';

// Componentes
import { Paper, Typography, withStyles, ButtonBase } from '@material-ui/core';

// Component styles
import styles from './styles';

class WithoutDocument extends Component {

    renderDragMessage = () => {
        const { classes } = this.props;

        return (
            <ButtonBase className={classes.contentItem}>
                <img src='/images/cadastros/upload-de-arquivo.svg' alt="upload files" className={classes.image} />
                <Typography gutterBottom variant="subtitle1" >
                    {!this.props.isDragActive ? "Clique aqui ou arraste um arquivo de até 5MB para carregá-lo" : "Solte o arquivo para carregá-lo"}
                </Typography>
            </ButtonBase>
        )
    }

    render() {

        const { classes, getRootProps, isDragActive, getInputProps } = this.props;

        return (
            <div
                className={classes.root}
                {...getRootProps()}
                isDragActive={isDragActive}
            >
                <input {...getInputProps()} />
                <Paper className={classes.paper}>
                    {this.renderDragMessage()}
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(WithoutDocument);
