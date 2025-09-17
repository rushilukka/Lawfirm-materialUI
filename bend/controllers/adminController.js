const adminService = require('../services/adminService');

class AdminController {
  async getDashboardStats(req, res) {
    try {
      const stats = await adminService.getDashboardStats();
      res.json(stats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching dashboard stats." });
    }
  }
}

module.exports = new AdminController();
