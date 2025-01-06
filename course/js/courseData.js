// Course data structure for CPSPE Course Platform

const courseData = {
    title: "Contextual Problem-Solving Prompt Engineering",
    description: "Master the art and science of context-aware prompt engineering",
    totalDuration: "32 hours",
    modules: [
        {
            id: 1,
            title: "Introduction to CPSPE",
            description: "Foundation concepts and principles of Contextual Problem-Solving Prompt Engineering",
            duration: "4 hours",
            prerequisites: [],
            sections: [
                {
                    id: "1.1",
                    title: "What is CPSPE?",
                    description: "Understanding the fundamentals of CPSPE",
                    duration: "45 min",
                    type: "lesson",
                    content: {
                        type: "text",
                        body: `
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
                            <ol>
                                <li>Context is crucial for effective AI interaction</li>
                                <li>Systematic approaches outperform ad-hoc solutions</li>
                                <li>Problem understanding precedes solution design</li>
                                <li>Continuous iteration and improvement</li>
                            </ol>
                        `
                    }
                },
                {
                    id: "1.2",
                    title: "The Need for Structured Approach",
                    description: "Why CPSPE is essential in modern AI interactions",
                    duration: "45 min",
                    type: "lesson",
                    content: {
                        type: "text",
                        body: `
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
                        `
                    }
                },
                {
                    id: "1.3",
                    title: "Module Assessment",
                    description: "Test your understanding of CPSPE basics",
                    duration: "30 min",
                    type: "quiz",
                    content: {
                        type: "quiz",
                        questions: [
                            {
                                id: "q1_1",
                                question: "What is CPSPE?",
                                options: [
                                    "A simple prompt writing technique",
                                    "A systematic framework for context-aware prompt engineering",
                                    "A programming language for AI",
                                    "A type of machine learning model"
                                ],
                                correctAnswer: 1,
                                explanation: "CPSPE is a systematic framework that emphasizes context in prompt engineering"
                            },
                            {
                                id: "q1_2",
                                question: "Which is NOT a key component of CPSPE?",
                                options: [
                                    "Contextual Analysis",
                                    "Problem Decomposition",
                                    "Random Testing",
                                    "Solution Design"
                                ],
                                correctAnswer: 2,
                                explanation: "Random Testing is not a component of CPSPE. The framework emphasizes systematic approaches."
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 2,
            title: "Contextual Analysis",
            description: "Learn how to analyze and understand context for effective prompt engineering",
            duration: "4 hours",
            prerequisites: [1],
            sections: [
                {
                    id: "2.1",
                    title: "Understanding Context",
                    description: "What constitutes context in prompt engineering",
                    duration: "45 min",
                    type: "lesson",
                    content: {
                        type: "text",
                        body: `
                            <h3>Understanding Context in Prompt Engineering</h3>
                            <p>Context is the foundation of effective prompt engineering. It encompasses:</p>
                            
                            <ul>
                                <li>User Intent</li>
                                <li>Domain Knowledge</li>
                                <li>Constraints</li>
                                <li>Expected Outcomes</li>
                            </ul>
                        `
                    }
                }
            ]
        }
    ]
};

// Export the course data
window.courseData = courseData; 