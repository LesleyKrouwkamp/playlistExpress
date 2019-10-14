const express = require('express')
const app = express()
const port= 3090
const server=app
const bodyPaser = require('body-parser')
// const fetch = require('isomorphic-fetch')


let data = require('./data')

//Body-parser
app.use(bodyPaser.json(data))

//form
app.use(bodyPaser.urlencoded({extend: true}))

// for the use of json files
app.use(express.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}))


// Serve static files 
app.use(express.static('public'))


//Get the root

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
 });

//Display data

app.get('/items',(req,res)=>{
  res.json(data);
  
	
});

// Adding a new item

app.post("/items", (req, res) => {
    const item = req.body;
    console.log('Adding new musician: ', item);
 
    data.push(item);
 
    res.json(data);
 });


// Editing an item

 app.put("/items/:id", (req, res) => {
   let itemId = req.params.id;

   let item = data.filter(item => {
     return item.id == itemId;
   })[0];
   console.log("Edit musician with id: ", itemId);
   const index = data.indexOf(item);
 
   let keys = Object.keys(req.body);
 
   keys.forEach(key => {
     item[key] = req.body[key];
   });
 
   data[index] = item;
 
   res.json(data[index]);
   
   
   });

	// Delete a item
	 
	app.delete("/items/:id", (req, res) => {
		const itemId = req.params.id;
	 
		console.log("Deleted musician with id: ", itemId);
	 
		const filtered_list = data.filter(item => item.id !== itemId);
		data = filtered_list;

       res.json(data);

	});

	

server.listen(port, console.info(`server is up and running on port ${port}`));
