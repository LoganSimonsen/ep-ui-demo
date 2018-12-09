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
        value: 'Card',
        label: 'Card',
    },
    {
        value: 'Flat',
        label: 'Flat',
    },
    {
        value: 'Parcel',
        label: 'Parcel',
    },
    {
        value: 'LargeParcel',
        label: 'LargeParcel',
    },
    {
        value: 'IrregularParcel',
        label: 'IrregularParcel',
    },
    {
        value: 'FlatRateEnvelope',
        label: 'FlatRateEnvelope',
    },
    {
        value: 'SmallFlatRateEnvelope',
        label: 'SmallFlatRateEnvelope',
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
        value: 'SoftPak',
        label: 'SoftPak',
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
            weight: '',
            width: '',
            height: '',
            length: '',
            multiline: 'Controlled',
            currency: 'EUR',
            checkedB: false,
            package: ''
        };
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        if (name === "checkedB") {
            this.setState({ [name]: event.target.checked });
            this.setState({ package: '' })
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
                                id="checkboxPackage"
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
                    id="length"
                    label="Length in Inches"
                    type="number"
                    className={classes.textField}
                    value={this.state.length}
                    onChange={this.handleChange('length')}
                    margin="normal"
                />}
                {!this.state.checkedB && <TextField variant="outlined"
                    id="width"
                    label="Width in Inches"
                    className={classes.textField}
                    value={this.state.width}
                    onChange={this.handleChange('width')}
                    margin="normal"
                    type="number"
                />} <break></break>
                {!this.state.checkedB && <TextField variant="outlined"
                    id="height"
                    label="height in Inches"
                    className={classes.textField}
                    value={this.state.height}
                    onChange={this.handleChange('height')}
                    margin="normal"
                    type="number"
                />}
                <TextField variant="outlined"
                    required
                    id="weight"
                    label="Weight in Ounces"
                    className={classes.textField}
                    value={this.state.weight}
                    onChange={this.handleChange('weight')}
                    margin="normal"
                    type="number"
                />
                {this.state.checkedB && <TextField
                    id="PDP"
                    variant="outlined"
                    select
                    label="Predefined Package"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.package}
                    onChange={this.handleChange('package')}
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