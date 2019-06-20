import { callWebService } from './ws-services';

export async function getCountries(sessionId) {
    const wsBody = '<ws:cabCountryRequest>' +
            '<ws:sessionId>' + sessionId + '</ws:sessionId>' +
        '</ws:cabCountryRequest>';
    const xml = await callWebService(wsBody, sessionId);
    const countriesXml = xml.getElementsByTagName('ns2:countries');

    const countries = countriesXml.map((countryXml) => {
        const codeXml = countryXml.getElementsByTagName('ns2:codeOfCountry');
        const nameXml = countryXml.getElementsByTagName('ns2:nameOfCountry');
        const territoryXml = countryXml.getElementsByTagName('ns2:territoryCountry');

        return {
            code: codeXml[0] && codeXml[0].value,
            name: nameXml[0] && nameXml[0].value,
            territory: territoryXml[0] && territoryXml[0].value
        };
    });
    return countries;
}

export async function registrateTravelInsurance(sessionId, {country1, country2, country3, rprogSrok, email, rprogramm, progMaxDays, 
    dateStart, dateEnd, curRate, fioKir, fioLat, iin, resId, address, sex, dateBirth, region, fioKir2, fioLat2, iin2, resId2, address2, 
    sex2, dateBirth2, region2, passportNum, passportGive, passportDate, passportDateEnd, doc_type, passportNum2, passportGive2, 
    passportDate2, passportDateEnd2, mobilePhone, phone, mobilePhone2, phone2, email2, name, surname
}) {
    const wsBody = '<ws:registrationFreedomTravelRequest>' +
            '<ws:sessionId>'+ sessionId +'</ws:sessionId>' +
            '<ws:country1>'+ country1 +'</ws:country1>' +
            '<ws:country2>'+ country2 +'</ws:country2>' +
            '<ws:country3>'+ country3 +'</ws:country3>' +
            '<ws:rprogramm>'+ rprogramm +'</ws:rprogramm>' +
            '<ws:rprogSrok>'+ rprogSrok +'</ws:rprogSrok>' +
            '<ws:progMaxDays>'+ progMaxDays +'</ws:progMaxDays>' +
            '<ws:dateStart>'+ dateStart +'</ws:dateStart>' +
            '<ws:dateEnd>'+ dateEnd +'</ws:dateEnd>' +
            '<ws:curRate>'+ curRate +'</ws:curRate>' +
            '<ws:fioKir>'+ surname + " "+ name +'</ws:fioKir>' +
            '<ws:fioLat>'+ surname + " "+ name +'</ws:fioLat>' +
            '<ws:inn>'+ iin +'</ws:inn>' +
            '<ws:resId>'+ resId +'</ws:resId>' +
            '<ws:address>'+ address +'</ws:address>' +
            '<ws:sex>'+ sex + '</ws:sex>' +
            '<ws:dateBirth>'+ dateBirth +'</ws:dateBirth>' +
            '<ws:region>'+ region +'</ws:region>' +
            '<ws:fioKir2>'+ surname + " "+ name +'</ws:fioKir2>' +
            '<ws:fioLat2>'+ surname + " "+ name +'</ws:fioLat2>' +
            '<ws:iin2>'+ iin +'</ws:iin2>' +
            '<ws:resId2>'+ resId +'</ws:resId2>' +
            '<ws:address2>'+ address +'</ws:address2>' +
            '<ws:sex2>'+ sex +'</ws:sex2>' +
            '<ws:dateBirth2>'+ dateBirth +'</ws:dateBirth2>' +
            '<ws:region2>'+ region +'</ws:region2>' +
            '<ws:passportNum>'+ passportNum +'</ws:passportNum>' +
            '<ws:passportGive>'+ passportGive +'</ws:passportGive>' +
            '<ws:passportDate>'+ passportDate +'</ws:passportDate>' +
            '<ws:passportDateEnd>'+ passportDateEnd +'</ws:passportDateEnd>' +
            '<ws:doc_type>'+ doc_type +'</ws:doc_type>' +
            '<ws:passportNum2>'+ passportNum +'</ws:passportNum2>' +
            '<ws:passportGive2>'+ passportGive +'</ws:passportGive2>' +
            '<ws:passportDate2>'+ passportDate +'</ws:passportDate2>' +
            '<ws:passportDateEnd2>'+ passportDateEnd +'</ws:passportDateEnd2>' +
            '<ws:mobilePhone>'+ mobilePhone +'</ws:mobilePhone>' +
            '<ws:phone>'+ phone +'</ws:phone>' +
            '<ws:email>'+ email +'</ws:email>' +
            '<ws:mobilePhone2>'+ mobilePhone +'</ws:mobilePhone2>' +
            '<ws:phone2>'+ phone +'</ws:phone2>' +
            '<ws:email2>'+ email +'</ws:email2>' +
        '</ws:registrationFreedomTravelRequest>';
    const xml = await callWebService(wsBody);
    console.log("regbody : " + wsBody);
    console.log("xml :" , xml);
    const messageXml = xml.getElementsByTagName('ns2:message');
    return messageXml[0] && messageXml[0].value;
}

export async function getCalculatedTravelInsurancePremium(sessionId, {
    country1, country2, country3, sumStrah, insuranceProgramm, beginDate, endDate, birthDate, rprogSrok, rprogMaxDays, email
}) {
    const wsBody = '<ws:calculatorFreedomTravelRequest>' +
            '<ws:sessionId>' + sessionId + '</ws:sessionId>' +
            '<ws:country1>' + country1 + '</ws:country1>'+
            '<ws:country2>' + country2 + '</ws:country2>'+
            '<ws:country3>' + country3 + '</ws:country3>'+
            '<ws:sumStrah>' + sumStrah + '</ws:sumStrah>'+
            '<ws:insuranceProgramm>' + insuranceProgramm + '</ws:insuranceProgramm>'+
            '<ws:beginDate>' + beginDate + '</ws:beginDate>'+
            '<ws:endDate>' + endDate + '</ws:endDate>'+
            '<ws:birthDate>' + birthDate + '</ws:birthDate>'+
            '<ws:rprogSrok>' + rprogSrok + '</ws:rprogSrok>'+
            '<ws:rprogMaxDays>' + rprogMaxDays + '</ws:rprogMaxDays>'+
            '<ws:email>' + email + '</ws:email>'+
        '</ws:calculatorFreedomTravelRequest>';
    const xml = await callWebService(wsBody);
    const premiumXml = xml.getElementsByTagName('ns2:premKz');

    console.log("body : " + wsBody);
    console.log("xml :" , xml);

    return premiumXml[0] && premiumXml[0].value;
}

export async function getTravelDurationList() {
    return [
        { value: '1', label: 'до 6 месяцев' },
        { value: '2', label: 'от 6 до 9 месяцев' },
        { value: '3', label: 'от 9 до 12 месяцев' }
    ];
};

export async function getMaxNumberOfDaysAbroadList() {
    return [
        { value: '1', label: 'до 30 дней' },
        { value: '2', label: 'до 60 дней' },
        { value: '3', label: 'до 90 дней' },
        { value: '4', label: 'до 180 дней' },
    ];
};

export async function getInsuredSumList() {
    return [
        { value: '10000', label: '10 000 Евро' },
        { value: '20000', label: '20 000 Евро' },
        { value: '30000', label: '30 000 Евро' },
        { value: '50000', label: '50 000 Евро' },
        { value: '70000', label: '70 000 Евро' },
        { value: '100000', label: '100 000 Евро' }
    ];
};