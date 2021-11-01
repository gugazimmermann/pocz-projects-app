import faker from 'faker';
import { render } from '@testing-library/react';
import Title from './Title';

faker.locale = 'pt_BR';

const titleObj = {
  title: faker.datatype.string(),
  subtitle: faker.datatype.string(),
  plan: faker.datatype.string(),
};

describe('Title', () => {
  it('should render text and send to link', async () => {
    const { getByText } = render(
      <Title title={titleObj.title} subtitle={titleObj.subtitle} plan={titleObj.plan} />,
    );
    expect(getByText(titleObj.title)).toBeTruthy();
    expect(getByText(titleObj.subtitle)).toBeTruthy();
    expect(getByText(titleObj.plan)).toBeTruthy();
  });
});
