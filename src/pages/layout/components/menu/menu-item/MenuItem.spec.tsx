import faker from 'faker';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MenuItem from './MenuItem';

faker.locale = 'pt_BR';

const subitem = {
  name: faker.datatype.string(),
  link: faker.internet.domainName(),
};

describe('MenuItem', () => {
  it('should have generic item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuItem
          item={{
            name: 'Generic',
            route: faker.datatype.string(),
            icon: 'GenericIcon',
            subItems: [subitem],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByText('Generic')).toBeTruthy();
  });

  it('should have dashboard item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuItem
          item={{
            name: 'Dashboard',
            route: faker.datatype.string(),
            icon: 'DashboardIcon',
            subItems: [subitem],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('should have places item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuItem
          item={{
            name: 'Places',
            route: faker.datatype.string(),
            icon: 'PlacesIcon',
            subItems: [subitem],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByText('Places')).toBeTruthy();
  });

  it('should have members item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuItem
          item={{
            name: 'Members',
            route: faker.datatype.string(),
            icon: 'MembersIcon',
            subItems: [subitem],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByText('Members')).toBeTruthy();
  });

  it('should have businessContacts item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuItem
          item={{
            name: 'BusinessContacts',
            route: faker.datatype.string(),
            icon: 'BusinessContactsIcon',
            subItems: [subitem],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByText('BusinessContacts')).toBeTruthy();
  });

  it('should have schedule item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuItem
          item={{
            name: 'Schedule',
            route: faker.datatype.string(),
            icon: 'ScheduleIcon',
            subItems: [subitem],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByText('Schedule')).toBeTruthy();
  });

  it('should have financial item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuItem
          item={{
            name: 'Financial',
            route: faker.datatype.string(),
            icon: 'FinancialIcon',
            subItems: [subitem],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByText('Financial')).toBeTruthy();
  });

  it('should change button style', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <MenuItem
          item={{
            name: 'Dashboard',
            route: faker.datatype.string(),
            icon: 'DashboardIcon',
            subItems: [subitem],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByTestId('menuItemId').className.split(' ')).toContain(
      'text-gray-900',
    );
    await waitFor(() => fireEvent.click(getByTestId('menuItemId')));
    expect(getByTestId('menuItemId').className.split(' ')).toContain(
      'rotate-180',
    );
  });
});
