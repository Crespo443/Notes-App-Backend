const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteById,
  editNoteByIdHandler,
  deleteNoteByIdHandler
} = require('./handler');

const routes = [
  {
    method :'POST',
    path   : '/notes',
    handler : addNoteHandler
  },

  {
    method :'GET',
    path   :'/notes',
    handler : getAllNotesHandler
  },

  {
    method : 'GET',
    path   : '/notes/{id}',
    handler : getNoteById
  },

  {
    method : 'PUT',
    path   : '/notes/{id}',
    handler : editNoteByIdHandler
  },

  {
    method : 'DELETE',
    path   : '/notes/{id}',
    handler : deleteNoteByIdHandler
  }

];

module.exports = routes;