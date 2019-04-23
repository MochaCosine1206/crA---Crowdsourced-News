const db = require("../models");
const axios = require("axios")
const extractor = require('unfluff')
const sw = require('sentiword');
const nlp = require('compromise');
const url = require('url');
var websiteLogo = require('website-logo');
var quoteParser = require('quote-parser');

// Defining methods for the postsController
module.exports = {

  submitArticle: function (req, res) {

    console.log("In Post Controller: " + req.body.articleSubmition)

    getLogo = url => {
      //parse url for hostname
      const myURL = new URL(url);
      console.log(myURL.hostname);

      //get site logo info
      websiteLogo(myURL.hostname, function (error, images) {
        console.log(error || images)

        console.log(decodeURI(images.logo))
        const logoExtract = decodeURI(images.logo)
        const logo = logoExtract.split(/,(.+)/)[1]
        const altLogo = images.openGraph


        getSiteData(url, logo, altLogo, myURL.hostname)
      })
    }
    getLogo(req.body.articleSubmition)


    getSiteData = (url, logo, altLogo, hostSite) => {
      //use unfluff
      axios.get(url)
        .then(function (response) {



          let unfluffData = extractor(response.data);
          console.log("unfluff data: " + JSON.stringify(unfluffData));
          console.log("--------------------------------------/n");
          console.log("Title: " + unfluffData.title);
          console.log("--------------------------------------/n");
          console.log("Date: " + unfluffData.date);
          console.log("--------------------------------------/n");
          console.log("Author: " + unfluffData.author);
          console.log("--------------------------------------/n");
          console.log("Publisher: " + unfluffData.publisher);
          console.log("--------------------------------------/n");
          console.log("Copyright: " + unfluffData.copyright);
          console.log("--------------------------------------/n");
          console.log("Favicon: " + unfluffData.favicon);
          console.log("--------------------------------------/n");
          console.log("Description: " + unfluffData.description);
          console.log("--------------------------------------/n");
          console.log("Link: " + unfluffData.canonicalLink);
          console.log("--------------------------------------/n");
          console.log("Tags: " + unfluffData.tags);
          console.log("--------------------------------------/n");
          console.log("Image: " + unfluffData.image);
          console.log("--------------------------------------/n");
          console.log("Videos: " + unfluffData.videos);
          console.log("--------------------------------------/n");
          console.log("Links/descriptions: " + unfluffData.links);
          console.log("--------------------------------------/n");
          console.log("Text: " + unfluffData.text);
          console.log("--------------------------------------/n");
          console.log("keywords: " + unfluffData.keywords);
          console.log("--------------------------------------/n");
          let text = unfluffData.text;

          textQuotes = quoteParser.parse(text, 'en', { minLength: 10 });
          console.log("quotes: " + textQuotes)


          let sentimentScore = sw(text);
          // console.log("Sentiment Data: " + JSON.stringify(sentiment));
          // console.log("--------------------------------------/n");
          console.log("Sentiment Score: " + sentimentScore.sentiment);
          console.log("--------------------------------------/n");
          console.log("avgSentiment Score: " + sentimentScore.avgSentiment);
          console.log("--------------------------------------/n");
          console.log("objective Score: " + sentimentScore.objective);
          console.log("--------------------------------------/n");
          console.log("positive Score: " + sentimentScore.positive);
          console.log("--------------------------------------/n");
          console.log("negative Score: " + sentimentScore.negative);
          console.log("--------------------------------------/n");



          let topics = nlp(text).topics().out('topk')
          let people = nlp(text).people().out('topk')
          let places = nlp(text).places().out('topk')
          let orgs = nlp(text).organizations().out('topk')
          let compromiseTopicsArr = [];
          let compromisePeopleArr = [];
          let compromisePlacesArr = [];
          let compromiseOrgArr = [];
          console.log("compromise topics: " + JSON.stringify(topics))
          console.log("compromise people: " + JSON.stringify(people))
          console.log("compromise places: " + JSON.stringify(places))
          console.log("--------------------------------------/n");

          for (let i = 0; i < topics.length; i++) {
            compromiseTopicsArr.push(topics[i].normal);
            console.log("array: " + compromiseTopicsArr)
          }
          for (let i = 0; i < people.length; i++) {
            compromisePeopleArr.push(people[i].normal);
            console.log("array: " + compromisePeopleArr)
          }
          for (let i = 0; i < places.length; i++) {
            compromisePlacesArr.push(places[i].normal);
            console.log("array: " + compromisePlacesArr)
          }
          for (let i = 0; i < orgs.length; i++) {
            compromiseOrgArr.push(orgs[i].normal);
            console.log("array: " + compromiseOrgArr)
          }

          let result = {};
          result.siteName = hostSite;

          if (unfluffData.title.includes("Are you a robot?")) {
            result.title = "";
          } else {
            result.title = unfluffData.title;
          }

          result.publishedDate = unfluffData.date;
          result.author = unfluffData.author;
          result.publisher = unfluffData.publisher;
          result.copyright = unfluffData.copyright;
          result.favicon = unfluffData.favicon;
          result.description = unfluffData.description;
          result.url = unfluffData.canonicalLink;
          result.tags = unfluffData.tags;
          result.image = unfluffData.image;
          result.videos = unfluffData.videos;
          result.links = unfluffData.links;
          result.text = text
          result.keywords = unfluffData.keywords
          result.sentimentScore = sentimentScore.sentiment;
          result.avgSentiment = sentimentScore.avgSentiment;
          result.objectiveScore = sentimentScore.objective;
          result.positiveScore = sentimentScore.positive;
          result.negativeScore = sentimentScore.negative;
          result.compromiseTopics = compromiseTopicsArr;
          result.compromisePeople = compromisePeopleArr;
          result.compromisePlaces = compromisePlacesArr;
          result.compromiseOrganizations = compromiseOrgArr;
          result.quotes = textQuotes;
          result.logo = logo;
          result.altLogo = altLogo;


          console.log(result);



          db.Posts.create(result)
            .then(dbModel => {
              res.json(dbModel)
            })
            .catch(err => res.json(err));
        })
    }
  },


  getFilteredPosts: function (req, res) {
    console.log("Inside Controller " + req.params.search)
    db.Posts
    .find({ $text: { $search: req.params.search}})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  getTopics: function (req, res) {
    db.Posts.aggregate([
      {
        $unwind: "$compromiseTopics"
      }, 
      {
        $sortByCount: "$compromiseTopics"
      }
    ]).limit(10)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getPeople: function (req, res) {
    db.Posts.aggregate([
      {
        $unwind: "$compromisePeople"
      }, 
      {
        $sortByCount: "$compromisePeople"
      }
    ]).limit(10)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getPlaces: function (req, res) {
    db.Posts.aggregate([
      {
        $unwind: "$compromisePlaces"
      }, 
      {
        $sortByCount: "$compromisePlaces"
      }
    ]).limit(10)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updatePostComment: function (req, res) {
    console.log("postId " + req.body.postId);
    console.log("commentId " + req.body.commentId)
    db.Posts.findOneAndUpdate({"_id": req.body.postId},
    {$push:
      {
        'comments': req.body.commentId
      }
    },
    {
      new: true
    }
  )
    .then(dbModel => {res.json(dbModel)})
    .catch(err => res.status(422).json(err));
},

findByUrl: function (req, res) {
  console.log("In findByUrl" + req.body.articleSubmition)
  db.Posts
    .find({ url: req.body.articleSubmition })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
},


  findAll: function (req, res) {
    db.Posts
      .find(req.query)
      .sort({ createDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Posts
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Post
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Post
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  user: function (req, res) {
    console.log("This is the user: " + req.user)
    res.json(req.user)
  }

};
