import { useState, useEffect, useRef } from 'react';
import styles from './select.module.css';

export type selectOptions = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: selectOptions[];
  onChange: (value: selectOptions[]) => void;
};

type singleSelectProps = {
  multiple?: false;
  value?: selectOptions;
  onChange: (value: selectOptions | undefined) => void;
};

type SelectProps = {
  options: selectOptions[];
} & (singleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  //for highLite index when we hover on any item on list
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: selectOptions) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: selectOptions) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  //for handel use keyborad to switch between different items :
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log('e.code is : ', e.code);
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case 'ArrowDown':
        case 'ArrowUp':
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    containerRef.current?.addEventListener('keydown', handler);

    return () => {
      containerRef.current?.removeEventListener('keydown', handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <>
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  className={styles['option-badge']}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                >
                  {v.label}
                  <span className={styles['remove-btn']}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        {/* here &times; is X icon */}
        <button
          onClick={(e) => {
            // stopPropagation for stop open list when click on x
            e.stopPropagation();
            clearOptions();
          }}
          className={styles['clear-btn']}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ''
              }
                    ${index === highlightedIndex ? styles.highlighted : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
