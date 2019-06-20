import React, { Fragment } from 'react';
import { Grid, Radio, RadioGroup, Checkbox, IconButton, TextField, Button, Select, MenuItem, FormControl, FormLabel, FormControlLabel, InputLabel, Switch, List, ListItem, ListItemText, ListItemSecondaryAction, Paper } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
// import ReactSelect from 'react-select';
import {
    registrateTravelInsurance
} from '../../services';

export class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientType: '1',
            isValid: false,
            isNotResident: false,
            files: [],
            data: {
                country1: this.props.data.selectedCountries[0].value,
                country2: this.props.data.selectedCountries[1] ? this.props.data.selectedCountries[1].value : '',  
                country3: this.props.data.selectedCountries[2] ? this.props.data.selectedCountries[2].value : '', 
                rprogramm: this.props.data.data.insuranceProgramm,  
                rprogSrok: this.props.data.data.rprogSrok, 
                progMaxDays: this.props.data.data.rprogMaxDays, 
                dateStart: this.props.data.data.beginDate, 
                dateEnd: this.props.data.data.endDate, 
                curRate: this.props.data.data.sumStrah, 
                fioKir: '', 
                fioLat: '', 
                iin: '', 
                resId: 1, 
                address: '', 
                sex: '', 
                dateBirth: this.props.data.data.birthDate, 
                region: 15188446, 
                fioKir2: '', 
                fioLat2: '', 
                iin2: '', 
                resId2: 1, 
                address2: '', 
                sex2: '', 
                dateBirth2: this.props.data.data.birthDate, 
                region2: 15188446, 
                passportNum: '', 
                passportGive: '', 
                passportDate: null, 
                passportDateEnd: null, 
                doc_type: 13310362, 
                passportNum2: '', 
                passportGive2: '', 
                passportDate2: null, 
                passportDateEnd2: null, 
                mobilePhone: '', 
                phone: '', 
                email: '', 
                mobilePhone2: '',
                phone2: '', 
                email2: '',
                appendix_name: "mst",
                registrationMessage: '',
                signed: '',
                appendix: '',
                axiosToken: ''
            },
            agreement: false,
            agreement2: false
        }
    }

    validate = () => {
        const {
            agreement,
            agreement2,
            name,
            surname
        } = this.state;

        const isValid = agreement && agreement2 && name && surname;
        this.setState({ isValid });
        return isValid;
    }

    onSelectFiles = (files) => {
        this.setState({ files });
    }

    onFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
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

    onCheckedChangeByName = (name) => (event) => {
        this.setState({
            [name]: event.target.checked
        });
    }

    onDataChangeByName = (name) => (value) => {
        this.onDataChange({ target: { name, value } });
    }

    onPassportDateChange = this.onDataChangeByName('passportDate');
    onPassportDateEndChange = this.onDataChangeByName('passportDateEnd');

    getParsedDataToBackend = (data) => {
        let { country1, country2, country3, rprogSrok, email, rprogramm, progMaxDays, dateStart, dateEnd, curRate, fioKir, fioLat, iin,
            resId, address, sex, dateBirth, region, fioKir2, fioLat2, iin2, resId2, address2, sex2, dateBirth2, region2, passportNum,
            passportGive, passportDate, passportDateEnd, doc_type, passportNum2, passportGive2, passportDate2, passportDateEnd2, mobilePhone,
            phone, mobilePhone2, phone2, email2, name, surname, ...rest } = data;


            passportDate = passportDate.format('DD.MM.YYYY');
            passportDateEnd = passportDateEnd.format('DD.MM.YYYY');
            dateBirth = dateBirth.format('DD.MM.YYYY');
            dateBirth2 = dateBirth2.format('DD.MM.YYYY');
            dateStart = dateStart.format('DD.MM.YYYY');
            dateEnd = dateEnd.format('DD.MM.YYYY');
            name = this.state.name;
            surname = this.state.surname;
            
            
        return { ...rest, country1, country2, country3, rprogSrok, email, rprogramm, progMaxDays, dateStart, dateEnd, curRate, fioKir, fioLat, iin,
            resId, address, sex, dateBirth, region, fioKir2, fioLat2, iin2, resId2, address2, sex2, dateBirth2, region2, passportNum,
            passportGive, passportDate, passportDateEnd, doc_type, passportNum2, passportGive2, passportDate2, passportDateEnd2, mobilePhone,
            phone, mobilePhone2, phone2, email2, name, surname };
    }

    sendRequest = async () => {
        const sessionId = sessionStorage.getItem('sessionId');
        const data = this.getParsedDataToBackend(this.state.data);
        const registrationMessage1 = await registrateTravelInsurance(sessionId, data);
        this.state.data.registrationMessage = registrationMessage1;
        // this.setState({ registrationMessage:  registrationMessage1});
        console.log("reg res : " + this.state.data.registrationMessage );
    }

    onFinish = async () => {
        await axios.post('https://pay.ffin.life/auth_token', {
            'iin': this.state.data.iin,
        }).then( async (response) => {
            let axiosToken = response.data.token;
            this.setState({
                axiosToken
            });
            
            await this.sendRequest();
            console.log("doc _ id " + this.state.data.registrationMessage);
            await axios.post('https://pay.ffin.life/form-data', {
            'iin': this.state.data.iin,
            'appendix_name': this.state.data.appendix_name,
            'amount': this.props.data.insurancePremium,
            'doc_id': this.state.data.registrationMessage,
            'token': axiosToken
        }).then( (response) => {
            let appendix = response.data.appendix;
            let signed = response.data.signed_order;
            this.setState({
                appendix,
                signed
            }, async () => {
                this.props.onFinish(this.state);
            });
            
        });
            
        });
        
    }

    render() {
        const {
            clientType,
            isValid,
            name,
            surname,
            isNotResident,
            agreement,
            agreement2,
            data: {
                iin,
                address,
                sex,
                resId,
                passportNum,
                passportDate,
                passportDateEnd,
                passportGive,
                mobilePhone,
                email
            }
        } = this.state;

        const {
            insurancePremium
        } = this.props;

        console.log('state', this.state);

        return (
            <Paper className="registration-page">
                <h2 className="page-title">Офомление полиса</h2>
                <Grid container justify="space-around" spacing={ 2 }>
                    <Grid item xs={ 12 }>
                        <FormControl className="radiogroup">
                            <FormLabel>Выберите тип лица:</FormLabel>
                            <RadioGroup
                                row={ true }
                                value={ clientType }
                                name="clientType"
                                onChange={ this.onDataChange }
                            >
                                <FormControlLabel
                                    value="1"
                                    control={<Radio  color="primary" />}
                                    label="Физическое лицо"
                                />
                                <FormControlLabel
                                    disabled
                                    value="2"
                                    control={<Radio color="primary" />}
                                    label="Юридическое лицо"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <TextField
                            InputProps={ { name: 'surname' } }
                            label="Фамилия на латинице"
                            value={ surname }
                            onChange={ this.onFieldChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <TextField
                            InputProps={ { name: 'name' } }
                            label="Имя на латинице"
                            value={ name }
                            onChange={ this.onFieldChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 }>
                        <FormControl className="radiogroup">
                            <FormLabel>Пол:</FormLabel>
                            <RadioGroup
                                row={ true }
                                value={ sex }
                                name="sex"
                                onChange={ this.onDataChange }
                            >
                                <FormControlLabel
                                    control={<Radio value="1" color="primary" />}
                                    label="Муж"
                                />
                                <FormControlLabel
                                    control={<Radio value="2" color="primary" />}
                                    label="Жен"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <TextField
                            InputProps={ { name: 'iin' } }
                            label="ИИН"
                            value={ iin }
                            onChange={ this.onDataChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <TextField
                            InputProps={ { name: 'address' } }
                            label="Адрес проживание"
                            value={ address }
                            onChange={ this.onDataChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 }>
                        <FormControlLabel
                            control={<Checkbox checked={ isNotResident } onChange={ this.onCheckedChangeByName('isNotResident') } />}
                            label="Не являюсь резидентом РК"
                        />
                        { isNotResident && <FormControl className="form-control">
                            <InputLabel htmlFor="resident">Страна резидентсва</InputLabel>
                            <Select
                                onChange={ this.onDataChange }
                                value={ resId }
                                inputProps={{
                                    name: 'resId',
                                    id: 'resident'
                                }}
                            >
                                <MenuItem value="USA"> США</MenuItem>
                                <MenuItem value="ENG"> Англия</MenuItem>
                                <MenuItem value="GER"> Германия</MenuItem>
                                <MenuItem value="RU"> Россия</MenuItem>
                            </Select>
                        </FormControl> }
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <TextField
                            InputProps={ { name: 'passportNum' } }
                            label="Номер Паспорта"
                            value={ passportNum }
                            onChange={ this.onDataChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <FormControl className="form-control">
                            <InputLabel htmlFor="passport-give">Кем выдан?</InputLabel>
                            <Select
                                onChange={ this.onDataChange }
                                value={ passportGive }
                                inputProps={{
                                    name: 'passportGive',
                                    id: 'passport-give'
                                }}
                            >
                                <MenuItem value="MU"> МЮ РК</MenuItem>
                                <MenuItem value="MVD"> МВД РК</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <KeyboardDatePicker
                            disableFuture
                            openTo="year"
                            format="DD.MM.YYYY"
                            views={["year", "month", "date"]}
                            label="Дата выдачи"
                            value={ passportDate }
                            onChange={ this.onDataChangeByName('passportDate') }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <KeyboardDatePicker
                            disablePast
                            openTo="year"
                            format="DD.MM.YYYY"
                            views={["year", "month", "date"]}
                            label="Дата окончания"
                            value={ passportDateEnd }
                            onChange={ this.onDataChangeByName('passportDateEnd') }
                        />
                    </Grid>

                    {/* <Grid item xs={ 12 }>
                        <DropzoneArea
                            dropZoneClass="dropzone"
                            acceptedFiles={['image/jpeg', 'image/png', 'application/pdf']}
                            dropzoneText="+ Прикрепить скан или фото документа"
                            onChange={ this.onSelectFiles }
                            maxFileSize={5000000}
                        />
                    </Grid> */}

                    <Grid item xs={ 12 } md={ 6 }>
                        <TextField
                            InputProps={ { name: 'mobilePhone' } }
                            label="Ваш телефон"
                            value={ mobilePhone }
                            onChange={ this.onDataChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <TextField
                            InputProps={ { name: 'email' } }
                            label="E-mail"
                            value={ email }
                            onChange={ this.onDataChange }
                        />
                    </Grid>

                    <Grid item >
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Страховая премия, тенге"
                            value={ this.props.data.insurancePremium }
                            InputProps={ { readOnly: true } }
                        />
                    </Grid>

                    <Grid item xs={ 12 }>
                        <FormControlLabel
                            control={<Checkbox checked={ agreement } onChange={ this.onCheckedChangeByName('agreement') }/>}
                            label={ <Fragment>
                                Ознакомлен и согласен с <a href="https://drive.google.com/file/d/1ZeDOAJfVjW4siNQFmMEbmf_u3iGktRZf/view">правилами страхования</a> и даю согласия на сбор и <a href="#">обработку персоналных данных</a>
                            </Fragment> }
                        />
                        <FormControlLabel
                            control={<Checkbox checked={ agreement2 } onChange={ this.onCheckedChangeByName('agreement2') } />}
                            label="Не являюсь иностранным публичным должностным лицом"
                        />                    
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Button variant="contained" color="default" className="btn-back" onClick={ this.props.onBack }>Назад</Button>
                        <Button variant="contained" color="primary" onClick={ this.onFinish } /* disabled={ !isValid } */>Перейти к оплате</Button>
                    </Grid> 

                </Grid>
            </Paper>
        );
    }
}