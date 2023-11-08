import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import {
  CLIENT_ID, 
  CLIENT_SECRET, 
  BACKENF_URL, 
  INSTAGRAM_LOGIN
} from '../config/config';

import { connect } from 'react-redux';
import {
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    
  }

  componentWillUnmount() {
    //this.props.onUnload();
  }

  render() {
    
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12 text-xs-center">
              <h1 className="text-xs-center">Sign In</h1>
              
              <ListErrors errors={this.props.errors} />

              <form >
                <fieldset>

                  
                  <a
                    className="btn btn-lg btn-primary text-xs-center"
                    type="submit"
                    href={INSTAGRAM_LOGIN}
                    disabled={this.props.inProgress}>
                    Instagram Login
                  </a>


                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
