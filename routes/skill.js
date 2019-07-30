const SkillController = require('../controllers/skill');
const AuthMiddleware = require('../middleware/auth');

const authMiddlewareAdmin = [AuthMiddleware.requireLogin, AuthMiddleware.requireAdmin];

module.exports = router => {
  router.param('skillId', (req, res, next, skillId) => {
    const Skill = require('../models/skill');
    Skill.findById(skillId, (err, skill) => {
      if (err) return next(err);
      req.skill = skill;
      next();
    });
  });

  // views
  router.get('/skills', AuthMiddleware.requireLogin, SkillController.showSkills);

  // apis
  router.get('/api/skills', SkillController.getSkills);
  router.post('/api/skills', authMiddlewareAdmin, SkillController.createSkill);
  router.put('/api/skills/:skillId', authMiddlewareAdmin, SkillController.updateSkill);
  router.get('/api/skills/:skillId/delete', authMiddlewareAdmin, SkillController.removeSkill);
};