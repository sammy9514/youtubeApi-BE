import { Application, Request, Response } from "express";
import path from "path";
import fs from "fs";
import lodash from "lodash";

// export const mainApp = (app: Application) => {
//   app.post("/create-data", (req: Request, res: Response) => {
//     try {
//       const { data: userData } = req.body;

//       let pathe = path.join(__dirname, "data", "./database.json");
//       fs.readFile(pathe, (err, data) => {
//         if (err) {
//           return err;
//         } else {
//           let dataRead = JSON.parse(Buffer.from(data).toString());

//           if (lodash.some(dataRead, userData)) {
//             console.log("Data exists");
//             res.status(200).json({
//               message: "done",
//               data: dataRead,
//             });
//           } else {
//             console.log("no data yet");
//             dataRead.push(userData);

//             fs.writeFile(pathe, JSON.stringify(dataRead), "utf-8", () => {
//               console.log("written to database");
//             });
//           }
//           res.status(200).json({
//             message: "done",
//             data: dataRead,
//           });
//         }
//       });
//     } catch (error) {
//       res.status(404).json({
//         message: "failed",
//       });
//     }
//   });

//   app.get("/read-data", (req: Request, res: Response) => {
//     let pathe = path.join(__dirname, "data", "./database.json");
//     fs.readFile(pathe, (err, data) => {
//       if (err) {
//         return err;
//       } else {
//         let dataRead = JSON.parse(Buffer.from(data).toString());

//         res.status(200).json({
//           message: "done reading",
//           data: dataRead,
//         });
//       }
//     });
//   });
// };


export const mainApp = (app:Application)=> {
  app.post("/create-data", (req: Request, res: Response)=> {
    try {
      let {data:userData} = req.body

      let pathe = path.join(__dirname, "data", "./database.json")
      fs.readFile(pathe, (err, data)=> {
        if(err) {
          return err
        }else {
          let dataRead = JSON.parse(Buffer.from(data).toString())

          if(lodash.some(dataRead,userData)) {
            console.log("data exist");
            res.status(200).json({
              message: "done",
              data: dataRead
            })
          } else {
            console.log("no like data");
            
            dataRead.push(userData)
            fs.writeFile(pathe, JSON.stringify(dataRead), "utf-8", ()=> {
              return "done"
            })
            res.status(200).json({
              message: "written",
              data: dataRead
            })
          }
        }
      })
    } catch (error) {
      res.status(404).json({
        message: "failed"
      })
    }
  })
}