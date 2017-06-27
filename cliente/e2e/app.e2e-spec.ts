import { FidProdPage } from './app.po';

describe('fid-prod App', () => {
  let page: FidProdPage;

  beforeEach(() => {
    page = new FidProdPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
