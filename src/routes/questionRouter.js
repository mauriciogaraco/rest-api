const express = require('express');
const router = express.Router();

const Question = require('../models/Question')
/*const {createTask, getTask} = require('../controllers/issues')

router.get('/',getTask)
;
router.post('/newIssues',(req,resp)=>{
    resp.json({
        ok:true
    })
});
router.post('/task',createTask);*/
// Ruta para agregar una nueva pregunta

router.post('/questions', async (req, res) => {
    try {
      const { name, description, category } = req.body;
      const nuevaPregunta = new Question({ name, description, category });
      const preguntaGuardada = await nuevaPregunta.save();
      res.status(201).json(preguntaGuardada);
    } catch (error) {
      console.error('Error al guardar la nueva pregunta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta para obtener todas las preguntas
  router.get('/questions', async (req, res) => {
    try {
      const preguntas = await Question.find();
      res.json(preguntas);
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
module.exports = router;