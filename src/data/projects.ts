export type ProjectSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ProjectLink = {
  icon: string;
  color: string;
  href: string;
};

export type ProjectDetailModel = {
  id: string;
  title: string;
  coverLabel: string;
  coverSrcs: string[];
  description: string[];
  items: { name: string; icon?: string; color?: string, src?: string }[];
  links: ProjectLink[];
};

export const projectsBySlug: Record<string, ProjectDetailModel> = {
  transcendence: {
    id: "transcendence",
    title: "TRANSCENDENCE",
    coverLabel: "Fullstack",
    coverSrcs: ["/projects/transcendence/cover.png", "/projects/transcendence/gameplay.mp4"],
    description: [
      "Transcendence est une application web full-stack développée dans le cadre du projet final du tronc commun de l’école 42.",
      "Elle propose une plateforme interactive centrée autour d’un jeu Pong multijoueur en temps réel, enrichie de fonctionnalités sociales et d’un système complet de gestion des utilisateurs.",
      "L’application permet aux utilisateurs de s’inscrire, de se connecter de manière sécurisée, de personnaliser leur profil, d'interagir via un système de chat en direct, et de s'affronter en ligne ou en local dans un système de tournois complet.",
      "Le gameplay repose sur une architecture temps réel (WebSockets), garantissant une expérience fluide et réactive.",
      "Le projet adopte une architecture moderne avec un backend structuré (API REST + WebSockets) et un frontend dynamique en SPA, assurant une séparation claire des responsabilités et une maintenabilité élevée.",
      "Une base de données est utilisée pour gérer les comptes et les statistiques de jeu, tandis que les resultats des tournois sont stockés de manière persistante sur la Blockchain Avalanche."
      ],
    items: [
      { name: "TypeScript", icon: "typescript", color: "3178C6" },
      { name: "Tailwind", icon: "tailwindcss", color: "2496ED" },
      { name: "Fastify", icon: "fastify", color: "020e21" },
      { name: "SQLite", icon: "sqlite", color: "3178C6" },
      { name: "Solidity", icon: "solidity", color: "020e21" },
      { name: "Docker", icon: "docker", color: "2496ED" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "Linux", icon: "linux", color: "020e21" },
      { name: "42", icon: "42", color: "020e21" },
    ],
    links: [
      { icon: "github", color: "020e21", href: "https://github.com/LilianPe/Transcendence" },
    ],
  },
  tokenizer: {
    id: "tokenizer",
    title: "TOKENIZER",
    coverLabel: "Blockchain",
    coverSrcs: ["/projects/tokenizer/cover.png", "/projects/tokenizer/example.png"],
    description: [
      "Tokenizer est un projet blockchain visant à concevoir et déployer un smart contract permettant la création et la gestion de tokens sur une blockchain compatible EVM.",
      "Le projet repose sur l’implémentation d’un contrat en Solidity conforme aux standards ERC-20, offrant des fonctionnalités complètes de gestion de tokens, y compris l’émission, le transfert, et la consultation des soldes.",
      "Le système permet de créer un token personnalisé comportant les differentes fonctionnalités ERC20, ainsi qu’un mécanisme de mint soumis à validation via un processus de multi-signature."
    ],
    items: [
      { name: "Solidity", icon: "solidity", color: "020e21" },
      { name: "Etherum", icon: "ethereum", color: "020e21" },
      { name: "Bnbchain", icon: "bnbchain", color: "d6e831" },
      { name: "Metamask", src: "/icons/metamask.png" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "42", icon: "42", color: "020e21" },
    ],
    links: [{ icon: "github", color: "020e21", href: "https://github.com/LilianPe/Tokenizer" }],
  },
  webserv: {
    id: "webserv",
    title: "WEBSERV",
    coverLabel: "HTTP",
    coverSrcs: ["/projects/webserv/cover.png", "/projects/webserv/screenshot.png"],
    description: [
      "Webserv est un serveur HTTP développé en C++ dans le cadre du cursus de l’école 42, visant à reproduire le fonctionnement d’un serveur web tel que Nginx.",
      "Le projet consiste à implémenter un serveur capable de gérer des requêtes HTTP/1.1 (GET, POST, DELETE), de servir des fichiers statiques et d’exécuter des scripts dynamiques via CGI.",
      "Il repose sur une architecture réseau bas niveau utilisant les sockets et un modèle non bloquant (poll/epoll), permettant de gérer efficacement plusieurs connexions simultanées.",
      "Le serveur est entièrement configurable via un fichier de configuration inspiré de Nginx, permettant de définir les ports d’écoute, les routes, les pages d’erreur et les comportements spécifiques selon les endpoints.",
      "Le traitement des requêtes inclut le parsing HTTP, la gestion des headers, la génération de réponses conformes au protocole et la gestion des erreurs."
    ],
    items: [
      { name: "C++", icon: "cplusplus", color: "00599C" },
      { name: "Nginx", icon: "nginx", color: "009639" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "Linux", icon: "linux", color: "020e21" },
      { name: "Makefile", src: "/icons/gnu.png" },
      { name: "42", icon: "42", color: "020e21" },
    ],
    links: [{ icon: "github", color: "020e21", href: "https://github.com/LilianPe/WebServ" }],
  },
  learn2slither: {
    id: "learn2slither",
    title: "LEARN 2 SLITHER",
    coverLabel: "IA",
    coverSrcs: ["/projects/learn2slither/cover.png", "/projects/learn2slither/example.mp4"],
    description: [
      "Learn2Slither est un projet de machine learning developpé dans le cadre du cursus de l’école 42 visant à entraîner un agent autonome à jouer au jeu Snake en utilisant des techniques avancées de reinforcement learning.",
      "Le projet utilise une approche de Q-learning neuronal (Deep Q-Learning), dans laquelle une réseau de neurones est utilisé pour approximer la fonction de valeur (Q-function), permettant de gérer un espace d’états complexe et de généraliser les comportements appris.",
      "L’agent apprend à prendre des décisions optimales en interagissant avec son environnement, en maximisant une fonction de récompense définie autour de la survie et de l’atteinte d’objectifs.",
      "Le système implémente une stratégie d’apprentissage basée sur le compromis exploration / exploitation, permettant à l’agent d’améliorer progressivement ses performances au fil des épisodes."
    ],
    items: [
      { name: "Python", icon: "python", color: "3776AB" },
      { name: "PyTorch", icon: "pytorch", color: "EE4C2C" },
      { name: "NumPy", icon: "numpy", color: "3776AB" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "Linux", icon: "linux", color: "020e21" },
      { name: "Makefile", src: "/icons/gnu.png" },
      { name: "42", icon: "42", color: "020e21" },
    ],
    links: [
      { icon: "github", color: "020e21", href: "https://github.com/LilianPe/Learn2Slither" },
    ],
  },
  ragPipeline: {
    id: "rag-pipeline",
    title: "Pipeline RAG",
    coverLabel: "IA",
    coverSrcs: ["/projects/rag-pipeline/cover.png"],
    description: [
      "Ce projet IA, développé dans le cadre d’un beta-test à 42, implémente un système de génération de texte par LLM enrichi via la récupération d’information (RAG).",
      "Le projet implémente une pipeline complète de traitement de documents, incluant l’indexation et le découpage (chunking) intelligent des données, afin d’optimiser la recherche d’information pertinente. Un moteur de recherche basé sur l’algorithme BM25 est utilisé pour sélectionner les passages les plus pertinents en fonction des requêtes utilisateur.",
      "Les informations récupérées sont ensuite injectées dans un modèle de langage (LLM) afin de générer des réponses contextualisées et précises. Cette approche permet de dépasser les limites des modèles génératifs classiques en enrichissant les réponses avec des connaissances externes.",
      "Le projet utilise Pydantic pour définir des classes de données robustes et typées, garantissant la cohérence et la validation des informations tout au long de la pipeline.",
      "Le système intègre également une phase d’évaluation basée sur des métriques de recherche telles que le Recall@k, permettant de mesurer la qualité du retrieval et d’itérer sur les performances du pipeline."
  ],
    items: [
      { name: "Python", icon: "python", color: "3776AB" },
      { name: "PyTorch", icon: "pytorch", color: "EE4C2C" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "Linux", icon: "linux", color: "020e21" },
      { name: "Makefile", src: "/icons/gnu.png" },
      { name: "42", icon: "42", color: "020e21" },
      { name: "Chatbot", icon: "dependabot", color: "020e21" },
    ],
    links: [],
  },
  leaffliction: {
    id: "leaffliction",
    title: "Leaffliction",
    coverLabel: "IA",
    coverSrcs: ["/projects/leaffliction/cover.png", "/projects/leaffliction/example.png"],
    description: [
      "Leaffliction est un projet de vision par ordinateur visant à classifier automatiquement l’état de santé de feuilles de pommiers et de vignes.",
      "Le projet met en place un pipeline complet de traitement d’images, incluant une analyse exploratoire du dataset et des techniques d’augmentation des données pour équilibrer les classes.",
      "Des transformations d’images sont appliquées via OpenCV afin d’améliorer la qualité des entrées du modèle et extraire des caractéristiques pertinentes.",
      "Un réseau de neurones convolutionnel (CNN) est ensuite entraîné pour apprendre à distinguer les différentes feuilles à partir des images traitées."
    ],
    items: [
      { name: "Python", icon: "python", color: "3776AB" },
      { name: "PyTorch", icon: "pytorch", color: "EE4C2C" },
      { name: "NumPy", icon: "numpy", color: "3776AB" },
      { name: "OpenCV", icon: "opencv", color: "3776AB" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "Makefile", src: "/icons/gnu.png" },
      { name: "Linux", icon: "linux", color: "020e21" },
      { name: "42", icon: "42", color: "020e21" },
    ],
    links: [
      {icon: "github", color: "020e21", href: "https://github.com/GaetanMo/Leaffliction"}
    ],
  },
  multilayerPerceptron: {
    id: "multilayer-perceptron",
    title: "Multilayer Perceptron",
    coverLabel: "IA",
    coverSrcs: ["/projects/multilayer-perceptron/cover.png", "/projects/multilayer-perceptron/doc.png"],
    description: [
      "Multilayer Perceptron est un projet consistant à implémenter un réseau de neurones multicouche (MLP) from scratch en Python.",
      "Le projet inclut la création d’un pipeline de traitement des données, notamment la séparation du dataset en sous‑ensembles d’entraînement et de validation.",
      "Le modèle ajuste ses paramètres (poids et biais) grâce à l’algorithme de descente de gradient appliqué à la fonction d’erreur (Categorical Crossentropy ou Binary Crossentropy), permettant d’optimiser ses prédictions sur des exemples inconnus.",
      "L’implémentation couvre les étapes essentielles d’un MLP de zéro, sans recourir à des frameworks externes de machine learning pour le cœur algorithmique, et permet d’observer et visualiser l’évolution des métriques de perte et de performance au cours de l’entraînement.",
      "Ce projet permet egalement de comprendre completement le fonctionnement interne d’un réseau de neurones multicouche, en explorant chacune des formules mathématiques derrière chaque etape, que ca soit les fonctions coût, leurs dérivées ou encore le calcul des gradients."
    ],
    items: [
      { name: "Python", icon: "python", color: "3776AB" },
      { name: "Pandas", icon: "pandas", color: "3776AB" },
      { name: "PyTorch", icon: "pytorch", color: "EE4C2C" },
      { name: "Scikit-learn", icon: "scikitlearn", color: "F05032" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "Makefile", src: "/icons/gnu.png" },
      { name: "Linux", icon: "linux", color: "020e21" },
      { name: "42", icon: "42", color: "020e21" },
    ],
    links: [
      {icon: "github", color: "020e21", href: "https://github.com/LilianPe/multilayer-perceptron"}
    ],
  },
  inception: {
    id: "inception",
    title: "Inception",
    coverLabel: "Devops",
    coverSrcs: ["/projects/inception/cover.png"],
    description: [
      "Inception est un projet de system administration visant à concevoir et déployer une infrastructure complète basée sur Docker.",
      "Le projet consiste à virtualiser plusieurs services au sein de conteneurs isolés, orchestrés via Docker Compose.",
      "Chaque service est configuré et construit à partir d’images personnalisées, permettant de reproduire un environnement cohérent et maîtrisé.",
      "L’infrastructure inclut notamment la mise en place de services web, de bases de données et d’un serveur NGINX, configurés pour communiquer entre eux via un réseau Docker dédié.",
      "Une attention particulière est portée à la configuration des volumes, à la persistance des données et à la sécurité des échanges entre les différents services."
    ],
    items: [
      { name: "Docker", icon: "docker", color: "2496ED" },
      { name: "Docker Compose", src: "/icons/docker-compose.png" },
      { name: "MariaDB", icon: "mariadb", color: "020e21" },
      { name: "Nginx", icon: "nginx", color: "009639" },
      { name: "Wordpress", icon: "wordpress", color: "21759B" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "Linux", icon: "linux", color: "020e21" },
      { name: "42", icon: "42", color: "020e21" },
    ],
    links: [],
  },
  javaBackendModule: {
    id: "java-backend-module",
    title: "Forseason (serveur Minecraft collaboratif)",
    coverLabel: "Backend",
    coverSrcs: ["/projects/forseason/cover.mp4", "/projects/forseason/spoiler.mp4"],
    description: [
      "Forseason est un serveur Minecraft multijoueur communautaire en cours de développement.",
      "J'ai pu notamment contribuer au développement de Kingdom Battle, un mini-jeu original actuellement en phase de test.",
      "Développé en autonomie depuis janvier 2026, ce mini-jeu s'appuie sur un SDK interne qui fournit la structure de base des mini-jeux du serveur.",
      "L'architecture du plugin repose sur une logique événementielle poussée, avec la mise en place de services dédiés et indépendants, notamment un service de gestion de monstres permettant de faire apparaitre des entités dotées d'IA entièrement custom.",
      "Le développement a également impliqué une migration majeure du module, avec un refactor complet du code et une adaptation aux breaking changes de l'API, garantissant la maintenabilité et l'évolutivité du projet.",
      "Le travail s'inscrit dans un environnement collaboratif réel : réunions techniques régulières, respect de conventions de code communes et workflow Git structuré au sein d'une équipe de développeurs."
    ],
    items: [
      { name: "Java", src: "/icons/java.png" },
      { name: "Gradle", icon: "gradle", color: "020e21" },
      { name: "PostgreSQL", icon: "postgresql", color: "336791" },
      { name: "Bukit", src: "/icons/bukkit.png" },
      { name: "Papermc", src: "/icons/papermc.png" },
      { name: "SonarQube", icon: "sonarqubeforide", color: "4E9BCD" },
      { name: "Git", icon: "git", color: "F05032" },
      { name: "Docker", icon: "docker", color: "2496ED" },
      { name: "Makefile", src: "/icons/gnu.png" },
      { name: "Linux", icon: "linux", color: "020e21" },
    ],
    links: [],
  },
};

