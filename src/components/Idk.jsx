import React from 'react'
import cheerio, { text } from "cheerio";

const Idk = ({ htmlString }) => {
  const $ = cheerio.load(htmlString);

//   $("p").addClass("your-custom-class");
  $("h2").addClass("heading-1");
  $("h3").addClass("heading-2");
    $("h4").addClass("heading-3");
    
  $("h4").addClass("heading-3");


  const modifiedHtmlString = $.html();

  return (
    <div
      className="your-container-class"
      dangerouslySetInnerHTML={{ __html: modifiedHtmlString }}
    />
  );
};
export default Idk