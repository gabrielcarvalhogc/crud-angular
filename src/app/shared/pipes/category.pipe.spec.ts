import { CategoryPipe } from './category.pipe';

describe('CategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new CategoryPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "Front-end" to "code"', () => {
    const pipe = new CategoryPipe();
    expect(pipe.transform('Front-end')).toBe('code');
  });

  it('should transform "Back-end" to "computer"', () => {
    const pipe = new CategoryPipe();
    expect(pipe.transform('Back-end')).toBe('computer');
  });

  it('should return "code" for unknown categories', () => {
    const pipe = new CategoryPipe();
    expect(pipe.transform('Unknown Category')).toBe('code');
  });
});
