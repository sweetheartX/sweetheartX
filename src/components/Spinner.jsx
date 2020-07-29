import React from 'react';
// import spinner from '../../img/spinner.gif';
const spinner = 'http://static.onemansblog.com/wp-content/uploads/2016/05/Spinner-Loading.gif';

export default () => (
  <img
    alt="Loading..."
    src={spinner}
    style={{ width: '200px', margin: 'auto', display: 'block' }}
  />
);
