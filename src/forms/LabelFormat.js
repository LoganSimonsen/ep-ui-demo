import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class LabelFormat extends React.Component {
    state = {
        LabelFormat: '',
        open: false,
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;

        return (
            < form autoComplete="off" >
                {/* <Button className={classes.button} onClick={this.handleOpen}>

                </Button> */}
                < FormControl className={classes.formControl} >
                    <InputLabel htmlFor="demo-controlled-open-select">Label Format</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.LabelFormat}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'LabelFormat',
                            id: 'labelFormatValue',
                        }}
                    // id='LabelFormatValue'
                    >
                        <MenuItem value="">
                            <em>Carrier Default</em>
                        </MenuItem>
                        <MenuItem value={'PNG'}>PNG</MenuItem>
                        <MenuItem value={'PDF'}>PDF</MenuItem>
                        <MenuItem value={'ZPL'}>ZPL</MenuItem>
                    </Select>
                </FormControl >
            </form >
        );
    }
}

LabelFormat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelFormat);