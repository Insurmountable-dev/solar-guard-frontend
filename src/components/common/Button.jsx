import Loader from "../ui/Loader";
import { baseStyles, variants,sizes } from '../../constants/styles';

export default function Button({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon,
  onClick,
  className = '',
  ...props
}) {


  return (
    <button
      type ={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {
        isLoading ? (<Loader/>) :
        Icon ? (<Icon className="w-4 h-4 shrink-0" />) : null
      }

      <span>{children}</span>

    </button>
  );
}