import game from './game.route.js'
import admin from './admin.route.js'
import scores from './score.route.js'
import submissions from './submission.route.js'

export default function registerRoutes(app) {
    app.use('/api/game',game);
    app.use('/api/submissions',submissions);
    app.use('/api/admin', admin);
    app.use('/api/scores',scores);
}