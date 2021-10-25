import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
  title: string;
  textColor: string;
  width: string;
  isBig?: boolean;
}

export function Button({ backgroundColor, title, textColor, width, isBig, ...rest }: ButtonProps) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor, color: textColor, width, fontSize: isBig ? '3rem' : '1.5rem' }}
      {...rest}
    >
      {title}
    </button>
  );
}
