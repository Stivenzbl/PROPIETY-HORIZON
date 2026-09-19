import { NavLink, NavLinkProps, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BuildingIcon,
  KeyIcon,
  UsersIcon,
  ReceiptIcon,
  WrenchIcon,
  DollarSignIcon,
  FileTextIcon,
  ChartBarIcon,
  PlusIcon,
  MenuIcon,
  XIcon,
  CogIcon,
  SettingsIcon,
} from "react-icons/md";

type SidebarProps = {
  isOpen: boolean;
};

/**
 * Componente de navegación lateral (Sidebar)
 *
 * Contiene todos los módulos del sistema:
 * - Dashboard → resumen global y métricas
 * - Condominios → administración de condominios
 * - Unidades → asignación de propietarios (común / exclusivo)
 * - Vecinos → directorio de residentes y dueños
 * - Servicios → servicios públicos, proveedores, mantenimiento
 * - Cobranzas → calendario, estados, recargos
 * - Mantenimientos → planillas mensuales y asignaciones
 * - Financiero → ingresos, egresos, caja, gastos de administración
 * - Informes → reportes personalizados
 * - Configuración → perfiles, configuraciones del sistema
 */
function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  // Ruta de la página de login no tiene sidebar
  if (isOpen && location.pathname === "/login") return null;

  const navItems = [
    { icon: HomeIcon, label: "Dashboard", path: "/", exact: true },
    { icon: BuildingIcon, label: "Condominios", path: "/condominios" },
    {
      icon: KeyIcon,
      label: "Unidades", path: "/unidades", badge: "+20 unidades" as const,
    },
    { icon: UsersIcon, label: "Vecinos", path: "/vecinos" },
    { icon: ReceiptIcon, label: "Servicios", path: "/servicios" },
    { icon: DollarSignIcon, label: "Cobranzas", path: "/cobranzas" },
    {
      icon: WrenchIcon,
      label: "Mantenimientos", path: "/mantenimientos" as const,
      badge: "3 pendientes" as const,
    },
    { icon: DollarSignIcon, label: "Financiero", path: "/financiero" },
    {
      icon: FileTextIcon,
      label: "Informes",
      path: "/informes",
      badge: "Reporte en curso" as const,
    },
  ];

  const settingsItems = [
    { icon: CogIcon, label: "Perfil", path: "/configuracion/perfil" },
    { icon: SettingsIcon, label: "Configuración", path: "/configuracion/general" },
    { label: "Cerrar sesión", path: "/login", exact: false, isLogout: true },
  ];

  return (
    <>
      {/* HEADER */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3 overflow-hidden min-w-0">
          <a href="/" className="shrink-0 p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-purple-900/30 transition-colors flex items-center justify-center">
            {/* Logo: Propiedad Horizontal con icono */}
            <span className="text-xl mr-2 font-bold bg-gradient-to-r from-blue-600 via-gray-900 via-white via-gray-700 to-purple-700 bg-clip-text text-transparent inline-block">
              PROPIETY
            </span>
          </a>

          <nav className="flex items-end gap-1 ml-2">
            <NavLink
              end={true}
              to="/dashboard"
              className={({ isActive }) =>
                (isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-700 dark:text-gray-300") +
                " font-medium text-sm transition-colors"
              }
            >
              <HomeIcon size={20} />
            </NavLink>

            {["Condominios", "Unidades", "Vecinos", "Servicios"].map(
              (item) =>
                item === "Mantenimientos" && (
                  <NavLink
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      (isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300") +
                      " font-medium text-sm transition-colors"
                    }
                  >
                    <WrenchIcon size={20} />
                    {item === "Mantenimientos" && <WrenchIcon />}
                  </NavLink>
                )
            );
          }}
        </nav>

        {/* MENU TOGGLE (Mobile) */}
        <button className="md:hidden flex p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" type="button">
          {isOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {/* Modules */}
        {navItems.map((item) => {
          const Icon = item.icon ?? ""; // fallback if icon is undefined
          const isActive = location.pathname === item.path || location.pathname === item.path + "/";
          return (
            <NavLink key={item.label} to={item.path} className="group relative">
              {/* Badge if exists */}
              {item.badge && (
                <span className="absolute right-0 top-1 text-[10px] font-medium bg-red-500 text-white px-2 py-0.5 rounded-full truncate max-w-[72px]">
                  {item.badge}
                </span>
              )}

              {/* Tooltip for non-active items */}
              {!isActive && (
                <div className="hidden group-hover:block absolute left-full ml-2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}

              {/* Active item */}
              <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
                href={item.path}
              >
                <Icon className="shrink-0 w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </NavLink>
          );
        })}

        {/* Settings Section */}
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Ajustes
          </h3>
          {settingsItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.exact ?? true}
              className="group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {item.isLogout ? (
                <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600 group-hover:dark:text-red-400 transition-colors" />
              ) : (
                item.icon && <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
              {item.label === "Cerrar sesión" ? (
                <>
                  <span>Cerrar</span>
                  <span className="ml-auto">↗</span>
                </>
              ) : (
                item.label === "Configuración" ? <SettingsIcon /> : <CogIcon />
              )}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          PROPIETY-HORIZON v1.0-beta
        </p>
      </div>
    </>
  );
}

export default Sidebar;
