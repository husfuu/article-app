interface StatusFormProps {
    label: string
    value: string;
    active: boolean
    id: string
    option: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StatusForm = (props: StatusFormProps) => {
    const { label, value, active, onChange, id, option } = props
    let cssStyle
    if (active == true) {
        cssStyle = "text-white bg-black border-black block w-full rounded-lg border border-gray-200 p-3 hover:border-black"
    } else {
        cssStyle = "text-gray-600 block w-full rounded-lg border border-gray-200 p-3 hover:border-black"
    }
    return (
        <div>
            <input
                className="peer sr-only"
                id={id}
                type="radio"
                name={option}
                value={value}
                onChange={onChange}
            />

            <label
                htmlFor={id}
                className={cssStyle}
            >
                <span className="text-sm"> {label} </span>
            </label>
        </div >
    )
}

export default StatusForm;