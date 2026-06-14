import React from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Trophy, Shield, Newspaper, RefreshCw, Search } from 'lucide-react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-foreground hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-md shadow-brand-500/20">
              <Trophy className="h-4.5 w-4.5" />
            </div>
            <span>
              Footy<span className="text-brand-500">Hub</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-muted-foreground">
            <Link href="/fixtures" className="flex items-center space-x-1 hover:text-brand-500 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Fixtures</span>
            </Link>
            <Link href="/news" className="flex items-center space-x-1 hover:text-brand-500 transition-colors">
              <Newspaper className="h-4 w-4" />
              <span>News</span>
            </Link>
            <Link href="/transfers" className="flex items-center space-x-1 hover:text-brand-500 transition-colors">
              <Shield className="h-4 w-4" />
              <span>Transfers</span>
            </Link>
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search players, clubs..."
                className="h-9 w-60 rounded-full border border-border/50 bg-secondary/50 pl-9 pr-4 text-xs font-medium focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors"
                disabled
              />
            </div>
            
            <ThemeToggle />
            
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-full bg-brand-500 hover:bg-brand-600 px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} FootyHub. All rights reserved. Portfolio Project.</p>
        </div>
      </footer>
    </div>
  )
}
