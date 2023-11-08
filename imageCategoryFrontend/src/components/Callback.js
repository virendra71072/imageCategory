import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import { connect } from 'react-redux';
import {
  SAVE_USER_DETAILS
} from '../constants/actionTypes';

import {
  CLIENT_ID, 
  CLIENT_SECRET, 
  BACKENF_URL, 
  INSTAGRAM_LOGIN
} from '../config/config';

const underscore  = require('underscore');
const httpRequest = require('../util/httpRequest');

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSaveUser(userDetails) {
      dispatch({ type: SAVE_USER_DETAILS, userDetails: userDetails});
  }
});

class Callback extends React.Component {
  constructor() {
    super();
    
  }
  
  componentWillMount() {
    const {hash} = this.props.location;
    
    let token = hash.substr(1);
    token = token.split('=');
    if (underscore.size(token) > 0 && token['0'] == 'access_token' && underscore.isEmpty(token['1']) == false) {
        httpRequest.call(
            'POST',
            BACKENF_URL +'user/checkTokenAndCreateUser',
            {},
            {'token': token['1']},
            {},
            (error, result, body) => {
              if (underscore.isEmpty(body) == false && body.status == true && underscore.isEmpty(body.response) == false) {
                  this.props.onSaveUser(body.response);
                  this.props.history.push("/my-account/list");  
              }
            }
          )
    } else {
        alert('Invalid Token');
        this.props.history.push("/login");
    }
    

  }

  render() {

    console.log('+++++ props callback = ',  this.props);
    return (
      <div className="auth-page">
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
