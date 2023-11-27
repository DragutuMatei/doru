import React, { useState, useEffect } from "react";
import Fire from "../Fire";

function BlogPost() {
  const [data, setData] = useState([]);
  const [newDataKey, setNewDataKey] = useState(null);

  useEffect(() => {
    // CKEDITOR.replace("post_text", {
    //   language: "en",
    //   uiColor: "#dddddd",
    //   height: 500,
    //   resize_dir: "vertical",
    // });
    const fetchData = async () => {
      try {
        const dbHandler = new Fire();

        // Example: Fetch data
        const fetchedData = await dbHandler.getData("/blog");
        // console.log(Object.entries(fetchedData));
        setData(fetchedData);

        // Object.entries(fetchedData).map((da) => {
        //   console.log(da[0] + "+" + da[1].name);
        // });

        // Example: Listen for real-time changes
        dbHandler.listenForChanges("/blog", (changedData) => {
          setData(changedData);
          console.log(changedData);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="mb-5">
                <h2 className="mb-4" style={{ lineHeight: "1.5" }}>
                  Elements That You Can Use To Create A New Post On This
                  Template.
                </h2>
                <span>
                  15 March 2020 <span className="mx-2">/</span>{" "}
                </span>
                <p className="list-inline-item">
                  Category :{" "}
                  <a href="#!" className="ml-1">
                    Photography{" "}
                  </a>
                </p>
                <p className="list-inline-item">
                  Tags :{" "}
                  <a href="#!" className="ml-1">
                    Photo{" "}
                  </a>{" "}
                  ,
                  <a href="#!" className="ml-1">
                    Image{" "}
                  </a>
                </p>
              </div>
              {/* <div className="mb-5 text-center">
                <div className="post-slider rounded overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={require("../images/blog/post-4.jpg")}
                    alt="Post Thumbnail"
                  />
                </div>
              </div> */}
              <div className="content">
                <h4 id="heading-example">Heading example</h4>
                <p>
                  Here is example of hedings. You can use this heading by
                  following markdownify rules. For example: use
                  <code>#</code> for heading 1 and use <code>######</code> for
                  heading 6.
                </p>
                <h1 id="heading-1">Heading 1</h1>
                <h2 id="heading-2">Heading 2</h2>
                <h3 id="heading-3">Heading 3</h3>
                <h4 id="heading-4">Heading 4</h4>
                <h5 id="heading-5">Heading 5</h5>
                <h6 id="heading-6">Heading 6</h6>
                <hr />
                <h5 id="emphasis">Emphasis</h5>
                <p>
                  Emphasis, aka italics, with <em>asterisks</em> or{" "}
                  <em>underscores</em>.
                </p>
                <p>
                  Strong emphasis, aka bold, with <strong>asterisks</strong> or{" "}
                  <strong>underscores</strong>.
                </p>
                <p>
                  Combined emphasis with{" "}
                  <strong>
                    asterisks and <em>underscores</em>
                  </strong>
                  .
                </p>
                <p>
                  Strikethrough uses two tildes. <del>Scratch this.</del>
                </p>
                <hr />
                <h5 id="link">Link</h5>
                <p>
                  <a href="https://www.google.com">
                    I&rsquo;m an inline-style link
                  </a>
                </p>
                <p>
                  <a href="https://www.google.com" title="Google's Homepage">
                    I&rsquo;m an inline-style link with title
                  </a>
                </p>
                <p>
                  <a href="https://www.themefisher.com">
                    I&rsquo;m a reference-style link
                  </a>
                </p>
                <p>
                  <a href="#!">
                    I&rsquo;m a relative reference to a repository file
                  </a>
                </p>
                <p>
                  <a href="https://gethugothemes.com">
                    You can use numbers for reference-style link definitions
                  </a>
                </p>
                <p>
                  Or leave it empty and use the{" "}
                  <a href="https://www.getjekyllthemes.com">link text itself</a>
                  .
                </p>
                <p>
                  URLs and URLs in angle brackets will automatically get turned
                  into links.
                  <a href="http://www.example.com">
                    http://www.example.com
                  </a> or{" "}
                  <a href="http://www.example.com">http://www.example.com</a>{" "}
                  and sometimes example.com (but not on Github, for example).
                </p>
                <p>
                  Some text to show that the reference links can follow later.
                </p>
                <hr />
                <h5 id="paragraph">Paragraph</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  nihil enim maxime corporis cumque totam aliquid nam sint
                  inventore optio modi neque laborum officiis necessitatibus,
                  facilis placeat pariatur! Voluptatem, sed harum pariatur
                  adipisci voluptates voluptatum cumque, porro sint minima
                  similique magni perferendis fuga! Optio vel ipsum excepturi
                  tempore reiciendis id quidem? Vel in, doloribus debitis
                  nesciunt fugit sequi magnam accusantium modi neque quis, vitae
                  velit, pariatur harum autem a! Velit impedit atque maiores
                  animi possimus asperiores natus repellendus excepturi sint
                  architecto eligendi non, omnis nihil. Facilis, doloremque
                  illum. Fugit optio laborum minus debitis natus illo
                  perspiciatis corporis voluptatum rerum laboriosam.
                </p>
                <hr />
                <h5 id="ordered-list">Ordered List</h5>
                <ol>
                  <li>List item</li>
                  <li>List item</li>
                  <li>List item</li>
                  <li>List item</li>
                  <li>List item</li>
                </ol>
                <hr />
                <h5 id="unordered-list">Unordered List</h5>
                <ul>
                  <li>List item</li>
                  <li>List item</li>
                  <li>List item</li>
                  <li>List item</li>
                  <li>List item</li>
                </ul>
                <hr />
                <h4 id="notice">Notice</h4>
                <div className="notices note">
                  <p>This is a simple note.</p>
                </div>
                <div className="notices tip">
                  <p>This is a simple tip.</p>
                </div>
                <div className="notices info">
                  <p>This is a simple info.</p>
                </div>
                <hr />
                <h4 id="tab">Tab</h4>
                <div className="code-tabs">
                  <ul className="nav nav-tabs"></ul>
                  <div className="tab-content">
                    <div className="tab-pane" title="first">
                      This is first tab
                    </div>
                    <div className="tab-pane" title="second">
                      this is second tab
                    </div>
                    <div className="tab-pane" title="third">
                      this is third tab
                    </div>
                  </div>
                </div>
                <hr />
                <h3 id="collapse">Collapse</h3>
                <div className="accordion accordion-wrapper">
                  <div className="accordion-item mb-1">
                    <h2
                      className="accordion-header accordion-button h5 fw-normal border-0 mt-4 p-0 text-capitalize"
                      id="heading-collapse-1"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-collapse-1"
                      aria-controls="collapse-collapse-1"
                    >
                      collapse 1
                    </h2>
                    <div
                      id="collapse-collapse-1"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading-collapse-1"
                    >
                      <div className="accordion-body p-0 pt-2 content">
                        This is a simple collapse
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion accordion-wrapper">
                  <div className="accordion-item mb-1">
                    <h2
                      className="accordion-header accordion-button h5 fw-normal border-0 mt-4 p-0 text-capitalize"
                      id="heading-collapse-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-collapse-2"
                      aria-controls="collapse-collapse-2"
                    >
                      collapse 2
                    </h2>
                    <div
                      id="collapse-collapse-2"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading-collapse-2"
                    >
                      <div className="accordion-body p-0 pt-2 content">
                        This is a simple collapse
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion accordion-wrapper">
                  <div className="accordion-item mb-1">
                    <h2
                      className="accordion-header accordion-button h5 fw-normal border-0 mt-4 p-0 text-capitalize"
                      id="heading-collapse-3"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-collapse-3"
                      aria-controls="collapse-collapse-3"
                    >
                      collapse 3
                    </h2>
                    <div
                      id="collapse-collapse-3"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading-collapse-3"
                    >
                      <div className="accordion-body p-0 pt-2 content">
                        This is a simple collapse
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <h5 id="blockquote">Blockquote</h5>
                <blockquote>
                  <p>This is a blockquote example.</p>
                </blockquote>
                <hr />
                <h5 id="tables">Tables</h5>
                <p>Colons can be used to align columns.</p>
                <table>
                  <thead>
                    <tr>
                      <th>Tables</th>
                      <th style={{ textAlign: "center" }}>Are</th>
                      <th style={{ textAlign: "right" }}>Cool</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>col 3 is</td>
                      <td style={{ textAlign: "center" }}>right-aligned</td>
                      <td style={{ textAlign: "right" }}>$1600</td>
                    </tr>
                    <tr>
                      <td>col 2 is</td>
                      <td style={{ textAlign: "center" }}>centered</td>
                      <td style={{ textAlign: "right" }}>$12</td>
                    </tr>
                    <tr>
                      <td>zebra stripes</td>
                      <td style={{ textAlign: "center" }}>are neat</td>
                      <td style={{ textAlign: "right" }}>$1</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  There must be at least 3 dashes separating each header cell.
                  The outer pipes (|) are optional, and you don&rsquo;t need to
                  make the raw Markdown line up prettily. You can also use
                  inline Markdown.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Markdown</th>
                      <th>Less</th>
                      <th>Pretty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <em>Still</em>
                      </td>
                      <td>
                        <code>renders</code>
                      </td>
                      <td>
                        <strong>nicely</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <h5 id="image">Image</h5>
                <p>
                  <img
                    loading="lazy"
                    decoding="async"
                    className="w-100 d-block mb-4"
                    src={require("../images/blog/post-4.jpg")}
                    alt="placeholder image"
                  />
                  <img
                    loading="lazy"
                    decoding="async"
                    className="w-100 d-block mb-4"
                    src="https://dummyimage.com/1100x500/e8e8e8/16161a.jpg"
                    alt="placeholder image"
                  />
                </p>
                <hr />
                <h5 id="youtube-video">Youtube video</h5>
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/KFmA9W8i4X4"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                    allowfullscreen
                    title="YouTube Video"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPost;
