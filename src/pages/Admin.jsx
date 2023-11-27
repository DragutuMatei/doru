// import React, { useEffect, useState } from "react";

// import Fire from "../Fire";

// function Admin() {
//   const [name, setName] = useState("");
//   const [data, setData] = useState([]);
//   const submit = async () => {

// const fire = new Fire();
// await fire.createData("test", { name: name }).then(res => {
//       console.log(res);
//     });
//   };

//   useEffect(() => {
//     const fire = new Fire();
//     fire.listenForChanges("/test", (res) => {
//       console.log(res)
//       setData(res)
//     })
//   },[])

//   return (
//     <>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <input type="text" onChange={(e) => setName(e.target.value)} />
//       <button onClick={submit}>ok</button>
//       <br />
//       <br />
//       <br />
//       {
//         // data&&data.map()
//       }
//       <br />
//       <br />
//       <br />
//     </>
//   );
// }

// export default Admin;
// YourReactComponent.js

import React, { useState, useEffect } from "react";
import Fire from "../Fire";
import "../css/admin.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const YourReactComponent = () => {
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
        const fetchedData = await dbHandler.getData("/test");
        // console.log(Object.entries(fetchedData));
        setData(fetchedData);

        // Object.entries(fetchedData).map((da) => {
        //   console.log(da[0] + "+" + da[1].name);
        // });

        // Example: Listen for real-time changes
        dbHandler.listenForChanges("/test", (changedData) => {
          setData(changedData);
          console.log(changedData);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Run once on component mount

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

      // Example: Update data
      await dbHandler.updateData("/test", {
        /* updated data */
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteData = async (id) => {
    try {
      const dbHandler = new Fire();

      // Example: Delete data
      await dbHandler.deleteData(`/test/${id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [name, setName] = useState("");
  const [textEditor, setTextEditor] = useState([]);

  return (
    <>
      <div>
        <h1>Your React Component</h1>
        <p>Fetched Data: {JSON.stringify(data)}</p>
        <p>Newly Created Data Key: {newDataKey}</p>
        <button onClick={handleCreateData}>Create Data</button>
        <button onClick={handleUpdateData}>Update Data</button>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {data != null &&
          Object.entries(data) &&
          Object.entries(data).map((da) => {
            console.log(da[0] + "+" + da[1].name);

            return (
              <>
                <h1>{da[1].name}</h1>
                <button onClick={() => handleDeleteData(da[0])}>
                  Delete Data
                </button>
              </>
            );
          })}
      </div>
      {/* <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.3.2/ckeditor.js"
      ></script> */}
      {/* <div className="col-lg-12 page-main">
        <div className="new-post">
          <input
            type="text"
            className="title-input"
            placeholder="Post title"
            id="post_title"
            name="post_title"
          />

          <textarea id="post_text" className="post-area"></textarea>

          <button id="add_btn" className="add-btn">
            <i className="fa fa-plus"></i> Add Post
          </button>
        </div>
      </div> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
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
          // You can store the "editor" and use when it is needed.
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="wrap-result">
        <div dangerouslySetInnerHTML={{ __html: textEditor }}></div>

        {/* {textEditor && textEditor.map((item, id) => {
        return (
          <div key={id} className="result-card">
            <button onClick={()=>Delete(item.id)}>Delete</button>
          </div>
        );
      })} */}
      </div>
    </>
  );
};

export default YourReactComponent;
