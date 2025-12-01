/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { type Author } from "@/lib/authors";
import { cn } from "@/lib/utils";

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <Link href={author.url || "#"} className="flex-shrink-0"> {/* 画像もリンクにしたい場合はここを囲む */}
        <img
          src={author.avatar}
          alt={author.name}
          className="rounded-full w-8 h-8 border border-border object-cover"
        />
      </Link>
      <div className="flex-1">
        <h3 className="text-sm tracking-tight text-balance font-semibold">
          {/* URLがある場合だけリンクにする分岐処理 */}
          {author.url ? (
            <Link 
              href={author.url} 
              className="hover:underline hover:text-primary transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {author.name}
            </Link>
          ) : (
            author.name
          )}
        </h3>
        <p className="text-xs text-muted-foreground text-balance">
          {author.position}
        </p>
      </div>
    </div>
  );
}
