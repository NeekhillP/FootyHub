import Link from 'next/link'
import { Trophy } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-15%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center space-x-2 text-xl font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-md shadow-brand-500/20">
            <Trophy className="h-5 w-5" />
          </div>
          <span>
            Footy<span className="text-brand-500">Hub</span>
          </span>
        </Link>

        {children}
      </div>
    </div>
  )
}
