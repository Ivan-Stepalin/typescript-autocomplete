import './combo-box.css';
import React, { useEffect, useState, useRef } from 'react';

export interface IComboBoxProps {
  /** Изменение стейта */
  onChange: (value: string) => void;
  /** опции передаваемые в комбобокс */
  options: string[];
  /**значение в инпуте */
  value: string;
  /**начальное значение в инпуте */
  defaultValue?: string;
}

export const ComboBox = ({
  defaultValue,
  onChange,
  options,
  value
}: IComboBoxProps) => {
  //стейт который отслеживает изменялся ли инпут или нет
  const [touched, setTouched] = useState(false);
  //состояние фокуса инпута
  const [focused, setFocused] = useState<boolean>(false);
  //опции для рендера
  const [renderOptions, setRenderOptions] = useState<string[]>([]);
  //ссылка элемент инпута
  const ref = useRef<HTMLDivElement>(null);

  const [keyCode, setKeyCode] = useState<number>(-1);

  //хендлер нажатия на стрелочки вверх и вниз
  function handleChangeKeyCode(direction: string) {
    if (keyCode !== renderOptions.length - 1 && direction === 'down') {
      setKeyCode((prevState) => prevState + 1);
    } else if (keyCode !== 0 && direction === 'up') {
      setKeyCode((prevState) => prevState - 1);
    }
  }

  //хендлер нажатия на enter
  function handleEnterButtonOption() {
    if (keyCode > -1) {
      const val = renderOptions.find((item, i) => i === keyCode);
      onChange(val ? val : '');
    }
  }

  //хендлер нажатия на кнопку
  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    switch (event.key) {
      case 'ArrowDown':
        handleChangeKeyCode('down');
        break;
      case 'ArrowUp': {
        handleChangeKeyCode('up');
        break;
      }
      case 'Enter': {
        event.preventDefault();
        event.stopPropagation();
        handleEnterButtonOption();
      }
      default:
    }
  }

  //функция нажатия кнопки открытия вариантов
  function handleButtonClick(e: React.MouseEvent) {
    e.preventDefault();
    setFocused(!focused);
  }

  //стиль для варианта в выпадающем диалоге
  const optionStyle = (keyCode: number, i: number) => {
    const style = 'option-box__container';
    return keyCode === i ? style + ' option-box__container_choosen' : style;
  };

  useEffect(() => {
    //преобразует текст в строку с всеми буквами нижнего регистра и убирает пробелы
    function lowerCaseString(string: string) {
      return string.toLowerCase().replace(/ /g, '');
    }
    //фильтр опций по содержимому инпута
    const filteredOptions = options.filter((option: string) =>
      lowerCaseString(option).includes(lowerCaseString(value))
    );
    setRenderOptions(filteredOptions);
  }, [value]);

  //если меню открыто и таргет клика не внутри меню то меню закрывается
  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (focused && ref.current && !ref.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [focused]);

  //что выводится в инпуте
  const defaultValueInInput = (): string => {
    return value === '' && defaultValue && !touched ? defaultValue : value;
  };

  //функция выбора варианта в выпадающем списке
  function handleChooseOption(value: string) {
    onChange(value);
    if (!touched) {
      setTouched(true);
    }
  }

  return (
    <div ref={ref}>
      <form>
        <input
          onKeyDown={handleKeyDown}
          value={defaultValueInInput()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setKeyCode(-1);
            handleChooseOption(e.target.value);
          }}
          onFocus={() => setFocused(true)}
        />
        <button onClick={(e: React.MouseEvent) => handleButtonClick(e)}>
          <svg
            width="18"
            height="16"
            aria-hidden="true"
            focusable="false"
            style={{ transform: focused ? 'rotate(180deg)' : 'none' }}
          >
            <polygon fill="currentcolor" points="3,6 15,6 9,14"></polygon>
          </svg>
        </button>
      </form>
      {focused && (
        <div className={'option-box'}>
          {renderOptions.map((option, i) => (
            <div
              key={option}
              className={optionStyle(keyCode, i)}
              onClick={() => {
                handleChooseOption(option);
                setFocused(false);
              }}
            >
              <p className={'option-box__text'}>{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
