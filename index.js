import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

function dateTime(){
    var currentdate = new Date(); 
var datetime = "Posted on: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}

function blogPost(imageURL, title, type, description, time, index) {
    this.imageURL = imageURL;
    this.title = title;
    this.type = type;
    this.description = description;
    this.time = time;
    this.index = index;
  }
  var blogArr = [];
  
  // Create instances of the blogPost
  var imagelink="/images/firstBlogPostImg.jpg";
  var firstTitle="Digital Revolution";
  var firstType="Technology";
  var firstText=`The digital revolution has already changed how people live, work, and communicate. 
  And it's only just getting started. But the same technologies that have the potential to help 
  billions of people live happier, healthier, and more productive lives are also creating new 
  challenges for citizens and governments around the world. From election meddling to data breaches 
  and cyberattacks, recent events have shown that technology is changing how we think about privacy,
  national security, and maybe even democracy itself. In this project, we examine challenges in five 
  key areas that will shape the future of the digital age: justice system, impact on democracy, 
  global security and international conflict, the impact of automations and AI on the jobs 
  marketplace, identity, and privacy.`;
   var firstTime=dateTime();
   var firstIndex=1;

  var blog = new blogPost(imagelink, firstTitle, firstType, firstText, firstTime, firstIndex++);  
  blogArr.push(blog);
  //2cd instance
  var imagelink="/images/geminiAIpost.jpg";
  var firstTitle="Google's next-gen AI model Gemini outperforms GPT-4";
  var firstType="Advancement in AI";
  var firstText=`Google has unveiled Gemini, a cutting-edge AI model that stands as the company's 
  most capable and versatile to date. Demis Hassabis, CEO and Co-Founder of Google DeepMind, 
  introduced Gemini as a multimodal model that is capable of seamlessly understanding and combining 
  various types of information, including text, code, audio, image, and video. Gemini comes in three 
  optimised versions: Ultra, Pro, and Nano. The Ultra model boasts state-of-the-art performance, 
  surpassing human experts in language understanding and demonstrating unprecedented capabilities 
  in tasks ranging from coding to multimodal benchmarks.`;
   var firstTime=dateTime();
   var firstIndex=1;

  var blog = new blogPost(imagelink, firstTitle, firstType, firstText, firstTime, firstIndex++);  
  blogArr.push(blog);

//for home button
app.get("/", (req,res) => { 
    res.render("index.ejs",{blogArr: blogArr});
});

app.get("/addNewPost", (req,res) => {
    res.render("addPostForm.ejs");
});

//Adding new post
app.post("/new", (req,res) => {
    const newBlog= new blogPost(req.body["imageURL"], req.body["title"], req.body["type"], req.body["description"], dateTime(), firstIndex++);
    // var lastElement=blogArr[blogArr.length-1];
    // if(lastElement.description!==newBlog.description)
    blogArr.push(newBlog);
    res.redirect("/");
    // res.render("index.ejs",{blogArr: blogArr});
});
var indexToBeEdited;
// For editing posts
app.get("/loadEditForm", (req,res) => {
    indexToBeEdited = req.query.index;
    res.render("EditCurrentPost.ejs",{blogArr: blogArr, indexToBeEdited:indexToBeEdited});
});

app.post("/edit", (req,res) =>{
    const newBlog= new blogPost(req.body["imageURL"], req.body["title"], req.body["type"], req.body["description"], dateTime(), firstIndex);
    blogArr[indexToBeEdited-1]=newBlog;
    res.redirect("/");
});

// For deleting posts
app.delete("/delete/:title", (req, res) => {
    const blogTitle = req.params.title;
    blogArr = blogArr.filter(item => item.title !== blogTitle);

    // Send a success response
    res.sendStatus(200);
  });
  // Add a new route for rendering the edit form
app.get("/linkedin", (req,res) =>{
    res.redirect("https://www.linkedin.com/in/anunak-roy-a946b9230/");
})
app.get("/github", (req,res) =>{
    res.redirect("https://github.com/AnunakRoy");
})
app.get("/email", (req,res) =>{
    res.redirect("mailto:anunakroy2@gmail.com");
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});