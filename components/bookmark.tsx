import { load } from "cheerio";
import Link from "next/link";

interface BookmarkProps {
  url: string;
}

async function getMeta(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // 1時間キャッシュ
    const html = await res.text();
    const $ = load(html);

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      "No Title";
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";
    const image =
      $('meta[property="og:image"]').attr("content") ||
      "";
    const favicon = 
      $('link[rel="icon"]').attr("href") || 
      $('link[rel="shortcut icon"]').attr("href") || 
      `/favicon.ico`;

    // 相対パスのfaviconを絶対パスに変換（簡易的）
    const faviconUrl = favicon.startsWith("http") 
      ? favicon 
      : new URL(favicon, url).toString();

    return { title, description, image, faviconUrl };
  } catch (error) {
    console.error("Failed to fetch meta:", error);
    return null;
  }
}

export async function Bookmark({ url }: BookmarkProps) {
  const meta = await getMeta(url);

  if (!meta) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block my-4 text-primary underline break-all"
      >
        {url}
      </Link>
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group my-6 flex w-full h-[140px] overflow-hidden rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors no-underline"
    >
      <div className="flex flex-1 flex-col justify-between p-4 min-w-0">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {meta.title}
          </div>
          <div className="text-xs text-muted-foreground line-clamp-2">
            {meta.description}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          {/* Favicon (エラー時は表示しない簡易実装) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={meta.faviconUrl} 
            alt="" 
            className="w-4 h-4 object-contain" 
          />
          <span className="text-xs text-muted-foreground truncate">
            {new URL(url).hostname}
          </span>
        </div>
      </div>
      
      {meta.image && (
        <div className="w-[180px] h-full relative border-l border-border shrink-0 hidden sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={meta.image}
            alt={meta.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </Link>
  );
}