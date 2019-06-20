const XMLParser = require('react-xml-parser');

const login = 'ffinlife_site';
const password = '1q3wr2';
const basicAuthorizationToken = 'Basic a2FzcGk6a2FzcGk='

export function authenticate() {
    fetch('/ws', {
        method: 'post',
        headers: { 'Content-Type':'text/xml', 'Authorization': basicAuthorizationToken },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ffinlife/ws">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                '<ws:authorizationWSRequest>' +
                    '<ws:login>' + login + '</ws:login>' +
                    '<ws:password>' + password + '</ws:password>' +
                '</ws:authorizationWSRequest>' +
                '</soapenv:Body>' +
            '</soapenv:Envelope>'
       }).then(async (response) => {
            const xml = await parseResponseToJson(response);
            const sessionId = xml.getElementsByTagName('ns2:sessionId')[0].value;
            sessionStorage.setItem('sessionId', sessionId);
       });
}

export async function callWebService(wsBody) {
    const body = 
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ffinlife/ws">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        wsBody + 
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

    return fetch('/ws', {
        method: 'post',
        headers: { 'Content-Type':'text/xml', 'Authorization': basicAuthorizationToken },
        body
       }).then(async (response) => {
            const xml = await parseResponseToJson(response)
            return xml;
       });
}

export async function parseResponseToJson (response) {
    const text = await response.text();
    let result = text.substring(text.indexOf('<SOAP'), text.indexOf('</SOAP-ENV:Envelope>') + 20);
    const xml = new XMLParser().parseFromString(result); 
    return xml;
}