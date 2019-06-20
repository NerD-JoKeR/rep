import React from 'react';
import MomentUtils from '@date-io/moment';
import { AppBar, Paper, Toolbar } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import "moment/locale/ru";
/* Components */
// import { Calculator } from './components/Calculator'
// import { FizLicoRegForm } from './components/Registration/FizLicoRegForm';
// import { Registration } from './components/Registration/Registration';
import { authenticate } from './services/ws-services'
import { Initial } from './components/Initial'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

moment.locale('ru');

class  App extends React.Component {

  constructor(props) {
    super(props);

    authenticate();
    const interval = setInterval( authenticate, 25000);    
    this.state = { interval }
  }
  
  render() {
    return (
      <MuiPickersUtilsProvider utils={ MomentUtils } locale="ru" libInstance={ moment }>
        <div className="App">
          <AppBar className="App-header" position="static" color="default">
            <Toolbar>
              <h1>Медицинское страхование туристов</h1>
            </Toolbar>
          </AppBar>
          <div className="App-body">
            <Initial />
            {/* <FizLicoRegForm /> */}
            {/* <Calculator/> */}
          </div>
        </div>
      </MuiPickersUtilsProvider>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }
  
}

export default App;
