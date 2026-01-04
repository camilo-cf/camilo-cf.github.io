A Github Pages template for academic websites. This was forked (then detached) by [Stuart Geiger](https://github.com/staeiou) from the [Minimal Mistakes Jekyll Theme](https://mmistakes.github.io/minimal-mistakes/), which is © 2016 Michael Rose and released under the MIT License. See LICENSE.md.

I think I've got things running smoothly and fixed some major bugs, but feel free to file issues or make pull requests if you want to improve the generic template / theme.

# Instructions

1. Register a GitHub account if you don't have one and confirm your e-mail (required!)
1. Fork [this repository](https://github.com/academicpages/academicpages.github.io) by clicking the "fork" button in the top right. 
1. Go to the repository's settings (rightmost item in the tabs that start with "Code", should be below "Unwatch"). Rename the repository "[your GitHub username].github.io", which will also be your website's URL.
1. Set site-wide configuration and create content & metadata (see below -- also see [this set of diffs](http://archive.is/3TPas) showing what files were changed to set up [an example site](https://getorg-testacct.github.io) for a user with the username "getorg-testacct")
1. Upload any files (like PDFs, .zip files, etc.) to the files/ directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.  
1. Check status by going to the repository settings, in the "GitHub pages" section
1. (Optional) Use the Jupyter notebooks or python scripts in the `markdown_generator` folder to generate markdown files for publications and talks from a TSV file.

See more info at https://academicpages.github.io/

## Run locally

1. Install prerequisites: `ruby-dev`, `bundler`, and `nodejs`.
2. Install gems: `bundle install` (remove `Gemfile.lock` if you need to regenerate it).
3. Serve locally with GitHub Pages–compatible settings: `bundle exec jekyll serve --livereload`.

## Configuration highlights

- **SEO**: `jekyll-seo-tag` is enabled. Populate `_config.yml` with `title`, `description`, `url`, `logo`, `avatar`, `twitter_username`, and `social.links` for correct meta tags and JSON-LD output.
- **Pagination**: Locale-aware pagination runs via `_plugins/locale_paginator.rb`, generating per-locale paths like `/en/blog/page2/`, `/es-419/blog/page2/`, and `/pt-br/blog/page2/` with a default page size of 10.
- **CTA**: Configure `cta.contact_url`, `cta.subscribe_url`, `cta.case_study_url`, and `cta.show_case_study` to drive the post-level call-to-action buttons.
- **Newsletter**: Set `newsletter.provider`, `newsletter.form_action`, or `newsletter.embed_html` for hosted forms. RSS/Atom is always available at `/feed.xml`; no emails are stored locally.
- **AdSense**: Controlled via `adsense.enabled`, `adsense.client_id`, `adsense.publisher_id`, and `adsense.slot_ids.post_top`/`post_bottom`. Ads stay off until enabled and consented.
- **Consent**: The cookie banner defaults to opt-out and blocks analytics/ads until accepted. Customize labels and links under `consent_banner`.

## Verification checklist

- `sitemap.xml` and `feed.xml` are generated (after `bundle exec jekyll build`, check `_site/sitemap.xml` and `_site/feed.xml`).
- SEO meta tags (Open Graph + JSON-LD) render via `{% seo %}`.
- `/en/blog/`, `/es-419/blog/`, and `/pt-br/blog/` paginate per locale and support category/tag filters; pillar pages list matching posts.
- Reading time, related posts, and CTAs appear on post pages.
- Cookie/consent banner appears, stores consent, and only loads GA/Ads after acceptance (ads are off by default).
- Pagination, category/tag pages, and consent banner behave as expected when running `bundle exec jekyll serve`.

# Changelog -- bugfixes and enhancements

There is one logistical issue with a ready-to-fork template theme like academic pages that makes it a little tricky to get bug fixes and updates to the core theme. If you fork this repository, customize it, then pull again, you'll probably get merge conflicts. If you want to save your various .yml configuration files and markdown files, you can delete the repository and fork it again. Or you can manually patch. 

To support this, all changes to the underlying code appear as a closed issue with the tag 'code change' -- get the list [here](https://github.com/academicpages/academicpages.github.io/issues?q=is%3Aclosed%20is%3Aissue%20label%3A%22code%20change%22%20). Each issue thread includes a comment linking to the single commit or a diff across multiple commits, so those with forked repositories can easily identify what they need to patch.
