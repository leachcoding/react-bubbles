import React, { useState } from "react";
import api from '../utils/api';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    code: {hex: ''},
    color: '',
    id: Date.now()
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    api().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(() => {
      alert('Color Updated!')
      api().get('/api/colors')
      .then(response => updateColors(response.data))
      .catch(error => console.log(error))
      setEditing(false);
    })
    .catch(error => {
      console.log(error)
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    api().delete(`/api/colors/${color.id}`)
      .then(() => {
        alert('Color Deleted!')
        api().get('/api/colors')
          .then(response => updateColors(response.data))
          .catch(error => console.log(error))
          setEditing(false);
      })
      .catch(error => {
        console.log(error)
      })
  };

  const createColorSubmit = e =>{
    e.preventDefault();
    api().post('/api/colors', newColor)
    .then(()=>{
      alert('color created')
      api().get('/api/colors')
      .then(res => updateColors(res.data))
      .catch(err => console.log(err))
    })
  }
  const createOnChange = e =>{
    e.preventDefault();
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div>
        <h2>Add Color</h2>
        <form onSubmit={createColorSubmit}>
          <input
            type='text'
            name='color'
            value={newColor.color}
            onChange={createOnChange}
            placeholder='Color Name'
          />
          <input
            type='text'
            name='code'
            value={newColor.code.hex}
            onChange={e => setNewColor({...colorToEdit, code: {hex: e.target.value}})}
            placeholder='Hex Code'
          />
          <button type='submit'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
