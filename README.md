# MightyUrl

Mighty Url is a simple NodeJs application that converts long urls into a shorter form.

## Technology

Mighty Url is created with nodejs, utalising express and mongoose. I also use a shortID module to produce a short indicator for a longer url.

## How to run

1. Pull from this repo into VS Code
2. Create a free mongodb database at https://cloud.mongodb.com/
3. Click connect on the mongodb website where you will be shown a link like below
![image](https://user-images.githubusercontent.com/19317685/201444489-b17e968c-6e7c-4ff0-940d-a9c26dae5393.png)
4. Copy that link and replace my "mongoDBConnectionString" in the .env file
5. Open the terminal in VS Code and use npm run devStart
6. Access your http://localhost:1234/ though your browser to view the running application

Pull down from this repo to visual studio code, I use a mongoDB database that is set up locally with mogodb cloud, to run the app you will need to configure a simple mongodb database and replace the "mongoDBConnectionString" environment variable in the .env file. Once you have the mongodb set up you can simply use the command "npm run devStart" to run the application. I am utalising the nodemon server module to run the app so once you run with "npm run devStart" you should be able to open a browser and access your http://localhost:1234/ to view the running application.

## How it works

When you first access the app you will screen like below

![image](https://user-images.githubusercontent.com/19317685/201444664-9452a87f-967e-4ed7-bbdb-de37208d25ea.png)

Add a url that you would like to shorten to the input and click shrink! You will be given a shortened url which you can copy by clicking copy url, If you navigate to the short url, you will be directed to the original website that you entered.

![UrlShrinking](https://user-images.githubusercontent.com/19317685/201445139-566043ed-4b8d-4c84-8637-a3c3a0043e7a.gif)

I have included a second page that presents the mongodb database in a nice layout in a responsive table. The table displays the amount of times the short link has been visited, tinyUrl provides a similar service that is user specific, this is not user specific but I thought this was important to include.

![secondpage](https://user-images.githubusercontent.com/19317685/201445756-a3b980f3-d182-4fff-8b46-0e2345b0af6e.gif)

## Some more Technical Decisions

I decided to use a simple mongodb database because it can be defined simply from my nodejs app, I would prefer an sql based for a larger app with more complex table relationships but for this simple solution mongodb was perfect.

I used some simple bootstrap to present the app in a nice and neat manner.

I included the ejs module for embedded javascript templating which I found very useful to very easily include a variable passed with the server response. This is shown below with the "ShrunkUrl" variable surrounded by the <%= %> ejs syntax.

```
<div class="col-8">
    <input value="<%= ShrunkUrl %>" class="form-control rounded-5" required type="url" name="smallUrl" id="smallUrl">
</div>
```






