// Progress tracking functionality for CPSPE Course Platform

class ProgressTracker {
    constructor() {
        this.achievements = {
            quickLearner: {
                id: 'quickLearner',
                title: 'Quick Learner',
                description: 'Complete a module in under 1 hour',
                icon: '⚡'
            },
            perfectScore: {
                id: 'perfectScore',
                title: 'Perfect Score',
                description: 'Achieve 100% on a module quiz',
                icon: '🎯'
            },
            streakMaster: {
                id: 'streakMaster',
                title: 'Streak Master',
                description: 'Maintain a 7-day learning streak',
                icon: '🔥'
            },
            completionist: {
                id: 'completionist',
                title: 'Completionist',
                description: 'Complete all modules',
                icon: '🏆'
            },
            fastLearner: {
                id: 'fastLearner',
                title: 'Fast Learner',
                description: 'Complete 3 lessons in one day',
                icon: '🚀'
            },
            knowledgeSeeker: {
                id: 'knowledgeSeeker',
                title: 'Knowledge Seeker',
                description: 'Score above 90% in 3 consecutive quizzes',
                icon: '📚'
            }
        };

        // Add new tracking metrics
        this.metrics = {
            timeSpentToday: 0,
            lastActiveDate: null,
            completedLessonsToday: 0,
            quizStreak: 0
        };
    }

    // Initialize progress tracking
    initialize() {
        this.loadMetrics();
        this.renderProgressDashboard();
        this.initializeCharts();
        this.updateAchievements();
        this.startTimeTracking();
    }

    // Render progress dashboard
    renderProgressDashboard() {
        const dashboard = document.querySelector('.progress-dashboard');
        if (!dashboard) return;

        this.updateOverallStats();
        this.updateModuleProgress();
        this.updateAchievementDisplay();

        // Add time tracking display
        const timeSpentToday = Math.floor(this.metrics.timeSpentToday / 60); // Convert to minutes
        const timeSpentElement = document.createElement('div');
        timeSpentElement.className = 'stat-card';
        timeSpentElement.innerHTML = `
            <h3>Time Spent Today</h3>
            <div>${timeSpentToday} minutes</div>
        `;
        document.querySelector('.overall-stats')?.appendChild(timeSpentElement);
    }

    // Update overall statistics
    updateOverallStats() {
        const stats = this.calculateOverallStats();
        
        // Update completed modules
        const completedModules = document.getElementById('completedModules');
        if (completedModules) {
            completedModules.textContent = `${stats.completed}/${stats.total}`;
        }

        // Update overall progress
        const overallProgress = document.getElementById('dashboardProgress');
        if (overallProgress) {
            overallProgress.textContent = `${stats.percentage}%`;
        }

        // Update streak
        const streakElement = document.getElementById('activeStreak');
        if (streakElement) {
            streakElement.textContent = `${stats.streak} days`;
        }
    }

    // Calculate overall statistics
    calculateOverallStats() {
        const progress = window.app.state.progress;
        const totalModules = Object.keys(window.courseData.modules).length;
        const completedModules = Object.values(progress).filter(p => p.completed).length;
        
        return {
            total: totalModules,
            completed: completedModules,
            percentage: Math.round((completedModules / totalModules) * 100),
            streak: window.app.state.streak || 0
        };
    }

    // Update module progress display
    updateModuleProgress() {
        const moduleProgress = document.querySelector('.module-progress');
        if (!moduleProgress) return;

        moduleProgress.innerHTML = window.courseData.modules.map(module => 
            this.generateModuleProgressHTML(module)
        ).join('');
    }

    // Generate HTML for module progress
    generateModuleProgressHTML(module) {
        const progress = window.app.state.progress[module.id] || { completed: false };
        const percentage = progress.completed ? 100 : 0;

        return `
            <div class="progress-item">
                <div class="progress-label">Module ${module.id}: ${module.title}</div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-percentage">${percentage}%</div>
            </div>
        `;
    }

    // Initialize progress charts
    initializeCharts() {
        // Implementation for initializing progress visualization charts
        // This will be populated with actual chart initialization code
    }

    // Update achievements
    updateAchievements() {
        const achievementsContainer = document.querySelector('.achievements');
        if (!achievementsContainer) return;

        achievementsContainer.innerHTML = Object.values(this.achievements)
            .map(achievement => this.generateAchievementHTML(achievement))
            .join('');
    }

    // Generate HTML for achievement badges
    generateAchievementHTML(achievement) {
        const isUnlocked = this.isAchievementUnlocked(achievement.id);
        const lockedClass = isUnlocked ? '' : 'locked';

        return `
            <div class="achievement-badge">
                <div class="badge-icon ${lockedClass}">${achievement.icon}</div>
                <div class="badge-name">${achievement.title}</div>
                <div class="badge-description">${achievement.description}</div>
            </div>
        `;
    }

    // Check if achievement is unlocked
    isAchievementUnlocked(achievementId) {
        return window.app.state.achievements.includes(achievementId);
    }

    // Check for new achievements
    checkAchievements() {
        this.checkQuickLearner();
        this.checkPerfectScore();
        this.checkStreakMaster();
        this.checkCompletionist();
    }

    // Achievement checks
    checkQuickLearner() {
        const modules = Object.values(window.app.state.progress);
        const quickModule = modules.find(module => {
            if (!module.completed || !module.startTime) return false;
            const duration = new Date(module.completedAt) - new Date(module.startTime);
            return duration < 3600000; // 1 hour in milliseconds
        });

        if (quickModule) {
            this.unlockAchievement('quickLearner');
        }
    }

    checkPerfectScore() {
        const modules = Object.values(window.app.state.progress);
        const perfectModule = modules.find(module => module.score === 100);
        
        if (perfectModule) {
            this.unlockAchievement('perfectScore');
        }
    }

    checkStreakMaster() {
        if (window.app.state.streak >= 7) {
            this.unlockAchievement('streakMaster');
        }
    }

    checkCompletionist() {
        const totalModules = window.courseData.modules.length;
        const completedModules = Object.values(window.app.state.progress)
            .filter(module => module.completed).length;
        
        if (completedModules === totalModules) {
            this.unlockAchievement('completionist');
        }
    }

    // Unlock achievement
    unlockAchievement(achievementId) {
        if (!this.isAchievementUnlocked(achievementId)) {
            window.app.state.achievements.push(achievementId);
            window.app.saveUserData();
            this.showAchievementNotification(achievementId);
            this.updateAchievements();
        }
    }

    // Show achievement notification
    showAchievementNotification(achievementId) {
        const achievement = this.achievements[achievementId];
        window.app.showNotification(
            `Achievement Unlocked: ${achievement.title}`,
            'achievement'
        );
    }

    // Add new method for tracking time spent
    trackTimeSpent(seconds) {
        const today = new Date().toDateString();
        if (this.metrics.lastActiveDate !== today) {
            this.metrics.timeSpentToday = 0;
            this.metrics.completedLessonsToday = 0;
            this.metrics.lastActiveDate = today;
        }
        this.metrics.timeSpentToday += seconds;
        this.saveMetrics();
        this.checkTimeBasedAchievements();
    }

    // Add new method for tracking lesson completion
    trackLessonCompletion(lessonId) {
        const today = new Date().toDateString();
        if (this.metrics.lastActiveDate !== today) {
            this.metrics.completedLessonsToday = 0;
        }
        this.metrics.completedLessonsToday++;
        this.metrics.lastActiveDate = today;
        this.saveMetrics();
        this.checkLessonAchievements();
    }

    // Add new method for tracking quiz completion
    trackQuizCompletion(quizId, score) {
        if (score >= 90) {
            this.metrics.quizStreak++;
            if (this.metrics.quizStreak >= 3) {
                this.unlockAchievement('knowledgeSeeker');
            }
        } else {
            this.metrics.quizStreak = 0;
        }
        this.saveMetrics();
    }

    // Add new method for saving metrics
    saveMetrics() {
        localStorage.setItem('cpspeMetrics', JSON.stringify(this.metrics));
    }

    // Add new method for loading metrics
    loadMetrics() {
        const savedMetrics = localStorage.getItem('cpspeMetrics');
        if (savedMetrics) {
            this.metrics = JSON.parse(savedMetrics);
        }
    }

    // Add new method for time tracking
    startTimeTracking() {
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                this.trackTimeSpent(30); // Track every 30 seconds
            }
        }, 30000);
    }

    // Add new achievement checks
    checkTimeBasedAchievements() {
        if (this.metrics.timeSpentToday >= 7200) { // 2 hours
            this.unlockAchievement('dedicated');
        }
    }

    checkLessonAchievements() {
        if (this.metrics.completedLessonsToday >= 3) {
            this.unlockAchievement('fastLearner');
        }
    }
}

// Initialize progress tracker
const progressTracker = new ProgressTracker();

// Export progress tracker
window.progressTracker = progressTracker; 