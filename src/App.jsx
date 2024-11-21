import { nanoid } from 'nanoid' // create unique IDs for li items (for Key purposes)
import { useState } from 'react'
import './App.css'
import ToDoList from "./components/ToDoList.jsx"

export default function App() {

  // stores users input before "add to list" button is clicked
  const [activity, setActivity] = useState("")
  // stores all users acts added to list
  const [toDoList, setToDoList] = useState([])
  // boolean to check whether the edit SVG was clicked
  const [clickedEdit, setClickedEdit] = useState(false)
  // stores current activity id
  const [currentAct, setCurrentAct] = useState([])
  // stores index of the current activity
  const [currentActIndex, setCurrentActIndex] = useState([])

  function handleChange(event) {
      // prevents re-render after each individual input into text field
      event.preventDefault()
      // sets the activity state to whatever the user inputed
      setActivity(event.target.value)
    }

  function clearList() {
    // clears the list shown to the user
    setToDoList([]) // resets state
    setActivity("") // resets state
    setClickedEdit(false) // resets state
  }

  function removeActivity(selectedAct) {
      // removes particular activity from the list
      const newToDoList = toDoList.filter(act => act !== selectedAct) // filters out particualr act for removal
      setToDoList(newToDoList) // sets list without filtered act 
      setClickedEdit(false) // resets state
      setActivity("") // resets state
    }

  function editActivity(selectedAct,index) {
      // functionality for edit button
      setClickedEdit(!clickedEdit) // sets clicked edit boolean to opposite of what it currently is
      setActivity(selectedAct.theAct) // sets activity state to the activity in which the edit button is connected with
      setCurrentAct(selectedAct.id) // sets current act state to the id of selected activity
      setCurrentActIndex(index) // sets current act index to index of selected act
  }

  function toggleChecked(selectedAct) {
      // if user checked the finished box this function runs 
      const updatedCheck = toDoList.map(act => {
        // if the id of the li checkbox user checked is same as the activity id
        // then return the same act but change checked status to opposite of current status
        // if not, return unchanged act
          if (act.id == selectedAct.id) {
              return {...act, checked: !selectedAct.checked}
          } else {
            return act
          }   
      })

      setToDoList(updatedCheck) // set list to updated list with changed check stats


  }

  function confirmEditClick() {
    /*
    / adds functionality when user edits an act
    / it updates the pervious act to new version
    */
    // fliters out the act
    const editedList = toDoList.filter(act => act.id !== currentAct)
    // takes out act at index of li where edited button was clicked
    // update object with edited act
    editedList.splice(currentActIndex, 0, { id: currentAct, theAct: activity, edited: true})

    setToDoList(editedList) // set list to updated list with edited act
    setClickedEdit(!clickedEdit) // reverse state
    setActivity("") // reset state
  }



  function handleClick() {
      // updates list to have users inputed act
      if (activity) {
        /*  
        / if user inputed at least one character
        / they are able to add it to list
        */
        // copying current list and adding to it 
        // another object containing users new inputs
        setToDoList(prevToDoList => [
            ...prevToDoList, 
            {
                id: nanoid(),
                theAct: activity,
                edited: false,
                checked: false
            }
        ])
      }
      setActivity("") // reset input box
  }

  return (
      <div className="appTest">

          <h1 className="title-top">What Needs</h1>
          <h1 className="title-bottom">ToGetDone?</h1>
          <div className="inputbox-and-label">
              <label htmlFor="input" className="input-label">Enter Activity here:</label>
              <textarea 
                  type="text"
                  id="input"
                  className="input"
                  name="activity"
                  placeholder="ex: Go to store and get eggs"
                  onChange={handleChange}
                  value={activity}
                  /*
                  / removed *press enter = add* feature 
                  / bc if user wants to press enter for new line
                  / it adds to list instead
                  / not good UX (IMO)
                  */
                  //onKeyDown={(e) => {
                      // when user presses the enter key
                      // it records it as clicking "add to list" button
                      //if (e.key === "Enter")
                      //handleClick()
                      //}}
              />
          </div>
          
          <div className="btns">
              {
                  activity && clickedEdit == false // if activity length is greater than zero or ...
                  &&
                  // render button
                  <button 
                      type="button"
                      className="addBtn"
                      onClick={() => handleClick()}
                  >
                      Add To List
                  </button>
              }
              {
                  clickedEdit && toDoList.length > 0 // if activity length is greater than zero or ...
                  &&
                  // render button
                  <button 
                      type="button"
                      className="addBtn"
                      onClick={() => confirmEditClick()}
                  >
                      confirm changes
                  </button>
              }
              {
                  toDoList.length > 0
                  && 
                  <button 
                      type="button"
                      onClick={() => clearList()}
                  >
                      Clear List
                  </button>
              }
          </div>
          {toDoList.length > 0 && <hr className="solid"></hr>}
          <ToDoList
              toggleChecked={toggleChecked}
              toDoList={toDoList}
              removeActivity={removeActivity}
              editActivity={editActivity}
              clickedEdit={clickedEdit}
          />
      </div>
  )
}