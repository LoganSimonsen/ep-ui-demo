import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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

class LabelSize extends React.Component {
    state = {
        labelSize: '',
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
                    <InputLabel htmlFor="demo-controlled-open-select">Label Size</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.labelSize}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'labelSize',
                            id: 'labelSizeValue',
                        }}
                    // id='labelSizeValue'
                    >
                        <MenuItem value="" placeholder='Carrier Default'>
                            <em>Carrier Default</em>
                        </MenuItem>
                        <MenuItem value={'4x6'}>4x6</MenuItem>
                        <MenuItem value={'8.5x11'}>8.5x11</MenuItem>
                    </Select>
                </FormControl >
            </form >
        );
    }
}

LabelSize.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelSize);