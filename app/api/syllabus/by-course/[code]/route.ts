import { NextResponse } from "next/server";
import { getSyllabusByCourseCode } from "@/lib/data/syllabus";

type SyllabusByCourseRouteParams = Promise<{ code: string }>;
type ResolvedSyllabusByCourseRouteParams = Awaited<SyllabusByCourseRouteParams>;

export async function GET(
  _request: Request,
  { params }: { params: SyllabusByCourseRouteParams },
) {
  const { code }: ResolvedSyllabusByCourseRouteParams = await params;
  const syllabus = await getSyllabusByCourseCode(code);

  return NextResponse.json({
    id: syllabus?.id ?? null,
    name: syllabus?.name ?? null,
  });
}
