
import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Activity,
  AreaChart,
  BarChart4,
  Box,
  ChevronDown,
  ChevronRight,
  Compass,
  FileBarChart,
  FileText,
  Info,
  Leaf,
  Link,
  Map,
  Network,
  Notebook,
  PackageOpen,
  PanelTop,
  RectangleHorizontal,
  Settings,
  Store,
  Users,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

export function Sidebar() {
  const { isMobile, isSidebarOpen, setIsSidebarOpen } = useMobile();
  const location = useLocation();

  React.useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile, setIsSidebarOpen]);

  if (isMobile && !isSidebarOpen) return null;

  return (
    <div
      className={cn(
        "flex h-screen flex-col overflow-hidden border-r bg-white pb-6 transition-all",
        isMobile
          ? "absolute inset-y-0 z-50 w-3/4 animate-in slide-in-from-left-full"
          : "w-64 shrink-0"
      )}
    >
      <div className="flex h-16 items-center border-b px-4 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold text-lg text-emerald-700"
        >
          <Leaf className="h-6 w-6" />
          <span className="font-semibold">BioECO</span>
        </NavLink>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-emerald-700",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-800 hover:bg-gray-50"
            )
          }
        >
          <PanelTop className="h-4 w-4" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/observatory"
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-emerald-700",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-800 hover:bg-gray-50"
            )
          }
        >
          <Map className="h-4 w-4" />
          <span>Painéis Setoriais</span>
        </NavLink>
        <NavLink
          to="/vocation"
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-emerald-700",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-800 hover:bg-gray-50"
            )
          }
        >
          <Compass className="h-4 w-4" />
          <span>Vocação Bioeconômica</span>
        </NavLink>
        <NavLink
          to="/hub"
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-emerald-700",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-800 hover:bg-gray-50"
            )
          }
        >
          <Network className="h-4 w-4" />
          <span>HUB Bioeconômico</span>
        </NavLink>
        <NavLink
          to="/valuechain"
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-emerald-700",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-800 hover:bg-gray-50"
            )
          }
        >
          <Store className="h-4 w-4" />
          <span>Cadeia de Valor</span>
        </NavLink>
        <NavLink
          to="/strategies"
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-emerald-700",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-800 hover:bg-gray-50"
            )
          }
        >
          <AreaChart className="h-4 w-4" />
          <span>Estratégias</span>
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-emerald-700",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-800 hover:bg-gray-50"
            )
          }
        >
          <FileBarChart className="h-4 w-4" />
          <span>Relatórios</span>
        </NavLink>

        <div className="mt-4">
          <h4 className="mb-1 px-3 text-xs font-medium text-gray-500">
            RECURSOS
          </h4>
          <Accordion type="single" collapsible defaultValue="links">
            <AccordionItem value="links">
              <AccordionTrigger className="px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:no-underline hover:text-emerald-700">
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  <span>Links Úteis</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2 border-l pl-2 text-sm">
                <a
                  href="https://www.gov.br/mma/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50 hover:text-emerald-700"
                >
                  <Info className="h-4 w-4" />
                  <span>Ministério do Meio Ambiente</span>
                </a>
                <a
                  href="https://www.gov.br/mcti/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50 hover:text-emerald-700"
                >
                  <Info className="h-4 w-4" />
                  <span>Ministério da Ciência e Tecnologia</span>
                </a>
                <a
                  href="https://www.bndes.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50 hover:text-emerald-700"
                >
                  <Info className="h-4 w-4" />
                  <span>BNDES</span>
                </a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="info">
              <AccordionTrigger className="px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:no-underline hover:text-emerald-700">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Documentos</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2 border-l pl-2 text-sm">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50 hover:text-emerald-700"
                >
                  <Info className="h-4 w-4" />
                  <span>Decreto nº 12.044</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50 hover:text-emerald-700"
                >
                  <Info className="h-4 w-4" />
                  <span>Estratégia Nacional de Bioeconomia</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50 hover:text-emerald-700"
                >
                  <Info className="h-4 w-4" />
                  <span>Manual do Usuário</span>
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </nav>

      <div className="mt-auto border-t pt-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "group mx-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-emerald-700",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-800 hover:bg-gray-50"
            )
          }
        >
          <Settings className="h-4 w-4" />
          <span>Configurações</span>
        </NavLink>
      </div>
    </div>
  );
}
