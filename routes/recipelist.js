/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const express = require('express');
const recipeModel = require('../models/recipes');
const userModel = require('../models/userModel');

const router = express.Router();


router.get('/', async (req, res, next) => {
  const recipeNames = await recipeModel.getAll();
  // console.log(recipeNames);
  res.json(recipeNames).status(200);
});

router.get('/:id?', async (req, res) => {
  const { id } = req.params;
  // const { user_id } = req.session;
  const recipeInfo = await recipeModel.getOne(id);
  const submittedBy = await recipeModel.getReviewer(id);
  const comments = await recipeModel.getComments(id);
  const commenter = await userModel.getCommenter(id);
  res.json([recipeInfo, submittedBy, commenter]).status(200);
});

router.post('/', async (req, res) => {
  const {
    user_id, first_name, last_name, title, rating, ingredients, directions, img_upload,
  } = req.body;
  recipeModel.addRecipe(title, rating, directions, ingredients, img_upload, user_id);
  res.redirect(200, '/recipelist');
});

router.post('/:id', async (req, res) => {
  // const { id } = req.params;
  const {
    title, user_id, rating, comment,
  } = req.body;
  // hard coded ID for now
  userModel.leaveComment(title, comment, rating, user_id, 3);
  res.status(200);
});

module.exports = router;
