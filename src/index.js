const { checkCookie, getReviews } = require('./utils/apicall');
const answerReview = require('./utils/answerReview.js');
const checkConfigFiles = require('./utils/checkFiles.js');
const Logger = require('@endylus/logger');
const log = new Logger();

process.title = `ItemSatis Automatic Commenter`;

let globalReviews = [];

(async () => {
    try {
        await checkConfigFiles();
        const cookieCheck = await checkCookie();
        if (!cookieCheck.success || !cookieCheck) {
            log.error("Session_id Invalid. Please check your session_id.");
            process.exit(1);
        }
        log.info('Reviews Controler started');
        setInterval(checkReviews, 5000);
    } catch (error) {
        log.error(error.message);
    }
})();

async function checkReviews() {
    try {
        const newData = await getReviews();
        let errMessage = !newData ? "New reviews not found" : !newData.success ? newData.message : null;
        if (errMessage) {
            log.warn(errMessage);
            return;
        }

        const newReviews = newData.filter(x => !globalReviews.some(y => y.Id === x.Id));
        if (newReviews.length > 0) {
            for (let i = 0; i < newReviews.length; i++) {
                const review = newReviews[i];
                log.info(`New review by ${review.UserName}: Title: ${review.Title} | Message: ${review.Message} | Average: ${review.Average}/10`);
                await answerReview(review);
            }
            globalReviews = newData;
        }
    } catch (error) {
        log.error(error.message);
    }
}