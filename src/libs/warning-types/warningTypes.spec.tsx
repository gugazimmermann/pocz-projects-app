import { WARNING_TYPES } from '..';
import { warningTypes } from './warningTypes';

describe('Show Plan Period', () => {
  it('return "green"', () => {
    const { text, bg, border } = warningTypes(WARNING_TYPES.SUCCESS);
    expect(text).toBe('text-white');
    expect(bg).toBe('bg-green-500');
    expect(border).toBe('border-green-500');
  });

  it('return "secondary"', () => {
    const { text, bg, border } = warningTypes(WARNING_TYPES.WARNING);
    expect(text).toBe('text-white');
    expect(bg).toBe('bg-secondary-500');
    expect(border).toBe('border-secondary-500');
  });

  it('return "red"', () => {
    const { text, bg, border } = warningTypes(WARNING_TYPES.ERROR);
    expect(text).toBe('text-white');
    expect(bg).toBe('bg-red-500');
    expect(border).toBe('border-red-500');
  });

  it('return "blue"', () => {
    const { text, bg, border } = warningTypes(WARNING_TYPES.INFO);
    expect(text).toBe('text-white');
    expect(bg).toBe('bg-blue-500');
    expect(border).toBe('border-blue-500');
  });

  it('return "primary"', () => {
    const { text, bg, border } = warningTypes(WARNING_TYPES.NONE);
    expect(text).toBe('text-white');
    expect(bg).toBe('bg-primary-500');
    expect(border).toBe('border-primary-500');
  });

  it('return "primary" if undefined', () => {
    const { text, bg, border } = warningTypes(undefined);
    expect(text).toBe('text-white');
    expect(bg).toBe('bg-primary-500');
    expect(border).toBe('border-primary-500');
  });
});
