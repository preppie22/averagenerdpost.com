---
layout: layouts/guides
title: 'Guides'
pagination:
    data: collections.guide
    size: 7
    reverse: true
    generatePageOnEmptyData: true
permalink: 'guides{% if pagination.pageNumber > 0 %}/page-{{ pagination.pageNumber | plus: 1 }}{% endif %}/index.html'
---

# Guides