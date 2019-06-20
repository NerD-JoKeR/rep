import * as React from 'react'
// import './FizLicoRegForm.css';
import Select from 'react-select';

import { callWebService } from '../../services/ws-services';
const moment = require('moment');

export class FizLicoRegForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showCountrySelectCount: 1,
            country1: '',
            country2: '',  
            country3: '', 
            rprogramm: '',  
            rprogSrok: '', 
            progMaxDays: '', 
            dateStart: '', 
            dateEnd: '', 
            curRate: '', 
            fioKir: '', 
            fioLat: '', 
            inn: '', 
            resId: '', 
            address: '', 
            sex: '', 
            dateBirth: '', 
            region: 15188446, 
            fioKir2: '', 
            fioLat2: '', 
            iin2: '', 
            resId2: '', 
            address2: '', 
            sex2: '', 
            dateBirth2: '', 
            region2: 15188446, 
            passportNum: '', 
            passportGive: '', 
            passportDate: '', 
            passportDateEnd: '', 
            doc_type: 13310362, 
            passportNum2: '', 
            passportGive2: '', 
            passportDate2: '', 
            passportDateEnd2: '', 
            mobilePhone: '', 
            phone: '', 
            email: '', 
            mobilePhone2: '',
            phone2: '', 
            email2: '', 
            agreement: true,
            agreement2: true,
            men: false,
            women: false
        }
    }

    sendRequest = async () => {
        const sessionId = sessionStorage.getItem('sessionId');
        let {
            birthDate, 
            country1,
            country2,
            country3,
            rprogramm,
            rprogSrok,
            progMaxDays,
            dateStart,
            dateEnd,
            curRate,
            fioKir,
            fioLat,
            inn,
            resId,
            address,
            sex,
            dateBirth,
            region,
            fioKir2,
            fioLat2,
            iin2,
            resId2,
            address2,
            sex2,
            dateBirth2,
            region2,
            passportNum,
            passportGive,
            passportDate,
            passportDateEnd,
            doc_type,
            passportNum2,
            passportGive2,
            passportDate2,
            passportDateEnd2,
            mobilePhone,
            phone,
            email,
            mobilePhone2,
            phone2,
            email2,
            name,
            surname,
            agreement,
            agreement2,
            men,
            women
        } = this.state;

        passportDate = moment(passportDate).format('DD.MM.YYYY');
        fioLat = surname + " " + name;
        sex = men ? 1 : 2;
 

        let body = 
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ffinlife/ws">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ws:registrationFreedomTravelRequest>' +
                '<ws:sessionId>'+ sessionId +'</ws:sessionId>' +
                    '<ws:country1'+ country1 +'/ws:country1>' +
                    '<ws:country2'+ country2 +'/ws:country2>' +
                    '<ws:country3'+ country3 +'/ws:country3>' +
                    '<ws:rprogramm'+ rprogramm +'/ws:rprogramm>' +
                    '<ws:rprogSrok'+ rprogSrok +'/ws:rprogSrok>' +
                    '<ws:progMaxDays'+ progMaxDays +'/ws:progMaxDays>' +
                    '<ws:dateStart'+ dateStart +'/ws:dateStart>' +
                    '<ws:dateEnd'+ dateEnd +'/ws:dateEnd>' +
                    '<ws:curRate'+ this.state.sumStrah +'/ws:curRate>' +
                    '<ws:fioKir'+ fioLat +'/ws:fioKir>' +
                    '<ws:fioLat'+ fioLat +'/ws:fioLat>' +
                    '<ws:inn'+ inn +'/ws:inn>' +
                    '<ws:resId'+ resId +'/ws:resId>' +
                    '<ws:address'+ address +'/ws:address>' +
                    '<ws:sex'+ sex +'/ws:sex>' +
                    '<ws:dateBirth'+ dateBirth +'/ws:dateBirth>' +
                    '<ws:region'+ region +'/ws:region>' +
                    '<ws:fioKir2'+ fioLat +'/ws:fioKir2>' +
                    '<ws:fioLat2'+ fioLat +'/ws:fioLat2>' +
                    '<ws:iin2'+ iin +'/ws:iin2>' +
                    '<ws:resId2'+ resId +'/ws:resId2>' +
                    '<ws:address2'+ address +'/ws:address2>' +
                    '<ws:sex2'+ sex +'/ws:sex2>' +
                    '<ws:dateBirth2'+ dateBirth +'/ws:dateBirth2>' +
                    '<ws:region2'+ region +'/ws:region2>' +
                    '<ws:passportNum'+ passportNum +'/ws:passportNum>' +
                    '<ws:passportGive'+ passportGive +'/ws:passportGive>' +
                    '<ws:passportDate'+ passportDate +'/ws:passportDate>' +
                    '<ws:passportDateEnd'+ passportDateEnd +'/ws:passportDateEnd>' +
                    '<ws:doc_type'+ doc_type +'/ws:doc_type>' +
                    '<ws:passportNum2'+ passportNum +'/ws:passportNum2>' +
                    '<ws:passportGive2'+ passportGive +'/ws:passportGive2>' +
                    '<ws:passportDate2'+ passportDate +'/ws:passportDate2>' +
                    '<ws:passportDateEnd2'+ passportDateEnd +'/ws:passportDateEnd2>' +
                    '<ws:mobilePhone'+ mobilePhone +'/ws:mobilePhone>' +
                    '<ws:phone'+ phone +'/ws:phone>' +
                    '<ws:email'+ email +'/ws:email>' +
                    '<ws:mobilePhone2'+ mobilePhone +'/ws:mobilePhone2>' +
                    '<ws:phone2'+ phone +'/ws:phone2>' +
                    '<ws:email2'+ email +'/ws:email2>' +
                '</ws:registrationFreedomTravelRequest>' +
            '</soapenv:Body>'+
        '</soapenv:Envelope>';

        console.log(body)

        const response = await callWebService(body);

        console.log('FizLico response:', response);

        this.setState({ strahPremiya: response.getElementsByTagName('ns2:message')[0].value });
    }

    onAddDestinationCountryClick = () => {
        const showCountrySelectCount = this.state.showCountrySelectCount + 1;
        if(showCountrySelectCount < 4) {
            this.setState({ showCountrySelectCount });
        }
    }

    onMenChange = (event) => {
        this.setState({ men: !this.state.men })
    }

    onWomenChange = (event) => {
        this.setState({ women: !this.state.women })
    }

    onInnChange = (event) => {
        this.setState({ inn: event.target.value })
    }

    onAdressChange = (event) => {
        this.setState({ address: event.target.value })
    }

    onPassprotNumChange = (event) => {
        this.setState({ passportNum: event.target.value })
    }

    onPassportDateChange = (event) => {
        this.setState({ passportDate: event.target.value })  
    }

    onMobilePhoneChange = (event) => {
        this.setState({ mobilePhon: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value})
    }

    onSurnameChange = (event) => {
        this.setState({ surname: event.target.value})
    }
    
    onFioLatChange = (event) => {
        this.setState({ fioLat: event.target.value})
    }

    onAgreementChange = (event) => {
        this.setState({ agreement: !this.state.agreement })
    }

    onAgreement2Change = (event) => {
        this.setState({ agreement2: !this.state.agreement2 })
    }

    onBeginDateChange = (event) => {
        this.setState({ beginDate: event.target.value })  
    }

    onEndDateChange = (event) => {
        this.setState({ endDate: event.target.value })  
    }

    onBirthDateChange = (event) => {
        this.setState({ birthDate: event.target.value })  
    }

    onSumStrahChange = (event) => {
        this.setState({ sumStrah: event.target.value })  
    }

    onFinish = async () => {
        await this.sendRequest();
        this.props.onFinish(this.state);
    }

    render(){
        const { 
            showCountrySelectCount,
            birthDate, 
            country1,
            country2,
            country3,
            rprogramm,
            rprogSrok,
            progMaxDays,
            dateStart,
            dateEnd,
            curRate,
            fioKir,
            fioLat,
            inn,
            resId,
            address,
            sex,
            dateBirth,
            region,
            fioKir2,
            fioLat2,
            iin2,
            resId2,
            address2,
            sex2,
            dateBirth2,
            region2,
            passportNum,
            passportGive,
            passportDate,
            passportDateEnd,
            doc_type,
            passportNum2,
            passportGive2,
            passportDate2,
            passportDateEnd2,
            mobilePhone,
            phone,
            email,
            mobilePhone2,
            phone2,
            email2,
            name, 
            surname,
            agreement,
            agreement2,
            men,
            women
        } = this.state;

        console.log(this.state)

        return (
        <div>
            <div classNameName="container">
                <form>
                    <div classNameName="center">
                        <br/>  
                        <h2> Офомление полиса</h2>
                        <br/>
                    </div>
                    
                    <div classNameName="row">
                        <div classNameName="col-25">
                            <label> Выберите тип лица: </label>
                        </div>
                        <div classNameName="col-25">		
                            Физическое лицо
                            <input type="checkbox" checked="checked" name="phys" />
                        </div>
                        <div classNameName="col-25">        
                            Юридическое лицо
                                <input type="checkbox" checked="checked" name="legal" />
                        </div>
                    </div>
                    
                    <div classNameName="row">
                    <div classNameName="col-25 ">
                        <label for="surname"> Фамилия на латинице: </label>
                        <input type="text" id="surname" name="surname" value={surname} onChange={this.onSurnameChange} placeholder="Zhakanova"/>
                    </div>
                    <div classNameName="col-25 ">
                        <label for="name"> Имя на латинице: </label>
                        <input type="text" id="name" name="name" value={name} onChange={this.onNameChange} placeholder="Aray"/>
                    </div>
                    <div classNameName="col-25 ">
                        <label for="sex"> Пол: </label>
                        <input type="checkbox" checked={men} onClick={this.onMenChange} name="men" placeholder="Муж" />
                        <input type="checkbox" checked={women} onClick={this.onWomenChange} name="women" placeholder="Жен" />
                    </div>
                    </div>
            
                    <div classNameName="row">
                        <div classNameName="col-50">
                            <label for="inn"> ИНН</label>
                            <input type="text" classNameName="inn" id="inn" value={inn} onChange={this.onInnChange} placeholder="123456789123"/>
                        </div>
                        <div classNameName="col-50">
                            <label for="cname"> Адрес проживание</label>
                            <input type="text" classNameName="adress" id="adress" value={address} onChange={this.onAdressChange} placeholder="Конаева 36"/>
                        </div>
                    </div>
                    
                    <div classNameName="row">
                        <div classNameName="col-25">
                            <label>
                                <input type="checkbox" checked="checked" name="rezident" placeholder="Не являюсь резидентом РК" />
                            </label>
                        </div>
                        <div classNameName="col-25">
                            <label for="selectRezident"> Выберите страну резидентсва: </label>
                        </div>
                        <div className="col-25">
                            <select name="listOfCountry" form="countryForm">
                            <option value="USA"> США</option>
                            <option value="ENG"> Англия</option>
                            <option value="GER"> Германия</option>
                            <option value="RU"> Россия</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-25">
                            <label for="pasportNumber"> Номер Паспорта:</label>
                            <input type="text" id="pasportNumber" name="pasportNumber" value={passportNum} onChange={this.onPassprotNumChange} placeholder="055554177"/>
                        </div>
                        <div className="col-25">
                            <label for="dateOfIssue"> Дата выдачи:</label>
                            <input className="dateOfIssue" id="dateOfIssue" type="date" value={passportDate} onChange={this.onPassportDateChange} placeholder="dd-mm-yyyy"/>
                        </div>
                        <div className="col-25">
                            <label for="selectRezident"> Кем выдан? </label>
                            <select name="listOfMinistry" form="ministryForm">
                            <option value="MU"> МЮ РК</option>
                            <option value="MVD"> МВД РК</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <input type="submit" value=" + Прикрепить скан или фото документа " className="btn1"/>   
                        </div>	
                        <div className="col-25">
                        </div>
                    </div>	
                    
                    {/* <div className="center">
                        <input type="submit" value=" Добавить еще одного туриста " className="btn2"/>   
                    </div>   */}
                    
                    <div className="row">
                        <div className="col-50">
                            <label for="phoneNumber"> Ваш телефон:</label>
                            <input name="tel" type="tel" pattern="^\+7\d{3}\d{7}$" value={mobilePhone} onChange={this.onMobilePhoneChange} maxlength="12"/>
                        </div>
                        <div className="col-50">
                            <label for="mail"> E-mail:</label>
                            <input className="mail" id="mail" type="text" value={email} onChange={this.onEmailChange} placeholder="aray@gmail.com"/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-50">
                            <label>
                                <input type="checkbox" checked={agreement} onClick={this.onAgreementChange} name="agreement" />
                                Ознакомлен и согласен с правилами страхования и даю согласия на сбор и обработку персоналных данных
                            </label>
                            <label>
                                <input type="checkbox" checked={agreement2} onClick={this.onAgreement2Change} name="agreement2" />
                                Не являюсь иностранным публичным должностным лицом
                            </label>
                        </div>
                    </div>
                    
                    <div className="row">
                            <div className="col-50">
                                <label for="ccnum">Страховая премия, тенге:</label> 
                                <div className="centerInput">
                                <input className="inputStrahPremiya" type="text" disabled="true" placeholder="10000"/>  
                                </div>
                            </div>
                            <div className="col-50">
                                
                            </div>
                    </div>   
                    
                    <div className="center">
                        <button className="btn" onClick={ this.onFinish }>
                            Перейти к оплате
                        </button>
                    </div>    
                    
                </form>
            </div>
        </div>
        );
    }

}

