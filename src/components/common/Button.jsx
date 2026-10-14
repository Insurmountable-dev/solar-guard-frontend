import Loader from "../ui/Loader";
import { baseStyles, variants,sizes } from '../../config/styles';

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
  classname = '',
  ...props
}) {


  return (
    <button
      type ={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={classname ? classname :`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {
        isLoading ? (<Loader/>) :
        Icon ? (<Icon className="w-4 h-4 shrink-0" />) : null
      }

      {children}

    </button>
  );
}