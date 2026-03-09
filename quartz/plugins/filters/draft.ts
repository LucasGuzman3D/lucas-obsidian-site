import { QuartzFilterPlugin } from "../types"

export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    const draftFlag: boolean =
      vfile.data?.frontmatter?.draft === true || vfile.data?.frontmatter?.draft === "true"
    const publishFlag = vfile.data?.frontmatter?.publish
    const unpublished: boolean = publishFlag === false || publishFlag === "false"
    return !draftFlag && !unpublished
  },
})
