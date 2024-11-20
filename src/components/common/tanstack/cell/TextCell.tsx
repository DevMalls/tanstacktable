import { useEffect, useState, useRef } from "react";
import './tablecell.css';

const TextCell = ({ getValue, row, column, table }: any) => {
    const initialvalue = getValue();
    const [value, setValue] = useState(initialvalue);
    const [isedit, setisedit] = useState(false);
    const inputref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputref.current) {
            inputref.current.focus();
          }
      }, [isedit]);

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value);
        setisedit(!isedit)
    }

    const onEditClick = () => {
        setisedit(true);
    }
    return (
        <div className="cell-container">
            {isedit ? (
                <input className="edit-cell" type="text"
                    value={value}
                    ref={inputref}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur} />
            ) : <span>{row.original[column.id]}</span>
            }
            {!isedit && (
                <button
                    className="edit-btn"
                    onClick={onEditClick}
                >
                    ✏️
                </button>
            )}
        </div>
    );

}

export default TextCell;