export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} FootyHub. All rights reserved. Portfolio Project.</p>
      </div>
    </footer>
  )
}
