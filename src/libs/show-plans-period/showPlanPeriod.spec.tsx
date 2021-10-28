import { showPlanPeriod } from './showPlanPeriod';

describe('Show Plan Period', () => {
  it('return "mês" if reason has mensal', () => {
    const res = showPlanPeriod('test mensal');
    expect(res).toBe('mês');
  });

  it('return "semestre" if reason has semestral', () => {
    const res = showPlanPeriod('test semestral');
    expect(res).toBe('semestre');
  });

  it('return "ano" if reason does not have mensal or semestral', () => {
    const res = showPlanPeriod('test');
    expect(res).toBe('ano');
  });
});
