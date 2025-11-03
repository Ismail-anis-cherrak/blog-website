// import posts from "@/data/posts.json"
// import Link from "next/link"
// import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// export default function BlogPage() {
//   return (
//     <main className="relative min-h-screen px-6 py-12 font-['JetBrains_Mono',monospace] text-gray-200">
//       {/* translucent gradient overlay to blend with Three.js */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120]/70 via-[#0b1120]/85 to-[#0b1120]/95 -z-10" />

//       <div className="max-w-5xl mx-auto relative z-10">
//         <h1 className="text-4xl font-extrabold mb-10 text-blue-300 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)] flex items-center gap-2">
//           📝 Ismail CHERRAK blog posts
//         </h1>

//         <div className="grid gap-6">
//           {posts.map((post) => (
//             <Card
//               key={post.slug}
//               className="border border-blue-900/50 bg-[rgba(15,23,42,0.7)] backdrop-blur-sm 
//               shadow-[0_0_25px_rgba(30,64,175,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] 
//               hover:scale-[1.01] transition-all duration-300"
//             >
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-blue-200 hover:text-blue-400 transition-colors">
//                   <Link href={`/blog/${post.slug}`}>{post.title}</Link>
//                 </CardTitle>

//                 <CardDescription className="text-gray-400">
//                   🗓️{" "}
//                   {new Date(post.date).toLocaleDateString("fr-FR", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </CardDescription>

//                 <p className="mt-3 text-gray-300 text-sm leading-relaxed">
//                   {post.excerpt}
//                 </p>
//               </CardHeader>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </main>
//   )
// }

"use client"

import postsData from "@/data/posts.json"
import Link from "next/link"
import { useState, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"




export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  

  // sort posts by newest first
  const posts = useMemo(() => {
    return [...postsData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [])

  // get all unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)))
    return ["all", ...cats]
  }, [posts])

  
  // filter posts based on category
  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((p) => p.category === selectedCategory)

  return (
    <main className="relative min-h-screen px-6 py-12 font-['JetBrains_Mono',monospace] text-gray-200">
      {/* background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120]/70 via-[#0b1120]/85 to-[#0b1120]/95 -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-300 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)] flex items-center gap-2">
          📝 Ismail CHERRAK Blog Posts
        </h1>

        {/* category filter buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
                ${
                  selectedCategory === cat
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "border-blue-700/50 text-blue-300 hover:bg-blue-800/40"
                }`}
            >
              {cat === "all" ? "All" : `#${cat}`}
            </Button>
          ))}
        </div>

        {/* posts grid */}
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.slug}
              className="border border-blue-900/50 bg-[rgba(15,23,42,0.7)] backdrop-blur-sm 
              shadow-[0_0_25px_rgba(30,64,175,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] 
              hover:scale-[1.01] transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-200 hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>

                <CardDescription className="text-gray-400">
                  🗓️{" "}
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>

                <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </CardHeader>
            </Card>
          ))}

          {filteredPosts.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Aucun article trouvé pour cette catégorie.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
