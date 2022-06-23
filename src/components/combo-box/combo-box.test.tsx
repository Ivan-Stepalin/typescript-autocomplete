import * as ReactDOM from 'react-dom';
import { ComboBox } from './combo-box';
import { fireEvent } from '@testing-library/react';

describe('testing input', () => {
  let container: HTMLDivElement;

  const onChangeMock = jest.fn();

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(
      <ComboBox
        onChange={(value: string) => onChangeMock(value)}
        value={''}
        options={['дом', 'работа', 'учеба', 'тесты']}
        defaultValue={'дом'}
      />,
      container
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it('test input provides defaultValue', () => {
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('дом');
  });

  it('test input change by input value', () => {
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '23' } });
    expect(onChangeMock).toBeCalledWith('23');
  });

  it('test input change by keydown', () => {
    const input = container.querySelector('input') as HTMLInputElement;
    input.focus();
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, {
      key: 'Enter',
      keyCode: '13',
      which: '13'
    });
    expect(onChangeMock).toBeCalledWith('работа');
  });
});
