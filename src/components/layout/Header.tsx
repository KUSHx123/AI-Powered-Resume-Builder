import { Moon, Sun, Download, Save, Eye, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onExportPDF: () => void;
  onTogglePreview: () => void;
  showPreview: boolean;
  onOpenTemplates: () => void;
}

export function Header({ onExportPDF, onTogglePreview, showPreview, onOpenTemplates }: HeaderProps) {
  const { state, toggleDarkMode, saveToLocalStorage } = useResume();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              ResumeBuilder Pro
            </motion.h1>
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Auto-saved</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenTemplates}
              className="hidden md:flex items-center space-x-2"
            >
              <Palette className="h-4 w-4" />
              <span>Templates</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onTogglePreview}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline">
                {showPreview ? 'Edit' : 'Preview'}
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onExportPDF}>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={saveToLocalStorage}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {state.isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}