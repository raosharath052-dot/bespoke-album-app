# Radiant Investments

Build a bespoke, full-stack wedding photography web application inspired by "THE BIG DAY by chai".



The application must include two core systems:

1. Public Client Website: Luxury editorial portfolio + Dynamic granular event-by-event quote builder.

2. Protected Admin CMS Dashboard (/admin): Upload photos, view inquiries, update studio branding, and dynamically create, edit, or delete events, cameras, and add-on services without code changes.



--- SUPABASE INTEGRATION ---

Connect to my Supabase project:

- NEXT_PUBLIC_SUPABASE_URL: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyb216Ym1yemVieHVjdGVlZGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3MDI2OTEsImV4cCI6MjEwNjI3ODY5MX0.vW-TRKQBda3lpHDko_PzymcOmtFpPEsZC8VMpaGIJdw"

- NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_sZ9pLplnVFABGaf4-4xDeg_KTZfcTrq"



Ensure Supabase client is initialized. Automatically configure database tables for:

- "site_settings" (id, studio_name, tagline, bio, logo_url, whatsapp_number, phone_number, instagram_url, youtube_url, studio_address)

- "portfolio_media" (id, title, category, media_url, is_hero, created_at)

- "event_types" (id, name, is_active, display_order)

- "services_cameras" (id, name, category, unit_price, is_active, display_order)

- "quote_inquiries" (id, client_name, phone, email, event_details, total_amount, status, created_at)

- Storage bucket: "portfolio" (for uploaded images & logo)



--- MODULE 1: PUBLIC CLIENT INTERFACE ---

Aesthetic & Tone:

- Clean, editorial luxury aesthetic: Dark matte background (#121212), warm beige accents, elegant serif headings, and clean sans-serif UI typography.

- Dynamically display the Studio Name and Tagline saved from the Admin panel across Navbar, Hero, and Footer.



1. Hero Section:

   - Fullscreen carousel of highlight photos pulled from the database.

   - Dynamic headline featuring the Studio Name and customizable Tagline.

   - Primary CTA: "Build Your Investment & Reserve Date".



2. Filterable Portfolio Gallery:

   - Filter tabs: "All", "Weddings", "Pre-Weddings", "Films".

   - High-performance masonry grid with lazy loading and lightbox full-res preview.

   - Video card embeds for YouTube/Vimeo wedding teasers.



3. Dynamic Event-by-Event Interactive Quote Calculator:

   - Step 1: Client dynamically adds events via "+ Add Event" button.

   - Step 2: For each event, client selects Event Type (fetched dynamically from database: Haldi, Mehendi, Sangeet, Muhurtham/Wedding, Reception, etc.), sets Date, Slot (Morning / Evening / Full Day), and Venue.

   - Step 3: Inside each added event, client selects required cameras/services (fetched dynamically from database: Candid Photographer, Traditional Photographer, Cinematic Video, Traditional Video, Drone, Crane/Jib, etc.) with quantity counter (+ / -).

   - Step 4: Add-ons & Deliverables section: Luxury Handcrafted Albums, Raw Footage SSD/HDD, Pre-Wedding session.

   - Step 5: Live Price Summary & Lead Drawer:

     * Sticky bottom bar showing dynamic real-time budget total.

     * Lead Capture Form: Name, Phone (WhatsApp), Email, Notes.

     * "Submit & Check Availability" button that writes lead data into Supabase and triggers a pre-formatted WhatsApp chat message directly to the studio's configured WhatsApp number.



--- MODULE 2: SECURE ADMIN CMS DASHBOARD (/admin) ---

1. Admin Authentication:

   - Simple secure login screen (default: admin@studio.com / admin123).



2. Site Branding & Settings Manager (Full Studio Customization):

   - Input fields to update:

     * Studio Name (updates Navbar, Hero, Footer, Title tag)

     * Tagline & Brand Philosophy statement

     * Studio Logo (upload file directly to Supabase storage)

     * WhatsApp Contact Number (for direct quote reception)

     * Calling Phone Number & Studio Address

     * Social Links: Instagram Profile URL, YouTube Channel URL

   - Saving these settings will immediately update the live public site without redeploying code.



3. Media & Gallery Manager:

   - Drag-and-drop file uploader that uploads directly to the Supabase "portfolio" storage bucket.

   - Set category (Weddings, Pre-Wedding, Films), title, and "Feature on Hero" toggle.

   - Add YouTube/Vimeo embed URLs for films.

   - Delete or reorder images.



4. Dynamic Events Manager (Add / Edit / Remove):

   - Admin can add brand-new event types (e.g., "Cocktail Night", "Vratham", "After Party").

   - Admin can rename, toggle active/inactive, or delete existing event types.

   - All changes immediately sync with the public event selector.



5. Dynamic Cameras & Services Pricing Matrix (Add / Edit / Remove):

   - Admin can click "+ Add New Camera / Service".

   - Fields: Service Name (e.g., "FPV Drone", "Lead Candid Photographer", "Live LED Setup"), Base Unit Price (INR), Category (Per-Event Camera vs. Deliverable Add-on), and Active toggle.

   - Admin can update rates, rename services, or delete/deactivate any camera option anytime.

   - Public calculator immediately recalculates based on these updated rates.



6. Inquiries & Leads Tracker:

   - Tabular list of submitted leads: Client name, phone number, list of each event with chosen cameras, total calculated price, submission date, and status (New, Contacted, Booked).

   - Direct button to launch WhatsApp chat with client with pre-filled greeting.



Deliver production-ready code with responsive layouts, fluid state management, and fallback dummy data if the database is initially empty.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bespoke-album-app.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7f8be9ae-6cac-403c-a49e-499747e57c4c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
