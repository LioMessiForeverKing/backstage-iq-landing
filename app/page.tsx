import Link from "next/link"
import Image from "next/image"
import { Music, BarChart2, MapPin, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  // Replace with your actual Google Form URL
  const googleFormUrl = "https://forms.gle/yourFormLinkHere"

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="container mx-auto py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-8 w-8 text-purple-500" />
          <span className="font-bold text-xl">Backstage IQ</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Beta Access
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Music Is Blowing Up. <span className="text-purple-500">Do You Know Where?</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300">
            Backstage IQ shows you where your fans are, what's trending, and what to do next—across Spotify, TikTok,
            YouTube, and Instagram.
          </p>
          <div className="pt-4">
            <Link href={googleFormUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg">
                Join the Beta →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Audio Waveform Divider */}
      <div className="py-8 flex justify-center">
        <div className="flex items-center gap-1">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-purple-500/70 rounded-full animate-pulse"
              style={{
                height: `${Math.sin(i * 0.5) * 20 + 30}px`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* How It Works */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-zinc-800/50 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Plug In Your Platforms</h3>
            <p className="text-zinc-300">Connect your Spotify, TikTok, YouTube, Instagram.</p>
          </div>

          <div className="bg-zinc-800/50 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Get Your Fan Map + Trend Alerts</h3>
            <p className="text-zinc-300">See what's growing, what's dying, and what to drop next.</p>
          </div>

          <div className="bg-zinc-800/50 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Turn Insights Into Action</h3>
            <p className="text-zinc-300">Drop songs, plan tours, go viral—strategically.</p>
          </div>
        </div>
      </section>

      {/* Mockup Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-zinc-800/30 rounded-xl p-4 md:p-8 overflow-hidden">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=1000"
                alt="Backstage IQ Dashboard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold mb-2">Fan Heatmap + Platform Tracker</h3>
                <p className="text-zinc-300 max-w-md">
                  See exactly where your audience is growing and which platforms are driving your success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems & Solutions Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          🎶 What Problems Do Artists Have — And How We're Solving Them 🎶
        </h2>
        <div className="max-w-5xl mx-auto space-y-8 mt-12">
          {/* Problem 1 */}
          <div className="bg-zinc-800/30 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎯</span> "I don't know where my fans actually are."
                </h3>
                <p className="text-zinc-300">
                  You're streaming in 40 countries, but still asking, "Where should I play next?"
                </p>
              </div>
              <div className="md:w-1/2 bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-bold text-purple-400 mb-2">Our Fix:</h4>
                <p className="text-zinc-200">
                  Real-time fan heatmap 🎛️ shows your top cities and countries—pulled straight from Spotify and YouTube.
                  Book smarter. Promote smarter.
                </p>
              </div>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="bg-zinc-800/30 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚀</span> "Some songs blow up, and I find out too late."
                </h3>
                <p className="text-zinc-300">Your track went viral 3 days ago... and you missed the momentum.</p>
              </div>
              <div className="md:w-1/2 bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-bold text-purple-400 mb-2">Our Fix:</h4>
                <p className="text-zinc-200">
                  Smart spike alerts 🔔 let you know as it's happening—so you can drop content, push ads, or go live
                  when it counts.
                </p>
              </div>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="bg-zinc-800/30 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                  <span className="text-2xl">⏱️</span> "I waste hours checking 5 platforms every week."
                </h3>
                <p className="text-zinc-300">
                  Spotify, TikTok, YouTube, Instagram. 5 tabs. 10 passwords. Zero clarity.
                </p>
              </div>
              <div className="md:w-1/2 bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-bold text-purple-400 mb-2">Our Fix:</h4>
                <p className="text-zinc-200">
                  One clean dashboard 🎚️. One login. All your performance data, trends, and insights in one place. Simple
                  AF.
                </p>
              </div>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="bg-zinc-800/30 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                  <span className="text-2xl">💸</span> "The tools out there are made for labels—not artists."
                </h3>
                <p className="text-zinc-300">
                  Chartmetric and Soundcharts are great... if you're a label with interns.
                </p>
              </div>
              <div className="md:w-1/2 bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-bold text-purple-400 mb-2">Our Fix:</h4>
                <p className="text-zinc-200">
                  Built for artists. Affordable, beautiful, no BS. $29/month, and actually useful.
                </p>
              </div>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="bg-zinc-800/30 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎤</span> "I see numbers, but I don't know what to do with them."
                </h3>
                <p className="text-zinc-300">Streams up. Views up. Cool. Now what—drop another song? Run ads? Tour?</p>
              </div>
              <div className="md:w-1/2 bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-bold text-purple-400 mb-2">Our Fix:</h4>
                <p className="text-zinc-200">
                  Weekly recaps + real-time tips. 📬 We translate numbers into moves. Data → Strategy → Growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-12 rounded-2xl">
          <BarChart2 className="h-16 w-16 text-purple-500 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold">Built for artists. Not for spreadsheets.</h2>
          <div className="pt-4">
            <Link href={googleFormUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg">
                Get Early Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 border-t border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-purple-500" />
            <span className="font-bold">Backstage IQ</span>
          </div>
          <p className="text-zinc-400 text-sm">© {new Date().getFullYear()} Backstage IQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

