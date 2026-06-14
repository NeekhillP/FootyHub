import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, ArrowRight, Newspaper, RefreshCw, Star, Flame } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradients for premium glassmorphism aesthetic */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-15%] h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center relative z-10">
        <Badge className="mb-4 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/20 px-3 py-1 text-xs font-semibold rounded-full tracking-wide">
          Milestone 0: Project Foundation
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground max-w-4xl mx-auto leading-tight sm:leading-none">
          Unified Football <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-300">Intelligence</span> Hub
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Search any player, club, or competition and instantly get real-time fixtures, stats, transfer rumors, and news aggregated onto a single, stunning page.
        </p>

        {/* Global Search Bar Mockup */}
        <div className="mt-10 max-w-xl mx-auto p-1.5 rounded-full border border-border/50 bg-card/60 backdrop-blur-md shadow-2xl flex items-center">
          <input
            type="text"
            placeholder="Search 'Erling Haaland', 'Arsenal', or 'Premier League'..."
            className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-foreground"
            disabled
          />
          <Button className="rounded-full bg-brand-500 hover:bg-brand-600 text-primary-foreground font-semibold px-6 shadow-md shadow-brand-500/20 transition-all">
            Search
          </Button>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Star className="h-3.5 w-3.5 text-brand-500 fill-brand-500/35" />
            <span>Premium Dark Aesthetic</span>
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="flex items-center space-x-1">
            <Flame className="h-3.5 w-3.5 text-brand-500 fill-brand-500/35" />
            <span>Fast Cache-First API Layer</span>
          </span>
        </div>
      </section>

      {/* Grid Showcase */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 text-center sm:text-left">
          Platform Feature Showcase
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Live Fixtures */}
          <Card className="bg-card/40 backdrop-blur-sm border-border/40 hover:border-brand-500/30 transition-all duration-300 shadow-xl group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                  <RefreshCw className="h-5 w-5" />
                </span>
                <Badge variant="outline" className="text-[10px] uppercase border-red-500/25 text-red-400 bg-red-500/5 font-bold animate-pulse">
                  Live
                </Badge>
              </div>
              <CardTitle className="mt-4 text-lg">Fixtures & Live Scores</CardTitle>
              <CardDescription>Real-time match updates with client-side polling every 60 seconds.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-secondary/35 p-3 flex items-center justify-between text-xs">
                <span className="font-semibold flex items-center space-x-2">
                  <span className="w-5 h-5 bg-brand-500/20 rounded-full inline-block" />
                  <span>Arsenal</span>
                </span>
                <span className="font-bold bg-secondary px-2 py-0.5 rounded">2</span>
              </div>
              <div className="rounded-lg bg-secondary/35 p-3 flex items-center justify-between text-xs">
                <span className="font-semibold flex items-center space-x-2">
                  <span className="w-5 h-5 bg-blue-500/20 rounded-full inline-block" />
                  <span>Chelsea</span>
                </span>
                <span className="font-bold bg-secondary px-2 py-0.5 rounded">1</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: News Aggregator */}
          <Card className="bg-card/40 backdrop-blur-sm border-border/40 hover:border-brand-500/30 transition-all duration-300 shadow-xl group">
            <CardHeader className="pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                <Newspaper className="h-5 w-5" />
              </span>
              <CardTitle className="mt-4 text-lg">Aggregated News Feed</CardTitle>
              <CardDescription>Curated headlines and transfer rumors with full source attribution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-2 border-brand-500 pl-3 py-1">
                <p className="text-xs font-semibold hover:text-brand-400 transition-colors cursor-pointer">
                  Manchester City secure qualification to Champions League quarter finals...
                </p>
                <span className="text-[10px] text-muted-foreground">BBC Sport • 15m ago</span>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3 py-1">
                <p className="text-xs font-semibold hover:text-brand-400 transition-colors cursor-pointer">
                  Kylian Mbappé reaches landmark career goals in Champions League masterclass...
                </p>
                <span className="text-[10px] text-muted-foreground">ESPN • 1h ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Standings */}
          <Card className="bg-card/40 backdrop-blur-sm border-border/40 hover:border-brand-500/30 transition-all duration-300 shadow-xl group md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                <Trophy className="h-5 w-5" />
              </span>
              <CardTitle className="mt-4 text-lg">League Standings</CardTitle>
              <CardDescription>Cached standings with Next.js Incremental Static Regeneration (ISR).</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-border/40 text-muted-foreground">
                    <th className="pb-2 font-medium">Pos</th>
                    <th className="pb-2 font-medium">Club</th>
                    <th className="pb-2 font-medium text-right">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr>
                    <td className="py-2 font-bold text-brand-400">1</td>
                    <td className="py-2 font-semibold">Arsenal</td>
                    <td className="py-2 text-right font-bold">89</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-muted-foreground">2</td>
                    <td className="py-2 font-semibold">Man City</td>
                    <td className="py-2 text-right font-bold">88</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-muted-foreground">3</td>
                    <td className="py-2 font-semibold">Liverpool</td>
                    <td className="py-2 text-right font-bold">82</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
        
        {/* Next.js 15 SSR Banner */}
        <div className="mt-12 rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-950/40 to-emerald-950/40 p-8 text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden group">
          <div className="absolute top-[-50%] right-[-20%] h-64 w-64 rounded-full bg-brand-500/10 blur-[60px]" />
          <h3 className="text-xl font-bold text-foreground">Under the Hood</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            FootyHub runs on Next.js 15 App Router, featuring Strict TypeScript, Supabase SSR Auth, PostgreSQL Full-Text Search, and caching abstractions.
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
            >
              <span>Explore Auth System</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
