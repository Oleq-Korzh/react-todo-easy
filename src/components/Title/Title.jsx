import '@/styles/components/title.css';

function Title({className, text}) {
    return <h1 className={`title ${className}`}>{text}</h1>;
}

export default Title;