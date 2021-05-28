import './App.scss';
import AppProps from './AppProps';

import Header from '../Header/Header';
import Main from '../Main/Main';

export default class App implements AppProps {
  root: HTMLDivElement;
  header: Header;
  main: Main;

  constructor() {

    this.initApp();
  }

  initApp = () => {
    this.root = document.getElementById('root') as HTMLDivElement;
    
    this.main = new Main();
    this.header = new Header(this.main.hamburgerMenu);
  }
}
