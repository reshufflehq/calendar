import React from 'react';
import Calendar from './Calendar';
import './main.scss';

export default () => {
  return (
    <div className='container-app'>
      <div className='container-app-top'></div>
      <Calendar />
    </div>
  );
};
