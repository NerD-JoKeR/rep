import React from 'react';
import { Radio, RadioGroup, Button, FormControl, FormLabel, FormControlLabel, Paper } from '@material-ui/core';

export class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            paymentType: ''
        }
    }

    onFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        }, this.validate);
    }

    validate = () => {
        const { paymentType } = this.state;
        const isValid = !!paymentType;
        this.setState({ isValid });
    }

    onFinish = async () => {
        this.props.onFinish(this.state);
    }

    render() {
        const {
            isValid,
            paymentType
        } = this.state;

        return (
            <Paper className="payment-page">
                <h2 className="page-title">Оплата</h2>
                <FormControl>
                    <FormLabel>Выберите способ оплаты:</FormLabel>
                    <RadioGroup
                        value={ paymentType }
                        name="paymentType"
                        onChange={ this.onFieldChange }
                    >
                        <FormControlLabel
                            value="1"
                            control={<Radio  color="primary"/>}
                            label="Банковский картой"
                        />
                        <FormControlLabel
                            disabled
                            value="2"
                            control={<Radio color="primary"/>}
                            label="Kaspi кошелок"
                        />
                    </RadioGroup>
                </FormControl>

                <div>
                <form action="https://epay.kkb.kz/jsp/process/logon.jsp" method="post">
                    <input type="hidden" name="email" value={ this.props.data.data.email}/>
                    <input type="hidden" name="BackLink" value="https://ffin.life/"/>
                    <input type="hidden" name="FailureBackLink" value="https://ffin.life/"/>
                    <input type="hidden" name="PostLink" value="https://pay.ffin.life/post-link"/>
                    <input type="hidden" name="FailurePostLink" value="https://ffin.life/"/>
                    <input type="hidden" name="Language" value="rus"/>
                    <input type="hidden" name="appendix" value={this.props.data.appendix}/>
                    <input type="hidden" name="Signed_Order_B64" value={this.props.data.signed}/>
                    <br></br>
                    
                    <Button variant="contained" color="default" className="btn-back" onClick={ this.props.onBack }>Назад</Button>
                    <Button variant="contained" color="primary" type="submit" onClick={ this.onFinish } disabled={ !isValid }>Оплатить</Button>
                </form>
                </div>
            </Paper>
        );
    }
}