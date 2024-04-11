const express = require('express');
const router = express.Router();

const {createTask, getTask} = require('../controllers/issues')

router.get('/',getTask)
;
router.post('/newIssues',(req,resp)=>{
    resp.json({
        ok:true
    })
});
router.post('/task',createTask);

module.exports = router;