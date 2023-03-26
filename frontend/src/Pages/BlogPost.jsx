import React from 'react';

export const BlogPost = () => {
  return (
    <>
      <div className="post">
        <div className="content_img">
          <img
            src="https://techcrunch.com/wp-content/uploads/2023/02/this-week-in-apps-splash-2023.webp?w=850&h=492&crop=1"
            alt=""
          />
        </div>
        <div className="text_Content">
          <h1>
            This Week in Apps: TikTok goes to Congress, apps connect to ChatGPT,
            Microsoft's mobile games store plan.
          </h1>
          <p className="content_info">
            <a href="" className="content_author">
              Sarah Perez
            </a>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="content_summary">
            Welcome back to This Week in Apps, the weekly TechCrunch series that
            recaps the latest in mobile OS news, mobile applications and the
            overall app economy. The app economy in 2023 hit a few snags, as
            consumer spending last year dropped for the first time by 2% to $167
            billion, according to data.ai's “State of Mobile” report. However,
            downloads are continuing to grow, up 11% year-over-year in 2022 to
            reach 255 billion. Consumers are also spending more time in mobile
            apps than ever before. On Android devices alone, hours spent in 2022
            grew 9%, reaching 4.1 trillion. This Week in Apps offers a way to
            keep up with this fast-moving industry in one place with the latest
            from the world of apps, including news, updates, startup fundings,
            mergers and acquisitions, and much more.
          </p>
        </div>
      </div>
    </>
  );
};
