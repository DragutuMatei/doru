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

const YourReactComponent = () => {
  const [data, setData] =  useState([]);
  const [newDataKey, setNewDataKey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbHandler = new Fire();

        // Example: Fetch data
        const fetchedData = await dbHandler.getData("/test");
        // console.log(Object.entries(fetchedData));
        setData(fetchedData);

        Object.entries(fetchedData).map((da) => {
          console.log(da[0] + "+" + da[1].name);
        });

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
  return (
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
      {Object.entries(data).map((da) => {
        console.log(da[0] + "+" + da[1].name);

        return (
          <>
            <h1>{da[1].name}</h1>
            <button onClick={() => handleDeleteData(da[0])}>Delete Data</button>
          </>
        );
      })}

      {Object.entries(data).map((da) => {
        console.log(da);
        // return (
        //   <>
        //     <h1>{da.name}</h1>
        //     <button onClick={()=>handleDeleteData(da.key)}>Delete Data</button>
        //   </>
        // );
      })}
    </div>
  );
};

export default YourReactComponent;
