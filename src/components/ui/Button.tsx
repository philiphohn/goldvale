import {Link} from '@/i18n/routing';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  href,
  variant = 'primary',
  children,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseClass = "inline-flex items-center gap-[0.6em] text-[0.98rem] font-medium px-[1.7rem] py-[1rem] rounded-full transition-all duration-350 hover:-translate-y-[3px]";
  const variants = {
    primary: "bg-[var(--color-pop)] text-white hover:shadow-[0_14px_40px_-12px_rgba(var(--pop-rgb),0.6)]",
    ghost: "bg-transparent border border-[var(--color-line)] text-[var(--color-white)] hover:border-[var(--color-gold)] hover:shadow-none"
  };

  const combinedClass = `${baseClass} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href as any} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
}
