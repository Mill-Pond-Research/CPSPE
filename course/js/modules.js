// Module-specific functionality for CPSPE Course Platform

// Course data structure
const courseData = {
    modules: [
        {
            id: 1,
            title: "Introduction to CPSPE",
            description: "Foundation concepts and principles of Contextual Problem-Solving Prompt Engineering",
            duration: "2 hours",
            sections: [
                {
                    id: "1.1",
                    title: "What is CPSPE?",
                    description: "Understanding the fundamentals of CPSPE",
                    duration: "30 min",
                    type: "lesson"
                },
                {
                    id: "1.2",
                    title: "The Need for Structured Approach",
                    description: "Why CPSPE is essential in modern AI interactions",
                    duration: "45 min",
                    type: "lesson"
                },
                {
                    id: "1.3",
                    title: "Module Assessment",
                    description: "Test your understanding of CPSPE basics",
                    duration: "45 min",
                    type: "quiz"
                }
            ]
        },
        // Additional modules structure follows the same pattern
    ]
};

// Module state management
class ModuleManager {
    constructor() {
        this.currentSection = null;
        this.moduleProgress = {};
    }

    // Load module content
    loadModule(moduleId) {
        const module = courseData.modules.find(m => m.id === moduleId);
        if (!module) return false;
        
        this.renderModuleContent(module);
        this.initializeModuleProgress(moduleId);
        return true;
    }

    // Initialize progress tracking for a module
    initializeModuleProgress(moduleId) {
        if (!this.moduleProgress[moduleId]) {
            this.moduleProgress[moduleId] = {
                started: new Date().toISOString(),
                completedSections: [],
                quizScores: {},
                timeSpent: 0
            };
        }
    }

    // Render module content
    renderModuleContent(module) {
        const contentContainer = document.getElementById('active-module');
        contentContainer.innerHTML = this.generateModuleHTML(module);
        this.attachModuleEventListeners(module);
    }

    // Generate HTML for module content
    generateModuleHTML(module) {
        return `
            <div class="module-header">
                <h2>${module.title}</h2>
                <p>${module.description}</p>
                <div class="module-meta">
                    <span class="duration">Duration: ${module.duration}</span>
                    <div class="progress-indicator"></div>
                </div>
            </div>
            <div class="module-sections">
                ${module.sections.map(section => this.generateSectionHTML(section)).join('')}
            </div>
        `;
    }

    // Generate HTML for section content
    generateSectionHTML(section) {
        return `
            <div class="section-card" data-section-id="${section.id}" data-section-type="${section.type}">
                <div class="section-header">
                    <span class="section-title">${section.title}</span>
                    <span class="section-duration">${section.duration}</span>
                </div>
                <p class="section-description">${section.description}</p>
                <div class="section-progress"></div>
            </div>
        `;
    }

    // Attach event listeners to module elements
    attachModuleEventListeners(module) {
        document.querySelectorAll('.section-card').forEach(card => {
            card.addEventListener('click', () => this.handleSectionClick(card, module));
        });
    }

    // Handle section click events
    handleSectionClick(card, module) {
        const sectionId = card.dataset.sectionId;
        const section = module.sections.find(s => s.id === sectionId);
        
        if (section) {
            this.loadSection(section, module);
        }
    }

    // Load section content
    loadSection(section, module) {
        this.currentSection = section;
        
        switch (section.type) {
            case 'lesson':
                this.loadLessonContent(section);
                break;
            case 'quiz':
                this.loadQuizContent(section);
                break;
            default:
                console.error('Unknown section type:', section.type);
        }
        
        this.updateSectionProgress(module.id, section.id);
    }

    // Load lesson content
    loadLessonContent(section) {
        const contentContainer = document.getElementById('active-module');
        const sectionContent = this.getLessonContent(section.id);
        
        contentContainer.innerHTML = `
            <div class="section-header">
                <h2>${section.title}</h2>
                <div class="section-meta">
                    <span class="duration">Duration: ${section.duration}</span>
                </div>
            </div>
            <div class="section-content">
                ${sectionContent}
            </div>
            <div class="section-navigation">
                <button class="nav-button prev" onclick="moduleManager.navigateSection('prev')">Previous</button>
                <button class="nav-button next" onclick="moduleManager.navigateSection('next')">Next</button>
            </div>
        `;
    }

    // Get lesson content based on section ID
    getLessonContent(sectionId) {
        // This would typically fetch content from a database or CMS
        const contentMap = {
            "1.1": `
                <div class="lesson-content">
                    <h3>Understanding CPSPE</h3>
                    <p>Contextual Problem-Solving Prompt Engineering (CPSPE) is a systematic framework for designing, crafting, and optimizing prompts for Large Language Models (LLMs) that emphasizes the critical role of context in achieving optimal outcomes.</p>
                    
                    <h4>Key Components</h4>
                    <ul>
                        <li>Contextual Analysis</li>
                        <li>Problem Decomposition</li>
                        <li>Solution Design</li>
                        <li>Implementation Strategy</li>
                    </ul>

                    <h4>Core Principles</h4>
                    <p>CPSPE is built on the following principles:</p>
                    <ol>
                        <li>Context is crucial for effective AI interaction</li>
                        <li>Systematic approaches outperform ad-hoc solutions</li>
                        <li>Problem understanding precedes solution design</li>
                        <li>Continuous iteration and improvement</li>
                    </ol>

                    <div class="interactive-element">
                        <h4>Quick Check</h4>
                        <p>What are the four key components of CPSPE?</p>
                        <div class="practice-question">
                            <input type="text" placeholder="Type your answer here">
                            <button onclick="checkAnswer(this)">Check</button>
                        </div>
                    </div>
                </div>
            `,
            "1.2": `
                <div class="lesson-content">
                    <h3>The Need for a Structured Approach</h3>
                    <p>Traditional prompt engineering often relies on intuition and trial-and-error. Here's why a structured approach is essential:</p>

                    <h4>Limitations of Ad-hoc Approaches</h4>
                    <ul>
                        <li>Inconsistent results</li>
                        <li>Poor scalability</li>
                        <li>Difficult to maintain</li>
                        <li>Limited knowledge transfer</li>
                    </ul>

                    <h4>Benefits of CPSPE</h4>
                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <h5>Consistency</h5>
                            <p>Systematic approach ensures reliable outcomes</p>
                        </div>
                        <div class="benefit-card">
                            <h5>Scalability</h5>
                            <p>Framework can be applied across different contexts</p>
                        </div>
                        <div class="benefit-card">
                            <h5>Maintainability</h5>
                            <p>Clear structure makes updates and improvements easier</p>
                        </div>
                        <div class="benefit-card">
                            <h5>Knowledge Sharing</h5>
                            <p>Framework facilitates team collaboration</p>
                        </div>
                    </div>

                    <div class="interactive-element">
                        <h4>Case Study</h4>
                        <p>Review this real-world example of CPSPE implementation:</p>
                        <div class="case-study">
                            <h5>E-commerce Product Recommendations</h5>
                            <p>See how CPSPE improved recommendation accuracy by 40%</p>
                            <button onclick="showCaseStudy()">View Case Study</button>
                        </div>
                    </div>
                </div>
            `
        };

        return contentMap[sectionId] || `<p>Content for section ${sectionId} is being developed.</p>`;
    }

    // Load quiz content
    loadQuizContent(section) {
        const contentContainer = document.getElementById('active-module');
        const quizContent = this.getQuizContent(section.id);
        
        contentContainer.innerHTML = `
            <div class="section-header">
                <h2>${section.title}</h2>
                <div class="section-meta">
                    <span class="duration">Duration: ${section.duration}</span>
                </div>
            </div>
            <div class="quiz-content">
                ${quizContent}
            </div>
        `;

        // Initialize quiz functionality
        this.initializeQuiz();
    }

    // Get quiz content based on section ID
    getQuizContent(sectionId) {
        // This would typically fetch quiz questions from a database
        const quizMap = {
            "1.3": `
                <div class="quiz-container">
                    <div class="quiz-progress">Question <span id="currentQuestion">1</span> of 5</div>
                    
                    <div class="quiz-questions">
                        <div class="quiz-question" data-question="1">
                            <h3>What is CPSPE?</h3>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a">
                                    <span>A simple prompt writing technique</span>
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b">
                                    <span>A systematic framework for context-aware prompt engineering</span>
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c">
                                    <span>A programming language for AI</span>
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d">
                                    <span>A type of machine learning model</span>
                                </label>
                            </div>
                        </div>

                        <div class="quiz-navigation">
                            <button class="quiz-button" onclick="moduleManager.submitQuiz()">Submit Answer</button>
                            <button class="quiz-button next" onclick="moduleManager.nextQuestion()">Next Question</button>
                        </div>
                    </div>
                </div>
            `
        };

        return quizMap[sectionId] || `<p>Quiz content for section ${sectionId} is being developed.</p>`;
    }

    // Initialize quiz functionality
    initializeQuiz() {
        // Add event listeners for quiz interactions
        document.querySelectorAll('.quiz-option input').forEach(input => {
            input.addEventListener('change', () => this.handleQuizSelection(input));
        });
    }

    // Handle quiz option selection
    handleQuizSelection(input) {
        // Clear previous selections in the same question
        const questionDiv = input.closest('.quiz-question');
        questionDiv.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Mark the selected option
        input.closest('.quiz-option').classList.add('selected');
    }

    // Navigate between questions
    nextQuestion() {
        const currentQuestion = parseInt(document.getElementById('currentQuestion').textContent);
        if (currentQuestion < 5) {
            document.getElementById('currentQuestion').textContent = currentQuestion + 1;
            // Load next question content
            // This would typically fetch the next question from a question bank
        }
    }

    // Submit quiz answer
    submitQuiz() {
        const selectedOption = document.querySelector('.quiz-option.selected input');
        if (!selectedOption) {
            window.app.showNotification('Please select an answer', 'warning');
            return;
        }

        // Check answer and provide feedback
        const isCorrect = selectedOption.value === 'b'; // In this example, 'b' is the correct answer
        const feedback = isCorrect ? 
            'Correct! Well done!' : 
            'Incorrect. The correct answer is: A systematic framework for context-aware prompt engineering';

        window.app.showNotification(feedback, isCorrect ? 'success' : 'error');

        // Enable next question button if available
        const nextButton = document.querySelector('.quiz-button.next');
        if (nextButton) {
            nextButton.disabled = false;
        }
    }

    // Navigate between sections
    navigateSection(direction) {
        if (!this.currentSection) return;

        const currentModule = courseData.modules.find(m => 
            m.sections.some(s => s.id === this.currentSection.id)
        );

        const currentIndex = currentModule.sections.findIndex(s => s.id === this.currentSection.id);
        let newIndex;

        if (direction === 'prev') {
            newIndex = Math.max(0, currentIndex - 1);
        } else {
            newIndex = Math.min(currentModule.sections.length - 1, currentIndex + 1);
        }

        const newSection = currentModule.sections[newIndex];
        this.loadSection(newSection, currentModule);
    }

    // Update section progress
    updateSectionProgress(moduleId, sectionId) {
        if (!this.moduleProgress[moduleId].completedSections.includes(sectionId)) {
            this.moduleProgress[moduleId].completedSections.push(sectionId);
            this.updateModuleProgress(moduleId);
        }
    }

    // Update overall module progress
    updateModuleProgress(moduleId) {
        const module = courseData.modules.find(m => m.id === moduleId);
        const progress = this.moduleProgress[moduleId];
        
        const totalSections = module.sections.length;
        const completedSections = progress.completedSections.length;
        
        const progressPercentage = Math.round((completedSections / totalSections) * 100);
        
        // Update progress in the UI
        window.app.updateProgress();
        
        // Check if module is completed
        if (progressPercentage === 100) {
            this.handleModuleCompletion(moduleId);
        }
    }

    // Handle module completion
    handleModuleCompletion(moduleId) {
        // Update global progress
        window.app.state.progress[moduleId] = {
            completed: true,
            completedAt: new Date().toISOString(),
            score: this.calculateModuleScore(moduleId)
        };
        
        // Save progress
        window.app.saveUserData();
        
        // Show completion notification
        window.app.showNotification(`Congratulations! You've completed Module ${moduleId}`, 'success');
        
        // Check for achievements
        this.checkAchievements(moduleId);
    }

    // Calculate module score
    calculateModuleScore(moduleId) {
        const quizScores = this.moduleProgress[moduleId].quizScores;
        if (Object.keys(quizScores).length === 0) return 100;
        
        const totalScore = Object.values(quizScores).reduce((sum, score) => sum + score, 0);
        return Math.round(totalScore / Object.keys(quizScores).length);
    }

    // Check for achievements
    checkAchievements(moduleId) {
        // Implementation for checking and awarding achievements
        // This will be populated with actual achievement logic
    }
}

// Initialize module manager
const moduleManager = new ModuleManager();

// Export necessary functions and objects
window.courseData = courseData;
window.moduleManager = moduleManager; 