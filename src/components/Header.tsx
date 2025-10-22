import { Car, Menu, Search, User, LogOut, ShoppingBag, Plus, Shield, Heart } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { Utilizador } from "../types";
import { isVendedor, isAdmin, logout } from "../lib/auth";

interface HeaderProps {
  currentUser: Utilizador | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Header({ currentUser, onNavigate, onLogout }: HeaderProps) {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl">AutoPremium</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate("home")}
              className="text-sm hover:text-blue-600 transition-colors"
            >
              Início
            </button>
            {currentUser && (
              <>
                {isVendedor(currentUser) && (
                  <button
                    onClick={() => onNavigate("create-announcement")}
                    className="text-sm hover:text-blue-600 transition-colors"
                  >
                    Criar Anúncio
                  </button>
                )}
                {!isAdmin(currentUser) && (
                  <button
                    onClick={() => onNavigate("reservations")}
                    className="text-sm hover:text-blue-600 transition-colors"
                  >
                    {isVendedor(currentUser) ? "Meus Anúncios" : "Minhas Reservas"}
                  </button>
                )}
                {isAdmin(currentUser) && (
                  <button
                    onClick={() => onNavigate("admin")}
                    className="text-sm hover:text-blue-600 transition-colors"
                  >
                    Administração
                  </button>
                )}
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                {isVendedor(currentUser) && (
                  <Button
                    onClick={() => onNavigate("create-announcement")}
                    className="hidden md:flex bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Anúncio
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm">{currentUser.nome}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate("profile")}>
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </DropdownMenuItem>
                    {!isAdmin(currentUser) && (
                      <>
                        <DropdownMenuItem onClick={() => onNavigate("favorites")}>
                          <Heart className="mr-2 h-4 w-4" />
                          Favoritos
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onNavigate("reservations")}>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          {isVendedor(currentUser) ? "Meus Anúncios" : "Minhas Reservas"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onNavigate("my-reports")}>
                          <Shield className="mr-2 h-4 w-4" />
                          Minhas Denúncias
                        </DropdownMenuItem>
                      </>
                    )}
                    {isAdmin(currentUser) && (
                      <DropdownMenuItem onClick={() => onNavigate("admin")}>
                        <Shield className="mr-2 h-4 w-4" />
                        Administração
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Terminar Sessão
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={() => onNavigate("login")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Entrar
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
