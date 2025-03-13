import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Code,
  Database,
  Server,
  Settings,
  FileCode,
  GitBranch,
  CheckCircle,
  Search,
  Moon,
  Sun,
  Brain,
  Book,
  Coffee,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  sections: Section[];
}

interface Section {
  id: string;
  title: string;
  content: QuestionAnswer[];
}

interface QuestionAnswer {
  question: string;
  answer: string;
  codeExample?: string;
  practiceExercise?: {
    question: string;
    hint: string;
    solution: string;
  };
}

interface Progress {
  [key: string]: boolean;
}

function App() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);
  const toggleProgress = (sectionId: string, index: number) => {
    const key = `${sectionId}-${index}`;
    setProgress((prevProgress) => ({
      ...prevProgress,
      [key]: !prevProgress[key],
    }));
  };
  const topics: Topic[] = [
    {
      id: 'java-core',
      title: 'Core Java',
      icon: <Coffee className="w-6 h-6" />,
      sections: [
        {
          id: 'oop',
          title: 'OOP Principles',
          content: [
            {
              question:
                'Can you explain the four pillars of OOP with examples?',
              answer: `The four pillars of Object-Oriented Programming (OOP) are:
  
  1. Encapsulation: Bundling data and methods that operate on that data within a single unit.
  2. Inheritance: Mechanism that allows a class to inherit properties and methods from another class.
  3. Polymorphism: Ability of objects to take multiple forms.
  4. Abstraction: Hiding complex implementation details and showing only necessary features.`,
              codeExample: `// Encapsulation Example
  public class BankAccount {
      private double balance;
      
      public void deposit(double amount) {
          if (amount > 0) {
              balance += amount;
          }
      }
  }`,
            },
          ],
        },
      ],
    },
    {
      id: 'spring-boot',
      title: 'Spring Boot',
      icon: <Server className="w-6 h-6" />,
      sections: [
        {
          id: 'basics',
          title: 'Spring Boot Basics',
          content: [
            {
              question: 'What is Spring Boot and its key features?',
              answer: `Spring Boot is a framework that simplifies the development of Spring applications. Key features include:
  
  1. Auto-configuration
  2. Standalone applications
  3. Embedded servers
  4. Production-ready features
  5. No code generation and no XML configuration`,
              codeExample: `@SpringBootApplication
  public class MyApplication {
      public static void main(String[] args) {
          SpringApplication.run(MyApplication.class, args);
      }
  }`,
            },
          ],
        },
      ],
    },
    {
      id: 'spring-mvc',
      title: 'Spring MVC',
      icon: <GitBranch className="w-6 h-6" />,
      sections: [
        {
          id: 'architecture',
          title: 'MVC Architecture',
          content: [
            {
              question: 'What is Spring MVC architecture?',
              answer: `Spring MVC follows the Model-View-Controller pattern:
  
  1. Model: Represents data and business logic
  2. View: Handles data presentation
  3. Controller: Manages user interaction`,
              codeExample: `@Controller
  public class UserController {
      @GetMapping("/users")
      public String listUsers(Model model) {
          model.addAttribute("users", userService.getAllUsers());
          return "users";
      }
  }`,
            },
          ],
        },
      ],
    },
    {
      id: 'hibernate',
      title: 'Hibernate',
      icon: <Database className="w-6 h-6" />,
      sections: [
        {
          id: 'orm',
          title: 'ORM Basics',
          content: [
            {
              question: 'What is Hibernate, and why is it used?',
              answer: `Hibernate is an ORM (Object-Relational Mapping) framework that simplifies database interactions in Java. Key benefits:
  
  - Reduces boilerplate JDBC code
  - Provides automatic transaction management
  - Supports caching and performance optimizations`,
              codeExample: `@Entity
  @Table(name = "users")
  public class User {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;
  
      private String name;
      private String email;
  }`,
            },
          ],
        },
      ],
    },
    {
      id: 'microservices',
      title: 'Microservices',
      icon: <Settings className="w-6 h-6" />,
      sections: [
        {
          id: 'basics',
          title: 'Microservices Architecture',
          content: [
            {
              question:
                'What are microservices, and how do they differ from monolithic applications?',
              answer: `Microservices is an architectural style that structures an application as a collection of small, independent services. Key differences:
  
  - Microservices are loosely coupled, whereas monolithic apps are tightly coupled.
  - Each microservice can be developed, deployed, and scaled independently.
  - Microservices communicate via APIs, often using REST or messaging queues.`,
              codeExample: `@RestController
  @RequestMapping("/products")
  public class ProductService {
      @GetMapping
      public List<Product> getAllProducts() {
          return productService.getAllProducts();
      }
  }`,
            },
          ],
        },
      ],
    },
    {
      id: 'docker',
      title: 'Docker',
      icon: <FileCode className="w-6 h-6" />,
      sections: [
        {
          id: 'containers',
          title: 'Understanding Containers',
          content: [
            {
              question: 'What is Docker, and why is it used?',
              answer: `Docker is a platform for developing, shipping, and running applications inside lightweight, portable containers. Key advantages:
  
  - Eliminates "works on my machine" issues
  - Simplifies dependency management
  - Enables microservices architecture`,
              codeExample: `# Dockerfile
  FROM openjdk:11
  COPY myapp.jar /app.jar
  ENTRYPOINT ["java", "-jar", "/app.jar"]`,
            },
          ],
        },
      ],
    },
    {
      id: 'kafka',
      title: 'Apache Kafka',
      icon: <Code className="w-6 h-6" />,
      sections: [
        {
          id: 'message-queue',
          title: 'Kafka Basics',
          content: [
            {
              question: 'What is Apache Kafka, and how does it work?',
              answer: `Kafka is a distributed event streaming platform used for real-time data processing. It consists of:
  
  - Producers: Publish messages to topics.
  - Brokers: Manage topics and store messages.
  - Consumers: Subscribe to topics and process messages.`,
              codeExample: `@KafkaListener(topics = "my-topic", groupId = "my-group")
  public void listen(String message) {
      System.out.println("Received: " + message);
  }`,
            },
          ],
        },
      ],
    },
    {
      id: 'git',
      title: 'Git & GitHub',
      icon: <GitBranch className="w-6 h-6" />,
      sections: [
        {
          id: 'version-control',
          title: 'Version Control with Git',
          content: [
            {
              question: 'What is Git, and why is it important?',
              answer: `Git is a distributed version control system that helps developers track changes in their code. Key concepts:
  
  - Repositories store project history.
  - Branching allows parallel development.
  - Commits capture snapshots of changes.`,
              codeExample: `git init
  git add .
  git commit -m "Initial commit"
  git push origin main`,
            },
          ],
        },
      ],
    },
    {
      id: 'design-patterns',
      title: 'Design Patterns',
      icon: <Brain className="w-6 h-6" />,
      sections: [
        {
          id: 'singleton',
          title: 'Singleton Pattern',
          content: [
            {
              question: 'What is the Singleton Pattern, and where is it used?',
              answer: `The Singleton Pattern ensures that a class has only one instance and provides a global point of access. It is often used for logging, database connections, and configuration management.`,
              codeExample: `public class Singleton {
      private static Singleton instance;
      
      private Singleton() {}
  
      public static Singleton getInstance() {
          if (instance == null) {
              instance = new Singleton();
          }
          return instance;
      }
  }`,
            },
          ],
        },
      ],
    },
  ];

  const calculateProgress = () => {
    const totalQuestions = topics.reduce(
      (acc, topic) =>
        acc +
        topic.sections.reduce(
          (secAcc, section) => secAcc + section.content.length,
          0
        ),
      0
    );

    const completedQuestions = Object.values(progress).filter(Boolean).length;
    return Math.round((completedQuestions / totalQuestions) * 100);
  };
  const selectedTopicData = topics.find((topic) => topic.id === selectedTopic);
  const filteredTopics = topics.filter((topic) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    return (
      topic.title.toLowerCase().includes(query) ||
      topic.sections.some(
        (section) =>
          section.title.toLowerCase().includes(query) ||
          section.content.some(
            (qa) =>
              qa.question.toLowerCase().includes(query) ||
              qa.answer.toLowerCase().includes(query)
          )
      )
    );
  });

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">FaizHelp</h1>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } w-5 h-5`}
                />
                <input
                  type="text"
                  placeholder="Search topics..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Progress Dashboard */}
        <div
          className={`mb-8 p-6 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow`}
        >
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {calculateProgress()}% Complete
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Topics Sidebar */}
          <div className="md:col-span-3">
            <nav className="space-y-2">
              {filteredTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic.id);
                    setSelectedSection(null);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    selectedTopic === topic.id
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                      : `${
                          darkMode
                            ? 'text-gray-300 hover:bg-gray-800'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`
                  }`}
                >
                  {topic.icon}
                  <span className="ml-3">{topic.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="md:col-span-9">
            {selectedTopicData && (
              <div
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow rounded-lg`}
              >
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedTopicData.title}
                  </h2>

                  {/* Sections */}
                  <div className="space-y-4">
                    {selectedTopicData.sections.map((section) => (
                      <div
                        key={section.id}
                        className={`border rounded-md p-4 ${
                          darkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      >
                        <button
                          onClick={() => setSelectedSection(section.id)}
                          className="w-full text-left"
                        >
                          <h3 className="text-lg font-medium">
                            {section.title}
                          </h3>
                        </button>

                        {selectedSection === section.id && (
                          <div className="mt-4 space-y-6">
                            {section.content.map((item, index) => (
                              <div
                                key={index}
                                className={`${
                                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                } p-4 rounded-md`}
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="text-lg font-medium">
                                    {item.question}
                                  </h4>
                                  <button
                                    onClick={() =>
                                      toggleProgress(section.id, index)
                                    }
                                    className={`px-3 py-1 rounded-md text-sm ${
                                      progress[`${section.id}-${index}`]
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                                        : `${
                                            darkMode
                                              ? 'bg-gray-600 text-gray-200'
                                              : 'bg-gray-200 text-gray-700'
                                          }`
                                    }`}
                                  >
                                    {progress[`${section.id}-${index}`]
                                      ? 'Completed'
                                      : 'Mark Complete'}
                                  </button>
                                </div>
                                <div className="mt-3 whitespace-pre-wrap">
                                  {item.answer}
                                </div>
                                {item.codeExample && (
                                  <div className="mt-4">
                                    <h5 className="font-medium mb-2">
                                      Code Example:
                                    </h5>
                                    <SyntaxHighlighter
                                      language="java"
                                      style={tomorrow}
                                      className="rounded-md"
                                    >
                                      {item.codeExample}
                                    </SyntaxHighlighter>
                                  </div>
                                )}
                                {item.practiceExercise && (
                                  <div className="mt-4 border-t pt-4">
                                    <h5 className="font-medium mb-2">
                                      Practice Exercise:
                                    </h5>
                                    <p className="mb-2">
                                      {item.practiceExercise.question}
                                    </p>
                                    <details className="mt-2">
                                      <summary className="cursor-pointer text-indigo-600 dark:text-indigo-400">
                                        Show Hint
                                      </summary>
                                      <p className="mt-2 pl-4">
                                        {item.practiceExercise.hint}
                                      </p>
                                    </details>
                                    <details className="mt-2">
                                      <summary className="cursor-pointer text-indigo-600 dark:text-indigo-400">
                                        Show Solution
                                      </summary>
                                      <div className="mt-2">
                                        <SyntaxHighlighter
                                          language="java"
                                          style={tomorrow}
                                          className="rounded-md"
                                        >
                                          {item.practiceExercise.solution}
                                        </SyntaxHighlighter>
                                      </div>
                                    </details>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!selectedTopicData && (
              <div
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow rounded-lg p-6 text-center`}
              >
                <h2 className="text-xl font-medium">Welcome to FaizGuide</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Select a topic from the sidebar to start learning.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
