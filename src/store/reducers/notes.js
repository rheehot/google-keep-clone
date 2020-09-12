import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

// Repeated variables: action.noteType

const initialState = {
  notes: [],
  archives: [],
  labels: [],
  editableNote: null,
};

const addNote = (state, action) => {
  const updatedNote = {
    ...state,
    notes: [action.payload, ...state.notes],
  };
  return updateObject(state, updatedNote);
};

const deleteNote = (state, action) => {
  const newNotes = state[action.noteType].filter(
    (item) => item.id !== action.payload,
  );
  const updatedNotes = {
    ...state,
    [action.noteType]: newNotes,
    editableNote: null,
  };
  return updateObject(state, updatedNotes);
};

const updateNote = (state, action) => {
  const newNotes = state[action.noteType]
    .filter((note) => note.id !== state.editableNote.id)
    .concat(state.editableNote);

  const updatedNote = {
    ...state,
    [action.noteType]: newNotes,
    editableNote: null,
  };
  return updateObject(state, updatedNote);
};

const changeNoteColor = (state, action) => {
  const newNotes = state[action.noteType].map((note) =>
    note.id === action.id
      ? {
          ...note,
          bgColor: action.bgColor,
        }
      : note,
  );
  const updatedNotes = {
    ...state,
    [action.noteType]: newNotes,
  };
  return updateObject(state, updatedNotes);
};

const toggleNoteProperty = (state, action) => {
  const property = action.property;

  const updatedNotes = state[action.noteType].map((note) => {
    if (note.id === action.payload) {
      if (state.editableNote) {
        return {
          ...note,
          content: state.editableNote.content,
          [property]: !note[property],
        };
      }
      return {
        ...note,
        [property]: !note[property],
      };
    }
    return note;
  });

  const newNotes = {
    ...state,
    [action.noteType]: updatedNotes,
  };
  return updateObject(state, newNotes);
};

const getEditableNote = (state, action) => {
  // FIXME payload is old value
  // What if editableNote and note share the same value?
  const updatedNotes = {
    ...state,
    editableNote: action.payload,
  };
  return updateObject(state, updatedNotes);
};

const clearEditableNote = (state, action) => {
  const updatedNotes = {
    ...state,
    editableNote: null,
  };
  return updateObject(state, updatedNotes);
};

// Archives
const archiveNote = (state, action) => {
  const archivedNote = state.notes.find((note) => note.id === action.payload);
  const newNotes = state.notes.filter((note) => note.id !== action.payload);

  const updatedNotes = {
    ...state,
    notes: newNotes,
    archives: [...state.archives, archivedNote],
  };
  return updateObject(state, updatedNotes);
};

const unarchiveNote = (state, action) => {
  const unarchivedNote = state.archives.find(
    (note) => note.id === action.payload,
  );
  const newNotes = state.archives.filter((note) => note.id !== action.payload);

  const updatedNotes = {
    ...state,
    notes: [...state.notes, unarchivedNote],
    archives: newNotes,
  };
  return updateObject(state, updatedNotes);
};

// Label
const addLabel = (state, action) => {
  const updatedLabels = {
    ...state,
    labels: [action.payload, ...state.labels],
  };
  return updateObject(state, updatedLabels);
};

const addNoteLabel = (state, action) => {
  const newNotes = state[action.noteType].map((note) =>
    note.id === action.id && !note.labels.includes(action.label)
      ? {
          ...note,
          labels: [...note.labels, action.label],
        }
      : note,
  );

  const updatedNotes = {
    ...state,
    [action.noteType]: newNotes,
  };
  return updateObject(state, updatedNotes);
};

const deleteNoteLabel = (state, action) => {
  const newNotes = state[action.noteType].map((note) =>
    note.id === action.id
      ? {
          ...note,
          labels: note.labels.filter((label) => label !== action.label),
        }
      : note,
  );

  const updatedNotes = {
    ...state,
    [action.noteType]: newNotes,
  };
  return updateObject(state, updatedNotes);
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return addNote(state, action);
    case actionTypes.DELETE_NOTE:
      return deleteNote(state, action);
    case actionTypes.UPDATE_NOTE:
      return updateNote(state, action);
    case actionTypes.CHANGE_NOTE_COLOR:
      return changeNoteColor(state, action);
    case actionTypes.TOGGLE_NOTE_PROPERTY:
      return toggleNoteProperty(state, action);
    case actionTypes.GET_EDITABLE_NOTE:
      return getEditableNote(state, action);
    case actionTypes.CLEAR_EDITABLE_NOTE:
      return clearEditableNote(state, action);
    case actionTypes.ARCHIVE_NOTE:
      return archiveNote(state, action);
    case actionTypes.UNARCHIVE_NOTE:
      return unarchiveNote(state, action);
    case actionTypes.ADD_LABEL:
      return addLabel(state, action);
    case actionTypes.ADD_NOTE_LABEL:
      return addNoteLabel(state, action);
    case actionTypes.DELETE_NOTE_LABEL:
      return deleteNoteLabel(state, action);
    default:
      return state;
  }
};

export default reducer;

// Original
// const addNoteLabel = (state, action) => {
//   const newNotes = state.notes.map((note) =>
//     note.id === action.id && !note.labels.includes(action.label)
//       ? {
//           ...note,
//           labels: [...note.labels, action.label],
//         }
//       : note,
//   );

//   const updatedNotes = {
//     ...state,
//     notes: newNotes,
//   };
//   return updateObject(state, updatedNotes);
// };

// Original
// const deleteNoteLabel = (state, action) => {
//   const newNotes = state.notes.map((note) =>
//     note.id === action.id
//       ? {
//           ...note,
//           labels: note.labels.filter((label) => label !== action.label),
//         }
//       : note,
//   );

//   const updatedNotes = {
//     ...state,
//     notes: newNotes,
//   };
//   return updateObject(state, updatedNotes);
// };
