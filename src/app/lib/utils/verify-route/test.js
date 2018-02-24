/* globals describe it expect */
import verifyRoute from '.';

describe('test verify route', () => {
  it('should return true to equal routes', () => {
    expect(verifyRoute('/', '/')).toBeTruthy();
    expect(verifyRoute('/index.html', '/index.html')).toBeTruthy();
    expect(verifyRoute('/x/y/foo/bar', '/x/y/foo/bar/')).toBeTruthy();
  });

  it('should return false to routes with diferent length', () => {
    expect(verifyRoute('/', '/foo/bar')).not.toBeTruthy();
    expect(verifyRoute('/', '/foo')).not.toBeTruthy();
  });

  it('should return false to routes with same size but different paths', () => {
    expect(verifyRoute('/home', '/about')).not.toBeTruthy();
    expect(verifyRoute('/a/b/c', '/a/b/d')).not.toBeTruthy();
  });

  it('should return the parameter when the size and paths are right', () => {
    expect(verifyRoute('/entity/:id', '/entity/3')).toEqual({ id: '3' });
  });
});
