"use client";
import { useState, useEffect } from "react";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "components/ResumeDropzone";
import { cx } from "lib/cx";
import { Heading, Link, Paragraph } from "components/documentation";
import { ResumeTable } from "resume-parser/ResumeTable";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { ResumeParserAlgorithmArticle } from "resume-parser/ResumeParserAlgorithmArticle";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/Arpita_resume.pdf",
    description: (
      <span>
        Added Arpita Resume for reference -{" "}
        <Link href="https://drive.google.com/file/d/1CXv79IUvH7UbHidHQqO-_UVXLrTFgpdm/view?usp=sharing">
          Link
        </Link>
      </span>
    ),
  },
  {
    fileUrl: "resume-example/Kulsum_resume.pdf",
    description: (
      <span>
          Added Kulsum's resume for reference -{" "}
        <Link href="https://drive.google.com/file/d/1pLP3qMYoCZu3lTEmeBQkxGuXuEMs2J4E/view?usp=drive_link">Link</Link>
      </span>
    ),
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0]["fileUrl"];
export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function test() {
      const textItems = await readPdf(fileUrl);
      setTextItems(textItems);
    }
    test();
  }, [fileUrl]);

  return (
    <main className="h-full w-full overflow-hidden bg-gray-800">
      <div className="grid md:grid-cols-6">
        <div className="flex justify-center text-white px-2 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end">
          <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0 text-white">
            <div className="aspect-h-[9.5] aspect-w-7 text-white">
              <iframe src={`${fileUrl}#navpanes=0`} className="h-full w-full" />
            </div>
          </section>
          <FlexboxSpacer maxWidth={45} className="hidden md:block text-white" />
        </div>
        <div className="flex px-6 text-white md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
          <section className="text-white max-w-[600px] grow">
            <Heading className="text-blue-500 !mt-4">
              Resume Parser Playground
            </Heading>
            <Paragraph smallMarginTop={true} className="text-white">
              This playground showcases the Echo resume parser and its
              ability to parse information from a resume PDF. Click around the
              PDF examples below to observe different parsing results.
            </Paragraph>
            <div className="mt-3 flex gap-3 text-white">
              {RESUME_EXAMPLES.map((example, idx) => (
                <article
                  key={idx}
                  className={cx(
                    "flex-1 text-blue-500 cursor-pointer rounded-md border-2 px-4 py-3 shadow-sm outline-none",
                    example.fileUrl === fileUrl
                      ? "border-blue-400"
                      : "border-gray-300"
                  )}
                  onClick={() => setFileUrl(example.fileUrl)}
                  onKeyDown={(e) => {
                    if (["Enter", " "].includes(e.key))
                      setFileUrl(example.fileUrl);
                  }}
                  tabIndex={0}
                >
                  <h1 className="text-white font-semibold">Resume Example {idx + 1}</h1>
                  <p className="mt-2 text-sm text-white">
                    {example.description}
                  </p>
                </article>
              ))}
            </div>
            <Paragraph className="text-gray-100">
              You can also{" "}
              <span className="text-blue-200 font-semibold">add your resume below</span> to
              get a parsed resume
            </Paragraph>
            <div className="mt-3">
              <ResumeDropzone
                onFileUrlChange={(fileUrl) =>
                  setFileUrl(fileUrl || defaultFileUrl)
                }
                playgroundView={true}
              />
            </div>
            <Heading level={2} className="text-white !mt-[1.2em]">
              Resume Parsing Results
            </Heading>
            <ResumeTable resume={resume}/>
            {/* <ResumeParserAlgorithmArticle
              textItems={textItems}
              lines={lines}
              sections={sections}
            /> */}
            <div className="text-white pt-24" />
          </section>
        </div>
      </div>
    </main>
  );
}
