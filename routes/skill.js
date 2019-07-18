const SkillController = require('../controllers/skill');
const AuthMiddleware = require('../middleware/auth');

const authMiddlewareAdmin = [AuthMiddleware.requireLogin, AuthMiddleware.requireAdmin];

module.exports = router => {
  // views
  router.get('/skills', AuthMiddleware.requireLogin, SkillController.showSkills);
  router.get('/skills/create', authMiddlewareAdmin, SkillController.showCreateSkill);
  router.get('/skills/:id', AuthMiddleware.requireLogin, SkillController.showSkill);

  // apis
  router.get('/api/skills', SkillController.getSkills);
  router.post('/api/skills/create', authMiddlewareAdmin, SkillController.createSkill);
  router.put('/api/skills/:id', authMiddlewareAdmin, SkillController.updateSkill);
  router.get('/api/skills/:id/delete', authMiddlewareAdmin, SkillController.removeSkill);
};