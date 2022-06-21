import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AttachmentShow from './AttachmentShow';

interface AttachmentInterface {
  id: string;
  date: string;
  name: string;
  link: string;
}

describe('AttachmentShow', () => {
  it('should render successfully', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const selectAttchment = (attachment: AttachmentInterface) => {};
    const att = {
      id: 'AAA',
      date: '01/01/2021 00:00',
      name: 'BBB',
      link: 'http://CCC.com',
    };
    const { baseElement } = render(
      <MemoryRouter>
        <AttachmentShow attachment={att} loading={false} selectAttchment={selectAttchment} />
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
  });
});
