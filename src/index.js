import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import './css/normalize.css';
import './css/style.css';

import CardGame from './components/CardGame';


render(<CardGame/>, document.querySelector('#main'));