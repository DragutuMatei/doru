import React, { useState, useEffect } from "react";
import Fire from "../Fire";
import "../css/admin.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Idk from "../components/Idk";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const fire = new Fire();
const YourReactComponent = () => {
  const [data, setData] = useState([]);
  const [newDataKey, setNewDataKey] = useState(null);
  const [user, loading, error] = useAuthState(fire.getuser());

  useEffect(() => {
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
    console.log(user);

    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.uid == process.env.REACT_APP_ID) setLogged(true);
  }, [, user]);

  const handleCreateData = async () => {
    try {
      const dbHandler = new Fire();

      // Example: Create data
      const newDataId = await dbHandler.createData("/test", { name: name });
      setNewDataKey(newDataId);
      setName("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateData = async () => {
    try {
      const dbHandler = new Fire();

      await dbHandler.updateData("/test", {});
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteData = async (id) => {
    try {
      const dbHandler = new Fire();

      // Example: Delete data
      await dbHandler.deleteData(`/blog/${id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [name, setName] = useState("");
  const [textEditor, setTextEditor] = useState([]);

  const submit = async () => {
    try {
      const dbHandler = new Fire();

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
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

      const data = {
        text: textEditor,
        data: today,
        tags,
        category,
        timestamp: new Date().getTime(),
      };
      console.log(data);
      const newDataId = await dbHandler.createData("/blog", data);
      console.log("e ok");
      toast("e ok");
      setNewDataKey(newDataId);
      setTextEditor([]);
    } catch (error) {
      console.error("Error:", error);
    }
    // console.("e ok2")
  };

  const categories = [
    { value: "x1", label: "x1" },
    { value: "x2", label: "x2" },
    { value: "x3", label: "x3" },
  ];

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
    if (newUser.uid == process.env.REACT_APP_ID) setLogged(true);
    console.log(newUser);
  };

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
                "imageTextAlternative",
                "imageUpload",
                "imageStyle:full",
                "imageStyle:side",
                "|",
                "mediaEmbed",
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
            options={categories}
            onChange={(e) => {
              setCategory(e.value);
            }}
          />

          <br />
          <br />
          <br />
          <br />
          <button onClick={submit}>Add blog post</button>
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
