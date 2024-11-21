import removeSVG from '/src/assets/remove-svgrepo-com.svg'
import editSVG from '/src/assets/edit-svgrepo-com.svg'

export default function ToDoList(props) {

    function toDoListArray() {
        // loops over list and adds <li> tags along with 
        // other buttons, etc to each activity
        return props.toDoList.map((act, index) => 
          [
            <li key={act.id}>
                <div className="act-delete">
                  <div className="checkbox-and-act">
                    {
                      act.checked == true ? 
                      <div className="checkbox-checked"
                        // functionality to change checked status 
                        onClick={() => props.toggleChecked(act, index)}>
                      </div> : 
                      <div className="checkbox-unchecked" 
                        // functionality to change checked status 
                        onClick={() => props.toggleChecked(act, index)}>
                      </div>
                    }
                    {act.theAct}
                  </div>
                  <div className="remove-delete">
                    {
                      // if clicked edit is false show edit btn
                      !props.clickedEdit && 
                      <img    
                        src={editSVG}
                        onClick={() => props.editActivity(act, index)} // when icon is clicked it removes that specifc act
                        className="deleteBtn"
                      >
                      </img>
                    }
                    <img    
                    src={removeSVG}
                    onClick={() => props.removeActivity(act)} // when icon is clicked it removes that specifc act
                    className="deleteBtn"
                    >
                    </img>
                  </div>
                </div>
            </li>,
            // dont show divider line after last act
            index !== props.toDoList.length - 1 ? <hr className="solid li"></hr> : "",
          ])
      }

    return (
        <div className="toDoList">
            <ul className="unordered-list">
                {toDoListArray()}
            </ul>
        </div>
    )
}