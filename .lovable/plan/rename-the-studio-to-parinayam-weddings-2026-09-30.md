# Rename the studio to Parinayam Weddings

## Changes
- Replace the old studio name in all user-facing fallback data and migration defaults.
- Update every page title and social description to use Parinayam Weddings.
- Add self-referencing canonical and Open Graph URLs for each public page.
- Update the sitewide metadata and favicon declaration without creating duplicate page titles.
- Verify the initial header text and browser title in the live preview.

## Technical details
- Keep dynamic CMS branding after data loads, while the initial fallback is `Parinayam Weddings`.
- Use TanStack route `head()` metadata; this project has no standalone `index.html`.
- Preserve the existing favicon asset while relabeling its metadata, unless a new branded icon is supplied.
