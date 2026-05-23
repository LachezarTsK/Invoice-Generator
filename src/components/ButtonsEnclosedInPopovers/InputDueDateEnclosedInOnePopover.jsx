import { useState, useEffect } from "react";
import { Popover } from "react-tiny-popover";
import { formatDate } from "../../util/formattingFunctions";

export default function InputDueDateEnclosedInOnePopover({
  dateIssued,
  dueDate,
  handleSetDueDate,
}) {
    
  const [
    popupDueDateCannotPrecedeDateOfIssue,
    setPopupDueDateCannotPrecedeDateOfIssue,
  ] = useState(false);

  useEffect(() => {
    if (popupDueDateCannotPrecedeDateOfIssue) {
      const id = setTimeout(() => {
        setPopupDueDateCannotPrecedeDateOfIssue(false);
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [popupDueDateCannotPrecedeDateOfIssue]);

  return (
    <Popover
      isOpen={popupDueDateCannotPrecedeDateOfIssue}
      content={
        <div className="popup negativeDate">
          Due Date cannot precede Date of Issue!
        </div>
      }
    >
      <div className="textDate">
        Due Date
        <br />
        {dueDate && formatDate(dueDate)}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            handleSetDueDate(e.target.value);
            if (
              e.target.value &&
              dateIssued &&
              new Date(e.target.value).getTime() <
                new Date(dateIssued.getTime())
            ) {
              setPopupDueDateCannotPrecedeDateOfIssue(true);
            }
          }}
        />
      </div>
    </Popover>
  );
}
