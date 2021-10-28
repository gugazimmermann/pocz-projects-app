import './LoadingButton.css';

export interface LoadingButtonProps {
  styles: string;
  loadingStyles?: string,
  type: 'submit' | 'reset' | 'button' | undefined;
  text: string;
  loading: boolean;
  action?: (value?: boolean) => void;
}

export function LoadingButton({
  styles,
  loadingStyles,
  type,
  text,
  loading,
  action,
}: LoadingButtonProps) {
  return (
    <button
      className={styles}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={loading}
      onClick={() => (action ? action(true) : null)}
    >
      {loading ? (
        <div className=" flex justify-center items-center">
          <div className={`${loadingStyles || 'h-6 w-6'} animate-spin rounded-full border-b-2 border-white`} />
          <span className="ml-2">{text}</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
}

export default LoadingButton;
