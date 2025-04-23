export default function FormInput({ type, id, placeholder, value, onChange, required = true }) {
    return (
        <div className="form-group">
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required} />
        </div>
    )
}