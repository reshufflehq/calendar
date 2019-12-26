import React from 'react';
import Calendar from './Calendar';
// import Form from './Form';

import './main.scss';

export default () => {
  return (
    <div className='container-app'>
      <div className='container-app-top'></div>
      {/* <Form /> */}
      <Calendar />
    </div>
  );
};
