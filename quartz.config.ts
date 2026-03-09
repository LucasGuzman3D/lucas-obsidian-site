import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Lucas Guzman",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "lucasguzman.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: false,
      typography: {
        header: "Bulevar",
        body: "Helvetica Neue",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8f7f4",
          lightgray: "#e8e6e1",
          gray: "#a8a49e",
          darkgray: "#3a3835",
          dark: "#1a1917",
          secondary: "#1a1917",
          tertiary: "#888280",
          highlight: "rgba(26, 25, 23, 0.06)",
          textHighlight: "#ffec9988",
        },
        darkMode: {
          light: "#141412",
          lightgray: "#242220",
          gray: "#605c58",
          darkgray: "#ccc9c4",
          dark: "#f0ede8",
          secondary: "#f0ede8",
          tertiary: "#888280",
          highlight: "rgba(240, 237, 232, 0.06)",
          textHighlight: "#ffec9944",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
