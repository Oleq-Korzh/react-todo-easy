import '@/styles/components/button.css';

function Button({className, children, onClick}) {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;