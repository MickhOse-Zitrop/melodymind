export default function Notify({ children, setShow }) {
    setTimeout(() => {
        setShow(false);
    }, 5000);

    return (
        <form
            className="notify-form"
            onSubmit={(event) => {
                event.preventDefault();
                setShow(false);
            }}
        >
            <p>{children}</p>
            <button type="submit">OK</button>
        </form>
    );
}
