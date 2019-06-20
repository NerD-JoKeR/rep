import React, { Fragment } from 'react';
import { Grid, IconButton, TextField, Button, Select, MenuItem, FormControl, FormControlLabel, InputLabel, Switch, Paper } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ReactSelect from 'react-select';
import {
    getCountries,
    getCalculatedTravelInsurancePremium,
    getInsuredSumList,
    getMaxNumberOfDaysAbroadList,
    getTravelDurationList
} from '../../services';
import { thisTypeAnnotation } from '@babel/types';

export class Calculator extends React.Component {

    maxSelectCountry = 3;

    constructor(props) {
        super(props);

        this.state = {
            data: {
                country1: '',
                country2: '',
                country3: '',
                sumStrah: '',
                insuranceProgramm: 1,
                beginDate: null,
                endDate: null,
                birthDate: null,
                rprogSrok: '',
                rprogMaxDays: '',
                email: ''
            },
            insurancePremium: '',
            selectedCountries: [''],
            showCountrySelectCount: 1,
            isMultiVisit: false,
            insuredSumList: [],
            travelDurationList: [],
            abroadDaysList: [],
            countries: []
        }
    }

    componentDidMount() {
        this.getFilters();
    }

    async getFilters() {
        const insuredSumList = await getInsuredSumList();
        const travelDurationList = await  getTravelDurationList();
        const abroadDaysList = await getMaxNumberOfDaysAbroadList();
        const sessionId = sessionStorage.getItem('sessionId');
        const rawCountries = await getCountries(sessionId);
        const countries = rawCountries ? rawCountries.map((c) => ({ value: c.code, label: c.name})) : [];
        this.setState({
            countries,          
            insuredSumList,
            travelDurationList,
            abroadDaysList
        })
    }

    onDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    }

    onFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    onDataChangeByName = (name) => (value) => {
        this.onDataChange({ target: { name, value } });
    }

    onBirthDateChange = this.onDataChangeByName('birthDate');
    onBeginDateChange = this.onDataChangeByName('beginDate');
    onEndDateChange = this.onDataChangeByName('endDate');

    getParsedDataToBackend = (data) => {
        const { selectedCountries } = this.state;
        let { beginDate, endDate, birthDate, country1, country2, country3, ...rest } = data;
        beginDate = beginDate.format('DD.MM.YYYY');
        endDate = endDate.format('DD.MM.YYYY');
        birthDate = birthDate.format('DD.MM.YYYY');
        country1 = (selectedCountries.length >= 1 && selectedCountries[0].value) || '';
        country2 = (selectedCountries.length >= 2 && selectedCountries[1].value) || '';
        country3 = (selectedCountries.length >= 3 && selectedCountries[2].value) || '';
        return { ...rest, beginDate, endDate, birthDate, country1, country2, country3 };
    }

    calculate = async () => {
        const sessionId = sessionStorage.getItem('sessionId');
        const data = this.getParsedDataToBackend(this.state.data);
        const insurancePremium = await getCalculatedTravelInsurancePremium(sessionId, data);
        this.setState({ insurancePremium });
    }

    onAddCountry = () => {
        const { selectedCountries } = this.state;
        if (selectedCountries.length < this.maxSelectCountry) {
            this.setState({
                selectedCountries: [ ...selectedCountries, '']
            })
        }
    }

    onDeleteCountry = (index) => {
        const selectedCountries = [ ...this.state.selectedCountries ];
        if (selectedCountries.length > 1) {
            selectedCountries.splice(index, 1);
            this.setState({ selectedCountries });
        }
    }

    onSelectCountry = (index, country) => {
        const selectedCountries = [ ...this.state.selectedCountries ];
        selectedCountries[index] = { ...country };
        this.setState({ selectedCountries });
    }

    onMultiVisitChange = (event) => {
        this.setState({ isMultiVisit: !this.state.isMultiVisit })
    }

    onFinish = async () => {
        this.props.onFinish(this.state);
    }

    render(){
        const { 
            data: {
                sumStrah, 
                insuranceProgramm, 
                beginDate, 
                endDate, 
                birthDate, 
                rprogSrok, 
                rprogMaxDays, 
                email
            },
            selectedCountries,
            abroadDaysList,
            insuredSumList,
            travelDurationList,
            insurancePremium,
            isMultiVisit,
            countries
        } = this.state;

        return (
            <Paper className="calculator-page">
                <h2 className="page-title">Рассчитать страховую премию</h2>

                <Grid container justify="space-around" spacing={ 2 }>
                    
                    <Grid item xs={ 12 }>
                        <Grid container spacing={ 2 }>
                            <Grid item sm={ 7 } xs={ 12 }>
                                <Grid container spacing={ 2 }>
                                    { selectedCountries && selectedCountries.map((c, index) => (
                                        <Grid item key={ index } xs={ 12 }>
                                            <ReactSelect
                                                className="react-select"
                                                value={ c }
                                                options={ countries }
                                                placeholder="Выберите страну"
                                                onChange={ (v) => this.onSelectCountry(index, v) }
                                            />
                                            { selectedCountries.length > 1 && (
                                                <IconButton
                                                    onMouseDown={ () => this.onDeleteCountry(index) }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            ) }
                                        </Grid>                                            
                                    )) }
                                </Grid>
                            </Grid>
                            <Grid item sm={ 5 } xs={ 12 }>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onMouseDown={ this.onAddCountry }
                                    disabled={ selectedCountries.length === this.maxSelectCountry }
                                >
                                    <AddIcon />
                                    Добавить страну
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <FormControlLabel
                            control={
                                <Switch
                                    value={ isMultiVisit }
                                    onChange={ this.onMultiVisitChange }
                                />
                            }
                            label="Многократная страховка"
                        />
                    </Grid>

                    { isMultiVisit && <Fragment>   
                        <Grid item xs={ 12 } md={ 6 }>
                            <FormControl className="form-control">
                                <label htmlFor="travel-duration" className="form-label">Продолжительность путешествия</label>
                                <Select
                                    onChange={ this.onDataChange }
                                    value={ rprogSrok }
                                    inputProps={{
                                        name: 'rprogSrok',
                                        id: 'travel-duration'
                                    }}
                                >
                                    { travelDurationList && travelDurationList.map((item) => 
                                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>) }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={ 12 } md={ 6 }>
                            <FormControl className="form-control">
                                <label htmlFor="abroad-days" className="form-label">Максимально кол-во дней за границей</label>
                                <Select
                                    onChange={ this.onDataChange }
                                    value={ rprogMaxDays }
                                    inputProps={{
                                        name: 'rprogMaxDays',
                                        id: 'abroad-days'
                                    }}
                                >
                                    { abroadDaysList && abroadDaysList.map((item) => 
                                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>) }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Fragment> }                    

                    <Grid item xs={ 12 } md={ 6 }>
                        <KeyboardDatePicker
                            disablePast
                            format="DD.MM.YYYY"
                            label="Когда уезжаете?"
                            value={ beginDate }
                            onChange={ this.onBeginDateChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <KeyboardDatePicker
                            disablePast
                            minDate={ beginDate }
                            format="DD.MM.YYYY"
                            label="Когда возвращаетесь?"
                            value={ endDate }
                            onChange={ this.onEndDateChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <FormControl className="form-control">
                            <InputLabel htmlFor="insured-sum">Страховая сумма</InputLabel>
                            <Select
                                onChange={ this.onDataChange }
                                value={ sumStrah }
                                inputProps={{
                                    name: 'sumStrah',
                                    id: 'insured-sum'
                                }}
                            >
                                { insuredSumList && insuredSumList.map((item) => 
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>) }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <KeyboardDatePicker
                            disableFuture
                            openTo="year"
                            format="DD.MM.YYYY"
                            views={["year", "month", "date"]}
                            label="Дата рождения"
                            value={ birthDate }
                            onChange={ this.onBirthDateChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Grid container spacing={ 2 } alignItems="center">
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={ this.calculate }>Рассчитать</Button>
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Страховая премия"
                                    value={ insurancePremium }
                                    InputProps={ { readOnly: true } }
                                />
                            </Grid>
                        </Grid>                
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Button variant="contained" color="primary" onClick={ this.onFinish }>Оформить сейчас</Button>
                    </Grid>            
                    
                </Grid>
                
            </Paper>
        );
    }

}

