import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      LinkedIn: "https://linkedin.com/in/lucasguzman3d",
      GitHub: "https://github.com/LucasGuzman3D",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({
      title: "",
      filterFn: (node) => node.slug.toLowerCase().startsWith("projects") || node.slugSegment === "about" || node.slugSegment === "services",
      sortFn: (a, b) => {
        // Folders before files
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        // Both have dates: newest first
        if (a.data?.date && b.data?.date) {
          return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
        }
        // Fallback: alphabetical
        return a.displayName.localeCompare(b.displayName)
      },
      folderDefaultState: "collapsed",
      useSavedState: false,
    }),
  ],
  right: [],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({
      title: "",
      filterFn: (node) => node.slug.toLowerCase().startsWith("projects") || node.slugSegment === "about" || node.slugSegment === "services",
      sortFn: (a, b) => {
        // Folders before files
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        // Both have dates: newest first
        if (a.data?.date && b.data?.date) {
          return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
        }
        // Fallback: alphabetical
        return a.displayName.localeCompare(b.displayName)
      },
      folderDefaultState: "collapsed",
      useSavedState: false,
    }),
  ],
  right: [],
}
