import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseString } from "xml2js";
import { orderBy } from "lodash-es";

import type { Outline3, Root } from "../model/opml_types";

type Feed = {
  title: string;
  url: string;
  outline: Outline3[];
};

const Home: NextPage = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await fetch("/data.opml");
      const text = await data.text();
      const parsed = parseString(text, (err, result) => {
        const data = result as Root;
        const feeds = data.opml.body[0]?.outline[1]?.outline;
        console.log("🚀 ~ file: index.tsx:19 ~ parsed ~ data", result, feeds);

        if (!feeds) return;

        const feedData = feeds?.map((feed) => {
          const { $, outline = [] } = feed;
          return { title: $.title ?? "", url: $.htmlUrl ?? "", outline };
        });

        setFeeds(orderBy(feedData, (c) => c.title));
      });
    }

    void getData();
  }, []);

  return (
    <>
      <Head>
        <title>Podcast Explorer</title>
        <meta name="description" content="Recent favorite podcasts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] ">
        <div className="container flex max-w-3xl flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            podcast explorer
          </h1>
          <h2 className="text-3xl font-bold text-white">recent favorites</h2>
          <div className="flex flex-col gap-2">
            {feeds.map((feed) => (
              <div
                key={feed.url}
                className="flex flex-col border border-white p-2"
              >
                <Link
                  href={`${feed.url}`}
                  className="text-xl text-white"
                  target={"_blank"}
                >
                  {feed.title}
                </Link>
                <div className="grid grid-cols-4 gap-2">
                  {feed.outline
                    .filter((c) => c.$.userRecommendedDate)
                    .slice(0, 8)
                    .map((outline, idx) => (
                      <div key={idx}>
                        <Link
                          href={`${outline.$.overcastUrl}`}
                          className="text-white"
                          target={"_blank"}
                        >
                          {outline.$.title}
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
