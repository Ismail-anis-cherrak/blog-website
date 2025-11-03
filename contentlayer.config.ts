// // contentlayer.config.ts
// import { defineDocumentType, makeSource } from "contentlayer/source-files"

// export const Post = defineDocumentType(() => ({
//   name: "Post",
//   filePathPattern: `**/*.mdx`,
//   contentType: "mdx",
//   fields: {
//     title: { type: "string", required: true },
//     date: { type: "date", required: true },
//     description: { type: "string" },
//     tags: { type: "list", of: { type: "string" } },
//     category: { type: "string" },
//   },
//   computedFields: {
//     slug: {
//       type: "string",
//       resolve: (post) =>
//         post._raw.sourceFileName.replace(/\.mdx$/, ""),
//     },
//   },
// }))

// export default makeSource({
//   contentDirPath: "content",
//   documentTypes: [Post],
//   disableImportAliasWarning: true,
// })
import { defineDocumentType, makeSource } from '@contentlayer2/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string' },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  disableImportAliasWarning: true,
})
