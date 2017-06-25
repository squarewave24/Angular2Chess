import { Raf.AppPage } from './app.po';

describe('raf.app App', () => {
  let page: Raf.AppPage;

  beforeEach(() => {
    page = new Raf.AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
