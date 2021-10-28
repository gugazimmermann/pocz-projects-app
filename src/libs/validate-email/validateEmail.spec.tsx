import { validateEmail } from './validateEmail';

describe('Show Plan Period', () => {
  it('return "false"', () => {
    let res = validateEmail('guga');
    expect(res).toBeFalsy();

    res = validateEmail('guga@');
    expect(res).toBeFalsy();

    res = validateEmail('guga@test');
    expect(res).toBeFalsy();
  });

  it('return "true"', () => {
    const res = validateEmail('guga@test.com');
    expect(res).toBeTruthy();
  });
});
