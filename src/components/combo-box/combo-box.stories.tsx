import { ComboBox, IComboBoxProps } from './combo-box';
import { useState } from 'react';
import { options } from './options';
import React from 'react';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'ComboBox',
  component: ComboBox,
  argTypes: {
    value: {
      table: {
        disable: true
      }
    },
    onChange: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<IComboBoxProps> = (props) => {
  const [localValue, setValue] = useState<string>('');
  const onChangeInput = (inputValue: string) => {
    setValue(inputValue);
  };
  return (
    <ComboBox
      onChange={onChangeInput}
      value={localValue}
      options={props.options}
      defaultValue={props.defaultValue}
    />
  );
};
export const Default: Story<IComboBoxProps> = Template.bind({});
Default.args = {
  /** text, which is shown until the text is written */
  options: ['дом', 'работа'],
  /** text, which is shown until the text is written */
  defaultValue: ''
};
Default.storyName = 'Combobox';
