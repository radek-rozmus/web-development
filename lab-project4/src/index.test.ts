import App from './components/App/app';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

describe('App tests', () => {
    it('constructor test', () => {
        const app = new App();
        expect(app.root instanceof HTMLDivElement).toBeTruthy();
        expect(app.header instanceof Header).toBeTruthy();
        expect(app.main instanceof Main).toBeTruthy();
    });
})