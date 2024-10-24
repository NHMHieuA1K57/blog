export const categories = [
  {
    label: "Education",
    value: "education",
    title: "Education",
    createAt: "2024-09",
  },
  {
    label: "Technology",
    value: "technology",
    title: "Technology",
    createAt: "2024-09",
  },
  { label: "Sports", value: "sports", title: "Sports", createAt: "2024-09" },
  { label: "Health", value: "health", title: "Health", createAt: "2024-09" },
  {
    label: "Entertainment",
    value: "entertainment",
    title: "Entertainment",
    createAt: "2024-09",
  },
  {
    label: "Politics",
    value: "politics",
    title: "Politics",
    createAt: "2024-09",
  },
  { label: "Science", value: "science", title: "Science", createAt: "2024-09" },
  {
    label: "Business",
    value: "business",
    title: "Business",
    createAt: "2024-09",
  },
  { label: "Travel", value: "travel", title: "Travel", createAt: "2024-09" },
  {
    label: "Lifestyle",
    value: "lifestyle",
    title: "Lifestyle",
    createAt: "2024-09",
  },
];


export const comments = [
  {
    _id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-09-10T12:34:00Z",
    user: {
      avatar: "avatars/john-doe.png",
    },
    replyOnUser: {
      name: "Jane Smith",
    },
    post: {
      slug: "how-to-code",
      title: "How to Code",
    },
    desc: "Great explanation on coding basics!",
    check: true,
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: "2023-09-12T14:22:00Z",
    user: {
      avatar: "avatars/jane-smith.png",
    },
    replyOnUser: null,
    post: {
      slug: "javascript-tricks",
      title: "JavaScript Tricks",
    },
    desc: "This article was super helpful!",
    check: false,
  },
  {
    _id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    createdAt: "2023-09-15T09:45:00Z",
    user: {
      avatar: "avatars/michael-johnson.png",
    },
    replyOnUser: {
      name: "Chris Lee",
    },
    post: {
      slug: "web-development-guide",
      title: "Web Development Guide",
    },
    desc: "Thanks for the detailed guide!",
    check: true,
  },
  {
    _id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    createdAt: "2023-09-20T11:32:00Z",
    user: {
      avatar: "avatars/emily-davis.png",
    },
    replyOnUser: null,
    post: {
      slug: "css-secrets",
      title: "CSS Secrets",
    },
    desc: "I learned a lot from this post.",
    check: false,
  },
  {
    _id: "5",
    name: "Chris Lee",
    email: "chris.lee@example.com",
    createdAt: "2023-09-22T15:10:00Z",
    user: {
      avatar: null,
    },
    replyOnUser: {
      name: "Sarah Brown",
    },
    post: {
      slug: "responsive-design",
      title: "Responsive Design",
    },
    desc: "Great insight on responsive design!",
    check: true,
  },
];

export const tags = [
  "Education",
  "Children",
  "Better",
  "Medical",
  "Health",
  "Help",
  "Donation",
  "Charity",
];

export const breadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article", link: "/blog/1" },
];

export const users = [
  {
    _id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    createdAt: "2023-10-04",
    isVerified: true,
    isAdmin: false,
    isEditor: true,
    isAuthor: true,
    actions: "",
    totalPost: 10,
    isBan: true,
    posts: [
      {
        _id: "101",
        title: "React Tutorial for Beginners",
        slug: "react-tutorial-for-beginners",
        createdAt: "2023-09-15T10:00:00Z",
      },
      {
        _id: "102",
        title: "Understanding Node.js",
        slug: "understanding-nodejs",
        createdAt: "2023-08-20T14:30:00Z",
      },
    ],
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "janesmith@example.com",
    createdAt: "2023-10-04",
    isVerified: true,
    isAdmin: true,
    isEditor: true,
    isAuthor: false,
    actions: "",
    totalPost: 5,
    isBan: false,
    posts: [
      {
        _id: "103",
        title: "CSS Grid vs Flexbox",
        slug: "css-grid-vs-flexbox",
        createdAt: "2023-07-25T09:15:00Z",
      },
    ],
  },
  {
    _id: "3",
    name: "Michael Johnson",
    email: "michaeljohnson@example.com",
    createdAt: "2023-10-04",
    isVerified: false,
    isAdmin: false,
    isEditor: false,
    isAuthor: true,
    actions: "",
    totalPost: 8,
    isBan: true,
    posts: [
      {
        _id: "104",
        title: "Mastering Git & GitHub",
        slug: "mastering-git-github",
        createdAt: "2023-06-10T11:45:00Z",
      },
    ],
  },
  {
    _id: "4",
    name: "Emily Davis",
    email: "emilydavis@example.com",
    createdAt: "2023-10-04",
    isVerified: true,
    isAdmin: false,
    isEditor: true,
    isAuthor: false,
    actions: "",
    totalPost: 3,
    isBan: false,
    posts: [
      {
        _id: "105",
        title: "Introduction to TypeScript",
        slug: "introduction-to-typescript",
        createdAt: "2023-05-05T16:20:00Z",
      },
    ],
  },
  {
    _id: "5",
    name: "David Wilson",
    email: "davidwilson@example.com",
    createdAt: "2023-10-04",
    isVerified: false,
    isAdmin: true,
    isEditor: false,
    isAuthor: true,
    actions: "",
    totalPost: 12,
    isBan: false,
    posts: [
      {
        _id: "106",
        title: "React Tutorial for Beginners",
        slug: "react-tutorial-for-beginners",
        createdAt: "2023-09-15T10:00:00Z",
      },
      {
        _id: "107",
        title: "Understanding Node.js",
        slug: "understanding-nodejs",
        createdAt: "2023-08-20T14:30:00Z",
      },
      {
        _id: "108",
        title: "CSS Grid vs Flexbox",
        slug: "css-grid-vs-flexbox",
        createdAt: "2023-07-25T09:15:00Z",
      },
    ],
  },
];

export const postsData = {
  data: [
    {
      _id: "101",
      title: "React Tutorial for Beginners",
      categories: [{ title: "Programming" }, { title: "React" }],
      createdAt: "2023-09-15T10:00:00Z",
      tags: ["JavaScript", "React", "Frontend"],
      photo: "/uploads/react-tutorial.jpg",
      slug: "react-tutorial-for-beginners",
      author: "John Doe",
    },
    {
      _id: "102",
      title: "Understanding Node.js",
      categories: [{ title: "Programming" }, { title: "Node.js" }],
      createdAt: "2023-08-20T14:30:00Z",
      tags: ["Backend", "Node.js"],
      photo: "/uploads/nodejs-guide.jpg",
      slug: "understanding-nodejs",
      author: "John Doe",
    },
    {
      _id: "103",
      title: "CSS Grid vs Flexbox",
      categories: [{ title: "Web Design" }, { title: "CSS" }],
      createdAt: "2023-07-25T09:15:00Z",
      tags: ["CSS", "Design"],
      photo: "/uploads/css-grid-vs-flexbox.jpg",
      slug: "css-grid-vs-flexbox",
      author: "Jane Smith",
    },
    {
      _id: "104",
      title: "Mastering Git & GitHub",
      categories: [{ title: "Version Control" }, { title: "Git" }],
      createdAt: "2023-06-10T11:45:00Z",
      tags: ["Git", "GitHub"],
      photo: "/uploads/mastering-git-github.jpg",
      slug: "mastering-git-github",
      author: "Michael Johnson",
    },
    {
      _id: "105",
      title: "Introduction to TypeScript",
      categories: [{ title: "Programming" }, { title: "TypeScript" }],
      createdAt: "2023-05-05T16:20:00Z",
      tags: ["TypeScript", "JavaScript"],
      photo: "/uploads/introduction-to-typescript.jpg",
      slug: "introduction-to-typescript",
      author: "Emily Davis",
    },
  ],
  headers: {
    "x-total-count": 5,
    "x-total-pages": 1,
  },
};
