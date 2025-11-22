import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, CloudArrowUp, ChartLine, ShieldCheck, CurrencyDollar } from '@phosphor-icons/react'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,white,transparent)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" fill=\"none\"><path stroke=\"%23374151\" stroke-opacity=\"0.2\" d=\"M0 200h400M200 0v400\"/></svg>')] opacity-40" />
      <header className="relative z-10 container mx-auto px-6 pt-16 pb-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">Beta</Badge>
            <h1 className="text-xl font-semibold tracking-tight">Log Analyzer</h1>
          </div>
          <Button variant="outline" onClick={onGetStarted}>Launch Analyzer</Button>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 pb-24 max-w-6xl">
        {/* Hero */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Turn Raw Logs Into Actionable Insight
          </h2>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Instantly parse, categorize and visualize application logs right in your browser. No servers, no data leaves your machine. Spot recurring errors, trends and performance signals in seconds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onGetStarted} className="bg-indigo-500 hover:bg-indigo-600">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="backdrop-blur border-indigo-400/40 text-indigo-300 hover:text-indigo-100" onClick={onGetStarted}>
              Try Demo Analyzer
            </Button>
          </div>
          <p className="mt-4 text-xs text-slate-400">Free plan processes up to 25k lines per session.</p>
        </section>

        {/* Feature Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">
          <Card className="bg-slate-900/60 border-slate-700/60 backdrop-blur">
            <div className="p-6">
              <CloudArrowUp className="text-indigo-400 mb-3" size={32} />
              <h3 className="font-medium mb-2">Local Only</h3>
              <p className="text-sm text-slate-400">All parsing runs client-side. Your sensitive logs never leave your browser.</p>
            </div>
          </Card>
          <Card className="bg-slate-900/60 border-slate-700/60 backdrop-blur">
            <div className="p-6">
              <ChartLine className="text-purple-400 mb-3" size={32} />
              <h3 className="font-medium mb-2">Pattern Intelligence</h3>
              <p className="text-sm text-slate-400">Auto-groups recurring errors with smart normalization for stable signatures.</p>
            </div>
          </Card>
          <Card className="bg-slate-900/60 border-slate-700/60 backdrop-blur">
            <div className="p-6">
              <ShieldCheck className="text-pink-400 mb-3" size={32} />
              <h3 className="font-medium mb-2">Privacy & Control</h3>
              <p className="text-sm text-slate-400">Export nothing unless you choose. Ideal for regulated or internal data.</p>
            </div>
          </Card>
        </section>

        {/* Usage Rules */}
        <section className="mb-20">
          <h3 className="text-xl font-semibold mb-4">Usage Rules & Guidelines</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> Accepted formats: plain text <code>.log</code>, <code>.txt</code>; binary files are ignored.</p>
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> Severity detection relies on tokens: FATAL, ERROR, WARN, INFO, DEBUG, TRACE (case-insensitive).</p>
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> Recognized timestamps: ISO-8601, US date <code>MM/DD/YYYY HH:MM:SS</code>, textual <code>Mon DD, YYYY HH:MM:SS</code>, and epoch (seconds/millis).</p>
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> Lines without a recognized severity default to INFO.</p>
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> Normalization masks numbers, UUIDs, hex values & quoted strings to cluster similar error shapes.</p>
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> Recommended file size &lt; 5MB (≈ 50–75k lines) for optimal in-browser performance.</p>
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> Parsing is best-effort; malformed timestamps or exotic severity tags may not be classified.</p>
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> All processing is ephemeral: refresh clears loaded data unless exported manually.</p>
            <p className="flex gap-2"><CheckCircle className="text-green-400" size={18} /> Do not upload logs containing personal data; redact before analysis.</p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-24">
          <h3 className="text-xl font-semibold mb-6 text-center">Pricing</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/70 border-slate-700/60 backdrop-blur flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Free</span>
                  <Badge variant="outline" className="text-xs">Starter</Badge>
                </div>
                <p className="text-3xl font-semibold mb-4">$0</p>
                <ul className="space-y-2 text-sm text-slate-300 mb-6">
                  <li>Up to 25k lines / session</li>
                  <li>Pattern grouping</li>
                  <li>Timeline visualization</li>
                </ul>
                <Button variant="outline" onClick={onGetStarted}>Begin</Button>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-none shadow-lg ring-1 ring-indigo-400/40 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)]" />
              <div className="p-6 flex-1 flex flex-col relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Pro</span>
                  <Badge className="text-xs bg-white/20">Popular</Badge>
                </div>
                <p className="text-3xl font-semibold mb-1">$9<span className="text-base font-normal">/mo</span></p>
                <p className="text-xs mb-4 text-white/80">Save errors before refresh</p>
                <ul className="space-y-2 text-sm text-white/90 mb-6">
                  <li>Up to 250k lines / session</li>
                  <li>Persistent pattern history</li>
                  <li>Export grouped summaries</li>
                  <li>Priority enhancements</li>
                </ul>
                <Button className="bg-white text-indigo-700 hover:bg-white/90" onClick={onGetStarted}>
                  Upgrade
                </Button>
              </div>
            </Card>
            <Card className="bg-slate-900/70 border-slate-700/60 backdrop-blur flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Team</span>
                  <CurrencyDollar className="text-pink-400" size={22} />
                </div>
                <p className="text-3xl font-semibold mb-1">$29<span className="text-base font-normal">/mo</span></p>
                <p className="text-xs mb-4 text-slate-400">Collaborative insights</p>
                <ul className="space-y-2 text-sm text-slate-300 mb-6">
                  <li>Shared sessions</li>
                  <li>Custom severity mapping</li>
                  <li>Email alert exports</li>
                  <li>Early access features</li>
                </ul>
                <Button variant="outline" onClick={onGetStarted}>Contact Sales</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <h4 className="text-2xl font-semibold mb-4">Ready to surface your hidden production signals?</h4>
          <Button size="lg" onClick={onGetStarted} className="bg-indigo-500 hover:bg-indigo-600">Start Analyzing Logs</Button>
          <p className="mt-3 text-xs text-slate-400">No signup required for Free tier.</p>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-700/50 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Log Analyzer. All rights reserved.
      </footer>
    </div>
  )
}
