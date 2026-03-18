import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import Pagination from "../../components/Pagination";
import ForumCard from "../../components/ForumCard";
import SearchBar from "../../components/SearchBar";
import Dropdown from "../../components/FilterComponent";
import NewForumButton from "../../components/NewForumButton";
import { auth } from "@/app/auth";
import { getForumCount, getForumPage } from "@/lib/data/forum";

type ForumSearchParams = Promise<{
  page?: string;
  search?: string;
  tags?: string | string[];
}>;
type ResolvedForumSearchParams = Awaited<ForumSearchParams>;

function validatePage(page: number, totalPages: number): number {
  if (isNaN(page) || page < 1) {
    return 1;
  }
  if (page > totalPages && totalPages > 0) {
    return totalPages;
  }
  return page;
}

function ForumSkeleton() {
  return (
    <div className="w-full mx-auto space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="w-full flex pl-11 pr-7 pt-7 justify-center">
          <div className="bg-[#5FC4E7]/40 dark:bg-[#ffffff]/5 dark:lg:bg-[#0C1222] border-2 border-transparent p-5 md:p-10 size-full md:size-5/6 transition duration-200">
            <div className="flex justify-between items-center">
              <div className="h-6 w-1/2 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
              <div className="flex items-center space-x-4">
                <div className="h-6 w-20 bg-black/10 dark:bg-white/10 rounded animate-pulse hidden md:block" />
                <div className="h-6 w-16 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-3 mt-6 w-full bg-black/10 dark:bg-white/10 rounded animate-pulse" />
            <div className="h-3 mt-2 w-3/4 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
            <div className="flex justify-between items-center mt-6">
              <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-4 bg-black/10 dark:bg-white/10 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function ForumResults({
  searchParams,
}: {
  searchParams: ResolvedForumSearchParams;
}) {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const pageSize = 5;
  const search = searchParams.search || "";
  const page = Number.parseInt(searchParams.page || "1", 10);
  const tags: string[] = Array.isArray(searchParams.tags)
    ? searchParams.tags
    : searchParams.tags
      ? searchParams.tags.split(",")
      : [];
  const normalizedTags = [...tags].sort();

  const totalCount = await getForumCount({
    search,
    tags: normalizedTags,
  });
  const totalPages = Math.ceil(totalCount / pageSize);
  const validatedPage = validatePage(page, totalPages);
  const paginatedForumPosts = await getForumPage({
    search,
    tags: normalizedTags,
    page: validatedPage,
    pageSize,
    currentUserId,
  });

  if (validatedPage !== page) {
    const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";
    const tagsQuery =
      tags.length > 0 ? `&tags=${encodeURIComponent(tags.join(","))}` : "";
    redirect(`/forum?page=${validatedPage}${searchQuery}${tagsQuery}`);
  }

  return (
    <>
      <div className="w-full mx-auto">
        {paginatedForumPosts.length > 0 ? (
          <div className="space-y-4">
            {paginatedForumPosts.map((eachPost) => (
              <ForumCard
                key={eachPost.id}
                title={eachPost.title}
                author={eachPost.author.name || "Unknown"}
                desc={eachPost.description || "No description available"}
                createdAt={eachPost.createdAt}
                tags={eachPost.tags}
                post={eachPost}
                commentCount={eachPost._count.comments}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-8">
            {search || tags.length > 0
              ? "No forum posts found matching your search or selected tags."
              : "No forum posts found."}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-auto">
          <Pagination
            currentPage={validatedPage}
            totalPages={totalPages}
            basePath="/forum"
            searchQuery={search}
            tagsQuery={tags.join(",")}
          />
        </div>
      )}
    </>
  );
}

export default async function ForumPage({
  searchParams,
}: {
  searchParams?: ForumSearchParams;
}) {
  const resolvedSearchParams: ResolvedForumSearchParams =
    (await searchParams) ?? {};
  const search = resolvedSearchParams.search || "";
  return (
    <div className="transition-colors flex flex-col items-center min-h-screen text-black dark:text-[#D5D5D5] px-2 sm:px-4 lg:px-8 py-2 sm:py-4 lg:py-8">
      <h1 className="text-center mb-4">Forum</h1>

      <div className="hidden w-5/6 lg:w-1/2 md:flex items-center justify-center p-4 space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
        <Dropdown pageType="forum" />
        <SearchBar pageType="forum" initialQuery={search} />
        <NewForumButton />
      </div>

      <div className="flex-col w-5/6 md:hidden space-y-4">
        <SearchBar pageType="forum" initialQuery={search} />
        <div className="flex justify-between">
          <Dropdown pageType="forum" />
          <NewForumButton />
        </div>
      </div>

      <Suspense fallback={<ForumSkeleton />}>
        <ForumResults searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
