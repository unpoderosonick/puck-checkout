import type { ComponentConfig } from '@measured/puck';
import { DropZone } from '@measured/puck';
import { useState } from 'react';
import styles from './Section.module.css';

export interface SectionProps {
  title: string;
  showTitle: boolean;
  collapsible: boolean;
}

export const Section = ({
  title,
  showTitle,
  collapsible,
}: SectionProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section className={styles.section}>
      {showTitle && (
        <div
          className={styles.header}
          onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
          style={{ cursor: collapsible ? 'pointer' : 'default' }}
        >
          <h2 className={styles.title}>{title}</h2>
          {collapsible && (
            <span className={`${styles.chevron} ${isCollapsed ? styles.collapsed : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          )}
        </div>
      )}
      <div className={`${styles.content} ${isCollapsed ? styles.hidden : ''}`}>
        <DropZone zone="content" />
      </div>
    </section>
  );
};

export const sectionConfig: ComponentConfig<SectionProps> = {
  label: 'Section',
  fields: {
    title: {
      type: 'text',
      label: 'Title',
    },
    showTitle: {
      type: 'radio',
      label: 'Show Title',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    collapsible: {
      type: 'radio',
      label: 'Collapsible',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    title: 'Section Title',
    showTitle: true,
    collapsible: false,
  },
  render: Section,
};

export { Section as default };
