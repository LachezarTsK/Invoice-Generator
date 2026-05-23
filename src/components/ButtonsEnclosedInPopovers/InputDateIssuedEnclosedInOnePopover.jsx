import { useState, useEffect } from "react";
import { Popover } from "react-tiny-popover";
import { formatDate } from "../../util/formattingFunctions";

export default function InputDateIssuedEnclosedInOnePopover({
  dateIssued,
  dueDate,
  handleSetDateIssued,
}) {
  const [
    popupDateOfIssueCannotBeLaterThanDueDate,
    setPopupDateOfIssueCannotBeLaterThanDueDate,
  ] = useState(false);

  useEffect(() => {
    if (popupDateOfIssueCannotBeLaterThanDueDate) {
      const id = setTimeout(() => {
        setPopupDateOfIssueCannotBeLaterThanDueDate(false);
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [popupDateOfIssueCannotBeLaterThanDueDate]);

  return (
    <Popover
      isOpen={popupDateOfIssueCannotBeLaterThanDueDate}
      transform={{ top: 100, left: 650 }}
      content={
        <div className="popup negativeDate">
          Date of Issue cannot be later than Due Date!
        </div>
      }
    >
      <div className="textDate">
        Date Issued
        <br />
        {dateIssued && formatDate(dateIssued)}
        <input
          type="date"
          value={dateIssued}
          onChange={(e) => {
            handleSetDateIssued(e.target.value);
            if (
              e.target.value &&
              dueDate &&
              new Date(e.target.value).getTime() > new Date(dueDate.getTime())
            ) {
              setPopupDateOfIssueCannotBeLaterThanDueDate(true);
            }
          }}
        />
      </div>
    </Popover>
  );
}
