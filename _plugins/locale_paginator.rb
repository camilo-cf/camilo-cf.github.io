module LocalePagination
  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      paginated_pages = site.pages.select { |page| page.data["locale_paginate"] }
      paginated_pages.each do |page|
        locale = page.data["lang"] || site.config["lang"]
        per_page = determine_per_page(page, site)
        posts = posts_for_locale(site, locale)
        paginate(site, page, posts, per_page)
      end
    end

    private

    def determine_per_page(page, site)
      raw_value = page.data["paginate"] || site.config["paginate"] || 10
      value = raw_value.to_i
      value.positive? ? value : 10
    end

    def posts_for_locale(site, locale)
      site
        .posts
        .docs
        .select { |post| (post.data["lang"] || site.config["lang"]) == locale }
        .sort_by { |post| post.data["date"] || post.date }
        .reverse
    end

    def paginate(site, page, posts, per_page)
      total_pages = [(posts.size.to_f / per_page).ceil, 1].max
      base_path = ensure_trailing_slash(page.url)

      (1..total_pages).each do |page_number|
        pager = build_pager(posts, per_page, page_number, total_pages, base_path)
        if page_number == 1
          page.data["paginator"] = pager
        else
          site.pages << duplicate_page(site, page, page_number, pager, base_path)
        end
      end
    end

    def build_pager(posts, per_page, current_page, total_pages, base_path)
      offset = (current_page - 1) * per_page
      page_posts = posts.slice(offset, per_page) || []

      {
        "page" => current_page,
        "per_page" => per_page,
        "posts" => page_posts,
        "total_posts" => posts.size,
        "total_pages" => total_pages,
        "previous_page" => current_page > 1 ? current_page - 1 : nil,
        "previous_page_path" => current_page > 1 ? pagination_path(base_path, current_page - 1) : nil,
        "next_page" => current_page < total_pages ? current_page + 1 : nil,
        "next_page_path" => current_page < total_pages ? pagination_path(base_path, current_page + 1) : nil
      }
    end

    def pagination_path(base_path, page_number)
      return base_path if page_number <= 1

      File.join(base_path, "page#{page_number}/")
    end

    def duplicate_page(site, original_page, page_number, pager, base_path)
      dir = pagination_dir(original_page.url, page_number)
      new_page = Jekyll::PageWithoutAFile.new(site, site.source, dir, "index.html")
      new_page.content = original_page.content
      new_page.data = Jekyll::Utils.deep_merge_hashes(original_page.data, {})
      new_page.data["paginator"] = pager
      new_page.data["pagination_page_number"] = page_number
      new_page.data["locale_paginate"] = false
      new_page.data["permalink"] = pagination_path(base_path, page_number)
      new_page
    end

    def pagination_dir(base_path, page_number)
      trimmed_base = base_path.sub(%r{^/}, "").sub(%r{/$}, "")
      File.join(trimmed_base, "page#{page_number}")
    end

    def ensure_trailing_slash(path)
      path.end_with?("/") ? path : "#{path}/"
    end
  end
end
