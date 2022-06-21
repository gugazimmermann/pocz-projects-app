import faker from 'faker';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';

faker.locale = 'pt_BR';

const profile = {
  id: faker.datatype.uuid(),
  isAdmin: faker.datatype.boolean(),
  isProfessional: faker.datatype.boolean(),
  avatar: faker.datatype.string(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  zip: faker.address.zipCode(),
  address: faker.address.streetName(),
  number: faker.datatype.number().toString(),
  complement: '',
  neighborhood: faker.address.county(),
  city: faker.address.cityName(),
  state: faker.address.state(),
  subscription: {
    planId: faker.datatype.uuid(),
    type: faker.datatype.string(),
    reason: faker.datatype.string(),
    frequency: 1,
    createdAt: '2021-10-01 18:00:00',
  },
};

describe('Menu', () => {
  it('should Relatórios be in page', async () => {
    const setMenuOpen = jest.fn();
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Menu profile={profile} places={1} setMenuOpen={setMenuOpen} menuOpen />
      </MemoryRouter>,
    );
    expect(getAllByText('Consultórios')).toBeTruthy();
    expect(getAllByText('Relatórios')).toBeTruthy();
  });

  it('should Relatórios not be in page', async () => {
    const setMenuOpen = jest.fn();
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/consultorios']}>
        <Menu
          profile={{ ...profile, zip: '' }}
          places={0}
          setMenuOpen={setMenuOpen}
          menuOpen={false}
        />
      </MemoryRouter>,
    );
    expect(queryByText('Relatórios')).not.toBeInTheDocument();
  });
});
