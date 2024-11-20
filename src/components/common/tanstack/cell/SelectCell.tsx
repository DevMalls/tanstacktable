import { ChangeEvent, useState } from "react";
import "./selectcell.css";

const SelectCell = ({ getValue, row, column, table }: any) => {
    const initalvalue = getValue();
    const [dropdownvalues, setDropdownValues] = useState(initalvalue);
    const [value, setValue] = useState(initalvalue[0]);
    const [isedit, setIsEdit] = useState(false);

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        table.options.meta?.updateDropdown(row.index, column.id, e.target.value);
        setIsEdit(false)
    }

    const onEditClick = () => {
        setIsEdit(true)
    }
    
    return (
        <div className="cell-container">
            {isedit && dropdownvalues.length > 1 ? 
                <select className="select-cell" value={value} onChange={onSelectChange}>
                    {dropdownvalues.map((option: string, index: number) =>
                        <option key={index} value={option}>{option}</option>)
                    }
                </select>
                :
                <span>{row.original[column.id]?.[0]}</span>
            }
            {!isedit && dropdownvalues.length > 1 && <button className="edit-btn"
                onClick={onEditClick}>
                ✏️
            </button>}
        </div>
    )
}
export default SelectCell;