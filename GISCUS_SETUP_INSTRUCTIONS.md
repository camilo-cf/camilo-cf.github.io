# Giscus Comments Setup Instructions

## Current Status
❌ **GitHub Discussions is NOT enabled** on your repository.

Giscus requires GitHub Discussions to be enabled to work. This is a required first step.

## Setup Steps

### Step 1: Enable GitHub Discussions
1. Go to https://github.com/camilo-cf/camilo-cf.github.io/settings
2. Scroll down to the "Features" section
3. Check the box for "Discussions"
4. Click "Set up discussions"

### Step 2: Create Announcements Category
1. Go to https://github.com/camilo-cf/camilo-cf.github.io/discussions
2. Click "Categories" (or go directly to the categories settings)
3. Ensure there's an "Announcements" category
4. If not, create one with:
   - Name: Announcements
   - Description: "Comments from blog posts"
   - Format: "Announcement" (only maintainers can post)

### Step 3: Get Giscus Configuration
1. Go to https://giscus.app/
2. Enter your repository: `camilo-cf/camilo-cf.github.io`
3. Select mapping: "pathname" (already configured)
4. Select Discussion Category: "Announcements"
5. **Copy the `data-category-id` value** from the generated script

It will look something like: `DIC_kwDOB9aexs4CY1234`

### Step 4: Update _config.yml
Edit `_config.yml` line 31 and add the category_id:

```yaml
comments:
  provider: giscus
  giscus:
    repo: "camilo-cf/camilo-cf.github.io"
    repo_id: "MDEwOlJlcG9zaXRvcnkxMzA5NDg1NjU="
    category: "Announcements"
    category_id: "DIC_kwDOB9aexs4CY1234"  # ← Replace with your actual ID
    mapping: "pathname"
    reactions_enabled: "1"
    emit_metadata: "0"
    theme: "preferred_color_scheme"
    lang: "en"
    crossorigin: "anonymous"
    lazy: true
```

### Step 5: Verify Setup
1. Build your site locally or deploy
2. Visit a blog post
3. Scroll to the comments section
4. You should see the Giscus comments widget load
5. Try posting a test comment

## What Giscus Does
- Uses GitHub Discussions as the backend for comments
- Visitors comment using their GitHub account
- Comments are stored in your repo's Discussions
- Privacy-friendly (no ads, no tracking)
- Free and open source

## Alternative: Disable Comments Temporarily
If you don't want to set up GitHub Discussions right now, you can disable comments by changing line 26 in `_config.yml`:

```yaml
comments:
  provider: false  # Disables all comments
```

## Notes
- Current repo_id is correct: `MDEwOlJlcG9zaXRvcnkxMzA5NDg1NjU=`
- Once you get the category_id, I can update the config for you
- All other Giscus settings are already properly configured
