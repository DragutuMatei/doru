import React, { useState, useEffect } from "react";
import Fire from "../Fire";
import "../css/admin.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Idk from "../components/Idk";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import cheerio from "cheerio";
import { Link } from "react-router-dom";

const fire = new Fire();
const YourReactComponent = () => {
  const [data, setData] = useState([]);
  const [newDataKey, setNewDataKey] = useState(null);
  const [user, loading, error] = useAuthState(fire.getuser());
  const [categories, setCategories] = useState([]);
  const [oldData, setOldData] = useState([]);
  const deletePost = async (id) => {
    const fire = new Fire();

    await fire.deleteData(`/blog/${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbHandler = new Fire();

        // Example: Fetch data
        const fetchedData = await dbHandler.getData("/blog");
        // console.log(Object.entries(fetchedData));
        setData(fetchedData);
        setOldData(fetchedData);

        const fetchedData1 = await dbHandler.getData(`/categories`);
        setCategories(fetchedData1);
        console.log("cate:", fetchedData1);
        // Object.entries(fetchedData).map((da) => {
        //   console.log(da[0] + "+" + da[1].name);
        // });

        // Example: Listen for real-time changes
        dbHandler.listenForChanges("/blog", (changedData) => {
          setData(changedData);
          setOldData(changedData);
          console.log(changedData);
        });
        dbHandler.listenForChanges("/categories", (changedData) => {
          setCategories(changedData);
          console.log("cate: ", changedData);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    console.log(user);

    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.uid == process.env.REACT_APP_ID) setLogged(true);
  }, [, user]);
  const filterCategory = (cat) => {
    console.log(cat);
    if (cat === "toate postarile") {
      setData(oldData);
      return;
    }
    const newdata = Object.entries(oldData).filter(
      (dat) => dat[1].category == cat
    );
    let hh = {};
    newdata.forEach((ok) => {
      hh[ok[0]] = ok[1];
    });
    setData(hh);
  };
  const [name, setName] = useState("");
  const [textEditor, setTextEditor] = useState([]);
  const [images, setImages] = useState([]);
  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const [videos, setVideos] = useState([]);
  const videosupdates = (event) => {
    const files = Array.from(event.target.files);
    setVideos(files);
  };
  const [loading_submit, setLoading] = useState(false);
  const submit = async () => {
    setLoading(true);
    try {
      const dbHandler = new Fire();

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth()).padStart(2, "0");
      var yyyy = today.getFullYear();
      const monthsAbbreviated = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      today = dd + " " + monthsAbbreviated[mm] + ", " + yyyy;

      const storage = getStorage();
      let downloadUrls = [];
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const storageRef = ref(storage, `blog/images/${image.name}`);
        try {
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
          downloadUrls.push(url);
        } catch (error) {
          alert(error);
          setLoading(false);
        }
      }

      let videosUlrs = [];
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const storageRef = ref(storage, `blog/videos/${video.name}`);
        try {
          await uploadBytes(storageRef, video);
          const url = await getDownloadURL(storageRef);
          videosUlrs.push(url);
        } catch (error) {
          setLoading(false);
          alert(error);
        }
      }

      const data = {
        text: textEditor,
        data: today,
        tags,
        category: category_input,
        timestamp: new Date().getTime(),
        images: downloadUrls,
        videos: videosUlrs,
      };
      console.log(data);
      const newDataId = await dbHandler.createData("/blog", data);
      console.log("e ok");
      toast("e ok");
      setNewDataKey(newDataId);
      setTextEditor([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
    // console.("e ok2")
  };

  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);

  const [cat, setCat] = useState("");

  const submitCat = async () => {
    const dbHandler = new Fire();
    await dbHandler.createData("/categories", { category: cat });
    toast("e top!");
  };

  const [logged, setLogged] = useState(false);
  const login = async () => {
    const fire = new Fire();
    const newUser = await fire.loginWithGoogle();
    if (
      newUser.uid == process.env.REACT_APP_ID ||
      newUser.uid == process.env.REACT_APP_ID2
    )
      setLogged(true);
    console.log(newUser);
  };
  const [category_input, setCategoryInput] = useState("");
  return (
    <>
      <br />
      <br />

      {logged ? (
        <div>
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "ckfinder",
                "|",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "|",
                "undo",
                "redo",
              ],
            }}
            onInit={(editor) => {
              console.log("Editor is ready to use!", editor);
              console.log(
                "toolbar: ",
                Array.from(editor.ui.componentFactory.names())
              );
              console.log(
                "plugins: ",
                ClassicEditor.builtinPlugins.map((plugin) => plugin.pluginName)
              );
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log(data);
              setTextEditor(data);
            }}
            onBlur={(editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(editor) => {
              console.log("Focus.", editor);
            }}
            onReady={(e) => {
              console.log("GATAAA: ", e);
            }}
          />
          <h1>Category: </h1>
          <Select
            options={
              categories != null &&
              Object.entries(categories) &&
              Object.entries(categories).map((cat) => {
                return { value: cat[1].category, label: cat[1].category };
              })
            }
            onChange={(e) => {
              setCategoryInput(e.value);
            }}
          />
          <h1>poze:</h1>
          <input type="file" multiple onChange={handleFileInputChange} />
          <h1>videos:</h1>
          <input type="file" multiple onChange={videosupdates} />
          <br />
          <br />
          <br />
          <br />
          {loading_submit ? (
            <h1>Loading</h1>
          ) : (
            <button onClick={submit}>Add blog post</button>
          )}
          <br />
          <div className="section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="content">
                    <Idk htmlString={textEditor} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <hr />
          <br />
          <br />
          <br />
          <div>
            <h1>Add Category</h1>
            <input type="text" onChange={(e) => setCat(e.target.value)} />
            <button onClick={submitCat}>submit category</button>
          </div>
          <div>
            <section className="section">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                    <div className="me-lg-4">
                      <div className="row gy-5">
                        {data != null &&
                          Object.entries(data) &&
                          Object.entries(data)
                            .reverse()
                            .map((da) => {
                              console.log(da[1].text);
                              if (da[1].text) {
                                const $ = cheerio.load(da[1].text);
                                const h2 = $("h2").first().text();
                                const p =
                                  $("p").first().text().length > 81
                                    ? $("p").first().text().slice(0, 81) + "..."
                                    : $("p").first().text();

                                return (
                                  <>
                                    <div className="col-md-6" data-aos="fade">
                                      <article className="blog-post">
                                        <div className="post-slider slider-sm rounded">
                                          <img
                                            loading="lazy"
                                            decoding="async"
                                            src={
                                              da[1].images && da[1].images[0]
                                            }
                                            alt="Post Thumbnail"
                                          />
                                        </div>
                                        <div className="pt-4">
                                          <p className="mb-3">{da[1].data}</p>
                                          <h2 className="h4">
                                            <Link
                                              className="text-black"
                                              to={`/blog/${da[0]}`}
                                            >
                                              {h2}
                                            </Link>
                                          </h2>
                                          <p>{p}</p>
                                          <Link
                                            to={`#`}
                                            className="text-primary fw-bold"
                                            aria-label="Read the full article by clicking here"
                                            onClick={() => deletePost(da[0])}
                                          >
                                            Delete this post
                                          </Link>
                                        </div>
                                      </article>
                                    </div>
                                  </>
                                );
                              }
                            })}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="widget widget-categories">
                      <h5 className="widget-title">
                        <span>Category</span>
                      </h5>
                      <ul className="list-unstyled widget-list">
                        <li onClick={() => filterCategory("toate postarile")}>
                          <Link to={"#"}>Toate postarile</Link>
                        </li>
                        {categories != null &&
                          Object.entries(categories) &&
                          Object.entries(categories).map((cat) => {
                            return (
                              <li
                                onClick={() => filterCategory(cat[1].category)}
                              >
                                <Link to={"#"}>{cat[1].category}</Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                    <div className="widget">
                      <h5 className="widget-title">
                        <span>Latest Article</span>
                      </h5>

                      {oldData != null &&
                        Object.entries(oldData) &&
                        Object.entries(oldData)
                          .reverse()
                          .sort(function (a, b) {
                            return b.timestamp - a.timestamp;
                          })
                          .map((da, index) => {
                            if (index < 3) {
                              const $ = cheerio.load(da[1].text);
                              const h2 = $("h2").first().text();

                              return (
                                <>
                                  <ul className="list-unstyled widget-list">
                                    <li className="d-flex widget-post align-items-center">
                                      <Link
                                        className="text-black"
                                        to={`/blog/${da[0]}`}
                                      >
                                        <div className="widget-post-image flex-shrink-0 me-3">
                                          <img
                                            className="rounded"
                                            loading="lazy"
                                            decoding="async"
                                            src={
                                              da[1].images && da[1].images[0]
                                            }
                                            alt="Post Thumbnail"
                                          />
                                        </div>
                                      </Link>
                                      <div className="flex-grow-1">
                                        <h5 className="h6 mb-0">
                                          <Link
                                            className="text-black"
                                            to={`/blog/${da[0]}`}
                                          >
                                            {h2}
                                          </Link>
                                        </h5>
                                        <small>{da[1].data}</small>
                                      </div>
                                    </li>
                                  </ul>
                                </>
                              );
                            }
                          })}

                      {/* <ul className="list-unstyled widget-list">
                  <li className="d-flex widget-post align-items-center">
                    <Link className="text-black" to="/blog/elements/">
                      <div className="widget-post-image flex-shrink-0 me-3">
                        <img
                          className="rounded"
                          loading="lazy"
                          decoding="async"
                          src={require("../images/blog/post-4.jpg")}
                          alt="Post Thumbnail"
                        />
                      </div>
                    </Link>
                    <div className="flex-grow-1">
                      <h5 className="h6 mb-0">
                        <Link className="text-black" to="/blog/1">
                          Elements That You Can Use To Create A New Post On This
                          Template.
                        </Link>
                      </h5>
                      <small>March 15, 2020</small>
                    </div>
                  </li>
                </ul>
                <ul className="list-unstyled widget-list">
                  <li className="d-flex widget-post align-items-center">
                    <Link className="text-black" to="/blog/post-1/">
                      <div className="widget-post-image flex-shrink-0 me-3">
                        <img
                          className="rounded"
                          loading="lazy"
                          decoding="async"
                          src={require("../images/blog/post-1.jpg")}
                          alt="Post Thumbnail"
                        />
                      </div>
                    </Link>
                    <div className="flex-grow-1">
                      <h5 className="h6 mb-0">
                        <Link className="text-black" to="/blog/1">
                          Cheerful Loving Couple Bakers Drinking Coffee
                        </Link>
                      </h5>
                      <small>March 14, 2020</small>
                    </div>
                  </li>
                </ul>
                <ul className="list-unstyled widget-list">
                  <li className="d-flex widget-post align-items-center">
                    <Link className="text-black" to="/blog/post-2/">
                      <div className="widget-post-image flex-shrink-0 me-3">
                        <img
                          className="rounded"
                          loading="lazy"
                          decoding="async"
                          src={require("../images/blog/post-2.jpg")}
                          alt="Post Thumbnail"
                        />
                      </div>
                    </Link>
                    <div className="flex-grow-1">
                      <h5 className="h6 mb-0">
                        <Link className="text-black" to="/blog/1">
                          Cheerful Loving Couple Bakers Drinking Coffee
                        </Link>
                      </h5>
                      <small>March 14, 2020</small>
                    </div>
                  </li>
                </ul> */}
                    </div>
                    <div className="widget">
                      <h4 className="widget-title">
                        <span>Social Links</span>
                      </h4>
                      <ul className="list-unstyled list-inline mb-0 social-icons">
                        <li className="list-inline-item me-3">
                          <Link
                            title="Explorer Facebook Profile"
                            className="text-black"
                            to="https://facebook.com/"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li className="list-inline-item me-3">
                          <Link
                            title="Explorer Twitter Profile"
                            className="text-black"
                            to="https://twitter.com/"
                          >
                            <i className="fab fa-twitter"></i>
                          </Link>
                        </li>
                        <li className="list-inline-item me-3">
                          <Link
                            title="Explorer Instagram Profile"
                            className="text-black"
                            to="https://instagram.com/"
                          >
                            <i className="fab fa-instagram"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <button onClick={login}>login</button>
        </>
      )}
    </>
  );
};

export default YourReactComponent;
