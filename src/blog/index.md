---
layout: feed
title: "Blog"
eleventyNavigation:
    key: "Blog"
eleventyImport:
  collections: ["post"]
pagination:
    data: collections.post
    size: 5
    reverse: true
    prevText: "Newer posts"
    nextText: "Older posts"
    anchor: "#post-list"
contentDisplay:
    headline: "Recent Posts"
    emptyText: "No posts to display."
---