import ListErrors from './ListErrors';
import React from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css";


import {
  SAVE_USER_IMAGES
} from '../constants/actionTypes';

import {
  CLIENT_ID, 
  CLIENT_SECRET, 
  BACKENF_URL, 
  INSTAGRAM_LOGIN
} from '../config/config';

const underscore  = require('underscore');
const httpRequest = require('../util/httpRequest');


const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onSaveImages(imageList) {
      dispatch({ type: SAVE_USER_IMAGES, imageList: imageList});
  }
});

class List extends React.Component {
  constructor() {
    super();

    
  }



  componentWillMount() {
    const { userDetails = {} } = this.props;
    
    if (underscore.size(userDetails) > 0 && underscore.has(userDetails, 'userId') == true) {
        httpRequest.call(
            'GET',
            BACKENF_URL +'photo/getImages/'+userDetails['userId'],
            {},
            {},
            {},
            (error, result, body) => {
              if (underscore.isEmpty(body) == false && body.status == true && underscore.isEmpty(body.response) == false) {
                  this.props.onSaveImages(body.response);
              }
            }
          )
    } else {
        alert('Invalid Session');
        this.props.history.push("/login");
    }
  }


  render() {
    const {imageList = {}} = this.props;

    let imageContainer = "";
    var slider = "";
    let imageTag = [];
    let imageSlider = [];

    if (imageList) {
      underscore.map(imageList, function(value, tag) {
        let imageView = "";
        underscore.map(value, function(v) {
          imageTag.push(v);
          imageView += "<img src='"+v+"' width='100'/><br/>";
        })
        console.log('+++imageTag', imageTag);
        imageContainer += "<tr><td>"+tag+"</td> <td>"+underscore.size(value)+"</td><td>"+imageView+"</td></tr>";
      })
    }
    imageTag = imageTag.filter((v, i, a) => a.indexOf(v) === i); 
    underscore.map(imageTag, function(v) {
      imageSlider.push({original: v, thumbnail: v});
    });

    slider = (<ImageGallery items={imageSlider} />);

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <h1>Image Listing with Category</h1>
              <ListErrors errors={this.props.errors}></ListErrors>
              
              <table className ="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Count</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {renderHTML(imageContainer)}
                </tbody>
              </table>
              {slider}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
