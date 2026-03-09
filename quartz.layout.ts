import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/LucasGuzman3D",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({
      title: "",
      filterFn: (node) => node.slug.toLowerCase().startsWith("projects") || node.slugSegment === "about",
      folderDefaultState: "collapsed",
      useSavedState: false,
    }),
  ],
  right: [],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({
      title: "",
      filterFn: (node) => node.slug.toLowerCase().startsWith("projects") || node.slugSegment === "about",
      folderDefaultState: "collapsed",
      useSavedState: false,
    }),
  ],
  right: [],
}
