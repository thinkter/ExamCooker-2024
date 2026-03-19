import { PrismaClient } from "@/src/generated/prisma";
import ForumPost from "./ForumPost";
import { auth } from "@/app/auth";
import { notFound } from "next/navigation";
import ViewTracker from "@/app/components/ViewTracker";

type ForumPostPageParams = Promise<{ id: string }>;
type ResolvedForumPostPageParams = Awaited<ForumPostPageParams>;

async function forumPostThread({ params }: { params: ForumPostPageParams }) {
  const prisma = new PrismaClient();

  const session = await auth();
  const userId = session?.user?.id;
  const { id }: ResolvedForumPostPageParams = await params;

  const forumpost = await prisma.forumPost.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      votes: {
        where: {
          userId: userId,
        },
      },
      tags: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
  if (!forumpost) {
    return notFound();
  }

  return (
    <>
      <ViewTracker id={forumpost.id} type="forumpost" title={forumpost.title} />
      <ForumPost post={forumpost} />
    </>
  );
}

export default forumPostThread;
