# TinaCMS Demo Setup

This demo integrates TinaCMS into the StartOver Next.js project, allowing you to manage 5 sample sites with a block-based content model.

## Quick Start

```bash
cd /Users/office/startover
npm run dev
```

Visit: http://localhost:3000/demo

## Demo Features

✅ **5 Sample Sites** - Access via `/demo` route:
- S.P.A.R.K.s Vietnamese
- 10 Doorways  
- Right Wrong
- HERE
- Thoughtmap

✅ **Block-Based Content**:
- Hero (title, subtitle, background image)
- TextSection (heading + body)
- Gallery (image grid)
- BigMedia (full-width image)
- FullWidthImage (image + overlay text)
- VideoBlock (YouTube/Vimeo embed)

✅ **TinaCMS Editor** - Edit content at `/admin`

## File Structure

```
startover/
├── app/demo/                    # Demo pages
│   ├── page.tsx                 # Demo home (lists 5 sites)
│   └── [slug]/page.tsx          # Dynamic site pages
├── components/blocks/            # Block components
│   ├── Hero.tsx
│   ├── TextSection.tsx
│   ├── Gallery.tsx
│   ├── BigMedia.tsx
│   ├── FullWidthImage.tsx
│   └── VideoBlock.tsx
├── content/                      # TinaCMS content
│   ├── sites/                    # 5 sample site markdown files
│   └── templates/                # Template definitions
├── tina/
│   └── config.ts                 # TinaCMS schema
└── ...
```

## Configuration

### TinaCMS Config
Edit `tina/config.ts` to:
- Add/remove collections
- Modify block field definitions
- Update template configurations

### Add New Sites
1. Create markdown file in `content/sites/{slug}.md`
2. Add entry to demo sites array in `app/demo/page.tsx`
3. Add site data to `DEMO_SITES` object in `app/demo/[slug]/page.tsx`

### Connect to CMS Backend
1. Get credentials from https://cloud.tinaincms.io
2. Update `.env.local`:
   ```
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
   TINA_TOKEN=your_token
   ```
3. Enable git-based storage for production

## Next Steps

1. **Test locally** - Visit `/demo` to see the demo sites
2. **Edit in CMS** - Go to `/admin` to edit content
3. **Add images** - Upload via media picker in CMS
4. **Deploy to Vercel** - Push to GitHub and connect Vercel
5. **Migrate HTML** - Use HTML parser to convert site HTML to blocks

## Environment Setup

For production deployment with Cloudflare CDN:

```bash
# .env.local
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_BUCKET=your_bucket
```

## Resources

- [TinaCMS Docs](https://tina.io/docs/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/)
