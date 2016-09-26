import { Ngbook2YoutubeSearchPage } from './app.po';

describe('ngbook2-youtube-search App', function() {
  let page: Ngbook2YoutubeSearchPage;

  beforeEach(() => {
    page = new Ngbook2YoutubeSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
