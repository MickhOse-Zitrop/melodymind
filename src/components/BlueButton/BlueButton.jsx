import './BlueButton.css';

export default function BlueButton({ children, disabled }) {
    return (
        <button className="blue-button" disabled={disabled}>
            {children}
        </button>
    );
}
