import posts from "@/data/posts.json"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
  params: { slug: string } | Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-gray-200 px-4 relative z-10">
        <h1 className="text-4xl font-bold mb-4 text-red-400">❌ Article non trouvé</h1>
        <p className="text-gray-400 mb-6">
          Le contenu demandé n’existe pas ou a été supprimé.
        </p>
        <Button asChild variant="secondary">
          <Link href="/blog">← Retour au blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <main
      className="relative min-h-screen text-gray-200 font-['JetBrains_Mono',monospace] px-4 py-10 flex justify-center"
    >
      {/* gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120]/70 via-[#0b1120]/80 to-[#0b1120]/95 -z-10" />

      <Card
        className="w-full max-w-4xl border border-blue-900/50 
        bg-[rgba(15,23,42,0.7)] backdrop-blur-sm 
        shadow-[0_0_25px_rgba(30,64,175,0.3)] relative z-10"
      >
        <CardHeader>
          <Button
            asChild
            variant="ghost"
            className="text-sm mb-2 w-fit px-0 hover:text-blue-400 transition-colors"
          >
            <Link href="/blog">← Retour au blog</Link>
          </Button>

          <CardTitle className="text-3xl font-bold text-blue-300 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
            {post.title}
          </CardTitle>

          <CardDescription className="text-gray-400">
            🗓️{" "}
            {new Date(post.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>

        <CardContent
          className="prose prose-invert max-w-none leading-relaxed text-gray-300 
          [&_h2]:text-blue-300 [&_strong]:text-blue-400 
          [&_li]:marker:text-blue-500 [&_a]:text-blue-400 [&_a:hover]:underline"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
      </Card>
    </main>
  )
}
