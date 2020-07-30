const model = require('../Models/model.js');

// controllers for explore page
const ideaController = {};

// middleware to get all ideas data from database
ideaController.getIdeas = (req, res, next) => {
  // query text will join tables for ideas, idea_tech_stacks, and tech_stacks
  // then aggregate the tech stack names into an array
  const queryText = `SELECT Ideas.*, array_agg(tech_stacks.name) AS techstacks FROM Ideas 
    JOIN Idea_tech_stacks ON Idea_tech_stacks.idea_id = Ideas.idea_id 
    JOIN tech_stacks ON tech_stacks.tech_id=Idea_tech_stacks.tech_id 
    GROUP BY Ideas.idea_id`;

  model.query(queryText, (err, results) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at getIdeas middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
    // console.log('results', results.rows);
    res.locals.ideas = results.rows;
    return next();
  });
};

// INSERT INTO Ideas (name, description, why, when_start, when_end, who, image, creator_username) VALUES ('scratch', 'scratch project', 'for fun', '2020-07-25', '2020-08-15', '3', 'image.png', 'hello1');

// we need to know who's submitting the idea
ideaController.submitIdea = async (req, res, next) => {
  const { name, description, why, techStack, whenStart, imageURL, username } = req.body;

  let { whenEnd, teamNumber } = req.body;

  teamNumber = Number(teamNumber);
  whenEnd = whenEnd || null;
  const imgCol = imageURL ? ', image' : '';
  const imgVal = imageURL ? ', $8' : '';
  const queryText1 = `INSERT INTO Ideas (name, description, why, when_start, when_end, who, creator_username${imgCol}) VALUES ($1, $2, $3, $4, $5, $6, $7${imgVal}) RETURNING idea_id`;
  const queryValue1 = [name, description, why, whenStart, whenEnd, teamNumber, username];
  if (imageURL) queryValue1.push(imageURL);

  try {
    const result = await model.query(queryText1, queryValue1);
    const addedIdeaId = result.rows[0].idea_id;

    // separate query to insert tech stacks into idea_tech_stacks
    let queryText2 = '';
    const queryValue2 = [];
    for (let i = 0; i < techStack.length; i += 1) {
      queryValue2.push(addedIdeaId, techStack[i]);
    }

    for (let i = 1; i <= queryValue2.length; i += 2) {
      queryText2 += `INSERT INTO Idea_tech_stacks (idea_id, tech_id) VALUES ($${i}, $${i + 1}); `;
    }

    await model.query(queryText2, queryValue2);
    return next();
  } catch (err) {
    return next({ log: err });
  }
};

// need to set up route for this
ideaController.getOneIdea = async (req, res, next) => {
  const id = req.params.ideaID;
  try {
    const ideasQueryText = `SELECT * FROM Ideas 
    JOIN Users 
    ON ideas.creator_username = users.username    
    WHERE idea_id=${id}`;
    const ideaDetail = await model.query(ideasQueryText);
    // rows will only contain one. ok to destructure
    [res.locals.idea] = ideaDetail.rows;

    const participantQueryText = `SELECT * 
    FROM idea_participants 
    JOIN users
    ON idea_participants.participant_username = users.username
    WHERE idea_id = ${id}`;
    const participants = await model.query(participantQueryText);
    // will return array of objects
    res.locals.idea = { ...res.locals.idea, participants: participants.rows };

    const stackQueryText = `SELECT * FROM idea_tech_stacks 
    JOIN tech_stacks 
    ON tech_stacks.tech_id = idea_tech_stacks.tech_id
    WHERE idea_id = ${id}`;
    const techStacks = await model.query(stackQueryText);
    res.locals.idea = { ...res.locals.idea, techStacks: techStacks.rows };

    return next();
  } catch (err) {
    return next({
      log: `error occurred at getOneIdea middleware. error message is: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = ideaController;
