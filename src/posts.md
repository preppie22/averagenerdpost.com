---
layout: layouts/posts
title: 'Posts'
pagination:
    data: collections.post
    size: 10
    reverse: true
    generatePageOnEmptyData: true
permalink: 'posts{% if pagination.pageNumber > 0 %}/page-{{ pagination.pageNumber | plus: 1 }}{% endif %}/index.html'
---