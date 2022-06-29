---
title: "Tag Archive"
layout: "layouts/tags-feed.njk"
pagination:
  data: collections
  size: 1
  alias: tag
  filter: ["all", "nav", "posts", "rss"]
permalink: "/tag/{{ tag | slug }}/"
---
