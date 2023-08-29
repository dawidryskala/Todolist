import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { basename, dirname } from "path";
import { fileURLToPath } from "url";
import { count } from "console";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

let counter = 0;
let inp_array = [];

let counter_work = 0;
let inp_array_work = [];

let which_page = "";

app.post("/submit", (req, res) => {
    console.log("po naciśjęciu submit - " + which_page)
    if (which_page === "" || which_page === "today") {
        if (req.body["fName"] != "") {
            counter++;

            let inp_text = req.body["fName"];
            inp_array.push(inp_text);
            console.log(inp_array);
            console.log(req.body["fName"]);

            res.render("index.ejs", {
                which_page_is_it: which_page,
                input_text: inp_text,
                input_array: inp_array,
                input_counter: counter,
            });
        } else {
            res.render("index.ejs", {
                // input_text: inp_text,
                which_page_is_it: which_page,
                input_array: inp_array,
                input_counter: counter,
            });
        }
    } else if (which_page === "work") {
        if (req.body["fName"] != "") {

            counter_work++;

            let inp_text_work = req.body["fName"];
            inp_array_work.push(inp_text_work);
            console.log(inp_array_work);
            console.log(req.body["fName"]);

            res.render("index.ejs", {
                which_page_is_it: which_page,
                input_text_work: inp_text_work,
                input_array_work: inp_array_work,
                input_counter_work: counter_work,
            });
        } else {
            res.render("index.ejs", {
                // input_text: inp_text,
                which_page_is_it: which_page,
                input_array_work: inp_array_work,
                input_counter_work: counter_work,
            });
        }
    }


});

app.post("/today", (req, res) => {
    which_page = "today";
    console.log(which_page);

    res.render("index.ejs", {
        // input_text: inp_text,
        which_page_is_it: which_page,
        input_array: inp_array,
        input_counter: counter,
    });
})

// ----------------------------------------- Work --------------------------------------- //

app.post("/work", (req, res) => {
    which_page = "work";
    console.log(which_page);

    res.render("index.ejs", {
        // input_text_work: inp_text_work,
        which_page_is_it: which_page,
        input_array_work: inp_array_work,
        input_counter_work: counter_work,
    });
})

app.listen(port, () => {
    console.log(`listening on port ${port} `);
});