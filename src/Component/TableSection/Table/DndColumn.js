import { useDrag, useDrop } from "react-dnd";
import styled from 'styled-components'

const Column = styled.th `
    padding: 5px;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    display:flex;
    justify-content:space-around;
    align-items:center;
`

const DND_ITEM_TYPE = "column";

const DndColumn = ({ column, index, moveColumn }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPE,
    item: { index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const [, drop] = useDrop(() => ({
    accept: DND_ITEM_TYPE,
    drop: item => moveColumn(item.index, index)
  }));

  const opacity = isDragging ? 0 : 1;

  return (
    <Column
      ref={drop}
      className="th"
      {...column.getHeaderProps(column.getSortByToggleProps(), {
        style: { minWidth: column.minWidth, width: column.width }
      })}
    >
      <span ref={drag} className="columnDragIcon" style={{ opacity }}>
        <span ref={drop}>&#x2630;</span>
      </span>
      {column.render("Header")}
      <span className="table__sortIcon">
        {column.isSorted ? (
          column.isSortedDesc ? (
            <> &#x21d3;</>
          ) : (
            <> &#x21d1;</>
          )
        ) : (
          <> &#x21d5;</>
        )}
      </span>

      <div
        {...column.getResizerProps()}
        className={`th__resizer ${column.isResizing ? "th__isResizing" : ""}`}
      />
    </Column>
  );
};

export default DndColumn;