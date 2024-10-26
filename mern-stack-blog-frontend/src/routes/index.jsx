import { pageUrls } from "../constants/pageUrls";
import LayoutManage from "../layouts/LayoutManage";
import AccessDenied from "../pages/accessDenied/AccessDenied";
import Admin from "../pages/admin/screens/Admin";
import Categories from "../pages/admin/screens/categories/Categories";
import ManagePosts from "../pages/admin/screens/posts/ManagePosts";
import Reports from "../pages/admin/screens/reports/Reports";
import Users from "../pages/admin/screens/users/Users";
import ArticleDetailPage from "../pages/articleDetail/ArticleDetailPage";
import BlogPage from "../pages/blog/BlogPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import ProfilePage from "../pages/profile/ProfilePage";
import RegisterPage from "../pages/register/RegisterPage";
import BlogPostForm from "../pages/admin/screens/posts/addNewBlog";
const routes = [
  {
    path: pageUrls.ADMIN,
    layout: LayoutManage,
    isProtected: true,
    children: [
      {
        path: pageUrls.ADMIN,
        component: Admin,
      },
      {
        path: pageUrls.RE_PORTS,
        component: Reports,
      },
      {
        path: pageUrls.POSTS,
        component: ManagePosts,
      },
      {
        path: pageUrls.CATEGORIES,
        component: Categories,
      },
      {
        path: pageUrls.USERS,
        component: Users,
      },
      {
        path: pageUrls.ADD_NEW_BLOG,
        component: BlogPostForm,
      },
    ],
  },
  {
    path: pageUrls.HOME,
    component: HomePage,
  },
  {
    path: pageUrls.BLOG_DETAIL,
    component: ArticleDetailPage,
  },
  {
    path: pageUrls.BLOG,
    component: BlogPage,
  },
  {
    path: pageUrls.PROFILE,
    component: ProfilePage,
  },
  {
    path: pageUrls.LOGIN,
    component: LoginPage,
  },
  {
    path: pageUrls.REGISTER,
    component: RegisterPage,
  },
  {
    path: pageUrls.NOT_FOUND,
    component: AccessDenied,
  },
];

export default routes; 