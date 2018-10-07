import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
// import CheckboxLabels from './CheckboxLabels';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const packages = [
    {
        value: 'Letter',
        label: 'Letter',
    },
    {
        value: 'SmallFlatRateBox',
        label: 'SmallFlatRateBox',
    },
    {
        value: 'MediumFlatRateBox',
        label: 'MediumFlatRateBox',
    },
    {
        value: 'LargeFlatRateBox',
        label: 'LargeFlatRateBox',
    },
    {
        value: 'FlatRateEnvelope',
        label: 'FlatRateEnvelope',
    },
];

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


class Package extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            age: '',
            multiline: 'Controlled',
            currency: 'EUR',
            checkedB: false,
            weightRange: ""
        };
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        if (name === "checkedB") {
            this.setState({ [name]: event.target.checked });
            this.setState({ weightRange: "" })
        } else {
            this.setState({ [name]: event.target.value })
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedB}
                                onChange={this.handleChange("checkedB")}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="Use Predefined Package?"
                    />
                </FormGroup>
                {!this.state.checkedB && <TextField variant="outlined"
                    id="standard-length"
                    label="Length"
                    className={classes.textField}
                    value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                />}
                {!this.state.checkedB && <TextField variant="outlined"
                    id="standard-width"
                    label="Width"
                    className={classes.textField}
                    value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                />} <break></break>
                {!this.state.checkedB && <TextField variant="outlined"
                    id="standard-height"
                    label="height"
                    className={classes.textField}
                    value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                />}
                <TextField variant="outlined"
                    required
                    id="standard-weight"
                    label="Weight"
                    className={classes.textField}
                    value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                />
                {this.state.checkedB && <TextField
                    variant="outlined"
                    select
                    label="Predefined Packages"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.weightRange}
                    onChange={this.handleChange('weightRange')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                >
                    {packages.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>}
            </form>
        );
    }
}

Package.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Package);