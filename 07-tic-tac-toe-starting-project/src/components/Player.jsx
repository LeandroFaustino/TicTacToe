import { useState } from "react"

export default function Players({playerName, symbol, isActive, onChangeName}){

  const [nameChange, setName] = useState(playerName)
  const [isEditing, setIsEditing] = useState(false)

  let EditOrSpan = <span className="player-name">{nameChange}</span>

  function changeName(event){
    setName(event.target.value)
  }
     
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if(isEditing){
      onChangeName(symbol, nameChange)
    }
  }

  if(isEditing){
    EditOrSpan = <input type="text" value={nameChange} required onChange={changeName} />
        
  }

    return (
      <li className={isActive ? 'active' : undefined}>
      <span>
        {EditOrSpan}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button> 
    </li>                                // ((editing) => !editing) forma mais correta de atualziar isEditing baseado no seu valor anterior
    )
}