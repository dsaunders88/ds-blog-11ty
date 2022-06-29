---
title: "Posts"
layout: "layouts/posts-feed.njk"
page_summary: Latest posts by Daniel Saunders.
pagination:
  data: collections.posts
  size: 5
  reverse: true
permalink: "posts{% if pagination.pageNumber > 0 %}/{{ pagination.pageNumber }}{% endif %}/index.html"
paginationPrevText: "Newer posts"
paginationNextText: "Older posts"
paginationAnchor: "#post-list"
---
