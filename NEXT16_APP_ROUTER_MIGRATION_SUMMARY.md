# Next.js 16 App Router Migration Summary

## Current State

This repository was already using the Next.js App Router when the migration request started.

Confirmed baseline:

- `next@16.x` was already installed
- Routes were already under `app/`
- `proxy.ts` already existed
- There was no `pages/` directory to migrate
- `bun run build` was already passing on Next `16.2.0`

Because of that, the work completed here was a low-risk cleanup and standardization pass for the existing App Router codebase, not a full Pages Router to App Router rewrite.

## What Was Done

### Batch 0: Audit and Validation

Completed:

- Inspected the repository structure, routing setup, and config
- Confirmed the project was already on App Router
- Checked `package.json` and `next.config.ts`
- Searched for common migration leftovers such as:
  - `pages/`
  - `next/router`
  - `next/head`
  - `getServerSideProps`
  - `getStaticProps`
  - legacy API route patterns
- Ran a production build to verify the real compatibility state

Result:

- No broken App Router migration surface was found
- The build passed before edits

### Batch 1: Listing Page Search Params Cleanup

Goal:

- Standardize async `searchParams` usage for App Router pages
- Reduce misleading naming like resolved query objects being called `params`
- Keep behavior unchanged

Completed changes:

- Added explicit per-file async `searchParams` type aliases
- Added resolved `Awaited<...>` aliases for clarity
- Renamed resolved query objects from generic `params` to `resolvedSearchParams` where appropriate
- Updated internal component props so listing-result components receive resolved search params with clearer naming
- Normalized a few `parseInt` usages in those route files to `Number.parseInt`

Files updated in Batch 1:

- `app/(app)/courses/page.tsx`
- `app/(app)/resources/page.tsx`
- `app/(app)/syllabus/page.tsx`
- `app/(app)/forum/page.tsx`
- `app/(app)/notes/page.tsx`
- `app/(app)/past_papers/page.tsx`
- `app/(app)/mod/page.tsx`

Validation:

- `bun run build` passed after Batch 1

### Batch 2: Dynamic Route Params Cleanup

Goal:

- Standardize async `params` usage for dynamic App Router pages and route handlers
- Keep all route behavior unchanged

Completed changes:

- Added explicit per-file async `params` aliases for dynamic routes
- Added resolved `Awaited<...>` aliases for destructured route params
- Standardized `await params` destructuring across detail pages
- Standardized route handler param typing in App Router API and sitemap routes

Files updated in Batch 2:

- `app/(app)/past_papers/[id]/page.tsx`
- `app/(app)/notes/[id]/page.tsx`
- `app/(app)/resources/[id]/page.tsx`
- `app/(app)/forum/[id]/page.tsx`
- `app/(app)/courses/[code]/page.tsx`
- `app/(app)/courses/[code]/[exam]/page.tsx`
- `app/(app)/syllabus/[id]/page.tsx`
- `app/api/syllabus/by-course/[code]/route.ts`
- `app/sitemaps/[collection]/route.ts`

Validation:

- `bun run build` passed after Batch 2

## Files Touched So Far

### Batch 1

- `app/(app)/courses/page.tsx`
- `app/(app)/resources/page.tsx`
- `app/(app)/syllabus/page.tsx`
- `app/(app)/forum/page.tsx`
- `app/(app)/notes/page.tsx`
- `app/(app)/past_papers/page.tsx`
- `app/(app)/mod/page.tsx`

### Batch 2

- `app/(app)/past_papers/[id]/page.tsx`
- `app/(app)/notes/[id]/page.tsx`
- `app/(app)/resources/[id]/page.tsx`
- `app/(app)/forum/[id]/page.tsx`
- `app/(app)/courses/[code]/page.tsx`
- `app/(app)/courses/[code]/[exam]/page.tsx`
- `app/(app)/syllabus/[id]/page.tsx`
- `app/api/syllabus/by-course/[code]/route.ts`
- `app/sitemaps/[collection]/route.ts`

## What Still Needs To Be Done

Nothing critical is required to claim Next.js 16 + App Router compatibility for the current codebase.

The app is already on App Router and the production build is passing.

## Remaining Optional Work

These are optional cleanup items, not blockers.

### Option 1: Final Low-Risk Convention Cleanup

Possible scope:

- Clean up remaining style inconsistencies outside the route signature work
- Standardize remaining `parseInt` usages to `Number.parseInt` where appropriate
- Make route/page typing conventions more uniform across untouched files
- Review a few remaining naming inconsistencies in page components

Risk:

- Low

### Option 2: Structural Cleanup

Possible scope:

- Revisit route groups and layout boundaries
- Consolidate repeated page patterns
- Improve consistency between listing pages and detail pages
- Reduce duplication in metadata and page helpers

Risk:

- Medium

### Option 3: Full Modernization

Possible scope:

- Everything in Option 1 and Option 2
- Audit server/client boundaries more aggressively
- Consolidate repeated metadata generation patterns
- Review caching and revalidation conventions
- Review route-level data loading consistency

Risk:

- Higher than the completed batches because it changes more structure, even if functionality is intended to stay the same

## What Was Explicitly Not Done

To keep the migration incremental and reviewable, the following were intentionally not done:

- No route reorganization
- No conversion from `pages/` to `app/` because `pages/` did not exist
- No behavioral changes to data fetching
- No auth architecture changes
- No caching strategy rewrite
- No broad frontend refactors
- No cleanup in unrelated client-side logic such as quiz/favourites parsing beyond the files directly touched in the completed batches

## Validation Summary

Validation performed during this work:

- Initial `bun run build`
- Post-Batch-1 `bun run build`
- Post-Batch-2 `bun run build`

All passed on Next `16.2.0`.

## Bottom Line

The repository was already migrated to App Router before this work started.

The completed work so far:

- verified that state
- removed ambiguity around async `searchParams`
- removed ambiguity around async `params`
- standardized route/page signatures in a low-risk way
- preserved behavior
- kept the production build green throughout

If more work is desired, the remaining items are cleanup and modernization tasks, not a required App Router migration.
