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
paginationOptions:
    prevText: "Newer posts"
    nextText: "Older posts"
    anchor: "#post-list"
---