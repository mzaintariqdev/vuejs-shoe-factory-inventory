import { employeesUrl, homeUrl, profileUrl, shoeArticlesUrl } from "@/routes/urls";
import { AppstoreOutlined, FileTextOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons-vue";

export const SidebarRoutes = [
  { name: 'Dashboard', path: homeUrl, icon: AppstoreOutlined },
  { name: 'Employees', path: employeesUrl, icon: UserOutlined },
  { name: 'Shoe Articles', path: shoeArticlesUrl, icon: FileTextOutlined },
  { name: 'Profile', path: profileUrl, icon: SettingOutlined },
]