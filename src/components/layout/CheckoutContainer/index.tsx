import type { ComponentConfig } from '@measured/puck';
import { DropZone } from '@measured/puck';
import styles from './CheckoutContainer.module.css';

export interface CheckoutContainerProps {
  layout: '60-40' | '55-45' | '50-50';
}

export const CheckoutContainer = ({ layout }: CheckoutContainerProps): JSX.Element => {
  const getGridColumns = () => {
    switch (layout) {
      case '60-40': return '60fr 40fr';
      case '55-45': return '55fr 45fr';
      case '50-50': return '1fr 1fr';
      default: return '55fr 45fr';
    }
  };

  return (
    <div
      className={styles.container}
      style={{ gridTemplateColumns: getGridColumns() }}
    >
      <main className={styles.main}>
        <DropZone zone="main" />
      </main>
      <aside className={styles.sidebar}>
        <DropZone zone="sidebar" />
      </aside>
    </div>
  );
};

export const checkoutContainerConfig: ComponentConfig<CheckoutContainerProps> = {
  label: 'Checkout Container',
  fields: {
    layout: {
      type: 'select',
      label: 'Layout Ratio',
      options: [
        { label: '60% - 40%', value: '60-40' },
        { label: '55% - 45%', value: '55-45' },
        { label: '50% - 50%', value: '50-50' },
      ],
    },
  },
  defaultProps: {
    layout: '55-45',
  },
  render: CheckoutContainer,
};

export { CheckoutContainer as default };
