import type { ComponentConfig } from '@measured/puck';
import { DropZone } from '@measured/puck';
import styles from './FormRow.module.css';

export interface FormRowProps {
  columns: '1' | '2' | '3';
  gap: 'small' | 'medium' | 'large';
}

export const FormRow = ({
  columns,
  gap,
}: FormRowProps): JSX.Element => {
  return (
    <div
      className={styles.row}
      data-columns={columns}
      data-gap={gap}
    >
      <DropZone zone="fields" />
    </div>
  );
};

export const formRowConfig: ComponentConfig<FormRowProps> = {
  label: 'Form Row',
  fields: {
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
    },
    gap: {
      type: 'select',
      label: 'Gap',
      options: [
        { label: 'Small (8px)', value: 'small' },
        { label: 'Medium (12px)', value: 'medium' },
        { label: 'Large (16px)', value: 'large' },
      ],
    },
  },
  defaultProps: {
    columns: '2',
    gap: 'medium',
  },
  render: FormRow,
};

export { FormRow as default };
