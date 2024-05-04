import { roles } from "@/routes/roles";
import { employeesUrl, homeUrl, profileUrl, shoeArticlesUrl } from "@/routes/urls";
import { AppstoreOutlined, FileTextOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons-vue";

export const SidebarRoutes = [
  { name: 'Dashboard', path: homeUrl, icon: AppstoreOutlined, acceptedTypes: [roles.admin, roles.employee], },
  { name: 'Employees', path: employeesUrl, icon: UserOutlined, acceptedTypes: [roles.admin], },
  { name: 'Shoe Articles', path: shoeArticlesUrl, icon: FileTextOutlined, acceptedTypes: [roles.admin], },
  { name: 'Profile', path: profileUrl, icon: SettingOutlined, acceptedTypes: [roles.admin, roles.employee], },
]