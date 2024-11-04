const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, res) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id, title, tags, body, createdAt, updatedAt
  };

  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess){
    const response = res.response({
      status : 'success',
      meesage : 'Catatan Berhasil ditambahkan',
      data : {
        noteId : id
      }

    }).code(201);

    return response;
  }

  const response = res.response({
    status : 'fail',
    message : 'Catatan gagal ditambahkan'
  }).code(500);

  return response;
};

const getAllNotesHandler = () => ({
  status : 'success',
  data : {
    notes
  },
});

const getNoteById = (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);

  if (note){
    return {
      status : 'success',
      data : {
        note
      }
    };
  }

  const response = res.response({
    status : 'failed',
    messaga : 'note tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, res) => {
  const id = req.params.id;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id == id);

  if (index !== -1){

    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    };
    const response = res.response({
      status : 'success',
      message : 'Note Berhasil dipebarui'
    });
    response.code(200);
    return response;
  }

  const response = res.response({
    status : 'failed',
    meesahe : 'Gagal Memperbarui note. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1){
    notes.splice(index, 1);
    const response = res.response({
      status : 'success',
      message : 'Berhasil Menghapus Note'
    });
    response.code(200);
    return response;
  }

  const response = res.response({
    status : 'failed',
    message : 'Gagal menghapus data, Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteById,
  editNoteByIdHandler,
  deleteNoteByIdHandler
};