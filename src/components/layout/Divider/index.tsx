import type { ComponentConfig } from '@measured/puck';
import styles from './Divider.module.css';

export interface DividerProps {
  spacing: 'small' | 'medium' | 'large';
  showLine: boolean;
}

export const Divider = ({
  spacing,
  showLine,
}: DividerProps): JSX.Element => {
  return (
    <div
      className={styles.divider}
      data-spacing={spacing}
      data-line={showLine}
    />
  );
};

export const dividerConfig: ComponentConfig<DividerProps> = {
  label: 'Divider',
  fields: {
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    showLine: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Show Line',
    },
  },
  defaultProps: {
    spacing: 'medium',
    showLine: false,
  },
  render: Divider,
};

export { Divider as default };
