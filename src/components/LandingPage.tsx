import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, CloudArrowUp, ChartLine, ShieldCheck, CurrencyDollar, CaretRight, Lightning } from '@phosphor-icons/react'

interface LandingPageProps {
  onGetStarted: () => void
  onLoadDemo: () => void
  onOpenGuide: () => void
}

export function LandingPage({ onGetStarted, onLoadDemo, onOpenGuide }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <header className="relative z-10 container mx-auto px-6 pt-8 pb-4">
        <nav className="glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Lightning weight="fill" className="text-white" size={18} />
            </div>
            <span className="font-bold tracking-tight text-lg">LogNebula</span>
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">Beta</Badge>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <button onClick={onOpenGuide} className="hover:text-foreground transition-colors">Guide</button>
            <button className="hover:text-foreground transition-colors">Pricing</button>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" onClick={onLoadDemo} className="hidden sm:flex">Demo</Button>
            <Button size="sm" onClick={onGetStarted} className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
              Launch App
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1 relative z-10 container mx-auto px-6 py-12 max-w-6xl flex flex-col items-center justify-center text-center">
        {/* Hero */}
        <div className="space-y-8 max-w-4xl mx-auto mb-24 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            v2.0 Now Available
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
              Debug Faster with
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent animate-pulse-glow">
              Crystal Clear Insights
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform raw, chaotic logs into structured intelligence.
            Client-side parsing ensures your data never leaves your browser.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={onGetStarted} className="h-12 px-8 text-base bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all hover:scale-105">
              Start Analyzing
              <CaretRight className="ml-2" weight="bold" />
            </Button>
            <Button size="lg" variant="outline" onClick={onLoadDemo} className="h-12 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md">
              View Live Demo
            </Button>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="grid md:grid-cols-3 gap-6 w-full mb-32">
          <div className="glass-card rounded-3xl p-8 md:col-span-2 flex flex-col md:flex-row gap-8 items-center text-left group">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                <ChartLine size={24} weight="fill" />
              </div>
              <h3 className="text-2xl font-semibold">Pattern Intelligence</h3>
              <p className="text-muted-foreground">
                Our engine automatically groups recurring errors, masking dynamic values like UUIDs and timestamps to show you what really matters.
              </p>
            </div>
            <div className="flex-1 w-full h-48 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl border border-white/5 relative overflow-hidden">
              {/* Abstract Chart Representation */}
              <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-around px-4 pb-4 gap-2">
                {[40, 70, 30, 85, 50, 65].map((h, i) => (
                  <div key={i} className="w-full bg-primary/40 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 text-left group">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:rotate-12 transition-transform duration-500">
              <ShieldCheck size={24} weight="fill" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Zero data egress. All parsing happens in your browser's memory using WebAssembly-ready logic.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 text-left group">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform duration-500">
              <CloudArrowUp size={24} weight="fill" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Upload</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Drag & drop multi-megabyte log files and see results in milliseconds. No server round-trips.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 md:col-span-2 text-left flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-semibold">Usage Guidelines</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} weight="fill" />
                  <span>Supports .log and .txt files (plain text)</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} weight="fill" />
                  <span>Auto-detects ISO-8601 and common timestamp formats</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} weight="fill" />
                  <span>Best performance with files under 10MB</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-2xl opacity-20" />
                <div className="relative bg-card border border-border rounded-xl p-6 w-64 rotate-3">
                  <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-2 font-mono text-xs text-muted-foreground">
                    <div className="flex gap-2"><span className="text-red-400">ERR</span> <span>Connection failed</span></div>
                    <div className="flex gap-2"><span className="text-yellow-400">WRN</span> <span>Retrying...</span></div>
                    <div className="flex gap-2"><span className="text-green-400">INF</span> <span>Connected</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="w-full max-w-5xl mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 flex flex-col items-start">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-6">$0</div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-1">
                <li className="flex gap-2"><CheckCircle className="text-primary" /> 25k lines / session</li>
                <li className="flex gap-2"><CheckCircle className="text-primary" /> Basic Patterns</li>
                <li className="flex gap-2"><CheckCircle className="text-primary" /> 7-day retention</li>
              </ul>
              <Button variant="outline" className="w-full" onClick={onGetStarted}>Get Started</Button>
            </div>

            <div className="relative rounded-2xl p-8 flex flex-col items-start bg-gradient-to-b from-primary/20 to-card border border-primary/50 shadow-2xl shadow-primary/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-lg font-medium text-primary mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-6">$9<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-3 text-sm text-foreground mb-8 flex-1">
                <li className="flex gap-2"><CheckCircle className="text-accent" weight="fill" /> 250k lines / session</li>
                <li className="flex gap-2"><CheckCircle className="text-accent" weight="fill" /> Advanced Filtering</li>
                <li className="flex gap-2"><CheckCircle className="text-accent" weight="fill" /> Export Reports</li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={onGetStarted}>Upgrade Now</Button>
            </div>

            <div className="glass-card rounded-2xl p-8 flex flex-col items-start">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-1">
                <li className="flex gap-2"><CheckCircle className="text-primary" /> Unlimited lines</li>
                <li className="flex gap-2"><CheckCircle className="text-primary" /> SSO & Audit Logs</li>
                <li className="flex gap-2"><CheckCircle className="text-primary" /> Priority Support</li>
              </ul>
              <Button variant="outline" className="w-full" onClick={onGetStarted}>Contact Sales</Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-muted-foreground bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} LogNebula Inc.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
