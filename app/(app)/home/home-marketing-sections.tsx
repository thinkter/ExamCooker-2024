import React from "react";
import Image from "@/app/components/common/app-image";
import Link from "next/link";
import PastPaper from "@/public/LandingPage/landing-page-past-papers.svg";
import Notes from "@/public/LandingPage/landing-page-notes.svg";
import Resources from "@/public/LandingPage/landing-page-resource-repo.svg";
import Syllabus from "@/public/LandingPage/landing-page-syllabus.svg";
import GradientHeart from "@/public/LandingPage/gradient-heart.svg";
import { SignIn } from "@/app/components/sign-in";

const features = [
    {
        title: "Past Papers",
        content: "Conquer Your Exam Anxieties using our plethora of past papers",
        imagePath: PastPaper,
        alt: "Past papers illustration",
        href: "/past_papers",
    },
    {
        title: "Notes",
        content: "Access and Contribute to a vibrant collection of notes, created by students like you!",
        imagePath: Notes,
        alt: "Notes illustration",
        href: "/notes",
    },
    {
        title: "Syllabus",
        content: "Know exactly what's in scope before you even start to cram",
        imagePath: Syllabus,
        alt: "Syllabus illustration",
        href: "/syllabus",
    },
    {
        title: "Resource Repo",
        content: "Expand your learning horizon through curated links to top-notch articles and videos",
        imagePath: Resources,
        alt: "Resource repository illustration",
        href: "/resources",
    },
];

function FeatureLink({
    title,
    content,
    imagePath,
    alt,
    href,
}: (typeof features)[number]) {
    return (
        <Link
            href={href}
            className="group grid min-h-[11rem] grid-cols-[4.75rem_1fr] items-center gap-4 border border-[oklch(0.28_0.026_224_/_0.18)] bg-[oklch(0.97_0.018_214_/_0.78)] p-4 text-left transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[oklch(0.55_0.17_226_/_0.42)] hover:bg-[oklch(0.98_0.022_202)] hover:shadow-[0_16px_36px_oklch(0.32_0.08_226_/_0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.57_0.19_226)] dark:border-[oklch(0.88_0.015_220_/_0.18)] dark:bg-[oklch(0.2_0.034_232_/_0.78)] dark:hover:border-[oklch(0.78_0.16_184_/_0.48)] dark:hover:bg-[oklch(0.23_0.04_232)] sm:grid-cols-[5.5rem_1fr] sm:p-5"
        >
            <span className="flex h-16 w-16 items-center justify-center bg-[oklch(0.9_0.055_198)] dark:bg-[oklch(0.3_0.06_218)] sm:h-20 sm:w-20">
                <Image
                    src={imagePath}
                    alt={alt}
                    className="h-11 w-11 object-contain transition duration-200 ease-out group-hover:scale-105 dark:invert-[.835] dark:hue-rotate-180 sm:h-14 sm:w-14"
                />
            </span>
            <span className="min-w-0">
                <span className="block text-lg font-extrabold leading-tight text-[oklch(0.21_0.028_232)] dark:text-[oklch(0.88_0.015_220)] sm:text-xl">
                    {title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-[oklch(0.35_0.033_232_/_0.78)] dark:text-[oklch(0.88_0.015_220_/_0.72)]">
                    {content}
                </span>
            </span>
        </Link>
    );
}

export default function HomeMarketingSections({ isAuthed }: { isAuthed: boolean }) {
    return (
        <div className="bg-[oklch(0.91_0.047_204)] px-4 pt-10 text-[oklch(0.21_0.028_232)] transition-colors dark:bg-[oklch(0.16_0.038_232)] dark:text-[oklch(0.88_0.015_220)] sm:pt-14 lg:px-8">
            <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start lg:gap-12">
                <section className="lg:sticky lg:top-8">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[oklch(0.39_0.12_226)] dark:text-[oklch(0.75_0.15_184)]">
                        For Crammers By Crammers
                    </p>
                    <h2 className="mt-4 max-w-[12ch] text-4xl font-extrabold leading-[0.98] text-[oklch(0.2_0.035_232)] dark:text-[oklch(0.9_0.015_220)] sm:text-5xl lg:text-6xl">
                        Everything you need to cram like a champion is under one roof.
                    </h2>
                    <p className="mt-6 max-w-xl text-base leading-7 text-[oklch(0.35_0.033_232_/_0.8)] dark:text-[oklch(0.88_0.015_220_/_0.72)] sm:text-lg">
                        Remember the days of desperately searching the web for past papers,
                        only to get lost in a maze of irrelevant links?
                        <br />
                        We do too! Thats why we built this website - a haven for students who
                        are tired of the exam prep struggle.
                        <br />
                        Here, everything you need to cram like a champion is under one roof.
                        <br />
                        Let&apos;s conquer those exams together!
                    </p>

                    {!isAuthed && (
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <SignIn displayText="Sign In" />
                            <span className="text-sm font-semibold text-[oklch(0.35_0.033_232_/_0.68)] dark:text-[oklch(0.88_0.015_220_/_0.62)]">
                                Start Cooking Your Academic Success Today
                            </span>
                        </div>
                    )}
                </section>

                <section aria-label="ExamCooker resources" className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {features.map((feature) => (
                        <FeatureLink key={feature.title} {...feature} />
                    ))}
                </section>
            </div>

            <section className="mx-auto mt-12 flex min-h-36 w-full max-w-7xl items-center justify-center border-t border-[oklch(0.28_0.026_224_/_0.14)] py-10 dark:border-[oklch(0.88_0.015_220_/_0.14)] sm:mt-14 sm:min-h-44 sm:py-12">
                <div className="flex justify-center">
                    <p className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-lg font-extrabold text-[oklch(0.24_0.03_232)] dark:text-[oklch(0.88_0.015_220)] sm:text-xl">
                        <span>Made with love</span>
                        <Image
                            src={GradientHeart}
                            alt=""
                            aria-hidden="true"
                            className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
                        />
                        <span>by ACM VIT</span>
                    </p>
                </div>
            </section>
        </div>
    );
}
