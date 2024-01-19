import { useContext, useEffect, useState } from 'react';
import { Auth, Color } from '../App';
import { addData, deleteData, getTaskData } from '../services';
import './Notes.css';

function Notes({dictionary, language}) {
  const { appcolor } = useContext(Color);
  //const { dictionary, language } = useContext(Auth);
  const { id } = useContext(Auth);
  const [dataNotes, setDataNotes] = useState([])
  const [message, setMessage] = useState([]);
  const [note, setNote] = useState([]);
  const [hiddenList, setHiddenList] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [form, setForm] = useState({
    note_title: "",
    note_description: "",
  });

  const fetchNotes = async () => {
    const endpoint = `user/${id._id}/notes`;
    //console.log(id, 'dicccionario', dictionary, 'language', language);
    setMessage(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );

    try {
      const response = await getTaskData(endpoint);
      //console.log(response);
      setMessage("");
      setDataNotes(response);
    } catch (err) {
      console.error(err);
      setMessage(dictionary[language].dashboard_error);
    }
  };

  const readNote = (e) => {
    const id = e.target.id;
    const findNote = dataNotes.find((note) => note._id === id);
    //console.log(id, findNote);
    setNote(findNote);
    setHiddenList(true);
  };
  const closeNote = () => {
    setHiddenList(false);
  };
  const handleChange = (e) => {
    //console.log(e.target.value.length);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNoteSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `user/${id._id}/note`;
    setMessage(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
    try {
      if (form.note_description === "" && form.note_title === "") {
        setMessage(dictionary[language].dashboard_empty_fields);
        setTimeout(() => setMessage(""), 1000);
      } else if (form.note_description === "") {
        setMessage(dictionary[language].dashboard_empty_description);
        setTimeout(() => setMessage(""), 1000);
      } else if (form.note_title === "") {
        setMessage(dictionary[language].dashboard_empty_title);
        setTimeout(() => setMessage(""), 1000);
      } else {
        const data = form;
        const response = await addData(endpoint, data);
        setMessage(dictionary[language].dashboard_success);

        setTimeout(() => {
          setMessage("");
        }, 1000);

        //setDataNotes(...dataNotes, response);
        setDataNotes([...dataNotes, response]);

        setForm({
          note_title: "",
          note_description: "",
        });
        setHiddenList(false);
      }
    } catch (err) {
      console.error(err);
      setMessage(dictionary[language].dashboard_error);
    }
  };

  const handleDeleteNote = async (e) => {
    const id = e.target.id;
    //console.log(id);
    const endpoint = `note/${id}`;
    setMessage(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );

    try {
      const response = await deleteData(endpoint);
      setMessage(dictionary[language].dashboard_success_delete);

      setDataNotes((prevDataNotes) =>
        prevDataNotes.filter((note) => note._id !== id)
      );
      setTimeout(() => {
        setMessage("");
      }, 1000);
    } catch (err) {
      console.log(err);
      setMessage(dictionary[language].dashboard_error);
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
  };
  useEffect(() => {
    //console.log(message, dataNotes);
  }, [id, message, dataNotes]);

  useEffect(() => {
    fetchNotes();
    //console.log(note);
  }, [id, note]);

  useEffect(() => {}, [hiddenList]);
  useEffect(() => {
    //console.log(form);
  }, [form]);

  return (
    <>
      <section className={`notes-tool ${appcolor}`}>
        <span className="empty-tool">{message}</span>

        {addNote ? (
          <form onSubmit={handleAddNoteSubmit}>
            <input
              type="text"
              name="note_title"
              id="note_title"
              value={form.note_title}
              maxLength="25"
              onChange={handleChange}
              placeholder={
                dictionary[language].dashboard_input_placeholder_title
              }
            />
            <textarea
              name="note_description"
              id="note_description"
              cols="30"
              rows="10"
              maxLength={350}
              value={form.note_description}
              onChange={handleChange}
              placeholder={
                dictionary[language].dashboard_input_placeholder_description
              }
            ></textarea>
            {/**
             * <input
              type="text"
              name="note_description"
              id="note_description"
              value={form.note_description}
              onChange={handleChange}
              placeholder={
                dictionary[language].dashboard_input_placeholder_description
              }
            />
             */}
            <div className="form-notes-btns">
              {/**POST */}
              <button type="submit" className="send">
                {dictionary[language].dashboard_btn_send}
              </button>
              {/**Close form */}
              <button
                className="close"
                onClick={(e) => {
                  e.preventDefault(), setAddNote(!addNote);
                }}
              >
                {dictionary[language].dashboard_btn_close}
              </button>
            </div>
          </form>
        ) : hiddenList ? (
          <div className="note">
            <h3>{note.note_title}</h3>
            <p>{note.note_description}</p>
            <small>{note.note_date}</small>
            <button className="btn-close-note" onClick={closeNote}>
              Close
            </button>
          </div>
        ) : (
          <div className="list-note">
            <ul>
              {dataNotes.map((note) => (
                <div key={note._id} className="note-container">
                  <li
                    key={note._id}
                    id={note._id}
                    onClick={(e) => {
                      readNote(e);
                    }}
                  >
                    {note.note_title}
                  </li>
                  <div className="trash">
                    <i
                      className="bi bi-trash3"
                      id={note._id}
                      onClick={handleDeleteNote}
                    ></i>
                  </div>
                </div>
              ))}
            </ul>
            <button
              className="btn-add-notes"
              onClick={() => setAddNote(!addNote)}
            >
              {dictionary[language].dashboard_btn_add_note}
            </button>
          </div>
        )}

        {/** Cuando se elija ver notas se vera una lista */}
        {/** Cuando le de click a una nota esa seccion será una sola nota */}
        {/** Cuando le de al boton esta seccion sera un form */}
      </section>
    </>
  );
}
export default Notes;