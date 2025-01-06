// Main JavaScript functionality for CPSPE Course Platform

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Global state management
const state = {
    currentUser: null,
    currentModule: null,
    progress: {},
    achievements: [],
    lastActive: null
};

// Add user authentication state
const auth = {
    currentUser: null,
    isAuthenticated: false,
    sessionToken: null
};

// Initialize the application
function initializeApp() {
    if (!checkSession()) {
        window.location.href = './login.html';
        return;
    }
    
    loadUserData();
    renderModules();
    updateProgress();
    initializeEventListeners();
    startAutoSave();
}

// Load user data from localStorage or set defaults
function loadUserData() {
    if (!auth.isAuthenticated) return;
    
    const savedData = localStorage.getItem(`userData_${auth.currentUser.id}`);
    if (savedData) {
        const userData = JSON.parse(savedData);
        state.currentUser = userData.currentUser;
        state.progress = userData.progress;
        state.achievements = userData.achievements;
        state.lastActive = userData.lastActive;
    } else {
        // Set default state
        state.currentUser = {
            name: auth.currentUser.name,
            id: auth.currentUser.id,
            startDate: new Date().toISOString()
        };
        state.progress = {};
        state.achievements = [];
        state.lastActive = new Date().toISOString();
        saveUserData();
    }
    updateUserInterface();
}

// Save user data to localStorage
function saveUserData() {
    if (!auth.isAuthenticated) return;
    
    localStorage.setItem(`userData_${auth.currentUser.id}`, JSON.stringify({
        currentUser: state.currentUser,
        progress: state.progress,
        achievements: state.achievements,
        lastActive: new Date().toISOString()
    }));
}

// Generate a unique user ID
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Update the user interface with current data
function updateUserInterface() {
    if (!auth.isAuthenticated) return;
    
    // Update user name
    document.getElementById('userName').textContent = auth.currentUser.name;
    
    // Update progress indicators
    updateProgressIndicators();
    
    // Update achievement badges
    updateAchievements();
    
    // Update streak
    updateStreak();
    
    // Show authenticated UI elements
    document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.guest-only').forEach(el => el.style.display = 'none');
}

// Initialize event listeners
function initializeEventListeners() {
    // Module card clicks
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', handleModuleClick);
    });

    // Navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Start course button
    const startButton = document.querySelector('.cta-button');
    if (startButton) {
        startButton.addEventListener('click', startCourse);
    }
}

// Handle module card clicks
function handleModuleClick(event) {
    const moduleId = event.currentTarget.dataset.moduleId;
    if (isModuleLocked(moduleId)) {
        showNotification('Complete the previous module first!', 'warning');
        return;
    }
    loadModule(moduleId);
}

// Check if a module is locked
function isModuleLocked(moduleId) {
    if (moduleId === '1') return false;
    const previousModule = String(Number(moduleId) - 1);
    return !isModuleCompleted(previousModule);
}

// Check if a module is completed
function isModuleCompleted(moduleId) {
    return state.progress[moduleId]?.completed || false;
}

// Load a specific module
function loadModule(moduleId) {
    state.currentModule = moduleId;
    hideAllSections();
    showModuleContent(moduleId);
    updateProgress();
    saveUserData();
}

// Show module content
function showModuleContent(moduleId) {
    const moduleContent = document.getElementById('active-module');
    moduleContent.classList.remove('hidden');
    
    // Load module content
    const module = courseData.modules[moduleId - 1];
    moduleContent.innerHTML = generateModuleHTML(module);
    
    // Initialize module-specific interactions
    initializeModuleInteractions(module);
}

// Generate HTML for module content
function generateModuleHTML(module) {
    return `
        <div class="module-header">
            <h2>${module.title}</h2>
            <p>${module.description}</p>
        </div>
        <div class="module-sections">
            ${module.sections.map(section => generateSectionHTML(section)).join('')}
        </div>
    `;
}

// Generate HTML for section content
function generateSectionHTML(section) {
    return `
        <div class="section-card" data-section-id="${section.id}">
            <div class="section-header">
                <span class="section-title">${section.title}</span>
                <span class="section-duration">${section.duration}</span>
            </div>
            <p>${section.description}</p>
        </div>
    `;
}

// Initialize module-specific interactions
function initializeModuleInteractions(module) {
    document.querySelectorAll('.section-card').forEach(card => {
        card.addEventListener('click', () => handleSectionClick(card, module));
    });
}

// Handle section clicks
function handleSectionClick(card, module) {
    const sectionId = card.dataset.sectionId;
    loadSection(module, sectionId);
}

// Load section content
function loadSection(module, sectionId) {
    // Implementation will depend on section type and content
    console.log(`Loading section ${sectionId} of module ${module.id}`);
}

// Update progress indicators
function updateProgressIndicators() {
    const totalModules = Object.keys(courseData.modules).length;
    const completedCount = Object.values(state.progress).filter(p => p.completed).length;
    
    // Update progress circle
    const progressCircle = document.getElementById('overallProgress');
    const progressPercentage = Math.round((completedCount / totalModules) * 100);
    progressCircle.textContent = `${progressPercentage}%`;
    
    // Update dashboard progress
    const dashboardProgress = document.getElementById('dashboardProgress');
    if (dashboardProgress) {
        dashboardProgress.textContent = `${progressPercentage}%`;
    }
    
    // Update completed modules count
    const completedModules = document.getElementById('completedModules');
    if (completedModules) {
        completedModules.textContent = `${completedCount}/${totalModules}`;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Implementation for showing notifications
    console.log(`${type}: ${message}`);
}

// Hide all main sections
function hideAllSections() {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
}

// Start the course
function startCourse() {
    loadModule('1');
    window.location.hash = '#modules';
}

// Handle navigation
function handleNavigation(event) {
    event.preventDefault();
    const target = event.currentTarget.getAttribute('href').substring(1);
    hideAllSections();
    document.getElementById(target).classList.remove('hidden');
    window.location.hash = target;
}

// Update streak
function updateStreak() {
    const lastActive = new Date(state.lastActive);
    const today = new Date();
    const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
    
    const streakElement = document.getElementById('activeStreak');
    if (streakElement) {
        const streak = diffDays <= 1 ? (state.streak || 0) + 1 : 0;
        state.streak = streak;
        streakElement.textContent = `${streak} days`;
        saveUserData();
    }
}

// Add authentication methods
function login(email, password) {
    // In a real implementation, this would make an API call
    // For demo purposes, we'll use localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (user && user.password === hashPassword(password)) {
        auth.currentUser = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        auth.isAuthenticated = true;
        auth.sessionToken = generateSessionToken();
        localStorage.setItem('sessionToken', auth.sessionToken);
        updateUserInterface();
        return true;
    }
    return false;
}

function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        return false; // User already exists
    }
    
    const newUser = {
        id: generateUserId(),
        name,
        email,
        password: hashPassword(password)
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return login(email, password);
}

function logout() {
    auth.currentUser = null;
    auth.isAuthenticated = false;
    auth.sessionToken = null;
    localStorage.removeItem('sessionToken');
    state.currentUser = null;
    window.location.href = './login.html';
}

// Add session management
function checkSession() {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
        // In a real implementation, validate token with server
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.sessionToken === sessionToken);
        if (user) {
            auth.currentUser = {
                id: user.id,
                email: user.email,
                name: user.name
            };
            auth.isAuthenticated = true;
            auth.sessionToken = sessionToken;
            return true;
        }
    }
    return false;
}

// Utility functions
function hashPassword(password) {
    // In a real implementation, use a proper hashing algorithm
    return btoa(password); // This is NOT secure, just for demo
}

function generateSessionToken() {
    return 'session_' + Math.random().toString(36).substr(2);
}

// Add auto-save functionality
function startAutoSave() {
    setInterval(() => {
        if (auth.isAuthenticated) {
            saveUserData();
        }
    }, 60000); // Save every minute
}

// Export necessary functions for other modules
window.app = {
    state,
    loadModule,
    updateProgress: updateProgressIndicators,
    showNotification
}; 