import { getUserInitials } from './getUserInitials';

describe('Get User Initials', () => {
  it('return "." if name is undefined', () => {
    const initials = getUserInitials(undefined);
    expect(initials).toBe('.');
  });

  it('return "G"', () => {
    const initials = getUserInitials('Guga');
    expect(initials).toBe('G');
  });

  it('return "GZ"', () => {
    const initials = getUserInitials('Guga Zimmermann');
    expect(initials).toBe('GZ');
  });

  it('return "GN"', () => {
    const initials = getUserInitials('Guga Zimmermann Negreiros');
    expect(initials).toBe('GN');
  });
});
