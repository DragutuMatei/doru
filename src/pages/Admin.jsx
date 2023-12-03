import React, { useState, useEffect, useRef } from "react";
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
import ResizeObserver from "resize-observer-polyfill";

const fire = new Fire();
const YourReactComponent = () => {
  const [data, setData] = useState([]);
  const [newDataKey, setNewDataKey] = useState(null);
  const [user, loading, error] = useAuthState(fire.getuser());
  const [categories, setCategories] = useState([]);
  const [oldData, setOldData] = useState([]);
  const deleteContact = async (id) => {
    const fire = new Fire();

    await fire.deleteData(`/contact/${id}`);
  };
  const deletePost = async (id) => {
    const fire = new Fire();

    await fire.deleteData(`/blog/${id}`);
  };
  const [contacts, setContacts] = useState([]);
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

        const fetchedData2 = await dbHandler.getData(`/contact`);
        setContacts(fetchedData2);

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

        dbHandler.listenForChanges("/contact", (changedData) => {
          setContacts(changedData);
          console.log("contact: ", changedData);
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
  const editorRef = useRef();

  const mori = (e) => {};

  useEffect(() => {
    window.addEventListener("scroll", (e) => mori(e));
  }, []);

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
    if (category_input == "") {
      setLoading(false);
      toast("Trebuie sa pui o categorie a postului");
      return;
    }
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
        category: category_input,
        timestamp: new Date().getTime(),
        images: downloadUrls,
        videos: videosUlrs,
      };
      console.log(data);
      const newDataId = await dbHandler.createData("/blog", data);
      console.log(newDataId);
      if (newDataId) {
        toast("Post uploaded!");
        setNewDataKey(newDataId);
        setTextEditor([]);
      } else {
        toast("Error!");
      }
      setLoading(false);
    } catch (error) {
      toast("Error!");
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
          <div className="AdminArea">
            <h1>
              Bine ai venit, <a href="#">{user && user.displayName}!</a>{" "}
            </h1>
            <h2>Din această zona poți publica postări pe blogul tău!</h2>
            <br />

            <h2>Textul blogului: </h2>
            <div>
              <CKEditor
                ref={editorRef}
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
                  console.log(
                    "toolbar: ",
                    Array.from(editor.ui.componentFactory.names())
                  );
                  console.log(
                    "plugins: ",
                    ClassicEditor.builtinPlugins.map(
                      (plugin) => plugin.pluginName
                    )
                  );
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setTextEditor(data);
                }}
                onBlur={(info, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(editor) => {
                  console.log("Focus.", editor);
                }}
                onReady={(e) => {
                  console.log("GATAAA: ", e);
                }}
              />
              
            </div>

            <br />
            <div className="selectCategory">
              <h2>Categorie pentru postare: </h2>
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
            </div>
            <br />
            <div class="mb-3 dropdown">
              <label for="pozeUpload" class="form-label">
                {" "}
                <h2>Poze:</h2>
              </label>
              <input
                type="file"
                className="form-control"
                id="pozeUpload"
                multiple
                onChange={handleFileInputChange}
              />
            </div>
            <br />
            <div class="mb-3 dropdown">
              <label for="videoUpload" class="form-label">
                {" "}
                <h2>Videoclipuri:</h2>
              </label>
              <input
                type="file"
                className="form-control"
                id="videoUpload"
                multiple
                onChange={videosupdates}
              />
            </div>
            <br />
            <br />
            {loading_submit ? (
              <h1>Loading</h1>
            ) : (
              <button className="btn btn-primary" onClick={submit}>
                Add blog post
              </button>
            )}

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

            <br />
            <div className="newCatt">
              <h1>Adaugă o nouă categorie pe site</h1>
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="numele noii categori"
                onChange={(e) => setCat(e.target.value)}
              />
              <br />
              <button className="btn btn-primary" onClick={submitCat}>
                adaugă categorie
              </button>
            </div>
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
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div style={{ padding: "20px 40px" }}>
            <h1>Contacts:</h1>
            <br />
            <ul>
              {contacts &&
                Object.entries(contacts) &&
                Object.entries(contacts)
                  .reverse()
                  .map((contact) => {
                    return (
                      <>
                        <li>
                          <h3>{contact[1].name}</h3>
                          <h5>
                            <a href={`mailto: ${contact[1].email}`}>
                              {contact[1].email}
                            </a>
                          </h5>
                          <p>{contact[1].text}</p>
                          <button
                            onClick={async () => deleteContact(contact[0])}
                            className="btn btn-secondary"
                          >
                            Delete
                          </button>
                          <hr />
                        </li>
                      </>
                    );
                  })}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <br />
          <br />
          <br />
          <div className="TitleLogin">
            <p>
              Nu ești conectat, pentru a accesa următoarea secțiune e necesară
              conectarea!
            </p>
          </div>
          <div className="centerButt">
            <br />
            <button className="btn btn-primary" onClick={login}>
              login
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => (window.location.href = "/")}
            >
              Return to home
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default YourReactComponent;
